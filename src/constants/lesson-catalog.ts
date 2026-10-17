/** Ordered metadata only; lesson prose and tests are loaded on demand. */
export type LessonLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
export interface LessonMeta {
  id: string; title: string; description: string; icon: string; level: LessonLevel;
  color?: string; topic: string; estimatedMinutes: number; challengeCount: number;
}

export const LESSON_CATALOG: LessonMeta[] = [
  {
    "id": "intro",
    "title": "Первая программа",
    "description": "Выведи текст и прочитай результат запуска.",
    "icon": "Code",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Основы",
    "estimatedMinutes": 12,
    "challengeCount": 2
  },
  {
    "id": "variables",
    "title": "Переменные",
    "description": "Сохрани значение под именем и используй его в выражении.",
    "icon": "Code",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Основы",
    "estimatedMinutes": 12,
    "challengeCount": 2
  },
  {
    "id": "type-conversion",
    "title": "Типы и преобразование",
    "description": "Отличи число от строки и преобразуй строку в число.",
    "icon": "Code",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Основы",
    "estimatedMinutes": 12,
    "challengeCount": 2
  },
  {
    "id": "math",
    "title": "Арифметика",
    "description": "Вычисли частное, остаток и степень.",
    "icon": "Code",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Основы",
    "estimatedMinutes": 16,
    "challengeCount": 3
  },
  {
    "id": "input",
    "title": "Ввод данных",
    "description": "Прочитай введённые строки и используй их в программе.",
    "icon": "Code",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Основы",
    "estimatedMinutes": 12,
    "challengeCount": 2
  },
  {
    "id": "booleans",
    "title": "Сравнения и логика",
    "description": "Получи True или False из сравнения и логического выражения.",
    "icon": "Code",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Основы",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "if-else",
    "title": "Условия if/else",
    "description": "Выбери ветку программы по значению входных данных.",
    "icon": "Code",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Основы",
    "estimatedMinutes": 12,
    "challengeCount": 2
  },
  {
    "id": "loops",
    "title": "Циклы for и while",
    "description": "Повтори команды и накопи результат цикла.",
    "icon": "Code",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Основы",
    "estimatedMinutes": 12,
    "challengeCount": 2
  },
  {
    "id": "lists",
    "title": "Списки",
    "description": "Прочитай элемент списка и измени коллекцию.",
    "icon": "Database",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Коллекции",
    "estimatedMinutes": 12,
    "challengeCount": 2
  },
  {
    "id": "tuples",
    "title": "Кортежи",
    "description": "Упакуй значения в кортеж и распакуй их в имена.",
    "icon": "Database",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Коллекции",
    "estimatedMinutes": 12,
    "challengeCount": 2
  },
  {
    "id": "dictionaries",
    "title": "Словари",
    "description": "Получи значение по ключу и обработай отсутствующий ключ.",
    "icon": "Database",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Коллекции",
    "estimatedMinutes": 16,
    "challengeCount": 3
  },
  {
    "id": "sets",
    "title": "Множества",
    "description": "Удали повторы и найди общие элементы.",
    "icon": "Database",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Коллекции",
    "estimatedMinutes": 12,
    "challengeCount": 2
  },
  {
    "id": "strings",
    "title": "Строки",
    "description": "Выдели часть строки и получи преобразованный текст.",
    "icon": "Database",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Коллекции",
    "estimatedMinutes": 16,
    "challengeCount": 3
  },
  {
    "id": "functions",
    "title": "Функции и return",
    "description": "Определи функцию с параметрами и верни вычисленный результат.",
    "icon": "Workflow",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Функции",
    "estimatedMinutes": 12,
    "challengeCount": 2
  },
  {
    "id": "pep8",
    "title": "Читаемый код: PEP 8",
    "description": "Выбери понятные имена и оформи короткий фрагмент кода.",
    "icon": "BookOpen",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Инструменты",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "debugger",
    "title": "Поиск ошибок",
    "description": "Прочитай ошибку и исправь логику на границе условия.",
    "icon": "BookOpen",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Инструменты",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "ide-setup",
    "title": "Локальный редактор",
    "description": "Сохрани файл .py и запусти его тем же интерпретатором.",
    "icon": "BookOpen",
    "level": "Beginner",
    "color": "emerald",
    "topic": "Инструменты",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "modules",
    "title": "Модули",
    "description": "Импортируй модуль и используй его функцию.",
    "icon": "BookOpen",
    "level": "Intermediate",
    "color": "emerald",
    "topic": "Файлы и модули",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "packages",
    "title": "Пакеты и импорты",
    "description": "Отличи пакет от модуля и используй вложенный импорт.",
    "icon": "BookOpen",
    "level": "Intermediate",
    "color": "emerald",
    "topic": "Файлы и модули",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "virtual-env",
    "title": "Виртуальное окружение",
    "description": "Создай отдельное окружение и устанавливай зависимости в него.",
    "icon": "BookOpen",
    "level": "Intermediate",
    "color": "emerald",
    "topic": "Инструменты",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "files",
    "title": "Текстовые файлы",
    "description": "Запиши и прочитай UTF-8 файл с гарантированным закрытием.",
    "icon": "BookOpen",
    "level": "Intermediate",
    "color": "emerald",
    "topic": "Файлы и модули",
    "estimatedMinutes": 12,
    "challengeCount": 2
  },
  {
    "id": "exceptions",
    "title": "Исключения",
    "description": "Обработай ожидаемое исключение, сохранив остальные ошибки видимыми.",
    "icon": "BookOpen",
    "level": "Intermediate",
    "color": "emerald",
    "topic": "Ошибки и тесты",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "list-comp",
    "title": "Списковые включения",
    "description": "Построй новый список с преобразованием и фильтром.",
    "icon": "Database",
    "level": "Intermediate",
    "color": "emerald",
    "topic": "Коллекции",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "lambdas",
    "title": "Лямбда-функции",
    "description": "Задай короткое правило сортировки с key.",
    "icon": "Workflow",
    "level": "Intermediate",
    "color": "emerald",
    "topic": "Функции",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "filter",
    "title": "map и filter",
    "description": "Примени преобразование и отбор к последовательности.",
    "icon": "Workflow",
    "level": "Intermediate",
    "color": "emerald",
    "topic": "Функции",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "zip",
    "title": "zip и enumerate",
    "description": "Сопоставь две последовательности и пронумеруй элементы.",
    "icon": "Database",
    "level": "Intermediate",
    "color": "emerald",
    "topic": "Коллекции",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "args-kwargs",
    "title": "*args и **kwargs",
    "description": "Прими дополнительные позиционные и именованные аргументы.",
    "icon": "Workflow",
    "level": "Intermediate",
    "color": "emerald",
    "topic": "Функции",
    "estimatedMinutes": 12,
    "challengeCount": 2
  },
  {
    "id": "regex",
    "title": "Регулярные выражения",
    "description": "Найди фрагменты текста по простому шаблону.",
    "icon": "BookOpen",
    "level": "Intermediate",
    "color": "emerald",
    "topic": "Работа с данными",
    "estimatedMinutes": 12,
    "challengeCount": 2
  },
  {
    "id": "datetime",
    "title": "Даты и время",
    "description": "Создай дату и вычисли интервал в днях.",
    "icon": "BookOpen",
    "level": "Intermediate",
    "color": "emerald",
    "topic": "Работа с данными",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "os-pathlib",
    "title": "Пути и pathlib",
    "description": "Разбери путь и построй новый без ручного склеивания разделителей.",
    "icon": "BookOpen",
    "level": "Intermediate",
    "color": "emerald",
    "topic": "Файлы и модули",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "git",
    "title": "Git: история изменений",
    "description": "Различи рабочие файлы, подготовленные изменения и коммит.",
    "icon": "BookOpen",
    "level": "Intermediate",
    "color": "emerald",
    "topic": "Инструменты",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "requests",
    "title": "HTTP и Requests",
    "description": "Отдели сетевой запрос от обработки ответа.",
    "icon": "BookOpen",
    "level": "Intermediate",
    "color": "emerald",
    "topic": "Работа с данными",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "classes",
    "title": "Классы и объекты",
    "description": "Создай несколько независимых объектов с атрибутами.",
    "icon": "BookOpen",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Объекты",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "magic-methods",
    "title": "Специальные методы",
    "description": "Определи строковое представление собственного объекта.",
    "icon": "BookOpen",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Объекты",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "inheritance",
    "title": "Наследование",
    "description": "Расширь класс, сохранив полезное поведение родителя.",
    "icon": "BookOpen",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Объекты",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "polymorphism",
    "title": "Общее поведение объектов",
    "description": "Используй один протокол для разных типов объектов.",
    "icon": "BookOpen",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Объекты",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "encapsulation",
    "title": "Интерфейс и внутреннее состояние",
    "description": "Сделай изменение состояния проверяемым через методы.",
    "icon": "BookOpen",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Объекты",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "properties",
    "title": "Свойства @property",
    "description": "Открой вычисляемое значение как атрибут только для чтения.",
    "icon": "BookOpen",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Объекты",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "closures",
    "title": "Замыкания",
    "description": "Верни функцию, которая использует значение из внешнего вызова.",
    "icon": "Workflow",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Функции",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "decorators",
    "title": "Декораторы",
    "description": "Измени поведение вызова, не меняя тело исходной функции.",
    "icon": "Workflow",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Функции",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "iterators",
    "title": "Итераторы",
    "description": "Создай итератор и обработай его исчерпание.",
    "icon": "BookOpen",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Последовательности",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "generators",
    "title": "Генераторы",
    "description": "Выдавай результаты постепенно через yield.",
    "icon": "BookOpen",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Последовательности",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "context",
    "title": "Контекстные менеджеры",
    "description": "Оформи получение и освобождение ресурса через with.",
    "icon": "BookOpen",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Файлы и модули",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "serialization",
    "title": "JSON и сериализация",
    "description": "Преобразуй JSON-текст в данные и обратно.",
    "icon": "BookOpen",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Работа с данными",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "pytest",
    "title": "Проверки функций и pytest",
    "description": "Напиши проверку результата и запусти набор тестов локально.",
    "icon": "BookOpen",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Ошибки и тесты",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "logging",
    "title": "Диагностические сообщения",
    "description": "Выбери уровень сообщения и настрой отдельный logger.",
    "icon": "BookOpen",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Ошибки и тесты",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "sql",
    "title": "SQL и SQLite",
    "description": "Выполни параметризованный запрос к учебной базе в памяти.",
    "icon": "BookOpen",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Работа с данными",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "algorithms",
    "title": "Поиск и сложность",
    "description": "Найди первый подходящий элемент и объясни число проверок.",
    "icon": "BookOpen",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Алгоритмы",
    "estimatedMinutes": 12,
    "challengeCount": 2
  },
  {
    "id": "type-hinting",
    "title": "Аннотации типов",
    "description": "Опиши типы аргументов и возвращаемого значения.",
    "icon": "BookOpen",
    "level": "Advanced",
    "color": "emerald",
    "topic": "Инструменты",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "async",
    "title": "Асинхронные функции",
    "description": "Создай coroutine и дождись её результата.",
    "icon": "BookOpen",
    "level": "Professional",
    "color": "emerald",
    "topic": "Дополнительные темы",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "threading",
    "title": "Потоки: возможности и ограничения",
    "description": "Различи совместное состояние потоков и чистую обработку данных.",
    "icon": "BookOpen",
    "level": "Professional",
    "color": "emerald",
    "topic": "Дополнительные темы",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "multiprocessing",
    "title": "Отдельные процессы",
    "description": "Подготовь независимую функцию для обработки задач в процессе.",
    "icon": "BookOpen",
    "level": "Professional",
    "color": "emerald",
    "topic": "Дополнительные темы",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "sockets",
    "title": "Сетевые данные и сокеты",
    "description": "Сериализуй текстовое сообщение в байты с явным разделителем.",
    "icon": "BookOpen",
    "level": "Professional",
    "color": "emerald",
    "topic": "Дополнительные темы",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "ctypes",
    "title": "C-данные и ctypes",
    "description": "Различи ограниченный машинный формат и целое число Python.",
    "icon": "BookOpen",
    "level": "Professional",
    "color": "emerald",
    "topic": "Дополнительные темы",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "memory",
    "title": "Ссылки и копирование",
    "description": "Сделай независимую копию вложенной коллекции.",
    "icon": "BookOpen",
    "level": "Professional",
    "color": "emerald",
    "topic": "Дополнительные темы",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "gc",
    "title": "Сборка мусора и weakref",
    "description": "Проверь, как слабая ссылка ведёт себя после удаления сильной.",
    "icon": "BookOpen",
    "level": "Professional",
    "color": "emerald",
    "topic": "Дополнительные темы",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "ast",
    "title": "Абстрактное синтаксическое дерево",
    "description": "Разбери исходный код и найди узлы вызова функции.",
    "icon": "BookOpen",
    "level": "Professional",
    "color": "emerald",
    "topic": "Дополнительные темы",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "dis",
    "title": "Байткод CPython",
    "description": "Отличи константы функции от её выполнения и от машинного кода.",
    "icon": "BookOpen",
    "level": "Professional",
    "color": "emerald",
    "topic": "Дополнительные темы",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "profiling",
    "title": "Измерение и профилирование",
    "description": "Различи измерение времени и поиск дорогих вызовов.",
    "icon": "BookOpen",
    "level": "Professional",
    "color": "emerald",
    "topic": "Дополнительные темы",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "design-patterns",
    "title": "Композиция и стратегии",
    "description": "Передай меняемое правило как функцию вместо ветвления по типу.",
    "icon": "BookOpen",
    "level": "Professional",
    "color": "emerald",
    "topic": "Дополнительные темы",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "metaclasses",
    "title": "Как создаётся класс",
    "description": "Создай простой класс через type и объясни роль метакласса.",
    "icon": "BookOpen",
    "level": "Professional",
    "color": "emerald",
    "topic": "Дополнительные темы",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "docker",
    "title": "Docker: образ и контейнер",
    "description": "Различи сборку образа и запуск контейнера.",
    "icon": "BookOpen",
    "level": "Professional",
    "color": "emerald",
    "topic": "Дополнительные темы",
    "estimatedMinutes": 8,
    "challengeCount": 1
  },
  {
    "id": "cicd",
    "title": "Автоматические проверки: CI",
    "description": "Составь последовательность проверок и останови её при ошибке.",
    "icon": "BookOpen",
    "level": "Professional",
    "color": "emerald",
    "topic": "Дополнительные темы",
    "estimatedMinutes": 8,
    "challengeCount": 1
  }
];

/** Old IDs remain readable; existing remote records are never rewritten by this mapping. */
export const LESSON_ALIASES: Readonly<Record<string,string>> = {
  "git-practice": "git",
  "requests-practice": "requests",
  "os-pathlib-practice": "os-pathlib",
  "pytest-practice": "pytest",
  "logging-practice": "logging",
  "sql-practice": "sql",
  "algorithms-practice": "algorithms",
  "docker-practice": "docker",
  "cicd-practice": "cicd",
  "type-hinting-practice": "type-hinting"
};
const knownIds = new Set(LESSON_CATALOG.map(lesson => lesson.id));
export function resolveLessonId(id: string): string { return LESSON_ALIASES[id] ?? id; }
export function normalizeLessonProgress(ids: readonly string[]): string[] {
  return [...new Set(ids.map(resolveLessonId).filter(id => knownIds.has(id)))];
}
