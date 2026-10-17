import assert from 'node:assert/strict';
import { acquireBodyScrollLock } from '../src/utils/scrollLock';

const makeBody = (overflow = '') => ({ style: { overflow } }) as HTMLElement;
let checks = 0;
function check(name: string, run: () => void) { run(); checks++; console.log(`PASS ${name}`); }

check('a single dialog restores the original style', () => {
  const body = makeBody();
  const release = acquireBodyScrollLock(body);
  assert.equal(body.style.overflow, 'hidden');
  release();
  assert.equal(body.style.overflow, '');
});
check('closing the first dialog before the second cannot leave scrolling locked', () => {
  const body = makeBody();
  const first = acquireBodyScrollLock(body), second = acquireBodyScrollLock(body);
  first();
  assert.equal(body.style.overflow, 'hidden');
  second();
  assert.equal(body.style.overflow, '');
});
check('closing dialogs in reverse order also restores scrolling', () => {
  const body = makeBody();
  const first = acquireBodyScrollLock(body), second = acquireBodyScrollLock(body);
  second();
  assert.equal(body.style.overflow, 'hidden');
  first();
  assert.equal(body.style.overflow, '');
});
check('a repeated cleanup cannot release another dialog lock', () => {
  const body = makeBody();
  const first = acquireBodyScrollLock(body), second = acquireBodyScrollLock(body);
  first(); first();
  assert.equal(body.style.overflow, 'hidden');
  second();
  assert.equal(body.style.overflow, '');
});
check('existing inline overflow is preserved', () => {
  for (const overflow of ['auto', 'clip', 'hidden']) {
    const body = makeBody(overflow);
    const release = acquireBodyScrollLock(body);
    release();
    assert.equal(body.style.overflow, overflow);
  }
});
check('independent documents do not share lock ownership', () => {
  const first = makeBody(), second = makeBody('auto');
  const releaseFirst = acquireBodyScrollLock(first), releaseSecond = acquireBodyScrollLock(second);
  releaseFirst();
  assert.equal(first.style.overflow, '');
  assert.equal(second.style.overflow, 'hidden');
  releaseSecond();
  assert.equal(second.style.overflow, 'auto');
});
check('effect cleanup and re-acquisition remain balanced', () => {
  const body = makeBody();
  acquireBodyScrollLock(body)();
  acquireBodyScrollLock(body)();
  assert.equal(body.style.overflow, '');
});
console.log(`${checks} scroll-lock regressions passed`);
