"use strict";
/* Ukázka: plná trasa 9 stanic. r25d — letter-ring cipher + sticky šifra · KEY tabor-demo2-r25d */
const TEST=/[?&]test=1/.test(location.search);
const DEV=/[?&]dev=1/.test(location.search);
const KEY="tabor-demo2-r25d";
const IMG="assets/img/";
const AV_MARK=`<img class="av" src="assets/img/zizka-avatar.jpg" alt="" width="28" height="28">`;
const NIGHT={
 1:{img:IMG+"kasna-tabor-mobile.jpg",t:"Okénko 1 · 02:14 · Kašna"},
 2:{img:IMG+"skoch-fasada.jpg",t:"Okénko 2 · 02:47 · Škochův dům"},
 3:{img:IMG+"orloj-night.jpg",t:"Okénko 3 · 03:05 · Radniční hodiny"},
 4:{img:IMG+"portal-night.svg",t:"Okénko 4 · 03:22 · Radniční portál"},
 5:{img:IMG+"ulicka-night.svg",t:"Okénko 5 · 03:41 · Konzola v uličce"},
 6:{img:IMG+"marianska-night.jpg",t:"Okénko 6 · 03:55 · Mariánská brána"},
 7:{img:IMG+"trzni-night.jpg",t:"Okénko 7 · 04:18 · Tržní pítko"},
 8:{img:IMG+"hraz-night.jpg",t:"Okénko 8 · 04:40 · Hráz Jordánu"},
 9:{img:IMG+"brana-finale.jpg",t:"Okénko 9 · 05:02 · Truhla"}
};

const SCRIPT=[
 // ÚVOD — MOTIVE 2: dluh-past. Roland drží Žižku dnes. Částku NIKDY neříkat před řešením st1.
 {sys:"Čtvrtek · 6:40 · Tábor · dnes"},
 {pic:IMG+"zizka-hero-mobile.jpg",cap:"Žižka · Tábor · dnes"},
 {z:"Lidi. Jste online? Stojím u kašny — a tohle století není moje. A nemůžu pryč."},
 {z:"Nejsem ztracenej. Nehledám cestu nazdařbůh. Drží mě tu dluh — Roland, mistr týhle kašny. Dokud mu nezaplatím, brána domů je zamčená."},
 {pic:IMG+"kasna-tabor-mobile.jpg",cap:"Žižkovo náměstí · kašna · Tábor"},
 {z:"Pomozte mi splatit účet a jít domů. Jinak vás přepíšu na účet jako ručitele. Soft. Velitelsky. ⚔️"},
 {z:"Mám 9 okének — stopa k truhle s vyrovnáním. Viz nahoře ⬆️ Najdete je, než se past zavře napevno?"},
 {quick:["Jasně, jdeme do toho","Proč zrovna my?"],id:"q0"},
 {z:"Past je jasná: částka → platba → domů. Každá stopa = jedno okénko."},
 {z:"Až jich bude 9, truhla splatí Rolandovi — a otevře se cesta zpátky. Začneme u kašny. Tam je napsaná částka."},

 // STANICE 1 — Rolandův účet (součet dvou letopočtů = částka pastí)
 {sys:"Stanice 1 / 9"},
 {z:"Jděte doprostřed Žižkova náměstí. Velká kamenná kašna — uprostřed sloup, kolem ní lem, na který si lidi sedají."},
 {z:"Kousek od ní stojí velká socha mě s palcátem. Tou kašnu nepopletete."},
 {quick:["Stojíme u kašny"],id:"n1"},
 {z:"Přesně. Stojím tu mezi lidma s obdélníkama v ruce. Oni kouká do telefonů. Já do kašny — tady je napsaný, kolik dlužím."},
 {z:"Roland — mistr, co tu kašnu stavěl — si na vnější stěně nádrže vyryl dva letopočty. Jeho účet. Pro mě. Past, ne suvenýr."},
 {z:"Najděte ty dva roky a sečtěte je. To je částka pastí. Dokud ji Roland nedostane, jsem tu uvázanej. 🗡️"},
 {task:"t1"},
 {unlock:1},
 {z:"Okénko 1. 3416 — Rolandův účet. Víme, kolik dlužím. Teď to musíme sehnat a splatit — jinak brána zůstane zamčená."},
 {z:"Roland šeptá dál: dům s nůžkama na fasádě. Nejzdobnější na náměstí. Tam je další klíč k truhle s platbou. 🤔"},

 // STANICE 2 — nůžky / mřížka JEDNORUKY
 {sys:"Stanice 2 / 9"},
 {z:"Z náměstí do rohu k radniční věži. Minuta chůze."},
 {z:"Hledejte nejzdobnější dům na náměstí — nahoře vlnky do špičky jak šlehačka na dortu, dole restaurace. Stojí hned vedle radnice s hodinami."},
 {pic:IMG+"skoch-fasada.jpg",cap:"Škochův dům · fasáda"},
 {quick:["Jsme u Škocha"],id:"n2"},
 {z:"Tady se mi to vrací. Obří nůžky, sázka s krejčím. Prohrál jsem rukáv — a přezdívku. Asi součást cesty k účtu."},
 {z:"Na zadní straně lístku od Rolanda mám tohle. Moje písmo to není."},
 {receipt:`<h4>ZADNÍ STRANA</h4><div style="font:800 20px/1.25 ui-monospace,monospace;letter-spacing:8px;text-align:center">J T A M R<br>B E S U L<br>P H D I A<br>V K Z N C<br>Y S L E O</div><div class="scr">přilož k nůžkám · klíč k truhle</div>`},
 {z:"Prohrál? Já? Kromě století a rukávu — a teď i 3416 Rolandovi."},
 {z:"Najděte namalované nůžky na fasádě — to je klíč. Přiložte mřížku podle nich a přečtěte, co jsem prohrál."},
 {task:"t2"},
 {unlock:2},
 {z:"Sázka s krejčím: kdo prohraje, přijde o rukáv. Prohrál jsem. Jednorukej. Aspoň že ne Bezrukej. 🫡"},
 {z:"Počkat. JEDNORUKÝ — není jen přezdívka. Roland to nenechal náhodou. Hledejte tady na náměstí něco jinýho jednorukýho. Jednu ruku. Blízko."},
 {z:"Až to najdete — jděte k tomu. Klíč ke zprávě o truhle je na něm."},

 // STANICE 3 — orloj Caesar (objev: hráči najdou jednorukého sami)
 {sys:"Stanice 3 / 9"},
 {z:"Pořád na náměstí. Hned vedle Škocha. Koukejte kolem — a nahoru."},
 {quick:["Našli jsme jednorukého"],id:"n3"},
 {z:"Přesně on. Ciferník s jedinou zlatou ručičkou a sluncem. Taky jednorukej. Tohle století má humor."},
 {pic:IMG+"orloj-night.jpg",cap:"Radniční hodiny · 24h · 1 ručička · Tábor"},
 {z:"Spočítejte dílky — 24 hodin, 24 nahoře. Normální to není."},
 {z:"Rolandova stopa: zpráva posunutá o tolik, kolik čísel má jednoruký. V kapse ji mám od chvíle, co mi to prasklo."},
 {z:"Otočte prstenec písmen — posun = kolik čísel má jednoruký na věži. Srovnejte abecedu, přečtěte zprávu a napište ji sem."},
 {task:"t3"},
 {unlock:3},
 {z:"„Odešli branou.“ Kudy dál k truhle s 3416. Množné číslo — buď mám rotu, nebo si lhžu do kapsy. 🔎"},
 {z:"Tyhle hodiny sem kdysi přestěhovali z kostelní věže. Já se stěhoval stoletími. Remíza."},
 {z:"Branou — ne z kopce na Kotnov. Hned tady: hlavní portál Staré radnice. Pod hodinami. Minuta."},

 // STANICE 4 — radniční portál (šablona → KLICEM)
 {sys:"Stanice 4 / 9"},
 {z:"Stůjte před hlavním vchodem radnice. Kamenný portál s obloukem — znak v tympanonu nahoře."},
 {pic:IMG+"portal-night.svg",cap:"Stará radnice · portál"},
 {quick:["Jsme u portálu"],id:"n4"},
 {z:"Tudy jsem měl odejít k truhle. Roland mi nechal šablonu — dvě svislé škvíry jak ostění. Přiložte ji k portálu."},
 {z:"Horní oblouk šablony = oblouk kamene. Znak nahoře. Pak přečtěte, co je v průzorech."},
 {task:"t4"},
 {unlock:4},
 {z:"Klíčem. Doslova. K truhle i k účtu. Roland má humor jak kovář po směně. 🔑"},
 {z:"Další půlka stopy je pár kroků — ne přes město. Ulička hned u radnice."},

 // STANICE 5 — split-clue konzola → PLATBA
 {sys:"Stanice 5 / 9"},
 {z:"Obejdete radnici do úzké uličky (strana od náměstí k Pražské). Hledejte dům naproti boční fasádě — kovaná konzola pod oknem v 1. patře."},
 {pic:IMG+"ulicka-night.svg",cap:"Ulička u radnice · konzola"},
 {quick:["Vidíme konzolu"],id:"n5"},
 {z:"Na lístku od Rolanda mám jen kraj. Prostředek schválně vytrhl — prý „ať se nenudíte“."},
 {receipt:`<h4>ÚTRŽEK · ROLAND</h4><div style="font:800 22px/1.3 ui-monospace,monospace;letter-spacing:6px;text-align:center">P L&nbsp;&nbsp;·&nbsp;&nbsp;·&nbsp;&nbsp;·&nbsp;&nbsp;A</div><div class="scr">prostředek = konzola · strana k náměstí</div>`},
 {z:"Na konzole jsou tři znaky. Platí jen ta strana, co hledí směrem na náměstí — ne do dvora. Složte s útržkem."},
 {task:"t5"},
 {unlock:5},
 {z:"Platba. Celé slovo. Účet 3416 pořád čeká — ale stopa sedí. 🔎"},
 {z:"Výběrčí mě fotil u oblouku s vázou. Krátká odbočka: z náměstí k Mariánské bráně — uličkou kolem kostela, asi 4 minuty. Ne Klokotskou. Ne na Kotnov."},

 // STANICE 6 — Mariánská (zvrat výběrčí)
 {sys:"Stanice 6 / 9"},
 {z:"Světlý oblouk porostlý břečťanem, nahoře kamenná váza jak kopeček zmrzliny. Za ním zeleň."},
 {pic:IMG+"marianska-night.jpg",cap:"Mariánská brána · váza nahoře"},
 {quick:["Vidíme oblouk s vázou"],id:"n6"},
 {z:"Tuhle fotku jsem si poslal cestou k truhle. Postavte se do oblouku tak, aby váza byla přesně nad hlavou jednoho z vás. Svatozář. 📸"},
 {task:"t6"},
 {unlock:6},
 {z:"Sedněte si. Chvíli nikam nejdeme."},
 {fwd:{h:"Výběrčí",b:"3416 pořád na stole. Truhla je u mě. Dokud Roland nedostane svoje, brána domů zůstane zamčená. Stopu cesty mám zapsanou — účet roste, dokud to nedotáhnete."}},
 {z:"🎙️ Poslouchejte. Já velím týhle směně. Ne dlužník na úvěru — jen jsem. Jména na ruce = muster. Kdo jde se mnou domů, jde. Kdo ne — přičtu vás k účtu. Soft. ⚔️"},
 {z:"Tohle je past, ne honička. Výběrčí drží truhlu s 3416. Roland dostane peníze — já jdu domů. Tečka."},
 {z:"A díra v kašně? Ne já. Ta kašna stála na hlavním, praskla, přestěhovali ji sem. Kašny v Táboře praskaj samy. Já praskám jen století."},
 {fwd:{h:"Výběrčí",b:"Chcete truhlu? Vsadili jste se, že v Táboře teče voda do kopce. Dokažte to — beru to jako zálohu na 3416. Jsem na Tržním."}},
 {z:"Zpátky k náměstí a na Tržní: Převrátilskou a Dlouhou. Asi 6 minut. V Dlouhé míjíte kašnu ve zdi — podle ní poznáte, že jdete dobře."},

 // STANICE 7
 {sys:"Stanice 7 / 9"},
 {quick:["Jsme na Tržním"],id:"n7"},
 {z:"Pauza? Stopky stojí, dejte si něco. Já počkám — účet neuteče."},
 {quick:["Pokračovat"],id:"n7p"},
 {z:"Sázka: voda v Táboře teče do kopce. Výběrčí chce důkaz jako zálohu na 3416. Já chci jít domů. Vyřešte obojí."},
 {z:"Najděte na tomhle náměstí místo, kde voda teče nahoru. A napijte se, ať to má šťávu. 📸"},
 {task:"t7"},
 {unlock:7},
 {fwd:{h:"Výběrčí",b:"Hm. Beru. Záloha přijata. Zbývá doplatit zbytek u truhly — pořád 3416 na jméno Roland."}},
 {z:"Tahle věž tahala vodu do kopce už v 1508. Vyhráli jste sázku díky starý technice. Já bych tleskal, kdybych měl obě ruce volný."},
 {z:"Výběrčí odešel k hrázi. Za ním — Pod Tržním náměstím z kopce, K Vodopádu, po schodech nahoru. Asi 8 minut."},

 // STANICE 8
 {sys:"Stanice 8 / 9"},
 {quick:["Jsme na hrázi"],id:"n8"},
 {z:"Tady jste chytali ryby. Na můj palcát. Jako na prut. V mý době by vás hejtman seřval. Já se zatím směju. Téměř."},
 {z:"Výběrčí odtud bral stopu k truhle. Najděte přesně to místo — zatím bez noční reference, tak vyberte úhel, co sedí."},
 {task:"t8"},
 {unlock:8},
 {z:"🎙️ Ryby? Ani náhodou. Chytili jste rýmu a jednu tenisku. Vaši. Palcát je pořád můj — aspoň do finále."},
 {z:"Tenhle rybník tu je přes 500 let — jedna z nejstarších přehrad ve střední Evropě. Vy jste do něj házeli palcát. Respekt. Zápornej."},
 {z:"Výběrčí má truhlu u vchodu do podzemí pod radnicí. Uvnitř: vyrovnání 3416. Nahoru, ale jinudy."},

 // CESTOU 8→9
 {sys:"Cestou · Čs. armády → Pražská"},
 {z:"Po Čs. armády dolů ke Křižíkovu, doleva Palackého, rovně Pražskou na Žižkovo náměstí. Asi 12 minut. Cestou dvě krátké zastávky."},
 {z:"Palackého, dům naproti divadlu (bonet OBUV): tmavá deska s reliéfem hradeb."},
 {quick:["Vidíme desku s branou"],id:"n8a"},
 {z:"Nové brány. Stály stovky let, dneska po nich nic. Přísahám — tyhle jsem nerozbil. Jen století. A dluh u Rolanda."},
 {z:"Dál Pražskou — dům s kosočtvercovým vzorem, v kamenné desce dělová koule."},
 {quick:["Vidíme kouli ve zdi"],id:"n8b"},
 {z:"Tu kouli nechali Švédové. Výběrčí by to stejně hodil na mě. Klasika PR."},
 {z:"Rovně přes náměstí ke Staré radnici. Před Škochovým domem je v dlažbě plánek z kostek — červené ukazují chodby. Ke vchodu do podzemí. Dovnitř ne."},

 // STANICE 9 — finále: truhla splatí Rolandovi 3416 → past praskne → brána domů
 {sys:"Stanice 9 / 9 · Finále"},
 {quick:["Jsme u vchodu do podzemí"],id:"n9"},
 {z:"Tady. Výběrčí tu má truhlu. Uvnitř vyrovnání 3416. Zaplatíme — past praskne — jdu domů."},
 {z:"Zámek chce celou cestu. Popořadě. Domů se nechodí nazdařbůh — a Roland nebere složenky."},
 {z:"Poskládejte, kudy jsme šli. Od nůžek po ryby. To je mapa k platbě."},
 {task:"t9"},
 {unlock:9},
 {z:"🧰 Truhla se otevřela. Uvnitř: vyrovnání 3416. Rolandovi zaplaceno. Past pryč. Teď je truhla prázdná. To je feature."},
 {z:"🎙️ Hotovo. Dluh pryč. Past pryč. Tohle je brána. Cesta domů. Stopa smazaná, účet vyrovnaný. Férový obchod."},
 {z:"Co se stalo v Táboře, zůstává v Táboře. Já jdu zpátky do svýho času. Vy zůstaňte v tomhle. Díky, roto."},
 {z:"Jednu fotku si udělejte. Tu jedinou, co smí ven. Důkaz, že jste vrátili velitele — a splatili Rolandovi. 📸"},
 {task:"t9s"},
 {z:"Rámeček: KUMPÁNI · Cesta zpátky · Tábor · dnes"},
 {z:"🎙️ A příště — až někoho jinýho chytí dluh napříč stoletím — platíte vy. Já už budu doma."},
 {sys:"Konec · 9/9"},
 {finale:true}
];

const TASKS={
 t1:{title:"Rolandův účet",lbl:"Stopa cesty",
   brief:"Na vnější stěně nádrže kašny jsou dva letopočty — Rolandův účet. Najděte je (vidět / nahmatat) a sečtěte. To je, kolik dlužím.",
   ask:"Kolik dlužím Rolandovi?",
   ph:"Částka",
   kind:"word",answers:["3416"],
   near:{
     "1568":"To je jen první řádek účtu. Najděte druhý letopočet.",
     "1848":"Oprava sama nestačí. Roland účtuje i stavbu.",
     "3415":"Blízko. Zkontrolujte součet obou letopočtů.",
     "1567":"1567 je začátek práce, ne letopočet na účtu."
   },
   hints:[
     "Starý rok nahoře, oprava pod ním. Sáhněte — nebo boční světlo.",
     "Dva letopočty na vnější stěně nádrže. Sečtěte je dohromady.",
     "1568 + 1848."
   ]
 },
 t2:{title:"Co jsem prohrál?",lbl:"Stopa cesty",
   brief:"Na fasádě Škochova domu jsou namalované nůžky (pod druhým oknem v 1. patře, nad restaurací). Ty nůžky jsou klíč k mřížce — ne trivia.",
   howto:"Přiložte mřížku podle namalovaných nůžek: nastavte, kde mají očka. Čtěte po čepelích od oček ke hrotům — nejdřív levá, pak pravá. Písmeno uprostřed, kde se čepele kříží, jen jednou.",
   kind:"grid",grid:["JTAMR","BESUL","PHDIA","VKZNC","YSLEO"],answers:["JEDNORUKY"],
   near:{JEDNO:"To je jen jedna čepel. Nůžky mají dvě.",RUKY:"Druhá čepel sedí. Kde je první?",RUDKY:"Prostřední písmeno, kde se čepele kříží, čtěte jen jednou.",JEDNORUDKY:"Skoro! Písmeno uprostřed jen jednou."},
   hints:["Nůžky jsou namalované, ne kovové. Najdete je nad vchodem do restaurace, v 1. patře.","Očka mají nahoře, hroty dole. Dejte „očka nahoře“ a čtěte po zlatých čarách.","Levá čepel: J-E-D-N-O. Pravá: R-U-(D)-K-Y."]
 },
 t3:{title:"Posunutá zpráva",lbl:"Stopa cesty",
   brief:"Jednoruký na věži = klíč. Spočítejte čísla (24 nahoře). Otočte prstenec písmen o tolik míst, srovnejte abecedu a přepište šifru sem.",
   ask:"Šifra z kapsy — otočte prstenec a přepište rozluštěný text",
   cipher:"MBCQJG ZPYLMS",
   kind:"wheel",answers:["ODESLIBRANOU"],
   near:{ODESLI:"První slovo máte. Kudy?",BRANOU:"Druhé sedí. Co bylo předtím?",MBCQJG:"To je ještě šifra. Otočte prstenec a přečtěte sami.",ZPYLMS:"To je druhá půlka šifry. Rozluštěte celou zprávu.",24:"Klíč sedí. Teď podle abecedy přepište šifru.",12:"Na normálních hodinách jo. Tenhle jednoruký jich má víc.",2:"Posun o 2 zpátky sedí. Ale kolik čísel má jednoruký?"},
   hints:["Jednoruký má 24 hodin, ne 12. O tolik posuňte abecedu.","Nastavte posun na 24. Řádek šifra → text. Tajenku sem napište sami.","První slovo je sloveso v minulém čase, druhé říká, kudy."]
 },
 t4:{title:"Šablona portálu",lbl:"Stopa cesty",
   brief:"Hlavní portál Staré radnice (pod hodinami). Šablona má dva svislé průzory = ostění. Přiložte k kameni — nehádejte z gauče.",
   howto:"Horní oblouk šablony = oblouk portálu. Znak v tympanonu = nahoře. Čtěte levý průzor shora dolů, pak pravý. Písmena v průzorech složí slovo.",
   kind:"grid",overlay:"portal",okOri:"up",
   segs:[["up","znak nahoře"],["down","znak dole"],["left","znak vlevo"],["right","znak vpravo"]],
   grid:["PKRCT","ULAEV","WIBMX","YODFG","HNSZQ"],
   answers:["KLICEM"],
   near:{KLIC:"Skoro — dočtěte i pravý průzor.",KLICEMR:"To je moc. Jen průzory, nic kolem.",PORTAL:"Portál je klíč, ne odpověď. Čtěte písmena v šabloně.",KLICE:"Chybí poslední písmeno z pravého průzoru."},
   hints:["Stůjte čelem k hlavnímu vchodu radnice, ne k věži z boku.","Znak musí být nahoře — jinak čtete blbost.","Levý průzor: K-L-I. Pravý: C-E-M."]
 },
 t5:{title:"Útržek + konzola",lbl:"Stopa cesty",
   brief:"Útržek v chatu má kraje P L · · · A. Prostřední tři znaky jsou na kované konzole v uličce u radnice — jen na straně, která hledí k náměstí.",
   ask:"Jaké slovo vznikne?",
   ph:"Slovo z útržku",
   kind:"word",answers:["PLATBA"],
   near:{
     PLATA:"Chybí prostředek z konzoly.",
     ATB:"To je jen prostředek. Spojte s útržkem.",
     PLA:"Málo. Celé slovo z kraje + konzoly.",
     PLATBY:"Číslo účtu je 3416 — tady chceme slovo v 1. pádě.",
     PLATBAH:"Bez háčků a bez ocásků. Šest písmen."
   },
   hints:["Konzola pod oknem 1. patra, ulička u radnice (k Pražské).","Hleďte na stranu ke náměstí — ne do dvora.","Útržek P L _ _ _ A + tři znaky z konzoly = platba."]
 },
 t6:{title:"Svatozář z vázy",lbl:"Pozice + čest",
   brief:"Postavte se do oblouku tak, aby kamenná váza na střeše byla přesně nad hlavou jednoho z vás. Jako svatozář. Vyfoťte. Potvrzuje se na čest.",
   kind:"honor",confirm:"Stojíme pod vázou ✓",
   hints:["Z Žižkova náměstí k Mariánské — uličkou kolem kostela, ne Klokotskou.","Hledejte světlý oblouk s břečťanem a vázou nahoře.","Vstup do zeleně / parku — váza jak kopeček zmrzliny."]
 },
 t7:{title:"Voda do kopce",lbl:"Nález + čest",
   brief:"Najděte pítko — místo, odkud stříká voda vzhůru. Jeden se napije, ostatní ho vyfotí jako důkaz pro výběrčího (záloha na 3416).",
   kind:"honor",confirm:"Napili jsme se, voda šla nahoru ✓",
   secondary:{label:"Pítko neteče →",task:"t7b"},
   hints:["Voda „do kopce“ = voda, co stříká vzhůru.","Nehledejte velkou kašnu, hledejte něco menšího, z čeho se pije.","Pítko u kašny na Tržním náměstí."]
 },
 t7b:{title:"Věž, co tahala vodu",lbl:"Záloha",
   brief:"Pítko neteče? Tak jinak: kterou věž tu kdysi postavili, aby tahala vodu do kopce?",
   kind:"choice",
   opts:[
     {k:"radnice",label:"Radniční věž s hodinami"},
     {k:"vodarenska",label:"Vodárenská věž na kraji Tržního"},
     {k:"kotnov",label:"Kulatá věž Kotnov u brány"}
   ],
   ok:"vodarenska",
   bad:{radnice:"Tahle měřila čas, ne vodu.",kotnov:"Tahle hlídala bránu."},
   hints:["Hledejte věž přímo na Tržním náměstí.","Není to radnice ani Kotnov.","Vodárenská věž."]
 },
 t8:{title:"Úhel na hrázi",lbl:"Poloha",
   brief:"Noční referenci ještě nemáme. Vyberte popis místa, odkud výběrčí bral stopu — čelem k vodě u zábradlí.",
   kind:"choice",
   opts:[
     {k:"zady",label:"Stojím zády k vodě (hledím do údolí)"},
     {k:"celem",label:"Stojím čelem k vodě u zábradlí"},
     {k:"schody",label:"Stojím na schodech u vodopádu"}
   ],
   ok:"celem",
   bad:{zady:"Pak byste viděli údolí, ne hladinu.",schody:"Ze schodů hladinu skoro nevidíte."},
   hints:["Hledejte místo s výhledem na velkou vodu.","Obzor ve výšce očí, u zábradlí.","Čelem k vodě."]
 },
 t9:{title:"Poskládejte cestu",lbl:"Finále · brána",
   brief:"Seřaďte karty v pořadí, kudy jsme šli — mapa k truhle s 3416. Od nůžek po ryby.",
   kind:"sort",
   cards:[
     {k:"nuzky",t:"Sázka o rukáv",e:"✂️"},
     {k:"orloj",t:"Posunutý čas",e:"🕛"},
     {k:"portal",t:"Klíčem u portálu",e:"🔑"},
     {k:"platba",t:"Útržek + konzola",e:"🧾"},
     {k:"vaza",t:"Svatozář z vázy",e:"👑"},
     {k:"pitko",t:"Voda do kopce",e:"⛲"},
     {k:"hraz",t:"Ryby na palcát",e:"🎣"}
   ],
   order:["nuzky","orloj","portal","platba","vaza","pitko","hraz"],
   hints:["Pořadí cesty = pořadí, v jakém jste dneska chodili.","Začíná se u nůžek a končí u vody.","Po hodinách je portál, po portálu konzola, pak váza."]
 },
 t9s:{title:"Selfie KUMPÁNI",lbl:"Jediná fotka ven",
   brief:"Všichni do záběru. Rámeček: KUMPÁNI · Cesta zpátky · Tábor · dnes",
   kind:"honor",confirm:"Máme selfie ✓",
   hints:["Stačí jedna fotka celé party.","Rámeček si domyslete — nebo ho připište do Stories.","Přísaha nahlas je volitelná, ale slušnost."]
 }
};

/* ---------- stav ---------- */
let st={pos:0,won:[],q:{}};
try{const s=JSON.parse(localStorage.getItem(KEY)||"null");if(s&&typeof s.pos==="number")st=s}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
const $=s=>document.querySelector(s);
const feed=$("#feed");
const el=h=>{const t=document.createElement("template");t.innerHTML=h.trim();return t.content.firstElementChild};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase().replace(/[^A-Z0-9]/g,"");
const wait=ms=>new Promise(r=>setTimeout(r,TEST?15:ms));
const into=(e,block)=>{if(e&&e.scrollIntoView)e.scrollIntoView({block:block||"end",behavior:TEST?"auto":"smooth"})};
let lastWho=null;

const WIN_TASK={1:"t1",2:"t2",3:"t3",4:"t4",5:"t5",6:"t6",7:"t7",8:"t8",9:"t9"};
function flashCard(card){
 if(!card)return;
 into(card,"start");
 card.classList.remove("jumpflash");void card.offsetWidth;card.classList.add("jumpflash");
}
/** DEV: mount a playable task card without advancing SCRIPT (for locked okénka). */
function spawnDevTask(id){
 const t=TASKS[id];if(!t)return null;
 const old=document.getElementById("card-"+id);if(old)old.remove();
 const c=taskCard(id);
 c.classList.add("dev-spawn");
 const lbl=c.querySelector(".lbl");
 if(lbl)lbl.insertAdjacentHTML("beforeend",' <span class="dev-tag">DEV</span>');
 feed.appendChild(c);lastWho=null;
 const body=c.querySelector(".body"),res=c.querySelector(".res");
 let hi=0,busy=false,done=false;
 const H={solved:()=>{if(done)return;done=true;c.querySelectorAll(".body button,.body input").forEach(b=>b.disabled=true);const hb=c.querySelector(".btn.ghost.sm");if(hb)hb.remove();res.className="res good";res.textContent="✓ Správně! (DEV)"},
  bad:async msg=>{c.classList.remove("shake");void c.offsetWidth;c.classList.add("shake");if(busy)return;busy=true;await zSay(msg);busy=false}};
 const hb=el(`<button class="btn ghost sm">Nevíme si rady</button>`);
 if(t.kind==="pick")pick(body,t,H);
 else if(t.kind==="word")word(body,t,H);
 else if(t.kind==="wheel")wheel(body,t,H);
 else if(t.kind==="honor")honor(body,t,H,c,hb);
 else if(t.kind==="choice")choice(body,t,H);
 else if(t.kind==="sort")sortUI(body,t,H);
 else grid(body,t,H);
 if(!c.contains(hb))c.appendChild(hb);
 hb.onclick=async()=>{if(hi<(t.hints||[]).length){const h=t.hints[hi++];if(hi>=t.hints.length)hb.disabled=true;await zSay(h)}};
 flashCard(c);
 return c;
}
function jumpToStation(n){
 const tid=WIN_TASK[n];
 let card=tid&&document.getElementById("card-"+tid);
 if(card){flashCard(card);return true}
 if(DEV&&tid&&TASKS[tid]){spawnDevTask(tid);return true}
 const info=NIGHT[n];
 if(info&&info.img)openModal(info.img,info.t);
 else if(info)openModal("",info.t);
 return false;
}
function renderWindows(pop){
 const w=$("#windows");let h="";
 for(let i=1;i<=9;i++){
  const on=st.won.includes(i),n=NIGHT[i],has=n&&n.img;
  const clickable=DEV||on;
  if(clickable){
   const cls=`win on${DEV&&!on?" dev":""}${pop===i?" new":""}${!has?" lit":""}`;
   const label=DEV&&!on?`Okénko ${i} — DEV skok`:`Okénko ${i} — skok na úkol`;
   h+=has?`<button class="${cls}" data-n="${i}" aria-label="${label}"><img src="${n.img}" alt=""></button>`:`<button class="${cls}" data-n="${i}" aria-label="${label}">${i}</button>`;
  }else h+=`<div class="win">${i}</div>`;
 }
 const done=st.won.includes(9);
 h+=done?`<div class="win fin open" title="Finále">✓</div>`:`<div class="win fin" title="Finále"><i class="lock"></i></div>`;
 w.innerHTML=h;$("#count").textContent=st.won.length;
 const badge=$("#devBadge");if(badge)badge.classList.toggle("hide",!DEV);
 if(DEV)document.body.classList.add("dev-mode");
 w.querySelectorAll(".win.on").forEach(b=>b.onclick=()=>jumpToStation(+b.dataset.n));
 const nw=w.querySelector(".win.new");if(nw){void nw.offsetWidth;requestAnimationFrame(()=>requestAnimationFrame(()=>nw.classList.remove("new")))}
}
function openModal(src,txt){
 const img=$("#modal img");
 if(src){img.src=src;img.classList.remove("hide")}else{img.removeAttribute("src");img.classList.add("hide")}
 $("#modal p").textContent=txt;$("#modal").classList.remove("hide");
}

function addRow(who,inner){
 const me=who==="me";
 if(!me&&lastWho==="z"){const prev=[...feed.querySelectorAll(".row:not(.me) .av")].slice(-1)[0];if(prev)prev.classList.add("ghost")}
 const r=el(`<div class="row${me?" me":""}">${me?"":AV_MARK}</div>`);
 r.appendChild(typeof inner==="string"?el(inner):inner);
 feed.appendChild(r);lastWho=me?"me":"z";into(r,"end");return r;
}
function sys(t){const e=el(`<div class="sys${/^Stanice|^Konec|^Cestou/.test(t)?" st":""}"><span>${esc(t)}</span></div>`);feed.appendChild(e);lastWho=null;into(e,"end")}
async function typing(len){
 $("#status").textContent="píše…";$("#status").className="typing-on";
 const ty=el(`<div class="typing">Žižka píše…</div>`);feed.appendChild(ty);into(ty,"end");
 await wait(Math.min(1500,300+len*14));ty.remove();
 $("#status").textContent="online";$("#status").className="";
}
const after=()=>wait(350);
const zSay=async(t,instant)=>{if(!instant)await typing(t.length);addRow("z",`<div class="bub z">${esc(t)}</div>`);if(!instant)await after()};
const meSay=t=>addRow("me",`<div class="bub">${esc(t)}</div>`);

/* ---------- kroky ---------- */
async function step(s,instant){
 if(s.sys)return sys(s.sys);
 if(s.z)return zSay(s.z,instant);
 if(s.pic){if(!instant)await typing(60);addRow("z",`<div class="pic"><div class="who2"></div><img src="${s.pic}" alt=""><div class="cap">${esc(s.cap)}</div></div>`);if(!instant)await after();return}
 if(s.receipt){if(!instant)await typing(60);addRow("z",`<div class="receipt">${s.receipt}</div>`);if(!instant)await after();return}
 if(s.fwd){if(!instant)await typing(60);addRow("z",`<div class="fwd"><div class="fh">↪ ${esc(s.fwd.h)}</div><div class="fb">${esc(s.fwd.b)}</div></div>`);if(!instant)await after();return}
 if(s.quick)return quick(s,instant);
 if(s.nav)return nav(s,instant);
 if(s.task)return task(s.task,instant);
 if(s.unlock)return unlock(s.unlock,instant);
 if(s.locked)return locked();
 if(s.finale)return finaleCard();
}
function quick(s,instant){
 if(instant){meSay(st.q[s.id]||s.quick[0]);return}
 return new Promise(res=>{const q=el(`<div class="quick">${s.quick.map(o=>`<button class="btn ghost">${esc(o)}</button>`).join("")}</div>`);feed.appendChild(q);into(q,"end");
  q.querySelectorAll("button").forEach(b=>b.onclick=async()=>{q.remove();st.q[s.id]=b.textContent;meSay(b.textContent);
   if(b.textContent.startsWith("Proč"))await zSay("Protože jste online a já dlužím. Já velím týhle směně. Kdo jde, jde. Kdo se ptá — přičtu vás k účtu. ⚔️");res()})});
}
function nav(s,instant){
 const n=s.nav,go=n.go||"Jsme tady";
 const c=el(`<div class="card nav"><div class="lbl"><i class="dot"></i>Kam teď</div><h3>${esc(n.title)}</h3><div class="kv">${n.rows.map(([k,v])=>`<b>${esc(k)}</b><span>${esc(v)}</span>`).join("")}</div>${n.img?`<img class="ph" src="${n.img}" alt="">`:""}</div>`);
 feed.appendChild(c);lastWho=null;
 if(instant){meSay(go);return}
 return new Promise(res=>{const b=el(`<button class="btn">${esc(go)}</button>`);c.appendChild(b);into(c,"start");b.onclick=()=>{b.remove();meSay(go);res()}});
}
function taskCard(id){
 const t=TASKS[id];
 const showCipher=t.cipher&&t.kind!=="wheel";
 const body=t.brief
  ?`<p class="brief">${esc(t.brief)}</p>${t.ask?`<p class="ask">${esc(t.ask)}</p>`:""}${showCipher?`<div class="cipher">${esc(t.cipher)}</div>`:""}`
  :(t.rows?`<div class="kv">${t.rows.map(([k,v])=>`<b>${esc(k)}</b><span>${esc(v)}</span>`).join("")}</div>`:"");
 return el(`<div class="card task" id="card-${id}"><div class="lbl"><i class="dot"></i>${esc(t.lbl||"Karta úkolu")}</div><h3>${esc(t.title)}</h3>${body}<div class="body"></div><div class="res"></div></div>`);
}
function task(id,instant){
 const t=TASKS[id],c=taskCard(id),body=c.querySelector(".body"),res=c.querySelector(".res");
 feed.appendChild(c);lastWho=null;
 if(instant){res.className="res small";res.textContent="✓ Vyřešeno";return}
 into(c,"start");
 return new Promise(res2=>{
  let hi=0,busy=false,done=false;
  const H={solved:()=>{if(done)return;done=true;c.querySelectorAll(".body button,.body input").forEach(b=>b.disabled=true);hb.remove();res.className="res good";res.textContent="✓ Správně!";res2()},
   bad:async msg=>{c.classList.remove("shake");void c.offsetWidth;c.classList.add("shake");if(busy)return;busy=true;await zSay(msg);busy=false}};
  const hb=el(`<button class="btn ghost sm">Nevíme si rady</button>`);
  if(t.kind==="pick")pick(body,t,H);
  else if(t.kind==="word")word(body,t,H);
  else if(t.kind==="wheel")wheel(body,t,H);
  else if(t.kind==="honor")honor(body,t,H,c,hb);
  else if(t.kind==="choice")choice(body,t,H);
  else if(t.kind==="sort")sortUI(body,t,H);
  else grid(body,t,H);
  if(t.kind!=="honor"||!t.secondary)c.appendChild(hb);
  else{/* honor with secondary still gets hints */}
  if(!c.contains(hb))c.appendChild(hb);
  hb.onclick=async()=>{if(hi<t.hints.length){const h=t.hints[hi++];if(hi>=t.hints.length)hb.disabled=true;await zSay(h)}};
 });
}
function pick(body,t,H){
 let sel=null;
 body.innerHTML=`<div class="opts">${t.opts.map(([k,src])=>`<button class="opt" data-k="${k}"><img src="${src}" alt="Fotka ${k}"><b>${k}</b></button>`).join("")}</div><button class="btn" disabled>Vyberte fotku</button>`;
 const go=body.querySelector(".btn");
 body.querySelectorAll(".opt").forEach(o=>o.onclick=()=>{sel=o.dataset.k;body.querySelectorAll(".opt").forEach(x=>{x.classList.remove("bad");x.classList.toggle("sel",x===o)});go.disabled=false;go.textContent=`Zadat kód ${sel}`});
 go.onclick=()=>{if(!sel)return;const o=body.querySelector(`.opt[data-k="${sel}"]`);meSay(`Kód ${sel}`);if(sel===t.ok){o.classList.add("good");H.solved()}else{o.classList.remove("bad");void o.offsetWidth;o.classList.add("bad");H.bad(t.bad[sel])}};
}
function word(body,t,H){
 body.innerHTML=`<div class="inrow"><input type="text" placeholder="${esc(t.ph||"Heslo z noci")}" inputmode="${t.answers&&/^[0-9]+$/.test(t.answers[0])?"numeric":"text"}" autocomplete="off" autocapitalize="characters" spellcheck="false"><button class="btn">Zadat</button></div>`;
 const inp=body.querySelector("input");
 const send=()=>{const raw=inp.value.trim();if(!raw)return;const n=norm(raw);meSay(raw.toUpperCase());inp.value="";
  if(t.answers.includes(n))return H.solved();
  if(t.near&&t.near[n])return H.bad(t.near[n]);
  H.bad("Tohle neznám. Koukněte znovu na stopu.")};
 body.querySelector(".inrow .btn").onclick=send;inp.onkeydown=e=>{if(e.key==="Enter")send()};
 if(!TEST)setTimeout(()=>inp.focus(),200);
}
function wheel(body,t,H){
 const A="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 const cipher=t.cipher||"";
 const STEP=360/26;
 /* Caesar 0–25; key = 24. Start at 0. */
 let k=0,angle=0;
 const letters=Array.from(A).map((ch,i)=>`<span class="lr-let" style="--a:${(i/26)*360}deg">${ch}</span>`).join("");
 body.innerHTML=`<div class="wheel-sticky">
  <div class="cipher-src"><span>Šifra</span><b>${esc(cipher)}</b></div>
  <p class="wheel-lab">Potáhněte prstenec písmen (nebo ↺↻). Posun = číslo z věže. Tajenku napište sem — nikam se sama nevypíše.</p>
 </div>
  <div class="letter-ring" aria-label="Prstenec písmen A–Z">
   <div class="lr-face" tabindex="0">
    <div class="lr-mark" title="čti zde"></div>
    <div class="lr-rotor" style="transform:rotate(0deg)">${letters}</div>
    <div class="lr-hub"><span class="kk">0</span><small>posun</small></div>
   </div>
  </div>
  <div class="wheel-ctrl"><button type="button" class="btn sec wheel-m" aria-label="Otočit proti směru">↺</button><div class="wheel-k"><span class="kk2">0</span><small>posun</small></div><button type="button" class="btn sec wheel-p" aria-label="Otočit po směru">↻</button></div>
  <div class="alpha-map"><div class="am-row"><span class="am-lab">šifra</span><b class="am-ciph">${A}</b></div><div class="am-row"><span class="am-lab">text</span><b class="am-plain"></b></div></div>
  <div class="inrow wheel-answer"><input type="text" placeholder="Rozluštěný text" autocomplete="off" autocapitalize="characters" spellcheck="false" enterkeyhint="done"><button class="btn">Zadat</button></div>`;
 const face=body.querySelector(".lr-face");
 const rotor=body.querySelector(".lr-rotor");
 const kk=body.querySelector(".lr-hub .kk");
 const kk2=body.querySelector(".kk2");
 const plain=body.querySelector(".am-plain");
 const sticky=body.querySelector(".wheel-sticky");
 const card=body.closest(".card.task");
 const applyMap=nk=>{
  plain.textContent=[...A].map((_,i)=>A[(i-nk+260)%26]).join("");
  kk.textContent=String(nk);kk2.textContent=String(nk);
 };
 const setK=(nk,animate)=>{
  k=((nk%26)+26)%26;angle=-k*STEP;
  rotor.style.transition=animate?"transform .18s ease":"none";
  rotor.style.transform=`rotate(${angle}deg)`;applyMap(k);
 };
 const angOf=e=>{
  const r=face.getBoundingClientRect();
  const cx=r.left+r.width/2,cy=r.top+r.height/2;
  const pt=(e.touches&&e.touches[0])||(e.changedTouches&&e.changedTouches[0])||e;
  return Math.atan2(pt.clientY-cy,pt.clientX-cx)*180/Math.PI;
 };
 let dragging=false,lastAng=0,baseAngle=0;
 const onDown=e=>{
  dragging=true;
  if(face.setPointerCapture&&e.pointerId!=null){try{face.setPointerCapture(e.pointerId)}catch(_){}}
  lastAng=angOf(e);baseAngle=angle;rotor.style.transition="none";e.preventDefault();
 };
 const onMove=e=>{
  if(!dragging)return;
  let a=angOf(e),d=a-lastAng;
  while(d>180)d-=360;while(d<-180)d+=360;
  lastAng=a;baseAngle+=d;angle=baseAngle;
  rotor.style.transform=`rotate(${angle}deg)`;
  applyMap(((Math.round(-angle/STEP)%26)+26)%26);
  e.preventDefault();
 };
 const onUp=()=>{if(!dragging)return;dragging=false;setK(Math.round(-angle/STEP),true)};
 face.addEventListener("pointerdown",onDown,{passive:false});
 face.addEventListener("pointermove",onMove,{passive:false});
 face.addEventListener("pointerup",onUp);
 face.addEventListener("pointercancel",onUp);
 face.addEventListener("touchstart",onDown,{passive:false});
 face.addEventListener("touchmove",onMove,{passive:false});
 face.addEventListener("touchend",onUp);
 face.addEventListener("touchcancel",onUp);
 body.querySelector(".wheel-m").onclick=()=>setK(k-1,true);
 body.querySelector(".wheel-p").onclick=()=>setK(k+1,true);
 setK(0,false);
 const inp=body.querySelector(".wheel-answer input");
 /* Keep šifra visible above keyboard: sticky + scroll card so sticky sits under header */
 const pinCipher=()=>{
  if(card)card.classList.add("cipher-focus");
  sticky.classList.add("pinned");
  requestAnimationFrame(()=>{
   const nb=$(".top");
   const top=(nb?nb.getBoundingClientRect().bottom:0)+6;
   sticky.style.top=top+"px";
   sticky.scrollIntoView({block:"start",behavior:TEST?"auto":"smooth"});
  });
 };
 const unpinCipher=()=>{
  if(card)card.classList.remove("cipher-focus");
  sticky.classList.remove("pinned");
  sticky.style.top="";
 };
 inp.addEventListener("focus",pinCipher);
 inp.addEventListener("blur",()=>setTimeout(unpinCipher,150));
 const send=()=>{const raw=inp.value.trim();if(!raw)return;const n=norm(raw);meSay(raw.toUpperCase());inp.value="";
  if(t.answers.includes(n))return H.solved();
  if(t.near&&t.near[n])return H.bad(t.near[n]);
  H.bad("Tohle neznám. Otočte prstenec podle věže a přepište šifru sami.")};
 body.querySelector(".wheel-answer .btn").onclick=send;inp.onkeydown=e=>{if(e.key==="Enter")send()};
}

function honor(body,t,H,card,hb){
 let html=`<button class="btn honor-btn">${esc(t.confirm||"Potvrdit na čest ✓")}</button>`;
 if(t.secondary)html+=`<button class="btn ghost sm sec-fallback">${esc(t.secondary.label)}</button>`;
 body.innerHTML=html;
 body.querySelector(".honor-btn").onclick=()=>{meSay(t.confirm||"Hotovo");H.solved()};
 const fb=body.querySelector(".sec-fallback");
 if(fb)fb.onclick=async()=>{
  fb.disabled=true;
  meSay(t.secondary.label);
  // switch to fallback task in same card
  const t2=TASKS[t.secondary.task];
  if(!t2)return H.solved();
  card.querySelector("h3").textContent=t2.title;
  const brief=card.querySelector(".brief");if(brief)brief.textContent=t2.brief||"";
  const ask=card.querySelector(".ask");if(ask)ask.remove();
  body.innerHTML="";
  let hi=0;
  const H2={solved:H.solved,bad:H.bad};
  if(t2.kind==="choice")choice(body,t2,H2);
  else if(t2.kind==="honor")honor(body,t2,H2,card,hb);
  else if(t2.kind==="word")word(body,t2,H2);
  hb.onclick=async()=>{if(hi<(t2.hints||[]).length){const h=t2.hints[hi++];if(hi>=t2.hints.length)hb.disabled=true;await zSay(h)}};
 };
}
function choice(body,t,H){
 const hasSvg=t.opts.some(o=>o.svg);
 if(hasSvg){
  body.innerHTML=`<div class="choice-svg">${t.opts.map(o=>`<button class="copt" data-k="${esc(o.k)}"><img src="${o.svg}" alt=""><span>${esc(o.label)}</span></button>`).join("")}</div>`;
 }else{
  body.innerHTML=`<div class="choice-list">${t.opts.map(o=>`<button class="btn ghost choice-btn" data-k="${esc(o.k)}">${esc(o.label)}</button>`).join("")}</div>`;
 }
 body.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{
  const k=b.dataset.k;meSay(b.textContent.trim()||k);
  if(k===t.ok){b.classList.add("good");H.solved()}
  else{b.classList.add("bad");H.bad((t.bad&&t.bad[k])||"Ne. Zkuste jinou.")}
 });
}
function sortUI(body,t,H){
 // shuffle copy
 let order=t.cards.map(c=>c.k);
 for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]]}
 // avoid starting in correct order
 if(order.join()===t.order.join()){const x=order[0];order[0]=order[1];order[1]=x}
 const byK=Object.fromEntries(t.cards.map(c=>[c.k,c]));
 const list=el(`<div class="sort-list"></div>`);
 const render=()=>{
  list.innerHTML=order.map((k,i)=>{
   const c=byK[k];
   return `<div class="sort-item" data-k="${k}"><span class="si-e">${c.e}</span><span class="si-t">${esc(c.t)}</span><span class="si-btns"><button type="button" class="si-up" data-i="${i}" aria-label="Nahoru" ${i===0?"disabled":""}>▲</button><button type="button" class="si-dn" data-i="${i}" aria-label="Dolů" ${i===order.length-1?"disabled":""}>▼</button></span></div>`;
  }).join("");
  list.querySelectorAll(".si-up").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(i>0){[order[i-1],order[i]]=[order[i],order[i-1]];render()}});
  list.querySelectorAll(".si-dn").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(i<order.length-1){[order[i+1],order[i]]=[order[i],order[i+1]];render()}});
 };
 render();
 body.appendChild(list);
 const go=el(`<button class="btn">Zamknout pořadí</button>`);
 body.appendChild(go);
 go.onclick=()=>{
  meSay(order.map(k=>byK[k].t).join(" → "));
  if(order.join()===t.order.join())H.solved();
  else H.bad("Tohle pořadí by nedal ani krčmář. Zkuste to znova.");
 };
}
function grid(body,t,H){
 const segs=t.segs||[["up","očka nahoře"],["down","očka dole"],["left","očka vlevo"],["right","očka vpravo"]];
 const okOri=t.okOri||"up";
 const overlay=t.overlay||"scissors";
 body.innerHTML=`<p class="howto">${esc(t.howto)}</p><div class="gridwrap"><video class="hide" muted playsinline></video><svg viewBox="0 0 250 250"></svg></div>
  <div class="segs">${segs.map(([k,l])=>`<button data-o="${k}">${esc(l)}</button>`).join("")}</div>
  <button class="btn sec sm cam">Položit šablonu přes kameru</button>
  <div class="inrow"><input type="text" placeholder="Slovo" autocomplete="off" autocapitalize="characters" spellcheck="false"><button class="btn">Zadat</button></div>`;
 const svg=body.querySelector("svg"),v=body.querySelector("video");let o=null,cam=false;
 const drawOverlay=()=>{
  if(!o)return"";
  if(overlay==="portal"){
   const flip=o==="down",side=o==="left"||o==="right";
   let g=`<g stroke="#ff9a3c" stroke-width="5" fill="none" opacity=".75">`;
   if(!side){
    const yArc=flip?180:70,ySlot=flip?40:115,sgn=flip?1:-1;
    g+=`<path d="M40 ${flip?90:210} V${yArc+40} Q125 ${yArc} 210 ${yArc+40} V${flip?90:210}"/>`;
    g+=`<circle cx="125" cy="${flip?200:70}" r="12"/>`;
    g+=`<rect x="55" y="${ySlot}" width="40" height="100" fill="rgba(34,211,238,.12)" stroke="#22d3ee" stroke-width="3"/>`;
    g+=`<rect x="155" y="${ySlot}" width="40" height="100" fill="rgba(34,211,238,.12)" stroke="#22d3ee" stroke-width="3"/>`;
   }else{
    /* wrong side: rotate slots visually to hint mismatch */
    g+=`<rect x="20" y="55" width="100" height="40" fill="rgba(34,211,238,.12)" stroke="#22d3ee" stroke-width="3"/>`;
    g+=`<rect x="20" y="155" width="100" height="40" fill="rgba(34,211,238,.12)" stroke="#22d3ee" stroke-width="3"/>`;
    g+=`<path d="M140 40 H210 Q230 125 210 210 H140"/>`;
   }
   return g+`</g>`;
  }
  const P={TL:[25,25],TR:[225,25],BL:[25,225],BR:[225,225]},rings={up:["TL","TR"],down:["BL","BR"],left:["TL","BL"],right:["TR","BR"]}[o];
  let s=`<g stroke="#ff9a3c" stroke-width="9" stroke-linecap="round" opacity=".45"><line x1="25" y1="25" x2="225" y2="225"/><line x1="225" y1="25" x2="25" y2="225"/></g>`;
  rings.forEach(k=>{const [a,b]=P[k];s+=`<circle cx="${a}" cy="${b}" r="22" fill="none" stroke="#ff9a3c" stroke-width="5"/>`});
  return s;
 };
 const draw=()=>{let s=cam?`<rect width="250" height="250" fill="rgba(0,0,0,.25)"/>`:"";
  s+=drawOverlay();
  for(let r=0;r<5;r++)for(let k=0;k<5;k++)s+=`<text x="${25+k*50}" y="${34+r*50}" text-anchor="middle" font-family="JetBrains Mono,ui-monospace,monospace" font-weight="700" font-size="25" fill="#e8fbff" stroke="#000" stroke-width="${cam?2.5:0}" paint-order="stroke">${t.grid[r][k]}</text>`;
  svg.innerHTML=s};
 draw();
 body.querySelectorAll(".segs button").forEach(b=>b.onclick=()=>{o=b.dataset.o;body.querySelectorAll(".segs button").forEach(y=>y.classList.toggle("on",y===b));draw()});
 body.querySelector(".cam").onclick=async e=>{
  try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw new Error("x");
   v.srcObject=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"},audio:false});await v.play();v.classList.remove("hide");cam=true;draw();e.target.remove()}
  catch(err){e.target.textContent="Kamera nejde, stačí šablona nahoře";e.target.disabled=true}};
 const badDefault=overlay==="portal"
  ?"Tohle slovo neznám. Čtěte levý průzor shora dolů, pak pravý."
  :"Tohle slovo neznám. Čtěte po čepelích od oček ke hrotům.";
 const badOriMsg=overlay==="portal"
  ?"Nesedí. Znak v tympanonu má být nahoře — otočte šablonu."
  :"Nesedí. Podívejte se znovu, kde mají nůžky na zdi očka.";
 const inp=body.querySelector("input"),send=()=>{const n=norm(inp.value);if(!n)return;meSay(inp.value.trim().toUpperCase());inp.value="";
  if(t.answers.includes(n))return H.solved();if(t.near&&t.near[n])return H.bad(t.near[n]);H.bad(o&&o!==okOri?badOriMsg:badDefault)};
 body.querySelector(".inrow .btn").onclick=send;inp.onkeydown=e=>{if(e.key==="Enter")send()};
}
async function unlock(n,instant){
 if(!st.won.includes(n))st.won.push(n);
 renderWindows(instant?0:n);
 const info=NIGHT[n]||{t:`Okénko ${n}`,img:""};
 const place=info.t.includes(" · ")?info.t.split(" · ").slice(2).join(" · "):info.t;
 const ts=info.t.includes(" · ")?info.t.split(" · ")[1]:"";
 const shot=info.img
  ?`<div class="shot"><img src="${info.img}" alt=""><span class="ts">${esc(ts)}</span></div>`
  :`<div class="shot empty"><span class="ts">${esc(ts||"odemčeno")}</span><b>Okénko ${n}</b></div>`;
 const c=el(`<div class="card unlock"><div class="lbl"><i class="dot"></i>Okénko ${n}/9 odemčeno</div><div class="big">${esc(place)}</div>${shot}</div>`);
 feed.appendChild(c);lastWho=null;
 if(!instant){into(c,"start");await wait(900)}
}
function locked(){
 const c=el(`<div class="card locked cliff">
  <div class="ic"><i class="lock big"></i></div>
  <h3>Další okénka zamčená</h3>
  <p class="cliff-lead">Ukázka končí.</p>
 </div>`);
 feed.appendChild(c);
 const b=el(`<button class="btn sec">Zahrát znovu</button>`);b.onclick=reset;feed.appendChild(b);lastWho=null;into(c,"start");
}
function finaleCard(){
 const c=el(`<div class="card finale">
  <div class="lbl"><i class="dot"></i>Hotovo</div>
  <h3>Cesta zpátky<br>je otevřená</h3>
  <p class="finale-lead">9 okének. Truhla splatila 3416 Rolandovi. Past praskla, brána domů otevřená. Žižka jde zpátky. Vy zůstaňte.</p>
  <p class="finale-note">Díky za playtest · demo2 r25d</p>
 </div>`);
 feed.appendChild(c);
 const b=el(`<button class="btn sec">Zahrát znovu</button>`);b.onclick=reset;feed.appendChild(b);lastWho=null;into(c,"start");
}

/* ---------- běh ---------- */
async function run(){
 for(let i=0;i<st.pos;i++)await step(SCRIPT[i],true);
 while(st.pos<SCRIPT.length){await step(SCRIPT[st.pos],false);st.pos++;save()}
}
function reset(){try{localStorage.removeItem(KEY)}catch(e){}location.reload()}
function start(){$("#splash").classList.add("hide");$("#app").classList.remove("hide");if(DEV)document.body.classList.add("dev-mode");renderWindows();run()}
$("#startBtn").onclick=()=>{st.started=true;save();start()};
$("#modalClose").onclick=()=>$("#modal").classList.add("hide");
$("#menuBtn").onclick=()=>$("#menu").classList.remove("hide");
$("#menuClose").onclick=()=>$("#menu").classList.add("hide");
$("#resetBtn").onclick=reset;
if(DEV){const ds=$("#devSplash");if(ds)ds.classList.remove("hide")}
if(st.started)start();
