# Deploying RAGNAROK TRINITY

RAGNAROK TRINITY is a static website: HTML, CSS, JavaScript, WebP images, MP3 audio, one MP4 loop and TTF fonts (about 34 MB, listed in `files.json`). It needs **no** Node.js, PHP, database or build step. Any web server that serves static files can host it.

The examples below install it in a subfolder, `https://example.com/ragnarok-trinity/`. For a domain root, drop the `/ragnarok-trinity` prefix.

## 1. Requirements

- **HTTPS.** The loading screen caches files through a service worker, and browsers only enable service workers on HTTPS (or `localhost`). Without HTTPS the game still runs, just without the cache.
- **Trailing slash.** Every path in the game is relative, so the page must be opened as `/ragnarok-trinity/`. Without the slash the browser looks for assets at the domain root and gets 404s. Redirect `/ragnarok-trinity` to `/ragnarok-trinity/` with a 301. nginx and Apache do this on their own for real folders; for an nginx `alias` add the redirect yourself (below).
- The service worker's scope is limited to its own folder (`/ragnarok-trinity/`), so it never touches the rest of the site.

## 2. Copy the files

Upload the repository contents (everything except `.git`, `README.md`, `DEPLOY.md`, the license files, `docs/` and `guide/`) into the site's document root, in a folder called `ragnarok-trinity`:

```bash
DOCROOT=/var/www/example.com           # your site's document root
sudo mkdir -p "$DOCROOT/ragnarok-trinity"
sudo rsync -a --delete \
  --exclude .git --exclude README.md --exclude DEPLOY.md --exclude 'LICENSE*' --exclude docs --exclude guide \
  ./ "$DOCROOT/ragnarok-trinity/"
```

Give the files to the web server's user (`www-data` on Debian/Ubuntu, `nginx` or `apache` on RHEL, or your panel's site user):

```bash
OWNER=$(stat -c '%U:%G' "$DOCROOT")
sudo chown -R "$OWNER" "$DOCROOT/ragnarok-trinity"
sudo find "$DOCROOT/ragnarok-trinity" -type d -exec chmod 755 {} \;
sudo find "$DOCROOT/ragnarok-trinity" -type f -exec chmod 644 {} \;
```

If the main site runs WordPress or another CMS, that is fine: a real `ragnarok-trinity/` folder is served directly as static files.

## 3. Configure the web server

Aim for:

1. `/ragnarok-trinity` → 301 → `/ragnarok-trinity/`
2. Correct MIME types: `.js` JavaScript, `.webp` `image/webp`, `.mp3` `audio/mpeg`, `.mp4` `video/mp4`, `.ttf` `font/ttf`
3. `Cache-Control: no-cache` for the game files. Browsers still reuse their copy after an ETag/Last-Modified check, and the game keeps hashed copies in Cache Storage, so updates show up at once. Avoid long `expires`/`max-age` rules for this path.
4. MP3/MP4 served with range requests (206), which is the default for static files, and not gzipped.

### nginx

Inside the site's HTTPS `server { … }` block:

```nginx
location = /ragnarok-trinity { return 301 /ragnarok-trinity/; }
location ^~ /ragnarok-trinity/ {
    # If the files are NOT inside the document root, point to them (keep the trailing slash):
    # alias /var/www/ragnarok-trinity/;
    try_files $uri $uri/ =404;
    add_header Cache-Control "no-cache" always;
    gzip on;
    gzip_types text/css application/javascript text/javascript application/json image/svg+xml;
}
```

`^~` keeps other rules (image caching, PHP) from taking over this path. Recent nginx versions already map `webp`, `mp3`, `mp4` and `js` in `/etc/nginx/mime.types`. If `font/ttf` is missing, add `font/ttf ttf;` to that file; don't use a `types { }` block inside the location, because it replaces every other MIME type. Then reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### Apache / LiteSpeed

The included `.htaccess` sets the MIME types, `no-cache` and compression. It needs `AllowOverride` to allow at least `FileInfo` for the document root, plus `mod_mime`, `mod_headers` and `mod_deflate`:

```bash
sudo a2enmod headers mime deflate
sudo systemctl reload apache2
```

`mod_dir` adds the trailing-slash redirect for the folder automatically.

### Caddy

```caddy
redir /ragnarok-trinity /ragnarok-trinity/ 301
header /ragnarok-trinity/* Cache-Control "no-cache"
```

### GitHub Pages, Netlify and similar hosts

Publish the repository as it is. These hosts already send correct MIME types and add the trailing-slash redirect for folders.

## 4. Check the deployment

```bash
BASE=https://example.com/ragnarok-trinity
curl -sI "$BASE"            | grep -iE "^HTTP|^location"                  # 301 -> /ragnarok-trinity/
curl -sI "$BASE/"           | grep -iE "^HTTP|content-type"               # 200 text/html
curl -sI "$BASE/sw.js"      | grep -iE "^HTTP|content-type|cache-control" # 200, javascript, no-cache
curl -sI "$BASE/assets/stage.webp" | grep -iE "^HTTP|content-type"        # 200 image/webp
curl -s -o /dev/null -w "%{http_code}\n" -H "Range: bytes=0-99" \
  "$BASE/assets/audio/music/midday-showdown.mp3"                          # 206
```

Check that every file in `files.json` is reachable:

```bash
python3 - <<'PY'
import json, urllib.request
base = "https://example.com/ragnarok-trinity/"
files = json.load(urllib.request.urlopen(base + "files.json"))["list"]
bad = []
for f in files:
    try:
        with urllib.request.urlopen(urllib.request.Request(base + f["file"], method="HEAD")) as r:
            if r.status != 200: bad.append((f["file"], r.status))
    except Exception as e:
        bad.append((f["file"], str(e)))
print(len(files), "files checked,", len(bad), "problems")
for b in bad[:30]: print(b)
PY
```

Then open the game in a browser:

1. The first visit shows the loading screen ("Mengunduh aset game · X%") until all assets are downloaded, then the main menu.
2. DevTools → Console shows no 404 or MIME errors, and Application → Service Workers lists `sw.js` with the scope `…/ragnarok-trinity/`.
3. A reload is much faster (served from the cache).
4. On a phone, the page switches to `mobile.html` (landscape with touch controls).

## Updating

Upload the new files over the old ones (the `rsync --delete` above) and fix the ownership again. No cache purge is needed: HTML and JS use `no-cache`, and `precache.js` carries a hash for every file, so players only download what changed.

## Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| Blank page or every asset 404 | Opened without the trailing slash, or the files are in the wrong folder. Check the redirect and where `index.html` is |
| Loading stalls or the service worker fails | `sw.js` is not served as JavaScript, or is cached for too long. Check `curl -sI …/sw.js` |
| No audio/video on Safari or iPhone | Range requests are not supported. Serve MP3/MP4 directly as static files, without gzip or a proxy that drops the `Range` header |
| Changes don't appear | A long cache rule (a global `expires`, a cache plugin or a CDN). Exclude `/ragnarok-trinity/` from it |
| HTTP 500 after upload (Apache/LiteSpeed) | `AllowOverride` does not allow the `.htaccess` directives. Allow `FileInfo`, or delete `.htaccess` and set MIME types and headers in the server config |
| Behind Cloudflare | Bypass the cache for `/ragnarok-trinity/*` (or purge after each deploy) and turn Rocket Loader off for this path |
