/* Pure challenge rules, shared by the browser and verification tests. */
(function(root,factory){if(typeof module!=='undefined'&&module.exports)module.exports=factory(require('./decks.js'));else root.ShuffleCore=factory(root.CONTRAPTION_DECKS);})(typeof globalThis!=='undefined'?globalThis:this,function(D){
  'use strict';
  const types=['materials','mechanisms','missions'];
  const maps=Object.fromEntries([...types,'twists'].map(t=>[t,new Map(D[t].map(c=>[c.id,c]))]));
  const allFilters=()=>({families:Object.keys(D.families),supplies:Object.keys(D.supplies)});
  const complete=c=>types.every(t=>Boolean(c[t]));
  const twistFits=(twist,c)=>!twist||types.every(t=>!c[t]||!twist.exclude.includes(c[t].id));
  function compatible(c,mode){
    if(mode==='wild')return true;
    const m=c.materials,k=c.mechanisms,g=c.missions;
    return (!m||!k||k.materialNeeds.includes('*')||k.materialNeeds.some(x=>m.tags.includes(x)))&&(!k||!g||k.functions.some(x=>g.functions.includes(x)));
  }
  function available(card,type,filters){return (type!=='materials'||filters.families.includes(card.family))&&(card.extras||[]).every(x=>filters.supplies.includes(x));}
  function randomOrder(cards,previous,rng){
    const a=cards.filter(c=>c.id!==previous?.id);
    for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
    if(previous&&cards.some(c=>c.id===previous.id))a.push(previous);
    return a;
  }
  function diagnose(c,pins,filters,twist,mode='workshop'){
    if(!filters.families.length)return 'Select at least one material family in “What’s on your bench?”';
    for(const t of types)if(pins[t]&&c[t]){
      if(!available(c[t],t,filters))return `The kept ${c[t].title} card is outside your supplies. Unkeep it, or enable ${t==='materials'&&!filters.families.includes(c[t].family)?D.families[c[t].family]:(c[t].extras||[]).filter(x=>!filters.supplies.includes(x)).map(x=>D.supplies[x]).join(', ')}.`;
      if(!twistFits(twist,{[t]:c[t]}))return `The kept ${c[t].title} card conflicts with the twist. Unkeep it or remove the twist.`;
    }
    const pools=types.map(t=>pins[t]&&c[t]?[c[t]]:D[t]);let suggestion=null;
    for(const material of pools[0])for(const mechanism of pools[1])for(const mission of pools[2]){
      const trial={materials:material,mechanisms:mechanism,missions:mission};
      if(!compatible(trial,mode)||!twistFits(twist,trial))continue;
      const missing=[...(!filters.families.includes(material.family)?[D.families[material.family]]:[]),...[...new Set([...(material.extras||[]),...mechanism.extras,...mission.extras])].filter(x=>!filters.supplies.includes(x)).map(x=>D.supplies[x])];
      if(missing.length&&(!suggestion||missing.length<suggestion.length))suggestion=missing;
    }
    return suggestion?`No matching draw with these supplies. Enabling ${suggestion.join(' and ')} would allow a combination. You can also unkeep a card or remove the twist. Your filters have not been changed.`:'No matching draw with these kept cards and twist. Unkeep a card, remove the twist, or try Wild mode. Selected supplies are always respected.';
  }
  function draw({cards={},pins={},filters=allFilters(),mode='workshop',twist=null,only=null,rng=Math.random}){
    const fixed={};for(const t of types)fixed[t]=Boolean(cards[t]&&(pins[t]||(only&&only!==t)));
    if(only&&pins[only])return {error:'Unkeep this card before drawing another.'};
    if(types.every(t=>fixed[t]))return {error:'All three cards are kept. Unkeep a card before drawing again.'};
    const pools={};for(const t of types){pools[t]=fixed[t]?[cards[t]]:randomOrder(D[t].filter(c=>available(c,t,filters)),cards[t],rng);}
    const candidate={};let best=null,bestRepeats=Infinity;
    function search(index,repeats){
      if(repeats>=bestRepeats)return;
      if(index===types.length){best={...candidate};bestRepeats=repeats;return;}
      const t=types[index];
      for(const card of pools[t]){
        if(!available(card,t,filters))continue;
        candidate[t]=card;
        if(compatible(candidate,mode)&&twistFits(twist,candidate))search(index+1,repeats+(!fixed[t]&&cards[t]?.id===card.id?1:0));
        delete candidate[t];if(bestRepeats===0)break;
      }
    }
    if(only){
      // Individual draws leave undrawn decks face down.
      const next=pools[only].find(card=>{const c={...cards,[only]:card};return types.every(t=>!c[t]||available(c[t],t,filters))&&compatible(c,mode)&&twistFits(twist,c);});
      if(!next)return {error:diagnose(cards,fixed,filters,twist,mode)};
      return {cards:{...cards,[only]:next},repeated:next.id===cards[only]?.id};
    }
    search(0,0);
    return best?{cards:best,repeated:bestRepeats>0}:{error:diagnose(cards,fixed,filters,twist,mode)};
  }
  function code(c){return complete(c)?types.map(t=>c[t].id).join('-'):'';}
  function brief(c,twist){
    if(!complete(c))return null;
    const m=c.materials,k=c.mechanisms,g=c.missions;
    const noAdhesive=['T02','T09'].includes(twist?.id);
    const extras=[...new Set([...k.extras,...g.extras])].map(id=>D.supplies[id]);
    return {code:code(c),title:g.title+' · '+k.title,instruction:`Build a contraption using ${m.phrase} as its main material. A mechanism based on the ${k.title.toLowerCase()} principle must help ${g.title[0].toLowerCase()+g.title.slice(1)}.`,requirements:[m.requirement,k.requirement,g.requirement],supplies:[noAdhesive?'String, reusable clips, knots, folds, and removable fasteners. No glue or adhesive tape.':'Ordinary glue, tape, string, and fasteners.',...extras,...g.supplies],first:`Sketch what stays still, what moves, and the connection between them. ${k.hint}`,test:g.test,mechanismTest:k.test,twist:twist?twist.description:null};
  }
  function encode(c,mode,twist){const p=new URLSearchParams({v:D.version,m:c.materials.id,k:c.mechanisms.id,g:c.missions.id,mode});if(twist)p.set('t',twist.id);return p.toString();}
  function decode(input){
    const p=new URLSearchParams(input);const allowed=['v','m','k','g','mode','t'];
    if(!allowed.some(k=>p.has(k)))return {empty:true};
    if(allowed.some(k=>p.getAll(k).length>1))return {error:'This link repeats a challenge field. Start a new draw or check the original link.'};
    if(p.get('v')!==D.version)return {error:'This challenge uses an unavailable deck version. This edition supports deck '+D.version+'. The link has not been substituted with different cards.'};
    const c={materials:maps.materials.get(p.get('m')),mechanisms:maps.mechanisms.get(p.get('k')),missions:maps.missions.get(p.get('g'))};
    if(!complete(c))return {error:'A card in this link is missing or unavailable. Check the complete link, or draw a new challenge.'};
    const mode=p.get('mode');if(!['workshop','wild'].includes(mode))return {error:'This link has an invalid draw mode. Choose a mode and draw a new challenge.'};
    const twist=p.has('t')?maps.twists.get(p.get('t')):null;
    if(p.has('t')&&!twist)return {error:'The twist in this link is unavailable. Check the original link or start a new challenge.'};
    if(!twistFits(twist,c))return {error:'The twist conflicts with these cards. Check the original challenge link.'};
    if(!compatible(c,mode))return {error:'These cards do not match the Workshop rules for this deck version. Check the link or try a new Wild draw.'};
    return {cards:c,mode,twist};
  }
  function validateNotebook(value){
    if(!Array.isArray(value))return [];
    return value.slice(0,200).filter(x=>x&&typeof x.query==='string'&&!decode(x.query).error&&!decode(x.query).empty).map(x=>({query:x.query,notes:typeof x.notes==='string'?x.notes.slice(0,5000):'',complete:x.complete===true,saved:typeof x.saved==='string'?x.saved:''}));
  }
  return {types,maps,complete,allFilters,compatible,available,twistFits,draw,brief,encode,decode,code,validateNotebook};
});
