export const tokenize=s=>String(s||"").normalize("NFKD").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(x=>x.length>1);
export function haversineKm(a,b){if(![a?.lat,a?.lng,b?.lat,b?.lng].every(Number.isFinite))return null;const r=x=>x*Math.PI/180,d=r(b.lat-a.lat),e=r(b.lng-a.lng),x=Math.sin(d/2)**2+Math.cos(r(a.lat))*Math.cos(r(b.lat))*Math.sin(e/2)**2;return 6371*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x))}
export function scoreMatch(a,b){if(!a||!b||a.type===b.type)return{score:0,reasons:[],distanceKm:null};const reasons=[];let s=0;const add=(w,x,why,cut=.5)=>{s+=w*x;if(why&&x>=cut)reasons.push(why)};
add(30,a.category===b.category?1:0,"Same category: "+a.category);add(14,a.color&&b.color?(a.color.toLowerCase()===b.color.toLowerCase()?1:.1):.3,"Color matches");
add(14,a.brand&&b.brand?(a.brand.toLowerCase()===b.brand.toLowerCase()?1:.1):.3,"Brand matches");
const A=new Set(tokenize((a.title||"")+" "+(a.description||""))),B=new Set(tokenize((b.title||"")+" "+(b.description||"")));let n=0;for(const x of A)if(B.has(x))n++;add(20,A.size+B.size?n/(A.size+B.size-n):0,"Shared keywords",.16);
const d=Math.abs(Date.parse(a.date||a.createdAt||Date.now())-Date.parse(b.date||b.createdAt||Date.now()))/86400000;add(10,Math.exp(-d/5),"Reported around the same time",.65);
const km=haversineKm(a,b);add(12,km==null?.3:Math.exp(-km/8),km!=null&&km<3?"Locations are "+km.toFixed(1)+" km apart":null,.55);return{score:Math.round(s),reasons,distanceKm:km}}
export const findMatches=(x,items,n=5)=>items.filter(y=>y.id!==x.id&&y.type!==x.type&&!y.hidden).map(item=>({item,...scoreMatch(x,item)})).filter(y=>y.score>=25).sort((a,b)=>b.score-a.score).slice(0,n);
