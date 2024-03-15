importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js'
);

const VERSION = "v1";
const CACHE_NAME = `intelli-hosp-cache-${VERSION}`;

const APP_STATIC_RESOURCES = [
    '/',
    '../index.html',
    '../src'
];

self.addEventListener("install", (event) => {
    event.waitUntil(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(APP_STATIC_RESOURCES);
      })(),
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate") {
      event.respondWith(caches.match("/"));
      return;
    }

    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request.url);
        if (cachedResponse) {
          return cachedResponse;
        }
        return new Response(null, { status: 404 });
      })(),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
      (async () => {
        const names = await caches.keys();
        await Promise.all(
          names.map((name) => {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          }),
        );
        await clients.claim();
      })(),
    );
});


workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);