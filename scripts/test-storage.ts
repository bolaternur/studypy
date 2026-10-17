import assert from 'node:assert/strict';
import { readJson, writeJson, isStringArray, STORAGE_KEYS } from '../src/utils/storage';
const records = new Map<string,string>();
let unavailable = false;
Object.assign(globalThis,{window:{localStorage:{
  getItem:(key:string)=>records.get(key)??null,
  setItem:(key:string,value:string)=>{if(unavailable)throw new Error('QuotaExceeded');records.set(key,value);},
  removeItem:(key:string)=>records.delete(key),
}}});
records.set('pyquest_progress','["git-practice","intro"]');
unavailable=true;
assert.deepEqual(readJson(STORAGE_KEYS.lessonProgress,isStringArray,[]),['git-practice','intro']);
assert.equal(records.has('pyquest_progress'),true,'Failed migration must preserve legacy data');
assert.equal(writeJson(STORAGE_KEYS.lessonProgress,['intro']),false,'Failed saves must be observable');
unavailable=false;
assert.deepEqual(readJson(STORAGE_KEYS.lessonProgress,isStringArray,[]),['git-practice','intro']);
assert.equal(records.has('pyquest_progress'),false,'Legacy is removed only after successful migration');
assert.equal(records.get(STORAGE_KEYS.lessonProgress),'["git-practice","intro"]');
assert.equal(writeJson(STORAGE_KEYS.lessonProgress,['intro']),true);
console.log('storage: 7 assertions passed (quota failure, legacy preservation, successful migration)');
