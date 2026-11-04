/* The Contraption Shuffle · site 1.2.1 · no external dependencies. */
(() => {
  'use strict';
  const D=window.CONTRAPTION_DECKS,C=window.ShuffleCore,$=s=>document.querySelector(s);
  const KEY='mbparks-contraption-notebook-v1';
  const titles={materials:'Materials',mechanisms:'Mechanism',missions:'Mission'};
  const questions={materials:'What have you got?',mechanisms:'What makes it work?',missions:'What must it do?'};
  const symbols={materials:'◇',mechanisms:'⚙',missions:'⚑'};
  let cards={},pins={},mode='workshop',twist=null,filters=C.allFilters(),notebook=[],storageOK=true,nudgeIndex=0,busy=false;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const text=(s,v)=>{$(s).textContent=v;};
  function announce(message,error=false){text('#notice',message);$('#notice').classList.toggle('error',error);}
  function icon(type,card){
    const start='<svg viewBox="0 0 100 80" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">';
    if(type==='materials'){
      const family=card?.family;
      const shapes={wood:'<path d="M15 26 67 13 86 24 35 38zM15 26v27l20 13 51-15V24M35 38v28M24 31v25M46 36v26M62 32v25"/>',textiles:'<path d="M15 22q18 10 35 0t35 0v40q-18-10-35 0t-35 0zM28 24v37M43 24v37M58 23v38M73 23v38M17 37q33 15 66 0M17 50q33 15 66 0"/>',metal:'<circle cx="38" cy="40" r="24"/><circle cx="38" cy="40" r="10"/><path d="m63 20 21 8 4 24-19 14-18-9M69 29l9 7v12l-9 7"/>',plastics:'<path d="M36 12h28v12l11 13v29q-25 8-50 0V37l11-13zM36 18h28M25 43h50M25 57h50"/>',clay:'<path d="M17 53q-4-16 14-23 0-22 22-16 25-7 26 19 18 11 3 29-39 13-65-9zM31 38q15-15 35 0M33 54q14 9 30 0"/>',foam:'<path d="M16 24q30-10 68 0v37q-35 11-68 0zM16 36q31-10 68 0"/><circle cx="31" cy="47" r="3"/><circle cx="49" cy="56" r="3"/><circle cx="67" cy="45" r="4"/>',found:'<path d="m14 37 22-13 23 12-22 14zM14 37v25l23 11 22-15V36M37 50v23M69 12h15v12l6 7v31H64V31l5-7z"/>'};
      return start+(shapes[family]||'<path d="m13 23 50-10 25 20-50 12zM13 23v27l25 20 50-10V33M38 45v25M22 32l8 7M22 42l8 7M47 49l31-6M47 57l31-6"/>')+'</svg>';
    }
    if(type==='missions')return start+'<path d="M25 68V13M26 15q22-13 48 0v28q-25-13-48 0M15 69h30M48 26l7 7 11-13"/><path d="m69 60 6 6 13-16"/></svg>';
    return start+'<circle cx="46" cy="40" r="22"/><circle cx="46" cy="40" r="8"/><path d="M46 10v8M46 62v8M16 40h8M68 40h8M25 19l6 6M61 55l6 6M25 61l6-6M61 25l6-6M16 72h68M79 14l9 6-9 6"/></svg>';
  }
  function buildFilters(){
    for(const [selector,items,key] of [['#material-filters',D.families,'families'],['#supply-filters',D.supplies,'supplies']]){
      const container=$(selector);
      for(const [id,label] of Object.entries(items)){
        const l=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.value=id;input.checked=true;input.name=key;
        input.addEventListener('change',()=>{filters[key]=Array.from(container.querySelectorAll('input:checked'),x=>x.value);announce('Supply filters updated. They apply to the next draw; your current cards are still on the bench.');});
        l.append(input,document.createTextNode(label));container.append(l);
      }
    }
  }
  function renderCard(type,animate=false){
    const article=$(`[data-type="${type}"]`),c=cards[type];article.classList.toggle('pinned',Boolean(pins[type]));
    article.classList.remove('revealing');
    if(!c){article.innerHTML=`<button class="card-back" type="button" aria-label="Draw a ${titles[type].toLowerCase()} card"><span class="deck-symbol">${symbols[type]}</span><span class="deck-title">${titles[type]}</span><span class="deck-question">${questions[type]}</span>${icon(type)}<span class="deck-count">${D[type].length} CARDS · TAP TO DRAW</span></button>`;article.querySelector('button').addEventListener('click',()=>draw(type));return;}
    const extras=type==='mechanisms'?(c.extras.length?c.extras.map(x=>D.supplies[x]).join('; '):'Ordinary joining supplies; make working parts from your main material.'):type==='missions'?c.supplies.concat(c.extras.map(x=>D.supplies[x])).join('; '):D.families[c.family];
    article.innerHTML=`<div class="card-front"><div class="card-meta"><span>${symbols[type]} ${titles[type]}</span><span>${c.id}</span></div><div class="card-illustration">${icon(type,c)}</div><h3>${esc(c.title)}</h3><p class="card-description">${esc(c.description)}</p><p class="card-extras"><strong>${type==='materials'?'Family':'You’ll also use'}:</strong> ${esc(extras)}</p><div class="card-actions"><button type="button" class="pin" aria-pressed="${Boolean(pins[type])}" aria-label="${pins[type]?'Unkeep':'Keep'} ${esc(c.title)}">${pins[type]?'⌑ Kept':'Keep this'}</button><button type="button" class="redraw" ${pins[type]?'disabled':''} aria-label="Draw another ${titles[type].toLowerCase()} card">Draw another</button></div></div>`;
    article.querySelector('.pin').addEventListener('click',()=>{pins[type]=!pins[type];renderCard(type);article.querySelector('.pin').focus();updatePinNote();announce(`${c.title} ${pins[type]?'kept. Redraws will leave it in place.':'unkept. It can be drawn again.'}`);});
    article.querySelector('.redraw').addEventListener('click',()=>draw(type));
    if(animate&&!reduced.matches){void article.offsetWidth;article.classList.add('revealing');}
  }
  function updatePinNote(){const count=C.types.filter(t=>pins[t]).length;text('#pin-note',count===3?'All three are kept. Unkeep a card to redraw.':count?`${count} ${count===1?'card':'cards'} kept. Draw again to replace the rest.`:'Keep what sparks an idea. Redraw the rest.');}
  function list(selector,items){const el=$(selector);el.replaceChildren(...items.map(x=>{const li=document.createElement('li');li.textContent=x;return li;}));}
  function renderBrief(){
    const b=C.brief(cards,twist);$('#brief').hidden=!b;$('#workshop-tools').hidden=!b;if(!b)return;
    text('#challenge-code',b.code);text('#brief-title',b.title);text('#brief-instruction',b.instruction);list('#requirements',b.requirements);list('#allowed-supplies',b.supplies);text('#first-step',b.first);text('#success-test',b.test);text('#mechanism-test',b.mechanismTest);
    $('#brief-twist').hidden=!twist;text('#brief-twist',twist?`${twist.id} · ${twist.title}. ${twist.description}`:'');
    text('#brief-version',`Deck ${D.version} · ${mode==='wild'?'Wild draw — loose interpretation encouraged':'Workshop draw — filtered, not a buildability guarantee'}${twist?' · '+twist.id:''}`);
    const saved=notebook.find(x=>x.query===C.encode(cards,mode,twist));text('#print-notes',saved?.notes?`Build notes${saved.complete?' · Completed':''}\n${saved.notes}`:saved?.complete?'Marked complete in your notebook.':'');
    text('#save-challenge',saved?'Saved · open in notebook':'Save to my notebook');
    text('#twist-copy',twist?`${twist.id} · ${twist.title}. ${twist.description}`:'Add one extra constraint when the first idea comes too easily.');
    text('#draw-twist',twist?'Draw another twist':'Draw a twist');$('#remove-twist').hidden=!twist;
    renderHelp();
  }
  function resetHelp(){nudgeIndex=0;$('#nudge-text').hidden=true;$('#mechanism-help').open=false;$('#approach-help').open=false;}
  function draw(only=null){
    if(busy)return;
    const result=C.draw({cards,pins,mode,filters,twist,only});
    if(result.error){announce(result.error,true);return;}
    const prior=cards;cards=result.cards;resetHelp();
    for(const t of C.types)if(prior[t]?.id!==cards[t]?.id)renderCard(t,true);
    updatePinNote();renderBrief();text('#draw-all',C.complete(cards)?'Draw again ↗':'Draw a challenge ↗');
    if(C.complete(cards))writeURL();
    announce(`${only?titles[only]+' drawn: '+cards[only].title+'.':C.code(cards)+'. '+C.types.map(t=>cards[t].title).join(' · ')+'.'}${result.repeated?' No different valid card was available for every redraw; a constrained card was retained.':''}${C.complete(cards)?' Your complete brief is below the cards.':''}`);
    if(only)$(`[data-type="${only}"] .pin`)?.focus({preventScroll:true});
    // Drawing is atomic. The short lock only avoids accidental repeated taps during the reveal.
    busy=!reduced.matches;$('#draw-all').setAttribute('aria-busy',String(busy));
    if(busy)setTimeout(()=>{busy=false;$('#draw-all').setAttribute('aria-busy','false');},720);
  }
  function query(){return C.encode(cards,mode,twist);}
  function writeURL(){try{const u=new URL(location.href);u.search=query();u.hash='';history.replaceState(null,'',u);}catch{}}
  function challengeURL(){
    const u=new URL(location.href);u.search=query();u.hash='';
    // Standalone downloads use the hosted page for links that others can open.
    if(u.protocol==='file:'||u.protocol==='blob:')return 'https://mbparks-makers-workbench.greenshoegarage.chatgpt.site/shuffle/?'+query();
    return u.href;
  }
  function modeNote(){text('#mode-note',mode==='workshop'?'Workshop mode filters clear mismatches using authored card metadata. It is a starting point, not a guarantee of buildability.':'Wild mode allows any material–mechanism–mission pairing. Interpret freely; selected supplies and known twist conflicts still apply.');}
  function setMode(next){
    if(next==='workshop'&&!C.compatible(cards,'workshop')){
      const result=C.draw({cards,pins,mode:'workshop',filters,twist});
      if(result.error){document.querySelector('input[name="mode"][value="wild"]').checked=true;announce('Cannot switch this combination to Workshop mode. '+result.error,true);return;}
      cards=result.cards;resetHelp();C.types.forEach(t=>renderCard(t,true));updatePinNote();
    }
    mode=next;modeNote();renderBrief();if(C.complete(cards))writeURL();announce(`${mode==='wild'?'Wild':'Workshop'} mode selected. Supply filters stay in effect.`);
  }
  function functionalDiagram(k){
    // Authored component labels make this a functional diagram, not a claimed construction drawing.
    const labels=[k.diagram.input,k.diagram.part,k.diagram.output];
    const boxes=labels.map((label,i)=>{const words=label.split(' '),mid=Math.ceil(words.length/2),lines=label.length>17?[words.slice(0,mid).join(' '),words.slice(mid).join(' ')]:[label];return `<rect x="${12+i*166}" y="33" width="145" height="69" rx="5" fill="#f5edd8" stroke="#52634a"/><text x="${84+i*166}" y="21" text-anchor="middle" fill="#6b6046" font-size="10">${['INPUT','WORKING PART','RESULT'][i]}</text><text x="${84+i*166}" y="${lines.length===1?71:61}" text-anchor="middle" fill="#283c30" font-size="12">${lines.map((l,j)=>`<tspan x="${84+i*166}" dy="${j?18:0}">${esc(l)}</tspan>`).join('')}</text>${i<2?`<path d="M${159+i*166} 67h16m-6-5 6 5-6 5" fill="none" stroke="#9b7132" stroke-width="2"/>`:''}`;}).join('');
    return `<svg viewBox="0 0 500 120" role="img" aria-label="${esc(k.title+': '+labels.join(' leads to '))}" xmlns="http://www.w3.org/2000/svg">${boxes}</svg><p class="fine">Functional diagram: follow the input through the working part to the result.</p>`;
  }
  function renderHelp(){
    const k=cards.mechanisms,g=cards.missions,m=cards.materials;if(!k||!g||!m)return;
    text('#mechanism-explanation',k.description);$('#mechanism-diagram').innerHTML=functionalDiagram(k);
    $('#demo').hidden=!['K01','K09','K13','K37','K38'].includes(k.id);renderDemo();
    text('#approach-text',`${g.approach} ${k.approach} Make the main structure or working surface from ${m.phrase}. Connect the mechanism’s output to the mission’s working part. ${k.hint} First test with the smallest practical stand-in, then apply the mission’s success test.`);
  }
  function renderDemo(){
    const k=cards.mechanisms;if(!k||$('#demo').hidden)return;const t=Number($('#demo-position').value)/100;
    text('#demo-readout',Math.round(t*100)+'%');let shapes='';
    if(k.id==='K01'){
      const angle=(t-.5)*40;shapes=`<path d="m166 145 14-35 14 35z" fill="#b99148"/><g transform="rotate(${angle} 180 110)"><path d="M60 110h240" stroke-width="8"/><circle cx="65" cy="110" r="8" fill="#9b4939"/><rect x="274" y="87" width="26" height="20" fill="#c4aa73"/></g><text x="47" y="45">input end</text><text x="263" y="45">load</text><text x="154" y="171">fulcrum</text>`;
    }else if(k.id==='K09'){
      const a=t*Math.PI*2,cy=112-13*Math.cos(a);shapes=`<circle cx="180" cy="${cy}" r="33" fill="#dcc38c"/><circle cx="180" cy="112" r="4" fill="#294c3e"/><path d="M180 ${cy-33}V30" stroke-width="6"/><path d="M163 44h34M163 57h34" stroke="#9b4939"/><text x="214" y="118">eccentric cam</text><text x="199" y="31">follower ↑↓</text><text x="113" y="170">turn the shaft</text>`;
    }else if(k.id==='K13'){
      const gear=(x,r,angle)=>`<g transform="translate(${x} 100) rotate(${angle})"><circle r="${r}" fill="#ddcc9f"/>${Array.from({length:r===40?16:8},(_,i)=>`<path d="M0 -${r-4}v-9" transform="rotate(${i*360/(r===40?16:8)})" stroke-width="5"/>`).join('')}<path d="M0 0V-${r}" stroke="#9b4939" stroke-width="3"/><circle r="4" fill="#294c3e"/></g>`;shapes=gear(155,40,t*180)+gear(220,20,-t*360+22.5)+'<text x="86" y="39">16 teeth ↻</text><text x="224" y="39">8 teeth ↺</text><text x="100" y="170">half the teeth, twice the turns</text>';
    }else{
      const output=k.id==='K37'?Math.max(0,t-.18)/.82:t;const x=65+t*65,y=257-output*65;shapes=`<path d="M${x} 95H160v40h35V95h${y-195}" stroke="${k.id==='K38'?'#477c97':'#9f9d81'}" stroke-width="11"/><path d="M55 65h105v60H55M195 65h105v60H195"/><path d="M${x} 67v56M${y} 67v56" stroke-width="7"/><path d="M${x} 95H25M${y} 95h65" stroke-width="4"/><text x="48" y="40">push input →</text><text x="205" y="40">← output</text><text x="77" y="172">${k.id==='K38'?'water transfers displacement':'air compresses before moving the output'}</text>`;
    }
    $('#demo-picture').innerHTML=`<svg viewBox="0 0 360 190" role="img" aria-label="Interactive ${esc(k.title)} motion sketch" fill="none" stroke="#294c3e" stroke-width="2" xmlns="http://www.w3.org/2000/svg"><style>text{font:11px Arial;fill:#294c3e;stroke:none}</style>${shapes}</svg>`;
  }
  function drawTwist(){
    const options=D.twists.filter(t=>t.id!==twist?.id&&C.twistFits(t,cards));
    if(!options.length){announce('No different compatible twist is available. Remove the current twist or change the cards.',true);return;}
    twist=options[Math.floor(Math.random()*options.length)];renderBrief();writeURL();announce(`${twist.title}. ${twist.description}`);
  }
  function loadNotebook(){try{notebook=C.validateNotebook(JSON.parse(localStorage.getItem(KEY)||'[]'));}catch{storageOK=false;notebook=[];}updateNotebookCount();}
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(notebook));storageOK=true;}catch{storageOK=false;}updateNotebookCount();return storageOK;}
  function updateNotebookCount(){text('#saved-count',notebook.length);text('#storage-note',storageOK?'Your notebook is saved on this browser. Export a backup to keep a separate copy.':'Browser storage is unavailable or full. Changes are kept for this visit only. Export a notebook backup or copy challenge links before leaving.');}
  function showDialog(id){const d=$(id);d.showModal();d.querySelector('.close-dialog').focus();}
  function saveChallenge(){
    const q=query();if(notebook.some(x=>x.query===q)){openNotebook();return;}
    if(notebook.length>=200){announce('Your notebook holds 200 challenges. Export a backup and delete an entry before saving another.',true);return;}
    notebook.unshift({query:q,notes:'',complete:false,saved:new Date().toISOString()});const ok=persist();renderBrief();announce(ok?'Challenge saved to your notebook.':'Saved for this visit only: browser storage is unavailable. Open My notebook to export a backup.',!ok);
  }
  function restore(item){
    const parsed=C.decode(item.query);if(parsed.error){announce(parsed.error,true);return;}
    cards=parsed.cards;mode=parsed.mode;twist=parsed.twist;pins={};resetHelp();
    document.querySelector(`input[name="mode"][value="${mode}"]`).checked=true;modeNote();C.types.forEach(t=>renderCard(t));updatePinNote();renderBrief();writeURL();text('#draw-all','Draw again ↗');
    if($('#notebook-dialog').open)$('#notebook-dialog').close();$('#brief-title').focus();announce('Exact saved challenge reopened. Supply filters still apply to future draws.');
  }
  function renderNotebook(){
    const container=$('#notebook-list');container.replaceChildren();updateNotebookCount();
    if(!notebook.length){const p=document.createElement('p');p.className='empty-note';p.textContent='No challenges yet. Draw something curious, then save its bench brief here.';container.append(p);return;}
    for(const [i,item] of notebook.entries()){
      const parsed=C.decode(item.query),b=C.brief(parsed.cards,parsed.twist),entry=document.createElement('article');entry.className='saved-entry';
      entry.innerHTML=`<h3>${esc(b.title)}</h3><p class="entry-meta">${b.code} · Deck ${D.version} · ${parsed.mode}${parsed.twist?' · '+esc(parsed.twist.title):''}</p><label for="notes-${i}">Build notes</label><textarea id="notes-${i}" maxlength="5000" placeholder="What did you try? What surprised you?"></textarea><label class="complete-label"><input type="checkbox" ${item.complete?'checked':''}> I built this</label><div class="entry-actions"><button type="button" class="reopen">Reopen</button><button type="button" class="save-notes">Save notes</button><button type="button" class="delete quiet">Delete</button></div><p class="entry-status" role="status"></p>`;
      entry.querySelector('textarea').value=item.notes;
      const save=()=>{item.notes=entry.querySelector('textarea').value;item.complete=entry.querySelector('input').checked;const ok=persist();entry.querySelector('.entry-status').textContent=ok?'Notes and completion saved.':'Kept for this visit only. Export a backup below.';renderBrief();};
      entry.querySelector('.save-notes').addEventListener('click',save);
      entry.querySelector('input').addEventListener('change',save);
      entry.querySelector('textarea').addEventListener('change',save);
      entry.querySelector('.reopen').addEventListener('click',()=>{save();restore(item);});
      entry.querySelector('.delete').addEventListener('click',()=>{notebook=notebook.filter(x=>x!==item);persist();renderNotebook();renderBrief();$('#notebook-dialog .close-dialog').focus();});
      container.append(entry);
    }
  }
  function openNotebook(){renderNotebook();showDialog('#notebook-dialog');}
  function downloadNotebook(){
    const blob=new Blob([JSON.stringify({format:'contraption-notebook',version:1,deck:D.version,challenges:notebook},null,2)],{type:'application/json'});const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='contraption-notebook.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000);
  }
  async function importNotebook(e){
    const f=e.target.files?.[0];if(!f)return;
    try{if(f.size>2000000)throw new Error('That backup is too large. Choose a notebook JSON file under 2 MB.');const data=JSON.parse(await f.text());if(data.format!=='contraption-notebook'||data.version!==1||data.deck!==D.version||!Array.isArray(data.challenges))throw new Error('This is not a supported notebook backup for deck '+D.version+'.');const valid=C.validateNotebook(data.challenges);if(valid.length!==data.challenges.length)throw new Error('Some entries are invalid or use unavailable cards. Nothing was imported.');const merged=new Map(notebook.map(x=>[x.query,x]));for(const x of valid)if(!merged.has(x.query))merged.set(x.query,x);if(merged.size>200)throw new Error('The merged notebook would exceed 200 entries. Remove some entries first.');notebook=[...merged.values()];const ok=persist();renderNotebook();text('#storage-note',ok?'Backup imported. Existing notes were kept for matching challenges.':'Backup loaded for this visit only. Browser storage is unavailable.');}catch(err){text('#storage-note',err instanceof Error?err.message:'Could not read that backup.');}finally{e.target.value='';}
  }
  async function copyLink(){
    const link=challengeURL();try{if(!navigator.clipboard?.writeText)throw new Error('clipboard unavailable');await navigator.clipboard.writeText(link);announce('Exact challenge link copied. Same cards. Different contraptions.');}catch{const area=$('#share-url');area.value=link;text('#share-reason','Automatic copying is unavailable. Select and copy this exact link with your browser’s copy command.');showDialog('#share-dialog');area.focus();area.select();}
  }
  buildFilters();loadNotebook();
  for(const type of C.types){const article=document.createElement('article');article.className='card';article.dataset.type=type;article.setAttribute('aria-label',titles[type]+' deck');$('#cards').append(article);renderCard(type);}
  $('#draw-all').addEventListener('click',()=>draw());
  document.querySelectorAll('input[name="mode"]').forEach(el=>el.addEventListener('change',()=>setMode(el.value)));
  $('#reset-filters').addEventListener('click',()=>{filters=C.allFilters();document.querySelectorAll('#supplies-panel input').forEach(el=>el.checked=true);announce('All material families and specialist supplies are available for drawing.');});
  $('#demo-position').addEventListener('input',renderDemo);
  $('#nudge').addEventListener('click',()=>{const hints=[cards.materials.hint,cards.mechanisms.hint,cards.missions.hint,'Can you make a single working joint before building the rest?'];text('#nudge-text',`${nudgeIndex%hints.length+1} / ${hints.length} · ${hints[nudgeIndex%hints.length]}`);$('#nudge-text').hidden=false;nudgeIndex++;announce($('#nudge-text').textContent);});
  $('#draw-twist').addEventListener('click',drawTwist);
  $('#remove-twist').addEventListener('click',()=>{twist=null;renderBrief();writeURL();announce('Twist removed. The three cards stay the same.');});
  $('#save-challenge').addEventListener('click',saveChallenge);$('#notebook-open').addEventListener('click',openNotebook);$('#copy-link').addEventListener('click',copyLink);$('#print-card').addEventListener('click',()=>{renderBrief();window.print();});
  $('#export-notebook').addEventListener('click',downloadNotebook);$('#import-notebook').addEventListener('change',importNotebook);
  for(const dialog of document.querySelectorAll('dialog'))dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
  const incoming=C.decode(location.search);
  if(incoming.error)announce(incoming.error,true);
  else if(!incoming.empty){cards=incoming.cards;mode=incoming.mode;twist=incoming.twist;document.querySelector(`input[name="mode"][value="${mode}"]`).checked=true;modeNote();C.types.forEach(t=>renderCard(t));renderBrief();text('#draw-all','Draw again ↗');announce('Shared challenge restored exactly, including its deck version, mode, and twist. Your supply selections apply to future draws.');}
})();
