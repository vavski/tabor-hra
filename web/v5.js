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
  $$("[data-cta-label]").forEach(function (el) { el.textContent = label; });
  $$("[data-cta]").forEach(function (a) { a.href = "#koupit"; });

  // cena
  on("#price", function (e) { e.textContent = price; });
  if (!$("#stat-price")) {} else if (rezim !== "prodej") { $("#stat-price").setAttribute("data-count", 0); $("#stat-price").textContent = "0"; $("#stat-price-t").textContent = rezim === "zdarma" ? "Kč, teď hrajete zdarma" : "Kč, brzy"; }
  else $("#stat-price").setAttribute("data-count", price);
  if (Number(K.PRICE_OLD) > price && $("#price-old")) { $("#price-old").textContent = K.PRICE_OLD; $("#price-old").classList.remove("hide"); }
  on("#price-note", function (e) { e.textContent = K.PRICE_NOTE || "jedna hra"; });
  if ($("#bar-price")) $("#bar-price").innerHTML = (rezim === "prodej" ? price + "&nbsp;Kč" : rezim === "zdarma" ? "Zdarma" : "Brzy") + "<small>za celou partu · Tábor</small>";
  $$("[data-validity]").forEach(function (el) { el.textContent = K.VALIDITY_MONTHS || 12; });

  var pay = $("#pay-btn");
  if (pay) { if (payOk) pay.href = K.PAY_URL; else { pay.classList.add("hide"); on("#pay-missing", function (e) { e.classList.remove("hide"); }); } }
  var play = $("#play-btn"); if (play && K.GAME_URL) play.href = K.GAME_URL;

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

  // chat na zkoušku: začátek hry, jen se dá odpovědět
  var body = $("#chat-body"), quick = $("#chat-quick");
  if (body) {
    var ceka = function (ms) { return new Promise(function (r) { setTimeout(r, reduce ? 0 : ms); }); };
    var pis = function (html, cls) {
      var t = document.createElement("div"); t.className = "typing"; t.innerHTML = "<i></i><i></i><i></i>";
      if (cls !== "me" && cls !== "sys") { body.appendChild(t); body.scrollTop = body.scrollHeight; }
      return ceka(cls === "me" || cls === "sys" ? 150 : 700 + Math.min(900, html.length * 14)).then(function () {
        if (t.parentNode) t.remove();
        var m = document.createElement("div"); m.className = "m " + (cls || ""); m.innerHTML = html; body.appendChild(m); body.scrollTop = body.scrollHeight;
      });
    };
    var tlacitka = function (moznosti) {
      quick.innerHTML = "";
      moznosti.forEach(function (o) {
        var b = document.createElement(o.href ? "a" : "button"); b.textContent = o.t;
        if (o.href) b.href = o.href; else { b.type = "button"; b.onclick = function () { quick.innerHTML = ""; o.fn(); }; }
        quick.appendChild(b);
      });
    };
    var REAKCE = {
      "Byli jsme s ním… do půlnoci": "„Do půlnoci.“ A pak jste odpadli a on šel do noci sám. Skvělá rota.",
      "Říkal: ještě jedno": "„Ještě jedno.“ No jasně. A pak jste odpadli a on šel do noci sám. Skvělá rota."
    };
    var start = function () {
      body.innerHTML = ""; quick.innerHTML = "";
      pis("Do chatu se přidala Nevěsta", "sys")
        .then(function () { return pis("Dobrý ráno, roto. Tady nevěsta. Pro vás Generálka."); })
        .then(function () { return pis("Ženich nespal v posteli. Telefon nebere, holuba nečte."); })
        .then(function () { return pis("Rozlučka byla vaše akce. Vy jste ho měli hlídat. Tak kde je?"); })
        .then(function () {
          tlacitka(Object.keys(REAKCE).map(function (k) {
            return { t: k, fn: function () {
              pis(esc(k), "me")
                .then(function () { return pis(REAKCE[k]); })
                .then(function () { return pis("Jestli ho do poledne nenajdete, popravím vás. Já, ne on.", "hot"); })
                .then(function () { return pis("<small>Žižka · odesláno 02:14</small>Vy jste odpadli, roto. Chabý. Jdu se rozloučit s městem. Naposled."); })
                .then(function () { tlacitka([{ t: "Najít Žižku →", href: "#koupit" }, { t: "Znovu", fn: start }]); });
            } };
          }));
        });
    };
    seen([$("#chat")], start, { threshold: 0.35 });
  }

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
