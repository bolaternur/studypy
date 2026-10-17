import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "pytest",
  "title": "Проверки функций и pytest",
  "description": "Напиши проверку результата и запусти набор тестов локально.",
  "icon": "BookOpen",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Ошибки и тесты",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Напиши проверку результата и запусти набор тестов локально.",
  "sections": [
    {
      "id": "pytest-example",
      "title": "Проверки функций и pytest",
      "content": [
        "assert expression вызывает AssertionError, если expression ложно. pytest находит функции test_... в тестовых файлах и показывает ошибку с контекстом. Устанавливай pytest в окружение проекта; запускай python -m pytest. В браузере ниже выполняются обычные assert без pytest."
      ],
      "code": "def add(a, b):\n    return a + b\n\nassert add(2, 3) == 5\nassert add(-1, 1) == 0\nprint('Проверки пройдены')",
      "expectedOutput": "Проверки пройдены"
    },
    {
      "id": "pytest-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи test_add(implementation). Она вызывает функцию и через assert обнаруживает неверное сложение. Проверь обычную сумму, сумму с отрицательным числом и нулевую сумму. При успехе не возвращай значение.",
        "Один пример не проверяет все случаи. Возьми обычное значение, границу и пустой ввод, когда он допустим. assert не предназначен для обязательной проверки пользовательских данных: при запуске Python с -O он может быть отключён.",
        "Дальше: настрой диагностические сообщения."
      ]
    }
  ],
  "challenges": [
    {
      "id": "test-function",
      "question": "Проверка реализации",
      "description": "Определи test_add(implementation). Она вызывает функцию и через assert обнаруживает неверное сложение. Проверь обычную сумму, сумму с отрицательным числом и нулевую сумму. При успехе не возвращай значение.",
      "initialCode": "def test_add(implementation):\n    pass\n",
      "code": "def test_add(implementation):\n    assert implementation(2, 3) == 5\n    assert implementation(-1, 1) == 0\n    assert implementation(0, 0) == 0",
      "hint": "Константа 5 случайно проходит add(2, 3); возьми ещё нулевую и отрицательную сумму.",
      "testCases": [
        {
          "expression": "test_add(lambda a, b: a + b)",
          "expectedValue": null,
          "setup": "def catches(test, implementation):\n    try:\n        test(implementation)\n    except AssertionError:\n        return True\n    return False",
          "expectedCallOutput": ""
        },
        {
          "expression": "catches(test_add, lambda a, b: 5)",
          "expectedValue": true,
          "setup": "def catches(test, implementation):\n    try:\n        test(implementation)\n    except AssertionError:\n        return True\n    return False",
          "expectedCallOutput": ""
        },
        {
          "expression": "catches(test_add, lambda a, b: a - b)",
          "expectedValue": true,
          "setup": "def catches(test, implementation):\n    try:\n        test(implementation)\n    except AssertionError:\n        return True\n    return False",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.pytest.org/en/stable/getting-started.html",
    "https://docs.python.org/3.13/reference/simple_stmts.html"
  ]
};

export default lesson;
