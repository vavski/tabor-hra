# R25 / R25b · Mid-route notes

**Source of truth:** `/workspace/unikovka-web-v2/demo2/`  
**KEY:** `tabor-demo2-r25b` · cache `?v=r25b`  
**Deploy:** NOT yet (parent after clock assets if needed).

## Decision: Option A — IMPLEMENTED (r25b)

Skip Bechyňská / Klokotská / Kotnov / rozcestník. Mid-route stays on / next to Žižkovo náměstí.

### Kill list (removed from SCRIPT/TASKS)

| Old | Why |
|-----|-----|
| `t3w` věž v dlani | honor palm photo, unverifiable |
| `t4` náčrty brány A/B/C | worksheet, long walk tax |
| `t5` rozcestník šipky | stupid exclusion choice |

### New mid-route puzzles

| # | Place | Task | Mechanic | Answer |
|---|-------|------|----------|--------|
| 4 | Stará radnice · hlavní portál | `t4` Šablona portálu | `grid` + `overlay:"portal"` (2 svislé průzory, znak nahoře) | **KLICEM** |
| 5 | Ulička u radnice · kovaná konzola | `t5` Útržek + konzola | `word` split-clue: receipt `PL···A` + 3 glyphs on square-facing konzola | **PLATBA** |

Cipher st3 still `MBCQJG ZPYLMS` → **ODESLIBRANOU** (key 24). „Branou“ = radniční portál, ne Bechyňská.

### Station list 1–9 (r25b)

1. **Kašna** — word `3416` (`t1`)
2. **Škoch / nůžky** — grid `JEDNORUKY` (`t2`)
3. **Radniční hodiny** — wheel Caesar `ODESLIBRANOU` (`t3`) · art file still `orloj-night.jpg` (Tábor clock when Gemini ready); captions say radniční hodiny / Tábor, never Prague
4. **Radniční portál** — grid portal template `KLICEM` (`t4`) · art `portal-night.svg` (placeholder)
5. **Konzola v uličce** — word split `PLATBA` (`t5`) · art `ulicka-night.svg` (placeholder)
6. **Mariánská brána** — honor svatozář (`t6`) · nav from square via kostel (~4 min), **not** via Klokotská/rozcestník
7. **Tržní pítko** — honor + fallback věž (`t7`/`t7b`) · path Převrátilská → Dlouhá
8. **Hráz Jordánu** — choice úhel (`t8`)
9. **Truhla / podzemí** — sort new order + selfie (`t9`/`t9s`)

**Finale sort order:** nuzky → orloj → portal → platba → vaza → pitko → hraz

### Geography sketch

```
Žižkovo náměstí: 1 kašna → 2 Škoch → 3 hodiny → 4 portál → 5 ulička/konzola
    ↓ ~4 min (kolem kostela)
Mariánská (6) → zpět / Převrátilská+Dlouhá → Tržní (7) → hráz (8) → zpět radnice/podzemí (9)
```

No downhill to Kotnov.

### Still open

- Replace `orloj-night.jpg` (+ mobile/thumb) with real Tábor clock via `assets/_prompts/tabor-clock-r25.md`
- Optional: replace portal/ulicka SVG placeholders with Gemini night stills
- Optional: upgrade `t6` honor → verifiable fragment match (follow-up)
