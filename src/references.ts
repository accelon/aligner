import { loadCMText } from "./editor.js";
import {references,selectedRef} from "./store.js";
import {get} from "svelte/store";
import {toIASTOffText} from 'provident-pali'

const urls=[
    ['英','https://raw.githubusercontent.com/accelon/sc/main/off/<>.sc.off'],
    ['巴','https://raw.githubusercontent.com/accelon/sc/main/sc-pli.offtext/<>.ms.off'], //generated by accelon/sc/gen-ro.js
    ['杭','https://raw.githubusercontent.com/accelon/sutra-mobi/main/cs-hz.offtext/<>.hz.off'],
    ['莊','https://raw.githubusercontent.com/accelon/ccc/main/off/<>.ccc.off'],
    ['蕭','https://raw.githubusercontent.com/accelon/xsq/main/off/<>.xsq.off'],
    ['亨','https://raw.githubusercontent.com/accelon/cb-n/main/off/<>.yh.off'],
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
    const url=refs[n].url;
    const response=await fetch(url);
    let content=await response.text();
    if (~url.indexOf('pli')) {
        content=toIASTOffText(content);
    }
    loadCMText( content,1)
}