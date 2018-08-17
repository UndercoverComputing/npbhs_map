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
        '/maps/map1.svg',
        '/maps/map2.svg',
        '/scripts/index.js',
        '/scripts/jquery-3.3.1.min.js',
        '/scripts/jquery.panzoom.js',
        '/scripts/jquery.wayfinding.js',
        '/tests/header.css',
        '/tests/header.html',
        '/tests/jquery.panzoom.js',
        '/tests/jquery.wayfinding.js',
        '/tests/map_version6.svg',
        '/tests/map_viewer.css',
        '/tests/map_viewer.html',
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
