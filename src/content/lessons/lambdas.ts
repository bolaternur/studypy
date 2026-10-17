import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "lambdas",
  "title": "Лямбда-функции",
  "description": "Задай короткое правило сортировки с key.",
  "icon": "Workflow",
  "level": "Intermediate",
  "color": "emerald",
  "topic": "Функции",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Задай короткое правило сортировки с key.",
  "sections": [
    {
      "id": "lambdas-example",
      "title": "Лямбда-функции",
      "content": [
        "lambda создаёт функцию из одного выражения. sorted(items, key=...) вычисляет ключ для каждого элемента и возвращает новый список. Для нескольких шагов или поясняющего имени используй def."
      ],
      "code": "pairs = [('a', 3), ('b', 1)]\nprint(sorted(pairs, key=lambda item: item[1]))",
      "expectedOutput": "[('b', 1), ('a', 3)]"
    },
    {
      "id": "lambdas-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи by_score(items), возвращающую новый список пар (имя, балл), отсортированный по баллу по возрастанию. При равных баллах сохраняй исходный порядок.",
        "Параметр key получает функцию, а не уже вычисленное значение. Не вызывай lambda сразу, если sorted должен вызвать её для каждого элемента.",
        "Дальше: сопоставь и отфильтруй последовательность."
      ]
    }
  ],
  "challenges": [
    {
      "id": "sort",
      "question": "Сортировка по баллу",
      "description": "Определи by_score(items), возвращающую новый список пар (имя, балл), отсортированный по баллу по возрастанию. При равных баллах сохраняй исходный порядок.",
      "initialCode": "def by_score(items):\n    pass\n",
      "code": "def by_score(items):\n    return sorted(items, key=lambda item: item[1])",
      "hint": "Ключ сортировки — второй элемент пары. sorted() сохраняет порядок равных ключей.",
      "testCases": [
        {
          "expression": "list(map(list, by_score([(\"b\", 3), (\"a\", 1)])))",
          "expectedValue": [
            [
              "a",
              1
            ],
            [
              "b",
              3
            ]
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "list(map(list, by_score([])))",
          "expectedValue": [],
          "expectedCallOutput": ""
        },
        {
          "expression": "list(map(list, by_score([(\"a\", 2), (\"b\", 2)])))",
          "expectedValue": [
            [
              "a",
              2
            ],
            [
              "b",
              2
            ]
          ],
          "expectedCallOutput": ""
        },
        {
          "setup": "items = [(\"b\", 3), (\"a\", 1)]",
          "expression": "[[list(pair) for pair in by_score(items)], [list(pair) for pair in items]]",
          "expectedValue": [
            [
              [
                "a",
                1
              ],
              [
                "b",
                3
              ]
            ],
            [
              [
                "b",
                3
              ],
              [
                "a",
                1
              ]
            ]
          ],
          "description": "Сортировка не меняет вход",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/controlflow.html",
    "https://docs.python.org/3.13/library/functions.html"
  ]
};

export default lesson;
