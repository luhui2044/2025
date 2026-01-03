
const CACHE_NAME = 'focusflow-v5'; // 提升版本号以强制刷新
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // 只拦截 GET 请求
  if (event.request.method !== 'GET') return;

  // 关键：不要缓存 esm.sh 等动态 CDN 资源，因为它们在调试阶段可能会变动
  if (event.request.url.includes('esm.sh') || event.request.url.includes('ga.jspm.io')) {
    return; 
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // 只缓存同域成功的静态资源
        if (networkResponse.ok && event.request.url.startsWith(self.location.origin)) {
          const cacheCopy = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cacheCopy));
        }
        return networkResponse;
      }).catch(() => {
        // 网络失败时回退到缓存
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
