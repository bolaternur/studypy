import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "serialization",
  "title": "JSON и сериализация",
  "description": "Преобразуй JSON-текст в данные и обратно.",
  "icon": "BookOpen",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Работа с данными",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Преобразуй JSON-текст в данные и обратно.",
  "sections": [
    {
      "id": "serialization-example",
      "title": "JSON и сериализация",
      "content": [
        "json.dumps() создаёт JSON-строку, json.loads() разбирает её. JSON хранит объекты, массивы, строки, числа, true, false и null; не произвольные Python-объекты. В Python им соответствуют dict, list, str, числа, True, False и None."
      ],
      "code": "import json\ntext = json.dumps({'name': 'Алия'}, ensure_ascii=False)\nprint(text)\nprint(json.loads(text)['name'])",
      "expectedOutput": "{\"name\": \"Алия\"}\nАлия"
    },
    {
      "id": "serialization-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи read_name(text), разбирающую JSON-объект и возвращающую name или None, если ключа нет. Вход — корректная JSON-строка объекта.",
        "Не используй eval() для разбора JSON. pickle может выполнять код при загрузке: не загружай pickle из недоверенного источника. Проверяй структуру данных после json.loads().",
        "Дальше: напиши проверки для функций."
      ]
    }
  ],
  "challenges": [
    {
      "id": "read",
      "question": "Значение из JSON",
      "description": "Определи read_name(text), разбирающую JSON-объект и возвращающую name или None, если ключа нет. Вход — корректная JSON-строка объекта.",
      "initialCode": "def read_name(text):\n    pass\n",
      "code": "import json\n\ndef read_name(text):\n    return json.loads(text).get(\"name\")",
      "hint": "Сначала разбери JSON в словарь, затем обратись к ключу с запасным значением.",
      "testCases": [
        {
          "expression": "read_name('{\"name\": \"Алия\"}')",
          "expectedValue": "Алия",
          "expectedCallOutput": ""
        },
        {
          "expression": "read_name(\"{}\")",
          "expectedValue": null,
          "expectedCallOutput": ""
        },
        {
          "expression": "read_name('{\"name\": \"\"}')",
          "expectedValue": "",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/json.html",
    "https://docs.python.org/3.13/library/pickle.html"
  ]
};

export default lesson;
