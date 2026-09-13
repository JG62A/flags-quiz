const CACHE_NAME = "flags-quiz-v6";
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
  "flags/ad.png",
  "flags/ae.png",
  "flags/al.png",
  "flags/ar.png",
  "flags/at.png",
  "flags/au.png",
  "flags/ba.png",
  "flags/be.png",
  "flags/bg.png",
  "flags/br.png",
  "flags/by.png",
  "flags/ca.png",
  "flags/ch.png",
  "flags/cl.png",
  "flags/cn.png",
  "flags/cy.png",
  "flags/cz.png",
  "flags/de.png",
  "flags/dk.png",
  "flags/ee.png",
  "flags/eg.png",
  "flags/es.png",
  "flags/fi.png",
  "flags/fr.png",
  "flags/gb.png",
  "flags/gr.png",
  "flags/hr.png",
  "flags/hu.png",
  "flags/id.png",
  "flags/ie.png",
  "flags/il.png",
  "flags/in.png",
  "flags/is.png",
  "flags/it.png",
  "flags/jp.png",
  "flags/ke.png",
  "flags/kr.png",
  "flags/li.png",
  "flags/lt.png",
  "flags/lu.png",
  "flags/lv.png",
  "flags/ma.png",
  "flags/mc.png",
  "flags/md.png",
  "flags/me.png",
  "flags/mk.png",
  "flags/mt.png",
  "flags/mx.png",
  "flags/ng.png",
  "flags/nl.png",
  "flags/no.png",
  "flags/nz.png",
  "flags/ph.png",
  "flags/pl.png",
  "flags/pt.png",
  "flags/ro.png",
  "flags/rs.png",
  "flags/ru.png",
  "flags/sa.png",
  "flags/se.png",
  "flags/si.png",
  "flags/sk.png",
  "flags/sm.png",
  "flags/th.png",
  "flags/tr.png",
  "flags/ua.png",
  "flags/us.png",
  "flags/va.png",
  "flags/vn.png",
  "flags/za.png",
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
