import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "generators",
  "title": "Генераторы",
  "description": "Выдавай результаты постепенно через yield.",
  "icon": "BookOpen",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Последовательности",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Выдавай результаты постепенно через yield.",
  "sections": [
    {
      "id": "generators-example",
      "title": "Генераторы",
      "content": [
        "Наличие yield в функции делает её генераторной. Вызов создаёт генератор; тело начинает выполняться при запросе следующего значения. yield приостанавливает выполнение с сохранением локального состояния."
      ],
      "code": "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nprint(list(countdown(3)))",
      "expectedOutput": "[3, 2, 1]"
    },
    {
      "id": "generators-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи генератор countdown(n): выдай числа от n до 1. Для n <= 0 не выдавай ничего.",
        "return завершает генератор и не выдаёт очередной элемент. Генератор обычно можно пройти только один раз. Ленивость экономит память только пока ты не собираешь все результаты в list().",
        "Дальше: управляй ресурсом через with."
      ]
    }
  ],
  "challenges": [
    {
      "id": "countdown",
      "question": "Обратный отсчёт",
      "description": "Определи генератор countdown(n): выдай числа от n до 1. Для n <= 0 не выдавай ничего.",
      "initialCode": "def countdown(n):\n    pass\n",
      "code": "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1",
      "hint": "yield выдаёт один элемент. После него уменьши n, чтобы генератор завершился.",
      "testCases": [
        {
          "expression": "[type(countdown(3)).__name__, list(countdown(3))]",
          "expectedValue": [
            "generator",
            [
              3,
              2,
              1
            ]
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "list(countdown(0))",
          "expectedValue": [],
          "expectedCallOutput": ""
        },
        {
          "expression": "list(countdown(-2))",
          "expectedValue": [],
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/classes.html",
    "https://docs.python.org/3.13/reference/expressions.html"
  ]
};

export default lesson;
