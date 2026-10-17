import type { CourseModule } from '../types';
const content: CourseModule = {
  "id": "iterators",
  "title": "Итераторы и генераторы: первое знакомство",
  "goal": "Управлять одноразовым проходом, ленивой выдачей и ограниченным потреблением.",
  "track": "advanced",
  "depth": "Вводная последовательность",
  "prerequisites": [
    "functions",
    "debugging"
  ],
  "lessons": [
    {
      "id": "iterators-iterable",
      "title": "Итерируемый объект и итератор",
      "goal": "Различать источник значений и одноразовый проход.",
      "prerequisites": [],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "iterators-iterable-idea",
          "title": "Как это работает",
          "paragraphs": [
            "for работает не только со списком. Итерируемым называют объект, из которого можно получить итератор через iter. Список, строка, словарь и range — знакомые источники. Итератор хранит состояние конкретного прохода: next(iterator) выдаёт следующее значение и продвигает его. Два разных итератора одного списка имеют независимые текущие позиции. Сам список от продвижения итератора не изменяется.",
            "У итератора iter(iterator) возвращает его самого. Поэтому повторное получение iter не перематывает проход назад. Преобразование list(iterator) потребляет оставшиеся значения; второй такой вызов даст пустой список. Контейнер обычно можно обходить заново, но одноразовый поток — нельзя. Это объясняет, почему функция, которая сначала считает длину потока полным обходом, потом уже не находит данные."
          ],
          "examples": [
            {
              "id": "iterators-iterable-example-1",
              "title": "Один источник, два прохода",
              "code": "values = [4, 7]\na = iter(values)\nb = iter(values)\nprint(next(a))\nprint(next(a))\nprint(next(b))",
              "output": "4\n7\n4",
              "explanation": "a уже продвинулся до конца, b только начал; исходный список не менялся."
            }
          ],
          "goal": "Различать источник значений и одноразовый проход.",
          "prerequisites": []
        },
        {
          "id": "iterators-iterable-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "for скрывает детали протокола: получает итератор, запрашивает элементы до завершения и обрабатывает StopIteration. В этой вводной последовательности мы используем встроенные итераторы и генераторы; собственный класс с __iter__ и __next__ будет отдельным углублением после ООП. Не требуется знать внутреннее устройство памяти, чтобы понимать, какой проход уже израсходован.",
            "Подумай, кто владеет состоянием обхода. Если функция принимает готовый итератор, её вызов может сдвинуть позицию для другого кода. Такой эффект должен быть частью контракта. Если нужен повторный проход, можно получить новый итератор контейнера или осознанно сохранить поток в список, заплатив памятью. Не называй любой объект с for повторно используемой коллекцией."
          ],
          "examples": [
            {
              "id": "iterators-iterable-example-2",
              "title": "Исчерпание",
              "code": "source = iter([1, 2])\nprint(list(source))\nprint(list(source))",
              "output": "[1, 2]\n[]",
              "explanation": "Первый list потребил весь итератор, второй получил пустой остаток."
            },
            {
              "id": "iterators-iterable-example-3",
              "title": "Контейнер повторяем",
              "code": "values = [1, 2]\nprint(list(values))\nprint(list(values))",
              "output": "[1, 2]\n[1, 2]",
              "explanation": "У каждого list новый проход исходного списка; сами элементы не исчезают."
            }
          ],
          "goal": "Различать источник значений и одноразовый проход.",
          "prerequisites": [
            "iterators-iterable-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "iterators-iterable-first",
          "kind": "code",
          "title": "Первый элемент и остаток",
          "goal": "Первый элемент и остаток",
          "prerequisites": [
            "iterators-iterable"
          ],
          "prompt": "Реализуй first_or(source, default): получи первый элемент переданного iterable, либо default. Потребляй не больше одного элемента. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "first_or(source, default); iterable → элемент либо default.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Конечный iterable не более 100 скалярных элементов; числа по модулю до 1000, строки до 80. Потребление строго не больше одного элемента.",
          "examples": [
            {
              "input": [
                "first_or([], -1)"
              ],
              "output": "-1",
              "explanation": "Вызов продвигает готовый итератор ровно на один элемент."
            },
            {
              "input": [
                "first_or([0,4], -1)"
              ],
              "output": "0",
              "explanation": "Вызов продвигает готовый итератор ровно на один элемент."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "first_or([], -1)",
              "expectedValue": -1,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "first_or([], -1)"
            },
            {
              "expression": "first_or([0,4], -1)",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "first_or([0,4], -1)"
            },
            {
              "expression": "[first_or(source,-1), next(source,-1)]",
              "expectedValue": [
                3,
                5
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[first_or(source,-1), next(source,-1)]",
              "setup": "source = iter([3,5,7])"
            }
          ],
          "reference": "def first_or(source, default):\n    return next(iter(source), default)",
          "alternative": "def first_or(source, default):\n    for value in source:\n        return value\n    return default",
          "wrongSolutions": [
            {
              "code": "def first_or(source, default):\n    return list(source)[0]",
              "why": "Полное преобразование потребляет лишние элементы и не обрабатывает пустоту."
            },
            {
              "code": "def first_or(source, default):\n    return next(iter(source), default) or default",
              "why": "Успешный ноль ошибочно заменяется default."
            }
          ],
          "hints": [
            "Создай итератор один раз.",
            "next с default покрывает отсутствие.",
            "Не превращай поток в список ради одного элемента."
          ],
          "solutionExplanation": [
            "Вызов продвигает готовый итератор ровно на один элемент.",
            "Полное преобразование потребляет лишние элементы и не обрабатывает пустоту.",
            "Успешный ноль ошибочно заменяется default."
          ],
          "required": true
        },
        {
          "id": "iterators-iterable-twice",
          "kind": "code",
          "title": "Два прохода одного объекта",
          "goal": "Два прохода одного объекта",
          "prerequisites": [
            "iterators-iterable"
          ],
          "prompt": "Реализуй passes(source), возвращающую [list(source), list(source)] двумя последовательными проходами одного аргумента. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "passes(source); iterable → list[list].",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Конечный контейнер или готовый итератор до 100 целых от −1000 до 1000. Два полных прохода именно переданного объекта; до 200 значений в результате.",
          "examples": [
            {
              "input": [
                "passes([1,2])"
              ],
              "output": "[[1, 2], [1, 2]]",
              "explanation": "Контракт намеренно показывает разницу контейнера и одноразового объекта."
            },
            {
              "input": [
                "passes(iter([1,2]))"
              ],
              "output": "[[1, 2], []]",
              "explanation": "Контракт намеренно показывает разницу контейнера и одноразового объекта."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "passes([1,2])",
              "expectedValue": [
                [
                  1,
                  2
                ],
                [
                  1,
                  2
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "passes([1,2])"
            },
            {
              "expression": "passes(iter([1,2]))",
              "expectedValue": [
                [
                  1,
                  2
                ],
                []
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "passes(iter([1,2]))"
            },
            {
              "expression": "passes(iter([]))",
              "expectedValue": [
                [],
                []
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "passes(iter([]))"
            }
          ],
          "reference": "def passes(source):\n    first = list(source)\n    second = list(source)\n    return [first, second]",
          "alternative": "def passes(source):\n    result = []\n    for unused in range(2):\n        result.append(list(source))\n    return result",
          "wrongSolutions": [
            {
              "code": "def passes(source):\n    values = list(source)\n    return [values, values.copy()]",
              "why": "Копирование результата скрывает одноразовость итератора."
            },
            {
              "code": "def passes(source):\n    it = iter(source)\n    return [list(it), list(it)]",
              "why": "Один заранее созданный итератор делает даже список одноразовым."
            }
          ],
          "hints": [
            "Повторно обходи сам аргумент.",
            "Для списка новые проходы независимы.",
            "Для переданного итератора состояние сохраняется между проходами."
          ],
          "solutionExplanation": [
            "Контракт намеренно показывает разницу контейнера и одноразового объекта.",
            "Копирование результата скрывает одноразовость итератора.",
            "Один заранее созданный итератор делает даже список одноразовым."
          ],
          "required": true
        },
        {
          "id": "iterators-iterable-two-iterators",
          "kind": "code",
          "title": "Два независимых прохода списка",
          "goal": "Два независимых прохода списка",
          "prerequisites": [
            "iterators-iterable"
          ],
          "prompt": "Реализуй starts(values), создающую два разных итератора списка и возвращающую первые элементы каждого либо None. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "starts(values); list → [элемент|None, элемент|None].",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Список 0…100 целых от −1000 до 1000. Два независимых итератора; от каждого читается не больше одного элемента.",
          "examples": [
            {
              "input": [
                "starts([])"
              ],
              "output": "[None, None]",
              "explanation": "Независимость относится к состоянию прохода, а не к копированию элементов."
            },
            {
              "input": [
                "starts([4,7])"
              ],
              "output": "[4, 4]",
              "explanation": "Независимость относится к состоянию прохода, а не к копированию элементов."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "starts([])",
              "expectedValue": [
                null,
                null
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "starts([])"
            },
            {
              "expression": "starts([4,7])",
              "expectedValue": [
                4,
                4
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "starts([4,7])"
            },
            {
              "expression": "starts([0])",
              "expectedValue": [
                0,
                0
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "starts([0])"
            }
          ],
          "reference": "def starts(values):\n    a = iter(values)\n    b = iter(values)\n    return [next(a, None), next(b, None)]",
          "alternative": "def starts(values):\n    return [next(iter(values), None) for unused in range(2)]",
          "wrongSolutions": [
            {
              "code": "def starts(values):\n    a = iter(values)\n    b = a\n    return [next(a, None), next(b, None)]",
              "why": "Два имени одного итератора делят позицию."
            },
            {
              "code": "def starts(values):\n    return [values[0], values[0]]",
              "why": "Пустой список требует объявленного результата."
            }
          ],
          "hints": [
            "Создай iter(values) отдельно для каждого прохода.",
            "Не присваивай b = a.",
            "Используй next с default для пустого списка."
          ],
          "solutionExplanation": [
            "Независимость относится к состоянию прохода, а не к копированию элементов.",
            "Два имени одного итератора делят позицию.",
            "Пустой список требует объявленного результата."
          ],
          "required": true
        },
        {
          "id": "iterators-iterable-same",
          "kind": "predict",
          "title": "Повторное iter",
          "goal": "Повторное iter",
          "prerequisites": [
            "iterators-iterable"
          ],
          "prompt": "Что выведет код?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Точный вывод программы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "values = [1, 2]",
                "print(list(values))",
                "print(list(values))"
              ],
              "output": "[1, 2]\n[1, 2]",
              "explanation": "Разобранный пример по этой идее: У каждого list новый проход исходного списка; сами элементы не исчезают. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "iter готового итератора не создаёт новый проход."
          ],
          "required": true,
          "answer": "1\n2",
          "initialCode": "a = iter([1, 2])\nb = iter(a)\nprint(next(a))\nprint(next(b))"
        }
      ]
    },
    {
      "id": "iterators-next",
      "title": "next, StopIteration и ограниченное потребление",
      "goal": "Читать поток до завершения без потери лишних элементов.",
      "prerequisites": [
        "iterators-iterable"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "iterators-next-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Когда значения закончились, next(iterator) вызывает StopIteration. Это сигнал нормального конца протокола, а не поломка данных. В обычном цикле его обрабатывает for. В ручном чтении можно перехватить StopIteration или передать next второй аргумент default. Если default совпадает с допустимым элементом, его нельзя использовать для однозначного определения конца без дополнительного соглашения.",
            "Ограниченное чтение должно остановиться после k элементов и оставить остальные для следующего кода. Преобразование list(source) с последующим срезом [:k] выглядит правильно по результату, но уже потребило весь поток. Это наблюдаемая ошибка, если вызывающий код проверяет следующий элемент. В тестах такого задания проверяется и выбранная часть, и оставшаяся позиция."
          ],
          "examples": [
            {
              "id": "iterators-next-example-1",
              "title": "Конец с default",
              "code": "it = iter([0])\nprint(next(it, \"конец\"))\nprint(next(it, \"конец\"))\nprint(next(it, \"конец\"))",
              "output": "0\nконец\nконец",
              "explanation": "Ноль — данные, последующие запросы видят устойчивое исчерпание."
            }
          ],
          "goal": "Читать поток до завершения без потери лишних элементов.",
          "prerequisites": [
            "iterators-iterable"
          ]
        },
        {
          "id": "iterators-next-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Вызов next с default не возвращает итератор назад. Исчерпанный обычный итератор остаётся исчерпанным при последующих запросах. Для нового прохода нужен исходный контейнер или фабрика нового потока. Не пытайся лечить конец вызовом iter старого итератора: это тот же объект. Для бесконечных источников полный list никогда не завершится, поэтому границу потребления нужно задавать до чтения.",
            "Область try лучше ограничивать именно запросом следующего элемента. Если поместить туда весь сложный алгоритм, можно перепутать ошибку внутренней логики с завершением источника. В этом уроке входные потоки конечны, но правильный ограниченный алгоритм полезен и для больших данных. Проверяй k = 0, короткий источник и источник длиннее k: они требуют разных причин остановки."
          ],
          "examples": [
            {
              "id": "iterators-next-example-2",
              "title": "Обработать StopIteration",
              "code": "it = iter([])\ntry:\n    value = next(it)\nexcept StopIteration:\n    print(\"готово\")",
              "output": "готово",
              "explanation": "Конец пустого источника обрабатывается без выдуманного элемента."
            },
            {
              "id": "iterators-next-example-3",
              "title": "Остаток после одного запроса",
              "code": "it = iter([2, 4, 6])\nprint(next(it))\nprint(list(it))",
              "output": "2\n[4, 6]",
              "explanation": "Первый запрос потребил только 2; оставшаяся часть начинается с 4."
            }
          ],
          "goal": "Читать поток до завершения без потери лишних элементов.",
          "prerequisites": [
            "iterators-next-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "iterators-next-take",
          "kind": "code",
          "title": "Взять не больше k элементов",
          "goal": "Взять не больше k элементов",
          "prerequisites": [
            "iterators-next"
          ],
          "prompt": "Реализуй take(source,k), возвращающую список первых не более k элементов. source — готовый итератор; не читай лишний элемент. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "take(iterator,k); 0 ≤ k ≤ 100 → list.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Конечный готовый итератор до 100 скалярных элементов; 0 ≤ k ≤ 100. Числа по модулю до 1000, строки до 80. Запрещено потреблять k+1-й элемент.",
          "examples": [
            {
              "input": [
                "it=iter([1,2])",
                "[take(it,0), next(it,None)]"
              ],
              "output": "[[], 1]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Предел применяется к потреблению, а не только к размеру результата."
            },
            {
              "input": [
                "it=iter([1,2,3,4])",
                "[take(it,2), next(it,None)]"
              ],
              "output": "[[1, 2], 3]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Предел применяется к потреблению, а не только к размеру результата."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "[take(it,0), next(it,None)]",
              "expectedValue": [
                [],
                1
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[take(it,0), next(it,None)]",
              "setup": "it=iter([1,2])"
            },
            {
              "expression": "[take(it,2), next(it,None)]",
              "expectedValue": [
                [
                  1,
                  2
                ],
                3
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[take(it,2), next(it,None)]",
              "setup": "it=iter([1,2,3,4])"
            },
            {
              "expression": "take(iter([5]),3)",
              "expectedValue": [
                5
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "take(iter([5]),3)"
            },
            {
              "expression": "take(iter([]),2)",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "take(iter([]),2)"
            }
          ],
          "reference": "def take(source,k):\n    result = []\n    for unused in range(k):\n        try:\n            result.append(next(source))\n        except StopIteration:\n            break\n    return result",
          "alternative": "from itertools import islice\ndef take(source,k):\n    return list(islice(source,k))",
          "wrongSolutions": [
            {
              "code": "def take(source,k):\n    return list(source)[:k]",
              "why": "Полный list потребляет остаток за пределом k."
            },
            {
              "code": "def take(source,k):\n    result=[]\n    for unused in range(k + 1):\n        try:\n            result.append(next(source))\n        except StopIteration:\n            break\n    return result",
              "why": "Лишняя итерация нарушает предел."
            }
          ],
          "hints": [
            "Читай максимум k раз.",
            "Каждый next может сообщить StopIteration.",
            "Остановись до попытки прочитать k+1-й элемент."
          ],
          "solutionExplanation": [
            "Предел применяется к потреблению, а не только к размеру результата.",
            "Полный list потребляет остаток за пределом k.",
            "Лишняя итерация нарушает предел."
          ],
          "required": true
        },
        {
          "id": "iterators-next-skip",
          "kind": "code",
          "title": "Пропустить и вернуть следующий",
          "goal": "Пропустить и вернуть следующий",
          "prerequisites": [
            "iterators-next"
          ],
          "prompt": "Реализуй after(source,k,default): пропусти до k элементов готового итератора и верни следующий либо default. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "after(iterator,k,default); k ≥ 0.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Готовый конечный итератор до 100 целых от −1000 до 1000; 0 ≤ k ≤ 100; default — целое в том же диапазоне. Не больше k+1 запросов next.",
          "examples": [
            {
              "input": [
                "after(iter([2,4,6]),1,-1)"
              ],
              "output": "4",
              "explanation": "k = 0 означает получить самый первый элемент."
            },
            {
              "input": [
                "after(iter([]),0,-1)"
              ],
              "output": "-1",
              "explanation": "k = 0 означает получить самый первый элемент."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "after(iter([2,4,6]),1,-1)",
              "expectedValue": 4,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "after(iter([2,4,6]),1,-1)"
            },
            {
              "expression": "after(iter([]),0,-1)",
              "expectedValue": -1,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "after(iter([]),0,-1)"
            },
            {
              "expression": "after(iter([7]),3,-1)",
              "expectedValue": -1,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "after(iter([7]),3,-1)"
            },
            {
              "expression": "after(iter([0,3]),0,-1)",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "after(iter([0,3]),0,-1)"
            }
          ],
          "reference": "def after(source,k,default):\n    for unused in range(k):\n        try:\n            next(source)\n        except StopIteration:\n            return default\n    return next(source,default)",
          "alternative": "from itertools import islice\ndef after(source,k,default):\n    return next(islice(source,k,None),default)",
          "wrongSolutions": [
            {
              "code": "def after(source,k,default):\n    return next(source,default)",
              "why": "Не пропускает k значений."
            },
            {
              "code": "def after(source,k,default):\n    return list(source)[k]",
              "why": "Короткий источник вызывает IndexError."
            }
          ],
          "hints": [
            "Пропуск потребляет элементы, но не добавляет их в результат.",
            "После пропуска нужен ещё один next.",
            "Конец на любой стадии возвращает default."
          ],
          "solutionExplanation": [
            "k = 0 означает получить самый первый элемент.",
            "Не пропускает k значений.",
            "Короткий источник вызывает IndexError."
          ],
          "required": true
        },
        {
          "id": "iterators-next-rest-sum",
          "kind": "code",
          "title": "Сумма оставшейся части",
          "goal": "Сумма оставшейся части",
          "prerequisites": [
            "iterators-next"
          ],
          "prompt": "Реализуй rest_sum(source), суммирующую оставшиеся значения готового числового итератора и исчерпывающую его. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "rest_sum(iterator) → int.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Конечный готовый итератор до 100 целых от −1000 до 1000. Вся оставшаяся часть потребляется; сумма по модулю до 100000.",
          "examples": [
            {
              "input": [
                "it=iter([2,3])",
                "[rest_sum(it), list(it)]"
              ],
              "output": "[5, []]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Полный обход здесь нужен по контракту; в take он был ошибкой."
            },
            {
              "input": [
                "rest_sum(iter([]))"
              ],
              "output": "0",
              "explanation": "Полный обход здесь нужен по контракту; в take он был ошибкой."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "[rest_sum(it), list(it)]",
              "expectedValue": [
                5,
                []
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[rest_sum(it), list(it)]",
              "setup": "it=iter([2,3])"
            },
            {
              "expression": "rest_sum(iter([]))",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "rest_sum(iter([]))"
            },
            {
              "expression": "rest_sum(iter([-2,0,1]))",
              "expectedValue": -1,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "rest_sum(iter([-2,0,1]))"
            }
          ],
          "reference": "def rest_sum(source):\n    total=0\n    for x in source:\n        total+=x\n    return total",
          "alternative": "def rest_sum(source):\n    return sum(source)",
          "wrongSolutions": [
            {
              "code": "def rest_sum(source):\n    return next(source,0)",
              "why": "Обрабатывает один элемент вместо остатка."
            },
            {
              "code": "def rest_sum(source):\n    return len(list(source))",
              "why": "Количество не равно сумме."
            }
          ],
          "hints": [
            "Потреби все оставшиеся числа.",
            "Нейтральная сумма пустого источника равна 0.",
            "После завершения новых элементов у этого итератора нет."
          ],
          "solutionExplanation": [
            "Полный обход здесь нужен по контракту; в take он был ошибкой.",
            "Обрабатывает один элемент вместо остатка.",
            "Количество не равно сумме."
          ],
          "required": true
        },
        {
          "id": "iterators-next-end",
          "kind": "choice",
          "title": "Как обозначается конец?",
          "goal": "Как обозначается конец?",
          "prerequisites": [
            "iterators-next"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "it = iter([2, 4, 6])",
                "print(next(it))",
                "print(list(it))"
              ],
              "output": "2\n[4, 6]",
              "explanation": "Разобранный пример по этой идее: Первый запрос потребил только 2; оставшаяся часть начинается с 4. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Конец не сбрасывает состояние; для нового прохода нужен новый источник."
          ],
          "required": true,
          "answer": [
            "1",
            "2"
          ],
          "choices": [
            {
              "id": "1",
              "text": "next(it) на конце вызывает StopIteration."
            },
            {
              "id": "2",
              "text": "next(it,default) возвращает default на конце."
            },
            {
              "id": "3",
              "text": "iter(it) перематывает готовый итератор."
            }
          ]
        }
      ]
    },
    {
      "id": "iterators-yield",
      "title": "yield и сохранение состояния",
      "goal": "Писать генератор и понимать приостановку между выдачами.",
      "prerequisites": [
        "iterators-next"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "iterators-yield-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Функция с yield создаёт генератор — разновидность итератора. Вызов сохраняет аргументы, но не исполняет тело до запроса элемента. При next выполнение идёт до ближайшего yield, отдаёт значение и приостанавливается. Следующий next продолжает с той же точки, сохраняя локальные переменные. Это отличается от return, который завершает весь вызов и не оставляет следующего шага.",
            "В генераторе обычный return завершает поток. Не нужно вручную raise StopIteration: в генераторе это может привести к RuntimeError по правилам языка. Чтобы выдать несколько значений, размещай yield в цикле; каждое выполнение выдаёт один элемент. Когда цикл закончится, поток исчерпан. Пустой допустимый диапазон создаёт генератор, который сразу завершится при первом запросе."
          ],
          "examples": [
            {
              "id": "iterators-yield-example-1",
              "title": "Состояние между next",
              "code": "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\ng = countdown(3)\nprint(next(g))\nprint(next(g))\nprint(list(g))",
              "output": "3\n2\n[1]",
              "explanation": "Генератор хранит n между запросами; остаток после двух выдач содержит 1."
            }
          ],
          "goal": "Писать генератор и понимать приостановку между выдачами.",
          "prerequisites": [
            "iterators-next"
          ]
        },
        {
          "id": "iterators-yield-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Ленивость означает, что работа выполняется по потребности. Если вызван только первый next, последующие элементы ещё не вычислены. Поэтому список и генератор могут давать одинаковый полный результат, но отличаться потреблением памяти и побочными эффектами источника. В тесте ленивого преобразования проверяется, сколько входных значений прочитано к данному моменту, а не наличие слова yield в коде.",
            "Генератор нельзя использовать повторно после полного обхода. Чтобы снова получить значения, вызови функцию-генератор ещё раз. Не делай бесконечный list генератора: ограничивай чтение через take или islice. Здесь все самостоятельные источники конечны; отдельные короткие примеры показывают отложенное вычисление без таймеров и сети."
          ],
          "examples": [
            {
              "id": "iterators-yield-example-2",
              "title": "Начало отложено",
              "code": "def one(log):\n    log.append(\"начал\")\n    yield 7\nlog=[]\ng=one(log)\nprint(log)\nprint(next(g))\nprint(log)",
              "output": "[]\n7\n['начал']",
              "explanation": "Создание генератора не выполнило append; первый next запустил тело."
            },
            {
              "id": "iterators-yield-example-3",
              "title": "Новый вызов — новый проход",
              "code": "def values():\n    yield 1\n    yield 2\ng=values()\nprint(list(g))\nprint(list(g))\nprint(list(values()))",
              "output": "[1, 2]\n[]\n[1, 2]",
              "explanation": "Исчерпанный g не восстанавливается; новый вызов values создаёт другой генератор."
            }
          ],
          "goal": "Писать генератор и понимать приостановку между выдачами.",
          "prerequisites": [
            "iterators-yield-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "iterators-yield-countdown",
          "kind": "code",
          "title": "Генератор обратного отсчёта",
          "goal": "Генератор обратного отсчёта",
          "prerequisites": [
            "iterators-yield"
          ],
          "prompt": "Реализуй countdown(n), выдающий n,n−1,…,1. При n ≤ 0 поток пуст. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "list(countdown(n)) → list[int].",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "−1000 ≤ n ≤ 1000; при n ≤ 0 элементов нет, при положительном n до 1000 выдач. Полного бесконечного обхода нет.",
          "examples": [
            {
              "input": [
                "list(countdown(0))"
              ],
              "output": "[]",
              "explanation": "Генератор сохраняет n между запросами потребителя."
            },
            {
              "input": [
                "list(countdown(3))"
              ],
              "output": "[3, 2, 1]",
              "explanation": "Генератор сохраняет n между запросами потребителя."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "list(countdown(0))",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(countdown(0))"
            },
            {
              "expression": "list(countdown(3))",
              "expectedValue": [
                3,
                2,
                1
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(countdown(3))"
            },
            {
              "expression": "list(countdown(-2))",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(countdown(-2))"
            }
          ],
          "reference": "def countdown(n):\n    while n > 0:\n        yield n\n        n-=1",
          "alternative": "def countdown(n):\n    yield from range(n,0,-1)",
          "wrongSolutions": [
            {
              "code": "def countdown(n):\n    for x in range(n,0,-1):\n        return x",
              "why": "return отдаёт число вместо итератора выдач."
            },
            {
              "code": "def countdown(n):\n    yield from range(n,-1,-1)",
              "why": "Ноль исключён условием потока."
            }
          ],
          "hints": [
            "yield должен выполняться для каждого положительного значения.",
            "Уменьшай состояние после выдачи.",
            "Пустой диапазон должен завершиться без элемента."
          ],
          "solutionExplanation": [
            "Генератор сохраняет n между запросами потребителя.",
            "return отдаёт число вместо итератора выдач.",
            "Ноль исключён условием потока."
          ],
          "required": true
        },
        {
          "id": "iterators-yield-lazy-squares",
          "kind": "code",
          "title": "Ленивые квадраты",
          "goal": "Ленивые квадраты",
          "prerequisites": [
            "iterators-yield"
          ],
          "prompt": "Реализуй lazy_squares(source), выдающий квадраты по одному. Не читай источник при создании результата; один next должен прочитать только один входной элемент. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "lazy_squares(iterable) → iterator.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Конечный source до 100 целых от −1000 до 1000. Квадраты до 1000000. Создание результата не читает источник; одна выдача читает ровно один элемент.",
          "examples": [
            {
              "input": [
                "list(lazy_squares([]))"
              ],
              "output": "[]",
              "explanation": "Проверка видит момент потребления, а не ищет синтаксический маркер."
            },
            {
              "input": [
                "list(lazy_squares([-2,0,3]))"
              ],
              "output": "[4, 0, 9]",
              "explanation": "Проверка видит момент потребления, а не ищет синтаксический маркер."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "list(lazy_squares([]))",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(lazy_squares([]))"
            },
            {
              "expression": "list(lazy_squares([-2,0,3]))",
              "expectedValue": [
                4,
                0,
                9
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(lazy_squares([-2,0,3]))"
            },
            {
              "expression": "[(g:=lazy_squares(source)) is not None,list(seen),next(g),list(seen)]",
              "expectedValue": [
                true,
                [],
                4,
                [
                  2
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(g:=lazy_squares(source)) is not None,list(seen),next(g),list(seen)]",
              "setup": "seen=[]\nsource=(seen.append(x) or x for x in [2,3,4])"
            }
          ],
          "reference": "def lazy_squares(source):\n    for x in source:\n        yield x*x",
          "alternative": "def lazy_squares(source):\n    return (x**2 for x in source)",
          "wrongSolutions": [
            {
              "code": "def lazy_squares(source):\n    return iter([x*x for x in source])",
              "why": "Список вычисляет и потребляет весь источник заранее."
            },
            {
              "code": "def lazy_squares(source):\n    for x in source:\n        yield x*2",
              "why": "Удвоение не является квадратом."
            }
          ],
          "hints": [
            "Помести вычисление внутрь выдающего цикла.",
            "Не строй промежуточный полный список.",
            "Состояние seen в проверке должно измениться только после next."
          ],
          "solutionExplanation": [
            "Проверка видит момент потребления, а не ищет синтаксический маркер.",
            "Список вычисляет и потребляет весь источник заранее.",
            "Удвоение не является квадратом."
          ],
          "required": true
        },
        {
          "id": "iterators-yield-positive",
          "kind": "code",
          "title": "Ленивый фильтр",
          "goal": "Ленивый фильтр",
          "prerequisites": [
            "iterators-yield"
          ],
          "prompt": "Реализуй positives(source), выдающий только строго положительные элементы без изменения порядка. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "list(positives(iterable)) → list.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Конечный source до 100 целых от −1000 до 1000. Выход до 100 элементов; исходный порядок сохраняется, полный промежуточный список не нужен.",
          "examples": [
            {
              "input": [
                "list(positives([]))"
              ],
              "output": "[]",
              "explanation": "Элемент выдаётся только после подходящего входного значения."
            },
            {
              "input": [
                "list(positives([-1,0,3,2]))"
              ],
              "output": "[3, 2]",
              "explanation": "Элемент выдаётся только после подходящего входного значения."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "list(positives([]))",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(positives([]))"
            },
            {
              "expression": "list(positives([-1,0,3,2]))",
              "expectedValue": [
                3,
                2
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(positives([-1,0,3,2]))"
            },
            {
              "expression": "list(positives([0,-2]))",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(positives([0,-2]))"
            }
          ],
          "reference": "def positives(source):\n    for x in source:\n        if x>0:\n            yield x",
          "alternative": "def positives(source):\n    return (x for x in source if x>0)",
          "wrongSolutions": [
            {
              "code": "def positives(source):\n    yield from (x for x in source if x>=0)",
              "why": "Ноль не положителен."
            },
            {
              "code": "def positives(source):\n    yield from sorted(x for x in source if x>0)",
              "why": "Сортировка нарушает порядок и требует предварительного чтения."
            }
          ],
          "hints": [
            "Фильтр проверяет исходное значение.",
            "Выдавай только после x > 0.",
            "Не сортируй результат."
          ],
          "solutionExplanation": [
            "Элемент выдаётся только после подходящего входного значения.",
            "Ноль не положителен.",
            "Сортировка нарушает порядок и требует предварительного чтения."
          ],
          "required": true
        },
        {
          "id": "iterators-yield-yield-return",
          "kind": "choice",
          "title": "yield и return",
          "goal": "yield и return",
          "prerequisites": [
            "iterators-yield"
          ],
          "prompt": "Какие утверждения верны?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "def values():",
                "    yield 1",
                "    yield 2",
                "g=values()",
                "print(list(g))",
                "print(list(g))",
                "print(list(values()))"
              ],
              "output": "[1, 2]\n[]\n[1, 2]",
              "explanation": "Разобранный пример по этой идее: Исчерпанный g не восстанавливается; новый вызов values создаёт другой генератор. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Ленивый поток начинает работу по запросу, а не при одном создании объекта."
          ],
          "required": true,
          "answer": [
            "1",
            "2"
          ],
          "choices": [
            {
              "id": "1",
              "text": "yield может приостановить выполнение с сохранением локального состояния."
            },
            {
              "id": "2",
              "text": "return завершает текущий вызов."
            },
            {
              "id": "3",
              "text": "Создание генератора всегда вычисляет все его элементы."
            }
          ]
        }
      ]
    },
    {
      "id": "iterators-delegate",
      "title": "yield from и составной поток",
      "goal": "Соединять потоки без лишней вложенности результата.",
      "prerequisites": [
        "iterators-yield"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "iterators-delegate-idea",
          "title": "Как это работает",
          "paragraphs": [
            "yield from source передаёт потребителю все значения другого итерируемого источника по одному. Для простого использования это похоже на for value in source: yield value. Различай yield source и yield from source: первое выдаёт сам объект как один элемент, второе делегирует его элементы. У списка списков это даёт разную глубину результата.",
            "Составной поток можно строить из заголовка, данных и заключительного элемента. Для соединения нескольких источников достаточно внешнего цикла и yield from на каждой итерации. Пустой источник не выдаёт ничего и не создаёт искусственный пустой элемент. Это удобно для последовательной обработки частей без предварительного общего списка."
          ],
          "examples": [
            {
              "id": "iterators-delegate-example-1",
              "title": "Один уровень",
              "code": "def flatten(groups):\n    for group in groups:\n        yield from group\nprint(list(flatten([[1,2],[],[3]])))",
              "output": "[1, 2, 3]",
              "explanation": "Внешние группы исчезли, числа идут в исходном порядке."
            }
          ],
          "goal": "Соединять потоки без лишней вложенности результата.",
          "prerequisites": [
            "iterators-yield"
          ]
        },
        {
          "id": "iterators-delegate-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Одна делегация снимает один уровень вложенности. Если элементами вложенного списка являются ещё списки, они останутся значениями. Рекурсивное «выпрямление чего угодно» требует другого контракта и осторожности со строками, которые тоже итерируемы. В этом уроке глубина и тип источников объявлены явно, поэтому нет скрытого обхода произвольных объектов.",
            "yield from не копирует значения и не делает одноразовый источник повторно используемым. Если его уже частично прочитали, делегируется только остаток. Для сохранения всех данных нужна явная материализация или новый источник. Сначала объясни требуемый порядок выдачи на двух коротких группах, затем проверь пустую середину и уже начатый итератор."
          ],
          "examples": [
            {
              "id": "iterators-delegate-example-2",
              "title": "Объект или его элементы",
              "code": "def direct():\n    yield [1,2]\ndef delegated():\n    yield from [1,2]\nprint(list(direct()))\nprint(list(delegated()))",
              "output": "[[1, 2]]\n[1, 2]",
              "explanation": "Один список как элемент отличается от двух числовых элементов."
            },
            {
              "id": "iterators-delegate-example-3",
              "title": "Только остаток",
              "code": "it=iter([1,2,3])\nnext(it)\ndef rest():\n    yield from it\nprint(list(rest()))",
              "output": "[2, 3]",
              "explanation": "Делегация не восстанавливает уже потреблённую единицу."
            }
          ],
          "goal": "Соединять потоки без лишней вложенности результата.",
          "prerequisites": [
            "iterators-delegate-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "iterators-delegate-flatten",
          "kind": "code",
          "title": "Один уровень списков",
          "goal": "Один уровень списков",
          "prerequisites": [
            "iterators-delegate"
          ],
          "prompt": "Реализуй flatten(groups), выдающую элементы каждой группы по очереди; группы — конечные iterable чисел. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "list(flatten(groups)) → list[int].",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Не больше 20 конечных групп; суммарно до 100 чисел от −1000 до 1000. Снимается ровно один уровень, строки как группы не передаются.",
          "examples": [
            {
              "input": [
                "list(flatten([]))"
              ],
              "output": "[]",
              "explanation": "Одна делегация снимает ровно один уровень группировки."
            },
            {
              "input": [
                "list(flatten([[1,2],[],[3]]))"
              ],
              "output": "[1, 2, 3]",
              "explanation": "Одна делегация снимает ровно один уровень группировки."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "list(flatten([]))",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(flatten([]))"
            },
            {
              "expression": "list(flatten([[1,2],[],[3]]))",
              "expectedValue": [
                1,
                2,
                3
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(flatten([[1,2],[],[3]]))"
            },
            {
              "expression": "list(flatten([[],[-1]]))",
              "expectedValue": [
                -1
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(flatten([[],[-1]]))"
            }
          ],
          "reference": "def flatten(groups):\n    for group in groups:\n        yield from group",
          "alternative": "def flatten(groups):\n    for group in groups:\n        for x in group:\n            yield x",
          "wrongSolutions": [
            {
              "code": "def flatten(groups):\n    for group in groups:\n        yield group",
              "why": "Выдаёт группы целиком вместо элементов."
            },
            {
              "code": "def flatten(groups):\n    for group in groups:\n        for x in group:\n            yield from [x,x]",
              "why": "Каждый элемент дублируется."
            }
          ],
          "hints": [
            "Внешний цикл выбирает группу.",
            "Внутренний источник должен выдать свои элементы.",
            "Пустая группа не вносит значение."
          ],
          "solutionExplanation": [
            "Одна делегация снимает ровно один уровень группировки.",
            "Выдаёт группы целиком вместо элементов.",
            "Каждый элемент дублируется."
          ],
          "required": true
        },
        {
          "id": "iterators-delegate-frame",
          "kind": "code",
          "title": "Обрамить поток",
          "goal": "Обрамить поток",
          "prerequisites": [
            "iterators-delegate"
          ],
          "prompt": "Реализуй framed(source), выдающую строку «начало», затем элементы source, затем «конец». Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "list(framed(source)) → list.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Конечный source до 100 целых от −1000 до 1000. Результат содержит до 102 элементов, включая две фиксированные строковые метки.",
          "examples": [
            {
              "input": [
                "list(framed([]))"
              ],
              "output": "['начало', 'конец']",
              "explanation": "Единичная выдача и делегация имеют разные роли."
            },
            {
              "input": [
                "list(framed([1,2]))"
              ],
              "output": "['начало', 1, 2, 'конец']",
              "explanation": "Единичная выдача и делегация имеют разные роли."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "list(framed([]))",
              "expectedValue": [
                "начало",
                "конец"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(framed([]))"
            },
            {
              "expression": "list(framed([1,2]))",
              "expectedValue": [
                "начало",
                1,
                2,
                "конец"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(framed([1,2]))"
            },
            {
              "expression": "list(framed(iter([0])))",
              "expectedValue": [
                "начало",
                0,
                "конец"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(framed(iter([0])))"
            }
          ],
          "reference": "def framed(source):\n    yield \"начало\"\n    yield from source\n    yield \"конец\"",
          "alternative": "def framed(source):\n    for x in [\"начало\"]:\n        yield x\n    for x in source:\n        yield x\n    for x in [\"конец\"]:\n        yield x",
          "wrongSolutions": [
            {
              "code": "def framed(source):\n    yield \"начало\"\n    yield source\n    yield \"конец\"",
              "why": "Выдаёт объект источника одним элементом."
            },
            {
              "code": "def framed(source):\n    yield from \"начало\"\n    yield from source\n    yield \"конец\"",
              "why": "yield from строки выдаёт отдельные буквы."
            }
          ],
          "hints": [
            "Метки выдаются как единые строки.",
            "Только данные делегируются через yield from.",
            "Заключительная метка должна появиться и после пустого источника."
          ],
          "solutionExplanation": [
            "Единичная выдача и делегация имеют разные роли.",
            "Выдаёт объект источника одним элементом.",
            "yield from строки выдаёт отдельные буквы."
          ],
          "required": true
        },
        {
          "id": "iterators-delegate-ranges",
          "kind": "code",
          "title": "Последовательность диапазонов",
          "goal": "Последовательность диапазонов",
          "prerequisites": [
            "iterators-delegate"
          ],
          "prompt": "Реализуй ranges(bounds), где bounds — пары start,stop. Выдай числа каждого range(start,stop) подряд, не смешивая диапазоны сортировкой. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "list(ranges(list[tuple[int,int]])) → list[int].",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "До 20 пар start,stop; границы −1000…1000. Суммарное число значений всех range не больше 1000; при start≥stop отдельный диапазон пуст.",
          "examples": [
            {
              "input": [
                "list(ranges([]))"
              ],
              "output": "[]",
              "explanation": "Составной поток не требует общей материализации всех диапазонов."
            },
            {
              "input": [
                "list(ranges([(2,4),(0,2)]))"
              ],
              "output": "[2, 3, 0, 1]",
              "explanation": "Составной поток не требует общей материализации всех диапазонов."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "list(ranges([]))",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(ranges([]))"
            },
            {
              "expression": "list(ranges([(2,4),(0,2)]))",
              "expectedValue": [
                2,
                3,
                0,
                1
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(ranges([(2,4),(0,2)]))"
            },
            {
              "expression": "list(ranges([(3,3),(-2,0)]))",
              "expectedValue": [
                -2,
                -1
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(ranges([(3,3),(-2,0)]))"
            }
          ],
          "reference": "def ranges(bounds):\n    for start,stop in bounds:\n        yield from range(start,stop)",
          "alternative": "def ranges(bounds):\n    for pair in bounds:\n        current=pair[0]\n        while current<pair[1]:\n            yield current\n            current+=1",
          "wrongSolutions": [
            {
              "code": "def ranges(bounds):\n    for start,stop in bounds:\n        yield from range(start,stop+1)",
              "why": "Правая граница диапазона исключена."
            },
            {
              "code": "def ranges(bounds):\n    result=[]\n    for start,stop in bounds:\n        result.extend(range(start,stop))\n    yield from sorted(result)",
              "why": "Сортировка разрушает порядок отдельных источников."
            }
          ],
          "hints": [
            "Каждая пара описывает отдельный range.",
            "Сохрани порядок пар и границы stop.",
            "Передавай элементы диапазона, а не сам range как объект."
          ],
          "solutionExplanation": [
            "Составной поток не требует общей материализации всех диапазонов.",
            "Правая граница диапазона исключена.",
            "Сортировка разрушает порядок отдельных источников."
          ],
          "required": true
        },
        {
          "id": "iterators-delegate-from",
          "kind": "predict",
          "title": "Глубина выдачи",
          "goal": "Глубина выдачи",
          "prerequisites": [
            "iterators-delegate"
          ],
          "prompt": "Что выведет код?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Точный вывод программы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "it=iter([1,2,3])",
                "next(it)",
                "def rest():",
                "    yield from it",
                "print(list(rest()))"
              ],
              "output": "[2, 3]",
              "explanation": "Разобранный пример по этой идее: Делегация не восстанавливает уже потреблённую единицу. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "yield from делегирует элементы группы; пустая группа ничего не выдаёт."
          ],
          "required": true,
          "answer": "[1, 2, 3]",
          "initialCode": "def values():\n    yield from [1,2]\n    yield from []\n    yield 3\nprint(list(values()))"
        }
      ]
    },
    {
      "id": "iterators-stream-project",
      "title": "Практическая работа: ограниченный поток",
      "goal": "Соединять ленивое преобразование и ограничение чтения.",
      "prerequisites": [
        "iterators-delegate"
      ],
      "role": "project",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "iterators-stream-project-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Потоковая обработка полезна, когда источник большой или значения поступают по мере чтения. Проект строит небольшую цепочку: источник → фильтр → преобразование → ограниченный потребитель. Каждый этап имеет собственный контракт и не читает данные за пределом необходимого. Мы не подключаем настоящий файл или сеть: источники создаются в памяти и легко проверяются.",
            "Первый этап выдаёт накопленную сумму, сохраняя только текущий итог. Второй объединяет фильтрацию и преобразование, а последний берёт ограниченное число ответов. Учти, что один выход фильтра может потребовать несколько чтений входа: отрицательные значения будут просмотрены, но не выданы. Ленивость не означает «один вход на один выход» для любого алгоритма; она означает отсутствие ненужной предварительной работы.",
            "Запись from itertools import islice получает функцию islice из стандартного модуля itertools, после чего её можно вызывать по короткому имени. Это не загрузка файла ученика и не установка пакета. Импорт count в примере нужен только для источника с неограниченным количеством значений; ограничитель islice ставится до преобразования в список."
          ],
          "examples": [
            {
              "id": "iterators-stream-project-example-1",
              "title": "Ограничить потенциально бесконечный источник",
              "code": "from itertools import count,islice\nprint(list(islice(count(5,2),4)))",
              "output": "[5, 7, 9, 11]",
              "explanation": "Читаются только четыре значения: 5, 7, 9, 11; полный count не материализуется."
            }
          ],
          "goal": "Соединять ленивое преобразование и ограничение чтения.",
          "prerequisites": [
            "iterators-delegate"
          ]
        },
        {
          "id": "iterators-stream-project-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Для ограничения стандартная библиотека предлагает itertools.islice(source,limit). Он похож на срез по смыслу, но потребляет итератор постепенно. В отличие от list(source)[:limit], не читает весь остаток. В примерах можно применить islice к itertools.count, однако нельзя превращать бесконечный источник в полный список. Все тесты проекта используют конечные данные и проверяют оставшуюся позицию отдельно.",
            "После решения объясни, какие этапы сохраняют состояние и где поток может исчерпаться. Копия готового списка может совпасть по полному выводу, но не подтвердить ленивость, поэтому есть тест со счётчиком потребления. Эта работа завершает вводную последовательность; протокол пользовательских классов и взаимодействие генератора через send остаются отдельными углублёнными темами."
          ],
          "examples": [
            {
              "id": "iterators-stream-project-example-2",
              "title": "Фильтр читает до совпадения",
              "code": "seen=[]\ndef positives(source):\n    for x in source:\n        seen.append(x)\n        if x>0:\n            yield x\ng=positives([-2,0,3,4])\nprint(next(g))\nprint(seen)",
              "output": "3\n[-2, 0, 3]",
              "explanation": "Для первого ответа 3 понадобилось просмотреть три входных значения, но четвёртое ещё не читалось."
            },
            {
              "id": "iterators-stream-project-example-3",
              "title": "Остаток после islice",
              "code": "from itertools import islice\nit=iter([1,2,3,4])\nprint(list(islice(it,2)))\nprint(list(it))",
              "output": "[1, 2]\n[3, 4]",
              "explanation": "Ограниченный потребитель оставил хвост для дальнейшего кода."
            }
          ],
          "goal": "Соединять ленивое преобразование и ограничение чтения.",
          "prerequisites": [
            "iterators-stream-project-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "iterators-stream-project-running",
          "kind": "code",
          "title": "Генератор накопленных сумм",
          "goal": "Генератор накопленных сумм",
          "prerequisites": [
            "iterators-stream-project"
          ],
          "prompt": "Реализуй running(source), лениво выдающую сумму всех прочитанных к данному моменту чисел. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "list(running(source)) → list[int].",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Конечный source до 100 целых от −1000 до 1000. До 100 накопленных сумм по модулю до 100000; источник не читается до первого запроса.",
          "examples": [
            {
              "input": [
                "list(running([]))"
              ],
              "output": "[]",
              "explanation": "Состояние генератора заменяет список всех предыдущих префиксов."
            },
            {
              "input": [
                "list(running([3,-1,4]))"
              ],
              "output": "[3, 2, 6]",
              "explanation": "Состояние генератора заменяет список всех предыдущих префиксов."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "list(running([]))",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(running([]))"
            },
            {
              "expression": "list(running([3,-1,4]))",
              "expectedValue": [
                3,
                2,
                6
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "list(running([3,-1,4]))"
            },
            {
              "expression": "[(g:=running(source)) is not None,list(seen),next(g),list(seen)]",
              "expectedValue": [
                true,
                [],
                2,
                [
                  2
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[(g:=running(source)) is not None,list(seen),next(g),list(seen)]",
              "setup": "seen=[]\nsource=(seen.append(x) or x for x in [2,3])"
            }
          ],
          "reference": "def running(source):\n    total=0\n    for x in source:\n        total+=x\n        yield total",
          "alternative": "from itertools import accumulate\ndef running(source):\n    return accumulate(source)",
          "wrongSolutions": [
            {
              "code": "def running(source):\n    values=list(source)\n    return iter([sum(values[:i+1]) for i in range(len(values))])",
              "why": "Предварительный список нарушает отложенное потребление."
            },
            {
              "code": "def running(source):\n    yield sum(source)",
              "why": "Одна сумма не является последовательностью итогов."
            }
          ],
          "hints": [
            "Храни один накопитель между выдачами.",
            "Добавляй очередное значение перед yield.",
            "Не читай source до первого запроса результата."
          ],
          "solutionExplanation": [
            "Состояние генератора заменяет список всех предыдущих префиксов.",
            "Предварительный список нарушает отложенное потребление.",
            "Одна сумма не является последовательностью итогов."
          ],
          "required": true
        },
        {
          "id": "iterators-stream-project-limit-positives",
          "kind": "code",
          "title": "Первые k положительных",
          "goal": "Первые k положительных",
          "prerequisites": [
            "iterators-stream-project"
          ],
          "prompt": "Реализуй first_positive(source,k), возвращающую список первых не более k строго положительных элементов. При k=0 не читай источник. Не потребляй элементы после k-го ответа. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "first_positive(iterator,k) → list[int].",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Готовый конечный итератор до 100 целых от −1000 до 1000; 0 ≤ k ≤ 100. При k=0 ни одного чтения; после k-го подходящего ответа хвост не потребляется.",
          "examples": [
            {
              "input": [
                "it=iter([1,2])",
                "[first_positive(it,0),next(it,None)]"
              ],
              "output": "[[], 1]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Остаток источника является частью наблюдаемого контракта."
            },
            {
              "input": [
                "it=iter([-1,3,0,4,9])",
                "[first_positive(it,2),next(it,None)]"
              ],
              "output": "[[3, 4], 9]",
              "explanation": "Подготовка создаёт входные функции и наблюдаемые ресурсы; последняя строка выполняет проверяемый вызов. Остаток источника является частью наблюдаемого контракта."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "[first_positive(it,0),next(it,None)]",
              "expectedValue": [
                [],
                1
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[first_positive(it,0),next(it,None)]",
              "setup": "it=iter([1,2])"
            },
            {
              "expression": "[first_positive(it,2),next(it,None)]",
              "expectedValue": [
                [
                  3,
                  4
                ],
                9
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[first_positive(it,2),next(it,None)]",
              "setup": "it=iter([-1,3,0,4,9])"
            },
            {
              "expression": "first_positive(iter([-2,0]),3)",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "first_positive(iter([-2,0]),3)"
            }
          ],
          "reference": "def first_positive(source,k):\n    result=[]\n    if k==0:\n        return result\n    for x in source:\n        if x>0:\n            result.append(x)\n            if len(result)==k:\n                break\n    return result",
          "alternative": "from itertools import islice\ndef first_positive(source,k):\n    return list(islice((x for x in source if x>0),k))",
          "wrongSolutions": [
            {
              "code": "def first_positive(source,k):\n    return [x for x in source if x>0][:k]",
              "why": "Полная фильтрация съедает хвост."
            },
            {
              "code": "def first_positive(source,k):\n    result=[]\n    for x in source:\n        if len(result)==k:\n            break\n        if x>0:\n            result.append(x)\n    return result",
              "why": "Проверка в начале тела уже потребила лишний элемент."
            }
          ],
          "hints": [
            "Проверь k=0 до начала for.",
            "Прекрати цикл сразу после добавления k-го ответа.",
            "Условие останова касается выходных элементов, не входных чтений."
          ],
          "solutionExplanation": [
            "Остаток источника является частью наблюдаемого контракта.",
            "Полная фильтрация съедает хвост.",
            "Проверка в начале тела уже потребила лишний элемент."
          ],
          "required": true
        },
        {
          "id": "iterators-stream-project-pipeline",
          "kind": "code",
          "title": "Ограниченный отчёт квадратов",
          "goal": "Ограниченный отчёт квадратов",
          "prerequisites": [
            "iterators-stream-project"
          ],
          "prompt": "Реализуй report(source,k): лениво выбирай положительные числа, возводи их в квадрат и возвращай {\"values\": первые k квадратов, \"total\": их сумма}. При k=0 не потребляй вход. Функции не печатают; результаты возвращаются вызывающему коду.",
          "inputFormat": "report(iterator,k) → dict; k ≥ 0.",
          "outputFormat": "Возвращаемое значение по контракту; stdout пуст.",
          "constraints": "Готовый конечный итератор до 100 целых от −1000 до 1000; 0 ≤ k ≤ 100. До 100 квадратов не больше 1000000, сумма до 100000000; при нулевом лимите чтений нет.",
          "examples": [
            {
              "input": [
                "report(iter([]),3)"
              ],
              "output": "{'values': [], 'total': 0}",
              "explanation": "Проект объединяет отбор, преобразование и контроль потребления."
            },
            {
              "input": [
                "report(iter([-1,2,3,4]),2)"
              ],
              "output": "{'values': [4, 9], 'total': 13}",
              "explanation": "Проект объединяет отбор, преобразование и контроль потребления."
            }
          ],
          "initialCode": "# Напиши функции по контракту.\n",
          "tests": [
            {
              "expression": "report(iter([]),3)",
              "expectedValue": {
                "values": [],
                "total": 0
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "report(iter([]),3)"
            },
            {
              "expression": "report(iter([-1,2,3,4]),2)",
              "expectedValue": {
                "values": [
                  4,
                  9
                ],
                "total": 13
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "report(iter([-1,2,3,4]),2)"
            },
            {
              "expression": "[report(it,0),next(it,None)]",
              "expectedValue": [
                {
                  "values": [],
                  "total": 0
                },
                5
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "[report(it,0),next(it,None)]",
              "setup": "it=iter([5,6])"
            }
          ],
          "reference": "from itertools import islice\ndef report(source,k):\n    values=list(islice((x*x for x in source if x>0),k))\n    return {\"values\":values,\"total\":sum(values)}",
          "alternative": "def report(source,k):\n    values=[]\n    if k>0:\n        for x in source:\n            if x>0:\n                values.append(x*x)\n                if len(values)==k:\n                    break\n    return {\"values\":values,\"total\":sum(values)}",
          "wrongSolutions": [
            {
              "code": "def report(source,k):\n    values=[x*x for x in source if x>0][:k]\n    return {\"values\":values,\"total\":sum(values)}",
              "why": "Предварительная материализация нарушает запрет чтения при k=0."
            },
            {
              "code": "from itertools import islice\ndef report(source,k):\n    values=list(islice((x*2 for x in source if x>0),k))\n    return {\"values\":values,\"total\":sum(values)}",
              "why": "Удваивает вместо возведения в квадрат."
            }
          ],
          "hints": [
            "Ограничение поставь вокруг ленивого преобразования.",
            "Суммируй только полученный ограниченный список.",
            "Первым проверяй k=0 и состояние исходного итератора."
          ],
          "solutionExplanation": [
            "Проект объединяет отбор, преобразование и контроль потребления.",
            "Предварительная материализация нарушает запрет чтения при k=0.",
            "Удваивает вместо возведения в квадрат."
          ],
          "required": true
        },
        {
          "id": "iterators-stream-project-limits",
          "kind": "explain",
          "title": "Что проверяет ленивость?",
          "goal": "Что проверяет ленивость?",
          "prerequisites": [
            "iterators-stream-project"
          ],
          "prompt": "Какие проверки действительно обнаруживают преждевременное чтение?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "from itertools import islice",
                "it=iter([1,2,3,4])",
                "print(list(islice(it,2)))",
                "print(list(it))"
              ],
              "output": "[1, 2]\n[3, 4]",
              "explanation": "Разобранный пример по этой идее: Ограниченный потребитель оставил хвост для дальнейшего кода. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Ленивость — наблюдаемое поведение потребления, синтаксический маркер сам по себе недостаточен."
          ],
          "required": true,
          "answer": [
            "1",
            "2"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Посмотреть счётчик потреблённых входных элементов до первого next."
            },
            {
              "id": "2",
              "text": "Проверить остаток исходного итератора после take."
            },
            {
              "id": "3",
              "text": "Только поиск слова yield в тексте."
            }
          ]
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.12/tutorial/classes.html#iterators",
    "https://docs.python.org/3.12/tutorial/classes.html#generators",
    "https://docs.python.org/3.12/library/itertools.html"
  ]
};
export default content;
