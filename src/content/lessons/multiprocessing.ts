import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "multiprocessing",
  "title": "Отдельные процессы",
  "description": "Подготовь независимую функцию для обработки задач в процессе.",
  "icon": "BookOpen",
  "level": "Professional",
  "color": "emerald",
  "topic": "Дополнительные темы",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Подготовь независимую функцию для обработки задач в процессе.",
  "sections": [
    {
      "id": "multiprocessing-example",
      "title": "Отдельные процессы",
      "content": [
        "Процессы имеют отдельное адресное пространство; данные передают через IPC и сериализацию. ProcessPoolExecutor может распределять независимые вычисления, но запуск и обмен данными стоят времени. Точка входа в переносимом скрипте защищается if __name__ == \"__main__\":."
      ],
      "code": "def square(value):\n    return value * value\n\nprint([square(value) for value in [2, 3]])",
      "expectedOutput": "[4, 9]"
    },
    {
      "id": "multiprocessing-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи square(value), возвращающую квадрат целого числа. В браузере она выполняется последовательно; создание процесса не моделируется.",
        "Изменение обычного списка в дочернем процессе не меняет родительский список. В браузере Pyodide нельзя считать системный ProcessPoolExecutor доступным. Здесь проверяется переносимая чистая функция, локальный пул запускается отдельно.",
        "Дальше: пойми границы сообщений в сетевом потоке."
      ]
    }
  ],
  "challenges": [
    {
      "id": "square",
      "question": "Независимая задача",
      "description": "Определи square(value), возвращающую квадрат целого числа. В браузере она выполняется последовательно; создание процесса не моделируется.",
      "initialCode": "def square(value):\n    pass\n",
      "code": "def square(value):\n    return value * value",
      "hint": "Отрицательное число в квадрате положительно; значение 0 остаётся нулём.",
      "testCases": [
        {
          "expression": "square(4)",
          "expectedValue": 16,
          "expectedCallOutput": ""
        },
        {
          "expression": "square(0)",
          "expectedValue": 0,
          "expectedCallOutput": ""
        },
        {
          "expression": "square(-3)",
          "expectedValue": 9,
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/multiprocessing.html",
    "https://docs.python.org/3.13/library/concurrent.futures.html"
  ]
};

export default lesson;
