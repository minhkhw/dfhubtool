/**
 * ==============================================================================
 * DELTA FORCE DAILY CODES ENGINE (deltaforcetools.gg clean grid layout)
 * Real-time scrape on every page reload
 * ==============================================================================
 */

(() => {
  'use strict';

  let toastTimer = null;

  function showToast(msg) {
    let toast = document.getElementById('dailyCodesToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'dailyCodesToast';
      toast.className = 'daily-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-show');
    }, 2200);
  }

  function copyText(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch (e) {
      showToast('Mã cửa: ' + text);
    }
    document.body.removeChild(ta);
  }

  function getTodayDateString() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}/${m}/${d}`;
  }

  function applyCodesToDOM(codesList) {
    if (!Array.isArray(codesList) || !codesList.length) return;

    codesList.forEach(item => {
      if (!item || !item.name || !item.code) return;
      const cleanTargetName = item.name.toLowerCase().trim();

      const cards = document.querySelectorAll('.daily-code-card');
      cards.forEach(card => {
        const cardName = (card.dataset.name || '').toLowerCase().trim();
        if (cardName === cleanTargetName || (cleanTargetName === 'dam' && cardName.includes('dam'))) {
          // Update dataset
          card.dataset.code = item.code;
          card.title = `Sao chép mã ${item.name}: ${item.code}`;

          // Update digits
          const digitsEl = card.querySelector('.daily-card-digits');
          if (digitsEl && digitsEl.textContent !== item.code) {
            digitsEl.textContent = item.code;
            digitsEl.style.animation = 'none';
            // Trigger reflow for subtle refresh pop
            void digitsEl.offsetWidth;
            digitsEl.style.animation = 'dailyDigitPop 0.25s ease';
          }

          // Update timestamp
          if (item.date) {
            const dateEl = card.querySelector('.daily-card-date');
            if (dateEl) dateEl.textContent = item.date;
          }
          if (item.time) {
            const timeEl = card.querySelector('.daily-card-time');
            if (timeEl) timeEl.textContent = item.time;
          }
        }
      });
    });
  }

  /**
   * Scrape live data every time the page loads / reloads
   */
  async function fetchLiveDailyCodes() {
    try {
      // 1. First attempt: call live crawler API
      const timestamp = Date.now();
      let res = await fetch(`/api/daily-codes?t=${timestamp}`, {
        cache: 'no-store',
        headers: { 'Accept': 'application/json' }
      });

      if (!res.ok) {
        // Fallback to static JSON file if API server is not handling /api/
        res = await fetch(`data/daily_codes.json?t=${timestamp}`, { cache: 'no-store' });
      }

      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.codes)) {
          applyCodesToDOM(data.codes);
        }
      }
    } catch (err) {
      // Gracefully silent on offline network, fallback DOM is already visible
      console.warn('[DailyCodes] Live crawl note:', err);
    }
  }

  function setupCardInteractions() {
    const cards = document.querySelectorAll('.daily-code-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const code = card.dataset.code;
        const name = card.dataset.name || 'bản đồ';
        if (!code) return;

        copyText(code, `Đã sao chép mã ${name}: ${code}`);

        // Visual feedback
        card.classList.add('is-copied');
        setTimeout(() => {
          card.classList.remove('is-copied');
        }, 1500);
      });
    });
  }

  function initDailyCodes() {
    const dateStr = getTodayDateString();

    // Default dates
    document.querySelectorAll('.daily-card-date').forEach(el => {
      if (!el.textContent) el.textContent = dateStr;
    });

    setupCardInteractions();

    // Immediately trigger live scrape on page load / reload
    fetchLiveDailyCodes();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDailyCodes);
  } else {
    initDailyCodes();
  }
})();
