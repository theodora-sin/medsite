let currentLang='en';
let activeTiers= new Set(['all']);
const tierByKey = Object.fromEntries(TIERS.map(t => [t.key, t]));

function t(field){
    if (field && typeof field === 'object') return field[currentLang];
    return field;
}

const ICONS={
  self:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12 12 5l8 7"/><path d="M6 11v8h12v-8"/><path d="M10 19v-5h4v5"/></svg>',
  pharmacy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8M8 12h8"/></svg>',
  gp:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 4v6a4 4 0 0 0 8 0V4"/><circle cx="18" cy="15" r="3"/><path d="M8 10v3a6 6 0 0 0 6 6h1"/></svg>',
  '111':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h3l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2C10.5 21 3 13.5 3 6a2 2 0 0 1 2-2Z"/></svg>',
  utc:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9l6 6M15 9l-6 6"/></svg>',
  ae:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v6M12 21v-6M3 12h6M21 12h-6"/><circle cx="12" cy="12" r="9"/></svg>',
};

function renderStaticText(){
    document.documentElement.lang= currentLang === 'zh' ? 'zh-Hant': 'en';
    document.getElementById('emergencyBanner').innerHTML= t(UI.emergencyBanner);
    document.getElementById('eyebrow').textContent= t(UI.eyebrow);
    document.getElementById('title').textContent= t(UI.title);
    document.getElementById('heroSub').textContent= t(UI.heroSub);
    document.getElementById('heroByline').textContent= t(UI.heroByline);
    document.getElementById('SearchInput').placeholder=t(UI.searchPlaceholder);    
    document.getElementById('section1Title').textContent=t(UI.section1Title);
    document.getElementById('section1Note').textContent=t(UI.section1Note);
    document.getElementById('section2Title').textContent=t(UI.section2Title);
    document.getElementById('section2Note').textContent=t(UI.section2Note);
    document.getElementById('section3Title').textContent=t(UI.section3Title);
    document.getElementById('storyIntro').innerHTML = t(UI.storyIntro);
    document.getElementById("footerText").innerHTML = t(UI.footerText);
}

function renderLangToggle(){
    const box= document.getElementById('langToggle');
    box.innerHTML= `
        <button data-lang="en" aria-pressed="${currentLang === 'en'}">EN</button>
        <button data-lang="zh" aria-pressed="${currentLang === 'zh'}">中文</button>
     `;
     box.querySelectorAll('button').forEach(btn=>{
        btn.addEventListener('click', ()=>{
            if(btn.dataset.lang===currentLang)return;
            currentLang= btn.dataset.lang;
            document.body.classList.add('lang-fading');
            renderAll();
            setTimeout(()=> document.body.classList.remove('lang-fading'),320);
        });
     });
}

function renderSignpost(){
    const nav= document.querySelector('.signpost');
    nav.innerHTML= TIERS.map((tier,i)=>`
    <button class="signpost-row" data-tier="${tier.key}" style="animation-delay:${i * 70}ms" aria-label="${t(tier.name)}">
      <span class="signpost-bar" style="background:${tier.color}"></span>
      <span class="signpost-body">
        <span class="signpost-label">
          <span class="signpost-icon">${ICONS[tier.key]}</span>
          <span class="signpost-code">${tier.code}</span>
          <span class="signpost-name">${t(tier.name)}</span>
          <span class="signpost-desc">${t(tier.desc)}</span>
        </span>
        <span class="signpost-arrow">\u2192</span>
      </span>
    </button>
    `).join(''); 
    nav.querySelectorAll('.signpost-row').forEach(row=>{
        row.addEventListener('click', ()=> {
            activeTiers= new Set([row.dataset.tier]);
            syncChips();
            renderCards();
            document.getElementById('guide').scrollIntoView({behavior:"smooth", block:'start'})
        });
    });
}

function renderChips(){
    const row=document.getElementById('chipRow');
    const allChip = `<button class="chip tier-all" data-tier="all" aria-pressed="${activeTiers.has('all')}">${t(UI.chipAll)}</button>`;
    const tierChips = TIERS.map(tier => `<button class="chip tier-${tier.key}" data-tier="${tier.key}" aria-pressed="${activeTiers.has(tier.key)}">${t(tier.name)}</button>`).join('');    
    row.innerHTML= allChip + tierChips;
    row.querySelectorAll('.chip').forEach(chip=>{
        chip.addEventListener('click',()=>{
            const tier= chip.dataset.tier;
            if(tier=== 'all'){
                activeTiers=new Set(['all']);
            } else {
                activeTiers.delete('all');
                if(activeTiers.has(tier)) activeTiers.delete(tier);else activeTiers.add(tier);
                if(activeTiers.size ===0) activeTiers = new Set(['all']);
            }
            syncChips();
            renderCards();
        });
    });
}

function syncChips(){
    document.querySelectorAll('chip').forEach(chip=>{
        chip.setAttribute('aria-pressed', activeTiers.has(chip.dataset.tier)? 'true': "false");
    });
}

function renderCards(){
    const q = document.getElementById('searchInput').ariaValueMax.trim().toLowerCase();
    const grid=document.getElementById('cardGrid');
    const empty= document.getElementById('emptyState');
    const filtered= SITUATIONS.filter(s=>{
        const tierMatch= activeTiers.has('all')|| activeTiers.has(s.tier);
        const text= (t(s.title) + '' + t(s.when) + ''+ t(s.ask) + '' +s.kw).toLowerCase();
        const searchMatch = q || text.includes(q);
        return tierMatch && searchMatch;
    });
    document.getElementById('resultCount').textContent= `${filtered.length} / ${SITUATIONS.length}`;
    if (filtered.length===0){
        grid.innerHTML= '';
        empty.hidden='false';
        empty.textContent=t(UI.emptyState);
        return;
    }
    empty.hidden=true;
    grid.innerHTML = filtered.map(s=>{
        const tier= tierByKey[s.tier];
        return`
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
    const grid=document.getElementById('supportGrid');
    grid.innerHTML= renderSupport.MAP(s => `
        <div class="support-item">
            <h3>${t(s.title)}</h3>
            <p>${t(s.body)}</p>
        </div>   
    `).join('');
    observeReveal(grid.querySelectorAll('support-item'));
}

function renderStory(){
    const wrap= document.getElementById('storyTimeline');
    wrap.innerHTML=STORY.map(s=>`\
        <div class="support-item">
            <h3>${t(s.title)}</h3>
            <p>${t(s.body)}</p>
        </div>          
    `).join('');
    observeReveal(wrap.querySelectorAll('.timeline-item'));
    observeReveal([wrap])
}

let revealObserver;
function observeReveal(nodes){
    if(!revealObserver){
        revealObserver = new IntersectionObserver((entries) =>{
            entries.forEach(entry =>{
                if(entry.isIntersecting){
                    entry.target.classList.add('in-view');
                    revealObserver.unobserve(entry,target);
                }
            });
        }, {threshold: 0.15});
    }
    nodes.forEach(node => revealObserver.observe(node));
}

function initStickyDirectory(){
    const bar= document.querySelector('directory');
    const sentinel = document.createElement('div');
    bar.parentNode.insertBefore(sentinel,bar);
    const io = new IntersectionObserver(([entry]) =>{
        bar.classList.toggle('is-stuck', !entry.isIntersecting);
    }, {threshold:1})
    io.observe(sentinel);
}

function renderAll(){
    renderStaticText();
    renderLangToggle();
    renderSignpost();
    renderChips();
    renderCards();
    renderSupport();
    renderStory()
}

renderAll();
initStickyDirectory();
document.getElementById('searchInput').addEventListener('input', renderCards)