import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "sets",
  "title": "Множества",
  "description": "Удали повторы и найди общие элементы.",
  "icon": "Database",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Коллекции",
  "estimatedMinutes": 12,
  "challengeCount": 2,
  "content": "Удали повторы и найди общие элементы.",
  "sections": [
    {
      "id": "sets-example",
      "title": "Множества",
      "content": [
        "set хранит уникальные хешируемые элементы и не задаёт порядок вывода. & даёт пересечение, | — объединение, - — разность. Пустое множество создают set(), потому что {} — пустой словарь."
      ],
      "code": "a = {1, 2, 3}\nb = {2, 3, 4}\nprint(sorted(a & b))",
      "expectedOutput": "[2, 3]"
    },
    {
      "id": "sets-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Создай множество unique из values.",
        "У множества нет индекса set[0]. Для стабильного отображения чисел в примере используется sorted(): порядок множества не подходит для проверки последовательности.",
        "Дальше: обработай строки и их части."
      ]
    }
  ],
  "challenges": [
    {
      "id": "unique",
      "question": "Без повторов",
      "description": "Создай множество unique из values.",
      "initialCode": "values = [3, 1, 3, 2, 1]\n# Создай unique\n",
      "code": "values = [3, 1, 3, 2, 1]\nunique = set(values)",
      "hint": "Преобразование к set убирает повторения; список не требуется сортировать.",
      "testCases": [
        {
          "expression": "[type(unique).__name__, sorted(unique)]",
          "expectedValue": [
            "set",
            [
              1,
              2,
              3
            ]
          ],
          "expectedCallOutput": ""
        }
      ]
    },
    {
      "id": "intersection",
      "question": "Общие элементы",
      "description": "Сохрани общие элементы a и b в result как множество.",
      "initialCode": "a = {1, 3, 5}\nb = {3, 4, 5}\n# Найди пересечение\n",
      "code": "a = {1, 3, 5}\nb = {3, 4, 5}\nresult = a & b",
      "hint": "Нужны элементы, которые есть сразу в обоих множествах.",
      "testCases": [
        {
          "expression": "sorted(result)",
          "expectedValue": [
            3,
            5
          ],
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/datastructures.html"
  ]
};

export default lesson;
