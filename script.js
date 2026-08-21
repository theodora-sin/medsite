let currentLang = localStorage.getItem('medsite_lang') || 'en';
let activeTiers = new Set(['all']);
let activeTab = localStorage.getItem('medsite_tab') || 'guide';
let zoomStep = parseInt(localStorage.getItem('medsite_zoom'), 10);
if(isNaN(zoomStep)) zoomStep = 0;
const ZOOM_MIN = -4;
const ZOOM_MAX = 10;
let savedIds = new Set(JSON.parse(localStorage.getItem('medsite_saved') || '[]'));
const validSituationIds = new Set(SITUATIONS.map(s => s.id));
savedIds = new Set([...savedIds].filter(id => validSituationIds.has(id)));
localStorage.setItem('medsite_saved', JSON.stringify([...savedIds]));
let showSavedOnly = false;
let userCoords=null;
const tierByKey = Object.fromEntries(TIERS.map(t => [t.key, t]));

const STAR_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><path d="M12 3.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z"/></svg>';
const PIN_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/></svg>';
const SHARE_ICON= '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/></svg>';

let toastTimer;
function showToast(msg){
  let toast=document.getElementById('toast');
  if(!toast){
    toast=document.createElement('div');
    toast.id='toast';
    toast.className= 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent=msg;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toast.classList.remove('visible'),2200);
}
function shareSituation(id){
  const s= SITUATIONS.find(x => x.id === id);
  if(!s) return;
  const tier= tierByKey[s.tier];
  const pageUrl = location.href.split('#')[0].split('?')[0];
  const text = `${t(s.title)} (${t(tier.name)})\n\n${t(UI.cardWhenLabel)}: ${t(s.when)}\n${t(UI.cardAskLabel)}: ${t(s.ask)}\n\n${pageUrl}`;
  if(navigator.share){
    navigator.share({title: t(s.title), text}).catch(()=>{});
    return;
  }
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text)
      .then(()=> showToast(t(UI.shareCopiedMsg)))
      .catch(()=> window.prompt(t(UI.shareCopiedMsg), text));
    return;
  }
  window.prompt(t(UI.shareCopiedMsg), text);
}

const NEARBY_QUERY ={
  pharmacy:'Pharmacy',
  gp:'GP surgery',
  utc: 'Urgent treatment center',
  ae: 'A&E hospital emergency department',
}

function saveSavedIds(){
  localStorage.setItem('medsite_saved', JSON.stringify([...savedIds]));
}

function locateAndOpen(tierKey){
  const query = NEARBY_QUERY[tierKey] || tierKey;
  const openMaps = (lat, lng) => {
    const url = lat != null
      ? `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${lat},${lng},14z`
      : `https://www.google.com/maps/search/${encodeURIComponent(query)}`;    
      window.open(url,'_blank','noopener')
    };
  if(userCoords){
    openMaps(userCoords.lat, userCoords.lng);
    return;
  }
  if(!navigator.geolocation){
    openMaps(null,null);
    return;
  }
  navigator.geolocation.getCurrentPosition(
    pos=>{
      userCoords = {lat: pos.coords.latitude, lng:pos.coords.longitude};
      openMaps(userCoords.lat, userCoords.lng);
    },
    () =>openMaps(null, null)
  );
}

function t(field){
  if(field && typeof field === 'object') return field[currentLang];
  return field;
}
 
const ICONS = {
  self:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12 12 5l8 7"/><path d="M6 11v8h12v-8"/><path d="M10 19v-5h4v5"/></svg>',
  pharmacy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8M8 12h8"/></svg>',
  gp:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 4v6a4 4 0 0 0 8 0V4"/><circle cx="18" cy="15" r="3"/><path d="M8 10v3a6 6 0 0 0 6 6h1"/></svg>',
  '111':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h3l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2C10.5 21 3 13.5 3 6a2 2 0 0 1 2-2Z"/></svg>',
  utc:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9l6 6M15 9l-6 6"/></svg>',
  ae:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v6M12 21v-6M3 12h6M21 12h-6"/><circle cx="12" cy="12" r="9"/></svg>',
};
 
function renderStaticText(){
  document.documentElement.lang = currentLang === 'zh' ? 'zh-Hant' : 'en';
  document.getElementById('emergencyBanner').innerHTML = t(UI.emergencyBanner);
  document.getElementById('eyebrow').textContent = t(UI.eyebrow);
  document.getElementById('title').textContent = t(UI.title);
  document.getElementById('heroSub').textContent = t(UI.heroSub);
  document.getElementById('heroByline').textContent = t(UI.heroByline);
  document.getElementById('searchInput').placeholder = t(UI.searchPlaceholder);
  document.getElementById('chipHint').textContent = t(UI.chipHint);
  document.getElementById('locationNote').textContent=t(UI.locationNote);
  document.getElementById('section1Note').textContent = t(UI.section1Note);
  document.getElementById('section2Note').textContent = t(UI.section2Note);
  document.getElementById('storyIntro').innerHTML = t(UI.storyIntro);
  document.getElementById('footerText').innerHTML = t(UI.footerText);
  document.getElementById('legalLink').textContent =t(UI.legalLinkText);
  document.getElementById('lastReviewedLabel').textContent = t(UI.lastReviewedLabel);
  document.getElementById('lastReviewedDate').textContent = t(UI.lastReviewedDate);
  document.getElementById('contactLink').textContent = t(UI.contactLinkText);
  document.getElementById('guideHeading').textContent = t(TABS[0].label);
  document.getElementById('supportHeading').textContent = t(TABS[1].label);
  document.getElementById('storyHeading').textContent = t(TABS[2].label);
  document.getElementById("firstAidNote").textContent = t(UI.firstAidNote);
  document.getElementById('firstAidSources').textContent= t(UI.firstAidSources);
}

function renderLangToggle(){
  const box = document.getElementById('langToggle');
  box.innerHTML = `
    <button data-lang="en" aria-pressed="${currentLang === 'en'}">EN</button>
    <button data-lang="zh" aria-pressed="${currentLang === 'zh'}">中文</button>
  `;
  box.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(btn.dataset.lang === currentLang) return;
      currentLang = btn.dataset.lang;
      localStorage.setItem('medsite_lang', currentLang);
      document.body.classList.add('lang-fading');
      renderAll();
      setTimeout(()=> document.body.classList.remove('lang-fading'), 320);
    });
  });
}

function applyZoom(){
  const isMobile = window.matchMedia('(max-width:640px)').matches;
  const base = isMobile ? 16.5:19;
  document.documentElement.style.fontSize=(base+zoomStep)+ 'px';
  localStorage.setItem('medsite_zoom', zoomStep);
}

function renderZoomToggle(){
  const box =document.getElementById('zoomToggle');
  const pct= 100 + Math.round((zoomStep/19)*100);
    box.innerHTML = `
    <button data-zoom="out" aria-label="Decrease text size" ${zoomStep <= ZOOM_MIN ? 'disabled' : ''}>\u2212</button>
    <span class="zoom-label">${pct}%</span>
    <button data-zoom="in" aria-label="Increase text size" ${zoomStep >= ZOOM_MAX ? 'disabled' : ''}>+</button>
  `;
  box.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(btn.dataset.zoom === 'in' && zoomStep < ZOOM_MAX) zoomStep +=1;
      if(btn.dataset.zoom === 'out' && zoomStep > ZOOM_MIN ) zoomStep -=1;
      applyZoom();
      renderZoomToggle();
    })
  })
}
 
const TABS = [
  { key:'guide',   label:{en:'Guide', zh:'指南'} },
  { key:'support', label:{en:'Support', zh:'支援'} },
  { key:'firstaid', label:{en:'First Aid', zh:'急救'} },
  { key:'story',   label:{en:'Story', zh:'故事'} },
];
 
function renderTabBar(){
  const box = document.getElementById('tabButtons');
  const indicator = document.getElementById('tabIndicator');
  box.querySelectorAll('.tab-btn').forEach(el => el.remove());
  TABS.forEach(tab=>{
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.dataset.tab = tab.key;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', activeTab === tab.key);
    btn.textContent = t(tab.label);
    btn.addEventListener('click', ()=>{
      if(btn.dataset.tab === activeTab) return;
      activeTab = btn.dataset.tab;
      localStorage.setItem('medsite_tab', activeTab);
      showActiveTab();
      document.querySelector('.tabbar').scrollIntoView({behavior:'smooth', block:'start'});
    });
    box.appendChild(btn);
  });
  box.appendChild(indicator);
  moveTabIndicator();
}
 
function moveTabIndicator(){
  const indicator = document.getElementById('tabIndicator');
  const activeBtn = document.querySelector(`.tab-btn[data-tab="${activeTab}"]`);
  if(!activeBtn) return;
  indicator.style.width = activeBtn.offsetWidth + 'px';
  indicator.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
}
 
function showActiveTab(){
  document.getElementById('guide').hidden = activeTab !== 'guide';
  document.getElementById('support').hidden = activeTab !== 'support';
  document.getElementById('firstaid').hidden= activeTab !== 'firstaid';
  document.getElementById('story').hidden = activeTab !== 'story';
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.setAttribute('aria-selected', btn.dataset.tab === activeTab ? 'true' : 'false');
  });
  moveTabIndicator();
}
function renderFirstAid(){
  const grid= document.getElementById('firstAidList');
  grid.innerHTML= FIRST_AID.map(topic => `
    <article class="firstaid-card">
      <h3 class="firstaid-title">${t(topic.title)}</h3>
      <p class="firstaid-when"><span class="k">${t(UI.firstAidWhenLabel)}</span>${t(topic.when)}</p>
      <ol class="firstaid-steps">
        ${topic.steps.map(step => `<li>${t(step)}</li>`).join('')}
      </ol>
      ${topic.warning ? `<p class="firstaid-warning">${t(topic.warning)}</p>` : ''}
    </article>
  `).join('');
  observeReveal(grid.querySelectorAll('.firstaid-card'));
}
 
function renderChips(){
  const row = document.getElementById('chipRow');
  const allChip = `<button class="chip tier-all" data-tier="all" aria-pressed="${activeTiers.has('all')}">${t(UI.chipAll)}</button>`;
  const tierChips = TIERS.map(tier => `
    <button class="chip tier-${tier.key}" data-tier="${tier.key}" aria-pressed="${activeTiers.has(tier.key)}">
      <span class="chip-icon">${ICONS[tier.key]}</span>${t(tier.name)}
    </button>
  `).join('');
  const savedChip = `
    <button class="chip chip-saved" id="savedChip" aria-pressed="${showSavedOnly}">
      <span class="chip-star-icon">${STAR_ICON}</span>${t(UI.savedChip)} (${savedIds.size})
    </button>
  `;
  row.innerHTML = allChip + savedChip + tierChips;
  row.querySelectorAll('.chip:not(.chip-saved)').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      showSavedOnly = false;
      document.getElementById('savedChip').setAttribute('aria-pressed','false');
      const tier = chip.dataset.tier;
      if(tier === 'all'){
        activeTiers = new Set(['all']);
      } else {
        activeTiers.delete('all');
        if(activeTiers.has(tier)) activeTiers.delete(tier); else activeTiers.add(tier);
        if(activeTiers.size === 0) activeTiers = new Set(['all']);
      }
      syncChips();
      renderCards();
    });
  });
  document.getElementById('savedChip').addEventListener('click', ()=>{
    showSavedOnly = !showSavedOnly;
    document.getElementById('savedChip').setAttribute('aria-pressed', showSavedOnly);
    if(showSavedOnly){
      activeTiers= new Set(['all']);
      syncChips();
    }
    renderCards();
  });
}

function renderSidebar(){
  const box = document.getElementById('guideSidebar');
  const allLink = `<button class="sidebar-link" data-tier="all">${t(UI.chipAll)}</button>`;
  const tierLinks = TIERS.map(tier => `
    <button class="sidebar-link" data-tier="${tier.key}">
      <span class="chip-icon">${ICONS[tier.key]}</span>${t(tier.name)}
    </button>
  `).join('');
  box.innerHTML=`<p class="sidebar-heading">${t(UI.sidebarHeading)}</p>` + allLink + tierLinks;
  box.querySelectorALl('.sidebar-link').forEach(link=>{
    link.addEventListener('click',()=>{
      const matchingChip=document.querySelector(`.chip[data-tier="${link.dataset.tier}"]`);
      if(matchingChip) matchingChip.click();
      window.scrollTo({top:0, behaviour:'smooth'});
    });
  });
}

function renderFooterNav(){
  const box = document.getElementById('footerNav');
  box.innerHTML = TABS.map(tab => `<button type="button" data-tab="${tab.key}">${t(tab.label)}</button>`).join('');
  box.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      activeTab = btn.daraset.tab;
      localStorage.setItem('medsite_tab',activeTab);
      showActiveTab();
      document.querySelector('.tabbar').scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
}

function syncChips(){
  document.querySelectorAll('.chip').forEach(chip=>{
    chip.setAttribute('aria-pressed', activeTiers.has(chip.dataset.tier) ? 'true' : 'false');
  });
}
 
function renderCards(){
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const grid = document.getElementById('cardGrid');
  const empty = document.getElementById('emptyState');
 
const filtered = SITUATIONS.filter(s=>{
    const tierMatch = activeTiers.has('all') || activeTiers.has(s.tier);
    const savedMatch = !showSavedOnly || savedIds.has(s.id);
    const text = (t(s.title) + ' ' + t(s.when) + ' ' + t(s.ask) + ' ' + s.kw).toLowerCase();
    const searchMatch = !q || text.includes(q);
    return tierMatch && savedMatch && searchMatch;
});
 
  document.getElementById('resultCount').textContent = `${filtered.length} / ${SITUATIONS.length}`;
 
  if(filtered.length === 0){
    grid.innerHTML = '';
    empty.hidden = false;
    empty.textContent = t(UI.emptyState);
    return;
  }
  empty.hidden = true;
 
  grid.innerHTML = filtered.map(s=>{
    const tier = tierByKey[s.tier];
    const isSaved = savedIds.has(s.id);
    const nearBtn = NEARBY_QUERY[s.tier]
      ? `<button class="locate-btn" data-tier="${s.tier}">${PIN_ICON}${t(UI.findNearest)} ${t(tier.name)}</button>`
      : '';
    return `
      <article class="card" style="--tier-color:${tier.color}; --tier-bg:${tier.bg}">
        <div class="card-top">
          <div class="card-title-row">
            <button class="save-btn" data-id="${s.id}" aria-pressed="${isSaved}" aria-label="${t(UI.saveBtnLabel)}">${STAR_ICON}</button>
            <h3 class="card-title">${t(s.title)}</h3>
          </div>
          <span class="tier-tag">${t(tier.name)}</span>
        </div>
        <div class="card-row"><span class="k">${t(UI.cardWhenLabel)}</span>${t(s.when)}</div>
        <div class="card-row"><span class="k">${t(UI.cardAskLabel)}</span>${t(s.ask)}</div>
        ${nearBtn}
      </article>
    `;
  }).join('');
  grid.querySelectorAll('.save-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id=btn.dataset.id;
      const nowSaved=!savedIds.has(id);
      if(savedIds.has(id)) savedIds.delete(id); else savedIds.add(id);
      saveSavedIds();
      btn.setAttribute('aria-pressed',savedIds.has(id));
      if(nowSaved){
        showToast(t(UI.savedConfirmMsg));
        btn.classList.add('bounce');
        setTimeout(()=> btn.classList.remove('bounce'), 350);
      }
      const savedChip=document.getElementById('savedChip');
      if(savedChip)savedChip.innerHTML = `<span class="chip-star-icon">${STAR_ICON}</span>${t(UI.savedChip)} (${savedIds.size})`;
      if(showSavedOnly && !savedIds.has(id)) 
        renderCards();
    });
  });

  grid.querySelectorAll('.locate-btn').forEach(btn=>{
    btn.addEventListener('click',()=> locateAndOpen(btn.dataset.tier));
  });
  grid.querySelectorAll('.share-btn').forEach(btn=>{
    btn.addEventListener('click',()=> shareSituation(btn.dataset.id));
  })
  observeReveal(grid.querySelectorAll('.card'));
}
 
function renderSupport(){
  const grid = document.getElementById('supportGrid');
  grid.innerHTML = SUPPORT.map(s => `
    <div class="support-item">
      <h3>${t(s.title)}</h3>
      <p>${t(s.body)}</p>
    </div>
  `).join('');
  observeReveal(grid.querySelectorAll('.support-item'));
}
 
function renderStory(){
  const wrap = document.getElementById('storyTimeline');
  wrap.innerHTML = STORY.map(s => `
    <div class="timeline-item">
      <div class="timeline-date">${t(s.date)}</div>
      <div>
        <h3 class="timeline-title">${t(s.title)}</h3>
        <p class="timeline-body">${t(s.body)}</p>
      </div>
    </div>
  `).join('');
  observeReveal(wrap.querySelectorAll('.timeline-item'));
  observeReveal([wrap]);
}
 

let revealObserver;
function observeReveal(nodes){
  if(!revealObserver){
    revealObserver = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold:0.15 });
  }
  nodes.forEach(node => revealObserver.observe(node));
}

function initScrollTop(){
  const btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', ()=>{
    btn.hidden = false;
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive:true });
  btn.addEventListener('click', ()=>{
    window.scrollTo({ top:0, behavior:'smooth' });
  });
}
 
function renderAll(){
  renderStaticText();
  renderLangToggle();
  renderZoomToggle();
  renderTabBar();
  renderSidebar();
  renderChips();
  renderCards();
  renderSupport();
  renderFirstAid();
  renderStory();
  renderFooterNav();
  showActiveTab();
}
 
applyZoom();
renderAll();
initScrollTop();
document.getElementById('searchInput').addEventListener('input', renderCards);
window.addEventListener('resize', moveTabIndicator);
window.addEventListener('resize',applyZoom);
