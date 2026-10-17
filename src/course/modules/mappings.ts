import type { CourseModule } from '../types';
const content: CourseModule = {
  "id": "mappings",
  "title": "Словари и множества",
  "track": "base",
  "depth": "Практический модуль",
  "goal": "Группировать данные по ключам, считать частоты и сравнивать наборы.",
  "prerequisites": [
    "sequences"
  ],
  "lessons": [
    {
      "id": "mappings-read",
      "title": "Словарь: ключ и значение",
      "goal": "Выбирать словарь для поиска по смысловому ключу.",
      "prerequisites": [],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "mappings-read-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Список ищет элемент по позиции, а словарь связывает ключ со значением. Запись {\"чай\": 40, \"кофе\": 70} хранит две пары. Ключом может быть строка, значение здесь целое. data[\"чай\"] возвращает 40. Число пар даёт len(data), а оператор key in data проверяет ключи, не значения. Это важно: 40 in data не ищет цену сорок.",
            "Словарь удобно использовать, когда нужен ответ «какая цена у товара» или «какой балл у имени». Если один ключ записать повторно, новое значение заменит прежнее: ключи уникальны. Значения при этом могут повторяться у разных ключей. Не используй имя человека как уникальный ключ в реальной системе без дополнительных правил: однофамильцы и тёзки существуют. В учебном формате уникальность или замена объявляются явно."
          ],
          "examples": [
            {
              "id": "mappings-read-example-1",
              "title": "Ключи и значения",
              "code": "prices = {\"чай\": 40, \"кофе\": 70}\nprint(prices[\"чай\"])\nprint(\"чай\" in prices)\nprint(40 in prices)",
              "output": "40\nTrue\nFalse",
              "explanation": "Проверка in относится к ключам, поэтому цена 40 не находится как ключ."
            }
          ],
          "goal": "Выбирать словарь для поиска по смысловому ключу.",
          "prerequisites": []
        },
        {
          "id": "mappings-read-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Ключ должен быть хешируемым: строки и целые подходят, изменяемый список — нет. Для пары координат можно использовать кортеж чисел, который изучен раньше. Не нужно запоминать внутреннее устройство хеш-таблицы, чтобы понимать этот контракт. Пустой словарь записывается {}, а множество будет создаваться иначе.",
            "Чтение отсутствующего ключа квадратными скобками вызывает KeyError. Если отсутствие допустимо, сначала проверь in или используй get из следующего урока. В Python 3.12 словарь сохраняет порядок добавления ключей, но порядок не превращает ключ в индекс: data[0] обращается к ключу 0, а не к первой паре. Для отсортированного отчёта порядок задаётся отдельно. Проверяй повторный ключ и неизвестный запрос: они раскрывают смысл структуры лучше, чем один успешный поиск."
          ],
          "examples": [
            {
              "id": "mappings-read-example-2",
              "title": "Повторный ключ",
              "code": "scores = {\"Аня\": 5}\nscores[\"Аня\"] = 8\nprint(scores)\nprint(len(scores))",
              "output": "{'Аня': 8}\n1",
              "explanation": "Замена значения не создаёт вторую пару с тем же ключом."
            },
            {
              "id": "mappings-read-example-3",
              "title": "Одинаковые значения не объединяют ключи",
              "code": "data = {\"a\": 0, \"b\": 0}\nprint(len(data))\nprint(data[\"a\"])",
              "output": "2\n0",
              "explanation": "У двух разных ключей одинаковое значение ноль, но словарь содержит две пары. Уникальность относится к ключу, а не к значению. Это позволяет хранить несколько учеников с одинаковой оценкой или несколько товаров с одинаковой ценой без потери записей."
            }
          ],
          "goal": "Проверить применение: выбирать словарь для поиска по смысловому ключу.",
          "prerequisites": [
            "mappings-read-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "mappings-read-lookup",
          "kind": "code",
          "title": "Цена по известному имени",
          "goal": "Цена по известному имени",
          "prerequisites": [
            "mappings-read"
          ],
          "prompt": "Считай n записей key value и известный ключ query. Повторный ключ заменяет старое значение. Выведи последнее значение для query.",
          "inputFormat": "n; n строк из ключа без пробелов и целого; строка query, присутствующая среди ключей.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "1 ≤ n ≤ 100; ключи — слова длиной 1…30; значения от −1000000 до 1000000. query обязательно присутствует; повторный ключ заменяет прежний.",
          "examples": [
            {
              "input": [
                "1",
                "tea 40",
                "tea"
              ],
              "output": "40",
              "explanation": "Строй словарь присваиванием data[key], чтобы повторная запись заменяла старую."
            },
            {
              "input": [
                "3",
                "a 1",
                "b 2",
                "a 9",
                "a"
              ],
              "output": "9",
              "explanation": "Строй словарь присваиванием data[key], чтобы повторная запись заменяла старую."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "1",
                "tea 40",
                "tea"
              ],
              "expectedOutput": "40",
              "description": "Вход: 1 / tea 40 / tea"
            },
            {
              "stdin": [
                "3",
                "a 1",
                "b 2",
                "a 9",
                "a"
              ],
              "expectedOutput": "9",
              "description": "Вход: 3 / a 1 / b 2 / a 9 / a"
            },
            {
              "stdin": [
                "2",
                "a -3",
                "b 0",
                "b"
              ],
              "expectedOutput": "0",
              "description": "Вход: 2 / a -3 / b 0 / b"
            }
          ],
          "reference": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nquery = input()\nprint(data[query])",
          "alternative": "n = int(input())\nrecords = []\nfor i in range(n):\n    records.append(input().split())\nquery = input()\nfor key, value in records[::-1]:\n    if key == query:\n        print(int(value))\n        break",
          "wrongSolutions": [
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nquery = input()\nprint(query)",
              "why": "Нужен ответ-значение, а не сам ключ."
            },
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    if key not in data:\n        data[key] = int(value)\nquery = input()\nprint(data[query])",
              "why": "Сохраняет первое значение вместо последнего."
            }
          ],
          "hints": [
            "Строй словарь присваиванием data[key], чтобы повторная запись заменяла старую.",
            "Проверь этот риск: Нужен ответ-значение, а не сам ключ.",
            "Ещё одна важная граница: Сохраняет первое значение вместо последнего."
          ],
          "solutionExplanation": [
            "Строй словарь присваиванием data[key], чтобы повторная запись заменяла старую.",
            "Нужен ответ-значение, а не сам ключ.",
            "Сохраняет первое значение вместо последнего."
          ],
          "required": true
        },
        {
          "id": "mappings-read-distinct-keys",
          "kind": "code",
          "title": "Количество разных ключей",
          "goal": "Количество разных ключей",
          "prerequisites": [
            "mappings-read"
          ],
          "prompt": "Считай n записей key value. Выведи число различных ключей после всех замен.",
          "inputFormat": "n, затем n строк key и целое.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 100; ключ — непустое слово из латиницы длиной 1…30; значения — целые от −1000000 до 1000000. Выводится длина словаря от 0 до n.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "0",
              "explanation": "Повторный ключ не увеличивает длину словаря."
            },
            {
              "input": [
                "3",
                "a 1",
                "a 2",
                "b 1"
              ],
              "output": "2",
              "explanation": "Повторный ключ не увеличивает длину словаря."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "0",
              "description": "Вход: 0"
            },
            {
              "stdin": [
                "3",
                "a 1",
                "a 2",
                "b 1"
              ],
              "expectedOutput": "2",
              "description": "Вход: 3 / a 1 / a 2 / b 1"
            },
            {
              "stdin": [
                "2",
                "x 4",
                "y 4"
              ],
              "expectedOutput": "2",
              "description": "Вход: 2 / x 4 / y 4"
            }
          ],
          "reference": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nprint(len(data))",
          "alternative": "n = int(input())\nkeys = []\nfor i in range(n):\n    key, value = input().split()\n    if key not in keys:\n        keys.append(key)\nprint(len(keys))",
          "wrongSolutions": [
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nprint(n)",
              "why": "Количество записей не равно количеству различных ключей."
            },
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nprint(len(set(data.values())))",
              "why": "Различные значения не определяют число ключей."
            }
          ],
          "hints": [
            "Повторный ключ не увеличивает длину словаря.",
            "Проверь этот риск: Количество записей не равно количеству различных ключей.",
            "Ещё одна важная граница: Различные значения не определяют число ключей."
          ],
          "solutionExplanation": [
            "Повторный ключ не увеличивает длину словаря.",
            "Количество записей не равно количеству различных ключей.",
            "Различные значения не определяют число ключей."
          ],
          "required": true
        },
        {
          "id": "mappings-read-key-or-value",
          "kind": "code",
          "title": "Ключ или цена",
          "goal": "Ключ или цена",
          "prerequisites": [
            "mappings-read"
          ],
          "prompt": "Считай n записей key value и строку query. Выведи ДА, если query является ключом, иначе НЕТ.",
          "inputFormat": "n; n строк key и целое; query.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 100; ключ — непустое слово из латиницы длиной 1…30; значения — целые от −1000000 до 1000000. query — строка 1…30 символов. Проверяется точное совпадение ключа.",
          "examples": [
            {
              "input": [
                "0",
                "40"
              ],
              "output": "НЕТ",
              "explanation": "Оператор in у словаря проверяет только ключи."
            },
            {
              "input": [
                "1",
                "tea 40",
                "40"
              ],
              "output": "НЕТ",
              "explanation": "Оператор in у словаря проверяет только ключи."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0",
                "40"
              ],
              "expectedOutput": "НЕТ",
              "description": "Вход: 0 / 40"
            },
            {
              "stdin": [
                "1",
                "tea 40",
                "40"
              ],
              "expectedOutput": "НЕТ",
              "description": "Вход: 1 / tea 40 / 40"
            },
            {
              "stdin": [
                "1",
                "tea 40",
                "tea"
              ],
              "expectedOutput": "ДА",
              "description": "Вход: 1 / tea 40 / tea"
            }
          ],
          "reference": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nquery = input()\nprint(\"ДА\" if query in data else \"НЕТ\")",
          "alternative": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nquery = input()\nfound = False\nfor key in data:\n    if key == query:\n        found = True\nprint(\"ДА\" if found else \"НЕТ\")",
          "wrongSolutions": [
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nquery = input()\nprint(\"ДА\" if query in [str(v) for v in data.values()] else \"НЕТ\")",
              "why": "Ищет значения вместо ключей."
            },
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nquery = input()\nprint(\"ДА\" if query in data or query in [str(v) for v in data.values()] else \"НЕТ\")",
              "why": "Смешивает два разных вопроса."
            }
          ],
          "hints": [
            "Оператор in у словаря проверяет только ключи.",
            "Проверь этот риск: Ищет значения вместо ключей.",
            "Ещё одна важная граница: Смешивает два разных вопроса."
          ],
          "solutionExplanation": [
            "Оператор in у словаря проверяет только ключи.",
            "Ищет значения вместо ключей.",
            "Смешивает два разных вопроса."
          ],
          "required": true
        },
        {
          "id": "mappings-read-dict-position",
          "kind": "choice",
          "title": "Что означает d[0]?",
          "goal": "Что означает d[0]?",
          "prerequisites": [
            "mappings-read"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "scores = {\"Аня\": 5}",
                "scores[\"Аня\"] = 8",
                "print(scores)",
                "print(len(scores))"
              ],
              "output": "{'Аня': 8}\n1",
              "explanation": "Разобранный пример по этой идее: Замена значения не создаёт вторую пару с тем же ключом. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Словарь не использует числовой аргумент как порядковый индекс."
          ],
          "required": true,
          "answer": [
            "1",
            "3"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Это обращение к ключу 0."
            },
            {
              "id": "2",
              "text": "Это всегда первая добавленная пара."
            },
            {
              "id": "3",
              "text": "При отсутствии ключа 0 возникает KeyError."
            }
          ]
        }
      ]
    },
    {
      "id": "mappings-update",
      "title": "Добавление, замена и удаление пар",
      "goal": "Изменять запись по ключу и понимать последствия копирования.",
      "prerequisites": [
        "mappings-read"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "mappings-update-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Присваивание data[key] = value добавляет пару, если ключа не было, и заменяет значение, если ключ уже есть. Для накопления по известному ключу можно использовать data[key] += amount. Но сначала ключ должен существовать, иначе правая часть вызовет KeyError. Инициализация нового ключа — отдельная часть алгоритма, которую нельзя пропустить.",
            "del data[key] удаляет пару и требует наличия ключа. pop(key, default) возвращает удалённое значение либо default, если ключ отсутствует. Это полезно для безопасного удаления. Не путай удаление пары со сбросом её значения в ноль: длина и проверка in после этих операций различаются. Отсутствие записи может иметь другой смысл, чем нулевая запись."
          ],
          "examples": [
            {
              "id": "mappings-update-example-1",
              "title": "Добавить и заменить",
              "code": "stock = {\"чай\": 2}\nstock[\"чай\"] += 3\nstock[\"кофе\"] = 1\nprint(stock)",
              "output": "{'чай': 5, 'кофе': 1}",
              "explanation": "Старый ключ получил новое значение, новый — отдельную пару."
            }
          ],
          "goal": "Изменять запись по ключу и понимать последствия копирования.",
          "prerequisites": [
            "mappings-read"
          ]
        },
        {
          "id": "mappings-update-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Словари, как списки, изменяемы и могут иметь общие ссылки. alias = data не создаёт независимый снимок. Для словаря с числовыми значениями data.copy() копирует внешний контейнер достаточно. Если значениями являются списки, вложенные объекты остаются общими — это та же граница поверхностной копии, что изучалась в таблицах.",
            "Нельзя добавлять или удалять ключи в словаре во время обычного перебора самого словаря: Python может сообщить RuntimeError. Для отчёта перебирай и читай, для удаления заранее собери ключи или обходи копию. В заданиях этого урока изменения выполняются между отдельными операциями, поэтому порядок понятен. Проверяй существующий ключ, новый ключ и удаление отсутствующего; каждый случай соответствует отдельной ветке поведения."
          ],
          "examples": [
            {
              "id": "mappings-update-example-2",
              "title": "Удаление с умолчанием",
              "code": "stock = {\"чай\": 2}\nprint(stock.pop(\"кофе\", 0))\nprint(stock.pop(\"чай\", 0))\nprint(stock)",
              "output": "0\n2\n{}",
              "explanation": "Отсутствующий товар даёт 0 без создания записи; существующий удаляется."
            },
            {
              "id": "mappings-update-example-3",
              "title": "Обнуление сохраняет запись",
              "code": "data = {\"a\": 3}\ndata[\"a\"] = 0\nprint(\"a\" in data)\ndel data[\"a\"]\nprint(\"a\" in data)",
              "output": "True\nFalse",
              "explanation": "Сначала ключ существует с новым значением, затем исчезает. В системе остатков это могло бы означать разные состояния: известный товар с нулевым запасом и неизвестный товар. Поэтому проверка наличия и чтение количества должны оставаться отдельными действиями."
            }
          ],
          "goal": "Проверить применение: изменять запись по ключу и понимать последствия копирования.",
          "prerequisites": [
            "mappings-update-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "mappings-update-set",
          "kind": "code",
          "title": "Назначить новое значение",
          "goal": "Назначить новое значение",
          "prerequisites": [
            "mappings-update"
          ],
          "prompt": "Считай n записей, затем key и value на двух строках. Добавь или замени пару. Выведи число ключей и новое значение key через пробел.",
          "inputFormat": "n; n записей key целое; key; целое value.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 100; ключ — непустое слово из латиницы длиной 1…30; значения — целые от −1000000 до 1000000. Новый key длиной 1…30, value от −1000000 до 1000000; ключей после операции до 101.",
          "examples": [
            {
              "input": [
                "0",
                "a",
                "5"
              ],
              "output": "1 5",
              "explanation": "Обычное присваивание по ключу покрывает и добавление, и замену."
            },
            {
              "input": [
                "2",
                "a 1",
                "b 2",
                "a",
                "9"
              ],
              "output": "2 9",
              "explanation": "Обычное присваивание по ключу покрывает и добавление, и замену."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0",
                "a",
                "5"
              ],
              "expectedOutput": "1 5",
              "description": "Вход: 0 / a / 5"
            },
            {
              "stdin": [
                "2",
                "a 1",
                "b 2",
                "a",
                "9"
              ],
              "expectedOutput": "2 9",
              "description": "Вход: 2 / a 1 / b 2 / a / 9"
            },
            {
              "stdin": [
                "1",
                "a 1",
                "c",
                "0"
              ],
              "expectedOutput": "2 0",
              "description": "Вход: 1 / a 1 / c / 0"
            }
          ],
          "reference": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nkey = input()\nvalue = int(input())\ndata[key] = value\nprint(len(data), data[key])",
          "alternative": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nkey = input()\nvalue = int(input())\nnew = {**data, key: value}\nprint(len(new), new[key])",
          "wrongSolutions": [
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nkey = input()\nvalue = int(input())\nif key not in data:\n    data[key] = value\nprint(len(data), data[key])",
              "why": "Не обновляет существующую пару."
            },
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nkey = input()\nvalue = int(input())\ndata[key] = value\nprint(n + 1, data[key])",
              "why": "Замена ключа не всегда увеличивает количество."
            }
          ],
          "hints": [
            "Обычное присваивание по ключу покрывает и добавление, и замену.",
            "Проверь этот риск: Не обновляет существующую пару.",
            "Ещё одна важная граница: Замена ключа не всегда увеличивает количество."
          ],
          "solutionExplanation": [
            "Обычное присваивание по ключу покрывает и добавление, и замену.",
            "Не обновляет существующую пару.",
            "Замена ключа не всегда увеличивает количество."
          ],
          "required": true
        },
        {
          "id": "mappings-update-remove",
          "kind": "code",
          "title": "Удалить безопасно",
          "goal": "Удалить безопасно",
          "prerequisites": [
            "mappings-update"
          ],
          "prompt": "Считай n записей и key. Удали key, если он есть. Выведи число оставшихся ключей.",
          "inputFormat": "n; n записей; key.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 100; ключ — непустое слово из латиницы длиной 1…30; значения — целые от −1000000 до 1000000. Удаляемый key длиной 1…30 может отсутствовать; выводится только длина.",
          "examples": [
            {
              "input": [
                "0",
                "a"
              ],
              "output": "0",
              "explanation": "Проверь наличие либо задай значение по умолчанию для pop."
            },
            {
              "input": [
                "2",
                "a 1",
                "b 2",
                "a"
              ],
              "output": "1",
              "explanation": "Проверь наличие либо задай значение по умолчанию для pop."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0",
                "a"
              ],
              "expectedOutput": "0",
              "description": "Вход: 0 / a"
            },
            {
              "stdin": [
                "2",
                "a 1",
                "b 2",
                "a"
              ],
              "expectedOutput": "1",
              "description": "Вход: 2 / a 1 / b 2 / a"
            },
            {
              "stdin": [
                "1",
                "a 1",
                "z"
              ],
              "expectedOutput": "1",
              "description": "Вход: 1 / a 1 / z"
            }
          ],
          "reference": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nkey = input()\ndata.pop(key, None)\nprint(len(data))",
          "alternative": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nkey = input()\nif key in data:\n    del data[key]\nprint(len(data))",
          "wrongSolutions": [
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nkey = input()\ndel data[key]\nprint(len(data))",
              "why": "Удаление отсутствующего ключа вызывает KeyError."
            },
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nkey = input()\nif key in data:\n    data[key] = 0\nprint(len(data))",
              "why": "Обнуление сохраняет пару и не уменьшает длину."
            }
          ],
          "hints": [
            "Проверь наличие либо задай значение по умолчанию для pop.",
            "Проверь этот риск: Удаление отсутствующего ключа вызывает KeyError.",
            "Ещё одна важная граница: Обнуление сохраняет пару и не уменьшает длину."
          ],
          "solutionExplanation": [
            "Проверь наличие либо задай значение по умолчанию для pop.",
            "Удаление отсутствующего ключа вызывает KeyError.",
            "Обнуление сохраняет пару и не уменьшает длину."
          ],
          "required": true
        },
        {
          "id": "mappings-update-copy",
          "kind": "code",
          "title": "Снимок словаря",
          "goal": "Снимок словаря",
          "prerequisites": [
            "mappings-update"
          ],
          "prompt": "Считай n записей и существующий key. Сделай независимую копию; увеличь значение key в рабочем словаре на 1. Выведи старое и новое значения через пробел.",
          "inputFormat": "n ≥ 1; n записей; существующий key.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "1 ≤ n ≤ 100; ключи длиной 1…30, значения от −1000000 до 1000000; изменяемый key присутствует. После увеличения значение по модулю не больше 1000001.",
          "examples": [
            {
              "input": [
                "1",
                "a 5",
                "a"
              ],
              "output": "5 6",
              "explanation": "Создай copy перед обновлением ключа."
            },
            {
              "input": [
                "2",
                "a 0",
                "b -2",
                "b"
              ],
              "output": "-2 -1",
              "explanation": "Создай copy перед обновлением ключа."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "1",
                "a 5",
                "a"
              ],
              "expectedOutput": "5 6",
              "description": "Вход: 1 / a 5 / a"
            },
            {
              "stdin": [
                "2",
                "a 0",
                "b -2",
                "b"
              ],
              "expectedOutput": "-2 -1",
              "description": "Вход: 2 / a 0 / b -2 / b"
            },
            {
              "stdin": [
                "2",
                "a 1",
                "a 3",
                "a"
              ],
              "expectedOutput": "3 4",
              "description": "Вход: 2 / a 1 / a 3 / a"
            }
          ],
          "reference": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nkey = input()\nsnapshot = data.copy()\ndata[key] += 1\nprint(snapshot[key], data[key])",
          "alternative": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nkey = input()\nold = data[key]\ndata[key] = old + 1\nprint(old, data[key])",
          "wrongSolutions": [
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nkey = input()\nsnapshot = data\ndata[key] += 1\nprint(snapshot[key], data[key])",
              "why": "Общая ссылка не сохраняет старое состояние."
            },
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nkey = input()\ndata[key] += 1\nsnapshot = data.copy()\nprint(snapshot[key], data[key])",
              "why": "Копия создана после изменения."
            }
          ],
          "hints": [
            "Создай copy перед обновлением ключа.",
            "Проверь этот риск: Общая ссылка не сохраняет старое состояние.",
            "Ещё одна важная граница: Копия создана после изменения."
          ],
          "solutionExplanation": [
            "Создай copy перед обновлением ключа.",
            "Общая ссылка не сохраняет старое состояние.",
            "Копия создана после изменения."
          ],
          "required": true
        },
        {
          "id": "mappings-update-zero-delete",
          "kind": "choice",
          "title": "Удаление и ноль",
          "goal": "Удаление и ноль",
          "prerequisites": [
            "mappings-update"
          ],
          "prompt": "Какие утверждения верны?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "stock = {\"чай\": 2}",
                "print(stock.pop(\"кофе\", 0))",
                "print(stock.pop(\"чай\", 0))",
                "print(stock)"
              ],
              "output": "0\n2\n{}",
              "explanation": "Разобранный пример по этой идее: Отсутствующий товар даёт 0 без создания записи; существующий удаляется. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Присваивание значения не равнозначно отсутствию записи; pop с default задаёт отдельное поведение."
          ],
          "required": true,
          "answer": [
            "1",
            "2"
          ],
          "choices": [
            {
              "id": "1",
              "text": "d[k] = 0 сохраняет ключ."
            },
            {
              "id": "2",
              "text": "del d[k] удаляет пару."
            },
            {
              "id": "3",
              "text": "Любое удаление отсутствующего ключа обязательно возвращает 0."
            }
          ]
        }
      ]
    },
    {
      "id": "mappings-get",
      "title": "Отсутствие, get и значения по умолчанию",
      "goal": "Не путать отсутствующий ключ с нулевым или пустым значением.",
      "prerequisites": [
        "mappings-update"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "mappings-get-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Метод data.get(key, default) возвращает значение существующего ключа либо default. Он не создаёт новую пару. Если default не указан, возвращается None. Это удобно для необязательных полей, но значение по умолчанию должно соответствовать смыслу задачи: цена отсутствующего товара не обязана быть нулевой в реальном магазине.",
            "Ноль, пустая строка и False являются существующими значениями. Проверка if data.get(key) смешивает отсутствие с ложным значением. Если требуется определить наличие записи, используй key in data. Если нужно просто получить число с объявленным умолчанием, get(key, 0) корректен. Разные вопросы требуют разных условий."
          ],
          "examples": [
            {
              "id": "mappings-get-example-1",
              "title": "Ноль существует",
              "code": "scores = {\"Аня\": 0}\nprint(\"Аня\" in scores)\nprint(scores.get(\"Аня\", -1))\nprint(scores.get(\"Борис\", -1))",
              "output": "True\n0\n-1",
              "explanation": "Нулевая оценка не равна отсутствию записи."
            }
          ],
          "goal": "Не путать отсутствующий ключ с нулевым или пустым значением.",
          "prerequisites": [
            "mappings-update"
          ]
        },
        {
          "id": "mappings-get-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Для накопления частоты можно писать count[key] = count.get(key, 0) + 1. Новому ключу берётся нулевое число прежних появлений, затем добавляется текущий элемент. Существующий ключ получает увеличенный счётчик. Здесь get сам не меняет словарь: изменение выполняет последующее присваивание. Без него частоты не сохранятся.",
            "Метод setdefault(key, default) устроен иначе: при отсутствии действительно добавляет пару и возвращает её значение. Он полезен позже для группировки списков, но не нужен для каждого чтения. Сначала выбирай ясное правило, затем короткую запись. Проверь неизвестный ключ, ключ с нулём и ключ с отрицательным значением. Это обнаруживает ошибочную проверку истинности там, где требовалось наличие."
          ],
          "examples": [
            {
              "id": "mappings-get-example-2",
              "title": "get не добавляет",
              "code": "data = {}\nprint(data.get(\"x\", 5))\nprint(data)",
              "output": "5\n{}",
              "explanation": "Полученный default не становится новой парой словаря."
            },
            {
              "id": "mappings-get-example-3",
              "title": "setdefault действительно добавляет",
              "code": "data = {}\nprint(data.setdefault(\"a\", 7))\nprint(data.setdefault(\"a\", 9))\nprint(data)",
              "output": "7\n7\n{'a': 7}",
              "explanation": "Первый вызов создал пару со значением 7. Второй вернул уже существующее значение и не заменил его на 9. В отличие от get, setdefault меняет словарь при отсутствии. Это полезно для подготовки группы, но при обычном чтении могло бы создать ненужные записи."
            }
          ],
          "goal": "Проверить применение: не путать отсутствующий ключ с нулевым или пустым значением.",
          "prerequisites": [
            "mappings-get-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "mappings-get-get-default",
          "kind": "code",
          "title": "Значение или умолчание",
          "goal": "Значение или умолчание",
          "prerequisites": [
            "mappings-get"
          ],
          "prompt": "Считай n записей, query и целое default. Выведи значение query либо default при отсутствии.",
          "inputFormat": "n; n записей; query; default.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 100; ключ — непустое слово из латиницы длиной 1…30; значения — целые от −1000000 до 1000000. query длиной 1…30; default от −1000000 до 1000000. Существующий ноль не заменяется.",
          "examples": [
            {
              "input": [
                "0",
                "a",
                "-1"
              ],
              "output": "-1",
              "explanation": "Различай наличие ключа и истинность его значения."
            },
            {
              "input": [
                "1",
                "a 0",
                "a",
                "9"
              ],
              "output": "0",
              "explanation": "Различай наличие ключа и истинность его значения."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0",
                "a",
                "-1"
              ],
              "expectedOutput": "-1",
              "description": "Вход: 0 / a / -1"
            },
            {
              "stdin": [
                "1",
                "a 0",
                "a",
                "9"
              ],
              "expectedOutput": "0",
              "description": "Вход: 1 / a 0 / a / 9"
            },
            {
              "stdin": [
                "1",
                "a 4",
                "b",
                "9"
              ],
              "expectedOutput": "9",
              "description": "Вход: 1 / a 4 / b / 9"
            }
          ],
          "reference": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nquery = input()\ndefault = int(input())\nprint(data.get(query, default))",
          "alternative": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nquery = input()\ndefault = int(input())\nprint(data[query] if query in data else default)",
          "wrongSolutions": [
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nquery = input()\ndefault = int(input())\nprint(data.get(query) or default)",
              "why": "or заменяет существующий ноль на default."
            },
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nquery = input()\ndefault = int(input())\nprint(data[query])",
              "why": "Неизвестный ключ вызывает KeyError."
            }
          ],
          "hints": [
            "Различай наличие ключа и истинность его значения.",
            "Проверь этот риск: or заменяет существующий ноль на default.",
            "Ещё одна важная граница: Неизвестный ключ вызывает KeyError."
          ],
          "solutionExplanation": [
            "Различай наличие ключа и истинность его значения.",
            "or заменяет существующий ноль на default.",
            "Неизвестный ключ вызывает KeyError."
          ],
          "required": true
        },
        {
          "id": "mappings-get-optional-report",
          "kind": "debug",
          "title": "Наличие и значение отдельно",
          "goal": "Наличие и значение отдельно",
          "prerequisites": [
            "mappings-get"
          ],
          "prompt": "Найди и исправь ошибку в показанном коде. Считай n записей и query. Если ключ есть, выведи «есть value», иначе «нет».",
          "inputFormat": "n; n записей; query.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 100; ключ — непустое слово из латиницы длиной 1…30; значения — целые от −1000000 до 1000000. query длиной 1…30; выводится одна строка статуса и значения либо «нет».",
          "examples": [
            {
              "input": [
                "0",
                "a"
              ],
              "output": "нет",
              "explanation": "Для сообщения о наличии используй in, затем читай значение."
            },
            {
              "input": [
                "1",
                "a 0",
                "a"
              ],
              "output": "есть 0",
              "explanation": "Для сообщения о наличии используй in, затем читай значение."
            }
          ],
          "initialCode": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nquery = input()\nif data.get(query):\n    print(\"есть\", data[query])\nelse:\n    print(\"нет\")",
          "tests": [
            {
              "stdin": [
                "0",
                "a"
              ],
              "expectedOutput": "нет",
              "description": "Вход: 0 / a"
            },
            {
              "stdin": [
                "1",
                "a 0",
                "a"
              ],
              "expectedOutput": "есть 0",
              "description": "Вход: 1 / a 0 / a"
            },
            {
              "stdin": [
                "1",
                "a -2",
                "a"
              ],
              "expectedOutput": "есть -2",
              "description": "Вход: 1 / a -2 / a"
            }
          ],
          "reference": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nquery = input()\nif query in data:\n    print(\"есть\", data[query])\nelse:\n    print(\"нет\")",
          "alternative": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nquery = input()\nfound = False\nfor key, value in data.items():\n    if key == query:\n        print(\"есть\", value)\n        found = True\nif not found:\n    print(\"нет\")",
          "wrongSolutions": [
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nquery = input()\nif data.get(query):\n    print(\"есть\", data[query])\nelse:\n    print(\"нет\")",
              "why": "Нулевое значение считается отсутствующим."
            },
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nquery = input()\nprint(\"есть\", data.get(query, 0))",
              "why": "Выдумывает существующую запись при неизвестном ключе."
            }
          ],
          "hints": [
            "Для сообщения о наличии используй in, затем читай значение.",
            "Проверь этот риск: Нулевое значение считается отсутствующим.",
            "Ещё одна важная граница: Выдумывает существующую запись при неизвестном ключе."
          ],
          "solutionExplanation": [
            "Для сообщения о наличии используй in, затем читай значение.",
            "Нулевое значение считается отсутствующим.",
            "Выдумывает существующую запись при неизвестном ключе."
          ],
          "required": true
        },
        {
          "id": "mappings-get-increment",
          "kind": "code",
          "title": "Увеличить счётчик известного или нового ключа",
          "goal": "Увеличить счётчик известного или нового ключа",
          "prerequisites": [
            "mappings-get"
          ],
          "prompt": "Считай n записей и key. Увеличь его текущее значение на 1; для нового ключа исходное значение 0. Выведи новое значение и число ключей через пробел.",
          "inputFormat": "n; n записей; key.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 100; ключ — непустое слово из латиницы длиной 1…30; значения — целые от −1000000 до 1000000. key длиной 1…30; после операции число ключей до 101, значение по модулю до 1000001.",
          "examples": [
            {
              "input": [
                "0",
                "a"
              ],
              "output": "1 1",
              "explanation": "Прочитай старое значение с нулевым умолчанием и сохрани увеличенное."
            },
            {
              "input": [
                "1",
                "a 0",
                "a"
              ],
              "output": "1 1",
              "explanation": "Прочитай старое значение с нулевым умолчанием и сохрани увеличенное."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0",
                "a"
              ],
              "expectedOutput": "1 1",
              "description": "Вход: 0 / a"
            },
            {
              "stdin": [
                "1",
                "a 0",
                "a"
              ],
              "expectedOutput": "1 1",
              "description": "Вход: 1 / a 0 / a"
            },
            {
              "stdin": [
                "1",
                "a 5",
                "b"
              ],
              "expectedOutput": "1 2",
              "description": "Вход: 1 / a 5 / b"
            }
          ],
          "reference": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nkey = input()\ndata[key] = data.get(key, 0) + 1\nprint(data[key], len(data))",
          "alternative": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nkey = input()\nif key not in data:\n    data[key] = 0\ndata[key] += 1\nprint(data[key], len(data))",
          "wrongSolutions": [
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nkey = input()\ndata[key] += 1\nprint(data[key], len(data))",
              "why": "Новый ключ не инициализирован."
            },
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nkey = input()\ndata.get(key, 0) + 1\nprint(data.get(key, 0), len(data))",
              "why": "Вычисленный результат не присвоен обратно."
            }
          ],
          "hints": [
            "Прочитай старое значение с нулевым умолчанием и сохрани увеличенное.",
            "Проверь этот риск: Новый ключ не инициализирован.",
            "Ещё одна важная граница: Вычисленный результат не присвоен обратно."
          ],
          "solutionExplanation": [
            "Прочитай старое значение с нулевым умолчанием и сохрани увеличенное.",
            "Новый ключ не инициализирован.",
            "Вычисленный результат не присвоен обратно."
          ],
          "required": true
        },
        {
          "id": "mappings-get-get-mutates",
          "kind": "predict",
          "title": "Меняется ли словарь?",
          "goal": "Меняется ли словарь?",
          "prerequisites": [
            "mappings-get"
          ],
          "prompt": "Что выведет код?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Точный вывод программы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "data = {}",
                "print(data.get(\"x\", 5))",
                "print(data)"
              ],
              "output": "5\n{}",
              "explanation": "Разобранный пример по этой идее: Полученный default не становится новой парой словаря. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "get вернул значение по умолчанию, но не создал ключ."
          ],
          "required": true,
          "answer": "7\n0",
          "initialCode": "d = {}\nprint(d.get(\"x\", 7))\nprint(len(d))"
        }
      ]
    },
    {
      "id": "mappings-frequency",
      "title": "Частотные словари",
      "goal": "Подсчитывать появления и выбирать ответ при равенстве.",
      "prerequisites": [
        "mappings-get"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "mappings-frequency-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Частотный словарь связывает элемент с количеством его появлений. Для каждого слова берём прежний счётчик с умолчанием ноль и увеличиваем на один. Исходный порядок слов не требуется хранить целиком, если итогом являются только частоты. Повторный ключ здесь должен увеличивать значение, а не просто заменять его единицей.",
            "Нормализация меняет понятие одинакового элемента. Если регистр значим, \"Python\" и \"python\" — разные ключи. Если условие просит игнорировать регистр, преобразуй слово до использования как ключа. Удаление пунктуации — ещё одно отдельное правило, его нельзя молча добавлять. Тесты должны отражать именно заявленное равенство."
          ],
          "examples": [
            {
              "id": "mappings-frequency-example-1",
              "title": "Частоты слов",
              "code": "counts = {}\nfor word in \"чай кофе чай\".split():\n    counts[word] = counts.get(word, 0) + 1\nfor word in sorted(counts):\n    print(word, counts[word])",
              "output": "кофе 1\nчай 2",
              "explanation": "Каждое появление вносит единицу; сортируется только отчёт."
            }
          ],
          "goal": "Подсчитывать появления и выбирать ответ при равенстве.",
          "prerequisites": [
            "mappings-get"
          ]
        },
        {
          "id": "mappings-frequency-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Для отчёта по алфавиту перебирай sorted(counts): сортируются ключи, затем по каждому читается частота. Сам словарь от этого не меняется. Если нужно наиболее частое слово, определись с равенством: первое по появлению, лексикографически меньшее или все лидеры. Без этого «самое частое» не задаёт единственного ответа. В уроке лидеры при равной частоте выбираются по алфавиту.",
            "Счётчик элементов и сумма связанных чисел — разные задачи. В журнале продаж одному товару могут соответствовать количества 2 и 3: число записей равно двум, общее количество равно пяти. Выбирай, что прибавлять, по смыслу. Проверь пустой поток, одно повторяющееся слово и два лидера с одинаковой частотой. Эти случаи обнаруживают неверное начальное состояние и неоговорённый выбор при равенстве."
          ],
          "examples": [
            {
              "id": "mappings-frequency-example-2",
              "title": "Суммировать количество",
              "code": "totals = {}\nfor name, amount in [(\"чай\", 2), (\"чай\", 3)]:\n    totals[name] = totals.get(name, 0) + amount\nprint(totals)",
              "output": "{'чай': 5}",
              "explanation": "Это сумма количеств, а не частота двух записей."
            },
            {
              "id": "mappings-frequency-example-3",
              "title": "Нормализация до ключа",
              "code": "counts = {}\nfor word in \"Py py PY\".split():\n    key = word.lower()\n    counts[key] = counts.get(key, 0) + 1\nprint(counts)",
              "output": "{'py': 3}",
              "explanation": "Условие этого отдельного примера намеренно считает регистр незначимым. Все три слова приводятся к одному ключу до обновления частоты. Если нормализовать только готовый вывод, исходные три счётчика не объединятся автоматически. В основных задачах регистр сохраняется, пока явно не указано обратное."
            }
          ],
          "goal": "Проверить применение: подсчитывать появления и выбирать ответ при равенстве.",
          "prerequisites": [
            "mappings-frequency-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "mappings-frequency-word-count",
          "kind": "code",
          "title": "Частоты точных слов",
          "goal": "Частоты точных слов",
          "prerequisites": [
            "mappings-frequency"
          ],
          "prompt": "Считай строку слов. Выведи строки «слово количество» по алфавиту ключей. Регистр значим.",
          "inputFormat": "Одна строка, слова разделены пробельными символами.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "Длина входной строки 0…1000; не больше 100 слов, длина слова 1…80; регистр значим. До 100 строк «слово частота»; весь отчёт меньше 1500 символов, частота 1…100.",
          "examples": [
            {
              "input": [
                "чай кофе чай"
              ],
              "output": "кофе 1\nчай 2",
              "explanation": "Накапливай частоты и сортируй ключи при выводе."
            },
            {
              "input": [
                ""
              ],
              "output": "",
              "explanation": "Накапливай частоты и сортируй ключи при выводе."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "чай кофе чай"
              ],
              "expectedOutput": "кофе 1\nчай 2",
              "description": "Вход: чай кофе чай"
            },
            {
              "stdin": [
                ""
              ],
              "expectedOutput": "",
              "description": "Вход: не нужен"
            },
            {
              "stdin": [
                "a a b"
              ],
              "expectedOutput": "a 2\nb 1",
              "description": "Вход: a a b"
            }
          ],
          "reference": "counts = {}\nfor word in input().split():\n    counts[word] = counts.get(word, 0) + 1\nfor word in sorted(counts):\n    print(word, counts[word])",
          "alternative": "words = input().split()\nkeys = []\nfor word in words:\n    if word not in keys:\n        keys.append(word)\nfor word in sorted(keys):\n    print(word, words.count(word))",
          "wrongSolutions": [
            {
              "code": "counts = {}\nfor word in input().split():\n    counts[word] = 1\nfor word in sorted(counts):\n    print(word, counts[word])",
              "why": "Каждое повторение сбрасывает частоту в единицу."
            },
            {
              "code": "counts = {}\nfor word in input().split():\n    counts[word] = counts.get(word, 0) + 1\nfor word in counts:\n    print(word, counts[word])",
              "why": "Порядок появления не соответствует алфавитному отчёту."
            }
          ],
          "hints": [
            "Накапливай частоты и сортируй ключи при выводе.",
            "Проверь этот риск: Каждое повторение сбрасывает частоту в единицу.",
            "Ещё одна важная граница: Порядок появления не соответствует алфавитному отчёту."
          ],
          "solutionExplanation": [
            "Накапливай частоты и сортируй ключи при выводе.",
            "Каждое повторение сбрасывает частоту в единицу.",
            "Порядок появления не соответствует алфавитному отчёту."
          ],
          "required": true
        },
        {
          "id": "mappings-frequency-leader",
          "kind": "code",
          "title": "Наиболее частое слово",
          "goal": "Наиболее частое слово",
          "prerequisites": [
            "mappings-frequency"
          ],
          "prompt": "Считай строку слов. Выведи наиболее частое слово; при равной частоте выбери лексикографически наименьшее. Для пустого ввода — «нет слов».",
          "inputFormat": "Одна строка слов.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "Длина входной строки 0…1000; не больше 100 слов, длина слова 1…80; регистр значим. Выводится одно слово не длиннее 80 либо «нет слов». При равенстве частот выбирается лексикографический минимум.",
          "examples": [
            {
              "input": [
                "b a b a"
              ],
              "output": "a",
              "explanation": "Перебирай ключи по алфавиту и заменяй ответ только при большей частоте."
            },
            {
              "input": [
                "c c b"
              ],
              "output": "c",
              "explanation": "Перебирай ключи по алфавиту и заменяй ответ только при большей частоте."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "b a b a"
              ],
              "expectedOutput": "a",
              "description": "Вход: b a b a"
            },
            {
              "stdin": [
                "c c b"
              ],
              "expectedOutput": "c",
              "description": "Вход: c c b"
            },
            {
              "stdin": [
                ""
              ],
              "expectedOutput": "нет слов",
              "description": "Вход: не нужен"
            },
            {
              "stdin": [
                "z"
              ],
              "expectedOutput": "z",
              "description": "Вход: z"
            }
          ],
          "reference": "counts = {}\nfor word in input().split():\n    counts[word] = counts.get(word, 0) + 1\nbest = \"\"\nfor word in sorted(counts):\n    if not best or counts[word] > counts[best]:\n        best = word\nprint(best if best else \"нет слов\")",
          "alternative": "words = input().split()\nif not words:\n    print(\"нет слов\")\nelse:\n    best = min(words)\n    for word in sorted(words):\n        if words.count(word) > words.count(best):\n            best = word\n    print(best)",
          "wrongSolutions": [
            {
              "code": "counts = {}\nfor word in input().split():\n    counts[word] = counts.get(word, 0) + 1\nbest = \"\"\nfor word in counts:\n    if not best or counts[word] > counts[best]:\n        best = word\nprint(best if best else \"нет слов\")",
              "why": "При равенстве оставляет первое появившееся, а не меньшее по алфавиту."
            },
            {
              "code": "words = input().split()\nprint(min(words) if words else \"нет слов\")",
              "why": "Выбирает алфавитный минимум без учёта частоты."
            }
          ],
          "hints": [
            "Перебирай ключи по алфавиту и заменяй ответ только при большей частоте.",
            "Проверь этот риск: При равенстве оставляет первое появившееся, а не меньшее по алфавиту.",
            "Ещё одна важная граница: Выбирает алфавитный минимум без учёта частоты."
          ],
          "solutionExplanation": [
            "Перебирай ключи по алфавиту и заменяй ответ только при большей частоте.",
            "При равенстве оставляет первое появившееся, а не меньшее по алфавиту.",
            "Выбирает алфавитный минимум без учёта частоты."
          ],
          "required": true
        },
        {
          "id": "mappings-frequency-once",
          "kind": "code",
          "title": "Сколько слов встретились один раз",
          "goal": "Сколько слов встретились один раз",
          "prerequisites": [
            "mappings-frequency"
          ],
          "prompt": "Считай строку слов. Выведи количество различных слов с частотой ровно 1.",
          "inputFormat": "Одна строка.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "Длина входной строки 0…1000; не больше 100 слов, длина слова 1…80; регистр значим. Ответ — число слов с единичной частотой от 0 до 100.",
          "examples": [
            {
              "input": [
                "a a b c"
              ],
              "output": "2",
              "explanation": "Посчитай значения частотного словаря, равные единице."
            },
            {
              "input": [
                "a a"
              ],
              "output": "0",
              "explanation": "Посчитай значения частотного словаря, равные единице."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "a a b c"
              ],
              "expectedOutput": "2",
              "description": "Вход: a a b c"
            },
            {
              "stdin": [
                "a a"
              ],
              "expectedOutput": "0",
              "description": "Вход: a a"
            },
            {
              "stdin": [
                ""
              ],
              "expectedOutput": "0",
              "description": "Вход: не нужен"
            },
            {
              "stdin": [
                "x y"
              ],
              "expectedOutput": "2",
              "description": "Вход: x y"
            }
          ],
          "reference": "counts = {}\nfor word in input().split():\n    counts[word] = counts.get(word, 0) + 1\nanswer = 0\nfor count in counts.values():\n    if count == 1:\n        answer += 1\nprint(answer)",
          "alternative": "words = input().split()\nanswer = 0\nfor word in words:\n    if words.count(word) == 1:\n        answer += 1\nprint(answer)",
          "wrongSolutions": [
            {
              "code": "counts = {}\nfor word in input().split():\n    counts[word] = counts.get(word, 0) + 1\nprint(len(counts))",
              "why": "Число всех ключей включает повторяющиеся слова."
            },
            {
              "code": "counts = {}\nfor word in input().split():\n    counts[word] = counts.get(word, 0) + 1\nprint(sum(counts.values()))",
              "why": "Сумма частот равна числу всех вхождений."
            }
          ],
          "hints": [
            "Посчитай значения частотного словаря, равные единице.",
            "Проверь этот риск: Число всех ключей включает повторяющиеся слова.",
            "Ещё одна важная граница: Сумма частот равна числу всех вхождений."
          ],
          "solutionExplanation": [
            "Посчитай значения частотного словаря, равные единице.",
            "Число всех ключей включает повторяющиеся слова.",
            "Сумма частот равна числу всех вхождений."
          ],
          "required": true
        },
        {
          "id": "mappings-frequency-frequency-total",
          "kind": "choice",
          "title": "Что хранит сумма частот?",
          "goal": "Что хранит сумма частот?",
          "prerequisites": [
            "mappings-frequency"
          ],
          "prompt": "Для частотного словаря слов выбери верные утверждения.",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "totals = {}",
                "for name, amount in [(\"чай\", 2), (\"чай\", 3)]:",
                "    totals[name] = totals.get(name, 0) + amount",
                "print(totals)"
              ],
              "output": "{'чай': 5}",
              "explanation": "Разобранный пример по этой идее: Это сумма количеств, а не частота двух записей. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Ключи объединяют одинаковые слова, значения сохраняют число появлений."
          ],
          "required": true,
          "answer": [
            "1",
            "2"
          ],
          "choices": [
            {
              "id": "1",
              "text": "len(counts) — число различных слов."
            },
            {
              "id": "2",
              "text": "sum(counts.values()) — число всех слов с повторениями."
            },
            {
              "id": "3",
              "text": "Каждая частота обязательно равна 1."
            }
          ]
        }
      ]
    },
    {
      "id": "mappings-iterate",
      "title": "Перебор пар и отчёты по данным",
      "goal": "Отделять порядок вывода от правил обработки словаря.",
      "prerequisites": [
        "mappings-frequency"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "mappings-iterate-idea",
          "title": "Как это работает",
          "paragraphs": [
            "for key in data перебирает ключи. data.values() предоставляет значения, а data.items() — пары ключ-значение. Запись for key, value in data.items() распаковывает каждую пару в два имени. Это удобнее повторного data[key], когда нужны обе части записи. Здесь не создаётся отдельная пользовательская функция: используется метод словаря и уже изученная распаковка.",
            "Порядок добавления ключей сохраняется. Замена значения существующего ключа не перемещает его в конец. Удаление и повторное добавление создаёт новое место в порядке. Однако отчёт часто требует алфавит, поэтому sorted(data) задаёт порядок ключей явно. Для числовых ключей сортировка числовая, для строк — лексикографическая с учётом Unicode."
          ],
          "examples": [
            {
              "id": "mappings-iterate-example-1",
              "title": "Пары для отчёта",
              "code": "scores = {\"b\": 2, \"a\": 5}\nfor key, value in scores.items():\n    print(key, value)\nprint(*sorted(scores))",
              "output": "b 2\na 5\na b",
              "explanation": "items сохраняет порядок добавления; sorted отдельно упорядочивает ключи."
            }
          ],
          "goal": "Отделять порядок вывода от правил обработки словаря.",
          "prerequisites": [
            "mappings-frequency"
          ]
        },
        {
          "id": "mappings-iterate-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "При фильтрации словаря безопаснее создавать result и добавлять в него подходящие пары. Значения можно обновлять при переборе ключей, если набор ключей не меняется, но добавление и удаление самих ключей нарушает проход. Не рассчитывай, что случайно работающий короткий пример разрешает такое изменение. Явная копия или новый словарь делает намерение понятным.",
            "Сводка может требовать сумму значений, количество подходящих ключей или поиск ключа с максимальным значением. Это три разных ответа. При максимуме проверь правило равенства и пустой набор. Здесь ключ выбирается по алфавиту при одинаковом значении. В реальном отчёте подписывай, что означают числа; в учебных заданиях точный формат задан условием, поэтому лишние подписи не добавляются.",
            "Словарное включение записывается {key_expression: value_expression for item in source}. Оно строит новый словарь, а двоеточие связывает вычисленный ключ со значением. Например, enumerate(names, start=1) даёт пару номера и имени, а {name: number ...} меняет их роли в записи. Если имена повторятся, более поздний ключ заменит прежнее значение; включение не сохраняет несколько пар с одинаковым ключом."
          ],
          "examples": [
            {
              "id": "mappings-iterate-example-2",
              "title": "Новая выборка",
              "code": "scores = {\"a\": 2, \"b\": 7}\nselected = {}\nfor key, value in scores.items():\n    if value >= 5:\n        selected[key] = value\nprint(selected)",
              "output": "{'b': 7}",
              "explanation": "Набор исходных ключей не меняется во время обхода."
            },
            {
              "id": "mappings-iterate-example-3",
              "title": "Замена не меняет место ключа",
              "code": "data = {\"b\": 1, \"a\": 2}\ndata[\"b\"] = 9\nprint(*data)\nprint(*sorted(data))",
              "output": "b a\na b",
              "explanation": "Ключ b был добавлен первым и остаётся первым после замены значения. Отдельная сортировка задаёт другой порядок отчёта, не перестраивая исходный словарь. Не полагайся на случайное совпадение порядка ввода с требуемым алфавитом: тестируй их различие явно."
            },
            {
              "id": "mappings-iterate-example-4",
              "title": "Индекс имён как словарь",
              "code": "names = [\"Алия\", \"Ли\"]\npositions = {name: number for number, name in enumerate(names, start=1)}\nfor name in names:\n    print(name, positions[name])",
              "output": "Алия 1\nЛи 2",
              "explanation": "Включение создаёт две пары имя→номер; enumerate уже разобран в модуле списков."
            }
          ],
          "goal": "Проверить применение: отделять порядок вывода от правил обработки словаря.",
          "prerequisites": [
            "mappings-iterate-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "mappings-iterate-threshold-keys",
          "kind": "code",
          "title": "Имена с нужным баллом",
          "goal": "Имена с нужным баллом",
          "prerequisites": [
            "mappings-iterate"
          ],
          "prompt": "Считай n записей и порог threshold. Выведи ключи со значением не меньше порога по алфавиту через пробел.",
          "inputFormat": "n; n записей; threshold.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 100; ключ — непустое слово из латиницы длиной 1…30; значения — целые от −1000000 до 1000000. threshold от −1000000 до 1000000. Вывод до 100 ключей, меньше 3200 символов.",
          "examples": [
            {
              "input": [
                "0",
                "5"
              ],
              "output": "",
              "explanation": "Фильтруй по значению, выводи отсортированные ключи."
            },
            {
              "input": [
                "3",
                "b 7",
                "a 5",
                "c 2",
                "5"
              ],
              "output": "a b",
              "explanation": "Фильтруй по значению, выводи отсортированные ключи."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0",
                "5"
              ],
              "expectedOutput": "",
              "description": "Вход: 0 / 5"
            },
            {
              "stdin": [
                "3",
                "b 7",
                "a 5",
                "c 2",
                "5"
              ],
              "expectedOutput": "a b",
              "description": "Вход: 3 / b 7 / a 5 / c 2 / 5"
            },
            {
              "stdin": [
                "1",
                "x 0",
                "1"
              ],
              "expectedOutput": "",
              "description": "Вход: 1 / x 0 / 1"
            }
          ],
          "reference": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nthreshold = int(input())\nresult = []\nfor key in sorted(data):\n    if data[key] >= threshold:\n        result.append(key)\nprint(*result)",
          "alternative": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nthreshold = int(input())\nresult = []\nfor key, value in data.items():\n    if value >= threshold:\n        result.append(key)\nprint(*sorted(result))",
          "wrongSolutions": [
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nthreshold = int(input())\nprint(*[key for key in sorted(data) if data[key] > threshold])",
              "why": "Точное равенство порогу должно включаться."
            },
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nthreshold = int(input())\nprint(*[key for key in data if data[key] >= threshold])",
              "why": "Порядок добавления не гарантирует алфавит."
            }
          ],
          "hints": [
            "Фильтруй по значению, выводи отсортированные ключи.",
            "Проверь этот риск: Точное равенство порогу должно включаться.",
            "Ещё одна важная граница: Порядок добавления не гарантирует алфавит."
          ],
          "solutionExplanation": [
            "Фильтруй по значению, выводи отсортированные ключи.",
            "Точное равенство порогу должно включаться.",
            "Порядок добавления не гарантирует алфавит."
          ],
          "required": true
        },
        {
          "id": "mappings-iterate-max-key",
          "kind": "code",
          "title": "Ключ наибольшего значения",
          "goal": "Ключ наибольшего значения",
          "prerequisites": [
            "mappings-iterate"
          ],
          "prompt": "Считай n записей. Выведи ключ с максимальным значением; при равенстве меньший по алфавиту. Для пустого словаря — «нет данных».",
          "inputFormat": "n, затем n записей.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 100; ключ — непустое слово из латиницы длиной 1…30; значения — целые от −1000000 до 1000000. Выводится один ключ не длиннее 30 либо «нет данных». При равенстве значений выбирается лексикографический минимум.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "нет данных",
              "explanation": "Объяви правило равенства и сравнивай значения, не сами ключи."
            },
            {
              "input": [
                "3",
                "b 7",
                "a 7",
                "c 2"
              ],
              "output": "a",
              "explanation": "Объяви правило равенства и сравнивай значения, не сами ключи."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "нет данных",
              "description": "Вход: 0"
            },
            {
              "stdin": [
                "3",
                "b 7",
                "a 7",
                "c 2"
              ],
              "expectedOutput": "a",
              "description": "Вход: 3 / b 7 / a 7 / c 2"
            },
            {
              "stdin": [
                "2",
                "a -4",
                "b -1"
              ],
              "expectedOutput": "b",
              "description": "Вход: 2 / a -4 / b -1"
            }
          ],
          "reference": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nbest = None\nfor key in sorted(data):\n    if best is None or data[key] > data[best]:\n        best = key\nprint(best if best is not None else \"нет данных\")",
          "alternative": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nif not data:\n    print(\"нет данных\")\nelse:\n    maximum = max(data.values())\n    print(min([key for key in data if data[key] == maximum]))",
          "wrongSolutions": [
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nbest = None\nfor key in data:\n    if best is None or data[key] > data[best]:\n        best = key\nprint(best if best is not None else \"нет данных\")",
              "why": "При равенстве сохраняет первый введённый ключ."
            },
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nprint(max(data) if data else \"нет данных\")",
              "why": "Выбирает ключ по алфавиту без учёта значения."
            }
          ],
          "hints": [
            "Объяви правило равенства и сравнивай значения, не сами ключи.",
            "Проверь этот риск: При равенстве сохраняет первый введённый ключ.",
            "Ещё одна важная граница: Выбирает ключ по алфавиту без учёта значения."
          ],
          "solutionExplanation": [
            "Объяви правило равенства и сравнивай значения, не сами ключи.",
            "При равенстве сохраняет первый введённый ключ.",
            "Выбирает ключ по алфавиту без учёта значения."
          ],
          "required": true
        },
        {
          "id": "mappings-iterate-weighted",
          "kind": "code",
          "title": "Сумма значений для заданных ключей",
          "goal": "Сумма значений для заданных ключей",
          "prerequisites": [
            "mappings-iterate"
          ],
          "prompt": "Считай n записей, затем m и m запросов. Выведи сумму значений запрошенных ключей; неизвестный ключ даёт 0, повторный запрос учитывается снова.",
          "inputFormat": "n; n записей; m; m строк-ключей.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 100; ключ — непустое слово из латиницы длиной 1…30; значения — целые от −1000000 до 1000000. 0 ≤ m ≤ 100; запросы длиной 1…30; сумма по модулю до 100000000. Повторы запросов учитываются.",
          "examples": [
            {
              "input": [
                "0",
                "2",
                "a",
                "b"
              ],
              "output": "0",
              "explanation": "Обрабатывай каждый запрос независимо через get с нулевым умолчанием."
            },
            {
              "input": [
                "2",
                "a 3",
                "b 5",
                "3",
                "a",
                "x",
                "a"
              ],
              "output": "6",
              "explanation": "Обрабатывай каждый запрос независимо через get с нулевым умолчанием."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0",
                "2",
                "a",
                "b"
              ],
              "expectedOutput": "0",
              "description": "Вход: 0 / 2 / a / b"
            },
            {
              "stdin": [
                "2",
                "a 3",
                "b 5",
                "3",
                "a",
                "x",
                "a"
              ],
              "expectedOutput": "6",
              "description": "Вход: 2 / a 3 / b 5 / 3 / a / x / a"
            },
            {
              "stdin": [
                "1",
                "x -2",
                "1",
                "x"
              ],
              "expectedOutput": "-2",
              "description": "Вход: 1 / x -2 / 1 / x"
            }
          ],
          "reference": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nm = int(input())\ntotal = 0\nfor i in range(m):\n    total += data.get(input(), 0)\nprint(total)",
          "alternative": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nm = int(input())\nqueries = []\nfor i in range(m):\n    queries.append(input())\nprint(sum([data[key] if key in data else 0 for key in queries]))",
          "wrongSolutions": [
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nm = int(input())\ntotal = 0\nfor i in range(m):\n    total += data[input()]\nprint(total)",
              "why": "Неизвестный запрос вызывает исключение."
            },
            {
              "code": "n = int(input())\ndata = {}\nfor i in range(n):\n    key, value = input().split()\n    data[key] = int(value)\nm = int(input())\nqueries = set()\nfor i in range(m):\n    queries.add(input())\nprint(sum(data.get(key, 0) for key in queries))",
              "why": "Удаляет повторные запросы, хотя каждый должен учитываться."
            }
          ],
          "hints": [
            "Обрабатывай каждый запрос независимо через get с нулевым умолчанием.",
            "Проверь этот риск: Неизвестный запрос вызывает исключение.",
            "Ещё одна важная граница: Удаляет повторные запросы, хотя каждый должен учитываться."
          ],
          "solutionExplanation": [
            "Обрабатывай каждый запрос независимо через get с нулевым умолчанием.",
            "Неизвестный запрос вызывает исключение.",
            "Удаляет повторные запросы, хотя каждый должен учитываться."
          ],
          "required": true
        },
        {
          "id": "mappings-iterate-items",
          "kind": "choice",
          "title": "Правильная распаковка",
          "goal": "Правильная распаковка",
          "prerequisites": [
            "mappings-iterate"
          ],
          "prompt": "Как получить ключ и значение при одном переборе?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "scores = {\"a\": 2, \"b\": 7}",
                "selected = {}",
                "for key, value in scores.items():",
                "    if value >= 5:",
                "        selected[key] = value",
                "print(selected)"
              ],
              "output": "{'b': 7}",
              "explanation": "Разобранный пример по этой идее: Набор исходных ключей не меняется во время обхода. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Обычный перебор даёт только ключи; items предоставляет пары."
          ],
          "required": true,
          "answer": [
            "1"
          ],
          "choices": [
            {
              "id": "1",
              "text": "for key, value in data.items():"
            },
            {
              "id": "2",
              "text": "for key, value in data:"
            },
            {
              "id": "3",
              "text": "for value in data.values(): даёт сразу и ключ, и значение."
            }
          ]
        }
      ]
    },
    {
      "id": "mappings-sets",
      "title": "Множество: уникальность без индексов",
      "goal": "Использовать set для проверки наличия и числа различных элементов.",
      "prerequisites": [
        "mappings-iterate"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "mappings-sets-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Множество хранит уникальные хешируемые элементы. set([3, 1, 3]) содержит только 1 и 3. Его назначение — принадлежность и операции над группами, а не сохранение порядка. У множества нет индексов: values[0] недопустимо. Пустое множество создаётся set(), потому что {} уже обозначает пустой словарь.",
            "add(value) добавляет элемент; повторное добавление не меняет число элементов. discard(value) удаляет элемент, если он есть, и ничего не делает при отсутствии. remove(value) в отсутствие элемента вызывает KeyError. Выбирай поведение по контракту, а не по внешнему сходству названий со списком. add возвращает None, поэтому присваивать его результат переменной множества не нужно."
          ],
          "examples": [
            {
              "id": "mappings-sets-example-1",
              "title": "Уникальность",
              "code": "values = set([3, 1, 3])\nvalues.add(1)\nprint(len(values))\nprint(*sorted(values))",
              "output": "2\n1 3",
              "explanation": "Повторное добавление не создаёт нового элемента; отчёт сортируется явно."
            }
          ],
          "goal": "Использовать set для проверки наличия и числа различных элементов.",
          "prerequisites": [
            "mappings-iterate"
          ]
        },
        {
          "id": "mappings-sets-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Порядок вывода set не является обещанием языка. Чтобы учебный результат был воспроизводимым, используй sorted(values) перед печатью. Если нужен порядок первого появления, множество само по себе недостаточно: храни отдельный список результата и множество уже встреченных элементов. В простых задачах прошлый модуль делал это одним списком; множество ускоряет проверки наличия на типичных данных.",
            "Не применяй множество там, где повторы важны. Сумма уникальных расходов отличается от суммы всех записей. Количество разных слов отличается от количества слов. В тестах должны быть и повторные, и различные элементы, иначе программа, которая просто считает длину исходного списка, может случайно пройти. Элементы множества должны быть хешируемыми: число или строка подходят, список нет."
          ],
          "examples": [
            {
              "id": "mappings-sets-example-2",
              "title": "Безопасное удаление",
              "code": "values = {2, 5}\nvalues.discard(9)\nvalues.discard(2)\nprint(*sorted(values))",
              "output": "5",
              "explanation": "Неизвестный элемент не вызывает ошибку при discard."
            },
            {
              "id": "mappings-sets-example-3",
              "title": "Для порядка нужен второй контейнер",
              "code": "seen = set()\nordered = []\nfor word in \"b a b c\".split():\n    if word not in seen:\n        seen.add(word)\n        ordered.append(word)\nprint(*ordered)",
              "output": "b a c",
              "explanation": "Множество отвечает за быстрое наличие, список за порядок первых появлений. Эти два требования не следует смешивать: sorted(seen) дало бы алфавит, а печать самого set не обещает исходный порядок. Каждый контейнер здесь хранит только ту информацию, для которой выбран."
            }
          ],
          "goal": "Проверить применение: использовать set для проверки наличия и числа различных элементов.",
          "prerequisites": [
            "mappings-sets-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "mappings-sets-distinct-numbers",
          "kind": "code",
          "title": "Количество разных чисел",
          "goal": "Количество разных чисел",
          "prerequisites": [
            "mappings-sets"
          ],
          "prompt": "Считай строку целых через пробел. Выведи число различных числовых значений. Записи 01 и 1 обозначают одно значение.",
          "inputFormat": "Одна строка целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "Одна строка с 0…200 целыми от −1000000 до 1000000, длина до 1700. Числовые записи могут содержать ведущие нули, всего не больше 10 знаков на поле.",
          "examples": [
            {
              "input": [
                "1 1 2"
              ],
              "output": "2",
              "explanation": "Преобразуй поля в числа до добавления в множество."
            },
            {
              "input": [
                ""
              ],
              "output": "0",
              "explanation": "Преобразуй поля в числа до добавления в множество."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "1 1 2"
              ],
              "expectedOutput": "2",
              "description": "Вход: 1 1 2"
            },
            {
              "stdin": [
                ""
              ],
              "expectedOutput": "0",
              "description": "Вход: не нужен"
            },
            {
              "stdin": [
                "01 1 -2"
              ],
              "expectedOutput": "2",
              "description": "Вход: 01 1 -2"
            }
          ],
          "reference": "values = set()\nfor field in input().split():\n    values.add(int(field))\nprint(len(values))",
          "alternative": "values = []\nfor field in input().split():\n    x = int(field)\n    if x not in values:\n        values.append(x)\nprint(len(values))",
          "wrongSolutions": [
            {
              "code": "print(len(set(input().split())))",
              "why": "Сравнивает текстовые записи 01 и 1 как разные."
            },
            {
              "code": "print(len(input().split()))",
              "why": "Считает повторения вместо различных значений."
            }
          ],
          "hints": [
            "Преобразуй поля в числа до добавления в множество.",
            "Проверь этот риск: Сравнивает текстовые записи 01 и 1 как разные.",
            "Ещё одна важная граница: Считает повторения вместо различных значений."
          ],
          "solutionExplanation": [
            "Преобразуй поля в числа до добавления в множество.",
            "Сравнивает текстовые записи 01 и 1 как разные.",
            "Считает повторения вместо различных значений."
          ],
          "required": true
        },
        {
          "id": "mappings-sets-membership",
          "kind": "code",
          "title": "Проверка номера в наборе",
          "goal": "Проверка номера в наборе",
          "prerequisites": [
            "mappings-sets"
          ],
          "prompt": "Считай строку целых и отдельное число query. Выведи ДА, если число присутствует, иначе НЕТ.",
          "inputFormat": "Строка целых, затем query.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "В строке 0…200 целых от −1000000 до 1000000; query в том же диапазоне. Строка до 1700 символов.",
          "examples": [
            {
              "input": [
                "1 2 2",
                "2"
              ],
              "output": "ДА",
              "explanation": "Используй одинаковый числовой тип у элементов и запроса."
            },
            {
              "input": [
                "",
                "0"
              ],
              "output": "НЕТ",
              "explanation": "Используй одинаковый числовой тип у элементов и запроса."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "1 2 2",
                "2"
              ],
              "expectedOutput": "ДА",
              "description": "Вход: 1 2 2 / 2"
            },
            {
              "stdin": [
                "",
                "0"
              ],
              "expectedOutput": "НЕТ",
              "description": "Вход:  / 0"
            },
            {
              "stdin": [
                "01 3",
                "1"
              ],
              "expectedOutput": "ДА",
              "description": "Вход: 01 3 / 1"
            },
            {
              "stdin": [
                "3",
                "4"
              ],
              "expectedOutput": "НЕТ",
              "description": "Вход: 3 / 4"
            }
          ],
          "reference": "values = set([int(field) for field in input().split()])\nquery = int(input())\nprint(\"ДА\" if query in values else \"НЕТ\")",
          "alternative": "values = [int(field) for field in input().split()]\nquery = int(input())\nfound = False\nfor x in values:\n    if x == query:\n        found = True\nprint(\"ДА\" if found else \"НЕТ\")",
          "wrongSolutions": [
            {
              "code": "values = set(input().split())\nquery = input()\nprint(\"ДА\" if query in values else \"НЕТ\")",
              "why": "Сравнивает разные записи одного числа как разные строки."
            },
            {
              "code": "values = [int(field) for field in input().split()]\nquery = int(input())\nprint(\"ДА\" if query == len(values) else \"НЕТ\")",
              "why": "Длина набора не отвечает на вопрос принадлежности."
            }
          ],
          "hints": [
            "Используй одинаковый числовой тип у элементов и запроса.",
            "Проверь этот риск: Сравнивает разные записи одного числа как разные строки.",
            "Ещё одна важная граница: Длина набора не отвечает на вопрос принадлежности."
          ],
          "solutionExplanation": [
            "Используй одинаковый числовой тип у элементов и запроса.",
            "Сравнивает разные записи одного числа как разные строки.",
            "Длина набора не отвечает на вопрос принадлежности."
          ],
          "required": true
        },
        {
          "id": "mappings-sets-remove-set",
          "kind": "code",
          "title": "Удалить число из набора",
          "goal": "Удалить число из набора",
          "prerequisites": [
            "mappings-sets"
          ],
          "prompt": "Считай строку целых и x. Удали x из множества, если есть. Выведи оставшиеся различные числа по возрастанию.",
          "inputFormat": "Строка целых, затем x.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "В строке 0…200 целых от −1000000 до 1000000; x в том же диапазоне. Вывод до 200 различных чисел, меньше 1700 символов.",
          "examples": [
            {
              "input": [
                "3 1 3 2",
                "3"
              ],
              "output": "1 2",
              "explanation": "Создай множество, примени discard и отсортируй вывод."
            },
            {
              "input": [
                "1 2",
                "9"
              ],
              "output": "1 2",
              "explanation": "Создай множество, примени discard и отсортируй вывод."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "3 1 3 2",
                "3"
              ],
              "expectedOutput": "1 2",
              "description": "Вход: 3 1 3 2 / 3"
            },
            {
              "stdin": [
                "1 2",
                "9"
              ],
              "expectedOutput": "1 2",
              "description": "Вход: 1 2 / 9"
            },
            {
              "stdin": [
                "",
                "0"
              ],
              "expectedOutput": "",
              "description": "Вход:  / 0"
            },
            {
              "stdin": [
                "5 5",
                "5"
              ],
              "expectedOutput": "",
              "description": "Вход: 5 5 / 5"
            }
          ],
          "reference": "values = set([int(field) for field in input().split()])\nx = int(input())\nvalues.discard(x)\nprint(*sorted(values))",
          "alternative": "values = set([int(field) for field in input().split()])\nx = int(input())\nprint(*sorted([value for value in values if value != x]))",
          "wrongSolutions": [
            {
              "code": "values = set([int(field) for field in input().split()])\nx = int(input())\nvalues.remove(x)\nprint(*sorted(values))",
              "why": "remove вызывает ошибку для отсутствующего элемента."
            },
            {
              "code": "values = [int(field) for field in input().split()]\nx = int(input())\nif x in values:\n    values.remove(x)\nprint(*sorted(values))",
              "why": "Список удаляет только одну копию и сохраняет остальные повторы."
            }
          ],
          "hints": [
            "Создай множество, примени discard и отсортируй вывод.",
            "Проверь этот риск: remove вызывает ошибку для отсутствующего элемента.",
            "Ещё одна важная граница: Список удаляет только одну копию и сохраняет остальные повторы."
          ],
          "solutionExplanation": [
            "Создай множество, примени discard и отсортируй вывод.",
            "remove вызывает ошибку для отсутствующего элемента.",
            "Список удаляет только одну копию и сохраняет остальные повторы."
          ],
          "required": true
        },
        {
          "id": "mappings-sets-empty-set",
          "kind": "choice",
          "title": "Пустая структура",
          "goal": "Пустая структура",
          "prerequisites": [
            "mappings-sets"
          ],
          "prompt": "Какие утверждения верны?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "values = {2, 5}",
                "values.discard(9)",
                "values.discard(2)",
                "print(*sorted(values))"
              ],
              "output": "5",
              "explanation": "Разобранный пример по этой идее: Неизвестный элемент не вызывает ошибку при discard. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Пустые словарь и множество создаются по-разному; множество не имеет позиций."
          ],
          "required": true,
          "answer": [
            "1",
            "2"
          ],
          "choices": [
            {
              "id": "1",
              "text": "{} создаёт пустой словарь."
            },
            {
              "id": "2",
              "text": "set() создаёт пустое множество."
            },
            {
              "id": "3",
              "text": "У set обязательно есть элемент с индексом 0."
            }
          ]
        }
      ]
    },
    {
      "id": "mappings-set-algebra",
      "title": "Пересечение, объединение и разность",
      "goal": "Выражать отношения между двумя наборами.",
      "prerequisites": [
        "mappings-sets"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "mappings-set-algebra-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Для двух множеств A и B операция A & B оставляет общие элементы, A | B объединяет элементы, A - B оставляет присутствующие в A, но отсутствующие в B. Симметрическая разность A ^ B содержит элементы ровно одного набора. Эти операции создают новый результат и не меняют исходные множества. Разность несимметрична: A - B обычно отличается от B - A.",
            "Такие отношения полезны для сравнения списков участников, выполненных заданий или доступных ресурсов. «Пришли на обе встречи» означает пересечение. «Пришли хотя бы на одну» — объединение. «Были только на первой» — разность в конкретном направлении. Сначала сформулируй словами принадлежность одного элемента, затем выбери знак. Не подбирай операцию по количеству элементов в примере."
          ],
          "examples": [
            {
              "id": "mappings-set-algebra-example-1",
              "title": "Посетители встреч",
              "code": "a = {\"Аня\", \"Борис\"}\nb = {\"Борис\", \"Вера\"}\nprint(*sorted(a & b))\nprint(*sorted(a - b))\nprint(*sorted(a | b))",
              "output": "Борис\nАня\nАня Борис Вера",
              "explanation": "Общий участник Борис, только первая встреча — Аня, объединение включает всех троих."
            }
          ],
          "goal": "Выражать отношения между двумя наборами.",
          "prerequisites": [
            "mappings-sets"
          ]
        },
        {
          "id": "mappings-set-algebra-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "A <= B проверяет, что каждый элемент A содержится в B. Это отношение подмножества, а не числовое сравнение размеров. Два набора могут иметь одинаковую длину и полностью разные элементы. Пустое множество является подмножеством любого множества. A.isdisjoint(B) проверяет отсутствие общих элементов; то же можно увидеть по пустому пересечению.",
            "Порядок итогового отчёта задавай через sorted. Уникальность означает, что повторения входных строк не увеличивают число участников. Если нужно учитывать несколько посещений одного человека, потребуется частотный словарь вместо множества. В упражнениях входными данными являются наборы имён, регистр значим, а пустая строка означает отсутствие участников. Проверь направление разности и случай полного совпадения."
          ],
          "examples": [
            {
              "id": "mappings-set-algebra-example-2",
              "title": "Не размер, а состав",
              "code": "a = {1, 2}\nb = {3, 4}\nprint(len(a) == len(b))\nprint(a <= b)\nprint(a.isdisjoint(b))",
              "output": "True\nFalse\nTrue",
              "explanation": "Одинаковая длина не означает подмножество или совпадение."
            },
            {
              "id": "mappings-set-algebra-example-3",
              "title": "Ровно одна встреча",
              "code": "a = {1, 2}\nb = {2, 3}\nprint(*sorted(a ^ b))\nprint((a - b) | (b - a) == a ^ b)",
              "output": "1 3\nTrue",
              "explanation": "Симметрическая разность оставляет 1 и 3, исключая общий элемент 2. Две направленные разности с объединением дают тот же результат. Такая проверка связывает символ операции с понятным условием принадлежности: элемент есть ровно в одном исходном наборе."
            }
          ],
          "goal": "Проверить применение: выражать отношения между двумя наборами.",
          "prerequisites": [
            "mappings-set-algebra-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "mappings-set-algebra-common",
          "kind": "code",
          "title": "Общие участники",
          "goal": "Общие участники",
          "prerequisites": [
            "mappings-set-algebra"
          ],
          "prompt": "Считай две строки имён. Выведи имена, присутствующие в обеих, по алфавиту через пробел.",
          "inputFormat": "Две строки имён с пробельными разделителями.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "Каждая строка до 1000 символов и до 100 имён длиной 1…30. Ответ содержит до 100 имён, суммарно не длиннее исходной меньшей строки.",
          "examples": [
            {
              "input": [
                "b a b",
                "b c"
              ],
              "output": "b",
              "explanation": "Для «в обеих» требуется пересечение."
            },
            {
              "input": [
                "",
                "a"
              ],
              "output": "",
              "explanation": "Для «в обеих» требуется пересечение."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "b a b",
                "b c"
              ],
              "expectedOutput": "b",
              "description": "Вход: b a b / b c"
            },
            {
              "stdin": [
                "",
                "a"
              ],
              "expectedOutput": "",
              "description": "Вход:  / a"
            },
            {
              "stdin": [
                "a b",
                "b a"
              ],
              "expectedOutput": "a b",
              "description": "Вход: a b / b a"
            }
          ],
          "reference": "a = set(input().split())\nb = set(input().split())\nprint(*sorted(a & b))",
          "alternative": "a = set(input().split())\nb = set(input().split())\nprint(*sorted([name for name in a if name in b]))",
          "wrongSolutions": [
            {
              "code": "a = set(input().split())\nb = set(input().split())\nprint(*sorted(a | b))",
              "why": "Объединение включает участников только одной встречи."
            },
            {
              "code": "a = set(input().split())\nb = set(input().split())\nprint(*sorted(a - b))",
              "why": "Разность исключает общих участников."
            }
          ],
          "hints": [
            "Для «в обеих» требуется пересечение.",
            "Проверь этот риск: Объединение включает участников только одной встречи.",
            "Ещё одна важная граница: Разность исключает общих участников."
          ],
          "solutionExplanation": [
            "Для «в обеих» требуется пересечение.",
            "Объединение включает участников только одной встречи.",
            "Разность исключает общих участников."
          ],
          "required": true
        },
        {
          "id": "mappings-set-algebra-only-first",
          "kind": "modify",
          "title": "Только первая встреча",
          "goal": "Только первая встреча",
          "prerequisites": [
            "mappings-set-algebra"
          ],
          "prompt": "Измени показанный код. Считай две строки имён. Выведи имена из первой, отсутствующие во второй, по алфавиту.",
          "inputFormat": "Две строки имён.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "Каждая строка до 1000 символов и до 100 имён длиной 1…30. Ответ — подмножество первого набора, вывод меньше 1100 символов.",
          "examples": [
            {
              "input": [
                "a b",
                "b c"
              ],
              "output": "a",
              "explanation": "Элемент должен принадлежать a и не принадлежать b."
            },
            {
              "input": [
                "",
                "a"
              ],
              "output": "",
              "explanation": "Элемент должен принадлежать a и не принадлежать b."
            }
          ],
          "initialCode": "a = set(input().split())\nb = set(input().split())\nprint(*sorted(a | b))",
          "tests": [
            {
              "stdin": [
                "a b",
                "b c"
              ],
              "expectedOutput": "a",
              "description": "Вход: a b / b c"
            },
            {
              "stdin": [
                "",
                "a"
              ],
              "expectedOutput": "",
              "description": "Вход:  / a"
            },
            {
              "stdin": [
                "a",
                "a"
              ],
              "expectedOutput": "",
              "description": "Вход: a / a"
            },
            {
              "stdin": [
                "z a",
                ""
              ],
              "expectedOutput": "a z",
              "description": "Вход: z a / "
            }
          ],
          "reference": "a = set(input().split())\nb = set(input().split())\nprint(*sorted(a - b))",
          "alternative": "a = set(input().split())\nb = set(input().split())\nresult = []\nfor name in a:\n    if name not in b:\n        result.append(name)\nprint(*sorted(result))",
          "wrongSolutions": [
            {
              "code": "a = set(input().split())\nb = set(input().split())\nprint(*sorted(b - a))",
              "why": "Направление разности поменялось."
            },
            {
              "code": "a = set(input().split())\nb = set(input().split())\nprint(*sorted(a ^ b))",
              "why": "Симметрическая разность добавляет участников только второй встречи."
            }
          ],
          "hints": [
            "Элемент должен принадлежать a и не принадлежать b.",
            "Проверь этот риск: Направление разности поменялось.",
            "Ещё одна важная граница: Симметрическая разность добавляет участников только второй встречи."
          ],
          "solutionExplanation": [
            "Элемент должен принадлежать a и не принадлежать b.",
            "Направление разности поменялось.",
            "Симметрическая разность добавляет участников только второй встречи."
          ],
          "required": true
        },
        {
          "id": "mappings-set-algebra-subset",
          "kind": "code",
          "title": "Все обязательные темы выполнены?",
          "goal": "Все обязательные темы выполнены?",
          "prerequisites": [
            "mappings-set-algebra"
          ],
          "prompt": "Первая строка — обязательные темы, вторая — выполненные. Выведи ДА, если выполнены все обязательные, иначе НЕТ. Дополнительные разрешены.",
          "inputFormat": "Две строки названий без пробелов внутри названия.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "Каждая строка до 1000 символов, до 100 названий длиной 1…30. Пустой обязательный набор разрешён; результат только ДА или НЕТ.",
          "examples": [
            {
              "input": [
                "a b",
                "b a c"
              ],
              "output": "ДА",
              "explanation": "Проверь, что нет обязательного элемента вне выполненного набора."
            },
            {
              "input": [
                "a b",
                "a c"
              ],
              "output": "НЕТ",
              "explanation": "Проверь, что нет обязательного элемента вне выполненного набора."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "a b",
                "b a c"
              ],
              "expectedOutput": "ДА",
              "description": "Вход: a b / b a c"
            },
            {
              "stdin": [
                "a b",
                "a c"
              ],
              "expectedOutput": "НЕТ",
              "description": "Вход: a b / a c"
            },
            {
              "stdin": [
                "",
                "x"
              ],
              "expectedOutput": "ДА",
              "description": "Вход:  / x"
            },
            {
              "stdin": [
                "a",
                ""
              ],
              "expectedOutput": "НЕТ",
              "description": "Вход: a / "
            }
          ],
          "reference": "a = set(input().split())\nb = set(input().split())\nprint(\"ДА\" if a <= b else \"НЕТ\")",
          "alternative": "a = set(input().split())\nb = set(input().split())\nmissing = a - b\nprint(\"ДА\" if not missing else \"НЕТ\")",
          "wrongSolutions": [
            {
              "code": "a = set(input().split())\nb = set(input().split())\nprint(\"ДА\" if len(a) <= len(b) else \"НЕТ\")",
              "why": "Количество не проверяет состав."
            },
            {
              "code": "a = set(input().split())\nb = set(input().split())\nprint(\"ДА\" if a == b else \"НЕТ\")",
              "why": "Равенство ошибочно запрещает дополнительные темы."
            }
          ],
          "hints": [
            "Проверь, что нет обязательного элемента вне выполненного набора.",
            "Проверь этот риск: Количество не проверяет состав.",
            "Ещё одна важная граница: Равенство ошибочно запрещает дополнительные темы."
          ],
          "solutionExplanation": [
            "Проверь, что нет обязательного элемента вне выполненного набора.",
            "Количество не проверяет состав.",
            "Равенство ошибочно запрещает дополнительные темы."
          ],
          "required": true
        },
        {
          "id": "mappings-set-algebra-symmetric",
          "kind": "choice",
          "title": "Ровно в одном наборе",
          "goal": "Ровно в одном наборе",
          "prerequisites": [
            "mappings-set-algebra"
          ],
          "prompt": "Какую операцию выбрать для элементов ровно одного из A и B?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "a = {1, 2}",
                "b = {3, 4}",
                "print(len(a) == len(b))",
                "print(a <= b)",
                "print(a.isdisjoint(b))"
              ],
              "output": "True\nFalse\nTrue",
              "explanation": "Разобранный пример по этой идее: Одинаковая длина не означает подмножество или совпадение. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Симметрическая разность исключает общую часть, объединение само по себе её сохраняет."
          ],
          "required": true,
          "answer": [
            "1",
            "3"
          ],
          "choices": [
            {
              "id": "1",
              "text": "A ^ B"
            },
            {
              "id": "2",
              "text": "A | B"
            },
            {
              "id": "3",
              "text": "(A - B) | (B - A)"
            }
          ]
        }
      ]
    },
    {
      "id": "mappings-group",
      "title": "Группировка и комбинированные данные",
      "goal": "Связывать ключ со списком элементов и не создавать общие группы.",
      "prerequisites": [
        "mappings-set-algebra"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "mappings-group-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Значением словаря может быть список. Тогда groups[category] хранит все элементы одной категории. При первой встрече категории создай для неё новый пустой список, затем добавь элемент. Для следующей записи той же категории используй уже существующий список. Это группировка: ключ выбирает группу, список сохраняет порядок её участников.",
            "Запись groups.setdefault(category, []).append(item) объединяет проверку, создание и добавление. Сначала разверни её обычным if, чтобы понимать поведение. Нельзя использовать один общий список для всех категорий: тогда изменение одной группы будет видно в остальных. Опасна и dict.fromkeys(keys, []): одно значение-список разделяется всеми ключами. Для независимости каждая группа должна получить собственный объект."
          ],
          "examples": [
            {
              "id": "mappings-group-example-1",
              "title": "Независимые группы",
              "code": "groups = {}\nfor category, item in [(\"еда\", \"чай\"), (\"книги\", \"Python\"), (\"еда\", \"хлеб\")]:\n    if category not in groups:\n        groups[category] = []\n    groups[category].append(item)\nfor category in sorted(groups):\n    print(category, *groups[category])",
              "output": "еда чай хлеб\nкниги Python",
              "explanation": "Категория еды сохраняет две записи; книги хранят собственный список."
            }
          ],
          "goal": "Связывать ключ со списком элементов и не создавать общие группы.",
          "prerequisites": [
            "mappings-set-algebra"
          ]
        },
        {
          "id": "mappings-group-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "В отличие от частотного словаря группировка сохраняет сами элементы. После этого можно посчитать длины групп, выбрать самую большую или построить отчёт. Если нужен только счётчик, списки избыточны. Выбор структуры зависит от того, понадобится ли содержимое позже. Повторы внутри группы сохраняются, если контракт не требует уникальности.",
            "Для воспроизводимого отчёта отсортируй ключи, а внутри группы оставь исходный порядок либо отсортируй отдельно по условию. Это два независимых решения о порядке. Пустой набор даёт пустой словарь и пустой отчёт. При проверке используй минимум две категории с чередующимися записями: один ключ не обнаруживает общие списки и ошибку повторной инициализации."
          ],
          "examples": [
            {
              "id": "mappings-group-example-2",
              "title": "Опасный общий список",
              "code": "groups = dict.fromkeys([\"a\", \"b\"], [])\ngroups[\"a\"].append(7)\nprint(groups)",
              "output": "{'a': [7], 'b': [7]}",
              "explanation": "Оба ключа получили один и тот же изменяемый список."
            },
            {
              "id": "mappings-group-example-3",
              "title": "Счётчик вместо хранения группы",
              "code": "counts = {}\nfor category in [\"a\", \"b\", \"a\"]:\n    counts[category] = counts.get(category, 0) + 1\nprint(counts)",
              "output": "{'a': 2, 'b': 1}",
              "explanation": "Если нужны только размеры, хранить списки участников необязательно. Но по этому словарю уже нельзя восстановить сами имена или порядок записей. Выбор более компактной структуры сознательно отбрасывает информацию: сначала проверь, что она не понадобится итоговому отчёту."
            }
          ],
          "goal": "Проверить применение: связывать ключ со списком элементов и не создавать общие группы.",
          "prerequisites": [
            "mappings-group-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "mappings-group-groups",
          "kind": "debug",
          "title": "Сгруппировать имена",
          "goal": "Сгруппировать имена",
          "prerequisites": [
            "mappings-group"
          ],
          "prompt": "Найди и исправь ошибку в показанном коде. Считай n строк category name. Выведи категории по алфавиту: category: и имена в исходном порядке через пробел. Повторы имён сохраняются.",
          "inputFormat": "n, затем n строк из двух слов.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 100; category и name — слова длиной 1…30. Отчёт содержит каждую из n записей и ключ каждой непустой группы, весь вывод меньше 6500 символов.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Создавай новый список только при первом появлении категории."
            },
            {
              "input": [
                "3",
                "b Bob",
                "a Ann",
                "b Ben"
              ],
              "output": "a: Ann\nb: Bob Ben",
              "explanation": "Создавай новый список только при первом появлении категории."
            }
          ],
          "initialCode": "n = int(input())\ngroups = {}\nfor i in range(n):\n    category, name = input().split()\n    groups[category] = [name]\nfor category in sorted(groups):\n    print(category + \":\", *groups[category])",
          "tests": [
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "",
              "description": "Вход: 0"
            },
            {
              "stdin": [
                "3",
                "b Bob",
                "a Ann",
                "b Ben"
              ],
              "expectedOutput": "a: Ann\nb: Bob Ben",
              "description": "Вход: 3 / b Bob / a Ann / b Ben"
            },
            {
              "stdin": [
                "2",
                "a X",
                "a X"
              ],
              "expectedOutput": "a: X X",
              "description": "Вход: 2 / a X / a X"
            }
          ],
          "reference": "n = int(input())\ngroups = {}\nfor i in range(n):\n    category, name = input().split()\n    if category not in groups:\n        groups[category] = []\n    groups[category].append(name)\nfor category in sorted(groups):\n    print(category + \":\", *groups[category])",
          "alternative": "n = int(input())\ngroups = {}\nfor i in range(n):\n    category, name = input().split()\n    groups.setdefault(category, []).append(name)\nfor category in sorted(groups):\n    print(category + \": \" + \" \".join(groups[category]))",
          "wrongSolutions": [
            {
              "code": "n = int(input())\ngroups = {}\nfor i in range(n):\n    category, name = input().split()\n    groups[category] = [name]\nfor category in sorted(groups):\n    print(category + \":\", *groups[category])",
              "why": "Сбрасывает группу при каждой новой записи."
            },
            {
              "code": "n = int(input())\ngroups = {}\nshared = []\nfor i in range(n):\n    category, name = input().split()\n    if category not in groups:\n        groups[category] = shared\n    groups[category].append(name)\nfor category in sorted(groups):\n    print(category + \":\", *groups[category])",
              "why": "Разные ключи разделяют один список."
            }
          ],
          "hints": [
            "Создавай новый список только при первом появлении категории.",
            "Проверь этот риск: Сбрасывает группу при каждой новой записи.",
            "Ещё одна важная граница: Разные ключи разделяют один список."
          ],
          "solutionExplanation": [
            "Создавай новый список только при первом появлении категории.",
            "Сбрасывает группу при каждой новой записи.",
            "Разные ключи разделяют один список."
          ],
          "required": true
        },
        {
          "id": "mappings-group-group-counts",
          "kind": "code",
          "title": "Число участников по категориям",
          "goal": "Число участников по категориям",
          "prerequisites": [
            "mappings-group"
          ],
          "prompt": "Считай n строк category name. Повтор одинакового имени в категории не увеличивает число участников. Выведи «category count» по алфавиту категорий.",
          "inputFormat": "n, затем n строк из двух слов.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 100; category и name длиной 1…30. Уникальность имени определяется внутри категории; до 100 строк отчёта, меньше 3600 символов.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Храни отдельное множество имён внутри каждой категории."
            },
            {
              "input": [
                "4",
                "a X",
                "b X",
                "a X",
                "a Y"
              ],
              "output": "a 2\nb 1",
              "explanation": "Храни отдельное множество имён внутри каждой категории."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "",
              "description": "Вход: 0"
            },
            {
              "stdin": [
                "4",
                "a X",
                "b X",
                "a X",
                "a Y"
              ],
              "expectedOutput": "a 2\nb 1",
              "description": "Вход: 4 / a X / b X / a X / a Y"
            },
            {
              "stdin": [
                "1",
                "z Q"
              ],
              "expectedOutput": "z 1",
              "description": "Вход: 1 / z Q"
            }
          ],
          "reference": "n = int(input())\ngroups = {}\nfor i in range(n):\n    category, name = input().split()\n    if category not in groups:\n        groups[category] = set()\n    groups[category].add(name)\nfor category in sorted(groups):\n    print(category, len(groups[category]))",
          "alternative": "n = int(input())\ngroups = {}\nfor i in range(n):\n    category, name = input().split()\n    groups.setdefault(category, [])\n    if name not in groups[category]:\n        groups[category].append(name)\nfor category in sorted(groups):\n    print(category, len(groups[category]))",
          "wrongSolutions": [
            {
              "code": "n = int(input())\ngroups = {}\nfor i in range(n):\n    category, name = input().split()\n    groups[category] = groups.get(category, 0) + 1\nfor category in sorted(groups):\n    print(category, groups[category])",
              "why": "Считает записи, не уникальных участников."
            },
            {
              "code": "n = int(input())\nseen = set()\ngroups = {}\nfor i in range(n):\n    category, name = input().split()\n    groups.setdefault(category, 0)\n    if name not in seen:\n        groups[category] += 1\n        seen.add(name)\nfor category in sorted(groups):\n    print(category, groups[category])",
              "why": "Уникальность ошибочно общая для всех категорий."
            }
          ],
          "hints": [
            "Храни отдельное множество имён внутри каждой категории.",
            "Проверь этот риск: Считает записи, не уникальных участников.",
            "Ещё одна важная граница: Уникальность ошибочно общая для всех категорий."
          ],
          "solutionExplanation": [
            "Храни отдельное множество имён внутри каждой категории.",
            "Считает записи, не уникальных участников.",
            "Уникальность ошибочно общая для всех категорий."
          ],
          "required": true
        },
        {
          "id": "mappings-group-aggregate",
          "kind": "code",
          "title": "Сумма по категории",
          "goal": "Сумма по категории",
          "prerequisites": [
            "mappings-group"
          ],
          "prompt": "Считай n строк category amount. Выведи суммы amount для каждой категории по алфавиту. Отрицательные суммы разрешены.",
          "inputFormat": "n, затем n строк category и целое.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 100; category длиной 1…30; amount от −1000000 до 1000000. Сумма по модулю до 100000000; весь отчёт меньше 4500 символов.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Прибавляй числовое amount к текущему итогу категории."
            },
            {
              "input": [
                "3",
                "food 5",
                "books 8",
                "food -2"
              ],
              "output": "books 8\nfood 3",
              "explanation": "Прибавляй числовое amount к текущему итогу категории."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "",
              "description": "Вход: 0"
            },
            {
              "stdin": [
                "3",
                "food 5",
                "books 8",
                "food -2"
              ],
              "expectedOutput": "books 8\nfood 3",
              "description": "Вход: 3 / food 5 / books 8 / food -2"
            },
            {
              "stdin": [
                "2",
                "a 0",
                "a 0"
              ],
              "expectedOutput": "a 0",
              "description": "Вход: 2 / a 0 / a 0"
            }
          ],
          "reference": "n = int(input())\ntotals = {}\nfor i in range(n):\n    category, amount = input().split()\n    totals[category] = totals.get(category, 0) + int(amount)\nfor category in sorted(totals):\n    print(category, totals[category])",
          "alternative": "n = int(input())\ngroups = {}\nfor i in range(n):\n    category, amount = input().split()\n    groups.setdefault(category, []).append(int(amount))\nfor category in sorted(groups):\n    print(category, sum(groups[category]))",
          "wrongSolutions": [
            {
              "code": "n = int(input())\ntotals = {}\nfor i in range(n):\n    category, amount = input().split()\n    totals[category] = int(amount)\nfor category in sorted(totals):\n    print(category, totals[category])",
              "why": "Заменяет накопленную сумму последним значением."
            },
            {
              "code": "n = int(input())\ntotals = {}\nfor i in range(n):\n    category, amount = input().split()\n    totals[category] = totals.get(category, 0) + 1\nfor category in sorted(totals):\n    print(category, totals[category])",
              "why": "Частота записей не равна сумме количеств."
            }
          ],
          "hints": [
            "Прибавляй числовое amount к текущему итогу категории.",
            "Проверь этот риск: Заменяет накопленную сумму последним значением.",
            "Ещё одна важная граница: Частота записей не равна сумме количеств."
          ],
          "solutionExplanation": [
            "Прибавляй числовое amount к текущему итогу категории.",
            "Заменяет накопленную сумму последним значением.",
            "Частота записей не равна сумме количеств."
          ],
          "required": true
        },
        {
          "id": "mappings-group-shared-groups",
          "kind": "explain",
          "title": "Почему смешались группы?",
          "goal": "Почему смешались группы?",
          "prerequisites": [
            "mappings-group"
          ],
          "prompt": "Почему append в группе a меняет также b в dict.fromkeys([\"a\", \"b\"], [])?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "groups = dict.fromkeys([\"a\", \"b\"], [])",
                "groups[\"a\"].append(7)",
                "print(groups)"
              ],
              "output": "{'a': [7], 'b': [7]}",
              "explanation": "Разобранный пример по этой идее: Оба ключа получили один и тот же изменяемый список. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Повторное использование изменяемого default создаёт общую структуру; разные ключи сами по себе не копируют значение."
          ],
          "required": true,
          "answer": [
            "1",
            "3"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Оба ключа получили ссылку на один список."
            },
            {
              "id": "2",
              "text": "Имена a и b автоматически считаются одинаковыми."
            },
            {
              "id": "3",
              "text": "Для каждого ключа нужно создавать отдельный список."
            }
          ]
        }
      ]
    },
    {
      "id": "mappings-review",
      "title": "Смешанная практика: выбрать структуру",
      "goal": "Обосновывать выбор списка, множества или словаря.",
      "prerequisites": [
        "mappings-group"
      ],
      "role": "review",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "mappings-review-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Выбор контейнера должен отвечать на вопрос задачи. Нужен порядок с повторениями — список. Нужна уникальность и принадлежность — множество. Нужно связать ключ с числом или другой записью — словарь. Эти структуры можно сочетать, но сложная комбинация без причины затрудняет проверку и не делает программу профессиональнее.",
            "При повторении отделяй три вида количества: число входных записей, число различных ключей и сумму значений. Для журнала \"чай 2\", \"чай 3\" они равны 2, 1 и 5. Если перепутать их, код может выполняться без исключения, но решать другую задачу. Название переменной должно подсказывать, что именно накоплено."
          ],
          "examples": [
            {
              "id": "mappings-review-example-1",
              "title": "Три количества",
              "code": "records = [(\"чай\", 2), (\"чай\", 3)]\ntotals = {}\nfor name, amount in records:\n    totals[name] = totals.get(name, 0) + amount\nprint(len(records), len(totals), sum(totals.values()))",
              "output": "2 1 5",
              "explanation": "Две записи, один товар, пять единиц товара."
            }
          ],
          "goal": "Обосновывать выбор списка, множества или словаря.",
          "prerequisites": [
            "mappings-group"
          ]
        },
        {
          "id": "mappings-review-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Текстовые методы остаются частью обработки данных: split выделяет поля, strip очищает края, int меняет тип. Однако нельзя удалять повторы до суммирования, если каждое вхождение несёт отдельное количество. Сначала опиши, какие строки соответствуют одному объекту, затем определяй группировку.",
            "Проверь случаи с повторным ключом, нулевым значением, отсутствующим запросом и равными лидерами. Для набора участников добавь повторное имя в одной категории и такое же имя в другой: эти ситуации требуют разных решений о равенстве. После решения объясни, какие данные были сознательно потеряны при переходе от списка к множеству или частотному словарю."
          ],
          "examples": [
            {
              "id": "mappings-review-example-2",
              "title": "Повторяемость сохраняется не везде",
              "code": "values = [4, 4, 7]\nprint(len(values))\nprint(len(set(values)))",
              "output": "3\n2",
              "explanation": "Множество намеренно теряет повторное появление."
            }
          ],
          "goal": "Проверить применение: обосновывать выбор списка, множества или словаря.",
          "prerequisites": [
            "mappings-review-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "mappings-review-char-frequency",
          "kind": "code",
          "title": "Частоты непробельных символов",
          "goal": "Частоты непробельных символов",
          "prerequisites": [
            "mappings-review"
          ],
          "prompt": "Считай строку. Игнорируй только обычный пробел. Выведи каждый прочий символ и частоту через пробел по порядку сортировки символов. Регистр значим.",
          "inputFormat": "Одна строка без табуляций.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "Строка длиной 0…1000 без табуляций и внутренних переводов строки; обычные пробелы игнорируются. До 1000 строк «символ частота», весь вывод меньше 7000 символов.",
          "examples": [
            {
              "input": [
                "a b a"
              ],
              "output": "a 2\nb 1",
              "explanation": "Фильтруй символ до обновления частоты."
            },
            {
              "input": [
                "   "
              ],
              "output": "",
              "explanation": "Фильтруй символ до обновления частоты."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "a b a"
              ],
              "expectedOutput": "a 2\nb 1",
              "description": "Вход: a b a"
            },
            {
              "stdin": [
                "   "
              ],
              "expectedOutput": "",
              "description": "Вход:    "
            },
            {
              "stdin": [
                "AaA"
              ],
              "expectedOutput": "A 2\na 1",
              "description": "Вход: AaA"
            }
          ],
          "reference": "counts = {}\nfor ch in input():\n    if ch != \" \":\n        counts[ch] = counts.get(ch, 0) + 1\nfor ch in sorted(counts):\n    print(ch, counts[ch])",
          "alternative": "s = input().replace(\" \", \"\")\nfor ch in sorted(set(s)):\n    print(ch, s.count(ch))",
          "wrongSolutions": [
            {
              "code": "counts = {}\nfor ch in input().lower():\n    if ch != \" \":\n        counts[ch] = counts.get(ch, 0) + 1\nfor ch in sorted(counts):\n    print(ch, counts[ch])",
              "why": "Объединяет разные регистры."
            },
            {
              "code": "counts = {}\nfor ch in input():\n    counts[ch] = counts.get(ch, 0) + 1\nfor ch in sorted(counts):\n    print(ch, counts[ch])",
              "why": "Считает исключённый обычный пробел."
            }
          ],
          "hints": [
            "Фильтруй символ до обновления частоты.",
            "Проверь этот риск: Объединяет разные регистры.",
            "Ещё одна важная граница: Считает исключённый обычный пробел."
          ],
          "solutionExplanation": [
            "Фильтруй символ до обновления частоты.",
            "Объединяет разные регистры.",
            "Считает исключённый обычный пробел."
          ],
          "required": true
        },
        {
          "id": "mappings-review-missing",
          "kind": "code",
          "title": "Недостающие материалы",
          "goal": "Недостающие материалы",
          "prerequisites": [
            "mappings-review"
          ],
          "prompt": "Считай обязательные и имеющиеся названия на двух строках. Выведи отсутствующие обязательные названия по алфавиту, либо «всё есть».",
          "inputFormat": "Две строки слов.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "Каждая строка до 1000 символов, до 100 слов по 1…30 символов. Ответ содержит только обязательные названия, вывод меньше 1100 символов.",
          "examples": [
            {
              "input": [
                "a b",
                "b c"
              ],
              "output": "a",
              "explanation": "Вычти имеющиеся названия из обязательных."
            },
            {
              "input": [
                "a",
                "a b"
              ],
              "output": "всё есть",
              "explanation": "Вычти имеющиеся названия из обязательных."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "a b",
                "b c"
              ],
              "expectedOutput": "a",
              "description": "Вход: a b / b c"
            },
            {
              "stdin": [
                "a",
                "a b"
              ],
              "expectedOutput": "всё есть",
              "description": "Вход: a / a b"
            },
            {
              "stdin": [
                "",
                ""
              ],
              "expectedOutput": "всё есть",
              "description": "Вход:  / "
            }
          ],
          "reference": "required = set(input().split())\navailable = set(input().split())\nmissing = sorted(required - available)\nprint(\" \".join(missing) if missing else \"всё есть\")",
          "alternative": "required = set(input().split())\navailable = set(input().split())\nresult = []\nfor name in required:\n    if name not in available:\n        result.append(name)\nprint(\" \".join(sorted(result)) if result else \"всё есть\")",
          "wrongSolutions": [
            {
              "code": "required = set(input().split())\navailable = set(input().split())\nmissing = sorted(available - required)\nprint(\" \".join(missing) if missing else \"всё есть\")",
              "why": "Меняет направление проверки."
            },
            {
              "code": "required = set(input().split())\navailable = set(input().split())\nmissing = sorted(required ^ available)\nprint(\" \".join(missing) if missing else \"всё есть\")",
              "why": "Дополнительные материалы не являются недостающими."
            }
          ],
          "hints": [
            "Вычти имеющиеся названия из обязательных.",
            "Проверь этот риск: Меняет направление проверки.",
            "Ещё одна важная граница: Дополнительные материалы не являются недостающими."
          ],
          "solutionExplanation": [
            "Вычти имеющиеся названия из обязательных.",
            "Меняет направление проверки.",
            "Дополнительные материалы не являются недостающими."
          ],
          "required": true
        }
      ]
    },
    {
      "id": "mappings-assessment",
      "title": "Контрольная: частоты, ключи и наборы",
      "goal": "Решать новые задачи на связанные данные и равенство элементов.",
      "prerequisites": [
        "mappings-review"
      ],
      "role": "assessment",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "mappings-assessment-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Контрольная проверяет выбор структуры и соблюдение точного правила равенства. В задачах встречаются повторные записи и отсутствие результата. Нельзя заменить программирование перепечатыванием известного примера: форматы похожи на предыдущие, но комбинации требований новые.",
            "Для проверки анаграммы важно учитывать не только набор букв, но и количество каждой. Множество у слов \"abb\" и \"ab\" одинаково, а частоты различаются. В задаче на уникального участника нескольких групп требуется считать число разных групп, а не число записей: повтор строки в одной группе не добавляет новую группу."
          ],
          "examples": [
            {
              "id": "mappings-assessment-example-1",
              "title": "Набор недостаточен",
              "code": "print(set(\"abb\") == set(\"ab\"))\nprint(\"abb\".count(\"b\") == \"ab\".count(\"b\"))",
              "output": "True\nFalse",
              "explanation": "Равные множества букв ещё не означают одинаковые частоты."
            }
          ],
          "goal": "Решать новые задачи на связанные данные и равенство элементов.",
          "prerequisites": [
            "mappings-review"
          ]
        },
        {
          "id": "mappings-assessment-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Объединение двух словарей тоже требует правила конфликта. «Последнее значение побеждает» и «значения суммируются» дают разные результаты при одном ключе. Условие контрольной выбирает суммирование. Вспомни, что get с нулём безопасен для накопления, но не является универсальным доказательством наличия записи.",
            "После решения назови минимальный тест, который отличает выбранную структуру от неверной. Для анаграммы это повтор буквы, для групп — повторная запись одного участника внутри одной группы, для слияния — общий ключ с двумя ненулевыми значениями. Правильный набор таких проверок помогает обосновать алгоритм, а не просто увидеть успешный запуск."
          ],
          "examples": [
            {
              "id": "mappings-assessment-example-2",
              "title": "Правило конфликта",
              "code": "a = {\"чай\": 2}\nb = {\"чай\": 3}\nfor key, value in b.items():\n    a[key] = a.get(key, 0) + value\nprint(a)",
              "output": "{'чай': 5}",
              "explanation": "Для общего ключа выполняется сложение, а не простая замена."
            }
          ],
          "goal": "Проверить применение: решать новые задачи на связанные данные и равенство элементов.",
          "prerequisites": [
            "mappings-assessment-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "mappings-assessment-anagram",
          "kind": "code",
          "title": "Анаграмма с учётом повторов",
          "goal": "Анаграмма с учётом повторов",
          "prerequisites": [
            "mappings-assessment"
          ],
          "prompt": "Считай две строки. Выведи ДА, если они состоят из одинаковых символов с одинаковыми частотами, иначе НЕТ. Регистр и пробелы значимы.",
          "inputFormat": "Две строки.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "Обе строки длиной 0…1000; регистр и обычные пробелы значимы. Проверяются точные частоты; вывод ДА либо НЕТ.",
          "examples": [
            {
              "input": [
                "abb",
                "bab"
              ],
              "output": "ДА",
              "explanation": "Сравни частотные словари либо отсортированные последовательности символов."
            },
            {
              "input": [
                "abb",
                "ab"
              ],
              "output": "НЕТ",
              "explanation": "Сравни частотные словари либо отсортированные последовательности символов."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "abb",
                "bab"
              ],
              "expectedOutput": "ДА",
              "description": "Вход: abb / bab"
            },
            {
              "stdin": [
                "abb",
                "ab"
              ],
              "expectedOutput": "НЕТ",
              "description": "Вход: abb / ab"
            },
            {
              "stdin": [
                "",
                ""
              ],
              "expectedOutput": "ДА",
              "description": "Вход:  / "
            },
            {
              "stdin": [
                "A",
                "a"
              ],
              "expectedOutput": "НЕТ",
              "description": "Вход: A / a"
            }
          ],
          "reference": "a = input()\nb = input()\nleft = {}\nright = {}\nfor ch in a:\n    left[ch] = left.get(ch, 0) + 1\nfor ch in b:\n    right[ch] = right.get(ch, 0) + 1\nprint(\"ДА\" if left == right else \"НЕТ\")",
          "alternative": "a = input()\nb = input()\nprint(\"ДА\" if sorted(a) == sorted(b) else \"НЕТ\")",
          "wrongSolutions": [
            {
              "code": "a = input()\nb = input()\nprint(\"ДА\" if set(a) == set(b) else \"НЕТ\")",
              "why": "Множество теряет частоты."
            },
            {
              "code": "a = input().lower()\nb = input().lower()\nprint(\"ДА\" if sorted(a) == sorted(b) else \"НЕТ\")",
              "why": "Регистр значим и не должен меняться."
            }
          ],
          "hints": [
            "Сравни частотные словари либо отсортированные последовательности символов.",
            "Проверь этот риск: Множество теряет частоты.",
            "Ещё одна важная граница: Регистр значим и не должен меняться."
          ],
          "solutionExplanation": [
            "Сравни частотные словари либо отсортированные последовательности символов.",
            "Множество теряет частоты.",
            "Регистр значим и не должен меняться."
          ],
          "required": true
        },
        {
          "id": "mappings-assessment-multi-groups",
          "kind": "code",
          "title": "Кто в нескольких группах",
          "goal": "Кто в нескольких группах",
          "prerequisites": [
            "mappings-assessment"
          ],
          "prompt": "Считай n записей group name. Выведи имена, присутствующие хотя бы в двух разных группах, по алфавиту. Повтор записи той же группы не считается второй группой.",
          "inputFormat": "n, затем n строк из двух слов.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 100; group и name — слова длиной 1…30. Выводится до 100 имён по алфавиту, меньше 3200 символов.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Свяжи имя с множеством групп, в которых оно встретилось."
            },
            {
              "input": [
                "4",
                "a X",
                "a X",
                "b Y",
                "c X"
              ],
              "output": "X",
              "explanation": "Свяжи имя с множеством групп, в которых оно встретилось."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "",
              "description": "Вход: 0"
            },
            {
              "stdin": [
                "4",
                "a X",
                "a X",
                "b Y",
                "c X"
              ],
              "expectedOutput": "X",
              "description": "Вход: 4 / a X / a X / b Y / c X"
            },
            {
              "stdin": [
                "2",
                "a X",
                "a X"
              ],
              "expectedOutput": "",
              "description": "Вход: 2 / a X / a X"
            },
            {
              "stdin": [
                "3",
                "a Z",
                "b Z",
                "c Z"
              ],
              "expectedOutput": "Z",
              "description": "Вход: 3 / a Z / b Z / c Z"
            }
          ],
          "reference": "n = int(input())\ngroups = {}\nfor i in range(n):\n    group, name = input().split()\n    groups.setdefault(name, set()).add(group)\nprint(*sorted([name for name in groups if len(groups[name]) >= 2]))",
          "alternative": "n = int(input())\npairs = []\nnames = set()\nfor i in range(n):\n    group, name = input().split()\n    names.add(name)\n    if (group, name) not in pairs:\n        pairs.append((group, name))\nresult = []\nfor name in names:\n    count = 0\n    for group, person in pairs:\n        count += person == name\n    if count >= 2:\n        result.append(name)\nprint(*sorted(result))",
          "wrongSolutions": [
            {
              "code": "n = int(input())\ncounts = {}\nfor i in range(n):\n    group, name = input().split()\n    counts[name] = counts.get(name, 0) + 1\nprint(*sorted([name for name in counts if counts[name] >= 2]))",
              "why": "Число записей не равно числу разных групп."
            },
            {
              "code": "n = int(input())\ngroups = {}\nfor i in range(n):\n    group, name = input().split()\n    groups.setdefault(group, set()).add(name)\nprint(*sorted([group for group in groups if len(groups[group]) >= 2]))",
              "why": "Группирует в обратном направлении и выводит категории вместо имён."
            }
          ],
          "hints": [
            "Свяжи имя с множеством групп, в которых оно встретилось.",
            "Проверь этот риск: Число записей не равно числу разных групп.",
            "Ещё одна важная граница: Группирует в обратном направлении и выводит категории вместо имён."
          ],
          "solutionExplanation": [
            "Свяжи имя с множеством групп, в которых оно встретилось.",
            "Число записей не равно числу разных групп.",
            "Группирует в обратном направлении и выводит категории вместо имён."
          ],
          "required": true
        },
        {
          "id": "mappings-assessment-merge",
          "kind": "code",
          "title": "Объединить остатки двух складов",
          "goal": "Объединить остатки двух складов",
          "prerequisites": [
            "mappings-assessment"
          ],
          "prompt": "Считай n, n строк key amount для первого склада, затем m и m строк второго. Выведи сумму количеств каждого товара по алфавиту. Повторные записи внутри склада также суммируются.",
          "inputFormat": "Две серии: количество строк и записи.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n,m ≤ 100; ключи длиной 1…30; количества от −1000000 до 1000000. До 200 итоговых ключей, сумма каждого по модулю до 200000000, весь вывод меньше 9000 символов.",
          "examples": [
            {
              "input": [
                "0",
                "0"
              ],
              "output": "",
              "explanation": "Используй один накопительный словарь для обеих серий входа."
            },
            {
              "input": [
                "2",
                "a 2",
                "b 1",
                "2",
                "a 3",
                "c 4"
              ],
              "output": "a 5\nb 1\nc 4",
              "explanation": "Используй один накопительный словарь для обеих серий входа."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0",
                "0"
              ],
              "expectedOutput": "",
              "description": "Вход: 0 / 0"
            },
            {
              "stdin": [
                "2",
                "a 2",
                "b 1",
                "2",
                "a 3",
                "c 4"
              ],
              "expectedOutput": "a 5\nb 1\nc 4",
              "description": "Вход: 2 / a 2 / b 1 / 2 / a 3 / c 4"
            },
            {
              "stdin": [
                "2",
                "x 1",
                "x 2",
                "1",
                "x -1"
              ],
              "expectedOutput": "x 2",
              "description": "Вход: 2 / x 1 / x 2 / 1 / x -1"
            }
          ],
          "reference": "totals = {}\nfor warehouse in range(2):\n    count = int(input())\n    for i in range(count):\n        key, amount = input().split()\n        totals[key] = totals.get(key, 0) + int(amount)\nfor key in sorted(totals):\n    print(key, totals[key])",
          "alternative": "totals = {}\nn = int(input())\nrecords = []\nfor i in range(n):\n    records.append(input().split())\nm = int(input())\nfor i in range(m):\n    records.append(input().split())\nfor key, amount in records:\n    totals[key] = totals.get(key, 0) + int(amount)\nfor key in sorted(totals):\n    print(key, totals[key])",
          "wrongSolutions": [
            {
              "code": "totals = {}\nfor warehouse in range(2):\n    count = int(input())\n    for i in range(count):\n        key, amount = input().split()\n        totals[key] = int(amount)\nfor key in sorted(totals):\n    print(key, totals[key])",
              "why": "Перезаписывает количество последней записью."
            },
            {
              "code": "totals = {}\nfor warehouse in range(2):\n    count = int(input())\n    for i in range(count):\n        key, amount = input().split()\n        totals[key] = totals.get(key, 0) + 1\nfor key in sorted(totals):\n    print(key, totals[key])",
              "why": "Считает строки вместо количеств."
            }
          ],
          "hints": [
            "Используй один накопительный словарь для обеих серий входа.",
            "Проверь этот риск: Перезаписывает количество последней записью.",
            "Ещё одна важная граница: Считает строки вместо количеств."
          ],
          "solutionExplanation": [
            "Используй один накопительный словарь для обеих серий входа.",
            "Перезаписывает количество последней записью.",
            "Считает строки вместо количеств."
          ],
          "required": true
        }
      ]
    },
    {
      "id": "mappings-inventory-project",
      "title": "Мини-проект: склад и заявки",
      "goal": "Построить отчёт, где данные связаны по ключам, а повторы имеют ясный смысл.",
      "prerequisites": [
        "mappings-assessment"
      ],
      "role": "project",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "mappings-inventory-project-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Проект моделирует склад без внешней базы данных. На входе задан текущий остаток товара и список заявок. У каждого товара текстовый ключ, у количества — целое значение. Мы не отправляем реальные заказы и не меняем рабочие данные: всё состояние существует только в программе. Это позволяет сосредоточиться на правилах обработки.",
            "В первом задании нужно определить отсутствующие товары, во втором — посчитать общий спрос, в третьем — сопоставить спрос с остатком и показать дефицит. Каждый этап хранит разную информацию. Для отсутствия достаточно множества, для суммы нужен словарь, для дефицита — два связанных словаря. Повторная заявка не исчезает: её количество прибавляется к прежнему спросу."
          ],
          "examples": [
            {
              "id": "mappings-inventory-project-example-1",
              "title": "Потребность и наличие",
              "code": "stock = {\"чай\": 5}\ndemand = {\"чай\": 7, \"кофе\": 2}\nfor name in sorted(demand):\n    missing = max(0, demand[name] - stock.get(name, 0))\n    print(name, missing)",
              "output": "кофе 2\nчай 2",
              "explanation": "Неизвестный товар имеет нулевой остаток; дефицит вычисляется по количеству."
            }
          ],
          "goal": "Построить отчёт, где данные связаны по ключам, а повторы имеют ясный смысл.",
          "prerequisites": [
            "mappings-assessment"
          ]
        },
        {
          "id": "mappings-inventory-project-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Дефицит равен max(0, demand - stock). Неизвестный товар имеет нулевой остаток по контракту проекта. Равенство спроса и остатка означает отсутствие дефицита. В отчёт включаются только положительные нехватки, а порядок строк задаётся алфавитом ключей. Если всё хватает, выводится одно понятное сообщение.",
            "Проверь заявки на неизвестный товар, повторные заявки, нулевое количество и точное совпадение с остатком. Затем объясни, почему нельзя просто вычесть число строк заявок из числа складских позиций. Такой отчёт соединяет количественные данные по смысловым ключам — именно для этого нужен словарь. После проекта повтори одну задачу на множества: разные контейнеры остаются полезны для разных вопросов."
          ],
          "examples": [
            {
              "id": "mappings-inventory-project-example-2",
              "title": "Точное совпадение",
              "code": "available = 4\nrequested = 4\nprint(max(0, requested - available))",
              "output": "0",
              "explanation": "Ровно достаточный остаток даёт дефицит 0, а не ошибку заказа."
            }
          ],
          "goal": "Проверить применение: построить отчёт, где данные связаны по ключам, а повторы имеют ясный смысл.",
          "prerequisites": [
            "mappings-inventory-project-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "mappings-inventory-project-unknown",
          "kind": "code",
          "title": "Неизвестные товары в заявке",
          "goal": "Неизвестные товары в заявке",
          "prerequisites": [
            "mappings-inventory-project"
          ],
          "prompt": "Считай строку складских названий и строку запрошенных названий. Выведи неизвестные товары по алфавиту без повторов, либо «все известны».",
          "inputFormat": "Две строки слов.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "Каждая строка до 1000 символов, до 100 названий по 1…30 символов. Повторы удаляются, ответ меньше 1100 символов.",
          "examples": [
            {
              "input": [
                "a b",
                "b c c"
              ],
              "output": "c",
              "explanation": "От запрошенного набора вычти складской."
            },
            {
              "input": [
                "a",
                "a"
              ],
              "output": "все известны",
              "explanation": "От запрошенного набора вычти складской."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "a b",
                "b c c"
              ],
              "expectedOutput": "c",
              "description": "Вход: a b / b c c"
            },
            {
              "stdin": [
                "a",
                "a"
              ],
              "expectedOutput": "все известны",
              "description": "Вход: a / a"
            },
            {
              "stdin": [
                "",
                "x"
              ],
              "expectedOutput": "x",
              "description": "Вход:  / x"
            },
            {
              "stdin": [
                "",
                ""
              ],
              "expectedOutput": "все известны",
              "description": "Вход:  / "
            }
          ],
          "reference": "stock = set(input().split())\nrequested = set(input().split())\nunknown = sorted(requested - stock)\nprint(\" \".join(unknown) if unknown else \"все известны\")",
          "alternative": "stock = input().split()\nresult = []\nfor name in input().split():\n    if name not in stock and name not in result:\n        result.append(name)\nprint(\" \".join(sorted(result)) if result else \"все известны\")",
          "wrongSolutions": [
            {
              "code": "stock = set(input().split())\nrequested = set(input().split())\nunknown = sorted(stock - requested)\nprint(\" \".join(unknown) if unknown else \"все известны\")",
              "why": "Направление разности перепутано."
            },
            {
              "code": "stock = input().split()\nunknown = [name for name in input().split() if name not in stock]\nprint(\" \".join(sorted(unknown)) if unknown else \"все известны\")",
              "why": "Повторяет неизвестный товар несколько раз."
            }
          ],
          "hints": [
            "От запрошенного набора вычти складской.",
            "Проверь этот риск: Направление разности перепутано.",
            "Ещё одна важная граница: Повторяет неизвестный товар несколько раз."
          ],
          "solutionExplanation": [
            "От запрошенного набора вычти складской.",
            "Направление разности перепутано.",
            "Повторяет неизвестный товар несколько раз."
          ],
          "required": true
        },
        {
          "id": "mappings-inventory-project-fulfill",
          "kind": "code",
          "title": "Обработать заявки последовательно",
          "goal": "Обработать заявки последовательно",
          "prerequisites": [
            "mappings-inventory-project"
          ],
          "prompt": "Считай n складских записей name quantity с уникальными ключами, затем m заявок name quantity. Для каждой заявки по очереди: если остатка хватает, выведи принят и уменьши остаток; иначе отклонён и ничего не меняй. Неизвестный товар имеет остаток 0.",
          "inputFormat": "n; n складских записей; m; m заявок, все количества неотрицательны.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n,m ≤ 100; названия длиной 1…30; складские ключи уникальны. Каждое количество 0…1000000. По одному статусу на заявку, не больше 100 строк.",
          "examples": [
            {
              "input": [
                "0",
                "0"
              ],
              "output": "",
              "explanation": "Проверяй доступное количество до изменения и обновляй только принятую заявку."
            },
            {
              "input": [
                "1",
                "tea 5",
                "3",
                "tea 3",
                "tea 3",
                "tea 2"
              ],
              "output": "принят\nотклонён\nпринят",
              "explanation": "Проверяй доступное количество до изменения и обновляй только принятую заявку."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0",
                "0"
              ],
              "expectedOutput": "",
              "description": "Вход: 0 / 0"
            },
            {
              "stdin": [
                "1",
                "tea 5",
                "3",
                "tea 3",
                "tea 3",
                "tea 2"
              ],
              "expectedOutput": "принят\nотклонён\nпринят",
              "description": "Вход: 1 / tea 5 / 3 / tea 3 / tea 3 / tea 2"
            },
            {
              "stdin": [
                "0",
                "2",
                "x 1",
                "x 0"
              ],
              "expectedOutput": "отклонён\nпринят",
              "description": "Вход: 0 / 2 / x 1 / x 0"
            }
          ],
          "reference": "n = int(input())\nstock = {}\nfor i in range(n):\n    name, amount = input().split()\n    stock[name] = int(amount)\nm = int(input())\nfor i in range(m):\n    name, amount = input().split()\n    amount = int(amount)\n    if stock.get(name, 0) >= amount:\n        stock[name] = stock.get(name, 0) - amount\n        print(\"принят\")\n    else:\n        print(\"отклонён\")",
          "alternative": "n = int(input())\nstock = {}\nfor i in range(n):\n    name, amount = input().split()\n    stock[name] = int(amount)\nm = int(input())\nfor i in range(m):\n    name, amount = input().split()\n    available = stock.get(name, 0)\n    remaining = available - int(amount)\n    if remaining < 0:\n        print(\"отклонён\")\n    else:\n        stock[name] = remaining\n        print(\"принят\")",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nstock = {}\nfor i in range(n):\n    name, amount = input().split()\n    stock[name] = int(amount)\nm = int(input())\nfor i in range(m):\n    name, amount = input().split()\n    print(\"принят\" if stock.get(name, 0) >= int(amount) else \"отклонён\")",
              "why": "Без уменьшения остатка повторные заявки используют уже выданный товар."
            },
            {
              "code": "n = int(input())\nstock = {}\nfor i in range(n):\n    name, amount = input().split()\n    stock[name] = int(amount)\nm = int(input())\nfor i in range(m):\n    name, amount = input().split()\n    stock[name] = stock.get(name, 0) - int(amount)\n    print(\"принят\" if stock[name] >= 0 else \"отклонён\")",
              "why": "Отклонённая заявка не должна уменьшать остаток."
            }
          ],
          "hints": [
            "Проверяй доступное количество до изменения и обновляй только принятую заявку.",
            "Проверь этот риск: Без уменьшения остатка повторные заявки используют уже выданный товар.",
            "Ещё одна важная граница: Отклонённая заявка не должна уменьшать остаток."
          ],
          "solutionExplanation": [
            "Проверяй доступное количество до изменения и обновляй только принятую заявку.",
            "Без уменьшения остатка повторные заявки используют уже выданный товар.",
            "Отклонённая заявка не должна уменьшать остаток."
          ],
          "required": true
        },
        {
          "id": "mappings-inventory-project-deficit",
          "kind": "code",
          "title": "Полный отчёт дефицита",
          "goal": "Полный отчёт дефицита",
          "prerequisites": [
            "mappings-inventory-project"
          ],
          "prompt": "Считай n складских записей name quantity (ключи уникальны), затем m заявок того же вида. Повторные заявки суммируются. Выведи только положительные дефициты «name missing» по алфавиту; если их нет — «всё хватает».",
          "inputFormat": "n; n записей склада; m; m заявок. Количества неотрицательны.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n,m ≤ 100; названия длиной 1…30; складские ключи уникальны; количества 0…1000000. Спрос одного товара до 100000000; до 100 строк дефицита, весь отчёт меньше 4500 символов.",
          "examples": [
            {
              "input": [
                "0",
                "0"
              ],
              "output": "всё хватает",
              "explanation": "Собери спрос по каждому ключу, затем вычти остаток и выведи только положительные разности."
            },
            {
              "input": [
                "1",
                "tea 5",
                "3",
                "tea 3",
                "tea 4",
                "book 2"
              ],
              "output": "book 2\ntea 2",
              "explanation": "Собери спрос по каждому ключу, затем вычти остаток и выведи только положительные разности."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0",
                "0"
              ],
              "expectedOutput": "всё хватает",
              "description": "Вход: 0 / 0"
            },
            {
              "stdin": [
                "1",
                "tea 5",
                "3",
                "tea 3",
                "tea 4",
                "book 2"
              ],
              "expectedOutput": "book 2\ntea 2",
              "description": "Вход: 1 / tea 5 / 3 / tea 3 / tea 4 / book 2"
            },
            {
              "stdin": [
                "1",
                "a 4",
                "1",
                "a 4"
              ],
              "expectedOutput": "всё хватает",
              "description": "Вход: 1 / a 4 / 1 / a 4"
            },
            {
              "stdin": [
                "0",
                "1",
                "x 0"
              ],
              "expectedOutput": "всё хватает",
              "description": "Вход: 0 / 1 / x 0"
            }
          ],
          "reference": "n = int(input())\nstock = {}\nfor i in range(n):\n    name, quantity = input().split()\n    stock[name] = int(quantity)\nm = int(input())\ndemand = {}\nfor i in range(m):\n    name, quantity = input().split()\n    demand[name] = demand.get(name, 0) + int(quantity)\nfound = False\nfor name in sorted(demand):\n    missing = demand[name] - stock.get(name, 0)\n    if missing > 0:\n        print(name, missing)\n        found = True\nif not found:\n    print(\"всё хватает\")",
          "alternative": "n = int(input())\nstock = {}\nfor i in range(n):\n    name, quantity = input().split()\n    stock[name] = int(quantity)\nm = int(input())\nfor i in range(m):\n    name, quantity = input().split()\n    stock[name] = stock.get(name, 0) - int(quantity)\nmissing = sorted([name for name in stock if stock[name] < 0])\nif missing:\n    for name in missing:\n        print(name, -stock[name])\nelse:\n    print(\"всё хватает\")",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nstock = {}\nfor i in range(n):\n    name, quantity = input().split()\n    stock[name] = int(quantity)\nm = int(input())\ndemand = {}\nfor i in range(m):\n    name, quantity = input().split()\n    demand[name] = int(quantity)\nfound = False\nfor name in sorted(demand):\n    missing = demand[name] - stock.get(name, 0)\n    if missing > 0:\n        print(name, missing)\n        found = True\nif not found:\n    print(\"всё хватает\")",
              "why": "Не суммирует повторные заявки."
            },
            {
              "code": "n = int(input())\nstock = {}\nfor i in range(n):\n    name, quantity = input().split()\n    stock[name] = int(quantity)\nm = int(input())\ndemand = {}\nfor i in range(m):\n    name, quantity = input().split()\n    demand[name] = demand.get(name, 0) + int(quantity)\nfound = False\nfor name in sorted(demand):\n    missing = demand[name] - stock.get(name, 0)\n    if missing >= 0:\n        print(name, missing)\n        found = True\nif not found:\n    print(\"всё хватает\")",
              "why": "Выводит нулевой дефицит, который должен быть исключён."
            }
          ],
          "hints": [
            "Собери спрос по каждому ключу, затем вычти остаток и выведи только положительные разности.",
            "Проверь этот риск: Не суммирует повторные заявки.",
            "Ещё одна важная граница: Выводит нулевой дефицит, который должен быть исключён."
          ],
          "solutionExplanation": [
            "Собери спрос по каждому ключу, затем вычти остаток и выведи только положительные разности.",
            "Не суммирует повторные заявки.",
            "Выводит нулевой дефицит, который должен быть исключён."
          ],
          "required": true
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.12/tutorial/controlflow.html",
    "https://docs.python.org/3.12/tutorial/datastructures.html",
    "https://docs.python.org/3.12/library/stdtypes.html"
  ]
};
export default content;
