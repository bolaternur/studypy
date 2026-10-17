import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "datetime",
  "title": "Даты и время",
  "description": "Создай дату и вычисли интервал в днях.",
  "icon": "BookOpen",
  "level": "Intermediate",
  "color": "emerald",
  "topic": "Работа с данными",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Создай дату и вычисли интервал в днях.",
  "sections": [
    {
      "id": "datetime-example",
      "title": "Даты и время",
      "content": [
        "date представляет календарную дату, timedelta — длительность. Вычитание двух дат даёт timedelta. Для моментов времени у datetime бывает информация о часовом поясе: не смешивай aware и naive значения без выбранного правила."
      ],
      "code": "from datetime import date\nstart = date(2024, 2, 28)\nend = date(2024, 3, 1)\nprint((end - start).days)",
      "expectedOutput": "2"
    },
    {
      "id": "datetime-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи days_between(start, end). Аргументы — строки ISO-даты YYYY-MM-DD. Верни число календарных дней end - start; допустим отрицательный результат.",
        "Порядок аргументов date — год, месяц, день. Неверная дата вызывает ValueError. Сутки в календарных датах и 24 часа при переходах часовых поясов — разные задачи.",
        "Дальше: отдели данные программы от их текстового формата."
      ]
    }
  ],
  "challenges": [
    {
      "id": "days",
      "question": "Разница дат",
      "description": "Определи days_between(start, end). Аргументы — строки ISO-даты YYYY-MM-DD. Верни число календарных дней end - start; допустим отрицательный результат.",
      "initialCode": "def days_between(start, end):\n    pass\n",
      "code": "from datetime import date\n\ndef days_between(start, end):\n    return (date.fromisoformat(end) - date.fromisoformat(start)).days",
      "hint": "Преобразуй обе ISO-строки в date и возьми days у разности.",
      "testCases": [
        {
          "expression": "days_between(\"2024-02-28\", \"2024-03-01\")",
          "expectedValue": 2,
          "expectedCallOutput": ""
        },
        {
          "expression": "days_between(\"2025-01-01\", \"2025-01-01\")",
          "expectedValue": 0,
          "expectedCallOutput": ""
        },
        {
          "expression": "days_between(\"2025-01-03\", \"2025-01-01\")",
          "expectedValue": -2,
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/datetime.html"
  ]
};

export default lesson;
