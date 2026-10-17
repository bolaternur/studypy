import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "ctypes",
  "title": "C-данные и ctypes",
  "description": "Различи ограниченный машинный формат и целое число Python.",
  "icon": "BookOpen",
  "level": "Professional",
  "color": "emerald",
  "topic": "Дополнительные темы",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Различи ограниченный машинный формат и целое число Python.",
  "sections": [
    {
      "id": "ctypes-example",
      "title": "C-данные и ctypes",
      "content": [
        "ctypes в локальном CPython помогает описывать C-типы и вызывать совместимые библиотеки. Нужно точно знать ABI, размер типов и владение памятью. Python int не ограничен фиксированными 32 битами, а машинное беззнаковое 8-битное значение имеет диапазон 0…255."
      ],
      "code": "value = 300\nprint(value % 256)",
      "expectedOutput": "44"
    },
    {
      "id": "ctypes-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи uint8(value), возвращающую value по модулю 256 — число от 0 до 255. ctypes и вызовы C здесь не используются.",
        "Переполнение, неверный указатель и ошибочная сигнатура C-функции могут повредить процесс. Динамические C-библиотеки не считаются доступными в браузерном уроке. Задача моделирует только математическое приведение к 8-битному беззнаковому диапазону.",
        "Дальше: изучи ссылки на изменяемые объекты."
      ]
    }
  ],
  "challenges": [
    {
      "id": "uint8",
      "question": "Беззнаковый байт",
      "description": "Определи uint8(value), возвращающую value по модулю 256 — число от 0 до 255. ctypes и вызовы C здесь не используются.",
      "initialCode": "def uint8(value):\n    pass\n",
      "code": "def uint8(value):\n    return value % 256",
      "hint": "Остаток по положительному модулю приводит и отрицательное число к нужному диапазону.",
      "testCases": [
        {
          "expression": "uint8(300)",
          "expectedValue": 44,
          "expectedCallOutput": ""
        },
        {
          "expression": "uint8(255)",
          "expectedValue": 255,
          "expectedCallOutput": ""
        },
        {
          "expression": "uint8(-1)",
          "expectedValue": 255,
          "expectedCallOutput": ""
        },
        {
          "expression": "uint8(0)",
          "expectedValue": 0,
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/ctypes.html",
    "https://docs.python.org/3.13/library/stdtypes.html"
  ]
};

export default lesson;
