import type { ExerciseKind, CourseLesson, CourseModule } from './types';
export interface LessonIndex { id: string; title: string; goal: string; role: CourseLesson['role']; prerequisites: string[]; estimatedMinutes: number; steps: {id:string;title:string}[]; examples: number; tasks: {id:string;title:string;kind:ExerciseKind;required:boolean}[] }
export interface ModuleIndex { id: string; title: string; goal: string; track: CourseModule['track']; depth: CourseModule['depth']; prerequisites: string[]; lessons: LessonIndex[] }
