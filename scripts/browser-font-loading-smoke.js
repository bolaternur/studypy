async (page) => {
  // Playwright CLI: open a local StudyPy URL, then run-code --filename=scripts/browser-font-loading-smoke.js.
  // No app JavaScript, authentication or database writes run in this font-only fixture.
  const origin = new URL(page.url().startsWith('http') ? page.url() : 'http://127.0.0.1:3000').origin;
  const htmlResponse = await page.request.get(origin + '/');
  const html = await htmlResponse.text();
  const productionCSS = html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/);
  const cssURL = productionCSS ? new URL(productionCSS[1], origin).href : origin + '/src/index.css?direct';
  const cssResponse = await page.request.get(cssURL);
  if (!cssResponse.ok()) throw new Error('App CSS unavailable: ' + cssResponse.status());
  const css = await cssResponse.text();
  if (/fonts\.(googleapis|gstatic)\.com/.test(css)) throw new Error('External font dependency remains in app CSS');
  const faces = (css.match(/@font-face\s*\{[^}]+\}/g) || []).filter(face => /(?:Inter|JetBrains Mono)/.test(face));
  if (faces.length !== 6 || faces.some(face => !/font-display:\s*swap/.test(face))) throw new Error('Expected six local swap font faces');
  const fontURLs = [...new Set(faces.flatMap(face => [...face.matchAll(/url\(["']?([^\s)'";]+)["']?\)/g)].map(match => match[1])))];
  const files = [];
  for (const url of fontURLs) {
    const absolute = new URL(url, origin).href;
    if (new URL(absolute).origin !== origin) throw new Error('Font must be same-origin: ' + url);
    const response = await page.request.get(absolute);
    const bytes = await response.body();
    if (!response.ok() || bytes.subarray(0, 4).toString() !== 'wOF2') throw new Error('Invalid WOFF2 response: ' + url);
    files.push({ path: new URL(absolute).pathname, bytes: bytes.length });
  }
  let externalRequests = 0;
  const localFonts = [];
  await page.route(/https:\/\/fonts\.(?:googleapis|gstatic)\.com\//, route => { externalRequests++; return route.abort(); });
  page.on('response', response => { if (response.url().includes('/fonts/') && response.url().endsWith('.woff2')) localFonts.push({ url: response.url(), status: response.status() }); });
  const fixtureURL = origin + '/__font-loading-smoke.html';
  await page.route(fixtureURL, route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><meta charset="utf-8"><title>StudyPy font smoke</title><style>' + faces.join('\n') + '</style><p style="font-family:Inter">Python — Привет, Ёжик! Ѣ</p><pre style="font-family:JetBrains Mono">print("Привет, Ёжик!") # Ѣ</pre>' }));
  await page.goto(fixtureURL);
  const loaded = await page.evaluate(async () => {
    const sample = 'Python Привет Ёжик Ѣ';
    const probes = [];
    for (const family of ['Inter', 'JetBrains Mono']) for (const weight of [400, 700]) {
      const matched = await document.fonts.load(weight + ' 20px "' + family + '"', sample);
      if (matched.length !== 3 || matched.some(face => face.status !== 'loaded')) throw new Error(family + ' ' + weight + ': a subset did not load');
      probes.push({ family, weight, subsets: matched.length, available: document.fonts.check(weight + ' 20px "' + family + '"', sample) });
    }
    return probes;
  });
  if (externalRequests || loaded.some(probe => !probe.available) || localFonts.length !== 6 || localFonts.some(font => font.status !== 200)) throw new Error('Local font network or decode failure: ' + JSON.stringify({ externalRequests, loaded, localFonts }));

  // Controlled dependency experiment only: 2 s artificial Google CSS delay, NOT real network performance.
  // Both pages render the same bootstrap and current app CSS, with all application scripts removed.
  const criticalStyles = [...html.slice(0, html.indexOf('</head>')).matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(match => match[1]).join('\n');
  const bootstrap = html.match(/<div id="root">([\s\S]*?)<\/body>/i)?.[1]?.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, '') || '<p>StudyPy</p>';
  const controlled = [];
  await page.unroute(/https:\/\/fonts\.(?:googleapis|gstatic)\.com\//);
  for (const external of [true, false]) {
    const probe = await page.context().newPage();
    await probe.bringToFront();
    let cssRequests = 0;
    const externalCSS = 'https://fonts.googleapis.com/css2?family=StudyPyControlledProbe&display=swap';
    await probe.route('https://fonts.googleapis.com/**', async route => { cssRequests++; await new Promise(resolve => setTimeout(resolve, 2000)); await route.fulfill({ contentType: 'text/css', body: '/* controlled empty CSS response */' }); });
    const fixture = origin + '/__font-controlled-' + external + '.html';
    await probe.route(origin + '/__font-controlled.css', route => route.fulfill({ contentType: 'text/css', body: (external ? '@import url("' + externalCSS + '");\n' : '') + css }));
    await probe.route(fixture, route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><meta charset="utf-8"><title>Controlled font CSS dependency</title><style>' + criticalStyles + '</style><link rel="stylesheet" href="/__font-controlled.css"><body><div id="root">' + bootstrap }));
    await probe.goto(fixture);
    await probe.waitForFunction(() => performance.getEntriesByName('first-contentful-paint').length > 0, null, { timeout: 10000 });
    const fcp = await probe.evaluate(() => performance.getEntriesByName('first-contentful-paint')[0].startTime);
    controlled.push({ artificialExternalCSS: external, artificialDelayMs: external ? 2000 : 0, externalCSSRequests: cssRequests, firstContentfulPaintMs: fcp });
    await probe.close();
  }
  if (controlled[0].externalCSSRequests !== 1 || controlled[1].externalCSSRequests !== 0) throw new Error('Controlled CSS dependency experiment invalid');
  return { passed: true, sameOriginFiles: files, totalWOFF2Bytes: files.reduce((sum, file) => sum + file.bytes, 0), fontDecodeChecks: loaded, externalFontRequests: externalRequests, controlledExperimentOnly: controlled, warning: 'Controlled artificial-delay FCP is not a measured real-world speed improvement.' };
}
