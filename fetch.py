"""Weekly OpenStreetMap pull for the n8n prospect finders (realtor + supplier), run on GitHub Actions because the
public Overpass servers refuse the n8n host. queries.json holds the exact Overpass queries the finders used.
Output: data/<kind>_osm.json in Overpass format ({elements:[...]}), public OSM data only."""
import json, math, os, re, time, urllib.parse, urllib.request, datetime

UA = {'User-Agent': 'map-data-weekly/1.0 (github.com/Adam11110/map-data)'}
MIRRORS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter', 'https://overpass.private.coffee/api/interpreter']

def overpass(query):
    body = urllib.parse.urlencode({'data': query}).encode()
    last = None
    for attempt in range(1):
        for m in MIRRORS:
            try:
                req = urllib.request.Request(m, data=body, headers=UA)
                with urllib.request.urlopen(req, timeout=120) as r:
                    j = json.loads(r.read().decode('utf-8'))
                if isinstance(j.get('elements'), list):
                    return j
            except Exception as ex:
                last = ex
            time.sleep(10 * (attempt + 1))
    raise last or RuntimeError('no answer')

def bbox(m):
    # around:R,lat,lon -> a bounding box: much cheaper for Overpass than a radius search
    r, lat, lon = float(m.group(1)), float(m.group(2)), float(m.group(3))
    dlat = r / 111000.0; dlon = r / (111000.0 * max(0.2, math.cos(math.radians(lat))))
    return '(%.4f,%.4f,%.4f,%.4f)' % (lat - dlat, lon - dlon, lat + dlat, lon + dlon)

def parts(q):
    # split '[out..];(a;b;c;);out tags center;' into one request per statement, each with a bounding box
    head = q[:q.index(';') + 1].replace('[timeout:180]', '[timeout:170]')
    body = q[q.index('(', len(head)) + 1:q.rindex(');')]
    stmts = [x.strip() for x in re.split(r';(?=\s*nwr)', body) if x.strip()]
    return [head + re.sub(r'\(around:(\d+),(-?[\d.]+),(-?[\d.]+)\)', bbox, st.rstrip(';')) + ';out tags center;' for st in stmts]

def center(q):
    m = re.search(r'around:(\d+),(-?[\d.]+),(-?[\d.]+)', q)
    return (float(m.group(2)), float(m.group(3)), float(m.group(1))) if m else None

def near(e, c):
    p = e.get('center') or {}
    try:
        la, lo = float(p.get('lat')), float(p.get('lon'))
    except (TypeError, ValueError):
        return False
    dy = (la - c[0]) * 111000; dx = (lo - c[1]) * 111000 * math.cos(math.radians(c[0]))
    return (dx * dx + dy * dy) ** 0.5 <= c[2]

START = time.time(); BUDGET = 150 * 60  # stop starting new requests after 150 minutes; unfinished metros keep last week's data

def run():
    Q = json.load(open('queries.json'))
    Q = {k: Q[k] for k in sorted(Q, key=lambda k: {'rentals': 0, 'suppliers': 1}.get(k, 2))}  # rentals first (small, fast), then suppliers, then realtors
    os.makedirs('data', exist_ok=True)
    stamp = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%MZ')
    log = []
    for kind, items in Q.items():
        seen, els = set(), []
        try:
            old = json.load(open('data/%s_osm.json' % kind)).get('elements', [])
        except Exception:
            old = []
        for it in items:
            res, err = [], None
            for sub in parts(it['q']):
                if time.time() - START > BUDGET:
                    err = err or RuntimeError('time budget used up'); break
                try:
                    res.extend(overpass(sub)['elements'])
                except Exception as ex:
                    err = ex
                time.sleep(3)
            if err and not res:
                c = center(it['q']); kept = [dict(e, metro=it['metro']) for e in old if e.get('metro') == it['metro'] or (not e.get('metro') and c and near(e, c))]
                for e in kept:
                    k = e['type'] + str(e['id'])
                    if k not in seen:
                        seen.add(k); els.append(e)
                log.append('%s %s: FAILED %s (kept %d from last run)' % (kind, it['metro'], err, len(kept))); print(log[-1], flush=True); continue
            n = 0
            for e in res:
                k = e['type'] + str(e['id'])
                if k in seen:
                    continue
                seen.add(k); n += 1
                c = e.get('center') or {'lat': e.get('lat'), 'lon': e.get('lon')}
                els.append({'type': e['type'], 'id': e['id'], 'center': c, 'tags': e.get('tags', {}), 'metro': it['metro']})
            log.append('%s %s: %d%s' % (kind, it['metro'], n, ' (partial: %s)' % err if err else '')); print(log[-1], flush=True)
            json.dump({'updated': stamp, 'count': len(els), 'elements': els + [e for e in old if e.get('metro') not in {x['metro'] for x in items[:items.index(it) + 1]} and e.get('metro')]}, open('data/%s_osm.json' % kind, 'w'))  # save as we go
        json.dump({'updated': stamp, 'count': len(els), 'elements': els}, open('data/%s_osm.json' % kind, 'w'))
    json.dump({'updated': stamp, 'log': log}, open('data/log.json', 'w'), indent=1)
    print('\n'.join(log))

if __name__ == '__main__':
    run()
