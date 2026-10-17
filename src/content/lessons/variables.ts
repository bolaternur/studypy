import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "variables",
  "title": "Переменные",
  "description": "Сохрани значение под именем и используй его в выражении.",
  "icon": "Code",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Основы",
  "estimatedMinutes": 12,
  "challengeCount": 2,
  "content": "Сохрани значение под именем и используй его в выражении.",
  "sections": [
    {
      "id": "variables-example",
      "title": "Переменные",
      "content": [
        "Присваивание связывает имя со значением: score = 10. Следующее присваивание этому имени меняет связь. Python различает score и Score. Имя должно существовать до чтения."
      ],
      "code": "score = 10\nscore = score + 5\nprint(score)",
      "expectedOutput": "15"
    },
    {
      "id": "variables-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Создай переменную x со значением 100. Печатать её не требуется.",
        "NameError означает, что имя не определено. Запись score == 10 сравнивает значения, а score = 10 присваивает значение.",
        "Дальше: различай числа, текст и логические значения."
      ]
    }
  ],
  "challenges": [
    {
      "id": "create",
      "question": "Создание переменной",
      "description": "Создай переменную x со значением 100. Печатать её не требуется.",
      "initialCode": "# Создай x\n",
      "code": "x = 100",
      "hint": "Присваивание использует один знак равенства. Имя слева — x.",
      "testCases": [
        {
          "expression": "x",
          "expectedValue": 100,
          "expectedCallOutput": ""
        }
      ]
    },
    {
      "id": "update",
      "question": "Изменение значения",
      "description": "Начни с coins = 12. Добавь 8 монет и выведи итог.",
      "initialCode": "coins = 12\n# Обнови coins и выведи результат\n",
      "code": "coins = 12\ncoins += 8\nprint(coins)",
      "hint": "Новое значение coins должно учитывать прежнее; затем покажи его через print().",
      "testCases": [
        {
          "expectedOutput": "20",
          "expression": "coins",
          "expectedValue": 20,
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/introduction.html",
    "https://docs.python.org/3.13/reference/executionmodel.html"
  ]
};

export default lesson;
