import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "sql",
  "title": "SQL и SQLite",
  "description": "Выполни параметризованный запрос к учебной базе в памяти.",
  "icon": "BookOpen",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Работа с данными",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Выполни параметризованный запрос к учебной базе в памяти.",
  "sections": [
    {
      "id": "sql-example",
      "title": "SQL и SQLite",
      "content": [
        "sqlite3 входит в стандартную библиотеку Python. connect(\":memory:\") создаёт временную базу. execute(query, params) передаёт значения отдельно от SQL. SELECT выбирает данные, WHERE фильтрует строки, ORDER BY задаёт порядок."
      ],
      "code": "import sqlite3\nconnection = sqlite3.connect(':memory:')\nconnection.execute('CREATE TABLE scores (name TEXT, score INTEGER)')\nconnection.execute('INSERT INTO scores VALUES (?, ?)', ('Алия', 90))\nprint(connection.execute('SELECT name FROM scores WHERE score >= ?', (80,)).fetchone()[0])\nconnection.close()",
      "expectedOutput": "Алия"
    },
    {
      "id": "sql-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи top_names(connection, minimum), возвращающую имена из таблицы scores с score >= minimum по алфавиту. Используй параметры SQL. Таблица уже создана тестом.",
        "Не вставляй пользовательский текст в SQL через f-строку. DELETE FROM table удаляет строки; DROP TABLE удаляет саму таблицу. Без ORDER BY порядок результата не гарантирован.",
        "Дальше: реши задачу поиска и оцени её объём работы."
      ]
    }
  ],
  "challenges": [
    {
      "id": "selection",
      "question": "Отбор строк",
      "description": "Определи top_names(connection, minimum), возвращающую имена из таблицы scores с score >= minimum по алфавиту. Используй параметры SQL. Таблица уже создана тестом.",
      "initialCode": "def top_names(connection, minimum):\n    pass\n",
      "code": "def top_names(connection, minimum):\n    rows = connection.execute(\"SELECT name FROM scores WHERE score >= ? ORDER BY name\", (minimum,))\n    return [row[0] for row in rows]",
      "hint": "Порог передаётся отдельным параметром, а алфавитный порядок задаётся в SQL.",
      "testCases": [
        {
          "setup": "import sqlite3\nconnection = sqlite3.connect(\":memory:\")\nconnection.execute(\"CREATE TABLE scores (name TEXT, score INTEGER)\")\nconnection.executemany(\"INSERT INTO scores VALUES (?, ?)\", [(\"Charlie\", 95), (\"Bob\", 79), (\"Alice\", 80)])",
          "expression": "top_names(connection, 80)",
          "expectedValue": [
            "Alice",
            "Charlie"
          ],
          "expectedCallOutput": ""
        },
        {
          "setup": "import sqlite3\nconnection = sqlite3.connect(\":memory:\")\nconnection.execute(\"CREATE TABLE scores (name TEXT, score INTEGER)\")\nconnection.executemany(\"INSERT INTO scores VALUES (?, ?)\", [(\"Charlie\", 95), (\"Bob\", 79), (\"Alice\", 80)])",
          "expression": "top_names(connection, 90)",
          "expectedValue": [
            "Charlie"
          ],
          "expectedCallOutput": ""
        },
        {
          "setup": "import sqlite3\nconnection = sqlite3.connect(\":memory:\")\nconnection.execute(\"CREATE TABLE scores (name TEXT, score INTEGER)\")\nconnection.executemany(\"INSERT INTO scores VALUES (?, ?)\", [(\"Charlie\", 95), (\"Bob\", 79), (\"Alice\", 80)])",
          "expression": "top_names(connection, 100)",
          "expectedValue": [],
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/sqlite3.html",
    "https://www.sqlite.org/lang_select.html"
  ]
};

export default lesson;
