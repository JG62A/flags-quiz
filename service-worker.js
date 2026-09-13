const CACHE_NAME = "flags-quiz-v4";
const SCOPE = self.registration.scope;

const ASSET_PATHS = [
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",
  "icons/icon-167.png",
  "icons/icon-180.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "flags/ad.svg",
  "flags/ae.svg",
  "flags/al.svg",
  "flags/ar.svg",
  "flags/at.svg",
  "flags/au.svg",
  "flags/ba.svg",
  "flags/be.svg",
  "flags/bg.svg",
  "flags/br.svg",
  "flags/by.svg",
  "flags/ca.svg",
  "flags/ch.svg",
  "flags/cl.svg",
  "flags/cn.svg",
  "flags/cy.svg",
  "flags/cz.svg",
  "flags/de.svg",
  "flags/dk.svg",
  "flags/ee.svg",
  "flags/eg.svg",
  "flags/es.svg",
  "flags/fi.svg",
  "flags/fr.svg",
  "flags/gb.svg",
  "flags/gr.svg",
  "flags/hr.svg",
  "flags/hu.svg",
  "flags/id.svg",
  "flags/ie.svg",
  "flags/il.svg",
  "flags/in.svg",
  "flags/is.svg",
  "flags/it.svg",
  "flags/jp.svg",
  "flags/ke.svg",
  "flags/kr.svg",
  "flags/li.svg",
  "flags/lt.svg",
  "flags/lu.svg",
  "flags/lv.svg",
  "flags/ma.svg",
  "flags/mc.svg",
  "flags/md.svg",
  "flags/me.svg",
  "flags/mk.svg",
  "flags/mt.svg",
  "flags/mx.svg",
  "flags/ng.svg",
  "flags/nl.svg",
  "flags/no.svg",
  "flags/nz.svg",
  "flags/ph.svg",
  "flags/pl.svg",
  "flags/pt.svg",
  "flags/ro.svg",
  "flags/rs.svg",
  "flags/ru.svg",
  "flags/sa.svg",
  "flags/se.svg",
  "flags/si.svg",
  "flags/sk.svg",
  "flags/sm.svg",
  "flags/th.svg",
  "flags/tr.svg",
  "flags/ua.svg",
  "flags/us.svg",
  "flags/va.svg",
  "flags/vn.svg",
  "flags/za.svg",
];

const ASSETS = ASSET_PATHS.map((path) => new URL(path, SCOPE).href);

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await Promise.all(
        ASSETS.map(async (url) => {
          try {
            const response = await fetch(url, { cache: "reload" });
            if (response && response.ok) {
              await cache.put(url, response);
            }
          } catch (error) {
            // Keep installing even if one file fails.
          }
        })
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request, { ignoreSearch: true });
      if (cached) return cached;

      try {
        const response = await fetch(event.request);
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(event.request, response.clone());
        }
        return response;
      } catch (error) {
        if (event.request.mode === "navigate" || event.request.destination === "document") {
          return (await caches.match(new URL("index.html", SCOPE).href)) || Response.error();
        }
        return Response.error();
      }
    })()
  );
});
