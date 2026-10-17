import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "functions",
  "title": "Функции и return",
  "description": "Определи функцию с параметрами и верни вычисленный результат.",
  "icon": "Workflow",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Функции",
  "estimatedMinutes": 12,
  "challengeCount": 2,
  "content": "Определи функцию с параметрами и верни вычисленный результат.",
  "sections": [
    {
      "id": "functions-example",
      "title": "Функции и return",
      "content": [
        "def создаёт функцию, но её тело выполняется только при вызове. Параметры получают переданные аргументы. return передаёт значение вызывающему коду и завершает вызов. Без return функция возвращает None."
      ],
      "code": "def double(number):\n    return number * 2\n\nprint(double(4))",
      "expectedOutput": "8"
    },
    {
      "id": "functions-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи add(a, b), которая возвращает сумму двух чисел. Ничего не печатай внутри функции.",
        "print() показывает значение, а return возвращает его для дальнейшего использования. Функция, которая только печатает ответ, не пройдёт проверку возвращаемого значения.",
        "Дальше: проверь читаемость имён и отступов."
      ]
    }
  ],
  "challenges": [
    {
      "id": "add",
      "question": "Вернуть сумму",
      "description": "Определи add(a, b), которая возвращает сумму двух чисел. Ничего не печатай внутри функции.",
      "initialCode": "def add(a, b):\n    pass\n",
      "code": "def add(a, b):\n    return a + b",
      "hint": "Возвращаемое значение должно зависеть от обоих аргументов, включая отрицательные.",
      "testCases": [
        {
          "expression": "add(2, 3)",
          "expectedValue": 5,
          "description": "Два положительных числа",
          "expectedCallOutput": ""
        },
        {
          "expression": "add(-4, 4)",
          "expectedValue": 0,
          "description": "Сумма равна нулю",
          "expectedCallOutput": ""
        },
        {
          "expression": "add(0, -7)",
          "expectedValue": -7,
          "description": "Нулевой и отрицательный аргументы",
          "expectedCallOutput": ""
        },
        {
          "expression": "add(1.5, 2.5)",
          "expectedValue": 4,
          "description": "Дробные аргументы",
          "expectedCallOutput": ""
        }
      ]
    },
    {
      "id": "maximum",
      "question": "Максимум списка",
      "description": "Определи largest(values), которая возвращает наибольшее число. Если список пуст, верни None. Не изменяй входной список.",
      "initialCode": "def largest(values):\n    pass\n",
      "code": "def largest(values):\n    if not values:\n        return None\n    return max(values)",
      "hint": "Сначала обработай пустой список, затем выбирай наибольшее значение.",
      "testCases": [
        {
          "expression": "largest([3, 9, 1])",
          "expectedValue": 9,
          "expectedCallOutput": ""
        },
        {
          "expression": "largest([-5, -2])",
          "expectedValue": -2,
          "expectedCallOutput": ""
        },
        {
          "expression": "largest([])",
          "expectedValue": null,
          "expectedCallOutput": ""
        },
        {
          "expression": "largest([0])",
          "expectedValue": 0,
          "expectedCallOutput": ""
        },
        {
          "setup": "values = [3, 9, 1]",
          "expression": "[largest(values), values]",
          "expectedValue": [
            9,
            [
              3,
              9,
              1
            ]
          ],
          "description": "Входной список не изменяется",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/controlflow.html"
  ]
};

export default lesson;
