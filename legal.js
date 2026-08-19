let currentLang = localStorage.getItem('medsite_lang') || 'en';
 
function t(field){
  if(field && typeof field === 'object') return field[currentLang];
  return field;
}
 
function renderLegal(){
  document.documentElement.lang = currentLang === 'zh' ? 'zh-Hant' : 'en';
  document.getElementById('backLink').textContent = t(LEGAL.backLink);
  document.getElementById('legalTitle').textContent = t(LEGAL.pageTitle);
  document.title = t(LEGAL.pageTitle) + ' \u2014 Which place shall I visit';
 
  document.getElementById('legalSections').innerHTML = LEGAL.sections.map(s => `
    <section class="legal-section">
      <h2>${t(s.heading)}</h2>
      <p>${t(s.body)}</p>
    </section>
  `).join('');
}
 
function renderLangToggle(){
  const box = document.getElementById('langToggle');
  box.innerHTML = `
    <button data-lang="en" aria-pressed="${currentLang === 'en'}">EN</button>
    <button data-lang="zh" aria-pressed="${currentLang === 'zh'}">\u4e2d\u6587</button>
  `;
  box.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(btn.dataset.lang === currentLang) return;
      currentLang = btn.dataset.lang;
      localStorage.setItem('medsite_lang', currentLang);
      renderLegal();
      renderLangToggle();
    });
  });
}
 
renderLegal();
renderLangToggle();
