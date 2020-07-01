importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute(
    [
        {url: '/css/materialize.min.css', revision: 1},
        {url: '/css/style.css', revision: 1},
        {url: '/index.html', revision: 1},
        {url: '/team.html', revision: 1},
        {url: '/nav.html', revision: 1},
        {url: '/manifest.json', revision: 1}
    ], {
        ignoreUrlParametersMatching: [/.*/]
    }
);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 7, 
                maxEntries: 20,
            })
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp('https://fonts.googleapis.com/icon?family=Material+Icons'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'material-icon',
    })
);

workbox.routing.registerRoute(
    new RegExp('\.(png|svg|jpg|jpeg)$'),
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 30,
                maxEntries: 50
            })
        ]
    }), {
        ignoreUrlParametersMatching: [/.*/]
    }
);

workbox.routing.registerRoute(
    new RegExp('\.js$'),
    workbox.strategies.cacheFirst({
        cacheName: 'script',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 30,
                maxEntries: 50
            })
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp('\.png$'),
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 30,
                maxEntries: 50
            })
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/competitions/2021/standings/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'standings',
        cacheExpiration: {
            maxAgeSeconds: 60 * 60 * 24
        }
    })
);


workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/teams/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'teams',
        cacheExpiration: {
            maxAgeSeconds: 60 * 60 * 24 * 30
        }
    })
);

self.addEventListener('push', (event) =>{
    let body;
    if (event.data) body = event.data.text();
    else body = 'Push message no payload';

    const options = {
        body: body,
        icon: 'images/icon/ball-192px.png',
        badge: 'images/icon/ball-72px.png',
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});