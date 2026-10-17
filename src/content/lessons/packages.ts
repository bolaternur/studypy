import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "packages",
  "title": "Пакеты и импорты",
  "description": "Отличи пакет от модуля и используй вложенный импорт.",
  "icon": "BookOpen",
  "level": "Intermediate",
  "color": "emerald",
  "topic": "Файлы и модули",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Отличи пакет от модуля и используй вложенный импорт.",
  "sections": [
    {
      "id": "packages-example",
      "title": "Пакеты и импорты",
      "content": [
        "Пакет объединяет модули. В обычном пакете файл __init__.py обозначает каталог как пакет; существуют и namespace-пакеты без этого файла. Запись from urllib.parse import urlencode импортирует функцию из модуля внутри пакета."
      ],
      "code": "from urllib.parse import urlencode\nprint(urlencode({'q': 'python', 'page': 2}))",
      "expectedOutput": "q=python&page=2"
    },
    {
      "id": "packages-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи query(params), возвращающую строку параметров через urllib.parse.urlencode. Значения — строки или числа, порядок — порядок словаря.",
        "Имя устанавливаемого дистрибутива и имя импорта не обязаны совпадать. Не добавляй в sys.path случайные папки ради обхода ошибки импорта: сначала проверь структуру и выбранный интерпретатор.",
        "Дальше: изолируй зависимости проекта."
      ]
    }
  ],
  "challenges": [
    {
      "id": "query",
      "question": "Параметры адреса",
      "description": "Определи query(params), возвращающую строку параметров через urllib.parse.urlencode. Значения — строки или числа, порядок — порядок словаря.",
      "initialCode": "def query(params):\n    pass\n",
      "code": "from urllib.parse import urlencode\n\ndef query(params):\n    return urlencode(params)",
      "hint": "В urllib.parse есть готовое преобразование словаря в параметры URL.",
      "testCases": [
        {
          "expression": "query({\"q\": \"hello world\"})",
          "expectedValue": "q=hello+world",
          "expectedCallOutput": ""
        },
        {
          "expression": "query({})",
          "expectedValue": "",
          "expectedCallOutput": ""
        },
        {
          "expression": "query({\"page\": 2})",
          "expectedValue": "page=2",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/modules.html",
    "https://docs.python.org/3.13/library/urllib.parse.html"
  ]
};

export default lesson;
