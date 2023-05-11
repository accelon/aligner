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
let workingfile,filehandle, max=0;

async function openOff(){
    const filehandles = await window.showOpenFilePicker(pickerOpts);
    filehandle=filehandles[0];
    workingfile=await filehandle.getFile();
    max=loadCMText(await workingfile.text());
    references.set( referencesOf(filehandle.name));
    loadReference(0);
    setCursorLine( parseInt(localStorage.getItem('aligner_'+filehandle.name))||1);
}

async function save(){
    if (await verifyPermission( filehandle,true)) {
        const writable = await filehandle.createWritable();
        await writable.write($cm2.getValue());
        await writable.close()
        dirty.set(false);
        localStorage.setItem('aligner_'+filehandle.name, $cursorline );
    }
}

</script>
<div class="Toolbar">
<span style="font-size:120%">逐句對齊</span><span>　ver 2023.5.10</span>
{#each $references as reference,idx}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="clickable" class:selectedRef={$selectedRef==idx} on:click={()=>loadReference(idx)}>{reference.name}</span>　
{/each}
{#if !$references.length}
<a href="https://www.youtube.com/watch?v=huCbF8bAx-8" target="_new">操作示範影片</a>
{/if}

<span style="float:right">
<button disabled={$dirty} title="alt-p" class="clickable" on:click={openOff}>📂</button>
<button disabled={!$dirty} title="alt-s" on:click={save}>💾</button>
<InputNumber bind:value={$cursorline} onChange={setCursorLine} min={1} {max}/></span>
</div>

<style>
.Toolbar {height: 1.5em;}
.selectedRef {background:lightyellow;color:black}
a{color:darkcyan}
</style>
