"""Weekly OpenStreetMap pull for the n8n prospect finders (realtor + supplier), run on GitHub Actions because the
public Overpass servers refuse the n8n host. queries.json holds the exact Overpass queries the finders used.
Output: data/<kind>_osm.json in Overpass format ({elements:[...]}), public OSM data only."""
import json, time, urllib.parse, urllib.request, datetime

UA = {'User-Agent': 'map-data-weekly/1.0 (github.com/Adam11110/map-data)'}
MIRRORS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter', 'https://overpass.private.coffee/api/interpreter']

def overpass(query):
    body = urllib.parse.urlencode({'data': query}).encode()
    last = None
    for attempt in range(2):
        for m in MIRRORS:
            try:
                req = urllib.request.Request(m, data=body, headers=UA)
                with urllib.request.urlopen(req, timeout=200) as r:
                    j = json.loads(r.read().decode('utf-8'))
                if isinstance(j.get('elements'), list):
                    return j
            except Exception as ex:
                last = ex
            time.sleep(5)
    raise last or RuntimeError('no answer')

def run():
    Q = json.load(open('queries.json'))
    stamp = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%MZ')
    log = []
    for kind, items in Q.items():
        seen, els = set(), []
        for it in items:
            try:
                r = overpass(it['q'])
            except Exception as ex:
                log.append('%s %s: FAILED %s' % (kind, it['metro'], ex)); continue
            n = 0
            for e in r['elements']:
                k = e['type'] + str(e['id'])
                if k in seen:
                    continue
                seen.add(k); n += 1
                c = e.get('center') or {'lat': e.get('lat'), 'lon': e.get('lon')}
                els.append({'type': e['type'], 'id': e['id'], 'center': c, 'tags': e.get('tags', {})})
            log.append('%s %s: %d' % (kind, it['metro'], n))
            time.sleep(3)
        json.dump({'updated': stamp, 'count': len(els), 'elements': els}, open('data/%s_osm.json' % kind, 'w'))
    json.dump({'updated': stamp, 'log': log}, open('data/log.json', 'w'), indent=1)
    print('\n'.join(log))

if __name__ == '__main__':
    run()
