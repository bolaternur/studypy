import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "filter",
  "title": "map и filter",
  "description": "Примени преобразование и отбор к последовательности.",
  "icon": "Workflow",
  "level": "Intermediate",
  "color": "emerald",
  "topic": "Функции",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Примени преобразование и отбор к последовательности.",
  "sections": [
    {
      "id": "filter-example",
      "title": "map и filter",
      "content": [
        "map(function, iterable) выдаёт результаты вызова функции. filter(function, iterable) оставляет элементы, для которых функция вернула истинное значение. В Python 3 оба возвращают итераторы: list() материализует результат."
      ],
      "code": "numbers = [-1, 0, 2]\nprint(list(map(abs, numbers)))\nprint(list(filter(lambda x: x > 0, numbers)))",
      "expectedOutput": "[1, 0, 2]\n[2]"
    },
    {
      "id": "filter-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи magnitudes(values), возвращающую список модулей чисел. Можно использовать map или включение.",
        "Один итератор обычно расходуется при чтении. После list(iterator) повторный list(iterator) может оказаться пустым. Для простого преобразования включение часто читается легче.",
        "Дальше: объедини элементы нескольких последовательностей."
      ]
    }
  ],
  "challenges": [
    {
      "id": "absolute",
      "question": "Абсолютные значения",
      "description": "Определи magnitudes(values), возвращающую список модулей чисел. Можно использовать map или включение.",
      "initialCode": "def magnitudes(values):\n    pass\n",
      "code": "def magnitudes(values):\n    return list(map(abs, values))",
      "hint": "abs() работает с одним числом; примени её к каждому элементу.",
      "testCases": [
        {
          "expression": "magnitudes([-3, 0, 2])",
          "expectedValue": [
            3,
            0,
            2
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "magnitudes([])",
          "expectedValue": [],
          "expectedCallOutput": ""
        },
        {
          "expression": "magnitudes([-1])",
          "expectedValue": [
            1
          ],
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/functions.html"
  ]
};

export default lesson;
