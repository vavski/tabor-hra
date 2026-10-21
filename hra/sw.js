/*
  HRA BEZ SIGNÁLU
  ===============
  Při prvním otevření si telefon uloží hru, nastavení a písma. Pak jde hra otevřít
  i bez dat, i po zavření prohlížeče. Když signál je, bere se vždy nejnovější verze
  z webu; když je slabý (déle než 4 s), pustí se uložená a nová se stáhne na pozadí.
  Odpovědi z dotazníku (docs.google.com) se tu neřeší, ty si hra drží sama.
*/
const CACHE = "rozlucka-v1";
const ZAKLAD = [
  "./",
  "pristup.js",
  "../web/config.js",
  "../web/fonts.css",
  "../web/fonts/BebasNeue-400-latin.woff2",
  "../web/fonts/BebasNeue-400-latin-ext.woff2",
  "../web/fonts/Inter-400-latin.woff2",
  "../web/fonts/Inter-400-latin-ext.woff2",
  "../web/fonts/Inter-600-latin.woff2",
  "../web/fonts/Inter-600-latin-ext.woff2",
  "../web/fonts/Inter-800-latin.woff2",
  "../web/fonts/Inter-800-latin-ext.woff2"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(ZAKLAD.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin) return;
  // adresa hry s klíčem (?k=…) a bez něj je pro uložení totéž
  const klic = r.mode === "navigate" ? new Request(u.origin + u.pathname) : r;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const ulozena = await c.match(klic, { ignoreSearch: true });
    const sit = fetch(r).then(o => { if (o.ok) c.put(klic, o.clone()); return o; });
    if (!ulozena) return sit;
    sit.catch(() => {});
    return Promise.race([sit, new Promise(res => setTimeout(() => res(ulozena), 4000))]).catch(() => ulozena);
  })());
});
