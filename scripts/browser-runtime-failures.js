async (page) => {
  await page.route('**/runtime-failures.html', (route) => route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>Runtime failure checks</title>' }));
  await page.goto('http://127.0.0.1:3000/runtime-failures.html');
  const pyodidePattern = /cdn\.jsdelivr\.net\/pyodide\/v0\.26\.4\/full\/pyodide\.mjs/;
  await page.context().route(pyodidePattern, (route) => route.abort());
  const failed = await page.evaluate(async () => {
    const { runPython } = await import('/src/runtime/python.ts');
    return runPython({ code: 'print(42)' });
  });
  if (failed.status !== 'error' || failed.passed) throw new Error('CDN failure was not reported: ' + JSON.stringify(failed));
  await page.context().unroute(pyodidePattern);
  const recovered = await page.evaluate(async () => {
    const { runPython } = await import('/src/runtime/python.ts');
    return runPython({ code: 'print(42)' });
  });
  if (recovered.status !== 'completed' || recovered.output !== '42\n') throw new Error('CDN retry failed: ' + JSON.stringify(recovered));

  const monacoPattern = /cdn\.jsdelivr\.net\/npm\/monaco-editor/;
  await page.context().route(monacoPattern, (route) => route.abort());
  await page.goto('http://127.0.0.1:3000/sandbox');
  const textarea = page.getByRole('textbox', { name: 'Код Python', exact: true });
  await textarea.waitFor({ timeout: 15000 });
  await textarea.fill('print("Редактор без CDN")');
  await textarea.press('Tab');
  if (await textarea.evaluate((element) => element === document.activeElement)) throw new Error('Plain editor traps Tab');
  await page.getByRole('button', { name: 'Запустить', exact: true }).click();
  await page.getByRole('region', { name: 'Результат выполнения' }).getByText('Редактор без CDN', { exact: true }).waitFor();
  await page.context().unroute(monacoPattern);
  return { count: 4, checks: ['Pyodide CDN failure gives error rather than success', 'Retry starts a fresh working worker', 'Monaco CDN failure keeps code editable and runnable', 'Plain textarea Tab leaves the field'] };
}
