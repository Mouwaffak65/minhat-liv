const CACHE_NAME = 'minhat-live-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/bourses.html',
  '/stages.html',
  '/jobs.html',
  '/formations.html',
  '/contact.html',
  '/manifest.json',
  '/styles/main.css',
  '/scripts/app.js'
];

// Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourne la réponse en cache ou fetch la requête
        return response || fetch(event.request);
      }
    )
  );
});

// Activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression de l ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
