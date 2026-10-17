import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "docker",
  "title": "Docker: образ и контейнер",
  "description": "Различи сборку образа и запуск контейнера.",
  "icon": "BookOpen",
  "level": "Professional",
  "color": "emerald",
  "topic": "Дополнительные темы",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Различи сборку образа и запуск контейнера.",
  "sections": [
    {
      "id": "docker-example",
      "title": "Docker: образ и контейнер",
      "content": [
        "Dockerfile описывает сборку образа: FROM выбирает базу, WORKDIR — каталог, COPY — файлы, RUN — команду сборки, CMD — команду запуска по умолчанию. EXPOSE документирует порт, но не публикует его на компьютере. Реальный Docker запускают локально отдельно от StudyPy."
      ],
      "code": "command = ['python', 'app.py']\nprint(command)",
      "expectedOutput": "['python', 'app.py']"
    },
    {
      "id": "docker-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи python_command(filename), возвращающую список [\"python\", filename]. Это представление команды для exec-формы CMD; Docker здесь не запускается.",
        "RUN выполняется при сборке, CMD — при запуске контейнера. Не добавляй секреты в образ. Упражнение ниже составляет аргументы запуска Python и не подтверждает, что образ собран или контейнер безопасен.",
        "Дальше: автоматизируй проверки проекта в CI."
      ]
    }
  ],
  "challenges": [
    {
      "id": "command",
      "question": "Команда запуска",
      "description": "Определи python_command(filename), возвращающую список [\"python\", filename]. Это представление команды для exec-формы CMD; Docker здесь не запускается.",
      "initialCode": "def python_command(filename):\n    pass\n",
      "code": "def python_command(filename):\n    return [\"python\", filename]",
      "hint": "Имя файла — отдельный аргумент. Не склеивай команду в одну строку.",
      "testCases": [
        {
          "expression": "python_command(\"app.py\")",
          "expectedValue": [
            "python",
            "app.py"
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "python_command(\"main.py\")",
          "expectedValue": [
            "python",
            "main.py"
          ],
          "expectedCallOutput": ""
        },
        {
          "expression": "python_command(\"\")",
          "expectedValue": [
            "python",
            ""
          ],
          "description": "Формирование списка не выполняет команду и не проверяет файл",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile/"
  ]
};

export default lesson;
