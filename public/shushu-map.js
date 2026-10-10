/**
 * ==============================================================================
 * SHUSHU.FAN MAP ENGINE - 100% LOCAL & OFFLINE WITH VIETNAMESE LOCALIZATION
 * Re-engineered from shushu.fan client logic, using local JSONs & tiles.
 * ==============================================================================
 */

(() => {
  'use strict';

  // 1. Shushu Map Catalog
  const MAP_CATALOG = {
    'article-map-db': {
      id: 'article-map-db',
      code: '00',
      nameZh: '零号大坝',
      nameVi: 'Đập Zero',
      tileLayer: 'map_db',
      file: '/assets/maps/shushu/article-map-db.json'
    },
    'article-map-yc': {
      id: 'article-map-yc',
      code: '10',
      nameZh: '长弓溪谷',
      nameVi: 'Thung lũng Layali',
      tileLayer: 'map_yc',
      file: '/assets/maps/shushu/article-map-yc.json'
    },
    'article-map-bks': {
      id: 'article-map-bks',
      code: '31',
      nameZh: '巴克什',
      nameVi: 'Brakkesh',
      tileLayer: 'map_bks2',
      file: '/assets/maps/shushu/article-map-bks.json'
    },
    'article-map-htjd': {
      id: 'article-map-htjd',
      code: '21',
      nameZh: '航天基地',
      nameVi: 'Căn cứ Không gian',
      tileLayer: 'map_htjd',
      file: '/assets/maps/shushu/article-map-htjd.json'
    },
    'article-map-cxjy': {
      id: 'article-map-cxjy',
      code: '42',
      nameZh: '潮汐监狱',
      nameVi: 'Nhà tù Thủy Triều',
      tileLayer: 'map_cxjy',
      file: '/assets/maps/shushu/article-map-cxjy.json'
    },
    'article-map-az3': {
      id: 'article-map-az3',
      code: '51',
      nameZh: 'AZ3',
      nameVi: 'Khu AZ3',
      tileLayer: 'map_az3',
      file: '/assets/maps/shushu/article-map-az3.json'
    }
  };

  // Translation helper wrapper
  const t = (text, fallback) => window.MAP_I18N ? window.MAP_I18N.t(text, fallback) : (text || fallback || '');
  const tCond = (cond) => window.MAP_I18N ? window.MAP_I18N.tCondition(cond) : (cond || '');

  // State
  let currentMapKey = localStorage.getItem('shushu_mapKey') || 'article-map-db';
  if (!MAP_CATALOG[currentMapKey]) currentMapKey = 'article-map-db';

  let currentDifficulty = localStorage.getItem('shushu_diff') || 'normal';
  let eventActive = false;
  let currentFloorIndex = null; // null = Ground / 地面
  let currentData = null;
  let mapInstance = null;
  let tileLayer = null;
  let markerGroup = null;
  let regionGroup = null;
  let waterGroup = null;
  let highlightMarker = null;

  const selectedTypes = new Set(); // Set of currently active type IDs
  const collapsedGroups = new Set(); // Set of group IDs collapsed in drawer
  let filterCollapsed = false;
  let crosshairActive = false;

  // Coordinate Conversion (Shushu Exact Algorithm)
  function rotateMode(rotate) {
    if (rotate === -90) return 'ccw90';
    if (rotate === 90 || rotate === true) return 'cw90';
    return 'none';
  }

  function worldToMapPos(x, y, cfg, isFloor = false, floorBj = 128, rotate = null) {
    const o = Number(x);
    const s = Number(y);
    const i = isFloor ? (floorBj || 128) : 128;
    const d = cfg.width / i;
    const c = cfg.height / i;
    const u = rotateMode(rotate ?? cfg.rotate);

    if (u === 'cw90') {
      return { x: i - (cfg.centerY + s) / c, y: -i + (cfg.centerX - o) / d };
    }
    if (u === 'ccw90') {
      return { x: i + (cfg.centerY + s) / c, y: -i - (cfg.centerX - o) / d };
    }
    return { x: i - (cfg.centerX - o) / d, y: -i - (cfg.centerY + s) / c };
  }

  function mapPosToWorld(lng, lat, cfg, isFloor = false, floorBj = 128, rotate = null) {
    const o = isFloor ? (floorBj || 128) : 128;
    const a = cfg.width / o;
    const i = cfg.height / o;
    const d = rotateMode(rotate ?? cfg.rotate);

    if (d === 'cw90') {
      return { worldX: cfg.centerX - (lat + o) * a, worldY: (o - lng) * i - cfg.centerY };
    }
    if (d === 'ccw90') {
      return { worldX: cfg.centerX + (lat + o) * a, worldY: (lng - o) * i - cfg.centerY };
    }
    return { worldX: cfg.centerX - (o - lng) * a, worldY: -(cfg.centerY + (lat + o) * i) };
  }

  function resolveIconUrl(icon) {
    if (!icon) return '/assets/maps/icons/fallback.svg';
    if (icon.startsWith('http') || icon.startsWith('/')) return icon;
    return `/assets/maps/icons/lv3/${icon.replace(/^nav_/, '')}.png`;
  }

  // DOM Elements
  const el = {
    canvas: document.getElementById('shushuMapCanvas'),
    loader: document.getElementById('shushuLoader'),
    mapsStrip: document.getElementById('shushuMapsStrip'),
    selectDiff: document.getElementById('shushuSelectDiff'),
    selectLocate: document.getElementById('shushuSelectLocate'),
    btnEvent: document.getElementById('shushuBtnEvent'),
    filterCard: document.getElementById('shushuFilterCard'),
    filterHeader: document.getElementById('shushuFilterHeader'),
    filterBody: document.getElementById('shushuFilterBody'),
    filterGroups: document.getElementById('shushuFilterGroups'),
    btnSelectAll: document.getElementById('shushuSelectAll'),
    btnClearAll: document.getElementById('shushuClearAll'),
    floorsPanel: document.getElementById('shushuFloorsPanel'),
    floorsList: document.getElementById('shushuFloorsList'),
    buildingTitle: document.getElementById('shushuBuildingTitle'),
    btnZoomIn: document.getElementById('shushuZoomIn'),
    btnZoomOut: document.getElementById('shushuZoomOut'),
    btnResetView: document.getElementById('shushuResetView'),
    btnCrosshair: document.getElementById('shushuCrosshairBtn'),
    crosshairHud: document.getElementById('shushuCrosshairHud'),
    crosshairLineV: document.getElementById('shushuCrosshairLineV'),
    crosshairLineH: document.getElementById('shushuCrosshairLineH'),
    crosshairLabel: document.getElementById('shushuCrosshairLabel'),
    scaleBar: document.getElementById('shushuScaleBar'),
    scaleLabel: document.getElementById('shushuScaleLabel')
  };

  // Initialize Leaflet Map Instance
  function initMap() {
    mapInstance = L.map('shushuMapCanvas', {
      crs: L.CRS.Simple,
      attributionControl: false,
      zoomControl: false,
      minZoom: 1,
      maxZoom: 8,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      preferCanvas: true,
      wheelDebounceTime: 40,
      wheelPxPerZoomLevel: 60,
      bounceAtZoomLimits: false,
      maxBoundsViscosity: 0.7
    });

    markerGroup = L.layerGroup().addTo(mapInstance);
    regionGroup = L.layerGroup().addTo(mapInstance);
    waterGroup = L.layerGroup().addTo(mapInstance);

    // Zoom and View change events for Scale Bar
    mapInstance.on('zoomend moveend', updateScale);

    // Crosshair tool mouse movement
    mapInstance.on('mousemove', onCrosshairMove);
    mapInstance.on('click', onCrosshairClick);

    // Top Right Controls
    el.btnZoomIn.onclick = () => mapInstance.zoomIn(0.5);
    el.btnZoomOut.onclick = () => mapInstance.zoomOut(0.5);
    el.btnResetView.onclick = resetView;
    el.btnCrosshair.onclick = toggleCrosshair;

    // Filter Accordion Collapse
    el.filterHeader.onclick = () => {
      filterCollapsed = !filterCollapsed;
      el.filterCard.classList.toggle('is-collapsed', filterCollapsed);
    };

    // Filter Quick Actions
    el.btnSelectAll.onclick = () => {
      if (!currentData) return;
      currentData.map.types.forEach(item => selectedTypes.add(item.id));
      renderCategoryGrid();
      renderMarkers();
    };

    el.btnClearAll.onclick = () => {
      selectedTypes.clear();
      renderCategoryGrid();
      renderMarkers();
    };

    // Prevent text selection when dragging or double-clicking map
    const canvas = document.getElementById('shushuMapCanvas');
    if (canvas) {
      canvas.addEventListener('selectstart', e => e.preventDefault());
      canvas.addEventListener('dragstart', e => e.preventDefault());
      canvas.addEventListener('mousedown', e => {
        if (!e.target.closest('input, select, textarea, button, a')) {
          if (window.getSelection) window.getSelection().removeAllRanges();
        }
      });
    }
    window.addEventListener('selectstart', e => {
      if (e.target && (e.target.closest('#shushuMapCanvas') || e.target.closest('.leaflet-container'))) {
        e.preventDefault();
      }
    });
  }

  // Load Map Data
  async function loadMap(mapKey) {
    if (!mapInstance) initMap();
    currentMapKey = mapKey;
    localStorage.setItem('shushu_mapKey', currentMapKey);
    currentFloorIndex = null;
    selectedTypes.clear();

    if (el.loader) el.loader.classList.remove('is-hidden');

    try {
      const entry = MAP_CATALOG[mapKey];
      const resp = await fetch(`${entry.file}?v=${Date.now()}`);
      if (!resp.ok) throw new Error('Không thể tải dữ liệu bản đồ: ' + entry.file);
      currentData = await resp.json();

      // Initialize all marker types as active by default so items are shown & buttons are active
      selectedTypes.clear();
      (currentData.map.types || []).forEach(item => selectedTypes.add(item.id));

      updateMapTabs();
      updateSubBar();
      setupMapLayer();
      renderCategoryGrid();
      renderMarkers();
      renderRegions();
      renderWaters();
      updateFloorsPanel();
    } catch (err) {
      console.error(err);
      alert('Lỗi tải bản đồ: ' + err.message);
    } finally {
      if (el.loader) {
        setTimeout(() => el.loader.classList.add('is-hidden'), 200);
      }
    }
  }

  function calcBoundsZoom(map, bounds, minZ) {
    if (!map || !bounds) return minZ || 1;
    try {
      const bz = map.getBoundsZoom(bounds, true);
      return Math.max(minZ, Math.ceil(4 * bz) / 4);
    } catch (e) {
      return minZ || 1;
    }
  }

  // Setup Tile Layer and Bounds
  function setupMapLayer() {
    if (tileLayer) {
      mapInstance.removeLayer(tileLayer);
      tileLayer = null;
    }

    // Unlock previous bounds and minZoom before applying new map/floor bounds
    mapInstance.setMinZoom(0);
    mapInstance.options.minZoom = 0;
    mapInstance.setMaxBounds([[-10000, -10000], [10000, 10000]]);

    const isFloor = currentFloorIndex !== null && currentData.map.floorInfo?.floors[currentFloorIndex];
    let maxBounds, minZoomAllowed, initX, initY, initZoom;

    if (isFloor) {
      const fl = currentData.map.floorInfo.floors[currentFloorIndex];
      const n = L.latLng(fl.latLngX, fl.latLngY);
      const l = L.latLng((fl.boundsH - 70) * fl.pixelToLatLngRatio, fl.boundsW * fl.pixelToLatLngRatio);
      maxBounds = L.latLngBounds(n, l);
      minZoomAllowed = fl.minZoom || 3.5;
      initX = fl.initX;
      initY = fl.initY;
      initZoom = fl.initZoom;

      tileLayer = L.tileLayer(`/assets/maps/tiles/${fl.tileDir}/{z}_{x}_{y}.jpg`, {
        tileSize: 512,
        zoomOffset: -1,
        noWrap: false,
        minZoom: 1,
        maxZoom: 8,
        maxNativeZoom: 5
      }).addTo(mapInstance);
    } else {
      const cfg = currentData.map.config;
      const n = L.latLng(0, 0);
      const l = L.latLng(-((cfg.boundsH - 70) * 1), -1 * cfg.boundsW);
      maxBounds = L.latLngBounds(n, l);
      minZoomAllowed = cfg.minZoom || 2.5;
      initX = cfg.initX;
      initY = cfg.initY;
      initZoom = cfg.initZoom;

      const tileDir = (eventActive && cfg.randomTileDir) ? cfg.randomTileDir : cfg.tileDir;

      tileLayer = L.tileLayer(`/assets/maps/tiles/${tileDir}/{z}_{x}_{y}.jpg`, {
        tileSize: 256,
        noWrap: false,
        minZoom: Math.max(1, Math.floor(minZoomAllowed)),
        maxZoom: 8,
        minNativeZoom: Math.max(1, Math.floor(minZoomAllowed)),
        maxNativeZoom: 4
      }).addTo(mapInstance);
    }

    // For floors, ensure minZoom does not exceed the zoom needed to fit the building on screen
    let fitMinZ;
    if (isFloor) {
      const bz = mapInstance.getBoundsZoom(maxBounds, true);
      fitMinZ = Math.max(1, Math.min(minZoomAllowed, Math.floor(4 * bz) / 4));
    } else {
      fitMinZ = calcBoundsZoom(mapInstance, maxBounds, minZoomAllowed);
    }

    mapInstance.setMinZoom(fitMinZ);
    mapInstance.options.minZoom = fitMinZ;

    const paddedBounds = maxBounds.pad(0.35);
    mapInstance.setMaxBounds(paddedBounds);

    if (isFloor) {
      const center = maxBounds.contains([initX, initY]) ? [initX, initY] : maxBounds.getCenter();
      const targetZoom = Math.max(initZoom || 3, fitMinZ);
      mapInstance.setView(center, targetZoom, { animate: false });
    } else {
      mapInstance.setView([initX, initY], Math.max(initZoom, fitMinZ), { animate: false });
    }
  }

  function resetView() {
    if (!currentData || !mapInstance) return;
    const isFloor = currentFloorIndex !== null && currentData.map.floorInfo?.floors[currentFloorIndex];
    if (isFloor) {
      const fl = currentData.map.floorInfo.floors[currentFloorIndex];
      const n = L.latLng(fl.latLngX, fl.latLngY);
      const l = L.latLng((fl.boundsH - 70) * fl.pixelToLatLngRatio, fl.boundsW * fl.pixelToLatLngRatio);
      const bounds = L.latLngBounds(n, l);
      const center = bounds.contains([fl.initX, fl.initY]) ? [fl.initX, fl.initY] : bounds.getCenter();
      mapInstance.flyTo(center, Math.max(fl.initZoom || 3, mapInstance.getMinZoom()), { duration: 0.5 });
    } else {
      const cfg = currentData.map.config;
      mapInstance.flyTo([cfg.initX, cfg.initY], cfg.initZoom, { duration: 0.5 });
    }
  }

  // Update Map Navigation Tabs
  function updateMapTabs() {
    el.mapsStrip.innerHTML = '';
    for (const [key, info] of Object.entries(MAP_CATALOG)) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `shushu-map-tab ${key === currentMapKey ? 'active' : ''}`;
      btn.textContent = t(info.nameZh, info.nameVi);
      btn.onclick = () => {
        if (key !== currentMapKey) loadMap(key);
      };
      el.mapsStrip.appendChild(btn);
    }
  }

  // Update Difficulties, Quick Locate & Event Bar
  function updateSubBar() {
    // Difficulty: Sort in standard order Dễ (normal) -> Thường (secret) -> Khó (topsecret)
    el.selectDiff.innerHTML = '';
    const diffs = (currentData.map.difficulties || []).slice();
    const diffOrder = { normal: 1, secret: 2, topsecret: 3 };
    diffs.sort((a, b) => (diffOrder[a.key] || 99) - (diffOrder[b.key] || 99));

    // Ensure currentDifficulty exists in the current map's difficulty options
    if (diffs.length > 0 && !diffs.some(d => d.key === currentDifficulty)) {
      currentDifficulty = diffs[0].key;
      localStorage.setItem('shushu_diff', currentDifficulty);
    }

    diffs.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.key;
      opt.textContent = t(d.label, d.label);
      el.selectDiff.appendChild(opt);
    });
    el.selectDiff.value = currentDifficulty;
    el.selectDiff.onchange = () => {
      currentDifficulty = el.selectDiff.value;
      localStorage.setItem('shushu_diff', currentDifficulty);
      renderCategoryGrid();
      renderMarkers();
    };

    // Quick Locate Regions
    el.selectLocate.innerHTML = '<option value="">' + t('快速定位', 'Định vị nhanh') + '</option>';
    const regions = currentData.map.regions || [];
    regions.forEach((r, idx) => {
      const opt = document.createElement('option');
      opt.value = String(idx);
      opt.textContent = t(r.name, r.name);
      el.selectLocate.appendChild(opt);
    });
    el.selectLocate.onchange = () => {
      const idx = el.selectLocate.value;
      if (idx === '') return;
      const r = regions[Number(idx)];
      if (!r) return;
      const isFloor = currentFloorIndex !== null;
      const floorBj = isFloor ? currentData.map.floorInfo?.bj : 128;
      const pos = worldToMapPos(r.x, r.y, currentData.map.config, isFloor, floorBj);
      mapInstance.flyTo([pos.y, pos.x], 5, { duration: 0.6 });
    };

    // Event Button (e.g. 坠机事件)
    const eventDef = currentData.map.eventDef;
    if (eventDef) {
      el.btnEvent.style.display = 'block';
      el.btnEvent.textContent = t(eventDef.label, eventDef.label);
      el.btnEvent.onclick = () => {
        eventActive = !eventActive;
        el.btnEvent.classList.toggle('active', eventActive);
        renderCategoryGrid();
        renderMarkers();
      };
    } else {
      el.btnEvent.style.display = 'none';
    }
  }

  // Category Grid (Identical to Shushu.fan with Interactive Toggles)
  function renderCategoryGrid() {
    el.filterGroups.innerHTML = '';
    const groups = currentData.map.groups || [];
    const types = currentData.map.types || [];
    const activeMarkers = getActiveMarkers();

    // Calculate count per type for currently active markers
    const counts = new Map();
    activeMarkers.forEach(m => {
      counts.set(m.typeId, (counts.get(m.typeId) || 0) + 1);
    });

    // Count selected vs total active types
    const availableTypes = types.filter(tItem => (counts.get(tItem.id) || 0) > 0);
    const selectedCount = availableTypes.filter(tItem => selectedTypes.has(tItem.id)).length;

    // Update filter card header counter
    const headerTitle = el.filterHeader.querySelector('span');
    if (headerTitle) {
      headerTitle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
        Bộ lọc đánh dấu <span style="font-size:11px;opacity:0.75;margin-left:4px;font-weight:600;">(${selectedCount}/${availableTypes.length})</span>
      `;
    }

    groups.forEach(g => {
      // Find types in this group that have count > 0 in active markers
      const groupTypes = types.filter(tItem => tItem.group === g.id && (counts.get(tItem.id) || 0) > 0);
      if (groupTypes.length === 0) return;

      const groupSec = document.createElement('div');
      groupSec.className = 'shushu-group-sec';

      // Header row
      const groupHead = document.createElement('div');
      groupHead.className = 'shushu-group-head';

      const groupSelectedCount = groupTypes.filter(tItem => selectedTypes.has(tItem.id)).length;
      const isAllGroupSelected = groupSelectedCount === groupTypes.length;

      // Group title button (collapses/expands)
      const titleBtn = document.createElement('button');
      titleBtn.type = 'button';
      titleBtn.className = 'shushu-group-title-btn';
      titleBtn.innerHTML = `
        <span class="shushu-group-chevron ${collapsedGroups.has(g.id) ? 'collapsed' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </span>
        <span>${t(g.title, g.title)}</span>
        <span class="shushu-group-count">(${groupSelectedCount}/${groupTypes.length})</span>
      `;
      titleBtn.onclick = () => {
        if (collapsedGroups.has(g.id)) {
          collapsedGroups.delete(g.id);
        } else {
          collapsedGroups.add(g.id);
        }
        renderCategoryGrid();
      };

      // Group quick toggle button (Bật / Tắt toàn bộ nhóm)
      const toggleActionBtn = document.createElement('button');
      toggleActionBtn.type = 'button';
      toggleActionBtn.className = `shushu-group-toggle-action ${isAllGroupSelected ? 'active' : ''}`;
      toggleActionBtn.textContent = isAllGroupSelected ? 'Tắt' : 'Bật';
      toggleActionBtn.title = isAllGroupSelected ? 'Tắt tất cả vật phẩm trong nhóm này' : 'Bật tất cả vật phẩm trong nhóm này';

      toggleActionBtn.onclick = (e) => {
        e.stopPropagation();
        if (isAllGroupSelected) {
          groupTypes.forEach(tItem => selectedTypes.delete(tItem.id));
        } else {
          groupTypes.forEach(tItem => selectedTypes.add(tItem.id));
        }
        renderCategoryGrid();
        renderMarkers();
      };

      groupHead.appendChild(titleBtn);
      groupHead.appendChild(toggleActionBtn);
      groupSec.appendChild(groupHead);

      // Grid of item tiles (if not collapsed)
      if (!collapsedGroups.has(g.id)) {
        const grid = document.createElement('div');
        grid.className = 'shushu-grid-5';

        groupTypes.forEach(typeItem => {
          const btn = document.createElement('button');
          btn.type = 'button';
          const isAct = selectedTypes.has(typeItem.id);
          btn.className = `shushu-tile-btn ${isAct ? 'active' : ''}`;
          const count = counts.get(typeItem.id) || 0;
          const iconSrc = resolveIconUrl(typeItem.icon);
          const typeName = t(typeItem.name, typeItem.name);

          btn.title = `${typeName} (${count}) — Nhấp để ${isAct ? 'tắt' : 'bật'}`;
          btn.innerHTML = `
            <img src="${iconSrc}" alt="" loading="lazy">
            <span class="shushu-tile-name">${typeName}</span>
            <span class="shushu-tile-badge">${count}</span>
          `;

          btn.onclick = () => {
            if (selectedTypes.has(typeItem.id)) {
              selectedTypes.delete(typeItem.id);
            } else {
              selectedTypes.add(typeItem.id);
            }
            renderCategoryGrid();
            renderMarkers();
          };

          grid.appendChild(btn);
        });

        groupSec.appendChild(grid);
      }

      el.filterGroups.appendChild(groupSec);
    });
  }

  // Check appearance condition by difficulty and event (Shushu appear definition)
  function checkAppear(m, difficulty, eventKey) {
    if (!m.appear || m.appear.length === 0) return true;
    const ev = eventKey || null;
    return m.appear.some(a => a.difficulty === difficulty && (a.event ?? null) === ev);
  }

  // Active Markers Filter Logic (Floor + Difficulty/Event)
  function getActiveMarkers() {
    if (!currentData || !currentData.markers) return [];
    let list = currentData.markers;

    // Filter by Floor:
    // If a specific floor is active, only show markers on that floor
    if (currentFloorIndex !== null) {
      list = list.filter(m => m.floor === currentFloorIndex);
    }

    // Filter by Difficulty & Event
    const eventKey = (eventActive && currentData.map.eventDef?.key) ? currentData.map.eventDef.key : null;
    list = list.filter(m => checkAppear(m, currentDifficulty, eventKey));

    return list;
  }

  // Render Markers on Map (Strictly filtered by selectedTypes)
  function renderMarkers() {
    markerGroup.clearLayers();
    if (!currentData) return;

    let markers = getActiveMarkers();

    // STRICT FILTER: Only show markers whose typeId is in selectedTypes
    markers = markers.filter(m => selectedTypes.has(m.typeId));

    const cfg = currentData.map.config;
    const isFloor = currentFloorIndex !== null;
    const floorBj = isFloor ? currentData.map.floorInfo?.bj : 128;
    const typeMap = new Map((currentData.map.types || []).map(tItem => [tItem.id, tItem]));

    markers.forEach(m => {
      const pos = worldToMapPos(m.x, m.y, cfg, isFloor, floorBj);
      const typeInfo = typeMap.get(m.typeId) || { name: m.typeId, icon: m.icon };
      const iconUrl = resolveIconUrl(m.icon || typeInfo.icon);

      const markerIcon = L.divIcon({
        className: 'dfmap-icon',
        html: `<img src="${iconUrl}" alt="">`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const leafMarker = L.marker([pos.y, pos.x], {
        icon: markerIcon,
        zIndexOffset: 600
      });

      // Shushu Popup
      const mTitle = t(m.title || typeInfo.name, typeInfo.name);
      const mLocation = t(m.location || m.area || m.zone, '');
      const mCondition = tCond(m.pickupNote || m.appearNote || m.extractNote || '');

      let popupHtml = `
        <div class="dfmap-popup-title">${mTitle}</div>
        ${mLocation ? `<div class="dfmap-popup-tag">${mLocation}</div>` : ''}
        ${mCondition ? `<div class="dfmap-popup-condition">◇ ${mCondition}</div>` : ''}
        <div class="dfmap-popup-info" style="margin-top:4px;font-size:10px;opacity:0.6;">
          X: ${Math.round(m.x)}, Y: ${Math.round(m.y)}
        </div>
      `;

      if (m.floor !== undefined && m.floor !== null && m.floor !== currentFloorIndex) {
        const floorDef = currentData.map.floorInfo?.floors?.[m.floor];
        const floorName = floorDef ? t(floorDef.name, `Tầng ${m.floor}`) : `Tầng ${m.floor}`;
        popupHtml += `<button type="button" class="dfmap-floor-link" onclick="window.ShushuMap.switchFloor(${m.floor})">Chuyển tới ${floorName}</button>`;
      }

      leafMarker.bindPopup(popupHtml, {
        className: 'dfmap-popup',
        offset: [0, -10]
      });

      markerGroup.addLayer(leafMarker);
    });
  }

  // Floating Region Labels
  function renderRegions() {
    regionGroup.clearLayers();
    if (!currentData || !currentData.map.regions) return;

    const isFloor = currentFloorIndex !== null;
    if (isFloor) return; // Hide regions when zoomed into floor

    const cfg = currentData.map.config;
    currentData.map.regions.forEach(r => {
      const pos = worldToMapPos(r.x, r.y, cfg, false, 128);
      const labelIcon = L.divIcon({
        className: 'dfmap-region-label',
        html: `<span>${t(r.name, r.name)}</span>`,
        iconSize: [1, 1]
      });
      const m = L.marker([pos.y, pos.x], {
        icon: labelIcon,
        interactive: false,
        keyboard: false
      });
      regionGroup.addLayer(m);
    });
  }

  // Water / Hazard Polygons
  function renderWaters() {
    waterGroup.clearLayers();
    if (!currentData || !currentData.map.waters) return;

    const isFloor = currentFloorIndex !== null;
    if (isFloor) return;

    const cfg = currentData.map.config;
    currentData.map.waters.forEach(w => {
      const latlngs = w.points.map(pt => {
        const p = worldToMapPos(pt.x, pt.y, cfg, false, 128);
        return [p.y, p.x];
      });
      const poly = L.polygon(latlngs, w.style || { color: '#8FC7F2', weight: 1, dashArray: '1, 3', fillOpacity: 0.15 });
      waterGroup.addLayer(poly);
    });
  }

  // Floor Switcher Floating Card
  function updateFloorsPanel() {
    const floorInfo = currentData.map.floorInfo;
    if (!floorInfo || !floorInfo.floors || floorInfo.floors.length === 0) {
      el.floorsPanel.style.display = 'none';
      return;
    }

    el.floorsPanel.style.display = 'flex';
    const buildings = floorInfo.buildings || [];
    const activeFloor = currentFloorIndex !== null ? floorInfo.floors[currentFloorIndex] : null;
    let activeBuilding = activeFloor ? buildings.find(b => b.id === activeFloor.building) : null;
    if (!activeBuilding && buildings.length > 0) activeBuilding = buildings[0];

    el.buildingTitle.textContent = activeBuilding ? t(activeBuilding.name, activeBuilding.name) : 'CÁC TẦNG';
    el.floorsList.innerHTML = '';

    // Ground button
    const btnGround = document.createElement('button');
    btnGround.type = 'button';
    btnGround.className = `shushu-floor-btn ${currentFloorIndex === null ? 'active' : ''}`;
    btnGround.textContent = t('地面', 'Mặt đất');
    btnGround.title = 'Xem toàn bộ bản đồ mặt đất';
    btnGround.onclick = () => {
      currentFloorIndex = null;
      setupMapLayer();
      renderCategoryGrid();
      renderMarkers();
      renderRegions();
      renderWaters();
      updateFloorsPanel();
    };
    el.floorsList.appendChild(btnGround);

    if (buildings.length <= 1) {
      // Single building: render simple buttons
      floorInfo.floors.forEach((fl, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `shushu-floor-btn ${currentFloorIndex === idx ? 'active' : ''}`;
        const floorShortName = fl.name.match(/\b(B\d+|\d+F)\b/i)?.[1] || fl.name;
        btn.textContent = t(floorShortName, floorShortName);
        btn.title = t(fl.name, fl.name);
        btn.onclick = () => {
          currentFloorIndex = idx;
          setupMapLayer();
          renderCategoryGrid();
          renderMarkers();
          renderRegions();
          renderWaters();
          updateFloorsPanel();
        };
        el.floorsList.appendChild(btn);
      });
    } else {
      // Multiple buildings (e.g. Thung lũng Layali: Khách sạn & Trạm Radar; AZ3: 3 buildings)
      buildings.forEach(b => {
        const groupWrap = document.createElement('div');
        groupWrap.className = 'shushu-floor-building-group';
        groupWrap.style.cssText = 'display:flex;flex-direction:column;gap:3px;margin-top:6px;padding-top:4px;border-top:1px solid rgba(255,255,255,0.08);width:100%;';

        const bTitle = document.createElement('div');
        bTitle.className = 'shushu-floor-bname';
        bTitle.style.cssText = 'font-size:10px;font-weight:700;color:var(--theme);text-transform:uppercase;letter-spacing:0.4px;padding:2px 4px;';
        bTitle.textContent = t(b.name, b.name);
        groupWrap.appendChild(bTitle);

        const bRow = document.createElement('div');
        bRow.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;';

        floorInfo.floors.forEach((fl, idx) => {
          if (fl.building !== b.id) return;
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `shushu-floor-btn ${currentFloorIndex === idx ? 'active' : ''}`;
          const floorShortName = fl.name.match(/\b(B\d+|\d+F)\b/i)?.[1] || fl.name;
          btn.textContent = t(floorShortName, floorShortName);
          btn.title = `${t(b.name, b.name)} - ${t(floorShortName, floorShortName)}`;
          btn.onclick = () => {
            currentFloorIndex = idx;
            setupMapLayer();
            renderCategoryGrid();
            renderMarkers();
            renderRegions();
            renderWaters();
            updateFloorsPanel();
          };
          bRow.appendChild(btn);
        });

        groupWrap.appendChild(bRow);
        el.floorsList.appendChild(groupWrap);
      });
    }
  }

  // Crosshair Picker Tool
  function toggleCrosshair() {
    crosshairActive = !crosshairActive;
    el.btnCrosshair.classList.toggle('active', crosshairActive);
    el.crosshairHud.style.display = crosshairActive ? 'block' : 'none';
    if (!crosshairActive) {
      el.crosshairLineV.style.display = 'none';
      el.crosshairLineH.style.display = 'none';
      el.crosshairLabel.style.display = 'none';
    }
  }

  function onCrosshairMove(e) {
    if (!crosshairActive || !currentData) return;
    const container = el.canvas.getBoundingClientRect();
    const x = e.originalEvent.clientX - container.left;
    const y = e.originalEvent.clientY - container.top;

    el.crosshairLineV.style.display = 'block';
    el.crosshairLineV.style.left = `${x}px`;

    el.crosshairLineH.style.display = 'block';
    el.crosshairLineH.style.top = `${y}px`;

    const isFloor = currentFloorIndex !== null;
    const floorBj = isFloor ? currentData.map.floorInfo?.bj : 128;
    const world = mapPosToWorld(e.latlng.lng, e.latlng.lat, currentData.map.config, isFloor, floorBj);

    el.crosshairLabel.style.display = 'block';
    el.crosshairLabel.style.left = `${x + 12}px`;
    el.crosshairLabel.style.top = `${y - 24}px`;
    el.crosshairLabel.textContent = `X: ${world.worldX.toFixed(1)}, Y: ${world.worldY.toFixed(1)}`;
  }

  function onCrosshairClick(e) {
    if (!crosshairActive || !currentData) return;
    const isFloor = currentFloorIndex !== null;
    const floorBj = isFloor ? currentData.map.floorInfo?.bj : 128;
    const world = mapPosToWorld(e.latlng.lng, e.latlng.lat, currentData.map.config, isFloor, floorBj);
    const coordsText = `"x": ${world.worldX.toFixed(1)}, "y": ${world.worldY.toFixed(1)}`;

    navigator.clipboard.writeText(coordsText).then(() => {
      alert('Đã sao chép tọa độ: ' + coordsText);
      toggleCrosshair();
    }).catch(() => {});
  }

  // Scale Bar Update
  function updateScale() {
    if (!mapInstance || !currentData?.map.config?.metersPerUnit) return;
    const zoom = mapInstance.getZoom();
    const cfg = currentData.map.config;
    const metersPerPixel = (cfg.width / Math.abs(cfg.boundsW)) * cfg.metersPerUnit / Math.pow(2, zoom);
    const targetPx = 80;
    const targetMeters = targetPx * metersPerPixel;

    const scales = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000];
    const bestScale = scales.reduce((prev, curr) => Math.abs(curr - targetMeters) < Math.abs(prev - targetMeters) ? curr : prev);

    const actualPx = Math.round(bestScale / metersPerPixel);
    el.scaleBar.style.width = `${actualPx}px`;
    el.scaleLabel.textContent = bestScale >= 1000 ? `${bestScale / 1000}km` : `${bestScale}m`;
  }

  // Expose API
  window.ShushuMap = {
    loadMap,
    switchFloor: (floor) => {
      if (currentData?.map.floorInfo?.floors) {
        currentFloorIndex = Math.max(0, Math.min(floor, currentData.map.floorInfo.floors.length - 1));
        setupMapLayer();
        renderCategoryGrid();
        renderMarkers();
        updateFloorsPanel();
      }
    },
    selectAll: () => {
      if (!currentData || !currentData.map.types) return;
      currentData.map.types.forEach(item => selectedTypes.add(item.id));
      renderCategoryGrid();
      renderMarkers();
    },
    clearAll: () => {
      selectedTypes.clear();
      renderCategoryGrid();
      renderMarkers();
    },
    toggleType: (typeId) => {
      if (selectedTypes.has(typeId)) selectedTypes.delete(typeId);
      else selectedTypes.add(typeId);
      renderCategoryGrid();
      renderMarkers();
    },
    getSelectedTypes: () => Array.from(selectedTypes)
  };

  // Start on Load
  document.addEventListener('DOMContentLoaded', () => {
    initMap();
    loadMap(currentMapKey);
  });
})();
