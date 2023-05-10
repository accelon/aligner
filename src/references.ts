import { loadCMText } from "./editor.js";
import {references,selectedRef} from "./store.js";
import {get} from "svelte/store";

const urls=[
    ['杭州佛學院','https://raw.githubusercontent.com/accelon/sutra-mobi/main/cs-hz.offtext/<>.hz.off'],
    ['Sutta Central','https://raw.githubusercontent.com/accelon/sc/main/off/<>.sc.off']
]
export const referencesOf=fn=>{
    const m=fn.match( /([a-z\d]+)\./);
    if (!m) return [];
    const m2=m[1].match(/([dmsa]n)(\d{1,2})/);
    if (m2) {
        const [m0,nikaya,book]=m2;
        return urls.map( ([name,url])=>{
            return {name,url:url.replace(/<>/,nikaya+book)};
        }).filter( it=>it.url.indexOf(fn)==-1 ) //same as fn
    } else {
        return [];
    }
}

export const loadReference=async (n)=>{
    const refs=get(references);
    if (!refs.length) return;

    selectedRef.set(n)
    const response=await fetch(refs[n].url);
    const content=await response.text();
    loadCMText( content,1)
}