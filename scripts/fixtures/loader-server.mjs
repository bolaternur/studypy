/** Isolated bootstrap failure fixture. No repository files other than index.html are served. */
import http from 'node:http';
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../../index.html', import.meta.url));
const port = Number(process.env.LOADER_FIXTURE_PORT || 3002);
http.createServer((request, response) => {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); response.end(html);
  } else {
    response.writeHead(request.url === '/src/main.tsx' ? 503 : 404, { 'Content-Type': 'text/plain' });
    response.end('Application JavaScript intentionally unavailable in this isolated fixture.');
  }
}).listen(port, '127.0.0.1', () => console.log(`Loader failure fixture: http://127.0.0.1:${port}`));
