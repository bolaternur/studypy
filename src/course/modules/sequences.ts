import type { CourseModule } from '../types';
const content: CourseModule = {
  "id": "sequences",
  "title": "Списки и кортежи",
  "track": "base",
  "depth": "Практический модуль",
  "goal": "Хранить и преобразовывать последовательности без ошибок индекса и общих ссылок.",
  "prerequisites": [
    "strings"
  ],
  "lessons": [
    {
      "id": "sequences-read",
      "title": "Список: индекс и значение",
      "goal": "Хранить несколько значений и различать позицию и содержимое.",
      "prerequisites": [],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "sequences-read-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Список хранит упорядоченную последовательность объектов. Литерал [4, 7, 4] создаёт три элемента; повторные значения не исчезают. Индексы, отрицательные индексы и срезы работают по тем же правилам, что у строки. len(values) возвращает количество элементов, а values[i] — один элемент. Список может быть пустым: его запись []. Обращение по индексу в пустом списке вызывает IndexError.",
            "Отличие от строки в том, что список изменяем. Пока начнём с чтения: for value in values даёт значения по порядку. Если нужны индексы, используй range(len(values)) и обращение values[i]. Индекс и значение могут случайно совпадать, но это разные понятия. Для списка [8, 2] индекс ноль хранит восемь, а индекс один — два. Проверяй себя на таком примере, а не на [0, 1, 2]."
          ],
          "examples": [
            {
              "id": "sequences-read-example-1",
              "title": "Позиция и содержимое",
              "code": "values = [8, 2, 8]\nfor i in range(len(values)):\n    print(i, values[i])",
              "output": "0 8\n1 2\n2 8",
              "explanation": "Повторное значение 8 занимает две разные позиции."
            }
          ],
          "goal": "Хранить несколько значений и различать позицию и содержимое.",
          "prerequisites": []
        },
        {
          "id": "sequences-read-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Числа, прочитанные из input, нужно преобразовать до помещения в числовой список. Удобно начать с [] и добавлять элементы методом append: он помещает один объект в конец. Подробности изменения изучим в следующем уроке. Вызов print(values) показывает представление списка со скобками и запятыми. print(*values) разворачивает элементы как отдельные аргументы print и разделяет их пробелами; для пустого списка печатает пустую строку.",
            "Хранить список стоит, когда элементы потребуются повторно, в другом порядке или по позиции. Если нужна только общая сумма потока, накопителя достаточно и список добавит лишнюю память. Выбирай структуру по задаче. В упражнениях ниже список помогает сопоставить индекс и значение и сохранить результат для другого порядка вывода. Пользовательские функции пока не требуются.",
            "enumerate даёт пары из счётчика и текущего значения: for index, value in enumerate(values). По умолчанию счётчик начинается с 0; enumerate(values, start=1) показывает человеческие номера, не меняя индексы самого списка. Запись двух имён распаковывает пару. Если далее обращаешься values[index], не используй start=1 без обратного преобразования."
          ],
          "examples": [
            {
              "id": "sequences-read-example-2",
              "title": "Разные форматы",
              "code": "values = [3, 5]\nprint(values)\nprint(*values)",
              "output": "[3, 5]\n3 5",
              "explanation": "Первый вывод — представление списка, второй — элементы через пробел."
            },
            {
              "id": "sequences-read-example-3",
              "title": "Контейнер не преобразует типы",
              "code": "values = [\"10\", \"2\"]\nprint(values[0] + values[1])\nprint(int(values[0]) + int(values[1]))",
              "output": "102\n12",
              "explanation": "Список хранит переданные строки, а не превращает их в числа. Первый + соединяет текст, второй складывает целые. Это объясняет, почему после split перед числовой сортировкой или арифметикой требуется явное преобразование каждого элемента, а не только самого контейнера."
            },
            {
              "id": "sequences-read-example-4",
              "title": "Нумерация без ручного индекса",
              "code": "names = [\"Алия\", \"Ли\"]\nfor number, name in enumerate(names, start=1):\n    print(number, name)",
              "output": "1 Алия\n2 Ли",
              "explanation": "enumerate с start=1 создаёт отображаемые номера; сам список продолжает иметь индексы 0 и 1."
            }
          ],
          "goal": "Проверить применение: хранить несколько значений и различать позицию и содержимое.",
          "prerequisites": [
            "sequences-read-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sequences-read-at",
          "kind": "code",
          "title": "Элемент по индексу",
          "goal": "Элемент по индексу",
          "prerequisites": [
            "sequences-read"
          ],
          "prompt": "Считай n, n чисел и корректный индекс k. Выведи элемент списка с индексом k.",
          "inputFormat": "n ≥ 1; n целых строк; k от 0 до n−1.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "1 ≤ n ≤ 200; элементы от −1000000 до 1000000; 0 ≤ k < n. Выводится один элемент.",
          "examples": [
            {
              "input": [
                "3",
                "8",
                "2",
                "5",
                "0"
              ],
              "output": "8",
              "explanation": "Сохрани значения в список, затем обратись к values[k]."
            },
            {
              "input": [
                "3",
                "8",
                "2",
                "5",
                "2"
              ],
              "output": "5",
              "explanation": "Сохрани значения в список, затем обратись к values[k]."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "3",
                "8",
                "2",
                "5",
                "0"
              ],
              "expectedOutput": "8",
              "description": "Вход: 3 / 8 / 2 / 5 / 0"
            },
            {
              "stdin": [
                "3",
                "8",
                "2",
                "5",
                "2"
              ],
              "expectedOutput": "5",
              "description": "Вход: 3 / 8 / 2 / 5 / 2"
            },
            {
              "stdin": [
                "1",
                "-7",
                "0"
              ],
              "expectedOutput": "-7",
              "description": "Вход: 1 / -7 / 0"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nk = int(input())\nprint(values[k])",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values += [int(input())]\nk = int(input())\nfor i in range(n):\n    if i == k:\n        print(values[i])",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nk = int(input())\nprint(k)",
              "why": "Индекс — не значение элемента."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nk = int(input())\nprint(values[k - 1])",
              "why": "В условии индекс уже начинается с нуля."
            }
          ],
          "hints": [
            "Сохрани значения в список, затем обратись к values[k].",
            "Проверь этот риск: Индекс — не значение элемента.",
            "Ещё одна важная граница: В условии индекс уже начинается с нуля."
          ],
          "solutionExplanation": [
            "Сохрани значения в список, затем обратись к values[k].",
            "Индекс — не значение элемента.",
            "В условии индекс уже начинается с нуля."
          ],
          "required": true
        },
        {
          "id": "sequences-read-reverse",
          "kind": "code",
          "title": "Прочитать и вывести наоборот",
          "goal": "Прочитать и вывести наоборот",
          "prerequisites": [
            "sequences-read"
          ],
          "prompt": "Считай n и n целых. Выведи значения в обратном порядке через пробел без скобок.",
          "inputFormat": "n, затем n целых по одному в строке.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. Не более 200 чисел в одной строке, меньше 2000 символов.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Обратный срез меняет порядок элементов; * разворачивает их для print."
            },
            {
              "input": [
                "1",
                "8"
              ],
              "output": "8",
              "explanation": "Обратный срез меняет порядок элементов; * разворачивает их для print."
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
                "1",
                "8"
              ],
              "expectedOutput": "8",
              "description": "Вход: 1 / 8"
            },
            {
              "stdin": [
                "3",
                "8",
                "-2",
                "5"
              ],
              "expectedOutput": "5 -2 8",
              "description": "Вход: 3 / 8 / -2 / 5"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*values[::-1])",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nfor i in range(n - 1, -1, -1):\n    print(values[i], end=\"\\n\" if i == 0 else \" \")",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*values)",
              "why": "Сохраняет исходный порядок."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(values[::-1])",
              "why": "Печатает скобки и запятые вместо заданного формата."
            }
          ],
          "hints": [
            "Обратный срез меняет порядок элементов; * разворачивает их для print.",
            "Проверь этот риск: Сохраняет исходный порядок.",
            "Ещё одна важная граница: Печатает скобки и запятые вместо заданного формата."
          ],
          "solutionExplanation": [
            "Обратный срез меняет порядок элементов; * разворачивает их для print.",
            "Сохраняет исходный порядок.",
            "Печатает скобки и запятые вместо заданного формата."
          ],
          "required": true
        },
        {
          "id": "sequences-read-positions",
          "kind": "code",
          "title": "Позиции положительных значений",
          "goal": "Позиции положительных значений",
          "prerequisites": [
            "sequences-read"
          ],
          "prompt": "Считай n и n чисел. Выведи индексы строго положительных элементов в возрастающем порядке через пробел.",
          "inputFormat": "n, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. Индексы 0…n−1; выводится не больше 200 индексов.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Перебирай индексы, а условие проверяй для values[i]."
            },
            {
              "input": [
                "4",
                "-1",
                "7",
                "0",
                "2"
              ],
              "output": "1 3",
              "explanation": "Перебирай индексы, а условие проверяй для values[i]."
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
                "-1",
                "7",
                "0",
                "2"
              ],
              "expectedOutput": "1 3",
              "description": "Вход: 4 / -1 / 7 / 0 / 2"
            },
            {
              "stdin": [
                "2",
                "-2",
                "0"
              ],
              "expectedOutput": "",
              "description": "Вход: 2 / -2 / 0"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nindices = []\nfor i in range(n):\n    if values[i] > 0:\n        indices.append(i)\nprint(*indices)",
          "alternative": "n = int(input())\nindices = []\nfor i in range(n):\n    x = int(input())\n    if x > 0:\n        indices.append(i)\nprint(*indices)",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nindices = []\nfor x in values:\n    if x > 0:\n        indices.append(x)\nprint(*indices)",
              "why": "Выводит сами значения вместо индексов."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nindices = []\nfor i in range(n):\n    if values[i] >= 0:\n        indices.append(i)\nprint(*indices)",
              "why": "Ноль не является положительным."
            }
          ],
          "hints": [
            "Перебирай индексы, а условие проверяй для values[i].",
            "Проверь этот риск: Выводит сами значения вместо индексов.",
            "Ещё одна важная граница: Ноль не является положительным."
          ],
          "solutionExplanation": [
            "Перебирай индексы, а условие проверяй для values[i].",
            "Выводит сами значения вместо индексов.",
            "Ноль не является положительным."
          ],
          "required": true
        },
        {
          "id": "sequences-read-index-value",
          "kind": "choice",
          "title": "Индекс или значение?",
          "goal": "Индекс или значение?",
          "prerequisites": [
            "sequences-read"
          ],
          "prompt": "Для values = [9, 4, 9] выбери верные утверждения.",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "values = [3, 5]",
                "print(values)",
                "print(*values)"
              ],
              "output": "[3, 5]\n3 5",
              "explanation": "Разобранный пример по этой идее: Первый вывод — представление списка, второй — элементы через пробел. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Три элемента имеют индексы 0, 1, 2; повторы значений допустимы."
          ],
          "required": true,
          "answer": [
            "1",
            "3"
          ],
          "choices": [
            {
              "id": "1",
              "text": "values[1] равно 4."
            },
            {
              "id": "2",
              "text": "Последний допустимый положительный индекс равен 3."
            },
            {
              "id": "3",
              "text": "Значение 9 встречается на двух позициях."
            }
          ]
        }
      ]
    },
    {
      "id": "sequences-update",
      "title": "Изменение, append и pop",
      "goal": "Изменять заданный элемент и учитывать возвращаемые значения методов.",
      "prerequisites": [
        "sequences-read"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "sequences-update-idea",
          "title": "Как это работает",
          "paragraphs": [
            "В список можно присвоить новый элемент: values[i] = new_value. Длина при этом не меняется, а указанная позиция теперь хранит другой объект. В отличие от строки, операция допустима. Метод append добавляет один объект в конец и увеличивает длину на единицу. Метод pop() удаляет и возвращает последний элемент; pop(i) работает с заданной позицией. Удаление сдвигает все последующие индексы влево.",
            "append изменяет список и возвращает None. Поэтому values = values.append(7) теряет ссылку на список: имя values начинает хранить None. Достаточно отдельного вызова values.append(7). У pop, напротив, возвращаемое значение полезно: removed = values.pop(). Перед удалением из возможно пустого списка проверь наличие элементов, иначе возникнет IndexError."
          ],
          "examples": [
            {
              "id": "sequences-update-example-1",
              "title": "Замена и добавление",
              "code": "values = [4, -2]\nvalues[1] = 0\nvalues.append(7)\nprint(values)",
              "output": "[4, 0, 7]",
              "explanation": "Изменение позиции сохраняет длину, append добавляет новую позицию."
            }
          ],
          "goal": "Изменять заданный элемент и учитывать возвращаемые значения методов.",
          "prerequisites": [
            "sequences-read"
          ]
        },
        {
          "id": "sequences-update-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Чтобы заменить каждый отрицательный элемент нулём, перебирай индексы и присваивай values[i] = 0. Если написать for value in values: value = 0, меняется только имя переменной цикла, а позиции списка остаются прежними. Это одно из важнейших различий между чтением значения и изменением контейнера.",
            "Не удаляй элементы из того же списка во время обычного прямого перебора: после удаления позиции сдвигаются и соседний элемент можно пропустить. Для фильтрации позже создадим новый список. Здесь изменения либо адресуются фиксированным индексом, либо происходят с конца, где сдвиг не мешает оставшимся позициям. При тестировании нужны пустой список, один элемент и удаление последнего доступного: они проверяют реальное состояние структуры.",
            "insert(index, value) вставляет значение перед указанной позицией и сдвигает следующие элементы вправо. remove(value) удаляет первое равное значение, а не позицию; при отсутствии вызывает ValueError. Поэтому values.remove(0) и values.pop(0) означают разные действия: удалить первое значение ноль или удалить элемент первой позиции."
          ],
          "examples": [
            {
              "id": "sequences-update-example-2",
              "title": "Удалённое значение",
              "code": "values = [3, 8]\nremoved = values.pop()\nprint(removed)\nprint(values)",
              "output": "8\n[3]",
              "explanation": "pop одновременно возвращает 8 и оставляет в списке только 3."
            },
            {
              "id": "sequences-update-example-3",
              "title": "Присваивание имени не меняет позицию",
              "code": "values = [1, 2]\nfor value in values:\n    value = 9\nprint(values)",
              "output": "[1, 2]",
              "explanation": "Переменная value получает элемент, а затем связывается с другим числом. Позиции исходного списка не меняются. Чтобы заменить содержимое, нужен доступ к позиции values[i] либо построение нового списка. Проверка печатью после цикла делает различие между временным именем и контейнером наблюдаемым."
            },
            {
              "id": "sequences-update-example-4",
              "title": "Вставка и удаление по значению",
              "code": "values = [10, 30, 10]\nvalues.insert(1, 20)\nvalues.remove(10)\nprint(values)",
              "output": "[20, 30, 10]",
              "explanation": "После вставки перед индексом 1 появилось 20; remove удалил только первую десятку."
            }
          ],
          "goal": "Проверить применение: изменять заданный элемент и учитывать возвращаемые значения методов.",
          "prerequisites": [
            "sequences-update-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sequences-update-zero-negatives",
          "kind": "debug",
          "title": "Обнулить отрицательные",
          "goal": "Обнулить отрицательные",
          "prerequisites": [
            "sequences-update"
          ],
          "prompt": "Найди и исправь ошибку в показанном коде. Считай n и n целых. Замени отрицательные значения нулями, сохранив остальные и порядок. Выведи через пробел.",
          "inputFormat": "n, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. Число позиций сохраняется; одна строка не длиннее 2000 символов.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Для изменения списка перебирай индексы и присваивай по индексу."
            },
            {
              "input": [
                "4",
                "-2",
                "3",
                "0",
                "-1"
              ],
              "output": "0 3 0 0",
              "explanation": "Для изменения списка перебирай индексы и присваивай по индексу."
            }
          ],
          "initialCode": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nfor value in values:\n    if value < 0:\n        value = 0\nprint(*values)",
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
                "-2",
                "3",
                "0",
                "-1"
              ],
              "expectedOutput": "0 3 0 0",
              "description": "Вход: 4 / -2 / 3 / 0 / -1"
            },
            {
              "stdin": [
                "1",
                "5"
              ],
              "expectedOutput": "5",
              "description": "Вход: 1 / 5"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nfor i in range(n):\n    if values[i] < 0:\n        values[i] = 0\nprint(*values)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nresult = []\nfor x in values:\n    result.append(max(0, x))\nprint(*result)",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nfor value in values:\n    if value < 0:\n        value = 0\nprint(*values)",
              "why": "Переприсваивание переменной цикла не меняет элементы."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nfor i in range(n):\n    if values[i] > 0:\n        values[i] = 0\nprint(*values)",
              "why": "Условие выбрало положительные вместо отрицательных."
            }
          ],
          "hints": [
            "Для изменения списка перебирай индексы и присваивай по индексу.",
            "Проверь этот риск: Переприсваивание переменной цикла не меняет элементы.",
            "Ещё одна важная граница: Условие выбрало положительные вместо отрицательных."
          ],
          "solutionExplanation": [
            "Для изменения списка перебирай индексы и присваивай по индексу.",
            "Переприсваивание переменной цикла не меняет элементы.",
            "Условие выбрало положительные вместо отрицательных."
          ],
          "required": true
        },
        {
          "id": "sequences-update-append-total",
          "kind": "code",
          "title": "Добавить контрольную сумму",
          "goal": "Добавить контрольную сумму",
          "prerequisites": [
            "sequences-update"
          ],
          "prompt": "Считай n и n чисел. Добавь в конец их сумму и выведи полученный список через пробел. Для пустого ввода получится один ноль.",
          "inputFormat": "n, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. Добавляется один элемент; сумма по модулю до 200000000, не больше 201 числового поля.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "0",
              "explanation": "Сначала вычисли сумму существующих элементов, затем добавь её отдельным вызовом append."
            },
            {
              "input": [
                "3",
                "2",
                "-3",
                "5"
              ],
              "output": "2 -3 5 4",
              "explanation": "Сначала вычисли сумму существующих элементов, затем добавь её отдельным вызовом append."
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
                "2",
                "-3",
                "5"
              ],
              "expectedOutput": "2 -3 5 4",
              "description": "Вход: 3 / 2 / -3 / 5"
            },
            {
              "stdin": [
                "1",
                "8"
              ],
              "expectedOutput": "8 8",
              "description": "Вход: 1 / 8"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nvalues.append(sum(values))\nprint(*values)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\ntotal = 0\nfor x in values:\n    total += x\nprint(*values, total)",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nvalues = values.append(sum(values))\nprint(*values)",
              "why": "append возвращает None, его не присваивают списку."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nvalues.append(len(values))\nprint(*values)",
              "why": "Длина не является суммой значений."
            }
          ],
          "hints": [
            "Сначала вычисли сумму существующих элементов, затем добавь её отдельным вызовом append.",
            "Проверь этот риск: append возвращает None, его не присваивают списку.",
            "Ещё одна важная граница: Длина не является суммой значений."
          ],
          "solutionExplanation": [
            "Сначала вычисли сумму существующих элементов, затем добавь её отдельным вызовом append.",
            "append возвращает None, его не присваивают списку.",
            "Длина не является суммой значений."
          ],
          "required": true
        },
        {
          "id": "sequences-update-last-or-empty",
          "kind": "code",
          "title": "Удалить последний и показать остаток",
          "goal": "Удалить последний и показать остаток",
          "prerequisites": [
            "sequences-update"
          ],
          "prompt": "Считай n и n чисел. Если список пуст, выведи «пусто». Иначе первая строка — удалённый последний элемент, вторая — оставшиеся через пробел.",
          "inputFormat": "n, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. До двух строк, суммарно не больше 2000 символов; пустой список не удаляется.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "пусто",
              "explanation": "Проверь непустоту и используй pop без индекса."
            },
            {
              "input": [
                "1",
                "7"
              ],
              "output": "7",
              "explanation": "Проверь непустоту и используй pop без индекса."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "пусто",
              "description": "Вход: 0"
            },
            {
              "stdin": [
                "1",
                "7"
              ],
              "expectedOutput": "7",
              "description": "Вход: 1 / 7"
            },
            {
              "stdin": [
                "3",
                "2",
                "4",
                "8"
              ],
              "expectedOutput": "8\n2 4",
              "description": "Вход: 3 / 2 / 4 / 8"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nif values:\n    print(values.pop())\n    print(*values)\nelse:\n    print(\"пусто\")",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nif n == 0:\n    print(\"пусто\")\nelse:\n    print(values[-1])\n    print(*values[:-1])",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(values.pop())\nprint(*values)",
              "why": "Без проверки пустого списка pop вызовет ошибку."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nif values:\n    print(values.pop(0))\n    print(*values)\nelse:\n    print(\"пусто\")",
              "why": "Удаляет первый элемент вместо последнего."
            }
          ],
          "hints": [
            "Проверь непустоту и используй pop без индекса.",
            "Проверь этот риск: Без проверки пустого списка pop вызовет ошибку.",
            "Ещё одна важная граница: Удаляет первый элемент вместо последнего."
          ],
          "solutionExplanation": [
            "Проверь непустоту и используй pop без индекса.",
            "Без проверки пустого списка pop вызовет ошибку.",
            "Удаляет первый элемент вместо последнего."
          ],
          "required": true
        },
        {
          "id": "sequences-update-append-result",
          "kind": "predict",
          "title": "Что возвращает append?",
          "goal": "Что возвращает append?",
          "prerequisites": [
            "sequences-update"
          ],
          "prompt": "Что выведет программа?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Точный вывод программы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "values = [3, 8]",
                "removed = values.pop()",
                "print(removed)",
                "print(values)"
              ],
              "output": "8\n[3]",
              "explanation": "Разобранный пример по этой идее: pop одновременно возвращает 8 и оставляет в списке только 3. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "append изменил исходный список и вернул None."
          ],
          "required": true,
          "answer": "None\n[1, 2]",
          "initialCode": "a = [1]\nresult = a.append(2)\nprint(result)\nprint(a)"
        }
      ]
    },
    {
      "id": "sequences-copy",
      "title": "Общие ссылки и независимые копии",
      "goal": "Различать присваивание имени и копирование изменяемой коллекции.",
      "prerequisites": [
        "sequences-update"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "sequences-copy-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Присваивание b = a не копирует список. Оба имени обращаются к одному объекту, поэтому a.append(3) видно и через b. Это общая ссылка. Проверка a == b сравнивает содержимое, а не независимость. Два разных списка с одинаковыми элементами тоже равны по ==. Чтобы предсказать последствия изменения, нарисуй имена и стрелки к объекту.",
            "Для плоского списка чисел a.copy() или a[:] создаёт новый внешний список. После этого добавление или замена элемента в b не затрагивает a. Это поверхностное копирование: если элементы сами являются списками, вложенные объекты остаются общими. Подробно проверим это в уроке таблиц. Сейчас элементы — целые, поэтому внешней копии достаточно."
          ],
          "examples": [
            {
              "id": "sequences-copy-example-1",
              "title": "Два имени одного списка",
              "code": "a = [1, 2]\nb = a\nb.append(3)\nprint(a)\nprint(b)",
              "output": "[1, 2, 3]\n[1, 2, 3]",
              "explanation": "Добавление через b меняет тот же объект, который доступен через a."
            }
          ],
          "goal": "Различать присваивание имени и копирование изменяемой коллекции.",
          "prerequisites": [
            "sequences-update"
          ]
        },
        {
          "id": "sequences-copy-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Различай изменение объекта и новое связывание имени. a = a + [3] создаёт новый список и перенаправляет a; имя b остаётся со старым объектом. a += [3] для списков расширяет существующий список и изменение видят общие ссылки. В коротком коде эти операции выглядят почти одинаково, но дают разное наблюдаемое поведение.",
            "Практический приём: перед преобразованием исходных измерений сделай копию, если оригинал нужен для сравнения. Не создавай копии автоматически «на всякий случай»: они занимают память. Сперва реши, кому разрешено видеть изменения. При тестировании общей ссылки нужны действия, меняющие контейнер: простая печать двух равных списков не доказывает их независимости. Задачи ниже намеренно требуют сохранить оригинал, а не только получить правильный новый результат."
          ],
          "examples": [
            {
              "id": "sequences-copy-example-2",
              "title": "Независимая внешняя копия",
              "code": "a = [1, 2]\nb = a.copy()\nb[0] = 9\nprint(a)\nprint(b)",
              "output": "[1, 2]\n[9, 2]",
              "explanation": "Числовые элементы не меняются; новый внешний список хранит отдельные позиции."
            },
            {
              "id": "sequences-copy-example-3",
              "title": "Расширение и новое связывание",
              "code": "a = [1]\nb = a\na = a + [2]\nprint(a)\nprint(b)",
              "output": "[1, 2]\n[1]",
              "explanation": "Оператор + создал новый список, поэтому b сохранил прежний [1]. Если бы было a += [2], для списка изменился бы общий объект и оба имени увидели бы добавление. Сначала выясняй, меняет ли операция контейнер, и только затем предсказывай поведение связанных имён."
            }
          ],
          "goal": "Проверить применение: различать присваивание имени и копирование изменяемой коллекции.",
          "prerequisites": [
            "sequences-copy-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sequences-copy-independent",
          "kind": "debug",
          "title": "Удвоенная копия и оригинал",
          "goal": "Удвоенная копия и оригинал",
          "prerequisites": [
            "sequences-copy"
          ],
          "prompt": "Найди и исправь ошибку в показанном коде. Считай n и n чисел. Первая строка — исходные значения, вторая — их удвоенная независимая копия, без скобок.",
          "inputFormat": "n, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. Удвоенные значения по модулю до 2000000; две строки вместе меньше 4000 символов.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Создай отдельный список и обновляй его позиции, сохраняя исходные значения."
            },
            {
              "input": [
                "2",
                "3",
                "-1"
              ],
              "output": "3 -1\n6 -2",
              "explanation": "Создай отдельный список и обновляй его позиции, сохраняя исходные значения."
            }
          ],
          "initialCode": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nresult = values\nfor i in range(n):\n    result[i] *= 2\nprint(*values)\nprint(*result)",
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
                "2",
                "3",
                "-1"
              ],
              "expectedOutput": "3 -1\n6 -2",
              "description": "Вход: 2 / 3 / -1"
            },
            {
              "stdin": [
                "1",
                "0"
              ],
              "expectedOutput": "0\n0",
              "description": "Вход: 1 / 0"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nresult = values.copy()\nfor i in range(n):\n    result[i] *= 2\nprint(*values)\nprint(*result)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nresult = []\nfor value in values:\n    result.append(value * 2)\nprint(*values)\nprint(*result)",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nresult = values\nfor i in range(n):\n    result[i] *= 2\nprint(*values)\nprint(*result)",
              "why": "Общая ссылка изменяет и исходный список."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nresult = values.copy()\nfor value in result:\n    value *= 2\nprint(*values)\nprint(*result)",
              "why": "Изменение переменной цикла не меняет позиции копии."
            }
          ],
          "hints": [
            "Создай отдельный список и обновляй его позиции, сохраняя исходные значения.",
            "Проверь этот риск: Общая ссылка изменяет и исходный список.",
            "Ещё одна важная граница: Изменение переменной цикла не меняет позиции копии."
          ],
          "solutionExplanation": [
            "Создай отдельный список и обновляй его позиции, сохраняя исходные значения.",
            "Общая ссылка изменяет и исходный список.",
            "Изменение переменной цикла не меняет позиции копии."
          ],
          "required": true
        },
        {
          "id": "sequences-copy-snapshot",
          "kind": "code",
          "title": "Снимок перед добавлением",
          "goal": "Снимок перед добавлением",
          "prerequisites": [
            "sequences-copy"
          ],
          "prompt": "Считай n, n чисел и x. Сохрани независимую копию, затем добавь x к рабочему списку. Выведи снимок и рабочий список на двух строках через пробел.",
          "inputFormat": "n; n целых; x.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. x от −1000000 до 1000000; снимок до 200 элементов, рабочий список до 201. Две строки меньше 4000 символов.",
          "examples": [
            {
              "input": [
                "0",
                "5"
              ],
              "output": "\n5",
              "explanation": "Копируй до изменения, а не после него."
            },
            {
              "input": [
                "2",
                "1",
                "2",
                "9"
              ],
              "output": "1 2\n1 2 9",
              "explanation": "Копируй до изменения, а не после него."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0",
                "5"
              ],
              "expectedOutput": "\n5",
              "description": "Вход: 0 / 5"
            },
            {
              "stdin": [
                "2",
                "1",
                "2",
                "9"
              ],
              "expectedOutput": "1 2\n1 2 9",
              "description": "Вход: 2 / 1 / 2 / 9"
            },
            {
              "stdin": [
                "1",
                "-3",
                "0"
              ],
              "expectedOutput": "-3\n-3 0",
              "description": "Вход: 1 / -3 / 0"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nx = int(input())\nsnapshot = values[:]\nvalues.append(x)\nprint(*snapshot)\nprint(*values)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nx = int(input())\nsnapshot = []\nfor value in values:\n    snapshot.append(value)\nvalues += [x]\nprint(*snapshot)\nprint(*values)",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nx = int(input())\nsnapshot = values\nvalues.append(x)\nprint(*snapshot)\nprint(*values)",
              "why": "Снимок является общей ссылкой и тоже получает x."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nx = int(input())\nvalues.append(x)\nsnapshot = values.copy()\nprint(*snapshot)\nprint(*values)",
              "why": "Копия создана слишком поздно и уже содержит новое значение."
            }
          ],
          "hints": [
            "Копируй до изменения, а не после него.",
            "Проверь этот риск: Снимок является общей ссылкой и тоже получает x.",
            "Ещё одна важная граница: Копия создана слишком поздно и уже содержит новое значение."
          ],
          "solutionExplanation": [
            "Копируй до изменения, а не после него.",
            "Снимок является общей ссылкой и тоже получает x.",
            "Копия создана слишком поздно и уже содержит новое значение."
          ],
          "required": true
        },
        {
          "id": "sequences-copy-reverse-copy",
          "kind": "code",
          "title": "Исходный и обратный порядок",
          "goal": "Исходный и обратный порядок",
          "prerequisites": [
            "sequences-copy"
          ],
          "prompt": "Считай n и n чисел. Выведи исходный список и обратную копию на двух строках через пробел.",
          "inputFormat": "n, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. Два порядка по n элементов; весь вывод меньше 4000 символов.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Для независимого порядка используй обратный срез или reverse на копии."
            },
            {
              "input": [
                "3",
                "1",
                "2",
                "3"
              ],
              "output": "1 2 3\n3 2 1",
              "explanation": "Для независимого порядка используй обратный срез или reverse на копии."
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
                "1",
                "2",
                "3"
              ],
              "expectedOutput": "1 2 3\n3 2 1",
              "description": "Вход: 3 / 1 / 2 / 3"
            },
            {
              "stdin": [
                "1",
                "7"
              ],
              "expectedOutput": "7\n7",
              "description": "Вход: 1 / 7"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nbackward = values[::-1]\nprint(*values)\nprint(*backward)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nbackward = values.copy()\nbackward.reverse()\nprint(*values)\nprint(*backward)",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nbackward = values\nbackward.reverse()\nprint(*values)\nprint(*backward)",
              "why": "reverse через общую ссылку меняет оригинал."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nbackward = values.copy()\nbackward = backward.reverse()\nprint(*values)\nprint(*backward)",
              "why": "reverse возвращает None, а не список."
            }
          ],
          "hints": [
            "Для независимого порядка используй обратный срез или reverse на копии.",
            "Проверь этот риск: reverse через общую ссылку меняет оригинал.",
            "Ещё одна важная граница: reverse возвращает None, а не список."
          ],
          "solutionExplanation": [
            "Для независимого порядка используй обратный срез или reverse на копии.",
            "reverse через общую ссылку меняет оригинал.",
            "reverse возвращает None, а не список."
          ],
          "required": true
        },
        {
          "id": "sequences-copy-alias",
          "kind": "predict",
          "title": "Проследить общую ссылку",
          "goal": "Проследить общую ссылку",
          "prerequisites": [
            "sequences-copy"
          ],
          "prompt": "Что выведет код?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Точный вывод программы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "a = [1, 2]",
                "b = a.copy()",
                "b[0] = 9",
                "print(a)",
                "print(b)"
              ],
              "output": "[1, 2]\n[9, 2]",
              "explanation": "Разобранный пример по этой идее: Числовые элементы не меняются; новый внешний список хранит отдельные позиции. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "b и a указывают на один изменяемый список."
          ],
          "required": true,
          "answer": "[5, 2]",
          "initialCode": "a = [1, 2]\nb = a\nb[0] = 5\nprint(a)"
        }
      ]
    },
    {
      "id": "sequences-search",
      "title": "Поиск, минимум и повторные значения",
      "goal": "Искать позицию и обрабатывать отсутствие ответа.",
      "prerequisites": [
        "sequences-copy"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "sequences-search-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Оператор in для списка проверяет наличие значения. values.index(x) возвращает индекс первого равного элемента, но при отсутствии вызывает ValueError. В отличие от строкового find он не возвращает −1. Если отсутствие допустимо, сначала проверь x in values или выполни явный перебор. Метод count(x) считает все равные значения и возвращает ноль при отсутствии.",
            "Для поиска минимального значения можно использовать min, но пустой список без дополнительного правила вызовет ValueError. Если нужен индекс первого минимума, храни позицию лучшего элемента. Замена только при строго меньшем значении сохраняет первый ответ при равенстве. Использование <= выберет последний минимум. Это выбор семантики, а не косметика."
          ],
          "examples": [
            {
              "id": "sequences-search-example-1",
              "title": "Первое совпадение",
              "code": "values = [7, 2, 7]\nprint(7 in values)\nprint(values.index(7))\nprint(values.count(7))",
              "output": "True\n0\n2",
              "explanation": "Наличие, первая позиция и количество — три разных результата."
            }
          ],
          "goal": "Искать позицию и обрабатывать отсутствие ответа.",
          "prerequisites": [
            "sequences-copy"
          ]
        },
        {
          "id": "sequences-search-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Когда нужно найти второе вхождение, одного index без начальной границы недостаточно. Можно начать поиск после первой позиции или вести счётчик совпадений в цикле. Значение и позиция снова различаются: ответом задачи может быть индекс, количество или само число. Перед кодом подчеркни требуемую величину.",
            "Поиск удобно проверять на нескольких одинаковых значениях, отсутствии совпадения, первом и последнем элементе. Пример со всеми различными числами не обнаруживает ошибку выбора первого или последнего. Пустой список требует заранее объявленного результата, например −1 для отсутствующей позиции. Не подменяй отсутствие нулём, если индекс ноль допустим. В задачах ниже соблюдается одно соглашение: индексы начинаются с нуля, а −1 обозначает отсутствие."
          ],
          "examples": [
            {
              "id": "sequences-search-example-2",
              "title": "Первый минимум",
              "code": "values = [4, 1, 1]\nbest = 0\nfor i in range(1, len(values)):\n    if values[i] < values[best]:\n        best = i\nprint(best)",
              "output": "1",
              "explanation": "Строгое сравнение оставляет первую из двух минимальных позиций."
            },
            {
              "id": "sequences-search-example-3",
              "title": "Отсутствие проверяется явно",
              "code": "values = [0, 5]\nquery = 7\nif query in values:\n    print(values.index(query))\nelse:\n    print(-1)",
              "output": "-1",
              "explanation": "У неизвестного значения нет позиции. Отдельный результат −1 не смешивается с допустимым индексом ноль. Нельзя считать нулевое значение признаком отсутствия: в примере оно является обычным содержимым первой позиции. Согласованное соглашение упрощает дальнейшее использование результата."
            }
          ],
          "goal": "Проверить применение: искать позицию и обрабатывать отсутствие ответа.",
          "prerequisites": [
            "sequences-search-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sequences-search-first-index",
          "kind": "code",
          "title": "Первый индекс или −1",
          "goal": "Первый индекс или −1",
          "prerequisites": [
            "sequences-search"
          ],
          "prompt": "Считай n, n чисел и x. Выведи индекс первого x либо −1.",
          "inputFormat": "n; n целых; x.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. x от −1000000 до 1000000; ответ 0…n−1 либо −1.",
          "examples": [
            {
              "input": [
                "0",
                "8"
              ],
              "output": "-1",
              "explanation": "Проверь наличие или останови перебор после первого совпадения."
            },
            {
              "input": [
                "3",
                "7",
                "2",
                "7",
                "7"
              ],
              "output": "0",
              "explanation": "Проверь наличие или останови перебор после первого совпадения."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0",
                "8"
              ],
              "expectedOutput": "-1",
              "description": "Вход: 0 / 8"
            },
            {
              "stdin": [
                "3",
                "7",
                "2",
                "7",
                "7"
              ],
              "expectedOutput": "0",
              "description": "Вход: 3 / 7 / 2 / 7 / 7"
            },
            {
              "stdin": [
                "2",
                "4",
                "5",
                "9"
              ],
              "expectedOutput": "-1",
              "description": "Вход: 2 / 4 / 5 / 9"
            },
            {
              "stdin": [
                "2",
                "4",
                "5",
                "5"
              ],
              "expectedOutput": "1",
              "description": "Вход: 2 / 4 / 5 / 5"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nx = int(input())\nprint(values.index(x) if x in values else -1)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nx = int(input())\nanswer = -1\nfor i in range(n):\n    if values[i] == x:\n        answer = i\n        break\nprint(answer)",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nx = int(input())\nprint(values.index(x))",
              "why": "index без проверки не обрабатывает отсутствие."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nx = int(input())\nanswer = -1\nfor i in range(n):\n    if values[i] == x:\n        answer = i\nprint(answer)",
              "why": "Сохраняет последнее совпадение."
            }
          ],
          "hints": [
            "Проверь наличие или останови перебор после первого совпадения.",
            "Проверь этот риск: index без проверки не обрабатывает отсутствие.",
            "Ещё одна важная граница: Сохраняет последнее совпадение."
          ],
          "solutionExplanation": [
            "Проверь наличие или останови перебор после первого совпадения.",
            "index без проверки не обрабатывает отсутствие.",
            "Сохраняет последнее совпадение."
          ],
          "required": true
        },
        {
          "id": "sequences-search-minimum-index",
          "kind": "code",
          "title": "Первый минимальный элемент",
          "goal": "Первый минимальный элемент",
          "prerequisites": [
            "sequences-search"
          ],
          "prompt": "Считай n и n чисел. Выведи индекс первого минимального элемента; для пустого списка −1.",
          "inputFormat": "n, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. Ответ — первый индекс минимума либо −1 при n=0.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "-1",
              "explanation": "Сохраняй лучшую позицию и меняй её лишь при строго меньшем значении."
            },
            {
              "input": [
                "3",
                "4",
                "1",
                "1"
              ],
              "output": "1",
              "explanation": "Сохраняй лучшую позицию и меняй её лишь при строго меньшем значении."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "-1",
              "description": "Вход: 0"
            },
            {
              "stdin": [
                "3",
                "4",
                "1",
                "1"
              ],
              "expectedOutput": "1",
              "description": "Вход: 3 / 4 / 1 / 1"
            },
            {
              "stdin": [
                "1",
                "9"
              ],
              "expectedOutput": "0",
              "description": "Вход: 1 / 9"
            },
            {
              "stdin": [
                "3",
                "-2",
                "5",
                "-3"
              ],
              "expectedOutput": "2",
              "description": "Вход: 3 / -2 / 5 / -3"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nif not values:\n    print(-1)\nelse:\n    best = 0\n    for i in range(1, n):\n        if values[i] < values[best]:\n            best = i\n    print(best)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(values.index(min(values)) if values else -1)",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nif values:\n    best = 0\n    for i in range(1, n):\n        if values[i] <= values[best]:\n            best = i\n    print(best)\nelse:\n    print(-1)",
              "why": "Равенство заменяет первую позицию последней."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(min(values) if values else -1)",
              "why": "Печатает минимальное значение вместо его индекса."
            }
          ],
          "hints": [
            "Сохраняй лучшую позицию и меняй её лишь при строго меньшем значении.",
            "Проверь этот риск: Равенство заменяет первую позицию последней.",
            "Ещё одна важная граница: Печатает минимальное значение вместо его индекса."
          ],
          "solutionExplanation": [
            "Сохраняй лучшую позицию и меняй её лишь при строго меньшем значении.",
            "Равенство заменяет первую позицию последней.",
            "Печатает минимальное значение вместо его индекса."
          ],
          "required": true
        },
        {
          "id": "sequences-search-second-index",
          "kind": "code",
          "title": "Второе вхождение",
          "goal": "Второе вхождение",
          "prerequisites": [
            "sequences-search"
          ],
          "prompt": "Считай n, n чисел и x. Выведи индекс второго вхождения x или −1.",
          "inputFormat": "n; n целых; x.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. x от −1000000 до 1000000; ответ — второй индекс x либо −1.",
          "examples": [
            {
              "input": [
                "0",
                "2"
              ],
              "output": "-1",
              "explanation": "Считай совпадения и фиксируй позицию именно второго."
            },
            {
              "input": [
                "4",
                "2",
                "1",
                "2",
                "2",
                "2"
              ],
              "output": "2",
              "explanation": "Считай совпадения и фиксируй позицию именно второго."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0",
                "2"
              ],
              "expectedOutput": "-1",
              "description": "Вход: 0 / 2"
            },
            {
              "stdin": [
                "4",
                "2",
                "1",
                "2",
                "2",
                "2"
              ],
              "expectedOutput": "2",
              "description": "Вход: 4 / 2 / 1 / 2 / 2 / 2"
            },
            {
              "stdin": [
                "2",
                "2",
                "3",
                "2"
              ],
              "expectedOutput": "-1",
              "description": "Вход: 2 / 2 / 3 / 2"
            },
            {
              "stdin": [
                "2",
                "5",
                "5",
                "5"
              ],
              "expectedOutput": "1",
              "description": "Вход: 2 / 5 / 5 / 5"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nx = int(input())\ncount = 0\nanswer = -1\nfor i in range(n):\n    if values[i] == x:\n        count += 1\n        if count == 2:\n            answer = i\n            break\nprint(answer)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nx = int(input())\nif values.count(x) < 2:\n    print(-1)\nelse:\n    first = values.index(x)\n    print(values.index(x, first + 1))",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nx = int(input())\nprint(values.index(x) if x in values else -1)",
              "why": "Возвращает первое вхождение."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nx = int(input())\nanswer = -1\nfor i in range(n):\n    if values[i] == x:\n        answer = i\nprint(answer)",
              "why": "Возвращает последнее, которое может быть третьим."
            }
          ],
          "hints": [
            "Считай совпадения и фиксируй позицию именно второго.",
            "Проверь этот риск: Возвращает первое вхождение.",
            "Ещё одна важная граница: Возвращает последнее, которое может быть третьим."
          ],
          "solutionExplanation": [
            "Считай совпадения и фиксируй позицию именно второго.",
            "Возвращает первое вхождение.",
            "Возвращает последнее, которое может быть третьим."
          ],
          "required": true
        },
        {
          "id": "sequences-search-index-absent",
          "kind": "choice",
          "title": "index и отсутствие",
          "goal": "index и отсутствие",
          "prerequisites": [
            "sequences-search"
          ],
          "prompt": "Чем list.index отличается от str.find при отсутствии?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "values = [4, 1, 1]",
                "best = 0",
                "for i in range(1, len(values)):",
                "    if values[i] < values[best]:",
                "        best = i",
                "print(best)"
              ],
              "output": "1",
              "explanation": "Разобранный пример по этой идее: Строгое сравнение оставляет первую из двух минимальных позиций. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Методы имеют разные контракты, несмотря на похожую задачу поиска."
          ],
          "required": true,
          "answer": [
            "1",
            "3"
          ],
          "choices": [
            {
              "id": "1",
              "text": "list.index вызывает ValueError."
            },
            {
              "id": "2",
              "text": "Оба всегда возвращают −1."
            },
            {
              "id": "3",
              "text": "str.find возвращает −1."
            }
          ]
        }
      ]
    },
    {
      "id": "sequences-filter",
      "title": "Фильтрация и преобразование без пропуска элементов",
      "goal": "Создавать новый список по правилу вместо удаления во время обхода.",
      "prerequisites": [
        "sequences-search"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "sequences-filter-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Фильтрация выбирает часть исходных элементов, сохраняя их значения. Преобразование вычисляет новое значение для каждого элемента. Эти действия можно соединить: например, выбрать положительные температуры и увеличить их на заданную поправку. Важно назвать оба правила, иначе легко увеличить все элементы или отфильтровать уже изменённые значения вместо исходных.",
            "Безопасный начальный алгоритм: result = []; for value in values: if условие: result.append(новое_значение). Исходный список не меняется, поэтому перебор не страдает от сдвига индексов. Попытка remove внутри for может пропустить соседние подходящие элементы: после удаления следующий элемент занимает текущую позицию, а итератор уже движется дальше."
          ],
          "examples": [
            {
              "id": "sequences-filter-example-1",
              "title": "Отбор и поправка",
              "code": "values = [-1, 2, 0, 5]\nresult = []\nfor value in values:\n    if value > 0:\n        result.append(value + 10)\nprint(result)",
              "output": "[12, 15]",
              "explanation": "Сначала проверяется исходное значение, затем добавляется преобразованный результат."
            }
          ],
          "goal": "Создавать новый список по правилу вместо удаления во время обхода.",
          "prerequisites": [
            "sequences-search"
          ]
        },
        {
          "id": "sequences-filter-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Позже можно записать этот приём включением: [expression for value in values if condition]. Выражение описывает добавляемое значение, if — фильтр, for — источник. Сначала научись разворачивать включение в обычный цикл. Для сложного ветвления и нескольких обновлений явный цикл обычно легче проверить. Короткая запись не должна скрывать новый алгоритм.",
            "Пустой результат корректен, даже если исходный список непуст. Если контракт требует вывод элементов через пробел, print(*result) уже обрабатывает пустой случай пустой строкой. Не выводи произвольное «ничего», когда такого сообщения нет в условии. Проверяй подряд идущие исключаемые элементы: именно они обнаруживают ошибочное удаление во время перебора. В задачах этого урока исходный порядок выбранных элементов сохраняется."
          ],
          "examples": [
            {
              "id": "sequences-filter-example-2",
              "title": "То же включением",
              "code": "values = [-1, 2, 0, 5]\nresult = [value + 10 for value in values if value > 0]\nprint(result)",
              "output": "[12, 15]",
              "explanation": "Порядок и результат совпадают с развёрнутым циклом."
            },
            {
              "id": "sequences-filter-example-3",
              "title": "Удаление пропускает соседний элемент",
              "code": "values = [-1, -2, 3]\nfor value in values:\n    if value < 0:\n        values.remove(value)\nprint(values)",
              "output": "[-2, 3]",
              "explanation": "После удаления −1 следующий элемент −2 сдвинулся в уже пройденную позицию и остался необработанным. Пример намеренно показывает неверный приём и его фактический результат. Новый список с фильтром, приведённый выше, не меняет источник и потому не имеет этой ошибки."
            }
          ],
          "goal": "Проверить применение: создавать новый список по правилу вместо удаления во время обхода.",
          "prerequisites": [
            "sequences-filter-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sequences-filter-positive-filter",
          "kind": "code",
          "title": "Оставить положительные",
          "goal": "Оставить положительные",
          "prerequisites": [
            "sequences-filter"
          ],
          "prompt": "Считай n и n целых. Выведи только строго положительные значения, сохранив порядок.",
          "inputFormat": "n, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. Результат содержит до 200 элементов, исходный порядок сохраняется.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Создавай отдельный список с подходящими исходными значениями."
            },
            {
              "input": [
                "5",
                "-2",
                "-1",
                "0",
                "3",
                "2"
              ],
              "output": "3 2",
              "explanation": "Создавай отдельный список с подходящими исходными значениями."
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
                "5",
                "-2",
                "-1",
                "0",
                "3",
                "2"
              ],
              "expectedOutput": "3 2",
              "description": "Вход: 5 / -2 / -1 / 0 / 3 / 2"
            },
            {
              "stdin": [
                "2",
                "0",
                "-3"
              ],
              "expectedOutput": "",
              "description": "Вход: 2 / 0 / -3"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nresult = []\nfor value in values:\n    if value > 0:\n        result.append(value)\nprint(*result)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*[value for value in values if value > 0])",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nfor value in values:\n    if value <= 0:\n        values.remove(value)\nprint(*values)",
              "why": "Удаление в обходе пропускает соседние неподходящие элементы."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*[value for value in values if value >= 0])",
              "why": "Ноль не положителен."
            }
          ],
          "hints": [
            "Создавай отдельный список с подходящими исходными значениями.",
            "Проверь этот риск: Удаление в обходе пропускает соседние неподходящие элементы.",
            "Ещё одна важная граница: Ноль не положителен."
          ],
          "solutionExplanation": [
            "Создавай отдельный список с подходящими исходными значениями.",
            "Удаление в обходе пропускает соседние неподходящие элементы.",
            "Ноль не положителен."
          ],
          "required": true
        },
        {
          "id": "sequences-filter-clamp",
          "kind": "code",
          "title": "Ограничить показания",
          "goal": "Ограничить показания",
          "prerequisites": [
            "sequences-filter"
          ],
          "prompt": "Считай n и n чисел. Каждое значение меньше 0 замени на 0, больше 100 — на 100, остальные сохрани. Выведи через пробел.",
          "inputFormat": "n, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. Каждый результат в пределах 0…100, число элементов сохраняется.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Сохрани число элементов, выбрав одну из трёх веток для каждого."
            },
            {
              "input": [
                "5",
                "-1",
                "0",
                "50",
                "100",
                "101"
              ],
              "output": "0 0 50 100 100",
              "explanation": "Сохрани число элементов, выбрав одну из трёх веток для каждого."
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
                "5",
                "-1",
                "0",
                "50",
                "100",
                "101"
              ],
              "expectedOutput": "0 0 50 100 100",
              "description": "Вход: 5 / -1 / 0 / 50 / 100 / 101"
            },
            {
              "stdin": [
                "1",
                "8"
              ],
              "expectedOutput": "8",
              "description": "Вход: 1 / 8"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nresult = []\nfor value in values:\n    if value < 0:\n        result.append(0)\n    elif value > 100:\n        result.append(100)\n    else:\n        result.append(value)\nprint(*result)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*[max(0, min(100, value)) for value in values])",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*[value for value in values if 0 <= value <= 100])",
              "why": "Удаляет крайние значения вместо замены."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*[abs(value) for value in values])",
              "why": "Модуль числа не ограничивает верхнюю границу."
            }
          ],
          "hints": [
            "Сохрани число элементов, выбрав одну из трёх веток для каждого.",
            "Проверь этот риск: Удаляет крайние значения вместо замены.",
            "Ещё одна важная граница: Модуль числа не ограничивает верхнюю границу."
          ],
          "solutionExplanation": [
            "Сохрани число элементов, выбрав одну из трёх веток для каждого.",
            "Удаляет крайние значения вместо замены.",
            "Модуль числа не ограничивает верхнюю границу."
          ],
          "required": true
        },
        {
          "id": "sequences-filter-adjacent-diffs",
          "kind": "code",
          "title": "Разности соседей",
          "goal": "Разности соседей",
          "prerequisites": [
            "sequences-filter"
          ],
          "prompt": "Считай n и n чисел. Выведи разности values[i] - values[i−1] для i от 1 до n−1 через пробел. При n < 2 вывод пустой.",
          "inputFormat": "n, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. Не больше 199 разностей; каждая по модулю до 2000000. Вывод меньше 2000 символов.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Результатов на один меньше, чем входных элементов."
            },
            {
              "input": [
                "1",
                "7"
              ],
              "output": "",
              "explanation": "Результатов на один меньше, чем входных элементов."
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
                "1",
                "7"
              ],
              "expectedOutput": "",
              "description": "Вход: 1 / 7"
            },
            {
              "stdin": [
                "4",
                "3",
                "8",
                "6",
                "6"
              ],
              "expectedOutput": "5 -2 0",
              "description": "Вход: 4 / 3 / 8 / 6 / 6"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nresult = []\nfor i in range(1, n):\n    result.append(values[i] - values[i - 1])\nprint(*result)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*[values[i + 1] - values[i] for i in range(n - 1)])",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*[values[i] - values[i - 1] for i in range(n)])",
              "why": "Создаёт лишнюю пару последнего и первого элементов."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*[values[i - 1] - values[i] for i in range(1, n)])",
              "why": "Меняет знак требуемой разности."
            }
          ],
          "hints": [
            "Результатов на один меньше, чем входных элементов.",
            "Проверь этот риск: Создаёт лишнюю пару последнего и первого элементов.",
            "Ещё одна важная граница: Меняет знак требуемой разности."
          ],
          "solutionExplanation": [
            "Результатов на один меньше, чем входных элементов.",
            "Создаёт лишнюю пару последнего и первого элементов.",
            "Меняет знак требуемой разности."
          ],
          "required": true
        },
        {
          "id": "sequences-filter-filter-transform",
          "kind": "predict",
          "title": "Что делает включение?",
          "goal": "Что делает включение?",
          "prerequisites": [
            "sequences-filter"
          ],
          "prompt": "Что выведет код?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Точный вывод программы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "values = [-1, 2, 0, 5]",
                "result = [value + 10 for value in values if value > 0]",
                "print(result)"
              ],
              "output": "[12, 15]",
              "explanation": "Разобранный пример по этой идее: Порядок и результат совпадают с развёрнутым циклом. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Фильтр оставляет исходные чётные 2 и 4, выражение удваивает их."
          ],
          "required": true,
          "answer": "[4, 8]",
          "initialCode": "print([x * 2 for x in [1, 2, 3, 4] if x % 2 == 0])"
        }
      ]
    },
    {
      "id": "sequences-sort",
      "title": "Сортировка и исходный порядок",
      "goal": "Различать sorted, sort и задачи выбора без сортировки.",
      "prerequisites": [
        "sequences-filter"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "sequences-sort-idea",
          "title": "Как это работает",
          "paragraphs": [
            "sorted(values) создаёт новый отсортированный список. values.sort() меняет существующий список на месте и возвращает None. Если исходный порядок нужен для отчёта, выбирай sorted или заранее копируй. Аргумент reverse=True задаёт убывание. Повторные элементы при сортировке сохраняются: сортировка не делает значения уникальными.",
            "Числовая и строковая сортировки различаются. Строки \"10\" и \"2\" сравниваются лексикографически, поэтому \"10\" стоит раньше \"2\". Если значения по смыслу числа, преобразуй их при чтении. Сортировка не знает, что текст должен обозначать число. Для сортировки слов по длине можно передать key=len: Python получает ключ каждого элемента и упорядочивает по нему. Создавать свою функцию пока не требуется."
          ],
          "examples": [
            {
              "id": "sequences-sort-example-1",
              "title": "Новый и прежний список",
              "code": "values = [3, 1, 3]\nordered = sorted(values)\nprint(values)\nprint(ordered)",
              "output": "[3, 1, 3]\n[1, 3, 3]",
              "explanation": "sorted не меняет исходный порядок и не удаляет повторную тройку."
            }
          ],
          "goal": "Различать sorted, sort и задачи выбора без сортировки.",
          "prerequisites": [
            "sequences-filter"
          ]
        },
        {
          "id": "sequences-sort-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Сортировка Python стабильна: элементы с равными ключами сохраняют исходный взаимный порядок. Это важно для списка слов одинаковой длины. Отдельно различай «второй элемент после сортировки» и «второе различное значение». Повторы минимального числа занимают несколько позиций; поиск второго различного требует пропустить их, а не просто взять индекс 1.",
            "Для одного максимума не обязательно сортировать весь список: достаточно min или max с проверкой пустоты. Сортировка нужна, если нужен весь упорядоченный вывод или несколько порядковых элементов. При тестировании используй обратный порядок, повторы, отрицательные числа и пустой список. Не объявляй сортировку проверенной одним уже упорядоченным примером: неверная программа «ничего не делать» тоже пройдёт его."
          ],
          "examples": [
            {
              "id": "sequences-sort-example-2",
              "title": "Стабильность по длине",
              "code": "words = [\"кот\", \"я\", \"дом\", \"мы\"]\nprint(sorted(words, key=len))",
              "output": "['я', 'мы', 'кот', 'дом']",
              "explanation": "Односимвольное слово первое, а «кот» остаётся перед «дом» при равной длине."
            },
            {
              "id": "sequences-sort-example-3",
              "title": "Изменение и возвращаемое значение",
              "code": "values = [3, 1]\nresult = values.sort()\nprint(result)\nprint(values)",
              "output": "None\n[1, 3]",
              "explanation": "Результат вызова None, а сам контейнер уже упорядочен. Присваивание values = values.sort() потеряло бы доступ к списку через прежнее имя. Для выражения, которое должно дать новый список, подходит sorted; для отдельной команды изменения — sort."
            }
          ],
          "goal": "Проверить применение: различать sorted, sort и задачи выбора без сортировки.",
          "prerequisites": [
            "sequences-sort-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sequences-sort-sort-two",
          "kind": "code",
          "title": "Возрастание и убывание",
          "goal": "Возрастание и убывание",
          "prerequisites": [
            "sequences-sort"
          ],
          "prompt": "Считай n и n чисел. Выведи их по возрастанию, затем по убыванию на двух строках через пробел.",
          "inputFormat": "n, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. Две строки вместе содержат не больше 400 числовых полей и меньше 4000 символов.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Отсортируй числовые значения и задай reverse для второго результата."
            },
            {
              "input": [
                "4",
                "3",
                "-1",
                "3",
                "2"
              ],
              "output": "-1 2 3 3\n3 3 2 -1",
              "explanation": "Отсортируй числовые значения и задай reverse для второго результата."
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
                "3",
                "-1",
                "3",
                "2"
              ],
              "expectedOutput": "-1 2 3 3\n3 3 2 -1",
              "description": "Вход: 4 / 3 / -1 / 3 / 2"
            },
            {
              "stdin": [
                "1",
                "7"
              ],
              "expectedOutput": "7\n7",
              "description": "Вход: 1 / 7"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*sorted(values))\nprint(*sorted(values, reverse=True))",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nvalues.sort()\nprint(*values)\nvalues.reverse()\nprint(*values)",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nvalues = values.sort()\nprint(*values)\nprint(*values)",
              "why": "sort возвращает None."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*values)\nprint(*values[::-1])",
              "why": "Разворот не является сортировкой для произвольного порядка."
            }
          ],
          "hints": [
            "Отсортируй числовые значения и задай reverse для второго результата.",
            "Проверь этот риск: sort возвращает None.",
            "Ещё одна важная граница: Разворот не является сортировкой для произвольного порядка."
          ],
          "solutionExplanation": [
            "Отсортируй числовые значения и задай reverse для второго результата.",
            "sort возвращает None.",
            "Разворот не является сортировкой для произвольного порядка."
          ],
          "required": true
        },
        {
          "id": "sequences-sort-second-distinct",
          "kind": "code",
          "title": "Второе различное значение",
          "goal": "Второе различное значение",
          "prerequisites": [
            "sequences-sort"
          ],
          "prompt": "Считай n и n чисел. Выведи второе по величине различное значение при движении от меньшего к большему; если различных меньше двух — «нет».",
          "inputFormat": "n, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. Выводится одно целое либо «нет», равные значения не занимают отдельные различающиеся уровни.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "нет",
              "explanation": "Пропусти все копии минимума и возьми первое отличающееся."
            },
            {
              "input": [
                "3",
                "1",
                "1",
                "3"
              ],
              "output": "3",
              "explanation": "Пропусти все копии минимума и возьми первое отличающееся."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0"
              ],
              "expectedOutput": "нет",
              "description": "Вход: 0"
            },
            {
              "stdin": [
                "3",
                "1",
                "1",
                "3"
              ],
              "expectedOutput": "3",
              "description": "Вход: 3 / 1 / 1 / 3"
            },
            {
              "stdin": [
                "3",
                "5",
                "5",
                "5"
              ],
              "expectedOutput": "нет",
              "description": "Вход: 3 / 5 / 5 / 5"
            },
            {
              "stdin": [
                "4",
                "8",
                "-2",
                "3",
                "-2"
              ],
              "expectedOutput": "3",
              "description": "Вход: 4 / 8 / -2 / 3 / -2"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nordered = sorted(values)\nanswer = None\nfor value in ordered:\n    if value != ordered[0]:\n        answer = value\n        break\nprint(answer if answer is not None else \"нет\")",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nif not values:\n    print(\"нет\")\nelse:\n    smallest = min(values)\n    candidates = [x for x in values if x > smallest]\n    print(min(candidates) if candidates else \"нет\")",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nordered = sorted(values)\nprint(ordered[1] if len(ordered) > 1 else \"нет\")",
              "why": "Вторая позиция может повторять минимум."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nordered = sorted(values, reverse=True)\nanswer = None\nfor value in ordered:\n    if value != ordered[0]:\n        answer = value\n        break\nprint(answer if answer is not None else \"нет\")",
              "why": "Ищет второе значение с противоположной стороны."
            }
          ],
          "hints": [
            "Пропусти все копии минимума и возьми первое отличающееся.",
            "Проверь этот риск: Вторая позиция может повторять минимум.",
            "Ещё одна важная граница: Ищет второе значение с противоположной стороны."
          ],
          "solutionExplanation": [
            "Пропусти все копии минимума и возьми первое отличающееся.",
            "Вторая позиция может повторять минимум.",
            "Ищет второе значение с противоположной стороны."
          ],
          "required": true
        },
        {
          "id": "sequences-sort-length-order",
          "kind": "gap",
          "title": "Слова по длине",
          "goal": "Использовать длину слова как ключ стабильной сортировки.",
          "prerequisites": [
            "sequences-sort"
          ],
          "prompt": "Заполни пропуск ____ ключом сортировки. Считай строку слов. Выведи слова по возрастанию длины, сохраняя исходный порядок равных длин.",
          "inputFormat": "Одна строка с пробельными разделителями.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "Длина входной строки 0…1000; не больше 100 слов, длина слова 1…80. Стабильная сортировка сохраняет суммарную длину слов.",
          "examples": [
            {
              "input": [
                "кот я дом мы"
              ],
              "output": "я мы кот дом",
              "explanation": "Используй длину как ключ стабильной сортировки."
            },
            {
              "input": [
                "bb a cc"
              ],
              "output": "a bb cc",
              "explanation": "Используй длину как ключ стабильной сортировки."
            }
          ],
          "initialCode": "words = input().split()\nprint(*sorted(words, key=____))",
          "tests": [
            {
              "stdin": [
                "кот я дом мы"
              ],
              "expectedOutput": "я мы кот дом",
              "description": "Вход: кот я дом мы"
            },
            {
              "stdin": [
                "bb a cc"
              ],
              "expectedOutput": "a bb cc",
              "description": "Вход: bb a cc"
            },
            {
              "stdin": [
                ""
              ],
              "expectedOutput": "",
              "description": "Вход: не нужен"
            }
          ],
          "reference": "words = input().split()\nprint(*sorted(words, key=len))",
          "alternative": "words = input().split()\nfor i in range(len(words)):\n    for j in range(len(words) - 1):\n        if len(words[j]) > len(words[j + 1]):\n            words[j], words[j + 1] = words[j + 1], words[j]\nprint(*words)",
          "wrongSolutions": [
            {
              "code": "words = input().split()\nprint(*sorted(words))",
              "why": "Обычная сортировка сравнивает буквы, а не длины."
            },
            {
              "code": "words = input().split()\nprint(*sorted(words, key=len, reverse=True))",
              "why": "reverse задаёт убывание, а нужно возрастание."
            }
          ],
          "hints": [
            "Используй длину как ключ стабильной сортировки.",
            "Проверь этот риск: Обычная сортировка сравнивает буквы, а не длины.",
            "Ещё одна важная граница: reverse задаёт убывание, а нужно возрастание."
          ],
          "solutionExplanation": [
            "Используй длину как ключ стабильной сортировки.",
            "Обычная сортировка сравнивает буквы, а не длины.",
            "reverse задаёт убывание, а нужно возрастание."
          ],
          "required": true
        },
        {
          "id": "sequences-sort-sort-result",
          "kind": "choice",
          "title": "Что возвращает sort?",
          "goal": "Что возвращает sort?",
          "prerequisites": [
            "sequences-sort"
          ],
          "prompt": "Выбери верные утверждения.",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "words = [\"кот\", \"я\", \"дом\", \"мы\"]",
                "print(sorted(words, key=len))"
              ],
              "output": "['я', 'мы', 'кот', 'дом']",
              "explanation": "Разобранный пример по этой идее: Односимвольное слово первое, а «кот» остаётся перед «дом» при равной длине. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Контейнер и возвращаемое значение — разные части поведения методов сортировки."
          ],
          "required": true,
          "answer": [
            "1",
            "3",
            "4"
          ],
          "choices": [
            {
              "id": "1",
              "text": "sort изменяет список."
            },
            {
              "id": "2",
              "text": "sorted всегда возвращает None."
            },
            {
              "id": "3",
              "text": "sort возвращает None."
            },
            {
              "id": "4",
              "text": "sorted сохраняет повторы."
            }
          ]
        }
      ]
    },
    {
      "id": "sequences-tuples",
      "title": "Кортежи и распаковка",
      "goal": "Использовать фиксированную запись и обмен значениями.",
      "prerequisites": [
        "sequences-sort"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "sequences-tuples-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Кортеж — упорядоченная неизменяемая последовательность. Запись (3, 5) хранит пару, а (3,) — одноэлементный кортеж: здесь важна запятая. Скобки без запятой (3) лишь группируют выражение. Индексы, срезы, len и перебор похожи на список, но присваивание по позиции запрещено. Это удобно для фиксированной записи, например координаты точки.",
            "Распаковка a, b = pair связывает два имени с двумя элементами. Количество целей должно соответствовать количеству значений, иначе возникнет ValueError. Запись x, y = y, x безопасно меняет значения местами: правая часть вычисляется до присваиваний слева. Не требуется временная перезапись x, которая могла бы потерять старое значение."
          ],
          "examples": [
            {
              "id": "sequences-tuples-example-1",
              "title": "Координаты",
              "code": "point = (3, 5)\nx, y = point\nprint(x + y)\nprint((3,))",
              "output": "8\n(3,)",
              "explanation": "Распаковка даёт осмысленные имена двум позициям."
            }
          ],
          "goal": "Использовать фиксированную запись и обмен значениями.",
          "prerequisites": [
            "sequences-sort"
          ]
        },
        {
          "id": "sequences-tuples-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Кортеж не означает глубокую заморозку вложенных объектов. Если его элемент — список, сам список остаётся изменяемым; нельзя только заменить позицию кортежа. В этом уроке используем числа и строки, поэтому фиксированность записи легко проследить. Преобразования list(pair) и tuple(values) создают контейнер соответствующего вида, не меняя исходный объект.",
            "Применяй кортеж к данным, чьи позиции имеют заранее известный смысл: (x, y), (name, score). Для большого числа однотипных измерений обычно удобнее список, который растёт. При чтении чужого кода сначала назови значение каждой позиции; если это невозможно, длинный кортеж может быть плохим форматом. Задачи проверяют не выбор любимых скобок, а согласованность порядка полей и корректную распаковку.",
            "При распаковке одна цель со звёздочкой принимает оставшиеся элементы как новый список: first, *middle, last = values. Здесь требуется хотя бы два элемента для first и last, а middle может быть пуст. Звёздочка не сортирует и не удаляет повторы: она сохраняет исходный порядок средней части. В одной левой части может быть только одна такая цель."
          ],
          "examples": [
            {
              "id": "sequences-tuples-example-2",
              "title": "Обмен без потери",
              "code": "left = 2\nright = 9\nleft, right = right, left\nprint(left, right)",
              "output": "9 2",
              "explanation": "Правая часть хранит прежние значения до изменения имён."
            },
            {
              "id": "sequences-tuples-example-3",
              "title": "Скобки и запятая",
              "code": "print(type((5)).__name__)\nprint(type((5,)).__name__)",
              "output": "int\ntuple",
              "explanation": "Первое выражение является числом с группирующими скобками. Второе — кортежем из одного элемента благодаря запятой. Проверка type помогает исследовать значение, но в обычной программе не заменяет понятного формата данных. Последовательность с одним элементом всё ещё можно распаковать только в одну цель."
            },
            {
              "id": "sequences-tuples-example-4",
              "title": "Оставшиеся элементы при распаковке",
              "code": "first, *middle, last = [10, 20, 30, 40]\nprint(first)\nprint(middle)\nprint(last)",
              "output": "10\n[20, 30]\n40",
              "explanation": "Крайние имена получили числа, middle — список двух оставшихся элементов."
            }
          ],
          "goal": "Проверить применение: использовать фиксированную запись и обмен значениями.",
          "prerequisites": [
            "sequences-tuples-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sequences-tuples-swap",
          "kind": "code",
          "title": "Обмен первого и последнего",
          "goal": "Обмен первого и последнего",
          "prerequisites": [
            "sequences-tuples"
          ],
          "prompt": "Считай n ≥ 1 и n чисел. Обменяй первый и последний элементы, сохрани остальные. Выведи через пробел.",
          "inputFormat": "n ≥ 1, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "1 ≤ n ≤ 200; элементы от −1000000 до 1000000. Меняются только крайние позиции; одна строка меньше 2000 символов.",
          "examples": [
            {
              "input": [
                "1",
                "7"
              ],
              "output": "7",
              "explanation": "Вычисли оба старых значения до присваивания новых."
            },
            {
              "input": [
                "2",
                "1",
                "2"
              ],
              "output": "2 1",
              "explanation": "Вычисли оба старых значения до присваивания новых."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "1",
                "7"
              ],
              "expectedOutput": "7",
              "description": "Вход: 1 / 7"
            },
            {
              "stdin": [
                "2",
                "1",
                "2"
              ],
              "expectedOutput": "2 1",
              "description": "Вход: 2 / 1 / 2"
            },
            {
              "stdin": [
                "4",
                "1",
                "2",
                "3",
                "4"
              ],
              "expectedOutput": "4 2 3 1",
              "description": "Вход: 4 / 1 / 2 / 3 / 4"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nvalues[0], values[-1] = values[-1], values[0]\nprint(*values)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nfirst = values[0]\nvalues[0] = values[-1]\nvalues[-1] = first\nprint(*values)",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nvalues[0] = values[-1]\nvalues[-1] = values[0]\nprint(*values)",
              "why": "Первое присваивание теряет прежний первый элемент."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*values[::-1])",
              "why": "Разворот меняет и внутренний порядок."
            }
          ],
          "hints": [
            "Вычисли оба старых значения до присваивания новых.",
            "Проверь этот риск: Первое присваивание теряет прежний первый элемент.",
            "Ещё одна важная граница: Разворот меняет и внутренний порядок."
          ],
          "solutionExplanation": [
            "Вычисли оба старых значения до присваивания новых.",
            "Первое присваивание теряет прежний первый элемент.",
            "Разворот меняет и внутренний порядок."
          ],
          "required": true
        },
        {
          "id": "sequences-tuples-point",
          "kind": "code",
          "title": "Квадрат расстояния точки",
          "goal": "Квадрат расстояния точки",
          "prerequisites": [
            "sequences-tuples"
          ],
          "prompt": "Считай x и y целыми. Сохрани координаты в кортеже, распакуй и выведи x²+y².",
          "inputFormat": "x и y по одному в строке.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "−1000000 ≤ x,y ≤ 1000000. Выводится одно целое x²+y², не больше 2000000000000.",
          "examples": [
            {
              "input": [
                "0",
                "0"
              ],
              "output": "0",
              "explanation": "Распакуй пару и вычисли квадрат каждой координаты отдельно."
            },
            {
              "input": [
                "3",
                "4"
              ],
              "output": "25",
              "explanation": "Распакуй пару и вычисли квадрат каждой координаты отдельно."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0",
                "0"
              ],
              "expectedOutput": "0",
              "description": "Вход: 0 / 0"
            },
            {
              "stdin": [
                "3",
                "4"
              ],
              "expectedOutput": "25",
              "description": "Вход: 3 / 4"
            },
            {
              "stdin": [
                "-2",
                "1"
              ],
              "expectedOutput": "5",
              "description": "Вход: -2 / 1"
            }
          ],
          "reference": "point = (int(input()), int(input()))\nx, y = point\nprint(x * x + y * y)",
          "alternative": "x = int(input())\ny = int(input())\nprint(sum((x ** 2, y ** 2)))",
          "wrongSolutions": [
            {
              "code": "x = int(input())\ny = int(input())\nprint(x + y)",
              "why": "Нужна сумма квадратов, а не сумма координат."
            },
            {
              "code": "x = int(input())\ny = int(input())\nprint((x + y) ** 2)",
              "why": "Квадрат суммы содержит дополнительное произведение."
            }
          ],
          "hints": [
            "Распакуй пару и вычисли квадрат каждой координаты отдельно.",
            "Проверь этот риск: Нужна сумма квадратов, а не сумма координат.",
            "Ещё одна важная граница: Квадрат суммы содержит дополнительное произведение."
          ],
          "solutionExplanation": [
            "Распакуй пару и вычисли квадрат каждой координаты отдельно.",
            "Нужна сумма квадратов, а не сумма координат.",
            "Квадрат суммы содержит дополнительное произведение."
          ],
          "required": true
        },
        {
          "id": "sequences-tuples-pairs",
          "kind": "code",
          "title": "Суммы пар",
          "goal": "Суммы пар",
          "prerequisites": [
            "sequences-tuples"
          ],
          "prompt": "Считай n, затем n строк вида a b. Для каждой пары выведи a+b на отдельной строке.",
          "inputFormat": "n; затем n строк с двумя целыми через пробел.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; по два целых от −1000000 до 1000000 в каждой строке. Не более 200 строк результата, сумма пары по модулю до 2000000.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Сначала раздели два поля и преобразуй каждое в int."
            },
            {
              "input": [
                "2",
                "2 3",
                "-1 4"
              ],
              "output": "5\n3",
              "explanation": "Сначала раздели два поля и преобразуй каждое в int."
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
                "2",
                "2 3",
                "-1 4"
              ],
              "expectedOutput": "5\n3",
              "description": "Вход: 2 / 2 3 / -1 4"
            },
            {
              "stdin": [
                "1",
                "0 0"
              ],
              "expectedOutput": "0",
              "description": "Вход: 1 / 0 0"
            }
          ],
          "reference": "n = int(input())\nfor i in range(n):\n    left, right = input().split()\n    pair = (int(left), int(right))\n    a, b = pair\n    print(a + b)",
          "alternative": "n = int(input())\nfor i in range(n):\n    fields = input().split()\n    print(int(fields[0]) + int(fields[1]))",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nfor i in range(n):\n    a, b = input().split()\n    print(a + b)",
              "why": "После split элементы остаются строками."
            },
            {
              "code": "n = int(input())\nfor i in range(n):\n    a, b = input().split()\n    print(int(a) - int(b))",
              "why": "Вычитание не соответствует сумме."
            }
          ],
          "hints": [
            "Сначала раздели два поля и преобразуй каждое в int.",
            "Проверь этот риск: После split элементы остаются строками.",
            "Ещё одна важная граница: Вычитание не соответствует сумме."
          ],
          "solutionExplanation": [
            "Сначала раздели два поля и преобразуй каждое в int.",
            "После split элементы остаются строками.",
            "Вычитание не соответствует сумме."
          ],
          "required": true
        },
        {
          "id": "sequences-tuples-singleton",
          "kind": "choice",
          "title": "Одноэлементный кортеж",
          "goal": "Одноэлементный кортеж",
          "prerequisites": [
            "sequences-tuples"
          ],
          "prompt": "Какие выражения создают кортеж из одного числа?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Выбери все подходящие ответы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "left = 2",
                "right = 9",
                "left, right = right, left",
                "print(left, right)"
              ],
              "output": "9 2",
              "explanation": "Разобранный пример по этой идее: Правая часть хранит прежние значения до изменения имён. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Кортеж задаётся запятой или конструктором, обычные скобки могут лишь группировать число."
          ],
          "required": true,
          "answer": [
            "2",
            "3"
          ],
          "choices": [
            {
              "id": "1",
              "text": "(5)"
            },
            {
              "id": "2",
              "text": "(5,)"
            },
            {
              "id": "3",
              "text": "tuple([5])"
            }
          ]
        }
      ]
    },
    {
      "id": "sequences-nested",
      "title": "Списки списков и независимость строк",
      "goal": "Читать таблицу двумя индексами и избегать общих строк.",
      "prerequisites": [
        "sequences-tuples"
      ],
      "role": "lesson",
      "estimatedMinutes": 22,
      "steps": [
        {
          "id": "sequences-nested-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Таблицу можно представить списком строк, где каждая строка — отдельный список. Тогда matrix[r][c] сначала выбирает строку r, затем элемент c внутри неё. Количество строк и столбцов различается: len(matrix) не равно длине каждой строки автоматически. В наших прямоугольных таблицах все строки имеют одинаковую объявленную длину.",
            "Создание [[0] * columns] * rows повторяет ссылку на одну внутреннюю строку. Изменение одной ячейки проявится сразу в нескольких строках. Для независимых строк создавай новый список на каждой внешней итерации или используй [[0] * columns for unused in range(rows)]. Внешний список содержит разные внутренние объекты. Это продолжение темы общих ссылок, а не особая странность таблиц."
          ],
          "examples": [
            {
              "id": "sequences-nested-example-1",
              "title": "Общие строки",
              "code": "matrix = [[0] * 2] * 2\nmatrix[0][1] = 7\nprint(matrix)",
              "output": "[[0, 7], [0, 7]]",
              "explanation": "Обе позиции внешнего списка ссылаются на одну строку."
            }
          ],
          "goal": "Читать таблицу двумя индексами и избегать общих строк.",
          "prerequisites": [
            "sequences-tuples"
          ]
        },
        {
          "id": "sequences-nested-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Поверхностная matrix.copy() копирует только внешний контейнер. Внутренние строки остаются общими. Для таблицы чисел независимая копия строк получается [row.copy() for row in matrix]. Для произвольных глубоко вложенных объектов потребовалось бы более общее копирование; в базовом модуле достаточно понимать границу текущего приёма.",
            "Вложенные циклы читают таблицу построчно. Для суммы столбца фиксируется его индекс, а меняется номер строки; для суммы строки наоборот. Главная диагональ квадратной таблицы выбирает позиции r == c. Проверяй разные размеры, например 2 × 3: квадратный пример может скрыть перепутанные границы. Вывод таблицы требует отдельного print для каждой строки; печать самого matrix создаёт представление вложенных списков, а не привычную таблицу."
          ],
          "examples": [
            {
              "id": "sequences-nested-example-2",
              "title": "Независимые строки",
              "code": "matrix = [[0] * 2 for unused in range(2)]\nmatrix[0][1] = 7\nprint(matrix)",
              "output": "[[0, 7], [0, 0]]",
              "explanation": "Для каждой внешней итерации создаётся новая строка."
            },
            {
              "id": "sequences-nested-example-3",
              "title": "Копирование внутренних строк",
              "code": "original = [[1, 2], [3, 4]]\ncopy = [row.copy() for row in original]\ncopy[0][0] = 9\nprint(original)\nprint(copy)",
              "output": "[[1, 2], [3, 4]]\n[[9, 2], [3, 4]]",
              "explanation": "Новый внешний список содержит новые копии каждой строки, поэтому изменение ячейки не затрагивает исходную таблицу чисел. Если внутри строк были бы ещё списки, этого уровня копирования было бы недостаточно. Всегда называй глубину структуры, для которой обещана независимость."
            }
          ],
          "goal": "Проверить применение: читать таблицу двумя индексами и избегать общих строк.",
          "prerequisites": [
            "sequences-nested-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sequences-nested-matrix-change",
          "kind": "code",
          "title": "Изменить ровно одну ячейку",
          "goal": "Изменить ровно одну ячейку",
          "prerequisites": [
            "sequences-nested"
          ],
          "prompt": "Считай h, w, r, c, x. Создай h×w нулей, запиши x только в ячейку [r][c] и выведи строки таблицы через пробел.",
          "inputFormat": "Пять целых строк; корректные нулевые индексы.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "1 ≤ h,w ≤ 30; h×w ≤ 900; 0 ≤ r < h, 0 ≤ c < w; x от −1000000 до 1000000. Кроме одной ячейки все значения нули; вывод меньше 2000 символов.",
          "examples": [
            {
              "input": [
                "2",
                "3",
                "0",
                "1",
                "7"
              ],
              "output": "0 7 0\n0 0 0",
              "explanation": "Создавай независимую внутреннюю строку для каждой внешней позиции."
            },
            {
              "input": [
                "1",
                "1",
                "0",
                "0",
                "5"
              ],
              "output": "5",
              "explanation": "Создавай независимую внутреннюю строку для каждой внешней позиции."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "2",
                "3",
                "0",
                "1",
                "7"
              ],
              "expectedOutput": "0 7 0\n0 0 0",
              "description": "Вход: 2 / 3 / 0 / 1 / 7"
            },
            {
              "stdin": [
                "1",
                "1",
                "0",
                "0",
                "5"
              ],
              "expectedOutput": "5",
              "description": "Вход: 1 / 1 / 0 / 0 / 5"
            },
            {
              "stdin": [
                "3",
                "1",
                "2",
                "0",
                "9"
              ],
              "expectedOutput": "0\n0\n9",
              "description": "Вход: 3 / 1 / 2 / 0 / 9"
            }
          ],
          "reference": "h = int(input())\nw = int(input())\nr = int(input())\nc = int(input())\nx = int(input())\nmatrix = [[0] * w for i in range(h)]\nmatrix[r][c] = x\nfor row in matrix:\n    print(*row)",
          "alternative": "h = int(input())\nw = int(input())\nr = int(input())\nc = int(input())\nx = int(input())\nfor i in range(h):\n    row = []\n    for j in range(w):\n        row.append(x if i == r and j == c else 0)\n    print(*row)",
          "wrongSolutions": [
            {
              "code": "h = int(input())\nw = int(input())\nr = int(input())\nc = int(input())\nx = int(input())\nmatrix = [[0] * w] * h\nmatrix[r][c] = x\nfor row in matrix:\n    print(*row)",
              "why": "Повторяет одну общую строку."
            },
            {
              "code": "h = int(input())\nw = int(input())\nr = int(input())\nc = int(input())\nx = int(input())\nmatrix = [[0] * w for i in range(h)]\nmatrix[c][r] = x\nfor row in matrix:\n    print(*row)",
              "why": "Переставляет координаты строки и столбца."
            }
          ],
          "hints": [
            "Создавай независимую внутреннюю строку для каждой внешней позиции.",
            "Проверь этот риск: Повторяет одну общую строку.",
            "Ещё одна важная граница: Переставляет координаты строки и столбца."
          ],
          "solutionExplanation": [
            "Создавай независимую внутреннюю строку для каждой внешней позиции.",
            "Повторяет одну общую строку.",
            "Переставляет координаты строки и столбца."
          ],
          "required": true
        },
        {
          "id": "sequences-nested-row-sums",
          "kind": "code",
          "title": "Суммы строк таблицы",
          "goal": "Суммы строк таблицы",
          "prerequisites": [
            "sequences-nested"
          ],
          "prompt": "Считай h, w и h*w чисел построчно. Выведи суммы строк через пробел.",
          "inputFormat": "h и w; затем элементы, каждый отдельной строкой.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "1 ≤ h,w ≤ 30; h×w ≤ 900; элементы от −1000000 до 1000000. До 30 сумм, каждая по модулю до 30000000.",
          "examples": [
            {
              "input": [
                "2",
                "3",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6"
              ],
              "output": "6 15",
              "explanation": "Одна внешняя итерация должна выдавать один итог строки."
            },
            {
              "input": [
                "1",
                "1",
                "-4"
              ],
              "output": "-4",
              "explanation": "Одна внешняя итерация должна выдавать один итог строки."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "2",
                "3",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6"
              ],
              "expectedOutput": "6 15",
              "description": "Вход: 2 / 3 / 1 / 2 / 3 / 4 / 5 / 6"
            },
            {
              "stdin": [
                "1",
                "1",
                "-4"
              ],
              "expectedOutput": "-4",
              "description": "Вход: 1 / 1 / -4"
            },
            {
              "stdin": [
                "3",
                "1",
                "2",
                "0",
                "5"
              ],
              "expectedOutput": "2 0 5",
              "description": "Вход: 3 / 1 / 2 / 0 / 5"
            }
          ],
          "reference": "h = int(input())\nw = int(input())\nmatrix = []\nfor r in range(h):\n    row = []\n    for c in range(w):\n        row.append(int(input()))\n    matrix.append(row)\nprint(*[sum(row) for row in matrix])",
          "alternative": "h = int(input())\nw = int(input())\nresult = []\nfor r in range(h):\n    total = 0\n    for c in range(w):\n        total += int(input())\n    result.append(total)\nprint(*result)",
          "wrongSolutions": [
            {
              "code": "h = int(input())\nw = int(input())\nmatrix = []\nfor r in range(h):\n    row = []\n    for c in range(w):\n        row.append(int(input()))\n    matrix.append(row)\nprint(sum(sum(row) for row in matrix))",
              "why": "Даёт общую сумму, теряя разбиение строк."
            },
            {
              "code": "h = int(input())\nw = int(input())\nmatrix = []\nfor r in range(h):\n    row = []\n    for c in range(w):\n        row.append(int(input()))\n    matrix.append(row)\nprint(*[sum(matrix[r][c] for r in range(h)) for c in range(w)])",
              "why": "Считает суммы столбцов."
            }
          ],
          "hints": [
            "Одна внешняя итерация должна выдавать один итог строки.",
            "Проверь этот риск: Даёт общую сумму, теряя разбиение строк.",
            "Ещё одна важная граница: Считает суммы столбцов."
          ],
          "solutionExplanation": [
            "Одна внешняя итерация должна выдавать один итог строки.",
            "Даёт общую сумму, теряя разбиение строк.",
            "Считает суммы столбцов."
          ],
          "required": true
        },
        {
          "id": "sequences-nested-transpose",
          "kind": "code",
          "title": "Транспонировать таблицу",
          "goal": "Транспонировать таблицу",
          "prerequisites": [
            "sequences-nested"
          ],
          "prompt": "Считай h, w и h*w чисел построчно. Выведи транспонированную таблицу: её строка c содержит исходный столбец c.",
          "inputFormat": "h, w, затем h*w целых отдельных строк.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "1 ≤ h,w ≤ 30; h×w ≤ 900; элементы от −1000000 до 1000000. Вывод до 900 чисел в w строках, меньше 9000 символов.",
          "examples": [
            {
              "input": [
                "2",
                "3",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6"
              ],
              "output": "1 4\n2 5\n3 6",
              "explanation": "Внешний цикл идёт по исходным столбцам, внутренний по строкам."
            },
            {
              "input": [
                "1",
                "2",
                "7",
                "8"
              ],
              "output": "7\n8",
              "explanation": "Внешний цикл идёт по исходным столбцам, внутренний по строкам."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "2",
                "3",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6"
              ],
              "expectedOutput": "1 4\n2 5\n3 6",
              "description": "Вход: 2 / 3 / 1 / 2 / 3 / 4 / 5 / 6"
            },
            {
              "stdin": [
                "1",
                "2",
                "7",
                "8"
              ],
              "expectedOutput": "7\n8",
              "description": "Вход: 1 / 2 / 7 / 8"
            },
            {
              "stdin": [
                "2",
                "1",
                "3",
                "4"
              ],
              "expectedOutput": "3 4",
              "description": "Вход: 2 / 1 / 3 / 4"
            }
          ],
          "reference": "h = int(input())\nw = int(input())\nmatrix = []\nfor r in range(h):\n    row = []\n    for c in range(w):\n        row.append(int(input()))\n    matrix.append(row)\nfor c in range(w):\n    print(*[matrix[r][c] for r in range(h)])",
          "alternative": "h = int(input())\nw = int(input())\nmatrix = []\nfor r in range(h):\n    row = []\n    for c in range(w):\n        row.append(int(input()))\n    matrix.append(row)\nfor c in range(w):\n    row = []\n    for r in range(h):\n        row.append(matrix[r][c])\n    print(*row)",
          "wrongSolutions": [
            {
              "code": "h = int(input())\nw = int(input())\nmatrix = []\nfor r in range(h):\n    row = []\n    for c in range(w):\n        row.append(int(input()))\n    matrix.append(row)\nfor row in matrix:\n    print(*row)",
              "why": "Печатает исходную таблицу."
            },
            {
              "code": "h = int(input())\nw = int(input())\nmatrix = []\nfor r in range(h):\n    row = []\n    for c in range(w):\n        row.append(int(input()))\n    matrix.append(row)\nfor r in range(h):\n    print(*[matrix[c][r] for c in range(w)])",
              "why": "Перепутал границы размеров и ломается на прямоугольной таблице."
            }
          ],
          "hints": [
            "Внешний цикл идёт по исходным столбцам, внутренний по строкам.",
            "Проверь этот риск: Печатает исходную таблицу.",
            "Ещё одна важная граница: Перепутал границы размеров и ломается на прямоугольной таблице."
          ],
          "solutionExplanation": [
            "Внешний цикл идёт по исходным столбцам, внутренний по строкам.",
            "Печатает исходную таблицу.",
            "Перепутал границы размеров и ломается на прямоугольной таблице."
          ],
          "required": true
        },
        {
          "id": "sequences-nested-shallow",
          "kind": "predict",
          "title": "Граница поверхностной копии",
          "goal": "Граница поверхностной копии",
          "prerequisites": [
            "sequences-nested"
          ],
          "prompt": "Что выведет код?",
          "inputFormat": "Ввод программы не требуется.",
          "outputFormat": "Точный вывод программы.",
          "constraints": "Оценивай Python 3.12 и только показанный код.",
          "examples": [
            {
              "input": [
                "matrix = [[0] * 2 for unused in range(2)]",
                "matrix[0][1] = 7",
                "print(matrix)"
              ],
              "output": "[[0, 7], [0, 0]]",
              "explanation": "Разобранный пример по этой идее: Для каждой внешней итерации создаётся новая строка. Вопрос выше относится к другому фрагменту или утверждениям."
            }
          ],
          "hints": [
            "Проследи выполнение по одной строке.",
            "Раздели начальное состояние и изменения во время выполнения.",
            "Проверь пограничное значение и сверь результат с условием."
          ],
          "solutionExplanation": [
            "Скопирован внешний список, но первая внутренняя строка общая."
          ],
          "required": true,
          "answer": "[[9], [2]]",
          "initialCode": "a = [[1], [2]]\nb = a.copy()\nb[0][0] = 9\nprint(a)"
        }
      ]
    },
    {
      "id": "sequences-review",
      "title": "Повторение: текст превращается в список",
      "goal": "Переносить строковые приёмы на обработку последовательностей.",
      "prerequisites": [
        "sequences-nested"
      ],
      "role": "review",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "sequences-review-idea",
          "title": "Как это работает",
          "paragraphs": [
            "До этого модуля split использовался как готовое разделение текста. Теперь его результат понятен: это список строк. Каждое слово можно прочитать по индексу, отфильтровать по длине и сохранить в новом порядке. Но преобразование строки в список не делает элементы числами автоматически. Для числовой обработки каждое поле преобразуется отдельно.",
            "В смешанных задачах следи за тем, что означает позиция после фильтрации. Индекс элемента в новом списке может отличаться от исходного. Если нужен исходный номер, сохраняй его во время исходного перебора. Сортировка также меняет позиции, поэтому искать старый номер в отсортированном списке нельзя без дополнительной информации."
          ],
          "examples": [
            {
              "id": "sequences-review-example-1",
              "title": "Поля остаются строками",
              "code": "fields = \"10 2\".split()\nprint(sorted(fields))\nprint(sorted([int(field) for field in fields]))",
              "output": "['10', '2']\n[2, 10]",
              "explanation": "Преобразование меняет правило сравнения с текстового на числовое."
            }
          ],
          "goal": "Переносить строковые приёмы на обработку последовательностей.",
          "prerequisites": [
            "sequences-nested"
          ]
        },
        {
          "id": "sequences-review-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Перед решением выпиши два формата: входную строку и итоговую последовательность. Укажи, сохраняются ли повторы и исходный порядок. Не используй множество для удаления повторов до его изучения: текущий модуль позволяет проверить вхождение в список и сохранить порядок первого появления понятным циклом.",
            "Для отладки возьми список с повтором на разных позициях и сравни ожидаемый результат по одному элементу. Пустой список не должен приводить к обращению values[0]. Если задача просит список без скобок, проверяй способ печати отдельно от алгоритма обработки. Это помогает отличить ошибку вычисления от ошибки представления."
          ],
          "examples": [
            {
              "id": "sequences-review-example-2",
              "title": "Сохранить первое появление",
              "code": "result = []\nfor word in \"кот дом кот\".split():\n    if word not in result:\n        result.append(word)\nprint(*result)",
              "output": "кот дом",
              "explanation": "Проверка вхождения сохраняет порядок первых появлений."
            }
          ],
          "goal": "Проверить применение: переносить строковые приёмы на обработку последовательностей.",
          "prerequisites": [
            "sequences-review-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sequences-review-unique-order",
          "kind": "code",
          "title": "Уникальные слова в исходном порядке",
          "goal": "Уникальные слова в исходном порядке",
          "prerequisites": [
            "sequences-review"
          ],
          "prompt": "Считай строку слов. Выведи каждое точное слово один раз в порядке первого появления. Регистр значим.",
          "inputFormat": "Одна строка.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "Длина строки 0…1000; до 100 слов по 1…80 символов, общий размер до 1000. Регистр значим, итог не длиннее исходной строки.",
          "examples": [
            {
              "input": [
                "кот дом кот сад дом"
              ],
              "output": "кот дом сад",
              "explanation": "Добавляй слово, только если в результате его ещё нет."
            },
            {
              "input": [
                "A a A"
              ],
              "output": "A a",
              "explanation": "Добавляй слово, только если в результате его ещё нет."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "кот дом кот сад дом"
              ],
              "expectedOutput": "кот дом сад",
              "description": "Вход: кот дом кот сад дом"
            },
            {
              "stdin": [
                "A a A"
              ],
              "expectedOutput": "A a",
              "description": "Вход: A a A"
            },
            {
              "stdin": [
                ""
              ],
              "expectedOutput": "",
              "description": "Вход: не нужен"
            }
          ],
          "reference": "words = input().split()\nresult = []\nfor word in words:\n    if word not in result:\n        result.append(word)\nprint(*result)",
          "alternative": "words = input().split()\nresult = []\nfor i in range(len(words)):\n    if words[i] not in words[:i]:\n        result.append(words[i])\nprint(*result)",
          "wrongSolutions": [
            {
              "code": "words = input().split()\nprint(*sorted(words))",
              "why": "Сортирует и сохраняет повторы вместо отбора первых появлений."
            },
            {
              "code": "words = input().split()\nresult = []\nfor word in words:\n    if word.lower() not in result:\n        result.append(word.lower())\nprint(*result)",
              "why": "Объединяет разные по регистру слова."
            }
          ],
          "hints": [
            "Добавляй слово, только если в результате его ещё нет.",
            "Проверь этот риск: Сортирует и сохраняет повторы вместо отбора первых появлений.",
            "Ещё одна важная граница: Объединяет разные по регистру слова."
          ],
          "solutionExplanation": [
            "Добавляй слово, только если в результате его ещё нет.",
            "Сортирует и сохраняет повторы вместо отбора первых появлений.",
            "Объединяет разные по регистру слова."
          ],
          "required": true
        },
        {
          "id": "sequences-review-numeric-sort",
          "kind": "code",
          "title": "Числа из одной строки",
          "goal": "Числа из одной строки",
          "prerequisites": [
            "sequences-review"
          ],
          "prompt": "Считай строку целых, разделённых пробелами. Выведи числовую сортировку по возрастанию через пробел. Пустая строка допустима.",
          "inputFormat": "Одна строка целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "Строка содержит 0…200 целых от −1000000 до 1000000; общая длина строки до 2000. Ведущие нули при выводе не сохраняются.",
          "examples": [
            {
              "input": [
                "10 2 -1"
              ],
              "output": "-1 2 10",
              "explanation": "Преобразуй каждое поле до сортировки."
            },
            {
              "input": [
                ""
              ],
              "output": "",
              "explanation": "Преобразуй каждое поле до сортировки."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "10 2 -1"
              ],
              "expectedOutput": "-1 2 10",
              "description": "Вход: 10 2 -1"
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
                "0 -2 0"
              ],
              "expectedOutput": "-2 0 0",
              "description": "Вход: 0 -2 0"
            }
          ],
          "reference": "fields = input().split()\nvalues = [int(field) for field in fields]\nprint(*sorted(values))",
          "alternative": "values = []\nfor field in input().split():\n    values.append(int(field))\nvalues.sort()\nprint(*values)",
          "wrongSolutions": [
            {
              "code": "fields = input().split()\nprint(*sorted(fields))",
              "why": "Сортирует текстовые записи вместо чисел."
            },
            {
              "code": "values = [int(field) for field in input().split()]\nprint(*sorted(values, reverse=True))",
              "why": "Сортирует в противоположном направлении."
            }
          ],
          "hints": [
            "Преобразуй каждое поле до сортировки.",
            "Проверь этот риск: Сортирует текстовые записи вместо чисел.",
            "Ещё одна важная граница: Сортирует в противоположном направлении."
          ],
          "solutionExplanation": [
            "Преобразуй каждое поле до сортировки.",
            "Сортирует текстовые записи вместо чисел.",
            "Сортирует в противоположном направлении."
          ],
          "required": true
        }
      ]
    },
    {
      "id": "sequences-assessment",
      "title": "Контрольная: последовательности без подсказки",
      "goal": "Самостоятельно сочетать поиск, копирование и обработку соседей.",
      "prerequisites": [
        "sequences-review"
      ],
      "role": "assessment",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "sequences-assessment-idea",
          "title": "Как это работает",
          "paragraphs": [
            "Контрольная использует уже изученные операции, но меняет их сочетание. Задачи требуют сохранять порядок, различать старое и новое состояние и выбирать нужную часть списка. Они не проверяются только на примере из объяснения: есть пустые данные, равные значения и короткие списки.",
            "Для удаления одного минимального элемента сначала найди его позицию в исходном списке. Удалять все равные элементы нельзя, поскольку контракт говорит только о первом. Для сдвига на несколько позиций полезно привести сдвиг по модулю длины, но на пустом списке делить по модулю нуля нельзя: этот случай отделяется заранее."
          ],
          "examples": [
            {
              "id": "sequences-assessment-example-1",
              "title": "Один элемент, а не все равные",
              "code": "values = [3, 1, 1, 4]\nindex = values.index(min(values))\nvalues.pop(index)\nprint(values)",
              "output": "[3, 1, 4]",
              "explanation": "Удаляется только первое минимальное вхождение."
            }
          ],
          "goal": "Самостоятельно сочетать поиск, копирование и обработку соседей.",
          "prerequisites": [
            "sequences-review"
          ]
        },
        {
          "id": "sequences-assessment-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "В задаче на локальные вершины сравниваются соседи с обеих сторон. Крайние элементы не имеют двух соседей и не участвуют. Строгость сравнения исключает плоские участки. Запись условия должна буквально отражать требование, а не проверять только один соседний элемент.",
            "После верного решения объясни, сколько элементов может появиться в результате и почему исходные значения сохранены или изменены. Если ответ трудно получить без чтения эталона, вернись к урокам копирования и поиска. Контрольная считается самостоятельной только без открытия готового решения; возможность повторить её остаётся доступной."
          ],
          "examples": [
            {
              "id": "sequences-assessment-example-2",
              "title": "Два соседа",
              "code": "values = [1, 5, 2]\ni = 1\nprint(values[i] > values[i - 1] and values[i] > values[i + 1])",
              "output": "True",
              "explanation": "Позиция 1 выше обоих соседей, поэтому является локальной вершиной."
            }
          ],
          "goal": "Проверить применение: самостоятельно сочетать поиск, копирование и обработку соседей.",
          "prerequisites": [
            "sequences-assessment-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sequences-assessment-remove-one",
          "kind": "code",
          "title": "Удалить первый минимум",
          "goal": "Удалить первый минимум",
          "prerequisites": [
            "sequences-assessment"
          ],
          "prompt": "Считай n и n целых. Если список непуст, удали только первое вхождение минимального значения. Выведи оставшиеся через пробел.",
          "inputFormat": "n, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. Удаляется не больше одной позиции; вывод до 200 полей.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Найди первое вхождение минимального значения и удали его по позиции."
            },
            {
              "input": [
                "1",
                "7"
              ],
              "output": "",
              "explanation": "Найди первое вхождение минимального значения и удали его по позиции."
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
                "1",
                "7"
              ],
              "expectedOutput": "",
              "description": "Вход: 1 / 7"
            },
            {
              "stdin": [
                "4",
                "3",
                "1",
                "1",
                "4"
              ],
              "expectedOutput": "3 1 4",
              "description": "Вход: 4 / 3 / 1 / 1 / 4"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nif values:\n    values.pop(values.index(min(values)))\nprint(*values)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nif values:\n    smallest = min(values)\n    removed = False\n    result = []\n    for x in values:\n        if x == smallest and not removed:\n            removed = True\n        else:\n            result.append(x)\n    values = result\nprint(*values)",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nif values:\n    smallest = min(values)\n    values = [x for x in values if x != smallest]\nprint(*values)",
              "why": "Удаляет все минимальные вхождения вместо одного."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nif values:\n    values.pop()\nprint(*values)",
              "why": "Удаляет последний элемент независимо от минимума."
            }
          ],
          "hints": [
            "Найди первое вхождение минимального значения и удали его по позиции.",
            "Проверь этот риск: Удаляет все минимальные вхождения вместо одного.",
            "Ещё одна важная граница: Удаляет последний элемент независимо от минимума."
          ],
          "solutionExplanation": [
            "Найди первое вхождение минимального значения и удали его по позиции.",
            "Удаляет все минимальные вхождения вместо одного.",
            "Удаляет последний элемент независимо от минимума."
          ],
          "required": true
        },
        {
          "id": "sequences-assessment-rotate",
          "kind": "code",
          "title": "Циклический сдвиг вправо",
          "goal": "Циклический сдвиг вправо",
          "prerequisites": [
            "sequences-assessment"
          ],
          "prompt": "Считай n, n целых и неотрицательное k. Циклически сдвинь список вправо на k позиций; для пустого списка результат пуст.",
          "inputFormat": "n; n целых; k.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. 0 ≤ k ≤ 1000000000. Нужен сдвиг по k%n, а не миллиард повторов; при n=0 операция по модулю не выполняется.",
          "examples": [
            {
              "input": [
                "0",
                "5"
              ],
              "output": "",
              "explanation": "Отдели пустой список и приведи k по модулю его длины."
            },
            {
              "input": [
                "3",
                "1",
                "2",
                "3",
                "1"
              ],
              "output": "3 1 2",
              "explanation": "Отдели пустой список и приведи k по модулю его длины."
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
                "1",
                "2",
                "3",
                "1"
              ],
              "expectedOutput": "3 1 2",
              "description": "Вход: 3 / 1 / 2 / 3 / 1"
            },
            {
              "stdin": [
                "3",
                "1",
                "2",
                "3",
                "4"
              ],
              "expectedOutput": "3 1 2",
              "description": "Вход: 3 / 1 / 2 / 3 / 4"
            },
            {
              "stdin": [
                "2",
                "5",
                "6",
                "0"
              ],
              "expectedOutput": "5 6",
              "description": "Вход: 2 / 5 / 6 / 0"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nk = int(input())\nif values:\n    k %= n\n    values = values[-k:] + values[:-k] if k else values\nprint(*values)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nk = int(input())\nif values:\n    for i in range(k % n):\n        values.insert(0, values.pop())\nprint(*values)",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nk = int(input())\nk %= n\nvalues = values[-k:] + values[:-k]\nprint(*values)",
              "why": "Деление по модулю нуля ломает пустой случай."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nk = int(input())\nif values:\n    k %= n\n    values = values[k:] + values[:k]\nprint(*values)",
              "why": "Сдвигает влево вместо вправо."
            }
          ],
          "hints": [
            "Отдели пустой список и приведи k по модулю его длины.",
            "Проверь этот риск: Деление по модулю нуля ломает пустой случай.",
            "Ещё одна важная граница: Сдвигает влево вместо вправо."
          ],
          "solutionExplanation": [
            "Отдели пустой список и приведи k по модулю его длины.",
            "Деление по модулю нуля ломает пустой случай.",
            "Сдвигает влево вместо вправо."
          ],
          "required": true
        },
        {
          "id": "sequences-assessment-peaks",
          "kind": "code",
          "title": "Индексы локальных вершин",
          "goal": "Индексы локальных вершин",
          "prerequisites": [
            "sequences-assessment"
          ],
          "prompt": "Считай n и n чисел. Выведи индексы внутренних элементов, строго больших обоих соседей. Края не участвуют.",
          "inputFormat": "n, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. Крайние элементы не участвуют; ответ содержит не больше 198 индексов.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Перебирай только внутренние индексы и используй два строгих сравнения."
            },
            {
              "input": [
                "2",
                "1",
                "5"
              ],
              "output": "",
              "explanation": "Перебирай только внутренние индексы и используй два строгих сравнения."
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
                "2",
                "1",
                "5"
              ],
              "expectedOutput": "",
              "description": "Вход: 2 / 1 / 5"
            },
            {
              "stdin": [
                "5",
                "1",
                "4",
                "2",
                "5",
                "3"
              ],
              "expectedOutput": "1 3",
              "description": "Вход: 5 / 1 / 4 / 2 / 5 / 3"
            },
            {
              "stdin": [
                "3",
                "1",
                "2",
                "2"
              ],
              "expectedOutput": "",
              "description": "Вход: 3 / 1 / 2 / 2"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nindices = []\nfor i in range(1, n - 1):\n    if values[i] > values[i - 1] and values[i] > values[i + 1]:\n        indices.append(i)\nprint(*indices)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*[i for i in range(1, n - 1) if values[i - 1] < values[i] > values[i + 1]])",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*[i for i in range(1, n - 1) if values[i] >= values[i - 1] and values[i] >= values[i + 1]])",
              "why": "Плоские участки не являются строгими вершинами."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*[i for i in range(1, n - 1) if values[i] > values[i - 1]])",
              "why": "Проверяет только левого соседа."
            }
          ],
          "hints": [
            "Перебирай только внутренние индексы и используй два строгих сравнения.",
            "Проверь этот риск: Плоские участки не являются строгими вершинами.",
            "Ещё одна важная граница: Проверяет только левого соседа."
          ],
          "solutionExplanation": [
            "Перебирай только внутренние индексы и используй два строгих сравнения.",
            "Плоские участки не являются строгими вершинами.",
            "Проверяет только левого соседа."
          ],
          "required": true
        }
      ]
    },
    {
      "id": "sequences-measurements-project",
      "title": "Мини-проект: отчёт по измерениям",
      "goal": "Выделять данные, сохранять оригинал и сравнивать исправленную серию.",
      "prerequisites": [
        "sequences-assessment"
      ],
      "role": "project",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "sequences-measurements-project-idea",
          "title": "Как это работает",
          "paragraphs": [
            "В проекте список используется по назначению: измерения нужны повторно, в исходном и обработанном виде. Отчёт показывает, какие данные были исправлены, а какие попали в допустимый диапазон. Числа читаются из заранее заданного количества строк; здесь нет работы с файлами или внешними устройствами.",
            "Сначала строится накопленная сумма — последовательность итогов после каждой записи. Затем определяется размах: максимальное значение минус минимальное. Наконец, программа корректирует выбросы и сопоставляет исходный и новый список. Это разные характеристики: одинаковая общая сумма не означает одинаковые измерения, а сортировка не сохраняет временной порядок."
          ],
          "examples": [
            {
              "id": "sequences-measurements-project-example-1",
              "title": "Промежуточные итоги",
              "code": "total = 0\nresult = []\nfor x in [3, -1, 4]:\n    total += x\n    result.append(total)\nprint(result)",
              "output": "[3, 2, 6]",
              "explanation": "Каждая позиция результата относится к префиксу исходных данных."
            }
          ],
          "goal": "Выделять данные, сохранять оригинал и сравнивать исправленную серию.",
          "prerequisites": [
            "sequences-assessment"
          ]
        },
        {
          "id": "sequences-measurements-project-apply",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Пустой набор требует явного соглашения. Для размаха в этом проекте выводится «нет данных», для списка накопленных сумм — пустая строка. Не выдумывай нулевое измерение, чтобы избежать ошибки min. В задаче коррекции границы включены: значение, равное порогу, уже допустимо и не считается исправленным.",
            "Перед отправкой проверь список, в котором рядом стоят два выброса. Если использовано удаление при переборе, такой пример часто обнаруживает пропуск. Сохранённый оригинал позволяет показать ошибку копирования: если обе строки отчёта одинаково изменились, нужно пересмотреть ссылки. После проекта попробуй объяснить, почему хранение списка здесь полезно, а в простом суммировании потока было необязательно."
          ],
          "examples": [
            {
              "id": "sequences-measurements-project-example-2",
              "title": "Размах",
              "code": "values = [8, 3, 10]\nprint(max(values) - min(values))",
              "output": "7",
              "explanation": "Размах зависит от крайних значений, а не от их позиций."
            }
          ],
          "goal": "Проверить применение: выделять данные, сохранять оригинал и сравнивать исправленную серию.",
          "prerequisites": [
            "sequences-measurements-project-idea"
          ]
        }
      ],
      "exercises": [
        {
          "id": "sequences-measurements-project-prefix",
          "kind": "code",
          "title": "Накопленные итоги",
          "goal": "Накопленные итоги",
          "prerequisites": [
            "sequences-measurements-project"
          ],
          "prompt": "Считай n и n чисел. Выведи список сумм префиксов через пробел: i-й результат равен сумме первых i+1 чисел.",
          "inputFormat": "n, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. Каждая накопленная сумма по модулю до 200000000; до 200 результатов, меньше 2300 символов.",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "",
              "explanation": "Обновляй сумму перед добавлением её в результат."
            },
            {
              "input": [
                "3",
                "3",
                "-1",
                "4"
              ],
              "output": "3 2 6",
              "explanation": "Обновляй сумму перед добавлением её в результат."
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
                "3",
                "-1",
                "4"
              ],
              "expectedOutput": "3 2 6",
              "description": "Вход: 3 / 3 / -1 / 4"
            },
            {
              "stdin": [
                "1",
                "5"
              ],
              "expectedOutput": "5",
              "description": "Вход: 1 / 5"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\ntotal = 0\nresult = []\nfor x in values:\n    total += x\n    result.append(total)\nprint(*result)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*[sum(values[:i + 1]) for i in range(n)])",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(sum(values))",
              "why": "Одна итоговая сумма не показывает промежуточные результаты."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(*[sum(values[:i]) for i in range(n)])",
              "why": "Срез исключает текущий элемент и смещает все итоги."
            }
          ],
          "hints": [
            "Обновляй сумму перед добавлением её в результат.",
            "Проверь этот риск: Одна итоговая сумма не показывает промежуточные результаты.",
            "Ещё одна важная граница: Срез исключает текущий элемент и смещает все итоги."
          ],
          "solutionExplanation": [
            "Обновляй сумму перед добавлением её в результат.",
            "Одна итоговая сумма не показывает промежуточные результаты.",
            "Срез исключает текущий элемент и смещает все итоги."
          ],
          "required": true
        },
        {
          "id": "sequences-measurements-project-spread",
          "kind": "code",
          "title": "Размах с пустым случаем",
          "goal": "Размах с пустым случаем",
          "prerequisites": [
            "sequences-measurements-project"
          ],
          "prompt": "Считай n и n измерений. Выведи max−min или «нет данных» для пустого набора.",
          "inputFormat": "n, затем n целых.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. Размах 0…2000000; для пустого набора текст «нет данных».",
          "examples": [
            {
              "input": [
                "0"
              ],
              "output": "нет данных",
              "explanation": "Проверь наличие данных до вычисления двух крайних значений."
            },
            {
              "input": [
                "1",
                "8"
              ],
              "output": "0",
              "explanation": "Проверь наличие данных до вычисления двух крайних значений."
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
                "1",
                "8"
              ],
              "expectedOutput": "0",
              "description": "Вход: 1 / 8"
            },
            {
              "stdin": [
                "3",
                "-3",
                "5",
                "1"
              ],
              "expectedOutput": "8",
              "description": "Вход: 3 / -3 / 5 / 1"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(max(values) - min(values) if values else \"нет данных\")",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nif not values:\n    print(\"нет данных\")\nelse:\n    ordered = sorted(values)\n    print(ordered[-1] - ordered[0])",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(max(values) - min(values))",
              "why": "min и max не определены для пустого списка без соглашения."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nprint(values[-1] - values[0] if values else \"нет данных\")",
              "why": "Первое и последнее значения не обязаны быть минимумом и максимумом."
            }
          ],
          "hints": [
            "Проверь наличие данных до вычисления двух крайних значений.",
            "Проверь этот риск: min и max не определены для пустого списка без соглашения.",
            "Ещё одна важная граница: Первое и последнее значения не обязаны быть минимумом и максимумом."
          ],
          "solutionExplanation": [
            "Проверь наличие данных до вычисления двух крайних значений.",
            "min и max не определены для пустого списка без соглашения.",
            "Первое и последнее значения не обязаны быть минимумом и максимумом."
          ],
          "required": true
        },
        {
          "id": "sequences-measurements-project-repair-report",
          "kind": "code",
          "title": "Исправить выбросы и сохранить оригинал",
          "goal": "Исправить выбросы и сохранить оригинал",
          "prerequisites": [
            "sequences-measurements-project"
          ],
          "prompt": "Считай n, n измерений, low и high (low ≤ high). Оставь значения в [low,high], остальные замени ближайшей границей. Выведи оригинал, исправленный список и число изменённых позиций на трёх строках.",
          "inputFormat": "n; n целых; low; high.",
          "outputFormat": "Точный текст результата, как в примерах; без приглашений ко вводу.",
          "constraints": "0 ≤ n ≤ 200; элементы — целые от −1000000 до 1000000. −1000000 ≤ low ≤ high ≤ 1000000. Два списка по n элементов и один счётчик, весь вывод меньше 4000 символов.",
          "examples": [
            {
              "input": [
                "0",
                "0",
                "10"
              ],
              "output": "\n\n0",
              "explanation": "Строй отдельный результат и сравнивай новое значение со старым для подсчёта изменений."
            },
            {
              "input": [
                "4",
                "-2",
                "5",
                "12",
                "0",
                "0",
                "10"
              ],
              "output": "-2 5 12 0\n0 5 10 0\n2",
              "explanation": "Строй отдельный результат и сравнивай новое значение со старым для подсчёта изменений."
            }
          ],
          "initialCode": "# Напиши программу самостоятельно.\n",
          "tests": [
            {
              "stdin": [
                "0",
                "0",
                "10"
              ],
              "expectedOutput": "\n\n0",
              "description": "Вход: 0 / 0 / 10"
            },
            {
              "stdin": [
                "4",
                "-2",
                "5",
                "12",
                "0",
                "0",
                "10"
              ],
              "expectedOutput": "-2 5 12 0\n0 5 10 0\n2",
              "description": "Вход: 4 / -2 / 5 / 12 / 0 / 0 / 10"
            },
            {
              "stdin": [
                "2",
                "3",
                "3",
                "3",
                "3"
              ],
              "expectedOutput": "3 3\n3 3\n0",
              "description": "Вход: 2 / 3 / 3 / 3 / 3"
            }
          ],
          "reference": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nlow = int(input())\nhigh = int(input())\nresult = []\nchanged = 0\nfor x in values:\n    new = max(low, min(high, x))\n    result.append(new)\n    changed += new != x\nprint(*values)\nprint(*result)\nprint(changed)",
          "alternative": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nlow = int(input())\nhigh = int(input())\nresult = values.copy()\nchanged = 0\nfor i in range(n):\n    if result[i] < low:\n        result[i] = low\n        changed += 1\n    elif result[i] > high:\n        result[i] = high\n        changed += 1\nprint(*values)\nprint(*result)\nprint(changed)",
          "wrongSolutions": [
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nlow = int(input())\nhigh = int(input())\nresult = values\nchanged = 0\nfor i in range(n):\n    new = max(low, min(high, result[i]))\n    changed += new != result[i]\n    result[i] = new\nprint(*values)\nprint(*result)\nprint(changed)",
              "why": "Общая ссылка уничтожает исходный отчёт."
            },
            {
              "code": "n = int(input())\nvalues = []\nfor i in range(n):\n    values.append(int(input()))\nlow = int(input())\nhigh = int(input())\nresult = [x for x in values if low <= x <= high]\nprint(*values)\nprint(*result)\nprint(n - len(result))",
              "why": "Фильтрация удаляет позиции вместо коррекции."
            }
          ],
          "hints": [
            "Строй отдельный результат и сравнивай новое значение со старым для подсчёта изменений.",
            "Проверь этот риск: Общая ссылка уничтожает исходный отчёт.",
            "Ещё одна важная граница: Фильтрация удаляет позиции вместо коррекции."
          ],
          "solutionExplanation": [
            "Строй отдельный результат и сравнивай новое значение со старым для подсчёта изменений.",
            "Общая ссылка уничтожает исходный отчёт.",
            "Фильтрация удаляет позиции вместо коррекции."
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
