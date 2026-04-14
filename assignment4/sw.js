const CACHE_NAME = "ocean-echo-v1";

const APP_SHELL = [
    "./",
    "./index.html",
    "./promo.css",
    "./app.html",
    "./app.css",
    "./app.js",
    "./manifest.webmanifest",
    "./INSTRUCTIONS.md",
    "./DOCUMENTATION.md",
    "./PROGRAMMER.md",
    "./data/topics.json",
    "./assets/icons/icon-192.svg",
    "./assets/icons/icon-512.svg",
    "./assets/screenshots/screen-1.svg",
    "./assets/screenshots/screen-2.svg",
    "./assets/screenshots/screen-3.svg",
    "./assets/topics/reef.svg",
    "./assets/topics/whale.svg",
    "./assets/topics/turtle.svg",
    "./assets/topics/jellyfish.svg",
    "./assets/topics/mangrove.svg"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request)
                .then((networkResponse) => {
                    if (event.request.method !== "GET") {
                        return networkResponse;
                    }

                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });

                    return networkResponse;
                })
                .catch(() => caches.match("./app.html"));
        })
    );
});
