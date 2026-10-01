# Style bible — „Spider-Verse film look“ (bez postavy)

**Účel:** Jediný vizuální zákon pro Únikovku / Žižka Offline. Platí pro maskota, UI dekorace, splash, stanice, pictogramy, marketing — všechno, co má vypadat „jako ze světa hry“.

**Záměrně NE pojmenovávat ve veřejném marketingu** „Miles Morales“ / „Spider-Verse“ / Marvel / Sony (viz LEGAL). Interně tomu říkáme: **„Tábor comic-film“** nebo **SV-film look**.

**Referenční cíl:** animované filmy *Spider-Man: Into the Spider-Verse* (2018) a *Across the Spider-Verse* (2023) — **filmová** komiksová animace, ne klasický flat Marvel panel a ne japonské anime.

---

## 1. Co to je (jednou větou)

Pohyblivý **tištěný komiks natočený jako film**: silná linka, rastrové tečky, tiskové chyby a barevné „glitche“, ale s filmovým světlem, hloubkou ostrosti a emocí v gestu.

---

## 2. Proč to tak vypadá (logika stylu)

| Princip | Proč | Co z toho plyne pro nás |
|--------|------|-------------------------|
| **Komiks = tisk** | Svět je „vytištěný“ | Ben-Day / halftone tečky v stínech a plochách; viditelný rastr |
| **Film = kamera** | Není to statický plakát | Dramatické světlo z boku, rim light, bokeh, mírná hloubka ostrosti |
| **Chyba tisku = energie** | Chromatic aberration, offset CMYK | Cyan/magenta okraje siluet, lehké misregistration |
| **Linka = charakter** | Silueta musí jít přečíst i v malém avataru | Silná černá linka různé tloušťky; žádný „měkký AI blur“ |
| **Barva = nálada** | Neon vs. šedá = město v noci / drama | Omezená paleta + 1–2 „neon“ akcenty; ne duhový chaos |
| **Dospělý tón** | Cíl 18–30 | Drsnější textury, méně „cute“, žádné velké dětské oči |

---

## 3. Co to NENÍ (zakázané odchylky)

- **Anime / manga** (lesklé oči, speed lines à la shonen, pastelové tváře)
- **Klasický US superhero comic flat** bez filmového světla (jen rovné barvy + speech bubble vibe)
- **Photoreal / Unreal Engine** (porézní kůže, raytrace)
- **3D Pixar / Disney** měkký plast
- **Chibi / cute / Party Box maskot**
- **Valorant cel-shade agent splash** (to je jiný souboj — nepoužívat)
- **Pixel art** (samostatný směr — ne míchat)
- Kopírování **konkrétního kostýmu Spider-Mana**, log, pavučinových symbolů, „Spider-Verse“ logotypu

---

## 4. Linka a kresba

1. **Outline:** výrazná černá (nebo velmi tmavá) linka; silnější na vnějším obrysu, tenčí uvnitř (vlasy, záhyby pláště).
2. **Silueta first:** postava musí jít poznat jako černá skvrna na světle (plášť, pásek přes oko, palcát).
3. **Tvář:** dospělé proporce; oči menší než u anime; výrazy čitelné na 64×64 avataru.
4. **Textura v ploše:** ne hladký vektor — jemný grain / ink wash / paper noise pod barvou.
5. **Žádný „AI mush“:** ostré hrany linky; žádné rozmazané prsty / roztavené šperky.

---

## 5. Tečky, rastr, glitch (signatury stylu)

Používej **vždy aspoň 2 z 4**:

1. **Halftone / Ben-Day** — tečky v polostínech (tvář, plášť, nebe).
2. **Chromatic aberration** — cyan/magenta fringe na jedné straně siluety (lehce, ne disco).
3. **Misregistration** — mírný posun barevné vrstvy (jako špatný tisk).
4. **Speed / radial energy** — jen když scéna má akci; ne na klidný portrait.

**Míra:** 20–40 % intenzity. Přegenerované „glitch soup“ = fail.

---

## 6. Světlo a barva

### Světlo
- Preferuj **split light** (chladná strana + teplá strana) — typicky cyan/teal vs. magenta/oranž.
- **Rim light** na okraji pláště / helmy.
- Pozadí často tmavší než postava (postava „vyskakuje“).

### Paleta Únikovky (zamčená pro tento styl)
| Role | Hex (orientačně) | Použití |
|------|------------------|---------|
| Ink black | `#0B0D10` | linka, pozadí |
| Stone grey | `#2A2E35` | šaty, stín |
| Hussite teal | `#1FA8A0` | neon akcent, UI, glitch cyan |
| Ember orange | `#E85A2A` | druhý akcent, CTA, oheň |
| Paper cream | `#F2E6D8` | světlé plochy, „tiskový“ papír |
| Magenta fringe | ``#D94B8A` | chromatic edge (sparingly) |

**Pravidlo:** 1 dominantní neutrál + max 2 akcenty v jednom obrázku.

---

## 7. Kompozice a formáty

| Formát | Použití | Pravidla |
|--------|---------|----------|
| **Full body** | splash, stanice, marketing | celá silueta + prostor kolem; prop (palcát) čitelný |
| **Bust / head** | chat avatar, UI | oči + pásek přes oko dominantní; méně glitche |
| **Environment** | splash města | stejný rastr + neon map lines OK; lokalita = **Tábor**, ne Praha |
| **Pictogram / UI** | návody | zjednodušená silueta + tlustá linka; halftone volitelný |

**Pozadí default:** solid dark charcoal NEBO noční městská hloubka s bokeh — vždy podřízená postavě.

---

## 8. Pohyb a „filmovost“ (i u stills)

I u statického JPG naznač:
- lehký motion blur jen na okraji pláště / vlající látky,
- kamerový úhel mírně low-angle u hrdiny,
- žádné statické „papírové figurky bez váhy“.

---

## 9. Konzistence napříč sérií (character-system craft)

Jako u Parťáčka — **1 styl × N situací**:

1. Zamkni **tvar hlavy, pásek přes oko, palcát, plášť**.
2. Měň jen: gesto, výraz, oblečení vrstvy, den/noc.
3. Stejná paleta a stejná „dávka“ halftone/glitch na všech assetech.
4. Character sheet: front / 3/4 / side hlava + 2–3 full body pózy před masovou produkcí.

---

## 10. Prompt kit (EN, pro Gemini / generátory)

**Style lock (vlož na začátek každého promptu):**
```
Spider-Verse cinematic animated film aesthetic (Into/Across the Spider-Verse look): bold ink outlines of varying weight, Ben-Day halftone dots in shadows, subtle chromatic aberration cyan/magenta fringe, comic-film lighting with teal and orange split light, textured print grain, adult tone, NOT anime, NOT photoreal, NOT Pixar, NOT classic flat Marvel panel, dark charcoal or night bokeh background, no logos, no text, no watermarks
```

**Negatives (když model umí):**
```
anime, manga, chibi, kawaii, photoreal, Unreal Engine, Pixar, soft blur, Spider-Man costume, Marvel logo, Sony logo, Prague skyline
```

---

## 11. QA checklist před schválením assetu

- [ ] Vypadá to jako **film-komiks**, ne anime ani photo?
- [ ] Jsou vidět **halftone** a/nebo **chromatic fringe** (kontrolovaně)?
- [ ] Silueta čitelná bez barev?
- [ ] Max 2 akcentové barvy + neutrál?
- [ ] Žádné cizí IP (pavouk, logo, občanská Praha místo Tábora)?
- [ ] Dospělý tón 18–30?
- [ ] Stejná „dávka“ stylu jako u už schválených assetů?

---

## 12. Pojmenování v projektu

- Složka: `/workspace/styly/spider-verse-style/`
- Interní kód stylu: **`SV-FILM`**
- Veřejný popis: „comic-film / noční komiksový film“ — ne „Miles“ směrem k zákazníkům.

---

*Zámek stylu: 2026-09-30 — směr vybrán po souboji Valorant / Miles film / pixel. Obsah postavy (kostým) se řeší zvlášť: historický husitský look, ne moderní kožená bunda.*


---

## 13. Žižka visual CANON (r18 lock · 2026-10-01)

**User lock:** fountain surprise splash „vypadá úplně dokonale“ — same face / costume / style EVERYWHERE.

### Canonical reference file (hero / splash fountain shot)
| Role | Path |
|------|------|
| **PRIMARY CANON** | `/workspace/unikovka-web-v2/demo2/assets/img/splash-r17.jpg` |
| Live alias (same bytes / crop) | `splash-mobile.jpg`, report `demo2/_r17-report/01-splash.jpg` |
| Secondary (street confused, same face) | `zizka-hero.jpg` / `zizka-hero-mobile.jpg` |
| Chat bust | `zizka-avatar.jpg`, `zizka-portrait-r17.jpg` |
| Phone stare beat | `zizka-phone-r17.jpg` |

### Face / costume lock (describe in every Gemini prompt)
- Age **~30–34**, adult proportions (NOT anime eyes)
- Short messy **brown** hair; short groomed brown beard/stubble
- **Black circular eyepatch on RIGHT eye** (viewer’s left); thin strap across forehead
- Heavy **olive-green hooded cloak** (hood down), metal clasp
- Grey **chainmail** at collar/chest over tan/beige tunic; leather belt + pouch
- **Flanged metal mace** in hand when full-body
- Expression: surprised / bewildered at fountain; cheeky smirk OK in chat portrait
- Setting contrast: **modern Tábor 2026** (neon shop signs, phones, cars) — **NOT Prague**, NOT pure medieval square

### Prompt add-on (after style lock from §10)
```
SAME character as the attached reference: Jan Žižka ~30-34, short messy brown hair, short brown beard, black eyepatch RIGHT eye, olive-green cloak, chainmail, tan tunic, flanged mace. Exact same face and costume. Location: Tábor Czech Republic historic square / streets at night with modern neon (KAVÁRNA, POTRAVINY), smartphones, cars — NOT Prague. Match Spider-Verse film comic look of the reference image exactly.
```

### Forbidden leftovers
- Anime / big eyes / soft pastel faces
- Photoreal medieval-only scenes without modern clash
- Prague skyline / Charles Bridge stand-ins
- Old elderly Žižka / grey beard

*Character lock appended for demo2 r18 full build.*
