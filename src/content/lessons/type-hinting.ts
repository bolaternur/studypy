import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "type-hinting",
  "title": "Аннотации типов",
  "description": "Опиши типы аргументов и возвращаемого значения.",
  "icon": "BookOpen",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Инструменты",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Опиши типы аргументов и возвращаемого значения.",
  "sections": [
    {
      "id": "type-hinting-example",
      "title": "Аннотации типов",
      "content": [
        "Аннотации помогают инструментам и читателю. def add(a: int, b: int) -> int описывает ожидаемые типы, но обычный Python автоматически не проверяет их при вызове. list[int] обозначает список целых, int | None — число или отсутствие значения."
      ],
      "code": "def add(a: int, b: int) -> int:\n    return a + b\n\nprint(add(2, 3))",
      "expectedOutput": "5"
    },
    {
      "id": "type-hinting-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи add(a: int, b: int) -> int, возвращающую сумму. Проверка запускает функцию с целыми числами; автоматическая проверка типов не выполняется.",
        "Аннотация не преобразует значение и не гарантирует валидацию. Для проверки до запуска можно настроить mypy или pyright локально. В задаче оценивается поведение функции; синтаксис аннотаций сравни с примером самостоятельно.",
        "Дальше: перейди к дополнительным системным темам по необходимости."
      ]
    }
  ],
  "challenges": [
    {
      "id": "typed-add",
      "question": "Функция с аннотациями",
      "description": "Определи add(a: int, b: int) -> int, возвращающую сумму. Проверка запускает функцию с целыми числами; автоматическая проверка типов не выполняется.",
      "initialCode": "def add(a: int, b: int) -> int:\n    pass\n",
      "code": "def add(a: int, b: int) -> int:\n    return a + b",
      "hint": "Аннотации описывают типы; само вычисление суммы всё равно нужно написать.",
      "testCases": [
        {
          "expression": "add(2, 3)",
          "expectedValue": 5,
          "expectedCallOutput": ""
        },
        {
          "expression": "add(-2, 2)",
          "expectedValue": 0,
          "expectedCallOutput": ""
        },
        {
          "expression": "add(0, -1)",
          "expectedValue": -1,
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/typing.html",
    "https://mypy.readthedocs.io/en/stable/getting_started.html"
  ]
};

export default lesson;
