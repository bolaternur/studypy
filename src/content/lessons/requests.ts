import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "requests",
  "title": "HTTP и Requests",
  "description": "Отдели сетевой запрос от обработки ответа.",
  "icon": "BookOpen",
  "level": "Intermediate",
  "color": "emerald",
  "topic": "Работа с данными",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Отдели сетевой запрос от обработки ответа.",
  "sections": [
    {
      "id": "requests-example",
      "title": "HTTP и Requests",
      "content": [
        "Локально Requests устанавливают в окружение проекта. requests.get(url, timeout=5) получает ответ; raise_for_status() проверяет HTTP-ошибки, json() разбирает JSON и тоже может завершиться ошибкой. Успешный статус не гарантирует нужную структуру данных."
      ],
      "code": "payload = {'name': 'StudyPy'}\nprint(payload.get('name', 'Без имени'))",
      "expectedOutput": "StudyPy"
    },
    {
      "id": "requests-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи response_name(payload). Возвращай значение ключа name или строку \"Без имени\", если ключ отсутствует. payload — готовый словарь JSON-данных. Сетевой запрос не нужен.",
        "Не запрашивай сеть в каждом тесте: доступность внешнего сервиса и правильность обработки данных — разные проверки. В браузерном уроке используются готовые словари ответа; выполнение Requests и реальной сети не проверяется. Локальный следующий шаг: запрос с timeout и обработкой RequestException.",
        "Дальше: создай собственный класс данных."
      ]
    }
  ],
  "challenges": [
    {
      "id": "payload",
      "question": "Имя из данных ответа",
      "description": "Определи response_name(payload). Возвращай значение ключа name или строку \"Без имени\", если ключ отсутствует. payload — готовый словарь JSON-данных. Сетевой запрос не нужен.",
      "initialCode": "def response_name(payload):\n    pass\n",
      "code": "def response_name(payload):\n    return payload.get(\"name\", \"Без имени\")",
      "hint": "Отсутствующий ключ отличается от существующего ключа с пустой строкой.",
      "testCases": [
        {
          "expression": "response_name({\"name\": \"Bot\"})",
          "expectedValue": "Bot",
          "expectedCallOutput": ""
        },
        {
          "expression": "response_name({})",
          "expectedValue": "Без имени",
          "expectedCallOutput": ""
        },
        {
          "expression": "response_name({\"name\": \"\"})",
          "expectedValue": "",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://requests.readthedocs.io/en/latest/user/quickstart/"
  ]
};

export default lesson;
