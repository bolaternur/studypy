async page=>{
  const base='http://127.0.0.1:3000',key='studypy_course_v1_guest',checks=[],errors=[],remoteWrites=[],observations=[];
  const lesson='/learn/loops/loops-repeat',concept=lesson+'?task=loops-repeat-indent';
  const codeTask='/learn/loops/loops-range?task=loops-range-inclusive';
  const draftKey='studypy:draft:v2:course:loops-range-inclusive';
  page.on('pageerror',error=>errors.push(error.message));
  await page.route('https://firestore.googleapis.com/**',route=>route.abort());
  await page.route('**/api/**',route=>{
    if(route.request().method()==='GET')return route.continue();
    remoteWrites.push(route.request().url());
    return route.fulfill({status:503,body:'Isolated local course QA; remote writes disabled'});
  });
  const state=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)||'{}'),key);
  const quota=async drafts=>page.evaluate(blockDrafts=>{
    if(window.__courseEdgeOriginalSet)return;
    window.__courseEdgeOriginalSet=Storage.prototype.setItem;
    Storage.prototype.setItem=function(storageKey,value){
      if(storageKey.startsWith('studypy_course_v1_')||(blockDrafts&&storageKey.startsWith('studypy:draft:v2:')))
        throw new DOMException('Isolated quota fixture','QuotaExceededError');
      return window.__courseEdgeOriginalSet.call(this,storageKey,value);
    };
  },drafts);
  const restore=()=>page.evaluate(()=>{
    if(window.__courseEdgeOriginalSet){Storage.prototype.setItem=window.__courseEdgeOriginalSet;delete window.__courseEdgeOriginalSet;}
  });
  async function ready(route){await page.goto(base+route);await page.getByRole('heading',{level:1,exact:true}).waitFor();}
  async function plain(){
    if(!await page.getByRole('textbox',{name:'Код Python',exact:true}).count())await page.getByRole('button',{name:'Простой редактор',exact:true}).click();
    return page.getByRole('textbox',{name:'Код Python',exact:true});
  }
  await page.setViewportSize({width:390,height:844});
  try{
    await ready(lesson);
    await page.evaluate(({key,draftKey})=>{localStorage.removeItem(key);localStorage.removeItem(draftKey);},{key,draftKey});
    await page.reload();await page.getByRole('button',{name:'В закладки',exact:true}).waitFor();
    await page.getByRole('button',{name:'В закладки',exact:true}).click();
    if(!(await state()).bookmarks.includes(lesson))throw new Error('Bookmark not persisted');
    await page.reload();await page.getByRole('button',{name:'В закладках',exact:true}).waitFor();
    await ready('/pathways?view=bookmarks');
    await page.getByRole('link',{name:'Повторение и переменная цикла →',exact:true}).click();
    await page.getByRole('heading',{name:'Повторение и переменная цикла',exact:true}).waitFor();
    checks.push('Bookmark survives reload and catalog link opens the concrete lesson');

    await quota(false);
    await page.getByRole('button',{name:'В закладках',exact:true}).click();
    await page.getByRole('button',{name:'Отметить объяснение изученным',exact:true}).click();
    await page.getByText('Браузер не сохранил прогресс.',{exact:false}).waitFor();
    if(!(await state()).bookmarks.includes(lesson))throw new Error('Failed write destroyed previous bookmark');
    await restore();
    await page.getByRole('button',{name:'Объяснение отмечено как изученное',exact:true}).click();
    const recovered=await state();
    if(recovered.bookmarks.includes(lesson)||!recovered.read['loops-repeat-idea'])throw new Error('Pending bookmark/read actions lost on quota recovery');
    await page.reload();await page.getByRole('button',{name:'Объяснение отмечено как изученное',exact:true}).waitFor();
    checks.push('Quota failure retains previous stored value and live pending changes; next successful action saves both bookmark removal and read mark');

    await ready(concept);
    await page.getByRole('heading',{name:'Сколько итогов?',exact:true}).waitFor();
    await quota(false);
    await page.getByRole('button',{name:'Открыть решение и пометить помощь в попытке',exact:true}).click();
    await page.getByText('Разбор открыт. Следующие решения этой задачи будут отмечены как выполненные с помощью.',{exact:true}).waitFor();
    if((await state()).solutions['loops-repeat-indent'])throw new Error('Quota fixture did not block solution persistence');
    await page.getByRole('checkbox',{name:'Тогда оно выполнится один раз после всех повторений.',exact:true}).check();
    await page.getByRole('checkbox',{name:'Иначе оно печатается на каждой итерации.',exact:true}).check();
    await restore();
    const before=(await state()).attempts.length;
    await page.getByRole('button',{name:'Проверить ответ',exact:true}).dblclick();
    await page.getByText('Ответ верный.',{exact:true}).waitFor();
    const assisted=await state();
    if(assisted.attempts.length!==before+1||!assisted.attempts.at(-1).assisted||assisted.solved['loops-repeat-indent'].independent)
      throw new Error('Assistance or duplicate-click rule lost during quota recovery');
    await page.reload();await page.getByText(/Задание выполнено с опорой на разбор/).waitFor();
    checks.push('Opening solution during quota failure still marks next successful attempt as assisted; duplicate answer creates one attempt and survives refresh');

    const predict='/learn/loops/loops-range?task=loops-range-step-meaning';
    await ready(predict);await page.locator('.course-concept textarea').fill('2\n5');
    await page.getByRole('button',{name:'Проверить ответ',exact:true}).click();
    await page.getByText(/Ответ пока неверный/).waitFor();
    await ready('/pathways?view=review');
    await page.getByRole('link',{name:'Начало и шаг →',exact:true}).waitFor();
    await page.getByRole('link',{name:'Начало и шаг →',exact:true}).click();
    await page.locator('.course-concept textarea').fill('2\n5\n8');
    await page.getByRole('button',{name:'Проверить ответ',exact:true}).click();
    await page.getByText('Ответ верный.',{exact:true}).waitFor();
    if(!(await state()).solved['loops-range-step-meaning'].independent)throw new Error('Unaided correction not marked independent');
    await ready('/pathways?view=review');
    if(await page.getByRole('link',{name:'Начало и шаг →',exact:true}).count())throw new Error('Corrected error remains in review');
    checks.push('Latest failed concept appears in Repeat errors; correct independent retry removes it without deleting history');

    await ready(codeTask);let editor=await plain();
    const oldCode='print("draft before quota")',newCode='a = int(input())\n# Эта новая строка должна остаться в редакторе';
    await editor.fill(oldCode);await quota(true);await editor.fill(newCode);
    await page.getByText('Не удалось сохранить черновик на устройстве. Скопируй код перед выходом.',{exact:true}).waitFor();
    if(await editor.inputValue()!==newCode||await page.evaluate(k=>localStorage.getItem(k),draftKey)!==oldCode)
      throw new Error('Draft quota failure destroyed editor text or previous stored draft');
    await restore();const finalCode=newCode+'\nprint(a)';await editor.fill(finalCode);
    if(await page.evaluate(k=>localStorage.getItem(k),draftKey)!==finalCode)throw new Error('Recovered draft write failed');
    if(await page.getByText('Не удалось сохранить черновик на устройстве. Скопируй код перед выходом.',{exact:true}).count())throw new Error('Draft storage warning did not clear after a confirmed recovered write');
    await page.reload();await page.getByRole('heading',{name:'Закрытый интервал',exact:true}).waitFor();editor=await plain();
    if(await editor.inputValue()!==finalCode)throw new Error('Recovered draft lost after refresh');
    checks.push('Draft quota failure preserves live code and previous stored draft; recovered edit clears the specific draft warning, saves latest code and refresh restores it');

    await ready('/learn/loops/loops-range?task=not-a-real-task');
    await page.getByRole('heading',{name:'Такого шага нет в уроке',exact:true}).waitFor();
    await page.getByRole('button',{name:'К началу урока',exact:true}).click();
    await page.getByRole('heading',{name:'Как это работает',exact:true}).waitFor();
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw new Error('Course edge flow overflows at 390px');
    checks.push('Unknown task deep link gives a working return to first step; no horizontal overflow at 390px');
    if(remoteWrites.length)throw new Error('Course edge flow attempted remote writes: '+remoteWrites.join(','));
    if(errors.length)throw new Error('Unhandled browser errors: '+errors.join('; '));
    return {checks,observations,browserErrors:errors,remoteWrites};
  }finally{await restore();}
}
