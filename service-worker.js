const CACHE_NAME = "flags-quiz-v3";
const BASE = new URL("./", self.location).pathname;

const ASSETS = [
  "",
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
].map((path) => `${BASE}${path}`);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
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
  const isAppFile = /\.(?:html|css|js|json)$/.test(url.pathname) || url.pathname === BASE || url.pathname === BASE.replace(/\/$/, "");

  if (isAppFile) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match(`${BASE}index.html`)))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type === "opaque") {
            return response;
          }
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(`${BASE}index.html`));
    })
  );
});
