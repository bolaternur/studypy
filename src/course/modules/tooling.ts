import type { CourseModule } from '../types';

const module: CourseModule = {
  "id": "tooling",
  "title": "Инструменты разработки: первая последовательность",
  "track": "advanced",
  "depth": "Вводная последовательность",
  "goal": "Понимать локальный запуск, окружение, читаемость и состояния Git; проверять конфигурацию и код без имитации терминала.",
  "prerequisites": [
    "debugging",
    "data"
  ],
  "lessons": [
    {
      "id": "tooling-scripts",
      "title": "Скрипт, интерпретатор и рабочая папка",
      "goal": "Различить редактирование, запуск и выбор интерпретатора; прочитать файловый путь.",
      "prerequisites": [],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "tooling-scripts-step-1",
          "title": "Редактор не выполняет код сам по себе",
          "paragraphs": [
            "Редактор или IDE помогает изменять файлы, подсвечивать синтаксис и запускать инструменты. Python-интерпретатор выполняет программу. Сохранённый файл main.py запускают выбранным интерпретатором, например python main.py во внешнем терминале. На Windows часто доступна команда py, но конкретная установка может отличаться. Проверь python --version или py --version вместо предположения по значку приложения.",
            "Рабочая папка процесса влияет на относительные пути. Файл data.txt ищется относительно текущей рабочей папки, а не автоматически рядом с открытым в IDE файлом. В StudyPy Python работает в браузерной среде Pyodide: он не получает прямой доступ ко всему диску компьютера и не заменяет внешний терминал. Команды Git и venv в этой последовательности представлены как инструкции для локальной машины."
          ],
          "examples": [
            {
              "id": "tooling-scripts-example-1",
              "title": "Проверка выбранного Python",
              "language": "shell",
              "code": "python --version\npython main.py",
              "output": "Python 3.12.1\nПривет",
              "explanation": "Это пример сеанса внешнего терминала при установленном Python 3.12.1 и файле main.py, печатающем Привет. Фактический номер зависит от установки; в StudyPy эти команды не исполняются."
            }
          ],
          "goal": "Объяснить: Редактор или IDE помогает изменять файлы, подсвечивать синтаксис и запускать инструменты.",
          "prerequisites": []
        },
        {
          "id": "tooling-scripts-step-2",
          "title": "Контекст запуска и пути",
          "paragraphs": [
            "При прямом запуске файла Python задаёт __name__ значение \"__main__\". При импорте обычного модуля значение связано с именем модуля. Условие if __name__ == \"__main__\": позволяет оставить запуск приложения отдельным от определений функций. Импорт не должен неожиданно начинать диалог input или менять пользовательские файлы без причины.",
            "pathlib предлагает объекты путей. PurePosixPath разбирает текст пути по правилам POSIX без обращения к файловой системе; name даёт последний компонент, stem — имя без последнего суффикса, suffix — последний суффикс с точкой. Это не проверка существования файла. В упражнении формат путей объявлен явно, чтобы ответ не зависел от Windows или браузера."
          ],
          "examples": [
            {
              "id": "tooling-scripts-example-2",
              "title": "Разбор пути без файлов",
              "code": "from pathlib import PurePosixPath\np=PurePosixPath(\"src/report.test.py\")\nprint(p.name)\nprint(p.stem)\nprint(p.suffix)",
              "output": "report.test.py\nreport.test\n.py",
              "explanation": "Ничего не открывается: PurePosixPath только разбирает строку по объявленным правилам POSIX."
            }
          ],
          "goal": "Объяснить: При прямом запуске файла Python задаёт __name__ значение \"__main__\".",
          "prerequisites": [
            "tooling-scripts-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "tooling-path-parts",
          "kind": "code",
          "title": "Разобрать путь скрипта",
          "goal": "Различить текстовое разложение пути и доступ к файлу.",
          "prerequisites": [
            "tooling-scripts"
          ],
          "prompt": "Реализуй script_parts(path): для текстового POSIX-пути верни список [name, stem, suffix] через PurePosixPath. Файл не открывай и существование не проверяй.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "Непустой POSIX-путь к файлу, без завершающего /. Работает одинаково в Python 3.12 и Pyodide.",
          "examples": [
            {
              "input": [
                "script_parts(\"src/main.py\")"
              ],
              "output": "[\"main.py\", \"main\", \".py\"]",
              "explanation": "Для src/main.py результат [\"main.py\",\"main\",\".py\"]. У README и .env суффикс пустой. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "script_parts(\"folder/.env\")"
              ],
              "output": "[\".env\", \".env\", \"\"]",
              "explanation": "Для src/main.py результат [\"main.py\",\"main\",\".py\"]. У README и .env суффикс пустой. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "",
              "expression": "script_parts(\"src/main.py\")",
              "expectedValue": [
                "main.py",
                "main",
                ".py"
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "",
              "expression": "script_parts(\"report.test.py\")",
              "expectedValue": [
                "report.test.py",
                "report.test",
                ".py"
              ],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "",
              "expression": "script_parts(\"README\")",
              "expectedValue": [
                "README",
                "README",
                ""
              ],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            },
            {
              "setup": "",
              "expression": "script_parts(\"folder/.env\")",
              "expectedValue": [
                ".env",
                ".env",
                ""
              ],
              "expectedOutput": "",
              "description": "Набор данных 4: результат и изменения базы"
            }
          ],
          "reference": "from pathlib import PurePosixPath\ndef script_parts(path):\n    item=PurePosixPath(path)\n    return [item.name,item.stem,item.suffix]",
          "alternative": "from pathlib import PurePosixPath\ndef script_parts(path):\n    name=PurePosixPath(path).name\n    suffix=PurePosixPath(path).suffix\n    stem=name[:-len(suffix)] if suffix else name\n    return [name,stem,suffix]",
          "wrongSolutions": [
            {
              "code": "def script_parts(path):\n    return [path,path,'.py']",
              "why": "Возвращён весь путь и выдуманный суффикс."
            },
            {
              "code": "from pathlib import PurePosixPath\ndef script_parts(path):\n    p=PurePosixPath(path)\n    return [p.name,p.name,p.suffix]",
              "why": "stem не должен сохранять последний суффикс."
            }
          ],
          "hints": [
            "Импортируй PurePosixPath из pathlib.",
            "name, stem и suffix уже реализуют нужные правила.",
            "Не разделяй путь вручную по точке: скрытые файлы и несколько точек дают особые случаи."
          ],
          "solutionExplanation": [
            "Для src/main.py результат [\"main.py\",\"main\",\".py\"]. У README и .env суффикс пустой."
          ],
          "required": true
        },
        {
          "id": "tooling-entrypoint",
          "kind": "code",
          "title": "Точка входа",
          "goal": "Выразить смысл стандартного условия точки входа.",
          "prerequisites": [
            "tooling-scripts"
          ],
          "prompt": "Реализуй should_run(module_name): верни True только для имени __main__, иначе False. Это предикат условия, которым ограждают прямой запуск приложения.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "module_name — строка; функция не запускает другие программы.",
          "examples": [
            {
              "input": [
                "should_run(\"__main__\")"
              ],
              "output": "true",
              "explanation": "Проверяется точное специальное значение, а не имя файла или наличие любого текста. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "should_run(\"\")"
              ],
              "output": "false",
              "explanation": "Проверяется точное специальное значение, а не имя файла или наличие любого текста. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "",
              "expression": "should_run(\"__main__\")",
              "expectedValue": true,
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "",
              "expression": "should_run(\"report\")",
              "expectedValue": false,
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "",
              "expression": "should_run(\"main\")",
              "expectedValue": false,
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            },
            {
              "setup": "",
              "expression": "should_run(\"\")",
              "expectedValue": false,
              "expectedOutput": "",
              "description": "Набор данных 4: результат и изменения базы"
            }
          ],
          "reference": "def should_run(module_name):\n    return module_name==\"__main__\"",
          "alternative": "def should_run(module_name):\n    if module_name!=\"__main__\":\n        return False\n    return True",
          "wrongSolutions": [
            {
              "code": "def should_run(module_name):\n    return bool(module_name)",
              "why": "Имя импортированного модуля тоже непустое."
            },
            {
              "code": "def should_run(module_name):\n    return module_name=='main'",
              "why": "Специальное имя содержит по два подчёркивания с каждой стороны."
            }
          ],
          "hints": [
            "Импорт и прямой запуск различаются значением __name__.",
            "При прямом запуске это точная строка \"__main__\".",
            "Нужен результат сравнения, а не истинность непустого имени."
          ],
          "solutionExplanation": [
            "Проверяется точное специальное значение, а не имя файла или наличие любого текста."
          ],
          "required": true
        },
        {
          "id": "tooling-interpreter-choice",
          "kind": "choice",
          "title": "Что именно запускается?",
          "goal": "Что именно запускается?",
          "prerequisites": [
            "tooling-scripts"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "main.py → выбранный Python",
              "explanation": "Аналог: редактор хранит текст, а команда python main.py передаёт файл интерпретатору. Сохранение само по себе ещё не выполняет файл."
            }
          ],
          "answer": [
            "1",
            "3"
          ],
          "hints": [
            "IDE и интерпретатор выполняют разные роли.",
            "Рабочая папка влияет на относительный путь.",
            "Браузерная песочница ограничена своей средой."
          ],
          "solutionExplanation": [
            "Нужно знать выбранный интерпретатор и рабочую папку; StudyPy не получает произвольный доступ к локальным папкам."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "Два проекта в IDE могут использовать разные интерпретаторы."
            },
            {
              "id": "2",
              "text": "Открытие файла всегда означает его выполнение."
            },
            {
              "id": "3",
              "text": "Относительный путь зависит от рабочей папки процесса."
            },
            {
              "id": "4",
              "text": "Pyodide автоматически видит все файлы диска C:."
            }
          ]
        },
        {
          "id": "tooling-script-order",
          "kind": "order",
          "title": "Диагностика «не запускается»",
          "goal": "Диагностика «не запускается»",
          "prerequisites": [
            "tooling-scripts"
          ],
          "prompt": "Собери порядок первичной проверки локального скрипта.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "Сначала путь, затем версия",
              "explanation": "Аналог: FileNotFoundError при чтении data.txt требует проверки рабочей папки, а не переустановки редактора."
            }
          ],
          "answer": [
            "2",
            "4",
            "1",
            "3"
          ],
          "hints": [
            "Сначала нужны сохранённый файл и понятное место запуска.",
            "Потом проверь команду и версию интерпретатора.",
            "Только после запуска анализируй конкретную ошибку."
          ],
          "solutionExplanation": [
            "Файл и папка → интерпретатор → запуск → сообщение ошибки: последовательность устраняет разные причины по отдельности."
          ],
          "required": true,
          "blocks": [
            {
              "id": "1",
              "text": "Запустить файл выбранным Python из понятной рабочей папки."
            },
            {
              "id": "2",
              "text": "Сохранить файл и определить, где он находится."
            },
            {
              "id": "3",
              "text": "Прочитать точное сообщение и строку ошибки."
            },
            {
              "id": "4",
              "text": "Проверить доступность команды Python и её версию."
            }
          ]
        }
      ]
    },
    {
      "id": "tooling-readability",
      "title": "PEP 8, имена и документирование",
      "goal": "Улучшить читаемость без изменения поведения и отличить стиль от проверки результата.",
      "prerequisites": [
        "tooling-scripts"
      ],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "tooling-readability-step-1",
          "title": "Код читают чаще, чем набирают",
          "paragraphs": [
            "PEP 8 описывает договорённости стиля Python: четыре пробела для отступа, snake_case для обычных функций и переменных, пробелы вокруг большинства бинарных операторов, разумное разделение смысловых частей. Это помогает быстро видеть структуру. Пробелы важны по-разному: отступ задаёт блок, а пробел вокруг + обычно улучшает чтение без изменения выражения.",
            "Не превращай стиль в соревнование по длине строки кода. Имена x и y бывают уместны для координат, но у цены и количества яснее price и quantity. Комментарий полезен, когда объясняет причину решения или ограничение, а не повторяет следующую команду. Удаляй устаревший комментарий: противоречие с кодом мешает сильнее отсутствия подписи."
          ],
          "examples": [
            {
              "id": "tooling-readability-example-1",
              "title": "Понятный контракт",
              "code": "def rectangle_area(width: int, height: int) -> int:\n    \"\"\"Вернуть площадь по неотрицательным сторонам в одинаковых единицах.\"\"\"\n    return width * height\n\nprint(rectangle_area(3,4))\nprint(bool(rectangle_area.__doc__))",
              "output": "12\nTrue",
              "explanation": "Аннотации и docstring дополняют смысл, но результат по-прежнему вычисляется телом функции."
            }
          ],
          "goal": "Объяснить: PEP 8 описывает договорённости стиля Python: четыре пробела для отступа, snake_case для обычных функций и переменных, пробелы вокруг большинства бинарных операторов, разумное разделение смысловых частей.",
          "prerequisites": [
            "tooling-scripts"
          ]
        },
        {
          "id": "tooling-readability-step-2",
          "title": "Документация и аннотации",
          "paragraphs": [
            "Строка первой командой внутри функции становится docstring и доступна через __doc__. Она объясняет контракт: что функция получает, возвращает и какие особые случаи имеет. Не путай её с комментарием #, который не сохраняется как документация функции. Для сложного контракта полезны отдельные предложения, а не лозунг «делает всё».",
            "Аннотации value: int и -> int помогают инструментам и читателю, но сами по себе не проверяют аргументы во время обычного вызова. Функция с аннотацией int всё ещё может получить строку, если код явно не проверяет вход. В упражнениях выполняется настоящая проверка поведения и явно объявленных элементов документации; автоматического доказательства «идеального PEP 8» здесь нет. Сверяй читаемость также самостоятельно."
          ],
          "examples": [
            {
              "id": "tooling-readability-example-2",
              "title": "Аннотация не охранник",
              "code": "def echo(value: int) -> int:\n    return value\n\nprint(echo(\"текст\"))",
              "output": "текст",
              "explanation": "Обычный Python не запрещает такой вызов только из-за аннотации. Для запрета нужна проверка или статический анализатор."
            }
          ],
          "goal": "Объяснить: Строка первой командой внутри функции становится docstring и доступна через __doc__.",
          "prerequisites": [
            "tooling-readability-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "tooling-refactor-receipt",
          "kind": "modify",
          "title": "Читаемый расчёт",
          "goal": "Исправить формулу и сделать расчёт читаемым.",
          "prerequisites": [
            "tooling-readability"
          ],
          "prompt": "Исправь формулу calculate_total(price, quantity, delivery) по контракту price * quantity + delivery. Используй понятные имена и пробелы. Автопроверка проверяет поведение; оформление сравни с PEP 8 самостоятельно.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "Три неотрицательных int до 1000000. Зависимости не нужны.",
          "examples": [
            {
              "input": [
                "calculate_total(10,3,5)"
              ],
              "output": "35",
              "explanation": "Проверка ловит изменение формулы и путаницу print/return. Стиль требует отдельного визуального чтения. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "calculate_total(8,1,0)"
              ],
              "output": "8",
              "explanation": "Проверка ловит изменение формулы и путаницу print/return. Стиль требует отдельного визуального чтения. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "def calculate_total(p,q,d):\n return (p+d)*q",
          "tests": [
            {
              "setup": "",
              "expression": "calculate_total(10,3,5)",
              "expectedValue": 35,
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "",
              "expression": "calculate_total(0,0,7)",
              "expectedValue": 7,
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "",
              "expression": "calculate_total(8,1,0)",
              "expectedValue": 8,
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            }
          ],
          "reference": "def calculate_total(price, quantity, delivery):\n    subtotal = price * quantity\n    return subtotal + delivery",
          "alternative": "def calculate_total(price, quantity, delivery):\n    return delivery + quantity * price",
          "wrongSolutions": [
            {
              "code": "def calculate_total(price,quantity,delivery):\n    return (price+delivery)*quantity",
              "why": "Рефакторинг изменил поведение: доставка умножается на количество."
            },
            {
              "code": "def calculate_total(price,quantity,delivery):\n    print(price*quantity+delivery)",
              "why": "Печать не заменяет возвращаемый результат."
            }
          ],
          "hints": [
            "Сначала зафиксируй требуемую формулу.",
            "Выдели стоимость товаров в subtotal, если это помогает чтению.",
            "Возвращай число через return; не печатай внутри функции."
          ],
          "solutionExplanation": [
            "Проверка ловит изменение формулы и путаницу print/return. Стиль требует отдельного визуального чтения."
          ],
          "required": true
        },
        {
          "id": "tooling-docstring",
          "kind": "code",
          "title": "Документированная функция",
          "goal": "Отличить настоящую документационную строку от комментария.",
          "prerequisites": [
            "tooling-readability"
          ],
          "prompt": "Реализуй square(number): верни квадрат числа. Первой командой функции добавь непустую docstring, которая объясняет назначение. Проверяется результат и наличие документации, а её смысл сверь самостоятельно.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "number — int от -1000000 до 1000000.",
          "examples": [
            {
              "input": [
                "[square(3),isinstance(square.__doc__,str) and bool(square.__doc__.strip())]"
              ],
              "output": "[9, true]",
              "explanation": "Функция возвращает квадрат и сохраняет документационную строку как метаданные. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "[square(0),isinstance(square.__doc__,str) and bool(square.__doc__.strip())]"
              ],
              "output": "[0, true]",
              "explanation": "Функция возвращает квадрат и сохраняет документационную строку как метаданные. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "",
              "expression": "[square(3),isinstance(square.__doc__,str) and bool(square.__doc__.strip())]",
              "expectedValue": [
                9,
                true
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "",
              "expression": "[square(-4),isinstance(square.__doc__,str) and bool(square.__doc__.strip())]",
              "expectedValue": [
                16,
                true
              ],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "",
              "expression": "[square(0),isinstance(square.__doc__,str) and bool(square.__doc__.strip())]",
              "expectedValue": [
                0,
                true
              ],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            }
          ],
          "reference": "def square(number):\n    \"\"\"Вернуть квадрат переданного числа.\"\"\"\n    return number*number",
          "alternative": "def square(number):\n    \"\"\"Вычислить вторую степень number без изменения входа.\"\"\"\n    result=number**2\n    return result",
          "wrongSolutions": [
            {
              "code": "def square(number):\n    # Вернуть квадрат\n    return number*number",
              "why": "Комментарий не создаёт __doc__."
            },
            {
              "code": "def square(number):\n    \"\"\"Вернуть квадрат.\"\"\"\n    return number*2",
              "why": "Описание обещает квадрат, но вычисляется удвоение."
            }
          ],
          "hints": [
            "Docstring — строковый литерал первой командой тела.",
            "return вычисляет number * number или number ** 2.",
            "Непустой текст попадает в square.__doc__; # не попадает."
          ],
          "solutionExplanation": [
            "Функция возвращает квадрат и сохраняет документационную строку как метаданные."
          ],
          "required": true
        },
        {
          "id": "tooling-style-claims",
          "kind": "choice",
          "title": "Что проверяет стиль?",
          "goal": "Что проверяет стиль?",
          "prerequisites": [
            "tooling-readability"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "price * quantity",
              "explanation": "Аналог: пробелы вокруг * улучшают чтение; замена * на + уже меняет поведение и должна ловиться тестом."
            }
          ],
          "answer": [
            "1",
            "3",
            "4"
          ],
          "hints": [
            "Отступ — синтаксис, имена — помощь читателю.",
            "Аннотация не вызывает автоматический isinstance.",
            "Форматтер и тесты решают разные задачи."
          ],
          "solutionExplanation": [
            "Читаемость, документация и поведение дополняют друг друга, но ни одна проверка не заменяет остальные."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "Четыре пробела — стандартная договорённость для уровня отступа."
            },
            {
              "id": "2",
              "text": "Аннотация x: int всегда запрещает передать строку."
            },
            {
              "id": "3",
              "text": "Рефакторинг должен сохранять объявленное поведение."
            },
            {
              "id": "4",
              "text": "Комментарий полезен, когда объясняет причину нетривиального решения."
            }
          ]
        },
        {
          "id": "tooling-doc-reason",
          "kind": "explain",
          "title": "Почему комментарий не стал __doc__?",
          "goal": "Почему комментарий не стал __doc__?",
          "prerequisites": [
            "tooling-readability"
          ],
          "prompt": "Функция содержит # Вернуть сумму, но её __doc__ равно None. Почему?",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "True",
              "explanation": "Аналог: def f(): с первой строкой \"\"\"Вернуть единицу.\"\"\" имеет непустую __doc__, которую может читать help."
            }
          ],
          "answer": [
            "2"
          ],
          "hints": [
            "Комментарий не является исполняемой строковой командой.",
            "Docstring занимает первую позицию тела.",
            "Нужно различать текст для читателя исходника и метаданные функции."
          ],
          "solutionExplanation": [
            "Документационная строка — строковый литерал первой командой, а не комментарий #."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "Python не поддерживает русскую документацию."
            },
            {
              "id": "2",
              "text": "Комментарий # не является документационной строкой функции."
            },
            {
              "id": "3",
              "text": "Нужно обязательно установить отдельную библиотеку."
            }
          ]
        }
      ]
    },
    {
      "id": "tooling-environment",
      "title": "venv, pip и описание проекта",
      "goal": "Понять границы окружения и прочитать конфигурацию без установки пакетов.",
      "prerequisites": [
        "tooling-readability"
      ],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "tooling-environment-step-1",
          "title": "Окружение принадлежит проекту",
          "paragraphs": [
            "Виртуальное окружение хранит отдельный интерпретаторный контекст и установленные пакеты проекта. Команда python -m venv .venv создаёт его во внешнем терминале. Активация меняет удобный выбор команды python в текущей оболочке; она не переписывает исходники и не публикует приложение. Можно вызывать интерпретатор окружения напрямую без активации. Для Windows PowerShell и POSIX-команд пути отличаются.",
            "Вызывай pip через нужный интерпретатор: python -m pip ..., чтобы уменьшить риск установки в другой Python. Проверка python -m pip --version показывает путь и связанный Python. Не запускай реальные установки из учебной браузерной задачи: Pyodide имеет свой механизм пакетов и ограничения платформы. Здесь команды окружения представлены как внешний практический шаг, а не как работающий виртуальный терминал."
          ],
          "examples": [
            {
              "id": "tooling-environment-example-1",
              "title": "Окружение в POSIX-терминале",
              "language": "shell",
              "code": "python -m venv .venv\n.venv/bin/python -m pip --version",
              "output": "pip 24.2 from /home/student/project/.venv/lib/python3.12/site-packages/pip (python 3.12)",
              "explanation": "Этот образец вывода зависит от установленного pip и абсолютного пути. Важен путь внутри .venv. Команды запускаются локально, не в StudyPy."
            }
          ],
          "goal": "Объяснить: Виртуальное окружение хранит отдельный интерпретаторный контекст и установленные пакеты проекта.",
          "prerequisites": [
            "tooling-readability"
          ]
        },
        {
          "id": "tooling-environment-step-2",
          "title": "Конфигурация — тоже данные",
          "paragraphs": [
            "Файл pyproject.toml может описывать проект и настройки инструментов. Таблица [project] содержит name, version и dependencies при соответствующей модели упаковки. Стандартный tomllib Python 3.11+ читает TOML; loads принимает текст и возвращает словари и списки. Это чтение конфигурации, не установка зависимостей и не проверка их доступности.",
            "requirements.txt обычно содержит требования для установки, часто с версиями. Зафиксированный список зависимостей помогает повторить среду, но одного файла недостаточно для полной воспроизводимости всех платформ и внешних сервисов. Не добавляй .venv и секреты .env в репозиторий. Вместо секретов полезен .env.example с именами переменных и безопасными пустыми значениями."
          ],
          "examples": [
            {
              "id": "tooling-environment-example-2",
              "title": "Чтение TOML",
              "code": "import tomllib\ntext='[project]\\nname=\"notes\"\\nversion=\"0.1.0\"\\ndependencies=[\"requests>=2\"]'\ndata=tomllib.loads(text)\nprint(data[\"project\"][\"name\"])\nprint(data[\"project\"][\"dependencies\"])",
              "output": "notes\n['requests>=2']",
              "explanation": "tomllib читает структуру и ничего не устанавливает. Упоминание requests не доказывает наличие пакета в текущем Python."
            }
          ],
          "goal": "Объяснить: Файл pyproject.toml может описывать проект и настройки инструментов.",
          "prerequisites": [
            "tooling-environment-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "tooling-project-name",
          "kind": "code",
          "title": "Прочитать имя проекта",
          "goal": "Прочитать вложенную конфигурацию с объявленным значением по умолчанию.",
          "prerequisites": [
            "tooling-environment"
          ],
          "prompt": "Реализуй project_name(text): прочитай корректный TOML через tomllib.loads. Верни project.name, если оно задано, иначе строку unnamed. Отсутствующая таблица project допустима.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "Корректный TOML до 2000 символов; project.name, если есть, — непустая строка.",
          "examples": [
            {
              "input": [
                "project_name('[project]\\nname=\"course\"')"
              ],
              "output": "\"course\"",
              "explanation": "Возвращается имя из данных либо явный fallback, без поиска строк вручную. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "project_name(\"\")"
              ],
              "output": "\"unnamed\"",
              "explanation": "Возвращается имя из данных либо явный fallback, без поиска строк вручную. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "",
              "expression": "project_name('[project]\\nname=\"course\"')",
              "expectedValue": "course",
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "",
              "expression": "project_name('[project]\\nversion=\"1.0\"')",
              "expectedValue": "unnamed",
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "",
              "expression": "project_name('[tool.demo]\\nactive=true')",
              "expectedValue": "unnamed",
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            },
            {
              "setup": "",
              "expression": "project_name(\"\")",
              "expectedValue": "unnamed",
              "expectedOutput": "",
              "description": "Набор данных 4: результат и изменения базы"
            }
          ],
          "reference": "import tomllib\ndef project_name(text):\n    data=tomllib.loads(text)\n    return data.get(\"project\",{}).get(\"name\",\"unnamed\")",
          "alternative": "import tomllib\ndef project_name(text):\n    config=tomllib.loads(text)\n    if \"project\" not in config:\n        return \"unnamed\"\n    if \"name\" not in config[\"project\"]:\n        return \"unnamed\"\n    return config[\"project\"][\"name\"]",
          "wrongSolutions": [
            {
              "code": "import tomllib\ndef project_name(text):\n    return tomllib.loads(text)['project']['name']",
              "why": "Отсутствующая таблица или поле не обработаны."
            },
            {
              "code": "def project_name(text):\n    return 'unnamed'",
              "why": "Заданное имя игнорируется."
            }
          ],
          "hints": [
            "loads преобразует TOML в словарь.",
            "Таблица project может отсутствовать.",
            "Последовательно используй .get для таблицы и имени."
          ],
          "solutionExplanation": [
            "Возвращается имя из данных либо явный fallback, без поиска строк вручную."
          ],
          "required": true
        },
        {
          "id": "tooling-requirements-text",
          "kind": "code",
          "title": "Список требований",
          "goal": "Сформировать детерминированный текст конфигурации без ложного обещания установки.",
          "prerequisites": [
            "tooling-environment"
          ],
          "prompt": "Реализуй requirements_text(lines): удали внешние пробелы у каждой строки, пропусти пустые, убери точные дубликаты и отсортируй строки. Верни текст, соединённый переводами строки, без конечного переноса. Это подготовка текста, а не установка или полноценный парсер requirements.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "0–30 строк длиной до 200. Внутреннее содержимое требований сохраняется буквально.",
          "examples": [
            {
              "input": [
                "requirements_text([\" requests==2.32.3 \",\"pytest==8.3.5\",\"requests==2.32.3\",\"\"])"
              ],
              "output": "\"pytest==8.3.5\\nrequests==2.32.3\"",
              "explanation": "Точное текстовое очищение не интерпретирует версии и не устанавливает пакеты. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "requirements_text([\"  \",\"x==1\",\" x==1 \"])"
              ],
              "output": "\"x==1\"",
              "explanation": "Точное текстовое очищение не интерпретирует версии и не устанавливает пакеты. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "",
              "expression": "requirements_text([\" requests==2.32.3 \",\"pytest==8.3.5\",\"requests==2.32.3\",\"\"])",
              "expectedValue": "pytest==8.3.5\nrequests==2.32.3",
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "",
              "expression": "requirements_text([])",
              "expectedValue": "",
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "",
              "expression": "requirements_text([\"  \",\"x==1\",\" x==1 \"])",
              "expectedValue": "x==1",
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            }
          ],
          "reference": "def requirements_text(lines):\n    cleaned={line.strip() for line in lines if line.strip()}\n    return \"\\n\".join(sorted(cleaned))",
          "alternative": "def requirements_text(lines):\n    result=[]\n    for line in lines:\n        value=line.strip()\n        if value and value not in result:\n            result.append(value)\n    result.sort()\n    return \"\\n\".join(result)",
          "wrongSolutions": [
            {
              "code": "def requirements_text(lines):\n    return '\\n'.join(sorted(lines))",
              "why": "Не убраны пробелы, пустые строки и дубликаты."
            },
            {
              "code": "def requirements_text(lines):\n    return '\\n'.join(sorted({x.strip() for x in lines}))",
              "why": "Пустая строка остаётся элементом и добавляет лишний перенос."
            }
          ],
          "hints": [
            "Сначала очисти края строк.",
            "Непустые очищенные строки сохраняй уникально.",
            "Отсортируй перед join, чтобы порядок был стабильным."
          ],
          "solutionExplanation": [
            "Точное текстовое очищение не интерпретирует версии и не устанавливает пакеты."
          ],
          "required": true
        },
        {
          "id": "tooling-pip-choice",
          "kind": "choice",
          "title": "Куда попадёт пакет?",
          "goal": "Куда попадёт пакет?",
          "prerequisites": [
            "tooling-environment"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": ".../.venv/...",
              "explanation": "Аналог: .venv/bin/python -m pip --version должен указывать путь к pip этого окружения, а не системного Python."
            }
          ],
          "answer": [
            "1",
            "3"
          ],
          "hints": [
            "Команда pip может относиться к другому Python.",
            "Активация — удобство выбора, не обязательный ритуал.",
            "Среда браузера отличается от локальной ОС."
          ],
          "solutionExplanation": [
            "Интерпретатор определяет окружение. Вызов его -m pip связывает установку с ним."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "python -m pip использует pip выбранного python."
            },
            {
              "id": "2",
              "text": "Активация .venv публикует проект на сервер."
            },
            {
              "id": "3",
              "text": "Интерпретатор .venv можно вызывать по пути без активации."
            },
            {
              "id": "4",
              "text": "Обычный venv в браузере StudyPy даёт доступ к любым пакетам ОС."
            }
          ]
        },
        {
          "id": "tooling-env-order",
          "kind": "order",
          "title": "План настройки локального проекта",
          "goal": "План настройки локального проекта",
          "prerequisites": [
            "tooling-environment"
          ],
          "prompt": "Поставь безопасные этапы в порядок.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "Python 3.12 → .venv",
              "explanation": "Аналог: другой проект может выбрать свою .venv и не менять установленные пакеты первого проекта."
            }
          ],
          "answer": [
            "3",
            "1",
            "4",
            "2"
          ],
          "hints": [
            "Сначала проверяется исходный интерпретатор.",
            "Затем создаётся окружение.",
            "После выбора его Python можно работать с зависимостями."
          ],
          "solutionExplanation": [
            "Версия → окружение → выбор интерпретатора → установка из проверенного описания."
          ],
          "required": true,
          "blocks": [
            {
              "id": "1",
              "text": "Создать окружение командой python -m venv .venv."
            },
            {
              "id": "2",
              "text": "Установить нужные зависимости через Python окружения."
            },
            {
              "id": "3",
              "text": "Проверить доступный Python и его версию."
            },
            {
              "id": "4",
              "text": "Убедиться, что IDE и терминал используют Python окружения."
            }
          ]
        }
      ]
    },
    {
      "id": "tooling-git-snapshot",
      "title": "Git: рабочая папка, индекс и коммит",
      "goal": "Различить три состояния файла и осознанно подготовить локальный коммит.",
      "prerequisites": [
        "tooling-environment"
      ],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "tooling-git-snapshot-step-1",
          "title": "Три места, три вопроса",
          "paragraphs": [
            "Git хранит историю снимков проекта. Рабочая папка — файлы, которые сейчас редактируются. Индекс, или staging area, — подготовленное содержимое следующего коммита. Последний коммит — уже записанный снимок истории. Команда git add main.py копирует текущее содержимое файла в индекс. Последующее редактирование main.py не меняет подготовленный снимок автоматически: git add нужно повторить для нового содержимого.",
            "git status показывает состояние, git diff — различие рабочей папки и индекса, git diff --staged — индекса и последнего коммита. Выбирай конкретные файлы, прежде чем использовать массовое добавление. Если в проекте есть .env, сначала исключи секреты и просмотри список изменений. .gitignore влияет на неотслеживаемые файлы; уже отслеживаемый файл не исчезнет из истории от добавления правила."
          ],
          "examples": [
            {
              "id": "tooling-git-snapshot-example-1",
              "title": "Файл ещё не подготовлен",
              "language": "shell",
              "code": "git status --short\ngit diff -- main.py",
              "output": " M main.py\ndiff --git a/main.py b/main.py\n--- a/main.py\n+++ b/main.py\n@@ -1 +1 @@\n-print(1)\n+print(2)",
              "explanation": "Образец сеанса: пробел в первой колонке и M во второй означают изменение рабочей копии относительно индекса. В diff удалён вывод 1 и добавлен вывод 2."
            }
          ],
          "goal": "Объяснить: Git хранит историю снимков проекта.",
          "prerequisites": [
            "tooling-environment"
          ]
        },
        {
          "id": "tooling-git-snapshot-step-2",
          "title": "Коммит остаётся локальным",
          "paragraphs": [
            "git commit записывает подготовленный снимок локально. Он не отправляет изменения на GitHub и не публикует сайт сам по себе. git push передаёт коммиты в удалённый репозиторий, где уже могут работать отдельно настроенные автоматизации. Не отправляй секреты в расчёте потом просто удалить файл: история сохраняет прежние версии.",
            "Для упражнения команды и транскрипты представлены как реальные внешние операции; браузер не выполняет Git и не начисляет «успешный коммит» за распознавание текста команды. Выполнение этого шага курса означает понимание состояния и правильный выбор по данному сценарию. Практику на машине начинай с отдельного учебного репозитория. Для удаления или перезаписи данных требуются понимание команды и резервная копия."
          ],
          "examples": [
            {
              "id": "tooling-git-snapshot-example-2",
              "title": "После add и нового изменения",
              "language": "shell",
              "code": "git add main.py\n# Затем main.py снова изменён в редакторе\ngit status --short",
              "output": "MM main.py",
              "explanation": "Первая M — подготовленные изменения относительно коммита; вторая M — ещё одно изменение рабочей копии относительно индекса. Это внешний Git, не проверка Python."
            }
          ],
          "goal": "Объяснить: git commit записывает подготовленный снимок локально.",
          "prerequisites": [
            "tooling-git-snapshot-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "tooling-git-three-states",
          "kind": "choice",
          "title": "Что попадёт в коммит?",
          "goal": "Что попадёт в коммит?",
          "prerequisites": [
            "tooling-git-snapshot"
          ],
          "prompt": "После git add main.py ученик изменил файл ещё раз и сразу выполнил git commit. Что верно?",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "MM main.py",
              "explanation": "Аналог: M в обеих колонках status --short показывает одновременно подготовленные и новые неподготовленные изменения."
            }
          ],
          "answer": [
            "1",
            "3"
          ],
          "hints": [
            "add сохраняет содержимое на момент вызова.",
            "commit читает индекс, а не произвольное последнее состояние.",
            "Изменения после add остаются рабочими."
          ],
          "solutionExplanation": [
            "Коммит запишет версию из индекса. Последнее редактирование останется незакоммиченным."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "В коммит попадёт содержимое на момент git add."
            },
            {
              "id": "2",
              "text": "В коммит всегда попадает всё последнее содержимое диска."
            },
            {
              "id": "3",
              "text": "Последнее изменение может остаться в рабочей папке."
            },
            {
              "id": "4",
              "text": "git commit автоматически отправляет всё в GitHub."
            }
          ]
        },
        {
          "id": "tooling-git-initial-order",
          "kind": "order",
          "title": "Первый осознанный коммит",
          "goal": "Первый осознанный коммит",
          "prerequisites": [
            "tooling-git-snapshot"
          ],
          "prompt": "Упорядочь действия в уже созданном учебном репозитории.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "git diff --staged",
              "explanation": "Аналог: этот просмотр показывает содержимое будущего коммита после add, поэтому помогает не отправить лишний файл."
            }
          ],
          "answer": [
            "2",
            "4",
            "1",
            "3"
          ],
          "hints": [
            "Сначала нужно увидеть, что изменено.",
            "Затем подготовить выбранные файлы.",
            "Перед commit проверить именно staged diff."
          ],
          "solutionExplanation": [
            "Status и просмотр → add нужных файлов → staged diff → commit."
          ],
          "required": true,
          "blocks": [
            {
              "id": "1",
              "text": "Проверить git diff --staged."
            },
            {
              "id": "2",
              "text": "Посмотреть git status и изменения файлов."
            },
            {
              "id": "3",
              "text": "Выполнить git commit с понятным сообщением."
            },
            {
              "id": "4",
              "text": "Добавить выбранные файлы через git add."
            }
          ]
        },
        {
          "id": "tooling-git-ignore-reason",
          "kind": "explain",
          "title": "Почему .env всё ещё отслеживается?",
          "goal": "Почему .env всё ещё отслеживается?",
          "prerequisites": [
            "tooling-git-snapshot"
          ],
          "prompt": "Файл .env уже был в коммите. После добавления .env в .gitignore status всё ещё видит его изменения. Почему?",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": ".env.example",
              "explanation": "Аналог: в репозитории можно хранить безопасный образец имён переменных, а реальные значения оставлять вне истории."
            }
          ],
          "answer": [
            "2"
          ],
          "hints": [
            "Правило игнорирования не переписывает историю.",
            "Git уже знает этот путь как отслеживаемый.",
            "Для секретов нужна отдельная процедура удаления и замены значения."
          ],
          "solutionExplanation": [
            ".gitignore не прекращает отслеживание уже добавленного файла и не удаляет секрет из прежних коммитов."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": ".gitignore работает только на Linux."
            },
            {
              "id": "2",
              "text": "Правило не отменяет отслеживание уже известного Git файла."
            },
            {
              "id": "3",
              "text": "Нужно просто перезагрузить браузер."
            }
          ]
        },
        {
          "id": "tooling-git-local-remote",
          "kind": "choice",
          "title": "Локальная история и GitHub",
          "goal": "Локальная история и GitHub",
          "prerequisites": [
            "tooling-git-snapshot"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "Локальный commit",
              "explanation": "Аналог: без сети можно создать локальный коммит; для передачи в origin требуется отдельная команда push и доступ."
            }
          ],
          "answer": [
            "1",
            "3",
            "4"
          ],
          "hints": [
            "Git и GitHub — разные уровни.",
            "commit создаётся локально.",
            "push может запустить отдельно настроенные процессы на стороне сервиса."
          ],
          "solutionExplanation": [
            "Коммит и отправка различаются. Перед push нужно понимать удалённый репозиторий и автоматизации."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "Коммит можно создать без подключения к GitHub."
            },
            {
              "id": "2",
              "text": "git status публикует сайт."
            },
            {
              "id": "3",
              "text": "push передаёт коммиты в удалённый репозиторий."
            },
            {
              "id": "4",
              "text": "Публикация сайта зависит от отдельной настройки сервиса."
            }
          ]
        }
      ]
    },
    {
      "id": "tooling-git-review",
      "title": "Diff, история, ветки и конфликт",
      "goal": "Прочитать изменение, выбрать нужный diff и безопасно работать в отдельной ветке.",
      "prerequisites": [
        "tooling-git-snapshot"
      ],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "tooling-git-review-step-1",
          "title": "Изменение читается строками",
          "paragraphs": [
            "В unified diff строки с - были удалены, с + добавлены, а строка с пробелом — контекст. Заголовки --- и +++ обозначают сравниваемые версии файла, а @@ — диапазон строк. Это описание разницы, не последовательность команд Python. Если замена меняет условие < на <=, она меняет поведение на границе; небольшой размер diff не делает изменение безопасным автоматически.",
            "git log --oneline показывает краткую историю коммитов. git diff без параметров показывает рабочую копию относительно индекса; --staged показывает подготовленную версию относительно последнего коммита. Сравнение веток зависит от выбранных ссылок и синтаксиса, поэтому в вводной работе называем точные два состояния, которые нужно оценить."
          ],
          "examples": [
            {
              "id": "tooling-git-review-example-1",
              "title": "Подготовленная граница",
              "language": "shell",
              "code": "git diff --staged -- rule.py",
              "output": "diff --git a/rule.py b/rule.py\n--- a/rule.py\n+++ b/rule.py\n@@ -1 +1 @@\n-if age > 18:\n+if age >= 18:",
              "explanation": "Транскрипт показывает включение возраста 18 в подготовленном изменении. Нужно проверить именно этот граничный случай."
            }
          ],
          "goal": "Объяснить: В unified diff строки с - были удалены, с + добавлены, а строка с пробелом — контекст.",
          "prerequisites": [
            "tooling-git-snapshot"
          ]
        },
        {
          "id": "tooling-git-review-step-2",
          "title": "Ветка не копия рабочей папки",
          "paragraphs": [
            "Ветка — имя, указывающее на коммит, а не отдельная резервная копия всех несохранённых файлов. Для новой работы удобно создать отдельную ветку от понятной базы: git switch -c practice/report. Перед переключением смотри status и сохрани нужные изменения. Не используй принудительные команды ради исчезновения сообщения: сначала разберись, какие данные могут быть потеряны.",
            "Конфликт объединения означает, что Git не смог автоматически выбрать согласованный текст. Маркеры <<<<<<<, ======= и >>>>>>> обозначают варианты. Нужно понять желаемое поведение, удалить маркеры после ручного объединения, проверить программу, затем подготовить результат. Выбор «всегда моя версия» не является универсальным решением. Эта вводная последовательность не заменяет полный курс команд восстановления истории."
          ],
          "examples": [
            {
              "id": "tooling-git-review-example-2",
              "title": "Новая ветка",
              "language": "shell",
              "code": "git switch -c practice/report\ngit branch --show-current",
              "output": "Switched to a new branch 'practice/report'\npractice/report",
              "explanation": "Образец внешнего терминала для чистого учебного репозитория, где такого имени ветки ещё нет. Команды не исполняются в браузере."
            }
          ],
          "goal": "Объяснить: Ветка — имя, указывающее на коммит, а не отдельная резервная копия всех несохранённых файлов.",
          "prerequisites": [
            "tooling-git-review-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "tooling-git-diff-choice",
          "kind": "choice",
          "title": "Какой diff посмотреть?",
          "goal": "Какой diff посмотреть?",
          "prerequisites": [
            "tooling-git-review"
          ],
          "prompt": "Выбери верные соответствия.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "Рабочая копия ↔ индекс",
              "explanation": "Аналог: после add и нового редактирования обычный git diff показывает только новое редактирование."
            }
          ],
          "answer": [
            "1",
            "3"
          ],
          "hints": [
            "Нужно назвать два сравниваемых состояния.",
            "Без --staged индекс служит базой рабочей копии.",
            "С --staged сравнивается индекс с коммитом."
          ],
          "solutionExplanation": [
            "Два режима diff отвечают на разные вопросы и оба полезны перед коммитом."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "git diff — рабочая копия против индекса."
            },
            {
              "id": "2",
              "text": "git diff — всегда все коммиты GitHub."
            },
            {
              "id": "3",
              "text": "git diff --staged — индекс против последнего коммита."
            },
            {
              "id": "4",
              "text": "git log --oneline удаляет историю."
            }
          ]
        },
        {
          "id": "tooling-git-boundary-review",
          "kind": "explain",
          "title": "Что проверить у изменения?",
          "goal": "Что проверить у изменения?",
          "prerequisites": [
            "tooling-git-review"
          ],
          "prompt": "В diff строка if amount > 100 заменена на if amount >= 100. Какой тест прежде всего различает версии?",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "18",
              "explanation": "Аналог: изменение age > 18 на age >= 18 требует отдельного теста возраста 18."
            }
          ],
          "answer": [
            "2"
          ],
          "hints": [
            "Версии расходятся только на границе.",
            "Середина больше 100 ведёт себя одинаково.",
            "Нужно ровно значение порога."
          ],
          "solutionExplanation": [
            "amount=100 выполняет новую ветвь, но не старую. Остальные соседние проверки также полезны для полного поведения."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "amount=1000"
            },
            {
              "id": "2",
              "text": "amount=100"
            },
            {
              "id": "3",
              "text": "Только amount=1"
            }
          ]
        },
        {
          "id": "tooling-git-branch-order",
          "kind": "order",
          "title": "Отдельная работа в ветке",
          "goal": "Отдельная работа в ветке",
          "prerequisites": [
            "tooling-git-review"
          ],
          "prompt": "Поставь этапы безопасного начала работы в порядок.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "practice/report",
              "explanation": "Аналог: отдельное имя ветки делает результат удобным для просмотра, но не заменяет проверку файлов и сохранение данных."
            }
          ],
          "answer": [
            "3",
            "1",
            "4",
            "2"
          ],
          "hints": [
            "Сначала узнай текущее состояние.",
            "Выбери понятную базу и создай ветку.",
            "После работы проверяется результат перед отправкой."
          ],
          "solutionExplanation": [
            "Status → база и ветка → изменения с тестами → просмотр и коммит."
          ],
          "required": true,
          "blocks": [
            {
              "id": "1",
              "text": "Убедиться в понятной базе и создать новую ветку."
            },
            {
              "id": "2",
              "text": "Просмотреть diff, подготовить нужные файлы и создать коммит."
            },
            {
              "id": "3",
              "text": "Проверить текущую ветку и status, сохранить нужные изменения."
            },
            {
              "id": "4",
              "text": "Изменить код и выполнить подходящие проверки."
            }
          ]
        },
        {
          "id": "tooling-git-conflict",
          "kind": "choice",
          "title": "Как завершить конфликт?",
          "goal": "Как завершить конфликт?",
          "prerequisites": [
            "tooling-git-review"
          ],
          "prompt": "Выбери действия, которые помогают получить осмысленное объединение.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "Один согласованный блок",
              "explanation": "Аналог: две версии условия могут исправлять разные ошибки; простое удаление одной стороны может потерять полезное изменение."
            }
          ],
          "answer": [
            "1",
            "3",
            "4"
          ],
          "hints": [
            "Конфликт — вопрос о желаемом содержимом.",
            "Маркеры не являются Python-кодом.",
            "После объединения требуется проверка поведения."
          ],
          "solutionExplanation": [
            "Нужно понять обе версии, собрать итог, удалить маркеры и проверить результат."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "Прочитать обе версии и назначение изменения."
            },
            {
              "id": "2",
              "text": "Всегда выбирать одну сторону без просмотра."
            },
            {
              "id": "3",
              "text": "Удалить маркеры после осмысленного ручного объединения."
            },
            {
              "id": "4",
              "text": "Запустить проверки объединённого результата перед коммитом."
            }
          ]
        }
      ]
    },
    {
      "id": "tooling-project",
      "title": "Практическая работа: конфигурация и проверки проекта",
      "goal": "Проверить входные настройки и составить тесты, различающие реальные ошибки.",
      "prerequisites": [
        "tooling-git-review"
      ],
      "role": "assessment",
      "estimatedMinutes": 60,
      "steps": [
        {
          "id": "tooling-project-step-1",
          "title": "Из описания проекта в поведение",
          "paragraphs": [
            "Небольшой проект должен объяснять, как его запустить, какие данные он ожидает и как проверить результат. Это полезнее обещания «готово для production». Здесь практическая работа ограничена чтением TOML-настройки и набором проверок чистой функции. Внешние команды Git и venv остаются отдельными действиями на локальной машине. Браузер честно проверяет только Python-часть.",
            "Настройка timeout должна быть целым числом в объявленном диапазоне. bool в Python является подклассом int, поэтому isinstance(True,int) истинно. Если логическое значение недопустимо, проверь type(value) is int либо исключи bool отдельно. Значение по умолчанию относится к отсутствующему полю, а не ко всякому неправильному значению."
          ],
          "examples": [
            {
              "id": "tooling-project-example-1",
              "title": "Проверка стандартной библиотекой",
              "code": "import unittest\ncase=unittest.TestCase()\ncase.assertEqual(2+3,5)\ntry:\n    case.assertEqual(2+3,6)\nexcept AssertionError:\n    print(\"расхождение найдено\")",
              "output": "расхождение найдено",
              "explanation": "Первое сравнение успешно и молчит; второе выбрасывает настоящий AssertionError, который в демонстрации перехвачен."
            }
          ],
          "goal": "Объяснить: Небольшой проект должен объяснять, как его запустить, какие данные он ожидает и как проверить результат.",
          "prerequisites": [
            "tooling-git-review"
          ]
        },
        {
          "id": "tooling-project-step-2",
          "title": "Тест должен ловить ошибку",
          "paragraphs": [
            "Стандартный unittest предоставляет assertEqual, assertRaises и другие проверки. Метод assertEqual вызывает AssertionError при расхождении; сам он не делает код правильным. Хороший набор примеров включает обычный случай, пустой набор, отрицательные значения и границу контракта. Четыре запуска одной и той же ситуации с другими именами не дают четырёх новых навыков.",
            "В итоговой работе проверяющая функция получает другую функцию как аргумент. Она должна принять верную реализацию и обнаружить несколько характерных ошибок. Это небольшой настоящий тест поведения, без неустановленных пакетов. Полный запуск unittest discovery, CI, статическая типизация и релизная инфраструктура остаются дальнейшими темами; простая проверка здесь их не изображает."
          ],
          "examples": [
            {
              "id": "tooling-project-example-2",
              "title": "Неподходящий bool",
              "code": "print(isinstance(True,int))\nprint(type(True) is int)",
              "output": "True\nFalse",
              "explanation": "Проверка конкретного типа отличает логическое значение от обычного целого, когда контракт требует именно int."
            }
          ],
          "goal": "Объяснить: Стандартный unittest предоставляет assertEqual, assertRaises и другие проверки.",
          "prerequisites": [
            "tooling-project-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "tooling-project-config",
          "kind": "code",
          "title": "Проверить timeout",
          "goal": "Разделить отсутствующее поле, неверный тип и недопустимую границу.",
          "prerequisites": [
            "tooling-project"
          ],
          "prompt": "Реализуй load_timeout(text): в корректном TOML прочитай tool.runner.timeout. Если поле отсутствует, верни 30. Если задано не int (bool тоже запрещён) или вне 1–120, выброси ValueError. Иначе верни число.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "Текст — корректный TOML до 2000 символов; tool и runner при наличии — таблицы.",
          "examples": [
            {
              "input": [
                "def inspect_config(fn,text):\n    try:\n        return [\"ok\",fn(text)]\n    except ValueError:\n        return [\"error\",None]\n",
                "inspect_config(load_timeout,\"\")"
              ],
              "output": "[\"ok\", 30]",
              "explanation": "Поле 1–120 принимается, отсутствие даёт 30, а bool, текст и внешние числа отвергаются. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "def inspect_config(fn,text):\n    try:\n        return [\"ok\",fn(text)]\n    except ValueError:\n        return [\"error\",None]\n",
                "inspect_config(load_timeout,'[tool.runner]\\ntimeout=\"30\"')"
              ],
              "output": "[\"error\", null]",
              "explanation": "Поле 1–120 принимается, отсутствие даёт 30, а bool, текст и внешние числа отвергаются. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "def inspect_config(fn,text):\n    try:\n        return [\"ok\",fn(text)]\n    except ValueError:\n        return [\"error\",None]\n",
              "expression": "inspect_config(load_timeout,\"\")",
              "expectedValue": [
                "ok",
                30
              ],
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "def inspect_config(fn,text):\n    try:\n        return [\"ok\",fn(text)]\n    except ValueError:\n        return [\"error\",None]\n",
              "expression": "inspect_config(load_timeout,'[tool.runner]\\ntimeout=1')",
              "expectedValue": [
                "ok",
                1
              ],
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "def inspect_config(fn,text):\n    try:\n        return [\"ok\",fn(text)]\n    except ValueError:\n        return [\"error\",None]\n",
              "expression": "inspect_config(load_timeout,'[tool.runner]\\ntimeout=120')",
              "expectedValue": [
                "ok",
                120
              ],
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            },
            {
              "setup": "def inspect_config(fn,text):\n    try:\n        return [\"ok\",fn(text)]\n    except ValueError:\n        return [\"error\",None]\n",
              "expression": "inspect_config(load_timeout,'[tool.runner]\\ntimeout=0')",
              "expectedValue": [
                "error",
                null
              ],
              "expectedOutput": "",
              "description": "Набор данных 4: результат и изменения базы"
            },
            {
              "setup": "def inspect_config(fn,text):\n    try:\n        return [\"ok\",fn(text)]\n    except ValueError:\n        return [\"error\",None]\n",
              "expression": "inspect_config(load_timeout,'[tool.runner]\\ntimeout=121')",
              "expectedValue": [
                "error",
                null
              ],
              "expectedOutput": "",
              "description": "Набор данных 5: результат и изменения базы"
            },
            {
              "setup": "def inspect_config(fn,text):\n    try:\n        return [\"ok\",fn(text)]\n    except ValueError:\n        return [\"error\",None]\n",
              "expression": "inspect_config(load_timeout,'[tool.runner]\\ntimeout=true')",
              "expectedValue": [
                "error",
                null
              ],
              "expectedOutput": "",
              "description": "Набор данных 6: результат и изменения базы"
            },
            {
              "setup": "def inspect_config(fn,text):\n    try:\n        return [\"ok\",fn(text)]\n    except ValueError:\n        return [\"error\",None]\n",
              "expression": "inspect_config(load_timeout,'[tool.runner]\\ntimeout=\"30\"')",
              "expectedValue": [
                "error",
                null
              ],
              "expectedOutput": "",
              "description": "Набор данных 7: результат и изменения базы"
            }
          ],
          "reference": "import tomllib\ndef load_timeout(text):\n    value=tomllib.loads(text).get(\"tool\",{}).get(\"runner\",{}).get(\"timeout\",30)\n    if type(value) is not int or not 1<=value<=120:\n        raise ValueError(\"timeout\")\n    return value",
          "alternative": "import tomllib\ndef load_timeout(text):\n    data=tomllib.loads(text)\n    runner=data.get(\"tool\",{}).get(\"runner\",{})\n    if \"timeout\" not in runner:\n        return 30\n    timeout=runner[\"timeout\"]\n    if isinstance(timeout,bool) or not isinstance(timeout,int):\n        raise ValueError(\"timeout\")\n    if timeout<1 or timeout>120:\n        raise ValueError(\"timeout\")\n    return timeout",
          "wrongSolutions": [
            {
              "code": "import tomllib\ndef load_timeout(text):\n    value=tomllib.loads(text).get(\"tool\",{}).get(\"runner\",{}).get(\"timeout\",30)\n    if not isinstance(value,int) or not 1<=value<=120:\n        raise ValueError(\"timeout\")\n    return value",
              "why": "isinstance принимает True как int, хотя контракт запрещает bool."
            },
            {
              "code": "import tomllib\ndef load_timeout(text):\n    value=tomllib.loads(text).get(\"tool\",{}).get(\"runner\",{}).get(\"timeout\",30)\n    if type(value) is not int or not 0<=value<=120:\n        raise ValueError(\"timeout\")\n    return value",
              "why": "Ноль ошибочно разрешён."
            }
          ],
          "hints": [
            "Сначала прочитай структуру TOML.",
            "Значение по умолчанию только при отсутствии ключа.",
            "Проверь точный int и обе включённые границы; иначе raise ValueError."
          ],
          "solutionExplanation": [
            "Поле 1–120 принимается, отсутствие даёт 30, а bool, текст и внешние числа отвергаются."
          ],
          "required": true
        },
        {
          "id": "tooling-project-tests",
          "kind": "code",
          "title": "Тесты, которые отличают ошибку",
          "goal": "Составить наблюдаемые проверки, а не просто вызвать решение.",
          "prerequisites": [
            "tooling-project"
          ],
          "prompt": "Реализуй check_total(fn): с помощью unittest.TestCase().assertEqual проверь функцию суммы на []→0, [3,-5,2]→0, [10]→10, [1,2,3]→6. При ошибке не перехватывай AssertionError. При успехе ничего не возвращай.",
          "inputFormat": "Аргументы функции заданы контрактом; input() не используется. В примере сначала показана подготовка данных, затем выражение вызова и наблюдения результата.",
          "outputFormat": "Верни результат объявленного типа. Не печатай отладочные сообщения и не закрывай переданное соединение. В примерах изменяющих функций результат проверки включает состояние данных после вызова.",
          "constraints": "fn принимает список int и должна возвращать int. Тестируется только объявленный контракт, без внешних библиотек.",
          "examples": [
            {
              "input": [
                "import unittest\ndef check_outcome(checker,fn):\n    try:\n        checker(fn)\n        return \"passed\"\n    except AssertionError:\n        return \"failed\"\n",
                "check_outcome(check_total,lambda values:sum(values))"
              ],
              "output": "\"passed\"",
              "explanation": "Верная функция проходит, а три разных неправильных реализации вызывают AssertionError. Это проверка теста на характерных дефектах. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            },
            {
              "input": [
                "import unittest\ndef check_outcome(checker,fn):\n    try:\n        checker(fn)\n        return \"passed\"\n    except AssertionError:\n        return \"failed\"\n",
                "check_outcome(check_total,lambda values:6)"
              ],
              "output": "\"failed\"",
              "explanation": "Верная функция проходит, а три разных неправильных реализации вызывают AssertionError. Это проверка теста на характерных дефектах. Входной блок показывает воспроизводимую подготовку и выражение проверки; результат не является stdout программы."
            }
          ],
          "initialCode": "# Реализуй функцию по контракту\n",
          "tests": [
            {
              "setup": "import unittest\ndef check_outcome(checker,fn):\n    try:\n        checker(fn)\n        return \"passed\"\n    except AssertionError:\n        return \"failed\"\n",
              "expression": "check_outcome(check_total,lambda values:sum(values))",
              "expectedValue": "passed",
              "expectedOutput": "",
              "description": "Набор данных 1: результат и изменения базы"
            },
            {
              "setup": "import unittest\ndef check_outcome(checker,fn):\n    try:\n        checker(fn)\n        return \"passed\"\n    except AssertionError:\n        return \"failed\"\n",
              "expression": "check_outcome(check_total,lambda values:sum(x for x in values if x>0))",
              "expectedValue": "failed",
              "expectedOutput": "",
              "description": "Набор данных 2: результат и изменения базы"
            },
            {
              "setup": "import unittest\ndef check_outcome(checker,fn):\n    try:\n        checker(fn)\n        return \"passed\"\n    except AssertionError:\n        return \"failed\"\n",
              "expression": "check_outcome(check_total,lambda values:sum(values) if values else None)",
              "expectedValue": "failed",
              "expectedOutput": "",
              "description": "Набор данных 3: результат и изменения базы"
            },
            {
              "setup": "import unittest\ndef check_outcome(checker,fn):\n    try:\n        checker(fn)\n        return \"passed\"\n    except AssertionError:\n        return \"failed\"\n",
              "expression": "check_outcome(check_total,lambda values:6)",
              "expectedValue": "failed",
              "expectedOutput": "",
              "description": "Набор данных 4: результат и изменения базы"
            }
          ],
          "reference": "import unittest\ndef check_total(fn):\n    case=unittest.TestCase()\n    case.assertEqual(fn([]),0)\n    case.assertEqual(fn([3,-5,2]),0)\n    case.assertEqual(fn([10]),10)\n    case.assertEqual(fn([1,2,3]),6)",
          "alternative": "import unittest\ndef check_total(fn):\n    case=unittest.TestCase()\n    examples=[([],0),([3,-5,2],0),([10],10),([1,2,3],6)]\n    for values,expected in examples:\n        case.assertEqual(fn(values),expected)",
          "wrongSolutions": [
            {
              "code": "def check_total(fn):\n    fn([1,2,3])",
              "why": "Вызов без сравнения не проверяет ответ."
            },
            {
              "code": "import unittest\ndef check_total(fn):\n    unittest.TestCase().assertEqual(fn([1,2,3]),6)",
              "why": "Один положительный пример не ловит ошибку пустого набора и пропуск отрицательных значений."
            }
          ],
          "hints": [
            "Каждый ожидаемый результат сравни с fn(данные).",
            "Используй assertEqual, чтобы несовпадение стало ошибкой.",
            "Не перехватывай AssertionError внутри check_total: проверка должна её увидеть."
          ],
          "solutionExplanation": [
            "Верная функция проходит, а три разных неправильных реализации вызывают AssertionError. Это проверка теста на характерных дефектах."
          ],
          "required": true
        },
        {
          "id": "tooling-project-readme",
          "kind": "choice",
          "title": "Минимально полезный README",
          "goal": "Минимально полезный README",
          "prerequisites": [
            "tooling-project"
          ],
          "prompt": "Какие сведения нужны новичку, чтобы повторить запуск проекта?",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "Python 3.12; python main.py; python -m unittest",
              "explanation": "Аналог: короткая инструкция с реальными командами полезнее фразы «работает везде и всегда». Команды должны соответствовать файлам конкретного проекта."
            }
          ],
          "answer": [
            "1",
            "2",
            "4"
          ],
          "hints": [
            "Документ должен помочь выполнить действие.",
            "Рекламная оценка не заменяет команду.",
            "Нужны вход и способ проверки."
          ],
          "solutionExplanation": [
            "Версия среды, команды запуска и проверок, формат данных делают проект воспроизводимее."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "Требуемая версия Python и способ выбора окружения."
            },
            {
              "id": "2",
              "text": "Реальные команды запуска и проверки."
            },
            {
              "id": "3",
              "text": "Неподтверждённое обещание production-ready."
            },
            {
              "id": "4",
              "text": "Формат входных данных и пример результата."
            }
          ]
        },
        {
          "id": "tooling-project-ready-order",
          "kind": "order",
          "title": "Перед отправкой изменений",
          "goal": "Перед отправкой изменений",
          "prerequisites": [
            "tooling-project"
          ],
          "prompt": "Упорядочь финальную проверку учебного проекта.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "Тесты + просмотр + коммит",
              "explanation": "Аналог: успешный тест не замечает случайно добавленный .env, а diff сам не доказывает правильность вычисления. Нужны обе проверки."
            }
          ],
          "answer": [
            "3",
            "1",
            "4",
            "2"
          ],
          "hints": [
            "Сначала нужно убедиться в поведении кода.",
            "Затем просмотреть содержимое изменений и секреты.",
            "Коммит и push — разные последовательные действия."
          ],
          "solutionExplanation": [
            "Проверки → просмотр diff → подготовка и staged review → коммит и осознанная отправка."
          ],
          "required": true,
          "blocks": [
            {
              "id": "1",
              "text": "Просмотреть diff и список файлов, исключить секреты и случайные данные."
            },
            {
              "id": "2",
              "text": "Создать локальный коммит и отправить только в нужный репозиторий по разрешению."
            },
            {
              "id": "3",
              "text": "Выполнить проверки поведения и прочитать их результат."
            },
            {
              "id": "4",
              "text": "Подготовить выбранные файлы и проверить staged diff."
            }
          ]
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.12/tutorial/venv.html",
    "https://docs.python.org/3.12/library/pathlib.html",
    "https://docs.python.org/3.12/library/tomllib.html",
    "https://docs.python.org/3.12/library/unittest.html",
    "https://peps.python.org/pep-0008/",
    "https://packaging.python.org/en/latest/tutorials/installing-packages/",
    "https://git-scm.com/docs/git-add",
    "https://git-scm.com/docs/git-status",
    "https://git-scm.com/docs/git-diff",
    "https://git-scm.com/docs/git-switch",
    "https://git-scm.com/docs/gitignore"
  ]
};

export default module;
