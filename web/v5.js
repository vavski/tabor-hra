/* Žižkova rozlučka – úvodní stránka v5. Doplní web podle web/config.js a oživí ho. Žádné sledování, žádné cookies. */
(function () {
  "use strict";
  var K = window.KONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var warn = function (m) { if (window.console) console.warn("[rozlučka] " + m); };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var IO = "IntersectionObserver" in window;
  var on = function (sel, fn) { var e = $(sel); if (e) fn(e); };

  // světlý / tmavý vzhled: výchozí podle telefonu, přepínač si zapamatuje volbu (jen v tomhle prohlížeči)
  on("#theme", function (b) {
    b.onclick = function () {
      var dark = document.documentElement.getAttribute("data-theme") ? document.documentElement.getAttribute("data-theme") === "dark" : !(window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches);
      var t = dark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", t);
      try { localStorage.setItem("zr-theme", t); } catch (e) {}
    };
  });

  // režim prodeje
  var rezim = ["zdarma", "prodej", "brzy"].indexOf(K.REZIM) >= 0 ? K.REZIM : "zdarma";
  var price = Number(K.PRICE) || 0;
  var payOk = /^https:\/\//.test(K.PAY_URL || "");
  if (rezim === "prodej" && !payOk) warn("PAY_URL chybí – tlačítko Koupit odkazuje na e-mail.");
  document.documentElement.setAttribute("data-rezim", rezim);
  $$("[data-only]").forEach(function (el) { el.classList.toggle("hide", el.getAttribute("data-only") !== rezim); });

  var label = { zdarma: "Hrát zdarma", prodej: "Hrát za " + price + " Kč", brzy: "Dát vědět" }[rezim];
  $$("[data-cta-label]").forEach(function (el) { el.textContent = rezim === "prodej" ? (el.closest(".big") ? "Hrát únikovku" : "Hrát") : label; });
  $$("[data-cta]").forEach(function (a) { a.href = "#koupit"; });

  // cena
  on("#price", function (e) { e.textContent = price; });
  if (!$("#stat-price")) {} else if (rezim !== "prodej") { $("#stat-price").setAttribute("data-count", 0); $("#stat-price").textContent = "0"; $("#stat-price-t").textContent = rezim === "zdarma" ? "Kč, teď hrajete zdarma" : "Kč, brzy"; }
  else $("#stat-price").setAttribute("data-count", price);
  if (Number(K.PRICE_OLD) > price && $("#price-old")) { $("#price-old").textContent = K.PRICE_OLD; $("#price-old").classList.remove("hide"); }
  on("#price-note", function (e) { e.textContent = K.PRICE_NOTE || "jedna hra"; });
  if ($("#bar-price") && rezim !== "prodej") $("#bar-price").innerHTML = (rezim === "prodej" ? price + "&nbsp;Kč" : rezim === "zdarma" ? "Zdarma" : "Brzy") + "<small>za celou partu · Tábor</small>";
  $$("[data-sleva]").forEach(function (el) { el.textContent = K.SLEVA_KAMARAD || el.textContent; });
  if (!K.KOD_KAMARAD) $$("[data-kod]").forEach(function (el) { el.classList.add("hide"); });
  $$("[data-validity]").forEach(function (el) { el.textContent = K.VALIDITY_MONTHS || 12; });

  var pay = $("#pay-btn");
  if (pay) { if (payOk) pay.href = K.PAY_URL; else { pay.classList.add("hide"); on("#pay-missing", function (e) { e.classList.remove("hide"); }); } }
  var play = $("#play-btn"); if (play && K.GAME_URL) play.href = K.GAME_URL;

  // kdo už zaplatil, nemá platit znovu: telefon si pamatuje klíč z hra/pristup.js, místo „Koupit“ vidí „Pokračovat ve hře“
  var paid = false;
  try { paid = rezim === "prodej" && !!localStorage.getItem("zr-klic"); } catch (e) {}
  if (paid) {
    var game = K.GAME_URL || "hra/";
    $$("[data-cta]").forEach(function (a) { a.href = game; });
    $$("[data-cta-label]").forEach(function (el) { el.textContent = el.closest(".big") ? "Pokračovat ve hře" : "Pokračovat"; });
    if (pay) { pay.href = game; pay.removeAttribute("rel"); pay.textContent = "Pokračovat ve hře"; }
    $$("[data-kod], #koupit .drobne").forEach(function (el) { el.classList.add("hide"); });
    on("#paid-note", function (e) { e.classList.remove("hide"); });
    on("#pay-again", function (a) { if (payOk) a.href = K.PAY_URL; else a.classList.add("hide"); });
  }

  // kontakt, instagram, provozovatel
  var mail = (K.CONTACT_EMAIL || "").trim();
  $$("[data-mail]").forEach(function (a) {
    if (!mail) { a.classList.add("hide"); return; }
    a.href = "mailto:" + mail + "?subject=" + encodeURIComponent(a.getAttribute("data-subject") || "Žižkova rozlučka");
    if (a.textContent.trim() === "e-mail") a.textContent = mail;
  });
  var ig = (K.INSTAGRAM || "").trim();
  if (ig) { var igu = /^https?:/.test(ig) ? ig : "https://www.instagram.com/" + ig.replace(/^@/, "") + "/"; $$("[data-ig]").forEach(function (a) { a.href = igu; a.classList.remove("hide"); }); }
  var seller = [K.SELLER_NAME, K.SELLER_ICO ? "IČO " + K.SELLER_ICO : "", K.SELLER_ADDRESS].filter(Boolean);
  if ($("#seller")) $("#seller").innerHTML = "Provozovatel: " + seller.map(esc).join(", ") + (K.SELLER_VAT ? "" : ". Nejsme plátci DPH.");

  // objevování při rolování
  var seen = function (els, fn, opt) {
    if (!IO || reduce) { els.forEach(fn); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { fn(e.target); io.unobserve(e.target); } }); }, opt || { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  };
  seen($$(".reveal"), function (el) { el.classList.add("in"); });

  // čísla naskočí
  seen($$("[data-count]"), function (el) {
    var cil = Number(el.getAttribute("data-count")), t0 = null;
    if (reduce) return;
    var krok = function (t) { t0 = t0 || t; var p = Math.min(1, (t - t0) / 900); el.textContent = Math.round(cil * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(krok); };
    requestAnimationFrame(krok);
  }, { threshold: 0.6 });

  // video ukázka hraje, jen když je vidět
  $$("video[data-autoplay]").forEach(function (v) {
    if (!IO) { v.preload = "auto"; v.play && v.play().catch(function () {}); return; }
    new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { v.preload = "auto"; var p = v.play(); if (p) p.catch(function () {}); } else v.pause(); }); }, { threshold: 0.4 }).observe(v);
  });

  // hlasovky v ukázce: hraje jen ta, na kterou se ťukne, vždy jen jedna, nic samo nehraje
  var VLNA = [5, 9, 14, 8, 18, 12, 22, 16, 10, 19, 24, 13, 7, 15, 21, 11, 17, 23, 9, 14, 20, 12, 6, 16, 22, 10, 13, 8];
  $$(".hlas .vlna").forEach(function (v) { v.innerHTML = VLNA.map(function (h) { return '<i style="height:' + h + 'px"></i>'; }).join(""); });
  var zvuk = window.Audio ? new Audio() : null, hraje = null;
  var vlnaStav = function (b, podil) {
    var is = $$("i", b.closest(".hlas")), n = Math.round(podil * is.length);
    is.forEach(function (x, k) { x.classList.toggle("on", k < n); });
  };
  var zastav = function () {
    if (!hraje) return;
    hraje.textContent = "▶"; hraje.classList.remove("on"); hraje.setAttribute("aria-label", hraje.getAttribute("aria-label").replace("Pozastavit", "Přehrát"));
    vlnaStav(hraje, 0); hraje = null;
  };
  if (zvuk) {
    zvuk.preload = "none";
    zvuk.addEventListener("timeupdate", function () { if (hraje && zvuk.duration) vlnaStav(hraje, zvuk.currentTime / zvuk.duration); });
    zvuk.addEventListener("ended", zastav);
    $$(".hlas .play").forEach(function (b) {
      b.addEventListener("click", function () {
        if (hraje === b) { zvuk.pause(); zastav(); return; }
        zvuk.pause(); zastav();
        zvuk.src = b.getAttribute("data-src"); zvuk.currentTime = 0;
        var pr = zvuk.play(); if (pr) pr.catch(function () { zastav(); });
        hraje = b; b.textContent = "❚❚"; b.classList.add("on"); b.setAttribute("aria-label", b.getAttribute("aria-label").replace("Přehrát", "Pozastavit"));
      });
    });
  }

  // volba v ukázce: odpověď nevěsty se ukáže a hned pustí (ťuknutí je souhlas se zvukem); jde přepnout na druhou
  var out = $("#volba-out");
  $$(".volba button").forEach(function (v) {
    v.addEventListener("click", function () {
      if (!out) return;
      $$(".volba button").forEach(function (x) { x.classList.toggle("on", x === v); });
      var m = $(".m", out), p = $(".play", out);
      m.textContent = v.getAttribute("data-t"); p.setAttribute("data-src", v.getAttribute("data-src"));
      out.classList.remove("hide"); m.style.animation = "none"; void m.offsetWidth; m.style.animation = "";
      if (zvuk) { if (hraje === p) { zvuk.pause(); zastav(); } p.click(); }
    });
  });

  // „Hráli jste?“: text jde do stejného formuláře Google jako dotazník ve hře (pole poznámka, hra = "web").
  // Bez signálu se uloží do stejné fronty jako ve hře a odešle se, až signál bude. Na webu se nic nezobrazuje.
  var D = K.DOTAZNIK || {}, fbOk = /^https:\/\/docs\.google\.com\/forms\/.+\/formResponse$/.test(D.URL || "") && D.POLE;
  var fronta = function () { try { return JSON.parse(localStorage.getItem("zr-fb-fronta") || "[]"); } catch (e) { return []; } };
  var posli = function (d) { var b = new URLSearchParams(); for (var k in d) if (D.POLE[k] && d[k]) b.append(D.POLE[k], d[k]); return fetch(D.URL, { method: "POST", mode: "no-cors", body: b }); };
  var dozenout = function () {
    var q = fronta(), zbytek = [], n = q.length; if (!fbOk || !n) return;
    q.forEach(function (d) { posli(d).catch(function () { zbytek.push(d); }).then(function () { if (--n === 0) try { localStorage.setItem("zr-fb-fronta", JSON.stringify(zbytek)); } catch (e) {} }); });
  };
  on("#nazor", function (f) {
    if (!fbOk || !window.fetch) return;
    f.classList.remove("hide"); dozenout(); window.addEventListener("online", dozenout);
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var t = $("#nazor-t").value.trim(); if (!t) { $("#nazor-t").focus(); return; }
      var d = { poznamka: t, hra: "web" };
      var hotovo = function () { $("#nazor-t").value = ""; $(".dik", f).classList.remove("hide"); };
      var uloz = function () { try { var q = fronta(); q.push(d); localStorage.setItem("zr-fb-fronta", JSON.stringify(q)); } catch (_) {} hotovo(); };
      if (navigator.onLine === false) { uloz(); return; }
      posli(d).then(hotovo, uloz);
    });
  });

  // zamčená okénka jen zatřesou a řeknou proč
  var toast = $("#toast"), tt;
  var say = function (m) { if (!toast) return; toast.textContent = m; toast.classList.add("on"); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove("on"); }, 1800); };
  $$(".okno.lock").forEach(function (o) {
    o.addEventListener("click", function () { o.classList.remove("shake"); void o.offsetWidth; o.classList.add("shake"); say(o.classList.contains("fin") ? "Finále. Otevře se, až ho najdete." : "Odemknete ve hře, až vyřešíte hádanku."); });
  });

  // lišta dole: po úvodu ano, u bloku Hrát ne
  var bar = $("#bar"), hero = $(".hero"), buy = $("#koupit");
  if (bar && hero && buy) {
  var onScroll = function () {
    var r = buy.getBoundingClientRect();
    bar.classList.toggle("on", window.scrollY > hero.offsetHeight - 120 && !(r.top < window.innerHeight - 80 && r.bottom > 0));
  };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }
})();
