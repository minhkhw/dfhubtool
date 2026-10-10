/* ==========================================================================
   MARKET EXCHANGE JAVASCRIPT (TRAO ĐỔI HÀNG HOÁ TẠI CHỢ TRỜI)
   DFVN · Chuẩn 100% giao diện & dữ liệu từ Shushu.fan (集市)
   ========================================================================== */

(function () {
  'use strict';

  const $ = id => document.getElementById(id);

  const DEFAULT_DATA = {
    currentWeek: {
      title: "Chợ trời trong tuần này",
      dateRange: "Từ ngày 9 tháng 10 đến ngày 16 tháng 10",
      description: "Vật phẩm thu mua / trao đổi tuần này tại Chợ trời trong Delta Force",
      countdownText: "Đang diễn ra",
      inGameRoute: [
        { name: "Phòng ban" },
        { name: "Trạm tiếp tế" },
        { name: "Phòng nghiên cứu" },
        { name: "Chợ trời" }
      ],
      requiredItems: [
        {
          id: "15030010002",
          name: "pin điện thoại di động",
          nameZh: "手机电池",
          category: "Đồ điện tử",
          grade: 2,
          gradeColor: "#08A173",
          price: 2272,
          priceFormatted: "2.272",
          icon: "https://playerhub.df.qq.com/playerhub/60004/object/15030010002.png"
        },
        {
          id: "15080050026",
          name: "Delta Force: Black Hawk Down - Đội Blade",
          nameZh: "三角洲特种部队：黑鹰坠落-战队之刃",
          category: "Đồ nội thất gia đình",
          grade: 3,
          gradeColor: "#3E80B3",
          price: 9622,
          priceFormatted: "9.622",
          icon: "https://playerhub.df.qq.com/playerhub/60004/object/15080050026.png"
        }
      ],
      rewards: []
    },
    nextWeek: {
      title: "Chợ trời - Dự báo tuần tới",
      dateRange: "Từ ngày 16 tháng 10 đến ngày 23 tháng 10",
      description: "Dữ liệu tuần tới cào trực tiếp từ shushu.fan/chi/jishi",
      countdownText: "Đếm ngược đến sự kiện: 3 ngày và 19 giờ",
      inGameRoute: [
        { name: "Phòng ban" },
        { name: "Trạm tiếp tế" },
        { name: "Phòng nghiên cứu" },
        { name: "Chợ trời" }
      ],
      requiredItems: [
        {
          id: "blueprint_no5",
          name: "Bản vẽ kiến trúc số 5",
          nameZh: "建筑图纸5号",
          category: "Dữ liệu và trí tuệ",
          grade: 2,
          gradeColor: "#08A173",
          price: 3308,
          priceFormatted: "3.308",
          icon: "/assets/wiki/blueprint5.png"
        },
        {
          id: "powerbank_mil",
          name: "Sạc dự phòng di động quân sự",
          nameZh: "军用移动电源",
          category: "Đồ điện tử",
          grade: 3,
          gradeColor: "#3E80B3",
          price: 9016,
          priceFormatted: "9.016",
          icon: "/assets/wiki/powerbank.png"
        }
      ],
      rewards: [
        {
          id: "11050004004",
          name: "Áo gi lê chiến thuật MK-2",
          grade: 4,
          gradeColor: "#9c44dc",
          icon: "https://playerhub.df.qq.com/playerhub/60004/object/11050004004.png",
          description: "Đổi phần thưởng",
          requiredItemIds: ["blueprint_no5", "powerbank_mil"]
        },
        {
          id: "11010004004",
          name: "Mũ bảo hiểm chiến thuật GT1",
          grade: 4,
          gradeColor: "#9c44dc",
          icon: "https://playerhub.df.qq.com/playerhub/60004/object/11010004004.png",
          description: "Đổi phần thưởng",
          requiredItemIds: ["blueprint_no5", "powerbank_mil"]
        },
        {
          id: "32230000010",
          name: "Gói lựa chọn đạn cấp 4",
          grade: 4,
          gradeColor: "#9c44dc",
          icon: "https://playerhub.df.qq.com/playerhub/60004/object/32230000010.png",
          description: "Đổi phần thưởng",
          requiredItemIds: ["blueprint_no5", "powerbank_mil"]
        },
        {
          id: "32230000017",
          name: "Gói lựa chọn vũ khí nâng cao",
          grade: 4,
          gradeColor: "#9c44dc",
          icon: "https://playerhub.df.qq.com/playerhub/60004/object/32230000017.png",
          description: "Đổi phần thưởng",
          requiredItemIds: ["blueprint_no5", "powerbank_mil"]
        },
        {
          id: "13110000073",
          name: "Kính ngắm 3x Viewpoint",
          grade: 4,
          gradeColor: "#9c44dc",
          icon: "https://playerhub.df.qq.com/playerhub/60004/object/13110000073.png",
          description: "Đổi phần thưởng",
          requiredItemIds: ["blueprint_no5"]
        },
        {
          id: "13110000057",
          name: "Ống ngắm bắn tỉa điều chỉnh 3/7x",
          grade: 4,
          gradeColor: "#9c44dc",
          icon: "https://playerhub.df.qq.com/playerhub/60004/object/13110000057.png",
          description: "Đổi phần thưởng",
          requiredItemIds: ["powerbank_mil"]
        },
        {
          id: "11050003004",
          name: "Áo giáp chiến thuật Xạ Thủ",
          grade: 3,
          gradeColor: "#3E80B3",
          icon: "https://playerhub.df.qq.com/playerhub/60004/object/11050003004.png",
          description: "Đổi phần thưởng",
          requiredItemIds: ["blueprint_no5"]
        },
        {
          id: "11010003004",
          name: "Mũ bảo hiểm MC201",
          grade: 3,
          gradeColor: "#3E80B3",
          icon: "https://playerhub.df.qq.com/playerhub/60004/object/11010003004.png",
          description: "Đổi phần thưởng",
          requiredItemIds: ["powerbank_mil"]
        }
      ]
    }
  };

  let exchangeData = DEFAULT_DATA;
  let activeTab = 'next'; // Mặc định hiển thị Tuần tới
  try {
    const urlTab = new URLSearchParams(location.search).get('tab');
    if (urlTab === 'current') activeTab = 'current';
    else if (urlTab === 'next') activeTab = 'next';
  } catch (e) {}

  async function loadData() {
    try {
      const res = await fetch('/api/market-exchange?v=' + Date.now());
      if (res.ok) {
        const json = await res.json();
        if (json && json.nextWeek && json.nextWeek.requiredItems) {
          exchangeData = json;
        }
      }
    } catch (e) {
      console.warn('Sử dụng dữ liệu trao đổi mặc định:', e);
    }
    renderMarketExchange();
  }

  function renderMarketExchange() {
    const container = $('marketExchangeApp');
    if (!container) return;

    const currentPeriod = activeTab === 'next' ? (exchangeData.nextWeek || DEFAULT_DATA.nextWeek) : (exchangeData.currentWeek || DEFAULT_DATA.currentWeek);
    const reqItems = currentPeriod.requiredItems || [];
    const rewards = currentPeriod.rewards || [];

    // Map ingredients by ID and robust aliases
    const itemMap = {};
    reqItems.forEach(it => {
      itemMap[it.id] = it;
      if (it.id === '15070010009' || it.id === 'blueprint_no5') {
        itemMap['15070010009'] = it;
        itemMap['blueprint_no5'] = it;
      }
      if (it.id === '15030010001' || it.id === 'powerbank_mil') {
        itemMap['15030010001'] = it;
        itemMap['powerbank_mil'] = it;
      }
    });

    function getFallbackItemImg(it) {
      const id = String(it.id || '');
      if (id === 'blueprint_no5' || id === '15070010009') return '/assets/wiki/blueprint5.png';
      if (id === 'powerbank_mil' || id === '15030010001') return '/assets/wiki/powerbank.png';
      return '/assets/wiki/' + id + '.png';
    }

    function getCdnItemImg(it) {
      const id = String(it.id || '');
      if (id === 'blueprint_no5' || id === '15070010009') return 'https://playerhub.df.qq.com/playerhub/60004/object/15070010009.png';
      if (id === 'powerbank_mil' || id === '15030010001') return 'https://playerhub.df.qq.com/playerhub/60004/object/15030010001.png';
      return 'https://playerhub.df.qq.com/playerhub/60004/object/' + id + '.png';
    }

    container.innerHTML = `
      <div class="market-exchange-section shushu-theme">
        <!-- TOP HEADER & TITLE (Chợ trời chuẩn Shushu.fan) -->
        <div class="me-shushu-header">
          <div class="me-shushu-title-row">
            <h1 class="me-shushu-title">
              <span>${escapeHtml(currentPeriod.title || (activeTab === 'next' ? 'Chợ trời - Dự báo tuần tới' : 'Chợ trời trong tuần này'))}</span>
              <span class="me-shushu-date-tag">${escapeHtml(currentPeriod.dateRange || '')}</span>
            </h1>

            <!-- TAB SWITCHER -->
            <div class="me-shushu-tabs">
              <button type="button" class="me-shushu-tab-btn ${activeTab === 'next' ? 'is-active' : ''}" id="meTabNext">
                <span>🔮 Tuần tới (16/10 – 23/10)</span>
              </button>
              <button type="button" class="me-shushu-tab-btn ${activeTab === 'current' ? 'is-active' : ''}" id="meTabCurrent">
                <span>📅 Tuần hiện tại (09/10 – 16/10)</span>
              </button>
            </div>
          </div>

          <!-- IN-GAME ROUTE BREADCRUMBS -->
          <div class="me-shushu-route">
            <span class="me-route-label">Mục nhập sự kiện :</span>
            <div class="me-route-badges">
              <span class="me-route-pill">Phòng ban</span>
              <span class="me-route-arrow">›</span>
              <span class="me-route-pill">Trạm tiếp tế</span>
              <span class="me-route-arrow">›</span>
              <span class="me-route-pill">Phòng nghiên cứu</span>
              <span class="me-route-arrow">›</span>
              <span class="me-route-pill highlight">Chợ trời</span>
            </div>
          </div>
        </div>

        <!-- KHỐI 1: TRAO ĐỔI HÀNG HÓA TẠI CHỢ TRỜI (2 VẬT PHẨM NGUYÊN LIỆU THU MUA) -->
        <div class="me-shushu-block">
          <h2 class="me-block-title">Trao đổi hàng hóa tại chợ</h2>
          
          <div class="me-req-grid">
            ${reqItems.map(item => {
              const localSrc = getFallbackItemImg(item);
              const cdnSrc = getCdnItemImg(item);
              const initialSrc = item.icon || localSrc;
              return `
              <div class="me-req-card" title="${escapeHtml(item.name)} · Giá: ${item.priceFormatted} Xu Tekniq">
                <div class="me-req-avatar-wrap">
                  <!-- Diamond grade badge (Xoay 45 độ chuẩn Shushu) -->
                  <div class="me-diamond-badge" style="background-color: ${item.gradeColor};" title="Phẩm chất: Cấp ${item.grade}"></div>
                  <img src="${initialSrc}" alt="${escapeHtml(item.name)}" class="me-req-img" loading="lazy" onerror="if(this.dataset.tried!=='1'){this.dataset.tried='1';this.src='${initialSrc.startsWith('http') ? localSrc : cdnSrc}';}else{this.onerror=null;this.src='/assets/wiki/coin.png';}">
                </div>
                <div class="me-req-info">
                  <h3 class="me-req-name">${escapeHtml(item.name)}</h3>
                  <div class="me-req-bottom">
                    <span class="me-req-category">${escapeHtml(item.category)}</span>
                    <div class="me-req-price">
                      <img src="/assets/wiki/coin.png" class="tekniq-coin-icon" alt="Xu Tekniq">
                      <span>${item.priceFormatted}</span>
                    </div>
                  </div>
                </div>
              </div>
            `;}).join('')}
          </div>
        </div>

        <!-- KHỐI 2: XEM TRƯỚC CÁC VẬT PHẨM CÓ THỂ ĐỔI THƯỞNG (CHỈ HIỂN THỊ KHI Ở TAB TUẦN TỚI) -->
        ${activeTab === 'next' && rewards.length > 0 ? `
        <div class="me-shushu-block" style="margin-top: 20px;">
          <div class="me-block-header-row">
            <h2 class="me-block-title">Xem trước các vật phẩm có thể đổi thưởng</h2>
            <div class="me-countdown-badge">
              <span>${escapeHtml(currentPeriod.countdownText || 'Đếm ngược sự kiện: 3 ngày và 19 giờ')}</span>
            </div>
          </div>

          <div class="me-rewards-grid">
            ${rewards.map(reward => {
              const reqs = (reward.requiredItemIds || []).map(id => itemMap[id]).filter(Boolean);
              const rLocal = '/assets/wiki/' + reward.id + '.png';
              const rCdn = 'https://playerhub.df.qq.com/playerhub/60004/object/' + reward.id + '.png';
              const rInit = reward.icon || rCdn;
              return `
                <div class="me-reward-card" title="Phần thưởng: ${escapeHtml(reward.name)}">
                  <div class="me-reward-avatar-wrap">
                    <!-- Diamond grade badge -->
                    <div class="me-diamond-badge" style="background-color: ${reward.gradeColor};" title="Cấp ${reward.grade}"></div>
                    <img src="${rInit}" alt="${escapeHtml(reward.name)}" class="me-reward-img" loading="lazy" onerror="if(this.dataset.tried!=='1'){this.dataset.tried='1';this.src='${rInit.startsWith('http') ? rLocal : rCdn}';}else{this.onerror=null;this.src='/assets/wiki/coin.png';}">
                  </div>

                  <div class="me-reward-details">
                    <h3 class="me-reward-name">${escapeHtml(reward.name)}</h3>
                    <div class="me-reward-subtext">${escapeHtml(reward.description || 'Đổi phần thưởng')}</div>
                  </div>

                  <!-- Góc dưới phải: các ô nhỏ nguyên liệu cần đổi (Bản vẽ 5 & Sạc dự phòng) -->
                  <div class="me-reward-ingredients" title="Nguyên liệu cần: ${reqs.map(r => r.name).join(' + ')}">
                    ${reqs.map(r => {
                      const ingLocal = getFallbackItemImg(r);
                      const ingCdn = getCdnItemImg(r);
                      const ingInit = r.icon || ingLocal;
                      return `
                      <div class="me-ing-slot" style="background:${r.gradeColor}25; border-color:${r.gradeColor};" title="${escapeHtml(r.name)}">
                        <img src="${ingInit}" alt="${escapeHtml(r.name)}" onerror="if(this.dataset.tried!=='1'){this.dataset.tried='1';this.src='${ingInit.startsWith('http') ? ingLocal : ingCdn}';}else{this.onerror=null;this.src='/assets/wiki/coin.png';}">
                      </div>
                    `;}).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
        ` : `
        <!-- TUẦN HIỆN TẠI: THÔNG BÁO ĐỒNG NHẤT KHÔNG CÓ XEM TRƯỚC -->
        <div class="me-shushu-block me-current-info-block" style="margin-top: 20px;">
          <div class="me-current-info-row">
            <div class="me-current-info-main">
              <div class="me-current-status-tag">
                <span class="me-pulse-dot"></span>
                <span>Sự kiện tuần này đang diễn ra</span>
              </div>
              <p class="me-current-info-text">
                Vật phẩm thu mua đang có hiệu lực. Bạn có thể mang <strong>pin điện thoại di động</strong> và <strong>Đội Blade</strong> đến mục <em>Phòng ban › Trạm tiếp tế › Phòng nghiên cứu › Chợ trời</em> trong game để đổi Xu Tekniq.
              </p>
            </div>
            <button type="button" class="me-preview-next-cta" id="meBtnViewNext">
              <span>🔮 Xem trước phần thưởng tuần tới</span>
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
        `}
      </div>
    `;

    // Bind tab events
    const tabNext = $('meTabNext');
    const tabCur = $('meTabCurrent');
    const btnViewNext = $('meBtnViewNext');

    tabNext?.addEventListener('click', () => {
      activeTab = 'next';
      renderMarketExchange();
    });

    tabCur?.addEventListener('click', () => {
      activeTab = 'current';
      renderMarketExchange();
    });

    btnViewNext?.addEventListener('click', () => {
      activeTab = 'next';
      renderMarketExchange();
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadData);
  } else {
    loadData();
  }

  window.initMarketExchange = loadData;
})();
