import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "classes",
  "title": "Классы и объекты",
  "description": "Создай несколько независимых объектов с атрибутами.",
  "icon": "BookOpen",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Объекты",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Создай несколько независимых объектов с атрибутами.",
  "sections": [
    {
      "id": "classes-example",
      "title": "Классы и объекты",
      "content": [
        "Класс описывает поведение объектов. __init__ настраивает новый экземпляр; self — ссылка на экземпляр, которую метод получает при вызове через объект. Атрибуты self.name хранят состояние конкретного объекта."
      ],
      "code": "class User:\n    def __init__(self, name):\n        self.name = name\n\nuser = User('Алия')\nprint(user.name)",
      "expectedOutput": "Алия"
    },
    {
      "id": "classes-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи Counter(start=0). Атрибут value хранит начальное значение. Метод increment() увеличивает его на 1 и возвращает новое значение. Экземпляры независимы.",
        "Изменяемый атрибут класса, например items = [], будет общим для экземпляров, пока не переопределён. Создавай независимые списки в __init__, если каждый объект должен владеть своим.",
        "Дальше: добавь операции к объекту."
      ]
    }
  ],
  "challenges": [
    {
      "id": "counter",
      "question": "Счётчик",
      "description": "Определи Counter(start=0). Атрибут value хранит начальное значение. Метод increment() увеличивает его на 1 и возвращает новое значение. Экземпляры независимы.",
      "initialCode": "class Counter:\n    pass\n",
      "code": "class Counter:\n    def __init__(self, start=0):\n        self.value = start\n\n    def increment(self):\n        self.value += 1\n        return self.value",
      "hint": "Храни value на self. Каждый вызов increment должен менять именно этот экземпляр.",
      "testCases": [
        {
          "expression": "Counter().increment()",
          "expectedValue": 1,
          "expectedCallOutput": ""
        },
        {
          "expression": "Counter(-1).increment()",
          "expectedValue": 0,
          "expectedCallOutput": ""
        },
        {
          "expression": "(lambda a, b: [a.increment(), a.increment(), b.value])(Counter(5), Counter())",
          "expectedValue": [
            6,
            7,
            0
          ],
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/classes.html"
  ]
};

export default lesson;
