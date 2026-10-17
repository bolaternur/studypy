import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "async",
  "title": "Асинхронные функции",
  "description": "Создай coroutine и дождись её результата.",
  "icon": "BookOpen",
  "level": "Professional",
  "color": "emerald",
  "topic": "Дополнительные темы",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Создай coroutine и дождись её результата.",
  "sections": [
    {
      "id": "async-example",
      "title": "Асинхронные функции",
      "content": [
        "async def определяет coroutine-функцию. Её вызов сам по себе не исполняет тело до результата: coroutine нужно ожидать через await или запланировать в event loop. await отдаёт управление при ожидании; это не обещание параллельных вычислений на нескольких ядрах."
      ],
      "code": "async def double(value):\n    return value * 2\n\nprint(await double(3))",
      "expectedOutput": "6"
    },
    {
      "id": "async-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи async-функцию double(value), возвращающую удвоенное число. Автопроверка ожидает coroutine через await.",
        "В обычном .py файле верхнеуровневый await не допускается: точку входа часто запускают через asyncio.run(main()). Здесь Pyodide поддерживает await верхнего уровня. Системные возможности asyncio зависят от среды.",
        "Дальше: сравни асинхронность с потоками."
      ]
    }
  ],
  "challenges": [
    {
      "id": "coroutine",
      "question": "Ожидание результата",
      "description": "Определи async-функцию double(value), возвращающую удвоенное число. Автопроверка ожидает coroutine через await.",
      "initialCode": "async def double(value):\n    pass\n",
      "code": "async def double(value):\n    return value * 2",
      "hint": "Используй async def. Вызывающий тест сам дождётся возвращаемого результата.",
      "testCases": [
        {
          "expression": "await double(3)",
          "expectedValue": 6,
          "expectedCallOutput": ""
        },
        {
          "expression": "await double(0)",
          "expectedValue": 0,
          "expectedCallOutput": ""
        },
        {
          "expression": "await double(-2)",
          "expectedValue": -4,
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/asyncio-task.html"
  ]
};

export default lesson;
