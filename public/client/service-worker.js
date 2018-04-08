var doCache = false

var CACHE_NAME = 'weatherman-v1'

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key)
          }
        }))
      )
  )
})

self.addEventListener('install', function (event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function (cache) {
          window.fetch('asset-manifest.json')
            .then(function (response) {
              response.json()
            })
            .then(function (assets) {
              const urlsToCache = [
                '/',
                '/free-outdoor-cafes-vector 3.jpg',
                assets['bundle.js']
              ]
              cache.addAll(urlsToCache)
            })
        })
    )
  }
})

self.addEventListener('fetch', function (event) {
  if (doCache) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || window.fetch(event.request)
      })
    )
  }
})
