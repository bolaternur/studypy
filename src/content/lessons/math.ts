import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "math",
  "title": "Арифметика",
  "description": "Вычисли частное, остаток и степень.",
  "icon": "Code",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Основы",
  "estimatedMinutes": 16,
  "challengeCount": 3,
  "content": "Вычисли частное, остаток и степень.",
  "sections": [
    {
      "id": "math-example",
      "title": "Арифметика",
      "content": [
        "Операторы +, -, * и / выполняют арифметические действия. // округляет частное вниз, % вычисляет остаток, ** возводит в степень. Скобки меняют порядок действий."
      ],
      "code": "print(17 // 3)\nprint(17 % 3)\nprint(2 ** 4)",
      "expectedOutput": "5\n2\n16"
    },
    {
      "id": "math-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "В gold хранится 100 монет. Выведи остаток от деления gold на 3.",
        "^ — побитовое исключающее ИЛИ, а не степень. Остаток от деления 100 на 3 равен 1: исходное число 100 не является ответом. Деление на ноль вызывает ZeroDivisionError.",
        "Дальше: прочитай данные через input()."
      ]
    }
  ],
  "challenges": [
    {
      "id": "remainder",
      "question": "Остаток",
      "description": "В gold хранится 100 монет. Выведи остаток от деления gold на 3.",
      "initialCode": "gold = 100\n# Выведи остаток\n",
      "code": "gold = 100\nprint(gold % 3)",
      "hint": "Для остатка в Python есть оператор %.",
      "testCases": [
        {
          "expectedOutput": "1"
        }
      ]
    },
    {
      "id": "power",
      "question": "Степень",
      "description": "Вычисли и выведи 2 в десятой степени.",
      "initialCode": "# Вычисли степень\n",
      "code": "print(2 ** 10)",
      "hint": "Оператор степени отличается от символа ^.",
      "testCases": [
        {
          "expectedOutput": "1024"
        }
      ]
    },
    {
      "id": "round",
      "question": "Округление",
      "description": "Выведи число 3.14159, округлённое до двух знаков после запятой.",
      "initialCode": "# Используй round()\n",
      "code": "print(round(3.14159, 2))",
      "hint": "Второй аргумент round() задаёт число знаков после запятой.",
      "testCases": [
        {
          "expectedOutput": "3.14"
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/introduction.html"
  ]
};

export default lesson;
