import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "exceptions",
  "title": "Исключения",
  "description": "Обработай ожидаемое исключение, сохранив остальные ошибки видимыми.",
  "icon": "BookOpen",
  "level": "Intermediate",
  "color": "emerald",
  "topic": "Ошибки и тесты",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Обработай ожидаемое исключение, сохранив остальные ошибки видимыми.",
  "sections": [
    {
      "id": "exceptions-example",
      "title": "Исключения",
      "content": [
        "try выполняет код. except ValueError обрабатывает именно ошибку преобразования значения. Исключения других типов продолжают распространяться, если для них нет обработчика. finally выполняется при выходе из try независимо от исхода."
      ],
      "code": "try:\n    number = int('не число')\nexcept ValueError:\n    print('Нужно целое число')",
      "expectedOutput": "Нужно целое число"
    },
    {
      "id": "exceptions-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи parse_int(text). Возвращай int(text); если возникает ValueError, возвращай None.",
        "except без типа может скрыть программную ошибку. Лови только ожидаемое исключение и выбирай понятное запасное поведение. Не называй любое завершение программы «синтаксической ошибкой».",
        "Дальше: сократи построение нового списка."
      ]
    }
  ],
  "challenges": [
    {
      "id": "safe-int",
      "question": "Безопасное преобразование",
      "description": "Определи parse_int(text). Возвращай int(text); если возникает ValueError, возвращай None.",
      "initialCode": "def parse_int(text):\n    pass\n",
      "code": "def parse_int(text):\n    try:\n        return int(text)\n    except ValueError:\n        return None",
      "hint": "Обрабатывай ошибку преобразования, а не все исключения подряд.",
      "testCases": [
        {
          "expression": "parse_int(\"12\")",
          "expectedValue": 12,
          "expectedCallOutput": ""
        },
        {
          "expression": "parse_int(\"-3\")",
          "expectedValue": -3,
          "expectedCallOutput": ""
        },
        {
          "expression": "parse_int(\"abc\")",
          "expectedValue": null,
          "expectedCallOutput": ""
        },
        {
          "expression": "parse_int(\"\")",
          "expectedValue": null,
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/errors.html"
  ]
};

export default lesson;
