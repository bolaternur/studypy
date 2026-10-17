/** Typing drills rehearse real syntax; completion is not proof of Python mastery. */
export interface TypingLevel {
  id:string; title:string; topic:string; goal:string; code:string; expectedOutput:string;
  difficulty:'Начальный'|'Средний'|'Продвинутый'; hint:string;
}

export const TYPING_LEVELS:TypingLevel[] = [
  {
    "id": "typing-001",
    "title": "Первая строка",
    "topic": "Вывод",
    "goal": "Набери вызов print со строкой в кавычках.",
    "code": "print(\"Привет, Python!\")",
    "expectedOutput": "Привет, Python!",
    "difficulty": "Начальный",
    "hint": "Круглые скобки обозначают вызов, кавычки — текст."
  },
  {
    "id": "typing-002",
    "title": "Два аргумента",
    "topic": "Вывод",
    "goal": "Набери передачу текста и числа одному print.",
    "code": "print(\"Python\", 3)",
    "expectedOutput": "Python 3",
    "difficulty": "Начальный",
    "hint": "Запятая разделяет аргументы; print добавляет между ними пробел."
  },
  {
    "id": "typing-003",
    "title": "Свой разделитель",
    "topic": "Вывод",
    "goal": "Набери именованный аргумент sep.",
    "code": "print(\"2026\", \"10\", \"16\", sep=\"-\")",
    "expectedOutput": "2026-10-16",
    "difficulty": "Начальный",
    "hint": "sep задаёт разделитель аргументов, а не окончание строки."
  },
  {
    "id": "typing-004",
    "title": "Окончание строки",
    "topic": "Вывод",
    "goal": "Набери два вызова с изменённым end.",
    "code": "print(\"Готово\", end=\": \")\nprint(100)",
    "expectedOutput": "Готово: 100",
    "difficulty": "Начальный",
    "hint": "end управляет тем, что добавляется после последнего аргумента."
  },
  {
    "id": "typing-005",
    "title": "Перенос внутри текста",
    "topic": "Вывод",
    "goal": "Набери escape-последовательность переноса строки.",
    "code": "print(\"Первая\\nВторая\")",
    "expectedOutput": "Первая\nВторая",
    "difficulty": "Начальный",
    "hint": "В исходнике обратный слеш и n — два набираемых символа."
  },
  {
    "id": "typing-006",
    "title": "Табуляция в строке",
    "topic": "Вывод",
    "goal": "Набери escape-последовательность табуляции.",
    "code": "print(\"Имя\\tБалл\")",
    "expectedOutput": "Имя\tБалл",
    "difficulty": "Начальный",
    "hint": "Отступы кода остаются пробелами; табуляция здесь находится внутри строки."
  },
  {
    "id": "typing-007",
    "title": "Кавычки внутри строки",
    "topic": "Вывод",
    "goal": "Набери строку с другим видом кавычек внутри.",
    "code": "print('Она сказала: \"Да\"')",
    "expectedOutput": "Она сказала: \"Да\"",
    "difficulty": "Начальный",
    "hint": "Внешние одинарные кавычки позволяют записать двойные без экранирования."
  },
  {
    "id": "typing-008",
    "title": "Короткий заголовок",
    "topic": "Вывод",
    "goal": "Набери присваивание и вывод с разделителем строк.",
    "code": "title = \"Отчёт\"\nline = \"-\" * len(title)\nprint(title, line, sep=\"\\n\")",
    "expectedOutput": "Отчёт\n-----",
    "difficulty": "Начальный",
    "hint": "len считает длину строки, умножение повторяет строку."
  },
  {
    "id": "typing-009",
    "title": "Стоимость покупки",
    "topic": "Переменные и арифметика",
    "goal": "Набери переменные и умножение.",
    "code": "count = 4\nprice = 25\nprint(count * price)",
    "expectedOutput": "100",
    "difficulty": "Начальный",
    "hint": "Имя слева от = связывается с вычисленным значением."
  },
  {
    "id": "typing-010",
    "title": "Обновление счёта",
    "topic": "Переменные и арифметика",
    "goal": "Набери составное присваивание +=.",
    "code": "score = 10\nscore += 7\nprint(score)",
    "expectedOutput": "17",
    "difficulty": "Начальный",
    "hint": "+= использует прежнее значение переменной."
  },
  {
    "id": "typing-011",
    "title": "Площадь",
    "topic": "Переменные и арифметика",
    "goal": "Набери вычисление через промежуточную переменную.",
    "code": "width = 6\nheight = 4\narea = width * height\nprint(area)",
    "expectedOutput": "24",
    "difficulty": "Начальный",
    "hint": "Промежуточное имя делает назначение вычисления видимым."
  },
  {
    "id": "typing-012",
    "title": "Частное и остаток",
    "topic": "Переменные и арифметика",
    "goal": "Набери вызов divmod и распаковку двух результатов.",
    "code": "total = 100\nparts = 3\nwhole, remainder = divmod(total, parts)\nprint(whole, remainder)",
    "expectedOutput": "33 1",
    "difficulty": "Начальный",
    "hint": "divmod возвращает целое частное и остаток."
  },
  {
    "id": "typing-013",
    "title": "Степень",
    "topic": "Переменные и арифметика",
    "goal": "Набери оператор ** и отдельное имя результата.",
    "code": "base = 2\nexponent = 8\npower = base ** exponent\nprint(power)",
    "expectedOutput": "256",
    "difficulty": "Начальный",
    "hint": "Для степени нужны две звёздочки, а не ^."
  },
  {
    "id": "typing-014",
    "title": "Часы и минуты",
    "topic": "Переменные и арифметика",
    "goal": "Набери целочисленное деление и остаток.",
    "code": "minutes = 135\nhours = minutes // 60\nrest = minutes % 60\nprint(hours, rest)",
    "expectedOutput": "2 15",
    "difficulty": "Начальный",
    "hint": "// даёт целую часть с округлением вниз, % — остаток."
  },
  {
    "id": "typing-015",
    "title": "Скидка в целых единицах",
    "topic": "Переменные и арифметика",
    "goal": "Набери выражение со скобками и приоритетом операций.",
    "code": "subtotal = 250\ndiscount = 20\ntotal = subtotal * (100 - discount) // 100\nprint(total)",
    "expectedOutput": "200",
    "difficulty": "Начальный",
    "hint": "Скобки сначала вычисляют оставшийся процент стоимости."
  },
  {
    "id": "typing-016",
    "title": "Обмен значений",
    "topic": "Переменные и арифметика",
    "goal": "Набери множественное присваивание без временного имени.",
    "code": "first = 7\nsecond = 12\nfirst, second = second, first\nprint(first, second)",
    "expectedOutput": "12 7",
    "difficulty": "Начальный",
    "hint": "Правая часть вычисляется до присваивания левой."
  },
  {
    "id": "typing-017",
    "title": "Убрать края",
    "topic": "Строки",
    "goal": "Набери вызов strip и сохрани новую строку.",
    "code": "text = \"  Python  \"\nclean = text.strip()\nprint(clean)",
    "expectedOutput": "Python",
    "difficulty": "Начальный",
    "hint": "Метод strip возвращает новую строку."
  },
  {
    "id": "typing-018",
    "title": "Приветствие по имени",
    "topic": "Строки",
    "goal": "Набери подстановку переменной в f-строку.",
    "code": "name = \"Алия\"\ngreeting = f\"Привет, {name}!\"\nprint(greeting)\nprint(len(name))",
    "expectedOutput": "Привет, Алия!\n4",
    "difficulty": "Начальный",
    "hint": "Буква f стоит перед открывающей кавычкой."
  },
  {
    "id": "typing-019",
    "title": "Первый и последний символ",
    "topic": "Строки",
    "goal": "Набери положительный и отрицательный индексы.",
    "code": "text = \"Python\"\nfirst = text[0]\nlast = text[-1]\nprint(first, last)",
    "expectedOutput": "P n",
    "difficulty": "Начальный",
    "hint": "Индексация начинается с нуля; -1 выбирает последний элемент."
  },
  {
    "id": "typing-020",
    "title": "Шаг среза",
    "topic": "Строки",
    "goal": "Набери срез с пропущенными границами и шагом.",
    "code": "text = \"Python\"\nevery_other = text[::2]\nbackwards = text[::-1]\nprint(every_other, backwards)",
    "expectedOutput": "Pto nohtyP",
    "difficulty": "Начальный",
    "hint": "Третья часть среза задаёт шаг."
  },
  {
    "id": "typing-021",
    "title": "Разбить и соединить",
    "topic": "Строки",
    "goal": "Набери split и join для разных разделителей.",
    "code": "message = \"red,green,blue\"\nparts = message.split(\",\")\njoined = \" | \".join(parts)\nprint(joined)",
    "expectedOutput": "red | green | blue",
    "difficulty": "Начальный",
    "hint": "join вызывается у строки-разделителя."
  },
  {
    "id": "typing-022",
    "title": "Повтор и замена",
    "topic": "Строки",
    "goal": "Набери ограничение числа замен в replace.",
    "code": "word = \"py\"\nrepeated = word * 3\nresult = repeated.replace(\"py\", \"PY\", 1)\nprint(repeated)\nprint(result)",
    "expectedOutput": "pypypy\nPYpypy",
    "difficulty": "Начальный",
    "hint": "Третий аргумент replace ограничивает число замен."
  },
  {
    "id": "typing-023",
    "title": "Текст становится числом",
    "topic": "Строки",
    "goal": "Набери очистку строки и int.",
    "code": "line = \"  17  \"\nclean = line.strip()\nnumber = int(clean)\nprint(number + 3)\nprint(type(number).__name__)",
    "expectedOutput": "20\nint",
    "difficulty": "Начальный",
    "hint": "Преобразование меняет тип значения, а не только его отображение."
  },
  {
    "id": "typing-024",
    "title": "Два знака в цене",
    "topic": "Строки",
    "goal": "Набери спецификатор формата .2f.",
    "code": "product = \"Чай\"\nquantity = 2\nprice = 35.5\nprint(f\"{product}: {quantity} шт.\")\nprint(f\"{quantity * price:.2f}\")",
    "expectedOutput": "Чай: 2 шт.\n71.00",
    "difficulty": "Начальный",
    "hint": "Двоеточие внутри фигурных скобок вводит формат отображения."
  },
  {
    "id": "typing-025",
    "title": "Возрастная граница",
    "topic": "Условия",
    "goal": "Набери if/else с включённой границей.",
    "code": "age = 18\nif age >= 18:\n    print(\"Взрослый\")\nelse:\n    print(\"Несовершеннолетний\")",
    "expectedOutput": "Взрослый",
    "difficulty": "Начальный",
    "hint": "После условия нужно двоеточие, внутри блока — четыре пробела."
  },
  {
    "id": "typing-026",
    "title": "Ноль и знак",
    "topic": "Условия",
    "goal": "Набери условие, в котором ноль попадает в else.",
    "code": "number = 0\nif number > 0:\n    print(\"Положительное\")\nelse:\n    print(\"Не положительное\")",
    "expectedOutput": "Не положительное",
    "difficulty": "Начальный",
    "hint": "Строгое сравнение > не включает равенство."
  },
  {
    "id": "typing-027",
    "title": "Истинность нуля",
    "topic": "Условия",
    "goal": "Набери ветку для ложного числового значения.",
    "code": "balance = 0\nif balance:\n    print(\"Есть монеты\")\nelse:\n    print(\"Нет монет\")\nprint(\"Проверка завершена\")",
    "expectedOutput": "Нет монет\nПроверка завершена",
    "difficulty": "Начальный",
    "hint": "Последний print находится вне обеих веток."
  },
  {
    "id": "typing-028",
    "title": "Несколько оценок",
    "topic": "Условия",
    "goal": "Набери последовательность if/elif/else.",
    "code": "score = 85\nif score >= 90:\n    print(\"A\")\nelif score >= 80:\n    print(\"B\")\nelse:\n    print(\"C\")",
    "expectedOutput": "B",
    "difficulty": "Начальный",
    "hint": "Более высокая граница проверяется первой."
  },
  {
    "id": "typing-029",
    "title": "Три состояния температуры",
    "topic": "Условия",
    "goal": "Набери сохранение результата в разных ветках.",
    "code": "temperature = -5\nif temperature < 0:\n    advice = \"Теплее оденься\"\nelif temperature == 0:\n    advice = \"На границе замерзания\"\nelse:\n    advice = \"Выше нуля\"\nprint(advice)",
    "expectedOutput": "Теплее оденься",
    "difficulty": "Начальный",
    "hint": "== сравнивает, а = присваивает."
  },
  {
    "id": "typing-030",
    "title": "Оба условия обязательны",
    "topic": "Условия",
    "goal": "Набери логический оператор and.",
    "code": "age = 20\nhas_ticket = False\nif age >= 18 and has_ticket:\n    result = \"Вход разрешён\"\nelse:\n    result = \"Вход запрещён\"\nprint(result)",
    "expectedOutput": "Вход запрещён",
    "difficulty": "Начальный",
    "hint": "Для and оба операнда должны быть истинными."
  },
  {
    "id": "typing-031",
    "title": "None отличается от нуля",
    "topic": "Условия",
    "goal": "Набери проверку is None перед числовым сравнением.",
    "code": "value = 0\nif value is None:\n    print(\"Нет значения\")\nelif value == 0:\n    print(\"Ноль\")\nelse:\n    print(value)\nprint(\"Готово\")",
    "expectedOutput": "Ноль\nГотово",
    "difficulty": "Начальный",
    "hint": "Ноль — допустимое значение, которое не равно отсутствию результата."
  },
  {
    "id": "typing-032",
    "title": "Вложенные ветки",
    "topic": "Условия",
    "goal": "Набери два уровня отступа в if.",
    "code": "role = \"editor\"\nactive = True\nif active:\n    if role == \"editor\":\n        print(\"Можно редактировать\")\n    else:\n        print(\"Только чтение\")\nelse:\n    print(\"Профиль выключен\")",
    "expectedOutput": "Можно редактировать",
    "difficulty": "Начальный",
    "hint": "Вложенный блок получает ещё четыре пробела."
  },
  {
    "id": "typing-033",
    "title": "Накопление суммы",
    "topic": "Циклы",
    "goal": "Набери for с накопителем.",
    "code": "total = 0\nfor number in range(1, 5):\n    total += number\nprint(total)\nprint(\"Готово\")",
    "expectedOutput": "10\nГотово",
    "difficulty": "Средний",
    "hint": "Накопитель создаётся до цикла."
  },
  {
    "id": "typing-034",
    "title": "Обратный отсчёт",
    "topic": "Циклы",
    "goal": "Набери while с изменением условия.",
    "code": "count = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint(\"Старт\")",
    "expectedOutput": "3\n2\n1\nСтарт",
    "difficulty": "Средний",
    "hint": "Уменьшение счётчика позволяет циклу завершиться."
  },
  {
    "id": "typing-035",
    "title": "Пустой диапазон",
    "topic": "Циклы",
    "goal": "Набери цикл, тело которого не выполнится.",
    "code": "total = 0\nfor number in range(0):\n    total += number\nprint(total)\nprint(\"Пустой диапазон\")",
    "expectedOutput": "0\nПустой диапазон",
    "difficulty": "Средний",
    "hint": "При пустом range накопитель сохраняет начальное значение."
  },
  {
    "id": "typing-036",
    "title": "Нумерация имён",
    "topic": "Циклы",
    "goal": "Набери enumerate с началом от единицы.",
    "code": "names = [\"Алия\", \"Ли\"]\nfor index, name in enumerate(names, start=1):\n    label = f\"{index}. {name}\"\n    print(label)\nprint(f\"Всего: {len(names)}\")",
    "expectedOutput": "1. Алия\n2. Ли\nВсего: 2",
    "difficulty": "Средний",
    "hint": "enumerate выдаёт пары номер–элемент."
  },
  {
    "id": "typing-037",
    "title": "Пропуск нечётных",
    "topic": "Циклы",
    "goal": "Набери continue внутри условия.",
    "code": "values = [1, 2, 3, 4, 5]\ntotal = 0\nfor value in values:\n    if value % 2:\n        continue\n    total += value\nprint(total)",
    "expectedOutput": "6",
    "difficulty": "Средний",
    "hint": "continue пропускает оставшуюся часть текущей итерации."
  },
  {
    "id": "typing-038",
    "title": "Первое совпадение",
    "topic": "Циклы",
    "goal": "Набери break после сохранения найденного значения.",
    "code": "values = [3, 7, 9]\nfound = None\nfor value in values:\n    if value > 5:\n        found = value\n        break\nprint(found)",
    "expectedOutput": "7",
    "difficulty": "Средний",
    "hint": "break завершает ближайший цикл сразу после совпадения."
  },
  {
    "id": "typing-039",
    "title": "Таблица произведений",
    "topic": "Циклы",
    "goal": "Набери вложенный for и независимые строки таблицы.",
    "code": "rows = []\nfor left in range(1, 3):\n    row = []\n    for right in range(1, 4):\n        row.append(left * right)\n    rows.append(row)\nfor row in rows:\n    print(*row)",
    "expectedOutput": "1 2 3\n2 4 6",
    "difficulty": "Средний",
    "hint": "Новая строка создаётся при каждом внешнем проходе."
  },
  {
    "id": "typing-040",
    "title": "Поиск без совпадения",
    "topic": "Циклы",
    "goal": "Набери else у цикла.",
    "code": "target = 8\nvalues = [2, 4, 6]\nfor value in values:\n    if value == target:\n        print(\"Найдено\")\n        break\nelse:\n    print(\"Не найдено\")\nprint(\"Поиск завершён\")",
    "expectedOutput": "Не найдено\nПоиск завершён",
    "difficulty": "Средний",
    "hint": "else цикла выполняется, если цикл закончился без break."
  },
  {
    "id": "typing-041",
    "title": "Добавить и забрать",
    "topic": "Списки и кортежи",
    "goal": "Набери методы append и pop.",
    "code": "items = [\"чай\", \"хлеб\"]\nitems.append(\"сыр\")\nlast = items.pop()\nprint(last)\nprint(items)\nprint(len(items))",
    "expectedOutput": "сыр\n['чай', 'хлеб']\n2",
    "difficulty": "Средний",
    "hint": "pop возвращает удалённый элемент."
  },
  {
    "id": "typing-042",
    "title": "Вставка и удаление",
    "topic": "Списки и кортежи",
    "goal": "Набери insert и remove с разными аргументами.",
    "code": "values = [10, 30]\nvalues.insert(1, 20)\nvalues.remove(10)\nprint(values)\nprint(values[0])\nprint(len(values))",
    "expectedOutput": "[20, 30]\n20\n2",
    "difficulty": "Средний",
    "hint": "insert получает индекс и значение, remove ищет значение."
  },
  {
    "id": "typing-043",
    "title": "Части списка",
    "topic": "Списки и кортежи",
    "goal": "Набери два среза списка и объедини их.",
    "code": "values = [1, 2, 3, 4]\nleft = values[:2]\nright = values[2:]\ncombined = right + left\nprint(left)\nprint(right)\nprint(combined)",
    "expectedOutput": "[1, 2]\n[3, 4]\n[3, 4, 1, 2]",
    "difficulty": "Средний",
    "hint": "Правая граница среза не включается."
  },
  {
    "id": "typing-044",
    "title": "Координаты кортежа",
    "topic": "Списки и кортежи",
    "goal": "Набери распаковку и вычисление по координатам.",
    "code": "point = (3, 4)\nx, y = point\nlength_squared = x * x + y * y\nprint(x)\nprint(y)\nprint(length_squared)",
    "expectedOutput": "3\n4\n25",
    "difficulty": "Средний",
    "hint": "Два имени слева получают два значения кортежа."
  },
  {
    "id": "typing-045",
    "title": "Остаток при распаковке",
    "topic": "Списки и кортежи",
    "goal": "Набери звёздочку у среднего набора элементов.",
    "code": "values = [10, 20, 30, 40]\nfirst, *middle, last = values\nmiddle_total = sum(middle)\nprint(first)\nprint(middle)\nprint(last)\nprint(middle_total)",
    "expectedOutput": "10\n[20, 30]\n40\n50",
    "difficulty": "Средний",
    "hint": "Имя со звёздочкой получает список оставшихся элементов."
  },
  {
    "id": "typing-046",
    "title": "Отбор и преобразование",
    "topic": "Списки и кортежи",
    "goal": "Набери два списковых включения.",
    "code": "numbers = [-2, 0, 3, 4]\npositive = [n for n in numbers if n > 0]\nsquares = [n * n for n in positive]\nprint(numbers)\nprint(positive)\nprint(squares)\nprint(sum(squares))",
    "expectedOutput": "[-2, 0, 3, 4]\n[3, 4]\n[9, 16]\n25",
    "difficulty": "Средний",
    "hint": "Условие в конце включения фильтрует элементы."
  },
  {
    "id": "typing-047",
    "title": "Сортировка без изменения",
    "topic": "Списки и кортежи",
    "goal": "Набери sorted и чтение краёв нового списка.",
    "code": "numbers = [5, 1, 5, 2]\nordered = sorted(numbers)\nsmallest = ordered[0]\nlargest = ordered[-1]\nprint(numbers)\nprint(ordered)\nprint(smallest, largest)",
    "expectedOutput": "[5, 1, 5, 2]\n[1, 2, 5, 5]\n1 5",
    "difficulty": "Средний",
    "hint": "sorted возвращает новый список, сохраняя исходный."
  },
  {
    "id": "typing-048",
    "title": "Независимые строки",
    "topic": "Списки и кортежи",
    "goal": "Набери создание вложенных списков в цикле.",
    "code": "rows = []\nfor index in range(3):\n    row = [0, 0]\n    row[0] = index\n    rows.append(row)\nrows[0][1] = 9\nfor row in rows:\n    print(row)",
    "expectedOutput": "[0, 9]\n[1, 0]\n[2, 0]",
    "difficulty": "Средний",
    "hint": "Внутренний список создаётся заново на каждой итерации."
  },
  {
    "id": "typing-049",
    "title": "Профиль в словаре",
    "topic": "Словари и множества",
    "goal": "Набери чтение и изменение значений по ключу.",
    "code": "profile = {\"name\": \"Алия\", \"score\": 10}\nprofile[\"score\"] += 5\nprofile[\"active\"] = True\nprint(profile[\"name\"])\nprint(profile[\"score\"])\nprint(profile[\"active\"])",
    "expectedOutput": "Алия\n15\nTrue",
    "difficulty": "Средний",
    "hint": "Новый ключ добавляется тем же синтаксисом присваивания."
  },
  {
    "id": "typing-050",
    "title": "Ноль и отсутствующий ключ",
    "topic": "Словари и множества",
    "goal": "Набери get с запасным значением.",
    "code": "counts = {\"tea\": 0}\nexisting = counts.get(\"tea\", 9)\nmissing = counts.get(\"milk\", 9)\nprint(existing)\nprint(missing)\nprint(\"milk\" in counts)",
    "expectedOutput": "0\n9\nFalse",
    "difficulty": "Средний",
    "hint": "get не заменяет существующий ноль и не добавляет отсутствующий ключ."
  },
  {
    "id": "typing-051",
    "title": "Обход пар",
    "topic": "Словари и множества",
    "goal": "Набери items с распаковкой и суммой.",
    "code": "scores = {\"A\": 3, \"B\": 5}\ntotal = 0\nfor name, score in scores.items():\n    print(name, score)\n    total += score\nprint(total)\nprint(len(scores))",
    "expectedOutput": "A 3\nB 5\n8\n2",
    "difficulty": "Средний",
    "hint": "items выдаёт пары ключ–значение в порядке словаря."
  },
  {
    "id": "typing-052",
    "title": "Индекс имён",
    "topic": "Словари и множества",
    "goal": "Набери словарное включение с enumerate.",
    "code": "names = [\"Алия\", \"Ли\"]\npositions = {name: index for index, name in enumerate(names, start=1)}\nfor name in names:\n    print(name, positions[name])\nprint(list(positions))\nprint(len(positions))",
    "expectedOutput": "Алия 1\nЛи 2\n['Алия', 'Ли']\n2",
    "difficulty": "Средний",
    "hint": "Во включении словаря ключ и значение разделены двоеточием."
  },
  {
    "id": "typing-053",
    "title": "Операции множеств",
    "topic": "Словари и множества",
    "goal": "Набери пересечение, объединение и разность.",
    "code": "a = {1, 2, 3}\nb = {3, 4}\ncommon = a & b\ncombined = a | b\nonly_a = a - b\nprint(sorted(common))\nprint(sorted(combined))\nprint(sorted(only_a))",
    "expectedOutput": "[3]\n[1, 2, 3, 4]\n[1, 2]",
    "difficulty": "Средний",
    "hint": "sorted делает отображение множества воспроизводимым."
  },
  {
    "id": "typing-054",
    "title": "Без повторов, сохраняя порядок",
    "topic": "Словари и множества",
    "goal": "Набери совместное использование set и list.",
    "code": "values = [\"a\", \"b\", \"a\", \"c\", \"b\"]\nseen = set()\nunique = []\nfor value in values:\n    if value not in seen:\n        seen.add(value)\n        unique.append(value)\nprint(unique)",
    "expectedOutput": "['a', 'b', 'c']",
    "difficulty": "Средний",
    "hint": "Множество проверяет наличие, список хранит выбранный порядок."
  },
  {
    "id": "typing-055",
    "title": "Частоты слов",
    "topic": "Словари и множества",
    "goal": "Набери накопление счётчика через get.",
    "code": "words = [\"чай\", \"хлеб\", \"чай\"]\ncounts = {}\nfor word in words:\n    counts[word] = counts.get(word, 0) + 1\nfor word in sorted(counts):\n    print(word, counts[word])\nprint(sum(counts.values()))",
    "expectedOutput": "хлеб 1\nчай 2\n3",
    "difficulty": "Средний",
    "hint": "Первое появление слова начинает счёт с нуля."
  },
  {
    "id": "typing-056",
    "title": "Группировка по первой букве",
    "topic": "Словари и множества",
    "goal": "Набери setdefault и добавление во вложенный список.",
    "code": "words = [\"apple\", \"ant\", \"bee\"]\ngroups = {}\nfor word in words:\n    first = word[0]\n    groups.setdefault(first, []).append(word)\nfor letter in sorted(groups):\n    print(letter, \",\".join(groups[letter]))\nprint(len(groups))",
    "expectedOutput": "a apple,ant\nb bee\n2",
    "difficulty": "Средний",
    "hint": "setdefault возвращает значение ключа, создав его при отсутствии."
  },
  {
    "id": "typing-057",
    "title": "Вызовы функции",
    "topic": "Функции",
    "goal": "Набери def, return и два вызова.",
    "code": "def double(value):\n    return value * 2\n\nfirst = double(3)\nsecond = double(0)\nprint(first)\nprint(second)",
    "expectedOutput": "6\n0",
    "difficulty": "Средний",
    "hint": "Тело def выполняется при вызове, return передаёт результат."
  },
  {
    "id": "typing-058",
    "title": "Аргумент по умолчанию",
    "topic": "Функции",
    "goal": "Набери параметр со значением по умолчанию.",
    "code": "def greet(name, greeting=\"Привет\"):\n    return f\"{greeting}, {name}!\"\n\nmessage = greet(\"Алия\")\nother = greet(\"Ли\", \"Здравствуй\")\nprint(message)\nprint(other)",
    "expectedOutput": "Привет, Алия!\nЗдравствуй, Ли!",
    "difficulty": "Средний",
    "hint": "Первый вызов использует значение по умолчанию."
  },
  {
    "id": "typing-059",
    "title": "Пустая коллекция",
    "topic": "Функции",
    "goal": "Набери ранний return для пустого списка.",
    "code": "def average(values):\n    if not values:\n        return None\n    return sum(values) / len(values)\n\nfor case in ([2, 4], [], [0]):\n    result = average(case)\n    print(result)",
    "expectedOutput": "3.0\nNone\n0.0",
    "difficulty": "Средний",
    "hint": "Пустой список и список с нулём — разные случаи."
  },
  {
    "id": "typing-060",
    "title": "Любое число аргументов",
    "topic": "Функции",
    "goal": "Набери *args и накопление внутри функции.",
    "code": "def total(*numbers):\n    result = 0\n    for number in numbers:\n        result += number\n    return result\n\nprint(total(1, 2, 3))\nprint(total())\nprint(total(-2, 2))",
    "expectedOutput": "6\n0\n0",
    "difficulty": "Средний",
    "hint": "*numbers собирает позиционные аргументы в кортеж."
  },
  {
    "id": "typing-061",
    "title": "Только именованный параметр",
    "topic": "Функции",
    "goal": "Набери звёздочку-разделитель параметров.",
    "code": "def label(name, *, active=True):\n    status = \"включён\" if active else \"выключен\"\n    return f\"{name}: {status}\"\n\nfirst = label(\"Курс\")\nsecond = label(\"Звук\", active=False)\nprint(first)\nprint(second)",
    "expectedOutput": "Курс: включён\nЗвук: выключен",
    "difficulty": "Средний",
    "hint": "После одиночной * параметр передаётся только по имени."
  },
  {
    "id": "typing-062",
    "title": "Новый список из функции",
    "topic": "Функции",
    "goal": "Набери функцию, сохраняющую исходную коллекцию.",
    "code": "def add_item(items, value):\n    result = items.copy()\n    result.append(value)\n    return result\n\noriginal = [1, 2]\nupdated = add_item(original, 3)\nprint(original)\nprint(updated)\nprint(original is updated)",
    "expectedOutput": "[1, 2]\n[1, 2, 3]\nFalse",
    "difficulty": "Средний",
    "hint": "Копирование внешнего списка отделяет его от исходного объекта."
  },
  {
    "id": "typing-063",
    "title": "Счётчик в замыкании",
    "topic": "Функции",
    "goal": "Набери nonlocal во вложенной функции.",
    "code": "def make_counter():\n    value = 0\n    def increment():\n        nonlocal value\n        value += 1\n        return value\n    return increment\n\ncounter = make_counter()\nprint(counter())\nprint(counter())\nprint(make_counter()())",
    "expectedOutput": "1\n2\n1",
    "difficulty": "Средний",
    "hint": "Каждый внешний вызов создаёт отдельное состояние счётчика."
  },
  {
    "id": "typing-064",
    "title": "Генератор отсчёта",
    "topic": "Функции",
    "goal": "Набери yield и получение конечного списка.",
    "code": "def countdown(start):\n    number = start\n    while number > 0:\n        yield number\n        number -= 1\n\nfirst = list(countdown(3))\nempty = list(countdown(0))\nprint(first)\nprint(empty)\nprint(sum(first))",
    "expectedOutput": "[3, 2, 1]\n[]\n6",
    "difficulty": "Средний",
    "hint": "yield выдаёт очередной элемент и сохраняет состояние генератора."
  },
  {
    "id": "typing-065",
    "title": "Не каждое число можно разобрать",
    "topic": "Ошибки и файлы в памяти",
    "goal": "Набери try/except/else внутри цикла.",
    "code": "texts = [\"12\", \"bad\"]\nfor text in texts:\n    try:\n        value = int(text)\n    except ValueError:\n        print(\"Не число\")\n    else:\n        print(value * 2)",
    "expectedOutput": "24\nНе число",
    "difficulty": "Продвинутый",
    "hint": "else выполняется, если try завершился без исключения."
  },
  {
    "id": "typing-066",
    "title": "Обработка нулевого делителя",
    "topic": "Ошибки и файлы в памяти",
    "goal": "Набери возврат из try и except.",
    "code": "def divide(total, count):\n    try:\n        return total / count\n    except ZeroDivisionError:\n        return None\n\nprint(divide(8, 2))\nprint(divide(8, 0))",
    "expectedOutput": "4.0\nNone",
    "difficulty": "Продвинутый",
    "hint": "Обрабатывается конкретное исключение, а не любая ошибка."
  },
  {
    "id": "typing-067",
    "title": "Действие при выходе",
    "topic": "Ошибки и файлы в памяти",
    "goal": "Набери finally после обработки исключения.",
    "code": "events = []\ntry:\n    events.append(\"начало\")\n    number = int(\"x\")\nexcept ValueError:\n    events.append(\"ошибка\")\nfinally:\n    events.append(\"конец\")\nprint(events)",
    "expectedOutput": "['начало', 'ошибка', 'конец']",
    "difficulty": "Продвинутый",
    "hint": "finally нужен для действия при выходе из блока."
  },
  {
    "id": "typing-068",
    "title": "Файл в памяти",
    "topic": "Ошибки и файлы в памяти",
    "goal": "Набери with StringIO, запись, seek и чтение.",
    "code": "from io import StringIO\n\nwith StringIO() as file:\n    file.write(\"Первая\\nВторая\\n\")\n    file.seek(0)\n    lines = file.read().splitlines()\n    print(len(lines))\n    print(lines[0])\n    print(lines[-1])\nprint(file.closed)",
    "expectedOutput": "2\nПервая\nВторая\nTrue",
    "difficulty": "Продвинутый",
    "hint": "seek(0) возвращает позицию чтения к началу; with закрывает объект."
  },
  {
    "id": "typing-069",
    "title": "Непустые строки файла",
    "topic": "Ошибки и файлы в памяти",
    "goal": "Набери обход StringIO с номерами строк.",
    "code": "from io import StringIO\n\nsource = \"чай\\n\\nхлеб\\n\"\nwith StringIO(source) as file:\n    nonempty = []\n    for number, line in enumerate(file, start=1):\n        text = line.strip()\n        if text:\n            nonempty.append((number, text))\nfor number, text in nonempty:\n    print(number, text)",
    "expectedOutput": "1 чай\n3 хлеб",
    "difficulty": "Продвинутый",
    "hint": "Номер строки сохраняется даже при пропуске пустого текста."
  },
  {
    "id": "typing-070",
    "title": "Данные JSON",
    "topic": "Ошибки и файлы в памяти",
    "goal": "Набери loads, доступ к данным и dumps.",
    "code": "import json\n\ntext = '{\"items\": [2, 3], \"active\": true}'\ndata = json.loads(text)\nif data[\"active\"]:\n    total = sum(data[\"items\"])\nelse:\n    total = 0\nprint(total)\nprint(json.dumps({\"total\": total}, sort_keys=True))",
    "expectedOutput": "5\n{\"total\": 5}",
    "difficulty": "Продвинутый",
    "hint": "true в JSON превращается в True после разбора."
  },
  {
    "id": "typing-071",
    "title": "Таблица CSV в памяти",
    "topic": "Ошибки и файлы в памяти",
    "goal": "Набери DictReader и преобразование чисел из таблицы.",
    "code": "import csv\nfrom io import StringIO\n\nsource = \"name,score\\nАлия,8\\nЛи,10\\n\"\nwith StringIO(source) as file:\n    rows = list(csv.DictReader(file))\ntotal = 0\nfor row in rows:\n    score = int(row[\"score\"])\n    total += score\n    print(row[\"name\"], score)\nprint(f\"Итого: {total}\")",
    "expectedOutput": "Алия 8\nЛи 10\nИтого: 18",
    "difficulty": "Продвинутый",
    "hint": "CSV читает поля как строки, поэтому число преобразуется явно."
  },
  {
    "id": "typing-072",
    "title": "Неверный JSON и пустые данные",
    "topic": "Ошибки и файлы в памяти",
    "goal": "Набери отдельную обработку ошибки формата.",
    "code": "import json\n\ndef read_items(text):\n    try:\n        data = json.loads(text)\n    except json.JSONDecodeError:\n        return []\n    return data.get(\"items\", [])\n\nfor payload in ['{\"items\": [1, 2]}', \"bad\", \"{}\"]:\n    values = read_items(payload)\n    print(values)\n    print(len(values))",
    "expectedOutput": "[1, 2]\n2\n[]\n0\n[]\n0",
    "difficulty": "Продвинутый",
    "hint": "Ошибка JSON и отсутствие ключа обрабатываются разными механизмами."
  },
  {
    "id": "typing-073",
    "title": "Чек покупки",
    "topic": "Небольшие программы",
    "goal": "Набери расчёт стоимости каждой позиции и общей суммы.",
    "code": "prices = {\"чай\": 30, \"хлеб\": 20}\nbasket = [(\"чай\", 2), (\"хлеб\", 1)]\ntotal = 0\nfor name, quantity in basket:\n    price = prices[name]\n    amount = price * quantity\n    total += amount\n    print(f\"{name}: {quantity} x {price} = {amount}\")\nprint(f\"Итого: {total}\")\nprint(f\"Товаров: {sum(qty for _, qty in basket)}\")",
    "expectedOutput": "чай: 2 x 30 = 60\nхлеб: 1 x 20 = 20\nИтого: 80\nТоваров: 3",
    "difficulty": "Продвинутый",
    "hint": "Подытог вычисляется для каждой позиции, total накапливается отдельно."
  },
  {
    "id": "typing-074",
    "title": "Частоты в коротком тексте",
    "topic": "Небольшие программы",
    "goal": "Набери очистку, подсчёт и упорядоченный отчёт.",
    "code": "text = \"Код и тест. Код!\"\nclean = text.lower().replace(\".\", \"\").replace(\"!\", \"\")\nwords = clean.split()\ncounts = {}\nfor word in words:\n    counts[word] = counts.get(word, 0) + 1\nfor word in sorted(counts):\n    print(f\"{word}: {counts[word]}\")\nprint(f\"Слов: {len(words)}\")\nprint(f\"Уникальных: {len(counts)}\")",
    "expectedOutput": "и: 1\nкод: 2\nтест: 1\nСлов: 4\nУникальных: 3",
    "difficulty": "Продвинутый",
    "hint": "Сортировка ключей делает порядок отчёта явным."
  },
  {
    "id": "typing-075",
    "title": "Отчёт об оценках",
    "topic": "Небольшие программы",
    "goal": "Набери обработку пустого списка внутри общего отчёта.",
    "code": "results = {\"Алия\": [8, 10], \"Ли\": [], \"Олег\": [6, 6, 9]}\nfor name, marks in results.items():\n    if not marks:\n        print(f\"{name}: нет оценок\")\n        continue\n    average = sum(marks) / len(marks)\n    status = \"зачёт\" if average >= 7 else \"практика\"\n    print(f\"{name}: {average:.1f}, {status}\")\nall_marks = [mark for marks in results.values() for mark in marks]\nprint(f\"Оценок: {len(all_marks)}\")\nprint(f\"Максимум: {max(all_marks)}\")",
    "expectedOutput": "Алия: 9.0, зачёт\nЛи: нет оценок\nОлег: 7.0, зачёт\nОценок: 5\nМаксимум: 10",
    "difficulty": "Продвинутый",
    "hint": "continue не позволяет делить на длину пустого списка."
  },
  {
    "id": "typing-076",
    "title": "Список дел",
    "topic": "Небольшие программы",
    "goal": "Набери отчёт с булевыми полями и счётчиком выполнения.",
    "code": "tasks = [\n    {\"title\": \"Пример\", \"done\": True},\n    {\"title\": \"Задача\", \"done\": False},\n]\ndone = 0\nfor index, task in enumerate(tasks, start=1):\n    status = \"готово\" if task[\"done\"] else \"осталось\"\n    print(f\"{index}. {task['title']}: {status}\")\n    if task[\"done\"]:\n        done += 1\nremaining = len(tasks) - done\nprint(f\"Выполнено: {done}\")\nprint(f\"Осталось: {remaining}\")",
    "expectedOutput": "1. Пример: готово\n2. Задача: осталось\nВыполнено: 1\nОсталось: 1",
    "difficulty": "Продвинутый",
    "hint": "Внутри f-строки кавычки ключа отличаются от внешних кавычек."
  },
  {
    "id": "typing-077",
    "title": "Резерв товаров",
    "topic": "Небольшие программы",
    "goal": "Набери функцию с проверками перед изменением словаря.",
    "code": "def reserve(stock, name, quantity):\n    if name not in stock or quantity < 0 or quantity > stock[name]:\n        return False\n    stock[name] -= quantity\n    return True\n\nstock = {\"чай\": 3}\nrequests = [(\"чай\", 2), (\"чай\", 2), (\"хлеб\", 1), (\"чай\", 0)]\nfor name, quantity in requests:\n    accepted = reserve(stock, name, quantity)\n    print(name, accepted)\nprint(stock[\"чай\"])\nprint(sorted(stock))",
    "expectedOutput": "чай True\nчай False\nхлеб False\nчай True\n1\n['чай']",
    "difficulty": "Продвинутый",
    "hint": "Проверки выполняются до изменения запаса, нулевой резерв допустим."
  },
  {
    "id": "typing-078",
    "title": "Проверка баллов",
    "topic": "Небольшие программы",
    "goal": "Набери преобразование, проверку диапазона и различение None/0.",
    "code": "def parse_score(text):\n    try:\n        score = int(text)\n    except ValueError:\n        return None\n    return score if 0 <= score <= 100 else None\n\nraw = [\"90\", \"bad\", \"-1\", \"0\", \"100\"]\naccepted = []\nrejected = 0\nfor text in raw:\n    score = parse_score(text)\n    if score is None:\n        rejected += 1\n    else:\n        accepted.append(score)\nprint(accepted)\nprint(rejected)",
    "expectedOutput": "[90, 0, 100]\n2",
    "difficulty": "Продвинутый",
    "hint": "Нулевой балл не должен считаться отсутствующим результатом."
  },
  {
    "id": "typing-079",
    "title": "Текстовая диаграмма",
    "topic": "Небольшие программы",
    "goal": "Набери функцию подсчёта и выбор максимальной частоты.",
    "code": "def histogram(values):\n    counts = {}\n    for value in values:\n        counts[value] = counts.get(value, 0) + 1\n    return counts\n\nvalues = [\"a\", \"c\", \"a\", \"b\", \"c\", \"a\"]\ncounts = histogram(values)\nfor label in sorted(counts):\n    bar = \"#\" * counts[label]\n    print(f\"{label} {bar}\")\npeak = max(counts.values(), default=0)\nleaders = [name for name, count in counts.items() if count == peak]\nprint(f\"Максимум: {peak}\")\nprint(\",\".join(leaders))",
    "expectedOutput": "a ###\nb #\nc ##\nМаксимум: 3\na",
    "difficulty": "Продвинутый",
    "hint": "Гистограмма хранит числа; строка из # создаётся только для отображения."
  },
  {
    "id": "typing-080",
    "title": "От данных к отчёту",
    "topic": "Небольшие программы",
    "goal": "Набери небольшую программу с JSON, файлом в памяти и функцией.",
    "code": "import json\nfrom io import StringIO\n\ndef summarize(rows):\n    totals = {}\n    for row in rows:\n        name = row[\"name\"]\n        totals[name] = totals.get(name, 0) + row[\"points\"]\n    return totals\n\nsource = '[{\"name\":\"A\",\"points\":3},{\"name\":\"B\",\"points\":0},{\"name\":\"A\",\"points\":2}]'\nwith StringIO(source) as file:\n    rows = json.load(file)\nsummary = summarize(rows)\nfor name in sorted(summary):\n    print(f\"{name}: {summary[name]}\")\nprint(f\"Всего: {sum(summary.values())}\")",
    "expectedOutput": "A: 5\nB: 0\nВсего: 5",
    "difficulty": "Продвинутый",
    "hint": "Чтение, вычисление и форматирование выполняются отдельными шагами."
  }
];
