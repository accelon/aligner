<script>
import {loadCMText ,setCursorLine } from "./editor.js";
import {references,dirty,cm2,cursorline,selectedRef} from "./store.js"
import {verifyPermission} from "ptk"
import {loadReference, referencesOf} from "./references.ts";
import InputNumber from "./inputnumber.svelte";
const pickerOpts = {
  types: [{description: "Offtext",accept: {"off/*": [".off"] }}],
  excludeAcceptAllOption: true,
  multiple: false,
};
let workingfile,filehandle=null, max=0;

const loadText=(text,filename)=>{
    max=loadCMText(text);
    references.set( referencesOf(filename));
    loadReference(0);
    setCursorLine( parseInt(localStorage.getItem('aligner_'+filename))||1);
}

async function openOff(){
    const filehandles = await window.showOpenFilePicker(pickerOpts);
    filehandle=filehandles[0];
    workingfile=await filehandle.getFile();
    const text=await workingfile.text();
    loadText(text,filehandle.name);
}

async function save(){
    if (!filehandle) return;//test
    if (await verifyPermission( filehandle,true)) {
        const writable = await filehandle.createWritable();
        await writable.write($cm2.getValue());
        await writable.close()
        dirty.set(false);
        localStorage.setItem('aligner_'+filehandle.name, $cursorline );
    }
}
const tryit=async ()=>{
    const response=await fetch("dn3.yh.off");
    loadText(await response.text(),"dn3.yh.off");
}
</script>
<div class="Toolbar">
<span style="font-size:120%">逐句對齊</span><span>　ver 2023.5.11</span>
{#each $references as reference,idx}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="clickable" class:selectedRef={$selectedRef==idx} on:click={()=>loadReference(idx)}>{reference.name}</span>　
{/each}
{#if !$references.length}
<a href="https://www.youtube.com/watch?v=huCbF8bAx-8" target="_new">操作示範影片</a>
　
<button on:click={tryit}>試試看</button>

{/if}

<span style="float:right">
<button disabled={$dirty&&filehandle} title="alt-p" class="clickable" on:click={openOff}>📂</button>
<button disabled={!$dirty||!filehandle} title="alt-s" on:click={save}>💾</button>
<InputNumber bind:value={$cursorline} onChange={setCursorLine} min={1} {max}/></span>
</div>

<style>
.Toolbar {height: 1.5em;}
.selectedRef {background:lightyellow;color:black}
a{color:darkcyan}
</style>
