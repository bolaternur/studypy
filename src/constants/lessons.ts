import { resolveLessonId, type LessonMeta } from './lesson-catalog';

/** Browser-delivered tests are visible to the learner; they are not a trusted competition boundary. */
export interface TestCase {
  stdin?: string[];
  setup?: string;
  expression?: string;
  expectedOutput?: string;
  expectedCallOutput?: string;
  expectedValue?: unknown;
  description?: string;
}
export interface Challenge {
  id?: string;
  question: string;
  description: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  example?: string;
  initialCode: string;
  testCases: TestCase[];
  answer?: string | string[];
  code?: string;
  hint?: string;
}
export interface Lesson extends LessonMeta {
  content: string;
  sections?: { id: string; title: string; content: string[]; code?: string; expectedOutput?: string; stdin?: string[]; }[];
  challenge?: Challenge;
  challenges?: Challenge[];
  sources?: string[];
  notes?: string[];
  quiz?: { q: string; options: string[]; answer: number; };
}

const loaders: Record<string, () => Promise<{ default: Lesson }>> = {
  'intro': () => import('../content/lessons/intro'),
  'variables': () => import('../content/lessons/variables'),
  'type-conversion': () => import('../content/lessons/type-conversion'),
  'math': () => import('../content/lessons/math'),
  'input': () => import('../content/lessons/input'),
  'booleans': () => import('../content/lessons/booleans'),
  'if-else': () => import('../content/lessons/if-else'),
  'loops': () => import('../content/lessons/loops'),
  'lists': () => import('../content/lessons/lists'),
  'tuples': () => import('../content/lessons/tuples'),
  'dictionaries': () => import('../content/lessons/dictionaries'),
  'sets': () => import('../content/lessons/sets'),
  'strings': () => import('../content/lessons/strings'),
  'functions': () => import('../content/lessons/functions'),
  'pep8': () => import('../content/lessons/pep8'),
  'debugger': () => import('../content/lessons/debugger'),
  'ide-setup': () => import('../content/lessons/ide-setup'),
  'modules': () => import('../content/lessons/modules'),
  'packages': () => import('../content/lessons/packages'),
  'virtual-env': () => import('../content/lessons/virtual-env'),
  'files': () => import('../content/lessons/files'),
  'exceptions': () => import('../content/lessons/exceptions'),
  'list-comp': () => import('../content/lessons/list-comp'),
  'lambdas': () => import('../content/lessons/lambdas'),
  'filter': () => import('../content/lessons/filter'),
  'zip': () => import('../content/lessons/zip'),
  'args-kwargs': () => import('../content/lessons/args-kwargs'),
  'regex': () => import('../content/lessons/regex'),
  'datetime': () => import('../content/lessons/datetime'),
  'os-pathlib': () => import('../content/lessons/os-pathlib'),
  'git': () => import('../content/lessons/git'),
  'requests': () => import('../content/lessons/requests'),
  'classes': () => import('../content/lessons/classes'),
  'magic-methods': () => import('../content/lessons/magic-methods'),
  'inheritance': () => import('../content/lessons/inheritance'),
  'polymorphism': () => import('../content/lessons/polymorphism'),
  'encapsulation': () => import('../content/lessons/encapsulation'),
  'properties': () => import('../content/lessons/properties'),
  'closures': () => import('../content/lessons/closures'),
  'decorators': () => import('../content/lessons/decorators'),
  'iterators': () => import('../content/lessons/iterators'),
  'generators': () => import('../content/lessons/generators'),
  'context': () => import('../content/lessons/context'),
  'serialization': () => import('../content/lessons/serialization'),
  'pytest': () => import('../content/lessons/pytest'),
  'logging': () => import('../content/lessons/logging'),
  'sql': () => import('../content/lessons/sql'),
  'algorithms': () => import('../content/lessons/algorithms'),
  'type-hinting': () => import('../content/lessons/type-hinting'),
  'async': () => import('../content/lessons/async'),
  'threading': () => import('../content/lessons/threading'),
  'multiprocessing': () => import('../content/lessons/multiprocessing'),
  'sockets': () => import('../content/lessons/sockets'),
  'ctypes': () => import('../content/lessons/ctypes'),
  'memory': () => import('../content/lessons/memory'),
  'gc': () => import('../content/lessons/gc'),
  'ast': () => import('../content/lessons/ast'),
  'dis': () => import('../content/lessons/dis'),
  'profiling': () => import('../content/lessons/profiling'),
  'design-patterns': () => import('../content/lessons/design-patterns'),
  'metaclasses': () => import('../content/lessons/metaclasses'),
  'docker': () => import('../content/lessons/docker'),
  'cicd': () => import('../content/lessons/cicd'),
};
export async function loadLesson(id: string): Promise<Lesson | undefined> {
  return (await loaders[resolveLessonId(id)]?.())?.default;
}
