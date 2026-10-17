import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "sockets",
  "title": "Сетевые данные и сокеты",
  "description": "Сериализуй текстовое сообщение в байты с явным разделителем.",
  "icon": "BookOpen",
  "level": "Professional",
  "color": "emerald",
  "topic": "Дополнительные темы",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Сериализуй текстовое сообщение в байты с явным разделителем.",
  "sections": [
    {
      "id": "sockets-example",
      "title": "Сетевые данные и сокеты",
      "content": [
        "TCP даёт поток байтов, а не готовые сообщения. recv(n) может вернуть только часть данных; протокол определяет, где сообщение заканчивается. Для простого учебного формата можно кодировать одну строку UTF-8 и добавлять байт перевода строки."
      ],
      "code": "message = 'Привет'\npacket = (message + '\\n').encode('utf-8')\nprint(packet.decode('utf-8').rstrip('\\n'))",
      "expectedOutput": "Привет"
    },
    {
      "id": "sockets-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи encode_message(text), возвращающую bytes: текст в UTF-8 с одним добавленным \\n. Вход не содержит переводов строк.",
        "Один send() и один recv() не гарантируют передачу целого сообщения. В браузере нельзя открыть произвольный обычный TCP-сокет Python. Задача работает только с кодированием сообщения, без сети.",
        "Дальше: сравни Python-объекты и представление C-данных."
      ]
    }
  ],
  "challenges": [
    {
      "id": "encode",
      "question": "Кодирование сообщения",
      "description": "Определи encode_message(text), возвращающую bytes: текст в UTF-8 с одним добавленным \\n. Вход не содержит переводов строк.",
      "initialCode": "def encode_message(text):\n    pass\n",
      "code": "def encode_message(text):\n    return (text + \"\\n\").encode(\"utf-8\")",
      "hint": "Добавь разделитель к строке до кодирования. Результат должен иметь тип bytes.",
      "testCases": [
        {
          "expression": "list(encode_message(\"Hi\"))",
          "expectedValue": [
            72,
            105,
            10
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "list(encode_message(\"\"))",
          "expectedValue": [
            10
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "encode_message(\"Я\").decode(\"utf-8\")",
          "expectedValue": "Я\n",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/socket.html",
    "https://docs.python.org/3.13/howto/sockets.html"
  ]
};

export default lesson;
