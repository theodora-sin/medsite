let currentLang = 'en';
let activeTiers = new Set(['all']);
let activeTab = 'guide';
const tierByKey = Object.fromEntries(TIERS.map(t => [t.key, t]));

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
  document.getElementById('section1Note').textContent = t(UI.section1Note);
  document.getElementById('section2Note').textContent = t(UI.section2Note);
  document.getElementById('storyIntro').innerHTML = t(UI.storyIntro);
  document.getElementById('footerText').innerHTML = t(UI.footerText);
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
      document.body.classList.add('lang-fading');
      renderAll();
      setTimeout(()=> document.body.classList.remove('lang-fading'), 320);
    });
  });
}

const TABS = [
  { key:'guide',   label:{en:'Guide', zh:'指南'} },
  { key:'support', label:{en:'Support', zh:'支援'} },
  { key:'story',   label:{en:'Story', zh:'故事'} },
];

function renderTabBar(){
  const box = document.getElementById('tabButtons');
  const indicator=document.getElementById('tabIndicator');
  box.querySelectorAll('.tab-btn').forEach(el => el.remove());
  TABS.forEach(tab =>{
    const btn = document.createElement('button');
    btn.className='tab-btn';
    btn.dataset.tab =tab.key;
    btn.setAttribute('aria-selected', activeTab === tab.key);
    btn.textContent= t(tab.label);
    btn.addEventListener('click', ()=>{
      activeTab= btn.dataset.tab;
      localStorage.setItem('medsite_tab', activeTab);
      showActiveTab();
      document.querySelector('tabbar').scrollIntoView({behaviour:'smooth', block:'start'})
    });
    box.appendChild(btn);
  });
  box.appendChild(indicator);
  moveTabIndicator();
}
function moveTabIndicator(){
  const indicator=document.getElementById('tabIndicator');
  const activeBtn = document.querySelector(`.tab-btn[data-tab="${activeTab}"]`);
  if(!activeBtn)reuturn;
  indicator.style.width = activeBtn.offsetWidth + 'px';
  indicator.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
}

function showActiveTab(){
  document.getElementById('guide').hidden = activeTab !== 'guide';
  document.getElementById('support').hidden = activeTab !== 'support';
  document.getElementById('story').hidden = activeTab !== 'story';
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.setAttribute('aria-selected', btn.dataset.tab === activeTab ? 'true' : 'false');
  });
  moveTabIndicator();
}

function renderChips(){
  const row = document.getElementById('chipRow');
  const allChip = `<button class="chip tier-all" data-tier="all" aria-pressed="${activeTiers.has('all')}">${t(UI.chipAll)}</button>`;
  const tierChips = TIERS.map(tier => `
    <button class="chip tier-${tier.key}" data-tier="${tier.key}" aria-pressed="${activeTiers.has(tier.key)}">
      <span class="chip-icon">${ICONS[tier.key]}</span>${t(tier.name)}
    </button>
  `).join('');
  row.innerHTML = allChip + tierChips;
  row.querySelectorAll('.chip').forEach(chip=>{
    chip.addEventListener('click', ()=>{
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
    const text = (t(s.title) + ' ' + t(s.when) + ' ' + t(s.ask) + ' ' + s.kw).toLowerCase();
    const searchMatch = !q || text.includes(q);
    return tierMatch && searchMatch;
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
    return `
      <article class="card" style="--tier-color:${tier.color}; --tier-bg:${tier.bg}">
        <div class="card-top">
          <h3 class="card-title">${t(s.title)}</h3>
          <span class="tier-tag">${t(tier.name)}</span>
        </div>
        <div class="card-row"><span class="k">${t(UI.cardWhenLabel)}</span>${t(s.when)}</div>
        <div class="card-row"><span class="k">${t(UI.cardAskLabel)}</span>${t(s.ask)}</div>
      </article>
    `;
  }).join('');

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
  const btn=document.getElementById('scrollTop');
  window.addEventListener('scroll',()=>{
    btn.hidden=false;
    btn.classList.toggle('visible, window.scrollY>500');
  }, {passive:true});
  btn.addEventListener('click' , ()=>{
    window.scrollTo({top:0, behavior:'smooth'});
  })
}

function renderAll(){
  renderStaticText();
  renderLangToggle();
  renderTabBar();
  renderChips();
  renderCards();
  renderSupport();
  renderStory();
  showActiveTab();
}

renderAll();
initScrollTop();
document.getElementById('searchInput').addEventListener('input', renderCards);
window.addEventListener('resize', moveTabIndicator)
