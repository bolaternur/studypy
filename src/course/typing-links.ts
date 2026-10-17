/** Explicit, reviewed links; typing progress never grants course credit. */
export const TYPING_COURSE_LINKS:Record<string,{moduleId:string;lessonId:string;practiceTaskId?:string;misconception:string}> = {
  "typing-001": {
    "moduleId": "output",
    "lessonId": "output-print",
    "misconception": "Текст без print существует как значение, но сам не появляется в выводе файла."
  },
  "typing-002": {
    "moduleId": "output",
    "lessonId": "output-format",
    "misconception": "Запятая разделяет аргументы print; она не печатается и не заменяет кавычки."
  },
  "typing-003": {
    "moduleId": "output",
    "lessonId": "output-format",
    "misconception": "sep вставляется между значениями; лишний дефис в самих строках даст двойной разделитель."
  },
  "typing-004": {
    "moduleId": "output",
    "lessonId": "output-format",
    "misconception": "Без end=\": \" первый print закончит строку, и число окажется на следующей."
  },
  "typing-005": {
    "moduleId": "output",
    "lessonId": "output-escapes",
    "misconception": "Два символа \\n внутри Python-строки обозначают один перевод строки; \\\\n печатает обратную черту и n."
  },
  "typing-006": {
    "moduleId": "output",
    "lessonId": "output-escapes",
    "misconception": "\\t обозначает табуляцию, а не заранее заданное одинаковое число пробелов во всех программах."
  },
  "typing-007": {
    "moduleId": "output",
    "lessonId": "output-literals",
    "misconception": "Кавычки внутри текста не должны преждевременно закрывать строковый литерал."
  },
  "typing-008": {
    "moduleId": "strings",
    "lessonId": "strings-format",
    "misconception": "Выражение в фигурных скобках вычисляется только у строки с префиксом f."
  },
  "typing-009": {
    "moduleId": "arithmetic",
    "lessonId": "arithmetic-operations",
    "misconception": "Стоимость одной позиции — цена, умноженная на количество, а не их сумма."
  },
  "typing-010": {
    "moduleId": "foundations",
    "lessonId": "foundations-state",
    "misconception": "При обновлении счёта правая часть использует прежнее значение; присваивание не означает уравнение."
  },
  "typing-011": {
    "moduleId": "arithmetic",
    "lessonId": "arithmetic-operations",
    "misconception": "Перемножай размеры, а не складывай: это различие площади и периметра."
  },
  "typing-012": {
    "moduleId": "arithmetic",
    "lessonId": "arithmetic-remainder",
    "misconception": "Остаток % и целое частное // отвечают на разные вопросы и обычно дают разные значения."
  },
  "typing-013": {
    "moduleId": "arithmetic",
    "lessonId": "arithmetic-operations",
    "misconception": "** означает степень; ^ — другая операция, не замена возведению в степень."
  },
  "typing-014": {
    "moduleId": "arithmetic",
    "lessonId": "arithmetic-units",
    "misconception": "Общее число минут нельзя одновременно считать и часами, и остатком минут."
  },
  "typing-015": {
    "moduleId": "arithmetic",
    "lessonId": "arithmetic-rounding",
    "misconception": "Целочисленное деление округляет вниз; порядок умножения и деления влияет на целую скидку."
  },
  "typing-016": {
    "moduleId": "sequences",
    "lessonId": "sequences-tuples",
    "misconception": "Последовательные a=b и b=a теряют прежнее a; правая часть парного присваивания вычисляется раньше изменения имён."
  },
  "typing-017": {
    "moduleId": "strings",
    "lessonId": "strings-methods",
    "misconception": "strip создаёт очищенную строку, а не изменяет исходную переменную сам по себе."
  },
  "typing-018": {
    "moduleId": "strings",
    "lessonId": "strings-format",
    "misconception": "Префикс f нужен для подстановки имени: обычная строка напечатает фигурные скобки."
  },
  "typing-019": {
    "moduleId": "strings",
    "lessonId": "strings-indices",
    "misconception": "Последний допустимый положительный индекс равен len(text)-1; text[len(text)] вызывает IndexError."
  },
  "typing-020": {
    "moduleId": "strings",
    "lessonId": "strings-slices",
    "misconception": "Правая граница среза не включается, а отрицательный шаг меняет направление перебора."
  },
  "typing-021": {
    "moduleId": "strings",
    "lessonId": "strings-split-join",
    "misconception": "split создаёт части, join соединяет их указанным разделителем; перепутанный порядок меняет результат."
  },
  "typing-022": {
    "moduleId": "strings",
    "lessonId": "strings-methods",
    "misconception": "replace возвращает новую строку; забытое присваивание оставит прежний текст."
  },
  "typing-023": {
    "moduleId": "foundations",
    "lessonId": "foundations-integers",
    "misconception": "input и строковый литерал дают текст; до арифметики нужна подходящая числовая конверсия."
  },
  "typing-024": {
    "moduleId": "strings",
    "lessonId": "strings-format",
    "misconception": "Формат .2f задаёт два знака после точки при выводе, а не превращает значение в целое число."
  },
  "typing-025": {
    "moduleId": "conditions",
    "lessonId": "conditions-bounds",
    "misconception": "Проверь возраст ровно на границе: > и >= отличаются этим случаем."
  },
  "typing-026": {
    "moduleId": "conditions",
    "lessonId": "conditions-branches",
    "misconception": "Ноль не является ни положительным, ни отрицательным; он требует отдельной ветви."
  },
  "typing-027": {
    "moduleId": "foundations",
    "lessonId": "foundations-text-bool",
    "misconception": "Числовой ноль ложен в условии, а непустая строка \"0\" истинна."
  },
  "typing-028": {
    "moduleId": "conditions",
    "lessonId": "conditions-elif",
    "misconception": "if/elif выбирает первую подходящую ветвь; слишком широкая проверка сверху скрывает более узкие."
  },
  "typing-029": {
    "moduleId": "conditions",
    "lessonId": "conditions-elif",
    "misconception": "Несколько отдельных if и одна цепочка if/elif не всегда выполняют одно и то же число ветвей."
  },
  "typing-030": {
    "moduleId": "conditions",
    "lessonId": "conditions-logic",
    "misconception": "and требует истинности обеих частей; or допускает одну из них."
  },
  "typing-031": {
    "moduleId": "functions",
    "lessonId": "functions-return",
    "misconception": "None и ноль различны. if not value смешает отсутствующее значение и корректный ноль."
  },
  "typing-032": {
    "moduleId": "conditions",
    "lessonId": "conditions-nested",
    "misconception": "Отступ определяет, какой внешней ветви принадлежит внутреннее условие."
  },
  "typing-033": {
    "moduleId": "loops",
    "lessonId": "loops-accumulate",
    "misconception": "Сумма инициализируется до цикла: обнуление внутри теряет накопленный результат."
  },
  "typing-034": {
    "moduleId": "loops",
    "lessonId": "loops-while",
    "misconception": "В while состояние должно приближаться к остановке; неверный знак изменения создаёт бесконечный цикл."
  },
  "typing-035": {
    "moduleId": "loops",
    "lessonId": "loops-bounds",
    "misconception": "Если направление шага не ведёт от start к stop, range не выполняет ни одной итерации."
  },
  "typing-036": {
    "moduleId": "sequences",
    "lessonId": "sequences-read",
    "misconception": "enumerate возвращает номер и значение; start меняет номер, а не сам список."
  },
  "typing-037": {
    "moduleId": "loops",
    "lessonId": "loops-control",
    "misconception": "continue пропускает остаток текущей итерации, а не завершает весь цикл."
  },
  "typing-038": {
    "moduleId": "loops",
    "lessonId": "loops-control",
    "misconception": "Без break после первого совпадения программа может вывести и следующие совпадения."
  },
  "typing-039": {
    "moduleId": "sequences",
    "lessonId": "sequences-nested",
    "misconception": "Во вложенном цикле внутренний перебор начинается заново для каждого внешнего значения."
  },
  "typing-040": {
    "moduleId": "loops",
    "lessonId": "loops-control",
    "misconception": "else у цикла выполняется после обычного исчерпания перебора; break пропускает этот блок."
  },
  "typing-041": {
    "moduleId": "sequences",
    "lessonId": "sequences-update",
    "misconception": "pop возвращает удалённый элемент; append изменяет список и возвращает None."
  },
  "typing-042": {
    "moduleId": "sequences",
    "lessonId": "sequences-update",
    "misconception": "remove удаляет по значению, а pop — по индексу; это разные операции."
  },
  "typing-043": {
    "moduleId": "sequences",
    "lessonId": "sequences-copy",
    "misconception": "Срез создаёт новый внешний список, а присваивание второго имени — ещё одну ссылку на прежний."
  },
  "typing-044": {
    "moduleId": "sequences",
    "lessonId": "sequences-tuples",
    "misconception": "Кортеж распаковывается по позициям; число обычных имён должно соответствовать числу элементов."
  },
  "typing-045": {
    "moduleId": "sequences",
    "lessonId": "sequences-tuples",
    "misconception": "Звёздочка при распаковке собирает оставшиеся элементы в список, включая пустой остаток."
  },
  "typing-046": {
    "moduleId": "sequences",
    "lessonId": "sequences-filter",
    "misconception": "Включение сначала перебирает элементы и проверяет условие, затем добавляет выражение результата."
  },
  "typing-047": {
    "moduleId": "sequences",
    "lessonId": "sequences-sort",
    "misconception": "sorted возвращает новый список; sort изменяет существующий и возвращает None."
  },
  "typing-048": {
    "moduleId": "sequences",
    "lessonId": "sequences-nested",
    "misconception": "[[0]*n]*m повторяет ссылки на одну строку; изменение клетки затронет несколько строк."
  },
  "typing-049": {
    "moduleId": "mappings",
    "lessonId": "mappings-update",
    "misconception": "Присваивание по ключу меняет значение словаря; повторный ключ не создаёт вторую запись."
  },
  "typing-050": {
    "moduleId": "mappings",
    "lessonId": "mappings-get",
    "misconception": "get с нулевым значением по умолчанию не отличает отсутствующий ключ от ключа со значением 0; для этого нужна проверка in."
  },
  "typing-051": {
    "moduleId": "mappings",
    "lessonId": "mappings-iterate",
    "misconception": "Обычный for по словарю даёт ключи; items нужен для одновременного получения пары ключ–значение."
  },
  "typing-052": {
    "moduleId": "mappings",
    "lessonId": "mappings-iterate",
    "misconception": "Включение словаря записывает key:value; повторяющийся ключ сохраняет последнее присвоенное значение."
  },
  "typing-053": {
    "moduleId": "mappings",
    "lessonId": "mappings-set-algebra",
    "misconception": "Объединение, пересечение и разность множеств имеют разные смыслы; порядок печати задаётся отдельно."
  },
  "typing-054": {
    "moduleId": "mappings",
    "lessonId": "mappings-sets",
    "misconception": "Преобразование в set убирает повторы, но само по себе не сохраняет порядок первого появления для отчёта."
  },
  "typing-055": {
    "moduleId": "mappings",
    "lessonId": "mappings-frequency",
    "misconception": "counts[word]=1 при каждом повторе сбрасывает частоту; нужно увеличить прежнее значение."
  },
  "typing-056": {
    "moduleId": "mappings",
    "lessonId": "mappings-group",
    "misconception": "Для каждой группы нужен собственный список; общий изменяемый список смешает группы."
  },
  "typing-057": {
    "moduleId": "functions",
    "lessonId": "functions-definition",
    "misconception": "Определение функции не выполняет её тело; вычисление начинается при вызове."
  },
  "typing-058": {
    "moduleId": "functions",
    "lessonId": "functions-defaults",
    "misconception": "Значение по умолчанию используется только для пропущенного аргумента; явно переданный аргумент его заменяет."
  },
  "typing-059": {
    "moduleId": "functions",
    "lessonId": "functions-early",
    "misconception": "Пустой список нужно обработать до деления на его длину или обращения к первому элементу."
  },
  "typing-060": {
    "moduleId": "decorators",
    "lessonId": "decorators-arguments",
    "misconception": "*args собирает позиционные аргументы в кортеж; один список и несколько аргументов — разные вызовы."
  },
  "typing-061": {
    "moduleId": "decorators",
    "lessonId": "decorators-arguments",
    "misconception": "Параметр после отдельной * нужно передавать по имени, иначе возникает TypeError."
  },
  "typing-062": {
    "moduleId": "functions",
    "lessonId": "functions-scope",
    "misconception": "Новый список из функции и изменение переданного списка дают разный эффект для вызывающего кода."
  },
  "typing-063": {
    "moduleId": "decorators",
    "lessonId": "decorators-closures",
    "misconception": "Без nonlocal присваивание создаёт локальное имя внутри внутренней функции и не обновляет состояние замыкания."
  },
  "typing-064": {
    "moduleId": "iterators",
    "lessonId": "iterators-yield",
    "misconception": "Генератор отдаёт значения при переборе и исчерпывается; print(generator) не печатает все его элементы."
  },
  "typing-065": {
    "moduleId": "debugging",
    "lessonId": "debugging-exceptions",
    "misconception": "Обрабатывай ValueError от int; перехват любого исключения может скрыть ошибку самой программы."
  },
  "typing-066": {
    "moduleId": "debugging",
    "lessonId": "debugging-exceptions",
    "misconception": "Нулевой делитель требует обработки до обычного деления или отдельной ветви except ZeroDivisionError."
  },
  "typing-067": {
    "moduleId": "debugging",
    "lessonId": "debugging-exceptions",
    "misconception": "finally исполняется при обычном выходе и исключении; это не ветвь только для успешного результата."
  },
  "typing-068": {
    "moduleId": "data",
    "lessonId": "data-streams",
    "misconception": "После чтения позиция потока сдвигается; повторное read без seek может вернуть пустую строку."
  },
  "typing-069": {
    "moduleId": "data",
    "lessonId": "data-read-files",
    "misconception": "Пустая строка после strip должна быть отфильтрована, а не посчитана как содержательная запись."
  },
  "typing-070": {
    "moduleId": "data",
    "lessonId": "data-json",
    "misconception": "JSON разбирается json.loads/load; Python-литерал с одинарными кавычками не всегда является допустимым JSON."
  },
  "typing-071": {
    "moduleId": "data",
    "lessonId": "data-csv",
    "misconception": "Простое split(\",\") ломает CSV-поле с запятой в кавычках; используй csv.reader."
  },
  "typing-072": {
    "moduleId": "data",
    "lessonId": "data-json",
    "misconception": "Ошибка разбора JSON и отсутствие ключа — разные случаи; get не исправляет неверный синтаксис документа."
  },
  "typing-073": {
    "moduleId": "projects",
    "lessonId": "projects-budget",
    "practiceTaskId": "projects-budget-task-5",
    "misconception": "Подытог позиции и общая сумма — разные состояния; total нельзя обнулять внутри цикла по корзине."
  },
  "typing-074": {
    "moduleId": "mappings",
    "lessonId": "mappings-frequency",
    "misconception": "Нормализация регистра и знаков должна предшествовать подсчёту, иначе «Код» и «код!» станут разными ключами."
  },
  "typing-075": {
    "moduleId": "mappings",
    "lessonId": "mappings-group",
    "misconception": "Пустой список оценок нужно обработать до вычисления среднего; ноль оценок не означает средний балл 0."
  },
  "typing-076": {
    "moduleId": "mappings",
    "lessonId": "mappings-iterate",
    "misconception": "Счётчик выполненных задач считает истинные done, а не все записи или непустые названия."
  },
  "typing-077": {
    "moduleId": "mappings",
    "lessonId": "mappings-inventory-project",
    "misconception": "Следующая заявка видит остаток после предыдущей; отказ не должен частично списывать запас."
  },
  "typing-078": {
    "moduleId": "debugging",
    "lessonId": "debugging-exceptions",
    "misconception": "Корректный нулевой балл не равен отсутствующему значению None и не должен отбрасываться."
  },
  "typing-079": {
    "moduleId": "mappings",
    "lessonId": "mappings-frequency",
    "misconception": "Частота хранится числом; строка из # создаётся только на этапе отображения."
  },
  "typing-080": {
    "moduleId": "data",
    "lessonId": "data-reports",
    "misconception": "Чтение, накопление и форматирование разделены: пропуск нулевой записи или перезапись вместо суммы испортит отчёт."
  }
};
