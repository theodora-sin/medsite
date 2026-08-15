const UI = {
    emergencyBanner:{
        en:'In life-threatening emergency situation, please call <strong>999</strong> or go to A&E. This site is for general guidance, not for diagnosis.',
        zh:'在有生命危險的緊急情況下，請立即致電 <strong>999</strong> 或直接前往急症室（A&E）。本網站只提供一般求診指引，並非診斷。'
    },
    eyebrow:{
        en:"A patient's guide to UK healthcare.",
        zh:"英國醫療求診指南"
    },
    title:{
        en:"Which place shall I visit",
        zh:"",
    },
    heroSub:{
        en:"Six routes into NHS care, ranked from 'wait it out' to 'call 999'--so you can work out where to go, what to ask for and what to expect before you standing in a queue. ",
        zh:"由「先自行處理」到「致電999」，六條進入英國NHS醫療系統的途徑——讓你在出門前，就先知道應該去哪裡、可以提出什麼要求、會發生什麼事。"
    },
    heroByline:{
        en:"We built this website to make it easier for people to navigate the UK healthcare system.",
        zh:""
    },
    searchPlaceholder:{
        en:"Search a symptom or situation\u00A0eg. 'earache', 'chest pain'",
        zh:"搜尋症狀或情況…例如「耳痛」、「胸痛」"
    },
    chipAll:{
        en:"All",
        zh:'全部',
    },
    chipHint:{
      en:"Tap a category below, or search a symptom---no typing required.",
      zh:"點擊下面的分類，或搜尋症狀——毋須打字亦可使用。"
    },
    savedChip:{
      en:"saved",
      zh:"已收藏",     
    },
    saveBtnLabel:{
      en:'Saved',
      zh:"收藏",
    },
    savedEmptyState:{
      en:'Nothing saved yet. Tap the star on any card to keep it here for quick access.',
      zh:"暫時未有已收藏項目。點擊卡片上的星號即可加入收藏，方便快速查看。"
    },
    findNearest:{
      en:'Find nearest',
      zh:"尋找附近",
    },
    locationNote:{
      en:"\"Find nearest\" opens Google Maps using your device's location — your location isn't stored by this site.",
        zh:"「尋找附近」會使用你裝置的位置資訊，在Google地圖開啟搜尋——本網站不會儲存你的位置資料。"
    },
    section1Title:{
        en:"Find your situation",
        zh:'尋找你的情況'
    },
    section1Note:{
        en:"Filter by care setting or search a symptom. Each entry shows when that route fits, what to expect and what you allow to ask",
        zh:"按求診途徑篩選，或搜尋症狀。每個項目都會說明何時適用、會發生什麼事，以及你可以提出的要求。"
    },
    emptyState:{
        en:"No matches. Try a different word or clear the filter\u00A0If you unsure what to do, NHS 111 online will triagge you to right place.",
        zh:"沒有符合的結果。試試其他字詞，或清除篩選——如果你不確定應該點做，NHS 111網上分流服務隨時可以幫到你。"
    },
    cardWhenLabel:{
        en:"When this fits,",
        zh:"適用情況",
    },
    cardAskLabel: { 
        en:'What to do / ask for', 
        zh:'應該怎麼做／可以要求什麼' 
    },
    section2Title: { 
        en:'Support you can ask for', 
        zh:'你可以提出的支援' 
    },    
    section2Note:{
        en:"Care isn't only happen in the appointment.\u00A0These are requests and services that exist across the system, most people just aren't told . ",
        zh:"醫療支援不只限於診症室內發生的事。以下是整個醫療系統中一直存在的服務與要求——只是大部分人並不知道。"
    },
    section3Title:{
        en:"My experience",
        zh:"我的經歷"
    },
    storyIntro:{
        en:"This guide exists because of what I went through",
        zh:"這個指南的出現，源於我親身經歷過的事",
    },
    footerText:{
        en:"<strong>About this site:\u00A0</strong> This is built from personal experience navigating NHS care in the UK.\u00A0 It meant to help you recognise a situation and find the right place faster.\u00A0 It is not medical advice, a diagnosis or a substitute for a clinician who can examine you.\u00A0 Service details (opening hours, exact age ranges, what a pharmacy can treat) can change over time and vary slightly across England, Scotland, Wales and Northern Ireland.\u00A0 Always confirm specifies with NHS 111, your GP practice or nhs.uk. If you are in immediate danger, please call 999",
        zh:'<strong>關於這個網站：</strong>這個網站根據自己在英國求診的親身經歷建立了，希望幫助你更快辨認情況、找到合適的求診途徑——本網站並非醫療建議、診斷，亦不能取代能夠親自為你檢查的醫護人員。各項服務細節（開放時間、確實年齡範圍、藥房可治療的病症等）會隨時間改變，英格蘭、蘇格蘭、威爾斯及北愛爾蘭之間亦略有不同——請以 NHS 111、你的家庭醫生診所或 nhs.uk 的最新資料為準。如有即時危險，請致電 999。'

    },
};

const TIERS=[
    {key:'self', code:'01', color:'var(--tier-self)', bg:'var(--tier-self-bg)',
    name:{en:'Self-care',zh:'自行處理'},
    desc:{en:'rest,fluids,over-the-counter medicine, no appointment needed',zh:'休息、多喝水、非處方藥——毋須預約'}},
  { key:'pharmacy', code:'02', color:'var(--tier-pharmacy)', bg:'var(--tier-pharmacy-bg)',
    name:{en:'Pharmacy', zh:'藥房'},
    desc:{en:'Walk in, no booking \u00A0 pharmacists can now treat 7 conditions', zh:'直接到店藥房，毋須預約——藥劑師現時可免費治療7種常見病症'} },
  { key:'gp', code:'03', color:'var(--tier-gp)', bg:'var(--tier-gp-bg)',
    name:{en:'GP', zh:'家庭醫生'},
    desc:{en:'Ongoing, unexplained, or worsening symptoms \u00A0 book an appointment', zh:'持續、不明原因或正在惡化的症狀——需要預約'} },
  { key:'111', code:'04', color:'var(--tier-111)', bg:'var(--tier-111-bg)',
    name:{en:'NHS 111', zh:'NHS 111 熱線'},
    desc:{en:'Unsure what to do, or its outside GP hours \u00A0 call or go online', zh:'不確定應該點做，或家庭醫生診所已關門——致電或上網查詢'} },
  { key:'utc', code:'05', color:'var(--tier-utc)', bg:'var(--tier-utc-bg)',
    name:{en:'Urgent Treatment Centre', zh:'緊急治療中心'},
    desc:{en:'Same-day injuries that aren\u2019t life-threatening', zh:'非致命，但需要即日處理的受傷'} },
  { key:'ae', code:'06', color:'var(--tier-ae)', bg:'var(--tier-ae-bg)',
    name:{en:'A&E / 999', zh:'急症室／999'},
    desc:{en:'Life-threatening \u2014 chest pain, stroke signs, severe bleeding', zh:'有生命危險——胸痛、中風徵狀、大量出血'} },
];
 
/*SITUATIONS — searchable/filterable guide entries.*/
const SITUATIONS = [
  { tier:'self', title:{en:'Common cold or mild cough', zh:'普通感冒或輕微咳嗽'},
    when:{en:'Runny nose, sore throat, mild cough, no fever over 38\u00b0C, you\u2019re otherwise well.', zh:'流鼻水、喉嚨痛、輕微咳嗽，體溫不超過38°C，其他方面狀況良好。'},
    ask:{en:'Rest, fluids, paracetamol/ibuprofen if needed. Most colds clear in 7\u201310 days without any medicine.', zh:'休息、多喝水，有需要可服用撲熱息痛／布洛芬。大部分感冒不需服藥都會在7至10天內痊癒。'},
    kw:'cold flu cough runny nose sore throat mild 感冒 咳嗽 流鼻水 喉嚨痛' },
 
  { tier:'self', title:{en:'Mild headache', zh:'輕微頭痛'},
    when:{en:'Occasional, responds to rest or a mild painkiller, no other symptoms.', zh:'偶爾發生，休息或服用輕度止痛藥後有改善，沒有其他症狀。'},
    ask:{en:'Hydration, rest, paracetamol. Track frequency if it becomes regular, book a routine GP appointment.', zh:'補充水分、休息、服用撲熱息痛。如果變得頻密，記錄發作次數——這是之後應該見家庭醫生的原因，但不算緊急。'},
    kw:'headache mild migraine 頭痛 偏頭痛' },
 
  { tier:'self', title:{en:'Minor cuts and grazes', zh:'輕微傷口及擦傷'},
    when:{en:'Bleeding stops within a few minutes of pressure, wound is small and clean.', zh:'加壓後數分鐘內止血，傷口細小且乾淨。'},
    ask:{en:'Clean with water, cover with a plaster. Ask a pharmacist if it looks red or swollen after a couple of days.', zh:'用清水清潔，貼上膠布。如果幾天後傷口發紅或腫脹，可詢問藥劑師。'},
    kw:'cut graze wound minor scrape 傷口 擦傷 割傷' },
 
  { tier:'self', title:{en:'Mild hay fever or allergies', zh:'輕微花粉症或過敏'},
    when:{en:'Sneezing, itchy eyes, seasonal pattern, no breathing difficulty.', zh:'打噴嚏、眼睛痕癢，呈季節性，沒有呼吸困難。'},
    ask:{en:'Buy Antihistamines from a pharmacy or supermarket. Ask the pharmacist which type suits you if you drive or operate machinery.', zh:'在藥房或超市購買抗組織胺藥物。如果需要駕駛或操作機械，可向藥劑師查詢哪種較適合。'},
    kw:'hayfever allergy sneezing itchy eyes 花粉症 過敏 打噴嚏' },
 
  { tier:'self', title:{en:'Occasional heartburn', zh:'偶爾胃酸倒流'},
    when:{en:'After a heavy meal, alcohol, or lying down too soon after eating \u2014 infrequent.', zh:'在大餐、飲酒或餐後太快躺下時出現，並非經常發生。'},
    ask:{en:'Antacids, smaller meals, avoid lying down straight after eating. See a GP if it happens most days.', zh:'服用制酸劑、少食多餐、避免餐後立即躺下。如果幾乎每天都發生，應見家庭醫生。'},
    kw:'heartburn indigestion reflux 胃酸倒流 消化不良' },
 
  { tier:'pharmacy', title:{en:'Sinusitis', zh:'鼻竇炎'},
    when:{en:'Facial pain/pressure, blocked nose, lasting more than a few days \u2014 age 12+.', zh:'面部疼痛／有壓迫感、鼻塞，持續數天以上——12歲或以上人士適用。'},
    ask:{en:'Ask for a "Pharmacy First" consultation. No booking needed \u2014 the pharmacist can supply treatment on the spot if appropriate.', zh:'要求「Pharmacy First」諮詢服務。毋須預約——藥劑師如認為合適，可即場提供治療。'},
    kw:'sinusitis sinus blocked nose facial pain pharmacy first 鼻竇炎 鼻塞' },
 
  { tier:'pharmacy', title:{en:'Sore throat', zh:'喉嚨痛'},
    when:{en:'Painful swallowing, red throat, age 5+, no difficulty breathing.', zh:'吞嚥疼痛、喉嚨發紅，5歲或以上，沒有呼吸困難。'},
    ask:{en:'Consultanting pharmacy first  walk in and ask at the counter. They\u2019ll check for signs that need onward referral.', zh:'直接到藥房要求Pharmacy First諮詢，在櫃檯查詢即可。藥劑師會檢查是否有需要轉介的徵狀。'},
    kw:'sore throat tonsillitis pharmacy first 喉嚨痛 扁桃腺炎' },
 
  { tier:'pharmacy', title:{en:'Earache', zh:'耳痛'},
    when:{en:'Ear pain, possible mild discharge \u2014 ages 1 to 17.', zh:'耳朵疼痛，可能有輕微分泌物——適用於1至17歲。'},
    ask:{en:'Pharmacy First consultation. Free, no appointment. They\u2019ll refer you on if it looks like it needs a GP.', zh:'Pharmacy First諮詢，免費且毋須預約。如有需要，藥劑師會轉介你去見家庭醫生。'},
    kw:'earache ear infection pain pharmacy first child 耳痛 耳部感染' },
 
  { tier:'pharmacy', title:{en:'Infected insect bite', zh:'受感染的昆蟲叮咬'},
    when:{en:'Redness spreading, warmth, mild swelling around a bite \u2014 age 1+.', zh:'叮咬部位紅腫擴散、發熱、輕微腫脹——1歲或以上適用。'},
    ask:{en:'Pharmacy First consultation for possible antibiotic treatment without a GP appointment.', zh:'Pharmacy First諮詢，毋須預約家庭醫生亦可獲處方抗生素治療（如適用）。'},
    kw:'insect bite infected sting swelling pharmacy first 昆蟲叮咬 感染' },
 
  { tier:'pharmacy', title:{en:'Impetigo', zh:'膿疱病'},
    when:{en:'Crusty, weeping patches of skin, usually around the nose or mouth \u2014 age 1+.', zh:'皮膚出現結痂、滲液的斑塊，通常在鼻子或嘴巴附近——1歲或以上適用。'},
    ask:{en:'Pharmacy First consultation. Contagious \u2014 ask about hygiene steps to stop it spreading at home.', zh:'Pharmacy First諮詢。此病具傳染性——可詢問如何做好家居衛生以防止傳播。'},
    kw:'impetigo skin infection sores pharmacy first 膿疱病 皮膚感染' },
 
  { tier:'pharmacy', title:{en:'Shingles', zh:'帶狀疱疹'},
    when:{en:'Painful, blistering rash usually on one side of the body.', zh:'疼痛、有水疱的皮疹，通常出現在身體一側。'},
    ask:{en:'Go to a pharmacy urgently \u2014 antivirals work best within 72 hours of the rash appearing. Ask for Pharmacy First.', zh:'盡快到藥房求診——抗病毒藥物在皮疹出現後72小時內服用效果最好。可要求Pharmacy First諮詢。'},
    kw:'shingles rash blisters pain one side pharmacy first 帶狀疱疹 生蛇' },
 
  { tier:'pharmacy', title:{en:'Uncomplicated UTI (women)', zh:'單純性尿道炎（女性）'},
    when:{en:'Burning when urinating, needing to go often, no fever or back pain \u2014 women aged 16\u201364.', zh:'小便時有灼熱感、需要頻密如廁，沒有發燒或腰痛——16至64歲女性適用。'},
    ask:{en:'Pharmacy First consultation for same-day antibiotics if appropriate, no GP visit needed.', zh:'Pharmacy First諮詢，如適用可即日獲處方抗生素，毋須見家庭醫生。'},
    kw:'uti urinary tract infection cystitis pharmacy first women 尿道炎 膀胱炎' },
 
  { tier:'pharmacy', title:{en:'Medicines advice or minor ailments', zh:'藥物諮詢或輕微不適'},
    when:{en:'Unsure if a medicine is safe with others you take, or a general minor symptom.', zh:'不確定某種藥物與正在服用的其他藥物是否安全同服，或一般輕微症狀。'},
    ask:{en:'Ask the pharmacist directly \u2014 no appointment needed, and they can flag if you actually need a GP.', zh:'直接詢問藥劑師——毋須預約，如有需要他們會建議你去見家庭醫生。'},
    kw:'medicine advice interaction over the counter 藥物諮詢 ' },
 
  { tier:'gp', title:{en:'Symptoms lasting more than 2\u20133 weeks', zh:'症狀持續超過2至3星期'},
    when:{en:'Anything that hasn\u2019t settled with self-care or a pharmacy visit.', zh:'任何自行處理或看過藥劑師後仍未好轉的症狀。'},
    ask:{en:'Book a routine appointment. Ask the receptionist for the earliest option and mention if it\u2019s worsening.', zh:'預約普通門診。向接待處查詢最早可預約的時段，並說明症狀是否正在惡化。'},
    kw:'persistent ongoing weeks not improving 持續 未改善' },
 
  { tier:'gp', title:{en:'Managing a long-term condition', zh:'長期病患管理'},
    when:{en:'Diabetes, asthma, blood pressure reviews, medication changes.', zh:'糖尿病、哮喘、血壓覆診，或需要調整藥物。'},
    ask:{en:'Ask for a structured review appointment \u2014 these are usually longer than a standard slot.', zh:'要求安排結構性覆診——這類預約時段通常比普通門診長。'},
    kw:'diabetes asthma blood pressure long term condition review 糖尿病 哮喘 血壓 長期病' },
 
  { tier:'gp', title:{en:'Unexplained weight loss or fatigue', zh:'不明原因體重下降或疲勞'},
    when:{en:'No clear cause, going on for weeks, affecting daily life.', zh:'原因不明，持續數星期，影響日常生活。'},
    ask:{en:'Ask directly for blood tests. You can request the results and ask doctor to explain in plain terms.', zh:'直接要求安排驗血。你可以要求醫生用淺白的方式解釋結果。'},
    kw:'weight loss fatigue tired unexplained 體重下降 疲勞' },
 
  { tier:'gp', title:{en:'A mole or skin change', zh:'痣或皮膚變化'},
    when:{en:'New mole, or an existing one changing shape, colour, or size.', zh:'新長出的痣，或原有的痣在形狀、顏色或大小上有變化。'},
    ask:{en:'Ask specifically to be examined and, if needed, referred under the 2-week-wait suspected cancer pathway.', zh:'明確要求檢查，如有需要，可要求透過「兩星期內轉介」的懷疑癌症快速通道轉介。'},
    kw:'mole skin change lump lesion 痣 皮膚變化 腫塊' },
 
  { tier:'gp', title:{en:'Low mood or anxiety, not a crisis', zh:'情緒低落或焦慮（非緊急）'},
    when:{en:'Affecting daily life but you are safe right now.', zh:'影響日常生活，但目前人身安全沒有危險。'},
    ask:{en:'Ask about talking therapies (you can often self-refer online too) and what the practice offers directly.', zh:'查詢談話治療（很多時可自行網上轉介），以及診所本身提供的支援。'},
    kw:'anxiety depression low mood mental health non urgent 焦慮 情緒低落 抑鬱' },
 
  { tier:'gp', title:{en:'Needing a specialist referral', zh:'需要轉介專科'},
    when:{en:'A GP has agreed you need to see a hospital specialist.', zh:'家庭醫生已同意你需要見醫院專科醫生。'},
    ask:{en:'Ask which hospitals you can choose from \u2014 in England, usually you can pick your provider under NHS choice rules.', zh:'查詢可以選擇哪些醫院——在英格蘭，你通常可根據NHS選擇權自行揀選服務提供者。'},
    kw:'referral specialist hospital consultant 轉介 專科 醫院' },
 
  { tier:'111', title:{en:'Not sure which service you need', zh:'不確定應該用哪種服務'},
    when:{en:'Any time you\u2019re genuinely unsure whether it can wait.', zh:'任何時候你真的不確定情況是否可以等待。'},
    ask:{en:'Use 111 online first \u2014 it\u2019s faster than the phone line for most people and gives you a clear next step.', zh:'先使用111網上服務——對大部分人來說比打電話快，並會清楚告知下一步應該點做。'},
    kw:'unsure what to do not sure which service 唔知點做 不確定' },
 
  { tier:'111', title:{en:'Symptoms worsening outside GP hours', zh:'家庭醫生診所關門後症狀惡化'},
    when:{en:'Evenings, weekends, or when your surgery is closed.', zh:'晚上、週末，或診所已關門的時間。'},
    ask:{en:'Call 111 \u2014 they can book you into an out-of-hours GP service or urgent treatment centre directly.', zh:'致電111——他們可以直接為你安排非辦公時間家庭醫生服務或緊急治療中心。'},
    kw:'out of hours evening weekend worsening 非辦公時間 惡化' },
 
  { tier:'111', title:{en:'Child with a fever not settling', zh:'兒童發燒未能退燒'},
    when:{en:'High temperature not coming down with children\u2019s paracetamol/ibuprofen, child still alert and drinking.', zh:'服用兒童撲熱息痛／布洛芬後高燒仍未退，但小朋友仍然清醒及有飲水。'},
    ask:{en:'Call 111 for guidance \u2014 describe exactly what you\u2019ve given and when. They will escalate if needed.', zh:'致電111查詢——清楚說明已餵服的藥物及時間。如有需要，他們會安排進一步跟進。'},
    kw:'child fever temperature baby not settling 兒童發燒 發燒不退' },
 
  { tier:'111', title:{en:'Vomiting or diarrhoea not improving', zh:'嘔吐或腹瀉未有改善'},
    when:{en:'Lasting more than a couple of days, or you\u2019re worried about dehydration.', zh:'持續超過兩天，或擔心出現脫水情況。'},
    ask:{en:'111 online can triage and tell you whether you need oral rehydration advice or a same-day appointment.', zh:'111網上服務可為你分流，並告知你是否需要口服補液建議或即日預約。'},
    kw:'vomiting diarrhoea sickness dehydration 嘔吐 腹瀉 脫水' },
 
  { tier:'111', title:{en:'Mental health support, not an emergency', zh:'情緒支援（非緊急）'},
    when:{en:'You need help today but you are not in immediate danger.', zh:'今天就需要協助，但目前沒有即時危險。'},
    ask:{en:'Call 111 and select the mental health option \u2014 this connects to your local crisis/urgent mental health line.', zh:'致電111並選擇精神健康選項——會為你連接至地區緊急精神健康支援熱線。'},
    kw:'mental health support urgent not crisis 情緒支援 精神健康' },
 
  { tier:'utc', title:{en:'Sprains and strains', zh:'扭傷及拉傷'},
    when:{en:'Twisted ankle, wrist, or knee \u2014 painful and swollen but you can still move it a little.', zh:'腳踝、手腕或膝蓋扭傷——疼痛及腫脹，但仍能輕微活動。'},
    ask:{en:'Walk in to an Urgent Treatment Centre or Minor Injuries Unit. Ask if an X-ray is needed before you leave.', zh:'直接前往緊急治療中心或輕傷處理部門。離開前可詢問是否需要照X光。'},
    kw:'sprain strain twisted ankle wrist swelling 扭傷 拉傷' },
 
  { tier:'utc', title:{en:'Suspected minor fracture', zh:'懷疑輕微骨折'},
    when:{en:'Pain and swelling after a fall or knock, but the limb is still partly usable and there\u2019s no visible deformity.', zh:'跌倒或撞擊後疼痛及腫脹，但肢體仍可局部活動，亦沒有明顯變形。'},
    ask:{en:'UTC has X-ray on site in many locations \u2014 ask if this one has imaging before you travel there.', zh:'很多緊急治療中心設有即場X光服務——出發前可先查詢該中心是否有相關設備。'},
    kw:'fracture broken bone fall minor 骨折 跌倒' },
 
  { tier:'utc', title:{en:'Minor burns and scalds', zh:'輕微燒傷及燙傷'},
    when:{en:'Small area, skin reddened or lightly blistered, not on the face/hands/genitals.', zh:'範圍細小，皮膚發紅或有輕微水疱，並非位於面部／手部／私處。'},
    ask:{en:'Cool the burn under running water for 20 minutes first, then go \u2014 ask about dressing and infection signs to watch for.', zh:'先用流動清水沖洗傷口20分鐘，再前往求診——可詢問敷料處理方法及需要留意的感染徵狀。'},
    kw:'burn scald hot water minor 燒傷 燙傷' },
 
  { tier:'utc', title:{en:'Cuts that may need stitches or glue', zh:'可能需要縫合的傷口'},
    when:{en:'Won\u2019t stop bleeding with pressure, or gapes open, but the person is stable and breathing normally.', zh:'加壓後仍未能止血，或傷口裂開，但傷者情況穩定、呼吸正常。'},
    ask:{en:'UTC can close wounds and check if a tetanus booster is due \u2014 ask directly.', zh:'緊急治療中心可為傷口縫合，並可直接查詢是否需要注射破傷風加強針。'},
    kw:'cut stitches glue wound deep bleeding 傷口 縫合' },
 
  { tier:'utc', title:{en:'Minor eye injuries', zh:'輕微眼部受傷'},
    when:{en:'Something in the eye, minor scratch, redness after an irritant \u2014 vision still intact.', zh:'異物入眼、輕微刮傷，或受刺激物影響後眼紅——視力仍然正常。'},
    ask:{en:'Ask specifically for an eye examination; some UTCs have limited equipment and may redirect you to an eye unit.', zh:'明確要求眼科檢查；部分緊急治療中心設備有限，可能會轉介你到眼科急症部門。'},
    kw:'eye injury scratch foreign object minor 眼部受傷 異物入眼' },
 
  { tier:'ae', title:{en:'Chest pain', zh:'胸痛'},
    when:{en:'Tight, crushing, or heavy chest pain, especially spreading to arm/jaw, with sweating or breathlessness.', zh:'胸口有繃緊、壓迫或沉重感，尤其蔓延至手臂／下顎，並伴隨冒汗或氣促。'},
    ask:{en:'Call 999 immediately. Say "chest pain" clearly \u2014 this triggers a fast-track response.', zh:'立即致電999，清楚說出「胸痛」——這會觸發優先處理程序。'},
    kw:'chest pain heart attack tight crushing 胸痛 心臟病發' },
 
  { tier:'ae', title:{en:'Stroke signs (FAST)', zh:'中風徵狀（FAST）'},
    when:{en:'Face drooping, Arm weakness, Speech difficulty \u2014 Time to call 999, even if symptoms pass.', zh:'面部下垂、手臂無力、說話困難——即使徵狀消退，都要立即致電999。'},
    ask:{en:'Note the exact time symptoms started \u2014 this determines treatment options at hospital.', zh:'記下徵狀開始的確實時間——這會影響醫院提供的治療方案。'},
    kw:'stroke face drooping arm weakness speech fast 中風' },
 
  { tier:'ae', title:{en:'Severe bleeding', zh:'大量出血'},
    when:{en:'Won\u2019t stop with firm direct pressure, or from a deep wound.', zh:'加以直接施壓後仍未能止血，或傷口很深。'},
    ask:{en:'Apply continuous pressure and call 999. Don\u2019t remove anything embedded in the wound.', zh:'持續施壓並致電999。不要移除插入傷口內的任何物件。'},
    kw:'severe bleeding blood loss deep wound 大量出血' },
 
  { tier:'ae', title:{en:'Difficulty breathing', zh:'呼吸困難'},
    when:{en:'Struggling to speak in full sentences, blue lips, or rapidly worsening breathlessness.', zh:'難以完整說話、嘴唇發紫，或氣促情況急劇惡化。'},
    ask:{en:'Call 999. If it\u2019s a known asthma attack, use a reliever inhaler while you wait, if you have one.', zh:'致電999。如已知是哮喘發作，等候期間可使用急救吸入器（如有）。'},
    kw:'breathing difficulty asthma attack breathless 呼吸困難 哮喘發作' },
 
  { tier:'ae', title:{en:'Severe allergic reaction (anaphylaxis)', zh:'嚴重過敏反應（過敏性休克）'},
    when:{en:'Swelling of face/throat, widespread rash with breathing difficulty, after a known trigger.', zh:'接觸已知致敏原後，面部／喉嚨腫脹、全身出疹並伴隨呼吸困難。'},
    ask:{en:'Use an adrenaline auto-injector if prescribed, then call 999 immediately \u2014 even if symptoms briefly improve.', zh:'如有處方腎上腺素自動注射器，先使用，然後立即致電999——即使徵狀短暫改善都要致電。'},
    kw:'anaphylaxis allergic reaction epipen swelling throat 過敏性休克' },
 
  { tier:'ae', title:{en:'Suspected sepsis', zh:'懷疑敗血病'},
    when:{en:'Fever with confusion, fast breathing, mottled skin, or "worse than any illness before" in a known infection.', zh:'發燒伴隨神智不清、呼吸急促、皮膚出現斑駁，或在已知感染下感覺「比以往任何病都更嚴重」。'},
    ask:{en:'Say the word "sepsis" clearly to call handlers and on arrival \u2014 it changes how fast you\u2019re seen.', zh:'致電及抵達醫院時清楚說出「敗血病」（sepsis）——這會影響你被接見的優先次序。'},
    kw:'sepsis infection confusion fever severe 敗血病' },
 
  { tier:'ae', title:{en:'Mental health crisis with immediate danger', zh:'有即時危險的精神健康危機'},
    when:{en:'You or someone else is in immediate danger of serious harm right now.', zh:'你或其他人現時正面臨即時嚴重傷害的危險。'},
    ask:{en:'Call 999, or go to A&E and tell them it\u2019s a mental health emergency \u2014 you will be seen by a crisis-trained clinician.', zh:'致電999，或前往急症室並說明是精神健康緊急情況——你將會由受過危機處理訓練的醫護人員接見。'},
    kw:'mental health crisis suicidal emergency danger 精神健康危機' },
];
 
/*SUPPORT — things you can request across the system. */
const SUPPORT = [
  { title:{en:'NHS App', zh:'NHS App'}, body:{en:'Order repeat prescriptions, view your record and test results, and book some GP appointments without calling.', zh:'透過App續配藥物、查看醫療記錄及化驗結果，並可預約部分家庭醫生門診，毋須致電。'} },
  { title:{en:'PALS', zh:'PALS（病人諮詢及聯絡服務）'}, body:{en:'The Patient Advice and Liaison Service in every hospital \u2014 ask them for help resolving a concern or finding your way between departments.', zh:'每間醫院都設有的病人諮詢及聯絡服務——可請求協助解決疑慮，或在各部門之間找到方向。'} },
  { title:{en:'A second opinion', zh:'第二醫療意見'}, body:{en:'You can ask your GP or consultant for a referral to another clinician if you\u2019re unsure about a diagnosis or plan.', zh:'如對診斷或治療方案有疑問，可要求家庭醫生或專科醫生轉介你去見另一位醫護人員。'} },
  { title:{en:'Free interpreting', zh:'免費傳譯服務'}, body:{en:'NHS services must offer a professional interpreter if English isn\u2019t your first language \u2014 ask for this when you book.', zh:'如果英文並非你的母語，NHS服務必須提供專業傳譯員——預約時可提出要求。'} },
  { title:{en:'Care navigator / social prescriber', zh:'護理導航員／社區轉介員'}, body:{en:'Many GP surgeries have someone who can connect you to housing, financial, or community support \u2014 ask reception.', zh:'不少家庭醫生診所都設有專人，可協助你連結房屋、財務或社區支援——可向接待處查詢。'} },
  { title:{en:'Carer\u2019s assessment', zh:'照顧者評估'}, body:{en:'If you look after someone unpaid, you can ask your local council for an assessment of your own support needs.', zh:'如果你無償照顧他人，可向所屬地方議會要求為自己進行支援需要評估。'} },
  { title:{en:'District nursing team', zh:'社區護理隊'}, body:{en:'For wound care, injections, or medication support at home when you can\u2019t easily get to a clinic \u2014 ask your GP to refer you.', zh:'如難以親身前往診所，可請家庭醫生轉介，安排上門傷口護理、注射或藥物支援。'} },
  { title:{en:'Out-of-hours GP', zh:'非辦公時間家庭醫生服務'}, body:{en:'Reachable through 111 when your surgery is closed \u2014 not just for emergencies, for anything that genuinely can\u2019t wait until it reopens.', zh:'診所關門時可透過111聯絡——不限於緊急情況，只要真的不能等到診所重開都可以使用。'} },
  { title:{en:'Patient transport', zh:'病人接送服務'}, body:{en:'If a health condition means you can\u2019t travel to an appointment independently, ask if you\u2019re eligible for NHS patient transport.', zh:'如因健康狀況未能自行前往覆診，可查詢是否符合資格使用NHS病人接送服務。'} },
  { title:{en:'A written discharge plan', zh:'書面出院計劃'}, body:{en:'Before leaving hospital, you can ask for a written summary of what happens next and who to contact if things change.', zh:'出院前，可要求索取書面摘要，說明接下來的安排及情況有變時應聯絡誰。'} },
  { title:{en:'Samaritans', zh:'撒瑪利亞會（Samaritans）'}, body:{en:'116 123, free, 24/7 \u2014 for anyone struggling to cope, not only in crisis.', zh:'116 123，24小時免費熱線——不限於危機情況，任何感到難以應付的人都可致電。'} },
  { title:{en:'111 online', zh:'111 網上服務'}, body:{en:'Faster than the phone line for most non-emergencies, and available any time \u2014 good first stop when you\u2019re unsure.', zh:'對大部分非緊急情況來說比打電話快，全天候提供服務——當你不確定時，是一個好的起點。'} },
];
 
/* STORY — replace with your own timeline entries, in both languages.*/
const STORY = [
  { date:{en:'[Year]', zh:'【年份】'}, title:{en:'[What happened]', zh:'【發生了什麼事】'}, body:{en:'[Describe the situation \u2014 what symptoms you had, what you did first, and what you wish you\u2019d known.]', zh:'【描述當時的情況——你有什麼症狀、最初做了什麼，以及你希望當時已經知道的事。】'} },
  { date:{en:'[Year]', zh:'【年份】'}, title:{en:'[What happened]', zh:'【發生了什麼事】'}, body:{en:'[Describe the turning point \u2014 a visit, a diagnosis, a request you made or wish you had made.]', zh:'【描述轉捩點——一次求診、一個診斷，或你曾經／應該提出的要求。】'} },
  { date:{en:'[Year]', zh:'【年份】'}, title:{en:'[What happened]', zh:'【發生了什麼事】'}, body:{en:'[Describe how things were resolved, or where things stand now, and what support helped most.]', zh:'【描述事情最終如何解決，或目前的狀況，以及哪些支援對你幫助最大。】'} },
];

