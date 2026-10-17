import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "metaclasses",
  "title": "Как создаётся класс",
  "description": "Создай простой класс через type и объясни роль метакласса.",
  "icon": "BookOpen",
  "level": "Professional",
  "color": "emerald",
  "topic": "Дополнительные темы",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Создай простой класс через type и объясни роль метакласса.",
  "sections": [
    {
      "id": "metaclasses-example",
      "title": "Как создаётся класс",
      "content": [
        "Классы сами являются объектами. Вызов type(name, bases, namespace) создаёт класс; type обычно выступает метаклассом. Метакласс нужен для изменения процесса создания классов, но для большинства прикладных задач достаточно обычного класса, декоратора или __init_subclass__."
      ],
      "code": "Point = type('Point', (), {'label': 'точка'})\nprint(Point().label)\nprint(isinstance(Point, type))",
      "expectedOutput": "точка\nTrue"
    },
    {
      "id": "metaclasses-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи make_record(name), возвращающую новый класс с указанным __name__ и атрибутом kind = \"record\". Экземпляр класса должен создаваться без аргументов.",
        "Не путай создание класса с созданием экземпляра: Point — класс, Point() — экземпляр. Избыточная метапрограмма затрудняет отладку; выбирай обычное определение class, пока оно решает задачу.",
        "Дальше: настрой воспроизводимую среду запуска локально."
      ]
    }
  ],
  "challenges": [
    {
      "id": "class-factory",
      "question": "Фабрика простого класса",
      "description": "Определи make_record(name), возвращающую новый класс с указанным __name__ и атрибутом kind = \"record\". Экземпляр класса должен создаваться без аргументов.",
      "initialCode": "def make_record(name):\n    pass\n",
      "code": "def make_record(name):\n    return type(name, (), {\"kind\": \"record\"})",
      "hint": "type() с тремя аргументами создаёт класс из имени, родителей и пространства атрибутов.",
      "testCases": [
        {
          "expression": "(lambda cls: [cls.__name__, cls().kind])(make_record(\"Note\"))",
          "expectedValue": [
            "Note",
            "record"
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "(lambda cls: [cls.__name__, cls().kind])(make_record(\"Task\"))",
          "expectedValue": [
            "Task",
            "record"
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "make_record(\"X\") is not make_record(\"X\")",
          "expectedValue": true,
          "description": "Каждый вызов создаёт новый класс",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/functions.html",
    "https://docs.python.org/3.13/reference/datamodel.html"
  ]
};

export default lesson;
