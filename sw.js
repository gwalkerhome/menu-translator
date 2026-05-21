// La Carta service worker — enables PWA installation on Android
const CACHE = 'lacarta-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Pass all requests straight through — no offline caching needed
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});
