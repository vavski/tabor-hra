/*
  BRÁNA DO HRY
  ============
  Režim bere z ../web/config.js (REZIM). V režimu "zdarma" pustí každého.
  V režimu "prodej" pustí jen toho, kdo přijde s klíčem v adrese: hra/?k=KLIC
  Tuhle adresu nastavte v platební bráně jako stránku po zaplacení
  (Stripe: Payment Link → After payment → Redirect → https://…/hra/?k=KLIC).
  Klíč si prohlížeč zapamatuje, takže hráč může hru zavřít a vrátit se.
  Když klíč unikne, vyměňte ho tady i v platební bráně.
*/
window.PRISTUP = {
  KLICE: ["rota-7f3k9q-2026"]
};
(function () {
  var K = window.KONFIG || {}, P = window.PRISTUP || {};
  if (K.REZIM !== "prodej") return;
  var k = new URLSearchParams(location.search).get("k"), ok = false;
  try {
    if (k && (P.KLICE || []).indexOf(k) >= 0) { localStorage.setItem("zr-klic", k); ok = true; history.replaceState(null, "", location.pathname); }
    else { ok = (P.KLICE || []).indexOf(localStorage.getItem("zr-klic")) >= 0; }
  } catch (e) { ok = !!k && (P.KLICE || []).indexOf(k) >= 0; }
  if (ok) return;
  document.addEventListener("DOMContentLoaded", function () {
    document.body.innerHTML = '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;font:17px/1.5 Inter,system-ui,sans-serif;background:#0B0D10;color:#F2E6D8">'
      + '<div style="max-width:420px"><div style="font:400 56px/1 \'Bebas Neue\',Impact,sans-serif;margin-bottom:12px">Žižkova <span style="color:#E85A2A">rozlučka</span></div>'
      + '<p style="margin-bottom:20px">Tahle adresa vede do hry, ale bez zaplaceného přístupu Generálka nikoho nepustí. Odkaz do hry dostanete hned po zaplacení.</p>'
      + '<a href="../" style="display:inline-block;background:#E85A2A;color:#fff;text-decoration:none;font-weight:800;padding:14px 24px;border-radius:12px">Koupit hru</a>'
      + '<p style="margin-top:18px;font-size:14px;color:#a6aeb8">Zaplatili jste a nejde to? Napište na ' + (K.CONTACT_EMAIL || "e-mail z webu") + '.</p></div></div>';
  });
})();
