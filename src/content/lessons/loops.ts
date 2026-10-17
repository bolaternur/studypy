import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "loops",
  "title": "Циклы for и while",
  "description": "Повтори команды и накопи результат цикла.",
  "icon": "Code",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Основы",
  "estimatedMinutes": 12,
  "challengeCount": 2,
  "content": "Повтори команды и накопи результат цикла.",
  "sections": [
    {
      "id": "loops-example",
      "title": "Циклы for и while",
      "content": [
        "for перебирает элементы. range(3) даёт 0, 1, 2: правая граница не включена. while повторяет блок, пока условие истинно. В цикле while нужно менять значение, от которого зависит остановка."
      ],
      "code": "total = 0\nfor number in range(1, 4):\n    total += number\nprint(total)",
      "expectedOutput": "6"
    },
    {
      "id": "loops-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Выведи числа от 0 до 4, каждое на отдельной строке.",
        "В for нужны имя переменной, in и двоеточие: for i in range(5):. Запись for range(5) синтаксически неверна. Если while не меняет условие, вычисление придётся остановить.",
        "Дальше: собери несколько значений в список."
      ]
    }
  ],
  "challenges": [
    {
      "id": "range",
      "question": "Пять чисел",
      "description": "Выведи числа от 0 до 4, каждое на отдельной строке.",
      "initialCode": "# Используй цикл\n",
      "code": "for i in range(5):\n    print(i)",
      "hint": "Правая граница range() не входит в последовательность.",
      "testCases": [
        {
          "expectedOutput": "0\n1\n2\n3\n4"
        }
      ]
    },
    {
      "id": "sum-range",
      "question": "Сумма от 1 до n",
      "description": "Прочитай целое n >= 0. Выведи сумму чисел от 1 до n включительно. Для n = 0 результат 0.",
      "initialCode": "# Прочитай n и накопи сумму\n",
      "code": "n = int(input())\ntotal = 0\nfor number in range(1, n + 1):\n    total += number\nprint(total)",
      "hint": "Перед циклом нужен накопитель. Для пустого диапазона он не изменится.",
      "testCases": [
        {
          "stdin": [
            "5"
          ],
          "expectedOutput": "15"
        },
        {
          "stdin": [
            "0"
          ],
          "expectedOutput": "0"
        },
        {
          "stdin": [
            "1"
          ],
          "expectedOutput": "1"
        },
        {
          "stdin": [
            "10"
          ],
          "expectedOutput": "55"
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/controlflow.html"
  ]
};

export default lesson;
