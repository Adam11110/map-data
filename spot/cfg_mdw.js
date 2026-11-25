const CFG_MDW = (() => {
  const A = (key, plural, search, customer, job) => ({key, plural, search, customer, job});
  const AUD = [A('plumbers', 'plumbers', 'plumber near me', 'a homeowner with a leak', 'service call'), A('hvac', 'HVAC companies', 'AC repair near me', 'a family with a broken furnace', 'service call'),
    A('roofers', 'roofers', 'roof repair near me', 'a homeowner after a storm', 'estimate'), A('electricians', 'electricians', 'electrician near me', 'a homeowner planning a panel upgrade', 'job'),
    A('landscapers', 'landscapers', 'lawn care near me', 'a new homeowner', 'estimate'), A('cleaners', 'cleaning companies', 'house cleaning near me', 'a busy family or office manager', 'quote'),
    A('salons', 'salons and barbers', 'hair salon near me', 'a new client', 'booking'), A('cafes', 'cafés and restaurants', 'coffee near me', 'a hungry customer nearby', 'visit')];
  const products = [
    {key: 'site', name: 'a Main Door Web website', short: 'A simple website', tag: 'get found and get calls',
     lede: a => `When someone searches "${a.search}", they call the business whose site loads fast on a phone and makes calling easy.`,
     what: a => [`A fast, mobile-friendly site that shows your services and service area`, `A big call button and a simple contact form, so ${a.customer} can reach you in seconds`, 'Hosting and ongoing updates included', 'A free sample homepage first; you pay nothing unless you want it'],
     uses: a => [`Show the ${a.job}s you do and the areas you serve, in plain words`, 'Put your phone number and reviews where people see them first', 'Point your Google Business Profile at a real site instead of a Facebook page'],
     plans: [['Free preview', 'Free', '', '/index.html#get-preview', 'Get my free preview'], ['Pricing', 'See plans', '', '/pricing.html', 'See website pricing']],
     faq: [['Do I have to pay for the preview?', 'No. We build a sample homepage from what is already public about your business, and you owe nothing for it.'], ['Who owns the site?', 'You do.'], ['Can I update it later?', 'Yes, updates are included.']]},
    {key: 'auto', name: 'automation setup', short: 'Automation setup', tag: 'stop losing leads to busywork',
     lede: a => `Every missed call or slow reply to a form is a ${a.job} that goes to someone else.`,
     what: a => ['Contact form follow-up: an instant reply to the customer, an alert to you, everything logged to a sheet', 'Missed calls and texts pushed to your phone with a call-back reminder', 'A weekly money report from Stripe', 'Built and tested on the tools you already use; you own everything'],
     uses: a => [`Reply to ${a.customer} within a minute, even when you are on a job`, 'Never lose a missed call again', 'See last week\'s sales, refunds and cancellations every Monday'],
     plans: [['Starter, 1 automation', '$299', 'one time', 'https://buy.stripe.com/eVq9ATdLF7d5aOj3VR7kc06', 'Get Starter'], ['Growth, 3 automations', '$799', 'one time', 'https://buy.stripe.com/28E9ATbDx2WP7C7fEz7kc07', 'Get Growth']],
     faq: [['Do I need to buy software?', 'Usually no. We use free tiers and tools you already pay for.'], ['Who owns it?', 'You do. Everything runs on your accounts.'], ['How long does it take?', 'Usually 2 to 5 business days after a short call.']]},
    {key: 'inbox', name: 'the Inbox Organizer', short: 'The Inbox Organizer', tag: 'see only the emails that matter',
     lede: a => `Customer emails get buried under receipts, notifications and newsletters, and a missed email can be a lost ${a.job}.`,
     what: a => ['Filters and labels that move receipts, notifications and newsletters out of your inbox', 'A starred "Needs you" label for customers, payments and replies waiting on you', 'A 7am email listing only what needs you today', 'Runs in your own Google account; remove it anytime'],
     uses: a => [`Never miss an email from ${a.customer}`, 'Start the day with one short list instead of a full inbox', 'Keep supplier receipts and notifications filed automatically'],
     plans: [['Inbox Organizer', '$99', 'one time', 'https://buy.stripe.com/eVqdR95f9cxpf4z1NJ7kc09', 'Get Inbox Organizer']],
     faq: [['Do you need my password?', 'No. You sign in yourself during setup, and we never keep your passwords.'], ['Does it work with Gmail?', 'Yes, it is built for Gmail and Google Workspace.'], ['Can I remove it?', 'Yes, anytime.']]}
  ].map(p => Object.assign(p, {audiences: AUD}));
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const write = (p, a) => ({slug: p.key === 'site' ? 'website-for-' + a.plural : (p.key === 'auto' ? 'automation' : 'inbox-organizer') + '-for-' + a.plural, title: p.key === 'site' ? `A website for ${a.plural} that gets calls` : `${p.short} for ${a.plural}: ${p.tag}`, desc: `${p.lede(a)} How ${p.name} helps ${a.plural}, what is included and what it costs.`, p, a});
  const main = (post, c) => {
    const {p, a} = post; const e = c.esc;
    const plans = p.plans.map(([n, price, unit, link, btn]) => `<div class="au-plan"><h3>${e(n)}</h3><p class="au-price"><span class="au-amt">${e(price)}</span><span class="au-unit">${e(unit)}</span></p><a class="au-btn au-btn-solid" href="${link}">${e(btn)}</a></div>`).join('');
    return `<main id="main" class="au">
    <section class="page-hero post-hero">
      <div class="wrap">
        <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/index.html">Home</a></li><li><a href="/blog/">Blog</a></li><li><span aria-current="page">For ${e(a.plural)}</span></li></ol></nav>
        <h1>${e(post.title)}</h1>
        <p class="lede">${e(p.lede(a))} Here is how ${e(p.name)} helps ${e(a.plural)}.</p>
        <p class="post-meta"><time datetime="${c.todayISO}">${c.fullD(c.todayISO)}</time></p>
      </div>
    </section>
    <div class="wrap prose">
      <h2>What you get</h2>
      <ul>${p.what(a).map(x => '<li>' + e(x) + '</li>').join('')}</ul>
      <h2>How ${e(a.plural)} use it</h2>
      <ul>${p.uses(a).map(x => '<li>' + e(x) + '</li>').join('')}</ul>
      <h2>What it costs</h2>
      <div class="au-plans">${plans}</div>
      <h2>Questions</h2>
      ${p.faq.map(([q, ans]) => '<p><strong>' + e(q) + '</strong> ' + e(ans) + '</p>').join('\n      ')}
      <p>See all <a href="/automation.html">automation packages</a> or <a href="/contact.html">contact us</a> with a question.</p>
    </div>
  </main>`;
  };
  const addToIndex = (html, post, path, c) => {
    const card = '          <li class="post-card">\n            <p class="eyebrow">For ' + c.esc(post.a.plural) + '</p>\n            <h2><a href="' + path + '">' + c.esc(post.title) + '</a></h2>\n            <p>' + c.esc(post.desc) + '</p>\n            <p class="post-meta"><time datetime="' + c.todayISO + '">' + c.fullD(c.todayISO) + '</time></p>\n          </li>\n';
    const k = '<ul class="post-list">\n'; if (!html.includes(k)) throw new Error('post-list not found');
    return html.replace(k, k + card);
  };
  return {brand: 'Main Door Web', base: 'https://maindoorweb.com', products, write, main, addToIndex, headExtra: '<link rel="stylesheet" href="/automation.css?v=3">', postFile: s => 'blog/' + s + '.html', postUrl: s => '/blog/' + s + '.html', mustInclude: 'Main Door Web', perDay: 2};
})();
