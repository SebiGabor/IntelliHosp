importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js");

if (workbox) {
    console.log("Yay! Workbox is loaded !");
    workbox.precaching.precacheAndRoute([]);

    workbox.routing.registerRoute(
        /(.*)others(.*)\.(?:png|gif|jpg)/,
        new workbox.strategies.CacheFirst({
            cacheName: "images",
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                })
            ]
        })
    );
    workbox.routing.registerRoute(
        /.*\.(?:css|js|scss|)/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: "assets",
        })
    );

    // cache google fonts
    workbox.routing.registerRoute(
        new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
        new workbox.strategies.CacheFirst({
            cacheName: "google-fonts",
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
            ],
        })
    );

    workbox.googleAnalytics.initialize();

    workbox.core.skipWaiting();
    workbox.core.clientsClaim();

} else {
    console.log("Oops! Workbox didn't load");
}