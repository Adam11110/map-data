/* ---- Product spotlight posts (owner Nov 25): 2 extra posts per weekday that sell one product to one kind of customer.
   No customer data and no records from the paid editions: product facts, prices and public, aggregate numbers only. */
async function SPOT(state, todayISO, filesIn, CFG, helpers) {
  const T = Object.assign({}, state.text, filesIn || {});
  const used = (state.spots || []).map(s => s.key);
  const esc = s => String(s == null ? '' : s).replace(/&(?!(amp|lt|gt|quot|#\d+|[a-z]+);)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const MON = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const D = s => new Date(s + 'T12:00:00Z'); const fullD = s => MON[D(s).getUTCMonth()] + ' ' + D(s).getUTCDate() + ', ' + D(s).getUTCFullYear();
  const shortD = s => MON[D(s).getUTCMonth()].slice(0, 3) + '. ' + D(s).getUTCDate() + ', ' + D(s).getUTCFullYear();
  const slugify = s => String(s).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
  // all product x audience pairs, products interleaved so two posts on one day are about different products
  const combos = []; const maxA = Math.max(...CFG.products.map(p => p.audiences.length));
  for (let i = 0; i < maxA; i++) for (const p of CFG.products) if (p.audiences[i]) combos.push({p, a: p.audiences[i], key: p.key + ':' + p.audiences[i].key});
  const fresh = combos.filter(c => !used.includes(c.key));
  const pick = []; for (const c of fresh) { if (pick.length >= (CFG.perDay || 2)) break; if (pick.some(x => x.p.key === c.p.key)) continue; pick.push(c); }
  const files = {}, added = [], spots = (state.spots || []).slice();
  const get = f => files[f] != null ? files[f] : T[f];
  for (const c of pick) {
    const {p, a} = c;
    let stat = ''; try { if (p.stat) stat = await p.stat(a, todayISO, helpers) || ''; } catch (e) { stat = ''; }
    const post = CFG.write(p, a, {todayISO, stat, esc});
    const slug = slugify(post.slug || (p.name + '-for-' + a.plural));
    const rel = CFG.postFile(slug); const url = CFG.base + CFG.postUrl(slug);
    if (T[rel] || files[rel]) { spots.push({key: c.key, date: todayISO, path: CFG.postUrl(slug), skipped: 'exists'}); continue; }
    // page shell: the blog index, links made absolute, its main swapped for the post
    let shell = get('blog/index.html');
    shell = shell.replace(/(href|src)="\.\.\//g, '$1="/').replace(/(href|src)="(?!https?:|\/|#|mailto:|tel:|data:)([^"]+)"/g, (m, at, u) => at + '="/blog/' + u + '"');
    shell = shell.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
    shell = shell.replace(/<title>[\s\S]*?<\/title>/, '<title>' + esc(post.title) + ' | ' + CFG.brand + '</title>');
    const setMeta = (re, val) => { shell = shell.replace(re, (m, a1) => a1 + val + '"'); };
    setMeta(/(<meta name="description" content=")[^"]*"/, esc(post.desc));
    setMeta(/(<meta property="og:description" content=")[^"]*"/, esc(post.desc));
    setMeta(/(<meta property="og:title" content=")[^"]*"/, esc(post.title));
    setMeta(/(<meta property="og:url" content=")[^"]*"/, url);
    setMeta(/(<link rel="canonical" href=")[^"]*"/, url);
    if (CFG.headExtra) shell = shell.replace('</head>', CFG.headExtra + '\n</head>');
    const a0 = shell.indexOf('<main'), a1 = shell.indexOf('</main>') + 7; if (a0 < 0 || a1 < 7) throw new Error('spotlight: no main in blog index');
    const page = shell.slice(0, a0) + CFG.main(post, {todayISO, fullD, esc, url}) + shell.slice(a1);
    files[rel] = page;
    files['blog/index.html'] = CFG.addToIndex(get('blog/index.html'), post, CFG.postUrl(slug), {todayISO, fullD, shortD, esc});
    let sm = get('sitemap.xml'); if (sm && !sm.includes('<loc>' + url + '</loc>')) { sm = sm.replace('</urlset>', '  <url><loc>' + url + '</loc><lastmod>' + todayISO + '</lastmod></url>\n</urlset>'); files['sitemap.xml'] = sm; }
    let ll = get('llms.txt'); if (ll && !ll.includes(url)) { files['llms.txt'] = ll.replace(/\s*$/, '\n- [' + post.title + '](' + url + ')\n'); }
    const chk = [];
    if ((page.match(/<h1[\s>]/g) || []).length !== 1) chk.push('h1 count');
    if (/\bundefined\b|NaN|\[object Object\]/.test(page.slice(a0))) chk.push('bad value');
    if (!/<\/html>\s*$/.test(page)) chk.push('truncated');
    if (CFG.mustInclude && !page.includes(CFG.mustInclude)) chk.push('required line missing');
    if (chk.length) throw new Error('Spotlight checks failed (' + c.key + '): ' + chk.join('; '));
    spots.push({key: c.key, date: todayISO, path: CFG.postUrl(slug), title: post.title});
    added.push({key: c.key, path: CFG.postUrl(slug), url, title: post.title});
  }
  const outFiles = Object.assign({}, filesIn || {}, files);
  const newState = Object.assign({}, state, {text: Object.assign({}, state.text, outFiles), spots, updated: todayISO});
  return {files: outFiles, state: newState, added, left: fresh.length - added.length};
}
