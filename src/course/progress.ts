import type { ModuleIndex } from './metadata';
export interface CourseAttempt { id:string; taskId:string; at:number; passed:boolean; assisted:boolean; kind:'python'|'concept'; detail:string; code?:string }
export interface CourseProgress {
  version:1; read:Record<string,number>; solved:Record<string,{at:number;independent:boolean}>;
  solutions:Record<string,number>; bookmarks:string[]; attempts:CourseAttempt[];
  location?:{moduleId:string;lessonId:string;item?:string;isTask?:boolean;title?:string}; completedModules:Record<string,number>;
}
export const emptyCourseProgress = ():CourseProgress => ({version:1,read:{},solved:{},solutions:{},bookmarks:[],attempts:[],completedModules:{}});
export function sanitizeCourseProgress(value:unknown):CourseProgress {
  const fresh=emptyCourseProgress();
  if(!value||typeof value!=='object'||(value as CourseProgress).version!==1)return fresh;
  const v=value as CourseProgress;
  const validTime=(n:unknown):n is number=>typeof n==='number'&&Number.isFinite(n)&&n>=0&&n<=8640000000000000-7*86400000;
  const times=(source:unknown)=>Object.fromEntries(Object.entries(source&&typeof source==='object'?source:{}).filter(([key,n])=>key!=='__proto__'&&validTime(n))) as Record<string,number>;
  fresh.read=times(v.read);fresh.solutions=times(v.solutions);fresh.completedModules=times(v.completedModules);
  fresh.solved=Object.fromEntries(Object.entries(v.solved&&typeof v.solved==='object'?v.solved:{}).filter(([,r])=>r&&validTime(r.at)&&typeof r.independent==='boolean'));
  fresh.bookmarks=Array.isArray(v.bookmarks)?v.bookmarks.filter(x=>typeof x==='string'):[];
  fresh.attempts=Array.isArray(v.attempts)?v.attempts.filter(a=>a&&typeof a.id==='string'&&typeof a.taskId==='string'&&validTime(a.at)&&typeof a.passed==='boolean'&&typeof a.assisted==='boolean'&&typeof a.detail==='string'&&(a.code===undefined||typeof a.code==='string')&&['python','concept'].includes(a.kind)).slice(-300):[];
  if(v.location&&typeof v.location.moduleId==='string'&&typeof v.location.lessonId==='string')fresh.location=v.location;
  return fresh;
}
export function moduleStatus(module:ModuleIndex,progress:CourseProgress) {
  const tasks=module.lessons.flatMap(l=>l.tasks),required=tasks.filter(t=>t.required);
  const assessments=module.lessons.filter(l=>l.role==='assessment'||l.role==='final').flatMap(l=>l.tasks).filter(t=>t.required);
  const read=module.lessons.flatMap(l=>l.steps).filter(s=>progress.read[s.id]).length;
  const done=required.length>0&&required.every(t=>progress.solved[t.id]);
  return {solved:tasks.filter(t=>progress.solved[t.id]).length,total:tasks.length,read,stepCount:module.lessons.reduce((n,l)=>n+l.steps.length,0),done,hasAssessment:assessments.length>0,assessmentDone:assessments.length>0&&assessments.every(t=>progress.solved[t.id]),assessmentIndependent:assessments.length>0&&assessments.every(t=>progress.solved[t.id]?.independent),required:required.length};
}
export function addCourseAttempt(progress:CourseProgress,attempt:CourseAttempt,index:ModuleIndex[]):CourseProgress {
  if(progress.attempts.some(a=>a.id===attempt.id))return progress;
  const next={...progress,attempts:[...progress.attempts,{...attempt,code:attempt.code?.slice(0,4000),detail:attempt.detail.slice(0,1000)}].slice(-300),solved:{...progress.solved},completedModules:{...progress.completedModules}};
  if(attempt.passed)next.solved[attempt.taskId]={at:attempt.at,independent:Boolean(progress.solved[attempt.taskId]?.independent||!attempt.assisted)};
  for(const module of index)if(!next.completedModules[module.id]&&moduleStatus(module,next).done)next.completedModules[module.id]=attempt.at;
  return next;
}
export function reviewSchedule(module:ModuleIndex,progress:CourseProgress,now=Date.now()) {
  const anchor=progress.completedModules[module.id];if(!anchor)return [];
  const tasks=module.lessons.filter(l=>l.role==='review').flatMap(l=>l.tasks).filter(t=>t.required);
  return [1,3,7].map(day=>{const due=anchor+day*86400000;return {day,due,done:tasks.length>0&&tasks.every(t=>(progress.solved[t.id]?.at??0)>=due),available:now>=due};});
}
