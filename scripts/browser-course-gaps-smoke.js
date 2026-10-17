async page=>{
 await page.route('https://firestore.googleapis.com/**',r=>r.abort());
 await page.route('**/api/**',r=>r.request().method()==='GET'?r.continue():r.fulfill({status:503,body:'Read-only QA'}));
 const cases=[['output','output-format','output-joined-status'],['sequences','sequences-sort','sequences-sort-length-order']];
 for(const [module,lesson,id]of cases){
  await page.goto('http://127.0.0.1:3000/learn/'+module+'/'+lesson+'?task='+id);await page.locator('.course-task h2').waitFor();
  const task=await page.evaluate(async({module,lesson,id})=>{const{loadCourseModule}=await import('/src/course/load.ts');return(await loadCourseModule(module)).lessons.find(l=>l.id===lesson).exercises.find(t=>t.id===id);},{module,lesson,id});
  if(!await page.getByRole('textbox',{name:'Код Python',exact:true}).count())await page.getByRole('button',{name:'Простой редактор',exact:true}).click();
  const editor=page.getByRole('textbox',{name:'Код Python',exact:true});await editor.fill(task.initialCode);
  await page.getByRole('button',{name:'Проверить',exact:true}).click();await page.getByText('Проверка 1: не пройдена',{exact:true}).waitFor({timeout:60000});
  await editor.fill(task.alternative);await page.getByRole('button',{name:'Проверить',exact:true}).click();await page.getByText('Все проверки пройдены.',{exact:true}).waitFor({timeout:60000});
 }
 return{checks:['Both meaningful gaps reject the unfilled program in actual Worker','Correct alternatives pass for end and stable length sorting'],tasks:cases.map(c=>c[2])};
}
