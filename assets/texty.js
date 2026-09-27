/* GENEROVÁNO z _src/texty.py (python3 _src/build.py). Needitovat ručně. */
window.TEXTY={
 "meta": {
  "title": "CO SE STALO V TÁBOŘE",
  "tagline": "Ráno po. Žižka nemá palcát. Vy nemáte paměť.",
  "intro": "Venkovní hra po Táboře pro 1–6 lidí. Asi 90 minut a 2,5 km, jeden mobil stačí. Start je u kašny s rytířem uprostřed Žižkova náměstí.",
  "rules": "Jak se hraje: Žižka vám píše do chatu a vede vás po stanicích. Na každé stanici je úkol a vyřešíte ho tím, co vidíte kolem sebe. Když se zaseknete, jsou tu 3 nápovědy (stojí body, ne nervy). Některé úkoly se potvrzují na čest, takže nepodvádějte, Žižka to pozná. Hra si pamatuje postup, i když zavřete prohlížeč. Na Tržním náměstí je pauza a stopky stojí. Choďte po chodníku a vnímejte auta, fotky z noci počkají.",
  "names_label": "Kdo byl včera v noci s Žižkou? (jména hráčů)",
  "team_label": "Jméno party (nepovinné)",
  "rozlucka_label": "Je to rozlučka? Vyberte oslavence a průšvihy padnou na něj.",
  "start_btn": "Probudit se ▸"
 },
 "voices": {
  "1": {
   "where": "St. 1 · start u kašny, první zpráva hry",
   "text": "…au. Proč spím u kašny? A čí je tohle plášť? Lidi? Jste tu? Potřebuju pomoct. Za devadesát minut mám nástup a nemám palcát.",
   "tone": "Rozespalý, chraplavý, zmatený, ale ne ztrhaný. Pauzy po „au“ a „Lidi?“. Konec naléhavější. Nahrávat venku u kašny, ať je slyšet voda.",
   "sec": 12
  },
  "2": {
   "where": "Cestou z Bechyňské brány nahoru po schodech (před st. 5)",
   "text": "Tudy jsme šli zpátky. Pamatuju si schody, hodně schodů. A že jsem někoho nesl. Na zádech. Nevím, kdo koho nesl… asi já tebe.",
   "tone": "Funění, jako by šel do schodů. Nostalgicky pobavený. „asi já tebe“ tiše a rychle, jako že se přeřekl. Je to stopa k zvratu, nezdůrazňovat.",
   "sec": 14
  },
  "3": {
   "where": "St. 5 · pod oknem růžového domu (Převrátilská 41)",
   "text": "(zpívá falešně a nahlas) Ktož jsú boží bojovníci a zákona jeho… (šplouchnutí vody) …no jo. Dobře. Pochopil jsem.",
   "tone": "Zpěv schválně falešný a hlasitý, pak šplouchnutí (kbelík vody, klidně do umyvadla) a suchý, ublížený dovětek.",
   "sec": 10
  },
  "4": {
   "where": "St. 6 · Mariánská brána, ZVRAT hned po zprávě krčmáře",
   "text": "Dobře. Přiznám se. Vy jste si fakt mysleli, že jsem to byl já? Do prdele, lidi. Já měl dvě piva a celou noc jsem vás hlídal. Zbylejch třicet šest je vašich.",
   "tone": "Zlom. Začít tiše a unaveně, pak se nadechnout a vybuchnout (ale se smíchem, ne naštvaně). „Do prdele, lidi“ je vrchol. Poslední věta zase klidně, skoro něžně. Sprosté slovo 1/2.",
   "sec": 18
  },
  "5": {
   "where": "St. 8 · hráz Jordánu, po nalezení úhlu",
   "text": "Ryby? Ani hovno. Chytili jste akorát rýmu. A jednu tenisku. Vaši.",
   "tone": "Suchý humor, pauza před „Ani hovno“ a před „Vaši“. Na pozadí šum vody. Sprosté slovo 2/2.",
   "sec": 8
  },
  "6": {
   "where": "St. 9 · finále, prázdná truhla",
   "text": "Prázdná, co? Fotky jsem smazal já. Ráno, než jste se probudili. A účet jsem zaplatil palcátem. Proto ho nemám. Co se stalo v Táboře, zůstává v Táboře.",
   "tone": "Spokojený, skoro dojatý kámoš. Krátká pauza po „Prázdná, co?“. Poslední větu pomaleji, jako motto.",
   "sec": 16
  },
  "7": {
   "where": "Úplný konec, po selfie",
   "text": "A příště platíte vy.",
   "tone": "Se smíchem, mrknutí v hlase. Pak klidně ještě zvuk otevírané lahve.",
   "sec": 3
  }
 },
 "stations": [
  {
   "id": "s1",
   "n": 1,
   "place": "Kašna s rytířem",
   "sub": "střed Žižkova náměstí",
   "nav": "Stoupněte si ke kamenné kašně s rytířem uprostřed Žižkova náměstí. Socha Žižky stojí kousek od ní u kostela s vysokou věží.",
   "img": "kasna-2c51.jpg",
   "intro": [
    {
     "k": "v",
     "t": 1
    },
    {
     "k": "z",
     "t": "Dobrý ráno. Teda… ráno."
    },
    {
     "k": "z",
     "t": "Mám účet na 38 piv a na ruce napsaný jména: {JMENA}. 🔎"
    },
    {
     "k": "z",
     "t": "Takže jste tam byli. Super. Pomůžete mi zjistit, co jsem v noci provedl."
    },
    {
     "k": "z",
     "t": "První věc: mám pocit, že jsem tady na kašně něco vylomil. Najděte to dřív, než si toho všimne ten rytíř nahoře."
    }
   ],
   "steps": [
    {
     "type": "pick",
     "title": "Záplata v kašně",
     "text": "Obejděte kašnu a prohlédněte kamenný okraj, na který si lidi sedají. Někde je kus, který tam „nepatří“: jiný kámen, vsazený jako záplata. Která fotka je to místo?",
     "options": [
      {
       "img": "zaplata-fake1.jpg",
       "label": "A"
      },
      {
       "img": "zaplata-ok.jpg",
       "label": "B"
      },
      {
       "img": "zaplata-fake2.jpg",
       "label": "C"
      }
     ],
     "correct": 1,
     "placeholder": "Detaily okraje jsou výřezy z fotky 2c51 (25. 9.). Před ostrým provozem nafotit 3 ostré detaily na místě [NA MÍSTĚ].",
     "ok": [
      {
       "k": "z",
       "t": "Jo. Tohle. To jsem byl… asi já. Rytíř nic neviděl, je z kamene."
      }
     ],
     "bad": [
      "Tohle je normální kašna. Hledejte kus, co vypadá jako záplata.",
      "Ne, tohle drží. Ještě jednou kolem dokola."
     ],
     "extra": "📸 Bonus: vyfoťte se se záplatou jako s obětí zločinu."
    },
    {
     "type": "photo",
     "title": "Póza jako socha",
     "text": "Ten bronzovej chlap u kostela má u nohy pařez a v ruce palcát. Frajer. Postavte se všichni jako on: jedna noha na „pařezu“ (obrubník, taška, kamarád), mobil místo palcátu, pohled přísný. Vyfoťte to.",
     "confirm": "Stojíme jako socha ✓",
     "ok": [
      {
       "k": "z",
       "t": "Takže palcát existuje. Jen ho má on, ne já."
      },
      {
       "k": "z",
       "t": "Našel jsem v mobilu noční fotku toho pařezu. V rohu je kus tenisky. To je moje bota. Určitě. 🔎"
      },
      {
       "k": "s",
       "t": "📷 noční fotka: pařez, v rohu bílá teniska [placeholder]"
      }
     ]
    }
   ],
   "hints": [
    "Neřešte vodu ani sochy. Dívejte se na kamenný lem, na který si lidi sedají.",
    "Hledejte kámen, který je hranatější, hladší nebo jinak barevný než zbytek okraje.",
    "Je to fotka B. Na živo je záplata na stejné straně jako na fotce kašny (zvětšete si ji)."
   ],
   "win": [
    {
     "k": "z",
     "t": "A ten rytíř nahoře je kopie. Originál spí v depozitáři. Jako bych měl spát já."
    }
   ],
   "fact": "Rytíř na kašně je Roland, znak toho, že si město samo vládne a soudí. Dnešní socha je kopie, originál je v muzejním depozitáři.",
   "next": {
    "title": "Restaurace Škochův dům",
    "text": "Od kašny se otočte k radniční věži s hodinami. Hned vedle ní, v rohu náměstí, je restaurace Škochův dům: nejzdobnější fasáda na náměstí, nahoře se kroutí kamenné vlnovky jak šlehačka na dortu. 1 minuta.",
    "img": "skoch-fasada.jpg",
    "min": 1
   }
  },
  {
   "id": "s2",
   "n": 2,
   "place": "Škochův dům",
   "sub": "roh náměstí vedle radniční věže",
   "nav": "Restaurace Škochův dům, hned vedle radniční věže. Nůžky jsou namalované na fasádě pod druhým oknem v prvním patře.",
   "img": "skoch-fasada.jpg",
   "intro": [
    {
     "k": "z",
     "t": "Tenhle plášť mi je nějak malej. 🔎 A chybí mu rukáv."
    },
    {
     "k": "z",
     "t": "Pamatuju si jen nůžky. Obří nůžky."
    },
    {
     "k": "z",
     "t": "Někde tady visej. Najděte je a přiložte na tu mřížku, co mám na účtence."
    }
   ],
   "steps": [
    {
     "type": "grid",
     "title": "Nůžky na mřížce",
     "text": "Najděte na fasádě nůžky. Nastavte na mřížce, kde mají nůžky očka (tak, jak visí na zdi). Pak čtěte písmena po čepelích od oček ke hrotům: nejdřív levou čepel, pak pravou. Písmeno uprostřed, kde se čepele kříží, jen jednou. Tip: zapněte kameru a mřížku si položte přímo přes fasádu.",
     "grid": [
      "JTAMR",
      "BESUL",
      "PHDIA",
      "VKZNC",
      "YSLEO"
     ],
     "answers": [
      "JEDNORUKY"
     ],
     "near": {
      "JEDNO": "Tohle je jen jedna čepel. Nůžky mají dvě.",
      "RUKY": "Druhá čepel sedí. Kde je první?",
      "RUDKY": "Prostřední písmeno čtěte jen jednou."
     },
     "ok": [
      {
       "k": "z",
       "t": "Jednorukej. Jasně! Sázka s krejčím: kdo prohraje, přijde o rukáv."
      }
     ],
     "bad": [
      "Tohle slovo neznám a to jsem v noci slyšel ledacos.",
      "Nesedí. Zkontrolujte, kde mají nůžky očka."
     ]
    }
   ],
   "hints": [
    "Nůžky nejsou kovové, jsou namalované na fasádě pod oknem v prvním patře.",
    "Očka jsou nahoře, hroty dole. Nastavte „očka nahoře“ a čtěte po čepelích.",
    "JEDNO + RUKÝ = JEDNORUKÝ."
   ],
   "win": [
    {
     "k": "z",
     "t": "Ty nůžky patřily chlapovi, co tu kdysi bydlel a stříhal sukno. Takovej středověkej barber pro látky."
    },
    {
     "k": "z",
     "t": "A kdo je tu ještě jednorukej? Ten ciferník hned vedle."
    }
   ],
   "fact": "Znak s nůžkami patřil majiteli domu, který se živil stříháním sukna (říkalo se tomu postřihač) a dotáhl to až na starostu města.",
   "next": {
    "title": "Radniční věž",
    "text": "Radniční věž je hned vedle. Zvedněte hlavu k ciferníku. 30 sekund.",
    "img": null,
    "min": 0.5
   }
  },
  {
   "id": "s3",
   "n": 3,
   "place": "Stará radnice, hodiny",
   "sub": "ciferník na radniční věži",
   "nav": "Radniční věž, ciferník s jedinou zlatou ručičkou a sluncem. 24 hodin, 24 nahoře.",
   "img": null,
   "intro": [
    {
     "k": "z",
     "t": "Krčma zavírala o půlnoci. To vím."
    },
    {
     "k": "z",
     "t": "Pak si pamatuju jen to, že jsem strašně chtěl, aby bylo o hodinu míň."
    },
    {
     "k": "z",
     "t": "Ten ciferník má jedinou ručičku. Našel jsem v kapse zprávu, kterou jsem si v noci „zašifroval“. Posunutou. O tolik, kolik je na něm čísel."
    }
   ],
   "steps": [
    {
     "type": "wheel",
     "title": "Posunutá zpráva",
     "text": "Každé písmeno zprávy je posunuté v abecedě dopředu, a to o tolik míst, kolik čísel má ciferník. Nastavte kotouč a čtěte horní řádek (zpráva) → spodní (text). Odpověď: rozluštěný text, nebo klíč.",
     "cipher": "MBCQJG ZPYLMS",
     "answers": [
      "ODESLIBRANOU",
      "24"
     ],
     "near": {
      "12": "Na normálních hodinách jo. Tenhle ciferník jich má víc.",
      "2": "Posun o 2 zpátky sedí. Ale kolik čísel má ciferník?",
      "ODESLI": "První slovo máte. Kudy?"
     },
     "ok": [
      {
       "k": "z",
       "t": "„ODEŠLI BRANOU.“ Množný číslo. To je… taková řečnická figura. 🔎"
      }
     ],
     "bad": [
      "Tohle je ještě pořád šifra. Otočte kotoučem.",
      "Nesedí. Spočítejte čísla na ciferníku."
     ]
    }
   ],
   "hints": [
    "Ciferník má 24 hodin, ne 12. Kolik je čísel, o tolik se posouvá abeceda.",
    "Posun o 24 dopředu je totéž jako o 2 zpátky: M→O, B→D, C→E…",
    "ODEŠLI BRANOU."
   ],
   "win": [
    {
     "k": "z",
     "t": "Tyhle hodiny sem kdysi přestěhovali z kostelní věže. Já se v noci taky stěhoval. Hlavně mezi hospodama."
    },
    {
     "k": "z",
     "t": "Brána. Dolů Klokotskou, to je ta hlavní ulice z rohu náměstí u radnice."
    }
   ],
   "fact": "Radniční hodiny mají jedinou ručičku a 24hodinový ciferník. Letní čas neumí, ukazují pořád zimní.",
   "next": {
    "title": "Bechyňská brána",
    "text": "Z rohu náměstí u radnice dolů hlavní ulicí Klokotská. Asi 6 minut, pořád z kopce, až k bráně vedle mohutné kulaté věže.",
    "img": "bechynska-brana.jpg",
    "min": 6,
    "cestou": {
     "type": "photo",
     "title": "Úkol cestou: věž v dlani",
     "text": "Cestou dolů si pamatuju kulatou věž. Obří. Chtěl jsem si ji odnést domů. Až ji uvidíte, vyfoťte ji tak, aby to vypadalo, že ji {A} drží v dlani.",
     "confirm": "Máme ji v dlani ✓",
     "ok": [
      {
       "k": "z",
       "t": "Krásný. Jedno pivo vám za to odpouštím. Zbývá 37."
      }
     ],
     "hints": [
      "Pokračujte Klokotskou dolů, věž se objeví sama.",
      "Jeden stojí blíž k mobilu s nataženou dlaní, věž je v dálce za ním.",
      "Stačí, aby věž „seděla“ nad dlaní. Dokonalost se nehodnotí."
     ],
     "placeholder": "Odkud je věž Kotnov z Klokotské vidět poprvé [NA MÍSTĚ]. Když ne, udělejte trik až u brány."
    }
   }
  },
  {
   "id": "s4",
   "n": 4,
   "place": "Bechyňská brána",
   "sub": "konec Klokotské, u věže Kotnov",
   "nav": "Gotická brána přilepená ke kulaté věži Kotnov. Projděte průjezdem ven a otočte se k bráně čelem. Stůjte na chodníku, průjezdem jezdí auta.",
   "img": "bechynska-brana.jpg",
   "intro": [
    {
     "k": "z",
     "t": "Tady si pamatuju řetězy. A strašnej rámus."
    },
    {
     "k": "z",
     "t": "Chtěli jsme ven pro další pivo. Teda… chtěl jsem. 🔎"
    },
    {
     "k": "z",
     "t": "V noci jsem si nakreslil, jak se tu spouštěl padací most. Tři verze. Jedna sedí se skutečností."
    }
   ],
   "steps": [
    {
     "type": "pick",
     "title": "Opilé náčrty",
     "text": "Stojíte venku a díváte se na bránu? Porovnejte ji s náčrty. Který sedí?",
     "options": [
      {
       "svg": "brana1",
       "label": "A"
      },
      {
       "svg": "brana2",
       "label": "B"
      },
      {
       "svg": "brana3",
       "label": "C"
      }
     ],
     "correct": 1,
     "ok": [
      {
       "k": "z",
       "t": "Dvě štěrbiny, dvě páky. Jenže u každý páky musí stát jeden chlap. A já byl sám. 🔎"
      }
     ],
     "bad": [
      "To jsem kreslil po šestým. Podívejte se nad oblouk průjezdu.",
      "Ne. Kolik těch úzkých škvír tam fakt je?"
     ]
    }
   ],
   "hints": [
    "Musíte stát venku, za branou, a dívat se na ni.",
    "Dívejte se nad oblouk průjezdu, ne na věž.",
    "Nad průjezdem jsou dvě úzké svislé škvíry. Náčrt B."
   ],
   "win": [
    {
     "k": "z",
     "t": "Těma škvírama šly páky, co zvedaly padací most."
    },
    {
     "k": "z",
     "t": "Most se zasek. Proto jsme šli zpátky jinudy. Uličkama nahoru."
    }
   ],
   "fact": "Dvě úzké svislé štěrbiny nad průjezdem jsou pro páky, kterými se zvedal padací most.",
   "next": {
    "title": "Nahoru uličkami",
    "text": "Vraťte se průjezdem do města a hned za ním zahněte doprava do uliček (Růžová, pak Filipovská). Parkem nechoďte. Mapa se teď „rozmaže“, navigujte podle Žižkových nočních fotek. Asi 6 minut do kopce.",
    "img": null,
    "min": 6,
    "photonav": [
     {
      "img": "ulicka-zdi.jpg",
      "text": "Fotka 1: úzká ulička mezi zdmi.",
      "placeholder": "fotka 36f2 je focená z kopce; nafotit do kopce [NA MÍSTĚ]"
     },
     {
      "img": "schody.jpg",
      "text": "Fotka 2: schody s ukazatelem.",
      "voice": 2,
      "placeholder": "fotka 765a je focená z kopce; nafotit do kopce [NA MÍSTĚ]"
     },
     {
      "img": "prevratilska-41.jpg",
      "text": "Fotka 3: růžový dům s číslem 41 na rohu náměstí s kostelem se zelenou věží."
     }
    ]
   }
  },
  {
   "id": "s5",
   "n": 5,
   "place": "Rozcestník u růžového domu",
   "sub": "nám. Mikuláše z Husi, roh Převrátilské (čp. 41)",
   "nav": "Náměstí s kostelem se zelenou věží. V rohu stojí růžový dům č. 41 a před ním hnědý rozcestník s truhlíkem kytek.",
   "img": "rozcestnik.jpg",
   "intro": [
    {
     "k": "z",
     "t": "Tady to okno! Zpívali jsme pod ním."
    },
    {
     "k": "v",
     "t": 3
    },
    {
     "k": "z",
     "t": "Paní odpověděla kýblem."
    },
    {
     "k": "z",
     "t": "Divný. Na tý noční fotce je v okně odraz blesku z mobilu. Já mobil nemám… Nevadí. 🔎"
    },
    {
     "k": "s",
     "t": "📷 noční fotka: okno růžového domu, v něm záblesk [placeholder]"
    },
    {
     "k": "z",
     "t": "Po kýblu jsem šel tam, kam ukazuje ta cedule. Jenže nevím, která šipka."
    }
   ],
   "steps": [
    {
     "type": "eliminate",
     "title": "Která šipka?",
     "text": "Přečtěte si šipky na skutečném rozcestníku. Žižka si vzpomíná jen na to, kam NEšel. Ťukáním škrtejte a nechte jen jednu.",
     "clues": [
      "Bašty ne. V noci jsem žádnou nedobyl.",
      "Kotnov a Bechyňská brána ne, tam už jsme byli.",
      "Kostely ne, to až ráno. Muzeum a podzemí taky ne, v noci je zavřeno.",
      "WC ne. Tam jsem byl čtyřikrát.",
      "Bylo tam hodně zelený a někdo tam spal na lavičce."
     ],
     "options": [
      "Holečkovy sady",
      "Žižkova bašta",
      "Soukenická bašta",
      "Kostel Panny Marie",
      "Věž Kotnov",
      "kostel",
      "Bechyňská brána",
      "muzeum",
      "Středověké podzemí",
      "WC"
     ],
     "correct": 0,
     "ok": [
      {
       "k": "z",
       "t": "Sady. Tam jsem vás v noci hledal dvě hodiny."
      },
      {
       "k": "z",
       "t": "Dovnitř nejdeme. Stačí mi brána, pod kterou jsem se vyfotil."
      }
     ],
     "bad": [
      "Tam ne, to jsem přece vyloučil. Čtěte znova.",
      "Ne. Zbyde jen jedna šipka, která sedí na všechno."
     ]
    }
   ],
   "hints": [
    "Škrtejte šipky, které Žižka vyloučil. Zbyde jedna.",
    "Zeleň, lavička, spaní = park.",
    "Holečkovy sady."
   ],
   "win": [],
   "fact": null,
   "next": {
    "title": "Brána do sadů",
    "text": "Jděte po šipce „Holečkovy sady“. Asi 1 minuta, pořád na tomhle náměstí.",
    "img": null,
    "min": 1
   }
  },
  {
   "id": "s6",
   "n": 6,
   "place": "Mariánská brána",
   "sub": "vstup do Holečkových sadů z nám. Mikuláše z Husi",
   "nav": "Světlý oblouk porostlý břečťanem, nahoře kamenná váza jak kopeček zmrzliny. Za ním je zeleň a zídka parku.",
   "img": null,
   "intro": [
    {
     "k": "z",
     "t": "Tuhle fotku jsem si v noci poslal. Najděte místo, odkud je."
    }
   ],
   "steps": [
    {
     "type": "reveal",
     "title": "Najdi podle fotky",
     "text": "Z fotky je zatím vidět jen kousek. Za chvíli se odkryje celá. Až bránu najdete, postavte se do oblouku tak, aby váza byla přesně nad hlavou {A}. Svatozář. Vyfoťte to.",
     "crop": "marianska-vaza.jpg",
     "full": "marianska-brana.jpg",
     "delay": 60,
     "confirm": "Stojíme pod vázou ✓",
     "ok": [
      {
       "k": "z",
       "t": "Svatej {A}. Kdo by to byl řekl."
      }
     ]
    }
   ],
   "hints": [
    "Jděte po šipce „Holečkovy sady“.",
    "Hledejte oblouk, za kterým je vidět zeleň.",
    "Je to vstup do parku přímo z tohohle náměstí, pár kroků od rozcestníku."
   ],
   "twist": [
    {
     "k": "z",
     "t": "Sedněte si. Chvíli nikam nejdeme."
    },
    {
     "k": "k",
     "t": "38 piv pořád nezaplaceno. Do konce hry vyvěsím fotky z noci na náměstí. Na ty vaše tenisky se bude dívat celej Tábor."
    },
    {
     "k": "v",
     "t": 4
    },
    {
     "k": "z",
     "t": "{A}, ten plášť je tvůj. Jména na ruce jsem si psal, abych vás v noci spočítal. A nesl jsem tebe, {B}."
    },
    {
     "k": "z",
     "t": "A ta díra v kašně? Taky ne já. Vidíte tu kašnu tady na náměstí? Stála kdysi na hlavním, praskla, tak ji odstěhovali sem. Kašny v Táboře prostě praskaj samy."
    },
    {
     "k": "k",
     "t": "Chcete fotky zpátky? Vsadili jste se se mnou, že v Táboře teče voda do kopce. Dokažte to. Jsem na Tržním."
    }
   ],
   "win": [],
   "fact": "Kašna na tomhle náměstí stála původně na hlavním. Po napuštění se sesedla a praskla, tak ji přestěhovali sem.",
   "next": {
    "title": "Tržní náměstí",
    "text": "Z rohu náměstí u růžového domu Převrátilskou a pak rovně Dlouhou, až na Tržní náměstí. Asi 6 minut. V Dlouhé míjíte kašnu zapuštěnou do zdi, podle ní poznáte, že jdete dobře.",
    "img": null,
    "min": 6,
    "placeholder": "fotka cíle Tržní náměstí chybí [NA MÍSTĚ nafotit]"
   }
  },
  {
   "id": "s7",
   "n": 7,
   "place": "Tržní náměstí",
   "sub": "kašna, pítko, Vodárenská věž",
   "nav": "Konec Dlouhé. Náměstí s hranatou kamennou kašnou a pítkem. Na kraji stojí Vodárenská věž.",
   "img": null,
   "pause": true,
   "intro": [
    {
     "k": "z",
     "t": "Pauza? Stopky stojí, dejte si něco. Já počkám."
    },
    {
     "k": "z",
     "t": "Tak. Sázka zněla: voda v Táboře teče do kopce. Krčmář chce důkaz."
    },
    {
     "k": "z",
     "t": "Najděte na tomhle náměstí místo, kde voda teče nahoru. A napijte se, ať to má šťávu."
    }
   ],
   "steps": [
    {
     "type": "photo",
     "title": "Voda do kopce",
     "text": "Najděte, odkud tu stříká voda vzhůru. Jeden se napije, ostatní ho vyfotí jako důkaz pro krčmáře.",
     "confirm": "Napili jsme se, voda šla nahoru ✓",
     "fallback": {
      "type": "pick",
      "text": "Pítko neteče? Tak jinak: kterou věž tu kdysi postavili, aby tahala vodu do kopce?",
      "options": [
       {
        "label": "Radniční věž s hodinami"
       },
       {
        "label": "Vodárenská věž na kraji Tržního náměstí"
       },
       {
        "label": "Kulatá věž Kotnov u brány"
       }
      ],
      "correct": 1,
      "bad": [
       "Tahle měřila čas, ne vodu.",
       "Tahle hlídala bránu."
      ]
     },
     "placeholder": "Jestli pítko v daném měsíci teče [NA MÍSTĚ]. Když ne, použijte tlačítko „Pítko neteče“.",
     "ok": [
      {
       "k": "k",
       "t": "Hm. Beru. Jedno pivo odpouštím."
      }
     ]
    }
   ],
   "hints": [
    "Voda „do kopce“ = voda, co stříká vzhůru.",
    "Nehledejte velkou kašnu, hledejte něco menšího, z čeho se pije.",
    "Pítko u kašny na Tržním náměstí."
   ],
   "win": [
    {
     "k": "z",
     "t": "Tahle věž kdysi tahala vodu z rybníka pod městem nahoru do kopce. Vyhráli jste sázku díky stroji z roku 1508."
    },
    {
     "k": "z",
     "t": "Krčmář odešel k hrázi. Za ním."
    }
   ],
   "fact": "Z Jordánu se vodním strojem čerpala voda nahoru do věže nad hradbami a odtud tekla do kašen ve městě.",
   "next": {
    "title": "Hráz Jordánu",
    "text": "Ulicí Pod Tržním náměstím z kopce, pak ulicí K Vodopádu k tenisovým kurtům a po kamenných schodech podél vodopádu nahoru na hráz. Asi 8 minut. Schody jsou po opravě zase otevřené.",
    "img": null,
    "min": 8,
    "placeholder": "fotka hráze jako karta cíle chybí [NA MÍSTĚ nafotit]"
   }
  },
  {
   "id": "s8",
   "n": 8,
   "place": "Hráz Jordánu",
   "sub": "nahoře na hrázi, strana u vody",
   "nav": "Nahoře na hrázi. Na jedné straně velká voda, na druhé údolí s vodopádem. Chodník podél vody.",
   "img": null,
   "intro": [
    {
     "k": "z",
     "t": "Tady jste v noci chytali ryby."
    },
    {
     "k": "z",
     "t": "Na můj palcát. Jako na prut."
    },
    {
     "k": "z",
     "t": "Krčmář vás fotil odněkud odsud. Najděte přesně to místo."
    }
   ],
   "steps": [
    {
     "type": "overlay",
     "title": "Zopakuj úhel",
     "text": "Zapněte kameru. Přes obraz je obrys krčmářovy noční fotky. Posunujte se po hrázi, dokud obrys nesedí se skutečností (obzor, zábradlí, lampa). Pak ťukněte „Sedí“.",
     "confirm": "Sedí ✓",
     "fallback": {
      "type": "pick",
      "text": "Kamera nejede? Ze které strany hráze je noční fotka? (obzor je na fotce vlevo níž, vpravo výš)",
      "options": [
       {
        "label": "Stojím zády k vodě"
       },
       {
        "label": "Stojím čelem k vodě"
       },
       {
        "label": "Stojím na schodech u vodopádu"
       }
      ],
      "correct": 1,
      "bad": [
       "Pak byste viděli údolí, ne vodu.",
       "Ze schodů hladinu skoro nevidíte."
      ]
     },
     "placeholder": "Obrys noční fotky je zástupný. Vasilii musí nafotit noční úhel na hrázi [NA MÍSTĚ] a do hry vložit obrys (assets/img/hraz-obrys.png).",
     "ok": [
      {
       "k": "v",
       "t": 5
      }
     ]
    }
   ],
   "hints": [
    "Hledejte lampu nebo zábradlí z obrysu.",
    "Obzor na fotce musí být ve stejné výšce. Držte mobil na úrovni očí.",
    "Stoupněte si čelem k vodě u zábradlí a pomalu choďte, dokud to nesedne."
   ],
   "win": [
    {
     "k": "z",
     "t": "Tenhle rybník tu je přes 500 let. Patří k nejstarším přehradám ve střední Evropě. A vy jste do něj házeli palcát."
    },
    {
     "k": "z",
     "t": "Krčmář má truhlu s fotkama u vchodu do podzemí pod radnicí. Nahoru, ale jinudy."
    }
   ],
   "fact": "Jordán vznikl jako zásobárna vody pro město a patří k nejstarším údolním nádržím ve střední Evropě.",
   "next": {
    "title": "Zpátky do centra",
    "text": "Po chodníku ulice Čs. armády dolů ke Křižíkovu náměstí, doleva do Palackého a rovně Pražskou až na Žižkovo náměstí. Asi 12 minut. Cestou dvě krátké zastávky.",
    "img": null,
    "min": 12,
    "look": [
     {
      "img": "deska-nove-brany.jpg",
      "title": "Palackého, dům naproti divadlu (obchod bonet OBUV)",
      "text": "Vidíte tu tmavou desku s obrázkem brány? Nové brány. Stály tu stovky let a dneska po nich nic. Přísahám, že tyhle jsem nerozbil."
     },
     {
      "img": "dum-koule.jpg",
      "title": "Pražská, dům s kosočtvercovým vzorem",
      "text": "Kamenná deska a v ní kulatá koule. Dělová. Tu tam nechali Švédové, když obléhali město. Krčmář by to stejně hodil na mě."
     }
    ]
   }
  },
  {
   "id": "s9",
   "n": 9,
   "place": "Vstup do podzemí",
   "sub": "Stará radnice, Žižkovo náměstí",
   "nav": "Z Pražské rovně přes náměstí ke Staré radnici. Před Škochovým domem je v dlažbě plánek náměstí z kostek a červené kostky ukazují, kudy pod vámi vedou chodby. Jděte po nich ke vchodu do podzemí. Dovnitř nechoďte, stůjte bokem, ať neblokujete prohlídky.",
   "img": "mozaika.jpg",
   "intro": [
    {
     "k": "z",
     "t": "Tady. Krčmář tu má truhlu s fotkama."
    },
    {
     "k": "z",
     "t": "Zámek chce celou noc. Popořadě."
    },
    {
     "k": "z",
     "t": "Poskládejte, co jste dělali. Od první sázky po ryby."
    }
   ],
   "steps": [
    {
     "type": "sort",
     "title": "Poskládejte noc",
     "text": "Ťukejte na karty v pořadí, v jakém se to v noci stalo. Když se spletete, dejte Znovu.",
     "cards": [
      {
       "k": "nuzky",
       "t": "Sázka o rukáv",
       "e": "✂️"
      },
      {
       "k": "orloj",
       "t": "Posunutý čas",
       "e": "🕛"
      },
      {
       "k": "most",
       "t": "Zaseklý most",
       "e": "🏰"
      },
      {
       "k": "schody",
       "t": "Kdo koho nesl",
       "e": "🧗"
      },
      {
       "k": "okno",
       "t": "Serenáda pod oknem",
       "e": "🎶"
      },
      {
       "k": "pitko",
       "t": "Voda do kopce",
       "e": "⛲"
      },
      {
       "k": "ryby",
       "t": "Ryby na palcát",
       "e": "🎣"
      }
     ],
     "ok": [
      {
       "k": "s",
       "t": "🔓 cvak"
      }
     ],
     "bad": [
      "Tohle pořadí by nedal ani krčmář. Zkuste to znova.",
      "Skoro. Vzpomeňte si, kudy jste dneska šli."
     ]
    }
   ],
   "hints": [
    "Pořadí noci je stejné jako pořadí, v jakém jste dneska chodili.",
    "Začíná se u nůžek a končí u vody.",
    "Po bráně jsou schody, po schodech okno."
   ],
   "win": [],
   "fact": "Pod náměstím jsou staré sklepy a chodby. Červené kostky v dlažbě před Škochovým domem ukazují, kudy vedou.",
   "next": null
  }
 ],
 "finale": {
  "chest_empty": "🧰 Truhla je PRÁZDNÁ.",
  "after_chest": [
   {
    "k": "v",
    "t": 6
   },
   {
    "k": "z",
    "t": "Jednu fotku si ale udělat můžete. Tu jedinou, co smí ven. 📸"
   }
  ],
  "selfie_title": "Selfie KUMPÁNI",
  "selfie_text": "Všichni do záběru. Rámeček se přidá sám a fotku si uložte do galerie.",
  "frame_top": "KUMPÁNI",
  "frame_sub": "Co se stalo v Táboře",
  "frame_caption": "Přísaháme, že nic nepřiznáme.",
  "after_selfie": [
   {
    "k": "v",
    "t": 7
   }
  ],
  "timeout": "Krčmář nic nevyvěsil. Víte proč?",
  "cert_title": "CERTIFIKÁT KUMPÁNSTVÍ",
  "cert_text": "{JMENA} přežili táborskou noc, našli palcát (u sochy), vyhráli sázku o vodu do kopce a nic nepřiznali.",
  "cert_sign": "— J. Ž., hejtman a hlídač",
  "titles": [
   [
    700,
    "Kumpáni roku. Žižka by s váma šel znova."
   ],
   [
    500,
    "Solidní parta. Pivo by vám nalili."
   ],
   [
    300,
    "Přežili jste. To se počítá."
   ],
   [
    0,
    "Kocovina vyhrála, ale vy jste došli. Respekt."
   ]
  ]
 },
 "rozlucka": {
  "intro": "Rozlučka: oslavenec je {A}. Všechny noční průšvihy padnou na něj.",
  "challenges": [
   {
    "at": "s4",
    "title": "Výzva: lidská páka",
    "text": "{A} je páka padacího mostu. Zvedněte ho (opatrně!) a spusťte most. Foto."
   },
   {
    "at": "s7",
    "title": "Výzva: přípitek",
    "text": "{A} pije z pítka první. Ostatní pronesou přípitek na jeho zdraví (nealko platí)."
   },
   {
    "at": "s9",
    "title": "Výzva: přísaha",
    "text": "{A} nahlas přečte přísahu kumpánů: „Přísaháme, že nic nepřiznáme.“ Ostatní odpoví: „KUMPÁNI!“"
   }
  ],
  "cert_title": "CERTIFIKÁT ZPŮSOBILOSTI K SŇATKU",
  "cert_text": "{A} prošel(a) táborskou nocí, byl(a) padacím mostem, pil(a) vodu do kopce a přísahal(a) mlčet. Tímto je způsobilý/á k sňatku.",
  "cert_sign": "— J. Ž., svědek, který nic neviděl"
 }
};
