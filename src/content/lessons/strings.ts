import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "strings",
  "title": "Строки",
  "description": "Выдели часть строки и получи преобразованный текст.",
  "icon": "Database",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Коллекции",
  "estimatedMinutes": 16,
  "challengeCount": 3,
  "content": "Выдели часть строки и получи преобразованный текст.",
  "sections": [
    {
      "id": "strings-example",
      "title": "Строки",
      "content": [
        "Строка — неизменяемая последовательность символов Unicode. Срез text[start:stop] не включает stop. Методы upper(), lower() и strip() возвращают новую строку; исходная строка не меняется."
      ],
      "code": "text = '  Python  '\nclean = text.strip()\nprint(clean[:2])\nprint(clean.upper())",
      "expectedOutput": "Py\nPYTHON"
    },
    {
      "id": "strings-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Выведи длину строки s, используя len().",
        "Метод нужно вызвать: text.upper() со скобками. Присваивание text[0] = \"p\" не допускается; создай новую строку. len() считает кодовые точки, что не всегда равно числу видимых символов.",
        "Дальше: объедини повторяющиеся действия в функцию."
      ]
    }
  ],
  "challenges": [
    {
      "id": "length",
      "question": "Длина строки",
      "description": "Выведи длину строки s, используя len().",
      "initialCode": "s = \"pneumonoultramicroscopicsilicovolcanoconiosis\"\n# Выведи длину\n",
      "code": "s = \"pneumonoultramicroscopicsilicovolcanoconiosis\"\nprint(len(s))",
      "hint": "Переменная s уже содержит текст. Нужна функция длины, а не само значение s.",
      "testCases": [
        {
          "expectedOutput": "45"
        }
      ]
    },
    {
      "id": "upper",
      "question": "Верхний регистр",
      "description": "Выведи s в верхнем регистре.",
      "initialCode": "s = \"python rocks\"\n# Преобразуй и выведи\n",
      "code": "s = \"python rocks\"\nprint(s.upper())",
      "hint": "Метод возвращает новую строку. Не забудь скобки вызова и вывод результата.",
      "testCases": [
        {
          "expectedOutput": "PYTHON ROCKS"
        }
      ]
    },
    {
      "id": "prefix",
      "question": "Срез",
      "description": "Выведи первые 6 символов s, включая пробел.",
      "initialCode": "s = \"Hello World\"\n# Выведи срез\n",
      "code": "s = \"Hello World\"\nprint(s[:6])",
      "hint": "Срез от начала не включает правую границу. Шестой символ здесь — пробел.",
      "testCases": [
        {
          "expectedOutput": "Hello "
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/introduction.html",
    "https://docs.python.org/3.13/library/stdtypes.html"
  ]
};

export default lesson;
