<script>
import {references} from "./store.js"

</script>
<span class="clickable">📂 💾</span>
{#each $references as reference}
<span class="clickable">{reference}</span>　
{/each}
