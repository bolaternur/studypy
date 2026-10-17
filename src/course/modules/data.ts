import type { CourseModule } from '../types';

const module: CourseModule = {
  "id": "data",
  "title": "Файлы, модули и данные",
  "track": "base",
  "depth": "Практический модуль",
  "goal": "Читать и создавать документы в браузерной среде, разбирать JSON и CSV и проверять схему.",
  "prerequisites": [
    "debugging"
  ],
  "lessons": [
    {
      "id": "data-imports",
      "title": "import и стандартная библиотека",
      "goal": "Подключать модуль, читать его имя и учитывать браузерную среду.",
      "prerequisites": [],
      "role": "lesson",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "data-imports-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Модуль объединяет связанные функции и константы. import math загружает стандартный модуль и связывает имя math в текущем коде. После этого math.ceil(2.3) вызывает функцию округления вверх. Точка отделяет имя модуля от его содержимого; это не новый вид умножения. Стандартная библиотека поставляется вместе с Python, однако браузерный Pyodide поддерживает не все возможности операционной системы и внешних пакетов.",
            "Вариант from math import ceil связывает имя ceil напрямую, тогда вызов пишется ceil(...). Выбирай один понятный способ. import math обычно яснее для начинающего: видно, откуда взялась операция. Не называй свой файл math.py и переменную math числом, если собираешься использовать модуль под этим именем: новое связывание может скрыть ожидаемый объект. В нашем редакторе код выполняется как main.py."
          ],
          "examples": [
            {
              "id": "data-imports-example-1",
              "title": "Имя модуля сохраняет происхождение",
              "code": "import math\nprint(math.ceil(7 / 3))\nprint(math.gcd(18, 24))",
              "output": "3\n6\n",
              "explanation": "ceil даёт 3 коробки для 7 предметов вместимостью 3;gcd возвращает 6."
            }
          ],
          "goal": "Подключать модуль, читать его имя и учитывать браузерную среду. Задача и устройство.",
          "prerequisites": []
        },
        {
          "id": "data-imports-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Не переписывай известную математическую операцию без причины, но понимай её контракт. ceil возвращает наименьшее целое не меньше значения, поэтому ceil(2.1)=3, а ceil(-2.1)=-2. gcd находит неотрицательный наибольший общий делитель целых, включая случаи с нулём. Использование библиотеки не отменяет необходимости проверить нулевую вместимость или допустимость аргументов в своей функции.",
            "Путь файла — строка внутри конкретной файловой системы. В Pyodide open обращается к виртуальной файловой системе браузерного worker. Путь C:\\Users\\... с твоего компьютера не даёт странице доступ к домашним файлам. Каталог worker временный: новый независимый запуск не обязан сохранять созданный файл. Для передачи данных наружу нужна отдельная функция экспорта, а не обещание, что open сам скачает файл."
          ],
          "examples": [
            {
              "id": "data-imports-example-2",
              "title": "Округление вверх не означает от нуля",
              "code": "from math import ceil\nprint(ceil(2.1))\nprint(ceil(-2.1))",
              "output": "3\n-2\n",
              "explanation": "Оба результата не меньше исходного числа. Для отрицательного это движение к нулю."
            }
          ],
          "goal": "Подключать модуль, читать его имя и учитывать браузерную среду. Порядок выполнения.",
          "prerequisites": [
            "data-imports-step-1"
          ]
        },
        {
          "id": "data-imports-step-3",
          "title": "Применение и ошибки",
          "paragraphs": [
            "В этом модуле все задачи работают с текстом, переданным аргументом, либо с небольшими входными файлами, подготовленными проверкой в виртуальной среде. Подготовка создаёт только исходные данные и никогда не рассчитывает ответ за ученика. Сети, секретных ключей и установки пакетов не требуется. Один и тот же вычислительный контракт можно выполнить разными корректными приёмами; проверка сравнивает результат.",
            "При ModuleNotFoundError проверь написание и доступность библиотеки. Не добавляй случайный pip install в обычное решение: пакет может не поддерживать браузер. Сначала используй стандартную библиотеку и изучи ожидаемые типы. Дальше мы отделим текстовые данные от файлового объекта, затем будем читать и писать UTF-8, разбирать JSON и CSV и соберём небольшую обработку документов."
          ],
          "examples": [
            {
              "id": "data-imports-example-3",
              "title": "Путь как данные",
              "code": "path = \"reports/day.txt\"\nprint(path.split(\"/\")[-1])",
              "output": "day.txt\n",
              "explanation": "Разбор строки не читает файл. Доступ к содержимому — отдельная операция open."
            }
          ],
          "goal": "Подключать модуль, читать его имя и учитывать браузерную среду. Применение и ошибки.",
          "prerequisites": [
            "data-imports-step-2"
          ]
        }
      ],
      "exercises": [
        {
          "id": "data-imports-task-1",
          "kind": "code",
          "title": "Количество коробок",
          "goal": "Количество коробок",
          "prerequisites": [
            "data-imports"
          ],
          "prompt": "items>=0,capacity>0 — целые не больше 10000. Верни минимальное количество коробок вместимости capacity для items предметов.",
          "inputFormat": "Реализуй boxes(items, capacity). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "boxes(7,3)"
              ],
              "output": "3",
              "explanation": "Последняя коробка неполная."
            },
            {
              "input": [
                "boxes(6,3)"
              ],
              "output": "2",
              "explanation": "Ровное деление без лишней коробки."
            }
          ],
          "initialCode": "def boxes(items, capacity):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "boxes(7,3)",
              "expectedValue": 3,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Последняя коробка неполная."
            },
            {
              "expression": "boxes(6,3)",
              "expectedValue": 2,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Ровное деление без лишней коробки."
            },
            {
              "expression": "boxes(0,4)",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет предметов."
            }
          ],
          "reference": "import math\ndef boxes(items, capacity):\n    return math.ceil(items / capacity)",
          "alternative": "def boxes(items, capacity):\n    return (items + capacity - 1) // capacity",
          "wrongSolutions": [
            {
              "code": "def boxes(items, capacity):\n    return items // capacity",
              "why": "Неполная коробка потеряна."
            },
            {
              "code": "def boxes(items, capacity):\n    return items // capacity + 1",
              "why": "Лишняя коробка при ровном делении и нуле."
            }
          ],
          "hints": [
            "Нужна вместимость для всех предметов, включая остаток.",
            "Обычное // округляет вниз.",
            "Используй ceil от отношения или целочисленную формулу округления вверх."
          ],
          "solutionExplanation": [
            "Стандартная функция выражает правило округления.",
            "Ограничение размера делает альтернативу через деление безопасной для примеров."
          ],
          "required": true
        },
        {
          "id": "data-imports-task-2",
          "kind": "code",
          "title": "Сократить дробь",
          "goal": "Сократить дробь",
          "prerequisites": [
            "data-imports"
          ],
          "prompt": "numerator>=0,denominator>0. Верни список [n,d] сокращённой дроби через общий делитель. Нулевая дробь должна дать [0,1].",
          "inputFormat": "Реализуй reduce_fraction(numerator, denominator). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "reduce_fraction(18,24)"
              ],
              "output": "[3, 4]",
              "explanation": "Делим на gcd=6."
            },
            {
              "input": [
                "reduce_fraction(0,5)"
              ],
              "output": "[0, 1]",
              "explanation": "gcd(0,5)=5."
            }
          ],
          "initialCode": "def reduce_fraction(numerator, denominator):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "reduce_fraction(18,24)",
              "expectedValue": [
                3,
                4
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Делим на gcd=6."
            },
            {
              "expression": "reduce_fraction(0,5)",
              "expectedValue": [
                0,
                1
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "gcd(0,5)=5."
            },
            {
              "expression": "reduce_fraction(7,3)",
              "expectedValue": [
                7,
                3
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Уже несократимая."
            }
          ],
          "reference": "import math\ndef reduce_fraction(numerator, denominator):\n    divisor=math.gcd(numerator,denominator)\n    return [numerator//divisor,denominator//divisor]",
          "alternative": "def reduce_fraction(numerator, denominator):\n    a,b=numerator,denominator\n    while b:\n        a,b=b,a%b\n    return [numerator//a,denominator//a]",
          "wrongSolutions": [
            {
              "code": "def reduce_fraction(numerator, denominator):\n    return [numerator,denominator]",
              "why": "Сокращение отсутствует."
            },
            {
              "code": "def reduce_fraction(numerator, denominator):\n    divisor=min(numerator,denominator)\n    return [numerator//divisor,denominator//divisor]",
              "why": "Минимум не является общим делителем; ноль вызывает ошибку."
            }
          ],
          "hints": [
            "Один делитель должен разделить оба числа без остатка.",
            "gcd уже вычисляет такой наибольший делитель.",
            "Раздели оба аргумента на gcd через //."
          ],
          "solutionExplanation": [
            "Результат остаётся парой целых.",
            "Нулевой числитель корректен благодаря правилу gcd."
          ],
          "required": true
        },
        {
          "id": "data-imports-task-3",
          "kind": "code",
          "title": "Имя файла из учебного пути",
          "goal": "Имя файла из учебного пути",
          "prerequisites": [
            "data-imports"
          ],
          "prompt": "path — строка относительного пути с разделителем/без завершающего/. Верни последнюю часть. Для пустой строки верни пустую строку. Не читай файл.",
          "inputFormat": "Реализуй file_name(path). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "file_name('reports/day.txt')"
              ],
              "output": "'day.txt'",
              "explanation": "Нужна только последняя часть."
            },
            {
              "input": [
                "file_name('main.py')"
              ],
              "output": "'main.py'",
              "explanation": "Каталога нет."
            }
          ],
          "initialCode": "def file_name(path):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "file_name('reports/day.txt')",
              "expectedValue": "day.txt",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нужна только последняя часть."
            },
            {
              "expression": "file_name('main.py')",
              "expectedValue": "main.py",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Каталога нет."
            },
            {
              "expression": "file_name('')",
              "expectedValue": "",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой путь."
            }
          ],
          "reference": "def file_name(path):\n    return path.rsplit(\"/\",1)[-1]",
          "alternative": "def file_name(path):\n    parts=path.split(\"/\")\n    return parts[len(parts)-1]",
          "wrongSolutions": [
            {
              "code": "def file_name(path):\n    return path.split(\"/\")[0]",
              "why": "Вернётся первый каталог."
            },
            {
              "code": "def file_name(path):\n    return open(path).read()",
              "why": "Задача о строке пути, а не чтении содержимого."
            }
          ],
          "hints": [
            "Путь здесь — обычная строка.",
            "Ищи часть после последнего/.",
            "split или rsplit возвращает список частей; нужна последняя."
          ],
          "solutionExplanation": [
            "Задание отличает манипуляцию путём от доступа к данным.",
            "Пустая строка естественно даёт пустую последнюю часть."
          ],
          "required": true
        },
        {
          "id": "data-imports-task-4",
          "kind": "choice",
          "title": "Где появится файл?",
          "goal": "Где появится файл?",
          "prerequisites": [
            "data-imports"
          ],
          "prompt": "Код выполняет open(\"notes.txt\",\"w\") в Pyodide. Какое утверждение верно?",
          "inputFormat": "Прочитай условие и выбери ответ.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "import math\nprint(math.ceil(7 / 3))\nprint(math.gcd(18, 24))"
              ],
              "output": "3\n6\n",
              "explanation": "ceil даёт 3 коробки для 7 предметов вместимостью 3;gcd возвращает 6."
            }
          ],
          "hints": [
            "Вспомни правило из урока «import и стандартная библиотека» и проверь каждый вариант на конкретном примере.",
            "Сначала исключи варианты, противоречащие наблюдаемому выполнению. Следующий независимый запуск может начать новую временную среду.",
            "Проверь основной аргумент: Файловая система worker изолирована от обычных документов компьютера."
          ],
          "solutionExplanation": [
            "Файловая система worker изолирована от обычных документов компьютера.",
            "Следующий независимый запуск может начать новую временную среду."
          ],
          "required": true,
          "answer": [
            "1"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Создаётся файл виртуальной среды текущего worker."
            },
            {
              "id": "2",
              "text": "Автоматически изменяется файл в домашних документах пользователя."
            },
            {
              "id": "3",
              "text": "Браузер обязан скачать файл без отдельного действия."
            }
          ]
        }
      ]
    },
    {
      "id": "data-streams",
      "title": "Текстовый поток: read, readline и позиция",
      "goal": "Читать последовательность символов и понимать текущее положение.",
      "prerequisites": [
        "data-imports"
      ],
      "role": "lesson",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "data-streams-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Строка хранит текст целиком. Текстовый поток предоставляет последовательное чтение: после read или readline его позиция меняется. StringIO из модуля io создаёт такой поток в памяти из строки. Он удобен для обучения и тестирования: можно исследовать поведение файла без доступа к диску. Уже нужны строки, split, циклы, преобразование int и with, который мы подробно закрепим в следующем уроке.",
            "read() без аргумента читает всё от текущей позиции до конца. read(3) читает не больше трёх символов. Повторный read после достижения конца возвращает пустую строку, а не исходный текст заново. seek(0) переводит позицию в начало. Это важно в программе, где одна функция уже прочитала поток: следующая не увидит прежние данные автоматически. Срок жизни и положение потока — часть состояния."
          ],
          "examples": [
            {
              "id": "data-streams-example-1",
              "title": "Позиция после read",
              "code": "from io import StringIO\nstream=StringIO(\"abcdef\")\nprint(stream.read(2))\nprint(stream.read(2))\nprint(stream.read())",
              "output": "ab\ncd\nef\n",
              "explanation": "Позиция движется:ab,cd,ef. Второе чтение не начинается заново."
            }
          ],
          "goal": "Читать последовательность символов и понимать текущее положение. Задача и устройство.",
          "prerequisites": [
            "data-imports"
          ]
        },
        {
          "id": "data-streams-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "readline() читает одну строку и обычно сохраняет завершающий символ переноса\\n. На последней строке перенос может отсутствовать. Пустая строка из readline означает конец потока; строка\"\\n\" — существующая пустая строка текста. Если применять strip сразу, эти случаи становятся одинаковыми. Сначала выясни, нужно ли различать конец и пустую запись, и только потом удаляй пробелы.",
            "Перебор for line in stream последовательно выдаёт строки. Метод splitlines у строки даёт список строк без завершающих переносов. Это разные инструменты: поток позволяет обрабатывать данные по одной записи, строковый метод требует уже имеющийся текст. В учебных упражнениях размер небольшой, поэтому допустимы оба алгоритма с одинаковым результатом. Позже для крупных файлов будет важно не читать всё сразу без необходимости."
          ],
          "examples": [
            {
              "id": "data-streams-example-2",
              "title": "Пустая строка и конец",
              "code": "from io import StringIO\nstream=StringIO(\"\\nlast\")\nprint(repr(stream.readline()))\nprint(repr(stream.readline()))\nprint(repr(stream.readline()))",
              "output": "'\\n'\n'last'\n''\n",
              "explanation": "Сначала существующая пустая строка с переносом, затем last, затем конец."
            }
          ],
          "goal": "Читать последовательность символов и понимать текущее положение. Порядок выполнения.",
          "prerequisites": [
            "data-streams-step-1"
          ]
        },
        {
          "id": "data-streams-step-3",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Для очистки имени подходит strip, но для сохранения форматированного текста часто нужен только rstrip(\"\\n\").strip удаляет и табуляцию и пробелы по краям. Если условие просит сохранить отступы, общее strip испортит код или стихотворение. Уточняй, какие символы являются данными, а какие разделителями. Здесь каждая задача явно объявляет, очищать ли внешние пробелы.",
            "Проверяй пустой текст, последнюю строку без переноса, несколько пустых строк и пробелы. В типичной ошибке текст читают дважды, а второй результат неожиданно пуст. Это исправляется либо использованием сохранённой строки, либо явным seek. Не добавляй seek механически перед каждым чтением: тогда цикл может снова и снова читать один и тот же участок."
          ],
          "examples": [
            {
              "id": "data-streams-example-3",
              "title": "Возврат к началу",
              "code": "from io import StringIO\nstream=StringIO(\"кот\")\nprint(stream.read())\nstream.seek(0)\nprint(stream.read())",
              "output": "кот\nкот\n",
              "explanation": "seek явно сбрасывает позицию. Без него второе чтение было бы пустым."
            }
          ],
          "goal": "Читать последовательность символов и понимать текущее положение. Применение и ошибки.",
          "prerequisites": [
            "data-streams-step-2"
          ]
        }
      ],
      "exercises": [
        {
          "id": "data-streams-task-1",
          "kind": "code",
          "title": "Первая строка без переноса",
          "goal": "Первая строка без переноса",
          "prerequisites": [
            "data-streams"
          ],
          "prompt": "Верни первую строку text без завершающего\\n или\\r\\n. Сохрани внешние пробелы первой строки. Для пустого текста верни\"\".",
          "inputFormat": "Реализуй first_line(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту. Разделители строк во входном тексте — LF (\\n) или CRLF (\\r\\n); другие управляющие разделители в этом упражнении не используются.",
          "examples": [
            {
              "input": [
                "first_line('  код  \\nnext')"
              ],
              "output": "'  код  '",
              "explanation": "Пробелы — данные."
            },
            {
              "input": [
                "first_line('last')"
              ],
              "output": "'last'",
              "explanation": "Последняя строка без переноса."
            }
          ],
          "initialCode": "def first_line(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "first_line('  код  \\nnext')",
              "expectedValue": "  код  ",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пробелы — данные."
            },
            {
              "expression": "first_line('last')",
              "expectedValue": "last",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Последняя строка без переноса."
            },
            {
              "expression": "first_line('')",
              "expectedValue": "",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой текст."
            }
          ],
          "reference": "from io import StringIO\ndef first_line(text):\n    return StringIO(text).readline().rstrip(\"\\r\\n\")",
          "alternative": "def first_line(text):\n    lines=text.splitlines()\n    return lines[0] if lines else \"\"",
          "wrongSolutions": [
            {
              "code": "def first_line(text):\n    return text.split(\"\\n\")[0].strip()",
              "why": "strip уничтожает объявленные пробелы."
            },
            {
              "code": "def first_line(text):\n    return text",
              "why": "Все строки возвращены вместо первой."
            }
          ],
          "hints": [
            "Нужно удалить перенос, а не всё пробельное окружение.",
            "Прочитай одну строку.",
            "Применяй rstrip(\"\\r\\n\") к readline."
          ],
          "solutionExplanation": [
            "Текст строки не равен очищенному слову.",
            "Отдельный пример сохраняет значимые отступы."
          ],
          "required": true
        },
        {
          "id": "data-streams-task-2",
          "kind": "code",
          "title": "Непустые очищенные строки",
          "goal": "Непустые очищенные строки",
          "prerequisites": [
            "data-streams"
          ],
          "prompt": "Разбей text на строки, удали внешние пробелы каждой и верни только непустые в исходном порядке.",
          "inputFormat": "Реализуй clean_lines(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту. Разделители строк во входном тексте — LF (\\n) или CRLF (\\r\\n); другие управляющие разделители в этом упражнении не используются.",
          "examples": [
            {
              "input": [
                "clean_lines(' a \\n\\n b\\t\\n')"
              ],
              "output": "['a', 'b']",
              "explanation": "Пустые и пробельные записи пропущены."
            },
            {
              "input": [
                "clean_lines(' \\n\\t')"
              ],
              "output": "[]",
              "explanation": "Полностью пустой набор."
            }
          ],
          "initialCode": "def clean_lines(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "clean_lines(' a \\n\\n b\\t\\n')",
              "expectedValue": [
                "a",
                "b"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустые и пробельные записи пропущены."
            },
            {
              "expression": "clean_lines(' \\n\\t')",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Полностью пустой набор."
            },
            {
              "expression": "clean_lines('x\\nx')",
              "expectedValue": [
                "x",
                "x"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Повторы не удаляются."
            },
            {
              "expression": "clean_lines('one two\\nthree')",
              "expectedValue": [
                "one two",
                "three"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Внутренний пробел строки сохраняется."
            }
          ],
          "reference": "def clean_lines(text):\n    result=[]\n    for line in text.splitlines():\n        cleaned=line.strip()\n        if cleaned:\n            result.append(cleaned)\n    return result",
          "alternative": "from io import StringIO\ndef clean_lines(text):\n    return [line.strip() for line in StringIO(text) if line.strip()]",
          "wrongSolutions": [
            {
              "code": "def clean_lines(text):\n    return text.split()",
              "why": "split без аргументов разбивает и слова внутри строки."
            },
            {
              "code": "def clean_lines(text):\n    return [line for line in text.splitlines() if line]",
              "why": "Внешние пробелы неубраны, пробельные строки остались."
            }
          ],
          "hints": [
            "Очистка относится к строкам, не к словам.",
            "Проверяй пустоту после strip.",
            "Сначала cleaned=line.strip(), затем добавь только если cleaned не пуст."
          ],
          "solutionExplanation": [
            "Нормализация предшествует фильтрации.",
            "В отличие от split(),splitlines сохраняет границы строк."
          ],
          "required": true
        },
        {
          "id": "data-streams-task-3",
          "kind": "code",
          "title": "Сумма целых строк",
          "goal": "Сумма целых строк",
          "prerequisites": [
            "data-streams"
          ],
          "prompt": "Каждая непустая после strip строка содержит допустимое целое. Пропусти пустые строки, верни сумму остальных. Ошибочного формата здесь нет.",
          "inputFormat": "Реализуй line_sum(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту. Разделители строк во входном тексте — LF (\\n) или CRLF (\\r\\n); другие управляющие разделители в этом упражнении не используются.",
          "examples": [
            {
              "input": [
                "line_sum('2\\n -3 \\n\\n5')"
              ],
              "output": "4",
              "explanation": "Три числовые записи."
            },
            {
              "input": [
                "line_sum('')"
              ],
              "output": "0",
              "explanation": "Пустая сумма."
            }
          ],
          "initialCode": "def line_sum(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "line_sum('2\\n -3 \\n\\n5')",
              "expectedValue": 4,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Три числовые записи."
            },
            {
              "expression": "line_sum('')",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустая сумма."
            },
            {
              "expression": "line_sum('0\\n0')",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нули допустимы."
            }
          ],
          "reference": "def line_sum(text):\n    total=0\n    for line in text.splitlines():\n        if line.strip():\n            total+=int(line)\n    return total",
          "alternative": "def line_sum(text):\n    return sum(int(line) for line in text.splitlines() if line.strip())",
          "wrongSolutions": [
            {
              "code": "def line_sum(text):\n    return sum(int(line) for line in text.splitlines())",
              "why": "Пустая строка вызовет ValueError."
            },
            {
              "code": "def line_sum(text):\n    return len(text.splitlines())",
              "why": "Подсчитаны строки вместо суммы."
            }
          ],
          "hints": [
            "Пустая строка не является числом.",
            "Отдели пропуск пустоты от преобразования.",
            "В каждой подходящей строке получи int и прибавь к total."
          ],
          "solutionExplanation": [
            "Условие не требует except: формат непустых строк уже гарантирован.",
            "Пустой текст даёт 0 без специальной подстановки."
          ],
          "required": true
        },
        {
          "id": "data-streams-task-4",
          "kind": "predict",
          "title": "Повторный read",
          "goal": "Повторный read",
          "prerequisites": [
            "data-streams"
          ],
          "prompt": "Укажи точный вывод.",
          "inputFormat": "Выполни действие с указанным фрагментом.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "from io import StringIO\nstream=StringIO(\"abcdef\")\nprint(stream.read(2))\nprint(stream.read(2))\nprint(stream.read())"
              ],
              "output": "ab\ncd\nef\n",
              "explanation": "Позиция движется:ab,cd,ef. Второе чтение не начинается заново."
            }
          ],
          "hints": [
            "Запиши вывод каждой выполняемой строки отдельно; определение функции само не выполняет её тело.",
            "Отметь порядок вызовов и место return или исключения. Не принимай текст вывода за возвращённое значение.",
            "Сверь свою трассировку с правилом: Первое чтение берёт 2 символа, второе остаток."
          ],
          "solutionExplanation": [
            "Первое чтение берёт 2 символа, второе остаток.",
            "Третье чтение в конце возвращает пустую строку."
          ],
          "required": true,
          "answer": "ab\ncd\nTrue\n",
          "initialCode": "from io import StringIO\nf=StringIO(\"abcd\")\nprint(f.read(2))\nprint(f.read())\nprint(f.read()==\"\")"
        }
      ]
    },
    {
      "id": "data-read-files",
      "title": "Чтение UTF-8 файла и with",
      "goal": "Открыть входной файл, прочитать данные и закрыть поток.",
      "prerequisites": [
        "data-streams"
      ],
      "role": "lesson",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "data-read-files-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "open(path, \"r\", encoding=\"utf-8\") открывает текстовый файл для чтения и возвращает файловый объект. Переменная path содержит имя, а не само содержимое. Чтобы получить текст, вызови read у возвращённого объекта. Если файл не существует, возникает FileNotFoundError. В упражнениях этого урока проверка заранее создаёт указанный входной файл; искать файлы на компьютере пользователя не нужно и нельзя.",
            "Конструкция with open(...) as stream: выделяет область работы с файлом. Имя stream доступно внутри блока как обычная переменная. При выходе из блока файл закрывается, в том числе если внутри возникло исключение. Не нужно вручную дублировать close на каждой ветке return. Закрытый файловый объект больше не предназначен для чтения; сохрани нужную строку до выхода и возвращай именно данные, а не поток."
          ],
          "examples": [
            {
              "id": "data-read-files-example-1",
              "title": "Тот же интерфейс в памяти",
              "code": "from io import StringIO\nwith StringIO(\"Привет\") as stream:\n    text=stream.read()\nprint(text)",
              "output": "Привет\n",
              "explanation": "with завершает работу с потоком, но строка text остаётся обычным значением."
            }
          ],
          "goal": "Открыть входной файл, прочитать данные и закрыть поток. Задача и устройство.",
          "prerequisites": [
            "data-streams"
          ]
        },
        {
          "id": "data-read-files-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Кодировка определяет преобразование байтов в текст. Укажи encoding=\"utf-8\", чтобы кириллица читалась одинаково на разных системах. Это не перевод языка и не исправление произвольного повреждённого файла. Если реальные байты записаны в другой кодировке, нужен правильный формат источника. В Pyodide все подготовленные текстовые входы этого модуля используют UTF-8. Особенности системной кодировки не должны становиться скрытым условием задачи.",
            "Количество строк нужно определить по контракту. В тексте \"a\\nb\\n\" две строки данных, а не три; завершающий перенос лишь заканчивает вторую. В тексте \"a\\n\\nb\" есть пустая средняя строка. splitlines и перебор файлового объекта позволяют сохранить этот смысл. Не считай число символов\\nединственным способом: текст без завершающего переноса тоже содержит строку."
          ],
          "examples": [
            {
              "id": "data-read-files-example-2",
              "title": "Строки, не символы переноса",
              "code": "text=\"a\\n\\nb\"\nprint(text.splitlines())\nprint(len(text.splitlines()))",
              "output": "['a', '', 'b']\n3\n",
              "explanation": "Пустая средняя строка тоже считается. Последняя строка может быть без переноса."
            }
          ],
          "goal": "Открыть входной файл, прочитать данные и закрыть поток. Порядок выполнения.",
          "prerequisites": [
            "data-read-files-step-1"
          ]
        },
        {
          "id": "data-read-files-step-3",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Для небольшого учебного файла чтение целиком удобно. Для большого источника перебор по строкам экономит память и позволяет остановиться при первом совпадении. Не выполняй read заново на каждой итерации: положение потока изменяется. Если нужна первая непустая строка, можно закончить поиск раньше и выйти из with; закрытие всё равно произойдёт. Ранний return и управление ресурсом не противоречат друг другу.",
            "Проверяй кириллицу, пустой файл, пустые строки и последнюю строку без переноса. Не объявляй учебный результат постоянным сохранением на устройстве: файлы worker временные. После этого урока ты сможешь отделить получение данных из источника от обработки текста. Следующий шаг — запись результата, где режим открытия особенно важен: ошибка \"w\" вместо \"a\" может стереть предыдущие данные."
          ],
          "examples": [
            {
              "id": "data-read-files-example-3",
              "title": "Первое совпадение в потоке",
              "code": "from io import StringIO\nwith StringIO(\"\\n  \\n кот \\nпёс\") as stream:\n    for line in stream:\n        if line.strip():\n            print(line.strip())\n            break",
              "output": "кот\n",
              "explanation": "Поиск останавливается на первой содержательной строке. with закроет поток после блока."
            }
          ],
          "goal": "Открыть входной файл, прочитать данные и закрыть поток. Применение и ошибки.",
          "prerequisites": [
            "data-read-files-step-2"
          ]
        }
      ],
      "exercises": [
        {
          "id": "data-read-files-task-1",
          "kind": "code",
          "title": "Прочитать текст целиком",
          "goal": "Прочитать текст целиком",
          "prerequisites": [
            "data-read-files"
          ],
          "prompt": "Прочитай существующий UTF-8 файл path и верни весь текст без strip, замен и лишнего вывода.",
          "inputFormat": "Реализуй read_text(path). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "with open('source.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('  Привет\\nмир  ')",
                "read_text('source.txt')"
              ],
              "output": "'  Привет\\nмир  '",
              "explanation": "Пробелы и переносы сохраняются."
            },
            {
              "input": [
                "with open('empty.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('')",
                "read_text('empty.txt')"
              ],
              "output": "''",
              "explanation": "Пустой файл."
            }
          ],
          "initialCode": "def read_text(path):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "read_text('source.txt')",
              "expectedValue": "  Привет\nмир  ",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пробелы и переносы сохраняются.",
              "setup": "with open('source.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('  Привет\\nмир  ')"
            },
            {
              "expression": "read_text('empty.txt')",
              "expectedValue": "",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой файл.",
              "setup": "with open('empty.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('')"
            },
            {
              "expression": "read_text('crlf.txt')",
              "expectedValue": "a\r\nb",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Точный текст сохраняет CRLF, не заменяя его на LF.",
              "setup": "with open(\"crlf.txt\",\"w\",encoding=\"utf-8\",newline=\"\") as f:\n    f.write(\"a\\r\\nb\")"
            }
          ],
          "reference": "def read_text(path):\n    with open(path,\"r\",encoding=\"utf-8\",newline=\"\") as stream:\n        return stream.read()",
          "alternative": "def read_text(path):\n    with open(path,encoding=\"utf-8\",newline=\"\") as stream:\n        parts=[]\n        for line in stream:\n            parts.append(line)\n    return \"\".join(parts)",
          "wrongSolutions": [
            {
              "code": "def read_text(path):\n    return path",
              "why": "Путь не является содержимым."
            },
            {
              "code": "def read_text(path):\n    with open(path,encoding=\"utf-8\") as stream:\n        return stream.read().strip()",
              "why": "strip уничтожает значимые пробелы."
            }
          ],
          "hints": [
            "Открой источник для чтения.",
            "Верни результат read, не путь.",
            "Используй with и encoding=\"utf-8\"; не очищай текст."
          ],
          "solutionExplanation": [
            "Работа с ресурсом отделена от обработки текста.",
            "Полный текст может содержать значимые пробелы."
          ],
          "required": true
        },
        {
          "id": "data-read-files-task-2",
          "kind": "code",
          "title": "Количество строк файла",
          "goal": "Количество строк файла",
          "prerequisites": [
            "data-read-files"
          ],
          "prompt": "Верни количество строк существующего UTF-8 файла. Пустая средняя строка считается; завершающий перенос не добавляет отдельную строку. Пустой файл даёт 0.",
          "inputFormat": "Реализуй file_line_count(path). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "with open('a.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('a\\n\\nb')",
                "file_line_count('a.txt')"
              ],
              "output": "3",
              "explanation": "Пустая средняя строка считается."
            },
            {
              "input": [
                "with open('a.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('a\\nb\\n')",
                "file_line_count('a.txt')"
              ],
              "output": "2",
              "explanation": "Завершающий перенос закрывает вторую строку."
            }
          ],
          "initialCode": "def file_line_count(path):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "file_line_count('a.txt')",
              "expectedValue": 3,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустая средняя строка считается.",
              "setup": "with open('a.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('a\\n\\nb')"
            },
            {
              "expression": "file_line_count('a.txt')",
              "expectedValue": 2,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Завершающий перенос закрывает вторую строку.",
              "setup": "with open('a.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('a\\nb\\n')"
            },
            {
              "expression": "file_line_count('a.txt')",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пусто.",
              "setup": "with open('a.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('')"
            }
          ],
          "reference": "def file_line_count(path):\n    with open(path,encoding=\"utf-8\") as stream:\n        return sum(1 for line in stream)",
          "alternative": "def file_line_count(path):\n    with open(path,encoding=\"utf-8\") as stream:\n        return len(stream.read().splitlines())",
          "wrongSolutions": [
            {
              "code": "def file_line_count(path):\n    with open(path,encoding=\"utf-8\") as stream:\n        return stream.read().count(\"\\n\")",
              "why": "Последняя строка без переноса потеряна."
            },
            {
              "code": "def file_line_count(path):\n    with open(path,encoding=\"utf-8\") as stream:\n        return len(stream.read().split(\"\\n\"))",
              "why": "Завершающий перенос и пустой файл дают лишний элемент."
            }
          ],
          "hints": [
            "Определи строки как записи потока.",
            "Перебор выдаёт каждую строку один раз.",
            "Считай итерации for line in stream."
          ],
          "solutionExplanation": [
            "Примеры различают записи и разделители.",
            "Чтение по строкам не требует хранения всего файла."
          ],
          "required": true
        },
        {
          "id": "data-read-files-task-3",
          "kind": "code",
          "title": "Первая полезная строка файла",
          "goal": "Первая полезная строка файла",
          "prerequisites": [
            "data-read-files"
          ],
          "prompt": "Верни первую строку файла, непустую после strip, в очищенном виде. Если такой нет,None. Файл UTF-8 существует.",
          "inputFormat": "Реализуй first_nonempty(path). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "with open('a.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('\\n  \\n кот \\nпёс')",
                "first_nonempty('a.txt')"
              ],
              "output": "'кот'",
              "explanation": "Пропускаем пустые строки."
            },
            {
              "input": [
                "with open('a.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('\\n \\n')",
                "first_nonempty('a.txt')"
              ],
              "output": "None",
              "explanation": "Только пробелы."
            }
          ],
          "initialCode": "def first_nonempty(path):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "first_nonempty('a.txt')",
              "expectedValue": "кот",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пропускаем пустые строки.",
              "setup": "with open('a.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('\\n  \\n кот \\nпёс')"
            },
            {
              "expression": "first_nonempty('a.txt')",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Только пробелы.",
              "setup": "with open('a.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('\\n \\n')"
            },
            {
              "expression": "first_nonempty('a.txt')",
              "expectedValue": "0",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Текст 0 не пуст.",
              "setup": "with open('a.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('0')"
            }
          ],
          "reference": "def first_nonempty(path):\n    with open(path,encoding=\"utf-8\") as stream:\n        for line in stream:\n            cleaned=line.strip()\n            if cleaned:\n                return cleaned\n    return None",
          "alternative": "def first_nonempty(path):\n    with open(path,encoding=\"utf-8\") as stream:\n        lines=[line.strip() for line in stream if line.strip()]\n    return lines[0] if lines else None",
          "wrongSolutions": [
            {
              "code": "def first_nonempty(path):\n    with open(path,encoding=\"utf-8\") as stream:\n        return stream.readline().strip()",
              "why": "Первая физическая строка может быть пустой."
            },
            {
              "code": "def first_nonempty(path):\n    with open(path,encoding=\"utf-8\") as stream:\n        result=None\n        for line in stream:\n            if line.strip():\n                result=line.strip()\n    return result",
              "why": "Найдена последняя полезная строка вместо первой."
            }
          ],
          "hints": [
            "Нужно искать, а не просто читать первую строку.",
            "При первом совпадении верни очищенный текст.",
            "None возвращается после полного поиска."
          ],
          "solutionExplanation": [
            "Ранний return сочетается с автоматическим закрытием with.",
            "Пустая строка и отсутствие полезной строки различаются контрактом."
          ],
          "required": true
        },
        {
          "id": "data-read-files-task-4",
          "kind": "choice",
          "title": "Когда файл закрывается?",
          "goal": "Когда файл закрывается?",
          "prerequisites": [
            "data-read-files"
          ],
          "prompt": "Выбери все верные утверждения о with open(...) as f.",
          "inputFormat": "Прочитай условие и выбери ответ.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "from io import StringIO\nwith StringIO(\"Привет\") as stream:\n    text=stream.read()\nprint(text)"
              ],
              "output": "Привет\n",
              "explanation": "with завершает работу с потоком, но строка text остаётся обычным значением."
            }
          ],
          "hints": [
            "Вспомни правило из урока «Чтение UTF-8 файла и with» и проверь каждый вариант на конкретном примере.",
            "Сначала исключи варианты, противоречащие наблюдаемому выполнению. Строка — отдельное значение, а постоянное сохранение требует отдельной функции.",
            "Проверь основной аргумент: with управляет сроком работы с ресурсом."
          ],
          "solutionExplanation": [
            "with управляет сроком работы с ресурсом.",
            "Строка — отдельное значение, а постоянное сохранение требует отдельной функции."
          ],
          "required": true,
          "answer": [
            "1",
            "2"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Файл закрывается при выходе из блока."
            },
            {
              "id": "2",
              "text": "Ранний return из блока не отменяет закрытие."
            },
            {
              "id": "3",
              "text": "Сохранённая строка исчезает после закрытия файла."
            },
            {
              "id": "4",
              "text": "with автоматически сохраняет виртуальный файл в Документы."
            }
          ]
        }
      ]
    },
    {
      "id": "data-write-files",
      "title": "Запись, добавление и кодировка",
      "goal": "Выбирать режим файла и проверять реальный записанный результат.",
      "prerequisites": [
        "data-read-files"
      ],
      "role": "lesson",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "data-write-files-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Запись отличается от печати в консоль. print показывает результат в выводе редактора, а stream.write сохраняет текст в открытом потоке. Метод write принимает строку и возвращает число записанных символов, но не добавляет перенос автоматически. Если требуется одна запись на строку, явно допиши\\nили используй print(...,file=stream). Числа сначала преобразуют в строки. Все наши файлы текстовые и используют UTF-8.",
            "Режим\"w\"создаёт файл или очищает существующий перед записью. Это подходит для нового отчёта целиком, но опасно для журнала. Режим\"a\"создаёт файл при необходимости и добавляет новые записи в конец. Режим\"r\"только читает. Не подбирай режим случайно до исчезновения ошибки: сначала определи, должен ли сохраняться прежний текст. Подготовленный тест с непустым файлом проверит это правило."
          ],
          "examples": [
            {
              "id": "data-write-files-example-1",
              "title": "write не добавляет перенос",
              "code": "from io import StringIO\nwith StringIO() as stream:\n    count=stream.write(\"кот\")\n    stream.write(\"пёс\")\n    print(count)\n    print(stream.getvalue())",
              "output": "3\nкотпёс\n",
              "explanation": "Первый write вернул 3 символа. Второй текст присоединился без переноса."
            }
          ],
          "goal": "Выбирать режим файла и проверять реальный записанный результат. Задача и устройство.",
          "prerequisites": [
            "data-read-files"
          ]
        },
        {
          "id": "data-write-files-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "with нужен и при записи. Он закрывает поток и завершает связанные операции при выходе. Если открыть файл вручную и сразу попытаться прочитать его другим потоком без flush или close, можно увидеть неожиданный результат из-за буферизации. Учебный шаблон with позволяет сначала закончить запись, затем отдельно проверить файл. Возврат из with тоже гарантирует закрытие.",
            "encoding=\"utf-8\"задаёт представление кириллицы, но число символов write не равно размеру файла в байтах. Например, русская буква обычно занимает больше одного байта в UTF-8. В задании подсчитываются символы строки, если не сказано иначе. Не используй len(text.encode(...)) для контракта на число символов. Бинарные режимы wb и rb относятся к другому уровню и здесь не требуются."
          ],
          "examples": [
            {
              "id": "data-write-files-example-2",
              "title": "Одна запись на строку",
              "code": "from io import StringIO\nwith StringIO() as stream:\n    for word in [\"кот\",\"пёс\"]:\n        stream.write(word+\"\\n\")\n    print(repr(stream.getvalue()))",
              "output": "'кот\\nпёс\\n'\n",
              "explanation": "Переносы добавлены явно;repr показывает их внутри строки."
            }
          ],
          "goal": "Выбирать режим файла и проверять реальный записанный результат. Порядок выполнения.",
          "prerequisites": [
            "data-write-files-step-1"
          ]
        },
        {
          "id": "data-write-files-step-3",
          "title": "Применение и ошибки",
          "paragraphs": [
            "При копировании с преобразованием сначала дочитай источник, затем открой назначение для записи. Если это один и тотже путь, режим w может стереть данные ещё до чтения. В наших контрактах пути разные, но порядок всёравно лучше сохранить. Результат копирования должен зависеть от содержимого источника, а не от его имени. Проверка после вызова читает твой выходной файл и сравнивает данные.",
            "Файлы этой среды не считаются постоянным хранилищем пользователя. Виртуальный worker изолирован и пересоздаётся для безопасного запуска. Внутри одной попытки можно создавать и читать небольшие файлы, но чтобы ученик получил документ в обычной папке, нужен экспорт через интерфейс. Не обещай, что сам open решает сохранение после обновления. Наш черновик кода сохраняется отдельно механизмом приложения."
          ],
          "examples": [
            {
              "id": "data-write-files-example-3",
              "title": "Символы и байты",
              "code": "text=\"кот\"\nprint(len(text))\nprint(len(text.encode(\"utf-8\")))",
              "output": "3\n6\n",
              "explanation": "Три символа занимают 6 байтов в UTF-8. Контракт должен указать, какая единица нужна."
            }
          ],
          "goal": "Выбирать режим файла и проверять реальный записанный результат. Применение и ошибки.",
          "prerequisites": [
            "data-write-files-step-2"
          ]
        }
      ],
      "exercises": [
        {
          "id": "data-write-files-task-1",
          "kind": "code",
          "title": "Записать точный текст",
          "goal": "Записать точный текст",
          "prerequisites": [
            "data-write-files"
          ],
          "prompt": "Перезапиши UTF-8 файл path точным text. Верни число символов text. Не добавляй перенос.",
          "inputFormat": "Реализуй save_text(path, text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "list((save_text('out.txt','кот'),open('out.txt',encoding='utf-8').read()))"
              ],
              "output": "[3, 'кот']",
              "explanation": "Проверяется и ответ, и реальный файл."
            },
            {
              "input": [
                "with open('out.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('old')",
                "list((save_text('out.txt',''),open('out.txt',encoding='utf-8').read()))"
              ],
              "output": "[0, '']",
              "explanation": "Старый текст должен исчезнуть."
            }
          ],
          "initialCode": "def save_text(path, text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "list((save_text('out.txt','кот'),open('out.txt',encoding='utf-8').read()))",
              "expectedValue": [
                3,
                "кот"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Проверяется и ответ, и реальный файл."
            },
            {
              "expression": "list((save_text('out.txt',''),open('out.txt',encoding='utf-8').read()))",
              "expectedValue": [
                0,
                ""
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Старый текст должен исчезнуть.",
              "setup": "with open('out.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('old')"
            }
          ],
          "reference": "def save_text(path, text):\n    with open(path,\"w\",encoding=\"utf-8\") as stream:\n        return stream.write(text)",
          "alternative": "def save_text(path, text):\n    with open(path,\"w\",encoding=\"utf-8\") as stream:\n        stream.write(text)\n    return len(text)",
          "wrongSolutions": [
            {
              "code": "def save_text(path, text):\n    return len(text)",
              "why": "Файл не создан."
            },
            {
              "code": "def save_text(path, text):\n    with open(path,\"a\",encoding=\"utf-8\") as stream:\n        stream.write(text)\n    return len(text)",
              "why": "Добавление вместо перезаписи сохраняет старый текст."
            }
          ],
          "hints": [
            "Проверь режим: старое содержимое нужно заменить.",
            "write принимает строку и возвращает число символов.",
            "Открой w с UTF-8 и верни write(text)."
          ],
          "solutionExplanation": [
            "Проверка наблюдает файл, а не создаёт ответ вместо решения.",
            "Кириллица отличает символы от байтов."
          ],
          "required": true
        },
        {
          "id": "data-write-files-task-2",
          "kind": "code",
          "title": "Добавить строку журнала",
          "goal": "Добавить строку журнала",
          "prerequisites": [
            "data-write-files"
          ],
          "prompt": "Файл UTF-8 уже существует и пуст либо заканчивается\\n. line не содержит переносов. Добавь line и перенос\\nв конец. Верни число добавленных символов.",
          "inputFormat": "Реализуй append_line(path, line). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "with open('log.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('start\\n')",
                "list((append_line('log.txt','кот'),open('log.txt',encoding='utf-8').read()))"
              ],
              "output": "[4, 'start\\nкот\\n']",
              "explanation": "Старый журнал сохранён."
            },
            {
              "input": [
                "with open('log.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('')",
                "list((append_line('log.txt',''),open('log.txt',encoding='utf-8').read()))"
              ],
              "output": "[1, '\\n']",
              "explanation": "Пустая запись тоже имеет перенос."
            }
          ],
          "initialCode": "def append_line(path, line):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "list((append_line('log.txt','кот'),open('log.txt',encoding='utf-8').read()))",
              "expectedValue": [
                4,
                "start\nкот\n"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Старый журнал сохранён.",
              "setup": "with open('log.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('start\\n')"
            },
            {
              "expression": "list((append_line('log.txt',''),open('log.txt',encoding='utf-8').read()))",
              "expectedValue": [
                1,
                "\n"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустая запись тоже имеет перенос.",
              "setup": "with open('log.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('')"
            }
          ],
          "reference": "def append_line(path, line):\n    with open(path,\"a\",encoding=\"utf-8\") as stream:\n        return stream.write(line+\"\\n\")",
          "alternative": "def append_line(path, line):\n    with open(path,\"a\",encoding=\"utf-8\") as stream:\n        print(line,file=stream)\n    return len(line)+1",
          "wrongSolutions": [
            {
              "code": "def append_line(path, line):\n    with open(path,\"w\",encoding=\"utf-8\") as stream:\n        return stream.write(line+\"\\n\")",
              "why": "Старый журнал стёрт."
            },
            {
              "code": "def append_line(path, line):\n    with open(path,\"a\",encoding=\"utf-8\") as stream:\n        return stream.write(line)",
              "why": "Перенос не добавлен."
            }
          ],
          "hints": [
            "В журнале важно сохранить старое содержимое.",
            "Нужен режима и перенос после новой строки.",
            "Число символов включает один\\n."
          ],
          "solutionExplanation": [
            "Режим a выражает добавление.",
            "Пустая строка неравна отсутствию записанной строки."
          ],
          "required": true
        },
        {
          "id": "data-write-files-task-3",
          "kind": "code",
          "title": "Копия заглавными буквами",
          "goal": "Копия заглавными буквами",
          "prerequisites": [
            "data-write-files"
          ],
          "prompt": "Прочитай существующий UTF-8 файл source, запиши uppercase текста в target, полностью заменив его. Пути разные. Верни число символов выходного текста.",
          "inputFormat": "Реализуй copy_upper(source, target). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "with open('in.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('кот\\nпёс')",
                "list((copy_upper('in.txt','out.txt'),open('out.txt',encoding='utf-8').read()))"
              ],
              "output": "[7, 'КОТ\\nПЁС']",
              "explanation": "Кириллица и перенос сохранены."
            },
            {
              "input": [
                "with open('in.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('')\nwith open('out.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('old')",
                "list((copy_upper('in.txt','out.txt'),open('out.txt',encoding='utf-8').read()))"
              ],
              "output": "[0, '']",
              "explanation": "Пустой источник."
            }
          ],
          "initialCode": "def copy_upper(source, target):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "list((copy_upper('in.txt','out.txt'),open('out.txt',encoding='utf-8').read()))",
              "expectedValue": [
                7,
                "КОТ\nПЁС"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Кириллица и перенос сохранены.",
              "setup": "with open('in.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('кот\\nпёс')"
            },
            {
              "expression": "list((copy_upper('in.txt','out.txt'),open('out.txt',encoding='utf-8').read()))",
              "expectedValue": [
                0,
                ""
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой источник.",
              "setup": "with open('in.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('')\nwith open('out.txt', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('old')"
            }
          ],
          "reference": "def copy_upper(source, target):\n    with open(source,encoding=\"utf-8\") as stream:\n        text=stream.read().upper()\n    with open(target,\"w\",encoding=\"utf-8\") as stream:\n        return stream.write(text)",
          "alternative": "def copy_upper(source, target):\n    parts=[]\n    with open(source,encoding=\"utf-8\") as stream:\n        for line in stream:\n            parts.append(line.upper())\n    result=\"\".join(parts)\n    with open(target,\"w\",encoding=\"utf-8\") as stream:\n        stream.write(result)\n    return len(result)",
          "wrongSolutions": [
            {
              "code": "def copy_upper(source, target):\n    with open(target,\"w\",encoding=\"utf-8\") as f:\n        return f.write(source.upper())",
              "why": "Обработано имя пути вместо содержимого."
            },
            {
              "code": "def copy_upper(source, target):\n    with open(source,encoding=\"utf-8\") as f:\n        text=f.read().upper()\n    with open(target,\"a\",encoding=\"utf-8\") as f:\n        return f.write(text)",
              "why": "Вместо замены добавлено старому содержимому."
            }
          ],
          "hints": [
            "Сначала данные, затем преобразование, затем запись.",
            "Не путай строку пути и полученный текст.",
            "Прочитай source через read, примени upper, открой target в w."
          ],
          "solutionExplanation": [
            "Число возвращает write действительного результата.",
            "Пустой источник должен очистить старый выход."
          ],
          "required": true
        },
        {
          "id": "data-write-files-task-4",
          "kind": "choice",
          "title": "Режим для журнала",
          "goal": "Режим для журнала",
          "prerequisites": [
            "data-write-files"
          ],
          "prompt": "Какой режим сохраняет старый текст и добавляет новые записи в конец?",
          "inputFormat": "Прочитай условие и выбери ответ.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "from io import StringIO\nwith StringIO() as stream:\n    count=stream.write(\"кот\")\n    stream.write(\"пёс\")\n    print(count)\n    print(stream.getvalue())"
              ],
              "output": "3\nкотпёс\n",
              "explanation": "Первый write вернул 3 символа. Второй текст присоединился без переноса."
            }
          ],
          "hints": [
            "Вспомни правило из урока «Запись, добавление и кодировка» и проверь каждый вариант на конкретном примере.",
            "Сначала исключи варианты, противоречащие наблюдаемому выполнению. r не предназначен для записи.",
            "Проверь основной аргумент: a добавляет, а w сначала очищает существующий файл."
          ],
          "solutionExplanation": [
            "a добавляет, а w сначала очищает существующий файл.",
            "r не предназначен для записи."
          ],
          "required": true,
          "answer": [
            "1"
          ],
          "choices": [
            {
              "id": "1",
              "text": "a"
            },
            {
              "id": "2",
              "text": "w"
            },
            {
              "id": "3",
              "text": "r"
            }
          ]
        }
      ]
    },
    {
      "id": "data-json",
      "title": "JSON: структура, разбор и сериализация",
      "goal": "Переводить вложенные данные в текст и обратно без выполнения кода.",
      "prerequisites": [
        "data-write-files"
      ],
      "role": "lesson",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "data-json-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "JSON — текстовый формат обмена данными. В нём есть объекты с ключами-строками, массивы, строки, числа, true, false и null. После json.loads текст превращается в обычные объекты Python: dict, list, str, числа, True, False и None. Это разбор данных, а не выполнение программы. Не используй eval для чтения JSON: кроме риска исполнения кода, синтаксис true и null отличается от Python.",
            "loads принимает строку и возвращает структуру; dumps принимает структуру и возвращает строку. Буква s напоминает о строке. load и dump работают с открытым файловым объектом. Не передавай имя файла в loads, ожидая автоматического чтения. Сначала получи текст через read либо используй json.load(stream) внутри with. Результат разбора можно обрабатывать уже знакомыми условиями и циклами."
          ],
          "examples": [
            {
              "id": "data-json-example-1",
              "title": "Строка превращается в структуру",
              "code": "import json\ndata=json.loads('{\"name\":\"Аня\",\"active\":true,\"age\":null}')\nprint(data[\"name\"])\nprint(data[\"active\"])\nprint(data[\"age\"] is None)",
              "output": "Аня\nTrue\nTrue\n",
              "explanation": "JSON true и null стали Python True и None."
            }
          ],
          "goal": "Переводить вложенные данные в текст и обратно без выполнения кода. Задача и устройство.",
          "prerequisites": [
            "data-write-files"
          ]
        },
        {
          "id": "data-json-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Корректный JSON ещё не гарантирует нужную схему. Текст может быть массивом вместо словаря или содержать поле amount со строкой вместо числа. В некоторых упражнениях схема объявлена правильной заранее; в валидаторах её нужно проверить отдельно. JSONDecodeError относится к неверной записи самого формата. Не перехватывай им все ошибки последующей обработки: иначе KeyError из-за неверного ожидания ключа будет скрыт.",
            "По умолчанию dumps может записывать кириллицу через Unicode-последовательности. ensure_ascii=False оставляет её читаемой; оба варианта могут описывать те же данные. Для точного текстового формата отдельно задают отступы, разделители и сортировку ключей. В большинстве упражнений проверка разбирает возвращённую JSON-строку и сравнивает структуру, поэтому корректное оформление пробелов не мешает содержательному решению."
          ],
          "examples": [
            {
              "id": "data-json-example-2",
              "title": "Структура превращается в строку",
              "code": "import json\ntext=json.dumps({\"город\":\"Алматы\",\"count\":2},ensure_ascii=False,sort_keys=True)\nprint(text)",
              "output": "{\"count\": 2, \"город\": \"Алматы\"}\n",
              "explanation": "ensure_ascii=False сохраняет читаемую кириллицу; sort_keys делает порядок текста определённым."
            }
          ],
          "goal": "Переводить вложенные данные в текст и обратно без выполнения кода. Порядок выполнения.",
          "prerequisites": [
            "data-json-step-1"
          ]
        },
        {
          "id": "data-json-step-3",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Преобразование не сохраняет любой Python-объект безусловно. Кортеж превращается в массив, набор напрямую не сериал из у ется стандартным encoder, ключи JSON должны быть строками. Для базового курса мы используем простые словари, списки, числа, строки, bool и None. Не обещай, что dumps автоматически сохраняет произвольный класс с его поведением. Это формат данных, а не перенос всей работающей программы.",
            "Проверяй пустой список, отсутствующее необязательное поле, нулевое значение и кириллицу. При ошибке выделяй этап: текст не разобран или структура не подходит контракту? Такой вопрос определяет, нужен ли обработчик JSONDecodeError или проверка условий после loads. Дальше мы сравним JSON с CSV, где строки таблицы не несут тех же встроенных числовых типов."
          ],
          "examples": [
            {
              "id": "data-json-example-3",
              "title": "Пустой массив тоже данные",
              "code": "import json\nvalues=json.loads(\"[]\")\nprint(type(values).__name__)\nprint(sum(values))",
              "output": "list\n0\n",
              "explanation": "Пустой массив становится списком, его сумма равна 0."
            }
          ],
          "goal": "Переводить вложенные данные в текст и обратно без выполнения кода. Применение и ошибки.",
          "prerequisites": [
            "data-json-step-2"
          ]
        }
      ],
      "exercises": [
        {
          "id": "data-json-task-1",
          "kind": "code",
          "title": "Сумма JSON-массива",
          "goal": "Сумма JSON-массива",
          "prerequisites": [
            "data-json"
          ],
          "prompt": "text — корректный JSON-массив целых чисел. Верни их сумму. Пустой массив даёт 0.",
          "inputFormat": "Реализуй json_total(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "json_total('[2,-3,5]')"
              ],
              "output": "4",
              "explanation": "Сумма числовых значений."
            },
            {
              "input": [
                "json_total('[]')"
              ],
              "output": "0",
              "explanation": "Пустой массив."
            }
          ],
          "initialCode": "def json_total(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "json_total('[2,-3,5]')",
              "expectedValue": 4,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сумма числовых значений."
            },
            {
              "expression": "json_total('[]')",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой массив."
            },
            {
              "expression": "json_total('[0,0]')",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нули — полноценные значения."
            }
          ],
          "reference": "import json\ndef json_total(text):\n    return sum(json.loads(text))",
          "alternative": "import json\ndef json_total(text):\n    total=0\n    for value in json.loads(text):\n        total+=value\n    return total",
          "wrongSolutions": [
            {
              "code": "def json_total(text):\n    return sum(text)",
              "why": "Текст не разобран в числа."
            },
            {
              "code": "import json\ndef json_total(text):\n    return len(json.loads(text))",
              "why": "Посчитаны элементы вместо суммы."
            }
          ],
          "hints": [
            "Сначала переведи текст в структуру.",
            "loads вернёт список чисел.",
            "Просуммируй разобранный список."
          ],
          "solutionExplanation": [
            "Формат ввода и вычисление разделены.",
            "Проверка не подставляет данные за функцию."
          ],
          "required": true
        },
        {
          "id": "data-json-task-2",
          "kind": "code",
          "title": "Необязательное имя из JSON",
          "goal": "Необязательное имя из JSON",
          "prerequisites": [
            "data-json"
          ],
          "prompt": "text — корректный JSON-объект. Верни значение поля name; если поля нет,None. По контракту существующее name — строка, включая пустую.",
          "inputFormat": "Реализуй json_name(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "json_name('{\"name\":\"Аня\"}')"
              ],
              "output": "'Аня'",
              "explanation": "Кириллица сохраняется."
            },
            {
              "input": [
                "json_name('{}')"
              ],
              "output": "None",
              "explanation": "Отсутствующий ключ."
            }
          ],
          "initialCode": "def json_name(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "json_name('{\"name\":\"Аня\"}')",
              "expectedValue": "Аня",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Кириллица сохраняется."
            },
            {
              "expression": "json_name('{}')",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Отсутствующий ключ."
            },
            {
              "expression": "json_name('{\"name\":\"\"}')",
              "expectedValue": "",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустое значение не отсутствует."
            }
          ],
          "reference": "import json\ndef json_name(text):\n    return json.loads(text).get(\"name\")",
          "alternative": "import json\ndef json_name(text):\n    data=json.loads(text)\n    if \"name\" in data:\n        return data[\"name\"]\n    return None",
          "wrongSolutions": [
            {
              "code": "import json\ndef json_name(text):\n    return json.loads(text)[\"name\"]",
              "why": "Отсутствующий ключ вызывает KeyError."
            },
            {
              "code": "import json\ndef json_name(text):\n    return json.loads(text).get(\"name\") or None",
              "why": "Пустая строка ошибочно превращена в None."
            }
          ],
          "hints": [
            "После loads работаешь с обычным словарём.",
            "Отсутствие ключа отлично от пустой строки.",
            "Используй get без проверки истинности полученной строки."
          ],
          "solutionExplanation": [
            "Необязательное поле получает явный контракт.",
            "Пустой текст имени сохраняется как значение."
          ],
          "required": true
        },
        {
          "id": "data-json-task-3",
          "kind": "code",
          "title": "Сериал из овать сводку",
          "goal": "Сериал из овать сводку",
          "prerequisites": [
            "data-json"
          ],
          "prompt": "Верни JSON-строку объекта с полями name и total (сумма чисел values). Данные должны разбираться стандартным json.loads. Пробелы и порядок ключей не важны.",
          "inputFormat": "Реализуй encode_summary(name, values). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "__import__('json').loads(encode_summary('Аня',[2,3]))"
              ],
              "output": "{'name': 'Аня', 'total': 5}",
              "explanation": "Проверяется структура возвращённого JSON."
            },
            {
              "input": [
                "__import__('json').loads(encode_summary('',[]))"
              ],
              "output": "{'name': '', 'total': 0}",
              "explanation": "Пустое имя и набор допустимы."
            }
          ],
          "initialCode": "def encode_summary(name, values):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "__import__('json').loads(encode_summary('Аня',[2,3]))",
              "expectedValue": {
                "name": "Аня",
                "total": 5
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Проверяется структура возвращённого JSON."
            },
            {
              "expression": "__import__('json').loads(encode_summary('',[]))",
              "expectedValue": {
                "name": "",
                "total": 0
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустое имя и набор допустимы."
            }
          ],
          "reference": "import json\ndef encode_summary(name, values):\n    return json.dumps({\"name\":name,\"total\":sum(values)},ensure_ascii=False)",
          "alternative": "import json\ndef encode_summary(name, values):\n    total=0\n    for value in values:\n        total+=value\n    return json.dumps(dict(name=name,total=total))",
          "wrongSolutions": [
            {
              "code": "def encode_summary(name, values):\n    return str({\"name\":name,\"total\":sum(values)})",
              "why": "repr словаря не является JSON: одиночные кавычки."
            },
            {
              "code": "import json\ndef encode_summary(name, values):\n    return json.dumps({\"name\":name,\"total\":len(values)})",
              "why": "В total попало количество, не сумма."
            }
          ],
          "hints": [
            "Нужен сериал и затор, а не str словаря.",
            "Собери объект из двух вычисленных полей.",
            "Передай его json.dumps; кириллица допустима в обоих вариантах encoder."
          ],
          "solutionExplanation": [
            "JSON разбирается проверкой только для наблюдения ответа.",
            "Оформление строки не подменяет проверку содержимого."
          ],
          "required": true
        },
        {
          "id": "data-json-task-4",
          "kind": "choice",
          "title": "loads или dumps?",
          "goal": "loads или dumps?",
          "prerequisites": [
            "data-json"
          ],
          "prompt": "Какие утверждения верны?",
          "inputFormat": "Прочитай условие и выбери ответ.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "import json\ndata=json.loads('{\"name\":\"Аня\",\"active\":true,\"age\":null}')\nprint(data[\"name\"])\nprint(data[\"active\"])\nprint(data[\"age\"] is None)"
              ],
              "output": "Аня\nTrue\nTrue\n",
              "explanation": "JSON true и null стали Python True и None."
            }
          ],
          "hints": [
            "Вспомни правило из урока «JSON: структура, разбор и сериализация» и проверь каждый вариант на конкретном примере.",
            "Сначала исключи варианты, противоречащие наблюдаемому выполнению. Сериализация не исполняет код и не совпадает с произвольным строковым представлением.",
            "Проверь основной аргумент: Разбор формата и проверка схемы — разные этапы."
          ],
          "solutionExplanation": [
            "Разбор формата и проверка схемы — разные этапы.",
            "Сериализация не исполняет код и не совпадает с произвольным строковым представлением."
          ],
          "required": true,
          "answer": [
            "1",
            "3"
          ],
          "choices": [
            {
              "id": "1",
              "text": "loads превращает JSON-строку в структуру Python."
            },
            {
              "id": "2",
              "text": "dumps выполняет произвольный Python-код."
            },
            {
              "id": "3",
              "text": "Корректный JSON может иметь неподходящую схему данных."
            },
            {
              "id": "4",
              "text": "str(dict) всегда является корректным JSON."
            }
          ]
        }
      ]
    },
    {
      "id": "data-csv",
      "title": "CSV: строки таблицы и кавычки",
      "goal": "Разбирать таблицы, преобразовывать числа и писать корректный CSV.",
      "prerequisites": [
        "data-json"
      ],
      "role": "lesson",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "data-csv-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "CSV хранит таблицу в тексте: каждая запись обычно занимает строку, поля разделены запятой. Но простое line.split(\",\") недостаточно, если само поле содержит запятую: имя \"Алматы, центр\" заключают в кавычки. Стандартный модуль csv знает правила экранирования. Уже нужны import, текстовые потоки и преобразование строк в числа. В упражнениях применяется стандартный разделитель запятая и понятная схема столбцов.",
            "csv.reader(stream) последовательно возвращает списки строк. Число\"12\" остаётся строкой, пока ты не выполнишь int. Первая строка может быть заголовком; если контракт его объявляет, пропусти её явно через next(reader, None). Второй аргумент None позволяет обработать пустой файл без StopIteration. Не пропускай первую строку по привычке, если заголовка нет: это потеряет настоящие данные."
          ],
          "examples": [
            {
              "id": "data-csv-example-1",
              "title": "Запятая внутри поля",
              "code": "import csv\nfrom io import StringIO\nrows=list(csv.reader(StringIO('name,count\\n\"a,b\",2\\n')))\nprint(rows)",
              "output": "[['name', 'count'], ['a,b', '2']]\n",
              "explanation": "Кавычки сохраняют a,b одним полем, а не двумя."
            }
          ],
          "goal": "Разбирать таблицы, преобразовывать числа и писать корректный CSV. Задача и устройство.",
          "prerequisites": [
            "data-json"
          ]
        },
        {
          "id": "data-csv-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "DictReader использует заголовок как имена ключей и возвращает словари по строкам. Это удобно, когда важно имя столбца. Но проверка схемы всё равно нужна, если источник не гарантирован. Для начинающего лучше сначала понять reader с индексами, затем словарный вариант. Данные остаются текстовыми в обоих случаях; стандартный csv не угадывает за тебя возраст, цену или допустимость отрицательного количества.",
            "csv.writer записывает поля с нужными кавычками. writerow пишет одну запись, writerows — несколько. Если нужен определённый перенос, задают lineterminator=\"\\n\". При открытии настоящего текстового файла для csv обычно используют newline=\"\" вместе с encoding=\"utf-8\", чтобы модуль сам управлял переводами строк. Для тестирования с готовой строкой подходит StringIO без работы с диском."
          ],
          "examples": [
            {
              "id": "data-csv-example-2",
              "title": "Число всё ещё строка",
              "code": "import csv\nfrom io import StringIO\nreader=csv.DictReader(StringIO(\"name,count\\nчай,3\\n\"))\nrow=next(reader)\nprint(type(row[\"count\"]).__name__)\nprint(int(row[\"count\"])*2)",
              "output": "str\n6\n",
              "explanation": "csv возвращает текст. Преобразование нужно до арифметики."
            }
          ],
          "goal": "Разбирать таблицы, преобразовывать числа и писать корректный CSV. Порядок выполнения.",
          "prerequisites": [
            "data-csv-step-1"
          ]
        },
        {
          "id": "data-csv-step-3",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Не собирай CSV вручную через join, если допускаются запятые, кавычки или переносы внутри поля. Метод join прекрасен для строки списка слов, но не реализует формат таблицы. Сравни два результата на имени\"a,b\": правильный CSV содержит одно поле в кавычках, а наивный — два поля. Проверка кругового чтения writer→reader позволяет увидеть эту ошибку без сложных данных.",
            "Проверяй таблицу только с заголовком, пустой текст, число 0 и имя с разделителем. В этом курсе не подразумеваются автоматические импорт Excel, доступ к сети или безопасность неизвестного файла. Сейчас нужно научиться честно разбирать текст по схеме, не путая количество строк с суммой количеств и не подменяя отсутствующие данные нулём без контракта."
          ],
          "examples": [
            {
              "id": "data-csv-example-3",
              "title": "Writer экранирует сам",
              "code": "import csv\nfrom io import StringIO\nstream=StringIO()\ncsv.writer(stream,lineterminator=\"\\n\").writerow([\"a,b\",2])\nprint(repr(stream.getvalue()))",
              "output": "'\"a,b\",2\\n'\n",
              "explanation": "writer добавляет кавычки к полю с запятой и явный перенос записи."
            }
          ],
          "goal": "Разбирать таблицы, преобразовывать числа и писать корректный CSV. Применение и ошибки.",
          "prerequisites": [
            "data-csv-step-2"
          ]
        }
      ],
      "exercises": [
        {
          "id": "data-csv-task-1",
          "kind": "code",
          "title": "Имена из таблицы",
          "goal": "Имена из таблицы",
          "prerequisites": [
            "data-csv"
          ],
          "prompt": "text — CSV с заголовком name,count или пустая строка. Верни имена записей в исходном порядке. Поля корректны; имена могут содержать запятую.",
          "inputFormat": "Реализуй csv_names(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "csv_names('name,count\\n\"a,b\",2\\nкот,0\\n')"
              ],
              "output": "['a,b', 'кот']",
              "explanation": "Кавычки защищают запятую."
            },
            {
              "input": [
                "csv_names('name,count\\n')"
              ],
              "output": "[]",
              "explanation": "Только заголовок."
            }
          ],
          "initialCode": "def csv_names(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "csv_names('name,count\\n\"a,b\",2\\nкот,0\\n')",
              "expectedValue": [
                "a,b",
                "кот"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Кавычки защищают запятую."
            },
            {
              "expression": "csv_names('name,count\\n')",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Только заголовок."
            },
            {
              "expression": "csv_names('')",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой текст."
            }
          ],
          "reference": "import csv\nfrom io import StringIO\ndef csv_names(text):\n    return [row[\"name\"] for row in csv.DictReader(StringIO(text))]",
          "alternative": "import csv\nfrom io import StringIO\ndef csv_names(text):\n    reader=csv.reader(StringIO(text))\n    next(reader,None)\n    return [row[0] for row in reader]",
          "wrongSolutions": [
            {
              "code": "def csv_names(text):\n    return [line.split(\",\")[0] for line in text.splitlines()[1:]]",
              "why": "Поле с запятой разобрано неправильно."
            },
            {
              "code": "import csv\nfrom io import StringIO\ndef csv_names(text):\n    return [row[0] for row in csv.reader(StringIO(text))]",
              "why": "Заголовок ошибочно попал в данные."
            }
          ],
          "hints": [
            "Нужен parserCSV, а не split запятой.",
            "Заголовок описывает поля, ноне является записью.",
            "Используй DictReader и выбирай name."
          ],
          "solutionExplanation": [
            "Модуль учитывает кавычки.",
            "Пустой текст и таблица без записей дают пустой список."
          ],
          "required": true
        },
        {
          "id": "data-csv-task-2",
          "kind": "code",
          "title": "Сумма количества CSV",
          "goal": "Сумма количества CSV",
          "prerequisites": [
            "data-csv"
          ],
          "prompt": "text — корректный CSV с заголовком name,count или пусто. count — неотрицательное целое в тексте. Верни сумму всех count.",
          "inputFormat": "Реализуй csv_quantity(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "csv_quantity('name,count\\na,2\\nb,5\\n')"
              ],
              "output": "7",
              "explanation": "Сумма, не число строк."
            },
            {
              "input": [
                "csv_quantity('name,count\\na,0\\n')"
              ],
              "output": "0",
              "explanation": "Нулевая запись."
            }
          ],
          "initialCode": "def csv_quantity(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "csv_quantity('name,count\\na,2\\nb,5\\n')",
              "expectedValue": 7,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сумма, не число строк."
            },
            {
              "expression": "csv_quantity('name,count\\na,0\\n')",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевая запись."
            },
            {
              "expression": "csv_quantity('')",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустая сумма."
            }
          ],
          "reference": "import csv\nfrom io import StringIO\ndef csv_quantity(text):\n    return sum(int(row[\"count\"]) for row in csv.DictReader(StringIO(text)))",
          "alternative": "import csv\nfrom io import StringIO\ndef csv_quantity(text):\n    rows=csv.reader(StringIO(text))\n    next(rows,None)\n    total=0\n    for row in rows:\n        total+=int(row[1])\n    return total",
          "wrongSolutions": [
            {
              "code": "import csv\nfrom io import StringIO\ndef csv_quantity(text):\n    return len(list(csv.DictReader(StringIO(text))))",
              "why": "Подсчитаны записи, не количество."
            },
            {
              "code": "import csv\nfrom io import StringIO\ndef csv_quantity(text):\n    return sum(row[\"count\"] for row in csv.DictReader(StringIO(text)))",
              "why": "Числа по-прежнему строки."
            }
          ],
          "hints": [
            "Чтение CSV не превращает поля в числа автоматически.",
            "В каждом ряду нужен int от count.",
            "Просуммируй преобразованные значения."
          ],
          "solutionExplanation": [
            "Контракт схемы отделён от суммирования.",
            "Случай count=5 различает количество предметов и число записей."
          ],
          "required": true
        },
        {
          "id": "data-csv-task-3",
          "kind": "code",
          "title": "Записать одну CSV-запись",
          "goal": "Записать одну CSV-запись",
          "prerequisites": [
            "data-csv"
          ],
          "prompt": "Верни строку CSV из одной записи с двумя полями name,count и одним завершающим\\n. count — целое. name может содержать запятую и кавычки.",
          "inputFormat": "Реализуй csv_row(name, count). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "csv_row('a,b',2)"
              ],
              "output": "'\"a,b\",2\\n'",
              "explanation": "Запятая внутри поля экранирована."
            },
            {
              "input": [
                "csv_row('кот',0)"
              ],
              "output": "'кот,0\\n'",
              "explanation": "Обычная запись."
            }
          ],
          "initialCode": "def csv_row(name, count):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "csv_row('a,b',2)",
              "expectedValue": "\"a,b\",2\n",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Запятая внутри поля экранирована."
            },
            {
              "expression": "csv_row('кот',0)",
              "expectedValue": "кот,0\n",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Обычная запись."
            },
            {
              "expression": "csv_row('a\"b',1)",
              "expectedValue": "\"a\"\"b\",1\n",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Кавычка в поле удваивается."
            }
          ],
          "reference": "import csv\nfrom io import StringIO\ndef csv_row(name, count):\n    stream=StringIO()\n    csv.writer(stream,lineterminator=\"\\n\").writerow([name,count])\n    return stream.getvalue()",
          "alternative": "import csv\nfrom io import StringIO\ndef csv_row(name, count):\n    with StringIO() as stream:\n        writer=csv.writer(stream,lineterminator=\"\\n\")\n        writer.writerows([[name,str(count)]])\n        result=stream.getvalue()\n    return result",
          "wrongSolutions": [
            {
              "code": "def csv_row(name, count):\n    return f\"{name},{count}\\n\"",
              "why": "Ручная склейка не экранирует поля с запятой и кавычками."
            },
            {
              "code": "import csv\nfrom io import StringIO\ndef csv_row(name, count):\n    s=StringIO()\n    csv.writer(s).writerow([name,count])\n    return s.getvalue()",
              "why": "Стандартный перенос writer — \\r\\n, а контракт объявляет\\n."
            }
          ],
          "hints": [
            "Кавычки должен обработать writer.",
            "Для точного переноса нужен lineterminator.",
            "Запиши одну запись в StringIO и верни getvalue()."
          ],
          "solutionExplanation": [
            "Формат проверяется на разделителе и кавычке.",
            "Условие явно задаёт перенос, поэтому он не является скрытой деталью."
          ],
          "required": true
        },
        {
          "id": "data-csv-task-4",
          "kind": "explain",
          "title": "Почему не split(\",\")?",
          "goal": "Почему не split(\",\")?",
          "prerequisites": [
            "data-csv"
          ],
          "prompt": "Почему\"a,b\",2 нельзя надёжно разобрать простым split(\",\")?",
          "inputFormat": "Прочитай условие и выбери ответ.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "import csv\nfrom io import StringIO\nrows=list(csv.reader(StringIO('name,count\\n\"a,b\",2\\n')))\nprint(rows)"
              ],
              "output": "[['name', 'count'], ['a,b', '2']]\n",
              "explanation": "Кавычки сохраняют a,b одним полем, а не двумя."
            }
          ],
          "hints": [
            "Вспомни правило из урока «CSV: строки таблицы и кавычки» и проверь каждый вариант на конкретном примере.",
            "Сначала исключи варианты, противоречащие наблюдаемому выполнению. Простое разделение по запятой теряет границы полей.",
            "Проверь основной аргумент: Parser учитывает кавычки и экранирование."
          ],
          "solutionExplanation": [
            "Parser учитывает кавычки и экранирование.",
            "Простое разделение по запятой теряет границы полей."
          ],
          "required": true,
          "answer": [
            "1"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Запятая в кавычках может быть частью поля."
            },
            {
              "id": "2",
              "text": "CSV не поддерживает строки."
            },
            {
              "id": "3",
              "text": "Все CSV поля автоматически числовые."
            }
          ]
        }
      ]
    },
    {
      "id": "data-pipeline",
      "title": "Разбор, проверка и накопление по этапам",
      "goal": "Не смешивать формат, допустимость и итоговые показатели.",
      "prerequisites": [
        "data-csv"
      ],
      "role": "lesson",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "data-pipeline-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Полезная обработка данных состоит из нескольких разных договорённостей. Parser переводит текст в структуру; валидатор проверяет поля; вычисление получает допустимые записи; оформление превращает ответ в удобный документ. Если все этапы спрятаны в одном выражении, трудно понять, где потерялась запись. Ты уже умеешь читать CSV и JSON, поэтому теперь важно организовать обработку, а не изучить ещё один формат.",
            "Корректный JSON может содержать неверное количество: число-2 или строку\"два\". Корректный CSV также не гарантирует, что цена неотрицательна. Проверяй правила после разбора. В условиях этого урока типы некоторых полей гарантированы, другие нужно исследовать. Явно отличай эти случаи: не добавляй поддержку произвольных объектов, если контракт ограничен списком словарей, но и не доверяй полю, для которого требуется проверка."
          ],
          "examples": [
            {
              "id": "data-pipeline-example-1",
              "title": "Сумма по повторяющемуся ключу",
              "code": "totals={}\nfor name,amount in [(\"чай\",2),(\"хлеб\",3),(\"чай\",4)]:\n    totals[name]=totals.get(name,0)+amount\nprint(totals)",
              "output": "{'чай': 6, 'хлеб': 3}\n",
              "explanation": "При повторении ключа его предыдущая сумма сохраняется и увеличивается."
            }
          ],
          "goal": "Не смешивать формат, допустимость и итоговые показатели. Задача и устройство.",
          "prerequisites": [
            "data-csv"
          ]
        },
        {
          "id": "data-pipeline-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "При пропуске неверных записей сохраняй порядок оставшихся, если задача не просит сортировку. Повторяющиеся записи тоже не ошибка сами по себе: две покупки одного товара могут быть двумя событиями. Для итоговой частоты их объединяют суммированием, а для журнала сохраняют отдельно. Выбор структуры зависит от вопроса. Словарь накопителя не должен перезаписывать предыдущую сумму при каждом совпадающем ключе.",
            "Для простого конфигурационного текста key=value отделяй только первый знак равенства: значение само может содержать=. Строки комментария и пустые строки пропускаются по объявленному правилу. Если ключ повторяется, реши заранее, побеждает ли последняя запись. В наших настройках именно последняя. Нельзя переносить это правило на любой формат автоматически: это часть конкретной схемы."
          ],
          "examples": [
            {
              "id": "data-pipeline-example-2",
              "title": "Только первое равенство",
              "code": "line=\"token = a=b\"\nkey,value=line.split(\"=\",1)\nprint(key.strip())\nprint(value.strip())",
              "output": "token\na=b\n",
              "explanation": "Значение a=b сохраняется целиком; разделяется только первый знак."
            }
          ],
          "goal": "Не смешивать формат, допустимость и итоговые показатели. Порядок выполнения.",
          "prerequisites": [
            "data-pipeline-step-1"
          ]
        },
        {
          "id": "data-pipeline-step-3",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Нормализация должна быть предсказуемой. strip у ключа и значения убирает внешние пробелы, но не меняет пробелы внутри. lower допустим только если регистр не несёт смысла. Не превращай отрицательное число в положительное через abs ради прохождения диапазона: это скрытое исправление исходных данных. Возврат ошибки или пропуск по контракту честнее, чем создание нового факта за пользователя.",
            "Для проверки этапов возьми короткий набор: одна допустимая запись, одна с границей, одна неверная и повторяющийся ключ. Проследи число записей после каждого этапа. Если итоговая сумма не сходится, сначала проверь отбор, затем накопление, затем форматирование. Такой порядок пригодится в мини-проекте расходов и обеих итоговых работах, где данные проходят несколько преобразований."
          ],
          "examples": [
            {
              "id": "data-pipeline-example-3",
              "title": "Отбор без исправления",
              "code": "rows=[{\"name\":\"а\",\"count\":2},{\"name\":\"б\",\"count\":-1}]\nselected=[r for r in rows if r[\"count\"]>=0]\nprint(selected)\nprint(rows[1][\"count\"])",
              "output": "[{'name': 'а', 'count': 2}]\n-1\n",
              "explanation": "Неверная запись пропущена, но источник не подменён другим числом."
            }
          ],
          "goal": "Не смешивать формат, допустимость и итоговые показатели. Применение и ошибки.",
          "prerequisites": [
            "data-pipeline-step-2"
          ]
        }
      ],
      "exercises": [
        {
          "id": "data-pipeline-task-1",
          "kind": "code",
          "title": "Сумма количеств по товару",
          "goal": "Сумма количеств по товару",
          "prerequisites": [
            "data-pipeline"
          ],
          "prompt": "rows — список словарей name(строка),count(неотрицательное целое). Верни словарь суммарных count по имени. Нулевые товары сохраняй.",
          "inputFormat": "Реализуй product_totals(rows). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "product_totals([{'name':'чай','count':2},{'name':'чай','count':3},{'name':'хлеб','count':0}])"
              ],
              "output": "{'чай': 5, 'хлеб': 0}",
              "explanation": "Повторения складываются."
            },
            {
              "input": [
                "product_totals([])"
              ],
              "output": "{}",
              "explanation": "Пустой набор."
            }
          ],
          "initialCode": "def product_totals(rows):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "product_totals([{'name':'чай','count':2},{'name':'чай','count':3},{'name':'хлеб','count':0}])",
              "expectedValue": {
                "чай": 5,
                "хлеб": 0
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Повторения складываются."
            },
            {
              "expression": "product_totals([])",
              "expectedValue": {},
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой набор."
            }
          ],
          "reference": "def product_totals(rows):\n    result={}\n    for row in rows:\n        name=row[\"name\"]\n        result[name]=result.get(name,0)+row[\"count\"]\n    return result",
          "alternative": "def product_totals(rows):\n    names={row[\"name\"] for row in rows}\n    return {name:sum(row[\"count\"] for row in rows if row[\"name\"]==name) for name in names}",
          "wrongSolutions": [
            {
              "code": "def product_totals(rows):\n    return {row[\"name\"]:row[\"count\"] for row in rows}",
              "why": "Повторный товар перезаписывает предыдущую сумму."
            },
            {
              "code": "def product_totals(rows):\n    result={}\n    for r in rows:\n        if r[\"count\"]:\n            result[r[\"name\"]]=result.get(r[\"name\"],0)+r[\"count\"]\n    return result",
              "why": "Нулевые товары потеряны."
            }
          ],
          "hints": [
            "На каждый товар нужен свой накопитель.",
            "Начальная сумма отсутствующего ключа 0.",
            "Всегда присваивай старую сумму плюс текущее количество, включая ноль."
          ],
          "solutionExplanation": [
            "Перезапись и накопление дают разные ответы.",
            "Нулевой итог не означает отсутствие товара."
          ],
          "required": true
        },
        {
          "id": "data-pipeline-task-2",
          "kind": "code",
          "title": "Настройки из текста",
          "goal": "Настройки из текста",
          "prerequisites": [
            "data-pipeline"
          ],
          "prompt": "Строки формата key=value: удали внешние пробелы у ключа и значения. Пустые строки, строки с#после strip и строки без=пропускай. Пустой ключ пропускай. Последний повтор ключа побеждает. Значение может содержать=.",
          "inputFormat": "Реализуй parse_settings(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "parse_settings(' a = 1\\n# note\\na=2\\ntoken=a=b\\n=bad\\nwrong')"
              ],
              "output": "{'a': '2', 'token': 'a=b'}",
              "explanation": "Первое равенство и последний повтор."
            },
            {
              "input": [
                "parse_settings('empty=\\n')"
              ],
              "output": "{'empty': ''}",
              "explanation": "Пустое значение допустимо."
            }
          ],
          "initialCode": "def parse_settings(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "parse_settings(' a = 1\\n# note\\na=2\\ntoken=a=b\\n=bad\\nwrong')",
              "expectedValue": {
                "a": "2",
                "token": "a=b"
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Первое равенство и последний повтор."
            },
            {
              "expression": "parse_settings('empty=\\n')",
              "expectedValue": {
                "empty": ""
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустое значение допустимо."
            },
            {
              "expression": "parse_settings('')",
              "expectedValue": {},
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет настроек."
            }
          ],
          "reference": "def parse_settings(text):\n    result={}\n    for line in text.splitlines():\n        line=line.strip()\n        if not line or line.startswith(\"#\") or \"=\" not in line:\n            continue\n        key,value=line.split(\"=\",1)\n        key=key.strip()\n        if key:\n            result[key]=value.strip()\n    return result",
          "alternative": "def parse_settings(text):\n    result={}\n    for raw in text.splitlines():\n        cleaned=raw.strip()\n        if cleaned and cleaned[0]!=\"#\" and \"=\" in cleaned:\n            key,_,value=cleaned.partition(\"=\")\n            if key.strip():\n                result[key.strip()]=value.strip()\n    return result",
          "wrongSolutions": [
            {
              "code": "def parse_settings(text):\n    return dict(line.split(\"=\") for line in text.splitlines())",
              "why": "Комментарий и второе=ломают разбор."
            },
            {
              "code": "def parse_settings(text):\n    result={}\n    for line in text.splitlines():\n        if \"=\" in line:\n            key,value=line.split(\"=\",1)\n            if key.strip() and value.strip():\n                result[key.strip()]=value.strip()\n    return result",
              "why": "Пустое значение ошибочно отвергнуто, комментарии не проверены."
            }
          ],
          "hints": [
            "Сначала отфильтруй строки, потом разбирай пару.",
            "Разделяй по первому=, а не по всем.",
            "После strip ключа не добавляй пустой; значение пустым быть может."
          ],
          "solutionExplanation": [
            "Схема конфигурации явно задаёт обработку повторов.",
            "partition — корректная альтернатива split с ограничением 1."
          ],
          "required": true
        },
        {
          "id": "data-pipeline-task-3",
          "kind": "code",
          "title": "Допустимые заказы из JSON",
          "goal": "Допустимые заказы из JSON",
          "prerequisites": [
            "data-pipeline"
          ],
          "prompt": "text — корректный JSON-массив словарей. У каждого есть name(строка),count(целое). Верни новый список только с непустым strip-именем и count>=0; в результате имя очищено, поля ровно name,count.",
          "inputFormat": "Реализуй valid_json_orders(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "valid_json_orders('[{\"name\":\" чай \",\"count\":2},{\"name\":\" \",\"count\":3},{\"name\":\"хлеб\",\"count\":-1}]')"
              ],
              "output": "[{'name': 'чай', 'count': 2}]",
              "explanation": "Отбор и очистка."
            },
            {
              "input": [
                "valid_json_orders('[{\"name\":\"a\",\"count\":0}]')"
              ],
              "output": "[{'name': 'a', 'count': 0}]",
              "explanation": "Ноль допустим."
            }
          ],
          "initialCode": "def valid_json_orders(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "valid_json_orders('[{\"name\":\" чай \",\"count\":2},{\"name\":\" \",\"count\":3},{\"name\":\"хлеб\",\"count\":-1}]')",
              "expectedValue": [
                {
                  "name": "чай",
                  "count": 2
                }
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Отбор и очистка."
            },
            {
              "expression": "valid_json_orders('[{\"name\":\"a\",\"count\":0}]')",
              "expectedValue": [
                {
                  "name": "a",
                  "count": 0
                }
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Ноль допустим."
            },
            {
              "expression": "valid_json_orders('[]')",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой массив."
            }
          ],
          "reference": "import json\ndef valid_json_orders(text):\n    result=[]\n    for row in json.loads(text):\n        name=row[\"name\"].strip()\n        if name and row[\"count\"]>=0:\n            result.append({\"name\":name,\"count\":row[\"count\"]})\n    return result",
          "alternative": "import json\ndef valid_json_orders(text):\n    rows=json.loads(text)\n    return [dict(name=r[\"name\"].strip(),count=r[\"count\"]) for r in rows if r[\"name\"].strip() and r[\"count\"]>=0]",
          "wrongSolutions": [
            {
              "code": "import json\ndef valid_json_orders(text):\n    return json.loads(text)",
              "why": "Данные разобраны, но не проверены."
            },
            {
              "code": "import json\ndef valid_json_orders(text):\n    return [r for r in json.loads(text) if r[\"name\"] and r[\"count\"]>0]",
              "why": "Пробельные имена остаются, ноль потерян, о чист кин e т."
            }
          ],
          "hints": [
            "Разбор JSON — только первый этап.",
            "Проверяй имя после strip и count по>=0.",
            "Создавай новый словарь из очищенного имении исходного количества."
          ],
          "solutionExplanation": [
            "Корректный формат неравен допустимым данным.",
            "Нормализация не исправляет отрицательное количество за пользователя."
          ],
          "required": true
        },
        {
          "id": "data-pipeline-task-4",
          "kind": "choice",
          "title": "Что означает допустимый JSON?",
          "goal": "Что означает допустимый JSON?",
          "prerequisites": [
            "data-pipeline"
          ],
          "prompt": "Выбери все верные утверждения.",
          "inputFormat": "Прочитай условие и выбери ответ.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "totals={}\nfor name,amount in [(\"чай\",2),(\"хлеб\",3),(\"чай\",4)]:\n    totals[name]=totals.get(name,0)+amount\nprint(totals)"
              ],
              "output": "{'чай': 6, 'хлеб': 3}\n",
              "explanation": "При повторении ключа его предыдущая сумма сохраняется и увеличивается."
            }
          ],
          "hints": [
            "Вспомни правило из урока «Разбор, проверка и накопление по этапам» и проверь каждый вариант на конкретном примере.",
            "Сначала исключи варианты, противоречащие наблюдаемому выполнению. Повтор события может иметь смысл, поэтому его нельзя удалять без контракта.",
            "Проверь основной аргумент: Синтаксис формата и правила предметной области различаются."
          ],
          "solutionExplanation": [
            "Синтаксис формата и правила предметной области различаются.",
            "Повтор события может иметь смысл, поэтому его нельзя удалять без контракта."
          ],
          "required": true,
          "answer": [
            "1",
            "3"
          ],
          "choices": [
            {
              "id": "1",
              "text": "loads может успешно разобрать данные с неправильной схемой."
            },
            {
              "id": "2",
              "text": "После успешного loads любые поля гарантированно допустимы."
            },
            {
              "id": "3",
              "text": "Проверка диапазона выполняется после получения числового значения."
            },
            {
              "id": "4",
              "text": "Повторяющиеся покупки всегда надо удалять как дубликаты."
            }
          ]
        }
      ]
    },
    {
      "id": "data-reports",
      "title": "Детерминированный отчёт и порядок данных",
      "goal": "Собирать воспроизводимый текст из проверенной структуры.",
      "prerequisites": [
        "data-pipeline"
      ],
      "role": "lesson",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "data-reports-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Отчёт должен быть понятным и воспроизводимым: одинаковые данные дают одинаковый порядок строк и одинаковые единицы. Словарь сохраняет порядок вставки в Python 3.12, но порядок входного файла может меняться. Если контракт требует алфавитный отчёт, сортируй ключи явно через sorted. Не сортируй сами значения независимо от ключей: связь товара и суммы потеряется. Работай с парами или упорядоченными ключами.",
            "Вывод для человека и формат обмена решают разные задачи. Строка\"чай: 5\"легко читается, но для другой программы лучше JSON или CSV с явной схемой. Не выдавай красивый текст за универсальный машиночитаемый формат. В упражнениях контракт сразу объявляет результат: обычная строка,CSV или JSON. Для текстового отчёта задаётся разделитель строк и поведение пустого набора."
          ],
          "examples": [
            {
              "id": "data-reports-example-1",
              "title": "Сортируем ключи вместе со значениями",
              "code": "totals={\"б\":2,\"а\":5}\nfor name in sorted(totals):\n    print(name,totals[name])",
              "output": "а 5\nб 2\n",
              "explanation": "Алфавитный порядок задан явно, значения остались со своими ключами."
            }
          ],
          "goal": "Собирать воспроизводимый текст из проверенной структуры. Задача и устройство.",
          "prerequisites": [
            "data-pipeline"
          ]
        },
        {
          "id": "data-reports-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Метод\"\\n\".join(lines) вставляет переносы между строками и не добавляет его после последней. Если нужен завершающий перенос, это отдельное правило. Пустой список даёт пустую строку. Не добавляй автоматически\"Нет данных\", когда контракт просит пустой результат: пользовательский текст может быть удобным в интерфейсе, но проверяемая функция должна следовать объявленному формату.",
            "В таблице с заголовком даже пустой набор может иметь одну строку — схему полей. Это отличается от пустого текстового отчёта. При csv.writer сначала пишут заголовок, затем строки данных. Поля с запятой и кавычками должен экранировать модуль. Не заменяй его join в итоговом проекте, даже если первые имена простые. Правильное разделение ответственности снижает риск скрытой ошибки."
          ],
          "examples": [
            {
              "id": "data-reports-example-2",
              "title": "Переносы только между строками",
              "code": "lines=[\"а: 5\",\"б: 2\"]\nprint(repr(\"\\n\".join(lines)))\nprint(repr(\"\\n\".join([])))",
              "output": "'а: 5\\nб: 2'\n''\n",
              "explanation": "join не создаёт лишнюю строку после конца, пустой список даёт пустую текстовую строку."
            }
          ],
          "goal": "Собирать воспроизводимый текст из проверенной структуры. Порядок выполнения.",
          "prerequisites": [
            "data-reports-step-1"
          ]
        },
        {
          "id": "data-reports-step-3",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Проверяй порядок на контрпримере: входной словарь содержит\"б\"до\"а\", а отчёт должен начинаться с\"а\". Для сумм сравни нули, отрицательные поправки, если они разрешены, и повторяющиеся ключи. При работе с JSON проверка может сравнить структуру без привязки к пробелам. При точном текстовом контракте пробелы и переносы становятся частью результата, и это должно быть написано в условии.",
            "Теперь ты умеешь получать текст, проверять данные и накапливать итоги. Смешанная практика попросит самостоятельно выбрать порядок этапов. После дальнейшей контрольной мини-проект соберёт учебный расходный журнал из CSV в проверяемую сводку. Никакой сети, серверных ключей или настоящих платежей нет: входные данные полностью заданы, а оценивание проверяет поведение твоей программы."
          ],
          "examples": [
            {
              "id": "data-reports-example-3",
              "title": "Таблица без записей",
              "code": "import csv\nfrom io import StringIO\nstream=StringIO()\ncsv.writer(stream,lineterminator=\"\\n\").writerow([\"name\",\"total\"])\nprint(repr(stream.getvalue()))",
              "output": "'name,total\\n'\n",
              "explanation": "Даже безданных CSV может содержать заголовок схемы."
            }
          ],
          "goal": "Собирать воспроизводимый текст из проверенной структуры. Применение и ошибки.",
          "prerequisites": [
            "data-reports-step-2"
          ]
        }
      ],
      "exercises": [
        {
          "id": "data-reports-task-1",
          "kind": "code",
          "title": "Алфавитный текстовый отчёт",
          "goal": "Алфавитный текстовый отчёт",
          "prerequisites": [
            "data-reports"
          ],
          "prompt": "totals — словарь строка→целое. Верни строки\"name: total\"по алфавиту ключей, разделённые\\nбез переноса в конце. Пустой словарь→\"\".",
          "inputFormat": "Реализуй render_totals(totals). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "render_totals({'б':2,'а':5})"
              ],
              "output": "'а: 5\\nб: 2'",
              "explanation": "Ключи сортируются."
            },
            {
              "input": [
                "render_totals({})"
              ],
              "output": "''",
              "explanation": "Пустой отчёт."
            }
          ],
          "initialCode": "def render_totals(totals):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "render_totals({'б':2,'а':5})",
              "expectedValue": "а: 5\nб: 2",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Ключи сортируются."
            },
            {
              "expression": "render_totals({})",
              "expectedValue": "",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой отчёт."
            },
            {
              "expression": "render_totals({'x':0})",
              "expectedValue": "x: 0",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевой итог сохраняется."
            }
          ],
          "reference": "def render_totals(totals):\n    return \"\\n\".join(f\"{name}: {totals[name]}\" for name in sorted(totals))",
          "alternative": "def render_totals(totals):\n    lines=[]\n    for name in sorted(totals.keys()):\n        lines.append(name+\": \"+str(totals[name]))\n    return \"\\n\".join(lines)",
          "wrongSolutions": [
            {
              "code": "def render_totals(totals):\n    return \"\\n\".join(f\"{k}: {v}\" for k,v in totals.items())",
              "why": "Сохранён случайный входной порядок вместо алфавитного."
            },
            {
              "code": "def render_totals(totals):\n    return \"\".join(f\"{k}: {totals[k]}\\n\" for k in sorted(totals))",
              "why": "В конце лишний перенос."
            }
          ],
          "hints": [
            "Сначала упорядочи ключи.",
            "Каждому совпадающему ключу получи своё значение.",
            "Собери lines и соедини через\"\\n\".join."
          ],
          "solutionExplanation": [
            "Сортировка ключей сохраняет связь пары.",
            "join точно реализует правило переносов."
          ],
          "required": true
        },
        {
          "id": "data-reports-task-2",
          "kind": "code",
          "title": "Сводка JSON-списка записей",
          "goal": "Сводка JSON-списка записей",
          "prerequisites": [
            "data-reports"
          ],
          "prompt": "text — корректный JSON-массив словарей с целым полем amount. Верни словарь count,total,maximum. Для пустого набора maximum=None.",
          "inputFormat": "Реализуй json_statistics(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "json_statistics('[{\"amount\":-3},{\"amount\":-1}]')"
              ],
              "output": "{'count': 2, 'total': -4, 'maximum': -1}",
              "explanation": "Отрицательный максимум нельзя инициализировать нулём."
            },
            {
              "input": [
                "json_statistics('[]')"
              ],
              "output": "{'count': 0, 'total': 0, 'maximum': None}",
              "explanation": "Пустые данные."
            }
          ],
          "initialCode": "def json_statistics(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "json_statistics('[{\"amount\":-3},{\"amount\":-1}]')",
              "expectedValue": {
                "count": 2,
                "total": -4,
                "maximum": -1
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Отрицательный максимум нельзя инициализировать нулём."
            },
            {
              "expression": "json_statistics('[]')",
              "expectedValue": {
                "count": 0,
                "total": 0,
                "maximum": null
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустые данные."
            },
            {
              "expression": "json_statistics('[{\"amount\":0}]')",
              "expectedValue": {
                "count": 1,
                "total": 0,
                "maximum": 0
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Ноль — реальный максимум."
            }
          ],
          "reference": "import json\ndef json_statistics(text):\n    values=[row[\"amount\"] for row in json.loads(text)]\n    return {\"count\":len(values),\"total\":sum(values),\"maximum\":max(values) if values else None}",
          "alternative": "import json\ndef json_statistics(text):\n    count=total=0\n    maximum=None\n    for row in json.loads(text):\n        value=row[\"amount\"]\n        count+=1\n        total+=value\n        if maximum is None or value>maximum:\n            maximum=value\n    return dict(count=count,total=total,maximum=maximum)",
          "wrongSolutions": [
            {
              "code": "import json\ndef json_statistics(text):\n    v=[r[\"amount\"] for r in json.loads(text)]\n    return dict(count=len(v),total=sum(v),maximum=max([0]+v))",
              "why": "Фиктивный 0 искажает отрицательный и пустой набор."
            },
            {
              "code": "import json\ndef json_statistics(text):\n    v=[r[\"amount\"] for r in json.loads(text)]\n    return dict(count=len(v),total=sum(v),maximum=max(v))",
              "why": "Пустой список необработан."
            }
          ],
          "hints": [
            "Разбери и собери числовые значения.",
            "Для максимума нужен первый реальный элемент или None.",
            "Пустоту проверь до вызыва max."
          ],
          "solutionExplanation": [
            "Сводка соединяет формат и данные с граничными случаями.",
            "Максимум отрицательных чисел остаётся отрицательным."
          ],
          "required": true
        },
        {
          "id": "data-reports-task-3",
          "kind": "code",
          "title": "CSV-отчёт словаря",
          "goal": "CSV-отчёт словаря",
          "prerequisites": [
            "data-reports"
          ],
          "prompt": "Верни CSV с заголовком name,total и строками по алфавиту ключей totals. Все записи заканчиваются\\n. Имена могут содержать запятые.",
          "inputFormat": "Реализуй totals_csv(totals). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "totals_csv({'b':2,'a,b':5})"
              ],
              "output": "'name,total\\n\"a,b\",5\\nb,2\\n'",
              "explanation": "Сортировка и экранирование."
            },
            {
              "input": [
                "totals_csv({})"
              ],
              "output": "'name,total\\n'",
              "explanation": "Только схема."
            }
          ],
          "initialCode": "def totals_csv(totals):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "totals_csv({'b':2,'a,b':5})",
              "expectedValue": "name,total\n\"a,b\",5\nb,2\n",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сортировка и экранирование."
            },
            {
              "expression": "totals_csv({})",
              "expectedValue": "name,total\n",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Только схема."
            }
          ],
          "reference": "import csv\nfrom io import StringIO\ndef totals_csv(totals):\n    stream=StringIO()\n    writer=csv.writer(stream,lineterminator=\"\\n\")\n    writer.writerow([\"name\",\"total\"])\n    for name in sorted(totals):\n        writer.writerow([name,totals[name]])\n    return stream.getvalue()",
          "alternative": "import csv\nfrom io import StringIO\ndef totals_csv(totals):\n    stream=StringIO()\n    rows=[[\"name\",\"total\"]]+[[name,totals[name]] for name in sorted(totals)]\n    csv.writer(stream,lineterminator=\"\\n\").writerows(rows)\n    return stream.getvalue()",
          "wrongSolutions": [
            {
              "code": "def totals_csv(totals):\n    return \"name,total\\n\"+\"\".join(f\"{k},{totals[k]}\\n\" for k in sorted(totals))",
              "why": "Запятая в имени разделит поле."
            },
            {
              "code": "import csv\nfrom io import StringIO\ndef totals_csv(totals):\n    s=StringIO()\n    csv.writer(s,lineterminator=\"\\n\").writerows([[k,v] for k,v in totals.items()])\n    return s.getvalue()",
              "why": "Нет заголовка и алфавитного порядка."
            }
          ],
          "hints": [
            "Схема CSV сохраняется даже безданных.",
            "Writer должен записать и заголовок, и все упорядоченные строки.",
            "Используй lineterminator=\"\\n\"и сортируй ключи."
          ],
          "solutionExplanation": [
            "Табличный отчёт сохраняет схему и экранирование.",
            "Пустой словарь не означает пустую CSV-строку."
          ],
          "required": true
        },
        {
          "id": "data-reports-task-4",
          "kind": "choice",
          "title": "Что сортировать?",
          "goal": "Что сортировать?",
          "prerequisites": [
            "data-reports"
          ],
          "prompt": "Нужен алфавитный отчёт словаря товар→сумма. Как сохранить связь?",
          "inputFormat": "Прочитай условие и выбери ответ.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "totals={\"б\":2,\"а\":5}\nfor name in sorted(totals):\n    print(name,totals[name])"
              ],
              "output": "а 5\nб 2\n",
              "explanation": "Алфавитный порядок задан явно, значения остались со своими ключами."
            }
          ],
          "hints": [
            "Вспомни правило из урока «Детерминированный отчёт и порядок данных» и проверь каждый вариант на конкретном примере.",
            "Сначала исключи варианты, противоречащие наблюдаемому выполнению. Независимая сортировка двух списков разрушает эту связь.",
            "Проверь основной аргумент: Ключ определяет, какое значение к нему относится."
          ],
          "solutionExplanation": [
            "Ключ определяет, какое значение к нему относится.",
            "Независимая сортировка двух списков разрушает эту связь."
          ],
          "required": true,
          "answer": [
            "1"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Перебирать sorted(totals) и получать totals[name]."
            },
            {
              "id": "2",
              "text": "Отдельно отсортировать все ключи и все значения, потом склеить попарно."
            },
            {
              "id": "3",
              "text": "Сначала удалить все ключи."
            }
          ]
        }
      ]
    },
    {
      "id": "data-review",
      "title": "Повторение: источник и структура",
      "goal": "Соединить файловое чтение с разбором и проверкой смысла.",
      "prerequisites": [
        "data-reports"
      ],
      "role": "review",
      "estimatedMinutes": 55,
      "steps": [
        {
          "id": "data-review-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Теперь важно самостоятельно выбрать инструмент: read получает текст, json.load разбирает структуру из потока, csv.reader разбирает записи таблицы. Путь, поток, строка и список — разные типы данных. Назови тип после каждого этапа перед реализацией. Если отчёт неверен, это поможет найти ошибку между чтением и вычислением.",
            "Смешанная практика возвращает границы: пустой документ, пустой набор в корректном формате и запись с нулём не одно и то же. Не добавляй значение по умолчанию без контракта. В задаче этого урока файл всегда содержит корректный JSON-массив, поэтому нужно обработать [] как данные, а не как ошибку чтения."
          ],
          "examples": [
            {
              "id": "data-review-example-1",
              "title": "Строка и разобранный список",
              "code": "import json\ntext=\"[1,2]\"\nvalues=json.loads(text)\nprint(type(text).__name__)\nprint(type(values).__name__)",
              "output": "str\nlist\n",
              "explanation": "Название переменной не меняет тип: парсер создаёт новую структуру."
            },
            {
              "id": "data-review-example-2",
              "title": "Пустая таблица с заголовком",
              "code": "import csv\nfrom io import StringIO\nrows=list(csv.DictReader(StringIO(\"name,count\\n\")))\nprint(rows)",
              "output": "[]\n",
              "explanation": "Схема есть, записей нет."
            }
          ],
          "goal": "Соединить файловое чтение с разбором и проверкой смысла. Задача и устройство.",
          "prerequisites": [
            "data-reports"
          ]
        }
      ],
      "exercises": [
        {
          "id": "data-review-task-1",
          "kind": "code",
          "title": "Сумма JSON-файла",
          "goal": "Сумма JSON-файла",
          "prerequisites": [
            "data-review"
          ],
          "prompt": "Прочитай существующий UTF-8 файл с корректным JSON-массивом целых чисел. Верни сумму. Файл не изменяй.",
          "inputFormat": "Реализуй json_file_total(path). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "with open('values.json', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('[2,-3,5]')",
                "json_file_total('values.json')"
              ],
              "output": "4",
              "explanation": "Разбор чисел после чтения."
            },
            {
              "input": [
                "with open('values.json', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('[]')",
                "json_file_total('values.json')"
              ],
              "output": "0",
              "explanation": "Пустой массив."
            }
          ],
          "initialCode": "def json_file_total(path):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "json_file_total('values.json')",
              "expectedValue": 4,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Разбор чисел после чтения.",
              "setup": "with open('values.json', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('[2,-3,5]')"
            },
            {
              "expression": "json_file_total('values.json')",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой массив.",
              "setup": "with open('values.json', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('[]')"
            },
            {
              "expression": "[json_file_total('values.json'),open('values.json',encoding='utf-8',newline='').read()]",
              "expectedValue": [
                4,
                "[2,-3,5]"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Входной JSON-файл после вычисления остаётся неизменным.",
              "setup": "with open(\"values.json\",\"w\",encoding=\"utf-8\",newline=\"\") as f:\n    f.write(\"[2,-3,5]\")"
            }
          ],
          "reference": "import json\ndef json_file_total(path):\n    with open(path,encoding=\"utf-8\") as stream:\n        values=json.load(stream)\n    return sum(values)",
          "alternative": "import json\ndef json_file_total(path):\n    with open(path,encoding=\"utf-8\") as stream:\n        text=stream.read()\n    return sum(json.loads(text))",
          "wrongSolutions": [
            {
              "code": "import json\ndef json_file_total(path):\n    return sum(json.loads(path))",
              "why": "Имя файла подано как JSON-текст."
            },
            {
              "code": "import json\ndef json_file_total(path):\n    with open(path,encoding=\"utf-8\") as f:\n        return len(json.load(f))",
              "why": "Посчитаны элементы вместо суммы."
            },
            {
              "code": "import json\ndef json_file_total(path):\n    with open(path,encoding=\"utf-8\") as f:\n        result=sum(json.load(f))\n    with open(path,\"w\",encoding=\"utf-8\") as f:\n        f.write(\"[]\")\n    return result",
              "why": "Сумма верна, но входной файл уничтожен после чтения."
            }
          ],
          "hints": [
            "Путь передаётся open, не loads.",
            "load принимает уже открытый поток.",
            "Разбери массив, затем примени сумму."
          ],
          "solutionExplanation": [
            "Получение источника и разбор формата выполняют разные операции.",
            "Пустой массив корректен."
          ],
          "required": true
        },
        {
          "id": "data-review-task-2",
          "kind": "order",
          "title": "Порядок обработки",
          "goal": "Порядок обработки",
          "prerequisites": [
            "data-review"
          ],
          "prompt": "Расположи этапы при получении суммы из JSON-файла.",
          "inputFormat": "Выполни действие с указанным фрагментом.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "import json\ntext=\"[1,2]\"\nvalues=json.loads(text)\nprint(type(text).__name__)\nprint(type(values).__name__)"
              ],
              "output": "str\nlist\n",
              "explanation": "Название переменной не меняет тип: парсер создаёт новую структуру."
            }
          ],
          "hints": [
            "Найди данные, без которых следующая строка ещё не может выполниться.",
            "Построй зависимости имён: сначала создание значения, затем его использование.",
            "Последний шаг обычно потребляет результат предыдущих: Сначала доступ к источнику, затем разбор, затем вычисление."
          ],
          "solutionExplanation": [
            "Сначала доступ к источнику, затем разбор, затем вычисление."
          ],
          "required": true,
          "answer": [
            "2",
            "3",
            "1"
          ],
          "blocks": [
            {
              "id": "1",
              "text": "total = sum(values)"
            },
            {
              "id": "2",
              "text": "stream = open(path, encoding=\"utf-8\")"
            },
            {
              "id": "3",
              "text": "values = json.load(stream)"
            }
          ]
        }
      ]
    },
    {
      "id": "data-assessment",
      "title": "Контрольная: документы и форматы",
      "goal": "Проверить схему, преобразовать CSV и создать настоящий файл результата.",
      "prerequisites": [
        "data-review"
      ],
      "role": "assessment",
      "estimatedMinutes": 55,
      "steps": [
        {
          "id": "data-assessment-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Три задания проверяют разные этапы обработки. В первом понадобится отличить неверный JSON от неверной схемы, во втором — преобразовать числовые поля CSV, в третьем — записать данные в файл. Контракт каждой задачи полон; сеть и источники вне worker не нужны. Не считай строковое представление словаря сериализацией.",
            "Все задачи обязательны. Подсказки раскрываются постепенно, полный разбор отмечается отдельно от самостоятельного решения. После успешной проверки повтори путь на другом входе: пустом наборе, нуле и кириллице. Чтение готового примера не является подтверждением умения создавать новый документ."
          ],
          "examples": [
            {
              "id": "data-assessment-example-1",
              "title": "Формат отдельно от схемы",
              "code": "import json\nfor text in [\"[]\", \"{}\"]:\n    data=json.loads(text)\n    print(isinstance(data,list))",
              "output": "True\nFalse\n",
              "explanation": "Оба текста корректны как JSON, но только первый массив."
            },
            {
              "id": "data-assessment-example-2",
              "title": "CSV содержит текстовые числа",
              "code": "import csv\nfrom io import StringIO\nrow=next(csv.DictReader(StringIO(\"name,count\\nчай,0\\n\")))\nprint(int(row[\"count\"])==0)",
              "output": "True\n",
              "explanation": "Нулевое количество не является отсутствующим полем."
            }
          ],
          "goal": "Проверить схему, преобразовать CSV и создать настоящий файл результата. Задача и устройство.",
          "prerequisites": [
            "data-review"
          ]
        }
      ],
      "exercises": [
        {
          "id": "data-assessment-task-1",
          "kind": "code",
          "title": "Только JSON-массив целых",
          "goal": "Только JSON-массив целых",
          "prerequisites": [
            "data-assessment"
          ],
          "prompt": "Верни список, если text — корректный JSON-массив только целых чисел. bool не считается целым по этому контракту. При неверном формате или схеме None.",
          "inputFormat": "Реализуй parse_integer_array(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "parse_integer_array('[0,-2,3]')"
              ],
              "output": "[0, -2, 3]",
              "explanation": "Разрешённые типы."
            },
            {
              "input": [
                "parse_integer_array('[true]')"
              ],
              "output": "None",
              "explanation": "bool исключён контрактом."
            }
          ],
          "initialCode": "def parse_integer_array(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "parse_integer_array('[0,-2,3]')",
              "expectedValue": [
                0,
                -2,
                3
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Разрешённые типы."
            },
            {
              "expression": "parse_integer_array('[true]')",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "bool исключён контрактом."
            },
            {
              "expression": "parse_integer_array('{}')",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Неверная схема."
            },
            {
              "expression": "parse_integer_array('broken')",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Неверный формат."
            },
            {
              "expression": "parse_integer_array('[]')",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой массив допустим."
            },
            {
              "expression": "parse_integer_array('[1.5]')",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Схема допускает только точные int, без float, str, None и bool."
            },
            {
              "expression": "parse_integer_array('[\"3\"]')",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Схема допускает только точные int, без float, str, None и bool."
            },
            {
              "expression": "parse_integer_array('[null]')",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Схема допускает только точные int, без float, str, None и bool."
            },
            {
              "expression": "parse_integer_array('[1,2.0]')",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Схема допускает только точные int, без float, str, None и bool."
            }
          ],
          "reference": "import json\ndef parse_integer_array(text):\n    try:\n        data=json.loads(text)\n    except json.JSONDecodeError:\n        return None\n    if not isinstance(data,list) or not all(type(v) is int for v in data):\n        return None\n    return data",
          "alternative": "import json\ndef parse_integer_array(text):\n    try:\n        result=json.loads(text)\n    except ValueError:\n        return None\n    if type(result) is not list:\n        return None\n    for value in result:\n        if type(value) is not int:\n            return None\n    return result",
          "wrongSolutions": [
            {
              "code": "import json\ndef parse_integer_array(text):\n    return json.loads(text)",
              "why": "Формат и схема не проверены."
            },
            {
              "code": "import json\ndef parse_integer_array(text):\n    try:\n        d=json.loads(text)\n    except ValueError:\n        return None\n    return d if isinstance(d,list) and all(isinstance(v,int) for v in d) else None",
              "why": "В Pythonbool является подклассом int;true ошибочно пройдёт."
            },
            {
              "code": "import json\ndef parse_integer_array(text):\n    try:\n        data=json.loads(text)\n    except ValueError:\n        return None\n    return data if isinstance(data,list) and all(type(v) in (int,float) for v in data) else None",
              "why": "Дробные JSON-числа ошибочно приняты схемой, допускающей только int."
            }
          ],
          "hints": [
            "Есть два вопроса: разбирается ли текст и подходит ли структура.",
            "Для точного типа целого используй type(value) is int.",
            "Пустой список проходит, но объект и неверный JSON дают None."
          ],
          "solutionExplanation": [
            "Контракт явно исключает bool.",
            "Обработчик не подменяет недопустимые данные нулями."
          ],
          "required": true
        },
        {
          "id": "data-assessment-task-2",
          "kind": "code",
          "title": "Положительные остатки CSV",
          "goal": "Положительные остатки CSV",
          "prerequisites": [
            "data-assessment"
          ],
          "prompt": "text — CSV заголовок name,count,count корректное целое. Верни имена строго положительных остатков в исходном порядке. Для пустого текста пустой список.",
          "inputFormat": "Реализуй csv_available(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "csv_available('name,count\\na,0\\n\"b,c\",2\\nd,-1\\n')"
              ],
              "output": "['b,c']",
              "explanation": "Ноль и отрицательные недоступны."
            },
            {
              "input": [
                "csv_available('name,count\\n')"
              ],
              "output": "[]",
              "explanation": "Только заголовок."
            }
          ],
          "initialCode": "def csv_available(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "csv_available('name,count\\na,0\\n\"b,c\",2\\nd,-1\\n')",
              "expectedValue": [
                "b,c"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Ноль и отрицательные недоступны."
            },
            {
              "expression": "csv_available('name,count\\n')",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Только заголовок."
            },
            {
              "expression": "csv_available('')",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет таблицы."
            }
          ],
          "reference": "import csv\nfrom io import StringIO\ndef csv_available(text):\n    return [r[\"name\"] for r in csv.DictReader(StringIO(text)) if int(r[\"count\"])>0]",
          "alternative": "import csv\nfrom io import StringIO\ndef csv_available(text):\n    result=[]\n    for row in csv.DictReader(StringIO(text)):\n        count=int(row[\"count\"])\n        if count>=1:\n            result.append(row[\"name\"])\n    return result",
          "wrongSolutions": [
            {
              "code": "import csv\nfrom io import StringIO\ndef csv_available(text):\n    return [r[\"name\"] for r in csv.DictReader(StringIO(text)) if r[\"count\"]]",
              "why": "Строки\"0\"и\"-1\"тоже истинны."
            },
            {
              "code": "def csv_available(text):\n    return [line.split(\",\")[0] for line in text.splitlines()[1:] if int(line.split(\",\")[1])>0]",
              "why": "Запятая внутри имени разрушает ручной разбор."
            }
          ],
          "hints": [
            "Сначала правильный CSVparser.",
            "Перед сравнением count нужен int.",
            "Условие строго>0, непросто проверка не пустой строки."
          ],
          "solutionExplanation": [
            "Тип поля влияет на смысл условия.",
            "Имя с запятой проверяет использование формата."
          ],
          "required": true
        },
        {
          "id": "data-assessment-task-3",
          "kind": "code",
          "title": "Сохранить JSON-данные",
          "goal": "Сохранить JSON-данные",
          "prerequisites": [
            "data-assessment"
          ],
          "prompt": "Запиши data в UTF-8 файл path как корректный JSON, заменив старый файл. Верни None. data состоит из JSON-совместимых значений. Формат пробелов неважен.",
          "inputFormat": "Реализуй save_json(path, data). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "list((save_json('out.json',{'имя':'Аня','n':0}),__import__('json').load(open('out.json',encoding='utf-8'))))"
              ],
              "output": "[None, {'имя': 'Аня', 'n': 0}]",
              "explanation": "Наблюдается реальный файл."
            },
            {
              "input": [
                "with open('out.json', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('{\"old\":1}')",
                "list((save_json('out.json',[]),__import__('json').load(open('out.json',encoding='utf-8'))))"
              ],
              "output": "[None, []]",
              "explanation": "Старое содержимое заменено."
            }
          ],
          "initialCode": "def save_json(path, data):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "list((save_json('out.json',{'имя':'Аня','n':0}),__import__('json').load(open('out.json',encoding='utf-8'))))",
              "expectedValue": [
                null,
                {
                  "имя": "Аня",
                  "n": 0
                }
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Наблюдается реальный файл."
            },
            {
              "expression": "list((save_json('out.json',[]),__import__('json').load(open('out.json',encoding='utf-8'))))",
              "expectedValue": [
                null,
                []
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Старое содержимое заменено.",
              "setup": "with open('out.json', \"w\", encoding=\"utf-8\", newline=\"\") as fixture_file:\n    fixture_file.write('{\"old\":1}')"
            }
          ],
          "reference": "import json\ndef save_json(path, data):\n    with open(path,\"w\",encoding=\"utf-8\") as stream:\n        json.dump(data,stream,ensure_ascii=False)",
          "alternative": "import json\ndef save_json(path, data):\n    text=json.dumps(data)\n    with open(path,\"w\",encoding=\"utf-8\") as stream:\n        stream.write(text)\n    return None",
          "wrongSolutions": [
            {
              "code": "def save_json(path, data):\n    with open(path,\"w\",encoding=\"utf-8\") as stream:\n        stream.write(str(data))",
              "why": "str создаёт Python-представление, не JSON."
            },
            {
              "code": "import json\ndef save_json(path, data):\n    return json.dumps(data)",
              "why": "JSON-строка возвращена, но файл не записан."
            }
          ],
          "hints": [
            "Нужна операция записи, а не только сериализация в памяти.",
            "dump принимает структуру и открытый поток.",
            "Открой w с UTF-8; после записи не возвращай строку по контракту."
          ],
          "solutionExplanation": [
            "Наблюдение выходного файла не создаёт результат за ученика.",
            "None — осознанный возврат операции сохранения."
          ],
          "required": true
        }
      ]
    },
    {
      "id": "data-expenses-project",
      "title": "Мини-проект: CSV-журнал расходов",
      "goal": "Прочитать журнал, агрегировать категории и сериал из овать сводку.",
      "prerequisites": [
        "data-assessment"
      ],
      "role": "project",
      "estimatedMinutes": 55,
      "steps": [
        {
          "id": "data-expenses-project-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Вход проекта — CSV с заголовком category,amount. Суммы — неотрицательные целые в учебных денежных единицах. Категории могут повторяться и содержать запятую. Первая часть превращает таблицу в записи, вторая получает итоги по категориям, третья готовит JSON-сводку с общей суммой и числом событий. Точные правила даны в каждой задаче; настоящих платежей или доступа к банку нет.",
            "Не объединяй события на этапе чтения: это изменит число записей. Дублированная категория не означает ошибку. Для агрегирования сложи суммы, а для числа событий сохрани длину исходного списка. Пустая таблица с заголовком должна давать пустые записи и нулевую сводку. Проверяй формат и краевые случаи отдельно от основной суммы."
          ],
          "examples": [
            {
              "id": "data-expenses-project-example-1",
              "title": "События и категории различаются",
              "code": "rows=[(\"еда\",5),(\"еда\",7),(\"проезд\",3)]\nprint(len(rows))\nprint(len({name for name,amount in rows}))",
              "output": "3\n2\n",
              "explanation": "Три события, но две категории. Эти счётчики отвечают на разные вопросы."
            },
            {
              "id": "data-expenses-project-example-2",
              "title": "JSON для дальнейшего отчёта",
              "code": "import json\nsummary={\"events\":0,\"total\":0,\"categories\":{}}\nprint(json.dumps(summary,ensure_ascii=False,sort_keys=True))",
              "output": "{\"categories\": {}, \"events\": 0, \"total\": 0}\n",
              "explanation": "Пустая сводка сохраняет ту же схему, что и не пустая."
            }
          ],
          "goal": "Прочитать журнал, агрегировать категории и сериал из овать сводку. Задача и устройство.",
          "prerequisites": [
            "data-assessment"
          ]
        }
      ],
      "exercises": [
        {
          "id": "data-expenses-project-task-1",
          "kind": "code",
          "title": "Разобрать журнал",
          "goal": "Разобрать журнал",
          "prerequisites": [
            "data-expenses-project"
          ],
          "prompt": "Верни список словарей category и amount из корректного CSV заголовок category,amount. amount — неотрицательное целое. Категории сохраняй точно, порядок и события не объединяй.",
          "inputFormat": "Реализуй expense_rows(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "expense_rows('category,amount\\nеда,5\\nеда,7\\n')"
              ],
              "output": "[{'category': 'еда', 'amount': 5}, {'category': 'еда', 'amount': 7}]",
              "explanation": "События сохранены."
            },
            {
              "input": [
                "expense_rows('category,amount\\n\"дом, ремонт\",0\\n')"
              ],
              "output": "[{'category': 'дом, ремонт', 'amount': 0}]",
              "explanation": "Кавычки и ноль."
            }
          ],
          "initialCode": "def expense_rows(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "expense_rows('category,amount\\nеда,5\\nеда,7\\n')",
              "expectedValue": [
                {
                  "category": "еда",
                  "amount": 5
                },
                {
                  "category": "еда",
                  "amount": 7
                }
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "События сохранены."
            },
            {
              "expression": "expense_rows('category,amount\\n\"дом, ремонт\",0\\n')",
              "expectedValue": [
                {
                  "category": "дом, ремонт",
                  "amount": 0
                }
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Кавычки и ноль."
            },
            {
              "expression": "expense_rows('category,amount\\n')",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой журнал."
            }
          ],
          "reference": "import csv\nfrom io import StringIO\ndef expense_rows(text):\n    return [{\"category\":r[\"category\"],\"amount\":int(r[\"amount\"])} for r in csv.DictReader(StringIO(text))]",
          "alternative": "import csv\nfrom io import StringIO\ndef expense_rows(text):\n    result=[]\n    reader=csv.reader(StringIO(text))\n    next(reader,None)\n    for category,amount in reader:\n        result.append(dict(category=category,amount=int(amount)))\n    return result",
          "wrongSolutions": [
            {
              "code": "import csv\nfrom io import StringIO\ndef expense_rows(text):\n    return list(csv.DictReader(StringIO(text)))",
              "why": "amount остался строкой."
            },
            {
              "code": "import csv\nfrom io import StringIO\ndef expense_rows(text):\n    return [{\"category\":r[\"category\"],\"amount\":int(r[\"amount\"])} for r in csv.DictReader(StringIO(text)) if int(r[\"amount\"])>0]",
              "why": "Нулевое событие удалено."
            }
          ],
          "hints": [
            "CSV разбирает границы полей, ты преобразуешь amount.",
            "Каждая запись даёт о в дельный словарь.",
            "Не фильтруй нулевые суммы и не группируй раньше времени."
          ],
          "solutionExplanation": [
            "Разбор не должен менять количество событий.",
            "Числовой тип получается явным int."
          ],
          "required": true
        },
        {
          "id": "data-expenses-project-task-2",
          "kind": "code",
          "title": "Итоги по категориям",
          "goal": "Итоги по категориям",
          "prerequisites": [
            "data-expenses-project"
          ],
          "prompt": "rows — готовые словари category(строка),amount(неотрицательное целое). Верни словарь сумм по категориям. Категория с нулевыми расходами сохраняется.",
          "inputFormat": "Реализуй category_totals(rows). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "category_totals([{'category':'еда','amount':5},{'category':'еда','amount':7},{'category':'проезд','amount':0}])"
              ],
              "output": "{'еда': 12, 'проезд': 0}",
              "explanation": "Повторы суммируются."
            },
            {
              "input": [
                "category_totals([])"
              ],
              "output": "{}",
              "explanation": "Пусто."
            }
          ],
          "initialCode": "def category_totals(rows):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "category_totals([{'category':'еда','amount':5},{'category':'еда','amount':7},{'category':'проезд','amount':0}])",
              "expectedValue": {
                "еда": 12,
                "проезд": 0
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Повторы суммируются."
            },
            {
              "expression": "category_totals([])",
              "expectedValue": {},
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пусто."
            }
          ],
          "reference": "def category_totals(rows):\n    totals={}\n    for row in rows:\n        name=row[\"category\"]\n        totals[name]=totals.get(name,0)+row[\"amount\"]\n    return totals",
          "alternative": "def category_totals(rows):\n    names={row[\"category\"] for row in rows}\n    return {name:sum(row[\"amount\"] for row in rows if row[\"category\"]==name) for name in names}",
          "wrongSolutions": [
            {
              "code": "def category_totals(rows):\n    return {r[\"category\"]:r[\"amount\"] for r in rows}",
              "why": "Перезапись теряет первый расход."
            },
            {
              "code": "def category_totals(rows):\n    result={}\n    for r in rows:\n        if r[\"amount\"]:\n            result[r[\"category\"]]=result.get(r[\"category\"],0)+r[\"amount\"]\n    return result",
              "why": "Нулевая категория потеряна."
            }
          ],
          "hints": [
            "Словарь здесь — накопитель по своему ключу.",
            "Начальная сумма нового ключа 0.",
            "Сохраняй ключ даже когда текущее значение 0."
          ],
          "solutionExplanation": [
            "Агрегирование отдельно от чтения позволяет перепроверять данные.",
            "Число событий нельзя получать из длины этого словаря."
          ],
          "required": true
        },
        {
          "id": "data-expenses-project-task-3",
          "kind": "code",
          "title": "JSON-сводка расходов",
          "goal": "JSON-сводка расходов",
          "prerequisites": [
            "data-expenses-project"
          ],
          "prompt": "Полный корректный CSV category,amount. Верни JSON-строку объекта events(число событий),total(сумма расходов),categories(словарь сумм). Пустой текст/таблица без записей даёт нулевую сводку.",
          "inputFormat": "Реализуй expense_summary(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "__import__('json').loads(expense_summary('category,amount\\nеда,5\\nеда,7\\nпроезд,3\\n'))"
              ],
              "output": "{'events': 3, 'total': 15, 'categories': {'еда': 12, 'проезд': 3}}",
              "explanation": "Все этапы объединены."
            },
            {
              "input": [
                "__import__('json').loads(expense_summary(''))"
              ],
              "output": "{'events': 0, 'total': 0, 'categories': {}}",
              "explanation": "Пустой журнал."
            }
          ],
          "initialCode": "def expense_summary(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "__import__('json').loads(expense_summary('category,amount\\nеда,5\\nеда,7\\nпроезд,3\\n'))",
              "expectedValue": {
                "events": 3,
                "total": 15,
                "categories": {
                  "еда": 12,
                  "проезд": 3
                }
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Все этапы объединены."
            },
            {
              "expression": "__import__('json').loads(expense_summary(''))",
              "expectedValue": {
                "events": 0,
                "total": 0,
                "categories": {}
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой журнал."
            }
          ],
          "reference": "import csv,json\nfrom io import StringIO\ndef expense_summary(text):\n    events=total=0\n    categories={}\n    for row in csv.DictReader(StringIO(text)):\n        amount=int(row[\"amount\"])\n        name=row[\"category\"]\n        events+=1\n        total+=amount\n        categories[name]=categories.get(name,0)+amount\n    return json.dumps({\"events\":events,\"total\":total,\"categories\":categories},ensure_ascii=False)",
          "alternative": "import csv,json\nfrom io import StringIO\ndef expense_summary(text):\n    rows=[(r[\"category\"],int(r[\"amount\"])) for r in csv.DictReader(StringIO(text))]\n    names={name for name,amount in rows}\n    totals={name:sum(amount for category,amount in rows if category==name) for name in names}\n    return json.dumps(dict(events=len(rows),total=sum(amount for name,amount in rows),categories=totals))",
          "wrongSolutions": [
            {
              "code": "import csv,json\nfrom io import StringIO\ndef expense_summary(text):\n    rows=list(csv.DictReader(StringIO(text)))\n    cats={r[\"category\"]:int(r[\"amount\"]) for r in rows}\n    return json.dumps(dict(events=len(cats),total=sum(cats.values()),categories=cats))",
              "why": "Повторы категорий теряют сумму и события."
            },
            {
              "code": "def expense_summary(text):\n    return str({\"events\":0,\"total\":0,\"categories\":{}})",
              "why": "Нет разбора;str не является JSON."
            }
          ],
          "hints": [
            "Сначала получи числовые события из CSV.",
            "events считается по строкам,categories — по ключам.",
            "Собери согласованный словарь и передай json.dumps."
          ],
          "solutionExplanation": [
            "Проект связывает форматы, агрегирование и честные счётчики.",
            "Пустой журнал имеет ту же схему ответа."
          ],
          "required": true
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.12/tutorial/modules.html",
    "https://docs.python.org/3.12/tutorial/inputoutput.html",
    "https://docs.python.org/3.12/library/io.html",
    "https://docs.python.org/3.12/library/json.html",
    "https://docs.python.org/3.12/library/csv.html"
  ]
};

export default module;
