const byId = id => document.getElementById(id);
const elements = {
  mapChoice: byId('mapChoice'), variantChoice: byId('variantChoice'), regionChoice: byId('regionChoice'),
  search: byId('mapSearch'), categories: byId('mapCategories'), list: byId('mapPointList'),
  count: byId('mapResultCount'), detail: byId('mapPointDetail'), title: byId('mapStageTitle'),
  stageCount: byId('mapStageCount'), sidebar: byId('mapSidebar'), mobileFilters: byId('mapMobileFilters'),
  app: byId('mapApp'), currentName: byId('mapCurrentName'), selectors: byId('mapSelectors'),
  switchButton: byId('mapSwitchButton'), eventChoice: byId('mapEventChoice'), selectAll: byId('mapSelectAll'),
  sidebarReset: byId('mapSidebarReset'), collapseButton: byId('mapCollapseButton'),
  expandButton: byId('mapExpandButton'), railLayers: byId('mapRailLayers'), railLocate: byId('mapRailLocate'),
  warControls: byId('mapWarControls'), bpControls: byId('mapBpControls'),
  warSectors: byId('mapWarSectors'), warSectorTabs: byId('mapWarSectorTabs'),
  warSectorName: byId('mapWarSectorName'), warPrev: byId('mapWarPrev'), warNext: byId('mapWarNext')
};
const map = L.map('mapCanvas', {
  crs: L.CRS.Simple, zoomControl: false, attributionControl: false,
  minZoom: 0, maxZoom: 10, zoomSnap: .25, zoomDelta: .5, preferCanvas: true,
  inertia: true,
  maxBoundsViscosity: 0.3
});
map.createPane('regionLabels');
map.getPane('regionLabels').style.zIndex = '450';
map.getPane('regionLabels').style.pointerEvents = 'none';
let manifest = null;
let data = null;
let mode = 'ops';
const selectedCategories = new Set();
let showAllPoints = false;
let tileLayer = null;
let markerLayer = null;
let regionLayer = null;
let warLayer = null;
let markers = new Map();
let selectedPoint = null;
let loadNumber = 0;
let mapBounds = null;
let readyMapId = null;
let viewportTimer;
let activeWarSector = 0;
let warCamp = 'attack';
let warPlatform = 'pc';
let warCapture = false;
let bpCamp = 'attack';
let bpTab = 'normal';
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);
const normalizeText = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('vi');
const t = (text, fallback) => window.MAP_I18N ? window.MAP_I18N.t(text, fallback) : (text || fallback || '');
const tCond = (cond) => window.MAP_I18N ? window.MAP_I18N.tCondition(cond) : (cond || '');
const pointName = (point) => t(point.name || point.nameZh || 'Khác');
const brakkeshTop = new Set(['-461305','-460454','-459334','-460257','-459631','-459328.9688','-458885','-459003','-458692']);
const brakkeshBottom = new Set(['-458000','-457863','-457854','-457554','-457310','-457776','-457320','-457322','-457830']);
const titleFor = item => `${t(item.name)}${item.level ? ` · ${t(item.level)}` : ''}`;
const floorLabel = item => {
  const suffix = item.id.match(/_(B1|[1-4]F)$/i)?.[1];
  const level = t(item.level);
  return suffix ? `${level} · Tầng ${suffix}` : level;
};
const mapInfo = () => data?.isFloor ? (data.info.floorInfo?.info || data.info) : data?.info;
function floorView() {
  if (!data?.isFloor) return data?.info;
  const info = data.info.floorInfo?.info;
  if (!info) return data.info;
  const floor = data.id.match(/_(B1|[1-4]F)$/i)?.[1];
  const area = data.layer.match(/az3_(\d)_|cgxg_(ldz)_/)?.[1] || (data.layer.includes('ldz') ? 'ldz' : '');
  const groups = Object.values(info.floor || {});
  const matches = groups.flat().filter(item => item.floor_f?.toLowerCase() === floor?.toLowerCase());
  return matches.find(item => area && String(item.floor_address || '') === area) || matches[0] || info;
}
function updateZoomControls() {
  const zoom = map.getZoom();
  byId('mapZoomOut').disabled = zoom <= map.getMinZoom() + .001;
  byId('mapZoomIn').disabled = zoom >= map.getMaxZoom() - .001;
  elements.app.classList.toggle('is-map-overview', zoom < 2);
  if (map.getContainer().classList.contains('map-room-drawing')) {
    map.dragging.disable();
    return;
  }
  if (mapBounds) map.dragging.enable();
}
function refreshMapViewport() {
  if (!data || !mapBounds) return;
  map.invalidateSize({ pan: false });
  try {
    const viewBounds = map.getBounds();
    const mapW = mapBounds.getEast() - mapBounds.getWest();
    const mapH = mapBounds.getNorth() - mapBounds.getSouth();
    const viewW = viewBounds.getEast() - viewBounds.getWest();
    const viewH = viewBounds.getNorth() - viewBounds.getSouth();
    if (viewW <= mapW && viewH <= mapH) {
      map.panInsideBounds(mapBounds, { animate: false });
    }
  } catch {}
  updateZoomControls();
}
function scheduleViewportRefresh(delay = 280) {
  clearTimeout(viewportTimer);
  viewportTimer = setTimeout(refreshMapViewport, delay);
}
map.on('zoomend moveend', updateZoomControls);
function toMapPosition(point) {
  const info = mapInfo();
  if (!info) return null;
  const bj = data.isFloor ? (info.bj || 64) : 128;
  let x = Number(point.x), y = Number(point.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  if (data.layer === 'map_bks2' || data.layer === 'bks_1f') {
    if (brakkeshTop.has(String(y))) { x += 700; y -= 200; }
    if (brakkeshBottom.has(String(y))) { x += 900; y += 200; }
  }
  const xScale = info.width / bj, yScale = info.height / bj;
  let lng, lat;
  if (/cgxg|map_yc/.test(data.layer) || info.rotate === 90) {
    lng = bj - (info.centerY + y) / yScale;
    lat = -bj + (info.centerX - x) / xScale;
  } else if (info.rotate === -90) {
    lng = bj + (info.centerY + y) / yScale;
    lat = -bj - (info.centerX - x) / xScale;
  } else {
    lng = bj - (info.centerX - x) / xScale;
    lat = -bj - (info.centerY + y) / yScale;
  }
  return Number.isFinite(lat) && Number.isFinite(lng) ? [lat, lng] : null;
}
function iconPath(point) {
  const unavailable = new Set(['placeholder', 'xdjqz', 'xdjqzgjz', 'g_qy']);
  if (!/^[\w-]+$/.test(point.icon || '') || unavailable.has(point.icon)) return '/assets/maps/icons/fallback.svg';
  return `/assets/maps/icons/${data.mode === 'war' ? 'dzc_i' : data.mode === 'bp' ? 'bp' : 'lv3'}/${point.icon}.png`;
}
function makeIcon(point, active = false) {
  const source = iconPath(point);
  return L.divIcon({ className: `map-marker-icon${active ? ' active' : ''}`,
    html: source ? `<img src="${source}" alt="">` : '<span class="map-marker-fallback">+</span>',
    iconSize: active ? [42, 42] : [36, 36], iconAnchor: active ? [21, 21] : [18, 18] });
}
const isSpecial = item => item.mode === 'ops' && (/_s(?:_|$)/.test(item.id) || /Đêm/i.test(item.level));
const inMode = item => item.mode === mode;
function setMode(nextMode) {
  mode = nextMode;
  elements.app.dataset.mode = mode;
  elements.warControls.hidden = mode !== 'war';
  elements.bpControls.hidden = mode !== 'bp';
  elements.warSectors.hidden = mode !== 'war';
  document.querySelectorAll('[data-map-mode]').forEach(button => button.classList.toggle('active', button.dataset.mapMode === mode));
  const maps = manifest.maps.filter(item => inMode(item) && !item.isFloor);
  const names = [...new Set(maps.map(item => item.name))];
  elements.mapChoice.replaceChildren(...names.map(name => new Option(name, name)));
  if (mode === 'ops' && names.includes('Đập Zero')) elements.mapChoice.value = 'Đập Zero';
  if (mode === 'bp' && names.includes('Trạm trung chuyển Hàng không')) elements.mapChoice.value = 'Trạm trung chuyển Hàng không';
  updateVariants(mode === 'ops' ? 'ops-00' : mode === 'war' ? 'war-pc_pc' : mode === 'bp' ? 'bp-htzz' : undefined);
}
function updateVariants(preferredId) {
  const name = elements.mapChoice.value;
  const variants = manifest.maps.filter(item => inMode(item) && item.name === name);
  elements.variantChoice.replaceChildren(...variants.map(item => new Option(floorLabel(item), item.id)));
  const selected = variants.find(item => item.id === preferredId)
    || (mode === 'war' && variants.find(item =>
      item.id.includes(`_${warPlatform}`) && item.id.endsWith(warCapture ? '_s' : warPlatform)))
    || variants[0];
  if (selected) elements.variantChoice.value = selected.id;
  loadVariant(elements.variantChoice.value);
}
function selectRoomVariant(id) {
  if (!manifest) return false;
  const entry = manifest.maps.find(item => item.id === id);
  if (!entry) return false;
  if (entry.mode !== mode) setMode(entry.mode);
  elements.mapChoice.value = entry.name;
  updateVariants(id);
  return true;
}
function syncWarVariantButtons() {
  document.querySelectorAll('[data-war-platform]').forEach(button => {
    const active = button.dataset.warPlatform === warPlatform;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('[data-war-type]').forEach(button => {
    const active = (button.dataset.warType === 'capture') === warCapture;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
function selectWarVariant() {
  const chosen = manifest.maps.find(item => item.mode === 'war'
    && item.name === elements.mapChoice.value
    && item.id.endsWith(`_${warPlatform}${warCapture ? '_s' : ''}`));
  if (!chosen) return;
  elements.variantChoice.value = chosen.id;
  loadVariant(chosen.id);
}
function updateEvents() {
  if (data.mode !== 'ops') {
    elements.eventChoice.replaceChildren(new Option('Không có sự kiện', ''));
    elements.eventChoice.disabled = true;
    return;
  }
  const variants = manifest.maps.filter(item => inMode(item) && item.name === data.name && !item.isFloor && isSpecial(item));
  elements.eventChoice.replaceChildren(new Option('Không có sự kiện', ''), ...variants.map(item => new Option(item.level, item.id)));
  elements.eventChoice.value = variants.some(item => item.id === data.id) ? data.id : '';
  elements.eventChoice.disabled = variants.length === 0;
}
function updateRegions() {
  const regions = (Array.isArray(data.regions) ? data.regions : []).filter(item => item && item.name && Number.isFinite(Number(item.x)) && Number.isFinite(Number(item.y)));
  elements.regionChoice.replaceChildren(new Option('Chọn khu vực', ''), ...regions.map((item, index) => new Option(item.name, String(index))));
  if (regionLayer) map.removeLayer(regionLayer);
  regionLayer = L.layerGroup(regions.map(region => {
    const position = toMapPosition(region);
    if (!position) return null;
    return L.marker(position, {
      pane: 'regionLabels', interactive: false, keyboard: false,
      icon: L.divIcon({ className: 'map-region-label', html: `<span>${escapeHtml(region.name)}</span>`, iconSize: [1, 1] })
    });
  }).filter(Boolean)).addTo(map);
  elements.regionChoice.onchange = () => {
    const region = regions[Number(elements.regionChoice.value)];
    if (!region) return;
    const position = toMapPosition(region);
    if (position) map.flyTo(position, Math.max(map.getZoom(), 4), { duration: .65 });
  };
}
function activePoints() {
  if (!data) return [];
  if (data.mode === 'war') return data.war?.sectors?.[activeWarSector]?.points || data.points;
  if (data.mode === 'bp') {
    const camp = bpCamp === 'attack' ? 'Tấn công' : 'Phòng thủ';
    return data.points.filter(point => !point.camp || point.camp === camp);
  }
  return data.points;
}
const categoryKey = point => data?.mode === 'bp' ? point.category : pointName(point);
function renderWarSector(move = true) {
  if (warLayer) map.removeLayer(warLayer);
  warLayer = null;
  const sectors = data?.war?.sectors;
  if (!sectors?.length) return;
  activeWarSector = Math.min(activeWarSector, sectors.length - 1);
  const sector = sectors[activeWarSector];
  elements.warSectorTabs.replaceChildren(...sectors.map((item, index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = 'ABCD'[index] || String(index + 1);
    button.classList.toggle('active', index === activeWarSector);
    button.setAttribute('aria-label', item.name);
    button.addEventListener('click', () => chooseWarSector(index));
    return button;
  }));
  elements.warSectorName.textContent = sector.name;
  elements.warPrev.disabled = activeWarSector === 0;
  elements.warNext.disabled = activeWarSector === sectors.length - 1;
  const layers = [];
  for (const overlay of sector.overlays) {
    const attacking = /进攻|GTI/.test(overlay.region) || overlay.nameZh === '进攻方基地';
    const defending = /防守|HAAVK/.test(overlay.region) || overlay.nameZh === '防守方基地';
    const color = attacking ? (warCamp === 'attack' ? '#1ae990' : '#f04a4a')
      : defending ? (warCamp === 'attack' ? '#f04a4a' : '#1ae990') : '#d5e8e2';
    const border = overlay.border.map(([x, y]) => toMapPosition({ x, y })).filter(Boolean);
    if (border.length > 2) layers.push(L.polyline(border, { color, weight: 2.5, opacity: .9, interactive: false }));
    if (!overlay.visible || overlay.x === null || overlay.y === null) continue;
    const position = toMapPosition(overlay);
    if (!position) continue;
    let icon = overlay.icon;
    if (overlay.nameZh === '进攻方基地') icon = warCamp === 'attack' ? 'g_jdbsd_g' : 'g_jdbsd_r';
    if (overlay.nameZh === '防守方基地') icon = warCamp === 'attack' ? 'f_jdbsd_r' : 'f_jdbsd_g';
    layers.push(L.marker(position, { icon: makeIcon({ icon }), title: overlay.name }));
  }
  warLayer = L.layerGroup(layers).addTo(map);
  elements.stageCount.textContent = `${sector.points.length.toLocaleString('vi-VN')} ĐIỂM`;
  if (move) {
    const view = sector.view;
    map.flyTo([Number(view.initX) || -100, Number(view.initY) || 100], Number(view.initZoom) || 3, { duration: .5 });
  }
}
function chooseWarSector(index) {
  if (data?.mode !== 'war' || !data.war?.sectors?.[index]) return;
  activeWarSector = index;
  selectedCategories.clear();
  showAllPoints = false;
  elements.selectAll.checked = false;
  elements.search.value = '';
  renderWarSector();
  renderCategories();
  renderPoints();
}
async function loadVariant(id) {
  const sequence = ++loadNumber;
  const entry = manifest.maps.find(item => item.id === id);
  if (!entry) return;
  readyMapId = null;
  elements.title.textContent = 'ĐANG TẢI BẢN ĐỒ';
  try {
    const response = await fetch(`${entry.file}?v=20261007-modes-2`);
    if (!response.ok) throw new Error('Không tải được dữ liệu bản đồ');
    const nextData = await response.json();
    if (sequence !== loadNumber) return;
    data = nextData;
    if (data.mode === 'war') {
      warPlatform = /_mobile(?:_s)?$/.test(data.id) ? 'mobile' : 'pc';
      warCapture = /_s$/.test(data.id);
      syncWarVariantButtons();
    }
    selectedCategories.clear();
    showAllPoints = false;
    elements.selectAll.checked = false;
    selectedPoint = null;
    elements.detail.hidden = true;
    elements.search.value = '';
    map.stop();
    if (tileLayer) map.removeLayer(tileLayer);
    if (markerLayer) map.removeLayer(markerLayer);
    if (warLayer) { map.removeLayer(warLayer); warLayer = null; }
    activeWarSector = 0;
    if (data.mode === 'bp') { bpCamp = 'attack'; bpTab = 'normal'; }
    document.querySelectorAll('[data-bp-camp]').forEach(button => button.classList.toggle('active', button.dataset.bpCamp === bpCamp));
    document.querySelectorAll('[data-bp-tab]').forEach(button => button.classList.toggle('active', button.dataset.bpTab === bpTab));
    const view = floorView() || data.info;
    const tileBounds = manifest.tileBounds?.[data.layer]
      || { north: 0, west: 0, south: data.isFloor ? -128 : -256, east: data.isFloor ? 128 : 256,
        minNativeZoom: data.isFloor ? 5 : data.mode === 'bp' ? 1 : 2,
        maxNativeZoom: data.isFloor ? 6 : data.mode === 'bp' ? 3 : 4 };
    mapBounds = L.latLngBounds([tileBounds.south, tileBounds.west], [tileBounds.north, tileBounds.east]);
    const paddedBounds = mapBounds.pad(0.35);
    map.setMaxBounds(paddedBounds);
    const minZoomAllowed = Math.max(0, (tileBounds.minNativeZoom ?? 2) - 2);
    const maxZoomAllowed = Math.min(8, (tileBounds.maxNativeZoom ?? 4) + 1.5);
    map.setMinZoom(minZoomAllowed);
    map.setMaxZoom(maxZoomAllowed);
    map.setView([Number(view.initX) || -100, Number(view.initY) || 100], Math.min(Number(view.initZoom) || 3, maxZoomAllowed), { animate: false });
    tileLayer = L.tileLayer(`/assets/maps/tiles/${data.layer}/{z}_{x}_{y}.${data.mode === 'bp' ? 'png' : 'jpg'}`, {
      tileSize: data.isFloor ? 512 : 256, zoomOffset: data.isFloor ? -1 : 0,
      minZoom: minZoomAllowed, minNativeZoom: tileBounds.minNativeZoom,
      maxNativeZoom: tileBounds.maxNativeZoom, maxZoom: maxZoomAllowed,
      noWrap: true, keepBuffer: 8, updateWhenIdle: false
    }).addTo(map);
    if (data.isFloor) map.flyTo([Number(view.initX) || -100, Number(view.initY) || 100], Number(view.initZoom) || 3, { duration: .15 });
    elements.title.textContent = titleFor(data);
    elements.currentName.innerHTML = `${escapeHtml(data.name)} <small>(${escapeHtml(floorLabel(data))})</small>`;
    elements.stageCount.textContent = `${data.points.length.toLocaleString('vi-VN')} ĐIỂM`;
    updateEvents();
    updateRegions();
    renderWarSector(false);
    renderCategories();
    renderPoints();
    scheduleViewportRefresh(60);
    readyMapId = data.id;
    window.dispatchEvent(new CustomEvent('dfvn:map-loaded', { detail: { id:data.id } }));
  } catch {
    elements.title.textContent = 'KHÔNG TẢI ĐƯỢC BẢN ĐỒ';
    elements.list.innerHTML = '<p class="map-empty">Không thể tải dữ liệu. Hãy thử tải lại trang.</p>';
  }
}
function filteredPoints() {
  if (!data) return [];
  const query = normalizeText(elements.search.value.trim());
  if (!showAllPoints && selectedCategories.size === 0 && !query) return [];
  return activePoints().filter(point => {
    if (selectedCategories.size && !selectedCategories.has(categoryKey(point))) return false;
    if (!query) return true;
    const pName = pointName(point);
    return [pName, point.name, point.nameZh, point.area, point.zone, point.subName, point.roleName]
      .some(value => value && (normalizeText(t(value)).includes(query) || normalizeText(value).includes(query)));
  });
}
function renderCategories() {
  const counts = new Map();
  for (const point of activePoints()) {
    const key = categoryKey(point);
    const label = pointName(point);
    if (!counts.has(key)) counts.set(key, { key, label, count: 0, point });
    counts.get(key).count++;
  }
  const navigation = (Array.isArray(data.navigation) ? data.navigation : []).find(item => Array.isArray(item.typeList))?.typeList || [];
  const navByIcon = new Map(navigation.map((item, index) => [item.icon?.replace(/^nav_/, ''), { ...item, index }]));
  const navByName = new Map(navigation.map((item, index) => [item.name, { ...item, index }]));
  const warNavigation = data.mode === 'war' ? data.war?.sectors?.[activeWarSector]?.navigation || [] : [];
  const sections = data.mode === 'bp'
    ? new Map([[bpTab === 'role' ? 'Đặc vụ' : 'Điểm chung', (data.groups || [])
      .filter(group => group.type === bpTab)
      .map((group, index) => ({ key: group.key, label: t(group.name), count: counts.get(group.key)?.count || 0,
        point: { icon: group.icon }, order: index }))
      .filter(group => group.count > 0)]])
    : data.mode === 'war'
    ? new Map([...warNavigation.map(group => [t(group.title), []]), ['Khác', []]])
    : new Map([['Vật tư', []], ['Điểm xuất phát', []], ['Điểm rút lui', []], ['Khác', []]]);
  if (data.mode !== 'bp') for (const item of counts.values()) {
    const nav = navByIcon.get(item.point.icon) || navByName.get(item.point.nameZh);
    const type = Number(nav?.idType);
    const normalized = normalizeText(item.label);
    const group = data.mode === 'war'
      ? t(warNavigation.find(section => section.names.includes(item.point.nameZh))?.title || 'Khác')
      : type === 26 || /xuat phat|hoi sinh|spawn/.test(normalized) ? 'Điểm xuất phát'
        : type === 27 || /rut lui|so tan|rut quan|extra/.test(normalized) ? 'Điểm rút lui'
        : (type > 0 && type <= 25) || !/nhiem vu|thu linh|ca |tram don|boss/.test(normalized) ? 'Vật tư' : 'Khác';
    item.order = nav?.index ?? 999;
    if (!sections.has(group)) sections.set(group, []);
    sections.get(group).push(item);
  }
  elements.categories.replaceChildren();
  for (const [heading, items] of sections) {
    if (!items.length) continue;
    items.sort((a, b) => a.order - b.order || b.count - a.count);
    const section = document.createElement('section');
    section.className = 'map-category-section';
    const toggle = document.createElement('button');
    toggle.type = 'button'; toggle.className = 'map-category-heading';
    toggle.innerHTML = `${escapeHtml(heading)} <span aria-hidden="true">⌄</span>`;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.addEventListener('click', () => {
      section.classList.toggle('is-folded');
      toggle.setAttribute('aria-expanded', String(!section.classList.contains('is-folded')));
    });
    const grid = document.createElement('div');
    grid.className = 'map-category-grid';
    for (const item of items) {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'map-category-tile';
      button.classList.toggle('active', selectedCategories.has(item.key));
      button.setAttribute('aria-pressed', String(selectedCategories.has(item.key)));
      button.setAttribute('aria-label', `${item.label}, ${item.count} điểm`);
      button.innerHTML = `<span class="tile-art"><img src="${iconPath(item.point)}" alt=""><b>${item.count || ''}</b></span><span>${escapeHtml(item.label)}</span>`;
      button.addEventListener('click', () => {
        if (selectedCategories.has(item.key)) selectedCategories.delete(item.key);
        else selectedCategories.add(item.key);
        showAllPoints = false;
        elements.selectAll.checked = false;
        if (selectedCategories.size === 0) elements.search.value = '';
        renderCategories(); renderPoints();
      });
      grid.append(button);
    }
    section.append(toggle, grid);
    elements.categories.append(section);
  }
}
function renderPoints() {
  const points = filteredPoints();
  elements.count.textContent = points.length.toLocaleString('vi-VN');
  elements.list.hidden = !showAllPoints && selectedCategories.size === 0 && !elements.search.value.trim();
  selectedPoint = null;
  elements.detail.hidden = true;
  if (markerLayer) map.removeLayer(markerLayer);
  markers = new Map();
  const markerList = [];
  const fragment = document.createDocumentFragment();
  for (const point of points) {
    const position = toMapPosition(point);
    if (!position) continue;
    const pName = pointName(point);
    const marker = L.marker(position, { icon: makeIcon(point), title: pName });
    marker.on('click', () => selectPoint(point));
    markerList.push(marker); markers.set(point.id, marker);
    const row = document.createElement('button');
    row.type = 'button'; row.className = 'map-point-row'; row.dataset.pointId = String(point.id);
    const source = iconPath(point);
    row.innerHTML = `${source ? `<img src="${source}" alt="">` : '<i class="map-generic-pin">+</i>'}<span><b>${escapeHtml(pName)}</b><small>${escapeHtml(t(point.area || point.zone || point.region || `X ${Math.round(point.x)} · Y ${Math.round(point.y)}`))}</small></span>`;
    row.addEventListener('click', () => selectPoint(point));
    fragment.append(row);
  }
  markerLayer = L.layerGroup(markerList).addTo(map);
  elements.list.replaceChildren(fragment);
  if (!points.length) elements.list.innerHTML = '<p class="map-empty">Không tìm thấy điểm nào. Thử đổi từ khóa hoặc bộ lọc.</p>';
}
function selectPoint(point) {
  if (selectedPoint && markers.has(selectedPoint.id)) markers.get(selectedPoint.id).setIcon(makeIcon(selectedPoint));
  selectedPoint = point;
  const marker = markers.get(point.id);
  if (marker) marker.setIcon(makeIcon(point, true));
  const position = toMapPosition(point);
  if (position) map.flyTo(position, Math.max(map.getZoom(), Number(floorView()?.initZoom || 3) + .75), { duration: .5 });
  document.querySelectorAll('.map-point-row.active').forEach(row => row.classList.remove('active'));
  const row = elements.list.querySelector(`[data-point-id="${point.id}"]`);
  if (row) { row.classList.add('active'); row.scrollIntoView({ block: 'nearest' }); }
  const pName = t(point.subName || point.name || point.nameZh || 'Điểm đánh dấu');
  const details = [
    ['Khu vực', t(point.area || point.zone || point.大区域 || point.自定义区域)],
    ['Điều kiện xuất hiện', tCond(point.spawn || point['出现条件'])],
    ['Điều kiện nhặt', tCond(point.pickup || point['拾取条件'])],
    ['Điều kiện rút lui', tCond(point.exit)],
    ['Điều kiện kích hoạt', tCond(point.activate)],
    ['Tần suất', tCond(point.random || point['随机'])],
    ['Tầng', point.floor === null ? '' : (window.MAP_I18N?.data?.floors?.[String(point.floor)] || `Tầng ${point.floor}`)]
  ].filter(([, value]) => value && value !== '-');
  elements.detail.innerHTML = `<button type="button" class="detail-close" aria-label="Đóng chi tiết">×</button><h2>${escapeHtml(pName)}</h2>${details.length ? `<dl>${details.map(([label, value]) => `<dt>${label}</dt><dd>${escapeHtml(value)}</dd>`).join('')}</dl>` : '<p>Điểm đánh dấu trên bản đồ chiến thuật</p>'}<div class="detail-coordinate">TỌA ĐỘ BẢN ĐỒ · ${Number(point.x).toFixed(1)}, ${Number(point.y).toFixed(1)}</div>`;
  elements.detail.hidden = false;
  elements.detail.querySelector('.detail-close').onclick = () => { elements.detail.hidden = true; if (marker) marker.setIcon(makeIcon(point)); };
  if (window.matchMedia('(max-width:700px)').matches) closeMobileFilters();
}
function closeMobileFilters() {
  setSidebarCollapsed(true);
}
function setSidebarCollapsed(collapsed) {
  elements.app.classList.toggle('is-collapsed', collapsed);
  elements.collapseButton.setAttribute('aria-expanded', String(!collapsed));
  elements.expandButton.setAttribute('aria-expanded', String(!collapsed));
  elements.mobileFilters.setAttribute('aria-expanded', String(!collapsed));
  scheduleViewportRefresh();
}
elements.collapseButton.addEventListener('click', () => setSidebarCollapsed(true));
elements.expandButton.addEventListener('click', () => setSidebarCollapsed(false));
elements.railLayers.addEventListener('click', () => {
  setSidebarCollapsed(false);
  elements.selectors.hidden = false;
  setTimeout(() => elements.mapChoice.focus(), 280);
});
elements.railLocate.addEventListener('click', () => {
  setSidebarCollapsed(false);
  setTimeout(() => elements.regionChoice.focus(), 280);
});
elements.mobileFilters.addEventListener('click', () => setSidebarCollapsed(!elements.app.classList.contains('is-collapsed')));
elements.switchButton.addEventListener('click', () => {
  elements.selectors.hidden = !elements.selectors.hidden;
  if (!elements.selectors.hidden) elements.mapChoice.focus();
});
elements.mapChoice.addEventListener('change', () => updateVariants());
elements.variantChoice.addEventListener('change', () => loadVariant(elements.variantChoice.value));
document.querySelectorAll('[data-war-platform]').forEach(button => button.addEventListener('click', () => {
  warPlatform = button.dataset.warPlatform;
  syncWarVariantButtons();
  selectWarVariant();
}));
document.querySelectorAll('[data-war-type]').forEach(button => button.addEventListener('click', () => {
  warCapture = button.dataset.warType === 'capture';
  syncWarVariantButtons();
  selectWarVariant();
}));
elements.eventChoice.addEventListener('change', () => {
  const current = manifest.maps.find(item => item.id === elements.variantChoice.value);
  const next = elements.eventChoice.value || manifest.maps.find(item => item.name === current?.name && item.mode === current.mode && !item.isFloor && !isSpecial(item))?.id;
  if (next && [...elements.variantChoice.options].some(item => item.value === next)) {
    elements.variantChoice.value = next;
    loadVariant(next);
  }
});
elements.warPrev.addEventListener('click', () => chooseWarSector(activeWarSector - 1));
elements.warNext.addEventListener('click', () => chooseWarSector(activeWarSector + 1));
document.querySelectorAll('[data-war-camp]').forEach(button => button.addEventListener('click', () => {
  warCamp = button.dataset.warCamp;
  document.querySelectorAll('[data-war-camp]').forEach(item => item.classList.toggle('active', item === button));
  renderWarSector(false);
}));
document.querySelectorAll('[data-bp-camp]').forEach(button => button.addEventListener('click', () => {
  bpCamp = button.dataset.bpCamp;
  selectedCategories.clear();
  showAllPoints = false;
  elements.selectAll.checked = false;
  document.querySelectorAll('[data-bp-camp]').forEach(item => item.classList.toggle('active', item === button));
  renderCategories(); renderPoints();
}));
document.querySelectorAll('[data-bp-tab]').forEach(button => button.addEventListener('click', () => {
  bpTab = button.dataset.bpTab;
  selectedCategories.clear();
  showAllPoints = false;
  elements.selectAll.checked = false;
  document.querySelectorAll('[data-bp-tab]').forEach(item => item.classList.toggle('active', item === button));
  renderCategories(); renderPoints();
}));
elements.selectAll.addEventListener('change', () => {
  showAllPoints = elements.selectAll.checked;
  selectedCategories.clear();
  if (showAllPoints) elements.search.value = '';
  renderCategories(); renderPoints();
});
elements.sidebarReset.addEventListener('click', () => {
  selectedCategories.clear();
  showAllPoints = false;
  elements.selectAll.checked = false;
  elements.search.value = '';
  elements.regionChoice.value = '';
  renderCategories(); renderPoints();
});
let searchTimer;
elements.search.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(renderPoints, 140);
});
document.querySelectorAll('[data-map-mode]').forEach(button => button.addEventListener('click', () => {
  setMode(button.dataset.mapMode);
  if (compactMapScreen()) setSidebarCollapsed(true);
}));
byId('mapZoomIn').addEventListener('click', () => map.zoomIn(0.5));
byId('mapZoomOut').addEventListener('click', () => map.zoomOut(0.5));
byId('mapReset').addEventListener('click', () => {
  const view = data?.mode === 'war' ? data.war?.sectors?.[activeWarSector]?.view : floorView() || data?.info;
  if (view) map.flyTo([Number(view.initX) || -100, Number(view.initY) || 100], Number(view.initZoom) || 3);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeMobileFilters(); elements.detail.hidden = true; }
});
const compactMapScreen = () => window.matchMedia('(max-width:700px), (max-width:1000px) and (max-height:700px)').matches;
if (compactMapScreen()) setSidebarCollapsed(true);
window.addEventListener('resize', () => scheduleViewportRefresh());
window.addEventListener('orientationchange', () => {
  if (compactMapScreen()) setSidebarCollapsed(true);
  scheduleViewportRefresh(450);
});
fetch('/assets/maps/data/manifest.json?v=20261007-bounds-platform-6')
  .then(response => { if (!response.ok) throw new Error('Manifest unavailable'); return response.json(); })
  .then(value => { manifest = value; setMode('ops'); })
  .catch(() => { elements.title.textContent = 'KHÔNG TẢI ĐƯỢC BẢN ĐỒ'; elements.list.innerHTML = '<p class="map-empty">Không thể tải danh sách bản đồ. Hãy thử tải lại trang.</p>'; });
window.DFVNMap = { map, currentId: () => data?.id || null, readyId: () => readyMapId, selectRoomVariant, updateZoomControls,
  collapseSidebar: () => { if (compactMapScreen()) setSidebarCollapsed(true); elements.detail.hidden = true; } };

(() => {
  const controls = [];
  let opened = null;

  function enhanceSelect(select) {
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'map-select-trigger';
    trigger.id = `${select.id}Trigger`;
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    const text = document.createElement('span');
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrow.setAttribute('viewBox', '0 0 24 24');
    arrow.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'm7 10 5 5 5-5');
    arrow.append(path);
    trigger.append(text, arrow);

    const menu = document.createElement('div');
    menu.id = `${select.id}Menu`;
    menu.className = 'map-select-menu';
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', select.getAttribute('aria-label'));
    menu.hidden = true;
    document.body.append(menu);
    trigger.setAttribute('aria-controls', menu.id);
    select.classList.add('map-select-native');
    select.tabIndex = -1;
    select.setAttribute('aria-hidden', 'true');
    select.after(trigger);

    const close = (restoreFocus = false) => {
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      if (opened === control) opened = null;
      if (restoreFocus) trigger.focus();
    };
    const sync = () => {
      const selected = select.selectedOptions[0];
      text.textContent = selected?.textContent || 'Chọn';
      trigger.disabled = select.disabled || !select.options.length;
      trigger.setAttribute('aria-label', `${select.getAttribute('aria-label')}: ${text.textContent}`);
      trigger.title = text.textContent;
      for (const option of menu.children) option.setAttribute('aria-selected', String(option.dataset.value === select.value));
    };
    const open = () => {
      if (trigger.disabled) return;
      if (opened) opened.close();
      menu.replaceChildren(...Array.from(select.options, option => {
        const item = document.createElement('button');
        item.type = 'button';
        item.tabIndex = -1;
        item.setAttribute('role', 'option');
        item.dataset.value = option.value;
        item.textContent = option.textContent;
        item.disabled = option.disabled;
        item.addEventListener('click', () => {
          select.value = option.value;
          select.dispatchEvent(new Event('change', { bubbles:true }));
          sync();
          close(true);
        });
        return item;
      }));
      sync();
      const rect = trigger.getBoundingClientRect();
      const availableBelow = innerHeight - rect.bottom - 8;
      const availableAbove = rect.top - 8;
      const below = availableBelow >= Math.min(220, availableAbove);
      const height = Math.min(300, below ? availableBelow : availableAbove);
      const width = Math.min(Math.max(220, rect.width), innerWidth - 16);
      menu.style.width = `${width}px`;
      menu.style.left = `${Math.max(8, Math.min(rect.left, innerWidth - width - 8))}px`;
      menu.style.maxHeight = `${Math.max(44, height)}px`;
      menu.style.top = below ? `${rect.bottom + 4}px` : 'auto';
      menu.style.bottom = below ? 'auto' : `${innerHeight - rect.top + 4}px`;
      menu.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      opened = control;
      const selected = menu.querySelector('[aria-selected="true"]') || menu.firstElementChild;
      selected?.focus({ preventScroll:true });
      selected?.scrollIntoView({ block:'nearest' });
    };
    const control = { close, sync, trigger, menu };
    controls.push(control);
    trigger.addEventListener('click', () => menu.hidden ? open() : close());
    trigger.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); open(); }
    });
    menu.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(true); return; }
      if (event.key === 'Tab') { close(true); return; }
      const items = Array.from(menu.children).filter(item => !item.disabled);
      const index = items.indexOf(document.activeElement);
      let next;
      if (event.key === 'ArrowDown') next = items[(index + 1) % items.length];
      if (event.key === 'ArrowUp') next = items[(index - 1 + items.length) % items.length];
      if (event.key === 'Home') next = items[0];
      if (event.key === 'End') next = items.at(-1);
      if (next) { event.preventDefault(); next.focus(); }
    });
    select.addEventListener('change', sync);
    // Preserve existing map controls that focus the underlying select.
    select.addEventListener('focus', () => trigger.focus());
    new MutationObserver(() => { close(); sync(); }).observe(select, { childList:true, subtree:true, attributes:true, attributeFilter:['disabled','selected'] });
    sync();
  }

  ['mapChoice','variantChoice','regionChoice','mapEventChoice'].forEach(id => enhanceSelect(document.getElementById(id)));
  document.addEventListener('pointerdown', event => {
    if (opened && !opened.menu.contains(event.target) && !opened.trigger.contains(event.target)) opened.close();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') opened?.close(true); });
  window.addEventListener('resize', () => opened?.close());
  document.addEventListener('scroll', event => {
    if (opened && !opened.menu.contains(event.target)) opened.close();
  }, true);

  const updateWarSummary = () => {
    document.querySelectorAll('[data-war-camp]').forEach(button => button.setAttribute('aria-pressed', String(button.classList.contains('active'))));
    const platform = document.querySelector('[data-war-platform].active')?.textContent.trim() || 'PC';
    const type = document.querySelector('[data-war-type].active')?.textContent.trim().toLocaleLowerCase('vi') || 'công thủ';
    const camp = document.querySelector('[data-war-camp].active')?.dataset.warCamp === 'defend' ? 'Phòng thủ' : 'Tấn công';
    const label = `${platform} · ${type.charAt(0).toUpperCase() + type.slice(1)} · ${camp}`;
    document.getElementById('mapWarOptionsValue').textContent = label;
    document.getElementById('mapWarOptionsValue').title = label;
  };
  document.getElementById('mapWarControls').addEventListener('click', () => queueMicrotask(updateWarSummary));
  document.querySelector('.map-war-options').addEventListener('toggle', event => {
    if (event.target.open) event.target.scrollIntoView({ block:'nearest' });
  });
  window.addEventListener('dfvn:map-loaded', () => {
    controls.forEach(control => control.sync());
    updateWarSummary();
  });
  document.getElementById('mapSidebarReset').addEventListener('click', () => controls.forEach(control => control.sync()));
})();
