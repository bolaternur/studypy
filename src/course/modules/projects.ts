import type { CourseModule } from '../types';

const module: CourseModule = {
  "id": "projects",
  "title": "Комплексная практика и проекты",
  "track": "base",
  "depth": "Практический модуль",
  "goal": "Самостоятельно соединять формат данных, состояние и ясные критерии результата.",
  "prerequisites": [
    "data"
  ],
  "lessons": [
    {
      "id": "projects-budget",
      "title": "Проект: движение денег и лимит",
      "goal": "Различать поступления, расходы, остаток и момент превышения.",
      "prerequisites": [],
      "role": "project",
      "estimatedMinutes": 55,
      "steps": [
        {
          "id": "projects-budget-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "В этом проекте операции — целые числа: положительное обозначает поступление, отрицательное — списание. Начальный баланс передаётся отдельно. Это учебная модель без дробных денежных единиц, банковского доступа и процентов. Задача программы — не просто сложить числа, а показать состояние после каждого события и первый момент нарушения ограничения. Порядок операций имеет значение: одинаковая итоговая сумма может скрывать временный отрицательный остаток.",
            "Сначала отдели итог от истории. Итоговый баланс требует начального значения и суммы операций. История требует сохранять баланс после каждого изменения. Для диагностики недостатка ищи первый индекс, где новый баланс стал отрицательным. Ноль считается допустимым остатком. Если начальный баланс уже отрицателен, в задаче первого события это отдельно объявлено: индекса операции ещё нет, поэтому входы этой проверки ограничены неотрицательным началом."
          ],
          "examples": [
            {
              "id": "projects-budget-example-1",
              "title": "Порядок меняет промежуточное состояние",
              "code": "start=4\nfor operations in [[-5,5],[5,-5]]:\n    balance=start\n    history=[]\n    for amount in operations:\n        balance+=amount\n        history.append(balance)\n    print(history)",
              "output": "[-1, 4]\n[9, 4]\n",
              "explanation": "Итог одинаков, но в первом журнале был отрицательный остаток."
            }
          ],
          "goal": "Различать поступления, расходы, остаток и момент превышения. Задача и устройство.",
          "prerequisites": []
        },
        {
          "id": "projects-budget-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Лимит расходов отличается от текущего остатка. Поступление не отменяет уже понесённый расход: общий расход равен сумме модулей отрицательных операций. Проверяй это на последовательности [-5,10,-4]: чистое изменение+1, но расход 9. При построении сводки сохраняй оба показателя: они отвечают на разные вопросы и не должны подменяться одним числом.",
            "Раздели проект на маленькие контракты, затем проверь их согласованность. Последний элемент истории должен совпадать с итоговым балансом при непустом журнале; при пустом итог равен началу, а история пуста. Отсутствие нарушения обозначается None, не 0, потому что индекс 0 может быть настоящим первым нарушением. После самостоятельного решения объясни на конкретном входе, какой накопитель зачем нужен."
          ],
          "examples": [
            {
              "id": "projects-budget-example-2",
              "title": "Чистое изменение и расход",
              "code": "operations=[-5,10,-4]\nprint(sum(operations))\nprint(sum(-x for x in operations if x<0))",
              "output": "1\n9\n",
              "explanation": "Чистое изменение+1 не отменяет расходы 9."
            },
            {
              "id": "projects-budget-receipt-example",
              "title": "Чек корзины по каталогу цен",
              "code": "prices={\"чай\":40,\"хлеб\":25}\nbasket=[(\"чай\",2),(\"хлеб\",1)]\ntotal=0\nfor name,quantity in basket:\n    total+=prices[name]*quantity\nprint(total)",
              "output": "105\n",
              "explanation": "Словарь отвечает на вопрос о цене товара, пара корзины — о количестве. Общий чек складывается из стоимости каждой позиции."
            }
          ],
          "goal": "Различать поступления, расходы, остаток и момент превышения. Порядок выполнения.",
          "prerequisites": [
            "projects-budget-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "projects-budget-task-1",
          "kind": "code",
          "title": "История баланса",
          "goal": "История баланса",
          "prerequisites": [
            "projects-budget"
          ],
          "prompt": "Верни список балансов после каждой операции. start — целое число, operations — список целых чисел; положительная операция добавляет, отрицательная списывает. Входной список не меняй.",
          "inputFormat": "Реализуй balance_history(start, operations). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "balance_history(4,[-5,5])"
              ],
              "output": "[-1, 4]",
              "explanation": "Состояние после каждого события."
            },
            {
              "input": [
                "balance_history(0,[])"
              ],
              "output": "[]",
              "explanation": "Нет операций, нет снимков."
            }
          ],
          "initialCode": "def balance_history(start, operations):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "balance_history(4,[-5,5])",
              "expectedValue": [
                -1,
                4
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Состояние после каждого события."
            },
            {
              "expression": "balance_history(0,[])",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет операций, нет снимков."
            },
            {
              "expression": "balance_history(2,[0,-2])",
              "expectedValue": [
                2,
                0
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевая операция тоже событие."
            },
            {
              "setup": "_course_input_1 = [-5, 5]",
              "expression": "[balance_history(4, _course_input_1), _course_input_1 == [-5, 5]]",
              "expectedValue": [
                [
                  -1,
                  4
                ],
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Проверяется и возвращённый результат, и сохранность входных коллекций после вызова."
            }
          ],
          "reference": "def balance_history(start, operations):\n    result=[]\n    balance=start\n    for amount in operations:\n        balance+=amount\n        result.append(balance)\n    return result",
          "alternative": "def balance_history(start, operations):\n    return [start+sum(operations[:i+1]) for i in range(len(operations))]",
          "wrongSolutions": [
            {
              "code": "def balance_history(start, operations):\n    return [start+sum(operations)]*len(operations)",
              "why": "История заменена повторением итога."
            },
            {
              "code": "def balance_history(start, operations):\n    result=[]\n    for amount in operations:\n        result.append(start)\n        start+=amount\n    return result",
              "why": "Снимок сделан до операции."
            },
            {
              "code": "def balance_history(start, operations):\n    result=[]\n    balance=start\n    for amount in operations:\n        balance+=amount\n        result.append(balance)\n    return result\n_course_original = balance_history\ndef balance_history(*args, **kwargs):\n    result = _course_original(*args, **kwargs)\n    args[1].clear()\n    return result",
              "why": "Правильный ответ вычислен, но после вызова входная коллекция очищена, нарушая контракт сохранности."
            }
          ],
          "hints": [
            "Начальный остаток не отдельная операция.",
            "Обновляй баланс до сохранения снимка.",
            "После каждого+=добавляй текущее значение в новый список."
          ],
          "solutionExplanation": [
            "Сохранённое состояние соответствует событию того же индекса.",
            "Пустой журнал даёт пустую историю."
          ],
          "required": true
        },
        {
          "id": "projects-budget-task-2",
          "kind": "code",
          "title": "Первое отрицательное состояние",
          "goal": "Первое отрицательное состояние",
          "prerequisites": [
            "projects-budget"
          ],
          "prompt": "start>=0. Верни индекс первой операции, после которой баланс<0, или None. Нулевой остаток допустим.",
          "inputFormat": "Реализуй first_deficit(start, operations). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "first_deficit(4,[-5,5])"
              ],
              "output": "0",
              "explanation": "Первое событие уже нарушает правило."
            },
            {
              "input": [
                "first_deficit(5,[-2,-3,-1])"
              ],
              "output": "2",
              "explanation": "На нуле ещё нет нарушения."
            }
          ],
          "initialCode": "def first_deficit(start, operations):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "first_deficit(4,[-5,5])",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Первое событие уже нарушает правило."
            },
            {
              "expression": "first_deficit(5,[-2,-3,-1])",
              "expectedValue": 2,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "На нуле ещё нет нарушения."
            },
            {
              "expression": "first_deficit(0,[])",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет событий."
            }
          ],
          "reference": "def first_deficit(start, operations):\n    balance=start\n    for i,amount in enumerate(operations):\n        balance+=amount\n        if balance<0:\n            return i\n    return None",
          "alternative": "def first_deficit(start, operations):\n    for i in range(len(operations)):\n        if start+sum(operations[:i+1])<0:\n            return i\n    return None",
          "wrongSolutions": [
            {
              "code": "def first_deficit(start, operations):\n    return 0 if start+sum(operations)<0 else None",
              "why": "Итог скрывает временное нарушение и неправильный индекс."
            },
            {
              "code": "def first_deficit(start, operations):\n    for i,x in enumerate(operations):\n        start+=x\n        if start<=0:\n            return i\n    return None",
              "why": "Ноль ошибочно объявлен дефицитом."
            }
          ],
          "hints": [
            "Нужно состояние после каждого события, не только в конце.",
            "При первом отрицательном остатке поиск закончен.",
            "Проверяй строго<0 после обновления баланса."
          ],
          "solutionExplanation": [
            "Индекс 0 — корректный ответ, который нельзя подменять None.",
            "Ранний возврат фиксирует первый момент."
          ],
          "required": true
        },
        {
          "id": "projects-budget-task-3",
          "kind": "code",
          "title": "Общий расход по журналу",
          "goal": "Общий расход по журналу",
          "prerequisites": [
            "projects-budget"
          ],
          "prompt": "Верни сумму списаний положительным числом. Поступления и нулевые операции не уменьшают расход.",
          "inputFormat": "Реализуй expense_total(operations). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "expense_total([-5,10,-4])"
              ],
              "output": "9",
              "explanation": "Поступление не компенсирует показатель расходов."
            },
            {
              "input": [
                "expense_total([0,3])"
              ],
              "output": "0",
              "explanation": "Нет списаний."
            }
          ],
          "initialCode": "def expense_total(operations):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "expense_total([-5,10,-4])",
              "expectedValue": 9,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Поступление не компенсирует показатель расходов."
            },
            {
              "expression": "expense_total([0,3])",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет списаний."
            },
            {
              "expression": "expense_total([])",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пусто."
            }
          ],
          "reference": "def expense_total(operations):\n    return sum(-amount for amount in operations if amount<0)",
          "alternative": "def expense_total(operations):\n    total=0\n    for amount in operations:\n        if amount<0:\n            total-=amount\n    return total",
          "wrongSolutions": [
            {
              "code": "def expense_total(operations):\n    return abs(sum(operations))",
              "why": "Абсолютное чистое изменение — другой показатель."
            },
            {
              "code": "def expense_total(operations):\n    return sum(x for x in operations if x<0)",
              "why": "Ответ остаётся отрицательным."
            }
          ],
          "hints": [
            "Отбери только отрицательные операции.",
            "Расход в отчёте положителен.",
            "Суммируй-amount для amount<0."
          ],
          "solutionExplanation": [
            "Отбор относится к событиям до суммирования.",
            "Противоположные знаки нельзя сократить до отбора."
          ],
          "required": true
        },
        {
          "id": "projects-budget-task-4",
          "kind": "code",
          "title": "Сводка бюджета",
          "goal": "Сводка бюджета",
          "prerequisites": [
            "projects-budget"
          ],
          "prompt": "start>=0,limit>=0. Верни balance(итог),spent(общие списания положительно),over_limit(spent>limit). Суммы целые.",
          "inputFormat": "Реализуй budget_report(start, operations, limit). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "budget_report(4,[-5,10,-4],8)"
              ],
              "output": "{'balance': 5, 'spent': 9, 'over_limit': True}",
              "explanation": "Три показателя различаются."
            },
            {
              "input": [
                "budget_report(0,[-3],3)"
              ],
              "output": "{'balance': -3, 'spent': 3, 'over_limit': False}",
              "explanation": "Равный лимит допустим."
            }
          ],
          "initialCode": "def budget_report(start, operations, limit):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "budget_report(4,[-5,10,-4],8)",
              "expectedValue": {
                "balance": 5,
                "spent": 9,
                "over_limit": true
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Три показателя различаются."
            },
            {
              "expression": "budget_report(0,[-3],3)",
              "expectedValue": {
                "balance": -3,
                "spent": 3,
                "over_limit": false
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Равный лимит допустим."
            },
            {
              "expression": "budget_report(7,[],0)",
              "expectedValue": {
                "balance": 7,
                "spent": 0,
                "over_limit": false
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой журнал."
            }
          ],
          "reference": "def budget_report(start, operations, limit):\n    spent=sum(-x for x in operations if x<0)\n    return {\"balance\":start+sum(operations),\"spent\":spent,\"over_limit\":spent>limit}",
          "alternative": "def budget_report(start, operations, limit):\n    balance=start\n    spent=0\n    for amount in operations:\n        balance+=amount\n        if amount<0:\n            spent-=amount\n    return dict(balance=balance,spent=spent,over_limit=spent>limit)",
          "wrongSolutions": [
            {
              "code": "def budget_report(start, operations, limit):\n    spent=abs(sum(operations))\n    return dict(balance=start+sum(operations),spent=spent,over_limit=spent>limit)",
              "why": "Поступления ошибочно гасят расход."
            },
            {
              "code": "def budget_report(start, operations, limit):\n    spent=sum(-x for x in operations if x<0)\n    return dict(balance=start+sum(operations),spent=spent,over_limit=spent>=limit)",
              "why": "Равенство лимиту не является превышением."
            }
          ],
          "hints": [
            "Каждое поле имеет отдельный смысл.",
            "Баланс использует все операции,spent только отрицательные.",
            "over_limit сравнивает spent строго с limit."
          ],
          "solutionExplanation": [
            "Согласованная сводка проверяется и на равенстве лимиту.",
            "Итог не теряет начальный остаток."
          ],
          "required": true
        },
        {
          "id": "projects-budget-task-5",
          "kind": "code",
          "title": "Чек по каталогу и корзине",
          "goal": "Чек по каталогу и корзине",
          "prerequisites": [
            "projects-budget"
          ],
          "prompt": "prices — словарь имя→неотрицательная целая цена. basket — список пар (name,quantity),quantity — целое>=0. Каждый ключ гарантирован в prices. Верни сумму стоимостей всех позиций. Повторные позиции учитывай отдельно. Источники не меняй.",
          "inputFormat": "Реализуй basket_total(prices, basket). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "basket_total({'чай':40,'хлеб':25},[('чай',2),('хлеб',1),('чай',1)])"
              ],
              "output": "145",
              "explanation": "Две позиции чая суммируются, хлеб имеет свою цену."
            },
            {
              "input": [
                "basket_total({'чай':40},[])"
              ],
              "output": "0",
              "explanation": "Пустая корзина."
            }
          ],
          "initialCode": "def basket_total(prices, basket):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "basket_total({'чай':40,'хлеб':25},[('чай',2),('хлеб',1),('чай',1)])",
              "expectedValue": 145,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Две позиции чая суммируются, хлеб имеет свою цену."
            },
            {
              "expression": "basket_total({'чай':40},[])",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустая корзина."
            },
            {
              "expression": "basket_total({'чай':40},[('чай',0)])",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевое количество допустимо."
            },
            {
              "setup": "_course_input_0 = {'чай': 40, 'хлеб': 25}\n_course_input_1 = [('чай', 2), ('хлеб', 1), ('чай', 1)]",
              "expression": "[basket_total(_course_input_0, _course_input_1), _course_input_0 == {'чай': 40, 'хлеб': 25} and _course_input_1 == [('чай', 2), ('хлеб', 1), ('чай', 1)]]",
              "expectedValue": [
                145,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Проверяется и возвращённый результат, и сохранность входных коллекций после вызова."
            }
          ],
          "reference": "def basket_total(prices, basket):\n    total=0\n    for name,quantity in basket:\n        total+=prices[name]*quantity\n    return total",
          "alternative": "def basket_total(prices, basket):\n    return sum(prices[name]*count for name,count in basket)",
          "wrongSolutions": [
            {
              "code": "def basket_total(prices, basket):\n    return sum(prices[name] for name,count in basket)",
              "why": "Количество каждой позиции проигнорировано."
            },
            {
              "code": "def basket_total(prices, basket):\n    quantities=dict(basket)\n    return sum(prices[name]*count for name,count in quantities.items())",
              "why": "dict перезаписывает повторные позиции, теряя часть корзины."
            },
            {
              "code": "def basket_total(prices, basket):\n    total=0\n    for name,quantity in basket:\n        total+=prices[name]*quantity\n    return total\n_course_original = basket_total\ndef basket_total(*args, **kwargs):\n    result = _course_original(*args, **kwargs)\n    args[0].clear()\n    return result",
              "why": "Правильный ответ вычислен, но после вызова входная коллекция очищена, нарушая контракт сохранности."
            }
          ],
          "hints": [
            "Для каждой позиции найди цену по имени товара.",
            "Стоимость позиции — цена умножить на количество.",
            "Накапливай все произведения, не превращая basket в словарь."
          ],
          "solutionExplanation": [
            "Корзина событий может содержать повтор одного товара.",
            "Проверка нескольких товаров и повторной позиции различает цену, количество и ошибочную перезапись."
          ],
          "required": true
        }
      ]
    },
    {
      "id": "projects-text-analysis",
      "title": "Проект: анализ небольшого текста",
      "goal": "Нормализовать слова и строить частотный отчёт без потери правил.",
      "prerequisites": [
        "projects-budget"
      ],
      "role": "project",
      "estimatedMinutes": 55,
      "steps": [
        {
          "id": "projects-text-analysis-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Текстовый анализ начинается с договорённости о слове. В этом проекте слова разделены пробельными символами; по краям каждого удаляются только знаки.,!?;:. Регистр не различается. Это учебная модель, а не универсальная лингвистическая обработка: дефисы, апострофы, языковые правила и длинные документы требуют отдельного проекта. Чёткое ограничение помогает сделать программу объяснимой и проверяемой.",
            "Порядок нормализации важен. Сначала split выделяет фрагменты, затем strip с набором знаков очищает края и lower приводит регистр. После очистки фрагмент может стать пустым, например\"!!!\". Его нужно пропустить. Не удаляй знаки внутри слов, если условие этого не просит: замена всех знаков может склеить или изменить исходный токен."
          ],
          "examples": [
            {
              "id": "projects-text-analysis-example-1",
              "title": "Нормализация по договорённости",
              "code": "tokens=[]\nfor part in \"Кот, кот! !!! Пёс\".split():\n    word=part.strip(\".,!?;:\").lower()\n    if word:\n        tokens.append(word)\nprint(tokens)",
              "output": "['кот', 'кот', 'пёс']\n",
              "explanation": "Пустой после очистки фрагмент!!! пропущен; два варианта кот объединяются."
            }
          ],
          "goal": "Нормализовать слова и строить частотный отчёт без потери правил. Задача и устройство.",
          "prerequisites": [
            "projects-budget"
          ]
        },
        {
          "id": "projects-text-analysis-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Частоты считаются словарём слово→количество. Для выбора самого частого при равенстве договоримся брать алфавитно первое. Такое правило требует сравнить не только число, но и слово. Пустой текст не имеет лидера, поэтому результат None. Отдельная сводка покажет число слов, число уникальных слов и число символов исходного текста: нормализованный список и первоначальная строка отвечают на разные вопросы.",
            "Проверяй повтор с другим регистром, фрагмент только из знаков, ничью частот и пустой текст. Не начинай с большого рассказа: короткая строка\"Кот, кот! Пёс\"содержит сразу несколько важных переходов. После реализации объясни, какую информацию ты сознательно потерял при нормализации, а какую сохранил. Это обязательная часть понимания обработки данных, даже если автопроверка уже успешна."
          ],
          "examples": [
            {
              "id": "projects-text-analysis-example-2",
              "title": "Ничья требует правила",
              "code": "counts={\"пёс\":2,\"кот\":2}\nprint(sorted(counts,key=lambda word:(-counts[word],word))[0])",
              "output": "кот\n",
              "explanation": "Сначала большая частота, затем алфавит. Для ничьей выбран кот."
            }
          ],
          "goal": "Нормализовать слова и строить частотный отчёт без потери правил. Порядок выполнения.",
          "prerequisites": [
            "projects-text-analysis-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "projects-text-analysis-task-1",
          "kind": "code",
          "title": "Нормализовать слова",
          "goal": "Нормализовать слова",
          "prerequisites": [
            "projects-text-analysis"
          ],
          "prompt": "Разбей text по пробелам, очисти края каждого фрагмента от.,!?;:, приведи к нижнему регистру, пропусти пустые результаты. Внутренние знаки сохрани.",
          "inputFormat": "Реализуй words(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "words('Кот, кот! !!! Пёс')"
              ],
              "output": "['кот', 'кот', 'пёс']",
              "explanation": "Очистка, регистр, пустой фрагмент."
            },
            {
              "input": [
                "words('a-b a,b')"
              ],
              "output": "['a-b', 'a,b']",
              "explanation": "Внутренние знаки не удаляются."
            }
          ],
          "initialCode": "def words(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "words('Кот, кот! !!! Пёс')",
              "expectedValue": [
                "кот",
                "кот",
                "пёс"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Очистка, регистр, пустой фрагмент."
            },
            {
              "expression": "words('a-b a,b')",
              "expectedValue": [
                "a-b",
                "a,b"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Внутренние знаки не удаляются."
            },
            {
              "expression": "words('')",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой текст."
            }
          ],
          "reference": "def words(text):\n    result=[]\n    for part in text.split():\n        word=part.strip(\".,!?;:\").lower()\n        if word:\n            result.append(word)\n    return result",
          "alternative": "def words(text):\n    cleaned=[part.lower().strip(\".,!?;:\") for part in text.split()]\n    return [word for word in cleaned if word]",
          "wrongSolutions": [
            {
              "code": "def words(text):\n    return text.lower().split()",
              "why": "Знаки по краям остались."
            },
            {
              "code": "def words(text):\n    return [x.strip(\".,!?;:\").lower() for x in text.split()]",
              "why": "Пустые результаты очистки не пропущены."
            }
          ],
          "hints": [
            "Нормализуй каждый фрагмент после split.",
            "Пустоту проверяй после очистки.",
            "strip с набором знаков удаляет их только по краям."
          ],
          "solutionExplanation": [
            "Правило ограничено учебной моделью слова.",
            "Нельзя удалять внутренние знаки без контракта."
          ],
          "required": true
        },
        {
          "id": "projects-text-analysis-task-2",
          "kind": "code",
          "title": "Частоты нормализованных слов",
          "goal": "Частоты нормализованных слов",
          "prerequisites": [
            "projects-text-analysis"
          ],
          "prompt": "Используй правило words:split,strip(\".,!?;:\"),lower, пропуск пустых. Верни словарь частот.",
          "inputFormat": "Реализуй word_counts(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "word_counts('Кот, кот! Пёс')"
              ],
              "output": "{'кот': 2, 'пёс': 1}",
              "explanation": "Повторы разного регистра объединены."
            },
            {
              "input": [
                "word_counts('!!!')"
              ],
              "output": "{}",
              "explanation": "Нет слов."
            }
          ],
          "initialCode": "def word_counts(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "word_counts('Кот, кот! Пёс')",
              "expectedValue": {
                "кот": 2,
                "пёс": 1
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Повторы разного регистра объединены."
            },
            {
              "expression": "word_counts('!!!')",
              "expectedValue": {},
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет слов."
            },
            {
              "expression": "word_counts('a-b a-b')",
              "expectedValue": {
                "a-b": 2
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Внутренний дефис сохранён."
            }
          ],
          "reference": "def word_counts(text):\n    result={}\n    for part in text.split():\n        word=part.strip(\".,!?;:\").lower()\n        if word:\n            result[word]=result.get(word,0)+1\n    return result",
          "alternative": "def word_counts(text):\n    tokens=[p.strip(\".,!?;:\").lower() for p in text.split()]\n    tokens=[w for w in tokens if w]\n    return {word:tokens.count(word) for word in set(tokens)}",
          "wrongSolutions": [
            {
              "code": "def word_counts(text):\n    return {word:1 for word in text.lower().split()}",
              "why": "Нет очистки и накопления."
            },
            {
              "code": "def word_counts(text):\n    result={}\n    for p in text.split():\n        w=p.strip(\".,!?;:\").lower()\n        result[w]=result.get(w,0)+1\n    return result",
              "why": "Пустой токен стал ключом."
            }
          ],
          "hints": [
            "Сначала сохрани общие договорённости нормализации.",
            "Увеличивай частоту, а не присваивай 1 повторно.",
            "Пустой word не должен попасть в словарь."
          ],
          "solutionExplanation": [
            "Частоты проверяются после нормализации.",
            "Структурно иная альтернатива с count показывает тот же контракт."
          ],
          "required": true
        },
        {
          "id": "projects-text-analysis-task-3",
          "kind": "code",
          "title": "Лидер с алфавитной ничьей",
          "goal": "Лидер с алфавитной ничьей",
          "prerequisites": [
            "projects-text-analysis"
          ],
          "prompt": "counts — словарь непустая строка→положительная частота. Верни самое частое слово; при равенстве частот алфавитно первое. Для пустого словаря None.",
          "inputFormat": "Реализуй most_frequent(counts). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "most_frequent({'пёс':2,'кот':2})"
              ],
              "output": "'кот'",
              "explanation": "Ничья по алфавиту."
            },
            {
              "input": [
                "most_frequent({'a':1,'b':3})"
              ],
              "output": "'b'",
              "explanation": "Частота важнее алфавита."
            }
          ],
          "initialCode": "def most_frequent(counts):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "most_frequent({'пёс':2,'кот':2})",
              "expectedValue": "кот",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Ничья по алфавиту."
            },
            {
              "expression": "most_frequent({'a':1,'b':3})",
              "expectedValue": "b",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Частота важнее алфавита."
            },
            {
              "expression": "most_frequent({})",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Лидера нет."
            }
          ],
          "reference": "def most_frequent(counts):\n    if not counts:\n        return None\n    return sorted(counts,key=lambda word:(-counts[word],word))[0]",
          "alternative": "def most_frequent(counts):\n    best=None\n    for word in sorted(counts):\n        if best is None or counts[word]>counts[best]:\n            best=word\n    return best",
          "wrongSolutions": [
            {
              "code": "def most_frequent(counts):\n    return min(counts) if counts else None",
              "why": "Частоты не учтены."
            },
            {
              "code": "def most_frequent(counts):\n    return max(counts,key=counts.get) if counts else None",
              "why": "При ничье победит первый вставленный, а не алфавитно первый."
            }
          ],
          "hints": [
            "У сортировки два критерия.",
            "Частоту удобно сортировать по убыванию, слово по возрастанию.",
            "Для пустого набора обработай None до индекса 0."
          ],
          "solutionExplanation": [
            "Явное правило ничьи делает ответ воспроизводимым.",
            "Входной порядок не должен определять победителя."
          ],
          "required": true
        },
        {
          "id": "projects-text-analysis-task-4",
          "kind": "code",
          "title": "Сводка текста",
          "goal": "Сводка текста",
          "prerequisites": [
            "projects-text-analysis"
          ],
          "prompt": "Нормализуй слова по правилу проекта. Верни characters(len исходной строки),words(число слов),unique(число разных слов).",
          "inputFormat": "Реализуй text_report(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "text_report('Кот, кот!')"
              ],
              "output": "{'characters': 9, 'words': 2, 'unique': 1}",
              "explanation": "Знаки считаются в исходной длине, но не дают слов."
            },
            {
              "input": [
                "text_report('!!!')"
              ],
              "output": "{'characters': 3, 'words': 0, 'unique': 0}",
              "explanation": "Текст есть, слов нет."
            }
          ],
          "initialCode": "def text_report(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "text_report('Кот, кот!')",
              "expectedValue": {
                "characters": 9,
                "words": 2,
                "unique": 1
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Знаки считаются в исходной длине, но не дают слов."
            },
            {
              "expression": "text_report('!!!')",
              "expectedValue": {
                "characters": 3,
                "words": 0,
                "unique": 0
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Текст есть, слов нет."
            },
            {
              "expression": "text_report('')",
              "expectedValue": {
                "characters": 0,
                "words": 0,
                "unique": 0
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пусто."
            }
          ],
          "reference": "def text_report(text):\n    tokens=[p.strip(\".,!?;:\").lower() for p in text.split()]\n    tokens=[w for w in tokens if w]\n    return {\"characters\":len(text),\"words\":len(tokens),\"unique\":len(set(tokens))}",
          "alternative": "def text_report(text):\n    count=0\n    seen=set()\n    for part in text.split():\n        word=part.lower().strip(\".,!?;:\")\n        if word:\n            count+=1\n            seen.add(word)\n    return dict(characters=len(text),words=count,unique=len(seen))",
          "wrongSolutions": [
            {
              "code": "def text_report(text):\n    tokens=text.lower().split()\n    return dict(characters=len(text),words=len(tokens),unique=len(set(tokens)))",
              "why": "Знаки искажают слова и уникальность."
            },
            {
              "code": "def text_report(text):\n    tokens=[p.strip(\".,!?;:\").lower() for p in text.split() if p.strip(\".,!?;:\")]\n    return dict(characters=sum(map(len,tokens)),words=len(tokens),unique=len(set(tokens)))",
              "why": "Длина считается по нормализованным словам, не по исходному тексту."
            }
          ],
          "hints": [
            "Каждый счётчик смотрит на свой источник.",
            "characters нельзя получать из очищенных слов.",
            "Считай words из токенов,unique из их множества."
          ],
          "solutionExplanation": [
            "Отчёт разделяет исходные данные и нормализованное представление.",
            "Это предотвращает незаметную подмену метрик."
          ],
          "required": true
        }
      ]
    },
    {
      "id": "projects-inventory",
      "title": "Проект: склад и последовательные заявки",
      "goal": "Применять изменения состояния по контракту и показывать отказанные заявки.",
      "prerequisites": [
        "projects-text-analysis"
      ],
      "role": "project",
      "estimatedMinutes": 55,
      "steps": [
        {
          "id": "projects-inventory-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Склад — словарь товар→неотрицательный остаток. Заявка — пара (товар, количество), где количество неотрицательно. Товара может не быть: его остаток считаем 0. Заявки выполняются по порядку. Если текущего остатка достаточно, количество списывается целиком; если недостаточно, заявка отклоняется и ничего не списывает. Частичное выполнение запрещено. Это правило делает состояние понятным и не создаёт скрытых отрицательных остатков.",
            "Сначала научись проверять одну заявку, затем применяй последовательность к копии склада. Копия нужна, чтобы исходное состояние осталось доступно для сравнения. Для нулевой заявки ничего не меняется; отсутствующий товар с нулём не должен создавать новый ключ. При отказе сохрани индекс, а не только имя товара: одинаковые товары могут встречаться в нескольких событиях и иметь разные исходы."
          ],
          "examples": [
            {
              "id": "projects-inventory-example-1",
              "title": "Порядок заявок",
              "code": "stock=3\nfor requested in [2,2]:\n    accepted=requested<=stock\n    if accepted:\n        stock-=requested\n    print(accepted,stock)",
              "output": "True 1\nFalse 1\n",
              "explanation": "Вторая заявка встречает уже изменённый остаток 1.",
              "trace": {
                "headers": [
                  "Заявка",
                  "Доступно до",
                  "Результат",
                  "После"
                ],
                "rows": [
                  [
                    "2",
                    "3",
                    "принята",
                    "1"
                  ],
                  [
                    "2",
                    "1",
                    "отказ",
                    "1"
                  ]
                ]
              }
            }
          ],
          "goal": "Применять изменения состояния по контракту и показывать отказанные заявки. Задача и устройство.",
          "prerequisites": [
            "projects-text-analysis"
          ]
        },
        {
          "id": "projects-inventory-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Последовательность нельзя заменить проверкой каждой заявки по начальному складу. Для остатка 3 и двух заявок по 2 первая успешна, вторая отклоняется. Нельзя также сначала списать все, а потом вернуть отрицательные остатки к нулю: это теряет информацию о целостном отказе. Проследи состояние после каждой заявки в таблице и проверь, что ни один остаток не стал отрицательным.",
            "Отдельная задача сформирует список пополнения: для каждого товара из целевых запасов верни недостающее количество, но не включай товары, которые уже достигли цели. Это другой этап, он не изменяет склад. В финальной работе схожие идеи объединятся с CSV и JSON, но правила будут новыми, поэтому сейчас важно понять состояние, копии и порядок, а не выучить конкретный ответ."
          ],
          "examples": [
            {
              "id": "projects-inventory-example-2",
              "title": "Сколько пополнить",
              "code": "current={\"чай\":2}\ntarget={\"чай\":5,\"хлеб\":1}\nprint({name:goal-current.get(name,0) for name,goal in target.items() if current.get(name,0)<goal})",
              "output": "{'чай': 3, 'хлеб': 1}\n",
              "explanation": "Отсутствующий товар имеет остаток 0; недостача считается отдельно."
            }
          ],
          "goal": "Применять изменения состояния по контракту и показывать отказанные заявки. Порядок выполнения.",
          "prerequisites": [
            "projects-inventory-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "projects-inventory-task-1",
          "kind": "code",
          "title": "Можно ли выполнить заявку?",
          "goal": "Можно ли выполнить заявку?",
          "prerequisites": [
            "projects-inventory"
          ],
          "prompt": "stock — словарь неотрицательных остатков,quantity>=0. Верни True, если остатка имени хватает на всю заявку. Отсутствующий товар считается 0.",
          "inputFormat": "Реализуй can_fulfill(stock, name, quantity). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "can_fulfill({'a':2},'a',2)"
              ],
              "output": "True",
              "explanation": "Ровного остатка хватает."
            },
            {
              "input": [
                "can_fulfill({},'x',1)"
              ],
              "output": "False",
              "explanation": "Товар отсутствует."
            }
          ],
          "initialCode": "def can_fulfill(stock, name, quantity):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "can_fulfill({'a':2},'a',2)",
              "expectedValue": true,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Ровного остатка хватает."
            },
            {
              "expression": "can_fulfill({},'x',1)",
              "expectedValue": false,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Товар отсутствует."
            },
            {
              "expression": "can_fulfill({},'x',0)",
              "expectedValue": true,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевая заявка допустима."
            }
          ],
          "reference": "def can_fulfill(stock, name, quantity):\n    return stock.get(name,0)>=quantity",
          "alternative": "def can_fulfill(stock, name, quantity):\n    available=0\n    if name in stock:\n        available=stock[name]\n    return quantity<=available",
          "wrongSolutions": [
            {
              "code": "def can_fulfill(stock, name, quantity):\n    return stock.get(name,0)>quantity",
              "why": "Равный остаток ошибочно отвергнут."
            },
            {
              "code": "def can_fulfill(stock, name, quantity):\n    return bool(stock.get(name))",
              "why": "Не учтён размер заявки и нулевой случай."
            }
          ],
          "hints": [
            "Проверка относится к количеству, не к наличию ключа.",
            "Для отсутствующего товара используй 0.",
            "Сравни доступный остаток через>=quantity."
          ],
          "solutionExplanation": [
            "Граница равенства входит в успех.",
            "Нулевая заявка не требует существующего ключа."
          ],
          "required": true
        },
        {
          "id": "projects-inventory-task-2",
          "kind": "code",
          "title": "Применить последовательность",
          "goal": "Применить последовательность",
          "prerequisites": [
            "projects-inventory"
          ],
          "prompt": "Верни копию склада после последовательных заявок (name,quantity). Если хватает остатка, списывай целиком, иначе пропускай. Нулевая заявка ничего не создаёт. Исходный stock сохрани.",
          "inputFormat": "Реализуй apply_requests(stock, requests). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "apply_requests({'a':3},[('a',2),('a',2)])"
              ],
              "output": "{'a': 1}",
              "explanation": "Вторая заявка отклонена."
            },
            {
              "input": [
                "apply_requests({},[('x',0),('x',2)])"
              ],
              "output": "{}",
              "explanation": "Ключ не создан."
            }
          ],
          "initialCode": "def apply_requests(stock, requests):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "apply_requests({'a':3},[('a',2),('a',2)])",
              "expectedValue": {
                "a": 1
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Вторая заявка отклонена."
            },
            {
              "expression": "apply_requests({},[('x',0),('x',2)])",
              "expectedValue": {},
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Ключ не создан."
            },
            {
              "expression": "list((lambda d:(apply_requests(d,[('a',1)]),d))({'a':2}))",
              "expectedValue": [
                {
                  "a": 1
                },
                {
                  "a": 2
                }
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Исходник неизменён."
            },
            {
              "setup": "_course_input_0 = {'a': 3}\n_course_input_1 = [('a', 2), ('a', 2)]",
              "expression": "[apply_requests(_course_input_0, _course_input_1), _course_input_0 == {'a': 3} and _course_input_1 == [('a', 2), ('a', 2)]]",
              "expectedValue": [
                {
                  "a": 1
                },
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Проверяется и возвращённый результат, и сохранность входных коллекций после вызова."
            },
            {
              "setup": "_source = {}",
              "expression": "(lambda result: [result, result is not _source, _source == {}])(apply_requests(_source,[]))",
              "expectedValue": [
                {},
                true,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Результат — новый объект и вход неизменен, включая пустой и неизменяющийся случай."
            },
            {
              "setup": "_source = {'a':2}",
              "expression": "(lambda result: [result, result is not _source, _source == {'a':2}])(apply_requests(_source,[]))",
              "expectedValue": [
                {
                  "a": 2
                },
                true,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Результат — новый объект и вход неизменен, включая пустой и неизменяющийся случай."
            }
          ],
          "reference": "def apply_requests(stock, requests):\n    result=stock.copy()\n    for name,quantity in requests:\n        if quantity>0 and result.get(name,0)>=quantity:\n            result[name]-=quantity\n    return result",
          "alternative": "def apply_requests(stock, requests):\n    result=dict(stock)\n    for name,quantity in requests:\n        if quantity==0:\n            continue\n        available=result.get(name,0)\n        if available-quantity>=0:\n            result[name]=available-quantity\n    return result",
          "wrongSolutions": [
            {
              "code": "def apply_requests(stock, requests):\n    result=stock.copy()\n    for name,q in requests:\n        if stock.get(name,0)>=q:\n            result[name]=result.get(name,0)-q\n    return result",
              "why": "Каждая проверка использует исходный, ане текущий остаток."
            },
            {
              "code": "def apply_requests(stock, requests):\n    for name,q in requests:\n        if q and stock.get(name,0)>=q:\n            stock[name]-=q\n    return stock",
              "why": "Исходный словарь изменён."
            },
            {
              "code": "def apply_requests(stock, requests):\n    result=stock.copy()\n    for name,quantity in requests:\n        if quantity>0 and result.get(name,0)>=quantity:\n            result[name]-=quantity\n    return result\n_course_original = apply_requests\ndef apply_requests(*args, **kwargs):\n    result = _course_original(*args, **kwargs)\n    args[0].clear()\n    return result",
              "why": "Правильный ответ вычислен, но после вызова входная коллекция очищена, нарушая контракт сохранности."
            }
          ],
          "hints": [
            "Нужно контролировать текущее, а не начальное состояние.",
            "Создай копию один раз перед циклом.",
            "Проверяй хватку по копии и изменяй её после успеха."
          ],
          "solutionExplanation": [
            "Порядок заявок влияет на результат.",
            "Полный отказ не изменяет даже небольшой остаток."
          ],
          "required": true
        },
        {
          "id": "projects-inventory-task-3",
          "kind": "code",
          "title": "Индексы отказов",
          "goal": "Индексы отказов",
          "prerequisites": [
            "projects-inventory"
          ],
          "prompt": "Верни индексы отклонённых заявок по правилам последовательного исполнения. Успешные заявки уменьшают временную копию склада. Нулевые всегда успешны.",
          "inputFormat": "Реализуй rejected_requests(stock, requests). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "rejected_requests({'a':3},[('a',2),('a',2),('b',1)])"
              ],
              "output": "[1, 2]",
              "explanation": "Отказы после изменения состояния."
            },
            {
              "input": [
                "rejected_requests({},[('x',0)])"
              ],
              "output": "[]",
              "explanation": "Нулевая заявка успешна."
            }
          ],
          "initialCode": "def rejected_requests(stock, requests):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "rejected_requests({'a':3},[('a',2),('a',2),('b',1)])",
              "expectedValue": [
                1,
                2
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Отказы после изменения состояния."
            },
            {
              "expression": "rejected_requests({},[('x',0)])",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевая заявка успешна."
            },
            {
              "expression": "rejected_requests({},[])",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет событий."
            }
          ],
          "reference": "def rejected_requests(stock, requests):\n    current=stock.copy()\n    rejected=[]\n    for i,(name,quantity) in enumerate(requests):\n        if current.get(name,0)<quantity:\n            rejected.append(i)\n        elif quantity:\n            current[name]-=quantity\n    return rejected",
          "alternative": "def rejected_requests(stock, requests):\n    result=[]\n    available=dict(stock)\n    for i in range(len(requests)):\n        name,q=requests[i]\n        left=available.get(name,0)-q\n        if left<0:\n            result.append(i)\n        elif q>0:\n            available[name]=left\n    return result",
          "wrongSolutions": [
            {
              "code": "def rejected_requests(stock, requests):\n    return [i for i,(name,q) in enumerate(requests) if stock.get(name,0)<q]",
              "why": "Успешные предыдущие списания не учтены."
            },
            {
              "code": "def rejected_requests(stock, requests):\n    return [name for name,q in requests if stock.get(name,0)<q]",
              "why": "Нужны индексы и событийный порядок, а не имена."
            }
          ],
          "hints": [
            "Отказ можно знать только по текущему остатку.",
            "Успех тоже важен: он меняет условия следующих событий.",
            "Сохраняй индекс i только при available<quantity."
          ],
          "solutionExplanation": [
            "Диагностика повторяет точно те же правила состояния.",
            "Исходный stock остаётся доступным."
          ],
          "required": true
        },
        {
          "id": "projects-inventory-task-4",
          "kind": "code",
          "title": "План пополнения",
          "goal": "План пополнения",
          "prerequisites": [
            "projects-inventory"
          ],
          "prompt": "targets — желаемые неотрицательные остатки. Верни словарь недостач только для товаров, которым не хватает до целевого значения. Отсутствующий stock товар имеет 0. Не меняй источники.",
          "inputFormat": "Реализуй restock_plan(stock, targets). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "restock_plan({'a':2,'b':9},{'a':5,'b':5,'c':1})"
              ],
              "output": "{'a': 3, 'c': 1}",
              "explanation": "Излишек b не требует пополнения."
            },
            {
              "input": [
                "restock_plan({}, {'x':0})"
              ],
              "output": "{}",
              "explanation": "Нулевая цель уже достигнута."
            }
          ],
          "initialCode": "def restock_plan(stock, targets):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "restock_plan({'a':2,'b':9},{'a':5,'b':5,'c':1})",
              "expectedValue": {
                "a": 3,
                "c": 1
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Излишек b не требует пополнения."
            },
            {
              "expression": "restock_plan({}, {'x':0})",
              "expectedValue": {},
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевая цель уже достигнута."
            },
            {
              "expression": "restock_plan({}, {})",
              "expectedValue": {},
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет целей."
            },
            {
              "setup": "_course_input_0 = {'a': 2, 'b': 9}\n_course_input_1 = {'a': 5, 'b': 5, 'c': 1}",
              "expression": "[restock_plan(_course_input_0, _course_input_1), _course_input_0 == {'a': 2, 'b': 9} and _course_input_1 == {'a': 5, 'b': 5, 'c': 1}]",
              "expectedValue": [
                {
                  "a": 3,
                  "c": 1
                },
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Проверяется и возвращённый результат, и сохранность входных коллекций после вызова."
            }
          ],
          "reference": "def restock_plan(stock, targets):\n    return {name:target-stock.get(name,0) for name,target in targets.items() if stock.get(name,0)<target}",
          "alternative": "def restock_plan(stock, targets):\n    result={}\n    for name in targets:\n        needed=targets[name]-stock.get(name,0)\n        if needed>0:\n            result[name]=needed\n    return result",
          "wrongSolutions": [
            {
              "code": "def restock_plan(stock, targets):\n    return {name:abs(target-stock.get(name,0)) for name,target in targets.items()}",
              "why": "Излишки и нулевые потребности создают лишние заявки."
            },
            {
              "code": "def restock_plan(stock, targets):\n    return {name:target for name,target in targets.items() if stock.get(name,0)<target}",
              "why": "Возвращена цель вместо недостачи."
            },
            {
              "code": "def restock_plan(stock, targets):\n    return {name:target-stock.get(name,0) for name,target in targets.items() if stock.get(name,0)<target}\n_course_original = restock_plan\ndef restock_plan(*args, **kwargs):\n    result = _course_original(*args, **kwargs)\n    args[0].clear()\n    return result",
              "why": "Правильный ответ вычислен, но после вызова входная коллекция очищена, нарушая контракт сохранности."
            }
          ],
          "hints": [
            "Нужно добрать только разницу.",
            "Положительная недостача отбирает нужные товары.",
            "Вычисли target-stock.get(name,0) и оставь только результаты>0."
          ],
          "solutionExplanation": [
            "План не обновляет склад и не списывает излишки.",
            "Разница должна быть отдельным расчётом."
          ],
          "required": true
        }
      ]
    },
    {
      "id": "projects-scores",
      "title": "Проект: ведомость и честные показатели",
      "goal": "Учитывать вес, отсутствие данных, улучшение и одинаковые места.",
      "prerequisites": [
        "projects-inventory"
      ],
      "role": "project",
      "estimatedMinutes": 55,
      "steps": [
        {
          "id": "projects-scores-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Ведомость не должна превращать отсутствие результата в нулевой балл без правила. В проекте баллы — целые от 0 до 100, вес — неотрицательное целое. Нулевой балл является полученным результатом, а None обозначает непройденную работу. Среднее взвешенное считается только по работам с результатом: сумма балл*вес делится на сумму соответствующих весов. Если знаменатель 0, показателя нет и возвращается None.",
            "Для сравнения двух ведомостей нужны общие имена, а не совпадающие позиции строк. Один список может быть отсортирован иначе или содержать нового ученика. Разность current[name]-previous[name] имеет смысл только там, где оба результата есть. Улучшение может быть отрицательным; не применяй abs, иначе снижение превратится в рост. Это обычная числовая разность, а не оценка человека."
          ],
          "examples": [
            {
              "id": "projects-scores-example-1",
              "title": "Взвешенное среднее",
              "code": "pairs=[(80,1),(100,3)]\nprint(sum(score*weight for score,weight in pairs)/sum(weight for score,weight in pairs))",
              "output": "95.0\n",
              "explanation": "Работа с весом 3 влияет сильнее. Простое среднее дало бы 90, взвешенное 95."
            }
          ],
          "goal": "Учитывать вес, отсутствие данных, улучшение и одинаковые места. Задача и устройство.",
          "prerequisites": [
            "projects-inventory"
          ]
        },
        {
          "id": "projects-scores-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Таблица мест требует отдельного правила ничьей. Здесь используется соревновательная нумерация:90,90,80 дают места 1,1,3. При равных баллах имена упорядочиваются по алфавиту, но место остаётся общим. Индекс строки и место различаются после ничьей. Чтобы вычислить место, сравни текущий балл с предыдущим и меняй номер только при новом значении.",
            "Проверяй отсутствующие оценки, нулевой вес, нулевой балл, одинаковые результаты и пустую ведомость. Не называй эту таблицу измерением знания Python: она показывает только объявленные задания и правила расчёта. После проекта объясни, почему одинаковое среднее может возникнуть из разных наборов работ и почему полнота данных должна показываться отдельно."
          ],
          "examples": [
            {
              "id": "projects-scores-example-2",
              "title": "Нулевой балл не пропущен",
              "code": "scores=[None,0,80]\nknown=[value for value in scores if value is not None]\nprint(known)\nprint(len(known))",
              "output": "[0, 80]\n2\n",
              "explanation": "Проверка is not None сохраняет реально полученный 0."
            }
          ],
          "goal": "Учитывать вес, отсутствие данных, улучшение и одинаковые места. Порядок выполнения.",
          "prerequisites": [
            "projects-scores-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "projects-scores-task-1",
          "kind": "code",
          "title": "Среднее с весами и пропусками",
          "goal": "Среднее с весами и пропусками",
          "prerequisites": [
            "projects-scores"
          ],
          "prompt": "Списки одинаковой длины. scores содержит int 0..100 или None,weights — int>=0. Верни взвешенное среднее только известных оценок. Если сумма их весов 0,None.",
          "inputFormat": "Реализуй weighted_mean(scores, weights). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "weighted_mean([80,100],[1,3])"
              ],
              "output": "95.0",
              "explanation": "Веса учитываются."
            },
            {
              "input": [
                "weighted_mean([None,0,80],[5,1,1])"
              ],
              "output": "40.0",
              "explanation": "Пропуск исключён, нулевой балл сохранён."
            }
          ],
          "initialCode": "def weighted_mean(scores, weights):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "weighted_mean([80,100],[1,3])",
              "expectedValue": 95.0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Веса учитываются."
            },
            {
              "expression": "weighted_mean([None,0,80],[5,1,1])",
              "expectedValue": 40.0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пропуск исключён, нулевой балл сохранён."
            },
            {
              "expression": "weighted_mean([50],[0])",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет ненулевого веса."
            },
            {
              "expression": "weighted_mean([],[])",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустая ведомость."
            }
          ],
          "reference": "def weighted_mean(scores, weights):\n    total=weight_total=0\n    for score,weight in zip(scores,weights):\n        if score is not None:\n            total+=score*weight\n            weight_total+=weight\n    return total/weight_total if weight_total else None",
          "alternative": "def weighted_mean(scores, weights):\n    pairs=[(s,w) for s,w in zip(scores,weights) if s is not None]\n    denominator=sum(w for s,w in pairs)\n    return sum(s*w for s,w in pairs)/denominator if denominator else None",
          "wrongSolutions": [
            {
              "code": "def weighted_mean(scores, weights):\n    pairs=[(s,w) for s,w in zip(scores,weights) if s]\n    d=sum(w for s,w in pairs)\n    return sum(s*w for s,w in pairs)/d if d else None",
              "why": "Проверка истинности удаляет нулевой балл."
            },
            {
              "code": "def weighted_mean(scores, weights):\n    values=[s for s in scores if s is not None]\n    return sum(values)/len(values) if values else None",
              "why": "Веса игнорируются."
            }
          ],
          "hints": [
            "Отбор по None не должен изменять роль весов.",
            "Знаменатель суммирует веса только существующих результатов.",
            "Перед делением проверь сумму весов, ане сумму баллов."
          ],
          "solutionExplanation": [
            "Отсутствие и 0 разделены.",
            "Вес 0 не создаёт значения среднего."
          ],
          "required": true
        },
        {
          "id": "projects-scores-task-2",
          "kind": "code",
          "title": "Сколько работ выполнено?",
          "goal": "Сколько работ выполнено?",
          "prerequisites": [
            "projects-scores"
          ],
          "prompt": "scores — список int 0..100 или None. Верни словарь done(не None),total,all_done. Для пустого списка done=total=0,all_done=True.",
          "inputFormat": "Реализуй completion(scores). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "completion([None,0,80])"
              ],
              "output": "{'done': 2, 'total': 3, 'all_done': False}",
              "explanation": "Нулевой балл выполнен."
            },
            {
              "input": [
                "completion([])"
              ],
              "output": "{'done': 0, 'total': 0, 'all_done': True}",
              "explanation": "Нет невыполненных работ."
            }
          ],
          "initialCode": "def completion(scores):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "completion([None,0,80])",
              "expectedValue": {
                "done": 2,
                "total": 3,
                "all_done": false
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевой балл выполнен."
            },
            {
              "expression": "completion([])",
              "expectedValue": {
                "done": 0,
                "total": 0,
                "all_done": true
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет невыполненных работ."
            },
            {
              "expression": "completion([0])",
              "expectedValue": {
                "done": 1,
                "total": 1,
                "all_done": true
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Ноль непропуск."
            }
          ],
          "reference": "def completion(scores):\n    done=sum(value is not None for value in scores)\n    return {\"done\":done,\"total\":len(scores),\"all_done\":done==len(scores)}",
          "alternative": "def completion(scores):\n    missing=scores.count(None)\n    return dict(done=len(scores)-missing,total=len(scores),all_done=missing==0)",
          "wrongSolutions": [
            {
              "code": "def completion(scores):\n    done=sum(bool(v) for v in scores)\n    return dict(done=done,total=len(scores),all_done=done==len(scores))",
              "why": "Нулевые результаты не посчитаны."
            },
            {
              "code": "def completion(scores):\n    return dict(done=len(scores),total=len(scores),all_done=True)",
              "why": "Пропуски не исследованы."
            }
          ],
          "hints": [
            "Выполнение означает наличие результата, не его положительность.",
            "Считай is not None.",
            "all_done проверяет, равен ли done числу работ."
          ],
          "solutionExplanation": [
            "Полнота ведомости отдельна от среднего балла.",
            "Пустое перечисление обрабатывается явным контрактом."
          ],
          "required": true
        },
        {
          "id": "projects-scores-task-3",
          "kind": "code",
          "title": "Изменение общих результатов",
          "goal": "Изменение общих результатов",
          "prerequisites": [
            "projects-scores"
          ],
          "prompt": "Два словаря имя→балл. Верни словарь current-previous только для имён, которые есть в обоих. Снижение оставь отрицательным.",
          "inputFormat": "Реализуй score_changes(previous, current). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "score_changes({'А':70,'Б':90},{'Б':80,'А':80,'В':100})"
              ],
              "output": "{'А': 10, 'Б': -10}",
              "explanation": "Сопоставление по имени, непорядку."
            },
            {
              "input": [
                "score_changes({}, {'А':0})"
              ],
              "output": "{}",
              "explanation": "Нет общих."
            }
          ],
          "initialCode": "def score_changes(previous, current):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "score_changes({'А':70,'Б':90},{'Б':80,'А':80,'В':100})",
              "expectedValue": {
                "А": 10,
                "Б": -10
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сопоставление по имени, непорядку."
            },
            {
              "expression": "score_changes({}, {'А':0})",
              "expectedValue": {},
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет общих."
            },
            {
              "expression": "score_changes({'А':0},{'А':0})",
              "expectedValue": {
                "А": 0
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевое изменение есть в отчёте."
            }
          ],
          "reference": "def score_changes(previous, current):\n    return {name:current[name]-old for name,old in previous.items() if name in current}",
          "alternative": "def score_changes(previous, current):\n    result={}\n    for name in previous.keys() & current.keys():\n        result[name]=current[name]-previous[name]\n    return result",
          "wrongSolutions": [
            {
              "code": "def score_changes(previous, current):\n    return {name:abs(current[name]-old) for name,old in previous.items() if name in current}",
              "why": "Снижение превращается в рост."
            },
            {
              "code": "def score_changes(previous, current):\n    return {name:value-previous.get(name,0) for name,value in current.items()}",
              "why": "Новые результаты сравниваются с выдуманным нулём."
            }
          ],
          "hints": [
            "Общая запись определяется ключом.",
            "Отсутствующий старый балл нельзя подменять 0.",
            "Для пересечения ключей вычти старое из нового."
          ],
          "solutionExplanation": [
            "Соединение таблиц по идентификатору сохраняет смысл сравнения.",
            "Знак разности важен."
          ],
          "required": true
        },
        {
          "id": "projects-scores-task-4",
          "kind": "code",
          "title": "Места с общей ничьей",
          "goal": "Места с общей ничьей",
          "prerequisites": [
            "projects-scores"
          ],
          "prompt": "scores — словарь имя→целый балл. Верни список [name,rank], сначала по убыванию балла, при равенстве по имени. Места:90,90,80→1,1,3.",
          "inputFormat": "Реализуй competition_ranking(scores). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "competition_ranking({'Б':90,'А':90,'В':80})"
              ],
              "output": "[['А', 1], ['Б', 1], ['В', 3]]",
              "explanation": "Общее место и пропуск следующего номера."
            },
            {
              "input": [
                "competition_ranking({})"
              ],
              "output": "[]",
              "explanation": "Нет строк."
            }
          ],
          "initialCode": "def competition_ranking(scores):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "competition_ranking({'Б':90,'А':90,'В':80})",
              "expectedValue": [
                [
                  "А",
                  1
                ],
                [
                  "Б",
                  1
                ],
                [
                  "В",
                  3
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Общее место и пропуск следующего номера."
            },
            {
              "expression": "competition_ranking({})",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет строк."
            },
            {
              "expression": "competition_ranking({'X':0})",
              "expectedValue": [
                [
                  "X",
                  1
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Ноль тоже участвует."
            }
          ],
          "reference": "def competition_ranking(scores):\n    names=sorted(scores,key=lambda n:(-scores[n],n))\n    result=[]\n    rank=0\n    previous=None\n    for i,name in enumerate(names):\n        if i==0 or scores[name]!=previous:\n            rank=i+1\n        result.append([name,rank])\n        previous=scores[name]\n    return result",
          "alternative": "def competition_ranking(scores):\n    names=sorted(scores,key=lambda n:(-scores[n],n))\n    return [[name,1+sum(value>scores[name] for value in scores.values())] for name in names]",
          "wrongSolutions": [
            {
              "code": "def competition_ranking(scores):\n    names=sorted(scores,key=lambda n:(-scores[n],n))\n    return [[name,i+1] for i,name in enumerate(names)]",
              "why": "Равные баллы получают разные места."
            },
            {
              "code": "def competition_ranking(scores):\n    values=sorted(set(scores.values()),reverse=True)\n    return [[n,values.index(scores[n])+1] for n in sorted(scores,key=lambda n:(-scores[n],n))]",
              "why": "Плотная нумерация даёт третьему место 2 вместо 3."
            }
          ],
          "hints": [
            "Сначала определи устойчивый порядок строк.",
            "Место меняется только при изменении балла.",
            "Новое место равно текущему индексу+1, не предыдущему месту+1."
          ],
          "solutionExplanation": [
            "Индекс и рейтинг неравны при равенстве частот.",
            "Альтернатива считает число участников строго выше."
          ],
          "required": true
        }
      ]
    },
    {
      "id": "projects-identifiers",
      "title": "Проект: проверка и уникальность кодов",
      "goal": "Нормализовать идентификатор и отличать неверную запись от повторной.",
      "prerequisites": [
        "projects-scores"
      ],
      "role": "project",
      "estimatedMinutes": 55,
      "steps": [
        {
          "id": "projects-identifiers-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Учебный идентификатор содержит от 3 до 8 символов ASCII: латинские буквы и цифры. Внешние пробелы удаляются, регистр приводится к верхнему. Это не проверка пароля и не персональные данные. Сначала нужно получить нормальную форму, затем проверить допустимость, затем сравнивать уникальность. Сравнение до нормализации ошибочно считает\"ab1\"и\" AB1 \"разными кодами.",
            "Встроенный isalnum принимает буквы и цифры не только ASCII. Поэтому для объявленного формата проверяй каждый символ по явному набору ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789. Одного isalnum недостаточно для кириллического А, визуально похожего на латинское A. Это ограничение задачи, а не суждение о качестве языка или имени."
          ],
          "examples": [
            {
              "id": "projects-identifiers-example-1",
              "title": "Нормальная форма",
              "code": "for raw in [\"ab1\",\" AB1 \",\"A B1\"]:\n    print(raw.strip().upper())",
              "output": "AB1\nAB1\nA B1\n",
              "explanation": "Внешние пробелы удаляются, внутренний пробел остаётся и должен быть проверен."
            }
          ],
          "goal": "Нормализовать идентификатор и отличать неверную запись от повторной. Задача и устройство.",
          "prerequisites": [
            "projects-scores"
          ]
        },
        {
          "id": "projects-identifiers-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "При пакетной обработке первая допустимая запись с кодом принимается, последующие такие же считаются повторами. Неверный код не занимает место и не блокирует будущую допустимую запись. Список принятых индексов сохраняет исходный порядок. Причины ошибки фиксируются отдельно:invalid для нарушения формата,duplicate для повтора после нормализации.",
            "Проверь нижнюю и верхнюю границу длины, внешние пробелы, кириллицу, знак подчёркивания и повтор с разным регистром. Не удаляй внутренние пробелы, чтобы сделать неверный код верным: условие требует strip только по краям. После проекта объясни, почему нормализация должна быть общей для всех этапов и почему проверка одинаковых строк недостаточна."
          ],
          "examples": [
            {
              "id": "projects-identifiers-example-2",
              "title": "ASCII и более широкий isalnum",
              "code": "print(\"А12\".isalnum())\nprint(all(c in \"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\" for c in \"А12\"))",
              "output": "True\nFalse\n",
              "explanation": "Кириллическая А проходит isalnum, но необъявленный ASCII набор."
            }
          ],
          "goal": "Нормализовать идентификатор и отличать неверную запись от повторной. Порядок выполнения.",
          "prerequisites": [
            "projects-identifiers-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "projects-identifiers-task-1",
          "kind": "code",
          "title": "Нормальная форма кода",
          "goal": "Нормальная форма кода",
          "prerequisites": [
            "projects-identifiers"
          ],
          "prompt": "Верни raw.strip().upper(). Удаляй только внешние пробелы, внутренние сохраняй.",
          "inputFormat": "Реализуй normalize_code(raw). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "normalize_code(' ab1 ')"
              ],
              "output": "'AB1'",
              "explanation": "Нормальная форма."
            },
            {
              "input": [
                "normalize_code('a b')"
              ],
              "output": "'A B'",
              "explanation": "Внутренний пробел сохранён."
            }
          ],
          "initialCode": "def normalize_code(raw):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "normalize_code(' ab1 ')",
              "expectedValue": "AB1",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нормальная форма."
            },
            {
              "expression": "normalize_code('a b')",
              "expectedValue": "A B",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Внутренний пробел сохранён."
            },
            {
              "expression": "normalize_code('')",
              "expectedValue": "",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустая входная строка."
            }
          ],
          "reference": "def normalize_code(raw):\n    return raw.strip().upper()",
          "alternative": "def normalize_code(raw):\n    cleaned=raw.strip()\n    return \"\".join(ch.upper() for ch in cleaned)",
          "wrongSolutions": [
            {
              "code": "def normalize_code(raw):\n    return raw.upper()",
              "why": "Внешние пробелы не удалены."
            },
            {
              "code": "def normalize_code(raw):\n    return \"\".join(raw.split()).upper()",
              "why": "Внутренние пробелы удалены без разрешения."
            }
          ],
          "hints": [
            "Очистка краёв неравна удалению всех пробелов.",
            "Понадобятся два строковых метода.",
            "Вызови strip, затем upper."
          ],
          "solutionExplanation": [
            "Нормальная форма позволяет сравнивать эквивалентные записи.",
            "Она ещё не гарантирует допустимость кода."
          ],
          "required": true
        },
        {
          "id": "projects-identifiers-task-2",
          "kind": "code",
          "title": "Допустимый ASCII-код",
          "goal": "Допустимый ASCII-код",
          "prerequisites": [
            "projects-identifiers"
          ],
          "prompt": "Сначала нормализуй strip+upper. Верни True только для 3..8 символов из ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.",
          "inputFormat": "Реализуй valid_code(raw). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "valid_code(' ab1 ')"
              ],
              "output": "True",
              "explanation": "Допустим после нормализации."
            },
            {
              "input": [
                "valid_code('А12')"
              ],
              "output": "False",
              "explanation": "Первая буква кириллическая."
            }
          ],
          "initialCode": "def valid_code(raw):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "valid_code(' ab1 ')",
              "expectedValue": true,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Допустим после нормализации."
            },
            {
              "expression": "valid_code('А12')",
              "expectedValue": false,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Первая буква кириллическая."
            },
            {
              "expression": "valid_code('ab')",
              "expectedValue": false,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Слишком коротко."
            },
            {
              "expression": "valid_code('ABCDEFGHI')",
              "expectedValue": false,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Слишком длинно."
            },
            {
              "expression": "valid_code('A_B')",
              "expectedValue": false,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Подчёркивание в не набора."
            }
          ],
          "reference": "def valid_code(raw):\n    value=raw.strip().upper()\n    return 3<=len(value)<=8 and all(c in \"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\" for c in value)",
          "alternative": "def valid_code(raw):\n    value=raw.strip().upper()\n    allowed=set(\"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\")\n    return len(value) in range(3,9) and set(value)<=allowed",
          "wrongSolutions": [
            {
              "code": "def valid_code(raw):\n    return 3<=len(raw.strip())<=8 and raw.strip().isalnum()",
              "why": "isalnum принимает неразрешённую кириллицу."
            },
            {
              "code": "def valid_code(raw):\n    value=raw.strip().upper()\n    return 3<len(value)<8 and all(c in \"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\" for c in value)",
              "why": "Границы 3 и 8 ошибочно исключены."
            }
          ],
          "hints": [
            "Ограничения типа символа и длины проверяются отдельно.",
            "isalnum шире объявленного ASCII.",
            "Используй all принадлежности явному набору и лежащую в 3..8 длину."
          ],
          "solutionExplanation": [
            "Проверка опирается на объявленный алфавит.",
            "Визуально схожие символы не являются одним символом."
          ],
          "required": true
        },
        {
          "id": "projects-identifiers-task-3",
          "kind": "code",
          "title": "Принятые индексы регистрации",
          "goal": "Принятые индексы регистрации",
          "prerequisites": [
            "projects-identifiers"
          ],
          "prompt": "Примени нормализацию и правила ASCII 3..8. Верни индексы первых допустимых уникальных кодов. Последующие нормализованные повторы и недопустимые пропусти.",
          "inputFormat": "Реализуй accepted_codes(raw_codes). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "accepted_codes(['ab1',' AB1 ','А12','xy9'])"
              ],
              "output": "[0, 3]",
              "explanation": "Повторы и кириллица не приняты."
            },
            {
              "input": [
                "accepted_codes(['x','a_b'])"
              ],
              "output": "[]",
              "explanation": "Ничего недопустимо."
            }
          ],
          "initialCode": "def accepted_codes(raw_codes):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "accepted_codes(['ab1',' AB1 ','А12','xy9'])",
              "expectedValue": [
                0,
                3
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Повторы и кириллица не приняты."
            },
            {
              "expression": "accepted_codes(['x','a_b'])",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Ничего недопустимо."
            },
            {
              "expression": "accepted_codes([])",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой пакет."
            }
          ],
          "reference": "def accepted_codes(raw_codes):\n    seen=set()\n    result=[]\n    allowed=set(\"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\")\n    for i,raw in enumerate(raw_codes):\n        code=raw.strip().upper()\n        if 3<=len(code)<=8 and set(code)<=allowed and code not in seen:\n            seen.add(code)\n            result.append(i)\n    return result",
          "alternative": "def accepted_codes(raw_codes):\n    result=[]\n    codes=[]\n    for i,raw in enumerate(raw_codes):\n        value=raw.strip().upper()\n        valid=3<=len(value)<=8 and all(ch in \"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\" for ch in value)\n        if valid and value not in codes:\n            codes.append(value)\n            result.append(i)\n    return result",
          "wrongSolutions": [
            {
              "code": "def accepted_codes(raw_codes):\n    return list(range(len(set(raw_codes))))",
              "why": "Потеряны индексы, нормализация и проверка."
            },
            {
              "code": "def accepted_codes(raw_codes):\n    seen=set()\n    result=[]\n    for i,raw in enumerate(raw_codes):\n        if raw not in seen:\n            seen.add(raw)\n            result.append(i)\n    return result",
              "why": "Уникальность проверяется до допустимости и очистки."
            }
          ],
          "hints": [
            "Сначала получи нормальную форму.",
            "Только допустимый новый код добавляется в seen.",
            "Индекс добавляется одновременно с первым принятым кодом."
          ],
          "solutionExplanation": [
            "Принятие зависит от формата и истории предыдущих принятий.",
            "Исходные индексы не тоже самое, что нумерация результатов."
          ],
          "required": true
        },
        {
          "id": "projects-identifiers-task-4",
          "kind": "code",
          "title": "Причины отказа регистрации",
          "goal": "Причины отказа регистрации",
          "prerequisites": [
            "projects-identifiers"
          ],
          "prompt": "Верни словарь ключ строковый индекс→\"invalid\"или\"duplicate\"для каждого не принятого кода. Правила ASCII 3..8,strip+upper. Недопустимость проверяется раньше уникальности.",
          "inputFormat": "Реализуй registration_errors(raw_codes). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "registration_errors(['ab1',' AB1 ','А12','x'])"
              ],
              "output": "{'1': 'duplicate', '2': 'invalid', '3': 'invalid'}",
              "explanation": "Разные причины отказа."
            },
            {
              "input": [
                "registration_errors(['ABC','DEF'])"
              ],
              "output": "{}",
              "explanation": "Все приняты."
            }
          ],
          "initialCode": "def registration_errors(raw_codes):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "registration_errors(['ab1',' AB1 ','А12','x'])",
              "expectedValue": {
                "1": "duplicate",
                "2": "invalid",
                "3": "invalid"
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Разные причины отказа."
            },
            {
              "expression": "registration_errors(['ABC','DEF'])",
              "expectedValue": {},
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Все приняты."
            },
            {
              "expression": "registration_errors([])",
              "expectedValue": {},
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой пакет."
            }
          ],
          "reference": "def registration_errors(raw_codes):\n    seen=set()\n    errors={}\n    for i,raw in enumerate(raw_codes):\n        value=raw.strip().upper()\n        valid=3<=len(value)<=8 and all(c in \"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\" for c in value)\n        if not valid:\n            errors[str(i)]=\"invalid\"\n        elif value in seen:\n            errors[str(i)]=\"duplicate\"\n        else:\n            seen.add(value)\n    return errors",
          "alternative": "def registration_errors(raw_codes):\n    accepted=[]\n    errors={}\n    allowed=set(\"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\")\n    for i,raw in enumerate(raw_codes):\n        code=raw.strip().upper()\n        if len(code)<3 or len(code)>8 or not set(code)<=allowed:\n            errors[str(i)]=\"invalid\"\n        elif code in accepted:\n            errors[str(i)]=\"duplicate\"\n        else:\n            accepted.append(code)\n    return errors",
          "wrongSolutions": [
            {
              "code": "def registration_errors(raw_codes):\n    return {str(i):\"invalid\" for i,raw in enumerate(raw_codes) if not raw}",
              "why": "Недопустимые форматы и повторы не обнаружены."
            },
            {
              "code": "def registration_errors(raw_codes):\n    seen=set()\n    errors={}\n    for i,raw in enumerate(raw_codes):\n        code=raw.strip().upper()\n        if code in seen:\n            errors[str(i)]=\"duplicate\"\n        seen.add(code)\n    return errors",
              "why": "Формат не проверен, неверные коды занимают seen."
            }
          ],
          "hints": [
            "Приоритет причин задан условием.",
            "Недопустимость не должна добавлять код в seen.",
            "Используй ifnotvalid/elif в seen/else принять."
          ],
          "solutionExplanation": [
            "Отчёт объясняет причину, ане только показывает число отказов.",
            "Строковые ключи индекса удобны для последующ ег oJSON."
          ],
          "required": true
        }
      ]
    },
    {
      "id": "projects-schedule",
      "title": "Проект: интервалы и свободное время",
      "goal": "Объединять занятые интервалы и находить свободный участок.",
      "prerequisites": [
        "projects-identifiers"
      ],
      "role": "project",
      "estimatedMinutes": 55,
      "steps": [
        {
          "id": "projects-schedule-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Время в проекте измеряется целыми минутами от начала условного дня. Интервал [start,end) включает начало и не включает конец. Поэтому занятия [10,20) и [20,30) не пересекаются, но их можно объединить в непрерывный занятый участок. Все интервалы положительной длины, лежат в пределах дня. Здесь нет дат, часовых поясов и перехода на зимнее время: это отдельные задачи, которые нельзя скрывать в простом числовом контракте.",
            "Длина пересечения двух интервалов равна max(0,min(end)-max(start)). Для объединения многих интервалов сначала отсортируй копию по начальной границе. Храни последний объединённый участок. Если следующий начинается не позже его конца, расширь конец максимумом двух концов; иначе добавь новый участок. Для вложенного интервала [12,15) внутри [10,20) конец не должен сократиться."
          ],
          "examples": [
            {
              "id": "projects-schedule-example-1",
              "title": "Касание не даёт пересечения",
              "code": "a=(10,20)\nb=(20,30)\nprint(max(0,min(a[1],b[1])-max(a[0],b[0])))",
              "output": "0\n",
              "explanation": "Конец первого исключён; общих минут нет."
            }
          ],
          "goal": "Объединять занятые интервалы и находить свободный участок. Задача и устройство.",
          "prerequisites": [
            "projects-identifiers"
          ]
        },
        {
          "id": "projects-schedule-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Сумма длин исходных интервалов завышает занятость, если они пересекаются. Поэтому свободное время равно длине дня минус сумма длин объединённых участков. Для поиска места занятия длиной duration двигай курсор с 0 через объединённые участки. Если разрыв до очередного начала достаточен, найден самый ранний старт. После последнего участка нужно проверить хвост дня.",
            "Сначала реши пересечение, затем объединение и только потом расчёт свободного времени. Проверяй касание концов, вложенность, несортированный вход, пустое расписание и свободное место ровно нужной длины. Не изменяй список пользователя: программа может строить по нему другой отчёт. Умение объяснить изменение курсора важнее записи алгоритма в одну строку."
          ],
          "examples": [
            {
              "id": "projects-schedule-example-2",
              "title": "Вложенный участок не расширяет занятость",
              "code": "current=[10,20]\nnext_interval=[12,15]\ncurrent[1]=max(current[1],next_interval[1])\nprint(current)",
              "output": "[10, 20]\n",
              "explanation": "Максимум сохраняет конец 20, а не уменьшает его 15."
            }
          ],
          "goal": "Объединять занятые интервалы и находить свободный участок. Порядок выполнения.",
          "prerequisites": [
            "projects-schedule-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "projects-schedule-task-1",
          "kind": "code",
          "title": "Длина пересечения",
          "goal": "Длина пересечения",
          "prerequisites": [
            "projects-schedule"
          ],
          "prompt": "a и b — пары (start,end),start<end. Верни число общих минут полуоткрытых интервалов. Касание концов даёт 0.",
          "inputFormat": "Реализуй overlap(a, b). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "overlap((10,20),(15,25))"
              ],
              "output": "5",
              "explanation": "Общий участок 15..20."
            },
            {
              "input": [
                "overlap((10,20),(20,30))"
              ],
              "output": "0",
              "explanation": "Только касание."
            }
          ],
          "initialCode": "def overlap(a, b):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "overlap((10,20),(15,25))",
              "expectedValue": 5,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Общий участок 15..20."
            },
            {
              "expression": "overlap((10,20),(20,30))",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Только касание."
            },
            {
              "expression": "overlap((10,30),(12,15))",
              "expectedValue": 3,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Вложенный интервал."
            },
            {
              "expression": "overlap((0,2),(5,8))",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Раздельные интервалы не дают отрицательную длину."
            }
          ],
          "reference": "def overlap(a, b):\n    return max(0,min(a[1],b[1])-max(a[0],b[0]))",
          "alternative": "def overlap(a, b):\n    left=max(a[0],b[0])\n    right=min(a[1],b[1])\n    if right<=left:\n        return 0\n    return right-left",
          "wrongSolutions": [
            {
              "code": "def overlap(a, b):\n    return min(a[1],b[1])-max(a[0],b[0])",
              "why": "Раздельные интервалы могут дать отрицательную длину."
            },
            {
              "code": "def overlap(a, b):\n    return max(a[1],b[1])-min(a[0],b[0])",
              "why": "Получена длина охватывающего участка, а не пересечения."
            }
          ],
          "hints": [
            "Нужно позднее начало и ранний конец.",
            "Если конец не позже начала, общих минут нет.",
            "Ограничь разность снизу нулём."
          ],
          "solutionExplanation": [
            "Полуоткрытый контракт обрабатывает касание без дополнительной минуты.",
            "Вложенность проверяет выбор нужных границ."
          ],
          "required": true
        },
        {
          "id": "projects-schedule-task-2",
          "kind": "code",
          "title": "Объединить занятые участки",
          "goal": "Объединить занятые участки",
          "prerequisites": [
            "projects-schedule"
          ],
          "prompt": "Верни новый список списков [start,end] по возрастанию начала. Пересечения и касающиеся концы объединяй. Все интервалы положительной длины. Вход не меняй.",
          "inputFormat": "Реализуй merge_intervals(intervals). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "merge_intervals([(20,30),(10,20),(12,15),(40,50)])"
              ],
              "output": "[[10, 30], [40, 50]]",
              "explanation": "Сортировка, касание и вложенность."
            },
            {
              "input": [
                "merge_intervals([])"
              ],
              "output": "[]",
              "explanation": "Пусто."
            }
          ],
          "initialCode": "def merge_intervals(intervals):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "merge_intervals([(20,30),(10,20),(12,15),(40,50)])",
              "expectedValue": [
                [
                  10,
                  30
                ],
                [
                  40,
                  50
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сортировка, касание и вложенность."
            },
            {
              "expression": "merge_intervals([])",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пусто."
            },
            {
              "expression": "list((lambda a:(merge_intervals(a),a))([[3,5],[0,2]]))",
              "expectedValue": [
                [
                  [
                    0,
                    2
                  ],
                  [
                    3,
                    5
                  ]
                ],
                [
                  [
                    3,
                    5
                  ],
                  [
                    0,
                    2
                  ]
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Исходный порядок сохранён."
            },
            {
              "setup": "_course_input_0 = [(20, 30), (10, 20), (12, 15), (40, 50)]",
              "expression": "[merge_intervals(_course_input_0), _course_input_0 == [(20, 30), (10, 20), (12, 15), (40, 50)]]",
              "expectedValue": [
                [
                  [
                    10,
                    30
                  ],
                  [
                    40,
                    50
                  ]
                ],
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Проверяется и возвращённый результат, и сохранность входных коллекций после вызова."
            },
            {
              "setup": "_source = []",
              "expression": "(lambda result: [result, result is not _source, _source == []])(merge_intervals(_source))",
              "expectedValue": [
                [],
                true,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Результат — новый объект и вход неизменен, включая пустой и неизменяющийся случай."
            }
          ],
          "reference": "def merge_intervals(intervals):\n    result=[]\n    for start,end in sorted(intervals):\n        if result and start<=result[-1][1]:\n            result[-1][1]=max(result[-1][1],end)\n        else:\n            result.append([start,end])\n    return result",
          "alternative": "def merge_intervals(intervals):\n    ordered=sorted(intervals)\n    if not ordered:\n        return []\n    start,end=ordered[0]\n    result=[]\n    for left,right in ordered[1:]:\n        if left<=end:\n            end=max(end,right)\n        else:\n            result.append([start,end])\n            start,end=left,right\n    result.append([start,end])\n    return result",
          "wrongSolutions": [
            {
              "code": "def merge_intervals(intervals):\n    result=[]\n    for a,b in sorted(intervals):\n        if result and a<=result[-1][1]:\n            result[-1][1]=b\n        else:\n            result.append([a,b])\n    return result",
              "why": "Вложенный интервал ошибочно сокращает конец."
            },
            {
              "code": "def merge_intervals(intervals):\n    return [list(x) for x in sorted(intervals)]",
              "why": "Сортировка ещё не объединяет пересечения."
            },
            {
              "code": "def merge_intervals(intervals):\n    result=[]\n    for start,end in sorted(intervals):\n        if result and start<=result[-1][1]:\n            result[-1][1]=max(result[-1][1],end)\n        else:\n            result.append([start,end])\n    return result\n_course_original = merge_intervals\ndef merge_intervals(*args, **kwargs):\n    result = _course_original(*args, **kwargs)\n    args[0].clear()\n    return result",
              "why": "Правильный ответ вычислен, но после вызова входная коллекция очищена, нарушая контракт сохранности."
            }
          ],
          "hints": [
            "Сначала упорядочи копию входа.",
            "Сравнивай следующий участок с последним результатом.",
            "При пересечении конец становится max двух концов."
          ],
          "solutionExplanation": [
            "Сортировка позволяет рассматривать только последний объединённый участок.",
            "Новый список пар не делит изменяемые строки результата с входом."
          ],
          "required": true
        },
        {
          "id": "projects-schedule-task-3",
          "kind": "code",
          "title": "Свободные минуты дня",
          "goal": "Свободные минуты дня",
          "prerequisites": [
            "projects-schedule"
          ],
          "prompt": "Все интервалы в [0,day_end], положительной длины. Верни общее свободное время, не вычитая перекрытия дважды.day_end>=0.",
          "inputFormat": "Реализуй free_minutes(intervals, day_end). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту. day_end — целое от 0 до 1440, все границы — целые внутри дня.",
          "examples": [
            {
              "input": [
                "free_minutes([(1,5),(3,7)],10)"
              ],
              "output": "4",
              "explanation": "Занято 6, не 8."
            },
            {
              "input": [
                "free_minutes([],10)"
              ],
              "output": "10",
              "explanation": "День свободен."
            }
          ],
          "initialCode": "def free_minutes(intervals, day_end):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "free_minutes([(1,5),(3,7)],10)",
              "expectedValue": 4,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Занято 6, не 8."
            },
            {
              "expression": "free_minutes([],10)",
              "expectedValue": 10,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "День свободен."
            },
            {
              "expression": "free_minutes([(0,10)],10)",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Всё занято."
            }
          ],
          "reference": "def free_minutes(intervals, day_end):\n    busy=0\n    end=0\n    for left,right in sorted(intervals):\n        busy+=max(0,right-max(left,end))\n        end=max(end,right)\n    return day_end-busy",
          "alternative": "def free_minutes(intervals, day_end):\n    occupied=set()\n    for left,right in intervals:\n        occupied.update(range(left,right))\n    return day_end-len(occupied)",
          "wrongSolutions": [
            {
              "code": "def free_minutes(intervals, day_end):\n    return day_end-sum(b-a for a,b in intervals)",
              "why": "Пересечение посчитано дважды."
            },
            {
              "code": "def free_minutes(intervals, day_end):\n    return sum(b-a for a,b in intervals)",
              "why": "Возвращено занятое время вместо свободного."
            }
          ],
          "hints": [
            "Сумма сырых длинне учитывает пересечения.",
            "Рассматривай только ещё неучтённую часть интервала.",
            "Или объедини участки, или считай множество целых занятых минут."
          ],
          "solutionExplanation": [
            "В этой модели границы целые, поэтому множество минут — корректная простая альтернатива.",
            "Для больших данных предпочтительнее проход по отсортированным границам."
          ],
          "required": true
        },
        {
          "id": "projects-schedule-task-4",
          "kind": "code",
          "title": "Самое раннее место занятия",
          "goal": "Самое раннее место занятия",
          "prerequisites": [
            "projects-schedule"
          ],
          "prompt": "Интервалы в 0..day_end, могут пересекаться.duration>0. Верни наименьшую минуту старта в свободном участке длиной duration или None.",
          "inputFormat": "Реализуй earliest_slot(intervals, day_end, duration). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту. day_end — целое от 0 до 1440, duration — целое от 1 до 1440.",
          "examples": [
            {
              "input": [
                "earliest_slot([(2,5),(7,9)],12,2)"
              ],
              "output": "0",
              "explanation": "Самое раннее место вначале."
            },
            {
              "input": [
                "earliest_slot([(0,3),(5,8)],10,2)"
              ],
              "output": "3",
              "explanation": "Ровный разрыв между занятиями."
            }
          ],
          "initialCode": "def earliest_slot(intervals, day_end, duration):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "earliest_slot([(2,5),(7,9)],12,2)",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Самое раннее место вначале."
            },
            {
              "expression": "earliest_slot([(0,3),(5,8)],10,2)",
              "expectedValue": 3,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Ровный разрыв между занятиями."
            },
            {
              "expression": "earliest_slot([(0,9)],10,2)",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Хвоста нехватает."
            },
            {
              "expression": "earliest_slot([],5,5)",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Целый свободный день."
            }
          ],
          "reference": "def earliest_slot(intervals, day_end, duration):\n    cursor=0\n    for start,end in sorted(intervals):\n        if start-cursor>=duration:\n            return cursor\n        cursor=max(cursor,end)\n    return cursor if day_end-cursor>=duration else None",
          "alternative": "def earliest_slot(intervals, day_end, duration):\n    for candidate in range(day_end-duration+1):\n        if all(candidate+duration<=left or candidate>=right for left,right in intervals):\n            return candidate\n    return None",
          "wrongSolutions": [
            {
              "code": "def earliest_slot(intervals, day_end, duration):\n    end=max((b for a,b in intervals),default=0)\n    return end if end+duration<=day_end else None",
              "why": "Пропущены свободные места вначале и между занятиями."
            },
            {
              "code": "def earliest_slot(intervals, day_end, duration):\n    cursor=0\n    for a,b in sorted(intervals):\n        if a-cursor>duration:\n            return cursor\n        cursor=max(cursor,b)\n    return cursor if day_end-cursor>duration else None",
              "why": "Ровное достаточное время отвергнуто."
            }
          ],
          "hints": [
            "Двигай границу уже просмотренного занятого участка.",
            "Проверь разрыв до текущего интервала и хвост после всех.",
            "Достаточность выражается>=duration."
          ],
          "solutionExplanation": [
            "Курсор никогда не движется назад при вложенности.",
            "Перебор каждого возможного старта — простая альтернатива для малого дня."
          ],
          "required": true
        }
      ]
    },
    {
      "id": "projects-logs",
      "title": "Проект: журнал сообщений",
      "goal": "Разбирать строки, различать уровни и считать непрерывные серии.",
      "prerequisites": [
        "projects-schedule"
      ],
      "role": "project",
      "estimatedMinutes": 55,
      "steps": [
        {
          "id": "projects-logs-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Учебный журнал содержит записи level|message. Разрешённые уровни INFO,WARN,ERROR. Внешние пробелы в уровне удаляются, регистр приводится к верхнему. Сообщение сохраняется точно после первого|, включая дополнительные разделители. Строки без разделителя или с неизвестным уровнем не участвуют в отчёте. Такое ограничение позволяет разбирать данные без регулярных выражений.",
            "При разборе не очищай сообщение тем же strip, что и уровень: его отступы могут быть важны. Используй split(\"|\",1) или partition. После этого проверь уровень по набору. Неправильную строку нельзя тихо превратить в INFO, иначе последующий счётчик исказится. Отдельная задача сохраняет номера неверных физических строк с нумерацией от 1, чтобы человек мог найти их в источнике."
          ],
          "examples": [
            {
              "id": "projects-logs-example-1",
              "title": "Разделяем только первый символ",
              "code": "line=\" error |a|b\"\nlevel,_,message=line.partition(\"|\")\nprint(level.strip().upper())\nprint(message)",
              "output": "ERROR\na|b\n",
              "explanation": "Дополнительный|остаётся частью сообщения."
            }
          ],
          "goal": "Разбирать строки, различать уровни и считать непрерывные серии. Задача и устройство.",
          "prerequisites": [
            "projects-schedule"
          ]
        },
        {
          "id": "projects-logs-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Число ошибок с общим уровнем ERROR не равно длине максимальной непрерывной серии. Последовательность ERROR,INFO,ERROR содержит две ошибки, но лучшая серия имеет длину 1. Храни два состояния: длину текущей серии и максимальную длину. При другом уровне текущая сбрасывается в 0. Для пустого журнала оба нулевые.",
            "В отчёте всегда показывай три счётчика уровней, даже если некоторые равны 0. Последнее сообщение ERROR возвращается отдельно, а его отсутствие — None. Проверяй пустое сообщение\"ERROR|\": это настоящая ошибка с пустым текстом, а не отсутствие ошибки. Проект закрепляет различие формата, состояния и показателей без подключения к настоящему серверному журналу."
          ],
          "examples": [
            {
              "id": "projects-logs-example-2",
              "title": "Серия и общее количество",
              "code": "levels=[\"ERROR\",\"ERROR\",\"INFO\",\"ERROR\"]\ncurrent=best=0\nfor level in levels:\n    current=current+1 if level==\"ERROR\" else 0\n    best=max(best,current)\nprint(levels.count(\"ERROR\"),best)",
              "output": "3 2\n",
              "explanation": "Всего 3 ошибки, максимальная серия 2."
            }
          ],
          "goal": "Разбирать строки, различать уровни и считать непрерывные серии. Порядок выполнения.",
          "prerequisites": [
            "projects-logs-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "projects-logs-task-1",
          "kind": "code",
          "title": "Разобрать журнал сообщений",
          "goal": "Разобрать журнал сообщений",
          "prerequisites": [
            "projects-logs"
          ],
          "prompt": "Для каждой физической строки text раздели первый|. Уровень strip+upper, допустимы INFO/WARN/ERROR. Верни список [level,message]. Неверные строки пропусти; сообщение сохрани без strip.",
          "inputFormat": "Реализуй parse_log(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "parse_log(' info | ok \\nbad\\nERROR|a|b')"
              ],
              "output": "[['INFO', ' ok '], ['ERROR', 'a|b']]",
              "explanation": "Нормализован только уровень."
            },
            {
              "input": [
                "parse_log('OTHER|x\\nERROR|')"
              ],
              "output": "[['ERROR', '']]",
              "explanation": "Пустое сообщение допустимо."
            }
          ],
          "initialCode": "def parse_log(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "parse_log(' info | ok \\nbad\\nERROR|a|b')",
              "expectedValue": [
                [
                  "INFO",
                  " ok "
                ],
                [
                  "ERROR",
                  "a|b"
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нормализован только уровень."
            },
            {
              "expression": "parse_log('OTHER|x\\nERROR|')",
              "expectedValue": [
                [
                  "ERROR",
                  ""
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустое сообщение допустимо."
            },
            {
              "expression": "parse_log('')",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой журнал."
            }
          ],
          "reference": "def parse_log(text):\n    result=[]\n    for line in text.splitlines():\n        level,separator,message=line.partition(\"|\")\n        level=level.strip().upper()\n        if separator and level in {\"INFO\",\"WARN\",\"ERROR\"}:\n            result.append([level,message])\n    return result",
          "alternative": "def parse_log(text):\n    result=[]\n    for line in text.splitlines():\n        if \"|\" not in line:\n            continue\n        parts=line.split(\"|\",1)\n        level=parts[0].strip().upper()\n        if level in (\"INFO\",\"WARN\",\"ERROR\"):\n            result.append([level,parts[1]])\n    return result",
          "wrongSolutions": [
            {
              "code": "def parse_log(text):\n    return [line.split(\"|\") for line in text.splitlines()]",
              "why": "Неверные строки и нескольк o разделителей разобраны без контракта."
            },
            {
              "code": "def parse_log(text):\n    result=[]\n    for line in text.splitlines():\n        a,_,b=line.partition(\"|\")\n        if a.strip().upper() in {\"INFO\",\"WARN\",\"ERROR\"}:\n            result.append([a.strip().upper(),b.strip()])\n    return result",
              "why": "Сообщение очищено без разрешения, наличие разделителя не проверено."
            }
          ],
          "hints": [
            "Первый разделитель имеет структурный смысл.",
            "Проверяй наличие|и допустимый уровень.",
            "В result положи очищенный level и неизменённый message."
          ],
          "solutionExplanation": [
            "Формат каждой части объявлен отдельно.",
            "Пустое сообщение с разделителем допустимо."
          ],
          "required": true
        },
        {
          "id": "projects-logs-task-2",
          "kind": "code",
          "title": "Номера неверных строк",
          "goal": "Номера неверных строк",
          "prerequisites": [
            "projects-logs"
          ],
          "prompt": "Нумеруй строки text с 1. Верни номера строк без|или с уровнем не INFO/WARN/ERROR после strip+upper. Сообщение любое.",
          "inputFormat": "Реализуй invalid_log_lines(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "invalid_log_lines('INFO|ok\\nbad\\nOTHER|x\\nERROR|')"
              ],
              "output": "[2, 3]",
              "explanation": "Номера исходных строк."
            },
            {
              "input": [
                "invalid_log_lines('\\nINFO|x')"
              ],
              "output": "[1]",
              "explanation": "Пустая физическая строка недопустима."
            }
          ],
          "initialCode": "def invalid_log_lines(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "invalid_log_lines('INFO|ok\\nbad\\nOTHER|x\\nERROR|')",
              "expectedValue": [
                2,
                3
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Номера исходных строк."
            },
            {
              "expression": "invalid_log_lines('\\nINFO|x')",
              "expectedValue": [
                1
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустая физическая строка недопустима."
            },
            {
              "expression": "invalid_log_lines('')",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой текст не имеет строк."
            }
          ],
          "reference": "def invalid_log_lines(text):\n    result=[]\n    for number,line in enumerate(text.splitlines(),1):\n        level,separator,message=line.partition(\"|\")\n        if not separator or level.strip().upper() not in {\"INFO\",\"WARN\",\"ERROR\"}:\n            result.append(number)\n    return result",
          "alternative": "def invalid_log_lines(text):\n    lines=text.splitlines()\n    valid={\"INFO\",\"WARN\",\"ERROR\"}\n    return [i+1 for i in range(len(lines)) if \"|\" not in lines[i] or lines[i].split(\"|\",1)[0].strip().upper() not in valid]",
          "wrongSolutions": [
            {
              "code": "def invalid_log_lines(text):\n    return [i for i,line in enumerate(text.splitlines()) if \"|\" not in line]",
              "why": "Нумерация с 0 и непроверенный уровень."
            },
            {
              "code": "def invalid_log_lines(text):\n    return [i+1 for i,line in enumerate(text.splitlines()) if not line]",
              "why": "Не пустая строка тоже может быть недопустимой."
            }
          ],
          "hints": [
            "Нужно указывать место в источнике, не индекс отфильтрованного списка.",
            "enumerate можно начать с 1.",
            "Проверяй разделитель и уровень на каждой физической строке."
          ],
          "solutionExplanation": [
            "Диагностические номера помогают найти ошибку в документе.",
            "Пустой текст и пустая физическая строка различаются."
          ],
          "required": true
        },
        {
          "id": "projects-logs-task-3",
          "kind": "code",
          "title": "Самая длинная серия ошибок",
          "goal": "Самая длинная серия ошибок",
          "prerequisites": [
            "projects-logs"
          ],
          "prompt": "levels — список допустимых уровней. Верни длину самой длинной непрерывной серии ERROR. Другие уровни сбрасывают серию.",
          "inputFormat": "Реализуй longest_error_run(levels). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "longest_error_run(['ERROR','ERROR','INFO','ERROR'])"
              ],
              "output": "2",
              "explanation": "Всего 3 ошибки, серия 2."
            },
            {
              "input": [
                "longest_error_run(['INFO'])"
              ],
              "output": "0",
              "explanation": "Ошибок нет."
            }
          ],
          "initialCode": "def longest_error_run(levels):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "longest_error_run(['ERROR','ERROR','INFO','ERROR'])",
              "expectedValue": 2,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Всего 3 ошибки, серия 2."
            },
            {
              "expression": "longest_error_run(['INFO'])",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Ошибок нет."
            },
            {
              "expression": "longest_error_run([])",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пусто."
            }
          ],
          "reference": "def longest_error_run(levels):\n    current=best=0\n    for level in levels:\n        current=current+1 if level==\"ERROR\" else 0\n        best=max(best,current)\n    return best",
          "alternative": "def longest_error_run(levels):\n    lengths=[]\n    size=0\n    for level in levels+[\"INFO\"]:\n        if level==\"ERROR\":\n            size+=1\n        else:\n            lengths.append(size)\n            size=0\n    return max(lengths,default=0)",
          "wrongSolutions": [
            {
              "code": "def longest_error_run(levels):\n    return levels.count(\"ERROR\")",
              "why": "Общее количество не равно непрерывной серии."
            },
            {
              "code": "def longest_error_run(levels):\n    size=0\n    for level in levels:\n        size=size+1 if level==\"ERROR\" else 0\n    return size",
              "why": "Возвращена только последняя серия."
            }
          ],
          "hints": [
            "Нужны текущая и лучшая длины.",
            "Неблагоприятный уровень сбрасывает только текущую.",
            "После обновления current обновляй best через max."
          ],
          "solutionExplanation": [
            "История максимума не теряется при сбросе.",
            "Пустой список естественно даёт 0."
          ],
          "required": true
        },
        {
          "id": "projects-logs-task-4",
          "kind": "code",
          "title": "Сводка разобранного журнала",
          "goal": "Сводка разобранного журнала",
          "prerequisites": [
            "projects-logs"
          ],
          "prompt": "rows — допустимые пары [level,message]. Верни counts со всеми тремя ключами INFO/WARN/ERROR и last_error(последнее ERROR сообщение или None). Пустое сообщение сохраняется.",
          "inputFormat": "Реализуй log_report(rows). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "log_report([['ERROR','a'],['INFO','ok'],['ERROR','']])"
              ],
              "output": "{'counts': {'INFO': 1, 'WARN': 0, 'ERROR': 2}, 'last_error': ''}",
              "explanation": "Пустое последнее сообщение не отсутствует."
            },
            {
              "input": [
                "log_report([])"
              ],
              "output": "{'counts': {'INFO': 0, 'WARN': 0, 'ERROR': 0}, 'last_error': None}",
              "explanation": "Схема сохраняется."
            }
          ],
          "initialCode": "def log_report(rows):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "log_report([['ERROR','a'],['INFO','ok'],['ERROR','']])",
              "expectedValue": {
                "counts": {
                  "INFO": 1,
                  "WARN": 0,
                  "ERROR": 2
                },
                "last_error": ""
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустое последнее сообщение не отсутствует."
            },
            {
              "expression": "log_report([])",
              "expectedValue": {
                "counts": {
                  "INFO": 0,
                  "WARN": 0,
                  "ERROR": 0
                },
                "last_error": null
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Схема сохраняется."
            },
            {
              "expression": "log_report([['WARN','x']])",
              "expectedValue": {
                "counts": {
                  "INFO": 0,
                  "WARN": 1,
                  "ERROR": 0
                },
                "last_error": null
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Предупреждение не ошибка."
            }
          ],
          "reference": "def log_report(rows):\n    counts={\"INFO\":0,\"WARN\":0,\"ERROR\":0}\n    last=None\n    for level,message in rows:\n        counts[level]+=1\n        if level==\"ERROR\":\n            last=message\n    return {\"counts\":counts,\"last_error\":last}",
          "alternative": "def log_report(rows):\n    counts={level:sum(row[0]==level for row in rows) for level in [\"INFO\",\"WARN\",\"ERROR\"]}\n    errors=[message for level,message in rows if level==\"ERROR\"]\n    return dict(counts=counts,last_error=errors[-1] if errors else None)",
          "wrongSolutions": [
            {
              "code": "def log_report(rows):\n    counts={}\n    for level,message in rows:\n        counts[level]=counts.get(level,0)+1\n    errors=[m for l,m in rows if l==\"ERROR\"]\n    return dict(counts=counts,last_error=errors[-1] if errors else None)",
              "why": "Отсутствующие счётчики уровней потеряны."
            },
            {
              "code": "def log_report(rows):\n    counts={l:sum(r[0]==l for r in rows) for l in [\"INFO\",\"WARN\",\"ERROR\"]}\n    errors=[m for l,m in rows if l==\"ERROR\"]\n    return dict(counts=counts,last_error=(errors[-1] or None) if errors else None)",
              "why": "Пустой текст ошибки заменён None."
            }
          ],
          "hints": [
            "Схема счётчиков должна быть полной даже в пустом отчёте.",
            "last_error обновляется при появлении каждой ERROR.",
            "Не проверяй истинность сообщения: пустая строка допустима."
          ],
          "solutionExplanation": [
            "Отчёт разделяет частоту и последнее событие.",
            "None означает отсутствие события, а не пустой текст."
          ],
          "required": true
        }
      ]
    },
    {
      "id": "projects-study-plan",
      "title": "Смешанная практика: план учебной сессии",
      "goal": "Планировать следующий шаг по зависимости и фактическому выполнению.",
      "prerequisites": [
        "projects-logs"
      ],
      "role": "review",
      "estimatedMinutes": 55,
      "steps": [
        {
          "id": "projects-study-plan-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "У учебного плана две независимые стороны: доступное время и готовность темы. Тема может помещаться в 20 минут, но требовать ещё не изученный материал. В проекте каждая запись содержит стабильный id, примерную длительность и список prerequisites. Уже выполненные id передаются явно. Время помогает планировать, но не ограничивает скорость ученика и не создаёт ожидания ради галочки.",
            "Для короткой сессии выберем простой контракт: берём последовательный префикс заданий, пока следующее помещается в оставшееся время. Если не помещается, останавливаемся и не перескакиваем к более коротким задачам. Это не задача об оптимальном рюкзаке. Такое правило сохраняет учебную последовательность. Нулевая длительность допустима для переходного шага и не должна вызывать бесконечный цикл."
          ],
          "examples": [
            {
              "id": "projects-study-plan-example-1",
              "title": "Префикс сохраняет порядок",
              "code": "durations=[8,15,3]\nbudget=20\nused=0\nselected=[]\nfor i,duration in enumerate(durations):\n    if used+duration>budget:\n        break\n    used+=duration\n    selected.append(i)\nprint(selected)",
              "output": "[0]\n",
              "explanation": "После 8 следующее 15 не помещается, поэтому к 3 не перескакиваем."
            }
          ],
          "goal": "Планировать следующий шаг по зависимости и фактическому выполнению. Задача и устройство.",
          "prerequisites": [
            "projects-logs"
          ]
        },
        {
          "id": "projects-study-plan-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Готовность по prerequisites проверяется отдельно: все необходимые id должны быть в completed, сам урок ещё не должен быть выполнен. Проверка просмотра страницы ничего не говорит о самостоятельном решении. В сводке прогресса отдельно считай прочитанное объяснение, решённые задания и результат итоговой. Совпадение набора или открытие эталона нельзя автоматически записать в самостоятельное решение.",
            "Повторение можно предлагать через 1,3 и 7 дней от дня успешной попытки. Если срок пропущен, задача просто остаётся доступной, без потери результата. В упражнении due_days нужно вернуть уже наступившие даты, не отправляя уведомлений и не создавая внешних записей. В конце проекта проверь пустой план, полностью выполненный набор, равенство времени и отсутствие нужной prerequisite."
          ],
          "examples": [
            {
              "id": "projects-study-plan-example-2",
              "title": "Все prerequisites, а не хотя бы одна",
              "code": "required=[\"output\",\"variables\"]\ncompleted={\"output\"}\nprint(all(item in completed for item in required))",
              "output": "False\n",
              "explanation": "Одной из двух необходимых тем недостаточно."
            }
          ],
          "goal": "Планировать следующий шаг по зависимости и фактическому выполнению. Порядок выполнения.",
          "prerequisites": [
            "projects-study-plan-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "projects-study-plan-task-1",
          "kind": "code",
          "title": "Префикс по времени",
          "goal": "Префикс по времени",
          "prerequisites": [
            "projects-study-plan"
          ],
          "prompt": "durations — список int>=0,budget>=0. Верни индексы непрерывного префикса заданий, который помещается в бюджет. На первом непомещающемся остановись, не перескакивай.",
          "inputFormat": "Реализуй session_prefix(durations, budget). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "session_prefix([8,15,3],20)"
              ],
              "output": "[0]",
              "explanation": "Последовательность важнее упаковки времени."
            },
            {
              "input": [
                "session_prefix([0,5],5)"
              ],
              "output": "[0, 1]",
              "explanation": "Нулевая длительность и равенство."
            }
          ],
          "initialCode": "def session_prefix(durations, budget):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "session_prefix([8,15,3],20)",
              "expectedValue": [
                0
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Последовательность важнее упаковки времени."
            },
            {
              "expression": "session_prefix([0,5],5)",
              "expectedValue": [
                0,
                1
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевая длительность и равенство."
            },
            {
              "expression": "session_prefix([],10)",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой план."
            }
          ],
          "reference": "def session_prefix(durations, budget):\n    used=0\n    result=[]\n    for i,duration in enumerate(durations):\n        if used+duration>budget:\n            break\n        used+=duration\n        result.append(i)\n    return result",
          "alternative": "def session_prefix(durations, budget):\n    end=0\n    while end<len(durations) and sum(durations[:end+1])<=budget:\n        end+=1\n    return list(range(end))",
          "wrongSolutions": [
            {
              "code": "def session_prefix(durations, budget):\n    result=[]\n    for i,d in enumerate(durations):\n        if d<=budget:\n            result.append(i)\n            budget-=d\n    return result",
              "why": "После отказа произошёл перескок к поздней короткой задаче."
            },
            {
              "code": "def session_prefix(durations, budget):\n    result=[]\n    used=0\n    for i,d in enumerate(durations):\n        if used+d>=budget:\n            break\n        result.append(i)\n        used+=d\n    return result",
              "why": "Ровный бюджет ошибочно отвергнут."
            }
          ],
          "hints": [
            "Нужен префикс, а непроизвольный набор.",
            "При первом превышении используй break.",
            "Сохраняй used и допускай used+duration==budget."
          ],
          "solutionExplanation": [
            "Простая стратегия явно объявлена и не имитирует оптимизацию.",
            "Нет принудительного ожидания: время — данные плана."
          ],
          "required": true
        },
        {
          "id": "projects-study-plan-task-2",
          "kind": "code",
          "title": "Готовые к изучению темы",
          "goal": "Готовые к изучению темы",
          "prerequisites": [
            "projects-study-plan"
          ],
          "prompt": "topics — словари id строка,requires список id. Верни id ещё незавершённых тем, у всех prerequisites которых есть в completed. Сохрани порядок topics. completed — список строк.",
          "inputFormat": "Реализуй ready_topics(topics, completed). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "ready_topics([{'id':'a','requires':[]},{'id':'b','requires':['a','x']},{'id':'c','requires':['a']}],['a'])"
              ],
              "output": "['c']",
              "explanation": "Все prerequisites обязательны."
            },
            {
              "input": [
                "ready_topics([{'id':'a','requires':[]}],[])"
              ],
              "output": "['a']",
              "explanation": "Первый шаг готов."
            }
          ],
          "initialCode": "def ready_topics(topics, completed):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "ready_topics([{'id':'a','requires':[]},{'id':'b','requires':['a','x']},{'id':'c','requires':['a']}],['a'])",
              "expectedValue": [
                "c"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Все prerequisites обязательны."
            },
            {
              "expression": "ready_topics([{'id':'a','requires':[]}],[])",
              "expectedValue": [
                "a"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Первый шаг готов."
            },
            {
              "expression": "ready_topics([],[])",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой каталог."
            }
          ],
          "reference": "def ready_topics(topics, completed):\n    done=set(completed)\n    return [t[\"id\"] for t in topics if t[\"id\"] not in done and all(r in done for r in t[\"requires\"])]",
          "alternative": "def ready_topics(topics, completed):\n    result=[]\n    for topic in topics:\n        if topic[\"id\"] in completed:\n            continue\n        missing=[r for r in topic[\"requires\"] if r not in completed]\n        if not missing:\n            result.append(topic[\"id\"])\n    return result",
          "wrongSolutions": [
            {
              "code": "def ready_topics(topics, completed):\n    return [t[\"id\"] for t in topics if any(r in completed for r in t[\"requires\"])]",
              "why": "Достаточной ошибочно считается одна prerequisite; пустой список необработан."
            },
            {
              "code": "def ready_topics(topics, completed):\n    return [t[\"id\"] for t in topics if all(r in completed for r in t[\"requires\"])]",
              "why": "Уже завершённые темы снова предлагаются как новые."
            }
          ],
          "hints": [
            "Сначала отдел и уже завершённые.",
            "Оставшимся нужны все зависимости.",
            "all пустого списка True — стартовая тема готова без предыдущих."
          ],
          "solutionExplanation": [
            "Готовность неравна фактическому завершению.",
            "Порядок каталога сохраняет педагогическую последовательность."
          ],
          "required": true
        },
        {
          "id": "projects-study-plan-task-3",
          "kind": "code",
          "title": "Наступившие даты повторения",
          "goal": "Наступившие даты повторения",
          "prerequisites": [
            "projects-study-plan"
          ],
          "prompt": "Дни — целые>=0,today>=solved_day. Верни даты solved_day+1,+3,+7, которые уже наступили к today, в порядке. Ничего не сохраняй и не отправляй.",
          "inputFormat": "Реализуй due_days(solved_day, today). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "due_days(10,13)"
              ],
              "output": "[11, 13]",
              "explanation": "Два срока наступили."
            },
            {
              "input": [
                "due_days(10,10)"
              ],
              "output": "[]",
              "explanation": "В день решения сроков ещё нет."
            }
          ],
          "initialCode": "def due_days(solved_day, today):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "due_days(10,13)",
              "expectedValue": [
                11,
                13
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Два срока наступили."
            },
            {
              "expression": "due_days(10,10)",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "В день решения сроков ещё нет."
            },
            {
              "expression": "due_days(0,9)",
              "expectedValue": [
                1,
                3,
                7
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пропущенные сроки не пропадают."
            }
          ],
          "reference": "def due_days(solved_day, today):\n    return [solved_day+offset for offset in [1,3,7] if solved_day+offset<=today]",
          "alternative": "def due_days(solved_day, today):\n    result=[]\n    for offset in (1,3,7):\n        day=solved_day+offset\n        if day<=today:\n            result.append(day)\n    return result",
          "wrongSolutions": [
            {
              "code": "def due_days(solved_day, today):\n    return [offset for offset in [1,3,7] if offset<=today]",
              "why": "Смещения перепутаны с абсолютными датами."
            },
            {
              "code": "def due_days(solved_day, today):\n    return [solved_day+x for x in [1,3,7] if solved_day+x==today]",
              "why": "Пропущенные сроки исчезают вместо сохранения предложения."
            }
          ],
          "hints": [
            "Сначала получи конкретные даты от дня решения.",
            "Наступившая дата это<=today, а не только равенство.",
            "Перебери смещения 1,3,7 и добавь к solved_day."
          ],
          "solutionExplanation": [
            "Повторение добровольно и не на к a зывает пропуск.",
            "Функция только вычисляет предложения, ане создаёт уведомления."
          ],
          "required": true
        },
        {
          "id": "projects-study-plan-task-4",
          "kind": "code",
          "title": "Три независимых события прогресса",
          "goal": "Три независимых события прогресса",
          "prerequisites": [
            "projects-study-plan"
          ],
          "prompt": "read — bool,solved/required — списки id,final_passed — bool. Верни studied=read,exercises=число разных required id в solved,complete=True только если read, все required решены и final_passed. Повторы id не увеличивают счётчик.",
          "inputFormat": "Реализуй learning_state(read, solved, required, final_passed). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "learning_state(True,['a','a'],['a','b'],True)"
              ],
              "output": "{'studied': True, 'exercises': 1, 'complete': False}",
              "explanation": "Повтор не заменяет другую задачу."
            },
            {
              "input": [
                "learning_state(True,['a','b'],['a','b'],True)"
              ],
              "output": "{'studied': True, 'exercises': 2, 'complete': True}",
              "explanation": "Все критерии выполнены."
            }
          ],
          "initialCode": "def learning_state(read, solved, required, final_passed):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "learning_state(True,['a','a'],['a','b'],True)",
              "expectedValue": {
                "studied": true,
                "exercises": 1,
                "complete": false
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Повтор не заменяет другую задачу."
            },
            {
              "expression": "learning_state(True,['a','b'],['a','b'],True)",
              "expectedValue": {
                "studied": true,
                "exercises": 2,
                "complete": true
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Все критерии выполнены."
            },
            {
              "expression": "learning_state(False,[],[],True)",
              "expectedValue": {
                "studied": false,
                "exercises": 0,
                "complete": false
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Просмотр объяснения отдельный критерий."
            }
          ],
          "reference": "def learning_state(read, solved, required, final_passed):\n    needed=set(required)\n    done=needed & set(solved)\n    return {\"studied\":read,\"exercises\":len(done),\"complete\":read and done==needed and final_passed}",
          "alternative": "def learning_state(read, solved, required, final_passed):\n    count=sum(task in solved for task in set(required))\n    all_solved=all(task in solved for task in required)\n    return dict(studied=read,exercises=count,complete=bool(read and all_solved and final_passed))",
          "wrongSolutions": [
            {
              "code": "def learning_state(read, solved, required, final_passed):\n    return dict(studied=read,exercises=len(solved),complete=read)",
              "why": "Чтение ошибочно выдано за освоение, повторы раздувают счёт."
            },
            {
              "code": "def learning_state(read, solved, required, final_passed):\n    count=len(set(solved)&set(required))\n    return dict(studied=read,exercises=count,complete=count==len(set(required)))",
              "why": "Не учтены объяснение и итоговая работа."
            }
          ],
          "hints": [
            "События нужно хранить раздельно.",
            "Считай пересечение множеств id, а не длину списка попыток.",
            "complete соединяет три независимых критерия через and."
          ],
          "solutionExplanation": [
            "Контракт завершения объявлен заранее.",
            "Показатель набора кода или просмотра решения не передаётся как solved автоматически."
          ],
          "required": true
        }
      ]
    },
    {
      "id": "projects-final-inventory",
      "title": "Итоговая работа 1: атомарный складской пакет",
      "goal": "Самостоятельно соединить CSV, проверку состояния, откат и отчёт.",
      "prerequisites": [
        "projects-study-plan"
      ],
      "role": "final",
      "estimatedMinutes": 55,
      "steps": [
        {
          "id": "projects-final-inventory-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Это новая итоговая работа, а не повтор пошагового проекта. В CSV операции имеют знак: положительное количество пополняет, отрицательное списывает. Главное новое правило — атомарность: если хотя бы одна операция сделала бы остаток отрицательным, весь пакет отклоняется, а склад остаётся исходным. Нужно указать индекс первого сбоя. Нельзя оставлять частично применённые заявки.",
            "Работа разделена на четыре проверяемых контракта, но каждый нужно реализовать самостоятельно. На последнем шаге объединяются разбор CSV, атомарная обработка, пороговые предупреждения и JSON. Входные форматы полностью даны, сеть и внешние сервисы не нужны. Подсказки и эталон отмечаются отдельно от самостоятельного выполнения. Для зачёта нужны все четыре задачи."
          ],
          "examples": [
            {
              "id": "projects-final-inventory-example-1",
              "title": "Атом арность как правило результата",
              "code": "initial={\"чай\":2}\nproposed={\"чай\":-1}\naccepted=False\nresult=proposed if accepted else initial.copy()\nprint(result)",
              "output": "{'чай': 2}\n",
              "explanation": "Пример показывает только смысл отката, не алгоритм обработки пакета."
            }
          ],
          "goal": "Самостоятельно соединить CSV, проверку состояния, откат и отчёт. Задача и устройство.",
          "prerequisites": [
            "projects-study-plan"
          ]
        },
        {
          "id": "projects-final-inventory-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Перед кодом составь свои примеры: успешное списание вровень с остатком, провал после первого пополнения, новый товар и пустой пакет. Отдельно проверь, что исходный словарь не изменился при исправном и при неисправном пакете. После успеха объясни, какие данные при откате нельзя заменять текущей копией."
          ],
          "examples": [
            {
              "id": "projects-final-inventory-example-2",
              "title": "JSON сохраняет тип отсутствия",
              "code": "import json\nprint(json.dumps({\"accepted\":True,\"failed\":None}))",
              "output": "{\"accepted\": true, \"failed\": null}\n",
              "explanation": "Успешный пакет не имеет индекса сбоя;None становится null."
            }
          ],
          "goal": "Самостоятельно соединить CSV, проверку состояния, откат и отчёт. Порядок выполнения.",
          "prerequisites": [
            "projects-final-inventory-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "projects-final-inventory-task-1",
          "kind": "code",
          "title": "Операции из CSV",
          "goal": "Операции из CSV",
          "prerequisites": [
            "projects-final-inventory"
          ],
          "prompt": "text — корректный CSV name,change. change — целое;name не пустой после strip. Верни список [name.strip(),int(change)], сохрани порядок и нулевые операции.",
          "inputFormat": "Реализуй parse_operations(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "parse_operations('name,change\\n чай ,2\\nчай,-1\\n')"
              ],
              "output": "[['чай', 2], ['чай', -1]]",
              "explanation": "Порядок сохранён."
            },
            {
              "input": [
                "parse_operations('name,change\\n\"a,b\",0\\n')"
              ],
              "output": "[['a,b', 0]]",
              "explanation": "Запятая и ноль."
            }
          ],
          "initialCode": "def parse_operations(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "parse_operations('name,change\\n чай ,2\\nчай,-1\\n')",
              "expectedValue": [
                [
                  "чай",
                  2
                ],
                [
                  "чай",
                  -1
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Порядок сохранён."
            },
            {
              "expression": "parse_operations('name,change\\n\"a,b\",0\\n')",
              "expectedValue": [
                [
                  "a,b",
                  0
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Запятая и ноль."
            },
            {
              "expression": "parse_operations('')",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой пакет."
            }
          ],
          "reference": "import csv\nfrom io import StringIO\ndef parse_operations(text):\n    return [[r[\"name\"].strip(),int(r[\"change\"])] for r in csv.DictReader(StringIO(text))]",
          "alternative": "import csv\nfrom io import StringIO\ndef parse_operations(text):\n    rows=csv.reader(StringIO(text))\n    next(rows,None)\n    result=[]\n    for name,change in rows:\n        result.append([name.strip(),int(change)])\n    return result",
          "wrongSolutions": [
            {
              "code": "import csv\nfrom io import StringIO\ndef parse_operations(text):\n    return [[r[\"name\"],r[\"change\"]] for r in csv.DictReader(StringIO(text))]",
              "why": "Поляне очищены и число не преобразовано."
            },
            {
              "code": "def parse_operations(text):\n    return [[a.strip(),int(b)] for a,b in (line.split(\",\") for line in text.splitlines()[1:])]",
              "why": "Кавычки и запятая в поле ломают ручной разбор."
            }
          ],
          "hints": [
            "Парсер формата отдельно отправила атомарности.",
            "Сохраняй все события дообработки.",
            "Используй CSVparser,strip имении int изменения."
          ],
          "solutionExplanation": [
            "Результат разбора остаётся событийным списком.",
            "Нельзя группировать изменения раньше: это скрыло бы промежуточный сбой."
          ],
          "required": true
        },
        {
          "id": "projects-final-inventory-task-2",
          "kind": "code",
          "title": "Применить или откатить весь пакет",
          "goal": "Применить или откатить весь пакет",
          "prerequisites": [
            "projects-final-inventory"
          ],
          "prompt": "stock — неотрицательные остатки,operations — пары name,change. Применяй по порядку. Если новый остаток<0, верни accepted=False,stock=копия исходного,failed=индекс сбоя. Иначе accepted=True,stock=копия итога,failed=None. Нулевой change не создаёт новый ключ.",
          "inputFormat": "Реализуй atomic_stock(stock, operations). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "atomic_stock({'a':2},[['a',1],['a',-4]])"
              ],
              "output": "{'accepted': False, 'stock': {'a': 2}, 'failed': 1}",
              "explanation": "Откат всего, включая успешное первое изменение."
            },
            {
              "input": [
                "atomic_stock({'a':2},[['a',-2],['b',3]])"
              ],
              "output": "{'accepted': True, 'stock': {'a': 0, 'b': 3}, 'failed': None}",
              "explanation": "Нулевой остаток допустим."
            }
          ],
          "initialCode": "def atomic_stock(stock, operations):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "atomic_stock({'a':2},[['a',1],['a',-4]])",
              "expectedValue": {
                "accepted": false,
                "stock": {
                  "a": 2
                },
                "failed": 1
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Откат всего, включая успешное первое изменение."
            },
            {
              "expression": "atomic_stock({'a':2},[['a',-2],['b',3]])",
              "expectedValue": {
                "accepted": true,
                "stock": {
                  "a": 0,
                  "b": 3
                },
                "failed": null
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевой остаток допустим."
            },
            {
              "expression": "atomic_stock({},[['x',0]])",
              "expectedValue": {
                "accepted": true,
                "stock": {},
                "failed": null
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевое событие не создаёт ключ."
            },
            {
              "setup": "_course_input_0 = {'a': 2}\n_course_input_1 = [['a', 1], ['a', -4]]",
              "expression": "[atomic_stock(_course_input_0, _course_input_1), _course_input_0 == {'a': 2} and _course_input_1 == [['a', 1], ['a', -4]]]",
              "expectedValue": [
                {
                  "accepted": false,
                  "stock": {
                    "a": 2
                  },
                  "failed": 1
                },
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Проверяется и возвращённый результат, и сохранность входных коллекций после вызова."
            },
            {
              "expression": "[atomic_stock(_source,[['a',1],['a',-4]]),_source]",
              "expectedValue": [
                {
                  "accepted": false,
                  "stock": {
                    "a": 2
                  },
                  "failed": 1
                },
                {
                  "a": 2
                }
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Атомарный отказ сохраняет исходный объект склада.",
              "setup": "_source = {\"a\":2}"
            },
            {
              "expression": "(lambda result: (result['stock'].__setitem__('a',99),_source)[1])(atomic_stock(_source,[]))",
              "expectedValue": {
                "a": 2
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Возвращённый склад — независимая копия даже при пустом пакете.",
              "setup": "_source = {\"a\":2}"
            }
          ],
          "reference": "def atomic_stock(stock, operations):\n    current=stock.copy()\n    for i,(name,change) in enumerate(operations):\n        value=current.get(name,0)+change\n        if value<0:\n            return {\"accepted\":False,\"stock\":stock.copy(),\"failed\":i}\n        if change:\n            current[name]=value\n    return {\"accepted\":True,\"stock\":current,\"failed\":None}",
          "alternative": "def atomic_stock(stock, operations):\n    updates={}\n    for i,(name,change) in enumerate(operations):\n        if change==0:\n            continue\n        next_value=updates.get(name,stock.get(name,0))+change\n        if next_value<0:\n            return dict(accepted=False,stock=dict(stock),failed=i)\n        updates[name]=next_value\n    result=dict(stock)\n    result.update(updates)\n    return dict(accepted=True,stock=result,failed=None)",
          "wrongSolutions": [
            {
              "code": "def atomic_stock(stock, operations):\n    current=stock.copy()\n    for i,(name,change) in enumerate(operations):\n        current[name]=current.get(name,0)+change\n        if current[name]<0:\n            return dict(accepted=False,stock=current,failed=i)\n    return dict(accepted=True,stock=current,failed=None)",
              "why": "При отказе возвращено частично созданное состояние."
            },
            {
              "code": "def atomic_stock(stock, operations):\n    current=stock.copy()\n    for name,change in operations:\n        current[name]=current.get(name,0)+change\n    return dict(accepted=all(v>=0 for v in current.values()),stock=current,failed=None)",
              "why": "Итоговая проверка потеряет промежуточный сбой и индекс."
            },
            {
              "code": "def atomic_stock(stock, operations):\n    current=stock.copy()\n    for i,(name,change) in enumerate(operations):\n        value=current.get(name,0)+change\n        if value<0:\n            return {\"accepted\":False,\"stock\":stock.copy(),\"failed\":i}\n        if change:\n            current[name]=value\n    return {\"accepted\":True,\"stock\":current,\"failed\":None}\n_course_original = atomic_stock\ndef atomic_stock(*args, **kwargs):\n    result = _course_original(*args, **kwargs)\n    args[0].clear()\n    return result",
              "why": "Правильный ответ вычислен, но после вызова входная коллекция очищена, нарушая контракт сохранности."
            }
          ],
          "hints": [
            "Нужно контролировать каждый переход, но публиковать итог только при успехе всего.",
            "Работай с копией, исходник держи для отката.",
            "При первом минусе верни исходную копию и индекс."
          ],
          "solutionExplanation": [
            "Атом арность проверяется на отказе после успешной операции.",
            "Нулевые события не изменяют состав ключей."
          ],
          "required": true
        },
        {
          "id": "projects-final-inventory-task-3",
          "kind": "code",
          "title": "Пороговые предупреждения",
          "goal": "Пороговые предупреждения",
          "prerequisites": [
            "projects-final-inventory"
          ],
          "prompt": "Верни алфавитный список имён из thresholds, чей остаток stock строго меньше порога. Отсутствующий остаток 0, равенство допустимо. Источники не меняй.",
          "inputFormat": "Реализуй stock_alerts(stock, thresholds). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "stock_alerts({'a':2,'b':5},{'b':5,'a':3,'c':1})"
              ],
              "output": "['a', 'c']",
              "explanation": "Равенство b не предупреждение."
            },
            {
              "input": [
                "stock_alerts({}, {'x':0})"
              ],
              "output": "[]",
              "explanation": "Нулевая цель достигнута."
            }
          ],
          "initialCode": "def stock_alerts(stock, thresholds):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "stock_alerts({'a':2,'b':5},{'b':5,'a':3,'c':1})",
              "expectedValue": [
                "a",
                "c"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Равенство b не предупреждение."
            },
            {
              "expression": "stock_alerts({}, {'x':0})",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевая цель достигнута."
            },
            {
              "expression": "stock_alerts({}, {})",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет порогов."
            },
            {
              "setup": "_course_input_0 = {'a': 2, 'b': 5}\n_course_input_1 = {'b': 5, 'a': 3, 'c': 1}",
              "expression": "[stock_alerts(_course_input_0, _course_input_1), _course_input_0 == {'a': 2, 'b': 5} and _course_input_1 == {'b': 5, 'a': 3, 'c': 1}]",
              "expectedValue": [
                [
                  "a",
                  "c"
                ],
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Проверяется и возвращённый результат, и сохранность входных коллекций после вызова."
            }
          ],
          "reference": "def stock_alerts(stock, thresholds):\n    return sorted(name for name,limit in thresholds.items() if stock.get(name,0)<limit)",
          "alternative": "def stock_alerts(stock, thresholds):\n    result=[]\n    for name in sorted(thresholds):\n        if thresholds[name]>stock.get(name,0):\n            result.append(name)\n    return result",
          "wrongSolutions": [
            {
              "code": "def stock_alerts(stock, thresholds):\n    return sorted(name for name,limit in thresholds.items() if stock.get(name,0)<=limit)",
              "why": "Равенство ошибочно включено."
            },
            {
              "code": "def stock_alerts(stock, thresholds):\n    return sorted(name for name,value in stock.items() if value<0)",
              "why": "Неправильный источники условие; новые товары потеряны."
            },
            {
              "code": "def stock_alerts(stock, thresholds):\n    return sorted(name for name,limit in thresholds.items() if stock.get(name,0)<limit)\n_course_original = stock_alerts\ndef stock_alerts(*args, **kwargs):\n    result = _course_original(*args, **kwargs)\n    args[0].clear()\n    return result",
              "why": "Правильный ответ вычислен, но после вызова входная коллекция очищена, нарушая контракт сохранности."
            }
          ],
          "hints": [
            "Проверяй товары, для которых заданы пороги.",
            "Равенство не должно попадать в список.",
            "Примени stock.get(name,0)<thresholds[name] и отсортируй имена."
          ],
          "solutionExplanation": [
            "Правило порогов не изменяет склад и не до заказывает товары.",
            "Детерминированный порядок делает отчёт понятным."
          ],
          "required": true
        },
        {
          "id": "projects-final-inventory-task-4",
          "kind": "code",
          "title": "Полный атомарный отчёт",
          "goal": "Полный атомарный отчёт",
          "prerequisites": [
            "projects-final-inventory"
          ],
          "prompt": "Прочитай CSV name,change, нормализуй name через strip, выполни атомарный пакет по правилам этой работы. Верни JSON объект accepted,stock,failed,alerts. alerts построй по фактически принятому складу (исходному при откате), имена отсортированы.",
          "inputFormat": "Реализуй inventory_report(text, stock, thresholds). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "__import__('json').loads(inventory_report('name,change\\na,1\\na,-4\\n',{'a':2},{'a':3}))"
              ],
              "output": "{'accepted': False, 'stock': {'a': 2}, 'failed': 1, 'alerts': ['a']}",
              "explanation": "Отчёт после отката."
            },
            {
              "input": [
                "__import__('json').loads(inventory_report('name,change\\na,-2\\nb,3\\n',{'a':2},{'a':0,'b':4}))"
              ],
              "output": "{'accepted': True, 'stock': {'a': 0, 'b': 3}, 'failed': None, 'alerts': ['b']}",
              "explanation": "Успехи порог."
            }
          ],
          "initialCode": "def inventory_report(text, stock, thresholds):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "__import__('json').loads(inventory_report('name,change\\na,1\\na,-4\\n',{'a':2},{'a':3}))",
              "expectedValue": {
                "accepted": false,
                "stock": {
                  "a": 2
                },
                "failed": 1,
                "alerts": [
                  "a"
                ]
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Отчёт после отката."
            },
            {
              "expression": "__import__('json').loads(inventory_report('name,change\\na,-2\\nb,3\\n',{'a':2},{'a':0,'b':4}))",
              "expectedValue": {
                "accepted": true,
                "stock": {
                  "a": 0,
                  "b": 3
                },
                "failed": null,
                "alerts": [
                  "b"
                ]
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Успехи порог."
            },
            {
              "expression": "__import__('json').loads(inventory_report('',{},{}))",
              "expectedValue": {
                "accepted": true,
                "stock": {},
                "failed": null,
                "alerts": []
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой пакет успешен."
            }
          ],
          "reference": "import csv,json\nfrom io import StringIO\ndef inventory_report(text, stock, thresholds):\n    current=stock.copy()\n    failed=None\n    for i,row in enumerate(csv.DictReader(StringIO(text))):\n        name=row[\"name\"].strip()\n        change=int(row[\"change\"])\n        value=current.get(name,0)+change\n        if value<0:\n            failed=i\n            current=stock.copy()\n            break\n        if change:\n            current[name]=value\n    alerts=sorted(n for n,t in thresholds.items() if current.get(n,0)<t)\n    return json.dumps(dict(accepted=failed is None,stock=current,failed=failed,alerts=alerts))",
          "alternative": "import csv,json\nfrom io import StringIO\ndef inventory_report(text, stock, thresholds):\n    operations=[(r[\"name\"].strip(),int(r[\"change\"])) for r in csv.DictReader(StringIO(text))]\n    result=dict(stock)\n    failed=None\n    for index in range(len(operations)):\n        name,change=operations[index]\n        if result.get(name,0)+change<0:\n            result=dict(stock)\n            failed=index\n            break\n        if change!=0:\n            result[name]=result.get(name,0)+change\n    return json.dumps({\"accepted\":failed is None,\"stock\":result,\"failed\":failed,\"alerts\":[n for n in sorted(thresholds) if result.get(n,0)<thresholds[n]]})",
          "wrongSolutions": [
            {
              "code": "import json\ndef inventory_report(text, stock, thresholds):\n    return json.dumps(dict(accepted=True,stock=stock,failed=None,alerts=[]))",
              "why": "Нет обработки операций и порогов."
            },
            {
              "code": "import csv,json\nfrom io import StringIO\ndef inventory_report(text, stock, thresholds):\n    c=stock.copy()\n    failed=None\n    for i,r in enumerate(csv.DictReader(StringIO(text))):\n        n=r[\"name\"].strip()\n        c[n]=c.get(n,0)+int(r[\"change\"])\n        if c[n]<0:\n            failed=i\n            break\n    return json.dumps(dict(accepted=failed is None,stock=c,failed=failed,alerts=sorted(n for n,t in thresholds.items() if c.get(n,0)<t)))",
              "why": "При ошибке нет отката, поэтому итоги предупреждения неверны."
            }
          ],
          "hints": [
            "Составь порядок этапов до кода.",
            "Пороги смотри на последний опубликованный склад, не отклонённую копию.",
            "При ошибке восстанови исходный stock досборки alerts и JSON."
          ],
          "solutionExplanation": [
            "Итоговая работа проверяет полный путь документ→состояние→откат→отчёт.",
            "Проверки наблюдают JSON-ответ; не создают склад за решение."
          ],
          "required": true
        }
      ]
    },
    {
      "id": "projects-final-learning",
      "title": "Итоговая работа 2: учебные попытки и отчёт",
      "goal": "Самостоятельно разделить попытки, помощь, решение и полноту модуля.",
      "prerequisites": [
        "projects-final-inventory"
      ],
      "role": "final",
      "estimatedMinutes": 55,
      "steps": [
        {
          "id": "projects-final-learning-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Новый набор данных — JSON-массив попыток. Каждая запись имеет day(целый условный день>=0),task(строковый id),passed(bool),help(bool). Успешная попытка с help=True не считается самостоятельным решением, но остаётся попыткой. Стабильный id задачи нужен для объединения повторных попыток. Неправильная попытка после успеха не удаляет уже полученный результат.",
            "В работе нужно получить разные показатели: число попыток, множество самостоятельно решённых id, самую длинную серию дней с самостоятельным успехом и завершение обязательного набора. Несколько успехов в один день не удлиняют серию. Несортированный порядок записей не должен менять число дней или правило завершения. Завершение требует каждый required id, а не просто достаточное количество любых задач."
          ],
          "examples": [
            {
              "id": "projects-final-learning-example-1",
              "title": "Повторные попытки не новые задачи",
              "code": "records=[{\"task\":\"a\",\"passed\":False},{\"task\":\"a\",\"passed\":True}]\nprint(len(records))\nprint(len({r[\"task\"] for r in records if r[\"passed\"]}))",
              "output": "2\n1\n",
              "explanation": "Две попытки, одна решённая задача."
            }
          ],
          "goal": "Самостоятельно разделить попытки, помощь, решение и полноту модуля. Задача и устройство.",
          "prerequisites": [
            "projects-final-inventory"
          ]
        },
        {
          "id": "projects-final-learning-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Все четыре контракта обязательны. Это диагностическая работа по моделированию прогресса, это учебная модель серверного учёта StudyPy. Данные передаются аргументами; функции не пишут в рабочую базу и не выдают ценные награды. После успеха объясни на контрпримере, почему количество попыток или WPM не подтверждает освоение темы."
          ],
          "examples": [
            {
              "id": "projects-final-learning-example-2",
              "title": "Дни нужно различать от событий",
              "code": "days=[4,2,2,3]\nprint(sorted(set(days)))",
              "output": "[2, 3, 4]\n",
              "explanation": "Два успеха в день 2 не дают двух дней. После упорядочивания видна серия 2,3,4."
            }
          ],
          "goal": "Самостоятельно разделить попытки, помощь, решение и полноту модуля. Порядок выполнения.",
          "prerequisites": [
            "projects-final-learning-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "projects-final-learning-task-1",
          "kind": "code",
          "title": "Самостоятельно решённые задачи",
          "goal": "Самостоятельно решённые задачи",
          "prerequisites": [
            "projects-final-learning"
          ],
          "prompt": "text — корректный JSON-массив записей day,task,passed,help объявленных типов. Верни алфавитный список уникальных task, где хотя бы одна попытка passed=True и help=False.",
          "inputFormat": "Реализуй independent_tasks(text). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "independent_tasks('[{\"day\":1,\"task\":\"b\",\"passed\":true,\"help\":true},{\"day\":1,\"task\":\"a\",\"passed\":true,\"help\":false},{\"day\":2,\"task\":\"a\",\"passed\":false,\"help\":false}]')"
              ],
              "output": "['a']",
              "explanation": "Помощь не самостоятельность; поздняя ошибка не снимает успех."
            },
            {
              "input": [
                "independent_tasks('[]')"
              ],
              "output": "[]",
              "explanation": "Нет событий."
            }
          ],
          "initialCode": "def independent_tasks(text):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "independent_tasks('[{\"day\":1,\"task\":\"b\",\"passed\":true,\"help\":true},{\"day\":1,\"task\":\"a\",\"passed\":true,\"help\":false},{\"day\":2,\"task\":\"a\",\"passed\":false,\"help\":false}]')",
              "expectedValue": [
                "a"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Помощь не самостоятельность; поздняя ошибка не снимает успех."
            },
            {
              "expression": "independent_tasks('[]')",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет событий."
            },
            {
              "expression": "independent_tasks('[{\"day\":0,\"task\":\"z\",\"passed\":true,\"help\":false}]')",
              "expectedValue": [
                "z"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "День 0 допустим."
            }
          ],
          "reference": "import json\ndef independent_tasks(text):\n    return sorted({r[\"task\"] for r in json.loads(text) if r[\"passed\"] and not r[\"help\"]})",
          "alternative": "import json\ndef independent_tasks(text):\n    solved=[]\n    for record in json.loads(text):\n        if record[\"passed\"] and record[\"help\"]==False and record[\"task\"] not in solved:\n            solved.append(record[\"task\"])\n    return sorted(solved)",
          "wrongSolutions": [
            {
              "code": "import json\ndef independent_tasks(text):\n    return sorted({r[\"task\"] for r in json.loads(text) if r[\"passed\"]})",
              "why": "Помощь не учтена."
            },
            {
              "code": "import json\ndef independent_tasks(text):\n    states={}\n    for r in json.loads(text):\n        states[r[\"task\"]]=r[\"passed\"] and not r[\"help\"]\n    return sorted(k for k,v in states.items() if v)",
              "why": "Последняя ошибка после успеха снимает прежнее решение."
            }
          ],
          "hints": [
            "Нужно существование хотя бы одного самостоятельного успеха.",
            "Не перезаписывай успех последующей неудачей.",
            "Собери множество task из подходящих событий, потом sorted."
          ],
          "solutionExplanation": [
            "Прогресс навыка неравен последнему состоянию попытки.",
            "Помощь и автономный успех разделены явно."
          ],
          "required": true
        },
        {
          "id": "projects-final-learning-task-2",
          "kind": "code",
          "title": "Серия дней самостоятельных успехов",
          "goal": "Серия дней самостоятельных успехов",
          "prerequisites": [
            "projects-final-learning"
          ],
          "prompt": "records — список словарей day,task,passed,help. Верни максимальное число подряд идущих разных дней, где был самостоятельный успех. События не отсортированы; успех с help=True не учитывай.",
          "inputFormat": "Реализуй success_streak(records). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "success_streak([{'day':4,'task':'a','passed':True,'help':False},{'day':2,'task':'b','passed':True,'help':False},{'day':2,'task':'c','passed':True,'help':False},{'day':3,'task':'d','passed':True,'help':False}])"
              ],
              "output": "3",
              "explanation": "Серия 2,3,4."
            },
            {
              "input": [
                "success_streak([{'day':1,'task':'a','passed':True,'help':True}])"
              ],
              "output": "0",
              "explanation": "Только с-помощью не учитывается."
            }
          ],
          "initialCode": "def success_streak(records):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "success_streak([{'day':4,'task':'a','passed':True,'help':False},{'day':2,'task':'b','passed':True,'help':False},{'day':2,'task':'c','passed':True,'help':False},{'day':3,'task':'d','passed':True,'help':False}])",
              "expectedValue": 3,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Серия 2,3,4."
            },
            {
              "expression": "success_streak([{'day':1,'task':'a','passed':True,'help':True}])",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Только с-помощью не учитывается."
            },
            {
              "expression": "success_streak([])",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет дней."
            },
            {
              "expression": "success_streak([{'day':1,'task':'a','passed':True,'help':False},{'day':3,'task':'b','passed':True,'help':False}])",
              "expectedValue": 1,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Разрыв дня разделяет серии."
            }
          ],
          "reference": "def success_streak(records):\n    days=sorted({r[\"day\"] for r in records if r[\"passed\"] and not r[\"help\"]})\n    current=best=0\n    previous=None\n    for day in days:\n        current=current+1 if previous is not None and day==previous+1 else 1\n        best=max(best,current)\n        previous=day\n    return best",
          "alternative": "def success_streak(records):\n    days={r[\"day\"] for r in records if r[\"passed\"] and not r[\"help\"]}\n    best=0\n    for day in days:\n        if day-1 not in days:\n            length=1\n            while day+length in days:\n                length+=1\n            best=max(best,length)\n    return best",
          "wrongSolutions": [
            {
              "code": "def success_streak(records):\n    return sum(r[\"passed\"] and not r[\"help\"] for r in records)",
              "why": "Считаются события, а не разные соседние дни."
            },
            {
              "code": "def success_streak(records):\n    return len({r[\"day\"] for r in records if r[\"passed\"] and not r[\"help\"]})",
              "why": "Все успешные дни ошибочно считаются одной серией."
            }
          ],
          "hints": [
            "Сначала отбери дни успехов и бери только уникальные.",
            "Серия продолжается только при разнице 1.",
            "Упор я дочь дни, храни текущую и лучшую длины."
          ],
          "solutionExplanation": [
            "Несортированный входи несколько успехов в день не раздувают серию.",
            "Серия — добровольный показатель практики, не наказание за пропуски."
          ],
          "required": true
        },
        {
          "id": "projects-final-learning-task-3",
          "kind": "code",
          "title": "Недостающие обязательные задачи",
          "goal": "Недостающие обязательные задачи",
          "prerequisites": [
            "projects-final-learning"
          ],
          "prompt": "Верни алфавитный список уникальных required id, для которых нет самостоятельного успеха. Дополнительные решения не заменяют обязательные. records имеет схему работы.",
          "inputFormat": "Реализуй missing_required(records, required). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "missing_required([{'day':1,'task':'extra','passed':True,'help':False},{'day':2,'task':'a','passed':True,'help':False}],['b','a','b'])"
              ],
              "output": "['b']",
              "explanation": "Повторы required не увеличивают список."
            },
            {
              "input": [
                "missing_required([],[])"
              ],
              "output": "[]",
              "explanation": "Нет обязательных."
            }
          ],
          "initialCode": "def missing_required(records, required):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "missing_required([{'day':1,'task':'extra','passed':True,'help':False},{'day':2,'task':'a','passed':True,'help':False}],['b','a','b'])",
              "expectedValue": [
                "b"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Повторы required не увеличивают список."
            },
            {
              "expression": "missing_required([],[])",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет обязательных."
            },
            {
              "expression": "missing_required([{'day':1,'task':'a','passed':True,'help':True}],['a'])",
              "expectedValue": [
                "a"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Эталон с-помощью не считается самостоятельным."
            }
          ],
          "reference": "def missing_required(records, required):\n    solved={r[\"task\"] for r in records if r[\"passed\"] and not r[\"help\"]}\n    return sorted(set(required)-solved)",
          "alternative": "def missing_required(records, required):\n    result=[]\n    for task in sorted(set(required)):\n        if not any(r[\"task\"]==task and r[\"passed\"] and not r[\"help\"] for r in records):\n            result.append(task)\n    return result",
          "wrongSolutions": [
            {
              "code": "def missing_required(records, required):\n    return [] if len(records)>=len(required) else sorted(set(required))",
              "why": "Количество попыток не подтверждает решение каждого нужного id."
            },
            {
              "code": "def missing_required(records, required):\n    solved={r[\"task\"] for r in records if r[\"passed\"]}\n    return sorted(set(required)-solved)",
              "why": "Успех с помощью ошибочно закрывает самостоятельное требование."
            }
          ],
          "hints": [
            "Нужно разность множеств id.",
            "Сначала получи самостоятельные решения.",
            "Вычти solved из set(required) и отсортируй остаток."
          ],
          "solutionExplanation": [
            "Объявленные ключевые задачи проверяются по идентификатору.",
            "Дополнительная практика не скроет пропуск основы."
          ],
          "required": true
        },
        {
          "id": "projects-final-learning-task-4",
          "kind": "code",
          "title": "Полный отчёт обучения",
          "goal": "Полный отчёт обучения",
          "prerequisites": [
            "projects-final-learning"
          ],
          "prompt": "text — JSON-массив попыток схемы работы. Верни JSON объект attempts(все записи),solved(алфавитные уникальные самостоятельно решённые id),missing(недостающие required),complete(missing пуст),streak(максимальная серия разных дней самостоятельных успехов). complete зависит от наличия каждого обязательного ID, а не количества любых решений.",
          "inputFormat": "Реализуй study_report(text, required). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Типы и допустимые значения аргументов указаны в условии. Верни описанный результат без вывода в консоль и без input(). Пустые данные обрабатываются по объявленному контракту.",
          "examples": [
            {
              "input": [
                "__import__('json').loads(study_report('[{\"day\":1,\"task\":\"a\",\"passed\":true,\"help\":false},{\"day\":2,\"task\":\"b\",\"passed\":true,\"help\":true}]',['a','b']))"
              ],
              "output": "{'attempts': 2, 'solved': ['a'], 'missing': ['b'], 'complete': False, 'streak': 1}",
              "explanation": "Помощь сохраняется попыткой, но не прохождением."
            },
            {
              "input": [
                "__import__('json').loads(study_report('[]',[]))"
              ],
              "output": "{'attempts': 0, 'solved': [], 'missing': [], 'complete': True, 'streak': 0}",
              "explanation": "Пустой обязательный набор."
            }
          ],
          "initialCode": "def study_report(text, required):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "__import__('json').loads(study_report('[{\"day\":1,\"task\":\"a\",\"passed\":true,\"help\":false},{\"day\":2,\"task\":\"b\",\"passed\":true,\"help\":true}]',['a','b']))",
              "expectedValue": {
                "attempts": 2,
                "solved": [
                  "a"
                ],
                "missing": [
                  "b"
                ],
                "complete": false,
                "streak": 1
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Помощь сохраняется попыткой, но не прохождением."
            },
            {
              "expression": "__import__('json').loads(study_report('[]',[]))",
              "expectedValue": {
                "attempts": 0,
                "solved": [],
                "missing": [],
                "complete": true,
                "streak": 0
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой обязательный набор."
            },
            {
              "expression": "__import__('json').loads(study_report('[{\"day\":0,\"task\":\"a\",\"passed\":true,\"help\":false},{\"day\":1,\"task\":\"a\",\"passed\":true,\"help\":false}]',['a']))",
              "expectedValue": {
                "attempts": 2,
                "solved": [
                  "a"
                ],
                "missing": [],
                "complete": true,
                "streak": 2
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Одна задача и два дня — разные показатели."
            },
            {
              "expression": "__import__('json').loads(study_report('[{\"day\":1,\"task\":\"extra\",\"passed\":true,\"help\":false},{\"day\":3,\"task\":\"a\",\"passed\":true,\"help\":false}]',['b']))",
              "expectedValue": {
                "attempts": 2,
                "solved": [
                  "a",
                  "extra"
                ],
                "missing": [
                  "b"
                ],
                "complete": false,
                "streak": 1
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Дополнительная задача не заменяет обязательную; разрыв дня делит серию."
            }
          ],
          "reference": "import json\ndef study_report(text, required):\n    rows=json.loads(text)\n    success=[r for r in rows if r[\"passed\"] and not r[\"help\"]]\n    solved=sorted({r[\"task\"] for r in success})\n    missing=sorted(set(required)-set(solved))\n    days=sorted({r[\"day\"] for r in success})\n    current=best=0\n    previous=None\n    for day in days:\n        current=current+1 if previous is not None and day==previous+1 else 1\n        best=max(best,current)\n        previous=day\n    return json.dumps(dict(attempts=len(rows),solved=solved,missing=missing,complete=not missing,streak=best))",
          "alternative": "import json\ndef study_report(text, required):\n    records=json.loads(text)\n    solved=set()\n    days=set()\n    for r in records:\n        if r[\"passed\"] and r[\"help\"]==False:\n            solved.add(r[\"task\"])\n            days.add(r[\"day\"])\n    best=0\n    for start in days:\n        if start-1 not in days:\n            size=1\n            while start+size in days:\n                size+=1\n            best=max(best,size)\n    missing=sorted(task for task in set(required) if task not in solved)\n    return json.dumps({\"attempts\":len(records),\"solved\":sorted(solved),\"missing\":missing,\"complete\":len(missing)==0,\"streak\":best})",
          "wrongSolutions": [
            {
              "code": "import json\ndef study_report(text, required):\n    rows=json.loads(text)\n    solved=sorted({r[\"task\"] for r in rows if r[\"passed\"]})\n    missing=sorted(set(required)-set(solved))\n    return json.dumps(dict(attempts=len(rows),solved=solved,missing=missing,complete=not missing,streak=len(rows)))",
              "why": "Помощь выдана за самостоятельность, попытки — задни."
            },
            {
              "code": "import json\ndef study_report(text, required):\n    rows=json.loads(text)\n    good=[r for r in rows if r[\"passed\"] and not r[\"help\"]]\n    solved=sorted({r[\"task\"] for r in good})\n    missing=sorted(set(required)-set(solved))\n    return json.dumps(dict(attempts=len(rows),solved=solved,missing=missing,complete=len(solved)>=len(set(required)),streak=len({r[\"day\"] for r in good})))",
              "why": "Количество разных задач не проверяет required, все разные дни необязательно подряд."
            }
          ],
          "hints": [
            "Сначала отдел и события от устойчивых результатов.",
            "solved имена и для streak дни выводятся из одного независимого отбора.",
            "Полноту проверяй через missing, а серию через соседство отсортированных дней."
          ],
          "solutionExplanation": [
            "Итоговая связала JSON, множества, сортировку, состояние и честные критерии.",
            "Прогресс набора, просмотр страницы и успех с помощью не подменяют самостоятельные решения."
          ],
          "required": true
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.12/tutorial/datastructures.html",
    "https://docs.python.org/3.12/howto/sorting.html",
    "https://docs.python.org/3.12/library/json.html",
    "https://docs.python.org/3.12/library/csv.html"
  ]
};

export default module;
