"use strict";
/* Ukázka: plná trasa 9 stanic. r17 — Žižka v 2026 vizuály (SV-film modern Tábor) */
const TEST=/[?&]test=1/.test(location.search);
const KEY="tabor-demo2-r17";
const IMG="assets/img/";
const AV_MARK=`<img class="av" src="assets/img/zizka-avatar.jpg" alt="" width="28" height="28">`;
const NIGHT={
 1:{img:IMG+"kasna-tabor-mobile.jpg",t:"Okénko 1 · 02:14 · Kašna"},
 2:{img:IMG+"skoch-fasada.jpg",t:"Okénko 2 · 02:47 · Škochův dům"},
 3:{img:IMG+"orloj-placeholder.svg",t:"Okénko 3 · 03:05 · Orloj"},
 4:{t:"Okénko 4 · 03:22 · Bechyňská brána"},
 5:{t:"Okénko 5 · 03:41 · Okno u rozcestníku"},
 6:{img:IMG+"marianska-placeholder.svg",t:"Okénko 6 · 03:55 · Mariánská brána"},
 7:{t:"Okénko 7 · 04:18 · Tržní pítko"},
 8:{t:"Okénko 8 · 04:40 · Hráz Jordánu"},
 9:{t:"Okénko 9 · 05:02 · Truhla"}
};

const SCRIPT=[
 // ÚVOD — frame: Žižka uvízl v Táboře 2026, hráči hledají cestu zpět
 {sys:"Čtvrtek · 6:40 · Tábor 2026"},
 {pic:IMG+"zizka-hero-mobile.jpg",cap:"Žižka · Tábor · 2026"},
 {z:"Lidi. Jste vzhůru?"},
 {z:"Probudil jsem se u kašny na náměstí. Na zemi. 🫠"},
 {pic:IMG+"kasna-tabor-mobile.jpg",cap:"Žižkovo náměstí · kašna · Tábor"},
 {z:"Mám na sobě cizí plášť. Je mi malej. A v kapse tohle:"},
 {receipt:`<h4>KRČMA · ÚČET č. 1419</h4><div class="l"><span>Pivo 0,5</span><span>38×</span></div><div class="l"><span>Nakládaný hermelín</span><span>4×</span></div><div class="l"><span>Škoda na majetku</span><span>1×</span></div><div class="l tot"><span>CELKEM</span><span>2 474 Kč</span></div><div class="scr">zaplatí Žižka ♥</div>`},
 {z:"38 piv. Já. V mým století tohle neexistovalo."},
 {z:"Ulice znám. A zároveň ne. Na věži píšou rok 2026. Já sem nepatřím."},
 {z:"Potřebuju cestu zpátky. Do svýho času. Mám 9 okének — místa, kudy jsem bloudil. Viz nahoře ⬆️ Najdete je, než se trhlina zavře?"},
 {quick:["Jasně, jdeme do toho","Proč zrovna my?"],id:"q0"},
 {z:"Díky. Na každým místě, kudy jsem šel, zůstala stopa. Každá stopa = jedno okénko."},
 {z:"Až jich bude 9, otevře se cesta domů. Začneme tam, kde jsem se probudil."},

 // STANICE 1 — kašna: účet / dluh Rolandovi (1568+1848=3416)
 {sys:"Stanice 1 / 9"},
 {z:"Jděte doprostřed Žižkova náměstí. Velká kamenná kašna — uprostřed sloup, kolem ní lem, na který si lidi sedají."},
 {z:"Kousek od ní stojí velká socha mě s palcátem. Tou kašnu nepopletete."},
 {quick:["Stojíme u kašny"],id:"n1"},
 {z:"Tady. Ráno jsem ležel vedle. V cizím plášti, co mi je malej. A s účtem za 38 piv v kapse."},
 {z:"Z tohodle století nechápu skoro nic. Jen že jsem se válel u vody a že mi je zima na jedno rameno."},
 {z:"Roland má dva letopočty a já jeden účet. Sečtěte je. Tábor neplatí — Tábor dluží."},
 {task:"t1"},
 {unlock:1},
 {z:"Okénko 1 je vaše. Kašna — tady to začalo. Dluh zapsán. První stopa zpátky."},
 {z:"Ten plášť… zkoušel jsem ho natáhnout a zjistil jsem, že mu chybí rukáv. Kam se v tomhle století ztrácejí rukávy? A kdo je krejčí, co má rád sázky? 🤔"},

 // STANICE 2 — nůžky / mřížka JEDNORUKY
 {sys:"Stanice 2 / 9"},
 {z:"Z náměstí do rohu k radniční věži. Minuta chůze."},
 {z:"Hledejte nejzdobnější dům na náměstí — nahoře vlnky do špičky jak šlehačka na dortu, dole restaurace. Stojí hned vedle radnice s hodinami."},
 {pic:IMG+"skoch-fasada.jpg",cap:"Škochův dům · fasáda"},
 {quick:["Jsme u Škocha"],id:"n2"},
 {z:"Tady se mi to trochu vrací. Bylo tu narváno a někdo mával obříma nůžkama. Asi krejčí. Asi sázka. Asi můj rukáv."},
 {z:"Na zadní straně účtenky mám tohle. Moje písmo to není."},
 {receipt:`<h4>ZADNÍ STRANA</h4><div style="font:800 20px/1.25 ui-monospace,monospace;letter-spacing:8px;text-align:center">J T A M R<br>B E S U L<br>P H D I A<br>V K Z N C<br>Y S L E O</div><div class="scr">přilož k nůžkám. prohrál jsi 😂</div>`},
 {z:"Prohrál? Co jsem prohrál?"},
 {z:"Najděte namalované nůžky na fasádě — to je klíč. Přiložte mřížku podle nich a přečtěte, co jsem prohrál."},
 {task:"t2"},
 {unlock:2},
 {z:"Sázka s krejčím: kdo prohraje, přijde o rukáv. Prohrál jsem a celá hospoda mi pak říkala Jednorukej. Aspoň že ne Bezrukej."},
 {z:"Počkat. JEDNORUKÝ — to není jen přezdívka, to je nápověda. Hned vedle stojí věž. A na ní ciferník s jedinou ručičkou. Taky jednorukej."},
 {z:"Jděte k němu. Klíč ke zprávě z noci je na tom ciferníku."},

 // STANICE 3 — orloj Caesar (wheel) · klíč = jednoruký ciferník
 {sys:"Stanice 3 / 9"},
 {z:"Radniční věž. Zvedněte hlavu k jednorukému."},
 {z:"Ciferník má jedinou zlatou ručičku a slunce. Spočítejte dílky — 24 hodin, 24 nahoře. Normální to není."},
 {pic:IMG+"orloj-placeholder.svg",cap:"Radniční orloj · 24h · 1 ručička · jednoruký"},
 {quick:["Vidíme jednorukého"],id:"n3"},
 {z:"Krčma zavírala o půlnoci. To vím."},
 {z:"Pak si pamatuju jen to, že jsem strašně chtěl, aby bylo o hodinu míň."},
 {z:"V kapse mám zprávu, kterou jsem si „zašifroval“, když jsem bloudil. Posunutou. O tolik, kolik čísel má jednoruký."},
 {z:"Na posuvníku si abecedu posuňte, dokud nepřečtete text. Klíč jste spočítali na věži."},
 {task:"t3"},
 {unlock:3},
 {z:"„Odešli.“ Množný číslo. To je… taková řečnická figura. 🔎"},
 {z:"Tyhle hodiny sem kdysi přestěhovali z kostelní věže. Já se taky stěhoval — stoletími. A mezi hospodama."},
 {z:"Brána. Dolů Klokotskou — to je ta hlavní ulice z rohu náměstí u radnice. Asi 6 minut z kopce."},

 // CESTOU 3→4 — Kotnov v dlani (honor)
 {sys:"Cestou · Klokotská"},
 {z:"Cestou dolů si pamatuju kulatou věž. Obří. Chtěl jsem si ji odnést domů."},
 {z:"Až ji uvidíte, vyfoťte ji tak, aby to vypadalo, že ji někdo z vás drží v dlani. 📸"},
 {task:"t3w"},
 {z:"Krásný. Jedno pivo vám za to odpouštím. (Do statistik. Na účtu pořád 38.)"},
 {z:"Teď až na konec Klokotské — gotická brána přilepená ke kulaté věži."},

 // STANICE 4 — Bechyňská brána
 {sys:"Stanice 4 / 9"},
 {z:"Projděte průjezdem ven a otočte se k bráně čelem. Stůjte na chodníku — jezdí tu auta."},
 {quick:["Stojíme za branou, čelem k ní"],id:"n4"},
 {z:"Tady si pamatuju řetězy. A strašnej rámus."},
 {z:"Chtěli jsme ven pro další pivo. Teda… chtěl jsem. 🔎"},
 {z:"Nakreslil jsem si, jak se tu spouštěl padací most. Tři verze. Jedna sedí se skutečností — a s mou dobou."},
 {task:"t4"},
 {unlock:4},
 {z:"Dvě štěrbiny, dvě páky. Jenže u každý páky musí stát jeden chlap. A já byl sám. 🔎"},
 {z:"Těma škvírama šly páky, co zvedaly padací most."},
 {z:"Most se zasek. Proto jsme šli zpátky jinudy. Uličkama nahoru."},

 // CESTOU 4→5 — uličky + schody
 {sys:"Cestou · Růžová → Filipovská"},
 {z:"Vraťte se průjezdem do města a hned zahněte do uliček — Růžová, pak Filipovská. Parkem ne. Asi 6 minut do kopce."},
 {z:"Mapa se mi teď rozmazala. Navigujte podle toho, co si pamatuju: úzká ulička mezi zdmi, pak schody, pak růžový dům na rohu."},
 {quick:["Jsme na schodech"],id:"n4s"},
 {z:"🎙️ Tudy jsme šli zpátky. Někdo usnul a já ho nesl. Nevím, kdo koho nesl… Asi já tebe. 🔎"},
 {z:"Nahoru na náměstí s kostelem se zelenou věží. Před růžovým domem č. 41 stojí hnědý rozcestník s truhlíkem."},

 // STANICE 5 — rozcestník
 {sys:"Stanice 5 / 9"},
 {quick:["Stojíme u rozcestníku"],id:"n5"},
 {z:"Tady to okno! Zpívali jsme pod ním. Paní odpověděla kýblem."},
 {z:"🎙️ Ktož jsú boží bojovníci… *šplouch*"},
 {z:"Divný. Na tý noční fotce je v okně odraz blesku z mobilu. Já mobil nemám… Nevadí. 🔎"},
 {z:"Po kýblu jsem šel tam, kam ukazuje ta cedule. Jenže nevím, která šipka."},
 {z:"Vzpomínám si jen, kam jsem NEšel. Srovnejte to s rozcestníkem a vyberte."},
 {task:"t5"},
 {unlock:5},
 {z:"Sady. Tam jsem vás hledal dvě hodiny. Myslel jsem, že jste moje rota."},
 {z:"Dovnitř nejdeme. Stačí mi brána, pod kterou jsem se vyfotil. Najděte ji — po šipce Holečkovy sady, asi minuta."},

 // STANICE 6 — Mariánská + zvrat
 {sys:"Stanice 6 / 9"},
 {z:"Světlý oblouk porostlý břečťanem, nahoře kamenná váza jak kopeček zmrzliny. Za ním zeleň."},
 {pic:IMG+"marianska-placeholder.svg",cap:"Mariánská brána · váza nahoře"},
 {quick:["Vidíme oblouk s vázou"],id:"n6"},
 {z:"Tuhle fotku jsem si v noci poslal. Postavte se do oblouku tak, aby váza byla přesně nad hlavou jednoho z vás. Svatozář. 📸"},
 {task:"t6"},
 {unlock:6},
 {z:"Sedněte si. Chvíli nikam nejdeme."},
 {fwd:{h:"Krčmář",b:"38 piv pořád nezaplaceno. Do konce hry vyvěsím fotky z noci na náměstí. Na ty vaše tenisky se bude dívat celej Tábor."}},
 {z:"🎙️ Poslouchejte. Já jsem tady velitel. Ne kámoš z hospodský směny. Jména na ruce = muster. Kdo jde, jde. Kdo ne — poprava. ⚔️"},
 {z:"Plášť je z vašeho století, ne můj. Jména jsem si psal, abych spočítal, kdo jde se mnou domů. A nesl jsem tě já."},
 {z:"A ta díra v kašně? Taky ne já. Vidíte tu kašnu tady na náměstí? Stála kdysi na hlavním, praskla, tak ji odstěhovali sem. Kašny v Táboře prostě praskaj samy."},
 {fwd:{h:"Krčmář",b:"Chcete fotky zpátky? Vsadili jste se se mnou, že v Táboře teče voda do kopce. Dokažte to. Jsem na Tržním."}},
 {z:"Z rohu u růžového domu Převrátilskou a pak rovně Dlouhou na Tržní. Asi 6 minut. V Dlouhé míjíte kašnu ve zdi — podle ní poznáte, že jdete dobře."},

 // STANICE 7 — Tržní pítko
 {sys:"Stanice 7 / 9"},
 {quick:["Jsme na Tržním"],id:"n7"},
 {z:"Pauza? Stopky stojí, dejte si něco. Já počkám."},
 {quick:["Pokračovat"],id:"n7p"},
 {z:"Tak. Sázka zněla: voda v Táboře teče do kopce. Krčmář chce důkaz."},
 {z:"Najděte na tomhle náměstí místo, kde voda teče nahoru. A napijte se, ať to má šťávu. 📸"},
 {task:"t7"},
 {unlock:7},
 {fwd:{h:"Krčmář",b:"Hm. Beru. Jedno pivo odpouštím. Zbývá 37."}},
 {z:"Tahle věž kdysi tahala vodu z rybníka pod městem nahoru do kopce. Vyhráli jste sázku díky stroji z roku 1508."},
 {z:"Krčmář odešel k hrázi. Za ním — Pod Tržním náměstím z kopce, K Vodopádu, po schodech nahoru. Asi 8 minut."},

 // STANICE 8 — hráz
 {sys:"Stanice 8 / 9"},
 {quick:["Jsme na hrázi"],id:"n8"},
 {z:"Tady jste chytali ryby. Na můj palcát. Jako na prut. V mý době by vás za to seřval hejtman."},
 {z:"Krčmář vás fotil odněkud odsud. Najděte přesně to místo — zatím bez noční fotky, tak vyberte úhel, co sedí."},
 {task:"t8"},
 {unlock:8},
 {z:"🎙️ Ryby? Ani hovno. Chytili jste akorát rýmu. A jednu tenisku. Vaši."},
 {z:"Tenhle rybník tu je přes 500 let. Patří k nejstarším přehradám ve střední Evropě. A vy jste do něj házeli palcát."},
 {z:"Krčmář má truhlu s fotkama u vchodu do podzemí pod radnicí. Nahoru, ale jinudy."},

 // CESTOU 8→9 — Pražská zastávky
 {sys:"Cestou · Čs. armády → Pražská"},
 {z:"Po Čs. armády dolů ke Křižíkovu, doleva Palackého, rovně Pražskou na Žižkovo náměstí. Asi 12 minut. Cestou dvě krátké zastávky."},
 {z:"Palackého, dům naproti divadlu (bonet OBUV): tmavá deska s reliéfem hradeb."},
 {quick:["Vidíme desku s branou"],id:"n8a"},
 {z:"Nové brány. Stály tu stovky let a dneska po nich nic. Přísahám, že tyhle jsem nerozbil."},
 {z:"Dál Pražskou — dům s kosočtvercovým vzorem, v kamenné desce dělová koule."},
 {quick:["Vidíme kouli ve zdi"],id:"n8b"},
 {z:"Tu tam nechali Švédové při obléhání. Krčmář by to stejně hodil na mě."},
 {z:"Rovně přes náměstí ke Staré radnici. Před Škochovým domem je v dlažbě plánek z kostek — červené ukazují chodby. Ke vchodu do podzemí. Dovnitř ne."},

 // STANICE 9 — finále
 {sys:"Stanice 9 / 9 · Finále"},
 {quick:["Jsme u vchodu do podzemí"],id:"n9"},
 {z:"Tady. Krčmář tu má truhlu. Já mám pocit, že to není o fotkách."},
 {z:"Zámek chce celou cestu. Popořadě."},
 {z:"Poskládejte, kudy jsme šli. Od první sázky po ryby."},
 {task:"t9"},
 {unlock:9},
 {z:"🧰 Truhla je PRÁZDNÁ."},
 {z:"🎙️ Prázdná? Ne. Tohle je brána. Cesta domů. Fotky jsem smazal já — a účet zaplatil palcátem. Proto ho nemám."},
 {z:"Co se stalo v Táboře, zůstává v Táboře. Já jdu zpátky. Vy zůstaňte."},
 {z:"Jednu fotku si ale udělejte. Tu jedinou, co smí ven. 📸"},
 {task:"t9s"},
 {z:"Rámeček: KUMPÁNI · Cesta zpátky · Tábor 2026"},
 {z:"🎙️ A příště — až přistane někdo jinej — platíte vy."},
 {sys:"Konec · 9/9"},
 {finale:true}
];

const TASKS={
 t1:{title:"Účet u kašny",lbl:"Stopa cesty",
   brief:"Na vnější stěně nádrže kašny najděte dva letopočty (vidět / nahmatat). Sečtěte je — to je částka, kterou Tábor dluží Rolandovi / kašně.",
   ask:"Kolik dlužíme?",
   ph:"Částka",
   kind:"word",answers:["3416"],
   near:{
     "1568":"To je jen původní dluh. Najděte druhý řádek.",
     "1848":"Oprava sama nestačí. Roland účtuje i stavbu.",
     "3415":"1567 je začátek práce, ne letopočet na účtu.",
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
   brief:"Jednoruký ciferník = klíč. Spočítejte čísla na věži. Posuňte abecedu o tolik míst a na posuvníku přečtěte zprávu.",
   ask:"Šifra z kapsy — posouvejte, dokud nepřečtete text",
   cipher:"MBCQJG ZPYLMS",
   kind:"wheel",answers:["ODESLIBRANOU"],
   near:{ODESLI:"První slovo máte. Kudy?",BRANOU:"Druhé sedí. Co bylo předtím?",MBCQJG:"To je ještě šifra. Posuňte posuvník.",ZPYLMS:"To je druhá půlka šifry. Rozluštěte celou zprávu.",24:"Klíč sedí. Teď posuňte posuvník a přečtěte text.",12:"Na normálních hodinách jo. Tenhle jednoruký jich má víc.",2:"Posun o 2 zpátky sedí. Ale kolik čísel má jednoruký?"},
   hints:["Jednoruký má 24 hodin, ne 12. Kolik je dílků, o tolik se posouvá abeceda.","Na posuvníku nastavte 24 (nebo −2). Horní řádek = šifra, spodní = text. Živý řádek nahoře ukáže zprávu.","První slovo je sloveso v minulém čase, druhé říká, kudy."]
 },
 t3w:{title:"Věž v dlani",lbl:"Úkol cestou",
   brief:"Vyfoťte kulatou věž Kotnov tak, aby to vypadalo, že ji někdo z vás drží v dlani. Perspektiva. Dokonalost se nehodnotí.",
   kind:"honor",confirm:"Máme ji v dlani ✓",
   hints:["Pokračujte Klokotskou dolů, věž se objeví sama.","Jeden stojí blíž k mobilu s nataženou dlaní, věž je v dálce za ním.","Stačí, aby věž „seděla“ nad dlaní."]
 },
 t4:{title:"Opilé náčrty",lbl:"Porovnej s realitou",
   brief:"Stojíte venku a díváte se na bránu? Porovnejte ji s náčrty. Který sedí? (Správný má nad obloukem dvě svislé štěrbiny a znak.)",
   kind:"choice",
   opts:[
     {k:"a",label:"A · jedna svislá štěrbina nad obloukem",svg:IMG+"brana-sketch-a.svg"},
     {k:"b",label:"B · dvě svislé štěrbiny + znak nad obloukem",svg:IMG+"brana-sketch-b.svg"},
     {k:"c",label:"C · střílny po stranách průjezdu",svg:IMG+"brana-sketch-c.svg"}
   ],
   ok:"b",
   bad:{a:"To jsem kreslil po šestým. Spočítejte svislé škvíry nad průjezdem.",c:"Střílny bokem jsou jinde. Dívejte se nad oblouk průjezdu, ne na boky."},
   hints:["Musíte stát venku, za branou, a dívat se na ni.","Dívejte se nad oblouk průjezdu, ne na věž.","Nad průjezdem jsou dvě úzké svislé škvíry. Náčrt B."]
 },
 t5:{title:"Která šipka?",lbl:"Vylučovačka",
   brief:"Přečtěte šipky na rozcestníku. Žižka vylučuje: Bašty ne. Kotnov a brána ne (už jsme byli). Kostely ne. Muzeum a podzemí ne (zavřeno). WC ne (byl čtyřikrát). Zůstalo: hodně zelený a někdo spal na lavičce.",
   kind:"choice",
   opts:[
     {k:"sady",label:"Holečkovy sady"},
     {k:"basty",label:"Bašty (Žižkova / Soukenická)"},
     {k:"kotnov",label:"Kotnov / Bechyňská brána"},
     {k:"kostel",label:"Kostely"},
     {k:"muzeum",label:"Muzeum / podzemí"},
     {k:"wc",label:"WC"}
   ],
   ok:"sady",
   bad:{basty:"Bašty ne. V noci jsem žádnou nedobyl.",kotnov:"Tam už jsme byli.",kostel:"Kostely ne, to až ráno.",muzeum:"Muzeum a podzemí v noci zavřeno.",wc:"Tam jsem byl čtyřikrát. Stačilo."},
   hints:["Odškrtávejte šipky, co Žižka vyloučil. Zbyde jedna.","Zelená, lavička, spaní = park.","Holečkovy sady."]
 },
 t6:{title:"Svatozář z vázy",lbl:"Pozice + čest",
   brief:"Postavte se do oblouku tak, aby kamenná váza na střeše byla přesně nad hlavou jednoho z vás. Jako svatozář. Vyfoťte. Potvrzuje se na čest.",
   kind:"honor",confirm:"Stojíme pod vázou ✓",
   hints:["Jděte po šipce „Holečkovy sady“.","Hledejte oblouk, za kterým je vidět zeleň.","Je to vstup do parku přímo z tohohle náměstí, pár kroků od rozcestníku."]
 },
 t7:{title:"Voda do kopce",lbl:"Nález + čest",
   brief:"Najděte pítko — místo, odkud stříká voda vzhůru. Jeden se napije, ostatní ho vyfotí jako důkaz pro krčmáře.",
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
   brief:"Noční fotku ještě nemáme. Vyberte popis místa, odkud vás krčmář fotil — čelem k vodě u zábradlí.",
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
   brief:"Seřaďte karty v pořadí, kudy jsme šli. Od první sázky po ryby.",
   kind:"sort",
   cards:[
     {k:"nuzky",t:"Sázka o rukáv",e:"✂️"},
     {k:"orloj",t:"Posunutý čas",e:"🕛"},
     {k:"brana",t:"Zaseklý most",e:"🏰"},
     {k:"schody",t:"Kdo koho nesl",e:"🧗"},
     {k:"okno",t:"Serenáda pod oknem",e:"🎶"},
     {k:"pitko",t:"Voda do kopce",e:"⛲"},
     {k:"hraz",t:"Ryby na palcát",e:"🎣"}
   ],
   order:["nuzky","orloj","brana","schody","okno","pitko","hraz"],
   hints:["Pořadí cesty = pořadí, v jakém jste dneska chodili.","Začíná se u nůžek a končí u vody.","Po bráně jsou schody, po schodech okno."]
 },
 t9s:{title:"Selfie KUMPÁNI",lbl:"Jediná fotka ven",
   brief:"Všichni do záběru. Rámeček: KUMPÁNI · Cesta zpátky · Tábor 2026",
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

function renderWindows(pop){
 const w=$("#windows");let h="";
 for(let i=1;i<=9;i++){
  const on=st.won.includes(i),n=NIGHT[i],has=n&&n.img;
  h+=on?(has?`<button class="win on${pop===i?" new":""}" data-n="${i}" aria-label="Okénko ${i}"><img src="${n.img}" alt=""></button>`:`<button class="win on lit${pop===i?" new":""}" data-n="${i}" aria-label="Okénko ${i}">${i}</button>`):`<div class="win">${i}</div>`}
 const done=st.won.includes(9);
 h+=done?`<div class="win fin open" title="Finále">✓</div>`:`<div class="win fin" title="Finále"><i class="lock"></i></div>`;
 w.innerHTML=h;$("#count").textContent=st.won.length;
 w.querySelectorAll(".win.on").forEach(b=>b.onclick=()=>{const n=NIGHT[b.dataset.n];if(n&&n.img)openModal(n.img,n.t);else if(n)openModal("",n.t)});
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
   if(b.textContent.startsWith("Proč"))await zSay("Já jsem tady velitel. Kdo jde, jde. Kdo se ptá — vás dám popravit. ⚔️");res()})});
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
 let k=0;
 body.innerHTML=`<div class="cipher-src"><span>Šifra</span><b>${esc(cipher)}</b></div>
  <div class="cipher cipher-live" aria-live="polite">${esc(cipher)}</div>
  <p class="wheel-lab">Posuvník · horní řádek = šifra → spodní = text</p>
  <div class="wheel"><div class="r1">${A}</div><div class="r2"></div></div>
  <div class="wheel-ctrl"><button type="button" class="btn sec wheel-m" aria-label="Posun minus">−</button><div class="wheel-k"><span class="kk">0</span><small>posun</small></div><button type="button" class="btn sec wheel-p" aria-label="Posun plus">+</button></div>
  <div class="inrow"><input type="text" placeholder="Rozluštěný text" autocomplete="off" autocapitalize="characters" spellcheck="false"><button class="btn">Zadat</button></div>`;
 const live=body.querySelector(".cipher-live"),r2=body.querySelector(".r2"),kk=body.querySelector(".kk");
 const draw=()=>{
  live.textContent=[...cipher].map(c=>{const i=A.indexOf(c);return i<0?c:A[(i-k+260)%26]}).join("");
  r2.textContent=[...A].map((_,i)=>A[(i-k+260)%26]).join("");
  kk.textContent=String(k);
 };
 body.querySelector(".wheel-m").onclick=()=>{k=(k+25)%26;draw()};
 body.querySelector(".wheel-p").onclick=()=>{k=(k+1)%26;draw()};
 draw();
 const inp=body.querySelector("input");
 const send=()=>{const raw=inp.value.trim();if(!raw)return;const n=norm(raw);meSay(raw.toUpperCase());inp.value="";
  if(t.answers.includes(n))return H.solved();
  if(t.near&&t.near[n])return H.bad(t.near[n]);
  H.bad("Tohle neznám. Posuňte posuvník a přečtěte živý řádek.")};
 body.querySelector(".inrow .btn").onclick=send;inp.onkeydown=e=>{if(e.key==="Enter")send()};
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
 body.innerHTML=`<p class="howto">${esc(t.howto)}</p><div class="gridwrap"><video class="hide" muted playsinline></video><svg viewBox="0 0 250 250"></svg></div>
  <div class="segs">${[["up","očka nahoře"],["down","očka dole"],["left","očka vlevo"],["right","očka vpravo"]].map(([k,l])=>`<button data-o="${k}">${l}</button>`).join("")}</div>
  <button class="btn sec sm cam">Položit mřížku přes kameru</button>
  <div class="inrow"><input type="text" placeholder="Slovo" autocomplete="off" autocapitalize="characters" spellcheck="false"><button class="btn">Zadat</button></div>`;
 const svg=body.querySelector("svg"),v=body.querySelector("video");let o=null,cam=false;
 const draw=()=>{let s=cam?`<rect width="250" height="250" fill="rgba(0,0,0,.25)"/>`:"";
  if(o){const P={TL:[25,25],TR:[225,25],BL:[25,225],BR:[225,225]},rings={up:["TL","TR"],down:["BL","BR"],left:["TL","BL"],right:["TR","BR"]}[o];
   s+=`<g stroke="#ff9a3c" stroke-width="9" stroke-linecap="round" opacity=".45"><line x1="25" y1="25" x2="225" y2="225"/><line x1="225" y1="25" x2="25" y2="225"/></g>`;
   rings.forEach(k=>{const [a,b]=P[k];s+=`<circle cx="${a}" cy="${b}" r="22" fill="none" stroke="#ff9a3c" stroke-width="5"/>`})}
  for(let r=0;r<5;r++)for(let k=0;k<5;k++)s+=`<text x="${25+k*50}" y="${34+r*50}" text-anchor="middle" font-family="JetBrains Mono,ui-monospace,monospace" font-weight="700" font-size="25" fill="#e8fbff" stroke="#000" stroke-width="${cam?2.5:0}" paint-order="stroke">${t.grid[r][k]}</text>`;
  svg.innerHTML=s};
 draw();
 body.querySelectorAll(".segs button").forEach(b=>b.onclick=()=>{o=b.dataset.o;body.querySelectorAll(".segs button").forEach(y=>y.classList.toggle("on",y===b));draw()});
 body.querySelector(".cam").onclick=async e=>{
  try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw new Error("x");
   v.srcObject=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"},audio:false});await v.play();v.classList.remove("hide");cam=true;draw();e.target.remove()}
  catch(err){e.target.textContent="Kamera nejde, stačí mřížka nahoře";e.target.disabled=true}};
 const inp=body.querySelector("input"),send=()=>{const n=norm(inp.value);if(!n)return;meSay(inp.value.trim().toUpperCase());inp.value="";
  if(t.answers.includes(n))return H.solved();if(t.near[n])return H.bad(t.near[n]);H.bad(o&&o!=="up"?"Nesedí. Podívejte se znovu, kde mají nůžky na zdi očka.":"Tohle slovo neznám. Čtěte po čepelích od oček ke hrotům.")};
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
  <p class="finale-lead">9 okének. Prázdná truhla — brána domů. Účet zaplacený palcátem. Žižka jde. Vy zůstaňte.</p>
  <p class="finale-note">Díky za playtest · demo2 r17</p>
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
function start(){$("#splash").classList.add("hide");$("#app").classList.remove("hide");renderWindows();run()}
$("#startBtn").onclick=()=>{st.started=true;save();start()};
$("#modalClose").onclick=()=>$("#modal").classList.add("hide");
$("#menuBtn").onclick=()=>$("#menu").classList.remove("hide");
$("#menuClose").onclick=()=>$("#menu").classList.add("hide");
$("#resetBtn").onclick=reset;
if(st.started)start();
