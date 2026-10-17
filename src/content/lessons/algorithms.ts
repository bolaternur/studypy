import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "algorithms",
  "title": "Поиск и сложность",
  "description": "Найди первый подходящий элемент и объясни число проверок.",
  "icon": "BookOpen",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Алгоритмы",
  "estimatedMinutes": 12,
  "challengeCount": 2,
  "content": "Найди первый подходящий элемент и объясни число проверок.",
  "sections": [
    {
      "id": "algorithms-example",
      "title": "Поиск и сложность",
      "content": [
        "Линейный поиск просматривает элементы по одному. В худшем случае для списка длины n он проверит n элементов: O(n). Бинарный поиск сокращает область поиска примерно вдвое, но требует упорядоченных данных. Оценка сложности описывает рост работы, а не точное время."
      ],
      "code": "def first_index(values, target):\n    for index, value in enumerate(values):\n        if value == target:\n            return index\n    return -1\n\nprint(first_index([4, 7, 4], 4))",
      "expectedOutput": "0"
    },
    {
      "id": "algorithms-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи first_index(values, target), возвращающую индекс первого равного элемента или -1, если элемента нет.",
        "Поиск в set в среднем близок к O(1), но это не безусловная гарантия на любой вход. Бинарный поиск в неотсортированном списке не имеет правильного общего результата.",
        "Дальше: добавь аннотации к проверяемым функциям."
      ]
    }
  ],
  "challenges": [
    {
      "id": "search",
      "question": "Первое вхождение",
      "description": "Определи first_index(values, target), возвращающую индекс первого равного элемента или -1, если элемента нет.",
      "initialCode": "def first_index(values, target):\n    pass\n",
      "code": "def first_index(values, target):\n    for index, value in enumerate(values):\n        if value == target:\n            return index\n    return -1",
      "hint": "Верни индекс сразу после первого совпадения, а -1 — только после всего обхода.",
      "testCases": [
        {
          "expression": "first_index([4, 7, 4], 4)",
          "expectedValue": 0,
          "expectedCallOutput": ""
        },
        {
          "expression": "first_index([], 1)",
          "expectedValue": -1,
          "expectedCallOutput": ""
        },
        {
          "expression": "first_index([1, 2], 9)",
          "expectedValue": -1,
          "expectedCallOutput": ""
        },
        {
          "expression": "first_index([1, 2], 2)",
          "expectedValue": 1,
          "expectedCallOutput": ""
        }
      ]
    },
    {
      "id": "bisect",
      "question": "Позиция вставки",
      "description": "Определи insertion_index(values, target), возвращающую позицию вставки в отсортированный список перед равными элементами. Можно использовать bisect_left.",
      "initialCode": "def insertion_index(values, target):\n    pass\n",
      "code": "from bisect import bisect_left\n\ndef insertion_index(values, target):\n    return bisect_left(values, target)",
      "hint": "Для позиции перед равными подходит левая граница вставки.",
      "testCases": [
        {
          "expression": "insertion_index([1, 3, 3, 5], 3)",
          "expectedValue": 1,
          "expectedCallOutput": ""
        },
        {
          "expression": "insertion_index([], 3)",
          "expectedValue": 0,
          "expectedCallOutput": ""
        },
        {
          "expression": "insertion_index([1, 3], 4)",
          "expectedValue": 2,
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/bisect.html",
    "https://wiki.python.org/moin/TimeComplexity"
  ]
};

export default lesson;
