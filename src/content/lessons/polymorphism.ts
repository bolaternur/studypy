import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "polymorphism",
  "title": "Общее поведение объектов",
  "description": "Используй один протокол для разных типов объектов.",
  "icon": "BookOpen",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Объекты",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Используй один протокол для разных типов объектов.",
  "sections": [
    {
      "id": "polymorphism-example",
      "title": "Общее поведение объектов",
      "content": [
        "Функции могут работать с объектами разных классов, если те предоставляют нужные операции. Для len() подходят строка, список и другие объекты с __len__. Общее поведение не требует общей пользовательской базовой иерархии."
      ],
      "code": "for item in ['Python', [10, 20], {'name': 'Алия'}]:\n    print(len(item))",
      "expectedOutput": "6\n2\n1"
    },
    {
      "id": "polymorphism-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи lengths(items), возвращающую длины всех элементов. Каждый элемент поддерживает len().",
        "Проверка точного типа через type(obj) == ... может исключить подходящий объект. При этом не любой объект поддерживает len(): контракт функции должен объяснять требуемые операции.",
        "Дальше: ограничи изменение состояния понятным интерфейсом."
      ]
    }
  ],
  "challenges": [
    {
      "id": "lengths",
      "question": "Длины разных объектов",
      "description": "Определи lengths(items), возвращающую длины всех элементов. Каждый элемент поддерживает len().",
      "initialCode": "def lengths(items):\n    pass\n",
      "code": "def lengths(items):\n    return [len(item) for item in items]",
      "hint": "Тебе не нужно проверять тип каждого элемента: они все поддерживают len().",
      "testCases": [
        {
          "expression": "lengths([\"abc\", [1], {}])",
          "expectedValue": [
            3,
            1,
            0
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "lengths([])",
          "expectedValue": [],
          "expectedCallOutput": ""
        },
        {
          "expression": "lengths([(), \"\"])",
          "expectedValue": [
            0,
            0
          ],
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/classes.html",
    "https://docs.python.org/3.13/reference/datamodel.html"
  ]
};

export default lesson;
