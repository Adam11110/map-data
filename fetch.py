"""Weekly OpenStreetMap pull for the prospect finders (realtors and building suppliers) in each metro.
Runs on GitHub Actions because the public Overpass servers refuse our n8n host. Output: data/<kind>.json (public OSM data only)."""
import json, time, urllib.parse, urllib.request, datetime

UA = {'User-Agent': 'map-data-weekly/1.0 (github.com/Adam11110/map-data)'}
MIRRORS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter', 'https://overpass.private.coffee/api/interpreter']
KINDS = {
    'realtors': ['nwr["office"="estate_agent"]', 'nwr["shop"="estate_agent"]'],
    'suppliers': ['nwr["shop"="hardware"]', 'nwr["shop"="doityourself"]', 'nwr["shop"="trade"]', 'nwr["trade"]',
                  'nwr["shop"="building_materials"]', 'nwr["shop"="plumbing"]', 'nwr["shop"="electrical"]', 'nwr["shop"="lumber"]', 'nwr["craft"="builder"]["shop"]'],
}

def get(url, data=None, timeout=200):
    req = urllib.request.Request(url, data=data, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read().decode('utf-8'))

def bbox(metro):
    q = urllib.parse.urlencode({'q': metro + ', USA', 'format': 'json', 'limit': 1})
    r = get('https://nominatim.openstreetmap.org/search?' + q, timeout=60)
    time.sleep(1.2)  # Nominatim usage policy: max 1 request/second
    if not r:
        return None
    s, n, w, e = map(float, r[0]['boundingbox'])
    return s, w, n, e

def overpass(query):
    body = urllib.parse.urlencode({'data': query}).encode()
    last = None
    for m in MIRRORS:
        try:
            return get(m, body)
        except Exception as ex:  # try the next mirror
            last = ex
            time.sleep(5)
    raise last

def run():
    metros = json.load(open('metros.json'))
    out = {k: [] for k in KINDS}
    log = []
    for metro in metros:
        bb = bbox(metro)
        if not bb:
            log.append(metro + ': no bbox'); continue
        b = '(%f,%f,%f,%f)' % bb
        for kind, sels in KINDS.items():
            q = '[out:json][timeout:180];(' + ''.join(s + b + ';' for s in sels) + ');out center tags;'
            try:
                r = overpass(q)
            except Exception as ex:
                log.append('%s %s: %s' % (metro, kind, ex)); continue
            n = 0
            for el in r.get('elements', []):
                t = el.get('tags', {})
                if not t.get('name'):
                    continue
                out[kind].append({'osm_id': el['type'][0] + str(el['id']), 'metro': metro, 'name': t.get('name'),
                    'category': t.get('office') or t.get('shop') or t.get('trade') or t.get('craft') or '',
                    'email': t.get('email') or t.get('contact:email') or '', 'website': t.get('website') or t.get('contact:website') or '',
                    'phone': t.get('phone') or t.get('contact:phone') or '', 'city': t.get('addr:city') or '', 'state': t.get('addr:state') or '',
                    'street': ((t.get('addr:housenumber') or '') + ' ' + (t.get('addr:street') or '')).strip()})
                n += 1
            log.append('%s %s: %d' % (metro, kind, n))
            time.sleep(3)
    stamp = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%MZ')
    for kind, rows in out.items():
        seen, uniq = set(), []
        for r in rows:
            if r['osm_id'] not in seen:
                seen.add(r['osm_id']); uniq.append(r)
        json.dump({'updated': stamp, 'count': len(uniq), 'with_email': sum(1 for r in uniq if r['email']), 'rows': uniq},
                  open('data/%s.json' % kind, 'w'), indent=0)
    json.dump({'updated': stamp, 'log': log}, open('data/log.json', 'w'), indent=1)
    print('\n'.join(log))

if __name__ == '__main__':
    run()
