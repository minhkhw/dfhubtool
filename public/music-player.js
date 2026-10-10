/**
 * ========================================================
 * DELTA FORCE VIỆT NAM - NHẠC CHUỘT (SHUSHU MUSIC PLAYER)
 * Floating Overlay Player & Global Audio Engine
 * https://shushu.fan/music/ recreation & integration
 * ========================================================
 */

(function () {
  'use strict';

  // Global Player State
  const STORAGE_KEY_POS = 'df_music_overlay_pos';
  const STORAGE_KEY_STATE = 'df_music_player_state';

  let playlists = [];
  let currentPlaylistIdx = 0;
  let currentSongIdx = 0;
  let isPlaying = false;
  let isDragging = false;
  let isCollapsed = false;
  let dragOffset = { x: 0, y: 0 };
  let currentPosition = null;
  let audioElement = null;
  let isDrawerOpen = false;

  // Pre-load saved state if any
  let savedState = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATE);
    if (raw) savedState = JSON.parse(raw);
  } catch (e) {}

  // 1. Initialize Audio Element
  function initAudio() {
    if (audioElement) return audioElement;
    audioElement = document.getElementById('dfGlobalAudio');
    if (!audioElement) {
      audioElement = document.createElement('audio');
      audioElement.id = 'dfGlobalAudio';
      audioElement.preload = 'auto';
      audioElement.crossOrigin = 'anonymous';
      document.body.appendChild(audioElement);
    }

    audioElement.addEventListener('ended', () => {
      playNext();
    });

    audioElement.addEventListener('play', () => {
      isPlaying = true;
      updateUI();
      saveState();
      window.dispatchEvent(new CustomEvent('df-music-play', { detail: getCurrentSong() }));
    });

    audioElement.addEventListener('pause', () => {
      isPlaying = false;
      updateUI();
      saveState();
      window.dispatchEvent(new CustomEvent('df-music-pause', { detail: getCurrentSong() }));
    });

    audioElement.addEventListener('timeupdate', () => {
      if (Math.floor(audioElement.currentTime) % 2 === 0) {
        saveState();
      }
      window.dispatchEvent(new CustomEvent('df-music-timeupdate', {
        detail: {
          currentTime: audioElement.currentTime,
          duration: audioElement.duration || 0
        }
      }));
    });

    audioElement.addEventListener('error', (e) => {
      console.warn('Audio playback error, attempting next song...', e);
    });

    return audioElement;
  }

  // 2. Fetch Playlists Data
  async function loadPlaylists() {
    try {
      const res = await fetch('data/music-playlists.json?v=' + Date.now());
      if (res.ok) {
        const data = await res.json();
        playlists = data.playlists || [];
      }
    } catch (err) {
      console.warn('Failed to load local music-playlists.json, using fallback...', err);
    }

    if (!playlists || !playlists.length) {
      // Fallback playlist with user's specific song
      playlists = [
        {
          id: '10',
          name: '曼波の小曲',
          name_vi: 'Bản hit Chuột Mambo',
          songs: [
            {
              id: '100112',
              title: '无基转生：spiral🐱',
              title_vi: 'Luân hồi không cơ sở: linh hồn 🐱',
              artist: '我叫小白李',
              artist_vi: 'Tôi tên là Xiaobai Li',
              cover: 'https://s3.oss.hengj.cn/one/autoup/e0abf1b2-75ac-4e49-baa2-58778be5c656/20251027/Fv9Vsu/%E6%97%A0%E5%9F%BA%E8%BD%AC%E7%94%9F%EF%BC%9Aspiral.webp',
              url: 'https://s3.oss.hengj.cn/one/autoup/55a4e029-1ef2-47b3-835e-405500f56ed4/20251027/oCole7/%E6%97%A0%E5%9F%BA%E8%BD%AC%E7%94%9F%EF%BC%9Aspiral.mp3'
            }
          ]
        }
      ];
    }

    // Restore playlist & song indices from state
    if (savedState) {
      if (typeof savedState.playlistIdx === 'number' && playlists[savedState.playlistIdx]) {
        currentPlaylistIdx = savedState.playlistIdx;
      }
      if (typeof savedState.songIdx === 'number' && playlists[currentPlaylistIdx]?.songs?.[savedState.songIdx]) {
        currentSongIdx = savedState.songIdx;
      }
      if (savedState.volume) {
        audioElement.volume = savedState.volume;
      }
    }

    updateUI();
    renderDrawerList();

    // Check if auto-resume requested (e.g. was playing before navigation)
    if (savedState && savedState.isPlaying) {
      // User was playing on previous page. Wait for user gesture or attempt resume.
      const song = getCurrentSong();
      if (song && song.url) {
        audioElement.src = song.url;
        if (savedState.currentTime) {
          audioElement.currentTime = savedState.currentTime;
        }
        audioElement.play().catch(() => {
          // Browser autoplay restriction: will resume on first click
          const resumeOnFirstTouch = () => {
            if (!isPlaying) {
              audioElement.play().catch(() => {});
            }
            window.removeEventListener('click', resumeOnFirstTouch);
            window.removeEventListener('touchstart', resumeOnFirstTouch);
          };
          window.addEventListener('click', resumeOnFirstTouch, { once: true });
          window.addEventListener('touchstart', resumeOnFirstTouch, { once: true });
        });
      }
    }

    window.dispatchEvent(new CustomEvent('df-music-loaded', { detail: { playlists } }));
  }

  // 3. Resolve Song Audio Stream URL
  async function resolveSongUrl(song) {
    if (!song) return null;
    if (song.url) return song.url;

    // Fetch from shushu.fan official audio API endpoint
    try {
      const res = await fetch(`https://api.hengj.cn/music/v4/songs/${song.id}/resource`, {
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        const d = await res.json();
        if (d.success && d.data && d.data.url) {
          song.url = d.data.url;
          song.lrc = d.data.lrc || '';
          song.source_url = d.data.source_url || '';
          return song.url;
        }
      }
    } catch (e) {
      console.warn('Direct API fetch failed, trying proxy...', e);
    }

    // Fallback: local backend proxy
    try {
      const res2 = await fetch(`/api/music/resource?id=${song.id}`);
      if (res2.ok) {
        const d2 = await res2.json();
        if (d2.url) {
          song.url = d2.url;
          return song.url;
        }
      }
    } catch (e) {}

    return null;
  }

  // Current Song Helper
  function getCurrentSong() {
    const p = playlists[currentPlaylistIdx];
    if (!p || !p.songs || !p.songs.length) return null;
    return p.songs[currentSongIdx] || p.songs[0];
  }

  // 4. Playback Logic
  async function playSong(playlistIdx, songIdx, autoPlay = true) {
    initAudio();
    if (typeof playlistIdx === 'number' && playlists[playlistIdx]) {
      currentPlaylistIdx = playlistIdx;
    }
    if (typeof songIdx === 'number') {
      currentSongIdx = songIdx;
    }

    const song = getCurrentSong();
    if (!song) return;

    updateUI();
    saveState();
    window.dispatchEvent(new CustomEvent('df-music-change', { detail: song }));

    if (!autoPlay) return;

    const streamUrl = await resolveSongUrl(song);
    if (!streamUrl) {
      console.error('Cannot resolve audio stream for song:', song);
      return;
    }

    if (audioElement.src !== streamUrl) {
      audioElement.src = streamUrl;
      audioElement.load();
    }

    try {
      await audioElement.play();
      isPlaying = true;
      updateUI();
      saveState();
    } catch (err) {
      console.warn('Playback blocked or failed:', err);
    }
  }

  function togglePlay() {
    initAudio();
    const song = getCurrentSong();
    if (!song) return;

    if (isPlaying) {
      audioElement.pause();
    } else {
      if (!audioElement.src || audioElement.src === '' || audioElement.src === window.location.href) {
        playSong(currentPlaylistIdx, currentSongIdx, true);
      } else {
        audioElement.play().catch(() => {
          playSong(currentPlaylistIdx, currentSongIdx, true);
        });
      }
    }
  }

  function playNext() {
    const p = playlists[currentPlaylistIdx];
    if (!p || !p.songs || !p.songs.length) return;
    const nextIdx = (currentSongIdx + 1) % p.songs.length;
    playSong(currentPlaylistIdx, nextIdx, true);
  }

  function playPrev() {
    const p = playlists[currentPlaylistIdx];
    if (!p || !p.songs || !p.songs.length) return;
    const prevIdx = (currentSongIdx - 1 + p.songs.length) % p.songs.length;
    playSong(currentPlaylistIdx, prevIdx, true);
  }

  function saveState() {
    try {
      const st = {
        playlistIdx: currentPlaylistIdx,
        songIdx: currentSongIdx,
        isPlaying: isPlaying && !audioElement.paused,
        currentTime: audioElement ? audioElement.currentTime : 0,
        volume: audioElement ? audioElement.volume : 0.8,
        isCollapsed
      };
      localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(st));
    } catch (e) {}
  }

  // 5. Mount the Floating Overlay Component
  function mountOverlay() {
    if (document.getElementById('dfMusicOverlay')) return;

    // Load saved position or default
    try {
      const posRaw = localStorage.getItem(STORAGE_KEY_POS);
      if (posRaw) currentPosition = JSON.parse(posRaw);
    } catch (e) {}

    const overlay = document.createElement('div');
    overlay.id = 'dfMusicOverlay';
    // User requested exact structure & classes:
    overlay.className = `
      fixed z-50
      backdrop-blur-xl bg-background/70 border shadow-2xl 
      flex items-center
      rounded-full pl-2 pr-4 py-2 gap-2
      transition-[left,top,opacity] duration-500 ease-out
      df-music-player-overlay
    `.replace(/\s+/g, ' ').trim();

    overlay.style.position = 'fixed';
    overlay.style.zIndex = '999999';
    overlay.style.pointerEvents = 'auto';
    overlay.style.opacity = '1';

    // Position default: bottom-right (strictly clamped within current viewport)
    const overlayW = 260;
    const overlayH = 42;
    const maxLeft = Math.max(8, window.innerWidth - overlayW - 8);
    const maxTop = Math.max(8, window.innerHeight - overlayH - 68);

    if (currentPosition && typeof currentPosition.x === 'number' && typeof currentPosition.y === 'number') {
      const clampedX = Math.max(8, Math.min(currentPosition.x, maxLeft));
      const clampedY = Math.max(8, Math.min(currentPosition.y, maxTop));
      overlay.style.left = `${clampedX}px`;
      overlay.style.top = `${clampedY}px`;
      currentPosition = { x: clampedX, y: clampedY };
    } else {
      const defaultLeft = Math.max(16, window.innerWidth - 290);
      const defaultTop = Math.max(16, window.innerHeight - 72);
      overlay.style.left = `${defaultLeft}px`;
      overlay.style.top = `${defaultTop}px`;
      currentPosition = { x: defaultLeft, y: defaultTop };
    }

    // HTML Content matching user's exact specification
    overlay.innerHTML = `
      <div class="py-1 rounded-full cursor-grab active:cursor-grabbing shrink-0 df-music-drag-handle" id="dfMusicDragHandle" title="Kéo để di chuyển">
        <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 4.625C6.12132 4.625 6.625 4.12132 6.625 3.5C6.625 2.87868 6.12132 2.375 5.5 2.375C4.87868 2.375 4.375 2.87868 4.375 3.5C4.375 4.12132 4.87868 4.625 5.5 4.625ZM9.5 4.625C10.1213 4.625 10.625 4.12132 10.625 3.5C10.625 2.87868 10.1213 2.375 9.5 2.375C8.87868 2.375 8.375 2.87868 8.375 3.5C8.375 4.12132 8.87868 4.625 9.5 4.625ZM10.625 7.5C10.625 8.12132 10.1213 8.625 9.5 8.625C8.87868 8.625 8.375 8.12132 8.375 7.5C8.375 6.87868 8.87868 6.375 9.5 6.375C10.1213 6.375 10.625 6.87868 10.625 7.5ZM5.5 8.625C6.12132 8.625 6.625 8.12132 6.625 7.5C6.625 6.87868 6.12132 6.375 5.5 6.375C4.87868 6.375 4.375 6.87868 4.375 7.5C4.375 8.12132 4.87868 8.625 5.5 8.625ZM10.625 11.5C10.625 12.1213 10.1213 12.625 9.5 12.625C8.87868 12.625 8.375 12.1213 8.375 11.5C8.375 10.8787 8.87868 10.375 9.5 10.375C10.1213 10.375 10.625 10.8787 10.625 11.5ZM5.5 12.625C6.12132 12.625 6.625 12.1213 6.625 11.5C6.625 10.8787 6.12132 10.375 5.5 10.375C4.87868 10.375 4.375 10.8787 4.375 11.5C4.375 12.1213 4.87868 12.625 5.5 12.625Z" fill="currentColor"></path>
        </svg>
      </div>

      <div class="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden shrink-0 bg-primary/10 df-music-cover-wrap" id="dfMusicCoverWrap" title="Mở danh sách phát">
        <img id="dfMusicCoverImg" alt="Luân hồi không cơ sở: linh hồn 🐱" class="w-full h-full object-cover df-music-cover-img" src="https://s3.oss.hengj.cn/one/autoup/e0abf1b2-75ac-4e49-baa2-58778be5c656/20251027/Fv9Vsu/%E6%97%A0%E5%9F%BA%E8%BD%AC%E7%94%9F%EF%BC%9Aspiral.webp">
      </div>

      <div class="flex items-center gap-4 whitespace-nowrap df-music-meta-group">
        <div class="w-16 shrink-0 df-music-meta-wrap">
          <div class="overflow-hidden text-sm font-medium df-music-title-container">
            <span id="dfMusicTitleMarquee" class="inline-block whitespace-nowrap animate-[marquee_8s_linear_infinite] df-music-marquee" style="padding-right: 2rem;">
              <font dir="auto" style="vertical-align: inherit;">Luân hồi không cơ sở: linh hồn 🐱</font>
              <span style="padding-left: 2rem;">
                <font dir="auto" style="vertical-align: inherit;">Luân hồi không cơ sở: linh hồn 🐱</font>
              </span>
            </span>
          </div>
          <div id="dfMusicArtist" class="text-xs text-muted-foreground truncate df-music-artist">
            <font dir="auto" style="vertical-align: inherit;">Tôi tên là Xiaobai Li</font>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0 df-music-controls">
          <button id="dfMusicBtnPrev" class="p-1.5 hover:bg-white/10 rounded-full df-music-btn" aria-label="Bài trước" title="Bài trước">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M170.7 256L448 448V64L170.7 256zM64 64h64v384H64z"></path>
            </svg>
          </button>
          <button id="dfMusicBtnPlay" class="p-1.5 hover:bg-white/10 rounded-full df-music-btn df-music-btn-play" aria-label="Phát / Dừng" title="Phát / Dừng">
            <svg id="dfMusicPlayIcon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M96 52v408l320-204L96 52z"></path>
            </svg>
          </button>
          <button id="dfMusicBtnNext" class="p-1.5 hover:bg-white/10 rounded-full df-music-btn" aria-label="Bài kế tiếp" title="Bài kế tiếp">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M64 64v384l277.3-192L64 64zM384 64h64v384h-64z"></path>
            </svg>
          </button>
        </div>

        <button id="dfMusicBtnExpand" class="p-1.5 hover:bg-white/10 rounded-full shrink-0 df-music-btn-expand" aria-label="Danh sách bài hát" title="Danh sách nhạc / Thu gọn">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 9l3 3l-3 3"></path>
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0z"></path>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    // 6. Mount Quick Playlist Drawer
    mountDrawer();

    // Attach Event Listeners
    setupInteractions(overlay);
  }

  // Quick Drawer Structure
  function mountDrawer() {
    if (document.getElementById('dfMusicDrawer')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'dfMusicDrawerBackdrop';
    backdrop.className = 'df-music-drawer-backdrop';

    const drawer = document.createElement('div');
    drawer.id = 'dfMusicDrawer';
    drawer.className = 'df-music-drawer';
    drawer.innerHTML = `
      <div class="df-music-drawer-header">
        <div class="df-music-drawer-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          <span>DANH SÁCH NHẠC CHUỘT</span>
        </div>
        <div class="df-music-drawer-actions">
          <a href="music.html" class="df-music-drawer-link" title="Mở trang Nhạc chuột đầy đủ">Trang đầy đủ ↗</a>
          <button class="df-music-drawer-close" id="dfMusicDrawerClose" aria-label="Đóng">✕</button>
        </div>
      </div>
      <div class="df-music-drawer-tabs" id="dfMusicDrawerTabs"></div>
      <div class="df-music-drawer-list" id="dfMusicDrawerList"></div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    backdrop.addEventListener('click', closeDrawer);
    document.getElementById('dfMusicDrawerClose').addEventListener('click', closeDrawer);
  }

  function openDrawer() {
    isDrawerOpen = true;
    const drawer = document.getElementById('dfMusicDrawer');
    const backdrop = document.getElementById('dfMusicDrawerBackdrop');
    if (!drawer || !backdrop) return;

    // Position drawer neatly above or next to overlay
    const overlay = document.getElementById('dfMusicOverlay');
    if (overlay) {
      const rect = overlay.getBoundingClientRect();
      const drawerW = 340;
      const drawerH = 440;

      let left = rect.left;
      if (left + drawerW > window.innerWidth - 16) {
        left = window.innerWidth - drawerW - 16;
      }
      if (left < 16) left = 16;

      let top = rect.top - drawerH - 12;
      if (top < 16) {
        // place below overlay if no space above
        top = rect.bottom + 12;
      }
      if (top + drawerH > window.innerHeight - 16) {
        top = window.innerHeight - drawerH - 16;
      }

      drawer.style.left = `${left}px`;
      drawer.style.top = `${top}px`;
    }

    renderDrawerTabs();
    renderDrawerList();

    backdrop.classList.add('is-open');
    drawer.classList.add('is-open');
  }

  function closeDrawer() {
    isDrawerOpen = false;
    const drawer = document.getElementById('dfMusicDrawer');
    const backdrop = document.getElementById('dfMusicDrawerBackdrop');
    if (drawer) drawer.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
  }

  function renderDrawerTabs() {
    const tabsContainer = document.getElementById('dfMusicDrawerTabs');
    if (!tabsContainer || !playlists.length) return;

    tabsContainer.innerHTML = playlists.map((p, idx) => {
      const activeClass = idx === currentPlaylistIdx ? ' is-active' : '';
      const name = p.name_vi || p.name;
      return `<button class="df-music-drawer-tab${activeClass}" data-pidx="${idx}">${name} (${p.songs ? p.songs.length : 0})</button>`;
    }).join('');

    tabsContainer.querySelectorAll('.df-music-drawer-tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pidx = parseInt(e.currentTarget.getAttribute('data-pidx'), 10);
        if (!isNaN(pidx)) {
          currentPlaylistIdx = pidx;
          renderDrawerTabs();
          renderDrawerList();
        }
      });
    });
  }

  function renderDrawerList() {
    const listContainer = document.getElementById('dfMusicDrawerList');
    if (!listContainer) return;
    const p = playlists[currentPlaylistIdx];
    if (!p || !p.songs || !p.songs.length) {
      listContainer.innerHTML = '<div style="padding:1rem;text-align:center;color:#94a3b8;font-size:0.8rem;">Đang tải danh sách bài hát...</div>';
      return;
    }

    listContainer.innerHTML = p.songs.slice(0, 50).map((s, idx) => {
      const isCur = idx === currentSongIdx;
      const activeClass = isCur ? ' is-active' : '';
      const title = s.title_vi || s.title;
      const artist = s.artist_vi || s.artist;
      return `
        <div class="df-music-drawer-item${activeClass}" data-sidx="${idx}">
          <div class="df-music-drawer-item-thumb">
            <img src="${s.cover || 'assets/dfvn-cloud-cat.png'}" alt="" loading="lazy">
          </div>
          <div class="df-music-drawer-item-info">
            <div class="df-music-drawer-item-title">${title}</div>
            <div class="df-music-drawer-item-sub">${artist}</div>
          </div>
          ${isCur && isPlaying ? '<div class="df-music-wave"><span></span><span></span><span></span></div>' : ''}
        </div>
      `;
    }).join('');

    listContainer.querySelectorAll('.df-music-drawer-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const sidx = parseInt(e.currentTarget.getAttribute('data-sidx'), 10);
        if (!isNaN(sidx)) {
          playSong(currentPlaylistIdx, sidx, true);
          renderDrawerList();
        }
      });
    });
  }

  // 7. Setup Dragging and Controls Interactions
  function setupInteractions(overlay) {
    const dragHandle = document.getElementById('dfMusicDragHandle');
    const btnPlay = document.getElementById('dfMusicBtnPlay');
    const btnPrev = document.getElementById('dfMusicBtnPrev');
    const btnNext = document.getElementById('dfMusicBtnNext');
    const btnExpand = document.getElementById('dfMusicBtnExpand');
    const coverWrap = document.getElementById('dfMusicCoverWrap');

    btnPlay.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });

    btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      playPrev();
    });

    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      playNext();
    });

    btnExpand.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isDrawerOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    coverWrap.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isDrawerOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // DRAG LOGIC (Smooth mouse & touch dragging)
    function onDragStart(clientX, clientY) {
      isDragging = true;
      overlay.classList.add('is-dragging');
      const rect = overlay.getBoundingClientRect();
      dragOffset.x = clientX - rect.left;
      dragOffset.y = clientY - rect.top;
    }

    function onDragMove(clientX, clientY) {
      if (!isDragging) return;
      const w = overlay.offsetWidth;
      const h = overlay.offsetHeight;
      const winW = window.innerWidth;
      const winH = window.innerHeight;

      let newX = clientX - dragOffset.x;
      let newY = clientY - dragOffset.y;

      // Clamping within window boundaries
      newX = Math.max(8, Math.min(newX, winW - w - 8));
      newY = Math.max(8, Math.min(newY, winH - h - 8));

      overlay.style.left = `${newX}px`;
      overlay.style.top = `${newY}px`;
      currentPosition = { x: newX, y: newY };
    }

    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      overlay.classList.remove('is-dragging');
      if (currentPosition) {
        try {
          localStorage.setItem(STORAGE_KEY_POS, JSON.stringify(currentPosition));
        } catch (e) {}
      }
    }

    // Mouse events
    dragHandle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      onDragStart(e.clientX, e.clientY);

      const moveHandler = (ev) => onDragMove(ev.clientX, ev.clientY);
      const upHandler = () => {
        onDragEnd();
        window.removeEventListener('mousemove', moveHandler);
        window.removeEventListener('mouseup', upHandler);
      };
      window.addEventListener('mousemove', moveHandler);
      window.addEventListener('mouseup', upHandler);
    });

    // Touch events for mobile
    dragHandle.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        onDragStart(touch.clientX, touch.clientY);
      }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const touch = e.touches[0];
        onDragMove(touch.clientX, touch.clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (isDragging) onDragEnd();
    });

    // Window resize handler: keep within view
    window.addEventListener('resize', () => {
      if (!currentPosition) return;
      const w = overlay.offsetWidth;
      const h = overlay.offsetHeight;
      const winW = window.innerWidth;
      const winH = window.innerHeight;

      let clampedX = Math.max(8, Math.min(currentPosition.x, winW - w - 8));
      let clampedY = Math.max(8, Math.min(currentPosition.y, winH - h - 8));
      overlay.style.left = `${clampedX}px`;
      overlay.style.top = `${clampedY}px`;
      currentPosition = { x: clampedX, y: clampedY };
    });
  }

  // 8. Update UI State in Floating Overlay
  function updateUI() {
    const overlay = document.getElementById('dfMusicOverlay');
    if (!overlay) return;

    const song = getCurrentSong();
    if (!song) return;

    const title = song.title_vi || song.title || 'Nhạc chuột';
    const artist = song.artist_vi || song.artist || 'Delta Force';
    const cover = song.cover || 'assets/dfvn-cloud-cat.png';

    // Play/Pause State
    if (isPlaying) {
      overlay.classList.add('is-playing');
      overlay.classList.remove('is-paused');
      const icon = document.getElementById('dfMusicPlayIcon');
      if (icon) {
        // Pause SVG (512x512)
        icon.innerHTML = '<path d="M96 64h96v384H96zM320 64h96v384h-96z"></path>';
      }
    } else {
      overlay.classList.remove('is-playing');
      overlay.classList.add('is-paused');
      const icon = document.getElementById('dfMusicPlayIcon');
      if (icon) {
        // Play SVG (512x512)
        icon.innerHTML = '<path d="M96 52v408l320-204L96 52z"></path>';
      }
    }

    // Cover image
    const coverImg = document.getElementById('dfMusicCoverImg');
    if (coverImg && coverImg.src !== cover) {
      coverImg.src = cover;
      coverImg.alt = title;
    }

    // Title Marquee
    const marquee = document.getElementById('dfMusicTitleMarquee');
    if (marquee) {
      marquee.innerHTML = `
        <font dir="auto" style="vertical-align: inherit;">${title}</font>
        <span style="padding-left: 2.5rem;">
          <font dir="auto" style="vertical-align: inherit;">${title}</font>
        </span>
      `;
    }

    // Artist
    const artistElem = document.getElementById('dfMusicArtist');
    if (artistElem) {
      artistElem.innerHTML = `<font dir="auto" style="vertical-align: inherit;">${artist}</font>`;
    }
  }

  // Public API exposed on window.DFMusic
  window.DFMusic = {
    init: mountOverlay,
    playSong,
    togglePlay,
    playNext,
    playPrev,
    getCurrentSong,
    getPlaylists: () => playlists,
    getCurrentPlaylistIndex: () => currentPlaylistIdx,
    getCurrentSongIndex: () => currentSongIdx,
    isPlaying: () => isPlaying,
    openDrawer,
    closeDrawer,
    getAudio: () => audioElement,
    resolveSongUrl
  };

  // Auto initialize on DOMContentLoaded or load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAudio();
      mountOverlay();
      loadPlaylists();
    });
  } else {
    initAudio();
    mountOverlay();
    loadPlaylists();
  }

})();
