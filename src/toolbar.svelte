<script>
import {references,selectedRef} from "./store.js"
import {loadReference} from "./references.ts";

const tryit=async ()=>{
    const response=await fetch("dn3.yh.off");
    loadText(await response.text(),"dn3.yh.off");
}

</script>

<div class="Toolbar">
<span style="font-size:120%">逐句對齊</span><span>　ver 2023.5.13</span>
{#each $references as reference,idx}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="clickable" class:selectedRef={$selectedRef==idx} on:click={()=>loadReference(idx)}>{reference.name}</span>　
{/each}
{#if !$references.length}
<a href="https://www.youtube.com/watch?v=huCbF8bAx-8" target="_new">操作示範影片</a>
　
<button on:click={tryit}>試試看</button>

{/if}

</div>

<style>
.Toolbar {height: 1.5em}
.selectedRef {background:lightyellow;color:black}
a{color:darkcyan}
</style>
