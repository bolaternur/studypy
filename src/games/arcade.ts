export interface QuizQuestion {
  id: string;
  prompt: string;
  code?: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizDefinition {
  title: string;
  skill: string;
  level: string;
  duration: string;
  goal: string;
  recommendation: string;
  source: string;
  questions: QuizQuestion[];
}

export interface QuizState {
  index: number;
  answers: Record<string, number>;
  finished: boolean;
}

export const newQuiz = (): QuizState => ({ index: 0, answers: {}, finished: false });

/** An answered question stays locked until the learner explicitly continues. */
export function answerQuiz(state: QuizState, questions: QuizQuestion[], option: number): QuizState {
  const question = questions[state.index];
  if (state.finished || !question || state.answers[question.id] !== undefined || !Number.isInteger(option) || option < 0 || option >= question.options.length) return state;
  return { ...state, answers: { ...state.answers, [question.id]: option } };
}

export function nextQuizQuestion(state: QuizState, questions: QuizQuestion[]): QuizState {
  const question = questions[state.index];
  if (state.finished || !question || state.answers[question.id] === undefined) return state;
  return state.index === questions.length - 1 ? { ...state, finished: true } : { ...state, index: state.index + 1 };
}

export function quizResult(state: QuizState, questions: QuizQuestion[]) {
  const mistakes = questions.filter(q => state.answers[q.id] !== undefined && state.answers[q.id] !== q.correct);
  const correct = questions.filter(q => state.answers[q.id] === q.correct).length;
  return { correct, total: questions.length, mistakes, title: correct === questions.length ? 'Все ответы верны' : 'Серия завершена' };
}

export const QUIZZES: Record<string, QuizDefinition> = {
  debugrush: {
    title: 'Найди ошибку', skill: 'Чтение ошибок', level: 'Начальный', duration: '4–6 минут',
    goal: 'Отличать ошибки синтаксиса, имён, типов и индексов.',
    recommendation: 'Открой песочницу, исправь примеры с ошибками и проверь результат запуском.',
    source: 'https://docs.python.org/3/tutorial/errors.html',
    questions: [
      { id: 'indent', prompt: 'Почему функция не запускается?', code: "def greet(name):\nprint('Hello ' + name)", options: ['Пропущены кавычки', 'Нет отступа у тела функции', 'Нет return', 'Нужна точка с запятой'], correct: 1, explanation: 'После def нужен блок с отступом. Здесь Python сообщает IndentationError. print внутри функции допустим и без return.' },
      { id: 'colon', prompt: 'Что нужно исправить в первую очередь?', code: 'for i in range(3)\n    print(i)', options: ['Добавить двоеточие после range(3)', 'Заменить range на list', 'Убрать отступ', 'Переименовать i'], correct: 0, explanation: 'Заголовок for заканчивается двоеточием. Без него программа не проходит разбор синтаксиса.' },
      { id: 'name', prompt: 'Какую ошибку выдаст программа?', code: "name = 'Ada'\nprint(nmae)", options: ['TypeError', 'SyntaxError', 'NameError', 'Ошибки нет'], correct: 2, explanation: 'Имя nmae не определено: в присваивании использовано name. Имена должны совпадать.' },
      { id: 'index', prompt: 'Почему нельзя получить этот элемент?', code: 'values = [10, 20, 30]\nprint(values[3])', options: ['Индекс должен быть строкой', 'Последний индекс равен 2', 'Список пуст', 'Нужны круглые скобки'], correct: 1, explanation: 'У трёх элементов индексы 0, 1 и 2. Обращение к values[3] вызывает IndexError.' },
      { id: 'type', prompt: 'Почему сложение не выполняется?', code: "age = '20'\nprint(age + 1)", options: ['Строку нельзя сложить с целым числом', 'Число 1 слишком мало', 'Нельзя печатать age', 'Нужен отступ'], correct: 0, explanation: 'Оператор + здесь получил str и int. Для арифметики сначала преобразуй age: int(age) + 1.' },
      { id: 'zero', prompt: 'Что произойдёт при запуске?', code: 'items = 0\nprint(10 / items)', options: ['Будет 0', 'Будет None', 'Будет SyntaxError', 'Будет ZeroDivisionError'], correct: 3, explanation: 'Синтаксис верен, но делить на ноль нельзя. Проверь делитель до операции.' },
      { id: 'comparison', prompt: 'Как исправить условие?', code: 'x = 10\nif x = 10:\n    print(x)', options: ['Написать x == 10', 'Написать x := 10 без скобок', 'Убрать двоеточие', 'Заменить print на return'], correct: 0, explanation: 'Обычное присваивание = не является выражением сравнения. Для проверки равенства используй ==.' },
      { id: 'return', prompt: 'Почему напечатано None после числа 5?', code: 'def add(a, b):\n    print(a + b)\n\nprint(add(2, 3))', options: ['print вызывается слишком быстро', 'Функция печатает, но не возвращает сумму', 'Нельзя вызывать функцию внутри print', 'Аргументы должны быть строками'], correct: 1, explanation: 'Внутренний print выводит 5. Затем функция без return возвращает None, и внешний print выводит его. Замени внутренний print на return.' },
    ],
  },
  predictor: {
    title: 'Что выведет код?', skill: 'Чтение кода', level: 'Начальный → средний', duration: '4–6 минут',
    goal: 'Предсказывать значения, порядок выполнения и изменения коллекций.',
    recommendation: 'Запусти сложные для тебя примеры в песочнице и измени один аргумент или значение.',
    source: 'https://docs.python.org/3/tutorial/introduction.html',
    questions: [
      { id: 'arithmetic', prompt: 'Выбери вывод программы.', code: 'print(2 + 3 * 4)', options: ['20', '14', '24', '9'], correct: 1, explanation: 'Умножение выполняется раньше сложения: 3 * 4 равно 12, затем 2 + 12 равно 14.' },
      { id: 'range', prompt: 'Выбери вывод программы.', code: 'for i in range(1, 4):\n    print(i)', options: ['0\n1\n2\n3', '1\n2\n3\n4', '1\n2\n3', '4'], correct: 2, explanation: 'Начальная граница включается, конечная — нет. range(1, 4) даёт 1, 2, 3.' },
      { id: 'slice', prompt: 'Выбери вывод программы.', code: "print('Python'[1:4])", options: ['Pyth', 'yth', 'ytho', 'Pyt'], correct: 1, explanation: 'Срез берёт символы с индексами 1, 2, 3. Символ с индексом 4 не входит.' },
      { id: 'swap', prompt: 'Выбери вывод программы.', code: 'a = 5\nb = 10\na, b = b, a\nprint(a, b)', options: ['5 10', '10 10', '10 5', '5 5'], correct: 2, explanation: 'Сначала вычисляются оба значения справа, затем присваиваются слева. Значения меняются местами.' },
      { id: 'alias', prompt: 'Выбери вывод программы.', code: 'x = [1, 2, 3]\ny = x\ny.append(4)\nprint(len(x))', options: ['3', '4', '5', 'Ошибка'], correct: 1, explanation: 'Имена x и y ссылаются на один список. append изменяет этот объект, поэтому длина x тоже становится 4.' },
      { id: 'dict', prompt: 'Выбери вывод программы.', code: "d = {'a': 1}\nprint(d.get('b', 3))", options: ['1', 'b', '3', 'None'], correct: 2, explanation: 'Ключа b нет. Метод get возвращает второй аргумент — значение по умолчанию 3.' },
      { id: 'default', prompt: 'Выбери вывод программы.', code: 'def double(n):\n    return n * 2\n\nprint(double(0))', options: ['None', '2', 'False', '0'], correct: 3, explanation: 'Ноль — обычный аргумент. Функция вычисляет 0 * 2 и возвращает 0.' },
      { id: 'copy', prompt: 'Выбери вывод программы.', code: 'a = [1, 2]\nb = a.copy()\nb.append(3)\nprint(a)', options: ['[1, 2]', '[1, 2, 3]', '3', 'None'], correct: 0, explanation: 'copy создаёт отдельный внешний список. Добавление элемента в b не меняет a.' },
    ],
  },
  logicgates: {
    title: 'Проверь условие', skill: 'Логика', level: 'Начальный', duration: '3–5 минут',
    goal: 'Вычислять выражения с and, or, not и сравнениями.',
    recommendation: 'Повтори условия if/else. Проверь, какие ветки выполняются при изменении значений.',
    source: 'https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not',
    questions: [
      { id: 'and', prompt: 'Каково значение выражения?', code: 'True and False', options: ['True', 'False'], correct: 1, explanation: 'and возвращает истину только когда оба булевых операнда истинны.' },
      { id: 'not', prompt: 'Каково значение выражения?', code: 'not False', options: ['True', 'False'], correct: 0, explanation: 'not меняет истинность на противоположную.' },
      { id: 'or', prompt: 'Каково значение выражения?', code: 'False or True', options: ['True', 'False'], correct: 0, explanation: 'У or достаточно одного истинного операнда.' },
      { id: 'brackets', prompt: 'Каково значение выражения?', code: 'not (True and True)', options: ['True', 'False'], correct: 1, explanation: 'Сначала True and True даёт True. Затем not превращает его в False.' },
      { id: 'compare', prompt: 'Каково значение выражения?', code: '10 > 5 and 5 < 2', options: ['True', 'False'], correct: 1, explanation: 'Первое сравнение истинно, второе ложно. Для and нужны оба.' },
      { id: 'case', prompt: 'Каково значение выражения?', code: "'Python' == 'python'", options: ['True', 'False'], correct: 1, explanation: 'При обычном сравнении строк регистр имеет значение: P отличается от p.' },
      { id: 'empty', prompt: 'Каково значение выражения?', code: 'bool([])', options: ['True', 'False'], correct: 1, explanation: 'Пустой список считается ложным. Непустой список считается истинным.' },
      { id: 'chain', prompt: 'Каково значение выражения?', code: '1 < 2 < 3', options: ['True', 'False'], correct: 0, explanation: 'Цепочка проверяет оба сравнения: 1 < 2 и 2 < 3. Оба истинны.' },
      { id: 'membership', prompt: 'Каково значение выражения?', code: "'py' in 'python' and 0 == 0", options: ['True', 'False'], correct: 0, explanation: 'Строка python содержит py; сравнение 0 == 0 тоже истинно.' },
      { id: 'precedence', prompt: 'Каково значение выражения?', code: 'True or False and False', options: ['True', 'False'], correct: 0, explanation: 'and имеет более высокий приоритет, чем or. Сначала False and False, затем True or False.' },
    ],
  },
  regexracer: {
    title: 'Регулярные выражения', skill: 'Поиск в строках', level: 'Средний', duration: '4–6 минут',
    goal: 'Выбирать шаблоны Python re и понимать их границы.',
    recommendation: 'В песочнице используй re.findall на своих примерах: с совпадением, без совпадения и с пустой строкой.',
    source: 'https://docs.python.org/3/library/re.html',
    questions: [
      { id: 'digits', prompt: "Как найти одну или несколько цифр подряд в 'user123'?", options: ['\\d+', '\\w+', '[a-z]', '\\s'], correct: 0, explanation: '\\d обозначает цифру, + — одно или больше повторений. re.findall вернёт [\'123\'].' },
      { id: 'case', prompt: 'Как найти python без учёта регистра в Python re?', options: ['python', 'PYTHON', '(?i)python', '^python'], correct: 2, explanation: 'Флаг (?i) в начале включает поиск без учёта регистра. Другой способ — re.IGNORECASE.' },
      { id: 'start', prompt: 'Какой символ обозначает начало строки без MULTILINE?', options: ['$', '^', '.', '*'], correct: 1, explanation: '^ — начало строки. $ обозначает конец строки или позицию перед завершающим переводом строки.' },
      { id: 'repeat', prompt: 'Как задать ровно три буквы a подряд?', options: ['a3', 'a{3}', 'a+', 'a*'], correct: 1, explanation: '{3} задаёт ровно три повторения. + и * не ограничивают количество тремя.' },
      { id: 'dot', prompt: 'Как найти буквальную точку?', options: ['.', '\\.', '[a-z]', '\\s'], correct: 1, explanation: 'Без экранирования . совпадает почти с любым символом. \\. ищет саму точку.' },
      { id: 'optional', prompt: 'Какой шаблон совпадёт и с color, и с colour?', options: ['colou+r', 'colou?r', 'colou{2}r', 'colour'], correct: 1, explanation: '? разрешает ноль или одно повторение u. Поэтому подходят оба написания.' },
      { id: 'fullmatch', prompt: 'Какой вызов проверяет соответствие всей строки?', options: ['re.search(pattern, text)', 're.findall(pattern, text)', 're.fullmatch(pattern, text)', 're.split(pattern, text)'], correct: 2, explanation: 'fullmatch требует совпадения всей строки; search ищет совпадение в любой части.' },
      { id: 'raw', prompt: 'Как записать шаблон границы слова без обработки \\b как backspace?', options: ['"\\bword\\b"', 'r"\\bword\\b"', '"word"', '"/word/"'], correct: 1, explanation: 'В raw-строке r"…" обратная косая черта сохраняется для механизма re. В обычной строке \\b — управляющий символ.' },
    ],
  },
  algoascent: {
    title: 'Сколько шагов?', skill: 'Алгоритмы', level: 'Средний', duration: '4–6 минут',
    goal: 'Оценивать рост количества итераций при увеличении n.',
    recommendation: 'Сравни число итераций для n = 10, 100, 1000. Здесь оценка по числу шагов, без учёта стоимости операций над большими целыми.',
    source: 'https://docs.python.org/3/tutorial/controlflow.html',
    questions: [
      { id: 'constant', prompt: 'Как растёт число операций в этой модели?', code: 'def f(n):\n    return n + 1', options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], correct: 0, explanation: 'Одна операция сложения и возврат. В модели с постоянной стоимостью арифметики число шагов не зависит от n.' },
      { id: 'linear', prompt: 'Как растёт число итераций?', code: 'for i in range(n):\n    pass', options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], correct: 1, explanation: 'При неотрицательном n тело выполняется n раз.' },
      { id: 'square', prompt: 'Как растёт число выполнений pass?', code: 'for i in range(n):\n    for j in range(n):\n        pass', options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], correct: 2, explanation: 'Для каждого из n внешних шагов выполняется n внутренних: всего n * n.' },
      { id: 'half', prompt: 'Как растёт число итераций при n > 1?', code: 'i = n\nwhile i > 1:\n    i //= 2', options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], correct: 3, explanation: 'Значение i каждый раз уменьшается примерно вдвое. Для n около 2ᵏ нужно примерно k шагов.' },
      { id: 'twoloops', prompt: 'Как растёт суммарное число итераций?', code: 'for i in range(n):\n    pass\nfor j in range(n):\n    pass', options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], correct: 1, explanation: 'Циклы идут последовательно: n + n = 2n. Постоянный множитель не меняет линейный порядок роста.' },
      { id: 'fixedinner', prompt: 'Как растёт число выполнений pass?', code: 'for i in range(n):\n    for j in range(3):\n        pass', options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], correct: 1, explanation: 'Внутренний цикл всегда делает 3 шага. Всего 3n выполнений — линейный рост.' },
    ],
  },
  triviachase: {
    title: 'Факты о Python', skill: 'Дополнительная разминка', level: 'Начальный', duration: '2–3 минуты',
    goal: 'Повторить основные термины и несколько фактов о языке.',
    recommendation: 'Знание фактов не заменяет практику. Продолжи первый незавершённый урок программы.',
    source: 'https://docs.python.org/3/faq/general.html',
    questions: [
      { id: 'creator', prompt: 'Кто создал Python?', options: ['Деннис Ритчи', 'Бьерн Страуструп', 'Гвидо ван Россум', 'Линус Торвальдс'], correct: 2, explanation: 'Python создал Гвидо ван Россум. Работа началась в конце 1989 года.' },
      { id: 'year', prompt: 'Когда была опубликована первая версия Python?', options: ['1989', '1991', '1995', '2000'], correct: 1, explanation: 'Первая публичная версия появилась в феврале 1991 года.' },
      { id: 'name', prompt: 'Откуда взялось название Python?', options: ['Из названия процессора', 'Из названия шоу Monty Python', 'Из названия университета', 'Из математической формулы'], correct: 1, explanation: 'Название связано с комедийным шоу Monty Python’s Flying Circus, которое любил создатель языка.' },
      { id: 'function', prompt: 'Какое ключевое слово начинает обычное определение функции?', options: ['func', 'function', 'def', 'return'], correct: 2, explanation: 'def начинает определение функции. return возвращает значение из её тела.' },
      { id: 'comment', prompt: 'С какого символа начинается комментарий?', options: ['//', '#', '<!--', '/*'], correct: 1, explanation: 'Комментарий Python начинается с # вне строкового литерала и продолжается до конца строки.' },
      { id: 'pep', prompt: 'Что описывает PEP 8?', options: ['Стиль Python-кода', 'Формат базы данных', 'Способ шифрования', 'Протокол сети'], correct: 0, explanation: 'PEP 8 — руководство по оформлению Python-кода. Оно помогает согласовать стиль в проекте.' },
    ],
  },
};

export interface RobotLevel {
  id: string;
  title: string;
  description: string;
  size: number;
  start: [number, number];
  goal: [number, number];
  gems: [number, number][];
  walls: [number, number][];
  initialCode: string;
}

export const ROBOT_LEVELS: RobotLevel[] = [
  { id: 'sequence', title: 'Последовательность команд', description: 'Собери кристалл и дойди до финиша. Координаты начинаются с (0, 0) в левом верхнем углу.', size: 5, start: [0, 0], goal: [2, 1], gems: [[2, 0]], walls: [[1, 1]], initialCode: '# Доступны move_right(), move_left(), move_up(), move_down()\n# Дойди до кристалла (2, 0), затем до финиша (2, 1).\n' },
  { id: 'loop', title: 'Повторение', description: 'Пройди кристаллы по верхнему краю и спустись к финишу. Попробуй выразить повторение циклом.', size: 6, start: [0, 0], goal: [5, 4], gems: [[2, 0], [5, 2]], walls: [[2, 1], [3, 1], [4, 1]], initialCode: '# Сначала вправо по верхнему краю, затем вниз.\n' },
  { id: 'route', title: 'Маршрут вокруг стены', description: 'Собери оба кристалла и дойди до финиша. Можно определить функцию для повторяющегося участка пути.', size: 6, start: [0, 0], goal: [5, 5], gems: [[0, 3], [4, 3]], walls: [[2, 0], [2, 1], [2, 2], [2, 3]], initialCode: '# Стену можно обойти через строку y = 4.\n' },
];

/** The complete movement model runs in Python; JS does not parse learner code. */
export function robotSetup(level: RobotLevel): string {
  return `def _make_robot():
    state = {"position": ${JSON.stringify(level.start)}, "gems": ${JSON.stringify(level.gems)}, "path": [${JSON.stringify(level.start)}]}
    walls = ${JSON.stringify(level.walls)}
    def move(dx, dy):
        if len(state["path"]) >= 41:
            raise RuntimeError("Не больше 40 перемещений за запуск")
        x, y = state["position"]
        point = [x + dx, y + dy]
        if not (0 <= point[0] < ${level.size} and 0 <= point[1] < ${level.size}):
            raise ValueError("Бот вышел за границу поля")
        if point in walls:
            raise ValueError("Бот упёрся в стену")
        state["position"] = point
        state["path"].append(point[:])
        if point in state["gems"]:
            state["gems"].remove(point)
    def snapshot():
        return {"position": state["position"][:], "gems": [p[:] for p in state["gems"]], "path": [p[:] for p in state["path"]]}
    return lambda: move(1, 0), lambda: move(-1, 0), lambda: move(0, 1), lambda: move(0, -1), snapshot
move_right, move_left, move_down, move_up, _robot_snapshot = _make_robot()
del _make_robot
`;
}

export const ROBOT_EXPRESSION = '_robot_snapshot()';

export interface RobotSnapshot { position: number[]; gems: number[][]; path: number[][] }
export function isRobotSnapshot(value: unknown): value is RobotSnapshot {
  const point = (p: unknown): p is number[] => Array.isArray(p) && p.length === 2 && p.every(Number.isInteger);
  if (!value || typeof value !== 'object') return false;
  const state = value as RobotSnapshot;
  return point(state.position) && Array.isArray(state.gems) && state.gems.every(point) && Array.isArray(state.path) && state.path.length > 0 && state.path.length <= 41 && state.path.every(point);
}
export function robotSolved(level: RobotLevel, state: RobotSnapshot): boolean {
  return validRobotPath(level, state) && state.gems.length === 0 && state.position[0] === level.goal[0] && state.position[1] === level.goal[1] && state.path.length > 1;
}

/** Validate the trace, rather than trusting a client-side 'won' flag or final coordinate. */
export function validRobotPath(level: RobotLevel, state: RobotSnapshot): boolean {
  const same = (a: number[], b: number[]) => a[0] === b[0] && a[1] === b[1];
  if (!isRobotSnapshot(state) || !same(state.path[0], level.start) || !same(state.path[state.path.length - 1], state.position)) return false;
  for (let index = 0; index < state.path.length; index++) {
    const point = state.path[index];
    if (point.some(coordinate => coordinate < 0 || coordinate >= level.size) || level.walls.some(wall => same(wall, point))) return false;
    if (index > 0) {
      const previous = state.path[index - 1];
      if (Math.abs(point[0] - previous[0]) + Math.abs(point[1] - previous[1]) !== 1) return false;
    }
  }
  const remaining = level.gems.filter(gem => !state.path.some(point => same(gem, point)));
  return remaining.length === state.gems.length && remaining.every(gem => state.gems.some(point => same(gem, point)));
}
