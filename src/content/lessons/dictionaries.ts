import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "dictionaries",
  "title": "Словари",
  "description": "Получи значение по ключу и обработай отсутствующий ключ.",
  "icon": "Database",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Коллекции",
  "estimatedMinutes": 16,
  "challengeCount": 3,
  "content": "Получи значение по ключу и обработай отсутствующий ключ.",
  "sections": [
    {
      "id": "dictionaries-example",
      "title": "Словари",
      "content": [
        "Словарь связывает уникальные хешируемые ключи со значениями. d[key] читает значение и вызывает KeyError, если ключа нет. d.get(key, default) возвращает запасное значение без добавления ключа."
      ],
      "code": "user = {'name': 'Алия'}\nprint(user['name'])\nprint(user.get('city', 'Не указан'))",
      "expectedOutput": "Алия\nНе указан"
    },
    {
      "id": "dictionaries-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Создай user с ключами name = \"Alice\" и age = 25.",
        "Операция key in user проверяет ключи, а не значения. При обходе items() получаются пары ключ–значение. Не меняй размер словаря во время такого обхода.",
        "Дальше: убери повторения с помощью множества."
      ]
    }
  ],
  "challenges": [
    {
      "id": "create",
      "question": "Создание словаря",
      "description": "Создай user с ключами name = \"Alice\" и age = 25.",
      "initialCode": "# Создай user\n",
      "code": "user = {\"name\": \"Alice\", \"age\": 25}",
      "hint": "Строковые ключи записывают в кавычках; между ключом и значением ставят двоеточие.",
      "testCases": [
        {
          "expression": "user",
          "expectedValue": {
            "name": "Alice",
            "age": 25
          },
          "expectedCallOutput": ""
        }
      ]
    },
    {
      "id": "get",
      "question": "Отсутствующий ключ",
      "description": "Получив user, сохрани email в переменную email. Если ключа нет, используй \"Not found\".",
      "initialCode": "user = {\"name\": \"Alex\"}\n# Получи email\n",
      "code": "user = {\"name\": \"Alex\"}\nemail = user.get(\"email\", \"Not found\")",
      "hint": "Метод get принимает значение по умолчанию вторым аргументом.",
      "testCases": [
        {
          "expression": "email",
          "expectedValue": "Not found",
          "expectedCallOutput": ""
        }
      ]
    },
    {
      "id": "filter",
      "question": "Отбор по значению",
      "description": "Создай список top_students из имён со значением строго больше 80. Сохрани порядок словаря.",
      "initialCode": "scores = {\"Alice\": 90, \"Bob\": 80, \"Charlie\": 95}\n# Создай top_students\n",
      "code": "scores = {\"Alice\": 90, \"Bob\": 80, \"Charlie\": 95}\ntop_students = []\nfor name, score in scores.items():\n    if score > 80:\n        top_students.append(name)",
      "hint": "Обход items() даёт и имя, и балл. Значение 80 не проходит строгое сравнение.",
      "testCases": [
        {
          "expression": "top_students",
          "expectedValue": [
            "Alice",
            "Charlie"
          ],
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/datastructures.html"
  ]
};

export default lesson;
