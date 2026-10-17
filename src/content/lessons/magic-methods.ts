import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "magic-methods",
  "title": "Специальные методы",
  "description": "Определи строковое представление собственного объекта.",
  "icon": "BookOpen",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Объекты",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Определи строковое представление собственного объекта.",
  "sections": [
    {
      "id": "magic-methods-example",
      "title": "Специальные методы",
      "content": [
        "Специальные методы связывают класс с операциями Python. str(obj) вызывает __str__, len(obj) — __len__. Реализуй только осмысленные для объекта операции и соблюдай их контракт."
      ],
      "code": "class Label:\n    def __init__(self, text):\n        self.text = text\n\n    def __str__(self):\n        return self.text\n\nprint(Label('Готово'))",
      "expectedOutput": "Готово"
    },
    {
      "id": "magic-methods-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи Label(text), у которого str(obj) возвращает текст в квадратных скобках, например [Python].",
        "__str__ должен вернуть строку. Печать внутри __str__ не заменяет return и приведёт к ошибке при преобразовании объекта. Не придумывай собственные имена вида __что_то__ для обычных методов.",
        "Дальше: используй наследование там, где подходит отношение «является»."
      ]
    }
  ],
  "challenges": [
    {
      "id": "str",
      "question": "Строковое представление",
      "description": "Определи Label(text), у которого str(obj) возвращает текст в квадратных скобках, например [Python].",
      "initialCode": "class Label:\n    pass\n",
      "code": "class Label:\n    def __init__(self, text):\n        self.text = text\n\n    def __str__(self):\n        return f\"[{self.text}]\"",
      "hint": "str() ожидает строку, возвращённую из __str__, а не напечатанную внутри.",
      "testCases": [
        {
          "expression": "str(Label(\"Python\"))",
          "expectedValue": "[Python]",
          "expectedCallOutput": ""
        },
        {
          "expression": "str(Label(\"\"))",
          "expectedValue": "[]",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/reference/datamodel.html"
  ]
};

export default lesson;
