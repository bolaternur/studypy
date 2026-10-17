import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "intro",
  "title": "Первая программа",
  "description": "Выведи текст и прочитай результат запуска.",
  "icon": "Code",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Основы",
  "estimatedMinutes": 12,
  "challengeCount": 2,
  "content": "Выведи текст и прочитай результат запуска.",
  "sections": [
    {
      "id": "intro-example",
      "title": "Первая программа",
      "content": [
        "print() выводит значения. Текст заключают в одинарные или двойные кавычки. Нажми «Запустить», чтобы выполнить код в браузере.",
        "Редактор запускает программу целиком. Выражение без print() само по себе не появляется в выводе. Сначала запусти пример, затем измени текст в кавычках."
      ],
      "code": "print('Привет, Python!')",
      "expectedOutput": "Привет, Python!"
    },
    {
      "id": "intro-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Выведи ровно Hello World, без кавычек в результате. Разрешены любые корректные способы вывода.",
        "Если забыть закрывающую кавычку или скобку, появится SyntaxError. Необработанная ошибка прерывает программу: исправь указанную строку и запусти снова.",
        "Дальше: сохрани значение в переменной."
      ]
    }
  ],
  "challenges": [
    {
      "id": "hello",
      "question": "Первый вывод",
      "description": "Выведи ровно Hello World, без кавычек в результате. Разрешены любые корректные способы вывода.",
      "initialCode": "# Напиши программу ниже\n",
      "code": "print('Hello World')",
      "hint": "Текст нужно передать функции print() в кавычках.",
      "testCases": [
        {
          "expectedOutput": "Hello World"
        }
      ]
    },
    {
      "id": "two-lines",
      "question": "Две строки",
      "description": "Выведи Line 1 и Line 2 на отдельных строках. Можно использовать два print() или символ \\n.",
      "initialCode": "# Выведи две строки\n",
      "code": "print('Line 1')\nprint('Line 2')",
      "hint": "Каждый print() по умолчанию заканчивает строку.",
      "testCases": [
        {
          "expectedOutput": "Line 1\nLine 2"
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/introduction.html",
    "https://docs.python.org/3.13/library/dis.html"
  ],
  "notes": [
    "В StudyPy Python исполняет Pyodide. В CPython исходный код обычно сначала компилируется в байткод; интерпретатор исполняет этот байткод. Это не построчный перевод в машинный код."
  ]
};

export default lesson;
