self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('cooling-tower-cache').then(function(cache) {
      return cache.addAll([
        'index.html',
        'manifest.json',
        'icons/icon-192.png'
      ]);
    })
  );
  self.skipWaiting(); // optional, force activate SW
});

self.addEventListener('activate', function(e) {
  e.waitUntil(self.clients.claim()); // optional, immediately control pages
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
