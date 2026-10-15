/* Žižkova rozlučka – doplní web podle web/config.js a oživí ho. Žádné sledování, žádné cookies. */
(function () {
  "use strict";
  var K = window.KONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var warn = function (m) { if (window.console) console.warn("[rozlučka] " + m); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  var rezim = ["zdarma", "prodej", "brzy"].indexOf(K.REZIM) >= 0 ? K.REZIM : "zdarma";
  if (rezim === "prodej" && !/^https:\/\//.test(K.PAY_URL || "")) { warn("PAY_URL chybí – tlačítko Koupit odkazuje na e-mail."); }
  document.documentElement.setAttribute("data-rezim", rezim);

  // bloky jen pro daný režim
  $$("[data-only]").forEach(function (el) { el.classList.toggle("hide", el.getAttribute("data-only") !== rezim); });

  // texty podle režimu
  var label = { zdarma: "Hrát zdarma", prodej: "Koupit", brzy: "Dát vědět" }[rezim];
  $$("[data-cta-label]").forEach(function (el) { el.textContent = label; });
  var title = { zdarma: "První party <span>hrají zdarma</span>", prodej: "Kupte hru <span>pro svou partu</span>", brzy: "Už <span>brzy</span>" }[rezim];
  $("[data-buy-title]").innerHTML = title;
  if (rezim === "prodej") { $("[data-step1-h]").textContent = "Koupíte přístup"; $("[data-step1]").textContent = "Zaplatíte kartou a hra se hned otevře. Nic se neinstaluje. Jeden telefon na partu stačí, ostatní hledají a radí."; }

  // cena
  var price = Number(K.PRICE) || 0;
  $("#price").textContent = price;
  if (Number(K.PRICE_OLD) > price) { $("#price-old").textContent = K.PRICE_OLD + " Kč"; $("#price-old").classList.remove("hide"); }
  if (K.PRICE_NOTE) { $("#price-note").textContent = K.PRICE_NOTE; $("#price-note").classList.remove("hide"); }
  $("#bar-price").innerHTML = (rezim === "prodej" ? price + "&nbsp;Kč" : rezim === "zdarma" ? "Zdarma" : "Brzy") + "<small>za celou partu · Tábor</small>";
  $$("[data-validity]").forEach(function (el) { el.textContent = K.VALIDITY_MONTHS || 12; });

  // tlačítka
  var pay = $("#pay-btn");
  if (pay) { if (/^https:\/\//.test(K.PAY_URL || "")) pay.href = K.PAY_URL; else { pay.classList.add("hide"); $("#pay-missing").classList.remove("hide"); } }
  var play = $("#play-btn"); if (play && K.GAME_URL) play.href = K.GAME_URL;

  // e-mail
  var mail = (K.CONTACT_EMAIL || "").trim();
  $$("[data-mail]").forEach(function (a) {
    if (!mail) { a.classList.add("hide"); return; }
    a.href = "mailto:" + mail + "?subject=" + encodeURIComponent(a.getAttribute("data-subject") || "Žižkova rozlučka");
    if (a.textContent.trim() === "e-mail") a.textContent = mail;
  });
  if (!mail) warn("CONTACT_EMAIL chybí.");

  // instagram (několik míst)
  var ig = (K.INSTAGRAM || "").trim();
  if (ig) { var url = /^https?:/.test(ig) ? ig : "https://www.instagram.com/" + ig.replace(/^@/, "") + "/"; ["#ig2", "#ig3", "#ig4"].forEach(function (id) { var a = $(id); if (a) { a.href = url; a.classList.remove("hide"); } }); }

  // další díl (text z nastavení, když je)
  if (K.NEXT_TITLE) $("[data-next-title]").textContent = K.NEXT_TITLE;
  if (K.NEXT_TEXT) $("[data-next-text]").textContent = K.NEXT_TEXT;
  if (K.PILL) $("#pill-text").textContent = K.PILL;

  // provozovatel
  var seller = [K.SELLER_NAME, K.SELLER_ICO ? "IČO " + K.SELLER_ICO : "", K.SELLER_ADDRESS].filter(Boolean);
  $("#seller").innerHTML = seller.map(esc).join("<br>") + (K.SELLER_VAT ? "" : "<br>Nejsme plátci DPH.");
  if (seller.length < 3) warn("Chybí údaje provozovatele (SELLER_*).");

  // štítek „Hrajeme od …“
  var ld = K.LAUNCH_DATE && new Date(K.LAUNCH_DATE + "T00:00:00");
  if (ld && !isNaN(ld) && ld > new Date()) { $("#pill-text").textContent = "Hrajeme od " + ld.getDate() + ". " + (ld.getMonth() + 1) + ". · Tábor · 1. díl"; }

  // žebříček: skutečné zápisy z nastavení, jinak poctivě prázdný
  var rows = Array.isArray(K.ZEBRICEK) ? K.ZEBRICEK.filter(function (r) { return r && r.rota && r.skore != null; }) : [];
  rows.sort(function (a, b) { return b.skore - a.skore; });
  var board = $("#board");
  if (!rows.length) {
    board.innerHTML = '<div class="empty"><b>Žebříček je zatím prázdný</b>První rota, která dohraje a pošle kartu, bude první. Je to vaše šance.</div>';
  } else {
    board.innerHTML = '<table><thead><tr><th>#</th><th>Rota</th><th>Čas</th><th style="text-align:right">Skóre</th></tr></thead><tbody>' +
      rows.slice(0, 10).map(function (r, i) { return "<tr><td class=\"n\">" + (i + 1) + "</td><td>" + esc(r.rota) + "</td><td>" + esc(r.cas || "") + "</td><td class=\"r\">" + esc(r.skore) + "</td></tr>"; }).join("") +
      "</tbody></table>";
  }

  // objevování při rolování
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else { $$(".reveal").forEach(function (el) { el.classList.add("in"); }); }

  // chat se píše sám, až na něj narolujete
  var chat = $("#chat");
  if (chat) {
    var run = function () {
      chat.classList.add("play");
      var msgs = $$(".msg", chat), typing = $(".typing", chat), t = 300;
      msgs.forEach(function (m, i) {
        var d = reduce ? 0 : t;
        setTimeout(function () { m.classList.add("show"); if (i === msgs.length - 1) typing.style.visibility = "hidden"; }, d);
        t += m.classList.contains("sys") ? 500 : 900 + Math.min(900, (m.textContent.length * 12));
      });
    };
    if ("IntersectionObserver" in window && !reduce) { var ioc = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { run(); ioc.disconnect(); } }, { threshold: 0.35 }); ioc.observe(chat); }
    else run();
  }

  // pás kroků: tečky a šipky
  var steps = $("#steps"), dots = $("#dots");
  if (steps && dots) {
    var items = $$(".step", steps);
    dots.innerHTML = items.map(function () { return "<i></i>"; }).join("");
    var upd = function () { var i = Math.round(steps.scrollLeft / (items[0].offsetWidth + 12)); $$("i", dots).forEach(function (d, k) { d.classList.toggle("on", k === Math.min(i, items.length - 1)); }); };
    steps.addEventListener("scroll", upd, { passive: true }); upd();
    var go = function (dir) { steps.scrollBy({ left: dir * (items[0].offsetWidth + 12), behavior: "smooth" }); };
    var p = $("[data-prev]"), n = $("[data-next]"); if (p) p.onclick = function () { go(-1); }; if (n) n.onclick = function () { go(1); };
  }

  // zamčená okénka: ťuknutí jen zatřese a řekne proč
  var toast = $("#toast"), tt;
  var say = function (m) { toast.textContent = m; toast.classList.add("on"); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove("on"); }, 1800); };
  $$(".okno.lock").forEach(function (o) {
    var h = function () { o.classList.remove("shake"); void o.offsetWidth; o.classList.add("shake"); say(o.classList.contains("fin") ? "Finále. Otevře se, až ho najdete." : "Odemknete ve hře, až vyřešíte hádanku."); };
    o.addEventListener("click", h); o.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); h(); } });
  });

  // lišta dole: ukázat až po hero, schovat u bloku Hrát
  var bar = $("#bar"), hero = $(".hero"), buy = $("#koupit");
  var onScroll = function () {
    var y = window.scrollY, past = y > hero.offsetHeight - 80, atBuy = buy.getBoundingClientRect().top < window.innerHeight - 120 && buy.getBoundingClientRect().bottom > 0;
    bar.classList.toggle("on", past && !atBuy);
  };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
})();
