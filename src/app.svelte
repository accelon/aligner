<script>
import {onMount} from 'svelte'
import {get} from 'svelte/store'
import Toolbar from './toolbar.svelte'
import EditorToolbar from './editortoolbar.svelte'
import SplitPane from './3rdparty/splitpane.svelte';
import {helptext} from './help.js'
import {cm1,cm2} from './store.js';
import {beforeChange, cursorActivity,loadCMText} from './editor.ts'
let lefteditor,righteditor;

let pos=45;
onMount(()=>{
    const refer=new CodeMirror(lefteditor, {
	    value:'',lineWrapping:true,
         readOnly:true,theme:'ambiance',styleActiveLine:true
    })
    cm1.set(refer);

    cm2.set(new CodeMirror(righteditor, {lineWrapping:true,
	    value:'', theme:'ambiance',styleActiveLine:true
    }))

    get(cm2).on("cursorActivity",(cm,obj)=>cursorActivity(cm,refer));
    get(cm2).on("beforeChange",beforeChange);

    loadCMText("工作區");
    loadCMText(helptext,1);
})

</script>

<div class="app">

<SplitPane type="horizontal" bind:pos min={15} max={85}>
    <div slot="a">
        <Toolbar/>
        <div bind:this={lefteditor}></div>
    </div>
    <div slot="b">
        <EditorToolbar/>
        <div bind:this={righteditor}></div>
    </div>
</SplitPane>
</div>

<style>
.app {height:100vh} /* splitpane divider need this */
</style>