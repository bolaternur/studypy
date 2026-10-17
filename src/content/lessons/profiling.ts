import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "profiling",
  "title": "Измерение и профилирование",
  "description": "Различи измерение времени и поиск дорогих вызовов.",
  "icon": "BookOpen",
  "level": "Professional",
  "color": "emerald",
  "topic": "Дополнительные темы",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Различи измерение времени и поиск дорогих вызовов.",
  "sections": [
    {
      "id": "profiling-example",
      "title": "Измерение и профилирование",
      "content": [
        "time.perf_counter() измеряет длительность по монотонному высокоточному счётчику. timeit помогает повторять небольшие измерения; cProfile показывает статистику вызовов. Измеряй представительный сценарий и проверяй правильность результата после изменения."
      ],
      "code": "from time import perf_counter\nstart = perf_counter()\nresult = sum(range(100))\nelapsed = perf_counter() - start\nprint(result)\nprint(elapsed >= 0)",
      "expectedOutput": "4950\nTrue"
    },
    {
      "id": "profiling-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи linear_checks(values, target), возвращающую число проверенных элементов при поиске первого target. Если элемента нет, это длина списка. Для пустого списка верни 0.",
        "Один быстрый запуск не даёт надёжного сравнения. Не делай тест, требующий одинакового времени на разных компьютерах. В задаче проверяется подсчёт работы, а не заявляется ускорение.",
        "Дальше: выдели меняемое правило отдельной функцией."
      ]
    }
  ],
  "challenges": [
    {
      "id": "work",
      "question": "Число сравнений",
      "description": "Определи linear_checks(values, target), возвращающую число проверенных элементов при поиске первого target. Если элемента нет, это длина списка. Для пустого списка верни 0.",
      "initialCode": "def linear_checks(values, target):\n    pass\n",
      "code": "def linear_checks(values, target):\n    checks = 0\n    for value in values:\n        checks += 1\n        if value == target:\n            break\n    return checks",
      "hint": "Увеличивай счётчик до проверки совпадения; остановись на первом совпадении.",
      "testCases": [
        {
          "expression": "linear_checks([1, 2, 3], 1)",
          "expectedValue": 1,
          "expectedCallOutput": ""
        },
        {
          "expression": "linear_checks([1, 2, 3], 9)",
          "expectedValue": 3,
          "expectedCallOutput": ""
        },
        {
          "expression": "linear_checks([], 1)",
          "expectedValue": 0,
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/time.html",
    "https://docs.python.org/3.13/library/timeit.html",
    "https://docs.python.org/3.13/library/profile.html"
  ]
};

export default lesson;
