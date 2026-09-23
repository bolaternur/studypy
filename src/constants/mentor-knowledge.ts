/**
 * Offline knowledge base for the mentor.
 *
 * The mentor used to answer only through Gemini, so without `GEMINI_API_KEY`
 * every question returned 503 and the panel was decorative. This module lets
 * the mentor answer common Python questions with no API key, no network call
 * and no cost — and it stays useful as a fast path even when Gemini is
 * configured.
 *
 * It is deliberately not an "AI": it is keyword retrieval over a curated set
 * of answers plus the lesson catalogue. Callers must label its output as
 * `source: 'offline'` so the interface never implies a model wrote it.
 */

export interface KnowledgeEntry {
  id: string;
  /** Terms that select this entry. Matched against the normalised question. */
  triggers: string[];
  title: string;
  answer: string;
  /** Lesson id to link to, when one covers this topic. */
  lessonId?: string;
}

export interface MentorAnswer {
  text: string;
  /** Lesson the reader should open next, when the match suggests one. */
  lessonId?: string;
  /** False when nothing matched and the text is a fallback. */
  matched: boolean;
}

/* ─────────────────────────────────────────────────────────────
   Concepts
   ───────────────────────────────────────────────────────────── */

const CONCEPTS: KnowledgeEntry[] = [
  {
    id: 'variable',
    triggers: ['переменная', 'переменные', 'переменную', 'variable', 'присвоить', 'присваивание'],
    title: 'Переменные',
    lessonId: 'variables',
    answer:
      'Переменная — это имя, привязанное к значению. В Python её не нужно объявлять заранее и не нужно указывать тип:\n\n' +
      '```python\nage = 17\nname = "Аня"\nis_ready = True\n```\n\n' +
      'Имя можно переприсвоить в любой момент, в том числе значению другого типа. Важно: `=` это присваивание, ' +
      'а `==` — сравнение. Путаница между ними — одна из самых частых ошибок у новичков.',
  },
  {
    id: 'types',
    triggers: ['тип данных', 'типы данных', 'type', 'int', 'float', 'str', 'bool', 'какой тип'],
    title: 'Типы данных',
    lessonId: 'variables',
    answer:
      'Основные встроенные типы: `int` (целое), `float` (дробное), `str` (строка), `bool` (`True`/`False`), ' +
      '`list`, `tuple`, `dict`, `set`, и `None` для «значения нет».\n\n' +
      '```python\ntype(42)        # <class \'int\'>\ntype(3.14)      # <class \'float\'>\ntype("42")      # <class \'str\'>\n```\n\n' +
      'Обратите внимание: `42` и `"42"` — разные вещи. `input()` всегда возвращает строку, поэтому число из неё ' +
      'нужно получать через `int(...)` или `float(...)`.',
  },
  {
    id: 'string',
    triggers: ['строка', 'строки', 'string', 'текст', 'f-строка', 'fstring', 'форматирование'],
    title: 'Строки',
    lessonId: 'strings',
    answer:
      'Строка — последовательность символов. Её нельзя изменить на месте: любая «модификация» создаёт новую строку.\n\n' +
      '```python\nname = "Аня"\nprint(f"Привет, {name}!")   # f-строка — самый удобный способ подстановки\nprint(name.upper())         # АНЯ\nprint(len(name))            # 3\n```\n\n' +
      'Полезные методы: `.strip()`, `.split()`, `.join()`, `.replace()`, `.lower()`, `.startswith()`.',
  },
  {
    id: 'list',
    triggers: ['список', 'списки', 'списка', 'list', 'массив', 'append', 'индекс'],
    title: 'Списки',
    lessonId: 'lists',
    answer:
      'Список — упорядоченная изменяемая коллекция. Индексация с нуля, отрицательные индексы считают с конца.\n\n' +
      '```python\nitems = [10, 20, 30]\nitems.append(40)      # [10, 20, 30, 40]\nprint(items[0])       # 10\nprint(items[-1])      # 40\nprint(items[1:3])     # [20, 30] — срез\n```\n\n' +
      'Частая ловушка: `b = a` не копирует список, а даёт второе имя тому же объекту. Копия — это `a.copy()` или `a[:]`.',
  },
  {
    id: 'dict',
    triggers: ['словарь', 'словари', 'словаре', 'dict', 'ключ', 'значение', 'get'],
    title: 'Словари',
    lessonId: 'dictionaries',
    answer:
      'Словарь хранит пары «ключ → значение» и ищет по ключу практически мгновенно.\n\n' +
      '```python\ngrades = {"Аня": 92, "Ержан": 78}\nprint(grades["Аня"])          # 92\ngrades["Лиза"] = 95           # добавление\nprint(grades.get("Кто-то", 0)) # 0 вместо KeyError\n\nfor name, score in grades.items():\n    print(name, score)\n```\n\n' +
      'Обращение по несуществующему ключу через `[]` бросает `KeyError` — используйте `.get()`, если ключа может не быть.',
  },
  {
    id: 'tuple',
    triggers: ['кортеж', 'кортежи', 'tuple', 'неизменяемый'],
    title: 'Кортежи',
    answer:
      'Кортеж — как список, но неизменяемый. Пишется в круглых скобках.\n\n' +
      '```python\npoint = (3, 4)\nx, y = point        # распаковка\n```\n\n' +
      'Используйте кортеж, когда набор значений логически цельный и меняться не должен: координаты, RGB-цвет, ' +
      'запись из базы. Кортеж можно положить в словарь ключом, список — нельзя.',
  },
  {
    id: 'set',
    triggers: ['множество', 'множества', 'set', 'уникальные', 'дубликаты'],
    title: 'Множества',
    answer:
      'Множество хранит только уникальные элементы и не гарантирует порядок.\n\n' +
      '```python\nnumbers = [1, 2, 2, 3, 3, 3]\nunique = set(numbers)      # {1, 2, 3}\nprint(len(unique))         # 3\n\na, b = {1, 2, 3}, {2, 3, 4}\nprint(a & b)               # {2, 3} — пересечение\nprint(a | b)               # {1, 2, 3, 4} — объединение\n```\n\n' +
      'Самое частое применение — быстро убрать дубликаты и быстро проверить вхождение (`x in s`).',
  },
  {
    id: 'condition',
    triggers: ['условие', 'условия', 'if', 'else', 'elif', 'ветвление', 'сравнение'],
    title: 'Условия',
    lessonId: 'conditions',
    answer:
      'Условия управляют тем, какая ветка кода выполнится.\n\n' +
      '```python\nscore = 85\n\nif score >= 90:\n    print("Отлично")\nelif score >= 70:\n    print("Хорошо")\nelse:\n    print("Нужно подтянуть")\n```\n\n' +
      'Тело ветки задаётся отступом — обычно четыре пробела. Условие может использовать `and`, `or`, `not`. ' +
      'Пустая строка, `0`, пустой список и `None` считаются ложными.',
  },
  {
    id: 'loop-for',
    triggers: ['цикл', 'циклы', 'for', 'перебрать', 'итерация', 'range', 'enumerate'],
    title: 'Цикл for',
    lessonId: 'loops',
    answer:
      '`for` проходит по элементам коллекции — не по индексам, как в C или Java.\n\n' +
      '```python\nfor item in [10, 20, 30]:\n    print(item)\n\nfor i in range(5):          # 0, 1, 2, 3, 4\n    print(i)\n\nfor index, item in enumerate(["a", "b"]):\n    print(index, item)      # 0 a / 1 b\n```\n\n' +
      '`break` прерывает цикл, `continue` пропускает текущий шаг. Если нужны и индекс, и значение — `enumerate`, ' +
      'если нужно идти по двум спискам сразу — `zip`.',
  },
  {
    id: 'loop-while',
    triggers: ['while', 'пока', 'бесконечный цикл', 'зациклился'],
    title: 'Цикл while',
    lessonId: 'loops',
    answer:
      '`while` повторяет тело, пока условие истинно.\n\n' +
      '```python\ncount = 3\nwhile count > 0:\n    print(count)\n    count -= 1      # без этой строки цикл никогда не кончится\n```\n\n' +
      'Главная опасность — забыть изменить переменную внутри цикла: получится бесконечный цикл, и вкладка ' +
      'браузера зависнет. Если условие известно заранее и коллекция конечна, `for` почти всегда лучше.',
  },
  {
    id: 'function',
    triggers: ['функция', 'функции', 'def', 'return', 'аргумент', 'параметр', 'вернуть'],
    title: 'Функции',
    lessonId: 'functions',
    answer:
      'Функция — именованный кусок кода, который можно вызывать многократно.\n\n' +
      '```python\ndef greet(name, greeting="Привет"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Аня"))              # Привет, Аня!\nprint(greet("Аня", "Здравствуй")) # Здравствуй, Аня!\n```\n\n' +
      'Разница между `return` и `print`: `print` показывает значение на экране, `return` отдаёт его обратно в ' +
      'код, чтобы с ним можно было работать дальше. Функция без `return` возвращает `None`.',
  },
  {
    id: 'scope',
    triggers: ['область видимости', 'scope', 'global', 'локальная переменная'],
    title: 'Область видимости',
    answer:
      'Переменная, созданная внутри функции, снаружи не существует.\n\n' +
      '```python\ndef f():\n    inside = 1\n\nf()\nprint(inside)   # NameError\n```\n\n' +
      'Читать внешнюю переменную из функции можно, а вот присваивать — нет: Python решит, что вы создаёте новую ' +
      'локальную. Обычно это признак того, что значение лучше передать аргументом и вернуть через `return`, ' +
      'а не использовать `global`.',
  },
  {
    id: 'comprehension',
    triggers: ['list comprehension', 'генератор списка', 'списковое включение', 'однострочник'],
    title: 'Списковые включения',
    answer:
      'Компактная запись для «создать список из другого списка».\n\n' +
      '```python\nsquares = [n * n for n in range(5)]          # [0, 1, 4, 9, 16]\nevens  = [n for n in range(10) if n % 2 == 0] # [0, 2, 4, 6, 8]\n```\n\n' +
      'Читается как «возьми n из range, отфильтруй, преобразуй». Если внутрь просится больше одного условия и ' +
      'вложенный цикл — берите обычный `for`: читаемость важнее краткости.',
  },
  {
    id: 'class',
    triggers: ['класс', 'классы', 'ооп', 'объект', 'class', 'self', '__init__', 'метод'],
    title: 'Классы и ООП',
    lessonId: 'oop',
    answer:
      'Класс — шаблон, по которому создаются объекты со своим состоянием и поведением.\n\n' +
      '```python\nclass Student:\n    def __init__(self, name):\n        self.name = name\n        self.grades = []\n\n    def add_grade(self, grade):\n        self.grades.append(grade)\n\n    def average(self):\n        return sum(self.grades) / len(self.grades)\n\ns = Student("Аня")\ns.add_grade(90)\n```\n\n' +
      '`__init__` вызывается при создании объекта. `self` — сам объект; его пишут первым параметром каждого ' +
      'метода, но при вызове не передают.',
  },
  {
    id: 'recursion',
    triggers: ['рекурсия', 'рекурсию', 'рекурсивная', 'recursion', 'факториал', 'фибоначчи', 'recursionerror'],
    title: 'Рекурсия',
    answer:
      'Рекурсия — это функция, которая вызывает саму себя. У неё обязательно должен быть базовый случай, ' +
      'иначе вызовы не кончатся.\n\n' +
      '```python\ndef factorial(n):\n    if n <= 1:        # базовый случай\n        return 1\n    return n * factorial(n - 1)   # шаг к базовому случаю\n```\n\n' +
      'Если получаете `RecursionError: maximum recursion depth exceeded` — значит базовый случай недостижим: ' +
      'проверьте, что аргумент на каждом шаге действительно приближается к нему.',
  },
  {
    id: 'exception',
    triggers: ['исключение', 'исключения', 'try', 'except', 'обработка ошибок', 'raise', 'finally'],
    title: 'Обработка исключений',
    lessonId: 'exceptions',
    answer:
      '`try`/`except` перехватывает ошибку вместо того, чтобы уронить программу.\n\n' +
      '```python\ntry:\n    value = int(input("Число: "))\nexcept ValueError:\n    print("Это не число")\n```\n\n' +
      'Ловите конкретный тип ошибки, а не голый `except:` — иначе вы проглотите и те сбои, о которых нужно знать. ' +
      '`finally` выполняется всегда, `raise` бросает исключение самостоятельно.',
  },
  {
    id: 'file',
    triggers: ['файл', 'файлы', 'open', 'чтение файла', 'запись в файл', 'with open'],
    title: 'Работа с файлами',
    lessonId: 'files',
    answer:
      'Файлы открывают через `with` — он закроет файл даже при ошибке.\n\n' +
      '```python\nwith open("data.txt", "r", encoding="utf-8") as f:\n    text = f.read()\n\nwith open("out.txt", "w", encoding="utf-8") as f:\n    f.write("Привет")\n```\n\n' +
      'Режимы: `r` — чтение, `w` — перезапись, `a` — дозапись. Для русского текста всегда указывайте ' +
      '`encoding="utf-8"`.\n\nВ песочнице StudyPy файловая система виртуальная — записанные файлы живут только до ' +
      'перезагрузки страницы.',
  },
  {
    id: 'import',
    triggers: ['импорт', 'import', 'модуль', 'модули', 'библиотека', 'from'],
    title: 'Модули и импорт',
    lessonId: 'modules',
    answer:
      'Импорт подключает код из другого модуля.\n\n' +
      '```python\nimport math\nprint(math.sqrt(16))        # 4.0\n\nfrom random import randint\nprint(randint(1, 6))\n```\n\n' +
      'В песочнице доступна стандартная библиотека Python (`math`, `random`, `json`, `datetime`, `re`, `itertools` ' +
      'и другие). Сторонние пакеты вроде `requests` или `pandas` там не установлены.',
  },
  {
    id: 'slice',
    triggers: ['срез', 'срезы', 'slice', 'развернуть', 'перевернуть'],
    title: 'Срезы',
    answer:
      'Срез берёт подпоследовательность: `[начало:конец:шаг]`, конец не включается.\n\n' +
      '```python\nitems = [0, 1, 2, 3, 4, 5]\nitems[1:4]    # [1, 2, 3]\nitems[:3]     # [0, 1, 2]\nitems[-2:]    # [4, 5]\nitems[::2]    # [0, 2, 4]\nitems[::-1]   # [5, 4, 3, 2, 1, 0] — разворот\n```\n\n' +
      'Срезы работают одинаково для списков, строк и кортежей.',
  },
  {
    id: 'sort',
    triggers: ['сортировка', 'сортировать', 'sort', 'sorted', 'упорядочить'],
    title: 'Сортировка',
    answer:
      '`sorted()` возвращает новый список, `.sort()` сортирует список на месте и возвращает `None`.\n\n' +
      '```python\nnumbers = [3, 1, 2]\nprint(sorted(numbers))              # [1, 2, 3]\nprint(sorted(numbers, reverse=True)) # [3, 2, 1]\n\nwords = ["груша", "яблоко", "ананас"]\nprint(sorted(words, key=len))       # по длине\n```\n\n' +
      'Частая ошибка: `numbers = numbers.sort()` запишет в переменную `None`. Либо `.sort()` без присваивания, ' +
      'либо `sorted()` с присваиванием.',
  },
  {
    id: 'input',
    triggers: ['input', 'ввод', 'ввести', 'прочитать с клавиатуры'],
    title: 'Ввод данных',
    answer:
      '`input()` читает строку и **всегда** возвращает `str`.\n\n' +
      '```python\nname = input("Как вас зовут? ")\nage = int(input("Сколько вам лет? "))   # без int() будет строка\n```\n\n' +
      'Если забыть `int()`, то `age + 1` упадёт с `TypeError`, а `age * 2` внезапно продублирует строку. ' +
      'В задачах StudyPy значения для `input()` подставляет проверяющая система.',
  },
];

/* ─────────────────────────────────────────────────────────────
   Errors
   ───────────────────────────────────────────────────────────── */

const ERRORS: KnowledgeEntry[] = [
  {
    id: 'err-indentation',
    triggers: ['indentationerror', 'отступ', 'отступы', 'expected an indented block', 'unexpected indent'],
    title: 'IndentationError',
    answer:
      'Python определяет блоки кода отступами, и этот отступ не сошёлся.\n\n' +
      'Проверьте: после `if`, `for`, `while`, `def`, `class` строка ниже должна быть сдвинута вправо; ' +
      'внутри одного блока отступ одинаковый; нигде не смешаны табы и пробелы. Стандарт — четыре пробела.',
  },
  {
    id: 'err-name',
    triggers: ['nameerror', 'is not defined', 'не определена', 'name error'],
    title: 'NameError',
    answer:
      'Python встретил имя, которое ещё не создано.\n\n' +
      'Обычные причины: опечатка в имени (`pritn` вместо `print`), использование переменной до присваивания, ' +
      'обращение к локальной переменной функции снаружи, или забытый `import`.',
  },
  {
    id: 'err-type',
    triggers: ['typeerror', 'unsupported operand', 'not callable', 'type error'],
    title: 'TypeError',
    answer:
      'Операция применена к неподходящему типу.\n\n' +
      'Классика — `"5" + 5`: строку и число сложить нельзя. Приведите тип явно: `int("5") + 5` или `"5" + str(5)`. ' +
      'Другой частый случай — `len(5)` или вызов не-функции как функции.',
  },
  {
    id: 'err-syntax',
    triggers: ['syntaxerror', 'invalid syntax', 'синтаксическая ошибка', 'syntax error'],
    title: 'SyntaxError',
    answer:
      'Python не смог разобрать строку.\n\n' +
      'Смотрите на строку **выше** указанной: чаще всего это незакрытая скобка или кавычка. Ещё частые причины — ' +
      'пропущенное двоеточие после `if`/`for`/`def` и `=` вместо `==` в условии.',
  },
  {
    id: 'err-index',
    triggers: ['indexerror', 'list index out of range', 'выход за пределы'],
    title: 'IndexError',
    answer:
      'Обращение к индексу, которого нет.\n\n' +
      'В списке из трёх элементов допустимы индексы 0, 1 и 2 — `items[3]` уже ошибка. Проверьте `len(items)` ' +
      'и помните, что `range(len(items))` даёт корректный диапазон, а `range(1, len(items) + 1)` — нет.',
  },
  {
    id: 'err-key',
    triggers: ['keyerror', 'key error', 'нет такого ключа'],
    title: 'KeyError',
    answer:
      'В словаре нет такого ключа.\n\n' +
      'Используйте `data.get("ключ")` — вернёт `None` вместо ошибки, или `data.get("ключ", значение_по_умолчанию)`. ' +
      'Проверить наличие можно через `if "ключ" in data:`. Учтите, что регистр и пробелы в ключе важны.',
  },
  {
    id: 'err-attribute',
    triggers: ['attributeerror', 'has no attribute', 'attribute error'],
    title: 'AttributeError',
    answer:
      'У объекта нет такого метода или поля.\n\n' +
      'Чаще всего тип оказался не тем, что вы думали: `.append()` есть у списка, но не у строки или кортежа. ' +
      'Проверьте через `type(x)`. Ещё вариант — `None.что_то`: какая-то функция вернула `None`, потому что в ней ' +
      'забыли `return`.',
  },
  {
    id: 'err-value',
    triggers: ['valueerror', 'invalid literal', 'value error'],
    title: 'ValueError',
    answer:
      'Тип подходит, а само значение — нет.\n\n' +
      'Самый частый случай — `int("привет")` или `int("")`: строку нельзя разобрать как число. Перед преобразованием ' +
      'проверьте ввод через `.strip()` и `.isdigit()`, либо оберните в `try`/`except ValueError`.',
  },
  {
    id: 'err-zero',
    triggers: ['zerodivisionerror', 'деление на ноль', 'division by zero'],
    title: 'ZeroDivisionError',
    answer:
      'Деление на ноль.\n\n' +
      'Обычно это среднее по пустому списку: `sum(items) / len(items)` при `len(items) == 0`. ' +
      'Добавьте проверку `if not items: return 0` перед вычислением.',
  },
];

/* ─────────────────────────────────────────────────────────────
   Meta — questions about the platform itself
   ───────────────────────────────────────────────────────────── */

const META: KnowledgeEntry[] = [
  {
    id: 'meta-start',
    triggers: ['с чего начать', 'с чего начинать', 'как начать', 'новичок', 'первый урок'],
    title: 'С чего начать',
    lessonId: 'intro',
    answer:
      'Начните с раздела «Программа обучения» и первого урока «Истоки Python». Дальше идите по порядку: ' +
      'переменные → условия → списки → циклы → функции. Каждый урок заканчивается задачами с автопроверкой — ' +
      'не пропускайте их, именно там всё закрепляется.\n\n' +
      'Если хочется просто поиграть с кодом — откройте «Песочницу», там полноценный Python без всяких условий.',
  },
  {
    id: 'meta-sandbox',
    triggers: ['песочница', 'sandbox', 'запустить код', 'pyodide', 'где писать код'],
    title: 'Песочница',
    answer:
      'Песочница — это настоящий Python, скомпилированный в WebAssembly (Pyodide), который работает прямо во ' +
      'вкладке. Доступна стандартная библиотека; сторонние пакеты вроде `requests` и `pandas` не установлены.\n\n' +
      'Код выполняется на вашем устройстве и никуда не отправляется.',
  },
  {
    id: 'meta-tests',
    triggers: ['не проходят тесты', 'тест не проходит', 'автопроверка', 'почему не засчитывается'],
    title: 'Тесты не проходят',
    answer:
      'Сравните ожидаемый и полученный вывод посимвольно — чаще всего дело в мелочи:\n\n' +
      '• лишний или недостающий пробел;\n' +
      '• точка вместо запятой в дробном числе;\n' +
      '• `print` вместо `return` (или наоборот);\n' +
      '• заглавные буквы не совпадают;\n' +
      '• функция названа не так, как требует условие.\n\n' +
      'Если вывод совпадает, но тест красный — проверьте, что функция именно **возвращает** значение, а не печатает его.',
  },
];

const ALL_ENTRIES: KnowledgeEntry[] = [...ERRORS, ...META, ...CONCEPTS];

/* ─────────────────────────────────────────────────────────────
   Retrieval

   Matching is token-based, not substring-based. A naive `includes()` check
   made the trigger "int" fire on the word "pr-int", which routed a question
   about `return` vs `print` to the "Типы данных" entry.

   Tokens also match by shared prefix, because Russian inflects: "рекурсию" in
   a question has to reach "рекурсия" in a lesson title.
   ───────────────────────────────────────────────────────────── */

/** Lowercase, drop punctuation, collapse whitespace. Handles ё → е. */
const normalize = (text: string): string =>
  text
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^a-zа-я0-9_\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const tokenize = (text: string): string[] =>
  normalize(text).split(' ').filter(Boolean);

const PREFIX_MIN = 4;

/**
 * True when two tokens refer to the same word.
 *
 * Short tokens (`int`, `for`, `def`) must match exactly — they are too easy to
 * collide with otherwise. Longer ones match when either is a prefix of the
 * other and at least `PREFIX_MIN` characters agree, which absorbs Russian case
 * endings without pulling in a stemmer.
 */
const tokensMatch = (a: string, b: string): boolean => {
  if (a === b) return true;
  if (a.length < PREFIX_MIN || b.length < PREFIX_MIN) return false;
  const shorter = a.length < b.length ? a : b;
  const longer = a.length < b.length ? b : a;
  return longer.startsWith(shorter);
};

const containsToken = (haystack: string[], needle: string): boolean =>
  haystack.some((token) => tokensMatch(token, needle));

/**
 * Scores an entry against the question's tokens.
 *
 * A multi-word trigger only counts when every one of its words is present, and
 * it scores higher than a single word because accidental matches are far less
 * likely. An error class name is decisive on its own.
 */
const scoreEntry = (entry: KnowledgeEntry, questionTokens: string[]): number => {
  let score = 0;

  for (const trigger of entry.triggers) {
    const triggerTokens = tokenize(trigger);
    if (triggerTokens.length === 0) continue;

    const allPresent = triggerTokens.every((token) => containsToken(questionTokens, token));
    if (!allPresent) continue;

    score += triggerTokens.length > 1 ? 4 : 2;
    if (triggerTokens.length === 1 && triggerTokens[0].endsWith('error')) score += 6;
  }

  return score;
};

export interface LessonIndexEntry {
  id: string;
  title: string;
  description: string;
}

/**
 * Answers a question from the curated entries, falling back to the lesson
 * catalogue and finally to an honest "I don't know".
 *
 * `lessonIndex` is passed in rather than imported so this module stays free of
 * the ~1 MB curriculum dataset — the caller decides whether to supply it.
 */
export const answerFromKnowledge = (
  rawQuestion: string,
  lessonIndex: LessonIndexEntry[] = [],
): MentorAnswer => {
  const questionTokens = tokenize(rawQuestion);

  if (questionTokens.length === 0) {
    return {
      matched: false,
      text: 'Задайте вопрос словами — например «что такое список» или «почему IndentationError».',
    };
  }

  const best = ALL_ENTRIES
    .map((entry) => ({ entry, score: scoreEntry(entry, questionTokens) }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)[0];

  if (best) {
    return {
      matched: true,
      text: `**${best.entry.title}**\n\n${best.entry.answer}`,
      lessonId: best.entry.lessonId,
    };
  }

  // Nothing curated matched — look for a lesson whose title or description
  // shares meaningful words with the question.
  const meaningful = questionTokens.filter((token) => token.length >= PREFIX_MIN);
  if (meaningful.length > 0 && lessonIndex.length > 0) {
    const lessonMatch = lessonIndex
      .map((lesson) => {
        const haystack = tokenize(`${lesson.title} ${lesson.description}`);
        const hits = meaningful.filter((token) => containsToken(haystack, token)).length;
        return { lesson, hits };
      })
      .filter((candidate) => candidate.hits > 0)
      .sort((a, b) => b.hits - a.hits)[0];

    if (lessonMatch) {
      return {
        matched: true,
        lessonId: lessonMatch.lesson.id,
        text:
          `Точного ответа у меня нет, но похоже, что вам нужен урок **«${lessonMatch.lesson.title}»**.\n\n` +
          `${lessonMatch.lesson.description}`,
      };
    }
  }

  return {
    matched: false,
    text:
      'Я пока не знаю ответа на этот вопрос.\n\n' +
      'Я хорошо отвечаю про переменные, типы, строки, списки, словари, кортежи, множества, условия, циклы, ' +
      'функции, рекурсию, классы, исключения, файлы, модули, срезы и сортировку — а также разбираю сообщения ' +
      'об ошибках (`NameError`, `TypeError`, `IndexError`, `KeyError`, `IndentationError` и другие).\n\n' +
      'Попробуйте переформулировать или скопируйте текст ошибки целиком.',
  };
};

/** Topics offered as starting points in the interface. */
export const SUGGESTED_QUESTIONS = [
  'Что такое список?',
  'Чем return отличается от print?',
  'Почему TypeError?',
  'Как работает цикл for?',
  'Что делать, если не проходят тесты?',
] as const;
