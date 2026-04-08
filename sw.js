// Service Worker for XPRINT Solutions Website
// Enables offline functionality and PWA features

const CACHE_NAME = 'proprintsolutions-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/script.js',
    '/README.md',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
            .then(function() {
                console.log('Service Worker: All files cached');
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                if (response) {
                    console.log('Service Worker: Serving from cache');
                    return response;
                }
                
                // For image requests, try cache first, then network
                if (event.request.url.includes('picsum.photos')) {
                    return fetch(event.request).catch(function() {
                        // Return a placeholder image if network fails
                        return new Response('Placeholder image not available offline', {
                            status: 404,
                            statusText: 'Not Found Offline'
                        });
                    });
                }
                
                return fetch(event.request);
            })
    );
});

// Background sync for form submissions (when implemented)
self.addEventListener('sync', function(event) {
    if (event.tag === 'background-sync-forms') {
        event.waitUntil(
            // Process any queued form submissions
            console.log('Service Worker: Background sync triggered')
        );
    }
});

// Push notifications (when implemented)
self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'New update from ProPrint Solutions',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore',
                icon: '/images/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/images/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('XPRINT Solutions', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', function(event) {
    console.log('Notification click received.');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        // Open the website
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

console.log('Service Worker loaded successfully');
