import type { CourseModule } from '../types';

const module: CourseModule = {
  "id": "sql-python",
  "title": "SQL и Python: SQLite в памяти",
  "track": "advanced",
  "depth": "Вводная последовательность",
  "goal": "Создавать учебные таблицы, выполнять параметризованные запросы и строить связанный отчёт без рабочей базы данных.",
  "prerequisites": [
    "data",
    "functions"
  ],
  "lessons": [
    {
      "id": "sql-python-connection",
      "title": "SQLite в памяти: соединение, схема и строки",
      "goal": "Открыть учебную базу, создать таблицу и прочитать строки без внешнего сервера.",
      "prerequisites": [],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "sql-python-connection-step-1",
          "title": "Что здесь является базой",
          "paragraphs": [
            "SQLite — библиотека реляционной базы данных, которую можно вызвать из стандартного модуля sqlite3. Отдельный сервер для этих упражнений не нужен. Соединение sqlite3.connect(\":memory:\") создаёт новую базу в памяти данного соединения. Это настоящие SQL-запросы, но данные не отправляются в рабочую базу StudyPy и не сохраняются после завершения запуска. Два обычных соединения с \":memory:\" имеют разные независимые базы.",
            "Таблица описывается схемой: CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT). Столбцы имеют имена, id служит ключом строки. Строка Python с SQL передаётся в conn.execute(...); Python разбирает вызов, SQLite — текст запроса. Ошибка SQL сообщается как исключение sqlite3, например OperationalError. Это не отдельный язык вместо Python, а язык запросов внутри программы."
          ],
          "examples": [
            {
              "id": "sql-python-connection-example-1",
              "title": "Своя таблица",
              "code": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE notes(id INTEGER PRIMARY KEY, text TEXT)\")\nprint(conn.execute(\"SELECT text FROM notes\").fetchall())\nconn.close()",
              "output": "[]",
              "explanation": "Пустая существующая таблица даёт пустой список, а не ошибку."
            }
          ],
          "goal": "Объяснить: SQLite — библиотека реляционной базы данных, которую можно вызвать из стандартного модуля sqlite3.",
          "prerequisites": []
        },
        {
          "id": "sql-python-connection-step-2",
          "title": "Курсор и отсутствие строки",
          "paragraphs": [
            "execute возвращает курсор. fetchall() получает оставшиеся строки списком кортежей; fetchone() получает одну строку-кортеж или None, если строк больше нет. Даже один выбранный столбец даёт кортеж из одного элемента. Сначала проверь None, потом читай row[0]. Пустой результат — не обязательно ошибка: подходящих данных может не быть.",
            "В заданиях с переданным conn не открывай вместо него новую базу: подготовленные таблицы находятся именно в этом соединении. Создание тестом исходной таблицы — подготовка данных, а запрос и требуемое изменение выполняет твоя функция. Не закрывай чужое соединение. Самостоятельно созданное соединение в обычной программе закрывают через close; контекст with conn управляет транзакцией, но не закрывает соединение."
          ],
          "examples": [
            {
              "id": "sql-python-connection-example-2",
              "title": "Одна строка и отсутствие",
              "code": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nprint(conn.execute(\"SELECT 7\").fetchone())\nprint(conn.execute(\"SELECT 7 WHERE 0\").fetchone())\nconn.close()",
              "output": "(7,)\nNone",
              "explanation": "Первый запрос возвращает одноэлементный кортеж, второй не имеет строк и возвращает None."
            }
          ],
          "goal": "Объяснить: execute возвращает курсор.",
          "prerequisites": [
            "sql-python-connection-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sql-python-create-schema",
          "kind": "code",
          "title": "Создать каталог",
          "goal": "Создать проверяемую схему вместо печати обещания.",
          "prerequisites": [
            "sql-python-connection"
          ],
          "prompt": "Реализуй create_books(conn): создай таблицу books со столбцами id INTEGER PRIMARY KEY, title TEXT, price INTEGER именно в этом порядке. Ничего не возвращай. Проверка прочитает созданную схему.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "Передаётся новое открытое соединение SQLite без таблицы books.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\n",
                "[create_books(conn), [str(r[1])+\":\"+str(r[2])+\":\"+str(r[5]) for r in conn.execute(\"PRAGMA table_info(books)\")]]"
              ],
              "output": "[null, [\"id:INTEGER:1\", \"title:TEXT:0\", \"price:INTEGER:0\"]]",
              "explanation": "После вызова схема содержит id:INTEGER:1, title:TEXT:0, price:INTEGER:0. Результат None у самой функции допустим. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\n",
              "expression": "[create_books(conn), [str(r[1])+\":\"+str(r[2])+\":\"+str(r[5]) for r in conn.execute(\"PRAGMA table_info(books)\")]]",
              "expectedValue": [
                null,
                [
                  "id:INTEGER:1",
                  "title:TEXT:0",
                  "price:INTEGER:0"
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            }
          ],
          "reference": "def create_books(conn):\n    conn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER)\")",
          "alternative": "def create_books(conn):\n    cursor=conn.cursor()\n    cursor.execute(\"CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, price INTEGER)\")",
          "wrongSolutions": [
            {
              "code": "def create_books(conn):\n    pass",
              "why": "Функция ничего не создаёт."
            },
            {
              "code": "def create_books(conn):\n    conn.execute('CREATE TABLE books(id TEXT, price INTEGER, title TEXT)')",
              "why": "Неверны тип ключа и порядок столбцов."
            }
          ],
          "hints": [
            "Работай с переданным conn.",
            "Нужен CREATE TABLE и три объявления столбцов.",
            "PRIMARY KEY относится к id; порядок title перед price."
          ],
          "solutionExplanation": [
            "После вызова схема содержит id:INTEGER:1, title:TEXT:0, price:INTEGER:0. Результат None у самой функции допустим."
          ],
          "required": true
        },
        {
          "id": "sql-python-read-all",
          "kind": "code",
          "title": "Прочитать названия",
          "goal": "Преобразовать строки результата в простой список значений.",
          "prerequisites": [
            "sql-python-connection"
          ],
          "prompt": "Реализуй titles(conn): верни список строк title из таблицы books в порядке id. Для пустой таблицы верни []. Схема уже создана.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "От 0 до 30 книг, id уникальны, title — непустой текст.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
                "titles(conn)"
              ],
              "output": "[]",
              "explanation": "Получаются [] для пустой таблицы или список названий в стабильном порядке ключа. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(9, 'Z', 1, 'x'), (2, 'A', 2, 'x')])\nconn.commit()\n",
                "titles(conn)"
              ],
              "output": "[\"A\", \"Z\"]",
              "explanation": "Получаются [] для пустой таблицы или список названий в стабильном порядке ключа. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
              "expression": "titles(conn)",
              "expectedValue": [],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "titles(conn)",
              "expectedValue": [
                "Основы",
                "O'Reilly",
                "Практика",
                "Записки"
              ],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(9, 'Z', 1, 'x'), (2, 'A', 2, 'x')])\nconn.commit()\n",
              "expression": "titles(conn)",
              "expectedValue": [
                "A",
                "Z"
              ],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            }
          ],
          "reference": "def titles(conn):\n    rows=conn.execute(\"SELECT title FROM books ORDER BY id\").fetchall()\n    return [row[0] for row in rows]",
          "alternative": "def titles(conn):\n    result=[]\n    for row in conn.execute(\"SELECT title FROM books ORDER BY id\"):\n        result.append(row[0])\n    return result",
          "wrongSolutions": [
            {
              "code": "def titles(conn):\n    return conn.execute('SELECT title FROM books ORDER BY id').fetchall()",
              "why": "Возвращены кортежи, а контракт требует строки."
            },
            {
              "code": "def titles(conn):\n    return []",
              "why": "Данные игнорируются."
            }
          ],
          "hints": [
            "Запрос выберет title и задаст ORDER BY id.",
            "Каждая строка результата — кортеж из одного элемента.",
            "Собери row[0] для каждой строки."
          ],
          "solutionExplanation": [
            "Получаются [] для пустой таблицы или список названий в стабильном порядке ключа."
          ],
          "required": true
        },
        {
          "id": "sql-python-first-title",
          "kind": "code",
          "title": "Первая строка или None",
          "goal": "Различить пустой результат и существующее строковое значение.",
          "prerequisites": [
            "sql-python-connection"
          ],
          "prompt": "Реализуй first_title(conn): верни title книги с наименьшим id. Если books пуста, верни None.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "Таблица books существует, 0–30 строк; title не NULL.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
                "first_title(conn)"
              ],
              "output": "null",
              "explanation": "None выражает отсутствие книги; существующая строка возвращается без кортежной оболочки. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(7, 'Текст', 1, 'x')])\nconn.commit()\n",
                "first_title(conn)"
              ],
              "output": "\"Текст\"",
              "explanation": "None выражает отсутствие книги; существующая строка возвращается без кортежной оболочки. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
              "expression": "first_title(conn)",
              "expectedValue": null,
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "first_title(conn)",
              "expectedValue": "Основы",
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(7, 'Текст', 1, 'x')])\nconn.commit()\n",
              "expression": "first_title(conn)",
              "expectedValue": "Текст",
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            }
          ],
          "reference": "def first_title(conn):\n    row=conn.execute(\"SELECT title FROM books ORDER BY id LIMIT 1\").fetchone()\n    if row is None:\n        return None\n    return row[0]",
          "alternative": "def first_title(conn):\n    rows=conn.execute(\"SELECT title FROM books ORDER BY id\").fetchall()\n    if not rows:\n        return None\n    return rows[0][0]",
          "wrongSolutions": [
            {
              "code": "def first_title(conn):\n    return conn.execute('SELECT title FROM books ORDER BY id LIMIT 1').fetchone()[0]",
              "why": "Пустой результат нельзя индексировать."
            },
            {
              "code": "def first_title(conn):\n    return ''",
              "why": "Отсутствие строки не равно пустому названию."
            }
          ],
          "hints": [
            "fetchone может вернуть None.",
            "Проверь отсутствие до row[0].",
            "LIMIT 1 и ORDER BY id задают нужную первую строку."
          ],
          "solutionExplanation": [
            "None выражает отсутствие книги; существующая строка возвращается без кортежной оболочки."
          ],
          "required": true
        },
        {
          "id": "sql-python-memory-isolation",
          "kind": "choice",
          "title": "Где живут данные?",
          "goal": "Где живут данные?",
          "prerequisites": [
            "sql-python-connection"
          ],
          "prompt": "Выбери верные утверждения об учебном SQLite.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "[]",
              "explanation": "Аналог: в новой таблице notes пока нет строк, SELECT вернёт []. Новое отдельное соединение даже не имеет этой таблицы."
            }
          ],
          "answer": [
            "1",
            "3"
          ],
          "hints": [
            "Важен конкретный объект соединения.",
            "Два обычных :memory: не разделяют одну базу.",
            "with conn относится к транзакции."
          ],
          "solutionExplanation": [
            "База принадлежит соединению в памяти; закрытие завершает её жизнь, а with не заменяет close."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "SQLite выполняет настоящие SQL-запросы без отдельного сервера."
            },
            {
              "id": "2",
              "text": "Любые два :memory: автоматически видят одни таблицы."
            },
            {
              "id": "3",
              "text": "fetchone возвращает None, если строк нет."
            },
            {
              "id": "4",
              "text": "with conn автоматически закрывает conn."
            }
          ]
        }
      ]
    },
    {
      "id": "sql-python-insert",
      "title": "INSERT и параметры: данные отдельно от SQL",
      "goal": "Добавлять одиночные и пакетные записи, безопасно передавая текст и None.",
      "prerequisites": [
        "sql-python-connection"
      ],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "sql-python-insert-step-1",
          "title": "Запрос и значения не склеиваются",
          "paragraphs": [
            "Команда INSERT INTO books(title, price) VALUES (?, ?) содержит места для значений. Вторым аргументом execute передают последовательность: (title, price). sqlite3 связывает данные с параметрами, поэтому апостроф в названии не ломает запрос и не превращается в SQL-команду. Не собирай такой запрос f-строкой или через +. Параметры обозначают значения, а не имена таблиц или столбцов.",
            "Для одного значения нужна одноэлементная последовательность (text,): запятая создаёт кортеж. Запись (text) остаётся обычной строкой, а строка не является правильным набором из одного параметра. Количество ? должно совпадать с числом переданных значений. Имена столбцов в INSERT помогают не зависеть от случайного порядка полей схемы."
          ],
          "examples": [
            {
              "id": "sql-python-insert-example-1",
              "title": "Апостроф как данные",
              "code": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE notes(text TEXT)\")\nconn.execute(\"INSERT INTO notes(text) VALUES (?)\",(\"O'Reilly\",))\nconn.commit()\nprint(conn.execute(\"SELECT text FROM notes\").fetchone()[0])\nconn.close()",
              "output": "O'Reilly",
              "explanation": "Значение с апострофом проходит через параметр, а не вставляется внутрь текста SQL."
            }
          ],
          "goal": "Объяснить: Команда INSERT INTO books(title, price) VALUES (?, ?) содержит места для значений.",
          "prerequisites": [
            "sql-python-connection"
          ]
        },
        {
          "id": "sql-python-insert-step-2",
          "title": "Много строк и отсутствующее значение",
          "paragraphs": [
            "executemany выполняет один подготовленный запрос для нескольких наборов значений. Пустой список не добавляет строк; дубликаты сохраняются, если схема их не запрещает. Не заменяй None строкой \"None\": Python None передаётся в SQL как NULL, то есть отсутствие значения, а текст остаётся текстом. Различие проявится в выборках и агрегатах.",
            "По умолчанию Python 3.12 использует режим совместимости управления транзакциями: INSERT открывает транзакцию, commit подтверждает изменения, rollback отменяет незавершённые. В учебных задачах создание исходных данных уже завершено тестовой подготовкой. Следуй контракту: если функция должна подтверждать запись, вызови commit; реальные гарантии и ошибку на середине группы разберём отдельно."
          ],
          "examples": [
            {
              "id": "sql-python-insert-example-2",
              "title": "Пакет и NULL",
              "code": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE marks(name TEXT, score INTEGER)\")\nconn.executemany(\"INSERT INTO marks VALUES (?,?)\",[(\"А\",5),(\"Б\",None)])\nconn.commit()\nprint(conn.execute(\"SELECT name,score FROM marks ORDER BY name\").fetchall())\nconn.close()",
              "output": "[('А', 5), ('Б', None)]",
              "explanation": "None становится SQL NULL и при чтении возвращается как None."
            }
          ],
          "goal": "Объяснить: executemany выполняет один подготовленный запрос для нескольких наборов значений.",
          "prerequisites": [
            "sql-python-insert-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sql-python-add-book",
          "kind": "code",
          "title": "Добавить книгу",
          "goal": "Передать опасные для склейки символы как обычные данные.",
          "prerequisites": [
            "sql-python-insert"
          ],
          "prompt": "Реализуй add_book(conn, title, price): добавь в books одну запись title, price, category=\"новое\"; id создаётся INTEGER PRIMARY KEY автоматически. Подтверди изменение commit. Ничего не возвращай.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "title — строка 1–100, price — целое 0–1000000; books существует.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
                "[add_book(conn,\"Начало\",10), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]"
              ],
              "output": "[null, [[1, \"Начало\", 10, \"новое\"]]]",
              "explanation": "Параметры сохраняют текст буквально, включая апострофы и похожие на SQL символы. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
                "[add_book(conn,\"SQL; --\",15), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]"
              ],
              "output": "[null, [[1, \"Основы\", 100, \"учёба\"], [2, \"O'Reilly\", 200, \"учёба\"], [3, \"Практика\", 150, \"учёба\"], [4, \"Записки\", null, \"прочее\"], [5, \"SQL; --\", 15, \"новое\"]]]",
              "explanation": "Параметры сохраняют текст буквально, включая апострофы и похожие на SQL символы. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
              "expression": "[add_book(conn,\"Начало\",10), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]",
              "expectedValue": [
                null,
                [
                  [
                    1,
                    "Начало",
                    10,
                    "новое"
                  ]
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
              "expression": "[add_book(conn,\"O'Reilly\",0), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]",
              "expectedValue": [
                null,
                [
                  [
                    1,
                    "O'Reilly",
                    0,
                    "новое"
                  ]
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "[add_book(conn,\"SQL; --\",15), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]",
              "expectedValue": [
                null,
                [
                  [
                    1,
                    "Основы",
                    100,
                    "учёба"
                  ],
                  [
                    2,
                    "O'Reilly",
                    200,
                    "учёба"
                  ],
                  [
                    3,
                    "Практика",
                    150,
                    "учёба"
                  ],
                  [
                    4,
                    "Записки",
                    null,
                    "прочее"
                  ],
                  [
                    5,
                    "SQL; --",
                    15,
                    "новое"
                  ]
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            }
          ],
          "reference": "def add_book(conn,title,price):\n    conn.execute(\"INSERT INTO books(title,price,category) VALUES (?,?,?)\",(title,price,\"новое\"))\n    conn.commit()",
          "alternative": "def add_book(conn,title,price):\n    cursor=conn.cursor()\n    cursor.execute(\"INSERT INTO books(category,title,price) VALUES (:category,:title,:price)\",{\"category\":\"новое\",\"title\":title,\"price\":price})\n    conn.commit()",
          "wrongSolutions": [
            {
              "code": "def add_book(conn,title,price):\n    conn.execute(\"INSERT INTO books(title,price,category) VALUES ('\"+title+\"',\"+str(price)+\",'новое')\")\n    conn.commit()",
              "why": "Склейка ломается на апострофе и допускает SQL-инъекцию."
            },
            {
              "code": "def add_book(conn,title,price):\n    conn.execute('INSERT INTO books(title,price,category) VALUES (?,?,?)',(title,0,'новое'))\n    conn.commit()",
              "why": "Введённая цена заменена нулём."
            }
          ],
          "hints": [
            "SQL содержит ? вместо значений.",
            "Передай title, price и категорию вторым аргументом.",
            "После INSERT вызови commit; id не перечисляй."
          ],
          "solutionExplanation": [
            "Параметры сохраняют текст буквально, включая апострофы и похожие на SQL символы."
          ],
          "required": true
        },
        {
          "id": "sql-python-add-many",
          "kind": "code",
          "title": "Добавить пакет",
          "goal": "Выполнить пакет вставок и согласовать возвращаемый счёт с изменением базы.",
          "prerequisites": [
            "sql-python-insert"
          ],
          "prompt": "Реализуй add_batch(conn, records): records — список троек (title, price, category). Добавь все записи в books и вызови commit. Пустой пакет допустим. Верни число добавленных записей.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "0–20 троек; price — целое 0–1000000, строки не пустые.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
                "[add_batch(conn,[]), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]"
              ],
              "output": "[0, []]",
              "explanation": "Каждая тройка становится одной строкой, исходные книги сохраняются. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
                "[add_batch(conn,[(\"Повтор\",0,\"x\")]), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]"
              ],
              "output": "[1, [[1, \"Основы\", 100, \"учёба\"], [2, \"O'Reilly\", 200, \"учёба\"], [3, \"Практика\", 150, \"учёба\"], [4, \"Записки\", null, \"прочее\"], [5, \"Повтор\", 0, \"x\"]]]",
              "explanation": "Каждая тройка становится одной строкой, исходные книги сохраняются. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
              "expression": "[add_batch(conn,[]), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]",
              "expectedValue": [
                0,
                []
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
              "expression": "[add_batch(conn,[(\"A\",1,\"x\"),(\"B\",2,\"y\")]), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]",
              "expectedValue": [
                2,
                [
                  [
                    1,
                    "A",
                    1,
                    "x"
                  ],
                  [
                    2,
                    "B",
                    2,
                    "y"
                  ]
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "[add_batch(conn,[(\"Повтор\",0,\"x\")]), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]",
              "expectedValue": [
                1,
                [
                  [
                    1,
                    "Основы",
                    100,
                    "учёба"
                  ],
                  [
                    2,
                    "O'Reilly",
                    200,
                    "учёба"
                  ],
                  [
                    3,
                    "Практика",
                    150,
                    "учёба"
                  ],
                  [
                    4,
                    "Записки",
                    null,
                    "прочее"
                  ],
                  [
                    5,
                    "Повтор",
                    0,
                    "x"
                  ]
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            }
          ],
          "reference": "def add_batch(conn,records):\n    conn.executemany(\"INSERT INTO books(title,price,category) VALUES (?,?,?)\",records)\n    conn.commit()\n    return len(records)",
          "alternative": "def add_batch(conn,records):\n    added=0\n    for title,price,category in records:\n        conn.execute(\"INSERT INTO books(title,price,category) VALUES (?,?,?)\",(title,price,category))\n        added+=1\n    conn.commit()\n    return added",
          "wrongSolutions": [
            {
              "code": "def add_batch(conn,records):\n    if records:\n        conn.execute('INSERT INTO books(title,price,category) VALUES (?,?,?)',records[0])\n    conn.commit()\n    return len(records)",
              "why": "Добавлена только первая запись пакета."
            },
            {
              "code": "def add_batch(conn,records):\n    conn.executemany('INSERT INTO books(title,price,category) VALUES (?,?,?)',records)\n    conn.commit()\n    return 1",
              "why": "Количество строк не всегда равно единице."
            }
          ],
          "hints": [
            "Один SQL-запрос используется для всех троек.",
            "Пустой пакет даёт ноль изменений.",
            "executemany принимает весь records; len(records) — число добавлений."
          ],
          "solutionExplanation": [
            "Каждая тройка становится одной строкой, исходные книги сохраняются."
          ],
          "required": true
        },
        {
          "id": "sql-python-null-value",
          "kind": "code",
          "title": "Неизвестная цена",
          "goal": "Сохранить различие неизвестного значения и числового нуля.",
          "prerequisites": [
            "sql-python-insert"
          ],
          "prompt": "Реализуй add_unknown(conn, title): добавь книгу с этим title, price=NULL, category=\"ожидает\". Подтверди транзакцию. Возвращать значение не нужно.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "title — непустая строка длиной до 100.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
                "[add_unknown(conn,\"A\"), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]"
              ],
              "output": "[null, [[1, \"A\", null, \"ожидает\"]]]",
              "explanation": "В базе хранится SQL NULL, который при чтении sqlite3 вернётся как Python None. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
                "[add_unknown(conn,\"O'Reilly\"), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]"
              ],
              "output": "[null, [[1, \"Основы\", 100, \"учёба\"], [2, \"O'Reilly\", 200, \"учёба\"], [3, \"Практика\", 150, \"учёба\"], [4, \"Записки\", null, \"прочее\"], [5, \"O'Reilly\", null, \"ожидает\"]]]",
              "explanation": "В базе хранится SQL NULL, который при чтении sqlite3 вернётся как Python None. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
              "expression": "[add_unknown(conn,\"A\"), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]",
              "expectedValue": [
                null,
                [
                  [
                    1,
                    "A",
                    null,
                    "ожидает"
                  ]
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "[add_unknown(conn,\"O'Reilly\"), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]",
              "expectedValue": [
                null,
                [
                  [
                    1,
                    "Основы",
                    100,
                    "учёба"
                  ],
                  [
                    2,
                    "O'Reilly",
                    200,
                    "учёба"
                  ],
                  [
                    3,
                    "Практика",
                    150,
                    "учёба"
                  ],
                  [
                    4,
                    "Записки",
                    null,
                    "прочее"
                  ],
                  [
                    5,
                    "O'Reilly",
                    null,
                    "ожидает"
                  ]
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            }
          ],
          "reference": "def add_unknown(conn,title):\n    conn.execute(\"INSERT INTO books(title,price,category) VALUES (?,?,?)\",(title,None,\"ожидает\"))\n    conn.commit()",
          "alternative": "def add_unknown(conn,title):\n    conn.execute(\"INSERT INTO books(title,price,category) VALUES (?,NULL,?)\",(title,\"ожидает\"))\n    conn.commit()",
          "wrongSolutions": [
            {
              "code": "def add_unknown(conn,title):\n    conn.execute('INSERT INTO books(title,price,category) VALUES (?,?,?)',(title,'None','ожидает'))\n    conn.commit()",
              "why": "Строка None не является NULL."
            },
            {
              "code": "def add_unknown(conn,title):\n    conn.execute('INSERT INTO books(title,price,category) VALUES (?,?,?)',(title,0,'ожидает'))\n    conn.commit()",
              "why": "Известный ноль не равен отсутствию цены."
            }
          ],
          "hints": [
            "Для SQL NULL передай Python None.",
            "Остальные поля остаются обычными параметрами.",
            "Не заключай None в кавычки в Python."
          ],
          "solutionExplanation": [
            "В базе хранится SQL NULL, который при чтении sqlite3 вернётся как Python None."
          ],
          "required": true
        },
        {
          "id": "sql-python-param-choice",
          "kind": "choice",
          "title": "Граница SQL и данных",
          "goal": "Граница SQL и данных",
          "prerequisites": [
            "sql-python-insert"
          ],
          "prompt": "Выбери безопасные способы передачи значения title.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "O'Reilly",
              "explanation": "Аналог: execute(\"INSERT INTO notes VALUES (?)\", (\"O'Reilly\",)) сохраняет апостроф как часть текста, не SQL-синтаксис."
            }
          ],
          "answer": [
            "1",
            "3"
          ],
          "hints": [
            "Параметры передаются отдельно от текста запроса.",
            "Кавычки в самом значении должны сохраняться.",
            "Именованные параметры тоже поддерживаются."
          ],
          "solutionExplanation": [
            "Qmark и именованные параметры отделяют код запроса от данных."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "execute(\"SELECT * FROM books WHERE title = ?\", (title,))"
            },
            {
              "id": "2",
              "text": "execute(\"SELECT * FROM books WHERE title = '\" + title + \"'\")"
            },
            {
              "id": "3",
              "text": "execute(\"SELECT * FROM books WHERE title = :t\", {\"t\": title})"
            },
            {
              "id": "4",
              "text": "execute(f\"SELECT * FROM books WHERE title = '{title}'\")"
            }
          ]
        }
      ]
    },
    {
      "id": "sql-python-select",
      "title": "SELECT, WHERE, ORDER BY и LIMIT",
      "goal": "Выбрать нужные столбцы и строки со стабильным порядком результата.",
      "prerequisites": [
        "sql-python-insert"
      ],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "sql-python-select-step-1",
          "title": "Какие данные нужны",
          "paragraphs": [
            "SELECT перечисляет столбцы результата, FROM указывает таблицу, WHERE фильтрует строки. Запрос SELECT title FROM books WHERE price <= ? выбирает только названия подходящих книг, не всю таблицу. NULL не ведёт себя как обычное число: сравнение price <= ? не включает строку с неизвестной ценой. Это полезно проговорить явно, чтобы не считать отсутствие нулевой стоимостью.",
            "ORDER BY задаёт порядок. Без него порядок строк не гарантируется контрактом запроса, даже если несколько запусков показали одно и то же. Для равных цен добавь второй ключ, например title, затем id, если и названия могут совпасть. ASC сортирует по возрастанию по умолчанию, DESC — по убыванию."
          ],
          "examples": [
            {
              "id": "sql-python-select-example-1",
              "title": "Отбор с порядком",
              "code": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\nrows=conn.execute(\"SELECT title,price FROM books WHERE price<=? ORDER BY price,title\",(150,)).fetchall()\nprint(rows)\nconn.close()",
              "output": "[('Основы', 100), ('Практика', 150)]",
              "explanation": "Неизвестная цена не проходит числовой фильтр; подходящие строки сортируются по цене и названию."
            }
          ],
          "goal": "Объяснить: SELECT перечисляет столбцы результата, FROM указывает таблицу, WHERE фильтрует строки.",
          "prerequisites": [
            "sql-python-insert"
          ]
        },
        {
          "id": "sql-python-select-step-2",
          "title": "Ограничение и параметры",
          "paragraphs": [
            "LIMIT n ограничивает число возвращаемых строк после сортировки. LIMIT 0 даёт пустой результат, не «без ограничений». Если ищешь самые дорогие книги, сначала сортируй price DESC, потом ограничивай. Отбор случайных первых строк и последующая сортировка в Python не равны выбору лучших по всей таблице.",
            "Параметры подходят и для границы WHERE, и для значения LIMIT. Для точного поиска текста используй = с параметром. В этом уроке не требуется поиск по части слова: LIKE имеет отдельные правила шаблонов. Явно возвращай тип из контракта: список названий или список списков [title, price]. Кортежи строк SQLite можно преобразовать list(row)."
          ],
          "examples": [
            {
              "id": "sql-python-select-example-2",
              "title": "Самая дорогая",
              "code": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\nrow=conn.execute(\"SELECT title FROM books WHERE price IS NOT NULL ORDER BY price DESC,id LIMIT 1\").fetchone()\nprint(row[0])\nconn.close()",
              "output": "O'Reilly",
              "explanation": "Сначала весь набор упорядочен по убыванию цены, затем выбрана первая строка."
            }
          ],
          "goal": "Объяснить: LIMIT n ограничивает число возвращаемых строк после сортировки.",
          "prerequisites": [
            "sql-python-select-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sql-python-affordable",
          "kind": "code",
          "title": "Доступные книги",
          "goal": "Сочетать включённую границу и несколько ключей порядка.",
          "prerequisites": [
            "sql-python-select"
          ],
          "prompt": "Реализуй affordable(conn, limit): верни названия книг с известной ценой не выше limit, по возрастанию цены, затем title, затем id.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "limit — целое 0–1000000, до 30 книг, price может быть None.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
                "affordable(conn,150)"
              ],
              "output": "[\"Основы\", \"Практика\"]",
              "explanation": "Возвращаются только подходящие названия, а равные цены разрешаются последующими ключами. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(3, 'B', 5, 'x'), (1, 'C', 5, 'x'), (2, 'A', 5, 'x')])\nconn.commit()\n",
                "affordable(conn,5)"
              ],
              "output": "[\"A\", \"B\", \"C\"]",
              "explanation": "Возвращаются только подходящие названия, а равные цены разрешаются последующими ключами. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "affordable(conn,150)",
              "expectedValue": [
                "Основы",
                "Практика"
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "affordable(conn,0)",
              "expectedValue": [],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
              "expression": "affordable(conn,100)",
              "expectedValue": [],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(3, 'B', 5, 'x'), (1, 'C', 5, 'x'), (2, 'A', 5, 'x')])\nconn.commit()\n",
              "expression": "affordable(conn,5)",
              "expectedValue": [
                "A",
                "B",
                "C"
              ],
              "expectedOutput": "",
              "description": "Набор данных 4: результат и изменения базы"
            }
          ],
          "reference": "def affordable(conn,limit):\n    rows=conn.execute(\"SELECT title FROM books WHERE price<=? ORDER BY price,title,id\",(limit,))\n    return [row[0] for row in rows]",
          "alternative": "def affordable(conn,limit):\n    rows=conn.execute(\"SELECT title,price,id FROM books WHERE price<=?\",(limit,)).fetchall()\n    rows.sort(key=lambda row:(row[1],row[0],row[2]))\n    return [row[0] for row in rows]",
          "wrongSolutions": [
            {
              "code": "def affordable(conn,limit):\n    return [r[0] for r in conn.execute('SELECT title FROM books WHERE price<? ORDER BY price,title,id',(limit,))]",
              "why": "Граница должна включаться."
            },
            {
              "code": "def affordable(conn,limit):\n    return [r[0] for r in conn.execute('SELECT title FROM books ORDER BY id')]",
              "why": "Нет отбора по известной цене и порогу."
            }
          ],
          "hints": [
            "WHERE price <= ? исключает и слишком дорогие, и NULL.",
            "Порядок задаётся price, title, id.",
            "Из каждой строки нужен только первый выбранный столбец."
          ],
          "solutionExplanation": [
            "Возвращаются только подходящие названия, а равные цены разрешаются последующими ключами."
          ],
          "required": true
        },
        {
          "id": "sql-python-exact-title",
          "kind": "code",
          "title": "Поиск точного названия",
          "goal": "Сохранить все совпадения и безопасно сравнить текст.",
          "prerequisites": [
            "sql-python-select"
          ],
          "prompt": "Реализуй find_ids(conn, title): верни список id книг с точным title по возрастанию id. Одинаковые названия допустимы, отсутствующее название даёт [].",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "title — произвольная непустая строка до 100, до 30 книг.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
                "find_ids(conn,\"O'Reilly\")"
              ],
              "output": "[2]",
              "explanation": "Точное равенство не превращает совпадения в уникальные строки; каждый id сохраняется. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'A', 1, 'x'), (3, 'A', 2, 'y'), (2, 'B', 1, 'x')])\nconn.commit()\n",
                "find_ids(conn,\"A\")"
              ],
              "output": "[1, 3]",
              "explanation": "Точное равенство не превращает совпадения в уникальные строки; каждый id сохраняется. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "find_ids(conn,\"O'Reilly\")",
              "expectedValue": [
                2
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
              "expression": "find_ids(conn,\"нет\")",
              "expectedValue": [],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'A', 1, 'x'), (3, 'A', 2, 'y'), (2, 'B', 1, 'x')])\nconn.commit()\n",
              "expression": "find_ids(conn,\"A\")",
              "expectedValue": [
                1,
                3
              ],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            }
          ],
          "reference": "def find_ids(conn,title):\n    return [row[0] for row in conn.execute(\"SELECT id FROM books WHERE title=? ORDER BY id\",(title,))]",
          "alternative": "def find_ids(conn,title):\n    rows=conn.execute(\"SELECT id,title FROM books ORDER BY id\").fetchall()\n    return [row[0] for row in rows if row[1]==title]",
          "wrongSolutions": [
            {
              "code": "def find_ids(conn,title):\n    return [r[0] for r in conn.execute('SELECT id FROM books ORDER BY id')]",
              "why": "Возвращены все id без фильтра."
            },
            {
              "code": "def find_ids(conn,title):\n    r=conn.execute('SELECT id FROM books WHERE title=? ORDER BY id',(title,)).fetchone()\n    return [] if r is None else [r[0]]",
              "why": "Учитывается только одна из нескольких одинаковых книг."
            }
          ],
          "hints": [
            "Сравни title с параметром через =.",
            "Названий может быть несколько одинаковых.",
            "Выбери все строки, а не только fetchone."
          ],
          "solutionExplanation": [
            "Точное равенство не превращает совпадения в уникальные строки; каждый id сохраняется."
          ],
          "required": true
        },
        {
          "id": "sql-python-top",
          "kind": "code",
          "title": "Первые по цене",
          "goal": "Построить детерминированный top-N с отсутствующими данными.",
          "prerequisites": [
            "sql-python-select"
          ],
          "prompt": "Реализуй top_books(conn, amount): верни список списков [title, price] для amount самых дорогих книг с известной ценой. При равной цене раньше меньший id. amount=0 даёт [].",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "amount — целое 0–30; price — None или целое 0–1000000.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
                "top_books(conn,2)"
              ],
              "output": "[[\"O'Reilly\", 200], [\"Практика\", 150]]",
              "explanation": "Сортировка до ограничения выбирает лучшие по всему набору; явный дополнительный ключ убирает неоднозначность. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(2, 'B', 5, 'x'), (1, 'A', 5, 'x'), (3, 'C', None, 'x')])\nconn.commit()\n",
                "top_books(conn,5)"
              ],
              "output": "[[\"A\", 5], [\"B\", 5]]",
              "explanation": "Сортировка до ограничения выбирает лучшие по всему набору; явный дополнительный ключ убирает неоднозначность. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "top_books(conn,2)",
              "expectedValue": [
                [
                  "O'Reilly",
                  200
                ],
                [
                  "Практика",
                  150
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "top_books(conn,0)",
              "expectedValue": [],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
              "expression": "top_books(conn,3)",
              "expectedValue": [],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(2, 'B', 5, 'x'), (1, 'A', 5, 'x'), (3, 'C', None, 'x')])\nconn.commit()\n",
              "expression": "top_books(conn,5)",
              "expectedValue": [
                [
                  "A",
                  5
                ],
                [
                  "B",
                  5
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 4: результат и изменения базы"
            }
          ],
          "reference": "def top_books(conn,amount):\n    rows=conn.execute(\"SELECT title,price FROM books WHERE price IS NOT NULL ORDER BY price DESC,id LIMIT ?\",(amount,))\n    return [list(row) for row in rows]",
          "alternative": "def top_books(conn,amount):\n    rows=conn.execute(\"SELECT title,price,id FROM books WHERE price IS NOT NULL\").fetchall()\n    rows.sort(key=lambda row:(-row[1],row[2]))\n    return [[row[0],row[1]] for row in rows[:amount]]",
          "wrongSolutions": [
            {
              "code": "def top_books(conn,amount):\n    return [list(r) for r in conn.execute('SELECT title,price FROM books WHERE price IS NOT NULL ORDER BY price,id LIMIT ?',(amount,))]",
              "why": "Выбраны самые дешёвые, а не дорогие."
            },
            {
              "code": "def top_books(conn,amount):\n    if amount==0:\n        amount=100\n    return [list(r) for r in conn.execute('SELECT title,price FROM books WHERE price IS NOT NULL ORDER BY price DESC,id LIMIT ?',(amount,))]",
              "why": "Нулевой LIMIT не означает отсутствие ограничения."
            }
          ],
          "hints": [
            "Отдели строки с NULL.",
            "Сортируй цену DESC, id ASC.",
            "LIMIT ограничивает уже упорядоченный набор; list(row) обеспечивает нужный тип."
          ],
          "solutionExplanation": [
            "Сортировка до ограничения выбирает лучшие по всему набору; явный дополнительный ключ убирает неоднозначность."
          ],
          "required": true
        },
        {
          "id": "sql-python-order-reason",
          "kind": "explain",
          "title": "Почему нужен ORDER BY?",
          "goal": "Почему нужен ORDER BY?",
          "prerequisites": [
            "sql-python-select"
          ],
          "prompt": "Запрос без ORDER BY несколько раз вернул одинаковый порядок. Можно ли считать его гарантированным?",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "A, B",
              "explanation": "Аналог: ORDER BY title,id задаёт порядок двух одинаково оценённых книг независимо от порядка их вставки."
            }
          ],
          "answer": [
            "2"
          ],
          "hints": [
            "Повторяемое наблюдение не равно правилу SQL.",
            "План выполнения и данные могут измениться.",
            "Если порядок важен, его нужно объявить."
          ],
          "solutionExplanation": [
            "Порядок без ORDER BY не входит в контракт; явные ключи нужны и пользователю, и тестам."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "Да, SQLite всегда возвращает строки в порядке вставки."
            },
            {
              "id": "2",
              "text": "Нет, требуемый порядок задаётся ORDER BY."
            },
            {
              "id": "3",
              "text": "Да, достаточно вызвать fetchall два раза."
            }
          ]
        }
      ]
    },
    {
      "id": "sql-python-aggregate",
      "title": "Агрегаты, GROUP BY и NULL",
      "goal": "Посчитать сводные показатели без подмены отсутствия нулём.",
      "prerequisites": [
        "sql-python-select"
      ],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "sql-python-aggregate-step-1",
          "title": "Счёт строк и счёт значений",
          "paragraphs": [
            "COUNT(*) считает строки, COUNT(price) — только ненулевые значения столбца, то есть пропускает SQL NULL. SUM(price) складывает известные цены. У пустого набора COUNT даёт 0, а SUM и AVG обычно дают NULL, который sqlite3 возвращает как None. Среднее неизвестных данных нельзя молча назвать нулём: выбери правило по смыслу задачи.",
            "COALESCE(value, fallback) берёт первое не-NULL значение. COALESCE(SUM(price),0) удобно для общей суммы пустого набора, если контракт явно определяет её как ноль. COALESCE(AVG(price),0) не всегда оправдано: среднее отсутствует, а не равно нулевой цене. В задачах различие объявляется отдельно."
          ],
          "examples": [
            {
              "id": "sql-python-aggregate-example-1",
              "title": "Разный счёт",
              "code": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\nprint(conn.execute(\"SELECT COUNT(*),COUNT(price),SUM(price),AVG(price) FROM books\").fetchone())\nconn.close()",
              "output": "(4, 3, 450, 150.0)",
              "explanation": "Всего четыре книги, но известная цена только у трёх. AVG использует именно известные цены."
            }
          ],
          "goal": "Объяснить: COUNT(*) считает строки, COUNT(price) — только ненулевые значения столбца, то есть пропускает SQL NULL.",
          "prerequisites": [
            "sql-python-select"
          ]
        },
        {
          "id": "sql-python-aggregate-step-2",
          "title": "Сводка по группам",
          "paragraphs": [
            "GROUP BY category разделяет строки на группы, затем агрегаты вычисляются внутри каждой. В SELECT перечисляй ключ группировки и агрегированные показатели. Выбор обычного негруппированного столбца в таком запросе может дать неочевидный результат SQLite и не выражает нужный контракт. После группировки порядок всё равно задаётся через ORDER BY.",
            "WHERE отбирает исходные строки до группировки, HAVING отбирает уже полученные группы по их агрегатам. Например, WHERE price IS NOT NULL исключает строки без цены, а HAVING SUM(price)>=? сохраняет категории с достаточной суммой. Проверяй пустую таблицу, группу только с NULL и нулевую известную цену: эти случаи имеют разный смысл."
          ],
          "examples": [
            {
              "id": "sql-python-aggregate-example-2",
              "title": "Пустая сумма и среднее",
              "code": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\nprint(conn.execute(\"SELECT COUNT(*),COALESCE(SUM(price),0),AVG(price) FROM books\").fetchone())\nconn.close()",
              "output": "(0, 0, None)",
              "explanation": "Счёт и выбранная по контракту сумма равны нулю, среднее остаётся None."
            }
          ],
          "goal": "Объяснить: GROUP BY category разделяет строки на группы, затем агрегаты вычисляются внутри каждой.",
          "prerequisites": [
            "sql-python-aggregate-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sql-python-price-summary",
          "kind": "code",
          "title": "Сводка цен",
          "goal": "Различить строки, известные значения и сумму.",
          "prerequisites": [
            "sql-python-aggregate"
          ],
          "prompt": "Реализуй price_summary(conn): верни список [общее число книг, число известных цен, сумма известных цен]. Для пустого набора сумма 0.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "0–30 книг; price — None или неотрицательное целое.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
                "price_summary(conn)"
              ],
              "output": "[4, 3, 450]",
              "explanation": "Все строки учитываются в первом поле; NULL исключены только из ценовых агрегатов. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'A', None, 'x'), (2, 'B', 0, 'x')])\nconn.commit()\n",
                "price_summary(conn)"
              ],
              "output": "[2, 1, 0]",
              "explanation": "Все строки учитываются в первом поле; NULL исключены только из ценовых агрегатов. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "price_summary(conn)",
              "expectedValue": [
                4,
                3,
                450
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
              "expression": "price_summary(conn)",
              "expectedValue": [
                0,
                0,
                0
              ],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'A', None, 'x'), (2, 'B', 0, 'x')])\nconn.commit()\n",
              "expression": "price_summary(conn)",
              "expectedValue": [
                2,
                1,
                0
              ],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            }
          ],
          "reference": "def price_summary(conn):\n    row=conn.execute(\"SELECT COUNT(*),COUNT(price),COALESCE(SUM(price),0) FROM books\").fetchone()\n    return list(row)",
          "alternative": "def price_summary(conn):\n    rows=conn.execute(\"SELECT price FROM books\").fetchall()\n    values=[r[0] for r in rows if r[0] is not None]\n    return [len(rows),len(values),sum(values)]",
          "wrongSolutions": [
            {
              "code": "def price_summary(conn):\n    row=conn.execute('SELECT COUNT(price),COUNT(price),SUM(price) FROM books').fetchone()\n    return list(row)",
              "why": "Общий счёт пропускает NULL, а пустая сумма не заменена нулём."
            },
            {
              "code": "def price_summary(conn):\n    n=conn.execute('SELECT COUNT(*) FROM books').fetchone()[0]\n    return [n,n,0]",
              "why": "Известность цен и реальная сумма игнорируются."
            }
          ],
          "hints": [
            "COUNT(*) и COUNT(price) отвечают на разные вопросы.",
            "SUM пустого набора требует явного fallback по условию.",
            "Верни list(row), а не кортеж."
          ],
          "solutionExplanation": [
            "Все строки учитываются в первом поле; NULL исключены только из ценовых агрегатов."
          ],
          "required": true
        },
        {
          "id": "sql-python-mean",
          "kind": "code",
          "title": "Средняя известная цена",
          "goal": "Сохранить смысл отсутствующего среднего.",
          "prerequisites": [
            "sql-python-aggregate"
          ],
          "prompt": "Реализуй mean_price(conn): верни AVG(price), то есть float для известных цен или None при их отсутствии. Не подменяй None нулём.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "0–30 книг; известные цены — целые 0–1000000.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
                "mean_price(conn)"
              ],
              "output": "150.0",
              "explanation": "Среднее вычисляется только по известным значениям, а пустота выражается None. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'A', 0, 'x'), (2, 'B', 3, 'x')])\nconn.commit()\n",
                "mean_price(conn)"
              ],
              "output": "1.5",
              "explanation": "Среднее вычисляется только по известным значениям, а пустота выражается None. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "mean_price(conn)",
              "expectedValue": 150.0,
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
              "expression": "mean_price(conn)",
              "expectedValue": null,
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'A', None, 'x')])\nconn.commit()\n",
              "expression": "mean_price(conn)",
              "expectedValue": null,
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'A', 0, 'x'), (2, 'B', 3, 'x')])\nconn.commit()\n",
              "expression": "mean_price(conn)",
              "expectedValue": 1.5,
              "expectedOutput": "",
              "description": "Набор данных 4: результат и изменения базы"
            }
          ],
          "reference": "def mean_price(conn):\n    return conn.execute(\"SELECT AVG(price) FROM books\").fetchone()[0]",
          "alternative": "def mean_price(conn):\n    values=[r[0] for r in conn.execute(\"SELECT price FROM books\") if r[0] is not None]\n    if not values:\n        return None\n    return sum(values)/len(values)",
          "wrongSolutions": [
            {
              "code": "def mean_price(conn):\n    return conn.execute('SELECT COALESCE(AVG(price),0) FROM books').fetchone()[0]",
              "why": "Отсутствие среднего заменено нулём."
            },
            {
              "code": "def mean_price(conn):\n    row=conn.execute('SELECT SUM(price),COUNT(*) FROM books').fetchone()\n    if row[1]==0:\n        return None\n    return row[0]/row[1]",
              "why": "В знаменатель попали книги с неизвестной ценой."
            }
          ],
          "hints": [
            "AVG игнорирует NULL.",
            "Если известных цен нет, вернётся None.",
            "Из fetchone нужна первая ячейка результата."
          ],
          "solutionExplanation": [
            "Среднее вычисляется только по известным значениям, а пустота выражается None."
          ],
          "required": true
        },
        {
          "id": "sql-python-category-totals",
          "kind": "code",
          "title": "Суммы по категориям",
          "goal": "Вычислить агрегат внутри каждой группы и упорядочить итог.",
          "prerequisites": [
            "sql-python-aggregate"
          ],
          "prompt": "Реализуй category_totals(conn): верни список списков [category, сумма] по каждой категории, по алфавиту category. Сумма группы без известных цен равна 0.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "Категории — непустые строки без NULL; до 30 книг.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
                "category_totals(conn)"
              ],
              "output": "[[\"прочее\", 0], [\"учёба\", 450]]",
              "explanation": "GROUP BY сохраняет отдельную строку для каждой категории; NULL не превращается в потерю самой категории. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'A', 0, 'z'), (2, 'B', None, 'a'), (3, 'C', 5, 'z')])\nconn.commit()\n",
                "category_totals(conn)"
              ],
              "output": "[[\"a\", 0], [\"z\", 5]]",
              "explanation": "GROUP BY сохраняет отдельную строку для каждой категории; NULL не превращается в потерю самой категории. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "category_totals(conn)",
              "expectedValue": [
                [
                  "прочее",
                  0
                ],
                [
                  "учёба",
                  450
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
              "expression": "category_totals(conn)",
              "expectedValue": [],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'A', 0, 'z'), (2, 'B', None, 'a'), (3, 'C', 5, 'z')])\nconn.commit()\n",
              "expression": "category_totals(conn)",
              "expectedValue": [
                [
                  "a",
                  0
                ],
                [
                  "z",
                  5
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            }
          ],
          "reference": "def category_totals(conn):\n    rows=conn.execute(\"SELECT category,COALESCE(SUM(price),0) FROM books GROUP BY category ORDER BY category\")\n    return [list(row) for row in rows]",
          "alternative": "def category_totals(conn):\n    totals={}\n    for category,price in conn.execute(\"SELECT category,price FROM books\"):\n        totals[category]=totals.get(category,0)+(0 if price is None else price)\n    return [[key,totals[key]] for key in sorted(totals)]",
          "wrongSolutions": [
            {
              "code": "def category_totals(conn):\n    return [list(r) for r in conn.execute('SELECT category,SUM(price) FROM books GROUP BY category ORDER BY category')]",
              "why": "Группа с одними NULL должна иметь сумму 0."
            },
            {
              "code": "def category_totals(conn):\n    return [list(r) for r in conn.execute('SELECT category,COALESCE(SUM(price),0) FROM books ORDER BY category')]",
              "why": "Отсутствие GROUP BY сливает категории в один итог."
            }
          ],
          "hints": [
            "Ключ группировки — category.",
            "Каждая группа имеет свою SUM(price).",
            "Поставь COALESCE вокруг суммы и ORDER BY category после GROUP BY."
          ],
          "solutionExplanation": [
            "GROUP BY сохраняет отдельную строку для каждой категории; NULL не превращается в потерю самой категории."
          ],
          "required": true
        },
        {
          "id": "sql-python-null-count",
          "kind": "predict",
          "title": "Строка без значения",
          "goal": "Строка без значения",
          "prerequisites": [
            "sql-python-aggregate"
          ],
          "prompt": "Предскажи вывод: отличаются COUNT(*) и COUNT(x).",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "1 0",
              "explanation": "Аналог: таблица из одной строки x=NULL даёт COUNT(*)=1 и COUNT(x)=0."
            }
          ],
          "answer": "2 1 0",
          "hints": [
            "Одна строка имеет NULL, другая известный ноль.",
            "COUNT(x) не считает NULL.",
            "SUM нулевой известной цены равна нулю."
          ],
          "solutionExplanation": [
            "Таблица содержит две строки, одно известное значение и сумму 0."
          ],
          "required": true,
          "initialCode": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE t(x INTEGER)\")\nconn.executemany(\"INSERT INTO t VALUES (?)\",[(None,),(0,)])\nrow=conn.execute(\"SELECT COUNT(*),COUNT(x),SUM(x) FROM t\").fetchone()\nprint(*row)\nconn.close()"
        }
      ]
    },
    {
      "id": "sql-python-transactions",
      "title": "UPDATE, DELETE и транзакция",
      "goal": "Изменить нужные строки и сохранить атомарность связанных действий.",
      "prerequisites": [
        "sql-python-aggregate"
      ],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "sql-python-transactions-step-1",
          "title": "Изменение — это тоже запрос",
          "paragraphs": [
            "UPDATE books SET price=? WHERE id=? изменяет только строки, удовлетворяющие WHERE. Без WHERE изменится вся таблица. DELETE FROM books WHERE ... удаляет строки, не таблицу; DROP TABLE удаляет саму структуру. Пустое множество подходящих строк обычно не является исключением. rowcount курсора сообщает число затронутых строк для обычных INSERT, UPDATE и DELETE.",
            "Параметры остаются обязательными для значений и здесь. Цена после скидки может вычисляться выражением столбца в SQL, но правило округления нужно объявить. Если NULL означает неизвестную цену, не подменяй её нулём без отдельного требования. Проверь точную границу удаления: «ниже» не равно «не выше»."
          ],
          "examples": [
            {
              "id": "sql-python-transactions-example-1",
              "title": "Адресное обновление",
              "code": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\nconn.execute(\"UPDATE books SET price=? WHERE id=?\",(120,1))\nconn.commit()\nprint(conn.execute(\"SELECT id,price FROM books WHERE id=1\").fetchone())\nconn.close()",
              "output": "(1, 120)",
              "explanation": "WHERE ограничивает изменение одной книгой; commit подтверждает запись."
            }
          ],
          "goal": "Объяснить: UPDATE books SET price=? WHERE id=? изменяет только строки, удовлетворяющие WHERE.",
          "prerequisites": [
            "sql-python-aggregate"
          ]
        },
        {
          "id": "sql-python-transactions-step-2",
          "title": "Все действия или ни одного",
          "paragraphs": [
            "Перевод между счетами содержит списание и зачисление. Если второе действие не получилось, первое нельзя оставлять завершённым. Транзакция группирует изменения: commit подтверждает их, rollback отменяет незавершённые. В этой последовательности используем режим Python 3.12 по умолчанию; контекст with conn подтверждает успешную открытую транзакцию и откатывает её при исключении. Он не закрывает соединение.",
            "Не подтверждай списание до проверки получателя. Исключение должно выйти из контекста, иначе менеджер увидит успешное завершение. После обработки ошибки на внешнем уровне можно показать сообщение; сама операция обязана оставить базу согласованной. Это учебная однопользовательская модель, не руководство по финансовой системе с конкурентными запросами, аудитом и отказами сети."
          ],
          "examples": [
            {
              "id": "sql-python-transactions-example-2",
              "title": "Отмена группы",
              "code": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE notes(text TEXT)\")\ntry:\n    with conn:\n        conn.execute(\"INSERT INTO notes VALUES (?)\",(\"черновик\",))\n        raise ValueError(\"отмена\")\nexcept ValueError:\n    pass\nprint(conn.execute(\"SELECT COUNT(*) FROM notes\").fetchone()[0])\nconn.close()",
              "output": "0",
              "explanation": "Исключение выходит из with, поэтому вставка откатывается и таблица остаётся пустой."
            }
          ],
          "goal": "Объяснить: Перевод между счетами содержит списание и зачисление.",
          "prerequisites": [
            "sql-python-transactions-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sql-python-update-price",
          "kind": "code",
          "title": "Изменить одну цену",
          "goal": "Связать число изменений с фактической адресной записью.",
          "prerequisites": [
            "sql-python-transactions"
          ],
          "prompt": "Реализуй set_price(conn, book_id, price): обнови цену только указанного id, подтверди транзакцию и верни число изменённых строк. Отсутствующий id даёт 0.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "book_id — целое 1–1000000, price — целое 0–1000000.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
                "[set_price(conn,2,99), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]"
              ],
              "output": "[1, [[1, \"Основы\", 100, \"учёба\"], [2, \"O'Reilly\", 99, \"учёба\"], [3, \"Практика\", 150, \"учёба\"], [4, \"Записки\", null, \"прочее\"]]]",
              "explanation": "Адресное обновление сохраняет остальные строки; rowcount отличает найденный id от отсутствующего. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
                "[set_price(conn,1,0), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]"
              ],
              "output": "[0, []]",
              "explanation": "Адресное обновление сохраняет остальные строки; rowcount отличает найденный id от отсутствующего. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "[set_price(conn,2,99), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]",
              "expectedValue": [
                1,
                [
                  [
                    1,
                    "Основы",
                    100,
                    "учёба"
                  ],
                  [
                    2,
                    "O'Reilly",
                    99,
                    "учёба"
                  ],
                  [
                    3,
                    "Практика",
                    150,
                    "учёба"
                  ],
                  [
                    4,
                    "Записки",
                    null,
                    "прочее"
                  ]
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "[set_price(conn,99,10), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]",
              "expectedValue": [
                0,
                [
                  [
                    1,
                    "Основы",
                    100,
                    "учёба"
                  ],
                  [
                    2,
                    "O'Reilly",
                    200,
                    "учёба"
                  ],
                  [
                    3,
                    "Практика",
                    150,
                    "учёба"
                  ],
                  [
                    4,
                    "Записки",
                    null,
                    "прочее"
                  ]
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
              "expression": "[set_price(conn,1,0), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]",
              "expectedValue": [
                0,
                []
              ],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            }
          ],
          "reference": "def set_price(conn,book_id,price):\n    cursor=conn.execute(\"UPDATE books SET price=? WHERE id=?\",(price,book_id))\n    conn.commit()\n    return cursor.rowcount",
          "alternative": "def set_price(conn,book_id,price):\n    cursor=conn.cursor()\n    cursor.execute(\"UPDATE books SET price=:price WHERE id=:id\",{\"price\":price,\"id\":book_id})\n    result=cursor.rowcount\n    conn.commit()\n    return result",
          "wrongSolutions": [
            {
              "code": "def set_price(conn,book_id,price):\n    c=conn.execute('UPDATE books SET price=?',(price,))\n    conn.commit()\n    return c.rowcount",
              "why": "Нет WHERE, поэтому меняются все книги."
            },
            {
              "code": "def set_price(conn,book_id,price):\n    conn.execute('UPDATE books SET price=? WHERE id=?',(price,book_id))\n    conn.commit()\n    return 1",
              "why": "Отсутствующий id тоже ошибочно сообщает изменение."
            }
          ],
          "hints": [
            "UPDATE должен иметь WHERE id=?.",
            "Значения передай параметрами в порядке price, id.",
            "Возьми rowcount у курсора до возврата."
          ],
          "solutionExplanation": [
            "Адресное обновление сохраняет остальные строки; rowcount отличает найденный id от отсутствующего."
          ],
          "required": true
        },
        {
          "id": "sql-python-delete-old",
          "kind": "code",
          "title": "Удалить дешёвые книги",
          "goal": "Проверить строгую границу разрушительного действия на изолированных данных.",
          "prerequisites": [
            "sql-python-transactions"
          ],
          "prompt": "Реализуй remove_below(conn, limit): удали книги с известной ценой строго ниже limit. NULL и цена ровно limit остаются. Подтверди изменения, верни число удалённых строк.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "База исключительно учебная в памяти, limit — целое 0–1000000.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
                "[remove_below(conn,150), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]"
              ],
              "output": "[1, [[2, \"O'Reilly\", 200, \"учёба\"], [3, \"Практика\", 150, \"учёба\"], [4, \"Записки\", null, \"прочее\"]]]",
              "explanation": "Число удалений соответствует только строкам с известной ценой ниже порога. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
                "[remove_below(conn,100), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]"
              ],
              "output": "[0, []]",
              "explanation": "Число удалений соответствует только строкам с известной ценой ниже порога. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "[remove_below(conn,150), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]",
              "expectedValue": [
                1,
                [
                  [
                    2,
                    "O'Reilly",
                    200,
                    "учёба"
                  ],
                  [
                    3,
                    "Практика",
                    150,
                    "учёба"
                  ],
                  [
                    4,
                    "Записки",
                    null,
                    "прочее"
                  ]
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[(1, 'Основы', 100, 'учёба'), (2, \"O'Reilly\", 200, 'учёба'), (3, 'Практика', 150, 'учёба'), (4, 'Записки', None, 'прочее')])\nconn.commit()\n",
              "expression": "[remove_below(conn,0), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]",
              "expectedValue": [
                0,
                [
                  [
                    1,
                    "Основы",
                    100,
                    "учёба"
                  ],
                  [
                    2,
                    "O'Reilly",
                    200,
                    "учёба"
                  ],
                  [
                    3,
                    "Практика",
                    150,
                    "учёба"
                  ],
                  [
                    4,
                    "Записки",
                    null,
                    "прочее"
                  ]
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE books(id INTEGER PRIMARY KEY, title TEXT, price INTEGER, category TEXT)\")\nconn.executemany(\"INSERT INTO books VALUES(?,?,?,?)\",[])\nconn.commit()\n",
              "expression": "[remove_below(conn,100), [list(row) for row in conn.execute(\"SELECT id,title,price,category FROM books ORDER BY id\")]]",
              "expectedValue": [
                0,
                []
              ],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            }
          ],
          "reference": "def remove_below(conn,limit):\n    cursor=conn.execute(\"DELETE FROM books WHERE price<?\",(limit,))\n    conn.commit()\n    return cursor.rowcount",
          "alternative": "def remove_below(conn,limit):\n    before=conn.execute(\"SELECT COUNT(*) FROM books\").fetchone()[0]\n    with conn:\n        conn.execute(\"DELETE FROM books WHERE price < ?\",(limit,))\n    after=conn.execute(\"SELECT COUNT(*) FROM books\").fetchone()[0]\n    return before-after",
          "wrongSolutions": [
            {
              "code": "def remove_below(conn,limit):\n    c=conn.execute('DELETE FROM books WHERE price<=?',(limit,))\n    conn.commit()\n    return c.rowcount",
              "why": "Цена на границе тоже удаляется."
            },
            {
              "code": "def remove_below(conn,limit):\n    c=conn.execute('DELETE FROM books')\n    conn.commit()\n    return c.rowcount",
              "why": "Удаляется вся таблица данных без фильтра."
            }
          ],
          "hints": [
            "Нужен DELETE строк, не DROP TABLE.",
            "Используй price < ?, не <=.",
            "NULL не удовлетворяет числовому сравнению и останется."
          ],
          "solutionExplanation": [
            "Число удалений соответствует только строкам с известной ценой ниже порога."
          ],
          "required": true
        },
        {
          "id": "sql-python-transfer",
          "kind": "code",
          "title": "Атомарный перевод",
          "goal": "Откатить первое изменение, если связанное второе действие невозможно.",
          "prerequisites": [
            "sql-python-transactions"
          ],
          "prompt": "Реализуй transfer(conn, source, target, amount): перенеси целую amount между accounts(id,balance). При amount < 0, отсутствии счёта или нехватке средств выброси ValueError и не меняй ни один баланс. При успехе подтверди обе записи. Возвращать ничего не нужно. source и target различны.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "Две разные целые id, amount от -1 до 1000000, балансы неотрицательны. Подготовка исходных записей уже закоммичена.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE accounts(id INTEGER PRIMARY KEY,balance INTEGER)\")\nconn.executemany(\"INSERT INTO accounts VALUES (?,?)\",[(1, 100), (2, 10)])\nconn.commit()\ndef attempt(fn,connection,source,target,amount):\n    try:\n        fn(connection,source,target,amount)\n        status=\"ok\"\n    except ValueError:\n        status=\"error\"\n    return [status,[list(r) for r in connection.execute(\"SELECT id,balance FROM accounts ORDER BY id\")]]\n",
                "attempt(transfer,conn,1,2,30)"
              ],
              "output": "[\"ok\", [[1, 70], [2, 40]]]",
              "explanation": "Успех подтверждает обе записи. При ошибке проверка читает прежние балансы: частичного перевода нет. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE accounts(id INTEGER PRIMARY KEY,balance INTEGER)\")\nconn.executemany(\"INSERT INTO accounts VALUES (?,?)\",[(1, 100), (2, 10)])\nconn.commit()\ndef attempt(fn,connection,source,target,amount):\n    try:\n        fn(connection,source,target,amount)\n        status=\"ok\"\n    except ValueError:\n        status=\"error\"\n    return [status,[list(r) for r in connection.execute(\"SELECT id,balance FROM accounts ORDER BY id\")]]\n",
                "attempt(transfer,conn,1,2,-1)"
              ],
              "output": "[\"error\", [[1, 100], [2, 10]]]",
              "explanation": "Успех подтверждает обе записи. При ошибке проверка читает прежние балансы: частичного перевода нет. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE accounts(id INTEGER PRIMARY KEY,balance INTEGER)\")\nconn.executemany(\"INSERT INTO accounts VALUES (?,?)\",[(1, 100), (2, 10)])\nconn.commit()\ndef attempt(fn,connection,source,target,amount):\n    try:\n        fn(connection,source,target,amount)\n        status=\"ok\"\n    except ValueError:\n        status=\"error\"\n    return [status,[list(r) for r in connection.execute(\"SELECT id,balance FROM accounts ORDER BY id\")]]\n",
              "expression": "attempt(transfer,conn,1,2,30)",
              "expectedValue": [
                "ok",
                [
                  [
                    1,
                    70
                  ],
                  [
                    2,
                    40
                  ]
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE accounts(id INTEGER PRIMARY KEY,balance INTEGER)\")\nconn.executemany(\"INSERT INTO accounts VALUES (?,?)\",[(1, 100), (2, 10)])\nconn.commit()\ndef attempt(fn,connection,source,target,amount):\n    try:\n        fn(connection,source,target,amount)\n        status=\"ok\"\n    except ValueError:\n        status=\"error\"\n    return [status,[list(r) for r in connection.execute(\"SELECT id,balance FROM accounts ORDER BY id\")]]\n",
              "expression": "attempt(transfer,conn,1,99,30)",
              "expectedValue": [
                "error",
                [
                  [
                    1,
                    100
                  ],
                  [
                    2,
                    10
                  ]
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE accounts(id INTEGER PRIMARY KEY,balance INTEGER)\")\nconn.executemany(\"INSERT INTO accounts VALUES (?,?)\",[(1, 100), (2, 10)])\nconn.commit()\ndef attempt(fn,connection,source,target,amount):\n    try:\n        fn(connection,source,target,amount)\n        status=\"ok\"\n    except ValueError:\n        status=\"error\"\n    return [status,[list(r) for r in connection.execute(\"SELECT id,balance FROM accounts ORDER BY id\")]]\n",
              "expression": "attempt(transfer,conn,1,2,101)",
              "expectedValue": [
                "error",
                [
                  [
                    1,
                    100
                  ],
                  [
                    2,
                    10
                  ]
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE accounts(id INTEGER PRIMARY KEY,balance INTEGER)\")\nconn.executemany(\"INSERT INTO accounts VALUES (?,?)\",[(1, 100), (2, 10)])\nconn.commit()\ndef attempt(fn,connection,source,target,amount):\n    try:\n        fn(connection,source,target,amount)\n        status=\"ok\"\n    except ValueError:\n        status=\"error\"\n    return [status,[list(r) for r in connection.execute(\"SELECT id,balance FROM accounts ORDER BY id\")]]\n",
              "expression": "attempt(transfer,conn,1,2,0)",
              "expectedValue": [
                "ok",
                [
                  [
                    1,
                    100
                  ],
                  [
                    2,
                    10
                  ]
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 4: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE accounts(id INTEGER PRIMARY KEY,balance INTEGER)\")\nconn.executemany(\"INSERT INTO accounts VALUES (?,?)\",[(1, 100), (2, 10)])\nconn.commit()\ndef attempt(fn,connection,source,target,amount):\n    try:\n        fn(connection,source,target,amount)\n        status=\"ok\"\n    except ValueError:\n        status=\"error\"\n    return [status,[list(r) for r in connection.execute(\"SELECT id,balance FROM accounts ORDER BY id\")]]\n",
              "expression": "attempt(transfer,conn,1,2,-1)",
              "expectedValue": [
                "error",
                [
                  [
                    1,
                    100
                  ],
                  [
                    2,
                    10
                  ]
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 5: результат и изменения базы"
            }
          ],
          "reference": "def transfer(conn,source,target,amount):\n    if amount<0:\n        raise ValueError(\"amount\")\n    with conn:\n        debit=conn.execute(\"UPDATE accounts SET balance=balance-? WHERE id=? AND balance>=?\",(amount,source,amount))\n        if debit.rowcount!=1:\n            raise ValueError(\"source\")\n        credit=conn.execute(\"UPDATE accounts SET balance=balance+? WHERE id=?\",(amount,target))\n        if credit.rowcount!=1:\n            raise ValueError(\"target\")",
          "alternative": "def transfer(conn,source,target,amount):\n    if amount<0:\n        raise ValueError(\"amount\")\n    try:\n        row=conn.execute(\"SELECT balance FROM accounts WHERE id=?\",(source,)).fetchone()\n        target_row=conn.execute(\"SELECT id FROM accounts WHERE id=?\",(target,)).fetchone()\n        if row is None or target_row is None or row[0]<amount:\n            raise ValueError(\"invalid\")\n        conn.execute(\"UPDATE accounts SET balance=balance-? WHERE id=?\",(amount,source))\n        conn.execute(\"UPDATE accounts SET balance=balance+? WHERE id=?\",(amount,target))\n        conn.commit()\n    except Exception:\n        conn.rollback()\n        raise",
          "wrongSolutions": [
            {
              "code": "def transfer(conn,source,target,amount):\n    if amount<0:\n        raise ValueError(\"amount\")\n    if True:\n        debit=conn.execute(\"UPDATE accounts SET balance=balance-? WHERE id=? AND balance>=?\",(amount,source,amount))\n        if debit.rowcount!=1:\n            raise ValueError(\"source\")\n        credit=conn.execute(\"UPDATE accounts SET balance=balance+? WHERE id=?\",(amount,target))\n        conn.commit()\n        if credit.rowcount!=1:\n            raise ValueError(\"target\")",
              "why": "Изменения подтверждаются до проверки получателя, отката при ошибке нет."
            },
            {
              "code": "def transfer(conn,source,target,amount):\n    if amount<0:\n        raise ValueError(\"amount\")\n    with conn:\n        debit=conn.execute(\"UPDATE accounts SET balance=balance-? WHERE id=? \",(amount,source))\n        if debit.rowcount!=1:\n            raise ValueError(\"source\")\n        credit=conn.execute(\"UPDATE accounts SET balance=balance+? WHERE id=?\",(amount,target))\n        if credit.rowcount!=1:\n            raise ValueError(\"target\")",
              "why": "Убрана проверка достаточности средств."
            }
          ],
          "hints": [
            "Объяви недопустимую сумму до записи.",
            "Выполняй списание и зачисление внутри одной транзакции.",
            "При нехватке средств или отсутствии получателя выброси ValueError наружу из with, чтобы сработал rollback."
          ],
          "solutionExplanation": [
            "Успех подтверждает обе записи. При ошибке проверка читает прежние балансы: частичного перевода нет."
          ],
          "required": true
        },
        {
          "id": "sql-python-rollback-reason",
          "kind": "explain",
          "title": "Почему нельзя commit посередине?",
          "goal": "Почему нельзя commit посередине?",
          "prerequisites": [
            "sql-python-transactions"
          ],
          "prompt": "Почему подтверждение списания до зачисления нарушает атомарность перевода?",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "0",
              "explanation": "Аналог: вставка внутри with conn с последующим исключением откатывается; COUNT после перехвата ошибки равен 0."
            }
          ],
          "answer": [
            "1"
          ],
          "hints": [
            "После commit прежняя транзакция уже закончена.",
            "Поздний rollback не отменяет уже подтверждённое списание.",
            "Обе записи должны относиться к одной группе."
          ],
          "solutionExplanation": [
            "Подтверждение нужно после успеха всех связанных действий; иначе ошибка второго оставляет частичный результат."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "Ошибка зачисления уже не сможет отменить подтверждённое списание."
            },
            {
              "id": "2",
              "text": "commit удаляет таблицу получателя."
            },
            {
              "id": "3",
              "text": "SQLite запрещает два UPDATE в одной программе."
            }
          ]
        }
      ]
    },
    {
      "id": "sql-python-project",
      "title": "Практическая работа: связанный отчёт заказов",
      "goal": "Соединить таблицы по ключу и построить сводку, сохраняя отсутствующие данные.",
      "prerequisites": [
        "sql-python-transactions"
      ],
      "role": "project",
      "estimatedMinutes": 75,
      "steps": [
        {
          "id": "sql-python-project-step-1",
          "title": "Связь не зависит от позиции строки",
          "paragraphs": [
            "Таблица customers хранит человека один раз, orders ссылается на него полем customer_id. JOIN связывает строки по условию orders.customer_id = customers.id, а не по порядку вставки или совпадению имён. INNER JOIN оставляет только совпавшие пары. LEFT JOIN сохраняет все строки левой таблицы, заполняя правые столбцы NULL, когда совпадения нет.",
            "Перед запросом реши, кто должен остаться в отчёте: все заказы или все покупатели. Для всех заказов начни с orders LEFT JOIN customers. Для покупателей без покупок начни с customers LEFT JOIN orders. В SELECT указывай квалифицированные имена o.id и c.id, когда столбцы могут называться одинаково. Псевдоним AS помогает читать длинный запрос."
          ],
          "examples": [
            {
              "id": "sql-python-project-example-1",
              "title": "Все заказы",
              "code": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[(1, 'Алия'), (2, 'Борис'), (3, 'Самал')])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[(1, 1, 10), (2, 1, 15), (3, 2, 5), (4, 99, 7)])\nconn.commit()\nrows=conn.execute(\"SELECT o.id,COALESCE(c.name,'неизвестно'),o.amount FROM orders AS o LEFT JOIN customers AS c ON c.id=o.customer_id ORDER BY o.id\").fetchall()\nprint(rows)\nconn.close()",
              "output": "[(1, 'Алия', 10), (2, 'Алия', 15), (3, 'Борис', 5), (4, 'неизвестно', 7)]",
              "explanation": "Заказ с customer_id=99 сохраняется, но имя заменяется объявленной подписью."
            }
          ],
          "goal": "Объяснить: Таблица customers хранит человека один раз, orders ссылается на него полем customer_id.",
          "prerequisites": [
            "sql-python-transactions"
          ]
        },
        {
          "id": "sql-python-project-step-2",
          "title": "Итоговая сводка без потери пустых групп",
          "paragraphs": [
            "После LEFT JOIN у покупателя без заказов есть одна результирующая строка с NULL в o.id. COUNT(*) ошибочно посчитал бы её как заказ, поэтому нужен COUNT(o.id). Сумма отсутствующих сумм даёт NULL; COALESCE(SUM(o.amount),0) реализует объявленный нулевой итог. GROUP BY c.id,c.name сохраняет разных покупателей с одинаковыми именами.",
            "Практическая работа проверяет три представления одних данных: строки заказов, сводку по каждому покупателю и отбор активных покупателей через HAVING. Это вводное знакомство с SQL, а не курс оптимизации, проектирования промышленной базы или миграций. Все данные находятся в памяти; конкуренция, индексы и внешние ключи требуют дальнейшего изучения."
          ],
          "examples": [
            {
              "id": "sql-python-project-example-2",
              "title": "Покупатель без заказов",
              "code": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[(1, 'Алия'), (2, 'Борис'), (3, 'Самал')])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[(1, 1, 10), (2, 1, 15), (3, 2, 5), (4, 99, 7)])\nconn.commit()\nrows=conn.execute(\"SELECT c.name,COUNT(o.id),COALESCE(SUM(o.amount),0) FROM customers AS c LEFT JOIN orders AS o ON o.customer_id=c.id GROUP BY c.id,c.name ORDER BY c.id\").fetchall()\nprint(rows)\nconn.close()",
              "output": "[('Алия', 2, 25), ('Борис', 1, 5), ('Самал', 0, 0)]",
              "explanation": "У Самал нет заказов, поэтому count=0 и сумма=0; покупатель не исчезает из отчёта."
            }
          ],
          "goal": "Объяснить: После LEFT JOIN у покупателя без заказов есть одна результирующая строка с NULL в o.id.",
          "prerequisites": [
            "sql-python-project-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sql-python-project-order-rows",
          "kind": "code",
          "title": "Строки заказов",
          "goal": "Выбрать ведущую таблицу и правильный ключ связи.",
          "prerequisites": [
            "sql-python-project"
          ],
          "prompt": "Реализуй order_rows(conn): верни список списков [order_id, customer_name, amount] по id заказа. Сохрани каждый заказ, даже если покупатель отсутствует; его имя замени на неизвестно.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "id уникальны; имена не NULL, суммы — целые 0–1000000; ссылка может не иметь покупателя.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[(1, 'Алия'), (2, 'Борис'), (3, 'Самал')])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[(1, 1, 10), (2, 1, 15), (3, 2, 5), (4, 99, 7)])\nconn.commit()\n",
                "order_rows(conn)"
              ],
              "output": "[[1, \"Алия\", 10], [2, \"Алия\", 15], [3, \"Борис\", 5], [4, \"неизвестно\", 7]]",
              "explanation": "LEFT JOIN сохраняет заказы без пары, а ключ связи не зависит от номера заказа. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[(5, 'Олег')])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[(8, 5, 0), (2, 9, 3)])\nconn.commit()\n",
                "order_rows(conn)"
              ],
              "output": "[[2, \"неизвестно\", 3], [8, \"Олег\", 0]]",
              "explanation": "LEFT JOIN сохраняет заказы без пары, а ключ связи не зависит от номера заказа. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[(1, 'Алия'), (2, 'Борис'), (3, 'Самал')])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[(1, 1, 10), (2, 1, 15), (3, 2, 5), (4, 99, 7)])\nconn.commit()\n",
              "expression": "order_rows(conn)",
              "expectedValue": [
                [
                  1,
                  "Алия",
                  10
                ],
                [
                  2,
                  "Алия",
                  15
                ],
                [
                  3,
                  "Борис",
                  5
                ],
                [
                  4,
                  "неизвестно",
                  7
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[])\nconn.commit()\n",
              "expression": "order_rows(conn)",
              "expectedValue": [],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[(5, 'Олег')])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[(8, 5, 0), (2, 9, 3)])\nconn.commit()\n",
              "expression": "order_rows(conn)",
              "expectedValue": [
                [
                  2,
                  "неизвестно",
                  3
                ],
                [
                  8,
                  "Олег",
                  0
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            }
          ],
          "reference": "def order_rows(conn):\n    rows=conn.execute(\"SELECT o.id,COALESCE(c.name,'неизвестно'),o.amount FROM orders AS o LEFT JOIN customers AS c ON c.id=o.customer_id ORDER BY o.id\")\n    return [list(r) for r in rows]",
          "alternative": "def order_rows(conn):\n    names=dict(conn.execute(\"SELECT id,name FROM customers\"))\n    return [[i,names.get(customer,\"неизвестно\"),amount] for i,customer,amount in conn.execute(\"SELECT id,customer_id,amount FROM orders ORDER BY id\")]",
          "wrongSolutions": [
            {
              "code": "def order_rows(conn):\n    return [list(r) for r in conn.execute('SELECT o.id,c.name,o.amount FROM orders o JOIN customers c ON c.id=o.customer_id ORDER BY o.id')]",
              "why": "INNER JOIN теряет заказы без найденного покупателя."
            },
            {
              "code": "def order_rows(conn):\n    return [list(r) for r in conn.execute(\"SELECT o.id,COALESCE(c.name,'неизвестно'),o.amount FROM orders o LEFT JOIN customers c ON c.id=o.id ORDER BY o.id\")]",
              "why": "Соединение выполнено по id заказа вместо customer_id."
            }
          ],
          "hints": [
            "В отчёте нужны все заказы, значит слева orders.",
            "Связь — o.customer_id = c.id.",
            "COALESCE заменяет отсутствующее имя, ORDER BY o.id задаёт порядок."
          ],
          "solutionExplanation": [
            "LEFT JOIN сохраняет заказы без пары, а ключ связи не зависит от номера заказа."
          ],
          "required": true
        },
        {
          "id": "sql-python-project-customer-summary",
          "kind": "code",
          "title": "Сводка покупателей",
          "goal": "Сохранить пустую группу и различить COUNT(*) от COUNT(id).",
          "prerequisites": [
            "sql-python-project"
          ],
          "prompt": "Реализуй customer_summary(conn): верни список списков [customer_id, число заказов, сумма] для всех покупателей по id. Без заказов оба показателя 0. Заказы неизвестного покупателя никому не приписывай.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "0–30 покупателей и заказов, суммы не NULL и неотрицательны.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[(1, 'Алия'), (2, 'Борис'), (3, 'Самал')])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[(1, 1, 10), (2, 1, 15), (3, 2, 5), (4, 99, 7)])\nconn.commit()\n",
                "customer_summary(conn)"
              ],
              "output": "[[1, 2, 25], [2, 1, 5], [3, 0, 0]]",
              "explanation": "Пустая группа получает 0/0; разные id с одинаковыми именами не сливаются. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[(1, 'А'), (2, 'А')])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[(1, 2, 0)])\nconn.commit()\n",
                "customer_summary(conn)"
              ],
              "output": "[[1, 0, 0], [2, 1, 0]]",
              "explanation": "Пустая группа получает 0/0; разные id с одинаковыми именами не сливаются. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[(1, 'Алия'), (2, 'Борис'), (3, 'Самал')])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[(1, 1, 10), (2, 1, 15), (3, 2, 5), (4, 99, 7)])\nconn.commit()\n",
              "expression": "customer_summary(conn)",
              "expectedValue": [
                [
                  1,
                  2,
                  25
                ],
                [
                  2,
                  1,
                  5
                ],
                [
                  3,
                  0,
                  0
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[])\nconn.commit()\n",
              "expression": "customer_summary(conn)",
              "expectedValue": [],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[(1, 'А'), (2, 'А')])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[(1, 2, 0)])\nconn.commit()\n",
              "expression": "customer_summary(conn)",
              "expectedValue": [
                [
                  1,
                  0,
                  0
                ],
                [
                  2,
                  1,
                  0
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            }
          ],
          "reference": "def customer_summary(conn):\n    rows=conn.execute(\"SELECT c.id,COUNT(o.id),COALESCE(SUM(o.amount),0) FROM customers c LEFT JOIN orders o ON o.customer_id=c.id GROUP BY c.id ORDER BY c.id\")\n    return [list(r) for r in rows]",
          "alternative": "def customer_summary(conn):\n    result=[]\n    for customer_id, in conn.execute(\"SELECT id FROM customers ORDER BY id\"):\n        row=conn.execute(\"SELECT COUNT(*),COALESCE(SUM(amount),0) FROM orders WHERE customer_id=?\",(customer_id,)).fetchone()\n        result.append([customer_id,row[0],row[1]])\n    return result",
          "wrongSolutions": [
            {
              "code": "def customer_summary(conn):\n    return [list(r) for r in conn.execute('SELECT c.id,COUNT(*),COALESCE(SUM(o.amount),0) FROM customers c LEFT JOIN orders o ON o.customer_id=c.id GROUP BY c.id ORDER BY c.id')]",
              "why": "COUNT(*) считает пустую строку LEFT JOIN заказом."
            },
            {
              "code": "def customer_summary(conn):\n    return [list(r) for r in conn.execute('SELECT c.id,COUNT(o.id),SUM(o.amount) FROM customers c JOIN orders o ON o.customer_id=c.id GROUP BY c.id ORDER BY c.id')]",
              "why": "Покупатели без заказов исчезают."
            }
          ],
          "hints": [
            "Слева должны быть все customers.",
            "После LEFT JOIN считай o.id, не строки *.",
            "Сумму без заказов замени на 0 через COALESCE."
          ],
          "solutionExplanation": [
            "Пустая группа получает 0/0; разные id с одинаковыми именами не сливаются."
          ],
          "required": true
        },
        {
          "id": "sql-python-project-active",
          "kind": "code",
          "title": "Покупатели по сумме",
          "goal": "Самостоятельно объединить связь, агрегат, порог и стабильный порядок.",
          "prerequisites": [
            "sql-python-project"
          ],
          "prompt": "Реализуй active_customers(conn, minimum): верни список списков [id, name, total] для покупателей с суммой заказов не меньше minimum. Без заказов сумма 0. Порядок total по убыванию, затем id по возрастанию.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "minimum — целое 0–1000000; до 30 покупателей и заказов.",
          "examples": [
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[(1, 'Алия'), (2, 'Борис'), (3, 'Самал')])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[(1, 1, 10), (2, 1, 15), (3, 2, 5), (4, 99, 7)])\nconn.commit()\n",
                "active_customers(conn,0)"
              ],
              "output": "[[1, \"Алия\", 25], [2, \"Борис\", 5], [3, \"Самал\", 0]]",
              "explanation": "HAVING фильтрует итог группы, а не отдельные заказы; сортировка разрешает равные суммы по id. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[(2, 'B'), (1, 'A')])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[(1, 1, 5), (2, 2, 5)])\nconn.commit()\n",
                "active_customers(conn,5)"
              ],
              "output": "[[1, \"A\", 5], [2, \"B\", 5]]",
              "explanation": "HAVING фильтрует итог группы, а не отдельные заказы; сортировка разрешает равные суммы по id. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[(1, 'Алия'), (2, 'Борис'), (3, 'Самал')])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[(1, 1, 10), (2, 1, 15), (3, 2, 5), (4, 99, 7)])\nconn.commit()\n",
              "expression": "active_customers(conn,0)",
              "expectedValue": [
                [
                  1,
                  "Алия",
                  25
                ],
                [
                  2,
                  "Борис",
                  5
                ],
                [
                  3,
                  "Самал",
                  0
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[(1, 'Алия'), (2, 'Борис'), (3, 'Самал')])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[(1, 1, 10), (2, 1, 15), (3, 2, 5), (4, 99, 7)])\nconn.commit()\n",
              "expression": "active_customers(conn,25)",
              "expectedValue": [
                [
                  1,
                  "Алия",
                  25
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[(1, 'Алия'), (2, 'Борис'), (3, 'Самал')])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[(1, 1, 10), (2, 1, 15), (3, 2, 5), (4, 99, 7)])\nconn.commit()\n",
              "expression": "active_customers(conn,100)",
              "expectedValue": [],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            },
            {
              "setup": "import sqlite3\nconn=sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE customers(id INTEGER PRIMARY KEY,name TEXT)\")\nconn.execute(\"CREATE TABLE orders(id INTEGER PRIMARY KEY,customer_id INTEGER,amount INTEGER)\")\nconn.executemany(\"INSERT INTO customers VALUES (?,?)\",[(2, 'B'), (1, 'A')])\nconn.executemany(\"INSERT INTO orders VALUES (?,?,?)\",[(1, 1, 5), (2, 2, 5)])\nconn.commit()\n",
              "expression": "active_customers(conn,5)",
              "expectedValue": [
                [
                  1,
                  "A",
                  5
                ],
                [
                  2,
                  "B",
                  5
                ]
              ],
              "expectedOutput": "",
              "description": "Набор данных 4: результат и изменения базы"
            }
          ],
          "reference": "def active_customers(conn,minimum):\n    rows=conn.execute(\"SELECT c.id,c.name,COALESCE(SUM(o.amount),0) AS total FROM customers c LEFT JOIN orders o ON o.customer_id=c.id GROUP BY c.id,c.name HAVING COALESCE(SUM(o.amount),0)>=? ORDER BY total DESC,c.id\",(minimum,))\n    return [list(r) for r in rows]",
          "alternative": "def active_customers(conn,minimum):\n    result=[]\n    for ident,name in conn.execute(\"SELECT id,name FROM customers\"):\n        total=conn.execute(\"SELECT COALESCE(SUM(amount),0) FROM orders WHERE customer_id=?\",(ident,)).fetchone()[0]\n        if total>=minimum:\n            result.append([ident,name,total])\n    result.sort(key=lambda row:(-row[2],row[0]))\n    return result",
          "wrongSolutions": [
            {
              "code": "def active_customers(conn,minimum):\n    rows=conn.execute('SELECT c.id,c.name,COALESCE(SUM(o.amount),0) total FROM customers c LEFT JOIN orders o ON o.customer_id=c.id GROUP BY c.id,c.name HAVING COALESCE(SUM(o.amount),0)>? ORDER BY total DESC,c.id',(minimum,))\n    return [list(r) for r in rows]",
              "why": "Группы ровно на пороге ошибочно исключены."
            },
            {
              "code": "def active_customers(conn,minimum):\n    rows=conn.execute('SELECT c.id,c.name,SUM(o.amount) total FROM customers c JOIN orders o ON o.customer_id=c.id GROUP BY c.id,c.name HAVING SUM(o.amount)>=? ORDER BY total DESC,c.id',(minimum,))\n    return [list(r) for r in rows]",
              "why": "При minimum=0 покупатели без заказов должны остаться, но INNER JOIN их теряет."
            }
          ],
          "hints": [
            "Сначала сводка всех покупателей через LEFT JOIN.",
            "Порог агрегата относится к HAVING.",
            "При minimum=0 пустой покупатель с total=0 тоже допустим."
          ],
          "solutionExplanation": [
            "HAVING фильтрует итог группы, а не отдельные заказы; сортировка разрешает равные суммы по id."
          ],
          "required": true
        },
        {
          "id": "sql-python-project-join-choice",
          "kind": "choice",
          "title": "Проверка итогового запроса",
          "goal": "Проверка итогового запроса",
          "prerequisites": [
            "sql-python-project"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "Покупатель без заказов: 0 заказов, сумма 0",
              "explanation": "Аналог: customers LEFT JOIN orders оставляет покупателя, COUNT(o.id)=0 и COALESCE(SUM(o.amount),0)=0."
            }
          ],
          "answer": [
            "1",
            "3",
            "4"
          ],
          "hints": [
            "Определи, какая таблица должна сохраниться целиком.",
            "NULL в присоединённом ключе не является заказом.",
            "WHERE и HAVING работают на разных этапах."
          ],
          "solutionExplanation": [
            "LEFT JOIN сохраняет левую сторону, COUNT ключа исключает пустую пару, HAVING фильтрует группы."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "Для всех покупателей слева в LEFT JOIN должна быть customers."
            },
            {
              "id": "2",
              "text": "COUNT(*) после LEFT JOIN всегда правильно считает число заказов."
            },
            {
              "id": "3",
              "text": "HAVING может фильтровать сумму группы."
            },
            {
              "id": "4",
              "text": "Группировка по id сохраняет разных покупателей с одинаковыми именами."
            }
          ]
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.12/library/sqlite3.html",
    "https://docs.python.org/3.12/library/sqlite3.html#how-to-use-placeholders-to-bind-values-in-sql-queries",
    "https://docs.python.org/3.12/library/sqlite3.html#how-to-use-the-connection-context-manager"
  ]
};

export default module;
