import assert from 'node:assert/strict';
import type { Request, Response } from 'express';
import { personalProgress, rejectUnverifiedResult } from '../src/services/resultPolicy';

const profile = {completedLessons:['git-practice','old-unknown'],xp:500,coins:300};
const first = personalProgress(profile,'git');
assert.deepEqual(first.completedLessons,['git-practice','old-unknown','git']);
assert.deepEqual(personalProgress(first,'git'),first,'Retry must not duplicate progress or rewards');
assert.deepEqual(profile,{completedLessons:['git-practice','old-unknown'],xp:500,coins:300},'Original records stay intact');
assert.deepEqual(first.reward,{xp:0,coins:0});
assert.equal(first.trust,'self_reported');
assert.equal('xp' in first,false,'Personal progress cannot change economy');
let calls=0;
for(let i=0;i<2;i++) {
  const response={status(code:number){assert.equal(code,422);return this;},json(body:{code:string}){assert.equal(body.code,'TRUSTED_EXECUTION_UNAVAILABLE');calls++;return this;}};
  rejectUnverifiedResult({body:{passed:true,score:999999}} as Request,response as unknown as Response,()=>assert.fail('Unverified result must not reach the database'));
}
assert.equal(calls,2);
console.log('result policy: 8 assertions passed (idempotency, preserved data, no rewards, forged client scores rejected)');
