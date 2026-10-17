async page=>{
  const base='http://127.0.0.1:3000',key='studypy_course_v1_guest',checks=[],errors=[],writes=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://firestore.googleapis.com/**',r=>r.abort());
  await page.route('**/api/**',r=>{if(r.request().method()==='GET')return r.continue();writes.push(r.request().url());return r.fulfill({status:503,body:'Read-only isolated course QA'});});
  await page.setViewportSize({width:1440,height:960});
  await page.goto(base+'/pathways');await page.getByRole('heading',{name:'Программа обучения',exact:true}).waitFor();
  const module=await page.evaluate(async()=>{const {loadCourseModule}=await import('/src/course/load.ts');return loadCourseModule('output');});
  await page.evaluate(k=>{localStorage.removeItem(k);localStorage.setItem('studypy_progress',JSON.stringify(['intro']));},key);
  await page.reload();await page.getByRole('link',{name:'Начать первый урок',exact:true}).waitFor();
  if(!await page.getByText(/Решено 0 из/).count())throw new Error('Old intro mark granted new course credit');
  await page.getByRole('link',{name:'Начать первый урок',exact:true}).click();
  await page.getByRole('heading',{name:module.lessons[0].title,level:1,exact:true}).waitFor();
  await page.getByRole('button',{name:'В закладки',exact:true}).click();
  checks.push('Old intro mark preserved without granting new credit; bookmark saved');
  const state=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)||'{}'),key);
  async function plain(){if(!await page.getByRole('textbox',{name:'Код Python',exact:true}).count())await page.getByRole('button',{name:'Простой редактор',exact:true}).click();return page.getByRole('textbox',{name:'Код Python',exact:true});}
  let firstCode=true,firstConcept=true;
  for(const lesson of module.lessons){
    if(lesson!==module.lessons[0]){await page.goto(base+'/learn/output/'+lesson.id);await page.getByRole('heading',{name:lesson.title,level:1,exact:true}).waitFor();}
    for(const step of lesson.steps){
      await page.locator('.course-step-nav').getByRole('button').filter({hasText:step.title}).click();
      await page.getByRole('button',{name:'Отметить объяснение изученным',exact:true}).click();
    }
    for(const task of lesson.exercises){
      await page.locator('.course-step-nav').getByRole('button').filter({hasText:task.title}).click();
      await page.locator('.course-task h2').filter({hasText:task.title}).waitFor();
      if(['code','modify','debug','gap'].includes(task.kind)){
        let editor=await plain();
        if(firstCode){
          await editor.fill('for range(5)');await page.getByRole('button',{name:'Проверить',exact:true}).click();
          await page.getByRole('region',{name:'Результат выполнения'}).getByText(/SyntaxError/).first().waitFor({timeout:60000});
          if((await state()).solved[task.id])throw new Error('Invalid Python passed');
          await editor.fill('# preserved draft for this concrete exercise');
          await page.reload();await page.getByRole('heading',{name:lesson.title,level:1,exact:true}).waitFor();editor=await plain();
          if(await editor.inputValue()!=='# preserved draft for this concrete exercise')throw new Error('Draft lost after refresh');
          await editor.fill('while True:\n    pass');await page.getByRole('button',{name:'Проверить',exact:true}).click();
          await page.getByRole('button',{name:'Остановить',exact:true}).click();
          await page.getByText('Выполнение остановлено.',{exact:true}).first().waitFor();
          if((await state()).solved[task.id])throw new Error('Stopped computation granted credit');
          const before=(await state()).attempts.length;
          await editor.fill(task.alternative);await page.getByRole('button',{name:'Проверить',exact:true}).dblclick();
          await page.getByText('Все проверки пройдены.',{exact:true}).waitFor({timeout:60000});
          if((await state()).attempts.length!==before+1)throw new Error('Double click recorded two attempts');
          firstCode=false;checks.push('SyntaxError rejected; concrete draft and exact step restored; stop cancels without credit; alternative accepted; double click submits once');
        }else{
          await editor.fill(task.reference);await page.getByRole('button',{name:'Проверить',exact:true}).click();
          await page.getByText('Все проверки пройдены.',{exact:true}).waitFor({timeout:60000});
        }
      }else{
        if(task.kind==='order'){
          let order=task.blocks.map(b=>b.id);
          for(let target=0;target<task.answer.length;target++){let index=order.indexOf(task.answer[target]);while(index>target){await page.getByRole('button',{name:`Строка ${index+1}: выше`,exact:true}).click();[order[index-1],order[index]]=[order[index],order[index-1]];index--;}}
        }else if(task.choices){for(const id of task.answer)await page.getByRole('checkbox',{name:task.choices.find(c=>c.id===id).text,exact:true}).check();}
        else await page.locator('.course-concept textarea').fill(task.answer);
        const before=(await state()).attempts.length;
        await page.getByRole('button',{name:'Проверить ответ',exact:true}).dblclick();
        await page.getByText('Ответ верный.',{exact:true}).waitFor();
        if((await state()).attempts.length!==before+1)throw new Error('Concept duplicate attempt');
        if(firstConcept){checks.push('Concept answers and ordered lines use exact contracts; duplicate answer blocked');firstConcept=false;}
      }
      if(!(await state()).solved[task.id])throw new Error('Correct answer not persisted '+task.id);
    }
  }
  const completed=await state();
  if(Object.keys(completed.solved).length!==module.lessons.flatMap(l=>l.exercises).length||!completed.completedModules.output)throw new Error('Full module did not complete');
  await page.reload();await page.getByRole('heading',{level:1}).waitFor();
  const url=page.url();await page.goto(base+'/pathways');
  if(await page.getByRole('link',{name:'Продолжить с сохранённого шага',exact:true}).getAttribute('href')!==url.replace(base,''))throw new Error('Resume lost exact task');
  await page.getByRole('link',{name:'Закладки',exact:true}).click();await page.getByRole('heading',{name:'Закладки',exact:true}).waitFor();
  if(!await page.getByRole('link',{name:module.lessons[0].title+' →',exact:true}).count())throw new Error('Bookmark missing');
  await page.getByRole('link',{name:'История попыток',exact:true}).click();await page.getByRole('heading',{name:'История попыток',exact:true}).waitFor();
  if(!await page.getByText(/Нужно исправить/).count())throw new Error('Failed attempt history missing');
  if(!await page.evaluate(()=>JSON.parse(localStorage.getItem('studypy_progress')).includes('intro')))throw new Error('Old mark deleted');
  if(writes.length)throw new Error('New local course tried remote writes: '+writes.join(','));
  checks.push('All output module theory, exercises, review, assessment and project completed through UI; local progress, bookmark, old mark, history and exact resume survived refresh; zero remote writes');
  if(errors.length)throw new Error('Uncaught UI errors: '+errors.join(';'));
  return {checks,read:Object.keys(completed.read).length,solved:Object.keys(completed.solved).length,attempts:completed.attempts.length,completion:completed.completedModules,browserErrors:errors,remoteWrites:writes};
}
