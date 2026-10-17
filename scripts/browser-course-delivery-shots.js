async page=>{
 const out='test-results/';
 await page.route('https://firestore.googleapis.com/**',r=>r.abort());
 await page.route('**/api/**',r=>r.request().method()==='GET'?r.continue():r.fulfill({status:503,body:'Read-only screenshots'}));
 await page.setViewportSize({width:1440,height:1000});
 for(const[route,file]of [['/pathways','course-catalog-1440.png'],['/learn/loops','course-loops-module-1440.png'],['/learn/oop','course-oop-module-1440.png']]){
  await page.goto('http://127.0.0.1:3000'+route);await page.locator('h1').first().waitFor();await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:out+file});
 }
 return{screenshots:['course-catalog-1440.png','course-loops-module-1440.png','course-oop-module-1440.png']};
}
