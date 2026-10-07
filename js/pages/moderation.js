import{MODERATION_PIN}from"../config.js";
import{items,update,remove,reset}from"../store.js";
import{el,field,btn,toast,ask}from"../ui.js";
import{head}from"./common.js";
export function moderation(){
 const root=el("div"),panel=el("section",{class:"container panel section"}),pin=el("input",{type:"password",maxLength:12,inputMode:"numeric",autocomplete:"off",ariaLabel:"Moderation PIN"}),list=el("div");
 root.append(head("Demo-only tools","Moderation","The PIN is visible in source and is not real security. Changes stay on this device."));
 const draw=()=>{let flags=[];try{flags=JSON.parse(localStorage.getItem("findithere.abuse")||"[]")}catch{}list.replaceChildren(el("h3",{text:"Local abuse reports ("+flags.length+")"}),...flags.map(f=>el("p",{class:"panel",text:f.title+": "+f.reason+" · "+new Date(f.at).toLocaleString()})),...items({hidden:true}).map(x=>el("article",{class:"panel"},el("strong",{text:x.title}),el("p",{text:x.type+" · "+x.locationName}),btn(x.hidden?"Restore":"Hide",()=>{update(x.id,{hidden:!x.hidden});draw()}),btn("Delete",async()=>{if(await ask("Delete this report from this device?")){remove(x.id);draw()}},"button button-quiet"))))};
 const unlock=btn("Unlock moderation",()=>{if(pin.value!==MODERATION_PIN){toast("PIN did not match.",true);return}panel.replaceChildren(el("h2",{text:"All reports"}),el("p",{text:"Hidden reports are omitted from browse and map results."}),btn("Bulk delete all reports",async()=>{if(await ask("Delete every report on this device?")){items({hidden:true}).forEach(x=>remove(x.id));draw()}},"button button-danger"),btn("Reset to sample data",async()=>{if(await ask("Replace all reports with the original sample set?")){reset();draw()}},"button button-outline"),list);draw()});
 panel.append(field("Demo PIN",pin),unlock);root.append(panel);return root
}