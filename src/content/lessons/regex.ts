import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "regex",
  "title": "Регулярные выражения",
  "description": "Найди фрагменты текста по простому шаблону.",
  "icon": "BookOpen",
  "level": "Intermediate",
  "color": "emerald",
  "topic": "Работа с данными",
  "estimatedMinutes": 12,
  "challengeCount": 2,
  "content": "Найди фрагменты текста по простому шаблону.",
  "sections": [
    {
      "id": "regex-example",
      "title": "Регулярные выражения",
      "content": [
        "Модуль re работает с шаблонами. re.findall() возвращает все неперекрывающиеся совпадения. r\"...\" удобно для записи обратных слешей. fullmatch() проверяет всю строку, а search() ищет фрагмент."
      ],
      "code": "import re\nprint(re.findall(r'[0-9]+', 'Заказы 12 и 305'))",
      "expectedOutput": "['12', '305']"
    },
    {
      "id": "regex-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи numbers(text), возвращающую список целых неотрицательных чисел из групп ASCII-цифр [0-9]+. Если совпадений нет, верни пустой список.",
        "Точка в шаблоне означает любой символ, кроме перевода строки по умолчанию; для буквальной точки используй \\. Не принимай совпадение фрагмента за проверку всей строки.",
        "Дальше: обработай даты и интервалы."
      ]
    }
  ],
  "challenges": [
    {
      "id": "numbers",
      "question": "Числа в тексте",
      "description": "Определи numbers(text), возвращающую список целых неотрицательных чисел из групп ASCII-цифр [0-9]+. Если совпадений нет, верни пустой список.",
      "initialCode": "def numbers(text):\n    pass\n",
      "code": "import re\n\ndef numbers(text):\n    return [int(x) for x in re.findall(r\"[0-9]+\", text)]",
      "hint": "Найди группы цифр, затем преобразуй каждую найденную строку в int.",
      "testCases": [
        {
          "expression": "numbers(\"a12 b003\")",
          "expectedValue": [
            12,
            3
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "numbers(\"нет чисел\")",
          "expectedValue": [],
          "expectedCallOutput": ""
        },
        {
          "expression": "numbers(\"0 9\")",
          "expectedValue": [
            0,
            9
          ],
          "expectedCallOutput": ""
        }
      ]
    },
    {
      "id": "code",
      "question": "Вся строка",
      "description": "Определи valid_code(text): верни True только для строки из ровно трёх ASCII-цифр, без пробелов и других символов.",
      "initialCode": "def valid_code(text):\n    pass\n",
      "code": "import re\n\ndef valid_code(text):\n    return re.fullmatch(r\"[0-9]{3}\", text) is not None",
      "hint": "Проверка всей строки отличается от поиска подстроки. Не допускай завершающий перенос.",
      "testCases": [
        {
          "expression": "valid_code(\"007\")",
          "expectedValue": true,
          "expectedCallOutput": ""
        },
        {
          "expression": "valid_code(\"x007\")",
          "expectedValue": false,
          "expectedCallOutput": ""
        },
        {
          "expression": "valid_code(\"12\")",
          "expectedValue": false,
          "expectedCallOutput": ""
        },
        {
          "expression": "valid_code(\"123\\n\")",
          "expectedValue": false,
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/re.html"
  ]
};

export default lesson;
