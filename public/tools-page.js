(() => {
  const pcTab = document.getElementById('toolsPcTab');
  const mobileTab = document.getElementById('toolsMobileTab');
  const pcPanel = document.getElementById('toolsPcPanel');
  const mobilePanel = document.getElementById('toolsMobilePanel');
  const choose = platform => {
    const isPc = platform === 'pc';
    pcTab.setAttribute('aria-selected', String(isPc));
    mobileTab.setAttribute('aria-selected', String(!isPc));
    pcTab.classList.toggle('is-active', isPc);
    mobileTab.classList.toggle('is-active', !isPc);
    pcPanel.hidden = !isPc;
    mobilePanel.hidden = isPc;
  };
  pcTab.addEventListener('click', () => choose('pc'));
  mobileTab.addEventListener('click', () => choose('mobile'));
  const requested = new URLSearchParams(location.search).get('device');
  choose(requested === 'pc' || requested === 'mobile' ? requested : matchMedia('(max-width: 720px)').matches ? 'mobile' : 'pc');
})();
