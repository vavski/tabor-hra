/*
  NASTAVENÍ WEBU „ŽIŽKOVA ROZLUČKA“
  =================================
  Všechno, co se na webu mění, je tady. Nic jiného přepisovat nemusíte.
  Text pište mezi uvozovky "takhle". Datum ve tvaru "RRRR-MM-DD".
*/
window.KONFIG = {
  // Režim prodeje:
  //   "zdarma"  = tlačítko „Hrát zdarma“, hra se otevře rovnou, žádná platba
  //   "prodej"  = tlačítko „Koupit“, vede na platební odkaz (PAY_URL),
  //               po zaplacení platební brána pošle hráče rovnou do hry
  //   "brzy"    = hra ještě není venku, jen „Dejte nám vědět“ (e-mail)
  REZIM: "zdarma",

  // Cena v Kč (ukazuje se jen v režimu "prodej"). Jen číslo.
  PRICE: 249,
  // Poznámka pod cenou, např. "zaváděcí cena do 30. 11." Prázdné "" = nic.
  PRICE_NOTE: "",
  // Cena, ze které se slevuje (přeškrtnutá). 0 = neukazovat.
  PRICE_OLD: 0,

  // Platební odkaz (Stripe Payment Link, případně jiná brána). Musí začínat https://
  // Po zaplacení nastavte v bráně přesměrování na adresu hry s klíčem,
  // např. https://vavski.github.io/tabor-hra/hra/?k=KLIC  (viz NASAZENI.md)
  PAY_URL: "",

  // Den spuštění. Před ním je nahoře štítek „Hrajeme od …“, pak zmizí.
  LAUNCH_DATE: "2026-10-22",

  // Kontakt. E-mail je povinný (podmínky, dotazy, vrácení peněz).
  CONTACT_EMAIL: "pugacevskiv@gmail.com",
  // Instagram: jméno účtu bez zavináče, nebo celý odkaz. Prázdné "" = ikona se neukáže.
  INSTAGRAM: "",

  // Kde leží hra (cesta vůči hlavní stránce).
  GAME_URL: "hra/",

  // Provozovatel – povinné údaje na webu i v podmínkách (zákon o ochraně spotřebitele).
  SELLER_NAME: "Vasilii Pugacevski",
  SELLER_ICO: "24027031",
  SELLER_ADDRESS: "Nová 693, 391 11 Planá nad Lužnicí",
  // Plátce DPH? false = ceny jsou konečné, DPH se neúčtuje.
  SELLER_VAT: false,

  // Platnost zakoupeného přístupu v měsících (jen text v podmínkách a FAQ).
  VALIDITY_MONTHS: 12,

  // Žebříček. Zapisujte party, které poslaly kartu z konce hry. Prázdné [] = „zatím prázdný“.
  // Skóre a čas opište z karty. Příklad řádku: { rota: "Chrápající pětka", cas: "1 h 12 min", skore: 238 }
  ZEBRICEK: [],

  // Další díl (blok „Připravuje se“). Prázdné "" = text ze stránky.
  NEXT_TITLE: "",
  NEXT_TEXT: "",

  // Štítek nahoře v úvodu (když není nastavené datum spuštění v budoucnu).
  PILL: ""
};
