import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "args-kwargs",
  "title": "*args и **kwargs",
  "description": "Прими дополнительные позиционные и именованные аргументы.",
  "icon": "Workflow",
  "level": "Intermediate",
  "color": "emerald",
  "topic": "Функции",
  "estimatedMinutes": 12,
  "challengeCount": 2,
  "content": "Прими дополнительные позиционные и именованные аргументы.",
  "sections": [
    {
      "id": "args-kwargs-example",
      "title": "*args и **kwargs",
      "content": [
        "*args в определении собирает лишние позиционные аргументы в кортеж; **kwargs — именованные в словарь. В вызове *sequence и **mapping, наоборот, распаковывают значения в аргументы."
      ],
      "code": "def total(*numbers):\n    return sum(numbers)\n\nprint(total(2, 3, 4))\nprint(total())",
      "expectedOutput": "9\n0"
    },
    {
      "id": "args-kwargs-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи total(*numbers), возвращающую сумму всех аргументов. Без аргументов возвращай 0.",
        "Имена args и kwargs — соглашение; работу задают звёздочки. Не передавай один параметр и позиционно, и по имени: это вызовет TypeError.",
        "Дальше: поработай с регулярными выражениями."
      ]
    }
  ],
  "challenges": [
    {
      "id": "sum",
      "question": "Любое число слагаемых",
      "description": "Определи total(*numbers), возвращающую сумму всех аргументов. Без аргументов возвращай 0.",
      "initialCode": "def total(*numbers):\n    pass\n",
      "code": "def total(*numbers):\n    return sum(numbers)",
      "hint": "Позиционные аргументы собираются в кортеж; сумма пустого кортежа — ноль.",
      "testCases": [
        {
          "expression": "total(1, 2, 3)",
          "expectedValue": 6,
          "expectedCallOutput": ""
        },
        {
          "expression": "total()",
          "expectedValue": 0,
          "expectedCallOutput": ""
        },
        {
          "expression": "total(-4, 4)",
          "expectedValue": 0,
          "expectedCallOutput": ""
        }
      ]
    },
    {
      "id": "keyword",
      "question": "Именованные настройки",
      "description": "Определи get_option(name, **options), возвращающую значение по имени name или None, если его нет.",
      "initialCode": "def get_option(name, **options):\n    pass\n",
      "code": "def get_option(name, **options):\n    return options.get(name)",
      "hint": "Именованные аргументы уже собраны в options. Отсутствие ключа отличается от False.",
      "testCases": [
        {
          "expression": "get_option(\"size\", size=3)",
          "expectedValue": 3,
          "expectedCallOutput": ""
        },
        {
          "expression": "get_option(\"size\", color=\"green\")",
          "expectedValue": null,
          "expectedCallOutput": ""
        },
        {
          "expression": "get_option(\"enabled\", enabled=False)",
          "expectedValue": false,
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
