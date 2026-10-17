import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "if-else",
  "title": "Условия if/else",
  "description": "Выбери ветку программы по значению входных данных.",
  "icon": "Code",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Основы",
  "estimatedMinutes": 12,
  "challengeCount": 2,
  "content": "Выбери ветку программы по значению входных данных.",
  "sections": [
    {
      "id": "if-else-example",
      "title": "Условия if/else",
      "content": [
        "После if записывают условие и двоеточие. Вложенные команды имеют отступ. elif проверяет следующее условие, если предыдущие ложны; else выполняется, когда ни одно условие не подошло."
      ],
      "code": "age = 16\nif age >= 18:\n    print('Взрослый')\nelse:\n    print('Несовершеннолетний')",
      "expectedOutput": "Несовершеннолетний"
    },
    {
      "id": "if-else-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Прочитай возраст — неотрицательное целое число. Если age >= 18, выведи Adult, иначе Minor.",
        "При сравнении с границей проверь равенство: age > 18 исключит 18 лет. else не имеет собственного условия. Одинаковые отступы определяют, какие команды входят в ветку.",
        "Дальше: повтори действие в цикле."
      ]
    }
  ],
  "challenges": [
    {
      "id": "age",
      "question": "Возрастная граница",
      "description": "Прочитай возраст — неотрицательное целое число. Если age >= 18, выведи Adult, иначе Minor.",
      "initialCode": "# Прочитай age и выбери ответ\n",
      "code": "age = int(input())\nif age >= 18:\n    print('Adult')\nelse:\n    print('Minor')",
      "hint": "Отдельно проверь возраст 18: к какой ветке он должен относиться?",
      "testCases": [
        {
          "stdin": [
            "18"
          ],
          "expectedOutput": "Adult"
        },
        {
          "stdin": [
            "17"
          ],
          "expectedOutput": "Minor"
        },
        {
          "stdin": [
            "0"
          ],
          "expectedOutput": "Minor"
        }
      ]
    },
    {
      "id": "grade",
      "question": "Оценка",
      "description": "Прочитай целый балл от 0 до 100. Выведи A для >=90, B для >=80, иначе C.",
      "initialCode": "# Выбери оценку\n",
      "code": "score = int(input())\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelse:\n    print('C')",
      "hint": "Начни с самой высокой границы, чтобы более низкая не перехватила большой балл.",
      "testCases": [
        {
          "stdin": [
            "90"
          ],
          "expectedOutput": "A"
        },
        {
          "stdin": [
            "100"
          ],
          "expectedOutput": "A"
        },
        {
          "stdin": [
            "80"
          ],
          "expectedOutput": "B"
        },
        {
          "stdin": [
            "79"
          ],
          "expectedOutput": "C"
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/controlflow.html"
  ]
};

export default lesson;
