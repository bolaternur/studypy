import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "type-conversion",
  "title": "Типы и преобразование",
  "description": "Отличи число от строки и преобразуй строку в число.",
  "icon": "Code",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Основы",
  "estimatedMinutes": 12,
  "challengeCount": 2,
  "content": "Отличи число от строки и преобразуй строку в число.",
  "sections": [
    {
      "id": "type-conversion-example",
      "title": "Типы и преобразование",
      "content": [
        "Число 12 имеет тип int, число 1.5 — float, текст в кавычках — str, True и False — bool. Тип принадлежит значению. int() преобразует подходящую строку в целое число; str() получает текстовое представление."
      ],
      "code": "count = int('12')\nprint(count + 3)\nprint(type(count).__name__)",
      "expectedOutput": "15\nint"
    },
    {
      "id": "type-conversion-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Преобразуй text в целое число, прибавь 5 и выведи результат.",
        "Сложение строки и числа вызывает TypeError. int(\"12.5\") вызывает ValueError: для дробной записи используй float(). Двоичные float могут хранить десятичные дроби приближённо.",
        "Дальше: выполни арифметические действия."
      ]
    }
  ],
  "challenges": [
    {
      "id": "convert",
      "question": "Строка в число",
      "description": "Преобразуй text в целое число, прибавь 5 и выведи результат.",
      "initialCode": "text = \"17\"\n# Преобразуй text\n",
      "code": "text = \"17\"\nprint(int(text) + 5)",
      "hint": "Сначала получи число из text, затем выполняй сложение.",
      "testCases": [
        {
          "expectedOutput": "22"
        }
      ]
    },
    {
      "id": "bool-type",
      "question": "Тип значения",
      "description": "Создай z = True. Сохрани имя его типа (строку \"bool\") в type_name, используя type(z).__name__.",
      "initialCode": "# Создай z и type_name\n",
      "code": "z = True\ntype_name = type(z).__name__",
      "hint": "type() возвращает тип, а его __name__ — короткое текстовое имя.",
      "testCases": [
        {
          "expression": "[z, type_name]",
          "expectedValue": [
            true,
            "bool"
          ],
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/introduction.html",
    "https://docs.python.org/3.13/library/functions.html"
  ]
};

export default lesson;
