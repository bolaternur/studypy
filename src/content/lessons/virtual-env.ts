import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "virtual-env",
  "title": "Виртуальное окружение",
  "description": "Создай отдельное окружение и устанавливай зависимости в него.",
  "icon": "BookOpen",
  "level": "Intermediate",
  "color": "emerald",
  "topic": "Инструменты",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Создай отдельное окружение и устанавливай зависимости в него.",
  "sections": [
    {
      "id": "virtual-env-example",
      "title": "Виртуальное окружение",
      "content": [
        "Локально выполни python -m venv .venv. Затем выбирай интерпретатор из .venv в редакторе или используй его полный путь. python -m pip запускает pip именно выбранного Python. Активация только меняет поиск команд в оболочке; это не контейнер и не защита от вредоносного кода."
      ],
      "code": "import sys\nprint(sys.version_info.major)",
      "expectedOutput": "3"
    },
    {
      "id": "virtual-env-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Импортируй sys и сохрани номер основной версии Python в major. Это проверка доступа к интерпретатору, а не создания venv.",
        "Команда pip из другой установки может поставить пакет не туда. В браузере своё окружение Pyodide: venv и системная установка пакетов здесь не моделируются. После локальной активации сравни sys.prefix и sys.base_prefix.",
        "Дальше: прочитай и запиши текстовый файл."
      ]
    }
  ],
  "challenges": [
    {
      "id": "interpreter",
      "question": "Сведения об интерпретаторе",
      "description": "Импортируй sys и сохрани номер основной версии Python в major. Это проверка доступа к интерпретатору, а не создания venv.",
      "initialCode": "# Импортируй sys и создай major\n",
      "code": "import sys\nmajor = sys.version_info.major",
      "hint": "Версию можно получить из sys.version_info; нужен только major.",
      "testCases": [
        {
          "expression": "major",
          "expectedValue": 3,
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/venv.html",
    "https://docs.python.org/3.13/library/venv.html"
  ]
};

export default lesson;
