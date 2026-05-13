// Anaboo service worker — basic offline shell + cache static assets
const CACHE_VERSION = 'anaboo-v2.0.1'
const CORE_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/anaboo-logo.svg',
  '/mascot.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(CORE_ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  // Don't cache /api/* (always go to network)
  if (url.pathname.startsWith('/api/')) return

  if (event.request.method !== 'GET') return

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached
      return fetch(event.request).then((response) => {
        // Cache same-origin GET responses
        if (response.ok && url.origin === self.location.origin) {
          const copy = response.clone()
          caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy))
        }
        return response
      }).catch(() => caches.match('/'))
    })
  )
})
