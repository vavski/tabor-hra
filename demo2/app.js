"use strict";
/* Ukázka: úvod + stanice 1–2. Playtest r3: cliff bez spoileru, krátký brief st.1, chat-nav obě stanice. */
const TEST=/[?&]test=1/.test(location.search);
const KEY="tabor-demo2-r4";
const IMG="assets/img/";
const AV_MARK=`<span class="av av-mark" aria-hidden="true"><svg viewBox="0 0 40 40" width="28" height="28" fill="none"><circle cx="20" cy="20" r="19" fill="#0a121c" stroke="#22d3ee" stroke-width="1.5"/><ellipse cx="20" cy="20" rx="6" ry="8" stroke="#5ee1ff" stroke-width="1.5"/><circle cx="20" cy="20" r="2.5" fill="#22d3ee"/><path d="M8 18h8M24 18h8" stroke="#ff9a3c" stroke-width="1.8" stroke-linecap="round"/></svg></span>`;
const NIGHT={1:{img:IMG+"noc-1.jpg",t:"Okénko 1 · 02:14 · Kašna"},2:{img:IMG+"noc-2.jpg",t:"Okénko 2 · 02:47 · Škochův dům"}};

const SCRIPT=[
 // ÚVOD
 {sys:"Neděle · 6:40"},
 {z:"Lidi. Jste vzhůru?"},
 {z:"Probudil jsem se u kašny na náměstí. Na zemi. 🫠"},
 {z:"Selfie z kašny. Vypadám… jinak. Až uvidíte okénka, pochopíte."},
 {z:"Mám na sobě cizí plášť. Je mi malej. A v kapse tohle:"},
 {receipt:`<h4>KRČMA · ÚČET č. 1419</h4><div class="l"><span>Pivo 0,5</span><span>38×</span></div><div class="l"><span>Nakládaný hermelín</span><span>4×</span></div><div class="l"><span>Škoda na majetku</span><span>1×</span></div><div class="l tot"><span>CELKEM</span><span>2 474 Kč</span></div><div class="scr">zaplatí Žižka ♥</div>`},
 {z:"38 piv. Já. Nic si nepamatuju."},
 {z:"Z noci mám jen 9 okének. Viz nahoře ⬆️ Najdete je, než bude nástup?"},
 {quick:["Jasně, jdeme do toho","Proč zrovna my?"],id:"q0"},
 {z:"Díky. Na každým místě, kde jsem v noci byl, zůstala stopa. Každá stopa = jedno okénko."},
 {z:"Až jich bude 9, noc se složí. A uvidíte, že to není tak jednoduchý, jak to teď vypadá."},
 {z:"Začneme tam, kde jsem se probudil."},
 // STANICE 1 — kašna (chat-nav jako st.2; kód = slovo z noci)
 {sys:"Stanice 1 / 9"},
 {z:"Jděte doprostřed Žižkova náměstí. Velká kamenná kašna — uprostřed sloup a na něm malý rytíř s praporkem."},
 {z:"Kousek od ní stojí velká socha mě s palcátem. Tou kašnu nepopletete."},
 {quick:["Stojíme u kašny"],id:"n1"},
 {z:"Tady. Ráno jsem ležel vedle. V kapse mám kámen. Normální šedej kámen. 🪨"},
 {z:"A v mobilu tuhle zprávu, co jsem v noci poslal do skupiny:"},
 {fwd:{h:"Přeposláno · skupina „Kumpáni“ · 02:14",b:"mám suvenýr 😎🪨 nikdo nic nepozná, díra je vidět jen zblízka"}},
 {z:"Vsadil jsem se, že kus kašny vylomím holou rukou. Díru pak někdo… no, záplatoval. Najděte to dřív než radnice."},
 {z:"Až tu záplatu uvidíte — napište mi, jak jsem tomu v noci říkal. Jedno slovo. Z té zprávy."},
 {task:"t1"},
 {unlock:1},
 {z:"Jo. Vyhrál jsem jedno pivo a doživotní zákaz od kameníka."},
 {z:"Mimochodem, ten plášť. Zkoušel jsem ho natáhnout a zjistil jsem, že mu chybí rukáv. Kam se v noci ztrácejí rukávy? 🤔"},
 // STANICE 2 — rytmus jinak: žádná karta Kam teď → Žižka naviguje v chatu
 {sys:"Stanice 2 / 9"},
 {z:"Z náměstí do rohu k radniční věži. Minuta chůze."},
 {z:"Hledejte nejzdobnější dům na náměstí — nahoře vlnky do špičky jak šlehačka na dortu, dole restaurace. Stojí hned vedle radnice s hodinami."},
 {pic:IMG+"skoch-fasada.jpg",cap:"Škochův dům · fasáda"},
 {quick:["Jsme u Škocha"],id:"n2"},
 {z:"Tady se mi to trochu vrací. Bylo tu narváno a někdo mával obříma nůžkama."},
 {z:"Na zadní straně účtenky mám tohle. Moje písmo to není."},
 {receipt:`<h4>ZADNÍ STRANA</h4><div style="font:800 20px/1.25 ui-monospace,monospace;letter-spacing:8px;text-align:center">J T A M R<br>B E S U L<br>P H D I A<br>V K Z N C<br>Y S L E O</div><div class="scr">přilož k nůžkám. prohrál jsi 😂</div>`},
 {z:"Prohrál? Co jsem prohrál? A co s tím mají nůžky?"},
 {z:"Najděte nůžky na fasádě. Pak přiložte mřížku a přečtěte, co jsem prohrál."},
 {task:"t2"},
 {unlock:2},
 {z:"Sázka s krejčím: kdo prohraje, přijde o rukáv. Prohrál jsem a celá hospoda mi pak říkala Jednorukej. Aspoň že ne Bezrukej."},
 {z:"Hele, kdo je tu ještě jednorukej? Ten ciferník na věži hned vedle má jen jednu ručičku."},
 // CLIFFHANGER — prodat zvrat, ne jen zámek
 {sys:"Konec ukázky"},
 {z:"Po orloji přijde zpráva od krčmáře. Ne od kamaráda. Od chlapa, co chce 2 474 Kč. A fotky."},
 {z:"A pak vám řeknu něco, co teď ještě nechci. Proč mám na ruce vaše jména. Proč je mi ten plášť malej. Proč je na účtu 38 piv a já si pamatuju dvě."},
 {z:"Až bude všech 9 okének, truhla u radnice se otevře. Co je uvnitř — to je pointa celý noci. 😏"},
 {locked:true}
];

const TASKS={
 t1:{title:"Díra po suvenýru",lbl:"Stopa z noci",
   brief:"Obejděte kašnu. Na obrubě je kus, který tam nepatří.",
   ask:"Heslo z noci — jak jsem tomu říkal ve zprávě.",
   kind:"word",answers:["SUVENYR"],
   near:{KAMEN:"Jo, kámen. Ale jak jsem tomu říkal ve zprávě do skupiny?",ZAPLATA:"To je, co vidíte teď. Já tomu v noci říkal jinak.",DIRA:"Díru jste našli. Co jsem si z ní odnesl?",SUVENE:"Skoro. Dočtěte to slovo.",SUVENIR:"Bez i. Jak to mám ve zprávě.",SUVENY:"Ještě jedno písmeno. 🪨"},
   hints:["Neřešte vodu ani rytíře nahoře. Jen kamenný lem dole — ten, na který si lidi sedají. Kolem dokola.","Hledejte kus, co do oblého okraje nepatří: hranatý kámen vsazený mezi žlábky.","Ve zprávě do skupiny jsem napsal, co si z díry odnáším. Jedno slovo. S emoji kamene."]
 },
 t2:{title:"Co jsem prohrál?",lbl:"Stopa z noci",
   brief:"Na fasádě Škochova domu jsou namalované nůžky — pod druhým oknem v 1. patře, nad restaurací. Ne kovové, namalované.",
   howto:"Nastavte, kde mají nůžky na zdi očka. Čtěte písmena po čepelích od oček ke hrotům: nejdřív levá čepel, pak pravá. Písmeno uprostřed, kde se čepele kříží, jen jednou.",
   kind:"grid",grid:["JTAMR","BESUL","PHDIA","VKZNC","YSLEO"],answers:["JEDNORUKY"],
   near:{JEDNO:"To je jen jedna čepel. Nůžky mají dvě.",RUKY:"Druhá čepel sedí. Kde je první?",RUDKY:"Prostřední písmeno, kde se čepele kříží, čtěte jen jednou.",JEDNORUDKY:"Skoro! Písmeno uprostřed jen jednou."},
   hints:["Nůžky jsou namalované, ne kovové. Najdete je nad vchodem do restaurace, v 1. patře.","Očka mají nahoře, hroty dole. Dejte „očka nahoře“ a čtěte po zlatých čarách.","Levá čepel: J-E-D-N-O. Pravá: R-U-(D)-K-Y."]
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
 for(let i=1;i<=9;i++){const on=st.won.includes(i);h+=on?`<button class="win on${pop===i?" new":""}" data-n="${i}" aria-label="Okénko ${i}"><img src="${NIGHT[i].img}" alt=""></button>`:`<div class="win">${i}</div>`}
 h+=`<div class="win fin" title="Finále"><i class="lock"></i></div>`;
 w.innerHTML=h;$("#count").textContent=st.won.length;
 w.querySelectorAll(".win.on").forEach(b=>b.onclick=()=>openModal(NIGHT[b.dataset.n].img,NIGHT[b.dataset.n].t));
 const nw=w.querySelector(".win.new");if(nw){void nw.offsetWidth;requestAnimationFrame(()=>requestAnimationFrame(()=>nw.classList.remove("new")))}
}
function openModal(src,txt){$("#modal img").src=src;$("#modal p").textContent=txt;$("#modal").classList.remove("hide")}

function addRow(who,inner){
 const me=who==="me";
 if(!me&&lastWho==="z"){const prev=[...feed.querySelectorAll(".row:not(.me) .av")].slice(-1)[0];if(prev)prev.classList.add("ghost")}
 const r=el(`<div class="row${me?" me":""}">${me?"":AV_MARK}</div>`);
 r.appendChild(typeof inner==="string"?el(inner):inner);
 feed.appendChild(r);lastWho=me?"me":"z";into(r,"end");return r;
}
function sys(t){const e=el(`<div class="sys${/^Stanice|^Konec/.test(t)?" st":""}"><span>${esc(t)}</span></div>`);feed.appendChild(e);lastWho=null;into(e,"end")}
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
}
function quick(s,instant){
 if(instant){meSay(st.q[s.id]||s.quick[0]);return}
 return new Promise(res=>{const q=el(`<div class="quick">${s.quick.map(o=>`<button class="btn ghost">${esc(o)}</button>`).join("")}</div>`);feed.appendChild(q);into(q,"end");
  q.querySelectorAll("button").forEach(b=>b.onclick=async()=>{q.remove();st.q[s.id]=b.textContent;meSay(b.textContent);
   if(b.textContent.startsWith("Proč"))await zSay("Máte jména napsaný na mojí ruce. Fixou. Takže jsme asi kámoši.");res()})});
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
 const body=t.brief
  ?`<p class="brief">${esc(t.brief)}</p>${t.ask?`<p class="ask">${esc(t.ask)}</p>`:""}`
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
  if(t.kind==="pick")pick(body,t,H);else if(t.kind==="word")word(body,t,H);else grid(body,t,H);
  c.appendChild(hb);
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
 body.innerHTML=`<div class="inrow"><input type="text" placeholder="Heslo z noci" autocomplete="off" autocapitalize="characters" spellcheck="false"><button class="btn">Zadat</button></div>`;
 const inp=body.querySelector("input");
 const send=()=>{const raw=inp.value.trim();if(!raw)return;const n=norm(raw);meSay(raw.toUpperCase());inp.value="";
  if(t.answers.includes(n))return H.solved();
  if(t.near&&t.near[n])return H.bad(t.near[n]);
  H.bad("Tohle slovo neznám. Podívejte se ještě jednou na tu zprávu z noci — a na kašnu zblízka.")};
 body.querySelector(".inrow .btn").onclick=send;inp.onkeydown=e=>{if(e.key==="Enter")send()};
 if(!TEST)setTimeout(()=>inp.focus(),200);
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
 const c=el(`<div class="card unlock"><div class="lbl"><i class="dot"></i>Okénko ${n}/9 odemčeno</div><div class="big">${esc(NIGHT[n].t.split(" · ").slice(2).join(" · "))}</div><div class="shot"><img src="${NIGHT[n].img}" alt="Obrázek z noci"><span class="ts">${esc(NIGHT[n].t.split(" · ")[1])}</span></div></div>`);
 feed.appendChild(c);lastWho=null;
 if(!instant){into(c,"start");await wait(900)}
}
function locked(){
 const c=el(`<div class="card locked cliff">
  <div class="ic"><i class="lock big"></i></div>
  <h3>Další okénka zamčená</h3>
  <p class="cliff-lead">V plné hře jdete k orloji, k Bechyňské bráně a dál noční stopou. V půlce přijde krčmář. A na konci u radnice se otevře truhla.</p>
  <p class="cliff-punch">Truhla se otevře.<br><span>Co je uvnitř — to teď neříkám.</span></p>
  <p class="cliff-note">Ukázka končí po 2 z 9 okének. Zbytek + finále je v plné hře.</p>
 </div>`);
 feed.appendChild(c);
 const b=el(`<button class="btn sec">Zahrát ukázku znovu</button>`);b.onclick=reset;feed.appendChild(b);lastWho=null;into(c,"start");
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
