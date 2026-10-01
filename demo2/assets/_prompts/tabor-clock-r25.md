# Gemini prompt · Tábor Stará radnice clock (r25)

**Replace:** Prague Orloj lookalikes currently used as station-3 art.  
**Output files (parent / computerUse):** overwrite after generation + crop:

| Role | Path |
|------|------|
| Main (chat + unlock) | `assets/img/orloj-night.jpg` |
| Mobile crop | `assets/img/orloj-night-mobile.jpg` |
| Okénko thumb | `assets/img/orloj-night-thumb.jpg` |

**Do not burn Gemini from this agent** unless browser session is already signed in and trivial — prefer parent dispatching computerUse.

**Style lock:** `STYLE-BIBLE.md` + CANON face/costume from splash `assets/img/splash-r17.jpg` (Žižka may appear small in frame or omitted — clock is hero). Spider-Verse **film** look · NO anime · Tábor NOT Prague.

---

## Master prompt (copy-paste)

```
Spider-Verse film look (Into/Across the Spider-Verse cinematic comic): bold ink outlines, halftone dots, subtle chromatic aberration, night rim light, NOT anime, NOT photoreal.

Subject: the town-hall clock on Stará radnice (Old Town Hall) tower in Tábor, Czech Republic — night square, low angle looking UP at the tower clock face.

CRITICAL — this is the TÁBOR clock, NOT the Prague Astronomical Clock (Orloj):
- ONE single golden clock hand only (no second hand, no multiple ornate hands)
- Golden / brass circular dial
- Hour marks numbered 1 through 24 in a full 24-hour ring
- Number 24 at the TOP of the dial (not 12)
- No blue star map / astronomical shield
- No sun and moon pointer faces from Prague Orloj
- No calendar dial, no apostle doors, no Prague Orloj sculpture gallery
- Simple civic tower clock on a Gothic/Renaissance stone town-hall tower (Stará radnice, Tábor)

Scene: night on Žižkovo náměstí, Tábor. Warm sodium + cool cyan rim light. Stone tower, dark sky, comic-film grain and Ben-Day in shadows. Optional tiny silhouette of a one-eyed cloaked figure with a flanged mace far below (Žižka) — must not hide the dial. Czech small-town square, NOT Prague Old Town.

Camera: dramatic low-angle hero shot of the tower clock, dial clearly readable, 24 at top, single gold hand visible. Vertical or 4:5 framing for mobile chat.

Palette: ink black, stone grey, ember orange gold on dial, hussite teal night accents.
```

## Negative / reject if

- Blue astronomical dial, star map, Prague Orloj face
- Multiple hands / sun-moon pointers / zodiac ring as main face
- “12” at top as the primary noon mark (must read as **24h with 24 on top**)
- Anime eyes, soft Pixar, photoreal tourism photo, Miles Morales / Marvel logos
- Label text “Prague” / “Praha” / “Orloj” in image

## Reference notes for editor

- Real Tábor Stará radnice tower clock: 24-hour dial, single hand, 24 at top — match that silhouette.
- Keep filename `orloj-night*.jpg` for now (code refs) even though subject is Tábor clock; rename pass later if desired.
