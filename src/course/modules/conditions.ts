import type { CourseModule } from '../types';

const module: CourseModule = {
  "id": "conditions",
  "title": "Сравнения, логика и условия",
  "track": "base",
  "depth": "Практический модуль",
  "goal": "Переводить правила в точные проверки, покрывать границы и безопасно выбирать действия.",
  "prerequisites": [
    "arithmetic"
  ],
  "lessons": [
    {
      "id": "conditions-comparison",
      "title": "Сравнения и = против ==",
      "goal": "Получить bool из сравнения и отличить проверку от присваивания.",
      "prerequisites": [],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "conditions-comparison-step-1",
          "title": "Вопрос к значениям",
          "paragraphs": [
            "Сравнение задаёт вопрос и получает True или False. Знак == проверяет равенство, != — неравенство, < и > — строгий порядок, <= и >= включают границу. Сначала Python вычисляет значения слева и справа, затем сравнивает их. Наличие пробелов вокруг оператора помогает чтению, но смысл задаёт сам знак.",
            "Не путай = и ==. Запись age = 18 связывает имя с числом. Запись age == 18 ничего не присваивает и не печатает: она получает логический результат. Его можно сохранить или передать в print. Если случайно использовать = в обычном условии if, получится синтаксическая ошибка, а не проверка."
          ],
          "examples": [
            {
              "id": "conditions-comparison-example-1",
              "title": "Присваивание и вопрос",
              "code": "age=18\nprint(age==18)\nprint(age>18)\nprint(age>=18)",
              "output": "True\nFalse\nTrue",
              "explanation": "Возраст не меняется. Строгое сравнение исключает 18, нестрогое включает."
            }
          ],
          "goal": "Объяснить: Сравнение задаёт вопрос и получает True или False.",
          "prerequisites": []
        },
        {
          "id": "conditions-comparison-step-2",
          "title": "Равенство зависит от данных",
          "paragraphs": [
            "Строки тоже сравниваются на точное равенство. \"Python\" и \"python\" различаются регистром, а \"да\" и \"да \" — лишним пробелом. Не исправляй данные молча, если условие требует точного совпадения. Для числового порога сначала преобразуй input в int или float, иначе сравнивается текстовая запись или возникает TypeError.",
            "Числа 4 и 4.0 численно равны, хотя их типы различаются. Не используй сравнение с bool как способ проверки типа: Python считает True численно равным 1. Здесь выбираем проверки по смыслу задачи, а не по внешнему виду. Для приблизительных float отдельное правило точности потребуется позже; сейчас используем целые границы."
          ],
          "examples": [
            {
              "id": "conditions-comparison-example-2",
              "title": "Точный текст",
              "code": "print(\"Python\"==\"python\")\nprint(\"да\"==\"да \")",
              "output": "False\nFalse",
              "explanation": "Регистр и завершающий пробел являются частью строковых данных."
            }
          ],
          "goal": "Объяснить: Строки тоже сравниваются на точное равенство.",
          "prerequisites": [
            "conditions-comparison-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "conditions-equal-values",
          "kind": "code",
          "title": "Равны ли числа?",
          "goal": "Выразить вопрос о равенстве оператором ==.",
          "prerequisites": [
            "conditions-comparison"
          ],
          "prompt": "Прочитай два целых числа. Выведи True, если они равны, иначе False.",
          "inputFormat": "2 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Два целых числа от -1000000 до 1000000.",
          "examples": [
            {
              "input": [
                "3",
                "3"
              ],
              "output": "True",
              "explanation": "== не меняет переменные; он возвращает логический результат сравнения."
            },
            {
              "input": [
                "4",
                "3"
              ],
              "output": "False",
              "explanation": "== не меняет переменные; он возвращает логический результат сравнения."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "3",
                "3"
              ],
              "expectedOutput": "True",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "3",
                "4"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "0",
                "0"
              ],
              "expectedOutput": "True",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "-2",
                "-2"
              ],
              "expectedOutput": "True",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "4",
                "3"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "a=int(input())\nb=int(input())\nprint(a==b)",
          "alternative": "first=int(input())\nsecond=int(input())\nresult=not(first!=second)\nprint(result)",
          "wrongSolutions": [
            {
              "code": "a=int(input())\nb=int(input())\nprint(a!=b)",
              "why": "Проверка обращена."
            },
            {
              "code": "a=int(input())\nb=int(input())\nprint(a>b)",
              "why": "Большее значение не означает равенство."
            }
          ],
          "hints": [
            "Нужны два int.",
            "Результат сравнения уже bool.",
            "Передай a == b в print."
          ],
          "solutionExplanation": [
            "== не меняет переменные; он возвращает логический результат сравнения."
          ],
          "required": true
        },
        {
          "id": "conditions-at-least",
          "kind": "code",
          "title": "Достаточно мест?",
          "goal": "Включить границу в условие достаточности.",
          "prerequisites": [
            "conditions-comparison"
          ],
          "prompt": "Прочитай число свободных мест и число посетителей. Выведи True, если мест не меньше посетителей.",
          "inputFormat": "2 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Оба значения — целые от 0 до 1000000.",
          "examples": [
            {
              "input": [
                "5",
                "5"
              ],
              "output": "True",
              "explanation": ">= включает и избыток мест, и точное равенство."
            },
            {
              "input": [
                "0",
                "1"
              ],
              "output": "False",
              "explanation": ">= включает и избыток мест, и точное равенство."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "5",
                "5"
              ],
              "expectedOutput": "True",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "6",
                "5"
              ],
              "expectedOutput": "True",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "4",
                "5"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "0",
                "0"
              ],
              "expectedOutput": "True",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "0",
                "1"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "seats=int(input())\npeople=int(input())\nprint(seats>=people)",
          "alternative": "people_limit=int(input())\nrequested=int(input())\nprint(not(people_limit<requested))",
          "wrongSolutions": [
            {
              "code": "s=int(input())\np=int(input())\nprint(s>p)",
              "why": "При точном совпадении места тоже достаточны."
            },
            {
              "code": "s=int(input())\np=int(input())\nprint(s<=p)",
              "why": "Направление сравнения перепутано."
            }
          ],
          "hints": [
            "Места могут совпасть с количеством людей.",
            "Нужен знак «больше или равно».",
            "Проверь вход 5 и 5."
          ],
          "solutionExplanation": [
            ">= включает и избыток мест, и точное равенство."
          ],
          "required": true
        },
        {
          "id": "conditions-text-match",
          "kind": "code",
          "title": "Точное кодовое слово",
          "goal": "Сравнить текст без скрытой нормализации.",
          "prerequisites": [
            "conditions-comparison"
          ],
          "prompt": "Прочитай строку. Выведи True, только если она в точности равна Python. Регистр и пробелы значимы.",
          "inputFormat": "1 строка в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Одна строка длиной 0–200; регистр и пробелы являются значимыми данными.",
          "examples": [
            {
              "input": [
                "Python"
              ],
              "output": "True",
              "explanation": "Оператор == сравнивает строковые значения посимвольно."
            },
            {
              "input": [
                "Py"
              ],
              "output": "False",
              "explanation": "Оператор == сравнивает строковые значения посимвольно."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "Python"
              ],
              "expectedOutput": "True",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "python"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "Python "
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                ""
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "Py"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "word=input()\nprint(word==\"Python\")",
          "alternative": "word=input()\nprint(not(word!=\"Python\"))",
          "wrongSolutions": [
            {
              "code": "word=input()\nprint(bool(word))",
              "why": "Непустой текст не обязан совпадать с кодовым словом."
            },
            {
              "code": "word=input()\nprint(word=='python')",
              "why": "Неправильный регистр у проверяемого слова."
            }
          ],
          "hints": [
            "Требуется точное равенство.",
            "Сравни с литералом \"Python\".",
            "Не удаляй пробелы и не меняй регистр."
          ],
          "solutionExplanation": [
            "Оператор == сравнивает строковые значения посимвольно."
          ],
          "required": true
        },
        {
          "id": "conditions-equality-claims",
          "kind": "choice",
          "title": "Присвоить или спросить?",
          "goal": "Присвоить или спросить?",
          "prerequisites": [
            "conditions-comparison"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "True",
              "explanation": "Аналог: count=6; print(count==6). Присваивание определяет значение, сравнение получает bool, print показывает его."
            }
          ],
          "answer": [
            "1",
            "3"
          ],
          "hints": [
            "У = и == разные назначения.",
            "Само выражение в файле не выводится.",
            "Результат сравнения — bool."
          ],
          "solutionExplanation": [
            "= присваивает, == сравнивает; для печати логического результата нужен print."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "x = 5 связывает имя с числом."
            },
            {
              "id": "2",
              "text": "x == 5 присваивает x число 5."
            },
            {
              "id": "3",
              "text": "print(x == 5) печатает результат сравнения."
            },
            {
              "id": "4",
              "text": "Строки \"Да\" и \"да\" всегда равны."
            }
          ]
        }
      ]
    },
    {
      "id": "conditions-bounds",
      "title": "Границы и цепочки сравнений",
      "goal": "Записать закрытый, открытый и полуоткрытый интервал без ошибки на границе.",
      "prerequisites": [
        "conditions-comparison"
      ],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "conditions-bounds-step-1",
          "title": "Включать ли край",
          "paragraphs": [
            "Фраза «от 3 до 7 включительно» означает 3 <= x <= 7. Если границы не включаются, запись 3 < x < 7. Полуоткрытый диапазон включает только один край: 0 <= index < size. Слово «между» без уточнения иногда неоднозначно; в задачах границы задаются явно. Перед кодом проверь два крайних значения и по одному числу рядом с ними.",
            "Python поддерживает цепочку сравнений. В записи low <= value <= high проверяются обе соседние связи, и value вычисляется один раз. Это читается как математическая запись интервала. Не заменяй цепочку выражением low <= value >= high: оно означает, что value не меньше обеих границ, а не лежит между ними."
          ],
          "examples": [
            {
              "id": "conditions-bounds-example-1",
              "title": "Закрытый диапазон",
              "code": "temperature=20\nprint(18<=temperature<=24)",
              "output": "True",
              "explanation": "Обе границы включаются: 18 и 24 тоже были бы допустимы."
            }
          ],
          "goal": "Объяснить: Фраза «от 3 до 7 включительно» означает 3 <= x <= 7.",
          "prerequisites": [
            "conditions-comparison"
          ]
        },
        {
          "id": "conditions-bounds-step-2",
          "title": "Разные единицы и порядок данных",
          "paragraphs": [
            "Границы и проверяемая величина должны иметь один смысл и единицы. Если интервал задан в минутах, а вход в секундах, сначала выбери согласованный масштаб. Если условие гарантирует low <= high, можно прямо использовать границы; если нет, потребуется привести порядок или объявить отдельное правило. Не молчи о таком предположении.",
            "Тесты на середину интервала редко находят ошибку знака. Для допустимого возраста 12–17 особенно нужны 11, 12, 17 и 18. Для индекса 0 <= index < size нужно проверить index = size: он уже выходит за пределы. Правила интервалов пригодятся для циклов, срезов и коллекций, но пока вычисляем только bool."
          ],
          "examples": [
            {
              "id": "conditions-bounds-example-2",
              "title": "Полуоткрытая шкала",
              "code": "position=5\nsize=5\nprint(0<=position<size)",
              "output": "False",
              "explanation": "В шкале из пяти позиций допустимы номера 0–4; номер 5 исключён."
            }
          ],
          "goal": "Объяснить: Границы и проверяемая величина должны иметь один смысл и единицы.",
          "prerequisites": [
            "conditions-bounds-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "conditions-closed-interval",
          "kind": "code",
          "title": "Попадание в интервал",
          "goal": "Проверить включённые границы параметризованного интервала.",
          "prerequisites": [
            "conditions-bounds"
          ],
          "prompt": "Прочитай low, high и x как целые числа, low ≤ high. Выведи True, если x находится от low до high включительно.",
          "inputFormat": "3 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Все значения — целые от -1000000 до 1000000; low ≤ high.",
          "examples": [
            {
              "input": [
                "3",
                "7",
                "3"
              ],
              "output": "True",
              "explanation": "Цепочка объединяет два сравнения и включает оба края."
            },
            {
              "input": [
                "0",
                "0",
                "0"
              ],
              "output": "True",
              "explanation": "Цепочка объединяет два сравнения и включает оба края."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "3",
                "7",
                "3"
              ],
              "expectedOutput": "True",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "3",
                "7",
                "7"
              ],
              "expectedOutput": "True",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "3",
                "7",
                "2"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "3",
                "7",
                "8"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "0",
                "0",
                "0"
              ],
              "expectedOutput": "True",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "low=int(input())\nhigh=int(input())\nx=int(input())\nprint(low<=x<=high)",
          "alternative": "low=int(input())\nhigh=int(input())\nx=int(input())\nprint(x>=low and x<=high)",
          "wrongSolutions": [
            {
              "code": "lo=int(input())\nhi=int(input())\nx=int(input())\nprint(lo<x<hi)",
              "why": "Обе допустимые границы исключены."
            },
            {
              "code": "lo=int(input())\nhi=int(input())\nx=int(input())\nprint(lo<=x>=hi)",
              "why": "Вторая связь направлена неверно."
            }
          ],
          "hints": [
            "Запиши два требования: не ниже low и не выше high.",
            "Обе границы допустимы.",
            "Используй low <= x <= high."
          ],
          "solutionExplanation": [
            "Цепочка объединяет два сравнения и включает оба края."
          ],
          "required": true
        },
        {
          "id": "conditions-valid-index",
          "kind": "code",
          "title": "Допустимый номер",
          "goal": "Различить размер и максимальный номер.",
          "prerequisites": [
            "conditions-bounds"
          ],
          "prompt": "Прочитай положительное число позиций size и целый номер index. Выведи True, если 0 ≤ index < size.",
          "inputFormat": "2 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "size от 1 до 1000000, index от -1000000 до 1000000.",
          "examples": [
            {
              "input": [
                "5",
                "0"
              ],
              "output": "True",
              "explanation": "Для size позиций с нуля максимальный допустимый index равен size - 1."
            },
            {
              "input": [
                "1",
                "0"
              ],
              "output": "True",
              "explanation": "Для size позиций с нуля максимальный допустимый index равен size - 1."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "5",
                "0"
              ],
              "expectedOutput": "True",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "5",
                "4"
              ],
              "expectedOutput": "True",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "5",
                "5"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "5",
                "-1"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "1",
                "0"
              ],
              "expectedOutput": "True",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "size=int(input())\nindex=int(input())\nprint(0<=index<size)",
          "alternative": "size=int(input())\nindex=int(input())\nprint(index>=0 and index<=size-1)",
          "wrongSolutions": [
            {
              "code": "s=int(input())\ni=int(input())\nprint(0<=i<=s)",
              "why": "Правая граница должна исключаться."
            },
            {
              "code": "s=int(input())\ni=int(input())\nprint(0<i<s)",
              "why": "Нулевая позиция допустима."
            }
          ],
          "hints": [
            "Нумерация начинается с нуля.",
            "Последний номер на единицу меньше size.",
            "Левая граница включена, правая исключена."
          ],
          "solutionExplanation": [
            "Для size позиций с нуля максимальный допустимый index равен size - 1."
          ],
          "required": true
        },
        {
          "id": "conditions-open-interval",
          "kind": "code",
          "title": "Строго внутри",
          "goal": "Объявить строгие границы.",
          "prerequisites": [
            "conditions-bounds"
          ],
          "prompt": "Прочитай две целые границы left < right и целое x. Выведи True, если x строго внутри интервала.",
          "inputFormat": "3 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "left, right, x — целые от -1000000 до 1000000, left < right.",
          "examples": [
            {
              "input": [
                "0",
                "10",
                "5"
              ],
              "output": "True",
              "explanation": "Два строгих сравнения принимают только значения между границами."
            },
            {
              "input": [
                "2",
                "3",
                "2"
              ],
              "output": "False",
              "explanation": "Два строгих сравнения принимают только значения между границами."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "0",
                "10",
                "5"
              ],
              "expectedOutput": "True",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "0",
                "10",
                "0"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "0",
                "10",
                "10"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "0",
                "10",
                "11"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "2",
                "3",
                "2"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "left=int(input())\nright=int(input())\nx=int(input())\nprint(left<x<right)",
          "alternative": "left=int(input())\nright=int(input())\nx=int(input())\nprint(x>left and x<right)",
          "wrongSolutions": [
            {
              "code": "l=int(input())\nr=int(input())\nx=int(input())\nprint(l<=x<=r)",
              "why": "В задаче границы не включаются."
            },
            {
              "code": "l=int(input())\nr=int(input())\nx=int(input())\nprint(l<x)",
              "why": "Не проверена правая граница."
            }
          ],
          "hints": [
            "Слово «строго» исключает равенство.",
            "Нужны две проверки, не одна.",
            "Сравни left < x < right."
          ],
          "solutionExplanation": [
            "Два строгих сравнения принимают только значения между границами."
          ],
          "required": true
        },
        {
          "id": "conditions-boundary-predict",
          "kind": "predict",
          "title": "Одна точка, разные интервалы",
          "goal": "Одна точка, разные интервалы",
          "prerequisites": [
            "conditions-bounds"
          ],
          "prompt": "Предскажи вывод.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "True\nFalse",
              "explanation": "Аналог для x=4: print(1<=x<=4) включает правую границу; print(1<=x<4) исключает её."
            }
          ],
          "answer": "True\nFalse\nFalse",
          "hints": [
            "x совпадает с правым краем.",
            "Проверь, какой знак стоит рядом с 10.",
            "Включённый край требует <=."
          ],
          "solutionExplanation": [
            "Первая цепочка включает 10, две остальные — нет."
          ],
          "required": true,
          "initialCode": "x=10\nprint(0<=x<=10)\nprint(0<=x<10)\nprint(0<x<10)"
        }
      ]
    },
    {
      "id": "conditions-branches",
      "title": "if и else: выбор действия",
      "goal": "Написать взаимоисключающие ветви с правильными отступами.",
      "prerequisites": [
        "conditions-bounds"
      ],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "conditions-branches-step-1",
          "title": "От вопроса к действию",
          "paragraphs": [
            "Сравнение само по себе получает bool, но ещё не выбирает разные действия. Конструкция if condition: выполняет вложенный блок, если условие истинно. else: задаёт действия для противоположного случая. Двоеточие завершает заголовок, отступ из четырёх пробелов показывает принадлежность команды блоку. После блока отступ возвращается к предыдущему уровню.",
            "В if/else выполняется ровно одна из двух ветвей. Команда после обеих ветвей без отступа выполнится независимо от выбора, если программа не завершилась ошибкой. Это важно для общего сообщения и итогового вывода. Не дублируй его в каждой ветви, когда можно разместить один раз после конструкции."
          ],
          "examples": [
            {
              "id": "conditions-branches-example-1",
              "title": "Достаточный возраст",
              "code": "age=16\nif age>=18:\n    print(\"Взрослый билет\")\nelse:\n    print(\"Льготный билет\")\nprint(\"Выбор завершён\")",
              "output": "Льготный билет\nВыбор завершён",
              "explanation": "Выбирается одна ветвь, а заключительная строка вне if выполняется в любом случае."
            }
          ],
          "goal": "Объяснить: Сравнение само по себе получает bool, но ещё не выбирает разные действия.",
          "prerequisites": [
            "conditions-bounds"
          ]
        },
        {
          "id": "conditions-branches-step-2",
          "title": "Ошибки записи и смысла",
          "paragraphs": [
            "Если пропущено двоеточие или отступ, Python выдаёт синтаксическую ошибку. Если отступ допустим, но команда попала не в ту ветвь, программа может работать и давать неверный результат. Для такого случая нужны входы, проходящие по обеим ветвям. Проверять только положительное число недостаточно для задачи о знаке.",
            "В условии if можно использовать уже полученный bool или само сравнение. Запись if is_ready: читается прямо. Не добавляй == True без необходимости. Для текстового ответа вроде \"да\" сначала нужен явный вопрос text == \"да\": непустая строка \"нет\" тоже истинна сама по себе."
          ],
          "examples": [
            {
              "id": "conditions-branches-example-2",
              "title": "Текстовый ответ",
              "code": "answer=\"нет\"\nif answer==\"да\":\n    print(\"Подтверждено\")\nelse:\n    print(\"Не подтверждено\")",
              "output": "Не подтверждено",
              "explanation": "Проверяется конкретное значение, а не непустота строки."
            }
          ],
          "goal": "Объяснить: Если пропущено двоеточие или отступ, Python выдаёт синтаксическую ошибку.",
          "prerequisites": [
            "conditions-branches-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "conditions-parity",
          "kind": "code",
          "title": "Чётное или нечётное",
          "goal": "Использовать остаток как условие выбора.",
          "prerequisites": [
            "conditions-branches"
          ],
          "prompt": "Прочитай целое число. Выведи чётное, если остаток по 2 равен 0, иначе нечётное.",
          "inputFormat": "1 строка в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Одно целое число от -1000000 до 1000000; ноль и отрицательные числа разрешены.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "чётное",
              "explanation": "Для отрицательных чисел % 2 также корректно проверяет делимость."
            },
            {
              "input": [
                "-3"
              ],
              "output": "нечётное",
              "explanation": "Для отрицательных чисел % 2 также корректно проверяет делимость."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "чётное",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "2"
              ],
              "expectedOutput": "чётное",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "3"
              ],
              "expectedOutput": "нечётное",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "-4"
              ],
              "expectedOutput": "чётное",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "-3"
              ],
              "expectedOutput": "нечётное",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "n=int(input())\nif n%2==0:\n    print(\"чётное\")\nelse:\n    print(\"нечётное\")",
          "alternative": "n=int(input())\nif n%2!=0:\n    print(\"нечётное\")\nelse:\n    print(\"чётное\")",
          "wrongSolutions": [
            {
              "code": "n=int(input())\nif n%2==1:\n    print('чётное')\nelse:\n    print('нечётное')",
              "why": "Метки чётности переставлены."
            },
            {
              "code": "n=int(input())\nif n>0:\n    print('чётное')\nelse:\n    print('нечётное')",
              "why": "Знак не определяет чётность."
            }
          ],
          "hints": [
            "Чётность связана с делением на 2.",
            "Нулевой остаток означает чётное число.",
            "В if/else печатай ровно одну из двух меток."
          ],
          "solutionExplanation": [
            "Для отрицательных чисел % 2 также корректно проверяет делимость."
          ],
          "required": true
        },
        {
          "id": "conditions-absolute",
          "kind": "code",
          "title": "Модуль числа ветвлением",
          "goal": "Изменить значение только при выполнении условия.",
          "prerequisites": [
            "conditions-branches"
          ],
          "prompt": "Прочитай целое число. Выведи его абсолютное значение: отрицательное нужно сменить на противоположное, остальные оставить.",
          "inputFormat": "1 строка в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Одно целое число от -1000000 до 1000000; ноль должен остаться нулём.",
          "examples": [
            {
              "input": [
                "-7"
              ],
              "output": "7",
              "explanation": "Условное обновление сохраняет неотрицательные значения и обращает отрицательные."
            },
            {
              "input": [
                "-1"
              ],
              "output": "1",
              "explanation": "Условное обновление сохраняет неотрицательные значения и обращает отрицательные."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "-7"
              ],
              "expectedOutput": "7",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "0",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "8"
              ],
              "expectedOutput": "8",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "-1"
              ],
              "expectedOutput": "1",
              "description": "Граничный или изменённый случай 4"
            }
          ],
          "reference": "n=int(input())\nif n<0:\n    n=-n\nprint(n)",
          "alternative": "n=int(input())\nif n>=0:\n    print(n)\nelse:\n    print(-n)",
          "wrongSolutions": [
            {
              "code": "n=int(input())\nprint(-n)",
              "why": "Знак меняется у всех чисел, включая положительные."
            },
            {
              "code": "n=int(input())\nif n<0:\n    print(n)\nelse:\n    print(-n)",
              "why": "Ветви дают отрицательный результат."
            }
          ],
          "hints": [
            "Проверь знак числа.",
            "Менять знак нужно только при n < 0.",
            "Можно обновить n, затем один раз вывести после if."
          ],
          "solutionExplanation": [
            "Условное обновление сохраняет неотрицательные значения и обращает отрицательные."
          ],
          "required": true
        },
        {
          "id": "conditions-ticket",
          "kind": "code",
          "title": "Билет по возрасту",
          "goal": "Применить одну границу к прикладной цене.",
          "prerequisites": [
            "conditions-branches"
          ],
          "prompt": "Прочитай целый возраст от 0 до 120. Для возраста меньше 7 выведи 0, для остальных — 200.",
          "inputFormat": "1 строка в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Целый возраст 0–120. Бесплатная категория строго младше 7 лет.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "0",
              "explanation": "if/else разделяет бесплатный и обычный билет; значение 7 попадает во вторую ветвь."
            },
            {
              "input": [
                "120"
              ],
              "output": "200",
              "explanation": "if/else разделяет бесплатный и обычный билет; значение 7 попадает во вторую ветвь."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "0",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "6"
              ],
              "expectedOutput": "0",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "7"
              ],
              "expectedOutput": "200",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "8"
              ],
              "expectedOutput": "200",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "120"
              ],
              "expectedOutput": "200",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "age=int(input())\nif age<7:\n    print(0)\nelse:\n    print(200)",
          "alternative": "age=int(input())\nprice=200\nif age<7:\n    price=0\nprint(price)",
          "wrongSolutions": [
            {
              "code": "age=int(input())\nif age<=7:\n    print(0)\nelse:\n    print(200)",
              "why": "Семилетний посетитель уже платит."
            },
            {
              "code": "age=int(input())\nif age<7:\n    print(0)\nprint(200)",
              "why": "Платная цена печатается даже после бесплатной."
            }
          ],
          "hints": [
            "Граница 7 не входит в бесплатную категорию.",
            "Нужна ровно одна цена.",
            "Общий print после if допустим только при сохранённой цене, а не при двух отдельных сообщениях."
          ],
          "solutionExplanation": [
            "if/else разделяет бесплатный и обычный билет; значение 7 попадает во вторую ветвь."
          ],
          "required": true
        },
        {
          "id": "conditions-indent-order",
          "kind": "order",
          "title": "Собери ветвление",
          "goal": "Собери ветвление",
          "prerequisites": [
            "conditions-branches"
          ],
          "prompt": "Расположи строки, чтобы при n < 0 печаталось минус, иначе не минус.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "готово",
              "explanation": "Аналог: if True: с вложенным print(\"готово\") выполняет блок; else на уровне if задаёт другой путь, который здесь пропускается."
            }
          ],
          "answer": [
            "3",
            "1",
            "4",
            "2"
          ],
          "hints": [
            "Сначала заголовок if.",
            "Затем его вложенный print.",
            "else стоит на уровне if."
          ],
          "solutionExplanation": [
            "Отступы связывают команды с нужными заголовками."
          ],
          "required": true,
          "blocks": [
            {
              "id": "1",
              "text": "    print(\"минус\")"
            },
            {
              "id": "2",
              "text": "    print(\"не минус\")"
            },
            {
              "id": "3",
              "text": "if n < 0:"
            },
            {
              "id": "4",
              "text": "else:"
            }
          ]
        }
      ]
    },
    {
      "id": "conditions-elif",
      "title": "Несколько случаев: elif",
      "goal": "Упорядочить взаимоисключающие проверки и избежать нескольких ответов.",
      "prerequisites": [
        "conditions-branches"
      ],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "conditions-elif-step-1",
          "title": "Проверки сверху вниз",
          "paragraphs": [
            "Для трёх и более случаев используют if, затем elif и необязательный else. Python проверяет условия сверху вниз и после первой истинной ветви пропускает остальные ветви этой цепочки. Это позволяет классифицировать знак числа, диапазон баллов или тариф. else не имеет собственного условия и служит последним оставшимся случаем.",
            "Несколько независимых if ведут себя иначе: каждое условие проверяется отдельно и может напечатать свой ответ. Если балл 95 удовлетворяет порогам 90, 70 и 50, три независимых if могут выдать три категории. Для единственной оценки нужна одна цепочка или аккуратно непересекающиеся условия."
          ],
          "examples": [
            {
              "id": "conditions-elif-example-1",
              "title": "Знак числа",
              "code": "n=0\nif n>0:\n    print(\"плюс\")\nelif n<0:\n    print(\"минус\")\nelse:\n    print(\"ноль\")",
              "output": "ноль",
              "explanation": "Ноль не удовлетворяет первым двум проверкам и попадает в else."
            }
          ],
          "goal": "Объяснить: Для трёх и более случаев используют if, затем elif и необязательный else.",
          "prerequisites": [
            "conditions-branches"
          ]
        },
        {
          "id": "conditions-elif-step-2",
          "title": "Порядок — часть алгоритма",
          "paragraphs": [
            "Пороги вида «не меньше» обычно удобно проверять от большего к меньшему. После провала score >= 90 в ветви elif score >= 70 уже известно, что score < 90. Повторять верхнюю границу не обязательно. Если начать с score >= 50, более высокие баллы тоже попадут туда и дальнейшие проверки не выполнятся.",
            "Проверяй каждый порог непосредственно на границе, чуть ниже и чуть выше. Не называй последний else «ошибкой», если он представляет обычную допустимую категорию. Если требуется недопустимый ввод, это должно быть явно записано в условии и обработано отдельно."
          ],
          "examples": [
            {
              "id": "conditions-elif-example-2",
              "title": "Порядок порогов",
              "code": "score=85\nif score>=90:\n    print(\"A\")\nelif score>=70:\n    print(\"B\")\nelse:\n    print(\"C\")",
              "output": "B",
              "explanation": "Вторая ветвь означает 70 ≤ score < 90 благодаря уже проваленной первой проверке."
            }
          ],
          "goal": "Объяснить: Пороги вида «не меньше» обычно удобно проверять от большего к меньшему.",
          "prerequisites": [
            "conditions-elif-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "conditions-sign",
          "kind": "code",
          "title": "Три знака",
          "goal": "Разделить три взаимоисключающих состояния.",
          "prerequisites": [
            "conditions-elif"
          ],
          "prompt": "Прочитай целое число. Выведи плюс для положительного, минус для отрицательного, ноль для нуля.",
          "inputFormat": "1 строка в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Одно целое число от -1000000 до 1000000; вывод — одна из трёх точных меток.",
          "examples": [
            {
              "input": [
                "-4"
              ],
              "output": "минус",
              "explanation": "Одна цепочка выбирает первую подходящую ветвь и исключает двойной вывод."
            },
            {
              "input": [
                "-1"
              ],
              "output": "минус",
              "explanation": "Одна цепочка выбирает первую подходящую ветвь и исключает двойной вывод."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "-4"
              ],
              "expectedOutput": "минус",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "ноль",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "7"
              ],
              "expectedOutput": "плюс",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "1"
              ],
              "expectedOutput": "плюс",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "-1"
              ],
              "expectedOutput": "минус",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "n=int(input())\nif n>0:\n    print(\"плюс\")\nelif n<0:\n    print(\"минус\")\nelse:\n    print(\"ноль\")",
          "alternative": "n=int(input())\nif n==0:\n    print(\"ноль\")\nelif n<0:\n    print(\"минус\")\nelse:\n    print(\"плюс\")",
          "wrongSolutions": [
            {
              "code": "n=int(input())\nif n>=0:\n    print('плюс')\nelse:\n    print('минус')",
              "why": "Ноль не выделен в отдельный случай."
            },
            {
              "code": "n=int(input())\nif n>0:\n    print('плюс')\nif n<0:\n    print('минус')\nelse:\n    print('ноль')",
              "why": "else относится только ко второму if, поэтому положительное число получает два ответа."
            }
          ],
          "hints": [
            "Есть три случая, включая ноль.",
            "Используй одну цепочку if/elif/else.",
            "Проверь, что любой вход печатает ровно одну строку."
          ],
          "solutionExplanation": [
            "Одна цепочка выбирает первую подходящую ветвь и исключает двойной вывод."
          ],
          "required": true
        },
        {
          "id": "conditions-grade",
          "kind": "code",
          "title": "Категория результата",
          "goal": "Упорядочить несколько включённых порогов.",
          "prerequisites": [
            "conditions-elif"
          ],
          "prompt": "Прочитай целые баллы 0–100. Выведи A при баллах не меньше 90, B при 70–89, C при 50–69, D при 0–49.",
          "inputFormat": "1 строка в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Целые баллы 0–100; пороги 50, 70 и 90 включаются в более высокую категорию.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "D",
              "explanation": "При проверке от большего к меньшему каждый следующий elif уже знает верхнюю границу из предыдущих неудач."
            },
            {
              "input": [
                "100"
              ],
              "output": "A",
              "explanation": "При проверке от большего к меньшему каждый следующий elif уже знает верхнюю границу из предыдущих неудач."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "D",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "49"
              ],
              "expectedOutput": "D",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "50"
              ],
              "expectedOutput": "C",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "69"
              ],
              "expectedOutput": "C",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "70"
              ],
              "expectedOutput": "B",
              "description": "Граничный или изменённый случай 5"
            },
            {
              "stdin": [
                "89"
              ],
              "expectedOutput": "B",
              "description": "Граничный или изменённый случай 6"
            },
            {
              "stdin": [
                "90"
              ],
              "expectedOutput": "A",
              "description": "Граничный или изменённый случай 7"
            },
            {
              "stdin": [
                "100"
              ],
              "expectedOutput": "A",
              "description": "Граничный или изменённый случай 8"
            }
          ],
          "reference": "score=int(input())\nif score>=90:\n    print(\"A\")\nelif score>=70:\n    print(\"B\")\nelif score>=50:\n    print(\"C\")\nelse:\n    print(\"D\")",
          "alternative": "s=int(input())\nif s<50:\n    print(\"D\")\nelif s<70:\n    print(\"C\")\nelif s<90:\n    print(\"B\")\nelse:\n    print(\"A\")",
          "wrongSolutions": [
            {
              "code": "s=int(input())\nif s>=50:\n    print('C')\nelif s>=70:\n    print('B')\nelif s>=90:\n    print('A')\nelse:\n    print('D')",
              "why": "Ранний низкий порог перехватывает высокие баллы."
            },
            {
              "code": "s=int(input())\nif s>90:\n    print('A')\nelif s>70:\n    print('B')\nelif s>50:\n    print('C')\nelse:\n    print('D')",
              "why": "Равенство порогу исключено."
            }
          ],
          "hints": [
            "Можно идти сверху вниз или снизу вверх.",
            "Не допускай, чтобы низкий порог перехватил все большие значения.",
            "Проверь ровно 50, 70 и 90."
          ],
          "solutionExplanation": [
            "При проверке от большего к меньшему каждый следующий elif уже знает верхнюю границу из предыдущих неудач."
          ],
          "required": true
        },
        {
          "id": "conditions-temperature-state",
          "kind": "code",
          "title": "Состояние воды в модели",
          "goal": "Читать полуоткрытые категории без неподтверждённых физических обещаний.",
          "prerequisites": [
            "conditions-elif"
          ],
          "prompt": "Прочитай целую температуру. По упрощённой модели выведи лёд при t < 0, вода при 0 ≤ t < 100, пар при t ≥ 100. Это учебная классификация, без физики переходных смесей.",
          "inputFormat": "1 строка в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Целая температура от -1000 до 1000. Используется только упрощённая модель из условия.",
          "examples": [
            {
              "input": [
                "-1"
              ],
              "output": "лёд",
              "explanation": "Проверки последовательно делят числовую шкалу на три объявленные категории."
            },
            {
              "input": [
                "101"
              ],
              "output": "пар",
              "explanation": "Проверки последовательно делят числовую шкалу на три объявленные категории."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "-1"
              ],
              "expectedOutput": "лёд",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "вода",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "99"
              ],
              "expectedOutput": "вода",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "100"
              ],
              "expectedOutput": "пар",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "101"
              ],
              "expectedOutput": "пар",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "t=int(input())\nif t<0:\n    print(\"лёд\")\nelif t<100:\n    print(\"вода\")\nelse:\n    print(\"пар\")",
          "alternative": "t=int(input())\nif t>=100:\n    print(\"пар\")\nelif t>=0:\n    print(\"вода\")\nelse:\n    print(\"лёд\")",
          "wrongSolutions": [
            {
              "code": "t=int(input())\nif t<=0:\n    print('лёд')\nelif t<=100:\n    print('вода')\nelse:\n    print('пар')",
              "why": "По объявленной модели 0 и 100 принадлежат другим категориям."
            },
            {
              "code": "t=int(input())\nif t<100:\n    print('вода')\nelif t<0:\n    print('лёд')\nelse:\n    print('пар')",
              "why": "Отрицательная температура перехвачена первым условием."
            }
          ],
          "hints": [
            "Соблюдай именно модель из условия.",
            "Вода начинается с 0, пар с 100.",
            "После t < 0 достаточно проверки t < 100."
          ],
          "solutionExplanation": [
            "Проверки последовательно делят числовую шкалу на три объявленные категории."
          ],
          "required": true
        },
        {
          "id": "conditions-elif-explain",
          "kind": "explain",
          "title": "Почему высокий балл получил C?",
          "goal": "Почему высокий балл получил C?",
          "prerequisites": [
            "conditions-elif"
          ],
          "prompt": "Код сначала проверяет score >= 50 и печатает C, затем elif score >= 90 печатает A. Почему при score=95 выходит C?",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "низкая категория",
              "explanation": "Аналог: число 12 сначала проверяется на >= 5. В elif-цепочке более точная последующая проверка >= 10 уже не выполняется."
            }
          ],
          "answer": [
            "2"
          ],
          "hints": [
            "Цепочка останавливается после первой истинной ветви.",
            "95 удовлетворяет уже первому условию.",
            "Проверь порядок порогов, а не print."
          ],
          "solutionExplanation": [
            "Высокий балл перехватывается широким условием. Нужно начинать с верхнего порога или строить непересекающиеся интервалы."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "Python сравнивает числа как строки."
            },
            {
              "id": "2",
              "text": "Первое условие истинно и оставшиеся elif пропускаются."
            },
            {
              "id": "3",
              "text": "elif всегда выполняется раньше if."
            }
          ]
        }
      ]
    },
    {
      "id": "conditions-logic",
      "title": "and, or и not",
      "goal": "Собрать несколько требований в одну логическую проверку.",
      "prerequisites": [
        "conditions-elif"
      ],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "conditions-logic-step-1",
          "title": "Все или хотя бы одно",
          "paragraphs": [
            "and требует истинности обеих частей: билет действителен, если дата подходит и оплата подтверждена. or требует хотя бы одного: скидка может быть доступна студенту или пенсионеру. not обращает истинность. Перед кодом проговори правило обычными словами и проверь его на четырёх сочетаниях двух признаков. Это защищает от механической замены «и» на «или».",
            "Каждая часть сравнения должна быть полноценной. Запись day == 6 or 7 неверно выражает выходной: число 7 само истинно, поэтому результат не описывает две даты. Нужно day == 6 or day == 7. Для интервала можно использовать цепочку сравнений или два сравнения с and."
          ],
          "examples": [
            {
              "id": "conditions-logic-example-1",
              "title": "Два требования",
              "code": "age=15\npermission=True\nprint(age>=14 and permission)",
              "output": "True",
              "explanation": "Оба требования истинны. Без разрешения подходящего возраста недостаточно."
            }
          ],
          "goal": "Объяснить: and требует истинности обеих частей: билет действителен, если дата подходит и оплата подтверждена.",
          "prerequisites": [
            "conditions-elif"
          ]
        },
        {
          "id": "conditions-logic-step-2",
          "title": "Скобки помогают видеть правило",
          "paragraphs": [
            "Приоритет сравнений выше not, затем идёт and, затем or. Поэтому a or b and c означает a or (b and c). Когда условие описывает несколько групп требований, ставь смысловые скобки. Условие «есть пропуск и (рабочий день или дежурство)» отличается от «(есть пропуск и рабочий день) или дежурство».",
            "not применяй к нужной группе: not (low <= x <= high) означает выход за интервал. Эквивалентная запись x < low or x > high показывает две внешние области. Не используй and для выхода одновременно ниже и выше границ: такое условие при корректном интервале невозможно."
          ],
          "examples": [
            {
              "id": "conditions-logic-example-2",
              "title": "За пределами интервала",
              "code": "value=27\nprint(not(10<=value<=20))\nprint(value<10 or value>20)",
              "output": "True\nTrue",
              "explanation": "Две записи описывают одну внешнюю область, включая левую или правую сторону."
            }
          ],
          "goal": "Объяснить: Приоритет сравнений выше not, затем идёт and, затем or.",
          "prerequisites": [
            "conditions-logic-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "conditions-weekend",
          "kind": "code",
          "title": "Выходной день",
          "goal": "Выразить альтернативные подходящие значения.",
          "prerequisites": [
            "conditions-logic"
          ],
          "prompt": "Прочитай номер дня 1–7. Выведи True для 6 и 7, иначе False.",
          "inputFormat": "1 строка в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Целый номер дня от 1 до 7; выходные — ровно 6 и 7.",
          "examples": [
            {
              "input": [
                "1"
              ],
              "output": "False",
              "explanation": "or объединяет два допустимых выходных дня."
            },
            {
              "input": [
                "7"
              ],
              "output": "True",
              "explanation": "or объединяет два допустимых выходных дня."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "1"
              ],
              "expectedOutput": "False",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "5"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "6"
              ],
              "expectedOutput": "True",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "7"
              ],
              "expectedOutput": "True",
              "description": "Граничный или изменённый случай 4"
            }
          ],
          "reference": "day=int(input())\nprint(day==6 or day==7)",
          "alternative": "day=int(input())\nprint(6<=day<=7)",
          "wrongSolutions": [
            {
              "code": "day=int(input())\nprint(day==6 or 7)",
              "why": "Число 7 само истинно и не сравнивается с day."
            },
            {
              "code": "day=int(input())\nprint(day==6 and day==7)",
              "why": "Одно число не может одновременно равняться 6 и 7."
            }
          ],
          "hints": [
            "Подходит хотя бы одно из двух равенств.",
            "Нужен or, а не and.",
            "Сравни day с каждым значением отдельно."
          ],
          "solutionExplanation": [
            "or объединяет два допустимых выходных дня."
          ],
          "required": true
        },
        {
          "id": "conditions-outside",
          "kind": "code",
          "title": "Снаружи диапазона",
          "goal": "Получить дополнение закрытого интервала.",
          "prerequisites": [
            "conditions-logic"
          ],
          "prompt": "Прочитай low, high и x, low ≤ high. Выведи True, если x строго снаружи закрытого интервала [low, high].",
          "inputFormat": "3 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "low, high, x — целые от -1000000 до 1000000; low ≤ high.",
          "examples": [
            {
              "input": [
                "0",
                "10",
                "-1"
              ],
              "output": "True",
              "explanation": "or объединяет две непересекающиеся внешние области."
            },
            {
              "input": [
                "0",
                "10",
                "5"
              ],
              "output": "False",
              "explanation": "or объединяет две непересекающиеся внешние области."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "0",
                "10",
                "-1"
              ],
              "expectedOutput": "True",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "0",
                "10",
                "0"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "0",
                "10",
                "10"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "0",
                "10",
                "11"
              ],
              "expectedOutput": "True",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "0",
                "10",
                "5"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "low=int(input())\nhigh=int(input())\nx=int(input())\nprint(x<low or x>high)",
          "alternative": "low=int(input())\nhigh=int(input())\nx=int(input())\nprint(not(low<=x<=high))",
          "wrongSolutions": [
            {
              "code": "lo=int(input())\nhi=int(input())\nx=int(input())\nprint(x<lo and x>hi)",
              "why": "Обе внешние области не могут выполняться одновременно."
            },
            {
              "code": "lo=int(input())\nhi=int(input())\nx=int(input())\nprint(x<=lo or x>=hi)",
              "why": "Границы входят в интервал и не должны считаться внешними."
            }
          ],
          "hints": [
            "Внешняя точка ниже low или выше high.",
            "Равенство краю остаётся внутри.",
            "Можно обратить всю цепочку через not."
          ],
          "solutionExplanation": [
            "or объединяет две непересекающиеся внешние области."
          ],
          "required": true
        },
        {
          "id": "conditions-divisible-both",
          "kind": "code",
          "title": "Два делителя",
          "goal": "Соединить два условия делимости.",
          "prerequisites": [
            "conditions-logic"
          ],
          "prompt": "Прочитай целое число. Выведи True, если оно делится и на 3, и на 5 без остатка.",
          "inputFormat": "1 строка в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Целое число от -1000000 до 1000000. Ноль делится на оба ненулевых делителя.",
          "examples": [
            {
              "input": [
                "15"
              ],
              "output": "True",
              "explanation": "and требует одновременно две делимости; здесь эквивалентна делимость на 15."
            },
            {
              "input": [
                "7"
              ],
              "output": "False",
              "explanation": "and требует одновременно две делимости; здесь эквивалентна делимость на 15."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "15"
              ],
              "expectedOutput": "True",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "3"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "5"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "True",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "-30"
              ],
              "expectedOutput": "True",
              "description": "Граничный или изменённый случай 5"
            },
            {
              "stdin": [
                "7"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 6"
            }
          ],
          "reference": "n=int(input())\nprint(n%3==0 and n%5==0)",
          "alternative": "n=int(input())\nprint(n%15==0)",
          "wrongSolutions": [
            {
              "code": "n=int(input())\nprint(n%3==0 or n%5==0)",
              "why": "Достаточность одного делителя не выполняет оба требования."
            },
            {
              "code": "n=int(input())\nprint(n%3==0 and 5)",
              "why": "Вторая часть не проверяет остаток по 5 и может вернуть число."
            }
          ],
          "hints": [
            "Каждая проверка остатка отдельная.",
            "Оба остатка должны равняться нулю.",
            "Ноль также делится на оба ненулевых делителя."
          ],
          "solutionExplanation": [
            "and требует одновременно две делимости; здесь эквивалентна делимость на 15."
          ],
          "required": true
        },
        {
          "id": "conditions-logic-table",
          "kind": "choice",
          "title": "Логические связи",
          "goal": "Логические связи",
          "prerequisites": [
            "conditions-logic"
          ],
          "prompt": "Выбери верные выражения.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "False\nTrue",
              "explanation": "Аналог: False and True ложно из-за первого требования; False or True истинно благодаря второму варианту."
            }
          ],
          "answer": [
            "1",
            "3"
          ],
          "hints": [
            "Проверь значения True и False буквально.",
            "and требует обе истины.",
            "not обращает результат своей группы."
          ],
          "solutionExplanation": [
            "or достаточно одного True, а not(False) равно True."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "True or False равно True."
            },
            {
              "id": "2",
              "text": "True and False равно True."
            },
            {
              "id": "3",
              "text": "not (False or False) равно True."
            },
            {
              "id": "4",
              "text": "not True and True равно True."
            }
          ]
        }
      ]
    },
    {
      "id": "conditions-nested",
      "title": "Вложенные условия и зависимые решения",
      "goal": "Разделить основной выбор и проверку внутри выбранной ситуации.",
      "prerequisites": [
        "conditions-logic"
      ],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "conditions-nested-step-1",
          "title": "Когда одного списка ветвей мало",
          "paragraphs": [
            "Вложенный if нужен, когда второй вопрос имеет смысл только после ответа на первый. Например, сначала проверяется наличие билета, а внутри этой ветви — требуется ли доплата. Отступ ещё на четыре пробела показывает второй уровень. else относится к if на том же уровне отступа, а не к ближайшему по смыслу предложению в русском тексте.",
            "Перед кодом нарисуй дерево из вопросов. У каждого листа должен быть определённый результат. Если задача просит ровно одно сообщение, проверь, не печатаются ли на одном пути два несовместимых результата. Общие действия можно вынести после дерева; специфические остаются внутри ветвей."
          ],
          "examples": [
            {
              "id": "conditions-nested-example-1",
              "title": "Пропуск и доплата",
              "code": "has_ticket=True\nlarge_bag=False\nif has_ticket:\n    if large_bag:\n        print(\"Нужна доплата\")\n    else:\n        print(\"Проходи\")\nelse:\n    print(\"Нужен билет\")",
              "output": "Проходи",
              "explanation": "Вопрос о багаже проверяется только у человека с билетом."
            }
          ],
          "goal": "Объяснить: Вложенный if нужен, когда второй вопрос имеет смысл только после ответа на первый.",
          "prerequisites": [
            "conditions-logic"
          ]
        },
        {
          "id": "conditions-nested-step-2",
          "title": "Простота против глубины",
          "paragraphs": [
            "Не каждая задача требует вложенности. Если все случаи равноправны, цепочка elif часто читается проще. Если достаточно одного булева правила, and/or могут убрать лишние уровни. Выбирай форму, которая показывает зависимость вопросов. Не сокращай код до непрозрачного логического выражения только ради меньшего числа строк.",
            "Проверь все листья дерева, включая случаи равенства и отсутствия доступа. Для сравнения двух чисел нужно отдельно учесть равенство, если оно меняет ответ. Для точки на плоскости сначала определись с осями и началом координат: это особые значения, которые нельзя случайно отнести к четвертям."
          ],
          "examples": [
            {
              "id": "conditions-nested-example-2",
              "title": "Сравнение с равенством",
              "code": "a=4\nb=4\nif a>=b:\n    if a==b:\n        print(\"равны\")\n    else:\n        print(\"первое больше\")\nelse:\n    print(\"второе больше\")",
              "output": "равны",
              "explanation": "Равенство выделяется внутри ветви a >= b."
            }
          ],
          "goal": "Объяснить: Не каждая задача требует вложенности.",
          "prerequisites": [
            "conditions-nested-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "conditions-two-max",
          "kind": "code",
          "title": "Большее из двух",
          "goal": "Учесть равенство при выборе значения.",
          "prerequisites": [
            "conditions-nested"
          ],
          "prompt": "Прочитай два целых числа. Выведи большее; при равенстве выведи это общее значение один раз.",
          "inputFormat": "2 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Два целых числа от -1000000 до 1000000; при равенстве требуется один ответ.",
          "examples": [
            {
              "input": [
                "3",
                "5"
              ],
              "output": "5",
              "explanation": "Разделение a >= b и a < b охватывает все случаи."
            },
            {
              "input": [
                "0",
                "0"
              ],
              "output": "0",
              "explanation": "Разделение a >= b и a < b охватывает все случаи."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "3",
                "5"
              ],
              "expectedOutput": "5",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "5",
                "3"
              ],
              "expectedOutput": "5",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "4",
                "4"
              ],
              "expectedOutput": "4",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "-2",
                "-7"
              ],
              "expectedOutput": "-2",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "0",
                "0"
              ],
              "expectedOutput": "0",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "a=int(input())\nb=int(input())\nif a>=b:\n    print(a)\nelse:\n    print(b)",
          "alternative": "a=int(input())\nb=int(input())\nresult=b\nif a>b:\n    result=a\nprint(result)",
          "wrongSolutions": [
            {
              "code": "a=int(input())\nb=int(input())\nif a<b:\n    print(a)\nelse:\n    print(b)",
              "why": "Выбрано меньшее число."
            },
            {
              "code": "a=int(input())\nb=int(input())\nif a>b:\n    print(a)\nelif b>a:\n    print(b)",
              "why": "Для равенства не напечатан ответ."
            }
          ],
          "hints": [
            "Сравни значения, а не их порядок ввода.",
            "Одна ветвь должна включать равенство.",
            "Можно сохранить результат и вывести один раз."
          ],
          "solutionExplanation": [
            "Разделение a >= b и a < b охватывает все случаи."
          ],
          "required": true
        },
        {
          "id": "conditions-quadrant",
          "kind": "code",
          "title": "Четверть или ось",
          "goal": "Скомбинировать особый случай и два знака координат.",
          "prerequisites": [
            "conditions-nested"
          ],
          "prompt": "Прочитай целые x и y. Если хотя бы одна координата ноль, выведи ось. Иначе выведи номер четверти 1, 2, 3 или 4 по обычной системе координат.",
          "inputFormat": "2 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Две целые координаты от -1000000 до 1000000. Начало координат тоже относится к ответу ось.",
          "examples": [
            {
              "input": [
                "1",
                "2"
              ],
              "output": "1",
              "explanation": "Особый случай осей обрабатывается до строгих сравнений знаков."
            },
            {
              "input": [
                "0",
                "0"
              ],
              "output": "ось",
              "explanation": "Особый случай осей обрабатывается до строгих сравнений знаков."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "1",
                "2"
              ],
              "expectedOutput": "1",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "-1",
                "2"
              ],
              "expectedOutput": "2",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "-1",
                "-2"
              ],
              "expectedOutput": "3",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "1",
                "-2"
              ],
              "expectedOutput": "4",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "0",
                "5"
              ],
              "expectedOutput": "ось",
              "description": "Граничный или изменённый случай 5"
            },
            {
              "stdin": [
                "3",
                "0"
              ],
              "expectedOutput": "ось",
              "description": "Граничный или изменённый случай 6"
            },
            {
              "stdin": [
                "0",
                "0"
              ],
              "expectedOutput": "ось",
              "description": "Граничный или изменённый случай 7"
            }
          ],
          "reference": "x=int(input())\ny=int(input())\nif x==0 or y==0:\n    print(\"ось\")\nelif x>0:\n    if y>0:\n        print(1)\n    else:\n        print(4)\nelse:\n    if y>0:\n        print(2)\n    else:\n        print(3)",
          "alternative": "x=int(input())\ny=int(input())\nif x==0 or y==0:\n    print(\"ось\")\nelif x>0 and y>0:\n    print(1)\nelif x<0 and y>0:\n    print(2)\nelif x<0 and y<0:\n    print(3)\nelse:\n    print(4)",
          "wrongSolutions": [
            {
              "code": "x=int(input())\ny=int(input())\nif x>=0 and y>=0:\n    print(1)\nelif x<0 and y>=0:\n    print(2)\nelif x<0 and y<0:\n    print(3)\nelse:\n    print(4)",
              "why": "Оси ошибочно включены в четверти."
            },
            {
              "code": "x=int(input())\ny=int(input())\nif x==0 or y==0:\n    print('ось')\nelif x>0 and y>0:\n    print(1)\nelif x<0 and y>0:\n    print(4)\nelif x<0 and y<0:\n    print(3)\nelse:\n    print(2)",
              "why": "Перепутаны вторая и четвёртая четверти."
            }
          ],
          "hints": [
            "Сначала исключи точки на осях.",
            "Потом вопрос о знаке x делит плоскость пополам.",
            "Знак y выбирает верхнюю или нижнюю четверть."
          ],
          "solutionExplanation": [
            "Особый случай осей обрабатывается до строгих сравнений знаков."
          ],
          "required": true
        },
        {
          "id": "conditions-access",
          "kind": "code",
          "title": "Допуск с разрешением",
          "goal": "Проверить дополнительное требование только для нужной категории.",
          "prerequisites": [
            "conditions-nested"
          ],
          "prompt": "Прочитай возраст и строку да или нет о разрешении. При возрасте не меньше 18 выведи допуск; для 14–17 допуск возможен только при да; младше 14 всегда отказ.",
          "inputFormat": "2 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Возраст — целое от 0 до 120; разрешение — ровно да или нет.",
          "examples": [
            {
              "input": [
                "13",
                "да"
              ],
              "output": "отказ",
              "explanation": "Дерево вопросов отражает разные правила для взрослых, подростков и детей."
            },
            {
              "input": [
                "30",
                "да"
              ],
              "output": "допуск",
              "explanation": "Дерево вопросов отражает разные правила для взрослых, подростков и детей."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "13",
                "да"
              ],
              "expectedOutput": "отказ",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "14",
                "да"
              ],
              "expectedOutput": "допуск",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "14",
                "нет"
              ],
              "expectedOutput": "отказ",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "17",
                "да"
              ],
              "expectedOutput": "допуск",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "18",
                "нет"
              ],
              "expectedOutput": "допуск",
              "description": "Граничный или изменённый случай 5"
            },
            {
              "stdin": [
                "30",
                "да"
              ],
              "expectedOutput": "допуск",
              "description": "Граничный или изменённый случай 6"
            }
          ],
          "reference": "age=int(input())\npermission=input()\nif age>=18:\n    print(\"допуск\")\nelif age>=14:\n    if permission==\"да\":\n        print(\"допуск\")\n    else:\n        print(\"отказ\")\nelse:\n    print(\"отказ\")",
          "alternative": "age=int(input())\npermission=input()\nif age>=18 or (age>=14 and permission==\"да\"):\n    print(\"допуск\")\nelse:\n    print(\"отказ\")",
          "wrongSolutions": [
            {
              "code": "age=int(input())\np=input()\nif age>=14 or p=='да':\n    print('допуск')\nelse:\n    print('отказ')",
              "why": "Разрешение да ошибочно пускает любого ребёнка, а 14-летнего пускает без разрешения."
            },
            {
              "code": "age=int(input())\np=input()\nif age>=18 and p=='да':\n    print('допуск')\nelse:\n    print('отказ')",
              "why": "Совершеннолетний не требует разрешения; подростку с разрешением тоже нужен допуск."
            }
          ],
          "hints": [
            "Раздели возраст на три группы.",
            "Разрешение нужно только в средней группе.",
            "Или объедини независимый взрослый случай с условием для подростка через or."
          ],
          "solutionExplanation": [
            "Дерево вопросов отражает разные правила для взрослых, подростков и детей."
          ],
          "required": true
        },
        {
          "id": "conditions-nested-else",
          "kind": "explain",
          "title": "К какому if относится else?",
          "goal": "К какому if относится else?",
          "prerequisites": [
            "conditions-nested"
          ],
          "prompt": "В Python else находится на одном уровне отступа с внутренним if. К какой проверке оно относится?",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "внутренняя альтернатива",
              "explanation": "В дереве «есть билет → большой багаж?» else на уровне вопроса о багаже относится именно к этому вопросу, а не к наличию билета."
            }
          ],
          "answer": [
            "1"
          ],
          "hints": [
            "Отступы задают структуру блоков.",
            "Смысл соседних сообщений не меняет привязку.",
            "Сравни колонку начала if и else."
          ],
          "solutionExplanation": [
            "else связано с if на своём уровне отступа. Для внешнего else нужен внешний уровень."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "К внутреннему if на том же уровне отступа."
            },
            {
              "id": "2",
              "text": "Всегда к самому первому if файла."
            },
            {
              "id": "3",
              "text": "Ко всем предыдущим if одновременно."
            }
          ]
        }
      ]
    },
    {
      "id": "conditions-safe-checks",
      "title": "Порядок проверок и короткое замыкание",
      "goal": "Предотвратить недопустимое вычисление и проверить вход до применения формулы.",
      "prerequisites": [
        "conditions-nested"
      ],
      "role": "lesson",
      "estimatedMinutes": 25,
      "steps": [
        {
          "id": "conditions-safe-checks-step-1",
          "title": "Не вычислять опасную часть",
          "paragraphs": [
            "and проверяет левую часть первой. Если она ложна, правая часть не вычисляется: весь результат уже не может быть истинным. or также начинает слева, но пропускает правую часть при истинной левой. Это называется коротким замыканием. Оно позволяет проверить допустимость операции до её выполнения. В den != 0 and num / den > 2 деление не выполняется при нулевом den.",
            "Если переставить части и сначала выполнить деление, защита не поможет: ошибка возникает раньше проверки. Логическое равенство условий на обычных данных ещё не означает одинаковую безопасность их вычисления. Важно, какие действия реально выполняются на каждом пути."
          ],
          "examples": [
            {
              "id": "conditions-safe-checks-example-1",
              "title": "Безопасное отношение",
              "code": "numerator=5\ndenominator=0\nprint(denominator!=0 and numerator/denominator>2)",
              "output": "False",
              "explanation": "Левая часть ложна, поэтому деления на ноль не происходит."
            }
          ],
          "goal": "Объяснить: and проверяет левую часть первой.",
          "prerequisites": [
            "conditions-nested"
          ]
        },
        {
          "id": "conditions-safe-checks-step-2",
          "title": "Сначала контракт, потом формула",
          "paragraphs": [
            "Проверка допустимости входа отличается от классификации результата. Если задача разрешает нулевой знаменатель, нужно заранее объявить, что выводить в этом случае. Например, слово ошибка, а не выдуманное число. Если все входы корректны по условию, дополнительные проверки могут быть не нужны.",
            "and и or в общем случае возвращают один из операндов, а не обязательно bool. В базовых правилах старайся соединять сравнения, которые уже дают bool, и явно оформлять результат. Не сокращай print(condition and \"да\" or \"нет\"), когда обычный if/else яснее. Такие трюки легко ломаются с ложными значениями в средней части."
          ],
          "examples": [
            {
              "id": "conditions-safe-checks-example-2",
              "title": "Проверка перед формулой",
              "code": "count=0\ntotal=25\nif count==0:\n    print(\"нет данных\")\nelse:\n    print(total/count)",
              "output": "нет данных",
              "explanation": "Отдельная ветвь сообщает отсутствие среднего вместо недопустимого вычисления."
            }
          ],
          "goal": "Объяснить: Проверка допустимости входа отличается от классификации результата.",
          "prerequisites": [
            "conditions-safe-checks-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "conditions-safe-ratio",
          "kind": "code",
          "title": "Отношение больше двух",
          "goal": "Разместить защитную проверку раньше вычисления.",
          "prerequisites": [
            "conditions-safe-checks"
          ],
          "prompt": "Прочитай целые num и den. Выведи True, если den не равен 0 и num / den > 2. При нулевом den выведи False без ошибки.",
          "inputFormat": "2 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "num и den — целые от -1000000 до 1000000; den может быть нулём или отрицательным.",
          "examples": [
            {
              "input": [
                "5",
                "2"
              ],
              "output": "True",
              "explanation": "Короткое замыкание and пропускает деление, когда его выполнение недопустимо."
            },
            {
              "input": [
                "-5",
                "2"
              ],
              "output": "False",
              "explanation": "Короткое замыкание and пропускает деление, когда его выполнение недопустимо."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "5",
                "2"
              ],
              "expectedOutput": "True",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "4",
                "2"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "1",
                "0"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "-5",
                "-2"
              ],
              "expectedOutput": "True",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "-5",
                "2"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "num=int(input())\nden=int(input())\nprint(den!=0 and num/den>2)",
          "alternative": "num=int(input())\nden=int(input())\nif den==0:\n    print(False)\nelse:\n    print(num/den>2)",
          "wrongSolutions": [
            {
              "code": "num=int(input())\nden=int(input())\nprint(num/den>2 and den!=0)",
              "why": "Защита расположена после опасного деления."
            },
            {
              "code": "num=int(input())\nden=int(input())\nprint(den!=0 or num/den>2)",
              "why": "or не проверяет само отношение при ненулевом den и пытается делить при нуле."
            }
          ],
          "hints": [
            "Первая часть должна исключить нулевой знаменатель.",
            "Соедини требования через and.",
            "Или явно вынеси нулевой случай в if."
          ],
          "solutionExplanation": [
            "Короткое замыкание and пропускает деление, когда его выполнение недопустимо."
          ],
          "required": true
        },
        {
          "id": "conditions-safe-average",
          "kind": "code",
          "title": "Среднее при пустой группе",
          "goal": "Разделить отсутствие данных и числовой ноль.",
          "prerequisites": [
            "conditions-safe-checks"
          ],
          "prompt": "Прочитай целую сумму и неотрицательное количество. При количестве 0 выведи нет данных, иначе выведи сумма / количество.",
          "inputFormat": "2 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Сумма — целое от -1000000 до 1000000; количество — целое от 0 до 1000000.",
          "examples": [
            {
              "input": [
                "0",
                "0"
              ],
              "output": "нет данных",
              "explanation": "У пустого набора нет среднего; отдельный результат сохраняет этот смысл."
            },
            {
              "input": [
                "-6",
                "3"
              ],
              "output": "-2.0",
              "explanation": "У пустого набора нет среднего; отдельный результат сохраняет этот смысл."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "0",
                "0"
              ],
              "expectedOutput": "нет данных",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "10",
                "0"
              ],
              "expectedOutput": "нет данных",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "0",
                "2"
              ],
              "expectedOutput": "0.0",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "7",
                "2"
              ],
              "expectedOutput": "3.5",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "-6",
                "3"
              ],
              "expectedOutput": "-2.0",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "total=int(input())\ncount=int(input())\nif count==0:\n    print(\"нет данных\")\nelse:\n    print(total/count)",
          "alternative": "total=int(input())\ncount=int(input())\nif count>0:\n    average=total/count\n    print(average)\nelse:\n    print(\"нет данных\")",
          "wrongSolutions": [
            {
              "code": "total=int(input())\ncount=int(input())\navg=total/count\nif count==0:\n    print('нет данных')\nelse:\n    print(avg)",
              "why": "Деление выполнено до проверки пустой группы."
            },
            {
              "code": "total=int(input())\ncount=int(input())\nif count==0:\n    print(0)\nelse:\n    print(total/count)",
              "why": "Отсутствующее среднее не должно заменяться выдуманным нулём."
            }
          ],
          "hints": [
            "Сначала проверь count.",
            "Деление находится только в ненулевой ветви.",
            "Для пустого набора нужен текст из условия."
          ],
          "solutionExplanation": [
            "У пустого набора нет среднего; отдельный результат сохраняет этот смысл."
          ],
          "required": true
        },
        {
          "id": "conditions-valid-triangle",
          "kind": "code",
          "title": "Можно ли построить треугольник?",
          "goal": "Проверить полный набор ограничений геометрической модели.",
          "prerequisites": [
            "conditions-safe-checks"
          ],
          "prompt": "Прочитай три целые длины. Выведи True, если все они положительны и сумма любых двух строго больше третьей, иначе False.",
          "inputFormat": "3 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Три целых значения от -1000000 до 1000000; неположительные длины являются недопустимыми, ответ False.",
          "examples": [
            {
              "input": [
                "3",
                "4",
                "5"
              ],
              "output": "True",
              "explanation": "Треугольник существует только при выполнении всех строгих неравенств и положительности."
            },
            {
              "input": [
                "2",
                "2",
                "2"
              ],
              "output": "True",
              "explanation": "Треугольник существует только при выполнении всех строгих неравенств и положительности."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "3",
                "4",
                "5"
              ],
              "expectedOutput": "True",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "1",
                "2",
                "3"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "1",
                "5",
                "1"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "0",
                "1",
                "1"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "-1",
                "2",
                "2"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 5"
            },
            {
              "stdin": [
                "2",
                "2",
                "2"
              ],
              "expectedOutput": "True",
              "description": "Граничный или изменённый случай 6"
            }
          ],
          "reference": "a=int(input())\nb=int(input())\nc=int(input())\nprint(a>0 and b>0 and c>0 and a+b>c and a+c>b and b+c>a)",
          "alternative": "a=int(input())\nb=int(input())\nc=int(input())\nvalid=True\nif a<=0 or b<=0 or c<=0:\n    valid=False\nif a+b<=c or a+c<=b or b+c<=a:\n    valid=False\nprint(valid)",
          "wrongSolutions": [
            {
              "code": "a=int(input())\nb=int(input())\nc=int(input())\nprint(a+b>=c and a+c>=b and b+c>=a)",
              "why": "Вырожденный треугольник с равенством не допускается."
            },
            {
              "code": "a=int(input())\nb=int(input())\nc=int(input())\nprint(a+b>c)",
              "why": "Проверена только одна сторона."
            }
          ],
          "hints": [
            "Все длины должны быть положительны.",
            "Каждая сторона меньше суммы остальных двух.",
            "Соедини все требования через and или исключи нарушения."
          ],
          "solutionExplanation": [
            "Треугольник существует только при выполнении всех строгих неравенств и положительности."
          ],
          "required": true
        },
        {
          "id": "conditions-short-circuit",
          "kind": "predict",
          "title": "Будет ли деление?",
          "goal": "Будет ли деление?",
          "prerequisites": [
            "conditions-safe-checks"
          ],
          "prompt": "Предскажи вывод без выполнения опасной правой части.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "False",
              "explanation": "Аналог: den=0; print(den!=0 and 10/den>1). Первая часть ложна, поэтому деление не выполняется."
            }
          ],
          "answer": "False\nTrue",
          "hints": [
            "Левая часть and ложна.",
            "Левая часть or истинна.",
            "В обоих случаях правая часть не нужна для результата."
          ],
          "solutionExplanation": [
            "Короткое замыкание пропускает 1 / 0, поэтому программа завершается без исключения."
          ],
          "required": true,
          "initialCode": "print(False and 1/0)\nprint(True or 1/0)"
        }
      ]
    },
    {
      "id": "conditions-review",
      "title": "Повторение: условия и числовые модели",
      "goal": "Выбрать структуру ветвления и проверить все её пути.",
      "prerequisites": [
        "conditions-safe-checks"
      ],
      "role": "review",
      "estimatedMinutes": 50,
      "steps": [
        {
          "id": "conditions-review-step-1",
          "title": "Проверка должна различать алгоритмы",
          "paragraphs": [
            "В смешанной практике расчёт и выбор зависят друг от друга. Сначала определи случаи, затем формулы внутри каждого случая. Например, две тарифные зоны могут иметь одну цену до порога и другую после. Сама граница должна принадлежать ровно одной зоне: иначе появится пропуск или двойное начисление.",
            "Таблица входов помогает проверить путь: ниже границы, на границе, выше границы. Для двух булевых признаков перечисли четыре сочетания. Для дерева из нескольких вопросов проверь каждый лист. Если ветвь никогда не выполняется, причиной может быть раннее слишком широкое условие."
          ],
          "examples": [
            {
              "id": "conditions-review-example-1",
              "title": "Непересекающиеся цены",
              "code": "weight=6\nif weight<=5:\n    cost=100\nelse:\n    cost=100+(weight-5)*20\nprint(cost)",
              "output": "120",
              "explanation": "Первые пять единиц входят в базу, доплата считается только за превышение."
            }
          ],
          "goal": "Объяснить: В смешанной практике расчёт и выбор зависят друг от друга.",
          "prerequisites": [
            "conditions-safe-checks"
          ]
        },
        {
          "id": "conditions-review-step-2",
          "title": "Причина ошибки словами",
          "paragraphs": [
            "Синтаксическая ошибка указывает на запись конструкции: двоеточие, отступ, знак сравнения. Логическая ошибка проявляется неверным ответом при допустимом выполнении. Для её исправления сформулируй нарушенное правило: «равенство порогу исключено», «проверена только одна сторона», «else привязано к другому if».",
            "Не добавляй всё новые частные исключения к неверной модели. Иногда лучше переписать условие прямо по контракту или поменять порядок проверки порогов. После исправления снова прогони входы всех ветвей, чтобы не сломать ранее верный случай."
          ],
          "examples": [
            {
              "id": "conditions-review-example-2",
              "title": "Две независимые проверки",
              "code": "n=30\nprint(n%2==0)\nprint(n%3==0)",
              "output": "True\nTrue",
              "explanation": "Два показателя могут быть одновременно истинны; их не нужно искусственно превращать в взаимоисключающие ветви."
            }
          ],
          "goal": "Объяснить: Синтаксическая ошибка указывает на запись конструкции: двоеточие, отступ, знак сравнения.",
          "prerequisites": [
            "conditions-review-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "conditions-review-max-three",
          "kind": "code",
          "title": "Большее из трёх",
          "goal": "Сохранять лучший текущий кандидат без циклов.",
          "prerequisites": [
            "conditions-review"
          ],
          "prompt": "Прочитай три целых числа. Выведи наибольшее; используй сравнения и присваивания.",
          "inputFormat": "3 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Три целых от -1000000 до 1000000; разрешены равенство и три отрицательных значения.",
          "examples": [
            {
              "input": [
                "1",
                "2",
                "3"
              ],
              "output": "3",
              "explanation": "Инвариант кандидата: после каждого сравнения result — максимум уже рассмотренных входов."
            },
            {
              "input": [
                "4",
                "4",
                "4"
              ],
              "output": "4",
              "explanation": "Инвариант кандидата: после каждого сравнения result — максимум уже рассмотренных входов."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "1",
                "2",
                "3"
              ],
              "expectedOutput": "3",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "5",
                "2",
                "1"
              ],
              "expectedOutput": "5",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "2",
                "8",
                "3"
              ],
              "expectedOutput": "8",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "-5",
                "-2",
                "-7"
              ],
              "expectedOutput": "-2",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "4",
                "4",
                "4"
              ],
              "expectedOutput": "4",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "a=int(input())\nb=int(input())\nc=int(input())\nresult=a\nif b>result:\n    result=b\nif c>result:\n    result=c\nprint(result)",
          "alternative": "a=int(input())\nb=int(input())\nc=int(input())\nif a>=b and a>=c:\n    print(a)\nelif b>=c:\n    print(b)\nelse:\n    print(c)",
          "wrongSolutions": [
            {
              "code": "a=int(input())\nb=int(input())\nc=int(input())\nresult=0\nif a>result:\n    result=a\nif b>result:\n    result=b\nif c>result:\n    result=c\nprint(result)",
              "why": "Начальная нулевая граница неверна для трёх отрицательных значений."
            },
            {
              "code": "a=int(input())\nb=int(input())\nc=int(input())\nif a>b:\n    print(a)\nelse:\n    print(b)",
              "why": "Третье число не участвует в выборе."
            }
          ],
          "hints": [
            "Исходный кандидат должен быть одним из входных значений.",
            "Сравни с ним второе, затем третье число.",
            "Независимые if здесь нужны: улучшение может случиться дважды."
          ],
          "solutionExplanation": [
            "Инвариант кандидата: после каждого сравнения result — максимум уже рассмотренных входов."
          ],
          "required": true
        },
        {
          "id": "conditions-review-leap",
          "kind": "code",
          "title": "Високосный год",
          "goal": "Собрать правило с исключением из исключения.",
          "prerequisites": [
            "conditions-review"
          ],
          "prompt": "Прочитай положительный целый год. Он високосный, если делится на 400 либо делится на 4 и не делится на 100. Выведи True или False.",
          "inputFormat": "1 строка в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Год — целое от 1 до 9999. Используй объявленное правило григорианского календаря.",
          "examples": [
            {
              "input": [
                "2024"
              ],
              "output": "True",
              "explanation": "Правило задаётся явно; скобки показывают сочетание and внутри альтернативы or."
            },
            {
              "input": [
                "2100"
              ],
              "output": "False",
              "explanation": "Правило задаётся явно; скобки показывают сочетание and внутри альтернативы or."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "2024"
              ],
              "expectedOutput": "True",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "2023"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "1900"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "2000"
              ],
              "expectedOutput": "True",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "2100"
              ],
              "expectedOutput": "False",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "year=int(input())\nprint(year%400==0 or (year%4==0 and year%100!=0))",
          "alternative": "year=int(input())\nif year%400==0:\n    print(True)\nelif year%100==0:\n    print(False)\nelse:\n    print(year%4==0)",
          "wrongSolutions": [
            {
              "code": "year=int(input())\nprint(year%4==0)",
              "why": "Столетние годы требуют дополнительного правила."
            },
            {
              "code": "year=int(input())\nprint(year%4==0 and year%100!=0)",
              "why": "Годы, кратные 400, ошибочно исключены."
            }
          ],
          "hints": [
            "Сначала выдели особое правило для 400.",
            "Обычное правило требует делимости на 4 и неделимости на 100.",
            "Две допустимые группы соединяются через or."
          ],
          "solutionExplanation": [
            "Правило задаётся явно; скобки показывают сочетание and внутри альтернативы or."
          ],
          "required": true
        },
        {
          "id": "conditions-review-boundary-fix",
          "kind": "debug",
          "title": "Ошибка границы",
          "goal": "Исправить оба края закрытого диапазона.",
          "prerequisites": [
            "conditions-review"
          ],
          "prompt": "Исправь проверку: допустимый процент — целое число от 0 до 100 включительно. Выведи допустимо или ошибка.",
          "inputFormat": "1 строка в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Вход — целое от -1000000 до 1000000; допустим только закрытый диапазон 0–100.",
          "examples": [
            {
              "input": [
                "-1"
              ],
              "output": "ошибка",
              "explanation": "Цепочка с <= принимает оба края, а отрицание через внешние области даёт эквивалентную проверку."
            },
            {
              "input": [
                "101"
              ],
              "output": "ошибка",
              "explanation": "Цепочка с <= принимает оба края, а отрицание через внешние области даёт эквивалентную проверку."
            }
          ],
          "initialCode": "p=int(input())\nif 0 < p < 100:\n    print(\"допустимо\")\nelse:\n    print(\"ошибка\")",
          "tests": [
            {
              "stdin": [
                "-1"
              ],
              "expectedOutput": "ошибка",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "допустимо",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "50"
              ],
              "expectedOutput": "допустимо",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "100"
              ],
              "expectedOutput": "допустимо",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "101"
              ],
              "expectedOutput": "ошибка",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "p=int(input())\nif 0<=p<=100:\n    print(\"допустимо\")\nelse:\n    print(\"ошибка\")",
          "alternative": "p=int(input())\nif p<0 or p>100:\n    print(\"ошибка\")\nelse:\n    print(\"допустимо\")",
          "wrongSolutions": [
            {
              "code": "p=int(input())\nif 0<p<100:\n    print('допустимо')\nelse:\n    print('ошибка')",
              "why": "Обе допустимые границы исключены."
            },
            {
              "code": "p=int(input())\nif p>=0 or p<=100:\n    print('допустимо')\nelse:\n    print('ошибка')",
              "why": "or делает условие истинным для любого числа."
            }
          ],
          "hints": [
            "Перечитай слово включительно.",
            "Проверь ровно 0 и 100.",
            "Внутренняя область требует обеих границ одновременно."
          ],
          "solutionExplanation": [
            "Цепочка с <= принимает оба края, а отрицание через внешние области даёт эквивалентную проверку."
          ],
          "required": true
        },
        {
          "id": "conditions-review-forbidden",
          "kind": "choice",
          "title": "Как проверить отсутствие допуска?",
          "goal": "Как проверить отсутствие допуска?",
          "prerequisites": [
            "conditions-review"
          ],
          "prompt": "Пусть age — целый возраст, has_pass — bool. Допуск есть при age >= 18 and has_pass. Выбери эквивалентные условия отказа.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "True",
              "explanation": "Аналог: для правила «температура допустима и датчик исправен» отказ означает недопустимую температуру или неисправный датчик; одной причины достаточно."
            }
          ],
          "answer": [
            "1",
            "3"
          ],
          "hints": [
            "Нужно отрицать всё условие допуска.",
            "Отказ возможен по любой одной причине.",
            "Применяй not к группе, а не только к has_pass."
          ],
          "solutionExplanation": [
            "Отрицание совместного требования означает age < 18 или отсутствие пропуска."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "not (age >= 18 and has_pass)"
            },
            {
              "id": "2",
              "text": "age < 18 and not has_pass"
            },
            {
              "id": "3",
              "text": "age < 18 or not has_pass"
            },
            {
              "id": "4",
              "text": "age >= 18 or has_pass"
            }
          ]
        },
        {
          "id": "conditions-review-independent",
          "kind": "explain",
          "title": "Когда два if уместны?",
          "goal": "Когда два if уместны?",
          "prerequisites": [
            "conditions-review"
          ],
          "prompt": "Нужно независимо сообщить, делится ли число на 2 и делится ли на 3. Почему if/elif может потерять второй результат?",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "True\nTrue",
              "explanation": "Аналог: для числа 12 проверки делимости на 2 и 3 обе истинны. Независимые print сохраняют оба результата, elif выбрал бы один."
            }
          ],
          "answer": [
            "2"
          ],
          "hints": [
            "Обе характеристики могут быть истинны.",
            "Цепочка выбирает только одну ветвь.",
            "Число 6 подходит обоим делителям."
          ],
          "solutionExplanation": [
            "Для независимых признаков нужны независимые проверки или два bool; elif подходит взаимоисключающей классификации."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "if/elif нельзя применять к остаткам."
            },
            {
              "id": "2",
              "text": "После истинного if оставшийся elif не проверяется."
            },
            {
              "id": "3",
              "text": "В Python число не может делиться на два разных числа."
            }
          ]
        }
      ]
    },
    {
      "id": "conditions-assessment",
      "title": "Контрольная: решения по правилам",
      "goal": "Самостоятельно объединить границы, арифметику и несколько условий.",
      "prerequisites": [
        "conditions-review"
      ],
      "role": "assessment",
      "estimatedMinutes": 60,
      "steps": [
        {
          "id": "conditions-assessment-step-1",
          "title": "Как устроена работа",
          "paragraphs": [
            "Контрольная использует новые истории, но все конструкции знакомы. Условия каждого задания — точный контракт, включая границы и особые случаи. Сначала перечисли категории, затем реши, нужны ли if/elif, вложенность или независимые проверки. Формулы не должны выполняться раньше, чем проверены необходимые ограничения.",
            "Составь собственную таблицу входов. Не ограничивайся по одному положительному примеру: проверь ноль, точный порог, отрицательное значение там, где оно допустимо, и ситуацию, удовлетворяющую нескольким признакам. Цель — объяснить правило выбора, а не угадать строку ответа."
          ],
          "examples": [
            {
              "id": "conditions-assessment-example-1",
              "title": "Тариф после порога",
              "code": "units=8\nif units<=5:\n    total=units*10\nelse:\n    total=5*10+(units-5)*7\nprint(total)",
              "output": "71",
              "explanation": "Льготная цена применяется только к превышению, уже оплаченная базовая часть остаётся в сумме."
            }
          ],
          "goal": "Объяснить: Контрольная использует новые истории, но все конструкции знакомы.",
          "prerequisites": [
            "conditions-review"
          ]
        },
        {
          "id": "conditions-assessment-step-2",
          "title": "После проверки",
          "paragraphs": [
            "При неверном ответе посмотри, какой конкретный случай расходится с условием. Если решение работает на середине диапазона и ломается на краю, проверь < против <=. Если печатает два ответа, посмотри на независимые if и привязку else. Если появляется исключение, проверь порядок вычисления формулы и защитного условия.",
            "Открытый разбор не запрещает учиться, но самостоятельность проверяется новой попыткой без него. Следующий модуль вводит циклы, где условия будут проверяться много раз; точное понимание одной проверки и её границ необходимо до повторения."
          ],
          "examples": [
            {
              "id": "conditions-assessment-example-2",
              "title": "Проверка допустимости",
              "code": "value=-1\nif value<0:\n    print(\"ошибка\")\nelif value==0:\n    print(\"пусто\")\nelse:\n    print(\"данные есть\")",
              "output": "ошибка",
              "explanation": "Порядок разделяет недопустимость, пустой допустимый случай и положительные данные."
            }
          ],
          "goal": "Объяснить: При неверном ответе посмотри, какой конкретный случай расходится с условием.",
          "prerequisites": [
            "conditions-assessment-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "conditions-assess-progressive-price",
          "kind": "code",
          "title": "Ступенчатая оплата",
          "goal": "Применить новую ставку только к части величины.",
          "prerequisites": [
            "conditions-assessment"
          ],
          "prompt": "Прочитай неотрицательное целое потребление. Первые 10 единиц стоят по 5, каждая следующая по 3. Выведи общую целую стоимость.",
          "inputFormat": "1 строка в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Потребление — целое от 0 до 1000000. Сниженная ставка действует только на превышение 10.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "0",
              "explanation": "Стоимость складывается из фиксированной базы и цены только дополнительных единиц."
            },
            {
              "input": [
                "20"
              ],
              "output": "80",
              "explanation": "Стоимость складывается из фиксированной базы и цены только дополнительных единиц."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "0",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "9"
              ],
              "expectedOutput": "45",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "10"
              ],
              "expectedOutput": "50",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "11"
              ],
              "expectedOutput": "53",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "20"
              ],
              "expectedOutput": "80",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "n=int(input())\nif n<=10:\n    print(n*5)\nelse:\n    print(10*5+(n-10)*3)",
          "alternative": "n=int(input())\nbase=n\nextra=0\nif n>10:\n    base=10\n    extra=n-10\nprint(base*5+extra*3)",
          "wrongSolutions": [
            {
              "code": "n=int(input())\nif n<=10:\n    print(n*5)\nelse:\n    print(n*3)",
              "why": "Новая цена применена ко всему потреблению, а не только к превышению."
            },
            {
              "code": "n=int(input())\nif n<=10:\n    print(n*5)\nelse:\n    print(50+n*3)",
              "why": "Первые 10 единиц оплачены повторно по второй ставке."
            }
          ],
          "hints": [
            "До порога действует одна формула.",
            "После порога базовые 10 единиц уже стоят 50.",
            "По новой цене оплачивается n - 10."
          ],
          "solutionExplanation": [
            "Стоимость складывается из фиксированной базы и цены только дополнительных единиц."
          ],
          "required": true
        },
        {
          "id": "conditions-assess-between",
          "kind": "code",
          "title": "Среднее по значению",
          "goal": "Сформулировать принадлежность между двумя другими значениями.",
          "prerequisites": [
            "conditions-assessment"
          ],
          "prompt": "Прочитай три различных целых числа. Выведи число, находящееся между двумя другими по значению, не среднее арифметическое.",
          "inputFormat": "3 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Три попарно различных целых числа от -1000000 до 1000000.",
          "examples": [
            {
              "input": [
                "1",
                "8",
                "3"
              ],
              "output": "3",
              "explanation": "Различность входов позволяет проверять строгие цепочки без отдельного случая равенства."
            },
            {
              "input": [
                "8",
                "3",
                "1"
              ],
              "output": "3",
              "explanation": "Различность входов позволяет проверять строгие цепочки без отдельного случая равенства."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "1",
                "8",
                "3"
              ],
              "expectedOutput": "3",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "9",
                "2",
                "5"
              ],
              "expectedOutput": "5",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "-7",
                "-1",
                "-3"
              ],
              "expectedOutput": "-3",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "5",
                "1",
                "9"
              ],
              "expectedOutput": "5",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "3",
                "9",
                "1"
              ],
              "expectedOutput": "3",
              "description": "Граничный или изменённый случай 5"
            },
            {
              "stdin": [
                "8",
                "3",
                "1"
              ],
              "expectedOutput": "3",
              "description": "Граничный или изменённый случай 6"
            }
          ],
          "reference": "a=int(input())\nb=int(input())\nc=int(input())\nif b<a<c or c<a<b:\n    print(a)\nelif a<b<c or c<b<a:\n    print(b)\nelse:\n    print(c)",
          "alternative": "a=int(input())\nb=int(input())\nc=int(input())\nif a>b:\n    temp=a\n    a=b\n    b=temp\nif b>c:\n    temp=b\n    b=c\n    c=temp\nif a>b:\n    b=a\nprint(b)",
          "wrongSolutions": [
            {
              "code": "a=int(input())\nb=int(input())\nc=int(input())\nprint((a+b+c)/3)",
              "why": "Запрошена медиана трёх значений, а не среднее арифметическое."
            },
            {
              "code": "a=int(input())\nb=int(input())\nc=int(input())\nprint(b)",
              "why": "Второй по вводу не обязательно средний по величине."
            }
          ],
          "hints": [
            "Для кандидата подходят два возможных порядка границ.",
            "Проверь a между b и c, затем b между a и c.",
            "Если ни один не подходит, средним остаётся c."
          ],
          "solutionExplanation": [
            "Различность входов позволяет проверять строгие цепочки без отдельного случая равенства."
          ],
          "required": true
        },
        {
          "id": "conditions-assess-date",
          "kind": "code",
          "title": "Дней в месяце",
          "goal": "Объединить категорию месяца и зависимую проверку года.",
          "prerequisites": [
            "conditions-assessment"
          ],
          "prompt": "Прочитай номер месяца 1–12 и год 1–9999. Выведи число дней. Февраль использует правило високосного года: кратен 400 или кратен 4, но не 100.",
          "inputFormat": "2 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Месяц — целое 1–12; год — целое 1–9999. Недопустимые номера месяца не подаются.",
          "examples": [
            {
              "input": [
                "2",
                "2024"
              ],
              "output": "29",
              "explanation": "Вопрос о годе влияет только на февраль, поэтому вложенность отражает зависимость данных."
            },
            {
              "input": [
                "2",
                "2023"
              ],
              "output": "28",
              "explanation": "Вопрос о годе влияет только на февраль, поэтому вложенность отражает зависимость данных."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "2",
                "2024"
              ],
              "expectedOutput": "29",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "2",
                "1900"
              ],
              "expectedOutput": "28",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "2",
                "2000"
              ],
              "expectedOutput": "29",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "4",
                "2023"
              ],
              "expectedOutput": "30",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "1",
                "2023"
              ],
              "expectedOutput": "31",
              "description": "Граничный или изменённый случай 5"
            },
            {
              "stdin": [
                "11",
                "2023"
              ],
              "expectedOutput": "30",
              "description": "Граничный или изменённый случай 6"
            },
            {
              "stdin": [
                "2",
                "2023"
              ],
              "expectedOutput": "28",
              "description": "Граничный или изменённый случай 7"
            }
          ],
          "reference": "month=int(input())\nyear=int(input())\nif month==2:\n    if year%400==0 or (year%4==0 and year%100!=0):\n        print(29)\n    else:\n        print(28)\nelif month==4 or month==6 or month==9 or month==11:\n    print(30)\nelse:\n    print(31)",
          "alternative": "m=int(input())\ny=int(input())\ndays=31\nif m==4 or m==6 or m==9 or m==11:\n    days=30\nif m==2:\n    days=28\n    if y%400==0 or (y%4==0 and y%100!=0):\n        days=29\nprint(days)",
          "wrongSolutions": [
            {
              "code": "m=int(input())\ny=int(input())\nif m==2:\n    if y%4==0:\n        print(29)\n    else:\n        print(28)\nelif m==4 or m==6 or m==9 or m==11:\n    print(30)\nelse:\n    print(31)",
              "why": "Февраль столетнего невисокосного года посчитан неверно."
            },
            {
              "code": "m=int(input())\ny=int(input())\nif m==2:\n    print(28)\nelse:\n    print(31)",
              "why": "Не учтены короткие месяцы и високосный февраль."
            }
          ],
          "hints": [
            "Сначала особый месяц февраль.",
            "Внутри него проверь високосность.",
            "Для остальных отдели четыре 30-дневных месяца."
          ],
          "solutionExplanation": [
            "Вопрос о годе влияет только на февраль, поэтому вложенность отражает зависимость данных."
          ],
          "required": true
        },
        {
          "id": "conditions-assess-safe-division",
          "kind": "code",
          "title": "Частное или сообщение",
          "goal": "Совместить проверку области допустимости и вычисление.",
          "prerequisites": [
            "conditions-assessment"
          ],
          "prompt": "Прочитай целые a и b. При b = 0 выведи деление невозможно; иначе выведи a / b, округлённое round(..., 2).",
          "inputFormat": "2 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "a и b — целые от -1000000 до 1000000. Нулевой знаменатель разрешён и обрабатывается отдельным сообщением.",
          "examples": [
            {
              "input": [
                "1",
                "0"
              ],
              "output": "деление невозможно",
              "explanation": "Отдельная ветвь исключает недопустимую операцию и не подменяет её числом."
            },
            {
              "input": [
                "5",
                "-2"
              ],
              "output": "-2.5",
              "explanation": "Отдельная ветвь исключает недопустимую операцию и не подменяет её числом."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "1",
                "0"
              ],
              "expectedOutput": "деление невозможно",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "0",
                "2"
              ],
              "expectedOutput": "0.0",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "7",
                "3"
              ],
              "expectedOutput": "2.33",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "-7",
                "3"
              ],
              "expectedOutput": "-2.33",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "5",
                "-2"
              ],
              "expectedOutput": "-2.5",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "a=int(input())\nb=int(input())\nif b==0:\n    print(\"деление невозможно\")\nelse:\n    print(round(a/b,2))",
          "alternative": "a=int(input())\nb=int(input())\nif b!=0:\n    result=round(a/b,2)\n    print(result)\nelse:\n    print(\"деление невозможно\")",
          "wrongSolutions": [
            {
              "code": "a=int(input())\nb=int(input())\nr=round(a/b,2)\nif b==0:\n    print('деление невозможно')\nelse:\n    print(r)",
              "why": "Деление произошло раньше защитной проверки."
            },
            {
              "code": "a=int(input())\nb=int(input())\nif b==0:\n    print('деление невозможно')\nelse:\n    print(round(a//b,2))",
              "why": "Использовано целое частное вместо обычного."
            }
          ],
          "hints": [
            "Проверь знаменатель до вычисления.",
            "Нужен /, а не //.",
            "Округляй только допустимый результат."
          ],
          "solutionExplanation": [
            "Отдельная ветвь исключает недопустимую операцию и не подменяет её числом."
          ],
          "required": true
        },
        {
          "id": "conditions-assess-test-set",
          "kind": "choice",
          "title": "Какие входы ловят ошибки?",
          "goal": "Какие входы ловят ошибки?",
          "prerequisites": [
            "conditions-assessment"
          ],
          "prompt": "Правило: возраст от 14 до 17 включительно. Какие проверки обязательно проверяют сами края и соседние значения?",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "4, 5, 9, 10",
              "explanation": "Аналог интервала [5,9]: 4 и 10 проверяют внешние соседние точки, 5 и 9 — включённые края. Только 7 не находит ошибку границы."
            }
          ],
          "answer": [
            "1",
            "2",
            "3",
            "4"
          ],
          "hints": [
            "Нужно две границы и две внешние точки.",
            "Одна середина не раскрывает ошибку <=.",
            "Значения 13 и 18 должны быть исключены."
          ],
          "solutionExplanation": [
            "13, 14, 17, 18 различают включённые края и соседние запрещённые значения."
          ],
          "required": true,
          "choices": [
            {
              "id": "1",
              "text": "13"
            },
            {
              "id": "2",
              "text": "14"
            },
            {
              "id": "3",
              "text": "17"
            },
            {
              "id": "4",
              "text": "18"
            },
            {
              "id": "5",
              "text": "15 — достаточно без других тестов."
            }
          ]
        }
      ]
    },
    {
      "id": "conditions-project",
      "title": "Мини-проект: расчёт заказа по правилам",
      "goal": "Реализовать тариф, скидку и статус оплаты в согласованном отчёте.",
      "prerequisites": [
        "conditions-assessment"
      ],
      "role": "project",
      "estimatedMinutes": 60,
      "steps": [
        {
          "id": "conditions-project-step-1",
          "title": "Правила бизнеса становятся программой",
          "paragraphs": [
            "Даже небольшой заказ может иметь несколько независимых правил: стоимость товара зависит от количества, доставка — от суммы, итоговый статус — от оплаты. Сначала зафиксируй порядок. Если доставка определяется суммой после скидки, нельзя проверять исходную цену. Здесь каждая задача явно задаёт правило; дополнительных предположений о магазине не требуется.",
            "Отдели данные от промежуточных результатов: subtotal, discount, delivery, total. Имена помогают объяснить, какая сумма используется на каждом шаге. Для денежной арифметики сохраняем целые минимальные единицы. Если скидка получается дробной, условие определяет округление; не выбирай его по случайному результату примера."
          ],
          "examples": [
            {
              "id": "conditions-project-example-1",
              "title": "Цена и доставка",
              "code": "subtotal=1800\nif subtotal>=2000:\n    delivery=0\nelse:\n    delivery=200\nprint(subtotal+delivery)",
              "output": "2000",
              "explanation": "Доставка определяется по сумме товаров, затем добавляется к ней."
            }
          ],
          "goal": "Объяснить: Даже небольшой заказ может иметь несколько независимых правил: стоимость товара зависит от количества, доставка — от суммы, итоговый статус — от оплаты.",
          "prerequisites": [
            "conditions-assessment"
          ]
        },
        {
          "id": "conditions-project-step-2",
          "title": "Проверь реальные сценарии",
          "paragraphs": [
            "Нужны не только обычный и бесплатный заказ. Проверь сумму ровно на пороге доставки, пустую корзину по разрешённой модели и разные статусы оплаты. Для нескольких независимых правил не обязательно одна длинная цепочка elif: сначала можно вычислить цену, потом отдельно статус.",
            "Проект завершает практику последовательных программ с ветвлением. Он не делает ученика экспертом в коммерческих системах: здесь нет налогов, возвратов, базы данных и проверки пользовательской сессии. Навык конкретный и переносимый: перевести несколько объявленных правил в понятный код и подобрать тесты к границам."
          ],
          "examples": [
            {
              "id": "conditions-project-example-2",
              "title": "Независимый статус",
              "code": "total=1500\npaid=1500\nif paid>=total:\n    print(\"оплачено\")\nelse:\n    print(\"недоплата\",total-paid)",
              "output": "оплачено",
              "explanation": "Статус вычисляется после итоговой цены и не заменяет её расчёт."
            }
          ],
          "goal": "Объяснить: Нужны не только обычный и бесплатный заказ.",
          "prerequisites": [
            "conditions-project-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "conditions-project-order",
          "kind": "code",
          "title": "Заказ с доставкой",
          "goal": "Собрать несколько связанных полей отчёта по тарифу.",
          "prerequisites": [
            "conditions-project"
          ],
          "prompt": "Прочитай целые цену единицы и количество. Стоимость товаров равна их произведению. Если она не меньше 2000, доставка бесплатна, иначе стоит 200, в том числе для нулевой корзины. Выведи Товары:, Доставка:, Итого: с соответствующими числами на трёх строках.",
          "inputFormat": "2 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Цена и количество — целые от 0 до 1000000. Доставка для пустой корзины по учебному контракту стоит 200.",
          "examples": [
            {
              "input": [
                "100",
                "19"
              ],
              "output": "Товары: 1900\nДоставка: 200\nИтого: 2100",
              "explanation": "Порог проверяется до добавления доставки; ровно 2000 уже удовлетворяет >=."
            },
            {
              "input": [
                "2000",
                "1"
              ],
              "output": "Товары: 2000\nДоставка: 0\nИтого: 2000",
              "explanation": "Порог проверяется до добавления доставки; ровно 2000 уже удовлетворяет >=."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "100",
                "19"
              ],
              "expectedOutput": "Товары: 1900\nДоставка: 200\nИтого: 2100",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "100",
                "20"
              ],
              "expectedOutput": "Товары: 2000\nДоставка: 0\nИтого: 2000",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "100",
                "21"
              ],
              "expectedOutput": "Товары: 2100\nДоставка: 0\nИтого: 2100",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "0",
                "0"
              ],
              "expectedOutput": "Товары: 0\nДоставка: 200\nИтого: 200",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "2000",
                "1"
              ],
              "expectedOutput": "Товары: 2000\nДоставка: 0\nИтого: 2000",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "price=int(input())\nquantity=int(input())\nsubtotal=price*quantity\nif subtotal>=2000:\n    delivery=0\nelse:\n    delivery=200\nprint(\"Товары:\",subtotal)\nprint(\"Доставка:\",delivery)\nprint(\"Итого:\",subtotal+delivery)",
          "alternative": "subtotal=int(input())*int(input())\ndelivery=200\nif subtotal>=2000:\n    delivery=0\ntotal=subtotal+delivery\nprint(\"Товары:\",subtotal)\nprint(\"Доставка:\",delivery)\nprint(\"Итого:\",total)",
          "wrongSolutions": [
            {
              "code": "p=int(input())\nq=int(input())\ns=p*q\nif s>2000:\n    d=0\nelse:\n    d=200\nprint('Товары:',s)\nprint('Доставка:',d)\nprint('Итого:',s+d)",
              "why": "Точная пороговая сумма должна получить бесплатную доставку."
            },
            {
              "code": "p=int(input())\nq=int(input())\ns=p*q\nd=200\nprint('Товары:',s)\nprint('Доставка:',d)\nprint('Итого:',s+d)",
              "why": "Правило бесплатной доставки вообще не применяется."
            }
          ],
          "hints": [
            "Сначала стоимость товаров.",
            "По ней выбери доставку с включённым порогом 2000.",
            "Итог — сумма товаров и выбранной доставки."
          ],
          "solutionExplanation": [
            "Порог проверяется до добавления доставки; ровно 2000 уже удовлетворяет >=."
          ],
          "required": true
        },
        {
          "id": "conditions-project-discount",
          "kind": "code",
          "title": "Купон и скидка",
          "goal": "Совместить два требования и целую денежную скидку.",
          "prerequisites": [
            "conditions-project"
          ],
          "prompt": "Прочитай целую сумму товаров и строку да или нет о купоне. При да и сумме не меньше 1000 скидка равна сумме * 10 // 100; иначе скидка 0. Выведи скидку и сумму после неё через пробел.",
          "inputFormat": "2 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Сумма — целое от 0 до 1000000, купон — да или нет.",
          "examples": [
            {
              "input": [
                "999",
                "да"
              ],
              "output": "0 999",
              "explanation": "and выражает совместное требование; целая скидка вычисляется до вычитания."
            },
            {
              "input": [
                "0",
                "нет"
              ],
              "output": "0 0",
              "explanation": "and выражает совместное требование; целая скидка вычисляется до вычитания."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "999",
                "да"
              ],
              "expectedOutput": "0 999",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "1000",
                "да"
              ],
              "expectedOutput": "100 900",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "1000",
                "нет"
              ],
              "expectedOutput": "0 1000",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "1207",
                "да"
              ],
              "expectedOutput": "120 1087",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "0",
                "нет"
              ],
              "expectedOutput": "0 0",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "subtotal=int(input())\ncoupon=input()\nif coupon==\"да\" and subtotal>=1000:\n    discount=subtotal*10//100\nelse:\n    discount=0\nprint(discount,subtotal-discount)",
          "alternative": "subtotal=int(input())\ncoupon=input()\ndiscount=0\nif subtotal>=1000:\n    if coupon==\"да\":\n        discount=subtotal//10\nprint(discount,subtotal-discount)",
          "wrongSolutions": [
            {
              "code": "s=int(input())\nc=input()\nif c=='да' or s>=1000:\n    d=s*10//100\nelse:\n    d=0\nprint(d,s-d)",
              "why": "Хватает одного из требований, хотя нужны оба."
            },
            {
              "code": "s=int(input())\nc=input()\nif c=='да' and s>1000:\n    d=s*10//100\nelse:\n    d=0\nprint(d,s-d)",
              "why": "Сумма ровно 1000 должна давать скидку."
            }
          ],
          "hints": [
            "Купон и достаточная сумма обязательны одновременно.",
            "Скидку вычисляй только в подходящей ветви.",
            "Итог равен subtotal - discount."
          ],
          "solutionExplanation": [
            "and выражает совместное требование; целая скидка вычисляется до вычитания."
          ],
          "required": true
        },
        {
          "id": "conditions-project-payment",
          "kind": "code",
          "title": "Статус оплаты",
          "goal": "Разделить три отношения и вывести правильную разницу.",
          "prerequisites": [
            "conditions-project"
          ],
          "prompt": "Прочитай целый итог заказа и внесённую сумму. Если внесено меньше, выведи Доплатить: разница; если равно, Оплачено; если больше, Сдача: разница.",
          "inputFormat": "2 строки в порядке полей из условия. Каждое значение читается отдельным input().",
          "outputFormat": "Только результат, указанный в условии. Соблюдай пробелы и переносы строк.",
          "constraints": "Обе суммы — целые от 0 до 1000000.",
          "examples": [
            {
              "input": [
                "1000",
                "900"
              ],
              "output": "Доплатить: 100",
              "explanation": "Цепочка охватывает три возможных отношения двух сумм и печатает ровно один результат."
            },
            {
              "input": [
                "0",
                "5"
              ],
              "output": "Сдача: 5",
              "explanation": "Цепочка охватывает три возможных отношения двух сумм и печатает ровно один результат."
            }
          ],
          "initialCode": "# Напиши решение самостоятельно\n",
          "tests": [
            {
              "stdin": [
                "1000",
                "900"
              ],
              "expectedOutput": "Доплатить: 100",
              "description": "Основной случай 1"
            },
            {
              "stdin": [
                "1000",
                "1000"
              ],
              "expectedOutput": "Оплачено",
              "description": "Граничный или изменённый случай 2"
            },
            {
              "stdin": [
                "1000",
                "1200"
              ],
              "expectedOutput": "Сдача: 200",
              "description": "Граничный или изменённый случай 3"
            },
            {
              "stdin": [
                "0",
                "0"
              ],
              "expectedOutput": "Оплачено",
              "description": "Граничный или изменённый случай 4"
            },
            {
              "stdin": [
                "0",
                "5"
              ],
              "expectedOutput": "Сдача: 5",
              "description": "Граничный или изменённый случай 5"
            }
          ],
          "reference": "total=int(input())\npaid=int(input())\nif paid<total:\n    print(\"Доплатить:\",total-paid)\nelif paid==total:\n    print(\"Оплачено\")\nelse:\n    print(\"Сдача:\",paid-total)",
          "alternative": "total=int(input())\npaid=int(input())\ndifference=paid-total\nif difference==0:\n    print(\"Оплачено\")\nelif difference>0:\n    print(\"Сдача:\",difference)\nelse:\n    print(\"Доплатить:\",-difference)",
          "wrongSolutions": [
            {
              "code": "t=int(input())\np=int(input())\nif p<t:\n    print('Доплатить:',p-t)\nelif p==t:\n    print('Оплачено')\nelse:\n    print('Сдача:',p-t)",
              "why": "Недоплата должна быть положительной величиной."
            },
            {
              "code": "t=int(input())\np=int(input())\nif p<=t:\n    print('Доплатить:',t-p)\nelse:\n    print('Сдача:',p-t)",
              "why": "Равенство требует отдельного статуса, а не доплаты ноль."
            }
          ],
          "hints": [
            "Есть меньше, равно и больше.",
            "Направление разности зависит от случая.",
            "При равенстве выводится только слово Оплачено."
          ],
          "solutionExplanation": [
            "Цепочка охватывает три возможных отношения двух сумм и печатает ровно один результат."
          ],
          "required": true
        },
        {
          "id": "conditions-project-plan",
          "kind": "order",
          "title": "Проверка заказа",
          "goal": "Проверка заказа",
          "prerequisites": [
            "conditions-project"
          ],
          "prompt": "Поставь этапы реализации правил заказа в порядок.",
          "inputFormat": "Прочитай условие и выбери ответ в интерфейсе.",
          "outputFormat": "Ответ без пояснений, если запрашивается вывод программы.",
          "constraints": "Рассуждай по правилам Python 3.12.",
          "examples": [
            {
              "output": "Правило → формула → ветвь → тест",
              "explanation": "Аналог расчёта льготного билета: сначала объяви возрастной порог, вычисли данные, выбери цену и проверь возраст по обе стороны порога."
            }
          ],
          "answer": [
            "2",
            "4",
            "1",
            "3"
          ],
          "hints": [
            "Сначала пойми, по какой сумме определяется доставка.",
            "Затем прочитай вход и вычисли стоимость товаров.",
            "После выбора доставки можно получить итог и проверить края."
          ],
          "solutionExplanation": [
            "Контракт → исходный расчёт → зависимые правила → проверка границ."
          ],
          "required": true,
          "blocks": [
            {
              "id": "1",
              "text": "Выбрать доставку по нужной сумме и вычислить итог."
            },
            {
              "id": "2",
              "text": "Уточнить порядок правил и включение порогов."
            },
            {
              "id": "3",
              "text": "Проверить ниже порога, ровно на пороге и выше."
            },
            {
              "id": "4",
              "text": "Прочитать вход и вычислить стоимость товаров."
            }
          ]
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.12/tutorial/controlflow.html#if-statements",
    "https://docs.python.org/3.12/reference/expressions.html#comparisons",
    "https://docs.python.org/3.12/library/stdtypes.html#boolean-operations-and-or-not",
    "https://docs.python.org/3.12/reference/compound_stmts.html#the-if-statement"
  ]
};

export default module;
