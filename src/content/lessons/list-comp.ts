import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "list-comp",
  "title": "Списковые включения",
  "description": "Построй новый список с преобразованием и фильтром.",
  "icon": "Database",
  "level": "Intermediate",
  "color": "emerald",
  "topic": "Коллекции",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Построй новый список с преобразованием и фильтром.",
  "sections": [
    {
      "id": "list-comp-example",
      "title": "Списковые включения",
      "content": [
        "Выражение [x * 2 for x in values] создаёт список результатов. Условие if в конце отбирает исходные элементы. Если преобразование трудно прочитать, обычный цикл будет удобнее."
      ],
      "code": "values = [1, 2, 3, 4]\nsquares = [x * x for x in values if x % 2 == 0]\nprint(squares)",
      "expectedOutput": "[4, 16]"
    },
    {
      "id": "list-comp-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи positive_squares(values), возвращающую квадраты строго положительных чисел в исходном порядке. Входной список не меняй.",
        "Условие в конце фильтрует элементы; оно не добавляет запасное значение. Включение создаёт новую коллекцию, но не делает глубокую копию вложенных объектов.",
        "Дальше: передай небольшую функцию как аргумент."
      ]
    }
  ],
  "challenges": [
    {
      "id": "positive-squares",
      "question": "Квадраты положительных",
      "description": "Определи positive_squares(values), возвращающую квадраты строго положительных чисел в исходном порядке. Входной список не меняй.",
      "initialCode": "def positive_squares(values):\n    pass\n",
      "code": "def positive_squares(values):\n    return [x * x for x in values if x > 0]",
      "hint": "Отбор по знаку относится к исходному числу, а не к его квадрату.",
      "testCases": [
        {
          "expression": "positive_squares([-2, 0, 3, 1])",
          "expectedValue": [
            9,
            1
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "positive_squares([])",
          "expectedValue": [],
          "expectedCallOutput": ""
        },
        {
          "expression": "positive_squares([-1, -2])",
          "expectedValue": [],
          "expectedCallOutput": ""
        },
        {
          "setup": "values = [-2, 0, 3, 1]",
          "expression": "[positive_squares(values), values]",
          "expectedValue": [
            [
              9,
              1
            ],
            [
              -2,
              0,
              3,
              1
            ]
          ],
          "description": "Преобразование не меняет вход",
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
