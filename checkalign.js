/* generate offtext from CCC html */
import {meta_sc,autoAlign, writeChanged,nodefs, readTextLines, readTextContent,} from 'ptk/nodebundle.cjs'
import {yellow,red} from 'ptk/cli/colors.cjs';
await nodefs
const pat=process.argv[2]||'dn'
const versions=[
    '../cs/off/<>.cs.off',
    '../sc/off/<>.sc.off',
    '../ccc/off/<>.ccc.off',
    '../sutra-mobi/off/<>.hz.off',
    '../xsq/off/<>.xsq.off',
    '../cb-n/off/<>.yh.off',
]

const books=meta_sc.booksOf(pat);

books.forEach(bk=>{
    const linecount={}
    let sum=0,first=0,count=0;
    for (let i=0;i<versions.length;i++) {
        const fn=versions[i].replace('<>',bk);
        if (!fs.existsSync(fn))continue;
        const lines=readTextLines(fn);
        const name=versions[i].match(/\.([a-z]+)\./)[1];
        if (i==0) first=lines.length;
        linecount[name]=lines.length;
        sum+=lines.length;
        count++;
    }

    if (sum/count!==first) {
        console.log(bk,linecount)
    }
})