async page => {
  const base = 'http://127.0.0.1:4173';
  const shots = 'test-results/';
  const checks = [], errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/api/**', route => route.request().method() === 'GET' ? route.continue() : route.fulfill({status:503,contentType:'application/json',body:'{"error":"Read-only browser verification"}'}));
  await page.route('https://firestore.googleapis.com/**', route => route.abort());
  await page.setViewportSize({width:1440,height:900});
  await page.goto(base+'/');
  await page.getByRole('heading',{name:'Изучай Python на практике'}).waitFor();
  await page.evaluate(()=>{
    for(const key of Object.keys(localStorage)) if(key.startsWith('studypy_tasks_v2_guest_') || key.startsWith('studypy:draft:v2:lesson:') || key.startsWith('studypy_progress')) localStorage.removeItem(key);
  });
  await page.reload();
  await page.getByRole('heading',{name:'Изучай Python на практике'}).waitFor();
  await page.keyboard.press('Tab');
  if(!await page.getByRole('link',{name:'Перейти к содержимому'}).evaluate(el=>el===document.activeElement))throw new Error('Skip link not reachable first');
  await page.keyboard.press('Enter');
  if(!await page.locator('#main').evaluate(el=>el===document.activeElement))throw new Error('Skip link did not focus main');
  checks.push('Skip link focuses the main landmark');
  for(const label of ['Открыть меню','Войти','Открыть наставника']) {
    const trigger=page.getByRole('button',{name:label,exact:true});
    await trigger.click();
    const dialog=page.getByRole('dialog');
    await dialog.waitFor();
    if(!await dialog.evaluate(el=>el.contains(document.activeElement)))throw new Error(label+': focus outside dialog');
    await page.keyboard.press('Escape');
    await dialog.waitFor({state:'hidden'});
    if(!await trigger.evaluate(el=>el===document.activeElement))throw new Error(label+': focus not restored');
  }
  checks.push('Menu, sign-in and mentor dialogs: name, Escape and focus return');
  await page.getByRole('link',{name:'Начать первый урок',exact:true}).click();
  await page.getByRole('heading',{name:'Первая программа',level:1}).waitFor();
  async function plain() {
    if(!await page.getByRole('textbox',{name:'Код Python',exact:true}).count())await page.getByRole('button',{name:'Простой редактор',exact:true}).click();
    return page.getByRole('textbox',{name:'Код Python',exact:true});
  }
  let editor=await plain();
  await editor.fill('# print("Hello World")');
  await page.getByRole('button',{name:'Проверить',exact:true}).click();
  await page.getByText('Проверка 1: не пройдена',{exact:true}).waitFor();
  if(await page.getByRole('button',{name:'Завершить урок',exact:true}).count())throw new Error('Comment unlocked completion');
  await editor.fill('import sys\nsys.stdout.write("Hello World")');
  await page.getByRole('button',{name:'Проверить',exact:true}).click();
  await page.getByText('Все проверки пройдены.',{exact:true}).waitFor();
  await page.getByRole('button',{name:'Следующая задача',exact:true}).click();
  editor=await plain();
  const second=await editor.inputValue();
  if(second.includes('sys.stdout'))throw new Error('Task drafts were shared');
  await editor.fill('print("Line 1\\nLine 2")');
  await page.reload();
  editor=await plain();
  if(await editor.inputValue()!=='print("Line 1\\nLine 2")')throw new Error('Second task draft or position lost');
  await page.getByRole('button',{name:'Проверить',exact:true}).click();
  await page.getByText('Все проверки пройдены.',{exact:true}).waitFor();
  await page.getByRole('button',{name:'Завершить урок',exact:true}).dblclick();
  await page.getByRole('heading',{name:'Урок пройден',exact:true}).waitFor();
  const progress=await page.evaluate(()=>JSON.parse(localStorage.getItem('studypy_progress')||'[]'));
  if(progress.filter(id=>id==='intro').length!==1)throw new Error('Duplicate progress entry');
  checks.push('Comment rejected; alternative Python accepted; task drafts and saved position survive reload; double finish saves once');
  await page.goto(base+'/');
  if(!await page.getByRole('link',{name:'Продолжить обучение',exact:true}).getAttribute('href').then(value=>value==='/lesson/variables'))throw new Error('Home resume target is wrong');
  checks.push('Returning learner continues with the next unfinished lesson');
  await page.goto(base+'/lesson/loops');
  editor=await plain();
  await editor.fill('for range(5)');
  await page.getByRole('button',{name:'Проверить',exact:true}).click();
  await page.getByText(/SyntaxError/).first().waitFor();
  await page.getByRole('region',{name:'Результат выполнения'}).scrollIntoViewIfNeeded();
  await page.screenshot({path:shots+'lesson-real-error-1440.png'});
  checks.push('Former false-positive loop gives real SyntaxError without completing a lesson');
  await page.goto(base+'/lesson/git-practice');
  await page.waitForURL(base+'/lesson/git');
  await page.goto(base+'/lesson/not-a-lesson');
  await page.getByRole('heading',{name:'Урок не найден',exact:true}).waitFor();
  checks.push('Legacy lesson URL redirects and unknown lesson has a recoverable not-found state');
  for(const width of [360,390,768,1440]) {
    await page.setViewportSize({width,height:900});
    for(const [route,file] of [['/','home'],['/pathways','program'],['/lesson/intro','lesson'],['/sandbox','sandbox'],['/arcade','games']]) {
      await page.goto(base+route);
      await page.locator('h1').first().waitFor();
      const size=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,main:document.querySelectorAll('main').length}));
      if(size.scroll>width || size.main!==1)throw new Error(route+' '+width+' layout/landmark '+JSON.stringify(size));
      if(route==='/sandbox')await plain();
      if(width===390||width===1440)await page.screenshot({path:shots+file+'-'+width+'.png'});
    }
  }
  checks.push('Primary screens: no horizontal overflow, single main landmark at 360/390/768/1440');
  const visited=[];
  for(const route of ['/community','/friends','/gallery','/guilds','/shop','/inventory','/achievements','/skill-tree','/leaderboard','/pet','/daily','/boss-arena','/duels','/collaborative']) {
    await page.goto(base+route);
    await page.waitForTimeout(800);
    const text=await page.locator('#main').innerText();
    if(text.includes('Экран не загрузился'))throw new Error(route+' hit ErrorBoundary');
    visited.push({route,text:text.slice(0,170)});
  }
  if(errors.length)throw new Error('Browser exceptions: '+errors.join('; '));
  return {checks,visited,browserErrors:errors};
}
