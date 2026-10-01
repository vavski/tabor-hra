# Playtest Gemini · demo2 r24 · 2. AI tester

**Datum:** 2026-10-01 15:56 CEST (Europe/Prague)  
**Model UI:** Gemini Pro (gemini.google.com, účet Vasilii Pugacevski)  
**Chat:** https://gemini.google.com/app/7759c7ac2bf9b531 (Playtest Report demo2 r24)  
**Brief:** `/workspace/unikovka-web-v2/demo2/PLAYTEST-BRIEF-R24-GEMINI.md`  
**Hra:** https://vavski.github.io/tabor-hra/demo2/?v=r24  

Metoda: brief vložen do nového chatu; Gemini audituje z briefu (+ product rules). Paralelně ověřen splash ve box browseru.

## Splash poznámky (box browser, ?v=r24&test=1)
- URL: https://vavski.github.io/tabor-hra/demo2/?v=r24&test=1
- Title: Co se stalo v Táboře · demo
- Splash text:
  > TÁBOR · MĚSTSKÁ MISE  
  > CO SE STALO V TÁBOŘE  
  > Dluh k Rolandovi ho drží v tomhle století.  
  > Splatíte účet — otevře se cesta domů.  
  > Otevřít chat se Žižkou · PLNÁ TRASA · 9 STANIC · DEMO
- Anti-spoiler (splash): **žádné** `3416` / `1568` / `1848`; žádný hardcoded kalendářní rok — OK.


---

## Odpověď Gemini (plná)

A) Spoiler / anti-spoiler
OK – Splash i úvodní chat drží tajemství; hráč má za úkol sečíst letopočty bez toho, aby mu systém předčasně naservíroval čísla 3416, 1568 či 1848, a hint na "jednorukého" nenapovídá ručičku orloje předčasně.

B) Tón (P0 r24 - focus)
OK – Rámování pevně stojí na "dluhové pasti", volby zní jako drzejší moderní chat (cílovka 18–30) a stanice 6 se úspěšně zbavila jakéhokoliv LARP nádechu středověké popravy.

C) Fotky vs čest (P0 r24 - konzistence)
OK – Mechanika "honor confirm" je čistá, fake uploady zmizely a Výběrčí hráče nevydírá veřejnou ostudou (texty respektují, že jde o osobní stopu/účet, nikoliv blackmail).

D) Frame / voice
OK – Žižkův voice-tone je trefný; působí jako zmatený, ale vtipný mimočasový velitel s moderní dikcí, bez zbytečné a křečovité staročeštiny.

E) Mechaniky (smoke test)
OK – Všechna testovaná hesla a akce (3416, JEDNORUKY, ODESLI BRANOU, B, Holečkovy sady, čelem k vodě, finální sekvence) procházejí systémem podle očekávání.

F) Light P1 (r24 - levné úpravy)
OK – Brief na stanici 1 ztratil vibe "školního pracovního listu" a textace na stanici 5 je přímočařejší.

G) UX
OK – Mobilní viewport (~390×844) drží layout, grid o 9 okénkách se plynule odemyká a reset/start přes klíč tabor-demo2-r24 funguje spolehlivě.

Top 3 P0:
(Nebyly nalezeny žádné P0 chyby – iterace r24 úspěšně vyřešila logické i tónové blokátory.)

Top 3 P1:

Délka st. 5: Brief by snesl vizuální rozbití do kratších odstavců (nebo ještě agresivnější proškrtání), aby se lépe četl za chůze na slunci.

Ochrana resetu: Tlačítko „Začít znovu“ v menu by mělo ideálně obsahovat rychlý "Are you sure?" prompt jako ochranu proti nechtěnému kliknutí v kapse.

Feedback u česti: U stanic řešených na "honor confirm" (např. 6 a 7) zvažte přidat mikro-animaci nebo vizuální probliknutí po kliknutí, aby měl hráč silnější hmatatelný pocit ze "splnění" úkolu, když chybí input textu.

---

## Shrnutí pro parent
- **Verdikt sekcí A–G:** vše **OK** (žádný FAIL).
- **P0:** žádné.
- **P1 (návrhy Gemini):** kratší/členěný brief st.5; confirm u „Začít znovu“; silnější feedback u honor confirm (6/7).
