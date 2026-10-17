import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "modules",
  "title": "Модули",
  "description": "Импортируй модуль и используй его функцию.",
  "icon": "BookOpen",
  "level": "Intermediate",
  "color": "emerald",
  "topic": "Файлы и модули",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Импортируй модуль и используй его функцию.",
  "sections": [
    {
      "id": "modules-example",
      "title": "Модули",
      "content": [
        "Модуль — файл или другой объект с определениями Python. import math связывает имя math с модулем, а math.sqrt() обращается к его функции. Стандартные модули не нужно устанавливать через pip."
      ],
      "code": "import math\nprint(math.isqrt(20))",
      "expectedOutput": "4"
    },
    {
      "id": "modules-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи root(n), возвращающую целую часть квадратного корня неотрицательного целого n. Используй math.isqrt().",
        "После import math имя sqrt само по себе не появится: используй math.sqrt или from math import sqrt. Не называй собственный файл math.py, если хочешь импортировать стандартный math.",
        "Дальше: пойми устройство пакета."
      ]
    }
  ],
  "challenges": [
    {
      "id": "sqrt",
      "question": "Целый квадратный корень",
      "description": "Определи root(n), возвращающую целую часть квадратного корня неотрицательного целого n. Используй math.isqrt().",
      "initialCode": "def root(n):\n    pass\n",
      "code": "import math\n\ndef root(n):\n    return math.isqrt(n)",
      "hint": "В модуле math есть функция целого квадратного корня без промежуточного float.",
      "testCases": [
        {
          "expression": "root(20)",
          "expectedValue": 4,
          "expectedCallOutput": ""
        },
        {
          "expression": "root(0)",
          "expectedValue": 0,
          "expectedCallOutput": ""
        },
        {
          "expression": "root(25)",
          "expectedValue": 5,
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/modules.html",
    "https://docs.python.org/3.13/library/math.html"
  ]
};

export default lesson;
