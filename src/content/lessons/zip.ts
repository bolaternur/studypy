import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "zip",
  "title": "zip и enumerate",
  "description": "Сопоставь две последовательности и пронумеруй элементы.",
  "icon": "Database",
  "level": "Intermediate",
  "color": "emerald",
  "topic": "Коллекции",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Сопоставь две последовательности и пронумеруй элементы.",
  "sections": [
    {
      "id": "zip-example",
      "title": "zip и enumerate",
      "content": [
        "zip(a, b) создаёт пары соответствующих элементов и по умолчанию останавливается на самой короткой последовательности. enumerate(items, start=1) добавляет номер к каждому элементу."
      ],
      "code": "names = ['Алия', 'Олег']\nscores = [8, 9]\nfor index, (name, score) in enumerate(zip(names, scores), start=1):\n    print(index, name, score)",
      "expectedOutput": "1 Алия 8\n2 Олег 9"
    },
    {
      "id": "zip-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи pair_up(a, b), возвращающую список пар из a и b до конца более короткой последовательности.",
        "zip не предупреждает о разной длине по умолчанию. Если это ошибка входных данных, используй zip(..., strict=True) в поддерживаемой версии Python или явную проверку длин.",
        "Дальше: прими переменное число аргументов."
      ]
    }
  ],
  "challenges": [
    {
      "id": "pairs",
      "question": "Пары элементов",
      "description": "Определи pair_up(a, b), возвращающую список пар из a и b до конца более короткой последовательности.",
      "initialCode": "def pair_up(a, b):\n    pass\n",
      "code": "def pair_up(a, b):\n    return list(zip(a, b))",
      "hint": "zip() останавливается на короткой последовательности. Преврати итератор в список.",
      "testCases": [
        {
          "expression": "list(map(list, pair_up([1, 2], [\"a\", \"b\"])))",
          "expectedValue": [
            [
              1,
              "a"
            ],
            [
              2,
              "b"
            ]
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "list(map(list, pair_up([1, 2], [\"a\"])))",
          "expectedValue": [
            [
              1,
              "a"
            ]
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "list(map(list, pair_up([], [1])))",
          "expectedValue": [],
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
