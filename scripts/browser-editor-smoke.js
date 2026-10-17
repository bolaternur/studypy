async (page) => {
  await page.goto('http://127.0.0.1:3000/sandbox');
  await page.getByRole('button', { name: 'Простой редактор', exact: true }).click();
  await page.getByRole('textbox', { name: 'Код Python', exact: true }).fill('print("Сохранённый черновик")');
  await page.reload();
  await page.getByRole('button', { name: 'Простой редактор', exact: true }).click();
  const draft = await page.getByRole('textbox', { name: 'Код Python', exact: true }).inputValue();
  if (draft !== 'print("Сохранённый черновик")') throw new Error('Draft was lost after reload: ' + draft);
  await page.getByRole('button', { name: 'Запустить', exact: true }).click();
  await page.getByRole('region', { name: 'Результат выполнения' }).getByText('Сохранённый черновик', { exact: true }).waitFor();
  await page.getByRole('textbox', { name: 'Код Python', exact: true }).fill('while True:\n    pass');
  await page.getByRole('button', { name: 'Запустить', exact: true }).click();
  await page.getByRole('button', { name: 'Остановить', exact: true }).click();
  await page.getByText('Выполнение остановлено.', { exact: true }).waitFor();
  await page.getByRole('textbox', { name: 'Код Python', exact: true }).fill('values=[]\nfor n in range(2):\n    values.append(n)\nprint(values)');
  await page.getByRole('button', { name: 'По шагам', exact: true }).click();
  await page.getByRole('dialog', { name: 'Код по шагам' }).waitFor();
  await page.keyboard.press('Escape');
  const focused = await page.getByRole('button', { name: 'По шагам', exact: true }).evaluate((button) => button === document.activeElement);
  if (!focused) throw new Error('Dialog did not return keyboard focus');
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const size = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
    if (size.scroll > size.width) throw new Error('Sandbox horizontal overflow at ' + width + ': ' + JSON.stringify(size));
  }
  return { checks: ['Draft restored after reload', 'Editor executes real Python', 'Stop control works', 'Trace dialog Escape and focus return', 'No overflow at 360,390,768,1440'], count: 5 };
}
