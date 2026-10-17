import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "input",
  "title": "Ввод данных",
  "description": "Прочитай введённые строки и используй их в программе.",
  "icon": "Code",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Основы",
  "estimatedMinutes": 12,
  "challengeCount": 2,
  "content": "Прочитай введённые строки и используй их в программе.",
  "sections": [
    {
      "id": "input-example",
      "title": "Ввод данных",
      "content": [
        "input() получает одну строку без завершающего переноса. Даже если введены цифры, результат имеет тип str. Чтобы считать целое число, используй int(input()). В проверках входные строки задаются отдельно от программы."
      ],
      "code": "name = input()\nprint('Привет,', name)",
      "expectedOutput": "Привет, Алия",
      "stdin": [
        "Алия"
      ]
    },
    {
      "id": "input-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Прочитай имя через input() и выведи Привет, <имя>! без угловых скобок. Не печатай приглашение ко вводу.",
        "Если написать input без скобок, строка не будет прочитана. При проверке вывод должен содержать только запрошенный результат: текст приглашения в input(\"Имя: \") тоже попадает в вывод.",
        "Дальше: сравни числа и объедини условия."
      ]
    }
  ],
  "challenges": [
    {
      "id": "greeting",
      "question": "Приветствие",
      "description": "Прочитай имя через input() и выведи Привет, <имя>! без угловых скобок. Не печатай приглашение ко вводу.",
      "initialCode": "# Прочитай имя и поприветствуй\n",
      "code": "name = input()\nprint(f'Привет, {name}!')",
      "hint": "Прочитай одну строку. Обрати внимание на запятую, пробел и восклицательный знак.",
      "testCases": [
        {
          "stdin": [
            "Алия"
          ],
          "expectedOutput": "Привет, Алия!"
        },
        {
          "stdin": [
            "Ли"
          ],
          "expectedOutput": "Привет, Ли!"
        }
      ]
    },
    {
      "id": "sum",
      "question": "Сумма введённых чисел",
      "description": "Прочитай два целых числа, каждое на отдельной строке. Выведи их сумму.",
      "initialCode": "# Прочитай два числа\n",
      "code": "a = int(input())\nb = int(input())\nprint(a + b)",
      "hint": "Два вызова input() дадут две строки, которые нужно преобразовать в числа.",
      "testCases": [
        {
          "stdin": [
            "2",
            "5"
          ],
          "expectedOutput": "7"
        },
        {
          "stdin": [
            "-3",
            "3"
          ],
          "expectedOutput": "0"
        },
        {
          "stdin": [
            "0",
            "-8"
          ],
          "expectedOutput": "-8"
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/functions.html"
  ]
};

export default lesson;
