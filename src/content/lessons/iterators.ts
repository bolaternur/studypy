import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "iterators",
  "title": "Итераторы",
  "description": "Создай итератор и обработай его исчерпание.",
  "icon": "BookOpen",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Последовательности",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Создай итератор и обработай его исчерпание.",
  "sections": [
    {
      "id": "iterators-example",
      "title": "Итераторы",
      "content": [
        "iter(collection) получает итератор. next(iterator) возвращает очередной элемент, а после конца вызывает StopIteration. next(iterator, default) вместо исключения возвращает запасное значение."
      ],
      "code": "iterator = iter([10, 20])\nprint(next(iterator))\nprint(next(iterator))\nprint(next(iterator, 'Конец'))",
      "expectedOutput": "10\n20\nКонец"
    },
    {
      "id": "iterators-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи first_or(items, default=None), возвращающую первый элемент iterable или default, если элементов нет. Не считывай остальные элементы.",
        "Итератор и коллекция — разные объекты. Повторный обход того же исчерпанного итератора не начинает последовательность заново. Получи новый iter(collection), если нужен новый проход.",
        "Дальше: опиши собственный источник значений с yield."
      ]
    }
  ],
  "challenges": [
    {
      "id": "first",
      "question": "Первый элемент или запасное значение",
      "description": "Определи first_or(items, default=None), возвращающую первый элемент iterable или default, если элементов нет. Не считывай остальные элементы.",
      "initialCode": "def first_or(items, default=None):\n    pass\n",
      "code": "def first_or(items, default=None):\n    return next(iter(items), default)",
      "hint": "next() принимает запасное значение; для пустого итератора не нужен отдельный список.",
      "testCases": [
        {
          "expression": "first_or([4, 5])",
          "expectedValue": 4,
          "expectedCallOutput": ""
        },
        {
          "expression": "first_or([], \"пусто\")",
          "expectedValue": "пусто",
          "expectedCallOutput": ""
        },
        {
          "expression": "first_or(iter([0, 1]), 9)",
          "expectedValue": 0,
          "expectedCallOutput": ""
        },
        {
          "setup": "iterator = iter([4, 5, 6])",
          "expression": "[first_or(iterator), list(iterator)]",
          "expectedValue": [
            4,
            [
              5,
              6
            ]
          ],
          "description": "Остальные элементы не считываются",
          "expectedCallOutput": ""
        },
        {
          "expression": "first_or([])",
          "expectedValue": null,
          "description": "Значение по умолчанию — None",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/classes.html",
    "https://docs.python.org/3.13/library/functions.html"
  ]
};

export default lesson;
