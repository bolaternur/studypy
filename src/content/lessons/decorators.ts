import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "decorators",
  "title": "Декораторы",
  "description": "Измени поведение вызова, не меняя тело исходной функции.",
  "icon": "Workflow",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Функции",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Измени поведение вызова, не меняя тело исходной функции.",
  "sections": [
    {
      "id": "decorators-example",
      "title": "Декораторы",
      "content": [
        "Декоратор принимает функцию и возвращает объект, которым заменяется её имя. Запись @decorator над def эквивалентна последующему name = decorator(name). functools.wraps помогает сохранить имя и документацию обёрнутой функции."
      ],
      "code": "from functools import wraps\n\ndef twice(function):\n    @wraps(function)\n    def wrapped(*args, **kwargs):\n        return 2 * function(*args, **kwargs)\n    return wrapped\n\n@twice\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))",
      "expectedOutput": "10"
    },
    {
      "id": "decorators-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи декоратор double_result(function). Он возвращает функцию, принимающую любые позиционные и именованные аргументы, вызывает исходную функцию один раз и удваивает возвращённое число.",
        "Внутри обёртки вызывай исходную функцию, а не имя уже обёрнутой функции: иначе получится рекурсия. Передавай *args и **kwargs, чтобы не потерять аргументы.",
        "Дальше: создай последовательность значений по запросу."
      ]
    }
  ],
  "challenges": [
    {
      "id": "double-result",
      "question": "Удвоение результата",
      "description": "Определи декоратор double_result(function). Он возвращает функцию, принимающую любые позиционные и именованные аргументы, вызывает исходную функцию один раз и удваивает возвращённое число.",
      "initialCode": "def double_result(function):\n    pass\n",
      "code": "from functools import wraps\n\ndef double_result(function):\n    @wraps(function)\n    def wrapped(*args, **kwargs):\n        return 2 * function(*args, **kwargs)\n    return wrapped",
      "hint": "Обёртка передаёт все аргументы исходной функции и удваивает результат вызова.",
      "testCases": [
        {
          "expression": "double_result(lambda x: x + 1)(3)",
          "expectedValue": 8,
          "expectedCallOutput": ""
        },
        {
          "expression": "double_result(lambda x=0: x)(x=-2)",
          "expectedValue": -4,
          "expectedCallOutput": ""
        },
        {
          "expression": "double_result(lambda: 0)()",
          "expectedValue": 0,
          "expectedCallOutput": ""
        },
        {
          "setup": "calls = []\ndef record(value):\n    calls.append(value)\n    return value + 1",
          "expression": "[double_result(record)(3), calls]",
          "expectedValue": [
            8,
            [
              3
            ]
          ],
          "description": "Исходная функция вызывается ровно один раз",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/functools.html",
    "https://docs.python.org/3.13/reference/compound_stmts.html"
  ]
};

export default lesson;
