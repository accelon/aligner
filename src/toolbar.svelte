<script>
import {APPVER,references,selectedRef} from "./store.js"
import {loadReference} from "./references.ts";


</script>

<div class="Toolbar">
<span style="font-size:120%">平行藏对齐</span><span>{APPVER}</span>
{#each $references as reference,idx}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="clickable" class:selectedRef={$selectedRef==idx} on:click={()=>loadReference(idx)}>{reference.name}</span>　
{/each}
{#if !$references.length}
<a href="https://youtu.be/2TskfhLQ9Jk" target="_new">Youtube教學視頻</a>
<a href="https://nissaya.cn/video/aligner.mp4" target="_new">无法访问油管点此</a>
<a href="outsource.html" target="_new">应徵工作</a>

{/if}

</div>

<style>
.Toolbar {height: 1.5em}
.selectedRef {background:lightyellow;color:black}
a{color:lightblue}
</style>
