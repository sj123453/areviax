// Areviax Mass — minimal service worker. The whole app is one bundled
// HTML file (everything else is inlined at build time), so the "app
// shell" here is just that file plus the two things a manifest can't
// inline: manifest.json itself and its icon.
const CACHE_NAME = 'areviax-mass-v1';
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

// Stale-while-revalidate: answer instantly from cache when there is one
// (so a repeat open or a flaky connection still works), then quietly
// refresh the cache from the network for next time.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
