import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "logging",
  "title": "Диагностические сообщения",
  "description": "Выбери уровень сообщения и настрой отдельный logger.",
  "icon": "BookOpen",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Ошибки и тесты",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Выбери уровень сообщения и настрой отдельный logger.",
  "sections": [
    {
      "id": "logging-example",
      "title": "Диагностические сообщения",
      "content": [
        "logging позволяет отделить диагностику от обычного вывода программы. Уровни включают DEBUG, INFO, WARNING, ERROR и CRITICAL. Настройка обработчика определяет, какие сообщения попадут в файл или поток. По умолчанию основной порог — WARNING."
      ],
      "code": "import logging\nimport sys\nlogger = logging.getLogger('lesson-example')\nlogger.handlers.clear()\nlogger.propagate = False\nlogger.setLevel(logging.INFO)\nhandler = logging.StreamHandler(sys.stdout)\nhandler.setFormatter(logging.Formatter('%(levelname)s: %(message)s'))\nlogger.addHandler(handler)\nlogger.info('Файл прочитан')",
      "expectedOutput": "INFO: Файл прочитан"
    },
    {
      "id": "logging-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Импортируй logging. Создай logger с именем study и установи уровень INFO. Не добавляй обработчики и не печатай сообщения: проверяется уровень.",
        "Не добавляй обработчик повторно при каждом вызове функции: сообщение может дублироваться. Не записывай пароли и токены. Ошибка логирования и сообщение о пользовательской ошибке требуют разного текста.",
        "Дальше: выбери строки данных с помощью SQL."
      ]
    }
  ],
  "challenges": [
    {
      "id": "level",
      "question": "Порог обработчика",
      "description": "Импортируй logging. Создай logger с именем study и установи уровень INFO. Не добавляй обработчики и не печатай сообщения: проверяется уровень.",
      "initialCode": "# Настрой logger\n",
      "code": "import logging\nlogger = logging.getLogger(\"study\")\nlogger.setLevel(logging.INFO)",
      "hint": "getLogger() выбирает logger, setLevel() задаёт порог. Здесь не нужен вывод.",
      "testCases": [
        {
          "expression": "[logger.name, logger.level]",
          "expectedValue": [
            "study",
            20
          ],
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/logging.html"
  ]
};

export default lesson;
