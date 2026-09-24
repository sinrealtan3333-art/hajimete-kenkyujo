document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const h=a.getAttribute('href');const t=h?document.querySelector(h):null;if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}}));

function b64ToBytes(b64){
  const clean=b64.replace(/\s+/g,'');
  const bin=atob(clean);
  const out=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++) out[i]=bin.charCodeAt(i);
  return out;
}
function sniffMime(bytes){
  if(bytes[0]===0x52&&bytes[1]===0x49&&bytes[2]===0x46&&bytes[3]===0x46) return 'image/webp';
  if(bytes[0]===0xff&&bytes[1]===0xd8) return 'image/jpeg';
  const ascii=String.fromCharCode(...bytes.slice(4,12));
  if(ascii.includes('ftyp')) return 'image/avif';
  return 'image/webp';
}
async function fetchTextParts(paths){
  const parts=await Promise.all(paths.map(p=>fetch(p,{cache:'force-cache'}).then(r=>{if(!r.ok) throw new Error(p);return r.text()})));
  return parts.join('');
}
async function loadHqHero(){
  try{
    const b64=await fetchTextParts([
      '/_asset_b64/hero.00.b64','/_asset_b64/hero.01.b64','/_asset_b64/hero.02.b64','/_asset_b64/hero.03.b64','/_asset_b64/hero.04.b64'
    ]);
    const compressed=b64ToBytes(b64);
    const stream=new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'));
    const bytes=new Uint8Array(await new Response(stream).arrayBuffer());
    const url=URL.createObjectURL(new Blob([bytes],{type:sniffMime(bytes)}));
    const hero=document.querySelector('.hero');
    if(hero) hero.style.backgroundImage=`linear-gradient(90deg,rgba(2,6,7,.97) 0%,rgba(2,6,7,.90) 29%,rgba(2,6,7,.58) 54%,rgba(2,6,7,.16) 78%,rgba(2,6,7,.34) 100%),url("${url}")`;
    document.querySelectorAll('.lab-visual').forEach((el,i)=>{
      const pos=['28% center','52% center','78% center'][i%3];
      el.style.backgroundImage=`linear-gradient(180deg,rgba(3,10,10,.08),rgba(3,10,10,.38)),url("${url}")`;
      el.style.backgroundPosition=pos;
      el.style.backgroundSize='cover';
    });
    const cta=document.querySelector('.cta');
    if(cta) cta.style.backgroundImage=`linear-gradient(180deg,rgba(3,8,8,.90),rgba(3,8,8,.70)),url("${url}")`;
  }catch(err){console.warn('HQ hero fallback',err)}
}
async function loadResearchImage(){
  try{
    const b64=await fetchTextParts([
      '/_asset_b64/research-001.00.b64','/_asset_b64/research-001.01.b64','/_asset_b64/research-001.02.b64','/_asset_b64/research-001.03.b64'
    ]);
    const bytes=b64ToBytes(b64);
    const url=URL.createObjectURL(new Blob([bytes],{type:sniffMime(bytes)}));
    const ri=document.querySelector('.research-index');
    if(ri) ri.style.backgroundImage=`linear-gradient(180deg,rgba(3,10,10,.22),rgba(3,10,10,.88)),url("${url}")`;
    document.querySelectorAll('.report-thumb').forEach(el=>{
      el.style.backgroundImage=`linear-gradient(135deg,rgba(3,9,9,.18),rgba(2,6,6,.62)),url("${url}")`;
      el.style.backgroundSize='cover';
      el.style.backgroundPosition='center';
    });
  }catch(err){console.warn('HQ research fallback',err)}
}
if('DecompressionStream' in window){loadHqHero();}
loadResearchImage();
