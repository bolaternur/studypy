import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "debugger",
  "title": "Поиск ошибок",
  "description": "Прочитай ошибку и исправь логику на границе условия.",
  "icon": "BookOpen",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Инструменты",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Прочитай ошибку и исправь логику на границе условия.",
  "sections": [
    {
      "id": "debugger-example",
      "title": "Поиск ошибок",
      "content": [
        "Сначала прочитай тип исключения и строку в сообщении. SyntaxError сообщает об ошибке разбора кода, NameError — о неизвестном имени, TypeError — о неподходящей операции. Для логической ошибки программа запускается, но результат не совпадает с ожидаемым.",
        "breakpoint() обычно передаёт управление отладчику. В браузерном редакторе StudyPy нет интерактивного pdb: здесь полезнее вывод промежуточных значений и просмотр шагов. Упражнение проверяет исправленное поведение, а не знание слова breakpoint."
      ],
      "code": "score = 100\nprint('score:', score)\nif score >= 100:\n    print('Win')",
      "expectedOutput": "score: 100\nWin"
    },
    {
      "id": "debugger-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Программа должна читать score и выводить Win при score >= 100, иначе Try again. Исправь ошибочную границу и проверь оба исхода.",
        "Не меняй ожидаемый результат под ошибочную программу. Проверь значения до и на границе условия, а затем обе ветки.",
        "Дальше: настрой локальный редактор, когда понадобится работать с файлами проекта."
      ]
    }
  ],
  "challenges": [
    {
      "id": "boundary",
      "question": "Исправь границу",
      "description": "Программа должна читать score и выводить Win при score >= 100, иначе Try again. Исправь ошибочную границу и проверь оба исхода.",
      "initialCode": "score = int(input())\nif score > 100:\n    print(\"Win\")\nelse:\n    print(\"Try again\")\n",
      "code": "score = int(input())\nif score >= 100:\n    print(\"Win\")\nelse:\n    print(\"Try again\")",
      "hint": "Сравни поведение при score = 99, 100 и 101.",
      "testCases": [
        {
          "stdin": [
            "100"
          ],
          "expectedOutput": "Win"
        },
        {
          "stdin": [
            "99"
          ],
          "expectedOutput": "Try again"
        },
        {
          "stdin": [
            "101"
          ],
          "expectedOutput": "Win"
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/errors.html",
    "https://docs.python.org/3.13/library/functions.html"
  ]
};

export default lesson;
