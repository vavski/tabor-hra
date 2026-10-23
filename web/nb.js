/* Návrh B: proužky nahoře podle obrazovky, tlačítko „Partě“ (sdílení odkazu). Zbytek dělá v5.js. */
(function () {
  "use strict";
  var scr = Array.prototype.slice.call(document.querySelectorAll(".scr, .rest"));
  var segs = document.getElementById("segs");
  segs.innerHTML = scr.map(function () { return "<i></i>"; }).join("");
  var bars = segs.querySelectorAll("i");
  var upd = function () {
    var y = window.scrollY + window.innerHeight * 0.5;
    scr.forEach(function (s, i) {
      var top = s.offsetTop, h = s.offsetHeight;
      bars[i].className = y >= top + h ? "done" : y >= top ? "now" : "";
      if (y >= top && y < top + h) bars[i].style.setProperty("--p", Math.round((y - top) / h * 100) + "%");
    });
  };
  window.addEventListener("scroll", upd, { passive: true }); upd();

  var toast = document.getElementById("toast");
  document.getElementById("share").onclick = function () {
    var data = { title: "Žižkova rozlučka", text: "Žižka se v poledne žení. A je pryč. Jdeme ho hledat?", url: location.origin + location.pathname.replace(/navrh-b\.html$/, "") };
    if (navigator.share) { navigator.share(data).catch(function () {}); return; }
    try { navigator.clipboard.writeText(data.url); toast.textContent = "Odkaz zkopírovaný. Pošlete ho partě."; }
    catch (e) { toast.textContent = data.url; }
    toast.classList.add("on"); setTimeout(function () { toast.classList.remove("on"); }, 2000);
  };
})();
