import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "properties",
  "title": "Свойства @property",
  "description": "Открой вычисляемое значение как атрибут только для чтения.",
  "icon": "BookOpen",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Объекты",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Открой вычисляемое значение как атрибут только для чтения.",
  "sections": [
    {
      "id": "properties-example",
      "title": "Свойства @property",
      "content": [
        "@property превращает метод получения значения в доступ obj.name. Свойство может вычисляться из других атрибутов и не храниться отдельно. Setter нужен только когда присваивание этому свойству имеет смысл."
      ],
      "code": "class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    @property\n    def area(self):\n        return self.width * self.height\n\nprint(Rectangle(3, 4).area)",
      "expectedOutput": "12"
    },
    {
      "id": "properties-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи Rectangle(width, height) со свойством area, равным произведению сторон. При изменении width следующее чтение area должно учитывать новое значение.",
        "Свойство читают без круглых скобок: rectangle.area. Если возвращённое значение — число, rectangle.area() попытается вызвать число и вызовет TypeError.",
        "Дальше: сохрани данные между вызовами функции."
      ]
    }
  ],
  "challenges": [
    {
      "id": "area",
      "question": "Вычисляемая площадь",
      "description": "Определи Rectangle(width, height) со свойством area, равным произведению сторон. При изменении width следующее чтение area должно учитывать новое значение.",
      "initialCode": "class Rectangle:\n    pass\n",
      "code": "class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    @property\n    def area(self):\n        return self.width * self.height",
      "hint": "Площадь нужно вычислять при чтении, чтобы она учитывала изменение ширины.",
      "testCases": [
        {
          "expression": "Rectangle(3, 4).area",
          "expectedValue": 12,
          "expectedCallOutput": ""
        },
        {
          "expression": "Rectangle(0, 5).area",
          "expectedValue": 0,
          "expectedCallOutput": ""
        },
        {
          "setup": "def resize(rectangle):\n    rectangle.width = 5\n    return rectangle.area",
          "expression": "resize(Rectangle(2, 3))",
          "expectedValue": 15,
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
