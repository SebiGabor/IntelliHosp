importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js'
);

const CACHE_NAME = 'Intelli-Hosp-cache';
const urlsToCache = [
    '../'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
    console.log('Fetch:', event.request.url);
    if (event.request.url.includes('/swagger-ui/')) {
      return;
    }

    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }

          var fetchRequest = event.request.clone();

          return fetch(fetchRequest).then(
            function(response) {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              var responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });

              return response;
            }
          ).catch(function(error) {
            console.error('Error fetching:', error);
          });
        })
    );
  });


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName === CACHE_NAME) {
            return;
          }
          return caches.delete(cacheName);
        })
      );
    })
  );
});

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);