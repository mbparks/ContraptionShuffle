const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const project=path.resolve(__dirname,'..');
const dist=fs.existsSync(path.join(project,'dist'))?path.join(project,'dist'):project;
const D=require(path.join(dist,'shuffle/decks.js'));
const C=require(path.join(dist,'shuffle/core.js'));
let checks=0;const check=(name,fn)=>{fn();checks++;console.log('PASS '+name);};
const card=(m,k,g)=>({materials:C.maps.materials.get(m),mechanisms:C.maps.mechanisms.get(k),missions:C.maps.missions.get(g)});
const full=card('M01','K01','G02');
check('150 unique permanent card IDs and complete authored metadata',()=>{
 for(const [type,prefix] of [['materials','M'],['mechanisms','K'],['missions','G']]){
  assert.equal(D[type].length,50);assert.equal(new Set(D[type].map(x=>x.id)).size,50);
  for(let i=1;i<=50;i++){const c=C.maps[type].get(prefix+String(i).padStart(2,'0'));assert(c);for(const k of ['title','description','requirement','hint'])assert(c[k]?.length>(k==='title'?2:8),c.id+' '+k);}
 }
 for(const k of D.mechanisms){assert(k.test);assert(k.functions.length);assert(k.materialNeeds.length);for(const id of k.extras)assert(D.supplies[id]);for(const key of ['input','part','output'])assert(k.diagram[key]);}
 for(const g of D.missions){assert(g.test.length>25);assert(g.approach.length>25);assert(g.functions.length);}
 assert.equal(D.twists.length,15);assert.equal(new Set(D.twists.map(x=>x.id)).size,15);
});
check('all 125000 Wild combinations are valid and have a complete deterministic brief',()=>{
 let total=0;for(const m of D.materials)for(const k of D.mechanisms)for(const g of D.missions){const c={materials:m,mechanisms:k,missions:g};assert(C.compatible(c,'wild'));const b=C.brief(c,null);assert(b.instruction&&!b.instruction.includes('undefined'));assert.equal(b.requirements.length,3);assert(b.first&&b.test&&b.supplies.length);total++;}assert.equal(total,125000);
});
check('every card participates in at least one Workshop combination',()=>{
 const seen=new Set();for(const m of D.materials)for(const k of D.mechanisms)for(const g of D.missions){if(C.compatible({materials:m,mechanisms:k,missions:g},'workshop')){seen.add(m.id);seen.add(k.id);seen.add(g.id);}}
 assert.equal(seen.size,150);
});
check('known structural and fluid mismatches are excluded in Workshop and allowed in Wild',()=>{
 assert.equal(C.compatible(card('M25','K13','G40'),'workshop'),false);
 assert.equal(C.compatible(card('M03','K50','G40'),'workshop'),false);
 assert.equal(C.compatible(card('M25','K13','G40'),'wild'),true);
});
check('draw all respects pins and avoids immediate repeats when alternatives exist',()=>{
 const r=C.draw({cards:full,pins:{materials:true}});assert(!r.error);assert.equal(r.cards.materials.id,'M01');assert.notEqual(r.cards.mechanisms.id,'K01');assert.notEqual(r.cards.missions.id,'G02');assert(C.compatible(r.cards,'workshop'));
 assert.match(C.draw({cards:full,pins:{materials:true,mechanisms:true,missions:true}}).error,/All three/);
});
check('individual draws keep undrawn decks empty, respect pins, and preserve other cards',()=>{
 const a=C.draw({cards:{},only:'materials'});assert(a.cards.materials);assert(!a.cards.mechanisms&&!a.cards.missions);
 const b=C.draw({cards:full,only:'missions'});assert(!b.error);assert.equal(b.cards.materials.id,'M01');assert.equal(b.cards.mechanisms.id,'K01');assert.notEqual(b.cards.missions.id,'G02');
 assert.match(C.draw({cards:full,pins:{missions:true},only:'missions'}).error,/Unkeep/);
});
check('supply filtering is honored in both modes, with explicit empty-filter feedback',()=>{
 for(const mode of ['workshop','wild'])for(let i=0;i<40;i++){
  const filters={families:['paper'],supplies:[]},r=C.draw({filters,mode});assert(!r.error);assert.equal(r.cards.materials.family,'paper');assert.equal(r.cards.mechanisms.extras.length,0);assert.equal(r.cards.missions.extras.length,0);
 }
 assert.match(C.draw({filters:{families:[],supplies:[]}}).error,/material family/);
 const r=C.draw({cards:card('M01','K43','G11'),pins:{mechanisms:true},filters:{families:['paper'],supplies:[]}});assert.match(r.error,/Magnets/);
});
check('all share links reproduce exact IDs, mode, version, and twist',()=>{
 for(let i=0;i<100;i++){const r=C.draw({mode:i%2?'workshop':'wild'}),mode=i%2?'workshop':'wild';const twist=D.twists.find(t=>C.twistFits(t,r.cards));const encoded=C.encode(r.cards,mode,twist),decoded=C.decode(encoded);assert(!decoded.error);assert.equal(C.encode(decoded.cards,decoded.mode,decoded.twist),encoded);}
 for(const query of ['v=99&m=M01&k=K01&g=G02&mode=wild','v=1.0.0&m=M99&k=K01&g=G02&mode=wild','v=1.0.0&m=M01&m=M02&k=K01&g=G02&mode=wild','v=1.0.0&m=M01&k=K01&g=G02&mode=bogus','v=1.0.0&m=M01&k=K01&g=G02&mode=wild&t=T99'])assert(C.decode(query).error);
});
check('twists exclude known conflicts and persist through constrained redraws',()=>{
 const silent=C.maps.twists.get('T11');assert(!C.twistFits(silent,card('M01','K01','G12')));
 const upside=C.maps.twists.get('T08');assert(!C.twistFits(upside,card('M01','K39','G40')));
 for(let i=0;i<30;i++){const r=C.draw({cards:full,twist:silent});assert(!r.error);assert(C.twistFits(silent,r.cards));}
 const b=C.brief(full,C.maps.twists.get('T02'));assert.match(b.supplies[0],/No glue/);
});
check('notebook validation round-trips notes and completion while rejecting malformed entries',()=>{
 const item={query:C.encode(full,'workshop',C.maps.twists.get('T07')),notes:'First try: add a guide.',complete:true,saved:'2026-11-01'};
 const saved=JSON.parse(JSON.stringify([item]));assert.deepEqual(C.validateNotebook(saved),[item]);assert.equal(C.validateNotebook([{},null,{query:'v=9'}]).length,0);
});
check('print includes complete brief and sketch space; motion and focus fallbacks exist',()=>{
 const css=fs.readFileSync(path.join(dist,'shuffle/shuffle.css'),'utf8'),html=fs.readFileSync(path.join(dist,'shuffle/index.html'),'utf8');
 assert(css.includes('@media print'));assert(css.includes('.sketch-space{display:block'));assert(css.includes('prefers-reduced-motion'));assert(html.includes('aria-live="polite"'));for(const id of ['requirements','allowed-supplies','success-test','first-step','challenge-code','brief-twist','print-notes'])assert(html.includes('id="'+id+'"'));
});
console.log(checks+' verification groups passed.');
