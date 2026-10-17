import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "git",
  "title": "Git: история изменений",
  "description": "Различи рабочие файлы, подготовленные изменения и коммит.",
  "icon": "BookOpen",
  "level": "Intermediate",
  "color": "emerald",
  "topic": "Инструменты",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Различи рабочие файлы, подготовленные изменения и коммит.",
  "sections": [
    {
      "id": "git-example",
      "title": "Git: история изменений",
      "content": [
        "Git запускается в терминале проекта. git init создаёт репозиторий; git status показывает состояние; git add hello.py подготавливает изменения файла; git commit -m \"Добавлен вывод\" записывает подготовленный снимок. Коммит остаётся локальным до отправки на сервер."
      ],
      "code": "commands = ['git status', 'git add hello.py', 'git commit -m \"Добавлен вывод\"']\nfor command in commands:\n    print(command)",
      "expectedOutput": "git status\ngit add hello.py\ngit commit -m \"Добавлен вывод\""
    },
    {
      "id": "git-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи commit_command(message), возвращающую список [\"git\", \"commit\", \"-m\", message]. Это упражнение на представление аргументов; Git здесь не запускается.",
        "git add нужно повторить после новых изменений, если они тоже должны попасть в коммит. Не добавляй .env, токены и .venv в историю. Браузерный Python не запускает Git: задача ниже формирует список аргументов команды, а не создаёт репозиторий.",
        "Дальше: обработай HTTP-данные и ошибки."
      ]
    }
  ],
  "challenges": [
    {
      "id": "command",
      "question": "Аргументы команды",
      "description": "Определи commit_command(message), возвращающую список [\"git\", \"commit\", \"-m\", message]. Это упражнение на представление аргументов; Git здесь не запускается.",
      "initialCode": "def commit_command(message):\n    pass\n",
      "code": "def commit_command(message):\n    return [\"git\", \"commit\", \"-m\", message]",
      "hint": "Аргумент сообщения должен остаться одним элементом списка даже при наличии пробелов.",
      "testCases": [
        {
          "expression": "commit_command(\"Первый коммит\")",
          "expectedValue": [
            "git",
            "commit",
            "-m",
            "Первый коммит"
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "commit_command(\"Исправление пробела\")",
          "expectedValue": [
            "git",
            "commit",
            "-m",
            "Исправление пробела"
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "commit_command(\"\")",
          "expectedValue": [
            "git",
            "commit",
            "-m",
            ""
          ],
          "description": "Аргументы сохраняются даже для пустого сообщения; Git здесь не выполняется",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://git-scm.com/docs/git-init",
    "https://git-scm.com/docs/git-add",
    "https://git-scm.com/docs/git-commit"
  ]
};

export default lesson;
