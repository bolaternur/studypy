import type { PythonTest } from '../runtime/protocol';

export interface WorkedExample { id: string; title: string; code: string; output: string; stdin?: string[]; language?: 'python' | 'shell' | 'text'; explanation: string; trace?: { headers: string[]; rows: string[][] } }
export interface StudyStep { id: string; title: string; goal: string; prerequisites: string[]; paragraphs: string[]; examples: WorkedExample[] }
export type ExerciseKind = 'code' | 'modify' | 'debug' | 'gap' | 'predict' | 'choice' | 'order' | 'explain';
export interface CourseExercise {
  id: string; kind: ExerciseKind; title: string; goal: string; prerequisites: string[];
  prompt: string; inputFormat: string; outputFormat: string; constraints: string;
  examples: { input?: string[]; output: string; explanation: string }[];
  initialCode?: string; tests?: PythonTest[]; reference?: string; alternative?: string;
  stdin?: string[];
  wrongSolutions?: { code: string; why: string }[];
  choices?: { id: string; text: string }[]; answer?: string | string[];
  blocks?: { id: string; text: string }[];
  hints: string[]; solutionExplanation: string[]; required?: boolean;
}
export interface CourseLesson {
  id: string; title: string; goal: string; prerequisites: string[];
  role: 'lesson' | 'review' | 'assessment' | 'project' | 'final';
  estimatedMinutes: number; steps: StudyStep[]; exercises: CourseExercise[];
}
export interface CourseModule {
  id: string; title: string; track: 'base' | 'advanced';
  depth: 'Практический модуль' | 'Вводная последовательность' | 'Углублённая последовательность';
  goal: string; prerequisites: string[]; lessons: CourseLesson[]; sources: string[];
}
export const isCodeExercise = (task: CourseExercise) => ['code', 'modify', 'debug', 'gap'].includes(task.kind);
