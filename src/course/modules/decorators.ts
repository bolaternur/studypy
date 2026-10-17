import type { CourseModule } from '../types';
const content: CourseModule = {
  "id": "decorators",
  "title": "Замыкания и декораторы: первое знакомство",
  "goal": "Управлять обёрткой, аргументами и состоянием без скрытия ошибок.",
  "track": "advanced",
  "depth": "Вводная последовательность",
  "prerequisites": [
    "functions",
    "debugging"
  ],
  "lessons": [
    {
      "id": "decorators-callables",
      "title": "Функция как значение",
      "goal": "Передавать функцию без вызова и использовать результат вызова.",
      "prerequisites": [],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "decorators-callables-idea",
          "title": "Как это работает",
          "paragraphs": [
            "В Python функция является объектом. Её можно присвоить другому имени, положить в коллекцию, передать как аргумент и вернуть из другой функции. Запись process передаёт сам объект, а process(value) вызывает его. Если вызывающий код ждёт функцию, преждевременные скобки передадут уже вычисленное значение и изменят смысл программы.",
            "Callable — объект, который можно вызвать через скобки. Обычная функция подходит; другие вызываемые объекты изучаются в ООП. Предикат callable помогает исследовать объект, но не доказывает корректность любых аргументов. У функции есть контракт: допустимые параметры и результат. Передать abs туда, где ожидается функция двух аргументов, недостаточно только потому, что abs вызываем."
          ],
          "examples": [
            {
              "id": "decorators-callables-example-1",
              "title": "Передать без вызова",
              "code": "def double(x):\n    return x*2\naction=double\nprint(action(4))\nprint(callable(action))",
              "output": "8\nTrue",
              "explanation": "Имя action ссылается на тот же вызываемый объект; скобки появились только при применении к 4."
            }
          ],
          "goal": "Передавать функцию без вызова и использовать результат вызова.",
          "prerequisites": []
        },
        {
          "id": "decorators-callables-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Функция высшего порядка принимает либо возвращает другую функцию. Например, apply_twice(action,value) применяет action к значению, затем к первому результату. Для этого тип результата должен быть допустимым следующим аргументом. Это не делает функцию волшебной: обычный порядок вычислений и return продолжают действовать. Печать вместо return прерывает полезную композицию значением None.",
            "Данная последовательность вводит замыкания и декораторы после обычных функций. Она не обещает освоение всех фреймворков. Сначала учимся видеть объект функции и момент вызова, затем состояние обёртки и только потом краткую запись @. В тестах передаются разные входные функции, поэтому заранее посчитанная константа или код только для одного примера не соответствует контракту."
          ],
          "examples": [
            {
              "id": "decorators-callables-example-2",
              "title": "Применить два раза",
              "code": "def increase(x):\n    return x+1\ndef twice(action,value):\n    return action(action(value))\nprint(twice(increase,3))",
              "output": "5",
              "explanation": "Передан объект increase, затем два вызова дают 4 и 5."
            },
            {
              "id": "decorators-callables-example-3",
              "title": "Результат уже не функция",
              "code": "def amount():\n    return 7\nprint(callable(amount))\nprint(callable(amount()))",
              "output": "True\nFalse",
              "explanation": "Сама amount вызываема, её целочисленный результат — нет."
            }
          ],
          "goal": "Передавать функцию без вызова и использовать результат вызова.",
          "prerequisites": [
            "decorators-callables-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "decorators-callables-twice",
          "kind": "code",
          "title": "Два применения переданной функции",
          "goal": "Два применения переданной функции",
          "prerequisites": [
            "decorators-callables"
          ],
          "prompt": "Реализуй apply_twice(action,value), возвращающую action(action(value)). Функция action допускает оба вызова. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "apply_twice(callable,value) → результат.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Переданные функции завершаются, не печатают и не обращаются к сети/файлам. value и оба промежуточных результата — целые от −1000000 до 1000000. action допускает оба последовательных вызова.",
          "examples": [
            {
              "input": [
                "def _course_step(x):\n    return x+2",
                "apply_twice(_course_step,1)"
              ],
              "output": "5",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Два вызова композиционно связаны; конкретный алгоритм action остаётся параметром."
            },
            {
              "input": [
                "def _course_square(x):\n    return x*x",
                "apply_twice(_course_square,2)"
              ],
              "output": "16",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Два вызова композиционно связаны; конкретный алгоритм action остаётся параметром."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "apply_twice(_course_step,1)",
              "expectedValue": 5,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "apply_twice(_course_step,1)",
              "setup": "def _course_step(x):\n    return x+2"
            },
            {
              "expression": "apply_twice(_course_square,2)",
              "expectedValue": 16,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "apply_twice(_course_square,2)",
              "setup": "def _course_square(x):\n    return x*x"
            },
            {
              "expression": "apply_twice(abs,-3)",
              "expectedValue": 3,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "apply_twice(abs,-3)"
            }
          ],
          "reference": "def apply_twice(action,value):\n    first=action(value)\n    return action(first)",
          "alternative": "def apply_twice(action,value):\n    for unused in range(2):\n        value=action(value)\n    return value",
          "wrongSolutions": [
            {
              "code": "def apply_twice(action,value):\n    return action(value)",
              "why": "Выполнено только одно применение."
            },
            {
              "code": "def apply_twice(action,value):\n    return value*2",
              "why": "Игнорируется переданный callable."
            }
          ],
          "hints": [
            "Передавай функцию без скобок.",
            "Первый результат становится входом второго вызова.",
            "Верни второй результат."
          ],
          "solutionExplanation": [
            "Два вызова композиционно связаны; конкретный алгоритм action остаётся параметром.",
            "Выполнено только одно применение.",
            "Игнорируется переданный callable."
          ],
          "required": true
        },
        {
          "id": "decorators-callables-map",
          "kind": "code",
          "title": "Применить к каждому элементу",
          "goal": "Применить к каждому элементу",
          "prerequisites": [
            "decorators-callables"
          ],
          "prompt": "Реализуй apply_all(action,values), возвращающую новый список action(x) в исходном порядке. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "apply_all(callable,list) → list.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Переданные функции завершаются, не печатают и не обращаются к сети/файлам. Список до 100 целых от −1000 до 1000; каждый результат action — целое по модулю до 1000000. Результат до 100 элементов.",
          "examples": [
            {
              "input": [
                "apply_all(abs,[-2,0,3])"
              ],
              "output": "[2, 0, 3]",
              "explanation": "Функция обработки данных не зависит от конкретного преобразования."
            },
            {
              "input": [
                "def _course_step(x):\n    return x+2",
                "apply_all(_course_step,[1,2])"
              ],
              "output": "[3, 4]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Функция обработки данных не зависит от конкретного преобразования."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "apply_all(abs,[-2,0,3])",
              "expectedValue": [
                2,
                0,
                3
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "apply_all(abs,[-2,0,3])"
            },
            {
              "expression": "apply_all(_course_step,[1,2])",
              "expectedValue": [
                3,
                4
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "apply_all(_course_step,[1,2])",
              "setup": "def _course_step(x):\n    return x+2"
            },
            {
              "expression": "apply_all(abs,[])",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "apply_all(abs,[])"
            }
          ],
          "reference": "def apply_all(action,values):\n    return [action(x) for x in values]",
          "alternative": "def apply_all(action,values):\n    result=[]\n    for x in values:\n        result.append(action(x))\n    return result",
          "wrongSolutions": [
            {
              "code": "def apply_all(action,values):\n    return values",
              "why": "Никакого преобразования не выполнено."
            },
            {
              "code": "def apply_all(action,values):\n    return sorted([action(x) for x in values])",
              "why": "Сортировка нарушает исходное соответствие позициям."
            }
          ],
          "hints": [
            "Один вход даёт один результат.",
            "Вызывай именно переданную action.",
            "Не меняй порядок списка."
          ],
          "solutionExplanation": [
            "Функция обработки данных не зависит от конкретного преобразования.",
            "Никакого преобразования не выполнено.",
            "Сортировка нарушает исходное соответствие позициям."
          ],
          "required": true
        },
        {
          "id": "decorators-callables-select",
          "kind": "code",
          "title": "Выбрать по предикату",
          "goal": "Выбрать по предикату",
          "prerequisites": [
            "decorators-callables"
          ],
          "prompt": "Реализуй select(predicate,values), сохраняющую элементы, для которых predicate(x) истинно. Верни новый список. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "select(callable,list) → list.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Переданные функции завершаются, не печатают и не обращаются к сети/файлам. До 100 целых от −1000 до 1000; predicate возвращает bool за конечное число действий. Сохраняются исходные элементы, не ответы предиката.",
          "examples": [
            {
              "input": [
                "def _course_even(x):\n    return x%2==0",
                "select(_course_even,[3,2,4,1])"
              ],
              "output": "[2, 4]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Фильтр отделяет правило выбора от структуры перебора."
            },
            {
              "input": [
                "select(bool,[0,2,0,3])"
              ],
              "output": "[2, 3]",
              "explanation": "Фильтр отделяет правило выбора от структуры перебора."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "select(_course_even,[3,2,4,1])",
              "expectedValue": [
                2,
                4
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "select(_course_even,[3,2,4,1])",
              "setup": "def _course_even(x):\n    return x%2==0"
            },
            {
              "expression": "select(bool,[0,2,0,3])",
              "expectedValue": [
                2,
                3
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "select(bool,[0,2,0,3])"
            },
            {
              "expression": "select(bool,[])",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "select(bool,[])"
            }
          ],
          "reference": "def select(predicate,values):\n    return [x for x in values if predicate(x)]",
          "alternative": "def select(predicate,values):\n    result=[]\n    for x in values:\n        if predicate(x):\n            result.append(x)\n    return result",
          "wrongSolutions": [
            {
              "code": "def select(predicate,values):\n    return [predicate(x) for x in values]",
              "why": "Возвращает логические ответы вместо выбранных элементов."
            },
            {
              "code": "def select(predicate,values):\n    return [x for x in values if not predicate(x)]",
              "why": "Условие отбора инвертировано."
            }
          ],
          "hints": [
            "Предикат решает, сохранять ли исходный элемент.",
            "Сам результат predicate не добавляется в список.",
            "Условие используется без not."
          ],
          "solutionExplanation": [
            "Фильтр отделяет правило выбора от структуры перебора.",
            "Возвращает логические ответы вместо выбранных элементов.",
            "Условие отбора инвертировано."
          ],
          "required": true
        },
        {
          "id": "decorators-callables-object-call",
          "kind": "choice",
          "title": "Имя и вызов",
          "goal": "Имя и вызов",
          "prerequisites": [
            "decorators-callables"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "def amount():",
                "    return 7",
                "print(callable(amount))",
                "print(callable(amount()))"
              ],
              "output": "True\nFalse",
              "explanation": "Разобранный пример по этой идее: Сама amount вызываема, её целочисленный результат — нет. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Вызываемость не заменяет контракт параметров."
          ],
          "required": true,
          "answer": [
            "1",
            "2"
          ],
          "choices": [
            {
              "id": "1",
              "text": "fn передаёт объект функции."
            },
            {
              "id": "2",
              "text": "fn() вызывает функцию без аргументов."
            },
            {
              "id": "3",
              "text": "callable(fn) гарантирует правильность любого набора аргументов."
            }
          ]
        }
      ]
    },
    {
      "id": "decorators-closures",
      "title": "Замыкание и nonlocal",
      "goal": "Сохранять независимое состояние между вызовами возвращённой функции.",
      "prerequisites": [
        "decorators-callables"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "decorators-closures-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Вложенная функция может обращаться к именам окружающей функции даже после её завершения. Такая связь называется замыканием. Фабрика make_adder(offset) возвращает внутреннюю add, которая помнит свой offset. Два вызова фабрики создают два независимых окружения. Это не то же самое, что глобальная переменная: глобальное состояние разделялось бы всеми такими функциями.",
            "Чтение внешнего имени не требует специального слова. Если нужно переприсвоить его внутри вложенной функции, объяви nonlocal name. Без этого присваивание создаёт локальное имя, а попытка прочитать его прежнее значение может вызвать UnboundLocalError. nonlocal относится к ближайшей подходящей области окружающих функций, а не к модулю; для имён модуля есть другое слово global."
          ],
          "examples": [
            {
              "id": "decorators-closures-example-1",
              "title": "Фабрика прибавлений",
              "code": "def make_adder(offset):\n    def add(value):\n        return value+offset\n    return add\na=make_adder(2)\nb=make_adder(10)\nprint(a(3),b(3))",
              "output": "5 13",
              "explanation": "Каждая возвращённая функция помнит свой offset."
            }
          ],
          "goal": "Сохранять независимое состояние между вызовами возвращённой функции.",
          "prerequisites": [
            "decorators-callables"
          ]
        },
        {
          "id": "decorators-closures-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Изменяемый объект позволяет сохранять состояние без переприсваивания имени, например state[\"total\"] += delta. Это допустимая альтернатива, но общий смысл тот же: окружение конкретного вызова фабрики должно быть независимым. Нельзя вынести один список или словарь наружу и ожидать изоляции счётчиков. Тесты создают две фабрики и чередуют вызовы, чтобы увидеть утечку состояния.",
            "Замыкание удобно для небольшого счётчика, настройки или будущей обёртки. Если состояние становится сложным, объект класса может описывать его яснее. В этом уроке не нужны декораторная запись @ и атрибуты функции: сначала проследи, какая внутренняя функция возвращена и какое окружение она читает. Не возвращай результат единственного вызова вместо самой функции."
          ],
          "examples": [
            {
              "id": "decorators-closures-example-2",
              "title": "Изменение внешнего имени",
              "code": "def make_counter():\n    value=0\n    def increment():\n        nonlocal value\n        value+=1\n        return value\n    return increment\ncounter=make_counter()\nprint(counter(),counter())",
              "output": "1 2",
              "explanation": "nonlocal позволяет сохранить обновлённое значение между вызовами."
            },
            {
              "id": "decorators-closures-example-3",
              "title": "Независимый новый счётчик",
              "code": "def make_counter():\n    value=0\n    def step():\n        nonlocal value\n        value+=1\n        return value\n    return step\na=make_counter()\nb=make_counter()\nprint(a(),a(),b())",
              "output": "1 2 1",
              "explanation": "b начинает с единицы, хотя a уже вызывался два раза."
            }
          ],
          "goal": "Сохранять независимое состояние между вызовами возвращённой функции.",
          "prerequisites": [
            "decorators-closures-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "decorators-closures-adder",
          "kind": "code",
          "title": "Фабрика прибавления",
          "goal": "Фабрика прибавления",
          "prerequisites": [
            "decorators-closures"
          ],
          "prompt": "Реализуй make_adder(offset), возвращающую функцию одного аргумента value, которая возвращает value+offset. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "make_adder(int) → callable(int) → int.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "offset и value — целые от −1000 до 1000; до 100 вызовов созданной функции. Результат по модулю до 2000.",
          "examples": [
            {
              "input": [
                "make_adder(2)(3)"
              ],
              "output": "5",
              "explanation": "Окружение фабрики становится настройкой возвращённого действия."
            },
            {
              "input": [
                "[make_adder(-2)(5),make_adder(10)(0)]"
              ],
              "output": "[3, 10]",
              "explanation": "Окружение фабрики становится настройкой возвращённого действия."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "make_adder(2)(3)",
              "expectedValue": 5,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "make_adder(2)(3)"
            },
            {
              "expression": "[make_adder(-2)(5),make_adder(10)(0)]",
              "expectedValue": [
                3,
                10
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[make_adder(-2)(5),make_adder(10)(0)]"
            },
            {
              "expression": "make_adder(0)(7)",
              "expectedValue": 7,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "make_adder(0)(7)"
            }
          ],
          "reference": "def make_adder(offset):\n    def add(value):\n        return value+offset\n    return add",
          "alternative": "def make_adder(offset):\n    return lambda value:value+offset",
          "wrongSolutions": [
            {
              "code": "def make_adder(offset):\n    return offset",
              "why": "Возвращено число вместо функции."
            },
            {
              "code": "def make_adder(offset):\n    def add(value):\n        return value*offset\n    return add",
              "why": "Контракт требует сложение, не умножение."
            }
          ],
          "hints": [
            "Внешняя функция сохраняет настройку.",
            "Внутренняя получает текущее значение.",
            "Возвращай внутреннюю функцию без её вызова."
          ],
          "solutionExplanation": [
            "Окружение фабрики становится настройкой возвращённого действия.",
            "Возвращено число вместо функции.",
            "Контракт требует сложение, не умножение."
          ],
          "required": true
        },
        {
          "id": "decorators-closures-counter",
          "kind": "code",
          "title": "Независимые счётчики",
          "goal": "Независимые счётчики",
          "prerequisites": [
            "decorators-closures"
          ],
          "prompt": "Реализуй make_counter(start=0), возвращающую функцию без аргументов: каждый вызов увеличивает своё состояние на 1 и возвращает его. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "make_counter(int=0) → callable() → int.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "start — целое от −1000 до 1000, по 0…100 вызовов каждого счётчика. До 10 независимых фабрик в проверке, состояние не глобальное.",
          "examples": [
            {
              "input": [
                "[(c:=make_counter(2))(),c(),make_counter(2)()]"
              ],
              "output": "[3, 4, 3]",
              "explanation": "Новый вызов фабрики начинает независимую историю."
            },
            {
              "input": [
                "[(c:=make_counter())(),c()]"
              ],
              "output": "[1, 2]",
              "explanation": "Новый вызов фабрики начинает независимую историю."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "[(c:=make_counter(2))(),c(),make_counter(2)()]",
              "expectedValue": [
                3,
                4,
                3
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(c:=make_counter(2))(),c(),make_counter(2)()]"
            },
            {
              "expression": "[(c:=make_counter())(),c()]",
              "expectedValue": [
                1,
                2
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(c:=make_counter())(),c()]"
            },
            {
              "expression": "make_counter(-2)()",
              "expectedValue": -1,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "make_counter(-2)()"
            }
          ],
          "reference": "def make_counter(start=0):\n    value=start\n    def step():\n        nonlocal value\n        value+=1\n        return value\n    return step",
          "alternative": "def make_counter(start=0):\n    state={\"value\":start}\n    def step():\n        state[\"value\"]+=1\n        return state[\"value\"]\n    return step",
          "wrongSolutions": [
            {
              "code": "def make_counter(start=0):\n    def step():\n        return start+1\n    return step",
              "why": "Состояние не сохраняется между вызовами."
            },
            {
              "code": "def make_counter(start=0):\n    value=start\n    def step():\n        value+=1\n        return value\n    return step",
              "why": "Переприсваивание без nonlocal создаёт ошибочную локальную область."
            }
          ],
          "hints": [
            "Состояние принадлежит одному вызову фабрики.",
            "Для переприсваивания внешнего value объяви nonlocal.",
            "Проверь два вызова одного счётчика и первый вызов другого."
          ],
          "solutionExplanation": [
            "Новый вызов фабрики начинает независимую историю.",
            "Состояние не сохраняется между вызовами.",
            "Переприсваивание без nonlocal создаёт ошибочную локальную область."
          ],
          "required": true
        },
        {
          "id": "decorators-closures-total",
          "kind": "code",
          "title": "Накопитель с добавлением",
          "goal": "Накопитель с добавлением",
          "prerequisites": [
            "decorators-closures"
          ],
          "prompt": "Реализуй make_total(start=0), возвращающую функцию add(delta): она прибавляет delta к состоянию и возвращает новую сумму. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "make_total(int=0) → callable(int) → int.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "start и delta — целые от −1000 до 1000; до 100 добавлений одному накопителю. Состояние по модулю не больше 101000.",
          "examples": [
            {
              "input": [
                "[(a:=make_total(5))(2),a(-3),make_total(5)(0)]"
              ],
              "output": "[7, 4, 5]",
              "explanation": "Замыкание хранит агрегат, а не всю историю значений."
            },
            {
              "input": [
                "make_total()(0)"
              ],
              "output": "0",
              "explanation": "Замыкание хранит агрегат, а не всю историю значений."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "[(a:=make_total(5))(2),a(-3),make_total(5)(0)]",
              "expectedValue": [
                7,
                4,
                5
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(a:=make_total(5))(2),a(-3),make_total(5)(0)]"
            },
            {
              "expression": "make_total()(0)",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "make_total()(0)"
            },
            {
              "expression": "make_total(-2)(1)",
              "expectedValue": -1,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "make_total(-2)(1)"
            }
          ],
          "reference": "def make_total(start=0):\n    total=start\n    def add(delta):\n        nonlocal total\n        total+=delta\n        return total\n    return add",
          "alternative": "def make_total(start=0):\n    values=[start]\n    def add(delta):\n        values[0]+=delta\n        return values[0]\n    return add",
          "wrongSolutions": [
            {
              "code": "def make_total(start=0):\n    def add(delta):\n        return start+delta\n    return add",
              "why": "Игнорирует историю предыдущих добавлений."
            },
            {
              "code": "def make_total(start=0):\n    total=start\n    def add(delta):\n        nonlocal total\n        total+=1\n        return total\n    return add",
              "why": "Прибавляет единицу вместо переданного delta."
            }
          ],
          "hints": [
            "Сумма обновляется на конкретный delta.",
            "Нулевое добавление сохраняет состояние.",
            "Возврат нужен после обновления."
          ],
          "solutionExplanation": [
            "Замыкание хранит агрегат, а не всю историю значений.",
            "Игнорирует историю предыдущих добавлений.",
            "Прибавляет единицу вместо переданного delta."
          ],
          "required": true
        },
        {
          "id": "decorators-closures-nonlocal",
          "kind": "choice",
          "title": "Когда нужен nonlocal?",
          "goal": "Когда нужен nonlocal?",
          "prerequisites": [
            "decorators-closures"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "def make_counter():",
                "    value=0",
                "    def step():",
                "        nonlocal value",
                "        value+=1",
                "        return value",
                "    return step",
                "a=make_counter()",
                "b=make_counter()",
                "print(a(),a(),b())"
              ],
              "output": "1 2 1",
              "explanation": "Разобранный пример по этой идее: b начинает с единицы, хотя a уже вызывался два раза. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Чтение и переприсваивание имеют разные правила областей имён."
          ],
          "required": true,
          "answer": [
            "1",
            "3"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Для переприсваивания имени окружающей функции во вложенной."
            },
            {
              "id": "2",
              "text": "Для любого чтения внешнего имени он обязателен."
            },
            {
              "id": "3",
              "text": "Каждый вызов фабрики может иметь независимое окружение."
            }
          ]
        }
      ]
    },
    {
      "id": "decorators-wrappers",
      "title": "Обёртка и запись @",
      "goal": "Добавлять поведение вокруг вызова, сохраняя результат.",
      "prerequisites": [
        "decorators-closures"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "decorators-wrappers-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Декоратор принимает функцию и возвращает вызываемый объект, обычно новую функцию-обёртку. Обёртка выполняет действие до исходного вызова, получает его результат и может выполнить действие после. Простейшая схема: def decorate(fn): def wrapper(value): return fn(value); return wrapper. Здесь два return имеют разную роль: внешний отдаёт функцию, внутренний — результат конкретного вызова.",
            "Запись @decorate перед def target равносильна target = decorate(target) после определения. Декоратор применяется при выполнении определения, а обёртка — при каждом последующем вызове. Поэтому нельзя переносить действие одного уровня на другой случайно. Сообщение внутри decorate появилось бы при создании функции, а не каждый раз при её использовании."
          ],
          "examples": [
            {
              "id": "decorators-wrappers-example-1",
              "title": "Простая обёртка",
              "code": "def double_result(fn):\n    def wrapper(value):\n        return fn(value)*2\n    return wrapper\ndef increase(x):\n    return x+1\nwrapped=double_result(increase)\nprint(wrapped(3))",
              "output": "8",
              "explanation": "Сначала increase даёт 4, затем обёртка удваивает результат до 8."
            }
          ],
          "goal": "Добавлять поведение вокруг вызова, сохраняя результат.",
          "prerequisites": [
            "decorators-closures"
          ]
        },
        {
          "id": "decorators-wrappers-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Частая ошибка — вызвать fn, но забыть return в wrapper. Исходная функция посчитает число, но пользователю обёртки достанется None. Вторая ошибка — вернуть wrapper() из декоратора: это преждевременный вызов, иногда ещё и без требуемых аргументов. Сначала рисуй цепочку: создание обёртки → вызов обёртки → исходный вызов → возврат результата.",
            "Для наблюдения за вызовами в заданиях используется переданный список log. Это учебный журнал в памяти, а не отправка сообщений или телеметрия. Он позволяет проверить количество вызовов и порядок действий без времени и сети. В этом уроке обёртки принимают один аргумент; универсальное перенаправление параметров будет следующим отдельным шагом."
          ],
          "examples": [
            {
              "id": "decorators-wrappers-example-2",
              "title": "Та же схема через @",
              "code": "def double_result(fn):\n    def wrapper(value):\n        return fn(value)*2\n    return wrapper\n@double_result\ndef increase(x):\n    return x+1\nprint(increase(3))",
              "output": "8",
              "explanation": "Имя increase теперь связано с обёрткой, но исходная функция сохранена в замыкании."
            },
            {
              "id": "decorators-wrappers-example-3",
              "title": "Два момента выполнения",
              "code": "events=[]\ndef decorate(fn):\n    events.append(\"создание\")\n    def wrapper(x):\n        events.append(\"вызов\")\n        return fn(x)\n    return wrapper\n@decorate\ndef value(x):\n    return x\nprint(events)\nvalue(1)\nprint(events)",
              "output": "['создание']\n['создание', 'вызов']",
              "explanation": "Декорирование происходит один раз, поведение wrapper — при каждом вызове."
            }
          ],
          "goal": "Добавлять поведение вокруг вызова, сохраняя результат.",
          "prerequisites": [
            "decorators-wrappers-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "decorators-wrappers-double",
          "kind": "code",
          "title": "Удвоить возвращённый результат",
          "goal": "Удвоить возвращённый результат",
          "prerequisites": [
            "decorators-wrappers"
          ],
          "prompt": "Реализуй double_result(fn), возвращающую обёртку одного аргумента, которая удваивает числовой результат fn. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "double_result(callable) → callable(value).",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Переданные функции завершаются, не печатают и не обращаются к сети/файлам. Один целый аргумент по модулю до 1000, результат fn по модулю до 1000000. Возвращаемое удвоение по модулю до 2000000.",
          "examples": [
            {
              "input": [
                "double_result(abs)(-3)"
              ],
              "output": "6",
              "explanation": "Обёртка сохраняет интерфейс одного аргумента, но меняет результат по правилу."
            },
            {
              "input": [
                "def _course_step(x):\n    return x+2",
                "double_result(_course_step)(2)"
              ],
              "output": "8",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Обёртка сохраняет интерфейс одного аргумента, но меняет результат по правилу."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "double_result(abs)(-3)",
              "expectedValue": 6,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "double_result(abs)(-3)"
            },
            {
              "expression": "double_result(_course_step)(2)",
              "expectedValue": 8,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "double_result(_course_step)(2)",
              "setup": "def _course_step(x):\n    return x+2"
            },
            {
              "expression": "double_result(abs)(0)",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "double_result(abs)(0)"
            }
          ],
          "reference": "def double_result(fn):\n    def wrapper(value):\n        return fn(value)*2\n    return wrapper",
          "alternative": "def double_result(fn):\n    return lambda value:2*fn(value)",
          "wrongSolutions": [
            {
              "code": "def double_result(fn):\n    def wrapper(value):\n        fn(value)*2\n    return wrapper",
              "why": "Обёртка потеряла return."
            },
            {
              "code": "def double_result(fn):\n    def wrapper(value):\n        return fn(value*2)\n    return wrapper",
              "why": "Удвоение аргумента не равно удвоению результата произвольной fn."
            }
          ],
          "hints": [
            "Сначала вызови исходную функцию.",
            "Преобразуй именно её результат.",
            "Верни wrapper без преждевременного вызова."
          ],
          "solutionExplanation": [
            "Обёртка сохраняет интерфейс одного аргумента, но меняет результат по правилу.",
            "Обёртка потеряла return.",
            "Удвоение аргумента не равно удвоению результата произвольной fn."
          ],
          "required": true
        },
        {
          "id": "decorators-wrappers-log",
          "kind": "code",
          "title": "Журнал каждого вызова",
          "goal": "Журнал каждого вызова",
          "prerequisites": [
            "decorators-wrappers"
          ],
          "prompt": "Реализуй logged(fn,log), возвращающую обёртку одного аргумента: сначала добавь аргумент в log, затем вызови fn и верни результат. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "logged(callable,list) → callable(value).",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Переданные функции завершаются, не печатают и не обращаются к сети/файлам. Аргументы и результаты — целые по модулю до 1000000. До 100 вызовов, начальный log пустой; в него добавляется один аргумент на вызов.",
          "examples": [
            {
              "input": [
                "log=[]",
                "[(w:=logged(abs,log))(-2),w(0),log]"
              ],
              "output": "[2, 0, [-2, 0]]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Журнал фиксирует отдельные вызовы без изменения возвращаемого значения."
            },
            {
              "input": [
                "def _course_step(x):\n    return x+2\nlog=[]",
                "[(w:=logged(_course_step,log))(3),log]"
              ],
              "output": "[5, [3]]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Журнал фиксирует отдельные вызовы без изменения возвращаемого значения."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "[(w:=logged(abs,log))(-2),w(0),log]",
              "expectedValue": [
                2,
                0,
                [
                  -2,
                  0
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(w:=logged(abs,log))(-2),w(0),log]",
              "setup": "log=[]"
            },
            {
              "expression": "[(w:=logged(_course_step,log))(3),log]",
              "expectedValue": [
                5,
                [
                  3
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(w:=logged(_course_step,log))(3),log]",
              "setup": "def _course_step(x):\n    return x+2\nlog=[]"
            },
            {
              "expression": "[(w:=logged(abs,log))(4),log]",
              "expectedValue": [
                4,
                [
                  4
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(w:=logged(abs,log))(4),log]",
              "setup": "log=[]"
            }
          ],
          "reference": "def logged(fn,log):\n    def wrapper(value):\n        log.append(value)\n        return fn(value)\n    return wrapper",
          "alternative": "def logged(fn,log):\n    def wrapper(value):\n        log.extend([value])\n        result=fn(value)\n        return result\n    return wrapper",
          "wrongSolutions": [
            {
              "code": "def logged(fn,log):\n    def wrapper(value):\n        return fn(value)\n    return wrapper",
              "why": "Журнал не обновляется."
            },
            {
              "code": "def logged(fn,log):\n    def wrapper(value):\n        log.append(fn(value))\n        return fn(value)\n    return wrapper",
              "why": "Записан результат вместо аргумента и функция вызвана дважды."
            }
          ],
          "hints": [
            "Действие журнала стоит до исходного вызова.",
            "Записывается переданный value.",
            "Исходную fn вызывай один раз."
          ],
          "solutionExplanation": [
            "Журнал фиксирует отдельные вызовы без изменения возвращаемого значения.",
            "Журнал не обновляется.",
            "Записан результат вместо аргумента и функция вызвана дважды."
          ],
          "required": true
        },
        {
          "id": "decorators-wrappers-guard",
          "kind": "code",
          "title": "Отклонить отрицательный аргумент",
          "goal": "Отклонить отрицательный аргумент",
          "prerequisites": [
            "decorators-wrappers"
          ],
          "prompt": "Реализуй nonnegative(fn): обёртка возвращает None для value<0 без вызова fn, иначе возвращает fn(value). Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "nonnegative(callable) → callable(value).",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Переданные функции завершаются, не печатают и не обращаются к сети/файлам. Целый аргумент −1000…1000, результат допустимого вызова fn по модулю до 1000000. Для отрицательного аргумента вызов fn запрещён.",
          "examples": [
            {
              "input": [
                "log=[]\ndef _course_fn(x):\n    log.append(x)\n    return x+1",
                "[(w:=nonnegative(_course_fn))(-2),log]"
              ],
              "output": "[None, []]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Проверка отсутствия вызова наблюдается через журнал входной функции."
            },
            {
              "input": [
                "nonnegative(abs)(0)"
              ],
              "output": "0",
              "explanation": "Проверка отсутствия вызова наблюдается через журнал входной функции."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "[(w:=nonnegative(_course_fn))(-2),log]",
              "expectedValue": [
                null,
                []
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(w:=nonnegative(_course_fn))(-2),log]",
              "setup": "log=[]\ndef _course_fn(x):\n    log.append(x)\n    return x+1"
            },
            {
              "expression": "nonnegative(abs)(0)",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "nonnegative(abs)(0)"
            },
            {
              "expression": "nonnegative(_course_step)(2)",
              "expectedValue": 4,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "nonnegative(_course_step)(2)",
              "setup": "def _course_step(x):\n    return x+2"
            }
          ],
          "reference": "def nonnegative(fn):\n    def wrapper(value):\n        if value<0:\n            return None\n        return fn(value)\n    return wrapper",
          "alternative": "def nonnegative(fn):\n    def wrapper(value):\n        return fn(value) if value>=0 else None\n    return wrapper",
          "wrongSolutions": [
            {
              "code": "def nonnegative(fn):\n    def wrapper(value):\n        result=fn(value)\n        return result if value>=0 else None\n    return wrapper",
              "why": "Проверка после вызова не предотвращает запрещённый побочный эффект."
            },
            {
              "code": "def nonnegative(fn):\n    def wrapper(value):\n        return fn(value) if value>0 else None\n    return wrapper",
              "why": "Ноль разрешён и не должен отвергаться."
            }
          ],
          "hints": [
            "Проверяй аргумент до вызова.",
            "Отрицательная ветка завершается ранним return.",
            "Сохрани успешный ноль как результат."
          ],
          "solutionExplanation": [
            "Проверка отсутствия вызова наблюдается через журнал входной функции.",
            "Проверка после вызова не предотвращает запрещённый побочный эффект.",
            "Ноль разрешён и не должен отвергаться."
          ],
          "required": true
        },
        {
          "id": "decorators-wrappers-at",
          "kind": "choice",
          "title": "Что делает @?",
          "goal": "Что делает @?",
          "prerequisites": [
            "decorators-wrappers"
          ],
          "prompt": "Какая запись соответствует @decorate перед def f?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "events=[]",
                "def decorate(fn):",
                "    events.append(\"создание\")",
                "    def wrapper(x):",
                "        events.append(\"вызов\")",
                "        return fn(x)",
                "    return wrapper",
                "@decorate",
                "def value(x):",
                "    return x",
                "print(events)",
                "value(1)",
                "print(events)"
              ],
              "output": "['создание']\n['создание', 'вызов']",
              "explanation": "Разобранный пример по этой идее: Декорирование происходит один раз, поведение wrapper — при каждом вызове. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Создание обёртки и её последующие вызовы происходят на разных этапах."
          ],
          "required": true,
          "answer": [
            "1",
            "3"
          ],
          "choices": [
            {
              "id": "1",
              "text": "f = decorate(f) после определения f."
            },
            {
              "id": "2",
              "text": "f = decorate(f()) при каждом обращении к имени."
            },
            {
              "id": "3",
              "text": "Декоратор применяется при выполнении определения."
            }
          ]
        }
      ]
    },
    {
      "id": "decorators-arguments",
      "title": "*args, **kwargs и именованные параметры",
      "goal": "Перенаправлять аргументы без потери структуры вызова.",
      "prerequisites": [
        "decorators-wrappers"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "decorators-arguments-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Параметр *args собирает дополнительные позиционные аргументы в кортеж. Вызов total(2,3) передаёт два числа, а внутри total(*numbers) они доступны в numbers. Параметр **kwargs собирает именованные аргументы в словарь. Имена args и kwargs являются соглашением, а звёздочки задают синтаксический смысл. Не путай сбор аргументов в определении и распаковку при вызове.",
            "Универсальная обёртка обычно записывает def wrapper(*args,**kwargs): return fn(*args,**kwargs). Без звёздочек fn(args,kwargs) передала бы два контейнера вместо исходных аргументов. Если передать только *args, потеряются настройки по имени. Обёртка не должна молча переименовывать ключи или подменять defaults: исходная функция сама проверяет свой контракт."
          ],
          "examples": [
            {
              "id": "decorators-arguments-example-1",
              "title": "Произвольное количество чисел",
              "code": "def total(*numbers):\n    return sum(numbers)\nprint(total(1,2,3))\nprint(total())",
              "output": "6\n0",
              "explanation": "В numbers попадает кортеж; пустой набор даёт сумму 0."
            }
          ],
          "goal": "Перенаправлять аргументы без потери структуры вызова.",
          "prerequisites": [
            "decorators-wrappers"
          ]
        },
        {
          "id": "decorators-arguments-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Отдельная звёздочка в def label(name,*,active=True) означает, что active разрешено передавать только по имени. Это не сбор произвольных аргументов, а граница между способами передачи. Вызов label(\"курс\",False) вызовет TypeError, а label(\"курс\",active=False) корректен. Такой интерфейс помогает не перепутать несколько похожих логических настроек.",
            "args и kwargs не превращают любую функцию в универсальную: исходная fn всё равно может отклонить неподходящий набор. Не перехватывай её TypeError и не выдавай успех без результата. Проверяй вызовы без дополнительных аргументов, несколько позиционных, часть параметров по имени и ложное значение False. Оно является сознательной настройкой, а не признаком отсутствия аргумента."
          ],
          "examples": [
            {
              "id": "decorators-arguments-example-2",
              "title": "Именованная настройка",
              "code": "def label(name,*,active=True):\n    return name+\": \"+(\"включён\" if active else \"выключен\")\nprint(label(\"Курс\"))\nprint(label(\"Звук\",active=False))",
              "output": "Курс: включён\nЗвук: выключен",
              "explanation": "active следует после отдельной *, поэтому это только именованный параметр."
            },
            {
              "id": "decorators-arguments-example-3",
              "title": "Сохранить весь вызов",
              "code": "def forward(fn):\n    def wrapper(*args,**kwargs):\n        return fn(*args,**kwargs)\n    return wrapper\ndef add(a,b=1):\n    return a+b\nprint(forward(add)(2,b=3))",
              "output": "5",
              "explanation": "Позиционные и именованные значения распакованы при вызове исходной add."
            }
          ],
          "goal": "Перенаправлять аргументы без потери структуры вызова.",
          "prerequisites": [
            "decorators-arguments-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "decorators-arguments-forward",
          "kind": "code",
          "title": "Сохранить позиционные и именованные аргументы",
          "goal": "Сохранить позиционные и именованные аргументы",
          "prerequisites": [
            "decorators-arguments"
          ],
          "prompt": "Реализуй forward(fn), возвращающую обёртку произвольного корректного вызова fn с тем же результатом. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "forward(callable) → callable(*args,**kwargs).",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Переданные функции завершаются, не печатают и не обращаются к сети/файлам. До 20 позиционных и 20 именованных скалярных аргументов; строки до 80, числа по модулю до 1000. Набор корректен для fn; её скалярный результат не длиннее 1000 символов.",
          "examples": [
            {
              "input": [
                "def _course_combine(a,b=1,*,scale=1):\n    return (a+b)*scale",
                "forward(_course_combine)(2,b=3,scale=4)"
              ],
              "output": "20",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Обёртка не меняет проверку параметров исходной функции."
            },
            {
              "input": [
                "def _course_combine(a,b=1,*,scale=1):\n    return (a+b)*scale",
                "forward(_course_combine)(2)"
              ],
              "output": "3",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Обёртка не меняет проверку параметров исходной функции."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "forward(_course_combine)(2,b=3,scale=4)",
              "expectedValue": 20,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "forward(_course_combine)(2,b=3,scale=4)",
              "setup": "def _course_combine(a,b=1,*,scale=1):\n    return (a+b)*scale"
            },
            {
              "expression": "forward(_course_combine)(2)",
              "expectedValue": 3,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "forward(_course_combine)(2)",
              "setup": "def _course_combine(a,b=1,*,scale=1):\n    return (a+b)*scale"
            },
            {
              "expression": "forward(pow)(2,3)",
              "expectedValue": 8,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "forward(pow)(2,3)"
            }
          ],
          "reference": "def forward(fn):\n    def wrapper(*args,**kwargs):\n        return fn(*args,**kwargs)\n    return wrapper",
          "alternative": "from functools import wraps\ndef forward(fn):\n    @wraps(fn)\n    def wrapper(*args,**kwargs):\n        result=fn(*args,**kwargs)\n        return result\n    return wrapper",
          "wrongSolutions": [
            {
              "code": "def forward(fn):\n    def wrapper(*args,**kwargs):\n        return fn(args,kwargs)\n    return wrapper",
              "why": "Контейнеры переданы двумя аргументами вместо распаковки."
            },
            {
              "code": "def forward(fn):\n    def wrapper(*args,**kwargs):\n        return fn(*args)\n    return wrapper",
              "why": "Именованные настройки потеряны."
            }
          ],
          "hints": [
            "В определении звёздочки собирают аргументы.",
            "В вызове они распаковывают их обратно.",
            "Верни результат fn(*args,**kwargs)."
          ],
          "solutionExplanation": [
            "Обёртка не меняет проверку параметров исходной функции.",
            "Контейнеры переданы двумя аргументами вместо распаковки.",
            "Именованные настройки потеряны."
          ],
          "required": true
        },
        {
          "id": "decorators-arguments-total",
          "kind": "code",
          "title": "Сумма произвольного числа аргументов",
          "goal": "Сумма произвольного числа аргументов",
          "prerequisites": [
            "decorators-arguments"
          ],
          "prompt": "Реализуй total(*numbers), возвращающую числовую сумму всех аргументов. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "total(*int) → int.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "От 0 до 100 целочисленных аргументов, каждый −1000…1000. Сумма по модулю до 100000.",
          "examples": [
            {
              "input": [
                "total()"
              ],
              "output": "0",
              "explanation": "Один контракт допускает ноль, один и несколько аргументов."
            },
            {
              "input": [
                "total(1,2,3)"
              ],
              "output": "6",
              "explanation": "Один контракт допускает ноль, один и несколько аргументов."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "total()",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "total()"
            },
            {
              "expression": "total(1,2,3)",
              "expectedValue": 6,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "total(1,2,3)"
            },
            {
              "expression": "total(-2,0,5)",
              "expectedValue": 3,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "total(-2,0,5)"
            }
          ],
          "reference": "def total(*numbers):\n    return sum(numbers)",
          "alternative": "def total(*numbers):\n    result=0\n    for n in numbers:\n        result+=n\n    return result",
          "wrongSolutions": [
            {
              "code": "def total(numbers):\n    return sum(numbers)",
              "why": "Функция ждёт один контейнер вместо произвольных аргументов."
            },
            {
              "code": "def total(*numbers):\n    return len(numbers)",
              "why": "Количество не равно сумме."
            }
          ],
          "hints": [
            "*numbers собирает позиционные аргументы.",
            "Пустой кортеж имеет нулевую сумму.",
            "Суммируй значения, а не их число."
          ],
          "solutionExplanation": [
            "Один контракт допускает ноль, один и несколько аргументов.",
            "Функция ждёт один контейнер вместо произвольных аргументов.",
            "Количество не равно сумме."
          ],
          "required": true
        },
        {
          "id": "decorators-arguments-keyword-only",
          "kind": "code",
          "title": "Только именованный active",
          "goal": "Только именованный active",
          "prerequisites": [
            "decorators-arguments"
          ],
          "prompt": "Реализуй label(name,*,active=True), возвращающую «name: включён» либо «name: выключен». Передача active вторым позиционным аргументом должна давать TypeError. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "label(str,*,active=bool) → str.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "name — строка 0…80 символов; active — bool. Только именованный active; неверная позиционная передача должна вызвать TypeError. Итог до 92 символов.",
          "examples": [
            {
              "input": [
                "label(\"Курс\")"
              ],
              "output": "'Курс: включён'",
              "explanation": "Проверка вызывает функцию неверным способом и ожидает TypeError; она не требует одного конкретного написания."
            },
            {
              "input": [
                "label(\"Звук\",active=False)"
              ],
              "output": "'Звук: выключен'",
              "explanation": "Проверка вызывает функцию неверным способом и ожидает TypeError; она не требует одного конкретного написания."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "label(\"Курс\")",
              "expectedValue": "Курс: включён",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "label(\"Курс\")"
            },
            {
              "expression": "label(\"Звук\",active=False)",
              "expectedValue": "Звук: выключен",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "label(\"Звук\",active=False)"
            },
            {
              "expression": "_course_rejects(label)",
              "expectedValue": true,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "_course_rejects(label)",
              "setup": "def _course_rejects(fn):\n    try:\n        fn(\"x\",False)\n    except TypeError:\n        return True\n    return False"
            }
          ],
          "reference": "def label(name,*,active=True):\n    return f\"{name}: {\"включён\" if active else \"выключен\"}\"",
          "alternative": "def label(name,**kwargs):\n    active=kwargs.get(\"active\",True)\n    return name+\": \"+(\"включён\" if active else \"выключен\")",
          "wrongSolutions": [
            {
              "code": "def label(name,active=True):\n    return name+\": \"+(\"включён\" if active else \"выключен\")",
              "why": "Позиционный active принят вопреки контракту."
            },
            {
              "code": "def label(name,*,active=True):\n    return name+\": включён\"",
              "why": "Ложная настройка игнорируется."
            }
          ],
          "hints": [
            "Поставь отдельную * перед active.",
            "Сохраняй False как реальную настройку.",
            "Формат включает двоеточие и один пробел."
          ],
          "solutionExplanation": [
            "Проверка вызывает функцию неверным способом и ожидает TypeError; она не требует одного конкретного написания.",
            "Позиционный active принят вопреки контракту.",
            "Ложная настройка игнорируется."
          ],
          "required": true
        },
        {
          "id": "decorators-arguments-stars",
          "kind": "choice",
          "title": "Сбор и распаковка",
          "goal": "Сбор и распаковка",
          "prerequisites": [
            "decorators-arguments"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "def forward(fn):",
                "    def wrapper(*args,**kwargs):",
                "        return fn(*args,**kwargs)",
                "    return wrapper",
                "def add(a,b=1):",
                "    return a+b",
                "print(forward(add)(2,b=3))"
              ],
              "output": "5",
              "explanation": "Разобранный пример по этой идее: Позиционные и именованные значения распакованы при вызове исходной add. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Контейнеры и распакованные аргументы являются разными интерфейсами вызова."
          ],
          "required": true,
          "answer": [
            "1",
            "2"
          ],
          "choices": [
            {
              "id": "1",
              "text": "В определении *args собирает позиционные аргументы."
            },
            {
              "id": "2",
              "text": "В вызове **kwargs распаковывает словарь именованных аргументов."
            },
            {
              "id": "3",
              "text": "fn(args,kwargs) равносильно fn(*args,**kwargs)."
            }
          ]
        }
      ]
    },
    {
      "id": "decorators-metadata",
      "title": "Метаданные и порядок декораторов",
      "goal": "Сохранять имя исходной функции и прослеживать вложенные обёртки.",
      "prerequisites": [
        "decorators-arguments"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "decorators-metadata-idea",
          "title": "Как это работает",
          "paragraphs": [
            "После декорирования имя обычно связано с wrapper. Без помощи метаданные __name__ и __doc__ будут относиться к обёртке, а не к исходной функции. Это затрудняет справку и отладку. functools.wraps(fn), применённый к wrapper, копирует полезные сведения и добавляет связь __wrapped__. Он не исправляет сам алгоритм и не возвращает забытый return автоматически.",
            "Атрибут __name__ хранит имя функции, __doc__ — её строку документации или None. Их проверка здесь является частью контракта удобного инструмента. functools.update_wrapper(wrapper,fn) — более явная альтернатива wraps. Не нужно вручную копировать только одно имя, если обещано сохранять и документацию. В обычном декораторе также перенаправляй args и kwargs.",
            "Запись from functools import wraps получает функцию wraps из стандартной библиотеки: после этого имя wraps доступно непосредственно. Вариант import functools потребовал бы полного вызова functools.wraps. Обе формы подключают уже поставляемый с Python модуль, а не скачивают пакет. Использование @wraps(fn) следует тому же правилу декораторов, которое разобрано в прошлом уроке."
          ],
          "examples": [
            {
              "id": "decorators-metadata-example-1",
              "title": "Сохранённое имя",
              "code": "from functools import wraps\ndef decorate(fn):\n    @wraps(fn)\n    def wrapper(*args,**kwargs):\n        return fn(*args,**kwargs)\n    return wrapper\n@decorate\ndef greet():\n    \"Короткое приветствие.\"\n    return \"привет\"\nprint(greet.__name__)\nprint(greet.__doc__)",
              "output": "greet\nКороткое приветствие.",
              "explanation": "Метаданные относятся к greet, хотя выполняется wrapper."
            }
          ],
          "goal": "Сохранять имя исходной функции и прослеживать вложенные обёртки.",
          "prerequisites": [
            "decorators-arguments"
          ]
        },
        {
          "id": "decorators-metadata-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Несколько декораторов применяются снизу вверх: @outer над @inner означает target = outer(inner(target)). При вызове наружная обёртка начинает первой, затем вызывает внутреннюю. Преобразования результатов происходят в обратном пути. Добавить единицу после удвоения и удвоить после добавления единицы — разные вычисления, поэтому порядок нельзя считать украшением.",
            "Для наблюдения порядка используй значения или журнал, а не таймер. В задаче журнал before/after должен завершаться и при ожидаемой ошибке исходной функции: finally подходит лучше строки после успешного return. При этом исключение не скрывается и продолжает путь вызывающему коду. Открытый разбор помогает понять стек обёрток, но не заменяет самостоятельное объяснение, какой результат приходит на каждый уровень."
          ],
          "examples": [
            {
              "id": "decorators-metadata-example-2",
              "title": "Порядок преобразований",
              "code": "def plus(fn):\n    def wrapper(x):\n        return fn(x)+1\n    return wrapper\ndef double(fn):\n    def wrapper(x):\n        return fn(x)*2\n    return wrapper\n@plus\n@double\ndef value(x):\n    return x\nprint(value(3))",
              "output": "7",
              "explanation": "Сначала исходные 3 удваиваются до 6, затем внешний plus даёт 7."
            },
            {
              "id": "decorators-metadata-example-3",
              "title": "Противоположная композиция",
              "code": "def plus(fn):\n    def wrapper(x):\n        return fn(x)+1\n    return wrapper\ndef double(fn):\n    def wrapper(x):\n        return fn(x)*2\n    return wrapper\n@double\n@plus\ndef value(x):\n    return x\nprint(value(3))",
              "output": "8",
              "explanation": "Теперь исходные 3 увеличиваются до 4 и только затем удваиваются до 8."
            }
          ],
          "goal": "Сохранять имя исходной функции и прослеживать вложенные обёртки.",
          "prerequisites": [
            "decorators-metadata-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "decorators-metadata-wraps",
          "kind": "code",
          "title": "Бонус с сохранённой справкой",
          "goal": "Бонус с сохранённой справкой",
          "prerequisites": [
            "decorators-metadata"
          ],
          "prompt": "Реализуй bonus(fn), возвращающую обёртку: исходный числовой результат + 1. Сохрани __name__ и __doc__. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "bonus(callable) → callable(value), метаданные сохраняются.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Переданные функции завершаются, не печатают и не обращаются к сети/файлам. Один целый аргумент по модулю до 1000; числовой результат fn по модулю до 1000000. Имя до 80, документация до 1000 символов либо None.",
          "examples": [
            {
              "input": [
                "def _course_fn(x):\n    \"Описание входной функции.\"\n    return x*3",
                "[(w:=bonus(_course_fn))(2),w.__name__,w.__doc__]"
              ],
              "output": "[7, '_course_fn', 'Описание входной функции.']",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Метаданные и результат являются независимыми частями контракта."
            },
            {
              "input": [
                "bonus(abs)(-2)"
              ],
              "output": "3",
              "explanation": "Метаданные и результат являются независимыми частями контракта."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "[(w:=bonus(_course_fn))(2),w.__name__,w.__doc__]",
              "expectedValue": [
                7,
                "_course_fn",
                "Описание входной функции."
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(w:=bonus(_course_fn))(2),w.__name__,w.__doc__]",
              "setup": "def _course_fn(x):\n    \"Описание входной функции.\"\n    return x*3"
            },
            {
              "expression": "bonus(abs)(-2)",
              "expectedValue": 3,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "bonus(abs)(-2)"
            },
            {
              "expression": "[(w:=bonus(_course_fn))(0),w.__name__]",
              "expectedValue": [
                1,
                "_course_fn"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(w:=bonus(_course_fn))(0),w.__name__]",
              "setup": "def _course_fn(x):\n    \"Описание входной функции.\"\n    return x*3"
            }
          ],
          "reference": "from functools import wraps\ndef bonus(fn):\n    @wraps(fn)\n    def wrapper(value):\n        return fn(value)+1\n    return wrapper",
          "alternative": "from functools import update_wrapper\ndef bonus(fn):\n    def wrapper(value):\n        return 1+fn(value)\n    return update_wrapper(wrapper,fn)",
          "wrongSolutions": [
            {
              "code": "def bonus(fn):\n    def wrapper(value):\n        return fn(value)+1\n    return wrapper",
              "why": "Метаданные остались от wrapper."
            },
            {
              "code": "from functools import wraps\ndef bonus(fn):\n    @wraps(fn)\n    def wrapper(value):\n        return fn(value+1)\n    return wrapper",
              "why": "Бонус аргумента не равен бонусу результата."
            }
          ],
          "hints": [
            "Оберни wrapper через wraps(fn).",
            "Возвращаемое значение изменяется после вызова.",
            "Проверь и результат, и два атрибута справки."
          ],
          "solutionExplanation": [
            "Метаданные и результат являются независимыми частями контракта.",
            "Метаданные остались от wrapper.",
            "Бонус аргумента не равен бонусу результата."
          ],
          "required": true
        },
        {
          "id": "decorators-metadata-order",
          "kind": "code",
          "title": "Сначала удвоить, затем прибавить",
          "goal": "Сначала удвоить, затем прибавить",
          "prerequisites": [
            "decorators-metadata"
          ],
          "prompt": "Реализуй transform(fn), возвращающую обёртку одного аргумента с результатом 2*fn(value)+1. Объясни её как композицию double_result внутри plus_one. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "transform(callable) → callable(value).",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Переданные функции завершаются, не печатают и не обращаются к сети/файлам. Один целый аргумент по модулю до 1000, результат fn по модулю до 1000000. Итог 2*fn(value)+1 по модулю до 2000001.",
          "examples": [
            {
              "input": [
                "transform(abs)(-3)"
              ],
              "output": "7",
              "explanation": "Альтернатива с явными действиями допустима: важна объявленная композиция."
            },
            {
              "input": [
                "def _course_step(x):\n    return x+2",
                "transform(_course_step)(2)"
              ],
              "output": "9",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Альтернатива с явными действиями допустима: важна объявленная композиция."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "transform(abs)(-3)",
              "expectedValue": 7,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "transform(abs)(-3)"
            },
            {
              "expression": "transform(_course_step)(2)",
              "expectedValue": 9,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "transform(_course_step)(2)",
              "setup": "def _course_step(x):\n    return x+2"
            },
            {
              "expression": "transform(abs)(0)",
              "expectedValue": 1,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "transform(abs)(0)"
            }
          ],
          "reference": "def double_result(fn):\n    def wrapper(x):\n        return fn(x)*2\n    return wrapper\ndef plus_one(fn):\n    def wrapper(x):\n        return fn(x)+1\n    return wrapper\ndef transform(fn):\n    return plus_one(double_result(fn))",
          "alternative": "def transform(fn):\n    def wrapper(value):\n        result=fn(value)\n        result*=2\n        return result+1\n    return wrapper",
          "wrongSolutions": [
            {
              "code": "def transform(fn):\n    def wrapper(value):\n        return (fn(value)+1)*2\n    return wrapper",
              "why": "Порядок изменён: 2*(f+1) отличается от 2*f+1."
            },
            {
              "code": "def transform(fn):\n    def wrapper(value):\n        return fn(value*2)+1\n    return wrapper",
              "why": "Преобразует вход вместо результата."
            }
          ],
          "hints": [
            "Раскрой композицию скобками.",
            "Внешняя plus_one получает результат внутренней double_result.",
            "Проверяй функцию, которая сама не линейна или имеет смещение."
          ],
          "solutionExplanation": [
            "Альтернатива с явными действиями допустима: важна объявленная композиция.",
            "Порядок изменён: 2*(f+1) отличается от 2*f+1.",
            "Преобразует вход вместо результата."
          ],
          "required": true
        },
        {
          "id": "decorators-metadata-finally",
          "kind": "code",
          "title": "Журнал до и после ошибки",
          "goal": "Журнал до и после ошибки",
          "prerequisites": [
            "decorators-metadata"
          ],
          "prompt": "Реализуй traced(fn,log): обёртка добавляет «до», вызывает fn и в finally добавляет «после». Сохрани результат и распространение ValueError. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "traced(callable,list) → callable(value).",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Переданные функции завершаются, не печатают и не обращаются к сети/файлам. Один целый аргумент −1000…1000; fn возвращает целое по модулю до 1000000 либо вызывает ValueError. До 100 вызовов, до 200 фиксированных записей журнала.",
          "examples": [
            {
              "input": [
                "def _course_fn(x):\n    if x<0:\n        raise ValueError(\"bad\")\n    return x+1\ndef _course_call(fn,x):\n    try:\n        return fn(x)\n    except ValueError:\n        return \"ошибка\"\nlog=[]",
                "[_course_call(traced(_course_fn,log),-1),log]"
              ],
              "output": "['ошибка', ['до', 'после']]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Наблюдение жизненного цикла не должно менять смысл ошибки."
            },
            {
              "input": [
                "def _course_fn(x):\n    if x<0:\n        raise ValueError(\"bad\")\n    return x+1\ndef _course_call(fn,x):\n    try:\n        return fn(x)\n    except ValueError:\n        return \"ошибка\"\nlog=[]",
                "[_course_call(traced(_course_fn,log),2),log]"
              ],
              "output": "[3, ['до', 'после']]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Наблюдение жизненного цикла не должно менять смысл ошибки."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "[_course_call(traced(_course_fn,log),-1),log]",
              "expectedValue": [
                "ошибка",
                [
                  "до",
                  "после"
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[_course_call(traced(_course_fn,log),-1),log]",
              "setup": "def _course_fn(x):\n    if x<0:\n        raise ValueError(\"bad\")\n    return x+1\ndef _course_call(fn,x):\n    try:\n        return fn(x)\n    except ValueError:\n        return \"ошибка\"\nlog=[]"
            },
            {
              "expression": "[_course_call(traced(_course_fn,log),2),log]",
              "expectedValue": [
                3,
                [
                  "до",
                  "после"
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[_course_call(traced(_course_fn,log),2),log]",
              "setup": "def _course_fn(x):\n    if x<0:\n        raise ValueError(\"bad\")\n    return x+1\ndef _course_call(fn,x):\n    try:\n        return fn(x)\n    except ValueError:\n        return \"ошибка\"\nlog=[]"
            },
            {
              "expression": "[_course_call(traced(_course_fn,log),0),log]",
              "expectedValue": [
                1,
                [
                  "до",
                  "после"
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[_course_call(traced(_course_fn,log),0),log]",
              "setup": "def _course_fn(x):\n    if x<0:\n        raise ValueError(\"bad\")\n    return x+1\ndef _course_call(fn,x):\n    try:\n        return fn(x)\n    except ValueError:\n        return \"ошибка\"\nlog=[]"
            }
          ],
          "reference": "def traced(fn,log):\n    def wrapper(value):\n        log.append(\"до\")\n        try:\n            return fn(value)\n        finally:\n            log.append(\"после\")\n    return wrapper",
          "alternative": "def traced(fn,log):\n    def wrapper(value):\n        log.append(\"до\")\n        try:\n            result=fn(value)\n        except BaseException:\n            log.append(\"после\")\n            raise\n        log.append(\"после\")\n        return result\n    return wrapper",
          "wrongSolutions": [
            {
              "code": "def traced(fn,log):\n    def wrapper(value):\n        log.append(\"до\")\n        result=fn(value)\n        log.append(\"после\")\n        return result\n    return wrapper",
              "why": "При исключении завершающая запись не выполняется."
            },
            {
              "code": "def traced(fn,log):\n    def wrapper(value):\n        log.append(\"до\")\n        try:\n            return fn(value)\n        except ValueError:\n            return None\n        finally:\n            log.append(\"после\")\n    return wrapper",
              "why": "Исключение скрыто и заменено None."
            }
          ],
          "hints": [
            "После должно появиться независимо от исхода.",
            "Используй finally вокруг исходного вызова.",
            "Не перехватывай ValueError как успешный None."
          ],
          "solutionExplanation": [
            "Наблюдение жизненного цикла не должно менять смысл ошибки.",
            "При исключении завершающая запись не выполняется.",
            "Исключение скрыто и заменено None."
          ],
          "required": true
        },
        {
          "id": "decorators-metadata-stack",
          "kind": "choice",
          "title": "Порядок двух декораторов",
          "goal": "Порядок двух декораторов",
          "prerequisites": [
            "decorators-metadata"
          ],
          "prompt": "Как читается @outer над @inner перед def fn?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "def plus(fn):",
                "    return lambda x:fn(x)+1",
                "def double(fn):",
                "    return lambda x:fn(x)*2",
                "@double",
                "@plus",
                "def value(x):",
                "    return x",
                "print(value(3))"
              ],
              "output": "8",
              "explanation": "Разобранный пример по этой идее: Теперь исходные 3 увеличиваются до 4 и только затем удваиваются до 8. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Применение идёт снизу вверх, вход в вызовы — от наружной обёртки к внутренней."
          ],
          "required": true,
          "answer": [
            "1",
            "3"
          ],
          "choices": [
            {
              "id": "1",
              "text": "fn = outer(inner(fn))"
            },
            {
              "id": "2",
              "text": "fn = inner(outer(fn))"
            },
            {
              "id": "3",
              "text": "При вызове сначала начинает работать outer."
            }
          ]
        }
      ]
    },
    {
      "id": "decorators-cache-project",
      "title": "Практическая работа: состояние обёртки",
      "goal": "Собрать проверяемые инструменты с ограничениями и изолированным состоянием.",
      "prerequisites": [
        "decorators-metadata"
      ],
      "role": "project",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "decorators-cache-project-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Декораторы часто управляют состоянием между вызовами. Это делает их полезными и одновременно опасными: скрытый общий словарь способен смешать результаты разных функций, а слишком широкий перехват исключений — скрыть сбой. Проект строит небольшие инструменты с узкими контрактами, чтобы каждое правило было наблюдаемым.",
            "Кэш в первом задании принимает только один целочисленный аргумент. Он хранит результаты успешных вызовов внутри конкретного декорирования. Не надо делать универсальный кэш произвольных списков: изменяемые аргументы потребовали бы новых правил ключей. Ноль является полноценным результатом и должен кэшироваться. Исключение не считается успешным вычислением и не сохраняется."
          ],
          "examples": [
            {
              "id": "decorators-cache-project-example-1",
              "title": "Локальный кэш",
              "code": "def memo(fn):\n    cache={}\n    def wrapper(x):\n        if x not in cache:\n            cache[x]=fn(x)\n        return cache[x]\n    return wrapper\ncalls=[]\n@memo\ndef square(x):\n    calls.append(x)\n    return x*x\nprint(square(3),square(3))\nprint(calls)",
              "output": "9 9\n[3]",
              "explanation": "Два обращения вернули 9, но настоящий вызов был один; состояние принадлежит этой обёртке."
            }
          ],
          "goal": "Собрать проверяемые инструменты с ограничениями и изолированным состоянием.",
          "prerequisites": [
            "decorators-metadata"
          ]
        },
        {
          "id": "decorators-cache-project-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Ограничитель во втором задании считает попытки вызова и после предела сообщает RuntimeError. Повторитель в третьем перехватывает только ValueError и делает не больше одной дополнительной попытки. Эти два инструмента решают разные задачи; повтор нельзя объявлять надёжной политикой для реальных платежей или внешних записей, которые могли иметь побочные эффекты. Наши тесты вызывают только функции в памяти.",
            "Для проверки кэша нужен счётчик настоящих вызовов исходной функции. Одного совпадения результата недостаточно: правильное число можно заново вычислять каждый раз. Проверки создают две разные обёртки и чередуют обращения, чтобы выявить общий кэш. После проекта объясни, где живёт состояние, какой ключ используется и что происходит на ошибке. Это вводная практика, а не обещание готового production-инструмента."
          ],
          "examples": [
            {
              "id": "decorators-cache-project-example-2",
              "title": "Ноль не означает промах",
              "code": "cache={2:0}\nprint(2 in cache)\nprint(bool(cache[2]))",
              "output": "True\nFalse",
              "explanation": "Проверка наличия ключа находит сохранённый ноль; проверка истинности результата его потеряла бы."
            },
            {
              "id": "decorators-cache-project-example-3",
              "title": "Один повтор — две попытки",
              "code": "attempts=0\ndef flaky():\n    global attempts\n    attempts+=1\n    if attempts==1:\n        raise ValueError\n    return 7\ntry:\n    result=flaky()\nexcept ValueError:\n    result=flaky()\nprint(result,attempts)",
              "output": "7 2",
              "explanation": "Повтор ограничен одной дополнительной попыткой; другие типы ошибок здесь не скрываются."
            }
          ],
          "goal": "Собрать проверяемые инструменты с ограничениями и изолированным состоянием.",
          "prerequisites": [
            "decorators-cache-project-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "decorators-cache-project-memo",
          "kind": "code",
          "title": "Кэш одной функции",
          "goal": "Кэш одной функции",
          "prerequisites": [
            "decorators-cache-project"
          ],
          "prompt": "Реализуй memoize(fn): функция одного целочисленного аргумента кэшируется по значению аргумента. Кэш независим у разных обёрток, успешный ноль сохраняется. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "memoize(callable) → callable(int).",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Переданные функции завершаются, не печатают и не обращаются к сети/файлам. Один хешируемый целочисленный аргумент −1000…1000; до 100 вызовов на обёртку и до 10 обёрток. Результат — целое по модулю до 1000000; fn может вызвать ValueError. Успешный ноль кэшируется, исключение — нет.",
          "examples": [
            {
              "input": [
                "calls=[]\ndef _course_fn(x):\n    calls.append(x)\n    return x*x",
                "[(w:=memoize(_course_fn))(3),w(3),calls]"
              ],
              "output": "[9, 9, [3]]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Счётчик входной функции доказывает отсутствие лишнего повторного вычисления."
            },
            {
              "input": [
                "calls=[]\ndef _course_fn(x):\n    calls.append(x)\n    return x*x",
                "[(w:=memoize(_course_fn))(0),w(0),calls]"
              ],
              "output": "[0, 0, [0]]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Счётчик входной функции доказывает отсутствие лишнего повторного вычисления."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "[(w:=memoize(_course_fn))(3),w(3),calls]",
              "expectedValue": [
                9,
                9,
                [
                  3
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(w:=memoize(_course_fn))(3),w(3),calls]",
              "setup": "calls=[]\ndef _course_fn(x):\n    calls.append(x)\n    return x*x"
            },
            {
              "expression": "[(w:=memoize(_course_fn))(0),w(0),calls]",
              "expectedValue": [
                0,
                0,
                [
                  0
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(w:=memoize(_course_fn))(0),w(0),calls]",
              "setup": "calls=[]\ndef _course_fn(x):\n    calls.append(x)\n    return x*x"
            },
            {
              "expression": "[(a:=memoize(_course_fn))(2),(b:=memoize(abs))(2),a(2),calls]",
              "expectedValue": [
                4,
                2,
                4,
                [
                  2
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(a:=memoize(_course_fn))(2),(b:=memoize(abs))(-2),a(2),calls]",
              "setup": "calls=[]\ndef _course_fn(x):\n    calls.append(x)\n    return x*x"
            },
            {
              "setup": "calls=[]\ndef _course_fn(x):\n    calls.append(x)\n    if len(calls)==1:\n        raise ValueError\n    return 0\ndef _course_try(fn,x):\n    try:\n        return fn(x)\n    except ValueError:\n        return \"ошибка\"",
              "expression": "[(w:=memoize(_course_fn)) is not None,_course_try(w,3),w(3),w(3),calls]",
              "expectedValue": [
                true,
                "ошибка",
                0,
                0,
                [
                  3,
                  3
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Исключение не кэшируется, успешный ноль кэшируется."
            }
          ],
          "reference": "def memoize(fn):\n    cache={}\n    def wrapper(value):\n        if value not in cache:\n            cache[value]=fn(value)\n        return cache[value]\n    return wrapper",
          "alternative": "def memoize(fn):\n    keys=[]\n    results=[]\n    def wrapper(value):\n        if value not in keys:\n            answer=fn(value)\n            keys.append(value)\n            results.append(answer)\n        return results[keys.index(value)]\n    return wrapper",
          "wrongSolutions": [
            {
              "code": "def memoize(fn):\n    def wrapper(value):\n        return fn(value)\n    return wrapper",
              "why": "Результат верен, но повторный вызов не закэширован."
            },
            {
              "code": "def memoize(fn):\n    cache={}\n    def wrapper(value):\n        if not cache.get(value):\n            cache[value]=fn(value)\n        return cache[value]\n    return wrapper",
              "why": "Нулевой результат ошибочно считается промахом."
            }
          ],
          "hints": [
            "Кэш создаётся внутри фабрики декоратора.",
            "Проверяй наличие ключа, не истинность ответа.",
            "Сохраняй результат только после успешного fn(value)."
          ],
          "solutionExplanation": [
            "Счётчик входной функции доказывает отсутствие лишнего повторного вычисления.",
            "Результат верен, но повторный вызов не закэширован.",
            "Нулевой результат ошибочно считается промахом."
          ],
          "required": true
        },
        {
          "id": "decorators-cache-project-limited",
          "kind": "code",
          "title": "Лимит числа попыток",
          "goal": "Лимит числа попыток",
          "prerequisites": [
            "decorators-cache-project"
          ],
          "prompt": "Реализуй limited(fn,limit). Обёртка одного аргумента вызывает fn не больше limit раз, затем поднимает RuntimeError. Считается каждая начатая попытка, даже если fn дала исключение. limit ≥ 0. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "limited(callable,int) → callable(value).",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Переданные функции завершаются, не печатают и не обращаются к сети/файлам. 0 ≤ limit ≤ 100; до 101 попытки вызова одной обёртки, аргумент −1000…1000. Результат fn по модулю до 1000000; она может вызвать ValueError. Счётчик включает неудачные начатые попытки.",
          "examples": [
            {
              "input": [
                "calls=[]\ndef _course_fn(x):\n    calls.append(x)\n    return x+1\ndef _course_try(fn,x):\n    try:\n        return fn(x)\n    except RuntimeError:\n        return \"лимит\"",
                "[(w:=limited(_course_fn,1))(2),_course_try(w,3),calls]"
              ],
              "output": "[3, 'лимит', [2]]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Правило попыток не зависит от удачного результата."
            },
            {
              "input": [
                "calls=[]\ndef _course_fn(x):\n    calls.append(x)\n    return x+1\ndef _course_try(fn,x):\n    try:\n        return fn(x)\n    except RuntimeError:\n        return \"лимит\"",
                "[_course_try(limited(_course_fn,0),2),calls]"
              ],
              "output": "['лимит', []]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Правило попыток не зависит от удачного результата."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "[(w:=limited(_course_fn,1))(2),_course_try(w,3),calls]",
              "expectedValue": [
                3,
                "лимит",
                [
                  2
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(w:=limited(_course_fn,1))(2),_course_try(w,3),calls]",
              "setup": "calls=[]\ndef _course_fn(x):\n    calls.append(x)\n    return x+1\ndef _course_try(fn,x):\n    try:\n        return fn(x)\n    except RuntimeError:\n        return \"лимит\""
            },
            {
              "expression": "[_course_try(limited(_course_fn,0),2),calls]",
              "expectedValue": [
                "лимит",
                []
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[_course_try(limited(_course_fn,0),2),calls]",
              "setup": "calls=[]\ndef _course_fn(x):\n    calls.append(x)\n    return x+1\ndef _course_try(fn,x):\n    try:\n        return fn(x)\n    except RuntimeError:\n        return \"лимит\""
            },
            {
              "expression": "[(w:=limited(_course_fn,2))(0),w(1),_course_try(w,2),calls]",
              "expectedValue": [
                1,
                2,
                "лимит",
                [
                  0,
                  1
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(w:=limited(_course_fn,2))(0),w(1),_course_try(w,2),calls]",
              "setup": "calls=[]\ndef _course_fn(x):\n    calls.append(x)\n    return x+1\ndef _course_try(fn,x):\n    try:\n        return fn(x)\n    except RuntimeError:\n        return \"лимит\""
            },
            {
              "setup": "calls=[]\ndef _course_fn(x):\n    calls.append(x)\n    raise ValueError\ndef _course_try(fn,x):\n    try:\n        return fn(x)\n    except ValueError:\n        return \"ошибка\"\n    except RuntimeError:\n        return \"лимит\"",
              "expression": "[(w:=limited(_course_fn,1)) is not None,_course_try(w,-1),_course_try(w,2),calls]",
              "expectedValue": [
                true,
                "ошибка",
                "лимит",
                [
                  -1
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Неуспешная начатая попытка тоже расходует лимит."
            }
          ],
          "reference": "def limited(fn,limit):\n    calls=0\n    def wrapper(value):\n        nonlocal calls\n        if calls>=limit:\n            raise RuntimeError(\"лимит\")\n        calls+=1\n        return fn(value)\n    return wrapper",
          "alternative": "def limited(fn,limit):\n    remaining=[limit]\n    def wrapper(value):\n        if remaining[0]<=0:\n            raise RuntimeError(\"лимит\")\n        remaining[0]-=1\n        return fn(value)\n    return wrapper",
          "wrongSolutions": [
            {
              "code": "def limited(fn,limit):\n    calls=0\n    def wrapper(value):\n        nonlocal calls\n        if calls>limit:\n            raise RuntimeError(\"лимит\")\n        calls+=1\n        return fn(value)\n    return wrapper",
              "why": "Неверная граница разрешает лишнюю попытку."
            },
            {
              "code": "def limited(fn,limit):\n    def wrapper(value):\n        calls=0\n        if calls>=limit:\n            raise RuntimeError(\"лимит\")\n        calls+=1\n        return fn(value)\n    return wrapper",
              "why": "Счётчик сбрасывается при каждом вызове."
            }
          ],
          "hints": [
            "Состояние лимита живёт во внешнем окружении.",
            "Проверяй предел до вызова fn.",
            "Счётчик обновляется перед начатой попыткой."
          ],
          "solutionExplanation": [
            "Правило попыток не зависит от удачного результата.",
            "Неверная граница разрешает лишнюю попытку.",
            "Счётчик сбрасывается при каждом вызове."
          ],
          "required": true
        },
        {
          "id": "decorators-cache-project-retry",
          "kind": "code",
          "title": "Одна дополнительная попытка",
          "goal": "Одна дополнительная попытка",
          "prerequisites": [
            "decorators-cache-project"
          ],
          "prompt": "Реализуй retry_once(fn): обёртка одного аргумента перехватывает только первый ValueError и пробует снова. Второе исключение и другие типы ошибок распространяются. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "retry_once(callable) → callable(value).",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Переданные функции завершаются, не печатают и не обращаются к сети/файлам. Один целый аргумент −1000…1000; результат fn по модулю до 1000000. Возможны ValueError и TypeError; за один вызов обёртки исходная fn выполняется максимум два раза.",
          "examples": [
            {
              "input": [
                "calls=[]\ndef _course_fn(x):\n    calls.append(x)\n    if len(calls)==1:\n        raise ValueError\n    return x+2",
                "[(w:=retry_once(_course_fn))(3),calls]"
              ],
              "output": "[5, [3, 3]]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Ограничение повторов и тип ошибки являются частью контракта, а не универсальным советом для сетевых операций."
            },
            {
              "input": [
                "retry_once(abs)(-2)"
              ],
              "output": "2",
              "explanation": "Ограничение повторов и тип ошибки являются частью контракта, а не универсальным советом для сетевых операций."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "[(w:=retry_once(_course_fn))(3),calls]",
              "expectedValue": [
                5,
                [
                  3,
                  3
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(w:=retry_once(_course_fn))(3),calls]",
              "setup": "calls=[]\ndef _course_fn(x):\n    calls.append(x)\n    if len(calls)==1:\n        raise ValueError\n    return x+2"
            },
            {
              "expression": "retry_once(abs)(-2)",
              "expectedValue": 2,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "retry_once(abs)(-2)"
            },
            {
              "expression": "_course_type(retry_once(_course_fn))",
              "expectedValue": 1,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "_course_type(retry_once(_course_fn))",
              "setup": "calls=[]\ndef _course_fn(x):\n    calls.append(x)\n    raise TypeError\ndef _course_type(fn):\n    try:\n        fn(1)\n    except TypeError:\n        return len(calls)\n    return -1"
            },
            {
              "setup": "calls=[]\ndef _course_fn(x):\n    calls.append(x)\n    raise ValueError\ndef _course_try(fn):\n    try:\n        fn(1)\n    except ValueError:\n        return len(calls)\n    return -1",
              "expression": "_course_try(retry_once(_course_fn))",
              "expectedValue": 2,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Второй ValueError не скрывается и не запускает третий вызов."
            }
          ],
          "reference": "def retry_once(fn):\n    def wrapper(value):\n        try:\n            return fn(value)\n        except ValueError:\n            return fn(value)\n    return wrapper",
          "alternative": "def retry_once(fn):\n    def wrapper(value):\n        for attempt in range(2):\n            try:\n                return fn(value)\n            except ValueError:\n                if attempt==1:\n                    raise\n    return wrapper",
          "wrongSolutions": [
            {
              "code": "def retry_once(fn):\n    def wrapper(value):\n        return fn(value)\n    return wrapper",
              "why": "Нет повторной попытки при ValueError."
            },
            {
              "code": "def retry_once(fn):\n    def wrapper(value):\n        try:\n            return fn(value)\n        except Exception:\n            return fn(value)\n    return wrapper",
              "why": "Лишний повтор TypeError скрывает другой класс ошибки."
            }
          ],
          "hints": [
            "Область except должна быть узкой.",
            "Вторая попытка находится вне повторно перехватываемого ValueError.",
            "Не повторяй удачный вызов."
          ],
          "solutionExplanation": [
            "Ограничение повторов и тип ошибки являются частью контракта, а не универсальным советом для сетевых операций.",
            "Нет повторной попытки при ValueError.",
            "Лишний повтор TypeError скрывает другой класс ошибки."
          ],
          "required": true
        },
        {
          "id": "decorators-cache-project-cache",
          "kind": "explain",
          "title": "Что проверяет настоящий кэш?",
          "goal": "Что проверяет настоящий кэш?",
          "prerequisites": [
            "decorators-cache-project"
          ],
          "prompt": "Выбери полезные проверки.",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "attempts=0",
                "def flaky():",
                "    global attempts",
                "    attempts+=1",
                "    if attempts==1:",
                "        raise ValueError",
                "    return 7",
                "try:",
                "    result=flaky()",
                "except ValueError:",
                "    result=flaky()",
                "print(result,attempts)"
              ],
              "output": "7 2",
              "explanation": "Разобранный пример по этой идее: Повтор ограничен одной дополнительной попыткой; другие типы ошибок здесь не скрываются. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Одинаковое число можно получать повторным вычислением; наблюдение числа вызовов выявляет поведение кэша."
          ],
          "required": true,
          "answer": [
            "1",
            "2",
            "3"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Счётчик фактических вызовов исходной функции."
            },
            {
              "id": "2",
              "text": "Повторное обращение к аргументу с результатом 0."
            },
            {
              "id": "3",
              "text": "Изоляция двух обёрток."
            },
            {
              "id": "4",
              "text": "Только одинаковый напечатанный ответ."
            }
          ]
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.12/tutorial/controlflow.html#more-on-defining-functions",
    "https://docs.python.org/3.12/reference/compound_stmts.html#function-definitions",
    "https://docs.python.org/3.12/library/functools.html#functools.wraps",
    "https://docs.python.org/3.12/reference/simple_stmts.html#the-nonlocal-statement"
  ]
};
export default content;
