const CFG_MP = (() => {
  const B = 'https://buy.stripe.com/';
  const A = (key, plural, pain, uses) => ({key, plural, pain, uses});
  const products = [
    {key: 'digest', tag: 'new permits every weekday morning', verb: 'find jobs first', name: 'the Morning Permits weekday email', short: 'Morning Permits', promise: 'new building permits in your city and trade, every weekday morning',
     what: ['New permits issued in your city for your trade, in one email each weekday morning', 'The job address, permit type and the work described on the permit', 'The permit holder and the job cost, where the city publishes them', 'A link to the public permit record for every job'],
     plans: [['Monthly', '$49', '/month', 'https://morningpermits.com/#pricing', 'See plans and subscribe'], ['Yearly', '$490', '/year', 'https://morningpermits.com/#pricing', 'Subscribe yearly']],
     faq: [['Where do the permits come from?', 'From each city\'s public permit records. Morning Permits is a private summary of those records, not a city office.'], ['Which cities do you cover?', 'The cities listed on our permit pages; we add more as their public data allows.'], ['Can I cancel?', 'Yes, any time.']],
     audiences: [
       A('roofing', 'roofing contractors', 'Roof jobs go to whoever talks to the owner first, and by the time a reroof shows up on a yard sign, the work is spoken for.', ['Spot reroof and repair permits the morning they are issued and reach the owner or general contractor first', 'See which general contractors keep pulling permits in your area and pitch them as their roofing sub', 'Follow storm-season spikes in your city without driving the neighborhoods']),
       A('hvac', 'HVAC companies', 'Replacement and new-construction HVAC work is decided early, often before the walls close.', ['See mechanical and HVAC permits each morning and follow up with the builder while equipment is still being chosen', 'Find remodels and additions that will need new ductwork or a bigger system', 'Track which builders are active so your sales calls go to busy companies']),
       A('electrical', 'electrical contractors', 'Panel upgrades, EV chargers and remodels are posted in public records every day, but finding them by hand takes hours.', ['Find remodels, additions and new builds that will need electrical work', 'Reach general contractors who pull permits but have no in-house electrician', 'See where panel and service upgrades are happening in your city']),
       A('plumbing', 'plumbing contractors', 'Remodels and new builds need plumbers, and the permit shows up before the job is staffed.', ['Catch kitchen and bath remodels while the builder is still lining up trades', 'See water heater, sewer and repipe permits by neighborhood', 'Build a call list of general contractors who keep winning work near you']),
       A('solar', 'solar installers', 'Homeowners who are already remodeling or reroofing are the easiest solar conversations, if you reach them in time.', ['See reroof permits, the best moment to talk about panels', 'Spot electrical service upgrades that often come before a solar install', 'Find neighborhoods with lots of building activity for door-to-door and mailers'])]},
    {key: 'supplier', tag: 'see which contractors are busy', verb: 'find busy contractors first', name: 'the Supplier digest', short: 'Supplier digest', promise: 'new permits grouped by contractor, so you know who is busy before they call your competitor',
     what: ['New building permits in your city, grouped by the contractor who pulled them', 'Daily, weekly or monthly delivery, your choice, at the same price', 'Each permit with its address, type, description and job cost where published', 'A link to the public record for every permit'],
     plans: [['Per city', '$99', '/month', B + '5kQcN4gZ12WB9Va3MccIE0N', 'Subscribe for $99/month']],
     faq: [['Is it the same data as the weekday email?', 'It is the same public permit data, regrouped by contractor for suppliers.'], ['Can I change how often it comes?', 'Yes. Daily, weekly or monthly is a delivery choice, not a price tier.'], ['Can I add a second city?', 'Yes, extra cities can be added at checkout.']],
     audiences: [
       A('lumber', 'lumber yards and building material dealers', 'The contractor who just pulled six permits is about to buy a lot of material, and your counter staff has no way to know.', ['See which contractors pulled the most permits this week and call them before the orders go elsewhere', 'Spot new builders in town who do not have a supplier yet', 'Plan outside sales routes around where permits are being issued']),
       A('plumbing-supply', 'plumbing supply houses', 'Plumbers buy where they already have an account, so the time to win them is when a new run of jobs starts.', ['Find plumbing contractors with a sudden jump in permits', 'Spot new plumbing companies pulling their first permits', 'Give your outside reps a weekly list of busy accounts to visit']),
       A('electrical-dist', 'electrical distributors', 'Electricians with a pipeline of permitted jobs are buying wire, panels and fixtures right now.', ['See which electrical contractors are busiest in your city this week', 'Spot large jobs early by the job cost on the permit', 'Find electricians who just started pulling permits in your area']),
       A('rental', 'equipment rental companies', 'Contractors rent lifts, excavators and dumpsters for jobs that are already permitted.', ['Find contractors with new demolition, foundation and addition permits', 'Call builders the week their job starts, when rentals are booked', 'See which parts of the city are busiest for delivery planning'])]},
    {key: 'opening-soon', tag: 'meet new restaurants before they open', verb: 'reach new restaurants first', name: 'Opening Soon', short: 'Opening Soon', promise: 'new bars, restaurants and food businesses from liquor and food license records, every Monday',
     what: ['New liquor and food license applications in the markets we cover, every Monday', 'Business name, address and license type, from public license records', 'A CSV file to load into your CRM', 'One market or all markets'],
     plans: [['One market', '$29', '/month', B + '14A8wO7or1Sx4AQ1E4cIE0Q', 'Subscribe for $29/month'], ['All markets', '$59', '/month', B + '3cI8wObEH1SxebqciIcIE0R', 'Subscribe for $59/month']],
     faq: [['Where does the list come from?', 'Public liquor and food license records.'], ['How early do businesses show up?', 'Many apply for licenses before they open, so they often appear before their doors open. Timing varies by business.'], ['Can I cancel?', 'Yes, any time.']],
     audiences: [
       A('cleaning', 'commercial cleaning companies', 'New restaurants and bars need a cleaning contract on day one, and the owner signs with whoever reaches them first.', ['Contact new restaurants while they are still building out and choosing vendors', 'Offer a pre-opening deep clean, then a regular contract', 'Plan sales visits by neighborhood using the addresses']),
       A('equipment', 'restaurant equipment and supply dealers', 'Kitchens are bought before a restaurant opens, not after.', ['Reach owners while they are still specifying the kitchen', 'Offer smallwares and supply accounts before the first order', 'Follow which neighborhoods are getting new restaurants']),
       A('pos', 'POS and payment providers', 'Every new bar and restaurant has to choose a POS and a payment processor before it opens.', ['Call new license applicants before they sign with a processor', 'Prioritize full-service restaurants and bars by license type', 'Load the weekly CSV straight into your CRM']),
       A('insurance', 'commercial insurance agents', 'A new bar or restaurant needs liquor liability, property and workers comp before opening.', ['Reach owners while they are shopping for coverage', 'Use the license type to see who needs liquor liability', 'Build a steady weekly prospect list without buying leads'])]},
    {key: 'recall-radar', tag: 'every new recall in one weekly email', verb: 'stay on top of recalls', name: 'Recall Radar', short: 'Recall Radar', promise: 'every new CPSC and FDA recall, sorted by category, in one weekly email',
     what: ['Every new CPSC consumer product recall and FDA recall from the past week', 'Sorted by category so you can skip what does not apply to you', 'A link to the official notice for each recall', 'Optional CSV of every recall on the $19 plan'],
     plans: [['Email', '$9', '/month', B + '9B69AS6knfJn8R6fuUcIE0S', 'Subscribe for $9/month'], ['Email + CSV', '$19', '/month', B + '3cIdR8bEHcxb3wM2I8cIE0T', 'Subscribe for $19/month']],
     faq: [['Where do the recalls come from?', 'From the public CPSC and FDA recall notices.'], ['Is this official?', 'No. Recall Radar is an independent weekly summary of public recall notices. Always check the official notice.'], ['Can I cancel?', 'Yes, any time.']],
     audiences: [
       A('retail', 'retailers and online sellers', 'Selling a recalled product is a legal and reputational risk, and recall notices are spread across several agencies.', ['Check each week whether anything you stock or list was recalled', 'Pull recalled items from shelves and listings quickly', 'Keep a simple record that you check recalls weekly']),
       A('childcare', 'daycares and schools', 'Cribs, toys and children\'s products are among the most recalled items, and staff rarely see the notices.', ['Check toys, cribs and furniture against each week\'s recalls', 'Share relevant recalls with parents', 'Keep a weekly log for inspections']),
       A('property', 'property managers', 'Recalled appliances, heaters and detectors in rental units are a safety and liability problem.', ['Watch for recalled appliances, heaters and smoke or CO alarms', 'Plan replacements before a tenant reports a problem', 'Use the CSV to match recalls against your unit inventory']),
       A('safety', 'safety and compliance managers', 'Tracking recalls across agencies by hand takes time every week.', ['Get every new CPSC and FDA recall in one email', 'Filter by the categories you buy or use', 'Keep the weekly CSV as an audit trail'])]},
    {key: 'lead-lists', tag: 'every active contractor in your city', verb: 'find the busiest contractors', name: 'Contractor lead lists', short: 'Contractor lead lists', promise: 'every contractor pulling permits in your city, ranked by activity, as a monthly CSV',
     what: ['Every contractor pulling permits in your city over the past month', 'Ranked by number of permits', 'Their trades and permit counts', 'A CSV file each month, ready for your CRM'],
     plans: [['Per city', '$29', '/month', B + 'fZu4gyfUX7cRffuciIcIE0U', 'Subscribe for $29/month']],
     faq: [['Where does the list come from?', 'From each city\'s public permit records.'], ['Does it include contact details?', 'It includes the contractor names and activity from the permit records. Contact details are not part of the list.'], ['Can I cancel?', 'Yes, any time.']],
     audiences: [
       A('material-reps', 'building material sales reps', 'Your territory has hundreds of contractors, and you can only visit a few each week.', ['Start each month with the most active contractors at the top', 'Spot contractors whose activity is rising', 'Find contractors new to your territory']),
       A('contractor-insurance', 'insurance agents who write contractor policies', 'Busy contractors need general liability, auto and workers comp, and their needs grow with their workload.', ['Target contractors with steady permit activity', 'Find new contractors pulling their first permits', 'Plan renewal-season outreach with real activity data']),
       A('agencies', 'marketing agencies for contractors', 'Contractors with lots of permits are growing and more likely to invest in marketing.', ['Find contractors who are busy but have a weak online presence', 'Reach companies by trade', 'Track growth month over month']),
       A('equipment-dealers', 'equipment and tool dealers', 'Contractors buy equipment when their workload grows.', ['See who is growing fastest in your city', 'Plan demos and visits around the most active companies', 'Find new businesses before a competitor signs them'])]},
    {key: 'contract-wins', tag: 'who just won federal work in your state', verb: 'reach new contract winners', name: 'Contract Wins', short: 'Contract Wins', promise: 'new federal contract awards of $25,000 or more with work in your state, every Monday',
     what: ['New federal prime contracts of $25,000 or more with work in your state', 'Winner, agency, amount and type of work', 'Sorted by amount, with a CSV every Monday', 'From USAspending.gov, the official source for federal spending'],
     plans: [['One state', '$19', '/month', B + '7sYeVcaAD1Sxc3ibeEcIE0V', 'Subscribe for $19/month'], ['All states', '$49', '/month', B + '8x2dR8dMP8gV0kA6YocIE0W', 'Subscribe for $49/month']],
     faq: [['Where does the data come from?', 'USAspending.gov, which publishes every federal prime contract award.'], ['Is this official?', 'No. Contract Wins is an independent summary of public data and is not affiliated with any government agency.'], ['Can I cancel?', 'Yes, any time.']],
     audiences: [
       A('subs', 'subcontractors', 'Prime contractors who just won federal work need subs, and they hire quickly.', ['Reach new prime winners in your state while they are staffing the job', 'Filter by type of work to find jobs in your trade', 'Build relationships with primes who win repeatedly']),
       A('staffing', 'staffing agencies', 'A new federal contract often means new hires, fast.', ['Contact winners as soon as the award is public', 'Focus on large awards that will need people', 'Track agencies and companies that award and win often']),
       A('bonding', 'surety, bonding and insurance agents', 'Contract winners need bonds and coverage, often on a deadline.', ['Reach new award winners in your state each Monday', 'See award size to gauge bonding needs', 'Find first-time federal winners who need help']),
       A('suppliers', 'suppliers and equipment rental companies', 'Winning a contract means buying materials and renting equipment soon after.', ['See which companies just won work near you', 'Read the type of work to match your products', 'Call before the winner sets up its supply chain'])]},
    {key: 'freshly-filed', tag: 'new businesses the week they register', verb: 'reach new businesses first', name: 'Freshly Filed', short: 'Freshly Filed', promise: 'new businesses that just registered with the state in your area, daily or weekly',
     what: ['Businesses that just registered with the state in your county, city or state', 'Business name, type, filing date and address, plus county and industry where the state publishes them', 'Daily or weekly, by email plus spreadsheet', 'Colorado, New York, Connecticut and Oregon today'],
     plans: [['One area', '$29', '/month', B + '8x2fZg1030Ot7N2ciIcIE0X', 'Subscribe for $29/month'], ['Whole state', '$79', '/month', B + '8x29AS7or2WBgjy4QgcIE0Y', 'Subscribe for $79/month']],
     faq: [['Where does the data come from?', 'Each state\'s public business registry.'], ['Are the addresses always the business location?', 'Not always. Some new businesses use a home or mail-drop address, and New York often lists only the county.'], ['Who is Freshly Filed?', 'Freshly Filed is a Morning Permits product, so receipts say Morning Permits.']],
     audiences: [
       A('insurance-new', 'insurance agents', 'New business owners need general liability, property and workers comp, and the first agent to call usually wins.', ['Reach new owners the week they register', 'Sort by business type to match your best policies', 'Build a steady prospect list without buying leads']),
       A('accountants', 'accountants, bookkeepers and payroll services', 'New owners need help with books, taxes and payroll right away.', ['Offer setup help the week a business registers', 'Focus on business types that hire staff', 'Turn new owners into long-term monthly clients']),
       A('bankers', 'business bankers and merchant services', 'Every new business needs a bank account and a way to take payments.', ['Reach owners before they open accounts elsewhere', 'Offer merchant services to retail and food businesses', 'Track new filings in your branch area']),
       A('signs-web', 'sign shops, printers and web designers', 'A new business needs a sign, cards and a website before it opens.', ['Contact new businesses while they are setting up', 'Offer a starter package of sign, cards and site', 'Focus on storefront business types'])]}
  ];
  const pick = (arr, n) => arr[n % arr.length];
  const write = (p, a, ctx) => {
    const n = (p.key + a.key).length;
    const titles = [`${cap(p.short)} for ${a.plural}: ${p.tag}`, `How ${a.plural} use ${p.short} to ${p.verb}`, `${cap(p.short)} for ${a.plural}`];
    const title = pick(titles, n);
    return {slug: p.short + ' for ' + a.plural, title, desc: `${cap(p.short)} gives ${a.plural} ${p.promise}. What is in it, how ${a.plural} use it, and what it costs.`, kicker: 'Product spotlight', lede: `${a.pain} ${cap(p.short)} sends ${p.promise}.`, p, a, stat: ctx.stat};
  };
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const main = (post, c) => {
    const {p, a} = post; const e = c.esc;
    const plans = p.plans.map(([n, price, unit, link, btn]) => `<div class="sp-plan"><p class="sp-pn">${e(n)}</p><p class="sp-pr">${e(price)}<span>${e(unit)}</span></p><a class="sp-btn" href="${link}">${e(btn)}</a></div>`).join('');
    return `<main id="main">
<section class="blog-hero ppage"><div class="wrap">
<p class="crumb"><a href="/">Home</a> / <a href="/blog/">Blog</a> / Product spotlight</p>
<div class="kick">${e(post.kicker)} · ${e(cap(a.plural))}</div>
<h1>${e(post.title)}</h1>
<p class="sub">${e(post.lede)}</p>
<p class="meta">Published ${c.fullD(c.todayISO)} · Morning Permits</p>
</div></section>
<section class="blog-section"><div class="wrap sp-body">
<h2>Why it matters for ${e(a.plural)}</h2>
<p>Public records show this activity early, often before anyone else knows about it, but checking them by hand every day is slow. ${e(cap(p.short))} does that work for you and puts it in your inbox.</p>
${post.stat ? '<p class="sp-stat">' + e(post.stat) + '</p>' : ''}
<h2>What you get</h2>
<ul class="sp-list">${p.what.map(x => '<li>' + e(x) + '</li>').join('')}</ul>
<h2>How ${e(a.plural)} use it</h2>
<ul class="sp-list">${a.uses.map(x => '<li>' + e(x) + '</li>').join('')}</ul>
<h2>What it costs</h2>
<div class="sp-plans">${plans}</div>
<p class="sp-note">Secure checkout by Stripe. Cancel any time.</p>
<h2>Questions</h2>
${p.faq.map(([q, ans]) => '<details class="sp-faq"><summary>' + e(q) + '</summary><p>' + e(ans) + '</p></details>').join('\n')}
<p class="sp-fine">Morning Permits compiles public records. We are not a city government or any government agency, and we never sell records from our paid emails on this blog.</p>
</div></section>
</main>`;
  };
  const addToIndex = (html, post, path, c) => {
    const tease = '<a class="post-tease" href="' + path + '">\n<p class="when">' + c.shortD(c.todayISO) + ' · Product spotlight</p>\n<h2>' + c.esc(post.title) + '</h2>\n<p>' + c.esc(post.desc) + '</p>\n</a>\n';
    const i = html.indexOf('<div class="post-list"'); if (i < 0) throw new Error('post-list not found'); const j = html.indexOf('>', i) + 1;
    return html.slice(0, j) + '\n' + tease + html.slice(j).replace(/^\n/, '');
  };
  const headExtra = '<style>.sp-body{max-width:760px}.sp-body h2{margin-top:32px}.sp-list{padding-left:20px}.sp-list li{margin:6px 0}.sp-stat{background:#fff7ed;border-left:4px solid #b45309;padding:12px 16px;border-radius:8px}.sp-plans{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin:12px 0}.sp-plan{border:1px solid #fed7aa;border-radius:14px;padding:18px;background:#fff}.sp-pn{margin:0;font-weight:700;color:#5b6472;text-transform:uppercase;font-size:13px;letter-spacing:1px}.sp-pr{font-size:34px;font-weight:800;margin:6px 0 12px}.sp-pr span{font-size:16px;font-weight:600;color:#5b6472}.sp-btn{display:block;text-align:center;background:#b45309;color:#fff;font-weight:700;padding:12px 16px;border-radius:10px;text-decoration:none}.sp-btn:hover{background:#92400e}.sp-note,.sp-fine{color:#5b6472;font-size:14px}.sp-faq{border:1px solid #e5e7eb;border-radius:12px;padding:14px 18px;margin:10px 0}.sp-faq summary{font-weight:700;cursor:pointer}.meta{opacity:.9;font-size:14px}</style>';
  return {brand: 'Morning Permits', base: 'https://morningpermits.com', products, write, main, addToIndex, headExtra, postFile: s => 'blog/guides/' + s + '/index.html', postUrl: s => '/blog/guides/' + s + '/', mustInclude: 'We are not a city government', perDay: 2};
})();
