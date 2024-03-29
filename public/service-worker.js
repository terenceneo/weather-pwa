/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
'use strict';

// TODO: REMEMBER: Update cache names any time any of the cached files change.

const CACHE_NAME = 'static-cache-v1'; 

// Add constant: DATA_CACHE_NAME and give a name with version
// TODO: Uncomment below line
// const DATA_CACHE_NAME = 'data-cache-v1';

// TODO: Add list of files to cache here.
const FILES_TO_CACHE = ['/offline.html'];

// TODO: Uncomment the below block, when prompted
/*
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/scripts/app.js',
    '/scripts/install.js',
    '/scripts/luxon-1.11.4.js',
    '/styles/inline.css',
    '/images/add.svg',
    '/images/clear-day.svg',
    '/images/clear-night.svg',
    '/images/cloudy.svg',
    '/images/fog.svg',
    '/images/hail.svg',
    '/images/install.svg',
    '/images/partly-cloudy-day.svg',
    '/images/partly-cloudy-night.svg',
    '/images/rain.svg',
    '/images/refresh.svg',
    '/images/sleet.svg',
    '/images/snow.svg',
    '/images/thunderstorm.svg',
    '/images/tornado.svg',
    '/images/wind.svg',
];
*/

// The Service Worker "install" event
// TODO: Uncomment the below block when prompted!

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');

  // TODO: Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// The Service Worker "activate" event (Function 1 - Basic offline XP)
// TODO: Uncomment the following block when prompted!

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] activate');
  // TODO: Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME) {
                console.log('[ServiceWorker] Removing old cache', key);
                return caches.delete(key);
            }
        }));
    })
  );
  self.clients.claim();
});


// The Service Worker "activate" event (Function 2 - Functional offline XP)
// TODO: Uncomment the following block when prompted!

/*
self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');

  // TODO: Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});
*/

// Fetch Event VERSION 1
// TODO: Uncomment the below block
/*
self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // TODO: Add fetch event handler here.
  if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail out.
    return;
  }
  
  evt.respondWith(
    fetch(evt.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match('offline.html');
      });
    }));
  });
*/

// Fetch Event Version 2
// TODO: Uncomment the below block
/*
self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // TODO: Add fetch event handler here.
  if (evt.request.url.includes('/forecast/')) {
    console.log('[Service Worker] Fetch (data)', evt.request.url);

    evt.respondWith(
        caches.open(DATA_CACHE_NAME).then((cache) => {
          return fetch(evt.request)
              .then((response) => {
                // If the response was good, clone it and store it in the cache.
                if (response.status === 200) {
                  cache.put(evt.request.url, response.clone());
                }
                return response;
              }).catch((err) => {
                // Network request failed, try to get it from the cache.
                return cache.match(evt.request);
              });
        }));
    return;
  }
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(evt.request)
            .then((response) => {
              return response || fetch(evt.request);
            });
      })
  );
  // TODO: Removed the check for request.mode == navigate,
  // as want the service worker to handle all requests  
});
*/