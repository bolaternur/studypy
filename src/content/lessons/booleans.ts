import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "booleans",
  "title": "Сравнения и логика",
  "description": "Получи True или False из сравнения и логического выражения.",
  "icon": "Code",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Основы",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Получи True или False из сравнения и логического выражения.",
  "sections": [
    {
      "id": "booleans-example",
      "title": "Сравнения и логика",
      "content": [
        "== сравнивает значения, != проверяет неравенство. <, <=, > и >= задают порядок. and требует оба условия, or — хотя бы одно, not меняет истинность. Для проверки границ удобно составное сравнение 0 <= value <= 10."
      ],
      "code": "age = 18\nprint(age >= 18)\nprint(0 <= age <= 10)",
      "expectedOutput": "True\nFalse"
    },
    {
      "id": "booleans-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Прочитай целое число. Выведи True, если оно от 0 до 10 включительно, иначе False.",
        "Один знак = — присваивание. Логические литералы True и False начинаются с заглавной буквы; строки \"False\" и \"True\" не являются логическими значениями.",
        "Дальше: выполни разные действия в зависимости от условия."
      ]
    }
  ],
  "challenges": [
    {
      "id": "range",
      "question": "Проверка диапазона",
      "description": "Прочитай целое число. Выведи True, если оно от 0 до 10 включительно, иначе False.",
      "initialCode": "# Прочитай число и проверь границы\n",
      "code": "n = int(input())\nprint(0 <= n <= 10)",
      "hint": "Проверь обе границы, включая равенство. Само сравнение уже даёт bool.",
      "testCases": [
        {
          "stdin": [
            "0"
          ],
          "expectedOutput": "True"
        },
        {
          "stdin": [
            "10"
          ],
          "expectedOutput": "True"
        },
        {
          "stdin": [
            "-1"
          ],
          "expectedOutput": "False"
        },
        {
          "stdin": [
            "11"
          ],
          "expectedOutput": "False"
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/stdtypes.html"
  ]
};

export default lesson;
