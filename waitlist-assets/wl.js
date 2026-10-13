/* Areviax waitlist — shared interactions. No libraries; every effect is feature-checked and respects reduced motion. */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse=matchMedia('(pointer: coarse)').matches;
const product=document.body.dataset.product||'mass';
if(reduced)document.documentElement.classList.add('noanim');

/* scroll progress + cursor spotlight */
const bar=$('#progress');
function onScroll(){const h=document.documentElement;const p=h.scrollTop/(h.scrollHeight-innerHeight||1);if(bar)bar.style.width=(p*100)+'%';parallax();}
addEventListener('scroll',onScroll,{passive:true});
addEventListener('pointermove',e=>{document.documentElement.style.setProperty('--mx',e.clientX+'px');document.documentElement.style.setProperty('--my',e.clientY+'px');mouse.x=e.clientX;mouse.y=e.clientY;},{passive:true});

/* hero headline: split into animated characters (words never break mid-word; gradient spans keep their gradient) */
$$('[data-split]').forEach(el=>{
  let i=0;
  function split(node,gold){
    const out=[];
    node.childNodes.forEach(n=>{
      if(n.nodeType===3){
        n.textContent.split(/(\s+)/).forEach(w=>{
          if(!w)return;
          if(/^\s+$/.test(w)){out.push(' ');return;}
          out.push('<span style="display:inline-block;white-space:nowrap">'+[...w].map(c=>'<span class="ch'+(gold?' gold-text':'')+'" style="--i:'+(i++)+'">'+c+'</span>').join('')+'</span>');
        });
      }else if(n.nodeType===1){out.push(split(n,gold||n.classList.contains('gold-text')));}
    });
    return out.join('');
  }
  const lines=el.innerHTML.split('<br>');
  el.innerHTML=lines.map(l=>{const d=document.createElement('div');d.innerHTML=l;return '<span class="ln">'+split(d,false)+'</span>';}).join('');
});

/* rotating typewriter */
(function(){
  const el=$('#rotator');if(!el)return;
  const words=JSON.parse(el.dataset.words);let w=0,c=0,del=false;
  if(reduced){el.textContent=words[0];return;}
  (function tick(){
    const full=words[w];
    el.firstChild&&(el.firstChild.nodeValue='');
    c+=del?-1:1;el.textContent=full.slice(0,c);
    let t=del?28:55;
    if(!del&&c===full.length){t=1700;del=true;}
    else if(del&&c===0){del=false;w=(w+1)%words.length;t=350;}
    setTimeout(tick,t);
  })();
})();

/* scroll reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.14,rootMargin:'0px 0px -6% 0px'});
$$('[data-reveal],.road-wrap,.ring-stage,.week').forEach(el=>io.observe(el));

/* 3D tilt on the phone + cards, glow follows the pointer */
function tilt(el,max){
  if(coarse||reduced)return;
  el.addEventListener('pointermove',e=>{
    const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    el.style.setProperty('--ry',((x-.5)*max)+'deg');el.style.setProperty('--rx',((.5-y)*max)+'deg');
    el.style.setProperty('--cx',(x*100)+'%');el.style.setProperty('--cy',(y*100)+'%');
  });
  el.addEventListener('pointerleave',()=>{el.style.setProperty('--ry','0deg');el.style.setProperty('--rx','0deg');});
}
$$('.card').forEach(c=>tilt(c,6));
const heroStage=$('.stage');
if(heroStage&&!coarse&&!reduced){
  const ph=$('.phone',heroStage);
  heroStage.addEventListener('pointermove',e=>{
    const r=heroStage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    ph.style.setProperty('--ry',(x*22)+'deg');ph.style.setProperty('--rx',(-y*16)+'deg');
    $$('.orb',heroStage).forEach(o=>{o.style.setProperty('--px',x*40);o.style.setProperty('--py',y*30);});
  });
  heroStage.addEventListener('pointerleave',()=>{ph.style.setProperty('--ry','0deg');ph.style.setProperty('--rx','0deg');$$('.orb',heroStage).forEach(o=>{o.style.setProperty('--px',0);o.style.setProperty('--py',0);});});
}

/* magnetic buttons */
if(!coarse&&!reduced)$$('.btn').forEach(b=>{
  b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.setProperty('--bx',((e.clientX-r.left-r.width/2)*.18)+'px');b.style.setProperty('--by',((e.clientY-r.top-r.height/2)*.28)+'px');});
  b.addEventListener('pointerleave',()=>{b.style.setProperty('--bx','0px');b.style.setProperty('--by','0px');});
});

/* parallax on elements with data-par */
function parallax(){if(reduced)return;const y=scrollY;$$('[data-par]').forEach(el=>{const r=el.getBoundingClientRect();const c=(r.top+r.height/2-innerHeight/2);el.style.transform='translate3d(0,'+(c*parseFloat(el.dataset.par))+'px,0)';});}

/* sticky story: swap the phone screen as steps scroll past */
(function(){
  const steps=$$('.step');if(!steps.length)return;
  const imgs=$$('.phone .scr img',$('.story'));
  const so=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){steps.forEach(s=>s.classList.toggle('on',s===e.target));const n=+e.target.dataset.img;imgs.forEach((im,i)=>im.classList.toggle('on',i===n));}
  }),{threshold:.55});
  steps.forEach(s=>so.observe(s));
  if(imgs[0])imgs[0].classList.add('on');
  steps[0].classList.add('on');
})();

/* hero phone: cycle screens */
(function(){const imgs=$$('.stage .phone .scr img');if(imgs.length<2)return;let i=0;imgs[0].classList.add('on');if(reduced)return;setInterval(()=>{imgs[i].classList.remove('on');i=(i+1)%imgs.length;imgs[i].classList.add('on');},3200);})();

/* animated counters */
$$('[data-count]').forEach(el=>{
  const to=parseFloat(el.dataset.count),suf=el.dataset.suf||'',dec=(el.dataset.count.split('.')[1]||'').length;
  const co=new IntersectionObserver(es=>{if(!es[0].isIntersecting)return;co.disconnect();
    if(reduced){el.textContent=to.toFixed(dec)+suf;return;}
    const t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1800),e=1-Math.pow(1-k,4);el.textContent=(to*e).toFixed(dec)+suf;if(k<1)requestAnimationFrame(f);})(t0);
  });co.observe(el);
});

/* interactive crate (Mass) */
(function(){
  const box=$('#crate');if(!box)return;
  const prizes=[
    {n:'Zeus, King of Olympus',r:'Legendary',c:'#ffcf4d',i:'mass-app/images/relics/coleman.png',w:3},
    {n:'Poseidon, Earth-Shaker',r:'Epic',c:'#b266ff',i:'mass-app/images/relics/crystalwave.png',w:6},
    {n:'Athena’s Owl',r:'Epic',c:'#b266ff',i:'mass-app/images/relics/owl.png',w:6},
    {n:'Winged Nike',r:'Super Rare',c:'#4e8fe0',i:'mass-app/images/relics/nike.png',w:12},
    {n:'Cerberus, Hound of the Gates',r:'Epic',c:'#b266ff',i:'mass-app/images/relics/uw_cerberus.png',w:6},
    {n:'Trident of Poseidon',r:'Mythic',c:'#e0455a',i:'mass-app/images/relics/sea_trident.png',w:4},
    {n:'Cup of Lethe',r:'Epic',c:'#b266ff',i:'mass-app/images/relics/uw_lethe.png',w:6},
    {n:'Horn of Abundance',r:'Super Rare',c:'#4e8fe0',i:'mass-app/images/relics/cornucopia.png',w:12},
    {n:'Hermes, Swift Messenger',r:'Super Rare',c:'#4e8fe0',i:'mass-app/images/relics/olym_hermes.png',w:12},
    {n:'Charon’s Obol',r:'Rare',c:'#3dbe6f',i:'mass-app/images/relics/uw_obol.png',w:20},
    {n:'Victor’s Amphora',r:'Common',c:'#9aa0a8',i:'mass-app/images/relics/amphora.png',w:30}
  ];
  const img=$('img.crate',box),prize=$('.prize',box),tag=$('.tag',box),flash=$('.flash',box),hint=$('#crateHint');
  const closed=img.dataset.closed,open=img.dataset.open;let busy=false,opens=0;
  function pick(){const t=prizes.reduce((s,p)=>s+p.w,0);let x=Math.random()*t;for(const p of prizes){x-=p.w;if(x<=0)return p;}return prizes[prizes.length-1];}
  function go(){
    if(busy)return;busy=true;
    if(box.classList.contains('open')){box.classList.remove('open');img.src=closed;busy=false;hint.textContent='Tap the crate again';return;}
    box.classList.add('shake');
    setTimeout(()=>{
      box.classList.remove('shake');img.src=open;flash.classList.remove('go');void flash.offsetWidth;flash.classList.add('go');
      const p=pick();prize.src=p.i;box.style.setProperty('--rc',p.c);tag.innerHTML=p.n+'<br><small style="letter-spacing:.3em;font-size:11px">'+p.r+'</small>';
      box.classList.add('open');opens++;hint.textContent=opens>2?'Same dopamine, but you earned it in the gym.':'Tap again to close it — then try your luck again';busy=false;
      if(p.r==='Legendary'||p.r==='Mythic')confettiBurst(innerWidth/2,innerHeight/2,140);
    },520);
  }
  box.addEventListener('click',go);box.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});
})();

/* embers / starfield background */
const mouse={x:-999,y:-999};
(function(){
  const cv=$('#fx');if(!cv||reduced)return;const ctx=cv.getContext('2d');let W,H,P=[];const dpr=Math.min(2,devicePixelRatio||1);
  function size(){W=cv.width=innerWidth*dpr;H=cv.height=innerHeight*dpr;cv.style.width=innerWidth+'px';cv.style.height=innerHeight+'px';}
  size();addEventListener('resize',size);
  const N=coarse?46:110,star=product==='os';
  function mk(init){return {x:Math.random()*W,y:init?Math.random()*H:H+20,r:(Math.random()*1.8+.4)*dpr,v:(Math.random()*.6+.25)*dpr*(star?.25:1),a:Math.random()*.7+.2,ph:Math.random()*6.28,hue:star?(Math.random()<.2?270:215):(Math.random()<.5?32:44)};}
  for(let i=0;i<N;i++)P.push(mk(true));
  let t=0;
  (function loop(){
    t+=.016;ctx.clearRect(0,0,W,H);
    for(const p of P){
      p.ph+=.02;const dx=mouse.x*dpr-p.x,dy=mouse.y*dpr-p.y,d=Math.hypot(dx,dy);
      if(d<170*dpr){p.x-=dx/d*1.6*dpr;p.y-=dy/d*1.6*dpr;}
      p.y-=star?p.v*.35:p.v;p.x+=Math.sin(p.ph)*.4*dpr;
      if(p.y<-20||p.x<-20||p.x>W+20){Object.assign(p,mk(false));if(star)p.y=Math.random()*H;}
      const tw=.6+.4*Math.sin(p.ph*2);
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);
      ctx.fillStyle='hsla('+p.hue+',95%,'+(star?78:62)+'%,'+(p.a*tw)+')';ctx.shadowBlur=14*dpr;ctx.shadowColor='hsla('+p.hue+',95%,60%,.9)';ctx.fill();
    }
    ctx.shadowBlur=0;
    if(star){ // constellation lines between near stars
      for(let i=0;i<P.length;i+=2)for(let j=i+2;j<P.length;j+=3){const a=P[i],b=P[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<120*dpr){ctx.strokeStyle='rgba(140,170,255,'+(0.12*(1-d/(120*dpr)))+')';ctx.lineWidth=dpr*.6;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
    }
    requestAnimationFrame(loop);
  })();
})();

/* confetti */
function confettiBurst(x,y,n){
  if(reduced)return;let cv=$('#confetti');if(!cv){cv=document.createElement('canvas');cv.id='confetti';document.body.appendChild(cv);}
  const ctx=cv.getContext('2d');cv.width=innerWidth;cv.height=innerHeight;
  const cols=['#ffe3a1','#e9b955','#ff7a2e','#ffffff','#7aa7ff','#ff4d1c'];
  const P=Array.from({length:n||120},()=>({x,y,vx:(Math.random()-.5)*16,vy:-Math.random()*16-4,s:Math.random()*8+4,r:Math.random()*6,vr:(Math.random()-.5)*.4,c:cols[Math.floor(Math.random()*cols.length)],l:1}));
  (function f(){ctx.clearRect(0,0,cv.width,cv.height);let alive=0;for(const p of P){p.vy+=.45;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;p.r+=p.vr;p.l-=.008;if(p.l>0&&p.y<cv.height+20){alive++;ctx.save();ctx.globalAlpha=Math.max(0,p.l);ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);ctx.restore();}}if(alive)requestAnimationFrame(f);else ctx.clearRect(0,0,cv.width,cv.height);})();
}
window.confettiBurst=confettiBurst;

/* referral capture + form */
const ENDPOINT='https://formspree.io/f/mwlvrbkw';   // set to a real Formspree (or equivalent) URL to collect emails
const SUPPORT='areviaxsupport@gmail.com';
let ref=null;try{const u=new URLSearchParams(location.search).get('ref');if(u)localStorage.setItem('arx_ref',u.slice(0,60));ref=localStorage.getItem('arx_ref');}catch(e){ref=new URLSearchParams(location.search).get('ref');}
const rb=$('#ref');if(rb&&ref){rb.textContent='👋 Invited by '+ref.slice(0,60);rb.style.display='inline-flex';}
$$('form.form').forEach(f=>f.addEventListener('submit',async e=>{
  e.preventDefault();const em=f.email.value.trim(),msg=f.parentElement.querySelector('.msg');
  if(!/^\S+@\S+\.\S+$/.test(em)){msg.textContent='That email doesn’t look right — mind checking it?';return;}
  const btn=f.querySelector('button');btn.disabled=true;const prev=btn.textContent;btn.textContent='…';
  try{
    if(ENDPOINT.startsWith('http')){
      const r=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({email:em,product,ref,source:location.pathname})});
      if(!r.ok)throw new Error('bad');
      msg.textContent='You’re on the list. Watch your inbox — the gods keep their word.';
    }else{
      // No signup backend is connected yet: be honest, and make it work via email instead of silently dropping the address.
      const sub=encodeURIComponent('Waitlist — Areviax '+(product==='os'?'OS':'Mass')),body=encodeURIComponent('Please add me to the Areviax '+(product==='os'?'OS':'Mass')+' waitlist.\nEmail: '+em+(ref?'\nReferred by: '+ref:''));
      msg.innerHTML='Almost there — your email app will open with the request ready to send. <a style="text-decoration:underline" href="mailto:'+SUPPORT+'?subject='+sub+'&body='+body+'">Didn’t open? Tap here.</a>';
      location.href='mailto:'+SUPPORT+'?subject='+sub+'&body='+body;
    }
    try{localStorage.setItem('arx_wl_'+product,em);}catch(e){}
    const r=btn.getBoundingClientRect();confettiBurst(r.left+r.width/2,r.top,160);
  }catch(err){msg.textContent='Something went wrong — please try again in a moment.';}
  btn.disabled=false;btn.textContent=prev;
}));
$$('[data-scroll]').forEach(a=>a.addEventListener('click',e=>{const t=$(a.dataset.scroll);if(t){e.preventDefault();t.scrollIntoView({behavior:reduced?'auto':'smooth',block:'center'});}}));
onScroll();
})();
