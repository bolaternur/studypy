import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "context",
  "title": "Контекстные менеджеры",
  "description": "Оформи получение и освобождение ресурса через with.",
  "icon": "BookOpen",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Файлы и модули",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Оформи получение и освобождение ресурса через with.",
  "sections": [
    {
      "id": "context-example",
      "title": "Контекстные менеджеры",
      "content": [
        "Контекстный менеджер выполняет вход и выход из блока with. contextlib.contextmanager позволяет описать это генератором с одним yield. Освобождение ресурса помещают в finally, чтобы оно выполнилось и при исключении."
      ],
      "code": "from contextlib import contextmanager\n\n@contextmanager\ndef section():\n    print('Начало')\n    try:\n        yield\n    finally:\n        print('Конец')\n\nwith section():\n    print('Работа')",
      "expectedOutput": "Начало\nРабота\nКонец"
    },
    {
      "id": "context-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи контекстный менеджер track(events): при входе добавляй \"start\" в список, при любом выходе — \"end\". Используй contextlib.contextmanager или класс.",
        "Код после yield без finally может не выполнить очистку при исключении внутри with. Не подавляй исключение случайно: обработчик должен явно решать, какие ошибки допустимы.",
        "Дальше: переведи структуру данных в JSON."
      ]
    }
  ],
  "challenges": [
    {
      "id": "events",
      "question": "Начало и конец блока",
      "description": "Определи контекстный менеджер track(events): при входе добавляй \"start\" в список, при любом выходе — \"end\". Используй contextlib.contextmanager или класс.",
      "initialCode": "def track(events):\n    pass\n",
      "code": "from contextlib import contextmanager\n\n@contextmanager\ndef track(events):\n    events.append(\"start\")\n    try:\n        yield\n    finally:\n        events.append(\"end\")",
      "hint": "Добавление end должно находиться в finally или в __exit__.",
      "testCases": [
        {
          "setup": "def check_track(manager, fail):\n    events = []\n    try:\n        with manager(events):\n            events.append(\"body\")\n            if fail:\n                raise ValueError(\"test\")\n    except ValueError:\n        events.append(\"caught\")\n    return events",
          "expression": "check_track(track, False)",
          "expectedValue": [
            "start",
            "body",
            "end"
          ],
          "expectedCallOutput": ""
        },
        {
          "setup": "def check_track(manager, fail):\n    events = []\n    try:\n        with manager(events):\n            events.append(\"body\")\n            if fail:\n                raise ValueError(\"test\")\n    except ValueError:\n        events.append(\"caught\")\n    return events",
          "expression": "check_track(track, True)",
          "expectedValue": [
            "start",
            "body",
            "end",
            "caught"
          ],
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/contextlib.html"
  ]
};

export default lesson;
