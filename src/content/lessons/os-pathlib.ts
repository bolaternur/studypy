import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "os-pathlib",
  "title": "Пути и pathlib",
  "description": "Разбери путь и построй новый без ручного склеивания разделителей.",
  "icon": "BookOpen",
  "level": "Intermediate",
  "color": "emerald",
  "topic": "Файлы и модули",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Разбери путь и построй новый без ручного склеивания разделителей.",
  "sections": [
    {
      "id": "os-pathlib-example",
      "title": "Пути и pathlib",
      "content": [
        "Path работает с путями текущей системы. Оператор / добавляет часть пути; name получает последний компонент, suffix — последнее расширение, stem — имя без последнего расширения. PurePosixPath удобен для разбора POSIX-пути независимо от системы."
      ],
      "code": "from pathlib import PurePosixPath\npath = PurePosixPath('src/main.py')\nprint(path.name)\nprint(path.suffix)",
      "expectedOutput": "main.py\n.py"
    },
    {
      "id": "os-pathlib-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи extension(text), возвращающую последний suffix POSIX-пути. Если расширения нет, верни пустую строку.",
        "Строка пути не доказывает, что файл существует. exists() обращается к файловой системе. Не прибавляй к неизвестному пользовательскому пути разрешения доступа: путь и право читать его — разные вещи.",
        "Дальше: посмотри, как хранить изменения проекта в Git."
      ]
    }
  ],
  "challenges": [
    {
      "id": "extension",
      "question": "Расширение файла",
      "description": "Определи extension(text), возвращающую последний suffix POSIX-пути. Если расширения нет, верни пустую строку.",
      "initialCode": "def extension(text):\n    pass\n",
      "code": "from pathlib import PurePosixPath\n\ndef extension(text):\n    return PurePosixPath(text).suffix",
      "hint": "Нужен последний suffix, а не stem или полное имя файла.",
      "testCases": [
        {
          "expression": "extension(\"a/main.py\")",
          "expectedValue": ".py",
          "expectedCallOutput": ""
        },
        {
          "expression": "extension(\"archive.tar.gz\")",
          "expectedValue": ".gz",
          "expectedCallOutput": ""
        },
        {
          "expression": "extension(\"README\")",
          "expectedValue": "",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/pathlib.html"
  ]
};

export default lesson;
