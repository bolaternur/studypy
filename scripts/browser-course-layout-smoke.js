async page=>{
 const base='http://127.0.0.1:3000',shots='test-results/',checks=[],errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://firestore.googleapis.com/**',r=>r.abort());
 await page.route('**/api/**',r=>r.request().method()==='GET'?r.continue():r.fulfill({status:503,body:'Read-only visual QA'}));
 for(const width of [360,390,768,1440]){
  await page.setViewportSize({width,height:1000});
  for(const [route,name] of [['/pathways','catalog'],['/learn/loops/loops-range','loops'],['/learn/functions/functions-return','functions'],['/typing','typing']]){
   await page.goto(base+route);await page.locator('h1').first().waitFor();
   if(name==='typing'){
    await page.locator('.course-learning-links>summary').click();
    await page.getByRole('heading',{name:/Вывод: от разбора/}).waitFor();
    await page.getByRole('link',{name:'Весь модуль «Первая программа и вывод» →',exact:true}).waitFor();
   }
   const dimensions=await page.evaluate(()=>({w:innerWidth,scroll:document.documentElement.scrollWidth,main:document.querySelectorAll('main').length}));
   if(dimensions.scroll>width||dimensions.main!==1)throw new Error(name+' '+width+' overflow/landmark '+JSON.stringify(dimensions));
   if(name==='loops'&&width<900&&await page.locator('.course-step-nav>details').first().getAttribute('open')!==null)throw new Error('Mobile step tree covers theory by default');
   if(width===390||width===1440)await page.screenshot({path:shots+'course-'+name+'-'+width+'.png'});
  }
 }
 checks.push('Catalog, loops, functions and optional typing theory fit 360/390/768/1440; mobile step tree initially compact; one main landmark');
 await page.goto(base+'/pathways');await page.getByRole('heading',{name:'Программа обучения',exact:true}).waitFor();
 const search=page.getByRole('searchbox');await search.fill('факториал');
 const factorial=page.getByRole('link',{name:'Задание: Факториал, включая 0!',exact:true});await factorial.waitFor();await factorial.click();
 await page.locator('.course-task h2').filter({hasText:'Факториал'}).waitFor();
 if(!page.url().includes('task='))throw new Error('Task search lacks stable deep link');
 checks.push('Task search leads to the exact factorial exercise');
 await page.setViewportSize({width:390,height:844});
 if(!await page.getByRole('textbox',{name:'Код Python',exact:true}).count())await page.getByRole('button',{name:'Простой редактор',exact:true}).click();
 await page.getByRole('textbox',{name:'Код Python',exact:true}).fill('for range(5)');
 await page.getByRole('button',{name:'Проверить',exact:true}).click();
 await page.getByRole('region',{name:'Результат выполнения'}).getByText(/SyntaxError/).first().waitFor({timeout:60000});
 await page.getByRole('region',{name:'Результат выполнения'}).scrollIntoViewIfNeeded();
 await page.screenshot({path:shots+'course-error-390.png'});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw new Error('Editor result/control overflow at 390');
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(base+'/learn/loops/loops-accumulate');await page.locator('h1').waitFor();
 await page.locator('.course-table-scroll').first().scrollIntoViewIfNeeded();
 await page.setViewportSize({width:1440,height:1000});
 await page.screenshot({path:shots+'course-trace-1440.png'});
 checks.push('Real SyntaxError and editor controls fit phone; trace table remains readable; reduced-motion flow works');
 if(errors.length)throw new Error('Browser errors: '+errors.join(';'));
 return{checks,browserErrors:errors};
}
