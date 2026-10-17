/**
 * Deterministic retrieval over curated material. Callers must label results source:'offline'.
 * No execution, personalization or analysis of the learner's full program happens here.
 */
import { MENTOR_ENTRIES } from './mentor-entries';
export { SUGGESTED_QUESTIONS } from './mentor-suggestions';
export { MENTOR_ENTRIES } from './mentor-entries';

export interface KnowledgeEntry {
  id: string;
  triggers: string[];
  title: string;
  answer: string;
  lessonId?: string;
  hint?: string;
  sources?: string[];
  example?: { code: string; output: string; stdin?: string[] };
  kind?: 'topic' | 'detail' | 'error' | 'platform';
  explanation?: string;
  check?: string;
  next?: string;
}
export interface MentorAnswer {
  text: string;
  lessonId?: string;
  matched: boolean;
  entryId?: string;
}
export interface LessonIndexEntry { id: string; title: string; description: string; }

const words = (text: string): string[] => text.normalize('NFKC').toLowerCase().replace(/ё/g, 'е')
  .replace(/[^a-zа-я0-9_\s]/g, ' ').trim().split(/\s+/).filter(Boolean);
const STOP = new Set(words('что такое как почему зачем где когда ли мне меня я ты вы это этот эта эти оно он она чем от в во на для с со по о об про и или а но не у из к до после можно нужно работает работают сделать использовать означает отличается будет происходит пожалуйста расскажи объясни помоги получить какой какая какие my the a an what why how does do is are to of in on for with about use works working значит python питон языке коде код программа программе'));
const ambiguousEnglish = new Set(['int','str','get','set','for','if','in','is','or','and','with','from','type','open','class','map','filter','list','dict','tuple','bool','next','iter','global']);
const RU_IRREGULAR: Readonly<Record<string,string>> = {
  копия:'копия',копии:'копия',копию:'копия',копией:'копия',копий:'копия',
  список:'список',списки:'список',списка:'список',списке:'список',списку:'список',списков:'список',списками:'список',списках:'список',
  цикл:'цикл',циклы:'цикл',цикла:'цикл',цикле:'цикл',циклов:'цикл',циклами:'цикл',
  числа:'число',число:'число',чисел:'число',числами:'число',числах:'число',
};
function stem(word: string): string {
  if (!/^[а-я]+$/.test(word)) return word; // English identifiers never match by prefix.
  if (RU_IRREGULAR[word]) return RU_IRREGULAR[word];
  const suffix = /(?:иями|ями|ами|ого|ему|ому|ими|ыми|иях|ией|ах|ях|ов|ев|ей|ия|ие|ий|ые|ая|яя|ое|ую|юю|ой|ый|ым|ом|ам|ям|ы|и|а|я|е|у|ю|о|ь)$/;
  const result = word.replace(suffix, '');
  return result.length >= 4 ? result : word;
}
const significant = (tokens: readonly string[]) => tokens.filter(token => !STOP.has(token));
const conceptQuestion = /(?:что\s+такое|как\s+|почему\s+|чем\s+|зачем\s+|объясни|расскажи|разниц|what\s+is|how\s+|why\s+|difference)/i;
const explicitPython = /(?:\bpython\b|питон|пайтон|pyodide|studypy)/i;
const otherLanguage = /(?:\b(?:javascript|typescript|java|css|html|react|excel)\b|(?:^|\s)c\+\+(?:\s|$))/i;
const unrelated = /(?:список\s+покуп|ключ\s+от\s+(?:двер|замк)|наш\s+класс|школьн|погод|рецепт|гороскоп|курс\s+валют|английского\s+языка|расписание\s+поезд|билет\s+на\s+|переведи\s+слово)/i;
const compiled = MENTOR_ENTRIES.map(entry => ({
  entry,
  triggers: entry.triggers.map(trigger => ({ raw: trigger, tokens: words(trigger), stems: words(trigger).map(stem) })),
}));
function scoreEntry(candidate: typeof compiled[number], raw: string, tokens: string[], stems: Set<string>): number {
  let score = 0;
  const meaningful = significant(tokens);
  const hasPython = explicitPython.test(raw);
  const hasProgrammingVocabulary = tokens.some(token => /^(?:переменн|аргумент|параметр|преобраз|функц|итера|индекс|массив|словар|список|строк|возвращ|исключен|вывод|услов|цикл|кодир)/.test(stem(token)));
  const namedApis = meaningful.filter(token => ambiguousEnglish.has(token)).length;
  const hasCode = /(?:\x60|[a-z_][a-z0-9_]*\s*\(|\b[a-z]*error\b|^\s*(?:def|class|for|if)\b[\s\S]*:)/i.test(raw);
  for (const trigger of candidate.triggers) {
    if (!trigger.tokens.length || !trigger.stems.every(token => stems.has(token))) continue;
    if (trigger.raw.includes('==') && !raw.includes('==')) continue;
    if (trigger.raw.startsWith('.') && !/\.\s*get\s*\(/i.test(raw)) continue;
    if (candidate.entry.id === 'dict-get' && /\brequests\s*\.\s*get/i.test(raw)) continue;
    if (trigger.tokens.length === 1 && ambiguousEnglish.has(trigger.tokens[0]) &&
        !(hasPython || hasCode || tokens.length === 1 || (conceptQuestion.test(raw) && (meaningful.length <= 1 || hasProgrammingVocabulary || namedApis >= 2)))) continue;
    if (trigger.tokens.length === 1 && /^[а-я]+$/.test(trigger.tokens[0]) &&
        !(hasPython || hasCode || tokens.length <= 2 || conceptQuestion.test(raw))) continue;
    const count = trigger.tokens.length;
    const errorName = count === 1 && /error$/.test(trigger.tokens[0]);
    let value = 40 + count * 24 + (errorName ? 36 : 0) +
      (candidate.entry.kind === 'detail' ? 6 : 0) +
      (candidate.entry.kind === 'error' && !errorName ? 20 : 0);
    if (tokens.length === count && trigger.stems.every(token => stems.has(token))) value += 20;
    if (candidate.entry.kind === 'error' && /\b(?:[a-z]*error|stopiteration)\b/i.test(raw)) value += 1000;
    score = Math.max(score, value); // Synonyms and repeated words cannot inflate a generic answer.
  }
  return score;
}
function retrieve(rawQuestion: string, lessonIndex: LessonIndexEntry[], hint: boolean): MentorAnswer {
  const raw = rawQuestion.slice(0, 12000).trim();
  const tokens = words(raw);
  if (!tokens.length) return { matched:false, text:'Напиши вопрос словами: например, «чем return отличается от print» или вставь сообщение ошибки.' };
  if (!explicitPython.test(raw) && (otherLanguage.test(raw) || unrelated.test(raw))) {
    return { matched:false, text:'В базе наставника есть справки по Python и StudyPy. Для этого вопроса подходящего ответа нет. Если речь о Python, добавь контекст или строку кода.' };
  }
  if (tokens.length === 1 && tokens[0] === 'get') {
    return { matched:false, text:'Уточни, какой get нужен: dict.get() читает ключ словаря, а HTTP GET относится к сетевому запросу. Добавь объект или библиотеку.' };
  }
  const stems = new Set(tokens.map(stem));
  const best = compiled.map(candidate => ({ candidate, score:scoreEntry(candidate, raw, tokens, stems) }))
    .filter(result => result.score > 0)
    .sort((a,b) => b.score-a.score || a.candidate.entry.id.localeCompare(b.candidate.entry.id))[0];
  if (best) {
    const entry = best.candidate.entry;
    const guidance = entry.hint ?? 'Сопоставь условие с фактическим результатом и проверь один граничный случай.';
    return {
      matched:true, entryId:entry.id, lessonId:entry.lessonId,
      text:hint ? '**Подсказка: '+entry.title+'**\n\n'+guidance+
        (entry.sources?.[0] ? '\n\n[Документация]('+entry.sources[0]+')' : '') :
        '**'+entry.title+'**\n\n'+entry.answer,
    };
  }
  // A catalogue hit is only a pointer, never a fabricated reference answer.
  if (explicitPython.test(raw) || conceptQuestion.test(raw)) {
    const meaningful = significant(tokens).map(stem);
    const lesson = lessonIndex.map(item => {
      const title = significant(words(item.title)).map(stem);
      const hits = title.filter(token => meaningful.includes(token)).length;
      return { item, hits, title };
    }).filter(item => item.title.length >= 2 && item.hits === item.title.length)
      .sort((a,b) => b.hits-a.hits)[0];
    if (lesson) return {
      matched:false, lessonId:lesson.item.id,
      text:'Точного справочного ответа не найдено. Посмотри урок **«'+lesson.item.title+'»**: '+lesson.item.description,
    };
  }
  return { matched:false, text:
    'В этой справочной базе пока нет точного ответа. Она охватывает темы курса Python и типичные ошибки, но не анализирует программу как ИИ.\n\nУточни операцию, библиотеку, ожидаемый результат или вставь текст ошибки целиком. Не добавляй пароли и другие секреты.' };
}
export const answerFromKnowledge = (rawQuestion:string, lessonIndex:LessonIndexEntry[]=[]):MentorAnswer =>
  retrieve(rawQuestion, lessonIndex, false);
/** Conceptual guidance only: no full reference snippet or ready task solution. */
export const hintFromKnowledge = (rawQuestion:string, lessonIndex:LessonIndexEntry[]=[]):MentorAnswer =>
  retrieve(rawQuestion, lessonIndex, true);
