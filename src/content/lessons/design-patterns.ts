import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "design-patterns",
  "title": "Композиция и стратегии",
  "description": "Передай меняемое правило как функцию вместо ветвления по типу.",
  "icon": "BookOpen",
  "level": "Professional",
  "color": "emerald",
  "topic": "Дополнительные темы",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Передай меняемое правило как функцию вместо ветвления по типу.",
  "sections": [
    {
      "id": "design-patterns-example",
      "title": "Композиция и стратегии",
      "content": [
        "Паттерн — название повторяемого решения, а не обязательный набор классов. Если обработка отличается одним шагом, можно передать этот шаг функцией. Это позволяет проверить правило отдельно и сменить его без изменения основного алгоритма."
      ],
      "code": "def transform(values, strategy):\n    return [strategy(value) for value in values]\n\nprint(transform([1, 2], lambda value: value * 10))",
      "expectedOutput": "[10, 20]"
    },
    {
      "id": "design-patterns-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи transform(values, strategy), возвращающую новый список результатов strategy для каждого элемента. Сохрани порядок, вход не меняй.",
        "Не добавляй иерархию и фабрику там, где достаточно функции. У решения должна быть конкретная меняемая часть. Название паттерна не подтверждает качество архитектуры.",
        "Дальше: прочитай о метаклассах только при необходимости изменять создание классов."
      ]
    }
  ],
  "challenges": [
    {
      "id": "strategy",
      "question": "Меняемое правило",
      "description": "Определи transform(values, strategy), возвращающую новый список результатов strategy для каждого элемента. Сохрани порядок, вход не меняй.",
      "initialCode": "def transform(values, strategy):\n    pass\n",
      "code": "def transform(values, strategy):\n    return [strategy(value) for value in values]",
      "hint": "Вызывай переданную strategy для каждого элемента, а не одно заранее заданное правило.",
      "testCases": [
        {
          "expression": "transform([1, 2], lambda x: x * 10)",
          "expectedValue": [
            10,
            20
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "transform([1, 2], lambda x: -x)",
          "expectedValue": [
            -1,
            -2
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "transform([], abs)",
          "expectedValue": [],
          "expectedCallOutput": ""
        },
        {
          "setup": "values = [1, 2]",
          "expression": "[transform(values, lambda value: value * 2), values]",
          "expectedValue": [
            [
              2,
              4
            ],
            [
              1,
              2
            ]
          ],
          "description": "Исходная коллекция не меняется",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/controlflow.html",
    "https://docs.python.org/3.13/tutorial/classes.html"
  ]
};

export default lesson;
