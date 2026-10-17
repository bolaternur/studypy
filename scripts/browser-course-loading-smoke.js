async page=>{
 await page.route('https://firestore.googleapis.com/**',r=>r.abort());
 await page.route('**/api/**',r=>r.fulfill({status:503,body:'Production preview read-only QA'}));
 const base='http://127.0.0.1:4173',moduleIds=['output','foundations','arithmetic','conditions','loops','strings','sequences','mappings','functions','debugging','data','projects','oop','iterators','decorators','async-python','sql-python','tooling'];
 const snapshots=[];
 for(const [route,name] of [['/','home'],['/pathways','catalog'],['/learn/loops/loops-range','one module']]){
  await page.goto(base+route);await page.locator('h1').first().waitFor();await page.evaluate(()=>document.fonts.ready);
  const resources=await page.evaluate(()=>performance.getEntriesByType('resource').filter(e=>e.name.includes('/assets/')&&e.name.endsWith('.js')).map(e=>({url:e.name.split('/').at(-1),bytes:e.encodedBodySize,transferred:e.transferSize})));
  const loadedModules=moduleIds.filter(id=>resources.some(r=>r.url.startsWith(id+'-')&&!r.url.startsWith('functions-Pages')));
  snapshots.push({name,route,scriptCount:resources.length,encodedJSBytes:resources.reduce((n,r)=>n+r.bytes,0),loadedModules,resources});
 }
 if(snapshots[0].loadedModules.length||snapshots[1].loadedModules.length)throw new Error('Full textbook module loaded before a lesson: '+JSON.stringify(snapshots));
 if(JSON.stringify(snapshots[2].loadedModules)!==JSON.stringify(['loops']))throw new Error('Single lesson did not load exactly its module: '+JSON.stringify(snapshots));
 return{checks:['Production home and catalog do not load authored textbook modules','A loops lesson loads only the loops content chunk'],snapshots,limit:'Network sizes for this browser run; no Lighthouse or load-time score claimed.'};
}
