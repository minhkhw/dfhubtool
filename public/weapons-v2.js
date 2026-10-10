(() => {
  const names = [
    ['M7','ar'],['M4A1','ar'],['AKM','ar'],['AK-12','ar'],['AKS-74','ar'],['AKS-74U','ar'],['AUG','ar'],['ASh-12','ar'],['AS Val','ar'],['AR-57','ar'],['CI-19','ar'],['CAR-15','ar'],['G3','ar'],['K416','ar'],['K437','ar'],['KC17','ar'],['M16A4','ar'],['MCX LT','ar'],['MDR','ar'],['MK47','ar'],['QBZ-95-1','ar'],['PTR-32','ar'],['RM277','ar'],['SCAR-H','ar'],['SG552','ar'],['Tenglong','ar'],
    ['MP7','smg'],['MK4','smg'],['SR-3M','smg'],['Thompson','smg'],['P90','smg'],['QCQ171','smg'],['MP5','smg'],['PP19 Vityaz','smg'],['SMG-45','smg'],['UZI','smg'],['PP19 Bizon','smg'],['Vector','smg'],
    ['M250','lmg'],['PKM','lmg'],['M249','lmg'],['QJB-201','lmg'],
    ['M14','dmr'],['SVCH','dmr'],['Lever Action','dmr'],['Mini-14','dmr'],['PSG-1','dmr'],['SKS','dmr'],['SR9','dmr'],['SR-25','dmr'],['SVD','dmr'],['VSS','dmr'],
    ['M82','sniper'],['AWM','sniper'],['M700','sniper'],['R93','sniper'],['SV-98','sniper'],
    ['M870','shotgun'],['FS12','shotgun'],['725','shotgun'],['M1014','shotgun'],['S12K','shotgun'],
    ['G18','sidearm'],['93R','sidearm'],['G17','sidearm'],['M1911','sidearm'],['Desert Eagle','sidearm'],['QSZ-92G','sidearm'],['.357 Revolver','sidearm'],
    ['Compound Bow','special']
  ].map(([name,type])=>({name,type}));
  const imageIds = {
    'M7':6,'M4A1':2,'AKM':4,'AK-12':13,'AKS-74':17,'AUG':7,'ASh-12':11,'AS Val':14,'AR-57':64,'CI-19':1,'CAR-15':8,'G3':9,'K416':12,'K437':5,'KC17':57,'M16A4':16,'MCX LT':61,'MK47':58,'QBZ-95-1':18,'PTR-32':15,'SCAR-H':10,'SG552':3,
    'MP7':27,'MK4':60,'SR-3M':20,'P90':24,'QCQ171':22,'MP5':25,'PP19 Vityaz':26,'SMG-45':19,'UZI':28,'PP19 Bizon':21,'Vector':23,
    'M250':29,'PKM':30,'M249':32,'QJB-201':31,'M14':52,'Lever Action':59,'Mini-14':49,'PSG-1':48,'SKS':54,'SR9':55,'SR-25':50,'SVD':53,'VSS':51,
    'M82':63,'AWM':33,'M700':36,'R93':34,'SV-98':35,'M870':45,'FS12':62,'725':46,'M1014':47,'S12K':44,
    'G18':37,'93R':38,'G17':39,'M1911':40,'Desert Eagle':41,'QSZ-92G':42,'.357 Revolver':43,'Compound Bow':56
  };
  const featured = {'M7':1,'Vector':2,'M870':3,'PKM':4,'SR-25':5,'AWM':6};
  const extraImages = {'AKS-74U':'aks74u','MDR':'mdr','RM277':'rm277','Tenglong':'tenglong','Thompson':'thompson','SVCH':'svch'};
  const types = {all:'Tất cả',ar:'Súng trường',smg:'SMG',sniper:'Bắn tỉa',shotgun:'Shotgun',dmr:'DMR',lmg:'Súng máy',sidearm:'Súng ngắn',special:'Đặc biệt'};
  const officialCodes = [
    {weapon:'CAR-15',mode:'5v5',code:'6GV08HC090NFS04935K4V',title:'CAR-15 · Chiến Trường'},
    {weapon:'UZI',mode:'5v5',code:'6GV08PK090NFS04935K4V',title:'UZI · Chiến Trường'},
    {weapon:'AKS-74',mode:'5v5',code:'6GV06B8090NFS04935K4V',title:'AKS-74 · Chiến Trường'},
    {weapon:'AUG',mode:'5v5',code:'6GV093S090NFS04935K4V',title:'AUG · Chiến Trường'}
  ];
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const params = new URLSearchParams(location.search);
  const requestedName = params.get('weapon') || params.get('search') || '';
  const chosen = names.find(item => item.name.toLowerCase() === requestedName.toLowerCase());
  const page = chosen && params.get('view') === 'codes' ? 'codes' : chosen ? 'detail' : 'browse';
  document.body.classList.toggle('weapons-browse-mode', page === 'browse');
  const imageFor = name => featured[name] ? `/assets/df-firearm_list-0${featured[name]}.png` : imageIds[name] ? `/assets/df-weapons/weapon-${imageIds[name]}.png` : extraImages[name] ? `/assets/df-weapons/extra-${extraImages[name]}.webp` : '';
  const typeFor = gun => types[gun.type] || 'Vũ khí';
  const urlFor = (gun, code=false) => `/weapons?${code?'view=codes&':''}weapon=${encodeURIComponent(gun.name)}`;
  $('weaponBrowse').hidden = page !== 'browse';
  $('weaponDetail').hidden = page !== 'detail';
  $('weaponCodes').hidden = page !== 'codes';

  if (page === 'browse') {
    let filter = 'all';
    $('weaponFilters').innerHTML = Object.entries(types).map(([key,label])=>`<button type="button" data-weapon-filter="${key}" aria-pressed="${key==='all'}" class="${key==='all'?'active':''}">${label}</button>`).join('');
    const render = () => {
      const query = $('weaponSearch').value.trim().toLocaleLowerCase('vi');
      const rows = names.filter(gun => (filter==='all'||gun.type===filter) && gun.name.toLocaleLowerCase('vi').includes(query));
      $('weaponGrid').innerHTML = rows.map((gun,index)=>{
        const image=imageFor(gun.name);
        return `<article class="weapon-card"><a class="weapon-card-open" href="${urlFor(gun)}" aria-label="Xem thông tin ${esc(gun.name)}"><div class="weapon-card-visual"><span class="weapon-card-index">${String(index+1).padStart(2,'0')} / ${esc(typeFor(gun).toUpperCase())}</span>${image?`<img src="${image}" alt="${esc(gun.name)}" loading="lazy">`:''}<i class="weapon-card-scanline" aria-hidden="true"></i></div><div class="weapon-card-copy"><span>${esc(typeFor(gun))}</span><h2>${esc(gun.name)}</h2><small>Xem thông tin</small></div></a><a class="weapon-card-code" href="${urlFor(gun,true)}"><span>CODE SÚNG</span><img class="weapon-shopping-emoji" src="/assets/weapon-shopping.gif?v=20261007-vyage" alt="" width="30" height="30" loading="lazy"></a></article>`;
      }).join('') || '<p class="weapon-empty">Không tìm thấy súng phù hợp.</p>';
    };
    $('weaponSearch').addEventListener('input', render);
    $('weaponFilters').querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
      filter=button.dataset.weaponFilter;
      $('weaponFilters').querySelectorAll('button').forEach(other=>{
        const active=other===button; other.classList.toggle('active',active); other.setAttribute('aria-pressed',String(active));
      });
      render();
    }));
    render();
  }

  function setPortrait(imageId, fallbackId, gun) {
    const image = $(imageId), fallback = $(fallbackId), src = imageFor(gun.name);
    image.hidden = !src; fallback.hidden = Boolean(src); fallback.textContent = gun.name;
    if (src) { image.src = src; image.alt = gun.name; image.onerror=()=>{image.hidden=true;fallback.hidden=false;}; }
  }

  if (page === 'detail') {
    document.title = `${chosen.name} | Delta Force`;
    $('detailType').textContent = typeFor(chosen).toUpperCase();
    $('detailName').textContent = chosen.name;
    $('detailSummary').textContent = `Hình ảnh, kinh nghiệm sử dụng và bài chia sẻ về ${chosen.name}.`;
    $('detailCategory').textContent = typeFor(chosen);
    $('detailCodeLink').href = urlFor(chosen,true);
    setPortrait('detailImage','detailImageFallback',chosen);
    const postHtml = post => {
      const avatar = post.author.avatar ? `<img src="${esc(post.author.avatar)}" alt="" referrerpolicy="no-referrer">` : `<span>${esc((post.author.name||'C').slice(0,1).toUpperCase())}</span>`;
      return `<article class="weapon-post"><div class="weapon-post-author"><div class="weapon-post-avatar">${avatar}</div><div><strong>${esc(post.author.name)}</strong><small>CONTENT CREATOR · ${new Date(post.createdAt).toLocaleDateString('vi-VN')}</small></div></div><h3>${esc(post.title)}</h3><p>${esc(post.body).replace(/\n/g,'<br>')}</p>${post.image?`<img class="weapon-post-image" src="${esc(post.image)}" alt="Ảnh minh họa ${esc(chosen.name)}" loading="lazy">`:''}</article>`;
    };
    const refreshPosts = async () => {
      try {
        const response = await fetch(`/api/weapon-content?weapon=${encodeURIComponent(chosen.name)}`);
        const data = await response.json();
        const posts = Array.isArray(data.posts) ? data.posts : [];
        $('detailPostCount').textContent = `${posts.length} bài viết`;
        $('weaponPostList').innerHTML = posts.length ? posts.map(postHtml).join('') : `<div class="weapon-post-empty weapon-subpage-empty"><span class="weapon-empty-symbol" aria-hidden="true"></span><div><span class="weapon-eyebrow">ĐANG CẬP NHẬT</span><b>Chưa có bài viết về ${esc(chosen.name)}</b><p>Thông tin và kinh nghiệm sử dụng sẽ xuất hiện tại đây khi đội nội dung đăng bài.</p></div></div>`;
      } catch { $('weaponPostList').innerHTML='<p class="weapon-empty">Chưa tải được bài viết. Vui lòng thử lại.</p>'; }
    };
    refreshPosts();
    fetch('/api/weapon-content/me').then(r=>r.json()).then(async data=>{
      const canPost=['admin','staff','creator'].includes(data.role);
      $('createWeaponPost').hidden=!canPost;
      if (data.role==='member') { $('weaponEditorHint').hidden=false; $('weaponEditorHint').textContent=`Tài khoản ${data.identity?.key||''} chưa được cấp quyền content creator.`; }
      if (data.role==='admin') {
        $('weaponAdminPanel').hidden=false;
        const manager = await fetch('/api/weapon-content/manage').then(r=>r.json());
        $('weaponCreatorKeys').value=(manager.access?.creators||[]).join('\n');
      }
    }).catch(()=>{});
    const dialog=$('weaponPostDialog');
    $('createWeaponPost').onclick=()=>{ $('weaponPostGunName').textContent=chosen.name; dialog.showModal(); };
    $('closeWeaponPost').onclick=()=>dialog.close();
    $('weaponPostForm').onsubmit=async event=>{
      event.preventDefault();
      const file=$('weaponPostImage').files[0];
      if(file && file.size>4_000_000){$('weaponPostMessage').textContent='Ảnh tối đa 4 MB.';return;}
      const imageData=file?await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file);}):'';
      $('weaponPostMessage').textContent='Đang đăng bài…';
      try {
        const response=await fetch('/api/weapon-content',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({weapon:chosen.name,title:$('weaponPostTitle').value,body:$('weaponPostBody').value,imageData})});
        const result=await response.json();
        if(!response.ok) throw new Error(result.error||'Không đăng được bài.');
        dialog.close(); $('weaponPostForm').reset(); refreshPosts();
      } catch(error){$('weaponPostMessage').textContent=error.message;}
    };
    $('saveWeaponCreators').onclick=async()=>{
      const creators=$('weaponCreatorKeys').value.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
      try {
        const response=await fetch('/api/weapon-content/access',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({creators})});
        const result=await response.json();
        $('weaponAdminMessage').textContent=response.ok?'Đã lưu quyền content creator.':result.error;
      } catch { $('weaponAdminMessage').textContent='Không lưu được quyền.'; }
    };
  }

  if (page === 'codes') {
    document.title = `Code súng ${chosen.name} | Delta Force`;
    $('codeBackLink').href=urlFor(chosen);
    $('codeWeaponName').textContent=chosen.name;
    $('codeWeaponType').textContent=typeFor(chosen).toUpperCase();
    setPortrait('codeWeaponImage','codeImageFallback',chosen);
    let mode=['OP','5v5'].includes(params.get('mode'))?params.get('mode'):'5v5';
    let codes=[...officialCodes];
    const render = () => {
      document.querySelectorAll('[data-code-mode]').forEach(button=>{
        const selected=button.dataset.codeMode===mode; button.classList.toggle('active',selected); button.setAttribute('aria-selected',String(selected));
      });
      const matches=codes.filter(code=>code.weapon===chosen.name && code.mode===mode);
      $('codeListTitle').textContent=`${chosen.name} · ${mode}`;
      $('codeListCount').textContent=`${matches.length} MÃ`;
      $('codeNote').hidden=!matches.length;
      $('weaponCodeList').innerHTML=matches.length?matches.map(code=>`<article class="weapon-code-card"><div class="weapon-code-card-top"><span>${esc(mode)}</span><span>${code.source==='staff'||code.source==='admin'?'DFVN':'GARENA'}</span></div><h3>${esc(code.title||chosen.name)}</h3><code>${esc(code.code)}</code><button type="button" class="weapon-copy-button" data-copy-code="${esc(code.code)}">Sao chép mã</button></article>`).join(''):`<div class="weapon-post-empty weapon-subpage-empty"><span class="weapon-empty-symbol" aria-hidden="true"></span><div><span class="weapon-eyebrow">ĐANG CẬP NHẬT</span><b>Chưa có mã ${mode} cho ${esc(chosen.name)}</b><p>Mã phương án sẽ hiển thị ở đây khi đội nội dung đăng lên.</p></div><a href="${urlFor(chosen)}" class="weapon-empty-link">Xem thông tin súng</a></div>`;
      $('weaponCodeList').querySelectorAll('[data-copy-code]').forEach(button=>button.onclick=async()=>{
        try { await navigator.clipboard.writeText(button.dataset.copyCode); button.textContent='Đã sao chép ✓'; }
        catch { button.textContent='Không sao chép được'; }
      });
    };
    document.querySelectorAll('[data-code-mode]').forEach(button=>button.onclick=()=>{
      mode=button.dataset.codeMode;
      const next=new URL(location.href);next.searchParams.set('mode',mode);history.replaceState(null,'',next);
      render();
    });
    render();
    fetch(`/api/weapon-codes?weapon=${encodeURIComponent(chosen.name)}`)
      .then(response=>response.json()).then(data=>{codes=[...officialCodes,...(data.codes||[])];render();}).catch(()=>{});
  }
})();
