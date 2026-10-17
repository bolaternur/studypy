import type { CourseModule } from '../types';
const content: CourseModule = {
  "id": "async-python",
  "title": "Асинхронный Python: первое знакомство",
  "track": "advanced",
  "depth": "Вводная последовательность",
  "goal": "Понимать coroutine, await, Task, ошибки и кооперативную отмену без обещаний производительности.",
  "prerequisites": [
    "functions",
    "debugging"
  ],
  "lessons": [
    {
      "id": "async-python-await",
      "title": "Корутина и await",
      "goal": "Получать результат async-функции и отличать его от объекта корутины.",
      "prerequisites": [],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "async-python-await-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Асинхронность позволяет программе ожидать готовности операции, оставляя возможность выполнять другую подготовленную работу. Она не делает обычную арифметику автоматически быстрее и не заменяет параллельные вычисления на нескольких ядрах. Для этой последовательности нужны функции, return, коллекции и обработка исключений. Это вводное знакомство с asyncio, а не курс сетевых сервисов.",
            "async def определяет функцию-корутину. Вызов такой функции создаёт объект корутины; её тело от одного вызова ещё не выполняется. await запускает ожидание результата этой корутины в текущей асинхронной задаче. Значение после return становится результатом await. Если явного return нет, результатом будет None, как у обычной функции. Печатать объект корутины вместо await бессмысленно: видимое представление содержит технические данные и не является вычисленным ответом.",
            "Строка import asyncio подключает стандартный модуль и делает его функции доступными через имя asyncio, например asyncio.sleep. Это встроенная библиотека Python, её не нужно устанавливать через pip. В браузерном worker сетевые и системные возможности ограничены; эта последовательность использует только локальные задачи и сигналы."
          ],
          "examples": [
            {
              "id": "async-python-await-example-1",
              "title": "Результат корутины",
              "code": "async def double(value):\n    return value * 2\nprint(await double(4))",
              "output": "8",
              "explanation": "return передаёт 8 ожидающему вызову. До await у нас был бы объект корутины, а не число."
            }
          ],
          "goal": "Получать результат async-функции и отличать его от объекта корутины.",
          "prerequisites": []
        },
        {
          "id": "async-python-await-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "В StudyPy Pyodide и общий раннер уже имеют работающий цикл событий и поддерживают await на верхнем уровне редактора. Поэтому примеры заканчиваются await main() либо print(await value()). В обычном отдельном .py-файле точкой входа обычно служит asyncio.run(main()); внутри уже работающего цикла такой вызов запрещён. Не копируй точку входа между средами без понимания этого различия.",
            "Сама запись async def не создаёт точку переключения. Корутина с одной арифметикой может завершиться, не уступив управление. await обозначает ожидание awaitable-объекта; нельзя ожидать обычное целое или результат обычной функции только ради модного синтаксиса. В упражнениях тест действительно вызывает функцию через await, а не ищет слова async и return в тексте."
          ],
          "examples": [
            {
              "id": "async-python-await-example-2",
              "title": "Без return",
              "code": "async def announce():\n    print(\"готово\")\nresult = await announce()\nprint(result)",
              "output": "готово\nNone",
              "explanation": "Сообщение попало в вывод, но результатом вызова остаётся None: print не заменяет return."
            },
            {
              "id": "async-python-await-example-3",
              "title": "Обычный код после ожидания",
              "code": "async def amount():\n    return 7\nvalue = await amount()\nprint(value + 1)",
              "output": "8",
              "explanation": "После await имя value хранит обычное целое; дальше к нему применяются знакомые операции."
            }
          ],
          "goal": "Получать результат async-функции и отличать его от объекта корутины.",
          "prerequisites": [
            "async-python-await-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "async-python-await-square",
          "kind": "code",
          "title": "Асинхронный квадрат",
          "goal": "Асинхронный квадрат",
          "prerequisites": [
            "async-python-await"
          ],
          "prompt": "Реализуй async-функцию square(n), возвращающую квадрат целого. Не печатай внутри функции: верни результат. Вызов await square(n); результат int.",
          "inputFormat": "Вызов await square(n); результат int.",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "Целый n от −1000 до 1000, один await-вызов. Квадрат не больше 1000000; функция не печатает.",
          "examples": [
            {
              "input": [
                "await square(0)"
              ],
              "output": "0",
              "explanation": "Квадрат возвращается числом, await извлекает его из корутины."
            },
            {
              "input": [
                "await square(-3)"
              ],
              "output": "9",
              "explanation": "Квадрат возвращается числом, await извлекает его из корутины."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "expression": "await square(0)",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await square(0)"
            },
            {
              "expression": "await square(-3)",
              "expectedValue": 9,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await square(-3)"
            },
            {
              "expression": "await square(7)",
              "expectedValue": 49,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await square(7)"
            }
          ],
          "reference": "async def square(n):\n    return n * n",
          "alternative": "async def square(n):\n    return n ** 2",
          "wrongSolutions": [
            {
              "code": "def square(n):\n    return n * n",
              "why": "Обычное def возвращает не awaitable и не соответствует контракту."
            },
            {
              "code": "async def square(n):\n    print(n * n)",
              "why": "Печать оставляет результат None и создаёт лишний вывод."
            }
          ],
          "hints": [
            "Нужна async def с одним параметром.",
            "await получает значение return, а не текст print.",
            "Умножение n на n корректно и при отрицательном входе."
          ],
          "solutionExplanation": [
            "Квадрат возвращается числом, await извлекает его из корутины.",
            "Обычное def возвращает не awaitable и не соответствует контракту.",
            "Печать оставляет результат None и создаёт лишний вывод."
          ],
          "required": true
        },
        {
          "id": "async-python-await-greeting",
          "kind": "code",
          "title": "Результат с параметром",
          "goal": "Результат с параметром",
          "prerequisites": [
            "async-python-await"
          ],
          "prompt": "Реализуй async greet(name), возвращающую строку «Привет, NAME!» без очистки или смены регистра. Не печатай внутри функции: верни результат. await greet(name); name — строка, результат str.",
          "inputFormat": "await greet(name); name — строка, результат str.",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "name — строка 0…80 символов; результат не длиннее 90. Без сети и задержек.",
          "examples": [
            {
              "input": [
                "await greet(\"Аня\")"
              ],
              "output": "'Привет, Аня!'",
              "explanation": "Возвращаемая строка сохраняет точное переданное имя."
            },
            {
              "input": [
                "await greet(\"\")"
              ],
              "output": "'Привет, !'",
              "explanation": "Возвращаемая строка сохраняет точное переданное имя."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "expression": "await greet(\"Аня\")",
              "expectedValue": "Привет, Аня!",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await greet(\"Аня\")"
            },
            {
              "expression": "await greet(\"\")",
              "expectedValue": "Привет, !",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await greet(\"\")"
            },
            {
              "expression": "await greet(\"Py\")",
              "expectedValue": "Привет, Py!",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await greet(\"Py\")"
            }
          ],
          "reference": "async def greet(name):\n    return f\"Привет, {name}!\"",
          "alternative": "async def greet(name):\n    return \"Привет, \" + name + \"!\"",
          "wrongSolutions": [
            {
              "code": "async def greet(name):\n    print(f\"Привет, {name}!\")",
              "why": "Печать не возвращает строку."
            },
            {
              "code": "async def greet(name):\n    return \"Привет, Аня!\"",
              "why": "Фиксированное имя не использует аргумент."
            }
          ],
          "hints": [
            "Результат — одна строка.",
            "Подставляй аргумент в f-строку.",
            "Пустое имя тоже имеет определённый результат по формату."
          ],
          "solutionExplanation": [
            "Возвращаемая строка сохраняет точное переданное имя.",
            "Печать не возвращает строку.",
            "Фиксированное имя не использует аргумент."
          ],
          "required": true
        },
        {
          "id": "async-python-await-compose",
          "kind": "code",
          "title": "Композиция ожидаемых вызовов",
          "goal": "Композиция ожидаемых вызовов",
          "prerequisites": [
            "async-python-await"
          ],
          "prompt": "Реализуй async increase(n), возвращающую n+1, и async twice_increase(n), ожидающую increase два раза последовательно. Не печатай внутри функции: верни результат. await twice_increase(n); результат int.",
          "inputFormat": "await twice_increase(n); результат int.",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "n — целое от −1000 до 1000; два зависимых ожидаемых увеличения, итог n+2. Без сети.",
          "examples": [
            {
              "input": [
                "await twice_increase(0)"
              ],
              "output": "2",
              "explanation": "Зависимые операции ожидаются по порядку: второй вход зависит от первого результата."
            },
            {
              "input": [
                "await twice_increase(-2)"
              ],
              "output": "0",
              "explanation": "Зависимые операции ожидаются по порядку: второй вход зависит от первого результата."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "expression": "await twice_increase(0)",
              "expectedValue": 2,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await twice_increase(0)"
            },
            {
              "expression": "await twice_increase(-2)",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await twice_increase(-2)"
            },
            {
              "expression": "await twice_increase(10)",
              "expectedValue": 12,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await twice_increase(10)"
            }
          ],
          "reference": "async def increase(n):\n    return n + 1\nasync def twice_increase(n):\n    first = await increase(n)\n    return await increase(first)",
          "alternative": "async def increase(n):\n    return n + 1\nasync def twice_increase(n):\n    return await increase(await increase(n))",
          "wrongSolutions": [
            {
              "code": "async def increase(n):\n    return n + 1\nasync def twice_increase(n):\n    return increase(increase(n))",
              "why": "Вложенные объекты корутин не являются результатами вычисления."
            },
            {
              "code": "async def increase(n):\n    return n + 1\nasync def twice_increase(n):\n    return await increase(n)",
              "why": "Выполнено только одно увеличение."
            }
          ],
          "hints": [
            "Первый await даёт аргумент для следующего вызова.",
            "Не передавай неисполненную корутину вместо числа.",
            "Верни результат второго ожидаемого увеличения."
          ],
          "solutionExplanation": [
            "Зависимые операции ожидаются по порядку: второй вход зависит от первого результата.",
            "Вложенные объекты корутин не являются результатами вычисления.",
            "Выполнено только одно увеличение."
          ],
          "required": true
        },
        {
          "id": "async-python-await-call",
          "kind": "choice",
          "title": "Вызов ещё не выполнение",
          "goal": "Вызов ещё не выполнение",
          "prerequisites": [
            "async-python-await"
          ],
          "prompt": "Какие утверждения верны?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "async def amount():",
                "    return 7",
                "value = await amount()",
                "print(value + 1)"
              ],
              "output": "8",
              "explanation": "Разобранный пример по этой идее: После await имя value хранит обычное целое; дальше к нему применяются знакомые операции. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Асинхронный синтаксис описывает ожидание и управление выполнением; производительность зависит от задачи."
          ],
          "required": true,
          "answer": [
            "1",
            "2"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Вызов async-функции создаёт объект корутины."
            },
            {
              "id": "2",
              "text": "await получает результат return."
            },
            {
              "id": "3",
              "text": "Любое async def автоматически ускоряет вычисления."
            }
          ]
        }
      ]
    },
    {
      "id": "async-python-cooperate",
      "title": "Последовательность и передача управления",
      "goal": "Отличать последовательное ожидание от совместного планирования.",
      "prerequisites": [
        "async-python-await"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "async-python-cooperate-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Два await подряд задают зависимую последовательность: первая операция завершается, затем начинается вторая. Для такой логики не нужны отдельные Task. Это правильный выбор, если следующий шаг использует результат предыдущего. Асинхронный код всё ещё имеет понятный порядок внутри одной задачи; остановка на обычной ошибке не называется «синхронным выполнением».",
            "asyncio.sleep(delay) приостанавливает текущую задачу, не блокируя весь цикл событий. При delay = 0 он уступает управление уже готовой работе, не создавая учебного ожидания на секунды. В тестах используем только sleep(0), поэтому ученика не удерживает таймер. Настоящий результат проверяется значениями и состоянием, а не тем, сколько миллисекунд прошло на конкретном устройстве."
          ],
          "examples": [
            {
              "id": "async-python-cooperate-example-1",
              "title": "Порядок двух ожиданий",
              "code": "import asyncio\nasync def mark(text):\n    await asyncio.sleep(0)\n    return text\nfirst = await mark(\"A\")\nsecond = await mark(\"B\")\nprint(first + second)",
              "output": "AB",
              "explanation": "Вторая корутина начинается после первой; вывод не зависит от скорости устройства."
            }
          ],
          "goal": "Отличать последовательное ожидание от совместного планирования.",
          "prerequisites": [
            "async-python-await"
          ]
        },
        {
          "id": "async-python-cooperate-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "await не обещает переключение на другую задачу при каждом вызове: если ожидаемая операция готова, выполнение может продолжиться сразу. Не строй правильность алгоритма на случайном чередовании строк. Общие изменяемые значения требуют отдельного понимания последовательности чтения и записи. В этом уроке обработка специально последовательная, чтобы вход i однозначно соответствовал результату i.",
            "time.sleep в браузерном Python блокировал бы текущий поток исполнения и не является асинхронной паузой. Бесконечные вычисления без await не дают asyncio переключиться; общий worker можно остановить, но это защита интерфейса, а не исправление программы. Сначала выбирай корректный алгоритм, затем подходящий способ ожидания. В заданиях состояние передаётся явно через аргументы, чтобы не скрывать его в глобальных переменных."
          ],
          "examples": [
            {
              "id": "async-python-cooperate-example-2",
              "title": "Последовательная сборка",
              "code": "import asyncio\nasync def step(value):\n    await asyncio.sleep(0)\n    return value + 2\nvalue = 1\nfor i in range(3):\n    value = await step(value)\nprint(value)",
              "output": "7",
              "explanation": "Новая итерация использует результат прошлой: 1 → 3 → 5 → 7."
            },
            {
              "id": "async-python-cooperate-example-3",
              "title": "Пауза не меняет данные",
              "code": "import asyncio\nasync def keep(value):\n    await asyncio.sleep(0)\n    return value\nprint(await keep(5))",
              "output": "5",
              "explanation": "Передача управления сама по себе не изменяет параметр и не создаёт новый результат."
            }
          ],
          "goal": "Отличать последовательное ожидание от совместного планирования.",
          "prerequisites": [
            "async-python-cooperate-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "async-python-cooperate-running",
          "kind": "code",
          "title": "Последовательные итоги",
          "goal": "Последовательные итоги",
          "prerequisites": [
            "async-python-cooperate"
          ],
          "prompt": "Реализуй async running(values,checkpoint). Верни накопленные суммы; перед обработкой каждого x ровно один раз дождись переданной async-функции checkpoint(x). Вызов без await не выполняет её действие. Функция ничего не печатает.",
          "inputFormat": "await running(list[int], async checkpoint(value)); до 50 элементов.",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "До 50 целых от −1000 до 1000. checkpoint — переданная конечная async-функция с sleep(0), один ожидаемый вызов на элемент. Суммы по модулю до 50000.",
          "examples": [
            {
              "input": [
                "import asyncio\nasync def _course_check(fn,values):\n    calls=[]\n    async def checkpoint(value):\n        await asyncio.sleep(0)\n        calls.append(value)\n    result=await fn(values,checkpoint)\n    return [result,calls]\n",
                "await _course_check(running,[])"
              ],
              "output": "[[], []]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Проверка наблюдает и накопленные суммы, и действия реально выполненных checkpoint; значения одни не доказывают ожидание. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            },
            {
              "input": [
                "import asyncio\nasync def _course_check(fn,values):\n    calls=[]\n    async def checkpoint(value):\n        await asyncio.sleep(0)\n        calls.append(value)\n    result=await fn(values,checkpoint)\n    return [result,calls]\n",
                "await _course_check(running,[3,-1,4])"
              ],
              "output": "[[3, 2, 6], [3, -1, 4]]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Проверка наблюдает и накопленные суммы, и действия реально выполненных checkpoint; значения одни не доказывают ожидание. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "setup": "import asyncio\nasync def _course_check(fn,values):\n    calls=[]\n    async def checkpoint(value):\n        await asyncio.sleep(0)\n        calls.append(value)\n    result=await fn(values,checkpoint)\n    return [result,calls]\n",
              "expression": "await _course_check(running,[])",
              "expectedValue": [
                [],
                []
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(running,[])"
            },
            {
              "setup": "import asyncio\nasync def _course_check(fn,values):\n    calls=[]\n    async def checkpoint(value):\n        await asyncio.sleep(0)\n        calls.append(value)\n    result=await fn(values,checkpoint)\n    return [result,calls]\n",
              "expression": "await _course_check(running,[3,-1,4])",
              "expectedValue": [
                [
                  3,
                  2,
                  6
                ],
                [
                  3,
                  -1,
                  4
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(running,[3,-1,4])"
            },
            {
              "setup": "import asyncio\nasync def _course_check(fn,values):\n    calls=[]\n    async def checkpoint(value):\n        await asyncio.sleep(0)\n        calls.append(value)\n    result=await fn(values,checkpoint)\n    return [result,calls]\n",
              "expression": "await _course_check(running,[0])",
              "expectedValue": [
                [
                  0
                ],
                [
                  0
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(running,[0])"
            }
          ],
          "reference": "async def running(values,checkpoint):\n    result=[]\n    total=0\n    for x in values:\n        await checkpoint(x)\n        total+=x\n        result.append(total)\n    return result",
          "alternative": "async def running(values,checkpoint):\n    result=[]\n    for i,x in enumerate(values):\n        await checkpoint(x)\n        result.append(sum(values[:i+1]))\n    return result",
          "wrongSolutions": [
            {
              "code": "async def running(values,checkpoint):\n    return [sum(values[:i+1]) for i in range(len(values))]",
              "why": "Правильные числа не заменяют ожидаемые checkpoint-вызовы."
            },
            {
              "code": "async def running(values,checkpoint):\n    result=[]\n    total=0\n    for x in values:\n        checkpoint(x)\n        total+=x\n        result.append(total)\n    return result",
              "why": "Без await тело checkpoint не выполняется."
            }
          ],
          "hints": [
            "Ожидай переданную корутину для каждого входного элемента.",
            "Порядок checkpoint совпадает с исходным списком.",
            "Только после ожидания обновляй сумму и сохраняй её."
          ],
          "solutionExplanation": [
            "Проверка наблюдает и накопленные суммы, и действия реально выполненных checkpoint; значения одни не доказывают ожидание.",
            "Правильные числа не заменяют ожидаемые checkpoint-вызовы.",
            "Без await тело checkpoint не выполняется."
          ],
          "required": true
        },
        {
          "id": "async-python-cooperate-factorial",
          "kind": "code",
          "title": "Ожидаемые шаги произведения",
          "goal": "Ожидаемые шаги произведения",
          "prerequisites": [
            "async-python-cooperate"
          ],
          "prompt": "Реализуй async factorial(n,checkpoint): верни n! и перед каждым множителем 1…n один раз дождись checkpoint(factor). Для n=0 checkpoint не вызывается. Функция ничего не печатает.",
          "inputFormat": "await factorial(n,async checkpoint(factor)); 0≤n≤10.",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "0 ≤ n ≤ 10. checkpoint — переданная async-функция с sleep(0), ожидается для множителей 1…n по порядку. Не больше 10 вызовов.",
          "examples": [
            {
              "input": [
                "import asyncio\nasync def _course_check(fn,n):\n    calls=[]\n    async def checkpoint(value):\n        await asyncio.sleep(0)\n        calls.append(value)\n    result=await fn(n,checkpoint)\n    return [result,calls]\n",
                "await _course_check(factorial,0)"
              ],
              "output": "[1, []]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Алгоритм и протокол ожидания проверяются отдельно: результат и журнал множителей должны совпасть. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            },
            {
              "input": [
                "import asyncio\nasync def _course_check(fn,n):\n    calls=[]\n    async def checkpoint(value):\n        await asyncio.sleep(0)\n        calls.append(value)\n    result=await fn(n,checkpoint)\n    return [result,calls]\n",
                "await _course_check(factorial,5)"
              ],
              "output": "[120, [1, 2, 3, 4, 5]]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Алгоритм и протокол ожидания проверяются отдельно: результат и журнал множителей должны совпасть. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "setup": "import asyncio\nasync def _course_check(fn,n):\n    calls=[]\n    async def checkpoint(value):\n        await asyncio.sleep(0)\n        calls.append(value)\n    result=await fn(n,checkpoint)\n    return [result,calls]\n",
              "expression": "await _course_check(factorial,0)",
              "expectedValue": [
                1,
                []
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(factorial,0)"
            },
            {
              "setup": "import asyncio\nasync def _course_check(fn,n):\n    calls=[]\n    async def checkpoint(value):\n        await asyncio.sleep(0)\n        calls.append(value)\n    result=await fn(n,checkpoint)\n    return [result,calls]\n",
              "expression": "await _course_check(factorial,1)",
              "expectedValue": [
                1,
                [
                  1
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(factorial,1)"
            },
            {
              "setup": "import asyncio\nasync def _course_check(fn,n):\n    calls=[]\n    async def checkpoint(value):\n        await asyncio.sleep(0)\n        calls.append(value)\n    result=await fn(n,checkpoint)\n    return [result,calls]\n",
              "expression": "await _course_check(factorial,5)",
              "expectedValue": [
                120,
                [
                  1,
                  2,
                  3,
                  4,
                  5
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(factorial,5)"
            }
          ],
          "reference": "async def factorial(n,checkpoint):\n    product=1\n    for factor in range(1,n+1):\n        await checkpoint(factor)\n        product*=factor\n    return product",
          "alternative": "async def factorial(n,checkpoint):\n    product=1\n    factor=1\n    while factor<=n:\n        await checkpoint(factor)\n        product=product*factor\n        factor+=1\n    return product",
          "wrongSolutions": [
            {
              "code": "async def factorial(n,checkpoint):\n    product=1\n    for factor in range(1,n+1):\n        product*=factor\n    return product",
              "why": "Наблюдаемая работа checkpoint отсутствует."
            },
            {
              "code": "async def factorial(n,checkpoint):\n    product=0\n    for factor in range(1,n+1):\n        await checkpoint(factor)\n        product*=factor\n    return product",
              "why": "Инициализация произведения нулём неверна."
            }
          ],
          "hints": [
            "Каждый множитель имеет свой ожидаемый checkpoint.",
            "При n=0 действий нет и результат 1.",
            "Порядок множителей от 1 до n, не в обратную сторону."
          ],
          "solutionExplanation": [
            "Алгоритм и протокол ожидания проверяются отдельно: результат и журнал множителей должны совпасть.",
            "Наблюдаемая работа checkpoint отсутствует.",
            "Инициализация произведения нулём неверна."
          ],
          "required": true
        },
        {
          "id": "async-python-cooperate-pipeline",
          "kind": "code",
          "title": "Последовательные преобразования",
          "goal": "Последовательные преобразования",
          "prerequisites": [
            "async-python-cooperate"
          ],
          "prompt": "Реализуй async normalize(text,clean): дождись переданной async-функции clean(text), затем переведи полученный текст в нижний регистр. clean может не только удалять пробелы, поэтому не подменяй её своим strip. Функция ничего не печатает.",
          "inputFormat": "await normalize(str,async clean(text)); результат str.",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "text до 1000 символов; переданная async clean возвращает строку до 1100, работает без сети и с sleep(0). Ровно один ожидаемый вызов clean, итог не длиннее 2200 Unicode-символов после lower.",
          "examples": [
            {
              "input": [
                "import asyncio\nasync def _course_check(fn,text,prefix):\n    calls=[]\n    async def clean(value):\n        await asyncio.sleep(0)\n        calls.append(value)\n        return prefix+value.strip()\n    result=await fn(text,clean)\n    return [result,calls]\n",
                "await _course_check(normalize,\"  Py  \",\"\")"
              ],
              "output": "['py', ['  Py  ']]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Разные реализации входной clean делают её реальный вызов наблюдаемым. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            },
            {
              "input": [
                "import asyncio\nasync def _course_check(fn,text,prefix):\n    calls=[]\n    async def clean(value):\n        await asyncio.sleep(0)\n        calls.append(value)\n        return prefix+value.strip()\n    result=await fn(text,clean)\n    return [result,calls]\n",
                "await _course_check(normalize,\" A B \",\"ID:\")"
              ],
              "output": "['id:a b', [' A B ']]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Разные реализации входной clean делают её реальный вызов наблюдаемым. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "setup": "import asyncio\nasync def _course_check(fn,text,prefix):\n    calls=[]\n    async def clean(value):\n        await asyncio.sleep(0)\n        calls.append(value)\n        return prefix+value.strip()\n    result=await fn(text,clean)\n    return [result,calls]\n",
              "expression": "await _course_check(normalize,\"  Py  \",\"\")",
              "expectedValue": [
                "py",
                [
                  "  Py  "
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(normalize,\"  Py  \",\"\")"
            },
            {
              "setup": "import asyncio\nasync def _course_check(fn,text,prefix):\n    calls=[]\n    async def clean(value):\n        await asyncio.sleep(0)\n        calls.append(value)\n        return prefix+value.strip()\n    result=await fn(text,clean)\n    return [result,calls]\n",
              "expression": "await _course_check(normalize,\" A B \",\"ID:\")",
              "expectedValue": [
                "id:a b",
                [
                  " A B "
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(normalize,\" A B \",\"ID:\")"
            },
            {
              "setup": "import asyncio\nasync def _course_check(fn,text,prefix):\n    calls=[]\n    async def clean(value):\n        await asyncio.sleep(0)\n        calls.append(value)\n        return prefix+value.strip()\n    result=await fn(text,clean)\n    return [result,calls]\n",
              "expression": "await _course_check(normalize,\"\",\"\")",
              "expectedValue": [
                "",
                [
                  ""
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(normalize,\"\",\"\")"
            }
          ],
          "reference": "async def normalize(text,clean):\n    result=await clean(text)\n    return result.lower()",
          "alternative": "async def normalize(text,clean):\n    return (await clean(text)).lower()",
          "wrongSolutions": [
            {
              "code": "async def normalize(text,clean):\n    return text.strip().lower()",
              "why": "Собственный strip игнорирует переданное действие и его результат."
            },
            {
              "code": "async def normalize(text,clean):\n    return clean(text).lower()",
              "why": "Без await объект корутины ещё не является строкой."
            }
          ],
          "hints": [
            "Предоставленная clean — часть входного контракта.",
            "Дождись её результата перед lower.",
            "Ожидание должно быть одно на вызов normalize."
          ],
          "solutionExplanation": [
            "Разные реализации входной clean делают её реальный вызов наблюдаемым.",
            "Собственный strip игнорирует переданное действие и его результат.",
            "Без await объект корутины ещё не является строкой."
          ],
          "required": true
        },
        {
          "id": "async-python-cooperate-sleep",
          "kind": "choice",
          "title": "Какая пауза уступает управление?",
          "goal": "Какая пауза уступает управление?",
          "prerequisites": [
            "async-python-cooperate"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "import asyncio",
                "async def keep(value):",
                "    await asyncio.sleep(0)",
                "    return value",
                "print(await keep(5))"
              ],
              "output": "5",
              "explanation": "Разобранный пример по этой идее: Передача управления сама по себе не изменяет параметр и не создаёт новый результат. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Проверяй наблюдаемое состояние и результаты, а не нестабильные замеры времени."
          ],
          "required": true,
          "answer": [
            "1",
            "2"
          ],
          "choices": [
            {
              "id": "1",
              "text": "await asyncio.sleep(0) может дать поработать другим готовым задачам."
            },
            {
              "id": "2",
              "text": "time.sleep делает обычное блокирующее ожидание."
            },
            {
              "id": "3",
              "text": "Точное число миллисекунд — надёжная проверка правильности асинхронного кода."
            }
          ]
        }
      ]
    },
    {
      "id": "async-python-tasks",
      "title": "Task и gather",
      "goal": "Планировать независимые корутины и сохранять порядок результатов.",
      "prerequisites": [
        "async-python-cooperate"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "async-python-tasks-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Task — объект запланированного выполнения корутины. asyncio.create_task(coro()) создаёт задачу и возвращает ссылку на неё. Позже await task получает её результат. Сохраняй ссылки на созданные задачи и дожидайся их завершения: забытая фоновая работа усложняет ошибки, отмену и очистку ресурсов. Одно создание Task не заменяет получение результата.",
            "asyncio.gather объединяет несколько awaitable-объектов. Он планирует переданные корутины и возвращает список результатов в порядке аргументов, а не в порядке фактического завершения. Поэтому список запросов можно сопоставить с результатами по позиции. Нельзя путать конкурентное ожидание с несколькими вычислительными потоками: asyncio в одном цикле событий переключает готовые задачи во время ожиданий."
          ],
          "examples": [
            {
              "id": "async-python-tasks-example-1",
              "title": "Результаты в порядке входа",
              "code": "import asyncio\nasync def label(n):\n    await asyncio.sleep(0)\n    return f\"номер {n}\"\nprint(await asyncio.gather(label(3), label(1)))",
              "output": "['номер 3', 'номер 1']",
              "explanation": "Список относится к аргументам 3 и 1 в этом порядке."
            }
          ],
          "goal": "Планировать независимые корутины и сохранять порядок результатов.",
          "prerequisites": [
            "async-python-cooperate"
          ]
        },
        {
          "id": "async-python-tasks-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Для коллекции операций tasks = [worker(x) for x in values] создаёт корутины, а await asyncio.gather(*tasks) ожидает их вместе. Звёздочка передаёт элементы списка отдельными аргументами. При пустом списке результат gather пуст. Если создание и ожидание каждой корутины стоят подряд в одном цикле, обработка будет последовательной, хотя полученные значения могут совпасть с конкурентным вариантом.",
            "Мы не оцениваем решение по скорости и не обещаем ускорение вычисления квадратов. Учебные функции лишь имитируют независимые операции через sleep(0), без сети. Тест результата может доказать корректный контракт функции, но не степень фактического перекрытия ожиданий. Для проверки планирования ниже есть специальная задача с Event; обычное совпадение списка ответов не называется доказательством конкурентности.",
            "В самостоятельных задачах worker, total/count и first/second передаются проверкой как настоящие async-функции. Они отмечают старт и ждут Event-барьер. Последовательная подмена арифметикой не выполняет их наблюдаемые действия, а последовательное ожидание первой до старта второй застрянет. gather или заранее созданные Task запускают обе стороны протокола. Тест освобождает созданные задачи в finally; тексты проверок доступны в браузере и не являются секретными."
          ],
          "examples": [
            {
              "id": "async-python-tasks-example-2",
              "title": "Сохранённая задача",
              "code": "import asyncio\nasync def amount():\n    await asyncio.sleep(0)\n    return 7\ntask = asyncio.create_task(amount())\nprint(await task)",
              "output": "7",
              "explanation": "Ссылка task позволяет дождаться завершения и получить значение."
            },
            {
              "id": "async-python-tasks-example-3",
              "title": "Пустой пакет",
              "code": "import asyncio\nprint(await asyncio.gather(*[]))",
              "output": "[]",
              "explanation": "Независимых операций нет, поэтому результат — пустой список без специального исключения."
            }
          ],
          "goal": "Планировать независимые корутины и сохранять порядок результатов.",
          "prerequisites": [
            "async-python-tasks-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "async-python-tasks-batch",
          "kind": "code",
          "title": "Пакет квадратов",
          "goal": "Пакет квадратов",
          "prerequisites": [
            "async-python-tasks"
          ],
          "prompt": "Реализуй async batch(values,worker), которая запускает переданную корутину worker(x) для каждого x и дожидается всех результатов в исходном порядке. Операции могут ждать старта друг друга: последовательное ожидание здесь не подходит. Функция ничего не печатает.",
          "inputFormat": "await batch(list[int],async worker(x)); до 50 независимых операций.",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "Не больше 50 входных чисел по модулю до 1000 и 50 переданных конечных корутин. Они могут ждать общего Event-барьера; должны быть запланированы совместно. Никаких долгих задержек и сети. Все запущенные Task завершаются до return; тестовые Task очищаются в finally.",
          "examples": [
            {
              "input": [
                "import asyncio\nasync def _course_check(fn,values):\n    calls=[]\n    workers=[]\n    gate=asyncio.Event()\n    async def worker(x):\n        workers.append(asyncio.current_task())\n        calls.append(x)\n        if len(calls)==len(values):\n            gate.set()\n        await gate.wait()\n        return x*x\n    try:\n        result=await asyncio.wait_for(fn(values,worker),timeout=0.3)\n        return [result,sorted(calls),all(task.done() for task in workers)]\n    finally:\n        current=asyncio.current_task()\n        pending=[task for task in workers if task is not current and not task.done()]\n        for task in pending:\n            task.cancel()\n        if pending:\n            await asyncio.gather(*pending,return_exceptions=True)\n",
                "await _course_check(batch,[])"
              ],
              "output": "[[], [], True]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Event-барьер в проверке требует фактического старта всех рабочих корутин; журнал и завершение Task проверяются отдельно. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            },
            {
              "input": [
                "import asyncio\nasync def _course_check(fn,values):\n    calls=[]\n    workers=[]\n    gate=asyncio.Event()\n    async def worker(x):\n        workers.append(asyncio.current_task())\n        calls.append(x)\n        if len(calls)==len(values):\n            gate.set()\n        await gate.wait()\n        return x*x\n    try:\n        result=await asyncio.wait_for(fn(values,worker),timeout=0.3)\n        return [result,sorted(calls),all(task.done() for task in workers)]\n    finally:\n        current=asyncio.current_task()\n        pending=[task for task in workers if task is not current and not task.done()]\n        for task in pending:\n            task.cancel()\n        if pending:\n            await asyncio.gather(*pending,return_exceptions=True)\n",
                "await _course_check(batch,[3,1,-2])"
              ],
              "output": "[[9, 1, 4], [-2, 1, 3], True]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Event-барьер в проверке требует фактического старта всех рабочих корутин; журнал и завершение Task проверяются отдельно. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "setup": "import asyncio\nasync def _course_check(fn,values):\n    calls=[]\n    workers=[]\n    gate=asyncio.Event()\n    async def worker(x):\n        workers.append(asyncio.current_task())\n        calls.append(x)\n        if len(calls)==len(values):\n            gate.set()\n        await gate.wait()\n        return x*x\n    try:\n        result=await asyncio.wait_for(fn(values,worker),timeout=0.3)\n        return [result,sorted(calls),all(task.done() for task in workers)]\n    finally:\n        current=asyncio.current_task()\n        pending=[task for task in workers if task is not current and not task.done()]\n        for task in pending:\n            task.cancel()\n        if pending:\n            await asyncio.gather(*pending,return_exceptions=True)\n",
              "expression": "await _course_check(batch,[])",
              "expectedValue": [
                [],
                [],
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(batch,[])"
            },
            {
              "setup": "import asyncio\nasync def _course_check(fn,values):\n    calls=[]\n    workers=[]\n    gate=asyncio.Event()\n    async def worker(x):\n        workers.append(asyncio.current_task())\n        calls.append(x)\n        if len(calls)==len(values):\n            gate.set()\n        await gate.wait()\n        return x*x\n    try:\n        result=await asyncio.wait_for(fn(values,worker),timeout=0.3)\n        return [result,sorted(calls),all(task.done() for task in workers)]\n    finally:\n        current=asyncio.current_task()\n        pending=[task for task in workers if task is not current and not task.done()]\n        for task in pending:\n            task.cancel()\n        if pending:\n            await asyncio.gather(*pending,return_exceptions=True)\n",
              "expression": "await _course_check(batch,[3,1,-2])",
              "expectedValue": [
                [
                  9,
                  1,
                  4
                ],
                [
                  -2,
                  1,
                  3
                ],
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(batch,[3,1,-2])"
            },
            {
              "setup": "import asyncio\nasync def _course_check(fn,values):\n    calls=[]\n    workers=[]\n    gate=asyncio.Event()\n    async def worker(x):\n        workers.append(asyncio.current_task())\n        calls.append(x)\n        if len(calls)==len(values):\n            gate.set()\n        await gate.wait()\n        return x*x\n    try:\n        result=await asyncio.wait_for(fn(values,worker),timeout=0.3)\n        return [result,sorted(calls),all(task.done() for task in workers)]\n    finally:\n        current=asyncio.current_task()\n        pending=[task for task in workers if task is not current and not task.done()]\n        for task in pending:\n            task.cancel()\n        if pending:\n            await asyncio.gather(*pending,return_exceptions=True)\n",
              "expression": "await _course_check(batch,[0,5])",
              "expectedValue": [
                [
                  0,
                  25
                ],
                [
                  0,
                  5
                ],
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(batch,[0,5])"
            }
          ],
          "reference": "import asyncio\nasync def batch(values,worker):\n    return await asyncio.gather(*[worker(x) for x in values])",
          "alternative": "import asyncio\nasync def batch(values,worker):\n    tasks=[asyncio.create_task(worker(x)) for x in values]\n    return [await task for task in tasks]",
          "wrongSolutions": [
            {
              "code": "async def batch(values,worker):\n    return [x*x for x in values]",
              "why": "Совпавшие квадраты не доказывают выполнение переданных операций."
            },
            {
              "code": "import asyncio\nasync def batch(values,worker):\n    tasks=[asyncio.create_task(worker(x)) for x in values]\n    result=await asyncio.gather(*tasks)\n    return sorted(result)",
              "why": "Сортировка меняет порядок результатов относительно входа."
            },
            {
              "code": "async def batch(values,worker):\n    return [await worker(x) for x in values]",
              "why": "Последовательное ожидание не запускает вторую сторону Event-барьера. Проверка прекращает такую попытку по техническому deadline, всегда очищает задачи в finally и не засчитывает зависание."
            }
          ],
          "hints": [
            "Создай все Task до ожидания первой либо используй gather.",
            "worker передана вызывающим кодом, а не определяется заново.",
            "Верни результаты в порядке аргументов, без сортировки."
          ],
          "solutionExplanation": [
            "Event-барьер в проверке требует фактического старта всех рабочих корутин; журнал и завершение Task проверяются отдельно.",
            "Совпавшие квадраты не доказывают выполнение переданных операций.",
            "Сортировка меняет порядок результатов относительно входа."
          ],
          "required": true
        },
        {
          "id": "async-python-tasks-pair",
          "kind": "code",
          "title": "Две независимые характеристики",
          "goal": "Две независимые характеристики",
          "prerequisites": [
            "async-python-tasks"
          ],
          "prompt": "Реализуй async summary(values,total,count): обе переданные async-операции получают values, должны быть запланированы до ожидания результатов. Верни [результат total, результат count]. Функция ничего не печатает.",
          "inputFormat": "await summary(values,async total(values),async count(values)).",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "Не больше 50 входных чисел по модулю до 1000 и 50 переданных конечных корутин. Они могут ждать общего Event-барьера; должны быть запланированы совместно. Никаких долгих задержек и сети. Все запущенные Task завершаются до return; тестовые Task очищаются в finally.",
          "examples": [
            {
              "input": [
                "import asyncio\nasync def _course_check(fn,values):\n    calls=[]\n    workers=[]\n    gate=asyncio.Event()\n    async def total(items):\n        workers.append(asyncio.current_task())\n        calls.append(\"total\")\n        if len(calls)==2: gate.set()\n        await gate.wait()\n        return sum(items)\n    async def count(items):\n        workers.append(asyncio.current_task())\n        calls.append(\"count\")\n        if len(calls)==2: gate.set()\n        await gate.wait()\n        return len(items)\n    try:\n        result=await asyncio.wait_for(fn(values,total,count),timeout=0.3)\n        return [result,sorted(calls),all(task.done() for task in workers)]\n    finally:\n        current=asyncio.current_task()\n        pending=[task for task in workers if task is not current and not task.done()]\n        for task in pending: task.cancel()\n        if pending: await asyncio.gather(*pending,return_exceptions=True)\n",
                "await _course_check(summary,[])"
              ],
              "output": "[[0, 0], ['count', 'total'], True]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Барьер доказывает совместное планирование, а не просто совпадение двух чисел. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            },
            {
              "input": [
                "import asyncio\nasync def _course_check(fn,values):\n    calls=[]\n    workers=[]\n    gate=asyncio.Event()\n    async def total(items):\n        workers.append(asyncio.current_task())\n        calls.append(\"total\")\n        if len(calls)==2: gate.set()\n        await gate.wait()\n        return sum(items)\n    async def count(items):\n        workers.append(asyncio.current_task())\n        calls.append(\"count\")\n        if len(calls)==2: gate.set()\n        await gate.wait()\n        return len(items)\n    try:\n        result=await asyncio.wait_for(fn(values,total,count),timeout=0.3)\n        return [result,sorted(calls),all(task.done() for task in workers)]\n    finally:\n        current=asyncio.current_task()\n        pending=[task for task in workers if task is not current and not task.done()]\n        for task in pending: task.cancel()\n        if pending: await asyncio.gather(*pending,return_exceptions=True)\n",
                "await _course_check(summary,[2,-1,4])"
              ],
              "output": "[[5, 3], ['count', 'total'], True]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Барьер доказывает совместное планирование, а не просто совпадение двух чисел. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "setup": "import asyncio\nasync def _course_check(fn,values):\n    calls=[]\n    workers=[]\n    gate=asyncio.Event()\n    async def total(items):\n        workers.append(asyncio.current_task())\n        calls.append(\"total\")\n        if len(calls)==2: gate.set()\n        await gate.wait()\n        return sum(items)\n    async def count(items):\n        workers.append(asyncio.current_task())\n        calls.append(\"count\")\n        if len(calls)==2: gate.set()\n        await gate.wait()\n        return len(items)\n    try:\n        result=await asyncio.wait_for(fn(values,total,count),timeout=0.3)\n        return [result,sorted(calls),all(task.done() for task in workers)]\n    finally:\n        current=asyncio.current_task()\n        pending=[task for task in workers if task is not current and not task.done()]\n        for task in pending: task.cancel()\n        if pending: await asyncio.gather(*pending,return_exceptions=True)\n",
              "expression": "await _course_check(summary,[])",
              "expectedValue": [
                [
                  0,
                  0
                ],
                [
                  "count",
                  "total"
                ],
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(summary,[])"
            },
            {
              "setup": "import asyncio\nasync def _course_check(fn,values):\n    calls=[]\n    workers=[]\n    gate=asyncio.Event()\n    async def total(items):\n        workers.append(asyncio.current_task())\n        calls.append(\"total\")\n        if len(calls)==2: gate.set()\n        await gate.wait()\n        return sum(items)\n    async def count(items):\n        workers.append(asyncio.current_task())\n        calls.append(\"count\")\n        if len(calls)==2: gate.set()\n        await gate.wait()\n        return len(items)\n    try:\n        result=await asyncio.wait_for(fn(values,total,count),timeout=0.3)\n        return [result,sorted(calls),all(task.done() for task in workers)]\n    finally:\n        current=asyncio.current_task()\n        pending=[task for task in workers if task is not current and not task.done()]\n        for task in pending: task.cancel()\n        if pending: await asyncio.gather(*pending,return_exceptions=True)\n",
              "expression": "await _course_check(summary,[2,-1,4])",
              "expectedValue": [
                [
                  5,
                  3
                ],
                [
                  "count",
                  "total"
                ],
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(summary,[2,-1,4])"
            },
            {
              "setup": "import asyncio\nasync def _course_check(fn,values):\n    calls=[]\n    workers=[]\n    gate=asyncio.Event()\n    async def total(items):\n        workers.append(asyncio.current_task())\n        calls.append(\"total\")\n        if len(calls)==2: gate.set()\n        await gate.wait()\n        return sum(items)\n    async def count(items):\n        workers.append(asyncio.current_task())\n        calls.append(\"count\")\n        if len(calls)==2: gate.set()\n        await gate.wait()\n        return len(items)\n    try:\n        result=await asyncio.wait_for(fn(values,total,count),timeout=0.3)\n        return [result,sorted(calls),all(task.done() for task in workers)]\n    finally:\n        current=asyncio.current_task()\n        pending=[task for task in workers if task is not current and not task.done()]\n        for task in pending: task.cancel()\n        if pending: await asyncio.gather(*pending,return_exceptions=True)\n",
              "expression": "await _course_check(summary,[0])",
              "expectedValue": [
                [
                  0,
                  1
                ],
                [
                  "count",
                  "total"
                ],
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(summary,[0])"
            }
          ],
          "reference": "import asyncio\nasync def summary(values,total,count):\n    return await asyncio.gather(total(values),count(values))",
          "alternative": "import asyncio\nasync def summary(values,total,count):\n    a=asyncio.create_task(total(values))\n    b=asyncio.create_task(count(values))\n    return [await a,await b]",
          "wrongSolutions": [
            {
              "code": "async def summary(values,total,count):\n    return [sum(values),len(values)]",
              "why": "Готовая арифметика не выполняет переданные операции."
            },
            {
              "code": "import asyncio\nasync def summary(values,total,count):\n    return await asyncio.gather(count(values),total(values))",
              "why": "Порядок полей перепутан."
            },
            {
              "code": "async def summary(values,total,count):\n    return [await total(values),await count(values)]",
              "why": "Последовательное ожидание не запускает вторую сторону Event-барьера. Проверка прекращает такую попытку по техническому deadline, всегда очищает задачи в finally и не засчитывает зависание."
            }
          ],
          "hints": [
            "Обе операции независимы по результатам, но могут ждать общего старта.",
            "Запланируй обе до первого ожидания.",
            "В ответе total находится перед count."
          ],
          "solutionExplanation": [
            "Барьер доказывает совместное планирование, а не просто совпадение двух чисел.",
            "Готовая арифметика не выполняет переданные операции.",
            "Порядок полей перепутан."
          ],
          "required": true
        },
        {
          "id": "async-python-tasks-meet",
          "kind": "code",
          "title": "Запланировать обе задачи до ожидания",
          "goal": "Запланировать обе задачи до ожидания",
          "prerequisites": [
            "async-python-tasks"
          ],
          "prompt": "Реализуй async meet(first,second). Это две переданные async-функции без аргументов; каждая может ожидать начала другой. Запланируй обе и верни их результаты [first_result,second_result] после завершения. Функция ничего не печатает.",
          "inputFormat": "await meet(async first(),async second()) → list из двух результатов.",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "Не больше 50 входных чисел по модулю до 1000 и 50 переданных конечных корутин. Они могут ждать общего Event-барьера; должны быть запланированы совместно. Никаких долгих задержек и сети. Все запущенные Task завершаются до return; тестовые Task очищаются в finally.",
          "examples": [
            {
              "input": [
                "import asyncio\nasync def _course_check(fn,left,right):\n    first_started=asyncio.Event()\n    second_started=asyncio.Event()\n    log=[]\n    workers=[]\n    async def first():\n        workers.append(asyncio.current_task())\n        log.append(\"first-start\")\n        first_started.set()\n        await second_started.wait()\n        log.append(\"first-end\")\n        return left\n    async def second():\n        workers.append(asyncio.current_task())\n        log.append(\"second-start\")\n        second_started.set()\n        await first_started.wait()\n        log.append(\"second-end\")\n        return right\n    try:\n        result=await asyncio.wait_for(fn(first,second),timeout=0.3)\n        return [result,sorted(log),all(task.done() for task in workers)]\n    finally:\n        current=asyncio.current_task()\n        pending=[task for task in workers if task is not current and not task.done()]\n        for task in pending: task.cancel()\n        if pending: await asyncio.gather(*pending,return_exceptions=True)\n",
                "await _course_check(meet,\"A\",\"B\")"
              ],
              "output": "[['A', 'B'], ['first-end', 'first-start', 'second-end', 'second-start'], True]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Проверяется журнал реальных операций, их завершение и разные возвращённые значения; готовый список уже не проходит. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            },
            {
              "input": [
                "import asyncio\nasync def _course_check(fn,left,right):\n    first_started=asyncio.Event()\n    second_started=asyncio.Event()\n    log=[]\n    workers=[]\n    async def first():\n        workers.append(asyncio.current_task())\n        log.append(\"first-start\")\n        first_started.set()\n        await second_started.wait()\n        log.append(\"first-end\")\n        return left\n    async def second():\n        workers.append(asyncio.current_task())\n        log.append(\"second-start\")\n        second_started.set()\n        await first_started.wait()\n        log.append(\"second-end\")\n        return right\n    try:\n        result=await asyncio.wait_for(fn(first,second),timeout=0.3)\n        return [result,sorted(log),all(task.done() for task in workers)]\n    finally:\n        current=asyncio.current_task()\n        pending=[task for task in workers if task is not current and not task.done()]\n        for task in pending: task.cancel()\n        if pending: await asyncio.gather(*pending,return_exceptions=True)\n",
                "await _course_check(meet,0,-2)"
              ],
              "output": "[[0, -2], ['first-end', 'first-start', 'second-end', 'second-start'], True]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Проверяется журнал реальных операций, их завершение и разные возвращённые значения; готовый список уже не проходит. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "setup": "import asyncio\nasync def _course_check(fn,left,right):\n    first_started=asyncio.Event()\n    second_started=asyncio.Event()\n    log=[]\n    workers=[]\n    async def first():\n        workers.append(asyncio.current_task())\n        log.append(\"first-start\")\n        first_started.set()\n        await second_started.wait()\n        log.append(\"first-end\")\n        return left\n    async def second():\n        workers.append(asyncio.current_task())\n        log.append(\"second-start\")\n        second_started.set()\n        await first_started.wait()\n        log.append(\"second-end\")\n        return right\n    try:\n        result=await asyncio.wait_for(fn(first,second),timeout=0.3)\n        return [result,sorted(log),all(task.done() for task in workers)]\n    finally:\n        current=asyncio.current_task()\n        pending=[task for task in workers if task is not current and not task.done()]\n        for task in pending: task.cancel()\n        if pending: await asyncio.gather(*pending,return_exceptions=True)\n",
              "expression": "await _course_check(meet,\"A\",\"B\")",
              "expectedValue": [
                [
                  "A",
                  "B"
                ],
                [
                  "first-end",
                  "first-start",
                  "second-end",
                  "second-start"
                ],
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(meet,\"A\",\"B\")"
            },
            {
              "setup": "import asyncio\nasync def _course_check(fn,left,right):\n    first_started=asyncio.Event()\n    second_started=asyncio.Event()\n    log=[]\n    workers=[]\n    async def first():\n        workers.append(asyncio.current_task())\n        log.append(\"first-start\")\n        first_started.set()\n        await second_started.wait()\n        log.append(\"first-end\")\n        return left\n    async def second():\n        workers.append(asyncio.current_task())\n        log.append(\"second-start\")\n        second_started.set()\n        await first_started.wait()\n        log.append(\"second-end\")\n        return right\n    try:\n        result=await asyncio.wait_for(fn(first,second),timeout=0.3)\n        return [result,sorted(log),all(task.done() for task in workers)]\n    finally:\n        current=asyncio.current_task()\n        pending=[task for task in workers if task is not current and not task.done()]\n        for task in pending: task.cancel()\n        if pending: await asyncio.gather(*pending,return_exceptions=True)\n",
              "expression": "await _course_check(meet,0,-2)",
              "expectedValue": [
                [
                  0,
                  -2
                ],
                [
                  "first-end",
                  "first-start",
                  "second-end",
                  "second-start"
                ],
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(meet,0,-2)"
            },
            {
              "setup": "import asyncio\nasync def _course_check(fn,left,right):\n    first_started=asyncio.Event()\n    second_started=asyncio.Event()\n    log=[]\n    workers=[]\n    async def first():\n        workers.append(asyncio.current_task())\n        log.append(\"first-start\")\n        first_started.set()\n        await second_started.wait()\n        log.append(\"first-end\")\n        return left\n    async def second():\n        workers.append(asyncio.current_task())\n        log.append(\"second-start\")\n        second_started.set()\n        await first_started.wait()\n        log.append(\"second-end\")\n        return right\n    try:\n        result=await asyncio.wait_for(fn(first,second),timeout=0.3)\n        return [result,sorted(log),all(task.done() for task in workers)]\n    finally:\n        current=asyncio.current_task()\n        pending=[task for task in workers if task is not current and not task.done()]\n        for task in pending: task.cancel()\n        if pending: await asyncio.gather(*pending,return_exceptions=True)\n",
              "expression": "await _course_check(meet,\"x\",\"y\")",
              "expectedValue": [
                [
                  "x",
                  "y"
                ],
                [
                  "first-end",
                  "first-start",
                  "second-end",
                  "second-start"
                ],
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(meet,\"x\",\"y\")"
            }
          ],
          "reference": "import asyncio\nasync def meet(first,second):\n    return await asyncio.gather(first(),second())",
          "alternative": "import asyncio\nasync def meet(first,second):\n    a=asyncio.create_task(first())\n    b=asyncio.create_task(second())\n    return [await a,await b]",
          "wrongSolutions": [
            {
              "code": "async def meet(first,second):\n    return [\"A\",\"B\"]",
              "why": "Константы не выполняют входные операции и их протокол старта."
            },
            {
              "code": "import asyncio\nasync def meet(first,second):\n    return await asyncio.gather(second(),first())",
              "why": "Результаты переставлены относительно контракта."
            },
            {
              "code": "async def meet(first,second):\n    return [await first(),await second()]",
              "why": "Последовательное ожидание не запускает вторую сторону Event-барьера. Проверка прекращает такую попытку по техническому deadline, всегда очищает задачи в finally и не засчитывает зависание."
            }
          ],
          "hints": [
            "Операции переданы как функции, их нужно вызвать.",
            "Обе должны начать работу до ожидания завершения первой.",
            "Храни ссылки на обе Task либо передай обе gather."
          ],
          "solutionExplanation": [
            "Проверяется журнал реальных операций, их завершение и разные возвращённые значения; готовый список уже не проходит.",
            "Константы не выполняют входные операции и их протокол старта.",
            "Результаты переставлены относительно контракта."
          ],
          "required": true
        },
        {
          "id": "async-python-tasks-gather-order",
          "kind": "choice",
          "title": "Порядок gather",
          "goal": "Порядок gather",
          "prerequisites": [
            "async-python-tasks"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "import asyncio",
                "print(await asyncio.gather(*[]))"
              ],
              "output": "[]",
              "explanation": "Разобранный пример по этой идее: Независимых операций нет, поэтому результат — пустой список без специального исключения. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Порядок завершения не используется как формат отчёта; ссылки и ожидание управляют жизненным циклом."
          ],
          "required": true,
          "answer": [
            "1",
            "3"
          ],
          "choices": [
            {
              "id": "1",
              "text": "gather возвращает результаты по порядку аргументов."
            },
            {
              "id": "2",
              "text": "Порядок результатов всегда равен порядку завершения задач."
            },
            {
              "id": "3",
              "text": "Task нужно сохранять и дожидаться по понятным правилам."
            }
          ]
        }
      ]
    },
    {
      "id": "async-python-exceptions",
      "title": "Исключения при await и в пакете",
      "goal": "Обрабатывать ожидаемые ошибки, не объявляя их успешным результатом.",
      "prerequisites": [
        "async-python-tasks"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "async-python-exceptions-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Исключение из корутины возникает у вызывающего кода в точке await. Если внутри выполняется int(text), некорректный текст может вызвать ValueError; try/except вокруг await позволяет преобразовать ожидаемую ошибку в объявленный результат. Не перехватывай любое исключение ради надписи «готово»: это скрывает реальную ошибку программы.",
            "У gather по умолчанию первая обычная ошибка передаётся ожидающей задаче. Это не означает автоматическую отмену всех остальных операций: их жизненный цикл нужно понимать отдельно. С return_exceptions=True gather возвращает исключения в списке на соответствующих позициях. Тогда код обязан отличить успешное значение от ошибки через isinstance; превращать весь пакет в успех нельзя."
          ],
          "examples": [
            {
              "id": "async-python-exceptions-example-1",
              "title": "Перехват вокруг await",
              "code": "async def parse(text):\n    return int(text)\ntry:\n    value = await parse(\"x\")\n    print(value)\nexcept ValueError:\n    print(\"не число\")",
              "output": "не число",
              "explanation": "ValueError передаётся через await и обрабатывается конкретным except."
            }
          ],
          "goal": "Обрабатывать ожидаемые ошибки, не объявляя их успешным результатом.",
          "prerequisites": [
            "async-python-tasks"
          ]
        },
        {
          "id": "async-python-exceptions-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Для частичного отчёта можно возвращать словарь статуса из каждой рабочей корутины: {\"ok\": True, \"value\": ...} или {\"ok\": False, \"error\": ...}. Это явный контракт, а не имитация успешного запуска. Различай ошибку отдельной записи и ошибку всей программы: неизвестный тип исключения следует оставить видимым, чтобы его исправить.",
            "В учебных задачах формат ограничен, поэтому достаточно ValueError для неверной числовой записи. Сеть и её недетерминированные отказы не используются. Тесты включают пустой текст, отрицательные числа и правильный ноль. Ноль — полноценный успешный результат, его нельзя проверять как False и объявлять ошибкой. Вывод ошибок в приложении и возвращаемый учебный статус — разные механизмы."
          ],
          "examples": [
            {
              "id": "async-python-exceptions-example-2",
              "title": "Частичный пакет",
              "code": "import asyncio\nasync def parse(text):\n    return int(text)\nresults = await asyncio.gather(parse(\"3\"), parse(\"x\"), return_exceptions=True)\nfor result in results:\n    print(\"ошибка\" if isinstance(result, ValueError) else result)",
              "output": "3\nошибка",
              "explanation": "Одно неверное поле не превращает успешную тройку в ошибку и не скрывается как успех."
            },
            {
              "id": "async-python-exceptions-example-3",
              "title": "Ноль — успех",
              "code": "async def parse(text):\n    return int(text)\nvalue = await parse(\"0\")\nprint(value == 0)",
              "output": "True",
              "explanation": "Успешный ноль отличается от исключения, хотя ложен при проверке bool."
            }
          ],
          "goal": "Обрабатывать ожидаемые ошибки, не объявляя их успешным результатом.",
          "prerequisites": [
            "async-python-exceptions-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "async-python-exceptions-safe-int",
          "kind": "code",
          "title": "Безопасное преобразование",
          "goal": "Безопасное преобразование",
          "prerequisites": [
            "async-python-exceptions"
          ],
          "prompt": "Реализуй async safe_int(text), возвращающую целое через int либо None при ValueError. Другие ошибки не перехватывай. Не печатай внутри функции: верни результат. await safe_int(text); str → int | None.",
          "inputFormat": "await safe_int(text); str → int | None.",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "text — строка длиной 0…80. Допустимое целое по модулю до 1000000; неверный текст также возможен. Перехватывается только ValueError, stdout пуст.",
          "examples": [
            {
              "input": [
                "await safe_int(\"0\")"
              ],
              "output": "0",
              "explanation": "None обозначает только ошибку преобразования."
            },
            {
              "input": [
                "await safe_int(\"-4\")"
              ],
              "output": "-4",
              "explanation": "None обозначает только ошибку преобразования."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "expression": "await safe_int(\"0\")",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await safe_int(\"0\")"
            },
            {
              "expression": "await safe_int(\"-4\")",
              "expectedValue": -4,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await safe_int(\"-4\")"
            },
            {
              "expression": "await safe_int(\"x\")",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await safe_int(\"x\")"
            },
            {
              "expression": "await safe_int(\"\")",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await safe_int(\"\")"
            }
          ],
          "reference": "async def safe_int(text):\n    try:\n        return int(text)\n    except ValueError:\n        return None",
          "alternative": "async def parse(text):\n    return int(text)\nasync def safe_int(text):\n    try:\n        return await parse(text)\n    except ValueError:\n        return None",
          "wrongSolutions": [
            {
              "code": "async def safe_int(text):\n    return int(text)",
              "why": "Не обрабатывает неверный текст."
            },
            {
              "code": "async def safe_int(text):\n    try:\n        return int(text) or None\n    except ValueError:\n        return None",
              "why": "Правильный ноль ошибочно превращается в None."
            }
          ],
          "hints": [
            "Перехватывай конкретный ValueError.",
            "Возвращай ноль как число, не используй or для статуса.",
            "Ветви try и except имеют разные результаты по контракту."
          ],
          "solutionExplanation": [
            "None обозначает только ошибку преобразования.",
            "Не обрабатывает неверный текст.",
            "Правильный ноль ошибочно превращается в None."
          ],
          "required": true
        },
        {
          "id": "async-python-exceptions-parse-batch",
          "kind": "code",
          "title": "Пакет с частичными ошибками",
          "goal": "Пакет с частичными ошибками",
          "prerequisites": [
            "async-python-exceptions"
          ],
          "prompt": "Реализуй async parse_batch(texts), возвращающую список целых или строку «ошибка» на месте ValueError. Сохрани позиции. Не печатай внутри функции: верни результат. await parse_batch(texts); list[str] → list[int | str].",
          "inputFormat": "await parse_batch(texts); list[str] → list[int | str].",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "Список 0…50 строк по 0…80 символов. Корректные числа по модулю до 1000000; один результат на каждую строку, ожидания только sleep(0).",
          "examples": [
            {
              "input": [
                "await parse_batch([])"
              ],
              "output": "[]",
              "explanation": "Список результата сохраняет длину и порядок исходного пакета."
            },
            {
              "input": [
                "await parse_batch([\"2\",\"x\",\"0\"])"
              ],
              "output": "[2, 'ошибка', 0]",
              "explanation": "Список результата сохраняет длину и порядок исходного пакета."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "expression": "await parse_batch([])",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await parse_batch([])"
            },
            {
              "expression": "await parse_batch([\"2\",\"x\",\"0\"])",
              "expectedValue": [
                2,
                "ошибка",
                0
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await parse_batch([\"2\",\"x\",\"0\"])"
            },
            {
              "expression": "await parse_batch([\"\", \"-3\"])",
              "expectedValue": [
                "ошибка",
                -3
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await parse_batch([\"\", \"-3\"])"
            }
          ],
          "reference": "import asyncio\nasync def parse(text):\n    await asyncio.sleep(0)\n    return int(text)\nasync def parse_batch(texts):\n    results = await asyncio.gather(*[parse(text) for text in texts], return_exceptions=True)\n    return [\"ошибка\" if isinstance(value, ValueError) else value for value in results]",
          "alternative": "import asyncio\nasync def one(text):\n    await asyncio.sleep(0)\n    try:\n        return int(text)\n    except ValueError:\n        return \"ошибка\"\nasync def parse_batch(texts):\n    return await asyncio.gather(*[one(text) for text in texts])",
          "wrongSolutions": [
            {
              "code": "async def parse_batch(texts):\n    return [int(text) for text in texts]",
              "why": "Одна ошибка прерывает весь пакет."
            },
            {
              "code": "async def parse_batch(texts):\n    result = []\n    for text in texts:\n        try:\n            result.append(int(text))\n        except ValueError:\n            pass\n    return result",
              "why": "Удаляет ошибочные позиции и нарушает соответствие входу."
            }
          ],
          "hints": [
            "Сохраняй один результат для каждой входной строки.",
            "Используй return_exceptions либо обработку внутри рабочей корутины.",
            "Превращай только ValueError в объявленный маркер."
          ],
          "solutionExplanation": [
            "Список результата сохраняет длину и порядок исходного пакета.",
            "Одна ошибка прерывает весь пакет.",
            "Удаляет ошибочные позиции и нарушает соответствие входу."
          ],
          "required": true
        },
        {
          "id": "async-python-exceptions-reciprocal",
          "kind": "code",
          "title": "Ошибка деления — отдельный статус",
          "goal": "Ошибка деления — отдельный статус",
          "prerequisites": [
            "async-python-exceptions"
          ],
          "prompt": "Реализуй async reciprocal(n), возвращающую {\"ok\": True, \"value\": 1/n} для ненулевого n, иначе {\"ok\": False, \"error\": \"деление на ноль\"}. Не печатай внутри функции: верни результат. await reciprocal(n); int → dict.",
          "inputFormat": "await reciprocal(n); int → dict.",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "n — целое от −1000 до 1000; ноль разрешён и имеет отдельный статус. Один вызов, без сети и задержек.",
          "examples": [
            {
              "input": [
                "await reciprocal(0)"
              ],
              "output": "{'ok': False, 'error': 'деление на ноль'}",
              "explanation": "Явный контракт различает нормальное значение и ожидаемую математическую ошибку."
            },
            {
              "input": [
                "await reciprocal(2)"
              ],
              "output": "{'ok': True, 'value': 0.5}",
              "explanation": "Явный контракт различает нормальное значение и ожидаемую математическую ошибку."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "expression": "await reciprocal(0)",
              "expectedValue": {
                "ok": false,
                "error": "деление на ноль"
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await reciprocal(0)"
            },
            {
              "expression": "await reciprocal(2)",
              "expectedValue": {
                "ok": true,
                "value": 0.5
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await reciprocal(2)"
            },
            {
              "expression": "await reciprocal(-1)",
              "expectedValue": {
                "ok": true,
                "value": -1.0
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await reciprocal(-1)"
            }
          ],
          "reference": "async def reciprocal(n):\n    try:\n        return {\"ok\": True, \"value\": 1 / n}\n    except ZeroDivisionError:\n        return {\"ok\": False, \"error\": \"деление на ноль\"}",
          "alternative": "async def reciprocal(n):\n    if n == 0:\n        return {\"ok\": False, \"error\": \"деление на ноль\"}\n    return {\"ok\": True, \"value\": 1 / n}",
          "wrongSolutions": [
            {
              "code": "async def reciprocal(n):\n    return {\"ok\": True, \"value\": 1 / n}",
              "why": "Нулевой аргумент вызывает необработанную ошибку."
            },
            {
              "code": "async def reciprocal(n):\n    if n <= 0:\n        return {\"ok\": False, \"error\": \"деление на ноль\"}\n    return {\"ok\": True, \"value\": 1 / n}",
              "why": "Отрицательные ненулевые числа разрешены."
            }
          ],
          "hints": [
            "Статус ошибки не должен выглядеть успехом.",
            "Проблема возникает только при n == 0.",
            "Верни словарь с точными ключами и типами."
          ],
          "solutionExplanation": [
            "Явный контракт различает нормальное значение и ожидаемую математическую ошибку.",
            "Нулевой аргумент вызывает необработанную ошибку.",
            "Отрицательные ненулевые числа разрешены."
          ],
          "required": true
        },
        {
          "id": "async-python-exceptions-gather-errors",
          "kind": "choice",
          "title": "Что делает return_exceptions?",
          "goal": "Что делает return_exceptions?",
          "prerequisites": [
            "async-python-exceptions"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "async def parse(text):",
                "    return int(text)",
                "value = await parse(\"0\")",
                "print(value == 0)"
              ],
              "output": "True",
              "explanation": "Разобранный пример по этой идее: Успешный ноль отличается от исключения, хотя ложен при проверке bool. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Возвращённое исключение остаётся ошибкой; обработка результата должна отражать этот статус."
          ],
          "required": true,
          "answer": [
            "1",
            "3"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Исключение появляется в списке на позиции соответствующей операции."
            },
            {
              "id": "2",
              "text": "Любое исключение автоматически превращается в успешное число 0."
            },
            {
              "id": "3",
              "text": "Вызывающий код должен различать значения и ошибки."
            }
          ]
        }
      ]
    },
    {
      "id": "async-python-cancel",
      "title": "Отмена, Event и finally",
      "goal": "Дожидаться отменённой задачи и сохранять очистку состояния.",
      "prerequisites": [
        "async-python-exceptions"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "async-python-cancel-idea",
          "title": "Как это работает",
          "paragraphs": [
            "task.cancel() запрашивает отмену. При следующей возможности внутри задачи возникает asyncio.CancelledError. Это не мгновенное стирание объекта и не гарантированный вызов любого уже написанного кода. Чтобы убедиться в завершении и выполнить очистку, ожидающая сторона делает await task и обрабатывает CancelledError. Отменённая до первого старта корутина могла ещё не войти в свой try/finally.",
            "Поэтому в воспроизводимом примере используется asyncio.Event. Рабочая корутина сообщает started.set(), что уже начала защищённый участок, а управляющая ждёт await started.wait() перед cancel. Event — логический сигнал, а не поток и не внешнее событие браузера. Его начальное состояние ложное, set делает истинным, wait ожидает готовность. Такой протокол заменяет ненадёжные задержки «подождём одну секунду и надеемся»."
          ],
          "examples": [
            {
              "id": "async-python-cancel-example-1",
              "title": "Отмена после старта",
              "code": "import asyncio\nasync def worker(started):\n    try:\n        started.set()\n        await asyncio.Event().wait()\n    finally:\n        print(\"очистка\")\nstarted = asyncio.Event()\ntask = asyncio.create_task(worker(started))\nawait started.wait()\ntask.cancel()\ntry:\n    await task\nexcept asyncio.CancelledError:\n    print(\"отменено\")",
              "output": "очистка\nотменено",
              "explanation": "Сначала finally рабочего кода, затем обработка подтверждённой отмены у управляющего."
            }
          ],
          "goal": "Дожидаться отменённой задачи и сохранять очистку состояния.",
          "prerequisites": [
            "async-python-exceptions"
          ]
        },
        {
          "id": "async-python-cancel-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "finally выполняет очистку при обычном завершении и при исключении, включая отмену, если управление вошло в соответствующий try. CancelledError наследует BaseException, поэтому except Exception обычно её не перехватывает. Если рабочая корутина перехватывает отмену для своей очистки, обычно нужно повторно raise, чтобы вызывающая сторона увидела отменённое состояние. Проглатывание отмены ломает ожидания управляющего кода.",
            "В StudyPy кнопка остановки прекращает worker целиком. Она не обещает выполнение Python finally, поскольку среда вычисления уничтожается. Это отличается от кооперативной отмены Task внутри живого asyncio: здесь задача получает исключение и имеет возможность корректно завершиться. Не путай эти два механизма. Все учебные примеры отмены ниже управляются Event без сети и долгого ожидания.",
            "Проверка передаёт Task и Event, созданные независимо от решения. Вернуть список слов «очистка» недостаточно: наблюдаются настоящие task.done(), task.cancelled() и действие finally самой рабочей корутины. В задании checked передана функция cleanup, её реальный вызов обязателен: один флаг closed=True не освобождает ресурс. Эквивалентная корректная организация ожидания и очистки принимается."
          ],
          "examples": [
            {
              "id": "async-python-cancel-example-2",
              "title": "Очистка при успехе",
              "code": "async def work():\n    try:\n        return 7\n    finally:\n        print(\"очистка\")\nprint(await work())",
              "output": "очистка\n7",
              "explanation": "finally выполняется и при return; возвращаемое значение остаётся 7."
            },
            {
              "id": "async-python-cancel-example-3",
              "title": "Факт завершения",
              "code": "import asyncio\nasync def work():\n    return 3\ntask = asyncio.create_task(work())\nvalue = await task\nprint(task.done(), task.cancelled(), value)",
              "output": "True False 3",
              "explanation": "Завершённая нормальным результатом задача done, но не cancelled."
            }
          ],
          "goal": "Дожидаться отменённой задачи и сохранять очистку состояния.",
          "prerequisites": [
            "async-python-cancel-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "async-python-cancel-cleanup",
          "kind": "code",
          "title": "Отмена с журналом очистки",
          "goal": "Отмена с журналом очистки",
          "prerequisites": [
            "async-python-cancel"
          ],
          "prompt": "Реализуй async cancel_started(task,started): дождись started-Event уже созданной рабочей Task, запроси её отмену и дождись завершения. Подтверждённый CancelledError обработай у управляющей стороны. Верни None. Входная Task очищает свой ресурс в finally; это должно произойти до возврата. Функция ничего не печатает.",
          "inputFormat": "await cancel_started(asyncio.Task,asyncio.Event) → None.",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "Передаются одна настоящая asyncio.Task и её started-Event. Рабочая Task сообщает started внутри try, далее ожидает отмены. Никаких таймеров и сети. После функции Task завершена; очистка выполнена. Тест всегда освобождает входную Task в finally.",
          "examples": [
            {
              "input": [
                "import asyncio\nasync def _course_check(fn):\n    started=asyncio.Event()\n    gate=asyncio.Event()\n    log=[]\n    async def worker():\n        try:\n            log.append(\"старт\")\n            started.set()\n            await gate.wait()\n        finally:\n            log.append(\"очистка\")\n    task=asyncio.create_task(worker())\n    try:\n        result=await fn(task,started)\n        return [result,task.done(),task.cancelled(),list(log)]\n    finally:\n        if not task.done(): task.cancel()\n        await asyncio.gather(task,return_exceptions=True)\n",
                "await _course_check(cancel_started)"
              ],
              "output": "[None, True, True, ['старт', 'очистка']]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Проверка создаёт настоящую Task и видит её done/cancelled и ресурсный журнал; собственная имитация статуса не принимается. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "setup": "import asyncio\nasync def _course_check(fn):\n    started=asyncio.Event()\n    gate=asyncio.Event()\n    log=[]\n    async def worker():\n        try:\n            log.append(\"старт\")\n            started.set()\n            await gate.wait()\n        finally:\n            log.append(\"очистка\")\n    task=asyncio.create_task(worker())\n    try:\n        result=await fn(task,started)\n        return [result,task.done(),task.cancelled(),list(log)]\n    finally:\n        if not task.done(): task.cancel()\n        await asyncio.gather(task,return_exceptions=True)\n",
              "expression": "await _course_check(cancel_started)",
              "expectedValue": [
                null,
                true,
                true,
                [
                  "старт",
                  "очистка"
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(cancel_started)"
            }
          ],
          "reference": "import asyncio\nasync def cancel_started(task,started):\n    await started.wait()\n    task.cancel()\n    try:\n        await task\n    except asyncio.CancelledError:\n        pass\n    return None",
          "alternative": "import asyncio\nasync def cancel_started(task,started):\n    await started.wait()\n    task.cancel()\n    await asyncio.gather(task,return_exceptions=True)\n    return None",
          "wrongSolutions": [
            {
              "code": "async def cancel_started(task,started):\n    return None",
              "why": "Готовый None не останавливает переданную рабочую Task."
            },
            {
              "code": "import asyncio\nasync def cancel_started(task,started):\n    task.cancel()\n    await asyncio.gather(task,return_exceptions=True)",
              "why": "Отмена до старта не гарантирует вход в её try/finally и теряет очистку."
            }
          ],
          "hints": [
            "Сначала дождись сигнала о входе в защищённый участок.",
            "После cancel обязателен await завершения той же Task.",
            "Журнал очистки ведётся входной задачей, его нельзя заменить своим списком."
          ],
          "solutionExplanation": [
            "Проверка создаёт настоящую Task и видит её done/cancelled и ресурсный журнал; собственная имитация статуса не принимается.",
            "Готовый None не останавливает переданную рабочую Task.",
            "Отмена до старта не гарантирует вход в её try/finally и теряет очистку."
          ],
          "required": true
        },
        {
          "id": "async-python-cancel-status",
          "kind": "code",
          "title": "Отменить группу начатых задач",
          "goal": "Различать отменённое и нормальное завершение группы Task.",
          "prerequisites": [
            "async-python-cancel"
          ],
          "prompt": "Реализуй async cancel_all(tasks,ready): сначала дождись всех соответствующих ready-Event, затем отмени незавершённые задачи и дождись всего списка. Верни количество задач со статусом cancelled. Уже завершённые нормальным результатом задачи не считаются отменёнными. Функция ничего не печатает.",
          "inputFormat": "await cancel_all(list[Task],list[Event]) → int; длины списков равны.",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "От 0 до 20 Task и столько же ready-Event. Незавершённые задачи конечны при cancel; часть может быть уже завершена нормальным результатом. Все Task должны быть завершены до return, тестовые ресурсы освобождаются в finally.",
          "examples": [
            {
              "input": [
                "import asyncio\nasync def _course_check(fn,n,completed):\n    tasks=[]\n    ready=[]\n    cleaned=[]\n    async def worker(index,event):\n        try:\n            event.set()\n            await asyncio.Event().wait()\n        finally:\n            cleaned.append(index)\n    async def done(): return 7\n    for i in range(n):\n        event=asyncio.Event()\n        ready.append(event)\n        tasks.append(asyncio.create_task(worker(i,event)))\n    if completed:\n        task=asyncio.create_task(done())\n        await task\n        event=asyncio.Event();event.set()\n        tasks.append(task);ready.append(event)\n    try:\n        result=await fn(tasks,ready)\n        return [result,[task.done() for task in tasks],[task.cancelled() for task in tasks],sorted(cleaned)]\n    finally:\n        for task in tasks:\n            if not task.done():task.cancel()\n        if tasks:await asyncio.gather(*tasks,return_exceptions=True)\n",
                "await _course_check(cancel_all,0,False)"
              ],
              "output": "[0, [], [], []]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Проверка наблюдает настоящие задачи, очистку каждой и смесь нормального завершения с отменой. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            },
            {
              "input": [
                "import asyncio\nasync def _course_check(fn,n,completed):\n    tasks=[]\n    ready=[]\n    cleaned=[]\n    async def worker(index,event):\n        try:\n            event.set()\n            await asyncio.Event().wait()\n        finally:\n            cleaned.append(index)\n    async def done(): return 7\n    for i in range(n):\n        event=asyncio.Event()\n        ready.append(event)\n        tasks.append(asyncio.create_task(worker(i,event)))\n    if completed:\n        task=asyncio.create_task(done())\n        await task\n        event=asyncio.Event();event.set()\n        tasks.append(task);ready.append(event)\n    try:\n        result=await fn(tasks,ready)\n        return [result,[task.done() for task in tasks],[task.cancelled() for task in tasks],sorted(cleaned)]\n    finally:\n        for task in tasks:\n            if not task.done():task.cancel()\n        if tasks:await asyncio.gather(*tasks,return_exceptions=True)\n",
                "await _course_check(cancel_all,2,False)"
              ],
              "output": "[2, [True, True], [True, True], [0, 1]]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Проверка наблюдает настоящие задачи, очистку каждой и смесь нормального завершения с отменой. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "setup": "import asyncio\nasync def _course_check(fn,n,completed):\n    tasks=[]\n    ready=[]\n    cleaned=[]\n    async def worker(index,event):\n        try:\n            event.set()\n            await asyncio.Event().wait()\n        finally:\n            cleaned.append(index)\n    async def done(): return 7\n    for i in range(n):\n        event=asyncio.Event()\n        ready.append(event)\n        tasks.append(asyncio.create_task(worker(i,event)))\n    if completed:\n        task=asyncio.create_task(done())\n        await task\n        event=asyncio.Event();event.set()\n        tasks.append(task);ready.append(event)\n    try:\n        result=await fn(tasks,ready)\n        return [result,[task.done() for task in tasks],[task.cancelled() for task in tasks],sorted(cleaned)]\n    finally:\n        for task in tasks:\n            if not task.done():task.cancel()\n        if tasks:await asyncio.gather(*tasks,return_exceptions=True)\n",
              "expression": "await _course_check(cancel_all,0,False)",
              "expectedValue": [
                0,
                [],
                [],
                []
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(cancel_all,0,False)"
            },
            {
              "setup": "import asyncio\nasync def _course_check(fn,n,completed):\n    tasks=[]\n    ready=[]\n    cleaned=[]\n    async def worker(index,event):\n        try:\n            event.set()\n            await asyncio.Event().wait()\n        finally:\n            cleaned.append(index)\n    async def done(): return 7\n    for i in range(n):\n        event=asyncio.Event()\n        ready.append(event)\n        tasks.append(asyncio.create_task(worker(i,event)))\n    if completed:\n        task=asyncio.create_task(done())\n        await task\n        event=asyncio.Event();event.set()\n        tasks.append(task);ready.append(event)\n    try:\n        result=await fn(tasks,ready)\n        return [result,[task.done() for task in tasks],[task.cancelled() for task in tasks],sorted(cleaned)]\n    finally:\n        for task in tasks:\n            if not task.done():task.cancel()\n        if tasks:await asyncio.gather(*tasks,return_exceptions=True)\n",
              "expression": "await _course_check(cancel_all,2,False)",
              "expectedValue": [
                2,
                [
                  true,
                  true
                ],
                [
                  true,
                  true
                ],
                [
                  0,
                  1
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(cancel_all,2,False)"
            },
            {
              "setup": "import asyncio\nasync def _course_check(fn,n,completed):\n    tasks=[]\n    ready=[]\n    cleaned=[]\n    async def worker(index,event):\n        try:\n            event.set()\n            await asyncio.Event().wait()\n        finally:\n            cleaned.append(index)\n    async def done(): return 7\n    for i in range(n):\n        event=asyncio.Event()\n        ready.append(event)\n        tasks.append(asyncio.create_task(worker(i,event)))\n    if completed:\n        task=asyncio.create_task(done())\n        await task\n        event=asyncio.Event();event.set()\n        tasks.append(task);ready.append(event)\n    try:\n        result=await fn(tasks,ready)\n        return [result,[task.done() for task in tasks],[task.cancelled() for task in tasks],sorted(cleaned)]\n    finally:\n        for task in tasks:\n            if not task.done():task.cancel()\n        if tasks:await asyncio.gather(*tasks,return_exceptions=True)\n",
              "expression": "await _course_check(cancel_all,1,True)",
              "expectedValue": [
                1,
                [
                  true,
                  true
                ],
                [
                  true,
                  false
                ],
                [
                  0
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(cancel_all,1,True)"
            }
          ],
          "reference": "import asyncio\nasync def cancel_all(tasks,ready):\n    for event in ready:\n        await event.wait()\n    for task in tasks:\n        if not task.done():task.cancel()\n    await asyncio.gather(*tasks,return_exceptions=True)\n    return sum(task.cancelled() for task in tasks)",
          "alternative": "import asyncio\nasync def cancel_all(tasks,ready):\n    await asyncio.gather(*[event.wait() for event in ready])\n    for task in tasks:\n        if not task.done():task.cancel()\n    count=0\n    for task in tasks:\n        try:await task\n        except asyncio.CancelledError:count+=1\n    return count",
          "wrongSolutions": [
            {
              "code": "async def cancel_all(tasks,ready):\n    return len(tasks)",
              "why": "Число входных задач не доказывает отмену или очистку."
            },
            {
              "code": "import asyncio\nasync def cancel_all(tasks,ready):\n    for event in ready:await event.wait()\n    for task in tasks:\n        if not task.done():task.cancel()\n    await asyncio.gather(*tasks,return_exceptions=True)\n    return len(tasks)",
              "why": "Уже нормально завершённые задачи не являются cancelled."
            }
          ],
          "hints": [
            "Сначала обеспечь старт всех защищённых участков.",
            "Отмена и ожидание выполняются для всех незавершённых Task.",
            "Считай cancelled после ожидания, а не число входных объектов."
          ],
          "solutionExplanation": [
            "Проверка наблюдает настоящие задачи, очистку каждой и смесь нормального завершения с отменой.",
            "Число входных задач не доказывает отмену или очистку.",
            "Уже нормально завершённые задачи не являются cancelled."
          ],
          "required": true
        },
        {
          "id": "async-python-cancel-finally-result",
          "kind": "code",
          "title": "Очистка при обоих исходах",
          "goal": "Очистка при обоих исходах",
          "prerequisites": [
            "async-python-cancel"
          ],
          "prompt": "Реализуй async checked(n,cleanup). Для n≥0 верни {\"status\":\"ok\",\"value\":n*2,\"closed\":True}; для отрицательного n обработай ValueError и верни {\"status\":\"error\",\"closed\":True}. Перед возвратом ровно один раз вызови переданный cleanup() независимо от исхода. Используй finally либо эквивалентную гарантированную очистку. Функция ничего не печатает.",
          "inputFormat": "await checked(int,callable cleanup()) → dict.",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "n — целое −1000…1000; cleanup — конечная функция без параметров и вывода, добавляющая одну отметку. Вызвать её ровно один раз. Словарь содержит до трёх полей.",
          "examples": [
            {
              "input": [
                "async def _course_check(fn,n):\n    log=[]\n    def cleanup(): log.append(\"закрыт\")\n    result=await fn(n,cleanup)\n    return [result,log]\n",
                "await _course_check(checked,0)"
              ],
              "output": "[{'status': 'ok', 'value': 0, 'closed': True}, ['закрыт']]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Проверка смотрит не только на обещанный флаг, но и на настоящее действие cleanup. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            },
            {
              "input": [
                "async def _course_check(fn,n):\n    log=[]\n    def cleanup(): log.append(\"закрыт\")\n    result=await fn(n,cleanup)\n    return [result,log]\n",
                "await _course_check(checked,3)"
              ],
              "output": "[{'status': 'ok', 'value': 6, 'closed': True}, ['закрыт']]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Проверка смотрит не только на обещанный флаг, но и на настоящее действие cleanup. Если проверка возвращает составной список, первое поле — результат функции, остальные — независимо наблюдаемые вызовы, состояния Task или журнал очистки."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "setup": "async def _course_check(fn,n):\n    log=[]\n    def cleanup(): log.append(\"закрыт\")\n    result=await fn(n,cleanup)\n    return [result,log]\n",
              "expression": "await _course_check(checked,0)",
              "expectedValue": [
                {
                  "status": "ok",
                  "value": 0,
                  "closed": true
                },
                [
                  "закрыт"
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(checked,0)"
            },
            {
              "setup": "async def _course_check(fn,n):\n    log=[]\n    def cleanup(): log.append(\"закрыт\")\n    result=await fn(n,cleanup)\n    return [result,log]\n",
              "expression": "await _course_check(checked,3)",
              "expectedValue": [
                {
                  "status": "ok",
                  "value": 6,
                  "closed": true
                },
                [
                  "закрыт"
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(checked,3)"
            },
            {
              "setup": "async def _course_check(fn,n):\n    log=[]\n    def cleanup(): log.append(\"закрыт\")\n    result=await fn(n,cleanup)\n    return [result,log]\n",
              "expression": "await _course_check(checked,-1)",
              "expectedValue": [
                {
                  "status": "error",
                  "closed": true
                },
                [
                  "закрыт"
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await _course_check(checked,-1)"
            }
          ],
          "reference": "async def checked(n,cleanup):\n    result={}\n    try:\n        if n<0:raise ValueError\n        result.update(status=\"ok\",value=n*2)\n    except ValueError:\n        result[\"status\"]=\"error\"\n    finally:\n        cleanup()\n        result[\"closed\"]=True\n    return result",
          "alternative": "async def checked(n,cleanup):\n    try:\n        if n<0:raise ValueError\n        result={\"status\":\"ok\",\"value\":n+n}\n    except ValueError:\n        result={\"status\":\"error\"}\n    cleanup()\n    result[\"closed\"]=True\n    return result",
          "wrongSolutions": [
            {
              "code": "async def checked(n,cleanup):\n    if n<0:return {\"status\":\"error\",\"closed\":True}\n    return {\"status\":\"ok\",\"value\":n*2,\"closed\":True}",
              "why": "Флаг closed=True не заменяет реальный вызов переданной очистки."
            },
            {
              "code": "async def checked(n,cleanup):\n    if n<0:return {\"status\":\"error\",\"closed\":True}\n    cleanup()\n    return {\"status\":\"ok\",\"value\":n*2,\"closed\":True}",
              "why": "При ошибке очистка пропущена."
            }
          ],
          "hints": [
            "cleanup передан извне, поэтому состояние проверяется независимо.",
            "Он вызывается один раз в обеих ветках.",
            "Только после очистки возвращай итоговый словарь."
          ],
          "solutionExplanation": [
            "Проверка смотрит не только на обещанный флаг, но и на настоящее действие cleanup.",
            "Флаг closed=True не заменяет реальный вызов переданной очистки.",
            "При ошибке очистка пропущена."
          ],
          "required": true
        },
        {
          "id": "async-python-cancel-cancel-base",
          "kind": "explain",
          "title": "Почему except Exception не ловит отмену?",
          "goal": "Почему except Exception не ловит отмену?",
          "prerequisites": [
            "async-python-cancel"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "import asyncio",
                "async def work():",
                "    return 3",
                "task = asyncio.create_task(work())",
                "value = await task",
                "print(task.done(), task.cancelled(), value)"
              ],
              "output": "True False 3",
              "explanation": "Разобранный пример по этой идее: Завершённая нормальным результатом задача done, но не cancelled. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Кооперативная отмена задачи и прекращение вычислительной среды — разные механизмы."
          ],
          "required": true,
          "answer": [
            "1",
            "2"
          ],
          "choices": [
            {
              "id": "1",
              "text": "CancelledError наследует BaseException."
            },
            {
              "id": "2",
              "text": "finally может очистить начатый защищённый участок."
            },
            {
              "id": "3",
              "text": "Уничтожение Web Worker обещает выполнить любой Python finally."
            }
          ]
        }
      ]
    },
    {
      "id": "async-python-batch-project",
      "title": "Мини-проект: пакетный разбор записей",
      "goal": "Собрать небольшой асинхронный отчёт с частичными ошибками и порядком.",
      "prerequisites": [
        "async-python-cancel"
      ],
      "role": "project",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "async-python-batch-project-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Проект объединяет async-функции, независимые операции и явные статусы. Мы обрабатываем уже имеющиеся строки, а не отправляем сетевые запросы. Асинхронный механизм здесь нужен для обучения жизненному циклу операций; для реального маленького списка чисел обычный последовательный код был бы проще и вполне достаточен. Не выдавай учебную имитацию ожидания за внешнюю загрузку.",
            "Первая часть разбирает одну запись name:integer. Число разделителей и непустое имя проверяются до преобразования. Вторая запускает обработку пакета и сохраняет один статус на каждую входную строку. Последняя строит сводку успешных значений и ошибок. Ошибочные записи остаются видимыми, а не исчезают из отчёта."
          ],
          "examples": [
            {
              "id": "async-python-batch-project-example-1",
              "title": "Явная ошибка структуры",
              "code": "text = \"a:1:2\"\nprint(text.count(\":\") == 1)",
              "output": "False",
              "explanation": "Третий фрагмент не должен незаметно исчезать при разборе записи из двух полей."
            }
          ],
          "goal": "Собрать небольшой асинхронный отчёт с частичными ошибками и порядком.",
          "prerequisites": [
            "async-python-cancel"
          ]
        },
        {
          "id": "async-python-batch-project-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Функции не печатают результаты. Это делает их пригодными для вызова из интерфейса и независимых тестов. Успешный ноль входит в сумму и количество, отрицательное значение разрешено по контракту. Повторное имя не должно случайно перезаписывать другую запись, потому что проект хранит список статусов с исходным порядком. Если понадобилась бы группировка по имени, это было бы новым явно объявленным требованием.",
            "Проверь пустой пакет, несколько корректных строк, пустое имя, повторный разделитель и неверное число. После успешной проверки объясни, почему gather сохраняет позиции и где именно ValueError превращается в статус. Отдельные задачи на Event из предыдущих уроков объясняют планирование и отмену; итоговый отчёт не объявляется доказательством production-готовности или опыта сетевого программирования."
          ],
          "examples": [
            {
              "id": "async-python-batch-project-example-2",
              "title": "Сумма успешных результатов",
              "code": "results = [{\"ok\": True, \"value\": 0}, {\"ok\": False}, {\"ok\": True, \"value\": 4}]\nprint(sum(item[\"value\"] for item in results if item[\"ok\"]))",
              "output": "4",
              "explanation": "Нулевое успешное значение остаётся полноценной записью; фильтр использует явный статус."
            },
            {
              "id": "async-python-batch-project-example-3",
              "title": "Пустой отчёт",
              "code": "results = []\nprint({\"success\": len(results), \"errors\": 0, \"total\": 0})",
              "output": "{'success': 0, 'errors': 0, 'total': 0}",
              "explanation": "При отсутствии работ отчёт завершён, но не содержит выдуманной успешной записи."
            }
          ],
          "goal": "Собрать небольшой асинхронный отчёт с частичными ошибками и порядком.",
          "prerequisites": [
            "async-python-batch-project-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "async-python-batch-project-record",
          "kind": "code",
          "title": "Разобрать одну запись",
          "goal": "Разобрать одну запись",
          "prerequisites": [
            "async-python-batch-project"
          ],
          "prompt": "Реализуй async parse_record(text). Корректен ровно один :, имя после strip непусто, правая часть преобразуется int. Успех: {\"ok\": True, \"name\": имя, \"value\": число}; иначе {\"ok\": False}. Не печатай внутри функции: верни результат. await parse_record(text); строка → dict.",
          "inputFormat": "await parse_record(text); строка → dict.",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "text длиной 0…100; имя после strip 1…30 символов. Число по модулю до 1000000. Неверный формат допускается как вход и даёт {\"ok\":False}; ожидание только sleep(0).",
          "examples": [
            {
              "input": [
                "await parse_record(\" a :0\")"
              ],
              "output": "{'ok': True, 'name': 'a', 'value': 0}",
              "explanation": "У каждой записи явный словарь статуса без лишнего вывода."
            },
            {
              "input": [
                "await parse_record(\"b:-2\")"
              ],
              "output": "{'ok': True, 'name': 'b', 'value': -2}",
              "explanation": "У каждой записи явный словарь статуса без лишнего вывода."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "expression": "await parse_record(\" a :0\")",
              "expectedValue": {
                "ok": true,
                "name": "a",
                "value": 0
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await parse_record(\" a :0\")"
            },
            {
              "expression": "await parse_record(\"b:-2\")",
              "expectedValue": {
                "ok": true,
                "name": "b",
                "value": -2
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await parse_record(\"b:-2\")"
            },
            {
              "expression": "await parse_record(\":3\")",
              "expectedValue": {
                "ok": false
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await parse_record(\":3\")"
            },
            {
              "expression": "await parse_record(\"a:x\")",
              "expectedValue": {
                "ok": false
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await parse_record(\"a:x\")"
            },
            {
              "expression": "await parse_record(\"a:1:2\")",
              "expectedValue": {
                "ok": false
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await parse_record(\"a:1:2\")"
            }
          ],
          "reference": "import asyncio\nasync def parse_record(text):\n    await asyncio.sleep(0)\n    if text.count(\":\") != 1:\n        return {\"ok\": False}\n    name, raw = text.split(\":\")\n    name = name.strip()\n    if not name:\n        return {\"ok\": False}\n    try:\n        value = int(raw)\n    except ValueError:\n        return {\"ok\": False}\n    return {\"ok\": True, \"name\": name, \"value\": value}",
          "alternative": "async def parse_record(text):\n    fields = text.split(\":\")\n    if len(fields) != 2 or not fields[0].strip():\n        return {\"ok\": False}\n    try:\n        number = int(fields[1])\n    except ValueError:\n        return {\"ok\": False}\n    return {\"ok\": True, \"name\": fields[0].strip(), \"value\": number}",
          "wrongSolutions": [
            {
              "code": "import asyncio\nasync def parse_record(text):\n    await asyncio.sleep(0)\n    if text.count(\":\") != 1:\n        return {\"ok\": False}\n    name, raw = text.split(\":\")\n    name = name.strip()\n    if False:\n        return {\"ok\": False}\n    try:\n        value = int(raw)\n    except ValueError:\n        return {\"ok\": False}\n    return {\"ok\": True, \"name\": name, \"value\": value}",
              "why": "Пустое имя не проходит контракт."
            },
            {
              "code": "import asyncio\nasync def parse_record(text):\n    await asyncio.sleep(0)\n    if \":\" not in text:\n        return {\"ok\": False}\n    name, raw = text.split(\":\")[:2]\n    name = name.strip()\n    if not name:\n        return {\"ok\": False}\n    try:\n        value = int(raw)\n    except ValueError:\n        return {\"ok\": False}\n    return {\"ok\": True, \"name\": name, \"value\": value}",
              "why": "Игнорирование остальных полей принимает запись с лишним разделителем."
            }
          ],
          "hints": [
            "Сначала проверь структуру, затем значение.",
            "Имя очищается только по краям.",
            "Ошибки int обрабатываются конкретным ValueError."
          ],
          "solutionExplanation": [
            "У каждой записи явный словарь статуса без лишнего вывода.",
            "Пустое имя не проходит контракт.",
            "Игнорирование остальных полей принимает запись с лишним разделителем."
          ],
          "required": true
        },
        {
          "id": "async-python-batch-project-records",
          "kind": "code",
          "title": "Обработать пакет с позициями",
          "goal": "Обработать пакет с позициями",
          "prerequisites": [
            "async-python-batch-project"
          ],
          "prompt": "Реализуй parse_record по контракту предыдущего задания и async records(texts), возвращающую список статусов в исходном порядке. Не печатай внутри функции: верни результат. await records(texts); list[str] → list[dict].",
          "inputFormat": "await records(texts); list[str] → list[dict].",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "Список 0…50 строк длиной до 100, имя после strip до 30, корректное число по модулю до 1000000. До 50 конечных задач, все результаты сохраняют позиции.",
          "examples": [
            {
              "input": [
                "await records([])"
              ],
              "output": "[]",
              "explanation": "Пакет сохраняет позиции и не скрывает частичные ошибки."
            },
            {
              "input": [
                "await records([\"a:2\",\":3\",\"b:0\"])"
              ],
              "output": "[{'ok': True, 'name': 'a', 'value': 2}, {'ok': False}, {'ok': True, 'name': 'b', 'value': 0}]",
              "explanation": "Пакет сохраняет позиции и не скрывает частичные ошибки."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "expression": "await records([])",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await records([])"
            },
            {
              "expression": "await records([\"a:2\",\":3\",\"b:0\"])",
              "expectedValue": [
                {
                  "ok": true,
                  "name": "a",
                  "value": 2
                },
                {
                  "ok": false
                },
                {
                  "ok": true,
                  "name": "b",
                  "value": 0
                }
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await records([\"a:2\",\":3\",\"b:0\"])"
            },
            {
              "expression": "await records([\"a:x\"])",
              "expectedValue": [
                {
                  "ok": false
                }
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await records([\"a:x\"])"
            }
          ],
          "reference": "import asyncio\nasync def parse_record(text):\n    await asyncio.sleep(0)\n    if text.count(\":\") != 1:\n        return {\"ok\": False}\n    name, raw = text.split(\":\")\n    name = name.strip()\n    if not name:\n        return {\"ok\": False}\n    try:\n        value = int(raw)\n    except ValueError:\n        return {\"ok\": False}\n    return {\"ok\": True, \"name\": name, \"value\": value}\nasync def records(texts):\n    return await asyncio.gather(*[parse_record(text) for text in texts])",
          "alternative": "async def parse_record(text):\n    fields = text.split(\":\")\n    if len(fields) != 2 or not fields[0].strip():\n        return {\"ok\": False}\n    try:\n        number = int(fields[1])\n    except ValueError:\n        return {\"ok\": False}\n    return {\"ok\": True, \"name\": fields[0].strip(), \"value\": number}\nimport asyncio\nasync def records(texts):\n    tasks = [asyncio.create_task(parse_record(text)) for text in texts]\n    return [await task for task in tasks]",
          "wrongSolutions": [
            {
              "code": "import asyncio\nasync def parse_record(text):\n    await asyncio.sleep(0)\n    if text.count(\":\") != 1:\n        return {\"ok\": False}\n    name, raw = text.split(\":\")\n    name = name.strip()\n    if not name:\n        return {\"ok\": False}\n    try:\n        value = int(raw)\n    except ValueError:\n        return {\"ok\": False}\n    return {\"ok\": True, \"name\": name, \"value\": value}\nasync def records(texts):\n    return [await parse_record(text) for text in texts if \":\" in text and text.split(\":\")[0].strip()]",
              "why": "Отбрасывает ошибочные позиции."
            },
            {
              "code": "import asyncio\nasync def parse_record(text):\n    await asyncio.sleep(0)\n    if text.count(\":\") != 1:\n        return {\"ok\": False}\n    name, raw = text.split(\":\")\n    name = name.strip()\n    if not name:\n        return {\"ok\": False}\n    try:\n        value = int(raw)\n    except ValueError:\n        return {\"ok\": False}\n    return {\"ok\": True, \"name\": name, \"value\": value}\nasync def records(texts):\n    results = [await parse_record(text) for text in texts]\n    return results[::-1]",
              "why": "Разворачивает соответствие входу."
            }
          ],
          "hints": [
            "Результат должен иметь ту же длину, что вход.",
            "Передай все корутины gather в порядке texts.",
            "Каждый parse_record возвращает статус, даже при ошибке."
          ],
          "solutionExplanation": [
            "Пакет сохраняет позиции и не скрывает частичные ошибки.",
            "Отбрасывает ошибочные позиции.",
            "Разворачивает соответствие входу."
          ],
          "required": true
        },
        {
          "id": "async-python-batch-project-report",
          "kind": "code",
          "title": "Итоговый отчёт пакета",
          "goal": "Итоговый отчёт пакета",
          "prerequisites": [
            "async-python-batch-project"
          ],
          "prompt": "Реализуй parse_record и async report(texts), возвращающую {\"success\": число успешных записей, \"errors\": число ошибочных, \"total\": сумма успешных value}. Не печатай внутри функции: верни результат. await report(texts); list[str] → dict.",
          "inputFormat": "await report(texts); list[str] → dict.",
          "outputFormat": "Возвращаемое значение указанного типа; stdout и вывод вызова должны быть пустыми.",
          "constraints": "Список 0…50 строк длиной до 100, имена до 30, корректные числа по модулю до 1000000. Сумма по модулю до 50000000; stdout пуст; реальные задержки отсутствуют.",
          "examples": [
            {
              "input": [
                "await report([])"
              ],
              "output": "{'success': 0, 'errors': 0, 'total': 0}",
              "explanation": "Отчёт соединяет явные статусы и числовую сводку, не пряча неверные записи."
            },
            {
              "input": [
                "await report([\"a:0\",\"b:-2\",\"x\"])"
              ],
              "output": "{'success': 2, 'errors': 1, 'total': -2}",
              "explanation": "Отчёт соединяет явные статусы и числовую сводку, не пряча неверные записи."
            }
          ],
          "initialCode": "# Импортируй asyncio при необходимости и напиши async def по контракту.\n",
          "tests": [
            {
              "expression": "await report([])",
              "expectedValue": {
                "success": 0,
                "errors": 0,
                "total": 0
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await report([])"
            },
            {
              "expression": "await report([\"a:0\",\"b:-2\",\"x\"])",
              "expectedValue": {
                "success": 2,
                "errors": 1,
                "total": -2
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await report([\"a:0\",\"b:-2\",\"x\"])"
            },
            {
              "expression": "await report([\"a:3\",\"a:4\"])",
              "expectedValue": {
                "success": 2,
                "errors": 0,
                "total": 7
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "await report([\"a:3\",\"a:4\"])"
            }
          ],
          "reference": "import asyncio\nasync def parse_record(text):\n    await asyncio.sleep(0)\n    if text.count(\":\") != 1:\n        return {\"ok\": False}\n    name, raw = text.split(\":\")\n    name = name.strip()\n    if not name:\n        return {\"ok\": False}\n    try:\n        value = int(raw)\n    except ValueError:\n        return {\"ok\": False}\n    return {\"ok\": True, \"name\": name, \"value\": value}\nasync def report(texts):\n    results = await asyncio.gather(*[parse_record(text) for text in texts])\n    success = sum(item[\"ok\"] for item in results)\n    total = sum(item[\"value\"] for item in results if item[\"ok\"])\n    return {\"success\": success, \"errors\": len(results) - success, \"total\": total}",
          "alternative": "async def parse_record(text):\n    fields = text.split(\":\")\n    if len(fields) != 2 or not fields[0].strip():\n        return {\"ok\": False}\n    try:\n        number = int(fields[1])\n    except ValueError:\n        return {\"ok\": False}\n    return {\"ok\": True, \"name\": fields[0].strip(), \"value\": number}\nasync def report(texts):\n    output = {\"success\": 0, \"errors\": 0, \"total\": 0}\n    for text in texts:\n        item = await parse_record(text)\n        if item[\"ok\"]:\n            output[\"success\"] += 1\n            output[\"total\"] += item[\"value\"]\n        else:\n            output[\"errors\"] += 1\n    return output",
          "wrongSolutions": [
            {
              "code": "import asyncio\nasync def parse_record(text):\n    await asyncio.sleep(0)\n    if text.count(\":\") != 1:\n        return {\"ok\": False}\n    name, raw = text.split(\":\")\n    name = name.strip()\n    if not name:\n        return {\"ok\": False}\n    try:\n        value = int(raw)\n    except ValueError:\n        return {\"ok\": False}\n    return {\"ok\": True, \"name\": name, \"value\": value}\nasync def report(texts):\n    results = [await parse_record(text) for text in texts]\n    success = sum(bool(item.get(\"value\")) for item in results)\n    return {\"success\": success, \"errors\": len(results) - success, \"total\": sum(item.get(\"value\", 0) for item in results)}",
              "why": "Ноль ошибочно не считается успешной записью."
            },
            {
              "code": "import asyncio\nasync def parse_record(text):\n    await asyncio.sleep(0)\n    if text.count(\":\") != 1:\n        return {\"ok\": False}\n    name, raw = text.split(\":\")\n    name = name.strip()\n    if not name:\n        return {\"ok\": False}\n    try:\n        value = int(raw)\n    except ValueError:\n        return {\"ok\": False}\n    return {\"ok\": True, \"name\": name, \"value\": value}\nasync def report(texts):\n    data = {}\n    errors = 0\n    for text in texts:\n        item = await parse_record(text)\n        if item[\"ok\"]:\n            data[item[\"name\"]] = item[\"value\"]\n        else:\n            errors += 1\n    return {\"success\": len(data), \"errors\": errors, \"total\": sum(data.values())}",
              "why": "Повторное имя перезаписывает запись, хотя каждая должна учитываться."
            }
          ],
          "hints": [
            "Считай успех по ok, не по истинности value.",
            "Ошибки и сумма — независимые накопители.",
            "Повторные имена сохраняются отдельными записями списка."
          ],
          "solutionExplanation": [
            "Отчёт соединяет явные статусы и числовую сводку, не пряча неверные записи.",
            "Ноль ошибочно не считается успешной записью.",
            "Повторное имя перезаписывает запись, хотя каждая должна учитываться."
          ],
          "required": true
        },
        {
          "id": "async-python-batch-project-project-review",
          "kind": "explain",
          "title": "Чего отчёт не доказывает?",
          "goal": "Чего отчёт не доказывает?",
          "prerequisites": [
            "async-python-batch-project"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "results = []",
                "print({\"success\": len(results), \"errors\": 0, \"total\": 0})"
              ],
              "output": "{'success': 0, 'errors': 0, 'total': 0}",
              "explanation": "Разобранный пример по этой идее: При отсутствии работ отчёт завершён, но не содержит выдуманной успешной записи. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Учебный результат имеет конкретные границы; внешние сервисы и производительность проверяются отдельно."
          ],
          "required": true,
          "answer": [
            "1",
            "3"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Корректный отчёт показывает соблюдение контракта на проверенных входах."
            },
            {
              "id": "2",
              "text": "Совпадение значений само по себе доказывает фактическое конкурентное планирование."
            },
            {
              "id": "3",
              "text": "Работа без сети не подтверждает обработку реальных сетевых сбоев."
            }
          ]
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.12/library/asyncio-task.html",
    "https://docs.python.org/3.12/library/asyncio-sync.html",
    "https://docs.python.org/3.12/library/asyncio-exceptions.html"
  ]
};
export default content;
