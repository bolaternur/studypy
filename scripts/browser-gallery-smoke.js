async (page) => {
  await page.goto('http://127.0.0.1:3000/gallery');
  const open = page.getByRole('button', { name: 'Опубликовать код', exact: true });
  await open.click();
  const form = page.getByRole('dialog', { name: 'Опубликовать код', exact: true });
  await form.waitFor();
  await form.getByRole('textbox', { name: 'Название', exact: true }).fill('Локальный черновик без публикации');
  await form.getByRole('button', { name: 'Простой редактор', exact: true }).click();
  await form.getByRole('textbox', { name: 'Код Python', exact: true }).fill('print("Черновик галереи")');
  const saved = await page.evaluate(() => localStorage.getItem('studypy:draft:v2:gallery:new'));
  if (saved !== 'print("Черновик галереи")') throw new Error('Publication code not persisted: ' + saved);
  if (!(await form.getByRole('button', { name: 'Опубликовать', exact: true }).isDisabled())) throw new Error('Guest publication should explain required login');
  await page.keyboard.press('Escape');
  if (!(await open.evaluate((button) => button === document.activeElement))) throw new Error('Publication dialog did not restore focus');
  await page.reload();
  await open.click();
  if ((await form.getByRole('textbox', { name: 'Название', exact: true }).inputValue()) !== 'Локальный черновик без публикации') throw new Error('Publication metadata lost after reload');
  const afterReload = await page.evaluate(() => localStorage.getItem('studypy:draft:v2:gallery:new'));
  if (afterReload !== saved) throw new Error('Publication code lost after reload');
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const bounds = await form.boundingBox();
    if (bounds.x < 0 || bounds.x + bounds.width > width + 1 || bounds.height > 901) throw new Error('Publication modal overflow at ' + width + ': ' + JSON.stringify(bounds));
  }
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: /Открыть код:/ }).first().click();
  const snippet = page.getByRole('dialog').first();
  await snippet.getByRole('button', { name: 'Совместный редактор', exact: true }).click();
  await snippet.getByText('Войди в аккаунт, чтобы создать совместную сессию. Код можно запускать здесь без входа.', { exact: true }).waitFor();
  await snippet.getByRole('button', { name: 'По шагам', exact: true }).click();
  await page.getByRole('dialog', { name: 'Код по шагам', exact: true }).waitFor();
  await page.keyboard.press('Escape');
  if (!(await snippet.isVisible())) throw new Error('Escape from nested trace closed the publication');
  await page.keyboard.press('Escape');
  return { count: 6, checks: ['Publication has named keyboard dialog', 'Guest cannot publish; no write attempted', 'Code and metadata draft survive reload', 'Publication modal fits 360/390/768/1440', 'Guest session has honest login explanation', 'Nested trace Escape keeps snippet dialog open'] };
}
