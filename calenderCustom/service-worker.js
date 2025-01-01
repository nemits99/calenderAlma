const CACHE_NAME = "calender-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./script.js",
  "./styles.css",
  "./manifest.json",
  "./service-worker.js",
  "./icon-192x192.png",
  "./icon-512x512.png",
  // Tambahkan file lainnya yang ingin Anda cache
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
