import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "dis",
  "title": "Байткод CPython",
  "description": "Отличи константы функции от её выполнения и от машинного кода.",
  "icon": "BookOpen",
  "level": "Professional",
  "color": "emerald",
  "topic": "Дополнительные темы",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Отличи константы функции от её выполнения и от машинного кода.",
  "sections": [
    {
      "id": "dis-example",
      "title": "Байткод CPython",
      "content": [
        "Модуль dis показывает инструкции байткода CPython. Набор и формат инструкций могут меняться между версиями. Это не машинные инструкции процессора. Объект function.__code__ содержит метаданные скомпилированной функции, в том числе константы."
      ],
      "code": "def answer():\n    return 42\n\nprint(42 in answer.__code__.co_consts)",
      "expectedOutput": "True"
    },
    {
      "id": "dis-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи has_constant(function, value), возвращающую True, если value присутствует непосредственно в function.__code__.co_consts. Не вызывай function.",
        "Не сохраняй точный текст dis как переносимый формат данных. Упражнение ниже исследует co_consts без вызова переданной функции; оно не требует совпадения версии байткода.",
        "Дальше: измерь время работы прежде, чем оптимизировать."
      ]
    }
  ],
  "challenges": [
    {
      "id": "constant",
      "question": "Константа в коде функции",
      "description": "Определи has_constant(function, value), возвращающую True, если value присутствует непосредственно в function.__code__.co_consts. Не вызывай function.",
      "initialCode": "def has_constant(function, value):\n    pass\n",
      "code": "def has_constant(function, value):\n    return value in function.__code__.co_consts",
      "hint": "Проверь co_consts у __code__, не запуская переданную функцию.",
      "testCases": [
        {
          "expression": "has_constant(lambda: 42, 42)",
          "expectedValue": true,
          "expectedCallOutput": ""
        },
        {
          "expression": "has_constant(lambda: 42, 99)",
          "expectedValue": false,
          "expectedCallOutput": ""
        },
        {
          "expression": "has_constant(lambda: \"hi\", \"hi\")",
          "expectedValue": true,
          "expectedCallOutput": ""
        },
        {
          "expression": "has_constant(lambda: None, None)",
          "expectedValue": true,
          "description": "None — допустимая константа",
          "expectedCallOutput": ""
        },
        {
          "setup": "def dangerous():\n    raise RuntimeError(\"no run\")",
          "expression": "has_constant(dangerous, \"no run\")",
          "expectedValue": true,
          "description": "Изучение констант не вызывает функцию",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/dis.html",
    "https://docs.python.org/3.13/reference/datamodel.html"
  ]
};

export default lesson;
