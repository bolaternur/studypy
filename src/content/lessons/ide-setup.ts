import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "ide-setup",
  "title": "Локальный редактор",
  "description": "Сохрани файл .py и запусти его тем же интерпретатором.",
  "icon": "BookOpen",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Инструменты",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Сохрани файл .py и запусти его тем же интерпретатором.",
  "sections": [
    {
      "id": "ide-setup-example",
      "title": "Локальный редактор",
      "content": [
        "Установи Python с python.org. Создай hello.py в VS Code, PyCharm или другом редакторе. В VS Code расширение Python помогает выбрать интерпретатор. В терминале перейди в папку файла и выполни python hello.py; на Windows также часто доступна команда py hello.py. Название команды зависит от установки."
      ],
      "code": "print('Файл запущен')",
      "expectedOutput": "Файл запущен"
    },
    {
      "id": "ide-setup-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Напиши содержимое hello.py, которое выводит Файл запущен. После проверки можешь сохранить и запустить его локально. StudyPy не проверяет установку редактора.",
        "Файл hello.py.txt не является файлом с расширением .py. Не называй файл именем стандартного модуля, например random.py. Редактор и интерпретатор — разные программы. Встроенная задача ниже проверяет Python-код, а не факт установки IDE.",
        "Дальше: подключи стандартный модуль."
      ]
    }
  ],
  "challenges": [
    {
      "id": "launch",
      "question": "Содержимое первого файла",
      "description": "Напиши содержимое hello.py, которое выводит Файл запущен. После проверки можешь сохранить и запустить его локально. StudyPy не проверяет установку редактора.",
      "initialCode": "# Содержимое hello.py\n",
      "code": "print('Файл запущен')",
      "hint": "В .py файле выражение само не отображается: нужен явный вывод.",
      "testCases": [
        {
          "expectedOutput": "Файл запущен"
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/interpreter.html",
    "https://code.visualstudio.com/docs/python/python-tutorial"
  ]
};

export default lesson;
