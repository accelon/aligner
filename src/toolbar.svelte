<script>
import {APPVER,references,selectedRef} from "./store.js"
import {loadReference} from "./references.ts";


</script>

<div class="Toolbar">
<span style="font-size:120%">對齊</span><span>{APPVER}</span>
{#each $references as reference,idx}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="clickable" class:selectedRef={$selectedRef==idx} on:click={()=>loadReference(idx)}>{reference.name}</span>　
{/each}
<a href="https://youtu.be/2TskfhLQ9Jk" target="_new">示範</a>


</div>

<style>
.Toolbar {height: 1.5em}
.selectedRef {background:lightyellow;color:black}
a{color:lightblue}
</style>
