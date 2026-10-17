import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "tuples",
  "title": "Кортежи",
  "description": "Упакуй значения в кортеж и распакуй их в имена.",
  "icon": "Database",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Коллекции",
  "estimatedMinutes": 12,
  "challengeCount": 2,
  "content": "Упакуй значения в кортеж и распакуй их в имена.",
  "sections": [
    {
      "id": "tuples-example",
      "title": "Кортежи",
      "content": [
        "Кортеж — упорядоченная последовательность, элементы которой нельзя заменить после создания. Запятая образует кортеж; для одного элемента нужна завершающая запятая: (5,). Распаковка присваивает элементы нескольким именам."
      ],
      "code": "point = (3, 4)\nx, y = point\nprint(x + y)",
      "expectedOutput": "7"
    },
    {
      "id": "tuples-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Распакуй point в x и y. Сохрани сумму координат в total.",
        "point[0] = 10 вызовет TypeError. Неизменяемость кортежа не делает вложенный список неизменяемым. При распаковке число имён должно соответствовать числу элементов, если не используется *.",
        "Дальше: храни значения по именованным ключам в словаре."
      ]
    }
  ],
  "challenges": [
    {
      "id": "unpack",
      "question": "Координаты",
      "description": "Распакуй point в x и y. Сохрани сумму координат в total.",
      "initialCode": "point = (7, -2)\n# Распакуй point\n",
      "code": "point = (7, -2)\nx, y = point\ntotal = x + y",
      "hint": "Слева от = можно записать несколько имён через запятую.",
      "testCases": [
        {
          "expression": "[x, y, total]",
          "expectedValue": [
            7,
            -2,
            5
          ],
          "expectedCallOutput": ""
        }
      ]
    },
    {
      "id": "single",
      "question": "Один элемент",
      "description": "Создай кортеж single, содержащий единственное число 5.",
      "initialCode": "# Создай single\n",
      "code": "single = (5,)",
      "hint": "Одни скобки не создают кортеж из одного числа: нужна запятая.",
      "testCases": [
        {
          "expression": "[type(single).__name__, list(single)]",
          "expectedValue": [
            "tuple",
            [
              5
            ]
          ],
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/datastructures.html"
  ]
};

export default lesson;
