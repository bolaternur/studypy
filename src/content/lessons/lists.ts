import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "lists",
  "title": "Списки",
  "description": "Прочитай элемент списка и измени коллекцию.",
  "icon": "Database",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Коллекции",
  "estimatedMinutes": 12,
  "challengeCount": 2,
  "content": "Прочитай элемент списка и измени коллекцию.",
  "sections": [
    {
      "id": "lists-example",
      "title": "Списки",
      "content": [
        "Список хранит упорядоченные значения. Индексация начинается с 0, индекс -1 обращается к последнему элементу. append() добавляет элемент в конец и изменяет исходный список; len() возвращает число элементов."
      ],
      "code": "items = ['чай', 'хлеб']\nitems.append('сыр')\nprint(items[0])\nprint(len(items))",
      "expectedOutput": "чай\n3"
    },
    {
      "id": "lists-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "В списке items должны остаться числа [3, 5, 8] в этом порядке. Добавь 8 к заготовке.",
        "items[3] у списка длины 3 вызовет IndexError. Не присваивай items = items.append(...): append() возвращает None. Для независимой поверхностной копии используй items.copy().",
        "Дальше: сравни изменяемый список с кортежем."
      ]
    }
  ],
  "challenges": [
    {
      "id": "append",
      "question": "Добавление элемента",
      "description": "В списке items должны остаться числа [3, 5, 8] в этом порядке. Добавь 8 к заготовке.",
      "initialCode": "items = [3, 5]\n# Добавь элемент\n",
      "code": "items = [3, 5]\nitems.append(8)",
      "hint": "Метод добавления изменяет исходный список; присваивать его результат не нужно.",
      "testCases": [
        {
          "expression": "items",
          "expectedValue": [
            3,
            5,
            8
          ],
          "expectedCallOutput": ""
        }
      ]
    },
    {
      "id": "slice",
      "question": "Первые элементы",
      "description": "Выведи первые три элемента values как список.",
      "initialCode": "values = [10, 20, 30, 40]\n# Выведи срез\n",
      "code": "values = [10, 20, 30, 40]\nprint(values[:3])",
      "hint": "Правая граница среза исключается. Первый индекс можно не писать.",
      "testCases": [
        {
          "expectedOutput": "[10, 20, 30]"
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/datastructures.html"
  ]
};

export default lesson;
