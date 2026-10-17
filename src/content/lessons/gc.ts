import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "gc",
  "title": "Сборка мусора и weakref",
  "description": "Проверь, как слабая ссылка ведёт себя после удаления сильной.",
  "icon": "BookOpen",
  "level": "Professional",
  "color": "emerald",
  "topic": "Дополнительные темы",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Проверь, как слабая ссылка ведёт себя после удаления сильной.",
  "sections": [
    {
      "id": "gc-example",
      "title": "Сборка мусора и weakref",
      "content": [
        "Управление памятью зависит от реализации Python. В CPython подсчёт ссылок дополняется сборщиком циклов. Слабая ссылка не удерживает объект живым: вызов weakref.ref возвращает объект, пока он существует, и None после его удаления."
      ],
      "code": "import gc\nimport weakref\n\nclass Item:\n    pass\n\nitem = Item()\nreference = weakref.ref(item)\nprint(reference() is item)\ndel item\ngc.collect()\nprint(reference() is None)",
      "expectedOutput": "True\nTrue"
    },
    {
      "id": "gc-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Создай обычный экземпляр своего класса и weakref.ref на него. Выведи True для проверки, что ссылка указывает на объект; затем удали последнюю сильную ссылку, вызови gc.collect() и выведи True, если weakref возвращает None.",
        "del удаляет связь имени, а не даёт общей гарантии немедленного удаления объекта. Не строй логику закрытия файлов на моменте сборки мусора — используй with.",
        "Дальше: прочитай структуру исходного кода через AST."
      ]
    }
  ],
  "challenges": [
    {
      "id": "weak",
      "question": "Слабая ссылка",
      "description": "Создай обычный экземпляр своего класса и weakref.ref на него. Выведи True для проверки, что ссылка указывает на объект; затем удали последнюю сильную ссылку, вызови gc.collect() и выведи True, если weakref возвращает None.",
      "initialCode": "# Создай объект и слабую ссылку\n",
      "code": "import gc\nimport weakref\n\nclass Item:\n    pass\n\nitem = Item()\nreference = weakref.ref(item)\nprint(reference() is item)\ndel item\ngc.collect()\nprint(reference() is None)",
      "hint": "Удали все сильные ссылки, но сохрани объект weakref.ref. Слабая ссылка сама объект не удерживает.",
      "testCases": [
        {
          "expectedOutput": "True\nTrue",
          "expression": "[isinstance(reference, weakref.ReferenceType), reference() is None]",
          "expectedValue": [
            true,
            true
          ],
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/gc.html",
    "https://docs.python.org/3.13/library/weakref.html"
  ]
};

export default lesson;
