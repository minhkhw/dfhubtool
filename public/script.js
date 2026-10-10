function initPageTransition() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loaderMarkup = `<div class="pn-loader-stage"><img class="pn-loader-shield" src="assets/loader-shield.png?v=1" alt=""><img class="pn-loader-sword" src="assets/loader-sword.png?v=1" alt=""></div>`;
  const duration = reducedMotion ? 80 : 680;
  const skipEntryLoader = sessionStorage.getItem('pnSkipEntryLoader') === '1';
  sessionStorage.removeItem('pnSkipEntryLoader');
  if (!skipEntryLoader) {
    const loader = document.createElement('div');
    loader.className = 'pn-page-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = loaderMarkup;
    document.body.append(loader);
    const reveal = () => window.setTimeout(() => {
      loader.classList.add('is-complete');
      window.setTimeout(() => loader.remove(), reducedMotion ? 20 : 260);
    }, duration);
    if (document.readyState === 'complete') reveal();
    else window.addEventListener('load', reveal, { once: true });
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;
    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin || destination.href === window.location.href || destination.protocol === 'mailto:' || destination.protocol === 'tel:') return;
    event.preventDefault();
    sessionStorage.setItem('pnSkipEntryLoader', '1');
    const exitLoader = document.createElement('div');
    exitLoader.className = 'pn-page-loader pn-page-loader--exit';
    exitLoader.setAttribute('aria-hidden', 'true');
    exitLoader.innerHTML = loaderMarkup;
    document.body.append(exitLoader);
    requestAnimationFrame(() => exitLoader.classList.add('is-active'));
    window.setTimeout(() => { window.location.href = destination.href; }, reducedMotion ? 30 : 520);
  });
}

// Page transitions are intentionally disabled; navigation stays immediate.

document.querySelectorAll('a[href]').forEach(link => {
  const raw = link.getAttribute('href');
  if (!raw || /^(?:https?:|mailto:|tel:|#)/i.test(raw)) return;
  link.setAttribute('href', raw.replace(/^index\.html(?=([?#]|$))/, '/').replace(/\.html(?=([?#]|$))/, ''));
});

const discordMemberCount = document.querySelector('[data-discord-members]');
if (discordMemberCount) {
  const memberCard = discordMemberCount.closest('[data-discord-member-card]');
  fetch('/api/discord/members')
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(data => {
      const total = Number.isFinite(data.count) ? data.count : data.online;
      if (!Number.isFinite(total)) {
        discordMemberCount.textContent = '--';
        memberCard.title = data.configured ? 'Discord tạm thời chưa trả về số thành viên' : 'Chưa cấu hình Discord Guild ID';
        return;
      }
      discordMemberCount.textContent = total.toLocaleString('vi-VN');
      const kind = Number.isFinite(data.count) ? 'thành viên' : 'thành viên đang online';
      memberCard.title = `${data.name || 'Discord PieNoir'}: ${total.toLocaleString('vi-VN')} ${kind}`;
      memberCard.dataset.memberCountReady = 'true';
    })
    .catch(() => {
      discordMemberCount.textContent = '--';
      memberCard.title = 'Chưa thể tải số thành viên Discord';
    });
}

const homeCommunityMembers = document.getElementById('homeCommunityMembers');
const homeCommunityOnline = document.getElementById('homeCommunityOnline');
if (homeCommunityMembers && homeCommunityOnline) {
  const dashboard = homeCommunityMembers.closest('.hero-discord-dashboard');
  const promoBanner = document.querySelector('#home .promo-banner--copy');
  const promoActions = document.querySelector('#home .promo-actions--discord');
  const mobileStats = window.matchMedia('(max-width: 680px)');
  const placeDashboard = () => {
    if (!dashboard || !promoBanner || !promoActions) return;
    if (mobileStats.matches) promoBanner.append(dashboard);
    else promoActions.insertAdjacentElement('afterend', dashboard);
  };
  placeDashboard();
  mobileStats.addEventListener('change', placeDashboard);
  fetch('/api/community/discord', { cache: 'no-store' })
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(data => {
      const locale = document.documentElement.lang === 'en' ? 'en-US' : 'vi-VN';
      homeCommunityMembers.textContent = Number.isFinite(data.count) ? data.count.toLocaleString(locale) : '—';
      homeCommunityOnline.textContent = Number.isFinite(data.online) ? data.online.toLocaleString(locale) : '—';
      dashboard?.classList.add('is-ready');
    })
    .catch(() => {
      homeCommunityMembers.textContent = '—';
      homeCommunityOnline.textContent = '—';
    });
}

const headerBrandName = document.querySelector('.site-header .brand-name');
if (headerBrandName && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const finalName = headerBrandName.textContent.trim();
  const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const scrambleBrand = () => {
    let frame = 0;
    const timer = window.setInterval(() => {
      frame += 1;
      const revealed = Math.min(finalName.length, Math.floor(frame / 2.5));
      headerBrandName.textContent = [...finalName].map((letter, index) =>
        index < revealed ? letter : glyphs[Math.floor(Math.random() * glyphs.length)]
      ).join('');
      if (revealed >= finalName.length) {
        window.clearInterval(timer);
        headerBrandName.textContent = finalName;
      }
    }, 32);
  };
  headerBrandName.setAttribute('aria-label', finalName);
  if (document.readyState === 'complete') scrambleBrand();
  else window.addEventListener('load', scrambleBrand, { once: true });
}

const pills = document.querySelectorAll('.pill');
const cards = document.querySelectorAll('.product-card');
const categoryPanel = document.getElementById('categoryPanel');
const categoryToggle = document.querySelector('.category-toggle');
const closeCategory = document.querySelector('.close-category');
const dockItems = document.querySelectorAll('.dock-item');
const bottomDock = document.querySelector('.bottom-dock');
const routeLinks = (container, route) => container ? Array.from(container.querySelectorAll('a[href]')).filter(link => {
  const url = new URL(link.href, window.location.href);
  return url.origin === window.location.origin && url.pathname.replace(/\.html$/, '').replace(/\/$/, '') === route;
}) : [];


// Clean up bottomDock completely
if (bottomDock) {
  // Active dock tab syncing
if (bottomDock) {
  const currentPath = (window.location.pathname.replace(/\.html$/, '').split('/').pop() || 'index').toLowerCase();
  bottomDock.querySelectorAll('.dock-item').forEach(item => {
    const itemHref = (item.getAttribute('href') || '').replace(/\.html$/, '').split('/').pop().toLowerCase();
    if (itemHref === currentPath || (currentPath === 'index' && (itemHref === 'index' || itemHref === ''))) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

  bottomDock.querySelectorAll('.dock-redeem, a[href*="raffle"], a[href*="profile"], a[href*="admin"], a[href*="events"], a[href*="staff"], a[href*="creator"]').forEach(el => el.remove());
  // news link kept intact
}


const categoryLists = document.querySelectorAll('.category-list');
if (categoryLists.length) {
  const current = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  const activeRoute = current === '/index' ? '/' : current;
  const isMiniGameActive = activeRoute.includes('minigame') || activeRoute.includes('crate') || activeRoute.includes('morse') || activeRoute.includes('hacker') || activeRoute.includes('equipment') || window.location.search.includes('game=');
  const activeGame = new URLSearchParams(window.location.search).get('game') || 'crate';

  const items = [
    ['/', 'Trang chủ', 'M4 10.5 12 4l8 6.5V20h-6v-6h-4v6H4Z'],
    ['tools.html', 'Auto Redeem', 'M12 3.5 20.5 20h-17ZM12 11.2l3.8 6.8H8.2Z'],
    ['map.html', 'Bản đồ chiến thuật', 'm3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16'],
    ['weapons.html', 'Kho vũ khí', 'M3 8h11l2-2h5v5h-4l-2 2h-4v2H8v-2H5zM8 13v5m7-7v5'],
    ['news.html', 'Tin tức', 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h5'],
    ['wiki.html', 'Wiki tra cứu', 'M4 5.5c3-1.3 5.5-1.3 8 .2 2.5-1.5 5-1.5 8-.2v14c-3-1.2-5.5-1.2-8 .3-2.5-1.5-5-1.5-8-.3v-14ZM12 5.7v14.1'],
    ['music.html', 'Nhạc chuột', 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z']
  ];

  const standardHtml = items.map(([href, label, icon]) =>
    `<a href="${href}" class="category-item${activeRoute === href || (href === 'tools.html' && activeRoute === '/tools') || (href === 'music.html' && activeRoute === '/music') ? ' active' : ''}"><span class="icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icon}"/></svg></span><span class="text">${label}</span><span class="arrow">›</span></a>`
  ).join('');

  const miniGameHtml = `
    <div class="category-item-group">
      <button type="button" class="category-item category-item--parent expanded active" id="miniGameMenuBtn" aria-expanded="true" aria-controls="miniGameSubmenu">
        <span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="4"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15.5" cy="10.5" r="1" fill="currentColor"/><circle cx="17.5" cy="13.5" r="1" fill="currentColor"/></svg></span>
        <span class="text">Mini Game</span>
        <span class="badge-count" style="margin-left:auto;margin-right:8px;font-size:11px;background:rgba(0,255,200,0.15);color:#00ffc8;padding:2px 8px;border-radius:10px;font-weight:700;">4 Game</span>
        <span class="chevron-arrow">›</span>
      </button>
      <div class="category-submenu open" id="miniGameSubmenu">
        <a href="minigame.html?game=crate" class="category-subitem${isMiniGameActive && activeGame === 'crate' ? ' active' : ''}" data-game="crate">
          <span class="sub-icon"><img src="fun/crate/CrateCover/minisafe.webp" alt="" width="20" height="20"></span>
          <span class="text">Mở hộp chuột</span>
        </a>
        <a href="minigame.html?game=morse" class="category-subitem${isMiniGameActive && activeGame === 'morse' ? ' active' : ''}" data-game="morse">
          <span class="sub-icon"><img src="assets/minigame-icons/morse.png" alt="" width="20" height="20"></span>
          <span class="text">Cổng mã Morse</span>
        </a>
        <a href="minigame.html?game=hacker" class="category-subitem${isMiniGameActive && activeGame === 'hacker' ? ' active' : ''}" data-game="hacker">
          <span class="sub-icon"><img src="fun/HACER.png" alt="" width="20" height="20"></span>
          <span class="text">Giải mã Morse</span>
        </a>
        <a href="minigame.html?game=equipment" class="category-subitem${isMiniGameActive && activeGame === 'equipment' ? ' active' : ''}" data-game="equipment">
          <span class="sub-icon"><img src="assets/minigame-icons/equipment.png" alt="" width="20" height="20"></span>
          <span class="text">Trang bị ngẫu nhiên</span>
        </a>
      </div>
    </div>
  `;

  categoryLists.forEach(cList => {
    cList.innerHTML = standardHtml + miniGameHtml;
  });
}
// Nav icons kept native SVG

const animatedHomeItems = document.querySelectorAll('.trending-card, .story-chapter');
if (animatedHomeItems.length) {
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    animatedHomeItems.forEach(item => revealObserver.observe(item));
  } else {
    animatedHomeItems.forEach(item => item.classList.add('is-visible'));
  }
}

const storyTimeline = document.querySelector('.story-timeline');
if (storyTimeline) {
  let storyFrame = 0;
  const storyScenes = storyTimeline.querySelectorAll('.story-scene');
  const updateStoryProgress = () => {
    storyFrame = 0;
    const rect = storyTimeline.getBoundingClientRect();
    const travel = Math.max(rect.height - window.innerHeight * .35, 1);
    const progress = Math.min(1, Math.max(0, (window.innerHeight * .58 - rect.top) / travel));
    storyTimeline.style.setProperty('--story-progress', `${(progress * 100).toFixed(2)}%`);
    storyScenes.forEach(scene => {
      const sceneRect = scene.getBoundingClientRect();
      const distance = (sceneRect.top + sceneRect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const shift = Math.max(-24, Math.min(24, distance * -28));
      scene.style.setProperty('--scene-shift', `${shift.toFixed(1)}px`);
    });
  };
  const requestStoryUpdate = () => {
    if (!storyFrame) storyFrame = requestAnimationFrame(updateStoryProgress);
  };
  window.addEventListener('scroll', requestStoryUpdate, { passive: true });
  window.addEventListener('resize', requestStoryUpdate);
  updateStoryProgress();
}

// Category sliding drawer with backdrop
let categoryBackdrop = document.querySelector('.category-backdrop');
if (!categoryBackdrop) {
  categoryBackdrop = document.createElement('div');
  categoryBackdrop.className = 'category-backdrop';
  document.body.appendChild(categoryBackdrop);
}

const openCategoryMenu = () => {
  if (!categoryPanel) return;
  categoryPanel.classList.add('open');
  categoryPanel.setAttribute('aria-hidden', 'false');
  categoryBackdrop?.classList.add('active');
  document.body.classList.add('menu-drawer-open');
};

const closeCategoryMenu = () => {
  if (!categoryPanel) return;
  categoryPanel.classList.remove('open');
  categoryPanel.setAttribute('aria-hidden', 'true');
  categoryBackdrop?.classList.remove('active');
  document.body.classList.remove('menu-drawer-open');
};

if (categoryToggle && categoryPanel) {
  categoryToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (categoryPanel.classList.contains('open')) {
      closeCategoryMenu();
    } else {
      openCategoryMenu();
    }
  });
}

if (closeCategory && categoryPanel) {
  closeCategory.addEventListener('click', (e) => {
    e.stopPropagation();
    closeCategoryMenu();
  });
}

categoryBackdrop?.addEventListener('click', closeCategoryMenu);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && categoryPanel?.classList.contains('open')) {
    closeCategoryMenu();
  }
});

if (categoryPanel) {
  document.addEventListener('click', (event) => {
    if (!categoryPanel.classList.contains('open')) return;
    const clickedTrigger = categoryToggle && categoryToggle.contains(event.target);
    const clickedInsidePanel = categoryPanel.contains(event.target);
    if (!clickedTrigger && !clickedInsidePanel) {
      closeCategoryMenu();
    }
  });

  // Mini Game Accordion Submenu with Event Delegation
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#miniGameMenuBtn, .category-item--parent');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      const group = btn.closest('.category-item-group');
      const submenu = group ? group.querySelector('.category-submenu') : document.getElementById('miniGameSubmenu');
      if (submenu) {
        const isCurrentlyOpen = submenu.classList.contains('open');
        submenu.classList.toggle('open', !isCurrentlyOpen);
        btn.classList.toggle('expanded', !isCurrentlyOpen);
        btn.setAttribute('aria-expanded', String(!isCurrentlyOpen));
      }
    }
  });
}

if (dockItems.length) {
  dockItems.forEach((item) => {
    item.addEventListener('click', () => {
      dockItems.forEach((i) => i.classList.toggle('active', i === item));
    });
  });
}

if (pills.length) {
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const filter = pill.dataset.filter;
      pills.forEach((item) => item.classList.toggle('active', item === pill));

      cards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !matches);
      });
    });
  });
}

const rememberedUser = localStorage.getItem('pieNoirUser');
let rememberedOAuthUser = null;
try { rememberedOAuthUser = JSON.parse(localStorage.getItem('pieNoirOAuthUser') || 'null'); } catch {}
const storedRole = localStorage.getItem('pieNoirRole') || 'member';
const serverAdminId = localStorage.getItem('pnServerAdminAccountId');
const hasVerifiedAdminRole = storedRole === 'admin'
  && Boolean(rememberedOAuthUser?.accountId)
  && rememberedOAuthUser.accountId === serverAdminId;
const rememberedRole = hasVerifiedAdminRole ? 'admin' : storedRole === 'staff' ? 'staff' : 'member';
if (storedRole === 'admin' && !hasVerifiedAdminRole) localStorage.setItem('pieNoirRole', 'member');
document.documentElement.classList.toggle('pn-admin-session', hasVerifiedAdminRole);
const routeSegment = window.location.pathname.split('/').pop() || 'index';
const currentPage = routeSegment.endsWith('.html') ? routeSegment : `${routeSegment}.html`;
const redirectTarget = new URLSearchParams(window.location.search).get('redirect');
const mapLoginNotice = document.getElementById('mapLoginNotice');
if (mapLoginNotice && new URLSearchParams(window.location.search).get('notice') === 'map') mapLoginNotice.hidden = false;

if (currentPage !== 'login.html') {
  fetch('/api/auth/me', { credentials: 'same-origin' })
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(async ({ user, role: serverRole }) => {
      const access = await fetch('/api/map-rooms/admin/status', { credentials:'same-origin' })
        .then(response => response.ok ? response.json() : { admin:false })
        .catch(() => ({ admin:false }));
      const isAdmin = Boolean(access.admin && access.accountId === user.accountId);
      const role = isAdmin ? 'admin' : serverRole === 'staff' ? 'staff' : 'member';
      if (isAdmin) localStorage.setItem('pnServerAdminAccountId', user.accountId);
      else localStorage.removeItem('pnServerAdminAccountId');
      const accountName = user.name || user.email || `${user.provider}-${user.id}`;
      if (rememberedUser === accountName && rememberedOAuthUser?.accountId === user.accountId && storedRole === role) return;
      localStorage.setItem('pieNoirUser', accountName);
      localStorage.setItem('pieNoirRole', role);
      localStorage.setItem('pieNoirOAuthUser', JSON.stringify(user));
      const profileKey = `pienoirProfile:${accountName}`;
      let profile = {};
      try { profile = JSON.parse(localStorage.getItem(profileKey) || '{}'); } catch {}
      localStorage.setItem(profileKey, JSON.stringify({ ...profile, displayName: user.name || profile.displayName || accountName, avatar: user.avatar || profile.avatar || '' }));
      window.location.reload();
    })
    .catch(() => {
      if (!rememberedUser) return;
      localStorage.removeItem('pieNoirUser');
      localStorage.removeItem('pieNoirRole');
      localStorage.removeItem('pieNoirOAuthUser');
      window.location.reload();
    });
}


function setupAccountMenu() {
  // Disabled: No login or account dropdown
}

function loadProfileFeatures() {
  // Disabled: No profile
}

function applyProtectedNavigation() {
  // Purge any residual links from DOM
  document.querySelectorAll('a[href*="profile"], a[href*="admin"], a[href*="staff"], a[href*="member"], a[href*="story"], a[href*="login"], a[href*="events"], a[href*="creator"]').forEach((link) => {
    const container = link.closest('.category-item, .dock-item');
    if (container) container.remove();
    else link.remove();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { applyProtectedNavigation(); setupAccountMenu(); loadProfileFeatures(); });
} else {
  applyProtectedNavigation();
  setupAccountMenu();
  loadProfileFeatures();
}

const loginForm = document.getElementById('loginForm');
const createAccountLink = document.querySelector('.create-account-link');
const authTitle = document.querySelector('.form-header h2');
const submitButtonText = document.querySelector('.auth-submit span:last-child');
const formMessage = document.querySelector('.form-message');
const confirmPasswordMessage = document.getElementById('confirmPasswordMessage');
const signupOnlyFields = document.querySelectorAll('.signup-only');
const loginOnlyFields = document.querySelectorAll('.login-only');
const authFormWrap = document.querySelector('.auth-form-wrap');
const oauthButtons = document.querySelectorAll('[data-oauth-provider]');
let authPendingCancelled = false;
let authFlowStartedOnPage = false;

function showFormMessage(message, type = 'error') {
  if (!formMessage) return;
  formMessage.textContent = String(message || '').trim().replace(/[.。]+$/u, '');
  formMessage.classList.remove('success', 'error');
  formMessage.classList.add(type);
}

function showConfirmPasswordMessage(message, type = 'error') {
  if (!confirmPasswordMessage) return;
  confirmPasswordMessage.textContent = String(message || '').trim().replace(/[.。]+$/u, '');
  confirmPasswordMessage.classList.remove('success', 'error');
  confirmPasswordMessage.classList.add(type);
}

function clearConfirmPasswordMessage() {
  if (!confirmPasswordMessage) return;
  confirmPasswordMessage.textContent = '';
  confirmPasswordMessage.classList.remove('success', 'error');
}

function updateAuthMode() {
  const mode = loginForm.dataset.mode;
  authFormWrap?.classList.toggle('is-signup', mode === 'signup');
  signupOnlyFields.forEach(field => field.classList.toggle('hidden', mode !== 'signup' && !(mode === 'oauth' && field.classList.contains('phone-field'))));
  document.getElementById('confirmPassword')?.closest('label')?.classList.toggle('hidden', !['signup', 'reset'].includes(mode));
  loginOnlyFields.forEach(field => field.classList.toggle('hidden', mode !== 'login'));
  document.querySelector('.password-field')?.classList.toggle('hidden', !['login', 'signup', 'reset'].includes(mode));
  document.querySelector('.code-field')?.classList.toggle('hidden', !['verify', 'reset'].includes(mode));
  document.getElementById('username')?.closest('label')?.classList.toggle('hidden', ['verify', 'reset'].includes(mode));
  document.getElementById('authResend')?.classList.toggle('hidden', !['verify', 'reset'].includes(mode));
  document.getElementById('authCancel')?.classList.toggle('hidden', !['oauth', 'verify', 'forgot', 'reset'].includes(mode));
  document.querySelector('.auth-flow-actions')?.classList.toggle('hidden', !['oauth', 'verify', 'forgot', 'reset'].includes(mode));
  document.querySelector('.social-login-group')?.classList.toggle('hidden', !['login', 'signup'].includes(mode));
  document.querySelector('.divider')?.classList.toggle('hidden', !['login', 'signup'].includes(mode));
  document.querySelector('.switch-link')?.classList.toggle('hidden', !['login', 'signup'].includes(mode));
  const titles = { login: 'Đăng nhập', signup: 'Tạo tài khoản', oauth: 'Hoàn tất tài khoản', verify: 'Xác minh Gmail', forgot: 'Quên mật khẩu', reset: 'Đặt lại mật khẩu' };
  const buttons = { login: 'Đăng nhập', signup: 'Gửi mã xác minh', oauth: 'Gửi mã xác minh', verify: 'Xác minh', forgot: 'Gửi mã khôi phục', reset: 'Đổi mật khẩu' };
  if (authTitle) authTitle.textContent = titles[mode] || titles.login;
  if (submitButtonText) submitButtonText.textContent = buttons[mode] || buttons.login;
  const switchCopy = document.querySelector('.switch-copy');
  if (switchCopy) switchCopy.textContent = mode === 'signup' ? 'Đã có tài khoản?' : 'Bạn chưa có tài khoản?';
  if (createAccountLink) createAccountLink.textContent = mode === 'signup' ? 'Đăng nhập' : 'Tạo ngay';
  const username = document.getElementById('username');
  const accountName = document.getElementById('accountName');
  const secondaryPassword = document.getElementById('secondaryPassword');
  const password = document.getElementById('password');
  const mobile = document.getElementById('phone');
  const code = document.getElementById('authCode');
  if (username) {
    username.required = ['login', 'signup', 'oauth', 'forgot'].includes(mode);
    username.type = mode === 'login' ? 'text' : 'email';
    username.placeholder = mode === 'login' ? 'Gmail hoặc tên tài khoản' : 'tenban@gmail.com';
    username.autocomplete = mode === 'login' ? 'username' : 'email';
    if (mode !== 'login' && username.value && !username.value.includes('@')) username.value = '';
  }
  const identifierLabel = document.getElementById('authIdentifierLabel');
  if (identifierLabel) identifierLabel.textContent = mode === 'login' ? 'Gmail hoặc tên tài khoản' : 'Gmail';
  if (accountName) { accountName.required = mode === 'signup'; accountName.disabled = mode !== 'signup'; }
  if (secondaryPassword) { secondaryPassword.required = mode === 'signup'; secondaryPassword.disabled = mode !== 'signup'; }
  if (password) {
    password.required = ['login', 'signup', 'reset'].includes(mode);
    password.autocomplete = mode === 'login' ? 'current-password' : 'new-password';
    password.placeholder = mode === 'login' ? 'Nhập mật khẩu' : 'Ít nhất 8 ký tự, có số và ký tự đặc biệt';
  }
  const passwordLabel = document.getElementById('authPasswordLabel');
  if (passwordLabel) passwordLabel.textContent = mode === 'signup' ? 'Mật khẩu chính' : mode === 'reset' ? 'Mật khẩu mới' : 'Mật khẩu';
  const confirmPassword = document.getElementById('confirmPassword');
  if (confirmPassword) confirmPassword.required = ['signup', 'reset'].includes(mode);
  if (mobile) mobile.required = ['signup', 'oauth'].includes(mode);
  if (code) code.required = ['verify', 'reset'].includes(mode);
}

function acceptVerifiedUser(user, next = redirectTarget || 'index.html') {
  const accountName = user.name || user.email || `${user.provider}-${user.id}`;
  localStorage.setItem('pieNoirUser', accountName);
  localStorage.setItem('pieNoirRole', 'member');
  localStorage.setItem('pieNoirOAuthUser', JSON.stringify(user));
  const profileKey = `pienoirProfile:${accountName}`;
  let profile = {};
  try { profile = JSON.parse(localStorage.getItem(profileKey) || '{}'); } catch {}
  localStorage.setItem(profileKey, JSON.stringify({ ...profile, displayName: user.name || profile.displayName || accountName, avatar: user.avatar || profile.avatar || '' }));
  window.location.replace(typeof next === 'string' && next.startsWith('/') && !next.startsWith('//') ? next : 'index.html');
}

async function authRequest(route, data) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(`/api/auth/${route}`, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal: controller.signal });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Không thể xử lý yêu cầu. Vui lòng thử lại.');
    return result;
  } catch (error) {
    if (error?.name === 'AbortError') throw new Error('Gửi mã quá thời gian chờ. Vui lòng thử lại sau ít phút.');
    if (error instanceof TypeError) throw new Error('Không thể kết nối máy chủ. Vui lòng kiểm tra mạng và thử lại.');
    throw error;
  } finally { clearTimeout(timeout); }
}

if (loginForm) {
  const usernameField = document.getElementById('username');
  if (usernameField && (rememberedOAuthUser?.email || rememberedUser?.endsWith('@gmail.com'))) {
    usernameField.value = rememberedOAuthUser?.email || rememberedUser;
  }

  updateAuthMode();

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    authFlowStartedOnPage = true;
    const username = document.getElementById('username').value.trim().toLowerCase();
    const accountName = document.getElementById('accountName').value.trim().toLowerCase();
    const mobile = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const secondaryPassword = document.getElementById('secondaryPassword').value;
    const mode = loginForm.dataset.mode;
    const strongPassword = value => value.length >= 8 && value.length <= 128 && /[0-9]/.test(value) && /[^\p{L}\p{N}\s]/u.test(value);
    if (mode === 'signup' && !/^(?=.{7,24}$)(?=.*[a-z])(?=.*\d)[a-z0-9_]+$/.test(accountName)) {
      showFormMessage('Tên tài khoản cần ít nhất 7 ký tự, gồm chữ và số, không có dấu hoặc khoảng trắng'); return;
    }
    if (['signup', 'reset'].includes(mode) && !strongPassword(password)) {
      showFormMessage('Mật khẩu cần ít nhất 8 ký tự, gồm số và ký tự đặc biệt'); return;
    }
    if (mode === 'signup' && (!strongPassword(secondaryPassword) || secondaryPassword === password)) {
      showFormMessage('Mật khẩu cấp 2 cần ít nhất 8 ký tự, gồm số và ký tự đặc biệt, khác mật khẩu chính'); return;
    }
    if (['signup', 'reset'].includes(mode) && password !== document.getElementById('confirmPassword').value) {
      showConfirmPasswordMessage('Mật khẩu xác nhận không khớp.'); return;
    }
    const button = loginForm.querySelector('[type="submit"]');
    button.disabled = true;
    const cancelButton = document.getElementById('authCancel');
    if (cancelButton) cancelButton.disabled = true;
    try {
      let result;
      if (mode === 'signup') result = await authRequest('register', { username: accountName, email: username, phone: mobile, password, secondaryPassword });
      else if (mode === 'login') result = await authRequest('login-password', { identifier: username, password });
      else if (mode === 'oauth') result = await authRequest('onboard', { email: username, phone: mobile });
      else if (mode === 'forgot') result = await authRequest('forgot', { email: username });
      else if (mode === 'verify') result = await authRequest('verify', { code: document.getElementById('authCode').value });
      else if (mode === 'reset') result = await authRequest('reset-password', { code: document.getElementById('authCode').value, password });
      if (result?.user) { acceptVerifiedUser(result.user, result.next || redirectTarget || 'index.html'); return; }
      if (mode === 'signup' || mode === 'oauth') loginForm.dataset.mode = 'verify';
      else if (mode === 'forgot') loginForm.dataset.mode = 'reset';
      else if (mode === 'reset') loginForm.dataset.mode = 'login';
      updateAuthMode();
      const sentCodeHint = mode === 'forgot'
        ? 'Nếu Gmail có tài khoản, hãy kiểm tra Hộp thư đến và Thư rác để lấy mã'
        : ['signup', 'oauth'].includes(mode)
          ? 'Kiểm tra Gmail để lấy mã, nếu chưa thấy hãy xem cả Thư rác'
          : (result?.message || 'Vui lòng kiểm tra Gmail để lấy mã');
      showFormMessage(sentCodeHint, 'success');
    } catch (error) { showFormMessage(error.message); }
    finally { button.disabled = false; if (cancelButton) cancelButton.disabled = false; }
  });

  fetch('/api/auth/pending', { credentials: 'same-origin' })
    .then(response => response.json())
    .then(async ({ pending }) => {
      if (!pending || authPendingCancelled || authFlowStartedOnPage) return;
      const navigationType = performance.getEntriesByType('navigation')[0]?.type;
      const freshOAuthCallback = pending.type === 'oauth'
        && new URLSearchParams(window.location.search).get('auth') === 'complete'
        && navigationType === 'navigate';
      if (!freshOAuthCallback) {
        authPendingCancelled = true;
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
        const currentUrl = new URL(window.location.href);
        for (const key of ['auth', 'provider', 'reason']) currentUrl.searchParams.delete(key);
        window.history.replaceState({}, '', currentUrl.pathname + currentUrl.search);
        return;
      }
      if (pending.type === 'oauth') loginForm.dataset.mode = pending.codeSent ? 'verify' : 'oauth';
      else if (pending.type === 'register') loginForm.dataset.mode = 'verify';
      else if (pending.type === 'reset') loginForm.dataset.mode = 'reset';
      if (pending.email) document.getElementById('username').value = pending.email;
      if (pending.phone) document.getElementById('phone').value = pending.phone;
      updateAuthMode();
      if (pending.codeSent) showFormMessage('Mã đã gửi đến Gmail, nếu chưa thấy hãy kiểm tra Thư rác', 'success');
      else if (pending.type === 'oauth') showFormMessage('Nhập Gmail và số điện thoại để hoàn tất đăng nhập', 'success');
    }).catch(() => {});
}

if (createAccountLink) {
  createAccountLink.addEventListener('click', (event) => {
    event.preventDefault();
    if (!loginForm) return;

    loginForm.dataset.mode = loginForm.dataset.mode === 'signup' ? 'login' : 'signup';
    clearConfirmPasswordMessage();
    updateAuthMode();
  });
}

document.querySelector('.forgot-password-link')?.addEventListener('click', event => {
  event.preventDefault();
  loginForm.dataset.mode = 'forgot';
  updateAuthMode();
  showFormMessage('Nhập Gmail đã đăng ký để nhận mã đặt lại mật khẩu.', 'success');
});

document.getElementById('authResend')?.addEventListener('click', async event => {
  event.currentTarget.disabled = true;
  try { await authRequest('resend', {}); showFormMessage('Đã gửi mã mới đến Gmail, kiểm tra cả Thư rác', 'success'); }
  catch (error) { showFormMessage(error.message); }
  finally { event.currentTarget.disabled = false; }
});

document.getElementById('authCancel')?.addEventListener('click', async event => {
  const button = event.currentTarget;
  button.disabled = true;
  authPendingCancelled = true;
  try {
    const response = await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    if (!response.ok) throw new Error('Chưa thể hủy xác minh, vui lòng thử lại');
    localStorage.removeItem('pieNoirUser');
    localStorage.removeItem('pieNoirRole');
    localStorage.removeItem('pieNoirOAuthUser');
    loginForm.reset();
    loginForm.dataset.mode = 'login';
    formMessage.textContent = '';
    formMessage.classList.remove('success', 'error');
    clearConfirmPasswordMessage();
    const currentUrl = new URL(window.location.href);
    for (const key of ['auth', 'provider', 'reason']) currentUrl.searchParams.delete(key);
    window.history.replaceState({}, '', currentUrl.pathname + currentUrl.search);
    updateAuthMode();
  } catch (error) { authPendingCancelled = false; showFormMessage(error.message); }
  finally { button.disabled = false; }
});

const confirmPasswordInput = document.getElementById('confirmPassword');
if (confirmPasswordInput) {
  confirmPasswordInput.addEventListener('input', () => {
    clearConfirmPasswordMessage();
  });
}

const fieldToggles = document.querySelectorAll('.field-toggle');
fieldToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const targetId = toggle.dataset.toggleTarget;
    const input = document.getElementById(targetId);
    if (!input) return;

    const shouldShow = input.type === 'password';
    input.type = shouldShow ? 'text' : 'password';
    toggle.setAttribute('aria-label', shouldShow ? 'Ẩn mật khẩu' : 'Hiện mật khẩu');

    toggle.innerHTML = shouldShow
      ? '<svg viewBox="0 0 24 24" aria-hidden="true" class="field-toggle-icon"><path d="M3 3l18 18"/><path d="M10.58 10.58A2 2 0 0 0 13.42 13.42"/><path d="M9.88 5.76A11.67 11.67 0 0 1 12 5.5c6.5 0 10 6.5 10 6.5a18.12 18.12 0 0 1-4.35 5.1"/><path d="M6.58 6.58A18.47 18.47 0 0 0 2 12s3.5 6.5 10 6.5c1.88 0 3.42-.42 4.8-1.1"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true" class="field-toggle-icon"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3.2"/></svg>';
  });
});

if (currentPage === 'member.html') {
  document.body.classList.toggle('has-member-session', Boolean(rememberedUser));
  const walletBalance = document.getElementById('memberWalletBalance');
  if (walletBalance && rememberedUser) {
    try {
      const raffleState = JSON.parse(localStorage.getItem(`pienoirRaffle:${rememberedUser}`) || '{}');
      walletBalance.textContent = Number(raffleState.balance || 0).toLocaleString('vi-VN', { maximumFractionDigits: 1 });
    } catch {
      walletBalance.textContent = '0';
    }
  }
}

if (oauthButtons.length) {
  const authResult = new URLSearchParams(window.location.search).get('auth');
  if (authResult === 'success') {
    fetch('/api/auth/me', { credentials: 'same-origin' })
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(({ user }) => acceptVerifiedUser(user))
      .catch(() => showFormMessage('Không thể hoàn tất đăng nhập. Vui lòng thử lại.', 'error'));
  } else if (authResult === 'error') {
    const authParams = new URLSearchParams(window.location.search);
    const provider = authParams.get('provider') || 'mạng xã hội';
    const reason = authParams.get('reason');
    const messages = {
      state: 'Phiên đăng nhập đã hết hạn. Vui lòng bấm đăng nhập lại một lần.',
      access_denied: `Bạn đã hủy quyền đăng nhập ${provider}.`,
      invalid_client: `${provider} đang dùng Client Secret không hợp lệ.`,
      redirect_uri: `Callback URL của ${provider} chưa khớp cấu hình.`,
      invalid_grant: `Mã xác thực ${provider} đã hết hạn hoặc đã được sử dụng.`,
      exchange: `Không thể lấy thông tin tài khoản từ ${provider}. Vui lòng thử lại.`
    };
    showFormMessage(messages[reason] || `Đăng nhập ${provider} không thành công hoặc đã bị hủy.`, 'error');
  }

  fetch('/api/auth/providers')
    .then(response => response.ok ? response.json() : {})
    .then(providers => oauthButtons.forEach(button => {
      const provider = button.dataset.oauthProvider;
      const enabled = Boolean(providers[provider]);
      button.classList.toggle('is-unavailable', !enabled);
      button.title = enabled ? `Đăng nhập bằng ${provider}` : `${provider} đang chờ cấu hình OAuth`;
    }))
    .catch(() => {});

  oauthButtons.forEach(button => button.addEventListener('click', event => {
    const provider = button.dataset.oauthProvider;
    if (button.classList.contains('is-unavailable')) {
      event.preventDefault();
      showFormMessage(`Đăng nhập ${provider} đang được cấu hình.`, 'error');
      return;
    }
    localStorage.removeItem('pieNoirUser');
    localStorage.setItem('pieNoirRole', 'member');
    localStorage.removeItem('pieNoirOAuthUser');
    const next = redirectTarget || '';
    window.location.href = `/api/auth/${provider}${next ? `?next=${encodeURIComponent(next)}` : ''}`;
  }));
}

// Admin panel and redirect removed per user request

const languageButtons = document.querySelectorAll('[data-set-language]');
if (languageButtons.length) {
  const homepageTranslations = {
    vi: {
      menu: 'Danh mục', login: 'Đăng nhập', headerTagline: 'DELTA FORCE VIỆT NAM', heroLine1: 'Cùng nhau làm chuột,', heroLine2: 'hay lên làm lão bản?',
      discord: 'Discord', facebookCommunity: 'Cộng đồng Facebook', members: 'Thành viên', online: 'Đang online', vyage: 'Vyage Media',
      fieldLine1: 'Chiến trường', fieldLine2: 'đang chờ.', fieldCopy: 'Tập hợp đồng đội. Sẵn sàng cho nhiệm vụ tiếp theo.',
      rally: 'ĐIỂM TẬP KẾT', deltaVietnam: 'DELTA FORCE VIỆT NAM', bannerLine1: 'Hẹn đồng đội.', bannerLine2: 'Vào nhiệm vụ.',
      bannerCopy: 'Cùng cộng đồng tìm tổ đội và chia sẻ chiến thuật.'
    },
    en: {
      menu: 'Menu', login: 'Log in', headerTagline: 'DELTA FORCE VIETNAM', heroLine1: 'Play together,', heroLine2: 'or become the boss?',
      discord: 'Discord', facebookCommunity: 'Facebook Community', members: 'Members', online: 'Online now', vyage: 'Vyage Media',
      fieldLine1: 'The battlefield', fieldLine2: 'is waiting.', fieldCopy: 'Rally your squad. Get ready for the next mission.',
      rally: 'RALLY POINT', deltaVietnam: 'DELTA FORCE VIETNAM', bannerLine1: 'Meet your squad.', bannerLine2: 'Enter the mission.',
      bannerCopy: 'Find your team and share tactics with the community.'
    }
  };
  const applyHomepageLanguage = language => {
    const selected = language === 'en' ? 'en' : 'vi';
    document.documentElement.lang = selected;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const translated = homepageTranslations[selected][element.dataset.i18n];
      if (translated) element.textContent = translated;
    });
    languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.setLanguage === selected)));
    try { localStorage.setItem('dfLanguage', selected); } catch {}
  };
  let savedLanguage = 'vi';
  try { savedLanguage = localStorage.getItem('dfLanguage') || 'vi'; } catch {}
  applyHomepageLanguage(savedLanguage);
  const picker = document.querySelector('.language-picker');
  const trigger = document.getElementById('languagePickerTrigger');
  const options = document.getElementById('languagePickerOptions');
  const setPickerOpen = open => {
    if (!trigger || !options) return;
    options.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
    picker?.classList.toggle('is-open', open);
  };
  trigger?.addEventListener('click', () => setPickerOpen(options.hidden));
  languageButtons.forEach(button => button.addEventListener('click', () => {
    applyHomepageLanguage(button.dataset.setLanguage);
    setPickerOpen(false);
    trigger?.focus();
  }));
  document.addEventListener('click', event => {
    if (picker && !picker.contains(event.target)) setPickerOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setPickerOpen(false);
  });
}
