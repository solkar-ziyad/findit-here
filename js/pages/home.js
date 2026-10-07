import{items}from"../store.js";
import{el,link}from"../ui.js";
import{card}from"./common.js";
import{PLACE_TYPES}from"../config.js";
export function home(){
 const a=items(),root=el("div");
 const heroText=el("div",{},
  el("p",{class:"eyebrow",text:"Community lost & found"}),
  el("h1",{},"Let's help good things ",el("em",{text:"find their way home."})),
  el("p",{class:"muted",text:"A friendly noticeboard for items left in parks, stations, cafes and public spaces."}),
  el("p",{},link("#/report?type=lost","I lost something","button")," ",link("#/report?type=found","I found something","button button-dark")),
  link("#/browse","Browse reports")
 );
 const hero=el("section",{class:"hero container hero-inner"},heroText,el("div",{class:"hero-art","aria-hidden":"true",text:"Keys  FindIt  Bag"}));
 const stats=el("section",{class:"container stats"},stat(a.length,"Items reported"),stat(a.filter(x=>x.status==="Returned").length,"Reunited"),stat(a.filter(x=>x.status!=="Returned").length,"Active"));
 root.append(hero,stats);
 const steps=["Share a few details|Describe what you lost or found.","Look for a match|Compare nearby reports with useful clues.","Reconnect safely|Verify ownership before sharing contact."];
 const stepCards=steps.map((x,i)=>el("article",{class:"panel"},el("b",{text:"0"+(i+1)}),el("h3",{text:x.split("|")[0]}),el("p",{text:x.split("|")[1]})));
 const stepSection=el("section",{class:"container section"},el("h2",{text:"A simple way back"}),el("div",{class:"grid steps"},...stepCards));
 root.append(stepSection);
 const recent=el("section",{class:"container section"},el("h2",{text:"Recent reports"}),el("div",{class:"grid item-grid"},...a.slice(0,6).map(card)),link("#/browse","See all reports"));
 root.append(recent);
 const places=PLACE_TYPES.slice(0,10).map(x=>link("#/browse?place="+encodeURIComponent(x),x,"category-tile"));
 root.append(el("section",{class:"container section"},el("h2",{text:"Places around us"}),el("div",{class:"category-grid"},...places)));
 const faq=[["Where is my data saved?","On this device in your browser. Export JSON to move reports."],["Are contacts public?","No. Contact details stay private until verification."],["Can my community share reports?","Yes. Export a JSON snapshot and import it on another device."]];
 const details=faq.map(x=>el("details",{class:"panel"},el("summary",{text:x[0]}),el("p",{text:x[1]})));
 root.append(el("section",{class:"container section"},el("h2",{text:"Good to know"}),...details));
 return root;
}
function stat(n,label){return el("div",{},el("strong",{text:String(n)}),el("span",{text:label}))}