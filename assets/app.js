"use strict";
/* Co se stalo v Táboře · web v2 · statická hra bez backendu.
   Texty: assets/texty.js (generuje _src/build.py). Hlasovky: assets/audio/hlasovka-N.mp3 (volitelné). */
const T=window.TEXTY, STN=T.stations;
const KEY="cosestalo_v2";
const TEST=/[?&]test=1/.test(location.search);
const TOTAL_MIN=90;
const PTS={station:100,hint:[10,20,30],wrong:5,skip:60,bonusPerMin:2};
const GPS={s1:"14.65850,49.41415",s2:"14.65775,49.41375",s3:"14.65778,49.41394",s4:"14.65547,49.41133",s5:"14.65589,49.41433",s6:"14.65540,49.41435",s7:"14.65950,49.41540",s8:"14.66260,49.41700",s9:"14.65780,49.41400"};
const IMG=f=>"assets/img/"+f;

/* ---------- helpers ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm=s=>(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase().replace(/[^A-Z0-9]/g,"");
function el(h){const d=document.createElement("div");d.innerHTML=h.trim();return d.firstElementChild}
function fmt(ms){ms=Math.max(0,Math.round(ms/1000));const h=Math.floor(ms/3600),m=Math.floor(ms%3600/60),s=ms%60;return (h?h+":"+String(m).padStart(2,"0"):m)+":"+String(s).padStart(2,"0")}
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("on");clearTimeout(toast._t);toast._t=setTimeout(()=>e.classList.remove("on"),2600)}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function joinNames(n){return n.length<2?(n[0]||""):n.slice(0,-1).join(", ")+" a "+n[n.length-1]}
function fill(t){if(!st)return t;return String(t).replace(/\{A\}/g,st.A).replace(/\{B\}/g,st.B).replace(/\{JMENA\}/g,joinNames(st.names)).replace(/\{TYM\}/g,st.team||"Kumpáni")}
const F=t=>esc(fill(t));

/* ---------- state ---------- */
let st=null;try{st=JSON.parse(localStorage.getItem(KEY))}catch(e){st=null}
function save(){try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}}
function newState(names,team,roz,osl){
  const A=roz&&osl?osl:names[0];const B=names.find(n=>n!==A)||A;
  return {v:2,names,team,roz,A,B,started:Date.now(),pausedAt:null,pausedTotal:0,stage:0,pos:0,hints:{},wrong:{},skip:{},shown:{},finished:null,selfie:false};
}
function elapsed(){if(!st)return 0;const end=st.finished||st.pausedAt||Date.now();return end-st.started-st.pausedTotal}
function score(){
  let p=0,h=0,w=0,sk=0;
  STN.forEach(s=>{p+=PTS.station;const n=st.hints[s.id]||0;for(let i=0;i<n;i++)h+=PTS.hint[i];w+=(st.wrong[s.id]||0)*PTS.wrong;if(st.skip[s.id])sk+=PTS.skip});
  const min=elapsed()/60000;const bonus=Math.max(0,Math.round((TOTAL_MIN-min)*PTS.bonusPerMin));
  return {base:p,h,w,sk,bonus,total:Math.max(0,p-h-w-sk+bonus),min:Math.round(min)};
}

/* ---------- top bar ---------- */
function tick(){
  const t=$("#timer");
  if(!st||!st.names){t.innerHTML="";$("#prog").style.width="0";return}
  const e=elapsed(),over=e>TOTAL_MIN*60000;
  t.className="timer"+(over?" over":"");
  t.innerHTML=(st.pausedAt?"⏸ PAUZA ":"")+"<b>"+fmt(e)+"</b> / 90:00";
  $("#prog").style.width=(st.finished?100:st.stage/9*100)+"%";
  const b=$("#banner");
  if(over&&!st.finished&&st.stage<8&&!st.tBanner){b.innerHTML=`<b>${esc(T.finale.timeout)}</b> Čas vypršel, ale konec vás nemine. <button class="btn sm" id="toChest">Rovnou na truhlu ▸</button>`;$("#toChest").onclick=()=>{st.tBanner=true;st.stage=8;st.pos=0;save();b.innerHTML="";render()}}
  else if(!over||st.finished||st.stage>=8)b.innerHTML="";
}
setInterval(tick,1000);

/* ---------- audio (hlasovky) ---------- */
let curAudio=null;
function playVoice(n){
  if(curAudio){curAudio.pause();curAudio=null}
  const a=new Audio("assets/audio/hlasovka-"+n+".mp3");curAudio=a;
  a.play().catch(()=>toast("Hlasovka "+n+" zatím není nahraná. Čtěte text 🙂"));
}

/* ---------- chat ---------- */
function msgEl(m){
  if(m.k==="v"){const v=T.voices[String(m.t)];return el(`<div class="msg v"><div class="vh"><button class="play" data-v="${m.t}" aria-label="Přehrát">▶</button>🎙️ HLASOVKA · ${v.sec} s</div><i>„${F(v.text)}“</i></div>`)}
  return el(`<div class="msg ${m.k}">${F(m.t)}</div>`);
}
document.addEventListener("click",e=>{const b=e.target.closest(".play");if(b)playVoice(b.dataset.v)});
let playing=0;
function playFeed(box,msgs,key,done){
  if(!msgs||!msgs.length){done&&done();return}
  if(st.shown[key]||TEST&&window.__fast){msgs.forEach(m=>box.appendChild(msgEl(m)));st.shown[key]=1;done&&done();return}
  const my=++playing;let i=0;
  const skip=el(`<button class="btn sec sm">Přeskočit ▸▸</button>`);
  const fin=()=>{skip.remove();st.shown[key]=1;save();done&&done()};
  const step=()=>{
    if(my!==playing)return;if(i>=msgs.length)return fin();
    const ty=el(`<div class="typing">${msgs[i].k==="k"?"krčmář píše…":msgs[i].k==="v"?"🎙️ nahrává hlasovku…":"Žižka píše…"}</div>`);box.appendChild(ty);
    const len=msgs[i].k==="v"?60:String(msgs[i].t).length;
    setTimeout(()=>{if(my!==playing)return;ty.remove();const e=msgEl(msgs[i]);box.appendChild(e);i++;e.scrollIntoView({block:"end",behavior:"smooth"});setTimeout(step,350)},Math.min(1500,300+len*14));
  };
  skip.onclick=()=>{playing++;box.querySelectorAll(".typing").forEach(x=>x.remove());for(;i<msgs.length;i++)box.appendChild(msgEl(msgs[i]));fin()};
  box.after(skip);step();
}

/* ---------- camera ---------- */
let streams=[];
function stopCams(){streams.forEach(s=>s.getTracks().forEach(t=>t.stop()));streams=[]}
async function startCam(video,facing){
  if(!window.isSecureContext||!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw new Error("Kamera jede jen přes HTTPS (nebo localhost).");
  const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:facing||"environment"},audio:false});
  streams.push(s);video.srcObject=s;video.setAttribute("playsinline","");video.muted=true;await video.play();return s;
}
function camErr(e){const m=(e&&e.name)||"";if(/NotAllowed/.test(m))return "Kameru jste nepovolili. Hrajte bez ní, jde to i tlačítkem.";if(/NotFound|Overconstrained/.test(m))return "Kamera není k dispozici. Hrajte bez ní.";return (e&&e.message&&/HTTPS/.test(e.message))?e.message:"Kamera nejde. Hrajte bez ní."}
function photoInput(label,facing){
  const w=el(`<div><label class="btn sec sm" style="text-align:center">📸 ${esc(label||"Vyfotit (nepovinné)")}<input type="file" accept="image/*" capture="${facing||"environment"}" class="hide"></label><img class="photo hide" alt=""></div>`);
  const inp=w.querySelector("input"),img=w.querySelector("img");
  inp.onchange=()=>{const f=inp.files&&inp.files[0];if(!f)return;img.src=URL.createObjectURL(f);img.classList.remove("hide");w.file=f};
  return w;
}
function ph(text){return `<div class="ph"><b>PLACEHOLDER · [NA MÍSTĚ]</b>${esc(text)}</div>`}

/* ---------- blocks per station ---------- */
function blocks(s){
  const b=[{t:"go"},{t:"feed",msgs:s.intro,key:s.id+"i"}];
  s.steps.forEach((x,i)=>b.push({t:"step",i}));
  if(s.twist)b.push({t:"feed",msgs:s.twist,key:s.id+"tw",twist:true});
  if(st.roz)T.rozlucka.challenges.filter(c=>c.at===s.id).forEach(c=>b.push({t:"roz",c}));
  if(s.win&&s.win.length)b.push({t:"feed",msgs:s.win,key:s.id+"w"});
  if(s.fact)b.push({t:"fact"});
  if(s.next)b.push({t:"next"});else b.push({t:"final"});
  return b;
}

/* ---------- render ---------- */
function render(){
  playing++;stopCams();
  const app=$("#app");app.innerHTML="";window.scrollTo(0,0);renderTestbar();
  if(!st||!st.names)return renderStart(app);
  if(st.finished)return renderEnd(app);
  renderStation(app);
}
function renderStart(app){
  const M=T.meta;
  app.innerHTML=`<div class="hero"><img src="${IMG("kasna-1472.jpg")}" alt=""><div class="cap"><h1>${esc(M.title)}</h1><p>${esc(M.tagline)}</p></div></div>
  <div class="card"><p style="margin-top:0">${esc(M.intro)}</p>
  <div class="lab g">${esc(M.names_label)}</div><div class="names" id="names">${[0,1,2].map(i=>`<input type="text" maxlength="16" placeholder="Jméno ${i+1}" autocomplete="off">`).join("")}</div>
  <button class="btn sec sm" id="addName">+ další jméno</button>
  <div class="lab" style="margin-top:14px">${esc(M.team_label)}</div><input type="text" id="team" maxlength="24" placeholder="např. Kumpáni" autocomplete="off">
  <label class="chk"><input type="checkbox" id="roz"> ${esc(M.rozlucka_label)}</label>
  <div id="oslWrap" class="hide"><div class="lab">Oslavenec</div><select id="osl"></select></div>
  <div class="res" id="res"></div>
  <button class="btn" id="startBtn">${esc(M.start_btn)}</button></div>
  <div class="card"><div class="lab g">Pravidla</div><p style="margin:0;font-size:14.5px">${esc(M.rules)}</p></div>
  <p class="small">Kamera funguje jen přes HTTPS. Bez ní se všechno dá potvrdit tlačítkem.</p>`;
  const names=()=>[...app.querySelectorAll("#names input")].map(i=>i.value.trim()).filter(Boolean);
  const refreshOsl=()=>{$("#osl").innerHTML=names().map(n=>`<option>${esc(n)}</option>`).join("")};
  $("#addName").onclick=()=>{const c=app.querySelectorAll("#names input").length;if(c>=6)return toast("Max 6 hráčů.");const i=el(`<input type="text" maxlength="16" placeholder="Jméno ${c+1}" autocomplete="off">`);$("#names").appendChild(i);i.focus()};
  $("#names").addEventListener("input",refreshOsl);
  $("#roz").onchange=()=>{$("#oslWrap").classList.toggle("hide",!$("#roz").checked);refreshOsl()};
  $("#startBtn").onclick=()=>{const n=names();if(!n.length){$("#res").className="res bad";$("#res").textContent="Napište aspoň jedno jméno. Žižka si ho musí napsat na ruku.";return}
    st=newState(n,$("#team").value.trim(),$("#roz").checked,$("#osl").value);save();render()};
}
function renderStation(app){
  const s=STN[st.stage];
  app.appendChild(el(`<div style="margin-top:14px"><div class="lab g">Stanice ${s.n}/9</div><h2 style="margin:0;font-size:25px">${esc(s.place)}</h2><div class="small">${esc(s.sub)}</div></div>`));
  if(st.stage===0&&st.roz)app.appendChild(el(`<div class="card"><div class="lab g">🎉 Rozlučka</div>${F(T.rozlucka.intro)}</div>`));
  const B=blocks(s);
  for(let i=0;i<=Math.min(st.pos,B.length-1);i++)drawBlock(app,s,B,i,i===st.pos);
}
function advance(app,s,B){st.pos++;save();tick();renderTestbar();if(st.pos<B.length)drawBlock(app,s,B,st.pos,true)}
function drawBlock(app,s,B,i,live){
  const b=B[i];const next=()=>advance(app,s,B);
  if(b.t==="go"){
    const c=el(`<div class="card go"><div class="lab g">📍 Kam</div><div class="place">${esc(s.place)}</div><p style="margin:6px 0">${F(s.nav)}</p>${s.img?`<img src="${IMG(s.img)}" alt="">`:""}
      <div class="small"><a style="color:var(--gold)" target="_blank" rel="noopener" href="https://mapy.cz/fnc/v1/showmap?center=${GPS[s.id]}&zoom=18&marker=true">Ukázat na mapě</a></div></div>`);
    app.appendChild(c);
    if(live){const h=el(`<button class="btn" id="here">Jsme tady ▸</button>`);c.appendChild(h);h.onclick=()=>{h.remove();next()}}
  }
  else if(b.t==="feed"){
    const f=el(`<div class="feed"></div>`);
    if(b.twist)app.appendChild(el(`<div class="lab g" style="text-align:center;margin-top:18px">⚡ ZVRAT ⚡</div>`));
    app.appendChild(f);
    if(live)playFeed(f,b.msgs,b.key,next);else b.msgs.forEach(m=>f.appendChild(msgEl(m)));
  }
  else if(b.t==="step")drawStep(app,s,s.steps[b.i],live,next,b.i);
  else if(b.t==="roz"){
    const c=el(`<div class="card" style="border-color:var(--pink)"><div class="lab" style="color:var(--pink)">🎉 ${F(b.c.title)}</div><p style="margin:4px 0">${F(b.c.text)}</p></div>`);app.appendChild(c);
    if(live){const r=el(`<div class="row"><button class="btn">Hotovo ✓</button><button class="btn sec">Přeskočit</button></div>`);c.appendChild(r);r.querySelectorAll("button").forEach(x=>x.onclick=()=>{r.remove();next()})}
  }
  else if(b.t==="fact"){app.appendChild(el(`<div class="card fact"><div class="lab ok">✓ Fakt</div>${F(s.fact)}</div>`));if(live)next()}
  else if(b.t==="next")drawNext(app,s,live);
  else if(b.t==="final")drawFinal(app,s,live);
}

/* ---------- step card + hints ---------- */
function drawStep(app,s,x,live,next,idx){
  const c=el(`<div class="card pz" data-step="${idx}"><div class="lab g">🧩 Úkol${s.steps.length>1?" "+(idx+1)+"/"+s.steps.length:""}</div><h3>${F(x.title)}</h3><p style="margin:4px 0 8px">${F(x.text)}</p><div class="body"></div>${x.placeholder?ph(x.placeholder):""}${x.extra?`<p class="small">${F(x.extra)}</p>`:""}<div class="res"></div><div class="hintz"></div><div class="okfeed feed"></div></div>`);
  app.appendChild(c);
  const body=c.querySelector(".body"),res=c.querySelector(".res");
  const doneKey=s.id+"s"+idx;
  const solved=(skipped)=>{
    if(c.dataset.done)return;c.dataset.done=1;
    c.querySelectorAll(".body button,.body input,.hintz button").forEach(b=>b.disabled=true);
    res.className="res good";res.textContent=skipped?"⏭ Přeskočeno":"✓ Správně!";
    stopCams();
    playFeed(c.querySelector(".okfeed"),x.ok||[],doneKey,next);
  };
  const wrong=(msg)=>{st.wrong[s.id]=(st.wrong[s.id]||0)+1;save();res.className="res bad";res.textContent="✗ "+fill(msg||pick(x.bad||["Nesedí."]))+"  (−5 b)";c.classList.remove("shake");void c.offsetWidth;c.classList.add("shake")};
  const soft=(m)=>{res.className="res soft";res.textContent=m};
  if(!live){body.innerHTML=`<p class="small">✓ Vyřešeno</p>`;(x.ok||[]).forEach(m=>c.querySelector(".okfeed").appendChild(msgEl(m)));return}
  c._solve=solved;window.__curStep=()=>solved(true);
  (MECH[x.type]||MECH.photo)(body,x,{solved,wrong,soft,s});
  // hints (sdílené pro stanici)
  const hz=c.querySelector(".hintz");
  const drawH=()=>{hz.innerHTML="";const n=st.hints[s.id]||0;for(let i=0;i<n;i++)hz.appendChild(el(`<div class="hint"><b>Nápověda ${i+1}:</b> ${F(s.hints[i])}</div>`));
    const r=el(`<div class="row"></div>`);
    const hb=el(`<button class="btn ghost sm">${n>=3?"Nápovědy došly":`💡 Nápověda ${n+1}/3 (−${PTS.hint[n]} b)`}</button>`);hb.disabled=n>=3;hb.onclick=()=>{st.hints[s.id]=(st.hints[s.id]||0)+1;save();drawH()};
    const sk=el(`<button class="btn sec sm">Přeskočit (−${PTS.skip} b)</button>`);sk.onclick=()=>{if(!confirm("Opravdu přeskočit tenhle úkol? −"+PTS.skip+" bodů."))return;st.skip[s.id]=true;save();solved(true)};
    r.append(hb,sk);hz.appendChild(r)};
  drawH();
}

/* ---------- mechaniky ---------- */
const SVGS={
 gate(slots){let s=`<svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="160" fill="#efe6d4"/><g fill="none" stroke="#3a2a1a" stroke-width="2.2" stroke-linecap="round"><path d="M14 150V40h92v110"/><path d="M14 40l6-8h80l6 8"/><path d="M40 150V104a20 20 0 0 1 40 0v46"/><path d="M36 100h48"/></g>`;
  if(slots==="one")s+=`<rect x="58" y="58" width="4" height="30" fill="#3a2a1a"/>`;
  if(slots==="two")s+=`<rect x="46" y="58" width="4" height="30" fill="#3a2a1a"/><rect x="70" y="58" width="4" height="30" fill="#3a2a1a"/><path d="M55 64h10v10q-5 5-10 0z" fill="none" stroke="#3a2a1a" stroke-width="1.6"/>`;
  if(slots==="loops")s+=`<circle cx="34" cy="66" r="5" fill="#3a2a1a"/><circle cx="60" cy="66" r="5" fill="#3a2a1a"/><circle cx="86" cy="66" r="5" fill="#3a2a1a"/>`;
  return s+`<text x="60" y="22" font-family="Georgia" font-style="italic" font-size="10" text-anchor="middle" fill="#7a5a3a">most ↓ ?</text></svg>`},
 outline(){return `<svg viewBox="0 0 300 400" preserveAspectRatio="none"><g fill="none" stroke="#FF7EB6" stroke-width="4" stroke-dasharray="10 8" opacity=".9"><path d="M0 170 L300 140"/><path d="M0 300 L300 280"/><path d="M0 330 L300 312"/><path d="M230 130 V60 h14"/><circle cx="246" cy="64" r="6"/></g><text x="150" y="385" text-anchor="middle" fill="#FF7EB6" font-size="14" font-family="sans-serif">PLACEHOLDER obrys · obzor · zábradlí · lampa</text></svg>`}
};
const MECH={
 pick(body,x,h){
  const txt=x.options.every(o=>!o.img&&!o.svg);
  const g=el(`<div class="opts ${txt?"txt":""}"></div>`);body.appendChild(g);
  x.options.forEach((o,i)=>{const b=el(`<button class="opt">${o.img?`<img src="${IMG(o.img)}" alt="">`:""}${o.svg?SVGS.gate(T&&({brana1:"one",brana2:"two",brana3:"loops"})[o.svg]):""}<b>${F(o.label)}</b></button>`);
   b.onclick=()=>{if(i===x.correct){b.classList.add("good");h.solved(false)}else{b.classList.add("bad");h.wrong()}};g.appendChild(b)});
 },
 photo(body,x,h){
  const p=photoInput(x.photoLabel);body.appendChild(p);
  const c=el(`<button class="btn">${F(x.confirm||"Hotovo ✓")}</button>`);c.onclick=()=>h.solved(false);body.appendChild(c);
  if(x.fallback){const fb=el(`<button class="btn sec sm">Nejde to? (záloha)</button>`);body.appendChild(fb);fb.onclick=()=>{fb.remove();c.remove();p.remove();const w=el(`<div><p style="margin:10px 0 4px">${F(x.fallback.text)}</p></div>`);body.appendChild(w);MECH.pick(w,Object.assign({bad:x.fallback.bad},x.fallback),h)}}
 },
 grid(body,x,h){
  body.innerHTML=`<div class="camwrap"><video class="hide" muted playsinline></video><svg viewBox="0 0 250 250"></svg></div>
   <div class="segs">${[["up","očka nahoře"],["down","očka dole"],["left","očka vlevo"],["right","očka vpravo"]].map(([k,l])=>`<button data-o="${k}">${l}</button>`).join("")}</div>
   <button class="btn sec sm cam">📷 Mřížka přes kameru</button>
   <div class="row" style="margin-top:8px"><input type="text" placeholder="Slovo z čepelí" autocomplete="off" autocapitalize="characters" spellcheck="false"><button class="btn" style="flex:0 0 110px;margin-top:4px">Odeslat</button></div>`;
  const svg=body.querySelector("svg"),v=body.querySelector("video");let o=st.gridO||null,camOn=false;
  const draw=()=>{let s="";if(camOn)s+=`<rect width="250" height="250" fill="rgba(0,0,0,.25)"/>`;
   for(let r=0;r<5;r++)for(let k=0;k<5;k++)s+=`<text x="${25+k*50}" y="${34+r*50}" text-anchor="middle" font-family="ui-monospace,monospace" font-weight="800" font-size="25" fill="#F4EEE8" stroke="#000" stroke-width="${camOn?2.5:0}" paint-order="stroke">${x.grid[r][k]}</text>`;
   if(o){const P={TL:[25,25],TR:[225,25],BL:[25,225],BR:[225,225]},rings={up:["TL","TR"],down:["BL","BR"],left:["TL","BL"],right:["TR","BR"]}[o],opp={TL:"BR",BR:"TL",TR:"BL",BL:"TR"};
    s+=`<g stroke="#F2B53A" stroke-width="7" stroke-linecap="round" opacity=".45"><line x1="25" y1="25" x2="225" y2="225"/><line x1="225" y1="25" x2="25" y2="225"/></g>`;
    rings.forEach(k=>{const [a,b]=P[k];s+=`<circle cx="${a}" cy="${b}" r="22" fill="none" stroke="#F2B53A" stroke-width="5"/>`});s+=`<circle cx="125" cy="125" r="6" fill="#FF6B5E"/>`}
   svg.innerHTML=s};
  draw();
  body.querySelectorAll(".segs button").forEach(b=>{b.classList.toggle("on",b.dataset.o===o);b.onclick=()=>{o=b.dataset.o;st.gridO=o;save();body.querySelectorAll(".segs button").forEach(y=>y.classList.toggle("on",y===b));draw()}});
  body.querySelector(".cam").onclick=async e=>{try{await startCam(v);v.classList.remove("hide");camOn=true;draw();e.target.remove()}catch(err){toast(camErr(err))}};
  const inp=body.querySelector("input"),send=()=>{const n=norm(inp.value);if(!n)return h.soft("Nic jste nenapsali.");if(x.answers.includes(n))return h.solved(false);if(x.near&&x.near[n])return h.soft(x.near[n]);h.wrong()};
  body.querySelector(".row .btn").onclick=send;inp.onkeydown=e=>{if(e.key==="Enter")send()};
 },
 wheel(body,x,h){
  const A="ABCDEFGHIJKLMNOPQRSTUVWXYZ";let k=st.wk||0;
  body.innerHTML=`<div class="cipher">${esc(x.cipher)}</div><div class="wheel"><div class="r1">${A}</div><div class="r2"></div></div>
   <div class="row" style="margin-top:6px"><button class="btn sec" style="margin:0">−</button><div class="kk" style="text-align:center;font:900 24px ui-monospace,monospace;padding-top:10px">0</div><button class="btn sec" style="margin:0">+</button></div>
   <div class="row" style="margin-top:8px"><input type="text" placeholder="Text nebo klíč" autocomplete="off" autocapitalize="characters" spellcheck="false"><button class="btn send" style="flex:0 0 110px;margin-top:4px">Odeslat</button></div>`;
  const d=()=>{body.querySelector(".r2").textContent=[...A].map((c,i)=>A[(i-k+260)%26]).join("");body.querySelector(".kk").textContent=k};
  const [m,p]=body.querySelectorAll(".row .btn.sec");m.onclick=()=>{k=(k+25)%26;st.wk=k;d()};p.onclick=()=>{k=(k+1)%26;st.wk=k;d()};d();
  const inp=body.querySelector("input"),send=()=>{const n=norm(inp.value);if(!n)return h.soft("Nic jste nenapsali.");if(x.answers.includes(n))return h.solved(false);if(x.near&&x.near[n])return h.soft(x.near[n]);h.wrong()};
  body.querySelector(".send").onclick=send;inp.onkeydown=e=>{if(e.key==="Enter")send()};
 },
 eliminate(body,x,h){
  body.innerHTML=`<ul class="clues">${x.clues.map(c=>`<li>${F(c)}</li>`).join("")}</ul><div class="elim">${x.options.map((o,i)=>`<button data-i="${i}">${esc(o)}</button>`).join("")}</div><button class="btn go2" disabled>Škrtejte, dokud nezbyde jedna</button>`;
  const btns=[...body.querySelectorAll(".elim button")],go=body.querySelector(".go2");
  const upd=()=>{const left=btns.filter(b=>!b.classList.contains("x"));go.disabled=left.length!==1;go.textContent=left.length===1?"Jdeme po šipce: "+left[0].textContent+" ▸":"Zbývá "+left.length+" šipek, škrtejte dál"};
  btns.forEach(b=>b.onclick=()=>{b.classList.toggle("x");upd()});
  go.onclick=()=>{const left=btns.filter(b=>!b.classList.contains("x"));if(+left[0].dataset.i===x.correct)h.solved(false);else{h.wrong();left[0].classList.remove("x")}};
  upd();
 },
 reveal(body,x,h){
  const delay=TEST?3:x.delay;
  body.innerHTML=`<img class="photo" src="${IMG(x.crop)}" alt=""><div class="small cd"></div>`;
  const img=body.querySelector("img"),cd=body.querySelector(".cd");let t=delay;
  const show=()=>{img.src=IMG(x.full);cd.textContent="Celá fotka odkryta."};
  const iv=setInterval(()=>{t--;if(t<=0){clearInterval(iv);show()}else cd.textContent="Celá fotka za "+t+" s"},1000);cd.textContent="Celá fotka za "+t+" s";
  const p=photoInput();body.appendChild(p);
  const c=el(`<button class="btn">${F(x.confirm)}</button>`);c.onclick=()=>{clearInterval(iv);h.solved(false)};body.appendChild(c);
 },
 overlay(body,x,h){
  body.innerHTML=`<div class="camwrap tall"><video class="hide" muted playsinline></video>${SVGS.outline()}</div><button class="btn sec sm cam">📷 Zapnout kameru</button>`;
  const v=body.querySelector("video");
  body.querySelector(".cam").onclick=async e=>{try{await startCam(v);v.classList.remove("hide");e.target.remove()}catch(err){toast(camErr(err))}};
  const c=el(`<button class="btn">${F(x.confirm)}</button>`);c.onclick=()=>h.solved(false);body.appendChild(c);
  const fb=el(`<button class="btn sec sm">Kamera nejede? (záloha)</button>`);body.appendChild(fb);
  fb.onclick=()=>{stopCams();body.innerHTML=`<p style="margin:10px 0 4px">${F(x.fallback.text)}</p>`;MECH.pick(body,Object.assign({},x.fallback),h)};
 },
 sort(body,x,h){
  const order=[];const cards=x.cards.map((c,i)=>({c,i}));
  // zamíchat deterministicky jinak než správné pořadí
  const shuffled=[3,0,5,1,6,2,4].map(i=>cards[i]);
  body.innerHTML=`<div class="cards7">${shuffled.map(o=>`<button data-i="${o.i}"><span class="e">${o.c.e}</span>${esc(o.c.t)}<span class="no hide"></span></button>`).join("")}</div><button class="btn sec sm reset">Znovu</button>`;
  const btns=[...body.querySelectorAll(".cards7 button")];
  const reset=()=>{order.length=0;btns.forEach(b=>{b.classList.remove("on");b.querySelector(".no").classList.add("hide")})};
  body.querySelector(".reset").onclick=reset;
  btns.forEach(b=>b.onclick=()=>{if(b.classList.contains("on"))return;order.push(+b.dataset.i);b.classList.add("on");const n=b.querySelector(".no");n.textContent=order.length;n.classList.remove("hide");
    if(order.length===x.cards.length){if(order.every((v,i)=>v===i))h.solved(false);else{h.wrong();setTimeout(reset,700)}}});
 }
};

/* ---------- mezi stanicemi ---------- */
function drawNext(app,s,live){
  const n=s.next;
  const c=el(`<div class="card go"><div class="lab g">➜ Kam dál</div><div class="place">${esc(n.title)}</div><p style="margin:6px 0">${F(n.text)}</p>${n.img?`<img src="${IMG(n.img)}" alt="">`:""}${n.placeholder?ph(n.placeholder):""}<div class="sub"></div></div>`);
  app.appendChild(c);const sub=c.querySelector(".sub");
  if(!live){c.appendChild(el(`<p class="small">✓</p>`));return}
  const tasks=[];
  if(n.cestou)tasks.push(done=>{const x=n.cestou;const w=el(`<div class="card" style="margin:10px 0 0;background:var(--card2)"><div class="lab g">🚶 ${F(x.title)}</div><p style="margin:4px 0">${F(x.text)}</p>${ph(x.placeholder)}<div class="b"></div><div class="hh"></div><div class="feed"></div></div>`);sub.appendChild(w);
    let hn=0;const hb=el(`<button class="btn ghost sm">💡 Nápověda</button>`);hb.onclick=()=>{if(hn<3){w.querySelector(".hh").appendChild(el(`<div class="hint">${F(x.hints[hn])}</div>`));hn++}if(hn>=3)hb.disabled=true};
    MECH.photo(w.querySelector(".b"),x,{solved:()=>{w.querySelectorAll(".b button,.b input").forEach(b=>b.disabled=true);hb.remove();playFeed(w.querySelector(".feed"),x.ok,s.id+"c",done)},wrong(){},soft(){}});w.appendChild(hb)});
  if(n.photonav)tasks.push(done=>{let i=0;const w=el(`<div style="margin-top:10px"></div>`);sub.appendChild(w);
    const step=()=>{if(i>=n.photonav.length)return done();const p=n.photonav[i];const d=el(`<div class="card" style="margin:10px 0 0;background:var(--card2)"><div class="lab g">📷 Noční fotka ${i+1}/${n.photonav.length}</div><p style="margin:4px 0">${F(p.text)}</p><img class="photo" src="${IMG(p.img)}" alt="">${p.placeholder?ph(p.placeholder):""}<div class="feed"></div></div>`);w.appendChild(d);
      const b=el(`<button class="btn">Jsme tady ✓</button>`);d.appendChild(b);b.onclick=()=>{b.remove();i++;if(p.voice)playFeed(d.querySelector(".feed"),[{k:"v",t:p.voice}],s.id+"pv"+i,step);else step()};if(i>0)d.scrollIntoView({block:"start",behavior:"smooth"})};
    step()});
  if(n.look)tasks.push(done=>{n.look.forEach(p=>sub.appendChild(el(`<div class="card" style="margin:10px 0 0;background:var(--card2)"><div class="lab g">👀 Cestou: ${F(p.title)}</div><img class="photo" src="${IMG(p.img)}" alt=""><div class="msg z" style="max-width:100%">${F(p.text)}</div></div>`)));done()});
  const run=k=>{if(k<tasks.length)return tasks[k](()=>run(k+1));
    const b=el(`<button class="btn" id="nextBtn">Další stanice ▸</button>`);c.appendChild(b);b.onclick=()=>{st.stage++;st.pos=0;save();render()}};
  run(0);
}

/* ---------- finále ---------- */
function drawFinal(app,s,live){
  const FI=T.finale;
  const c=el(`<div class="card" style="text-align:center"><svg class="chest" viewBox="0 0 120 100"><rect x="14" y="52" width="92" height="42" rx="4" fill="#5a3b1e" stroke="#2b1b0b" stroke-width="3"/><rect x="14" y="68" width="92" height="5" fill="#8a6a2a"/><g class="lid"><path d="M14 54 Q60 18 106 54 Z" fill="#6b4623" stroke="#2b1b0b" stroke-width="3"/></g><rect x="52" y="60" width="16" height="18" rx="2" fill="#c9a44a"/></svg><div class="big" style="font-size:26px">${esc(FI.chest_empty)}</div><div class="feed" style="text-align:left"></div><div class="sel"></div></div>`);
  app.appendChild(c);
  setTimeout(()=>c.querySelector(".chest").classList.add("open"),150);
  playFeed(c.querySelector(".feed"),FI.after_chest,"fin1",()=>selfie(c.querySelector(".sel")));
}
function selfie(box){
  const FI=T.finale;
  box.innerHTML=`<div class="lab g" style="margin-top:10px">📸 ${esc(FI.selfie_title)}</div><p style="margin:4px 0">${esc(FI.selfie_text)}</p>
   <div class="camwrap tall hide"><video muted playsinline style="transform:scaleX(-1)"></video></div>
   <button class="btn cam">📷 Zapnout přední kameru</button>
   <label class="btn sec sm" style="text-align:center">🖼️ Vybrat / vyfotit fotku<input type="file" accept="image/*" capture="user" class="hide"></label>
   <button class="btn sec sm noph">Bez fotky (jen rámeček)</button>
   <div class="out"></div>`;
  const v=box.querySelector("video"),wrap=box.querySelector(".camwrap");
  const done=(src)=>{stopCams();const url=frame(src);box.querySelector(".out").innerHTML=`<img class="photo full" src="${url}" alt="selfie"><a class="btn" download="kumpani-tabor.png" href="${url}" id="saveSelfie" style="text-align:center;text-decoration:none">⬇ Uložit do galerie</a>${navigator.canShare?`<button class="btn sec sm" id="shareSelfie">Sdílet</button>`:""}<div class="feed" style="text-align:left"></div>`;
    const sh=$("#shareSelfie");if(sh)sh.onclick=async()=>{try{const b=await (await fetch(url)).blob();const f=new File([b],"kumpani-tabor.png",{type:"image/png"});if(navigator.canShare({files:[f]}))await navigator.share({files:[f],title:"KUMPÁNI"});}catch(e){}};
    st.selfie=true;save();
    playFeed(box.querySelector(".out .feed"),FI.after_selfie,"fin2",()=>{const b=el(`<button class="btn" id="toEnd">Skóre a certifikát ▸</button>`);box.appendChild(b);b.onclick=()=>{st.finished=Date.now();save();render()}});
  };
  box.querySelector(".cam").onclick=async e=>{try{await startCam(v,"user");wrap.classList.remove("hide");e.target.textContent="Cvak! 📸";e.target.onclick=()=>done(v)}catch(err){toast(camErr(err))}};
  box.querySelector("input").onchange=e=>{const f=e.target.files[0];if(!f)return;const im=new Image();im.onload=()=>done(im);im.src=URL.createObjectURL(f)};
  box.querySelector(".noph").onclick=()=>done(null);
}
function frame(src){
  const FI=T.finale,W=1080,H=1350,cv=document.createElement("canvas");cv.width=W;cv.height=H;const g=cv.getContext("2d");
  g.fillStyle="#14110F";g.fillRect(0,0,W,H);
  if(src){const sw=src.videoWidth||src.naturalWidth||src.width,sh=src.videoHeight||src.naturalHeight||src.height;const r=Math.max((W-80)/sw,(H-360)/sh);const dw=sw*r,dh=sh*r;g.save();g.beginPath();g.rect(40,190,W-80,H-360);g.clip();
    if(src.tagName==="VIDEO"){g.translate(W,0);g.scale(-1,1)}g.drawImage(src,(W-dw)/2,190+(H-360-dh)/2,dw,dh);g.restore()}
  else{g.fillStyle="#2A231F";g.fillRect(40,190,W-80,H-360);g.fillStyle="#A89C92";g.font="600 44px sans-serif";g.textAlign="center";g.fillText("(tady jste měli být vy)",W/2,H/2)}
  g.strokeStyle="#F2B53A";g.lineWidth=14;g.strokeRect(40,190,W-80,H-360);
  g.textAlign="center";g.fillStyle="#F2B53A";g.font="900 120px sans-serif";g.fillText(FI.frame_top,W/2,140);
  g.fillStyle="#F4EEE8";g.font="600 38px sans-serif";g.fillText(FI.frame_sub+" · "+fmt(elapsed()),W/2,178+0);
  g.font="italic 600 40px Georgia,serif";g.fillText(FI.frame_caption,W/2,H-110);
  g.fillStyle="#A89C92";g.font="600 32px sans-serif";g.fillText(joinNames(st.names),W/2,H-60);
  g.fillStyle="#F2B53A";g.beginPath();g.arc(W-130,H-250,78,0,7);g.fill();g.fillStyle="#1b1206";g.font="900 40px sans-serif";g.fillText("J. Ž.",W-130,H-262);g.font="44px sans-serif";g.fillText("👍",W-130,H-212);
  return cv.toDataURL("image/png");
}
function certificate(roz){
  const C=roz?T.rozlucka:T.finale,W=1080,H=1350,cv=document.createElement("canvas");cv.width=W;cv.height=H;const g=cv.getContext("2d");
  g.fillStyle="#EFE3C8";g.fillRect(0,0,W,H);g.strokeStyle="#7a5a2a";g.lineWidth=10;g.strokeRect(40,40,W-80,H-80);g.lineWidth=3;g.strokeRect(62,62,W-124,H-124);
  g.fillStyle="#3a2a1a";g.textAlign="center";g.font="900 58px Georgia,serif";wrap(g,C.cert_title,W/2,230,W-200,70);
  g.font="500 40px Georgia,serif";wrap(g,fill(C.cert_text),W/2,480,W-220,58);
  const sc=score();g.font="700 36px sans-serif";g.fillText((st.team?st.team+" · ":"")+sc.total+" bodů · "+fmt(elapsed()),W/2,H-330);
  g.font="italic 44px Georgia,serif";g.fillText(C.cert_sign,W/2,H-220);g.font="600 26px sans-serif";g.fillStyle="#7a5a2a";g.fillText("Co se stalo v Táboře · "+new Date().toLocaleDateString("cs-CZ"),W/2,H-120);
  return cv.toDataURL("image/png");
}
function wrap(g,text,x,y,maxW,lh){const w=String(text).split(" ");let line="";for(const word of w){const t=line?line+" "+word:word;if(g.measureText(t).width>maxW&&line){g.fillText(line,x,y);y+=lh;line=word}else line=t}g.fillText(line,x,y)}

function renderEnd(app){
  const sc=score(),tt=T.finale.titles.find(([a])=>sc.total>=a)[1];
  app.innerHTML=`<div class="card" style="text-align:center;margin-top:18px"><div class="lab g">${esc(st.team||"Kumpáni")} · ${esc(joinNames(st.names))}</div><div class="big">${sc.total} b</div><div style="font-size:19px;font-weight:800">${esc(tt)}</div><p class="small">Čas ${fmt(elapsed())}</p>
   <table><tr><td>9 stanic</td><td>+${sc.base}</td></tr><tr><td>Nápovědy</td><td>−${sc.h}</td></tr><tr><td>Špatné odpovědi</td><td>−${sc.w}</td></tr><tr><td>Přeskočeno</td><td>−${sc.sk}</td></tr><tr><td>Časový bonus (pod 90 min)</td><td>+${sc.bonus}</td></tr></table></div>
   <div class="card"><div class="lab g">📜 Certifikát</div><img class="photo full" id="cert" alt="certifikát"><a class="btn" id="certDl" download="certifikat-kumpani.png" style="text-align:center;text-decoration:none">⬇ Uložit certifikát</a>
   ${st.roz?`<div class="lab" style="margin-top:14px;color:var(--pink)">🎉 Rozlučka</div><img class="photo full" id="cert2" alt="certifikát rozlučka"><a class="btn sec" id="certDl2" download="certifikat-rozlucka.png" style="text-align:center;text-decoration:none">⬇ Certifikát pro oslavence</a>`:""}</div>
   <div class="card"><p style="margin:0">Co se stalo v Táboře, zůstává v Táboře. A příště platíte vy. 🍺</p></div>
   <button class="btn sec" id="again">Nová hra</button>`;
  const u=certificate(false);$("#cert").src=u;$("#certDl").href=u;
  if(st.roz){const u2=certificate(true);$("#cert2").src=u2;$("#certDl2").href=u2}
  $("#again").onclick=()=>{if(!confirm("Smazat postup a začít znova?"))return;st=null;localStorage.removeItem(KEY);render()};
}

/* ---------- menu ---------- */
function openMenu(){
  const m=$("#menu"),sh=$("#menuSheet");
  sh.innerHTML=`<div class="row" style="align-items:center"><h3 style="margin:0">Menu</h3><button class="ib" style="flex:0" id="mClose">✕</button></div>
   <div class="card"><div class="lab g">Pravidla</div><p style="margin:0;font-size:14.5px">${esc(T.meta.rules)}</p></div>
   ${st&&st.names&&!st.finished?`<button class="btn sec" id="mPause">${st.pausedAt?"▶ Pokračovat (stopky běží)":"⏸ Pauza (stopky stojí)"}</button>`:""}
   ${st?`<button class="btn ghost" id="mReset">Reset hry (smaže postup)</button>`:""}`;
  m.classList.add("on");
  $("#mClose").onclick=()=>m.classList.remove("on");m.onclick=e=>{if(e.target===m)m.classList.remove("on")};
  const p=$("#mPause");if(p)p.onclick=()=>{if(st.pausedAt){st.pausedTotal+=Date.now()-st.pausedAt;st.pausedAt=null}else st.pausedAt=Date.now();save();tick();m.classList.remove("on")};
  const r=$("#mReset");if(r)r.onclick=()=>{if(!confirm("Opravdu smazat postup?"))return;st=null;localStorage.removeItem(KEY);m.classList.remove("on");render()};
}
$("#btnMenu").onclick=openMenu;

/* ---------- test mode ---------- */
function renderTestbar(){
  const t=$("#testbar");if(!TEST){t.innerHTML="";return}
  if(window.__tbMin){t.innerHTML=`<button id="tMin">🧪 TEST</button>`;$("#tMin").onclick=()=>{window.__tbMin=false;renderTestbar()};return}
  t.innerHTML=`<span id="tMin" style="cursor:pointer">🧪 TEST ▾</span> ${st&&st.names?`· st. ${st.stage+1} · blok ${st.pos}`:""}<button id="tStep">✓ Vyřešit úkol</button><button id="tNext">⏭ Další stanice</button><select id="tJump"><option value="">skok na…</option>${STN.map((s,i)=>`<option value="${i}">${s.n}. ${esc(s.place)}</option>`).join("")}<option value="end">konec</option></select><button id="tFast">${window.__fast?"rychlý chat ✓":"rychlý chat"}</button>`;
  $("#tMin").onclick=()=>{window.__tbMin=true;renderTestbar()};
  $("#tStep").onclick=()=>{window.__curStep&&window.__curStep()};
  $("#tNext").onclick=()=>{if(!st||!st.names)return;if(st.stage<8){st.stage++;st.pos=0}else st.finished=Date.now();save();render()};
  $("#tJump").onchange=e=>{if(!st||!st.names)return;const v=e.target.value;if(v==="end")st.finished=Date.now();else{st.stage=+v;st.pos=0;st.finished=null}save();render()};
  $("#tFast").onclick=()=>{window.__fast=!window.__fast;renderTestbar()};
}
window.GAME={get state(){return st},render,score};
if(TEST&&/[?&]fast=1/.test(location.search))window.__fast=true;
render();tick();
