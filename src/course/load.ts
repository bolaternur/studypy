/// <reference types="vite/client" />
import type { CourseModule } from './types';
const loaders = import.meta.glob<CourseModule>('./modules/*.ts', { import: 'default' });
export async function loadCourseModule(id: string): Promise<CourseModule | undefined> {
  return loaders[`./modules/${id}.ts`]?.();
}
export const lessonUrl = (moduleId:string,lessonId:string,taskId?:string) => `/learn/${moduleId}/${lessonId}${taskId?'?task='+encodeURIComponent(taskId):''}`;
