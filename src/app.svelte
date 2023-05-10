<script>
import {onMount} from 'svelte'
import Toolbar from './toolbar.svelte'
import SplitPane from './3rdparty/splitpane.svelte';
import {testdata} from './test.js'
import {beforeChange, cursorActivity,loadCMText} from './editor.ts'
let lefteditor,righteditor;

let cm1,cm2, pos=40;
onMount(()=>{
    cm1 = new CodeMirror(lefteditor, {
	    value:'NO SOURCE\nasdfasdf\nadsfasdf',lineWrapping:true,
         readOnly:true,theme:'ambiance',styleActiveLine:true
    })
    cm2 = new CodeMirror(righteditor, {lineWrapping:true,
        lineNumbers:true,
	    value:'', theme:'ambiance',styleActiveLine:true
    })

    cm2.on("cursorActivity",(cm,obj)=>cursorActivity(cm,cm1));
    cm2.on("beforeChange",beforeChange);

    loadCMText(cm1,testdata);
    loadCMText(cm2,testdata);
})

function handleKeydown(evt) {
    const key=evt.key.toLowerCase();
    const alt=evt.altKey;
    if (key=='f5') {//prevent refresh accidently
        // evt.preventDefault();
        // return;
    }
}
</script>
<svelte:window on:keydown={handleKeydown}/>
<div class="app">
<Toolbar/>
<SplitPane type="horizontal" bind:pos min={15} max={85}>
    <div slot="a">
        <div bind:this={lefteditor}></div>
    </div>
    <div slot="b">
        <div bind:this={righteditor}></div>
    </div>
</SplitPane>
</div>

<style>
.app {height:100vh} /* splitpane divider need this */
</style>