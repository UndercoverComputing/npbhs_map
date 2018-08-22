const cacheName = 'npbhs_map';
self.addEventListener('install', e => {
  const timeStamp = Date.now();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        '/css/index.css',
        '/css/map_settings.css',
        '/css/ui_desktop.css',
        '/css/ui_mobile.css',
        '/css/ui_small.css',
        '/images/baseline_place_white_36dp.png',
        '/images/NPBHS-Logo.png',
        '/maps/map1.svg',
        '/maps/map2.svg',
        '/scripts/index.js',
        '/scripts/jquery-3.3.1.min.js',
        '/scripts/jquery.nice-select.js',
        '/scripts/jquery.panzoom.js',
        '/scripts/jquery.wayfinding.js',
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
