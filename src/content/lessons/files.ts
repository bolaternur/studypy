import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "files",
  "title": "Текстовые файлы",
  "description": "Запиши и прочитай UTF-8 файл с гарантированным закрытием.",
  "icon": "BookOpen",
  "level": "Intermediate",
  "color": "emerald",
  "topic": "Файлы и модули",
  "estimatedMinutes": 12,
  "challengeCount": 2,
  "content": "Запиши и прочитай UTF-8 файл с гарантированным закрытием.",
  "sections": [
    {
      "id": "files-example",
      "title": "Текстовые файлы",
      "content": [
        "with open(...) закрывает файл при выходе из блока. Режим w перезаписывает файл, a дописывает, r читает. Укажи encoding=\"utf-8\", чтобы кодировка текста не зависела от локальных настроек. В браузере файлы живут в виртуальной файловой системе текущего запуска."
      ],
      "code": "with open('note.txt', 'w', encoding='utf-8') as file:\n    file.write('Привет')\nwith open('note.txt', encoding='utf-8') as file:\n    print(file.read())",
      "expectedOutput": "Привет"
    },
    {
      "id": "files-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Запиши строку Привет в note.txt в UTF-8. Проверка прочитает файл после твоей программы.",
        "w удаляет прежнее содержимое существующего файла. write() не добавляет перевод строки автоматически. Не рассчитывай, что браузерный виртуальный файл сохранится как файл на компьютере.",
        "Дальше: обработай ожидаемую ошибку чтения."
      ]
    }
  ],
  "challenges": [
    {
      "id": "utf8",
      "question": "Запись текста",
      "description": "Запиши строку Привет в note.txt в UTF-8. Проверка прочитает файл после твоей программы.",
      "initialCode": "# Запиши note.txt\n",
      "code": "with open('note.txt', 'w', encoding='utf-8') as file:\n    file.write('Привет')",
      "hint": "Открой файл на запись в with и передай encoding. Запиши текст, а не его имя.",
      "testCases": [
        {
          "expression": "__import__('pathlib').Path('note.txt').read_text(encoding='utf-8')",
          "expectedValue": "Привет",
          "expectedCallOutput": ""
        }
      ]
    },
    {
      "id": "read",
      "question": "Чтение файла",
      "description": "Прочитай весь текст из data.txt с кодировкой UTF-8 и выведи его. Файл готовит тест, а вывод должна сделать твоя программа.",
      "initialCode": "# Прочитай data.txt\n",
      "code": "with open('data.txt', encoding='utf-8') as file:\n    print(file.read())",
      "hint": "Файл уже существует. Режим w сотрёт его: тебе нужен режим чтения.",
      "testCases": [
        {
          "expectedOutput": "строка",
          "setup": "from pathlib import Path\nPath('data.txt').write_text('строка', encoding='utf-8')"
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/inputoutput.html"
  ]
};

export default lesson;
