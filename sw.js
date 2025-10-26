const CACHE_NAME = 'minhat-live-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/bourses.html',
  '/stages.html', 
  '/jobs.html',
  '/formations.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
