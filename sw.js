// Areviax Mass — service worker for the live site (GitHub Pages, served
// over real HTTPS — confirmed that's how this is actually opened, not as
// a standalone file). The app used to be published as one fully-inlined
// HTML document with every image baked in as base64, so there was no
// such thing as a separate image request for this worker to think about
// — everything lived or died with the one document. build_deploy.py now
// publishes the normal multi-file version instead (see its own comment
// for why: a 27MB single document was the real cause of "the app is
// extremely slow"), which means real per-image network requests exist
// here for the first time, and they need a different strategy than the
// document itself.
//
// v2: was stale-while-revalidate for the one HTML document, which
// answers instantly from cache and only refreshes it in the background
// for NEXT time — meaning after any real code change, every open still
// showed the OLD version once. Actively wrong for an app shipping fixes
// constantly. v3 moved to network-first with cache:'no-store' so an
// online device always gets the latest build immediately, falling back
// to cache only when offline.
//
// v4: that network-first/no-store policy is still right for the HTML
// document (and manifest.json / sw.js itself) — code changes need to
// reach a device immediately. But applying it to every image/audio file
// too would be actively harmful now that those are real separate
// requests: it would force a full network round-trip for every single
// photo on every single page view, forever, defeating the entire point
// of moving off the single-file bundle. Images and audio here are
// published under a stable filename and never overwritten in place (a
// changed exercise photo gets a new filename, not a same-name update —
// see how mass-app/images/misc/exwalk-*.jpg are added), so they're safe
// to cache aggressively: fetch once, keep forever, never re-check.
const CACHE_NAME = 'areviax-mass-v4';
const APP_SHELL = ['./', './index.html', './manifest.json', 'mass-app/images/icons/favicon.png'];
const ASSET_PATH = /\/(?:mass-app\/)?(?:images|audio)\//;

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
  const url = new URL(event.request.url);

  // Images/audio: cache-first, forever — a stable filename never changes
  // its content, so there's nothing to revalidate and every repeat view
  // of a page should cost zero network requests for its art.
  if (ASSET_PATH.test(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        });
      })
    );
    return;
  }

  // Everything else (the app document, manifest, this worker): always
  // try the network first so a code fix reaches an online device right
  // away, only falling back to cache when actually offline.
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
