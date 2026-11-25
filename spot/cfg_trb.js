const CFG_TRB = (() => {
  const W = 'https://buy.stripe.com/28E5kE7MMfJD9TIgUG9bO05';
  const WATCH = {"spine":["Spine Implant","Orthopedic","NKB ODP MAX OVE OVD MQP PLR PQC"],"joint":["Joint Replacement","Orthopedic","PHX JWH LPH HSX HSN MEH KWY KYJ"],"diabetes":["Diabetes Technology","Clinical Chemistry","QFG NBW QBJ LZG QRX SBH CFR CGA"],"robotics":["Surgical Robotics & Navigation","General & Plastic Surgery","NAY QSM"],"electrosurgical":["Electrosurgical & Energy","General & Plastic Surgery","GEI LFL PAY"],"dialysis":["Dialysis & Urology","Gastroenterology & Urology","KDI KPO FKJ LJH QKA QXM FAS FCM KOD"],"intcardio":["Interventional Cardiology","Cardiovascular","DQX DQY LOX LIT PNO DRE PPN SGO"],"vascular":["Vascular Access & Needle","General Hospital","FMI FOZ LJS PTI LJT PND"],"vitals":["Blood Pressure & Vital Signs","Cardiovascular","DXN DXQ DRS"],"aesthetic":["Aesthetic & Dermatology","General & Plastic Surgery","GEX OHS OHT OAP OLI"],"ultrasound":["Ultrasound Imaging","Radiology","IYN IYO ITX MUI"],"ctmri":["CT & MRI","Radiology","LNH MOS OUO OEB SFV"],"neuromod":["Neuromodulation & Pain","Neurology","NFO NUH OBP GWF GZJ QBC"],"sterilization":["Sterilization & Disinfection","General Hospital","KCT FLE FRG JOJ MED MLR QVB"],"stapler":["Surgical Stapler & Closure","General & Plastic Surgery","GAM NEW FZP GAT GAG GAR GAW"],"ppe":["PPE & Infection Control","General Hospital","LZA FYA FXX QPC LYZ LZC"],"mobility":["Mobility & Wheelchair","Physical Medicine","ITI IOR"],"anesthesia":["Anesthesia & Airway","Anesthesiology","BSZ CBI SGR BSK CAP CAZ NWA"],"orthodontic":["Orthodontic Aligner & Digital Ortho","Dental","NXC PNN DYH DYW OAT"],"hemostasis":["Hemostasis & Surgical Sealant","General & Plastic Surgery","QSY QSZ QAU PGZ SHA"]};
  const AUD = [
    {key: 'distributors', plural: 'distributors and sales agencies', pain: 'New devices are cleared every week, and the distributors who learn first are the ones who get the conversation about carrying them.', uses: ['See every new clearance in your lines the week FDA publishes it', 'Spot manufacturers clearing new devices in categories you already sell', 'Bring a clearance list to your next supplier or territory meeting']},
    {key: 'bd', plural: 'business development and competitive intelligence teams', pain: 'Competitor clearances are public, but finding them in FDA\'s databases every week takes time nobody has.', uses: ['Track every competitor clearance in your category in one weekly email', 'See review times to benchmark your own submissions', 'Share the Excel file with product, marketing and leadership']},
    {key: 'regulatory', plural: 'regulatory consultants and analysts', pain: 'Clients ask what just cleared in their category, and pulling it from FDA every week is slow.', uses: ['Follow every new 510(k) in the categories you advise on', 'Use review times and pathway mix as context for client submissions', 'Keep a weekly Excel record of clearances by product code']}
  ];
  const products = Object.entries(WATCH).map(([k, [name, panel, codes]]) => ({key: 'w-' + k, name: name + ' Watch', short: name + ' Watch', codes: codes.split(' '), panel,
    lede: `a weekly email, PDF and Excel of every new FDA 510(k) clearance under the ${codes.split(' ').length} product codes FDA uses for ${name.toLowerCase()} devices`,
    plans: [['Device Watch', '$79', '/month', W, 'Start the ' + name + ' Watch']], audiences: AUD}));
  products.push({key: 'ortho', name: 'Orthopedic & Spine Watch', short: 'Orthopedic & Spine Watch', codes: null, panel: 'Orthopedic',
    lede: 'a weekly email, PDF and Excel of every new orthopedic and spine 510(k) clearance, grouped by segment',
    plans: [['Monthly', '$79', '/month', 'https://buy.stripe.com/dRm00k9UUdBv1ncgUG9bO00', 'Subscribe monthly'], ['Yearly', '$790', '/year', 'https://buy.stripe.com/28EeVe2ss40V1nc6g29bO01', 'Subscribe yearly']], audiences: AUD});
  products.push({key: 'dental', name: 'Dental Device Watch', short: 'Dental Device Watch', codes: ['DZE', 'NHA', 'NPL', 'NPM', 'LYC'], panel: 'Dental',
    lede: 'a monthly email, PDF and Excel of new FDA 510(k) clearances for dental implants, abutments, barrier membranes and bone grafts',
    plans: [['Monthly', '$49', '/month', 'https://buy.stripe.com/6oU6oIaYYfJD8PE5bY9bO02', 'Subscribe monthly'], ['Yearly', '$490', '/year', 'https://buy.stripe.com/aFabJ2c32fJD6HwfQC9bO03', 'Subscribe yearly']], audiences: AUD});
  for (const p of products) p.stat = async (a, today, helpers) => {
    if (!helpers) return '';
    const to = today.replace(/-/g, ''); const f = new Date(Date.parse(today + 'T12:00:00Z') - 90 * 864e5).toISOString().slice(0, 10).replace(/-/g, '');
    const q = p.codes ? 'product_code:(' + p.codes.join('+') + ')' : 'advisory_committee:OR';
    const r = await helpers.httpRequest({url: 'https://api.fda.gov/device/510k.json?search=' + q + '+AND+decision_date:[' + f + '+TO+' + to + ']&limit=1', json: true, timeout: 30000});
    const n = r && r.meta && r.meta.results ? r.meta.results.total : null;
    return n == null ? '' : `In the last 90 days, openFDA lists ${n} 510(k) clearance${n === 1 ? '' : 's'} under the product codes this watch follows. Subscribers get each one, with its applicant, device, review time and FDA link.`;
  };
  const write = (p, a) => ({slug: p.short + ' for ' + a.plural, title: `${p.short} for ${a.plural}`, desc: `${p.short}: ${p.lede}. Who it is for, what each edition contains and what it costs.`, kicker: 'Watch spotlight', p, a});
  const main = (post, c) => {
    const {p, a} = post; const e = c.esc;
    const plans = p.plans.map(([n, price, unit, link, btn]) => `<article class="tw-plan"><h3>${e(n)}</h3><p class="tw-price"><span class="tw-amt">${e(price)}</span><span class="tw-unit">${e(unit)}</span></p><div class="tw-actions"><a class="tw-btn tw-btn-solid" href="${link}">${e(btn)}</a></div></article>`).join('');
    const codes = p.codes ? `<p>This watch follows FDA product codes <strong>${p.codes.map(e).join(', ')}</strong> (FDA review panel: ${e(p.panel)}), so you see every clearance in the category and nothing outside it.</p>` : '<p>This watch follows clearances under FDA\'s Orthopedic advisory committee, grouped into segments such as trauma and fixation, spine, sports medicine and joint replacement.</p>';
    return `<main id="main" class="tw">
    <section class="hero page-hero"><div class="wrap">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/index.html">Home</a></li><li><a href="/blog/">Blog</a></li><li aria-current="page">Watch spotlight</li></ol></nav>
      <h1>${e(post.title)}</h1>
      <p class="lede">${e(a.pain)} The ${e(p.short)} is ${e(p.lede)}.</p>
      <p class="post-meta">Published ${c.fullD(c.todayISO)}</p>
    </div></section>
    <div class="wrap prose">
      <h2>What the ${e(p.short)} covers</h2>
      ${codes}
      ${post.stat ? '<p><strong>' + e(post.stat) + '</strong></p>' : ''}
      <h2>What each edition contains</h2>
      <ul>
        <li>Every new 510(k) clearance in the window, newest first</li>
        <li>Applicant, device name, K number, product code and decision date</li>
        <li>Review time for each record (decision date minus date received), with the median and range</li>
        <li>A link to FDA's own record for every clearance</li>
        <li>A PDF report and an Excel data file with all fields</li>
      </ul>
      <h2>How ${e(a.plural)} use it</h2>
      <ul>${a.uses.map(x => '<li>' + e(x) + '</li>').join('')}</ul>
      <h2>What it costs</h2>
      <div class="tw-plans">${plans}</div>
      <p>Secure checkout by Stripe. Cancel any time. See <a href="/pricing.html">all pricing</a>, <a href="/watches.html">all 20 watches</a> or <a href="/sample.html">a sample edition</a>.</p>
      <p class="caption">Traberra is an independent information service, not affiliated with or endorsed by the FDA. Data comes from public FDA sources. A 510(k) clearance is not an FDA approval and does not show that a product is launched, sold or available. This blog never reproduces the records from the paid editions.</p>
    </div>
  </main>`;
  };
  const addToIndex = (html, post, path, c) => {
    const card = '        <li>\n          <a class="card" href="' + path + '">\n            <p class="post-meta">' + c.fullD(c.todayISO) + ' · Watch spotlight</p>\n            <h2>' + c.esc(post.title) + '</h2>\n            <p>' + c.esc(post.desc) + '</p>\n          </a>\n        </li>\n';
    if (!html.includes('<ul class="blog-list">\n')) throw new Error('blog-list not found');
    return html.replace('<ul class="blog-list">\n', '<ul class="blog-list">\n' + card);
  };
  return {brand: 'Traberra', base: 'https://traberra.com', products, write, main, addToIndex, headExtra: '<link rel="stylesheet" href="/trb-site.css?v=2">', postFile: s => 'blog/' + s + '/index.html', postUrl: s => '/blog/' + s + '/', mustInclude: 'not affiliated with or endorsed by the FDA', perDay: 2};
})();
