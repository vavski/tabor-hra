# Frame zamčeno · demo2

**Datum:** user lock · r24 · P0 tón + fotky/čest (MOTIVE 2, anti-spoiler drží)

## Premisa · MOTIVE 2 — dluh-past
Jan Žižka uvízl v **současném Táboře (dnes)**, **protože** nezaplacený dluh k **Rolandovi** ho drží, dokud není splatných **3416**. Hráči pomáhají splatit — pak se otevře cesta domů.

**Není** amnézie. **Není** honička / chase. WHY = past dluhu.

**Zákaz roku:** v copy nikdy nehardcodovat kalendářní rok. Jen „dnes / tohle století / teď“.

## Páteř (r20)
1. U kašny: Rolandovy dva letopočty → součet **3416** = **částka pastí** (co Žižka dluží Rolandovi).
2. Trasa: sehnat / vydělat tu částku (klíče k truhle s vyrovnáním 3416).
3. Finále: truhla splatí Rolandovi → past praskne → otevře se **brána / cesta domů**.

## Co platí
- Místa jsou **reálná dnes** (kašna, Škoch, orloj, Bechyňská, Mariánská, Tržní, Jordán, podzemí…).
- Žižka píše v chatu: **moderní čeština** (všichni rozumí), lehký slang OK, **žádná staročeskina**; zmatený mimočasový velitel, vtipný + drzejší; vtipy o střetu století OK.
- Velitelství = **moderní cheeky slang + dluh-past** (volba *Proč zrovna my?* / st.6 muster). **Ne** středověká poprava LARP.
- 9 okének = stopa k truhle / platbě → po 9. splatit 3416 → **brána / cesta domů**.

## Co NENÍ hlavní premisa
- Amnézie („nevím, co se stalo / kde jsem“).
- Honička / hunt bez důvodu.
- Hangover / „byla to **vaše** noc“ / kocovinové krytí party / 38 piv jako důvod, proč je tu.
- Cizí plášť jako hlavní zápletka.
- Spánek u kašny („vzbuďte se“), když art ukazuje stojícího Žižku.
- „Tábor dluží Táboru“ — dluží **Žižka Rolandovi**.
- Finále není jen „prázdná truhla / smazané fotky“, ale **splatit dluh → past praskne → brána domů**.
- Hardcoded kalendářní rok v UI textu.

## Mechaniky beze změny
Trasa a hádanky: kašna **3416**, nůžky **JEDNORUKÝ**, orloj Caesar, stanice 4–9 (sort finále). Měnit text kolem páteře dluh→platba→domů — ne mechaniku.

## Link st2→st3 (r21)
Po odpovědi **JEDNORUKÝ** jen **hádanka/nudge**: hledejte něco jednorukýho poblíž — hráči objeví orloj sami. **Nespoilerovat** jednu ručičku dřív, než dorazí. Caesar slider + ODESLI BRANOU až u orloje.

## Anti-spoiler (r22)
**3416** (a součet letopočtů) se **nesmí** objevit ve splash / úvodním chatu / briefingu před úkolem st1.
Hráči ví jen: najít **dva letopočty** a **sečíst**. Číslo až **po vyřešení** st1, nebo jen ve validaci/`answers`.

## Build
`KEY=tabor-demo2-r24` · query `?v=r24`

## Production pass (r23)
Checklist: no 3416 in splash/intro; debt-trap coherent; JEDNORUKÝ nudge without ručička spoiler; no calendar year in UI; stations 1–9 playable; mobile viewport OK.
Payments/legal = OUT OF SCOPE (no fake Stripe).

## Tone + fotky (r24)
- Intro quick + st.6: žádná „poprava“ — cheeky velitelství v dluh-past frame (přičíst k účtu / směna).
- Výběrčí: **ne** blackmail kamerou („celej Tábor se dívá“). Mild pressure = stopa/účet. Honor-confirm úkoly (t3w/t6/t7/t9s) zůstávají bez fake uploadu.
- P1: kratší t5 brief; měkčí t1 wording (míň worksheet).

## Visual CANON (r18 assets)
- Reference hero/splash: `assets/img/splash-r17.jpg` (Žižka surprised/standing at fountain / modern Tábor square).
- Style bible: `STYLE-BIBLE.md` (+ `/workspace/styly/spider-verse-style/STYLE-BIBLE.md`) §13.
- Voice: confused out-of-time commander, funny + cheeky; modern Czech; light slang OK; **NO** archaic/staročeská; century-clash jokes OK. Velitelství = debt slang, **ne** poprava LARP.
