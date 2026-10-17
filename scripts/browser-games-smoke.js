async page => {
  const base = 'http://127.0.0.1:4173';
  const shots = 'test-results/';
  const checks = [];
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('https://firestore.googleapis.com/**', route => route.abort());
  await page.route('**/api/**', route => route.request().method() === 'GET' ? route.continue() : route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"Local read-only smoke test"}' }));
  await page.goto(`${base}/arcade`);
  await page.getByRole('heading', { name: 'Игры для практики Python', exact: true }).waitFor();
  await page.evaluate(() => {
    for (const key of Object.keys(localStorage)) if (key.startsWith('studypy:quiz:v2:') || key.startsWith('studypy:typing:')) localStorage.removeItem(key);
  });
  async function noOverflow(label) {
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ viewport: innerWidth, content: document.documentElement.scrollWidth }));
      if (dimensions.content > dimensions.viewport) throw new Error(`${label} overflows ${width}: ${JSON.stringify(dimensions)}`);
    }
  }
  await noOverflow('catalogue');
  await page.screenshot({ path: shots + 'games-1440.png', fullPage: true });
  checks.push('Catalogue lists 10 exercises; no overflow at 360,390,768,1440');
  const quizzes = [ ['debugrush', 8], ['predictor', 8], ['logicgates', 10], ['regexracer', 8], ['algoascent', 6], ['triviachase', 6] ];
  for (const [id, count] of quizzes) {
    await page.goto(`${base}/arcade?game=${id}`);
    for (let index = 0; index < count; index++) {
      const options = page.locator('section .grid button');
      await options.first().waitFor();
      const option = id === 'regexracer' && index === 0 ? options.nth(1) : options.first();
      await option.evaluate(button => { button.click(); button.click(); });
      const stored = await page.evaluate(gameId => JSON.parse(localStorage.getItem(`studypy:quiz:v2:${gameId}`)), id);
      if (Object.keys(stored.answers).length !== index + 1) throw new Error(`${id} repeated click counted twice`);
      await page.getByRole('button', { name: index === count - 1 ? 'Посмотреть итог' : 'Следующий вопрос', exact: true }).click();
    }
    await page.getByRole('button', { name: 'Повторить серию', exact: true }).waitFor();
    await noOverflow(id);
    if (id === 'regexracer') {
      await page.getByText('Правильных ответов: 0 из 8. Ошибок: 8.', { exact: true }).waitFor();
      await page.getByRole('heading', { name: 'Серия завершена', exact: true }).waitFor();
      if (await page.getByText('Регулярные выражения: мастер', { exact: true }).count()) throw new Error('Incorrect mastery title');
      await page.reload();
      await page.getByText('Правильных ответов: 0 из 8. Ошибок: 8.', { exact: true }).waitFor();
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({ path: shots + 'game-errors-390.png', fullPage: true });
    }
    checks.push(`${id}: every question, double click guard, explanation and honest summary`);
  }
  await page.goto(`${base}/arcade?game=syntaxmatch`);
  await page.getByRole('button', { name: 'Открыть карточку 1', exact: true }).click();
  await page.getByRole('button', { name: 'Открыть карточку 2', exact: true }).click();
  await page.getByRole('button', { name: 'Продолжить', exact: true }).waitFor();
  const attempts = await page.getByText(/Попыток: 1\./).count();
  if (attempts !== 1) throw new Error('Memory pair attempt is inconsistent');
  await noOverflow('matching');
  checks.push('Matching reveals a pair with an explanation; no processing timer');
  await page.goto(`${base}/arcade?game=speedtyper`);
  await page.waitForURL('**/typing');
  await page.getByRole('heading', { name: 'Клавиатурный тренажёр', exact: true }).waitFor();
  await noOverflow('typing');
  checks.push('Arcade speedtyper redirects to the single trainer; detailed typing behavior is covered by browser-typing-smoke.js');
  await page.goto(`${base}/arcade?game=snake`);
  await page.getByRole('button', { name: 'Один шаг влево', exact: true }).click();
  await page.getByText(/Команда вывела змейку за границу/).waitFor();
  await page.getByRole('button', { name: 'Начать заново', exact: true }).click();
  for (const direction of ['вправо', 'вниз', 'влево']) for (let index = 0; index < 3; index++) await page.getByRole('button', { name: `Один шаг ${direction}`, exact: true }).click();
  await page.getByText(/Все кристаллы собраны\. Маршрут завершён\./).waitFor();
  await noOverflow('snake');
  checks.push('Snake loses on boundary, resets, completes 9 explicit steps, never moves by a timer');
  await page.goto(`${base}/arcade?game=pyarcade`);
  const editor = page.getByRole('textbox', { name: 'Код Python', exact: true });
  const run = page.getByRole('button', { name: 'Запустить Python', exact: true });
  await editor.fill('for range(5)');
  await run.click();
  await page.getByText(/SyntaxError/).waitFor({ timeout: 60000 });
  await editor.fill('pass');
  await run.click();
  await page.getByText(/Осталось кристаллов: 1/).waitFor({ timeout: 60000 });
  await editor.fill('_robot = {"position": [2, 1], "gems": [], "path": [[0, 0], [2, 1]]}');
  await run.click();
  await page.getByText(/Осталось кристаллов: 1/).waitFor({ timeout: 60000 });
  await editor.fill('for step in range(2):\n    move_right()\nmove_down()');
  await run.click();
  await page.getByText(/Маршрут выполнен\. Перемещений: 3/).waitFor({ timeout: 60000 });
  await noOverflow('robot');
  await page.screenshot({ path: shots + 'robot-1440.png', fullPage: true });
  const primaryStyle = await run.evaluate(element => { const style = getComputedStyle(element); return { color: style.color, background: style.backgroundColor }; });
  if (primaryStyle.color !== 'rgb(8, 19, 14)') throw new Error('Green action needs dark text: ' + JSON.stringify(primaryStyle));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: shots + 'robot-390.png', fullPage: true });
  await editor.fill('while True:\n    pass');
  await run.click();
  await page.getByText('Python выполняет программу…', { exact: true }).waitFor({ timeout: 60000 });
  await page.getByRole('button', { name: 'Остановить', exact: true }).click();
  await page.getByText('Выполнение остановлено.', { exact: true }).waitFor();
  await run.click();
  await page.getByRole('button', { name: 'Все игры', exact: true }).click();
  await page.getByRole('heading', { name: 'Игры для практики Python', exact: true }).waitFor();
  await page.getByRole('button', { name: /^Бот-кодер Напиши маршрут/ }).click();
  if (await editor.inputValue() !== 'while True:\n    pass') throw new Error('Robot draft lost on game switch');
  await editor.fill('for step in range(2):\n    move_right()\nmove_down()');
  await page.reload();
  if (await editor.inputValue() !== 'for step in range(2):\n    move_right()\nmove_down()') throw new Error('Robot draft lost on reload');
  checks.push('Robot: real SyntaxError; pass and forged dict fail; alternate loop passes; stop terminates infinite loop; switch cancels; scoped draft restored');
  await page.goto(`${base}/tournaments/t_4`);
  await page.waitForURL('**/tournaments/t_2');
  await page.getByRole('heading', { name: 'Условия в функциях', exact: true }).waitFor();
  await noOverflow('training');
  await page.goto(`${base}/duels`);
  await page.getByText(/Соревновательные дуэли временно недоступны/).waitFor();
  await page.goto(`${base}/daily`);
  await page.getByRole('heading', { name: 'Практика на сегодня', exact: true }).waitFor();
  await page.goto(`${base}/boss-arena`);
  await page.getByRole('heading', { name: 'Испытания с функциями', exact: true }).waitFor();
  await noOverflow('bosses');
  checks.push('Legacy series redirects; daily and competition limitations are honest; boss tasks use shared editor');
  if (errors.length) throw new Error('Browser errors: ' + errors.join('\n'));
  return { checks, count: checks.length, primaryStyle, browserErrors: errors };
}
