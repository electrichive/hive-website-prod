/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "framework-ba1e31de8a824ba7acac.js"
  },
  {
    "url": "styles.4b127eb0a25cfb6cd221.css"
  },
  {
    "url": "app-616214db43c5c33df25e.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "5bbedb027c239065eccbf0c2e8014ae2"
  },
  {
    "url": "webpack-runtime-18757599f46bcbfaf425.js"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-29fd2c62d887e48360fb.js"
  },
  {
    "url": "polyfill-c0fadaa261b5b2543979.js"
  },
  {
    "url": "af145db2f062e694745154d75559c25c073c4548-4919f8f79940ea92976f.js"
  },
  {
    "url": "cc66c7a10e36909d80bfb2506a61f43ef9a7a3b1-c1193ea45daa037c893d.js"
  },
  {
    "url": "component---src-pages-about-index-tsx-7fd8576233dab2566be5.js"
  },
  {
    "url": "page-data/about/page-data.json",
    "revision": "97dd1b6ce3fd0d66f1c29c43f87d6e41"
  },
  {
    "url": "page-data/sq/d/1193705211.json",
    "revision": "bdce585ad9470e1b3c76674ee97b1533"
  },
  {
    "url": "page-data/sq/d/127410513.json",
    "revision": "bb088626fbba73a761be3f437c201bc9"
  },
  {
    "url": "page-data/sq/d/1700984419.json",
    "revision": "143a7e52e1abdb32bf7120d3173e21cb"
  },
  {
    "url": "page-data/sq/d/3232614290.json",
    "revision": "ae0c5c3b8b4195e2d4fbd5b90d156f1c"
  },
  {
    "url": "page-data/sq/d/3460426213.json",
    "revision": "a22130ab3641632fe4be02d52a9bf008"
  },
  {
    "url": "page-data/sq/d/537265185.json",
    "revision": "75bcf02578885fdff866bf738af48f25"
  },
  {
    "url": "page-data/sq/d/747541314.json",
    "revision": "a9f9e37bb99babdc14c18dfd66a10539"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "37b548e91ef25c8e4e717215aff825d1"
  },
  {
    "url": "component---src-pages-contact-index-tsx-06e8fd7a4269586114c7.js"
  },
  {
    "url": "page-data/contact/page-data.json",
    "revision": "d76160a05948efd4765cc73f33ca99c8"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "5ba9f8282b9ab426d2dd1d157e1260c0"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\/page-data\/.*\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|avif|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */
importScripts(`idb-keyval-3.2.0-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-616214db43c5c33df25e.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)

/* eslint-disable no-undef */

import { registerRoute } from 'workbox-routing';
import {
    NetworkFirst,
    StaleWhileRevalidate,
    CacheFirst,
} from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

const OnlyHTTP200Plugin = new CacheableResponsePlugin({ statuses: [200] });

// NetworkFirst 'pages' cache on HTML navigation
registerRoute(
    ({ request }) => request.mode === 'navigate',
    new NetworkFirst({
        cacheName: 'pages',
        plugins: [OnlyHTTP200Plugin],
    })
);

// StaleWhileRevalidate 'assets' cache (CSS, JS, webworker)
registerRoute(
    ({ request }) => request.destination in ['style', 'script', 'worker'],
    new StaleWhileRevalidate({
        cacheName: 'assets',
        plugins: [OnlyHTTP200Plugin],
    })
);

// CacheFirst 'images' cache
registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            OnlyHTTP200Plugin,
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
            }),
        ],
    })
);
