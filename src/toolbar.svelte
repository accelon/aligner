<script>
import {references,selectedRef} from "./store.js"
import {loadReference} from "./references.ts";


</script>

<div class="Toolbar">
<span style="font-size:120%">逐句對照</span><span>　ver 2023.5.13</span>
{#each $references as reference,idx}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="clickable" class:selectedRef={$selectedRef==idx} on:click={()=>loadReference(idx)}>{reference.name}</span>　
{/each}
<a href="https://youtu.be/2TskfhLQ9Jk" target="_new">操作示範影片</a>


</div>

<style>
.Toolbar {height: 1.5em}
.selectedRef {background:lightyellow;color:black}
a{color:lightblue}
</style>
