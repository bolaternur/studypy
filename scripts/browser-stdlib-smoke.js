async (page) => {
  await page.route('**/stdlib-local-qa.html', (route) => route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>Pyodide stdlib compatibility</title>' }));
  await page.goto('http://127.0.0.1:3000/stdlib-local-qa.html');
  const result = await page.evaluate(async () => {
    const { runPython } = await import('/src/runtime/python.ts');
    return runPython({ code: 'import sqlite3, weakref, gc, contextlib, urllib.parse, ast, dis, copy\nconnection = sqlite3.connect(":memory:")\nconnection.execute("CREATE TABLE items (value INTEGER)")\nconnection.execute("INSERT INTO items VALUES (42)")\nprint(connection.execute("SELECT value FROM items").fetchone()[0])\nconnection.close()' });
  });
  if (result.status !== 'completed' || result.output !== '42\n') throw new Error('Bundled stdlib check failed: ' + JSON.stringify(result));
  return { count: 1, checks: ['Real Pyodide sqlite3 SELECT and weakref/gc/contextlib/urllib/ast/dis/copy imports'], result };
}
