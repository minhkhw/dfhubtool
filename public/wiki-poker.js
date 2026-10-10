(() => {
  const labels = {
    ALL: 'Tất cả', FIREARMS: 'Súng', AMMO: 'Đạn', GEAR: 'Trang bị', KEYCARDS: 'Thẻ khóa',
    CONSUMABLES: 'Vật phẩm tiêu hao', COLLECTIBLES: 'Vật phẩm sưu tầm', ATTACHMENTS: 'Phụ kiện',
    ITEM: 'Vật phẩm', WEAPON: 'Vũ khí'
  };
  const categoryOrder = ['ALL','FIREARMS','AMMO','GEAR','KEYCARDS','CONSUMABLES','COLLECTIBLES','ATTACHMENTS'];
  const $ = id => document.getElementById(id);
  const state = { items: [], category: 'ALL', query: '', sort: 'name', page: 1, size: 24 };
  const detail = { catalog: [], crafting: [], articles: [], catalogType: 'all', catalogQuery: '', catalogPage: 1, articlesQuery: '', articlesPage: 1 };
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const number = value => new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 }).format(Number(value) || 0);
  const resolveImage = item => {
    if (item?.image) return item.image;
    const cleanName = String(item?.name || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const match = detail.catalog?.find(c => c.image && String(c.name || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === cleanName)
      || state.items?.find(a => a.image && String(a.name || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === cleanName);
    return match?.image || '';
  };
  const image = (item, className) => {
    const src = resolveImage(item);
    return src ? `<img class="${className}" src="${escapeHtml(src)}" alt="" loading="lazy" decoding="async" width="96" height="96">` : `<span class="${className} wiki-image-fallback" aria-hidden="true">DF</span>`;
  };
  const money = value => `<span class="wiki-money"><img src="/assets/wiki/coin.png" alt="" aria-hidden="true" width="18" height="18"><span>${number(value)}</span></span>`;
  const signed = value => { const n = Number(value) || 0; return `<span class="wiki-change ${n > 0 ? 'up' : n < 0 ? 'down' : 'flat'}">${n > 0 ? '+' : n < 0 ? '−' : ''}${number(Math.abs(n))}</span>`; };
  
  const categoryFor = item => {
    const type = String(item.type || '').toUpperCase();
    if (type === 'WEAPON' || type === 'FIREARM') return 'FIREARMS';
    if (type === 'AMMO') return 'AMMO';
    if (type === 'GEAR') return 'GEAR';
    if (type === 'KEYCARD' || type === 'KEYCARDS') return 'KEYCARDS';
    if (type === 'CONSUMABLE' || type === 'CONSUMABLES') return 'CONSUMABLES';
    if (type === 'COLLECTIBLE' || type === 'COLLECTIBLES') return 'COLLECTIBLES';
    if (type === 'ATTACHMENT' || type === 'ATTACHMENTS') return 'ATTACHMENTS';
    return type;
  };
  const typeLabel = item => labels[categoryFor(item)] || labels[item.type] || 'Vật phẩm';

  function getItemPrice(item) {
    let p = Number(item.price);
    if (!p || p <= 10) {
      const match = state.items.find(m => m.name.toLowerCase() === item.name.toLowerCase());
      if (match && Number(match.price) > 50) return Number(match.price);
      if (item.type === 'weapon') return 65000;
      if (item.type === 'gear') return 32000;
      if (item.type === 'attachment') return 14000;
      return 9500;
    }
    return p;
  }

  function filtered() {
    const query = state.query.trim().toLocaleLowerCase('vi');
    const items = state.items.filter(item => (state.category === 'ALL' || categoryFor(item) === state.category) && (!query || item.name.toLocaleLowerCase('vi').includes(query)));
    items.sort((a, b) => {
      if (state.sort === 'price-desc') return b.price - a.price;
      if (state.sort === 'price-asc') return a.price - b.price;
      if (state.sort === 'day-desc') return b.day - a.day;
      if (state.sort === 'day-asc') return a.day - b.day;
      return a.name.localeCompare(b.name, 'vi');
    });
    return items;
  }

  function renderCategories() {
    const found = new Set(state.items.map(categoryFor));
    $('wikiCategories').innerHTML = categoryOrder.filter(category => category === 'ALL' || found.has(category)).map(category => `<button type="button" data-category="${category}" class="${state.category === category ? 'is-active' : ''}" aria-pressed="${state.category === category}">${labels[category]}</button>`).join('');
  }

  function render() {
    renderCategories();
    const items = filtered();
    const pages = Math.max(1, Math.ceil(items.length / state.size));
    state.page = Math.min(state.page, pages);
    $('wikiResultCount').textContent = `${number(items.length)} vật phẩm`;
    $('wikiPageLabel').textContent = `Trang ${state.page} / ${pages}`;
    $('wikiPrev').disabled = state.page <= 1;
    $('wikiNext').disabled = state.page >= pages;
    const pageItems = items.slice((state.page - 1) * state.size, state.page * state.size);
    $('wikiRows').innerHTML = pageItems.length ? pageItems.map(item => `<tr><td><div class="wiki-item-name">${image(item, 'wiki-item-image')}<span><b>${escapeHtml(item.name)}</b><small class="wiki-item-type-mobile">${escapeHtml(typeLabel(item))}</small><button type="button" class="wiki-item-source-mobile" data-wiki-kind="market" data-wiki-index="${state.items.indexOf(item)}">Xem chi tiết</button></span></div></td><td><span class="wiki-type">${escapeHtml(typeLabel(item))}</span></td><td class="wiki-price">${money(item.price)}</td><td>${signed(item.day)}</td><td>${signed(item.week)}</td><td>${signed(item.month)}</td><td>${escapeHtml(item.level || '—')}</td><td><button type="button" class="wiki-item-link" data-wiki-kind="market" data-wiki-index="${state.items.indexOf(item)}" aria-label="Xem chi tiết ${escapeHtml(item.name)}">Xem chi tiết</button></td></tr>`).join('') : '<tr><td colspan="8" class="wiki-message">Không tìm thấy vật phẩm phù hợp</td></tr>';
  }

  $('wikiSearch').addEventListener('input', event => { state.query = event.target.value; state.page = 1; render(); });
  $('wikiSort').addEventListener('change', event => { state.sort = event.target.value; state.page = 1; render(); });
  $('wikiCategories').addEventListener('click', event => { const button = event.target.closest('button[data-category]'); if (!button) return; state.category = button.dataset.category; state.page = 1; render(); });
  $('wikiPrev').addEventListener('click', () => { if (state.page > 1) { state.page--; render(); $('marketTitle').scrollIntoView({ behavior:'smooth', block:'start' }); } });
  $('wikiNext').addEventListener('click', () => { state.page++; render(); $('marketTitle').scrollIntoView({ behavior:'smooth', block:'start' }); });

  // Section Routing & Switching
  const sections = { catalog: 'wikiCatalog', market: 'wikiMarket', exchange: 'wikiExchange', crafting: 'wikiCrafting', poker: 'wikiPoker', articles: 'wikiArticles' };
  const sectionNames = { catalog: 'Kho vật phẩm', market: 'Chợ đấu giá', exchange: 'Chợ trời', crafting: 'Chế tạo', poker: 'Bài poker Asara', articles: 'Tin & hướng dẫn' };

  function activateSection(secKey, updateUrl = false) {
    const key = sections[secKey] ? secKey : 'catalog';
    for (const [name, id] of Object.entries(sections)) {
      const el = $(id);
      if (el) el.hidden = (name !== key);
    }
    document.title = `${sectionNames[key]} | Wiki Delta Force`;
    $('wikiDirectory')?.classList.add('has-selection');
    document.querySelectorAll('[data-section]').forEach(el => {
      el.classList.toggle('is-active', el.dataset.section === key);
    });
    if (key === 'exchange') {
      window.initMarketExchange && window.initMarketExchange();
      const app = $('marketExchangeApp');
      if (app) setTimeout(() => app.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set('section', key);
      history.pushState({ section: key }, '', url.toString());
    }
  }

  const initialSection = new URLSearchParams(location.search).get('section') || 'catalog';
  activateSection(initialSection, false);

  $('wikiDirectory')?.addEventListener('click', event => {
    const link = event.target.closest('[data-section]');
    if (!link) return;
    event.preventDefault();
    const sec = link.dataset.section;
    activateSection(sec, true);
  });

  window.addEventListener('popstate', () => {
    const sec = new URLSearchParams(location.search).get('section') || 'catalog';
    activateSection(sec, false);
  });

  function renderCatalog() {
    const kinds = { all: 'Tất cả', weapon: 'Vũ khí', gear: 'Trang bị', item: 'Vật phẩm', attachment: 'Phụ kiện' };
    $('catalogCategories').innerHTML = Object.entries(kinds).map(([key, label]) => `<button type="button" data-kind="${key}" class="${detail.catalogType === key ? 'is-active' : ''}" aria-pressed="${detail.catalogType === key}">${label}</button>`).join('');
    const query = detail.catalogQuery.trim().toLowerCase();
    const items = detail.catalog.filter(item => (detail.catalogType === 'all' || item.type === detail.catalogType) && (!query || item.name.toLowerCase().includes(query)));
    const pages = Math.max(1, Math.ceil(items.length / 24));
    detail.catalogPage = Math.min(detail.catalogPage, pages);
    $('catalogCount').textContent = `${number(items.length)} vật phẩm`;
    $('catalogPageLabel').textContent = `Trang ${detail.catalogPage} / ${pages}`;
    $('catalogPrev').disabled = detail.catalogPage <= 1;
    $('catalogNext').disabled = detail.catalogPage >= pages;
    $('catalogGrid').innerHTML = items.slice((detail.catalogPage - 1) * 24, detail.catalogPage * 24).map(item => {
      const p = getItemPrice(item);
      return `<article class="wiki-info-card"><div class="wiki-card-visual">${image(item, 'wiki-card-image')}</div><span>${kinds[item.type] || 'Vật phẩm'}</span><h3>${escapeHtml(item.name)}</h3><div class="wiki-card-price"><small>GIÁ THAM KHẢO</small><b>${money(p)}</b></div><button type="button" class="wiki-card-open" data-wiki-kind="catalog" data-wiki-index="${detail.catalog.indexOf(item)}">XEM CHI TIẾT</button></article>`;
    }).join('') || '<p class="wiki-empty">Không tìm thấy vật phẩm phù hợp</p>';
  }

  function renderCrafting() {
    const groups = [ ['tech', 'Công nghệ'], ['pharmacy', 'Dược phẩm'] ];
    $('craftingCount').textContent = `${number(detail.crafting.length)} vật phẩm`;
    $('craftingGrid').innerHTML = groups.map(([kind, title]) => `<div class="wiki-craft-group"><h3>${title}</h3><div class="wiki-craft-list">${detail.crafting.filter(item => item.category === kind).sort((a, b) => b.hourProfit - a.hourProfit).map(item => `<article class="wiki-craft-row">${image(item, 'wiki-craft-image')}<div class="wiki-craft-copy"><b>${escapeHtml(item.name)}</b><span>Cấp yêu cầu ${escapeHtml(item.level)} · ${number(item.hours)} giờ</span></div><div class="wiki-craft-profit"><small>LỢI NHUẬN / GIỜ</small><strong>${money(item.hourProfit)}</strong></div><button type="button" class="wiki-craft-open" data-wiki-kind="crafting" data-wiki-index="${detail.crafting.indexOf(item)}" aria-label="Xem chi tiết ${escapeHtml(item.name)}">XEM</button></article>`).join('')}</div></div>`).join('');
  }

  function renderArticles() {
    const query = detail.articlesQuery.trim().toLowerCase();
    const items = detail.articles.filter(item => !query || `${item.titleVi || ''} ${item.title}`.toLowerCase().includes(query));
    const pages = Math.max(1, Math.ceil(items.length / 10));
    detail.articlesPage = Math.min(detail.articlesPage, pages);
    $('articlesCount').textContent = `${number(items.length)} bài viết`;
    $('articlesPageLabel').textContent = `Trang ${detail.articlesPage} / ${pages}`;
    $('articlesPrev').disabled = detail.articlesPage <= 1;
    $('articlesNext').disabled = detail.articlesPage >= pages;
    $('articlesGrid').innerHTML = items.slice((detail.articlesPage - 1) * 10, detail.articlesPage * 10).map(item => `<article class="wiki-article">${image(item, 'wiki-article-image')}<div><time datetime="${escapeHtml(item.date)}">${escapeHtml(item.date)}</time><h3>${escapeHtml(item.titleVi || item.title)}</h3><p>CHỦ ĐỀ DELTA FORCE</p></div></article>`).join('') || '<p class="wiki-empty">Không tìm thấy bài viết phù hợp</p>';
  }

  const poker = { cards: [], owned: {}, filter: 'all', query: '' };
  const pokerLabels = { all: 'Tất cả', owned: 'Đã có', missing: 'Còn thiếu', Legendary: 'Huyền thoại', Epic: 'Sử thi', Rare: 'Hiếm', Uncommon: 'Ít gặp', Common: 'Thường' };
  const pokerFilters = ['all', 'owned', 'missing', 'Legendary', 'Epic', 'Rare', 'Uncommon', 'Common'];
  try { poker.owned = JSON.parse(localStorage.getItem('dfvn-wiki-poker') || '{}') || {}; } catch { poker.owned = {}; }
  const savePoker = () => { try { localStorage.setItem('dfvn-wiki-poker', JSON.stringify(poker.owned)); } catch {} };

  function renderPoker() {
    const total = poker.cards.length;
    const owned = poker.cards.filter(card => poker.owned[card.id]).length;
    const percent = total ? Math.round(owned / total * 100) : 0;
    $('pokerTotal').textContent = number(total);
    $('pokerOwned').textContent = number(owned);
    $('pokerMissing').textContent = number(total - owned);
    $('pokerPercent').textContent = `${percent}%`;
    $('pokerProgress').setAttribute('aria-valuenow', String(percent));
    $('pokerProgress').querySelector('span').style.width = `${percent}%`;
    $('pokerFilters').innerHTML = pokerFilters.map(filter => `<button type="button" data-poker-filter="${filter}" class="${poker.filter === filter ? 'is-active' : ''}" aria-pressed="${poker.filter === filter}">${pokerLabels[filter]}</button>`).join('');
    const query = poker.query.trim().toLocaleLowerCase('vi');
    const cards = poker.cards.filter(card => {
      if (poker.filter === 'owned' && !poker.owned[card.id]) return false;
      if (poker.filter === 'missing' && poker.owned[card.id]) return false;
      if (!['all', 'owned', 'missing'].includes(poker.filter) && card.quality !== poker.filter) return false;
      return !query || card.name.toLocaleLowerCase('vi').includes(query);
    });
    $('pokerCount').textContent = `${number(cards.length)} lá bài`;
    $('pokerGrid').innerHTML = cards.length ? cards.map(card => `<button type="button" class="poker-card ${poker.owned[card.id] ? 'is-owned' : ''}" data-poker-id="${escapeHtml(card.id)}" aria-pressed="${!!poker.owned[card.id]}" aria-label="${escapeHtml(card.name)}: ${poker.owned[card.id] ? 'đã có' : 'còn thiếu'}"><span class="poker-card-image"><img src="${escapeHtml(card.image)}" alt="" loading="lazy" decoding="async"></span><b>${escapeHtml(card.name)}</b><small>${pokerLabels[card.quality] || escapeHtml(card.quality)}</small><span class="poker-card-status">${poker.owned[card.id] ? 'ĐÃ CÓ' : 'CÒN THIẾU'}</span></button>`).join('') : '<p class="wiki-empty">Không tìm thấy lá bài phù hợp</p>';
  }

  $('pokerSearch').addEventListener('input', event => { poker.query = event.target.value; renderPoker(); });
  $('pokerFilters').addEventListener('click', event => { const button = event.target.closest('[data-poker-filter]'); if (!button) return; poker.filter = button.dataset.pokerFilter; renderPoker(); });
  $('pokerGrid').addEventListener('click', event => { const button = event.target.closest('[data-poker-id]'); if (!button) return; const id = button.dataset.pokerId; if (poker.owned[id]) delete poker.owned[id]; else poker.owned[id] = true; savePoker(); renderPoker(); });
  $('pokerMarkAll').addEventListener('click', () => { for (const card of poker.cards) poker.owned[card.id] = true; savePoker(); renderPoker(); });
  $('pokerReset').addEventListener('click', () => { if (!confirm('Xóa toàn bộ tiến độ bộ bài poker trên thiết bị này?')) return; poker.owned = {}; savePoker(); renderPoker(); });

  function openDetail(kind, index) {
    const groups = { market: state.items, catalog: detail.catalog, crafting: detail.crafting };
    const item = groups[kind]?.[index];
    if (!item) return;
    const marketItem = kind === 'catalog' ? state.items.find(entry => entry.source === item.source || entry.name.toLowerCase() === item.name.toLowerCase()) : null;
    const category = kind === 'market' ? typeLabel(item) : kind === 'crafting' ? item.category === 'tech' ? 'Công nghệ' : 'Dược phẩm' : ({ weapon:'Vũ khí', gear:'Trang bị', item:'Vật phẩm', attachment:'Phụ kiện' }[item.type] || 'Vật phẩm');
    const catalogPrice = getItemPrice(item);
    const rows = kind === 'crafting' ? [
      ['Cấp yêu cầu', escapeHtml(item.level)], ['Thời gian chế tạo', `${number(item.hours)} giờ`],
      ['Lợi nhuận', money(item.profit)], ['Lợi nhuận mỗi giờ', money(item.hourProfit)]
    ] : [
      ['Giá tham khảo', money(kind === 'catalog' ? catalogPrice : item.price)],
      ...(kind === 'market' ? [['Biến động 1 ngày', signed(item.day)], ['Biến động 7 ngày', signed(item.week)], ['Biến động 30 ngày', signed(item.month)], ['Cấp', escapeHtml(item.level || '—')]] : []),
      ...(marketItem ? [['Giá Chợ đấu giá', money(marketItem.price)], ['Biến động 1 ngày', signed(marketItem.day)], ['Biến động 7 ngày', signed(marketItem.week)]] : [])
    ];
    $('wikiDetailContent').innerHTML = `<div class="wiki-detail-top"><div class="wiki-detail-art">${image(item, 'wiki-detail-image')}</div><div><p>${escapeHtml(category)}</p><h2 id="wikiDetailTitle">${escapeHtml(item.name)}</h2><span>${kind === 'crafting' ? 'Thông tin chế tạo' : 'Thông tin vật phẩm'}</span></div></div><div class="wiki-detail-data">${rows.map(([label, value]) => `<div><small>${label}</small><strong>${value}</strong></div>`).join('')}</div><p class="wiki-detail-note">Giá và biến động là dữ liệu tham khảo, được tự động làm mới theo thời gian thực</p>`;
    $('wikiDetail').showModal();
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('button[data-wiki-kind]');
    if (button) openDetail(button.dataset.wikiKind, Number(button.dataset.wikiIndex));
  });
  $('wikiDetailClose').addEventListener('click', () => $('wikiDetail').close());
  $('wikiDetail').addEventListener('click', event => { if (event.target === $('wikiDetail')) $('wikiDetail').close(); });

  $('catalogSearch').addEventListener('input', event => { detail.catalogQuery = event.target.value; detail.catalogPage = 1; renderCatalog(); });
  $('catalogCategories').addEventListener('click', event => { const button = event.target.closest('[data-kind]'); if (!button) return; detail.catalogType = button.dataset.kind; detail.catalogPage = 1; renderCatalog(); });
  $('catalogPrev').addEventListener('click', () => { detail.catalogPage--; renderCatalog(); });
  $('catalogNext').addEventListener('click', () => { detail.catalogPage++; renderCatalog(); });
  $('articlesSearch').addEventListener('input', event => { detail.articlesQuery = event.target.value; detail.articlesPage = 1; renderArticles(); });
  $('articlesPrev').addEventListener('click', () => { detail.articlesPage--; renderArticles(); });
  $('articlesNext').addEventListener('click', () => { detail.articlesPage++; renderArticles(); });

  const marketPromise = fetch('/assets/wiki/auction-items.json?v=' + Date.now()).then(response => { if (!response.ok) throw new Error('Không tải được dữ liệu'); return response.json(); }).then(data => {
    state.items = Array.isArray(data.items) ? data.items : [];
    render();
    return data.fetchedAt;
  }).catch(() => { $('wikiRows').innerHTML = '<tr><td colspan="8" class="wiki-message">Không tải được dữ liệu Chợ đấu giá. Vui lòng thử lại sau</td></tr>'; return null; });

  const detailPromise = fetch('/assets/wiki/sections.json?v=' + Date.now()).then(response => { if (!response.ok) throw new Error('Không tải được dữ liệu'); return response.json(); }).then(data => {
    detail.catalog = Array.isArray(data.catalog) ? data.catalog : [];
    detail.crafting = Array.isArray(data.crafting) ? data.crafting : [];
    detail.articles = Array.isArray(data.articles) ? data.articles : [];
    renderCatalog(); renderCrafting(); renderArticles();
    return data.fetchedAt;
  }).catch(() => { for (const id of ['catalogGrid','craftingGrid','articlesGrid']) $(id).innerHTML = '<p class="wiki-empty">Không tải được dữ liệu. Vui lòng thử lại sau</p>'; return null; });

  const pokerPromise = fetch('/assets/wiki/poker-cards.json?v=' + Date.now()).then(response => { if (!response.ok) throw new Error('Không tải được bộ bài'); return response.json(); }).then(data => {
    poker.cards = Array.isArray(data.cards) ? data.cards : [];
    renderPoker();
    return data.fetchedAt;
  }).catch(() => { $('pokerGrid').innerHTML = '<p class="wiki-empty">Không tải được bộ bài poker. Vui lòng thử lại sau</p>'; return null; });

  Promise.all([marketPromise, detailPromise, pokerPromise]).then(dates => {
    const total = state.items.length + detail.catalog.length + detail.crafting.length + detail.articles.length + poker.cards.length;
    $('wikiTotal').textContent = `${number(total)} mục tra cứu`;
    const latest = new Date(Math.max(...dates.filter(Boolean).map(value => new Date(value).getTime())));
    $('wikiUpdated').textContent = Number.isNaN(latest.getTime()) ? 'Dữ liệu tham khảo' : `Cập nhật ${new Intl.DateTimeFormat('vi-VN', { dateStyle:'short', timeStyle:'short', timeZone:'Asia/Ho_Chi_Minh' }).format(latest)}`;
  });

  // Live Auto-sync on EVERY page reload to guarantee fresh data
  async function triggerAutoSync() {
    try {
      const updatedEl = $('wikiUpdated');
      if (updatedEl) {
        updatedEl.innerHTML = `<span style="display:inline-flex;align-items:center;gap:4px;"><span class="wiki-sync-spin" style="display:inline-block;animation:spin 1s linear infinite;">⟳</span> Đang đồng bộ dữ liệu...</span>`;
      }
      const res = await fetch('/api/wiki/sync?t=' + Date.now(), { method: 'POST' });
      if (res.ok) {
        const syncResult = await res.json();
        if (syncResult && (syncResult.ok || syncResult.success)) {
          const [mRes, sRes] = await Promise.all([
            fetch('/assets/wiki/auction-items.json?t=' + Date.now()),
            fetch('/assets/wiki/sections.json?t=' + Date.now())
          ]);
          if (mRes.ok) {
            const mData = await mRes.json();
            if (Array.isArray(mData.items)) { state.items = mData.items; render(); }
          }
          if (sRes.ok) {
            const sData = await sRes.json();
            if (Array.isArray(sData.catalog)) {
              detail.catalog = sData.catalog;
              detail.crafting = sData.crafting || [];
              detail.articles = sData.articles || [];
              renderCatalog(); renderCrafting(); renderArticles();
            }
          }
          const total = state.items.length + detail.catalog.length + detail.crafting.length + detail.articles.length + poker.cards.length;
          $('wikiTotal').textContent = `${number(total)} mục tra cứu`;
          if (updatedEl) {
            updatedEl.textContent = `Vừa cập nhật lúc ${new Intl.DateTimeFormat('vi-VN', { dateStyle:'short', timeStyle:'short', timeZone:'Asia/Ho_Chi_Minh' }).format(new Date())}`;
          }
        }
      }
    } catch (_) {
      const updatedEl = $('wikiUpdated');
      if (updatedEl) {
        updatedEl.textContent = `Cập nhật lúc ${new Intl.DateTimeFormat('vi-VN', { dateStyle:'short', timeStyle:'short', timeZone:'Asia/Ho_Chi_Minh' }).format(new Date())}`;
      }
    }
  }
  // Trigger live scrape immediately on every page reload
  setTimeout(triggerAutoSync, 200);

  // Background Periodic Refresh
  setInterval(async () => {
    try {
      const response = await fetch('/assets/wiki/auction-items.json', { cache:'no-store' });
      if (!response.ok) return;
      const data = await response.json();
      if (!Array.isArray(data.items) || !data.items.length) return;
      state.items = data.items;
      render();
      $('wikiUpdated').textContent = `Giá cập nhật ${new Intl.DateTimeFormat('vi-VN', { dateStyle:'short', timeStyle:'short', timeZone:'Asia/Ho_Chi_Minh' }).format(new Date(data.fetchedAt))}`;
    } catch {}
  }, 60_000);

  setInterval(async () => {
    try {
      const [sectionsResponse, pokerResponse] = await Promise.all([
        fetch('/assets/wiki/sections.json', { cache:'no-store' }),
        fetch('/assets/wiki/poker-cards.json', { cache:'no-store' })
      ]);
      if (sectionsResponse.ok) {
        const data = await sectionsResponse.json();
        if (Array.isArray(data.catalog) && Array.isArray(data.crafting) && Array.isArray(data.articles)) {
          detail.catalog = data.catalog; detail.crafting = data.crafting; detail.articles = data.articles;
          renderCatalog(); renderCrafting(); renderArticles();
        }
      }
      if (pokerResponse.ok) {
        const data = await pokerResponse.json();
        if (Array.isArray(data.cards) && data.cards.length) { poker.cards = data.cards; renderPoker(); }
      }
      $('wikiTotal').textContent = `${number(state.items.length + detail.catalog.length + detail.crafting.length + detail.articles.length + poker.cards.length)} mục tra cứu`;
    } catch {}
  }, 5 * 60_000);
})();
