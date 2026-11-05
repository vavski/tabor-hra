/*
  BRÁNA DO HRY
  ============
  Režim bere z ../web/config.js (REZIM). V režimu "zdarma" pustí každého.
  V režimu "prodej" pustí jen toho, kdo přijde s klíčem v adrese: hra/?k=KLIC
  Tuhle adresu nastavte v platební bráně jako stránku po zaplacení
  (Stripe: Payment Link → After payment → Redirect → https://…/hra/?k=KLIC)
  a stejný odkaz dejte do textu faktury (Invoice template → Default memo).
  Klíč si prohlížeč zapamatuje, takže hráč může hru zavřít a vrátit se.

  Klíč tu NENÍ napsaný, jen jeho otisk (SHA-256), ať ho nikdo nevyčte z kódu webu.
  Nový klíč: vymyslet, spočítat otisk  py -c "import hashlib;print(hashlib.sha256(b'KLIC').hexdigest())"
  a přidat ho do OTISKY. Starý otisk smazat až ve chvíli, kdy jeho klíč nemá žádný zákazník s platným přístupem.
*/
window.PRISTUP = {
  OTISKY: [
    "daa8d67a9c676e21ce3bd57e42d7ca4ea1de11b781238bcbc876b72b2ec40f16", // klíč do 5. 11. 2026 (byl čitelný v kódu)
    "d6803e59dacfee81e294b2b8378623966ea07a3ba617058bd3b39edfc8e886da"  // klíč od 5. 11. 2026
  ]
};
(function () {
  var K = window.KONFIG || {}, P = window.PRISTUP || {};
  if (K.REZIM !== "prodej") return;

  // SHA-256 bez čekání (crypto.subtle je asynchronní a hra by se mezitím rozběhla)
  function sha256(s) {
    var b = unescape(encodeURIComponent(s)), n = b.length, w = [], i, j;
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    var Kc = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
    for (i = 0; i < n; i++) w[i >> 2] |= (b.charCodeAt(i) & 255) << (24 - (i % 4) * 8);
    w[n >> 2] |= 0x80 << (24 - (n % 4) * 8);
    var L = ((n + 8) >> 6 << 4) + 15; w[L] = n * 8;
    for (i = 0; i <= L; i++) w[i] = w[i] | 0;
    var r = function (x, c) { return (x >>> c) | (x << (32 - c)); };
    for (i = 0; i < L; i += 16) {
      var m = w.slice(i, i + 16), a = H.slice();
      for (j = 0; j < 64; j++) {
        if (j >= 16) m[j] = (r(m[j - 2], 17) ^ r(m[j - 2], 19) ^ (m[j - 2] >>> 10)) + m[j - 7] + (r(m[j - 15], 7) ^ r(m[j - 15], 18) ^ (m[j - 15] >>> 3)) + m[j - 16] | 0;
        var t1 = a[7] + (r(a[4], 6) ^ r(a[4], 11) ^ r(a[4], 25)) + ((a[4] & a[5]) ^ (~a[4] & a[6])) + Kc[j] + m[j] | 0;
        var t2 = (r(a[0], 2) ^ r(a[0], 13) ^ r(a[0], 22)) + ((a[0] & a[1]) ^ (a[0] & a[2]) ^ (a[1] & a[2])) | 0;
        a = [t1 + t2 | 0, a[0], a[1], a[2], a[3] + t1 | 0, a[4], a[5], a[6]];
      }
      for (j = 0; j < 8; j++) H[j] = H[j] + a[j] | 0;
    }
    return H.map(function (x) { return ("0000000" + (x >>> 0).toString(16)).slice(-8); }).join("");
  }
  var platny = function (x) { return !!x && (P.OTISKY || []).indexOf(sha256(x)) >= 0; };

  var k = new URLSearchParams(location.search).get("k"), ok = false;
  try {
    if (platny(k)) { localStorage.setItem("zr-klic", k); ok = true; history.replaceState(null, "", location.pathname); }
    else { ok = platny(localStorage.getItem("zr-klic")); }
  } catch (e) { ok = platny(k); }
  if (ok) return;
  document.addEventListener("DOMContentLoaded", function () {
    document.body.innerHTML = '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;font:17px/1.5 Inter,system-ui,sans-serif;background:#0B0D10;color:#F2E6D8">'
      + '<div style="max-width:420px"><div style="font:400 56px/1 \'Bebas Neue\',Impact,sans-serif;margin-bottom:12px">Žižkova <span style="color:#E85A2A">rozlučka</span></div>'
      + '<p style="margin-bottom:20px">Tahle adresa vede do hry, ale bez zaplaceného přístupu Generálka nikoho nepustí. Odkaz do hry dostanete hned po zaplacení a přijde vám i e-mailem.</p>'
      + '<a href="../" style="display:inline-block;background:#E85A2A;color:#fff;text-decoration:none;font-weight:800;padding:14px 24px;border-radius:12px">Koupit hru</a>'
      + '<p style="margin-top:18px;font-size:14px;color:#a6aeb8">Zaplatili jste a nejde to? Napište na ' + (K.CONTACT_EMAIL || "e-mail z webu") + '.</p></div></div>';
  });
})();
