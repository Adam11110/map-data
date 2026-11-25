# map-data

Weekly pull of public OpenStreetMap listings (real estate offices and building suppliers) using the Overpass queries in `queries.json`.
Runs on GitHub Actions every Monday; results land in `data/realtors_osm.json` and `data/suppliers_osm.json`, which the n8n prospect finders read.
Data © OpenStreetMap contributors, ODbL.
