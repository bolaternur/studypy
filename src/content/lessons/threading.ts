import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "threading",
  "title": "Потоки: возможности и ограничения",
  "description": "Различи совместное состояние потоков и чистую обработку данных.",
  "icon": "BookOpen",
  "level": "Professional",
  "color": "emerald",
  "topic": "Дополнительные темы",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Различи совместное состояние потоков и чистую обработку данных.",
  "sections": [
    {
      "id": "threading-example",
      "title": "Потоки: возможности и ограничения",
      "content": [
        "Потоки одного процесса разделяют память. Для связанных операций с общим состоянием может требоваться Lock. Во многих обычных сборках CPython GIL ограничивает одновременное исполнение Python-байткода; существуют и free-threaded сборки. Потоки часто полезны для ожидания ввода-вывода, но выбор зависит от задачи."
      ],
      "code": "def partial_total(batch):\n    return sum(batch)\n\nparts = [partial_total([1, 2]), partial_total([3])]\nprint(sum(parts))",
      "expectedOutput": "6"
    },
    {
      "id": "threading-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи partial_total(batch), возвращающую сумму чисел без глобального накопителя. Это подготовка функции для конкурентного вызова, а не проверка потоков.",
        "Порядок завершения потоков не гарантирован. Не полагайся на случайную атомарность операций как на весь контракт программы. Браузерная задача проверяет только чистую функцию обработки порции: реальные потоки и гонки здесь не запускаются.",
        "Дальше: выдели работу в отдельные процессы локально."
      ]
    }
  ],
  "challenges": [
    {
      "id": "batch",
      "question": "Чистая обработка порции",
      "description": "Определи partial_total(batch), возвращающую сумму чисел без глобального накопителя. Это подготовка функции для конкурентного вызова, а не проверка потоков.",
      "initialCode": "def partial_total(batch):\n    pass\n",
      "code": "def partial_total(batch):\n    return sum(batch)",
      "hint": "Суммируй только переданный batch, не сохраняй накопитель между вызовами.",
      "testCases": [
        {
          "expression": "partial_total([1, 2, 3])",
          "expectedValue": 6,
          "expectedCallOutput": ""
        },
        {
          "expression": "partial_total([])",
          "expectedValue": 0,
          "expectedCallOutput": ""
        },
        {
          "expression": "[partial_total([1]), partial_total([2])]",
          "expectedValue": [
            1,
            2
          ],
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/threading.html"
  ]
};

export default lesson;
