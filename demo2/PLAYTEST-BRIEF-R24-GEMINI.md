# Playtest brief · demo2 r24 · pro Gemini (2. AI tester)

**URL:** https://vavski.github.io/tabor-hra/demo2/?v=r24  
**Alternativa (rychlý replay):** přidej `&test=1` → `?v=r24&test=1` (zkrátí animace).  
**KEY:** `tabor-demo2-r24` (localStorage — po r23 je čistý start automaticky).  
**Cíl:** projít **celou trasu 9 stanic** a zapsat nálezy (P0/P1), ne přepisovat kód.

---

## Premisa (kontrola)
- **Dluh-past:** Žižka dluží **Rolandovi**; dokud není splatných **3416**, drží ho dnešní Tábor.
- **Není** amnézie, **není** honička/chase, **není** hangover / „vaše noc“.
- Finále = splatit → past praskne → **brána / cesta domů**.

---

## Co máš otestovat

### A) Spoiler / anti-spoiler
1. Splash + úvodní chat **před** úkolem st.1: **nesmí** obsahovat `3416`, `1568`, `1848`.
2. Brief st.1: hráč ví jen „dva letopočty → sečti“; číslo až **po** vyřešení.
3. Po st.2 (JEDNORUKÝ): nudge „hledej něco jednorukýho“ — **nesmí** spoilovat „jednu ručičku“ orloje dřív, než hráč dorazí / klikne „Našli jsme…“.
4. UI text: **žádný hardcoded kalendářní rok** (2024/2025/2026…) — jen „dnes / tohle století“.

### B) Tón (P0 r24 — focus)
1. Volba **„Proč zrovna my?“** (intro): moderní cheeky slang v **dluh** frame. **Žádná** středověká poprava / LARP katovny.
2. **St.6** (po svatozáři, výběrčí + Žižkův muster): velitelství = směna / přičtení k účtu. Ne „poprava“.
3. Cílová group: **18–30** — má to znít jako drzejší chat, ne historická inscenace.

### C) Fotky vs čest (P0 r24 — konzistence)
1. Výběrčí **nesmí** vydírat „fotky vyvěsím / celej Tábor se dívá“. Mild pressure = stopa / účet.
2. Úkoly t3w / t6 / t7 / t9s = **honor confirm** (žádný fake upload kamery) — text to má respektovat (foťte si, potvrďte na čest).
3. St.8: „bral stopu / úhel“, ne „tajně vás fotil na blackmail“.
4. Finále: ne „smazal jsem vaše kompromitující fotky“ — spíš účet/stopa vyrovnaná; selfie KUMPÁNI je dobrovolná čest.

### D) Frame / voice
- Moderní čeština, lehký slang OK, **žádná staročeskina**.
- Žižka = zmatený mimočasový velitel, vtipný + drzejší; century-clash jokes OK.
- WHY = past dluhu (Roland), ne chase.

### E) Mechaniky (smoke, beze změny očekávaných řešení)
| St | Očekávání |
|----|-----------|
| 1 | 1568+1848 → **3416** |
| 2 | mřížka nůžky → **JEDNORUKY** |
| 3 | Caesar / wheel → **ODESLI BRANOU** (klíč 24) |
| 4 | náčrt **B** (dvě štěrbiny) |
| 5 | **Holečkovy sady** |
| 6–7, 9s | honor |
| 8 | **čelem k vodě** |
| 9 | sort: nůžky→orloj→brána→schody→okno→pítko→hráz |

### F) Light P1 (r24 — levné úpravy)
- Brief st.5 kratší? Čitelný?
- St.1 wording míň „pracovní list“?

### G) UX
- Mobile viewport (~390×844), splash → chat, 9 okének se odemyká, menu „Začít znovu“ funguje.

---

## Formát výstupu (stručně, česky)
Pro každou sekci A–G: **OK / FAIL** + 1 věta důkaz (citace UI, pokud FAIL).  
Na konci: top 3 P0 (pokud jsou) a top 3 P1. **Nespoluj** řešení hráčům v reportu mimo checklist výše.
