// Areviax Mass — minimal service worker. The whole app is one bundled
// HTML file (everything else is inlined at build time), so the "app
// shell" here is just that file plus the two things a manifest can't
// inline: manifest.json itself and its icon.
//
// v2: was stale-while-revalidate, which answers instantly from cache and
// only refreshes it in the background for NEXT time — meaning after any
// real code change, every open still shows the OLD version once (and if
// the tab never gets a quiet moment to let that background fetch finish
// and get reloaded, it can stay stuck on stale content indefinitely).
// Fine for an app that rarely changes; actively wrong for one shipping
// fixes constantly, which is exactly what was happening here — a real
// fix landed and pushed live, but devices kept rendering the broken
// version because the SW never let the network response win. Network-
// first instead: try the network first so an online device always gets
// the latest build immediately, and only fall back to cache when that
// fetch actually fails (offline, or a flaky connection) — offline
// resilience without ever trading away freshness while online.
//
// v3: the network-first fetch() below still went through the browser's
// own HTTP cache — "network-first" in the SW's own logic, but the actual
// network call could still be silently answered out of HTTP cache
// without a real round trip, depending on the response's own
// Cache-Control. cache:'no-store' on the fetch forces a genuine
// revalidated request every time, so "network-first" is actually true
// end to end, not just true in the SW's own source. Also gives every
// device's Cache Storage a clean slate — cheap, and rules out a stale
// browser-level cache as the explanation the next time a real device
// reports seeing an already-shipped fix.
const CACHE_NAME = 'areviax-mass-v3';
const APP_SHELL = ['./', './index.html', './manifest.json', './images/icons/favicon.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
