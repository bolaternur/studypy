import {useCallback,useEffect,useRef,useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {readJson,writeJson} from '../utils/storage';
import {emptyCourseProgress,sanitizeCourseProgress,type CourseProgress} from './progress';
export function useCourseProgress() {
  const {currentUser}=useAuth();const key='studypy_course_v1_'+(currentUser?.uid||'guest');
  const read=useCallback(()=>sanitizeCourseProgress(readJson<unknown>(key,(_:unknown):_ is unknown=>true,emptyCourseProgress())),[key]);
  const [progress,setProgress]=useState(read);const [saved,setSaved]=useState(true);
  const pending=useRef<{key:string;value:CourseProgress}|null>(null);
  useEffect(()=>{pending.current=null;setProgress(read());const refresh=()=>{if(!pending.current)setProgress(read());};window.addEventListener('studypy-course',refresh);window.addEventListener('storage',refresh);return()=>{window.removeEventListener('studypy-course',refresh);window.removeEventListener('storage',refresh);};},[read]);
  const update=useCallback((change:(p:CourseProgress)=>CourseProgress)=>{
    // Read at the action boundary so two mounted course surfaces cannot overwrite each other.
    const next=change(pending.current?.key===key?pending.current.value:read());const okay=writeJson(key,next);pending.current=okay?null:{key,value:next};setProgress(next);setSaved(okay);
    if(okay)window.dispatchEvent(new Event('studypy-course'));
    return okay;
  },[key,read]);
  return {progress,update,saved};
}
