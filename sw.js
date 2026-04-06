// Service Worker for offline caching
const CACHE_NAME = 'guitar-theory-v2';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/main.css',
  './css/chord-diagram.css',
  './css/circle-of-fifths.css',
  './css/tuner.css',
  './js/app.js',
  './js/audio.js',
  './js/chord-diagram.js',
  './js/circle-of-fifths.js',
  './js/scale-visualizer.js',
  './js/tuner.js',
  './js/data/chapters.js',
  './js/data/chords.js',
  './js/data/scales.js',
  './js/data/theory.js',
  './wx_qrcode_image.png',
  './icon-192.png',
  './icon-512.png',
];

// Install: cache all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response.ok && event.request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
    }).catch(() => caches.match('./index.html'))
  );
});
