import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "pep8",
  "title": "Читаемый код: PEP 8",
  "description": "Выбери понятные имена и оформи короткий фрагмент кода.",
  "icon": "BookOpen",
  "level": "Beginner",
  "color": "emerald",
  "topic": "Инструменты",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Выбери понятные имена и оформи короткий фрагмент кода.",
  "sections": [
    {
      "id": "pep8-example",
      "title": "Читаемый код: PEP 8",
      "content": [
        "PEP 8 — руководство по стилю, а не синтаксис языка. Для переменных и функций обычно используют snake_case, для констант — UPPER_CASE. Вложенный блок отступает на 4 пробела. В проекте могут действовать собственные соглашения."
      ],
      "code": "player_name = 'Алия'\nMAX_ATTEMPTS = 3\nprint(player_name, MAX_ATTEMPTS)",
      "expectedOutput": "Алия 3"
    },
    {
      "id": "pep8-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Создай player_name = \"Alex\" и MAX_ATTEMPTS = 3. Используй именно эти имена. Форматирование сравни с примером: автопроверка подтверждает значения, а не полное соответствие PEP 8.",
        "Работающий код ещё не обязательно читаемый. Автопроверка ниже проверяет имена и значения, но не оценивает весь стиль. Проверь пробелы вокруг = самостоятельно. PEP 8 рекомендует предел 79 символов для кода, допускающий согласованные исключения.",
        "Дальше: научись находить причину ошибки."
      ]
    }
  ],
  "challenges": [
    {
      "id": "names",
      "question": "Понятные имена",
      "description": "Создай player_name = \"Alex\" и MAX_ATTEMPTS = 3. Используй именно эти имена. Форматирование сравни с примером: автопроверка подтверждает значения, а не полное соответствие PEP 8.",
      "initialCode": "# Назови две переменные\n",
      "code": "player_name = \"Alex\"\nMAX_ATTEMPTS = 3",
      "hint": "Переменная имени использует snake_case, а имя константы — заглавные буквы.",
      "testCases": [
        {
          "expression": "[player_name, MAX_ATTEMPTS]",
          "expectedValue": [
            "Alex",
            3
          ],
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://peps.python.org/pep-0008/"
  ]
};

export default lesson;
