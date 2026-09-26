// Run after ANY change, including layout-only changes: node prepare.cjs
// Nothing is committed or published by this script.
const fs=require('node:fs'),cp=require('node:child_process');
const path=__dirname+'/index.html',html=fs.readFileSync(path,'utf8');
const pattern=/(<script type="application\/json" id="edvin-data">)([\s\S]*?)(<\/script>)/;
const match=html.match(pattern);if(!match)throw Error('Raw data block missing');
const data=JSON.parse(match[2]);
const events=data.days.flatMap(d=>[...d.feeds,...d.diapers]);
const latest=events.sort((a,b)=>Date.parse(a.at)-Date.parse(b.at)).at(-1);
if(latest)data.through=latest.at;
data.publishedAt=new Date().toISOString();
const json=JSON.stringify(data,null,2).replace(/<\//g,'<\\/');
fs.writeFileSync(path,html.replace(pattern,(_,open,old,close)=>open+json+'\n'+close));
cp.execFileSync(process.execPath,[__dirname+'/tests.cjs'],{stdio:'inherit'});
console.log('Checked and stamped '+data.publishedAt+'. Commit index.html to publish.');
