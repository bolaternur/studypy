import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "closures",
  "title": "Замыкания",
  "description": "Верни функцию, которая использует значение из внешнего вызова.",
  "icon": "Workflow",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Функции",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Верни функцию, которая использует значение из внешнего вызова.",
  "sections": [
    {
      "id": "closures-example",
      "title": "Замыкания",
      "content": [
        "Вложенная функция может обращаться к именам окружающей функции после её завершения. Такие связи образуют замыкание. Для присваивания существующему имени внешней функции используют nonlocal."
      ],
      "code": "def make_multiplier(factor):\n    def multiply(value):\n        return value * factor\n    return multiply\n\ntriple = make_multiplier(3)\nprint(triple(4))",
      "expectedOutput": "12"
    },
    {
      "id": "closures-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи make_adder(offset), возвращающую функцию от одного аргумента. Возвращённая функция прибавляет offset к своему аргументу.",
        "Замыкание запоминает связь с именем, а не всегда независимую копию текущего значения. В функциях, созданных циклом, это важно учитывать. Для независимого состояния создай отдельный внешний вызов.",
        "Дальше: оберни функцию декоратором."
      ]
    }
  ],
  "challenges": [
    {
      "id": "adder",
      "question": "Функция с сохранённым слагаемым",
      "description": "Определи make_adder(offset), возвращающую функцию от одного аргумента. Возвращённая функция прибавляет offset к своему аргументу.",
      "initialCode": "def make_adder(offset):\n    pass\n",
      "code": "def make_adder(offset):\n    def add(value):\n        return value + offset\n    return add",
      "hint": "Верни вложенную функцию, не её вызов. У каждого make_adder свой offset.",
      "testCases": [
        {
          "expression": "make_adder(3)(4)",
          "expectedValue": 7,
          "expectedCallOutput": ""
        },
        {
          "expression": "make_adder(-2)(2)",
          "expectedValue": 0,
          "expectedCallOutput": ""
        },
        {
          "expression": "(lambda a, b: [a(1), b(1), a(2)])(make_adder(3), make_adder(10))",
          "expectedValue": [
            4,
            11,
            5
          ],
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/reference/executionmodel.html",
    "https://docs.python.org/3.13/tutorial/controlflow.html"
  ]
};

export default lesson;
