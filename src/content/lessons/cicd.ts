import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "cicd",
  "title": "Автоматические проверки: CI",
  "description": "Составь последовательность проверок и останови её при ошибке.",
  "icon": "BookOpen",
  "level": "Professional",
  "color": "emerald",
  "topic": "Дополнительные темы",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Составь последовательность проверок и останови её при ошибке.",
  "sections": [
    {
      "id": "cicd-example",
      "title": "Автоматические проверки: CI",
      "content": [
        "CI запускает согласованные проверки при изменениях. В GitHub Actions workflow — YAML-файл с событиями on и заданиями jobs; задание содержит steps. Установка зависимостей, тесты и сборка — разные шаги. Автоматическая публикация CD требует отдельного решения и разрешений."
      ],
      "code": "checks = [('типы', True), ('тесты', False), ('сборка', True)]\nfor name, passed in checks:\n    print(name)\n    if not passed:\n        break",
      "expectedOutput": "типы\nтесты"
    },
    {
      "id": "cicd-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи first_failure(checks). checks — список пар (имя, bool). Верни имя первой неуспешной проверки или None, если все успешны, включая пустой список.",
        "Успешная сборка не доказывает правильность тестов или учебного материала. Не выдавай ключи на публикацию любому workflow из недоверенной ветки. Браузерная задача обрабатывает статусы, а не запускает GitHub Actions.",
        "Дальше: вернись к своему проекту и выбери проверку реального риска."
      ]
    }
  ],
  "challenges": [
    {
      "id": "first-failure",
      "question": "Первый сбой",
      "description": "Определи first_failure(checks). checks — список пар (имя, bool). Верни имя первой неуспешной проверки или None, если все успешны, включая пустой список.",
      "initialCode": "def first_failure(checks):\n    pass\n",
      "code": "def first_failure(checks):\n    for name, passed in checks:\n        if not passed:\n            return name\n    return None",
      "hint": "Верни имя при первом False. Если цикл не нашёл сбой, верни None.",
      "testCases": [
        {
          "expression": "first_failure([(\"types\", True), (\"tests\", False), (\"build\", False)])",
          "expectedValue": "tests",
          "expectedCallOutput": ""
        },
        {
          "expression": "first_failure([(\"types\", True)])",
          "expectedValue": null,
          "expectedCallOutput": ""
        },
        {
          "expression": "first_failure([])",
          "expectedValue": null,
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.github.com/en/actions/get-started/quickstart"
  ]
};

export default lesson;
