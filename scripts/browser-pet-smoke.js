async (page) => {
  const html = `<!doctype html><html lang="ru"><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>Pet panel local QA</title></head><body><div id="pet-root"></div><script type="module">
    import RefreshRuntime from '/@react-refresh';
    RefreshRuntime.injectIntoGlobalHook(window); window.$RefreshReg$ = () => {}; window.$RefreshSig$ = () => (type) => type; window.__vite_plugin_react_preamble_installed__ = true;
    await import('/scripts/fixtures/pet-qa.tsx');
  </script></body></html>`;
  await page.route('**/pet-local-qa.html', (route) => route.fulfill({ contentType: 'text/html', body: html }));
  await page.goto('http://127.0.0.1:3000/pet-local-qa.html');
  await page.getByRole('button', { name: 'Открыть питомца', exact: true }).waitFor();
  const measurements = [];
  const defects = [];
  for (const [width, height] of [[360, 480]]) {
    await page.setViewportSize({ width, height });
    await page.getByRole('button', { name: 'Открыть питомца', exact: true }).click();
    const panel = page.getByRole('dialog', { name: 'Питомец', exact: true });
    await panel.waitFor();
    // Playwright waits for stable layout before clicking this non-interactive panel corner.
    await panel.click({ position: { x: 8, y: 8 } });
    const geometry = await panel.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, clientWidth: element.clientWidth, scrollWidth: element.scrollWidth, viewportWidth: innerWidth, viewportHeight: innerHeight };
    });
    const toggle = page.getByRole('button', { name: 'Закрыть питомца', exact: true });
    const expanded = await toggle.getAttribute('aria-expanded');
    if (geometry.x < 0 || geometry.y < 0 || geometry.x + geometry.width > width + 1 || geometry.y + geometry.height > height + 1 || geometry.scrollWidth > geometry.clientWidth) defects.push({ width, height, kind: 'geometry', geometry });
    if (expanded !== 'true') defects.push({ width, height, kind: 'aria-expanded', expanded });
    await page.keyboard.press('Escape');
    const button = page.getByRole('button', { name: 'Открыть питомца', exact: true });
    if (!(await button.evaluate((element) => element === document.activeElement))) defects.push({ width, height, kind: 'focus-return' });
    measurements.push({ requestedWidth: width, requestedHeight: height, ...geometry });
  }
  return { measurements, defects, mutationAttempted: false };
}
