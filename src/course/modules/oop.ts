import type { CourseModule } from '../types';

const module: CourseModule = {
  "id": "oop",
  "title": "Классы и объекты",
  "track": "advanced",
  "depth": "Вводная последовательность",
  "goal": "Понимать собственные объекты, методы и независимость состояния; применить их в небольшой модели.",
  "prerequisites": [
    "projects"
  ],
  "lessons": [
    {
      "id": "oop-objects",
      "title": "Объект, класс и экземпляр",
      "goal": "Различать описание класса и конкретные объекты с состоянием.",
      "prerequisites": [],
      "role": "lesson",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "oop-objects-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Числа, строки, списки и функции, которыми ты уже пользовался, являются объектами Python. У объекта есть тип, состояние и доступные операции. Класс позволяет описать собственный тип: какие данные и действия должны иметь его экземпляры. Эта последовательность — вводное знакомство с объектной моделью, а не полный профессиональный курс проектирования. Для работы нужны функции, словари, списки и ясное понимание общей ссылки.",
            "Запись class Label: начинает определение класса. Внутри можно связать имя с общим значением, например kind = \"заметка\". Вызов Label() создаёт экземпляр. Класс Label и экземпляр note = Label() — разные объекты с разными ролями: один задаёт описание, другой представляет конкретную заметку. Доступ через точку note.kind читает атрибут, подобно тому как math.ceil читает имя из модуля."
          ],
          "examples": [
            {
              "id": "oop-objects-example-1",
              "title": "Класс и два экземпляра",
              "code": "class Label:\n    kind=\"заметка\"\n\na=Label()\nb=Label()\na.text=\"план\"\nb.text=\"итог\"\nprint(a.kind,a.text)\nprint(b.kind,b.text)\nprint(a is b)",
              "output": "заметка план\nзаметка итог\nFalse\n",
              "explanation": "Общий тип не означает один объект. Каждая text назначена своему экземпляру."
            }
          ],
          "goal": "Различать описание класса и конкретные объекты с состоянием. Задача и устройство.",
          "prerequisites": []
        },
        {
          "id": "oop-objects-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Атрибут — именованное значение объекта. После создания экземпляра можно написать note.text = \"план\". Другой экземпляр не получает этот текст автоматически. Это пока ручная настройка; следующий урок покажет __init__, который гарантирует нужные атрибуты при создании. Не считай class готовой базой данных: объекты текущего запуска находятся в памяти и не сохраняются между независимыми запусками worker.",
            "Два отдельных вызова Label() обычно дают два разных экземпляра. Присваивание second = first не создаёт копию: оба имени указывают на один объект. Оператор is проверяет идентичность объекта. Оператор == проверяет равенство по правилам типа; для пользовательского класса правило можно определить отдельно позже. Не заменяй одно другим по привычке: одинаковое содержимое двух списков не делает их одним списком."
          ],
          "examples": [
            {
              "id": "oop-objects-example-2",
              "title": "Присваивание не копирует",
              "code": "class Box:\n    pass\n\nfirst=Box()\nsecond=first\nfirst.value=7\nprint(second.value)\nprint(first is second)",
              "output": "7\nTrue\n",
              "explanation": "Оба имени обозначают один экземпляр, поэтому изменение видно через оба."
            }
          ],
          "goal": "Различать описание класса и конкретные объекты с состоянием. Порядок выполнения.",
          "prerequisites": [
            "oop-objects-step-1"
          ]
        },
        {
          "id": "oop-objects-step-3",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Начинай собственный класс, когда данные и действия относятся к одной сущности: счётчику, книге, таймеру. Для простого одноразового расчёта функция часто удобнее. Не нужно превращать каждую переменную в отдельный класс. В сегодняшних задачах важны видимые свойства: создание разных экземпляров, сохранение переданного текста и различие идентичности. Проверка не оценивает количество написанных строк.",
            "После примера создай два объекта, присвой им разные данные и проверь, что изменение одного не меняет другой. Затем присвой второму имени первый объект и повтори наблюдение. Если результаты смешиваются, сначала ищи общую ссылку. В следующих уроках мы отдельно разберём общие атрибуты класса и изменяемые значения, которые действительно могут быть общими без намерения автора."
          ],
          "examples": [
            {
              "id": "oop-objects-example-3",
              "title": "Равенство и идентичность",
              "code": "a=[1,2]\nb=[1,2]\nprint(a==b)\nprint(a is b)",
              "output": "True\nFalse\n",
              "explanation": "Списки имеют одинаковые элементы, но созданы отдельно."
            }
          ],
          "goal": "Различать описание класса и конкретные объекты с состоянием. Применение и ошибки.",
          "prerequisites": [
            "oop-objects-step-2"
          ]
        }
      ],
      "exercises": [
        {
          "id": "oop-objects-task-1",
          "kind": "code",
          "title": "Тип заметки",
          "goal": "Тип заметки",
          "prerequisites": [
            "oop-objects"
          ],
          "prompt": "Создай класс Note с строковым атрибутом kind=\"заметка\". Два вызова Note() должны создавать разные экземпляры.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "Note.kind"
              ],
              "output": "'заметка'",
              "explanation": "Значение доступно у класса."
            },
            {
              "input": [
                "Note().kind"
              ],
              "output": "'заметка'",
              "explanation": "Экземпляр читает общий атрибут."
            }
          ],
          "initialCode": "class Note:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "Note.kind",
              "expectedValue": "заметка",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Значение доступно у класса."
            },
            {
              "expression": "Note().kind",
              "expectedValue": "заметка",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Экземпляр читает общий атрибут."
            },
            {
              "expression": "Note() is Note()",
              "expectedValue": false,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Два отдельных создания."
            }
          ],
          "reference": "class Note:\n    kind=\"заметка\"",
          "alternative": "class Note:\n    pass\nNote.kind=\"заметка\"",
          "wrongSolutions": [
            {
              "code": "class Note:\n    kind=\"заметки\"",
              "why": "Точное значение атрибута нарушено."
            },
            {
              "code": "class Note:\n    pass",
              "why": "Пустая заготовка не задаёт атрибут."
            }
          ],
          "hints": [
            "Класс создаётся через class, экземпляр через вызов.",
            "Атрибут kind должен быть доступен по договорённости.",
            "Свяжи kind с нужной строкой в теле класса."
          ],
          "solutionExplanation": [
            "Вызов класса создаёт новый экземпляр.",
            "Неизменяемая общая настройка пока безопасна."
          ],
          "required": true
        },
        {
          "id": "oop-objects-task-2",
          "kind": "code",
          "title": "Фабрика подписей",
          "goal": "Фабрика подписей",
          "prerequisites": [
            "oop-objects"
          ],
          "prompt": "Определи класс Label и функцию new_label(text). Она создаёт новый Label, назначает ему text и возвращает объект. Каждое создание независимо.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "new_label('план').text"
              ],
              "output": "'план'",
              "explanation": "Переданный текст сохраняется."
            },
            {
              "input": [
                "new_label('') is new_label('')"
              ],
              "output": "False",
              "explanation": "Пустые подписи тоже разные."
            }
          ],
          "initialCode": "# Создай Label и new_label(text)",
          "tests": [
            {
              "expression": "new_label('план').text",
              "expectedValue": "план",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Переданный текст сохраняется."
            },
            {
              "expression": "new_label('') is new_label('')",
              "expectedValue": false,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустые подписи тоже разные."
            },
            {
              "expression": "isinstance(new_label('x'),Label)",
              "expectedValue": true,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нужен экземпляр Label, не словарь."
            },
            {
              "expression": "(lambda first,second:[first.text,second.text,first is not second])(new_label('первый'),new_label('второй'))",
              "expectedValue": [
                "первый",
                "второй",
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Два одновременно существующих объекта сохраняют разные тексты после второго создания."
            }
          ],
          "reference": "class Label:\n    pass\n\ndef new_label(text):\n    result=Label()\n    result.text=text\n    return result",
          "alternative": "class Label:\n    pass\n\ndef new_label(text):\n    label=Label()\n    setattr(label,\"text\",text)\n    return label",
          "wrongSolutions": [
            {
              "code": "class Label:\n    pass\ndef new_label(text):\n    return {\"text\":text}",
              "why": "Словарь не выполняет объявленный интерфейс класса."
            },
            {
              "code": "class Label:\n    pass\nshared=Label()\ndef new_label(text):\n    shared.text=text\n    return shared",
              "why": "Все вызовы делят один объект."
            },
            {
              "code": "class Label:\n    pass\ndef new_label(text):\n    Label.text=text\n    return Label()",
              "why": "Общий атрибут класса перезаписывает текст первого экземпляра при создании второго."
            }
          ],
          "hints": [
            "Нужен созданный экземпляр, а не класс или словарь.",
            "Назначь text объекту после Label().",
            "Возвращай только что созданный объект, не общую переменную."
          ],
          "solutionExplanation": [
            "Ручная инициализация пока отделена от создания.",
            "Следующий урок перенесёт её в __init__."
          ],
          "required": true
        },
        {
          "id": "oop-objects-task-3",
          "kind": "code",
          "title": "Один ли это объект?",
          "goal": "Один ли это объект?",
          "prerequisites": [
            "oop-objects"
          ],
          "prompt": "Верни True только если left и right — один объект. Равные по данным отдельные объекты должны дать False.",
          "inputFormat": "Реализуй same_object(left, right). Аргументы передаёт проверка; ввод с клавиатуры не нужен.",
          "outputFormat": "Возвращаемое значение по контракту в условии. Вывод в консоль должен оставаться пустым.",
          "constraints": "Числа целые, если в условии не сказано иначе. Функция возвращает результат; ничего не печатай и не читай через input().",
          "examples": [
            {
              "input": [
                "same_object([1],[1])"
              ],
              "output": "False",
              "explanation": "Равенство элементов не идентичность."
            },
            {
              "input": [
                "(lambda x:same_object(x,x))([])"
              ],
              "output": "True",
              "explanation": "Две ссылки на один список."
            }
          ],
          "initialCode": "def same_object(left, right):\n    # Напиши решение по условию\n    pass",
          "tests": [
            {
              "expression": "same_object([1],[1])",
              "expectedValue": false,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Равенство элементов не идентичность."
            },
            {
              "expression": "(lambda x:same_object(x,x))([])",
              "expectedValue": true,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Две ссылки на один список."
            },
            {
              "expression": "same_object({}, {})",
              "expectedValue": false,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Два словаря."
            }
          ],
          "reference": "def same_object(left, right):\n    return left is right",
          "alternative": "def same_object(left, right):\n    return id(left)==id(right)",
          "wrongSolutions": [
            {
              "code": "def same_object(left, right):\n    return left==right",
              "why": "Перепутаны равенство и идентичность."
            },
            {
              "code": "def same_object(left, right):\n    return False",
              "why": "Общие ссылки не учтены."
            }
          ],
          "hints": [
            "Нужно спросить об объекте, а не содержимом.",
            "==можетбыть True для разных экземпляров.",
            "Оператор is проверяет тоже самое создание."
          ],
          "solutionExplanation": [
            "id равен для двух ссылок на один живой объект.",
            "Этот способ не подменяет сравнение значений в обычных задачах."
          ],
          "required": true
        },
        {
          "id": "oop-objects-task-4",
          "kind": "explain",
          "title": "Что копирует присваивание?",
          "goal": "Что копирует присваивание?",
          "prerequisites": [
            "oop-objects"
          ],
          "prompt": "После b=a для экземпляра класса что верно?",
          "inputFormat": "Прочитай условие и выбери ответ.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "class Label:\n    kind=\"заметка\"\n\na=Label()\nb=Label()\na.text=\"план\"\nb.text=\"итог\"\nprint(a.kind,a.text)\nprint(b.kind,b.text)\nprint(a is b)"
              ],
              "output": "заметка план\nзаметка итог\nFalse\n",
              "explanation": "Общий тип не означает один объект. Каждая text назначена своему экземпляру."
            }
          ],
          "hints": [
            "Вспомни правило из урока «Объект, класс и экземпляр» и проверь каждый вариант на конкретном примере.",
            "Сначала исключи варианты, противоречащие наблюдаемому выполнению. Присваивание связывает имя с объектом; новый экземпляр нужно создавать явно.",
            "Проверь основной аргумент: Присваивание связывает имя с объектом; новый экземпляр нужно создавать явно."
          ],
          "solutionExplanation": [
            "Присваивание связывает имя с объектом; новый экземпляр нужно создавать явно."
          ],
          "required": true,
          "answer": [
            "1"
          ],
          "choices": [
            {
              "id": "1",
              "text": "a и b ссылаются на один объект."
            },
            {
              "id": "2",
              "text": "b автоматически получает глубокую копию."
            },
            {
              "id": "3",
              "text": "b становится самим классом."
            }
          ]
        }
      ]
    },
    {
      "id": "oop-initialization",
      "title": "__init__, self и обязательные атрибуты",
      "goal": "Инициализировать каждый экземпляр собственными данными.",
      "prerequisites": [
        "oop-objects"
      ],
      "role": "lesson",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "oop-initialization-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Ручное присваивание атрибутов после создания легко забыть. Инициализатор __init__ описывает действия настройки экземпляра при вызове класса. В Point(2,3)Python сначала создаёт объект, затем вызывает его __init__ с переданными аргументами. Технически __init__ не создаёт объект сам, а настраивает уже созданный. Для новичка важно знать порядок, не углубляясь пока в __new__.",
            "Первый параметр метода обычно называют self. Во время вызова метода через экземпляр Python передаёт этот экземпляр автоматически. В def __init__(self,x,y): имена x и y получают аргументы 2 и 3, а self — новую точку. Присваивание self.x=x создаёт атрибут экземпляра. Запись x=x лишь пере привязывает локальное имя и не сохраняет координату для дальнейшей работы."
          ],
          "examples": [
            {
              "id": "oop-initialization-example-1",
              "title": "Координаты сохраняются на экземпляре",
              "code": "class Point:\n    def __init__(self,x,y):\n        self.x=x\n        self.y=y\n\np=Point(2,3)\nprint(p.x,p.y)",
              "output": "2 3\n",
              "explanation": "self.x получает значение параметра x, оно сохраняется после завершения инициализатора."
            }
          ],
          "goal": "Инициализировать каждый экземпляр собственными данными. Задача и устройство.",
          "prerequisites": [
            "oop-objects"
          ]
        },
        {
          "id": "oop-initialization-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "self — общепринятое имя параметра, не специальное ключевое слово. Оно делает видимой связь действия с конкретным объектом. Пропуск self в определении метода обычно приводит к TypeError, потомучто Python передаёт экземпляр дополнительно. Не исправляй ошибку удалением переданного аргумента из вызова класса: сверь заголовок и метод, чтобы сохранить обещанный контракт.",
            "__init__ должен завершаться с None: не возвращай из него другой объект или вычисленное число. Итогом Point(...) остаётся новый экземпляр Point. Если хочешь получить число из объекта, создай отдельный метод. У каждого экземпляра его атрибуты должны зависеть от текущих аргументов, а не от константы из первого примера. Проверка создаёт несколько объектов с разными координатами и текстом."
          ],
          "examples": [
            {
              "id": "oop-initialization-example-2",
              "title": "Два создания — две настройки",
              "code": "class Counter:\n    def __init__(self,start=0):\n        self.value=start\n\na=Counter()\nb=Counter(5)\na.value=9\nprint(a.value,b.value)",
              "output": "9 5\n",
              "explanation": "Изменение a не влияет на b. Явный start0 тоже законен."
            }
          ],
          "goal": "Инициализировать каждый экземпляр собственными данными. Порядок выполнения.",
          "prerequisites": [
            "oop-initialization-step-1"
          ]
        },
        {
          "id": "oop-initialization-step-3",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Значения по умолчанию в __init__ подчиняются тем же правилам, что у обычных функций. Число 0 может быть удобным началом счётчика. Изменяемый список=[] в заголовке опять станет общим между вызовами. В этом уроке используем числа и строки, а историю и корзину перенесём в отдельный урок о независимости экземпляров. Необязательное допущение 0 ненужно заменять по истинности.",
            "Проверь и чтение атрибутов, и независимость: создай две точки, поменяй x первой, убедись, что вторая не меняется. Эта маленькая проверка отличает сохранённое состояние от временной локальной переменной. После трёх задач попробуй на словах объяснить каждую часть self.x=x: какой объект получает атрибут, какое имя прочитано справа и где позже доступно результат."
          ],
          "examples": [
            {
              "id": "oop-initialization-example-3",
              "title": "Аргумент и атрибут называются по-разному",
              "code": "class Label:\n    def __init__(self,text):\n        self.caption=text.strip()\n\nprint(Label(\" план \").caption)",
              "output": "план\n",
              "explanation": "Имя параметра необязательно повторяет имя публичного атрибута."
            }
          ],
          "goal": "Инициализировать каждый экземпляр собственными данными. Применение и ошибки.",
          "prerequisites": [
            "oop-initialization-step-2"
          ]
        }
      ],
      "exercises": [
        {
          "id": "oop-initialization-task-1",
          "kind": "code",
          "title": "Точка с координатами",
          "goal": "Точка с координатами",
          "prerequisites": [
            "oop-initialization"
          ],
          "prompt": "Создай Point(x,y), сохраняющий атрибуты x и y без изменения. Значения целые, могут быть отрицательными.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "[Point(2,3).x,Point(2,3).y]"
              ],
              "output": "[2, 3]",
              "explanation": "Оба атрибута."
            },
            {
              "input": [
                "[Point(-1,0).x,Point(-1,0).y]"
              ],
              "output": "[-1, 0]",
              "explanation": "Знаки и ноль."
            }
          ],
          "initialCode": "class Point:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "[Point(2,3).x,Point(2,3).y]",
              "expectedValue": [
                2,
                3
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Оба атрибута."
            },
            {
              "expression": "[Point(-1,0).x,Point(-1,0).y]",
              "expectedValue": [
                -1,
                0
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Знаки и ноль."
            },
            {
              "expression": "(lambda a,b:(setattr(a,'x',99),b.x)[1])(Point(1,2),Point(3,4))",
              "expectedValue": 3,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Состояния разделены."
            },
            {
              "expression": "(lambda first,second:[first.x,first.y,second.x,second.y,first is not second])(Point(2,3),Point(-4,0))",
              "expectedValue": [
                2,
                3,
                -4,
                0,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Координаты первого объекта не перезаписаны настройкой второго."
            }
          ],
          "reference": "class Point:\n    def __init__(self,x,y):\n        self.x=x\n        self.y=y",
          "alternative": "class Point:\n    def __init__(self,x,y):\n        self.x,self.y=x,y",
          "wrongSolutions": [
            {
              "code": "class Point:\n    def __init__(self,x,y):\n        x=x\n        y=y",
              "why": "Локальные присваивания не создают атрибуты."
            },
            {
              "code": "class Point:\n    def __init__(self,x,y):\n        self.x=y\n        self.y=x",
              "why": "Координаты переставлены."
            },
            {
              "code": "class Point:\n    def __init__(self,x,y):\n        Point.x=x\n        Point.y=y",
              "why": "Координаты записаны в класс, поэтому новый объект меняет данные уже существующих экземпляров."
            }
          ],
          "hints": [
            "Данные должны пережить вызов __init__.",
            "Нужны атрибуты слева через self.",
            "Сохрани каждый параметр в соответствующем self.x или self.y."
          ],
          "solutionExplanation": [
            "Экземпляр получает собственные значения.",
            "__init__ ничего кром eNone не возвращает."
          ],
          "required": true
        },
        {
          "id": "oop-initialization-task-2",
          "kind": "code",
          "title": "Прямоугольник как данные",
          "goal": "Прямоугольник как данные",
          "prerequisites": [
            "oop-initialization"
          ],
          "prompt": "Сохрани width,height и атрибут area=width*height при создании Rectangle. Числа целые>=0. Вычисленное area снимок на момент создания.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "[Rectangle(3,4).width,Rectangle(3,4).height,Rectangle(3,4).area]"
              ],
              "output": "[3, 4, 12]",
              "explanation": "Данные и производный атрибут."
            },
            {
              "input": [
                "Rectangle(0,9).area"
              ],
              "output": "0",
              "explanation": "Нулевая ширина."
            }
          ],
          "initialCode": "class Rectangle:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "[Rectangle(3,4).width,Rectangle(3,4).height,Rectangle(3,4).area]",
              "expectedValue": [
                3,
                4,
                12
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Данные и производный атрибут."
            },
            {
              "expression": "Rectangle(0,9).area",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевая ширина."
            },
            {
              "expression": "Rectangle(2,5).area",
              "expectedValue": 10,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Другие аргументы."
            },
            {
              "expression": "(lambda rect:(setattr(rect,'width',99),setattr(rect,'height',77),rect.area)[2])(Rectangle(3,4))",
              "expectedValue": 12,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "area сохраняет снимок площади при создании; изменение размеров позже не пересчитывает атрибут."
            },
            {
              "expression": "(lambda first,second:[first.width,first.height,first.area,second.width,second.height,second.area])(Rectangle(3,4),Rectangle(2,5))",
              "expectedValue": [
                3,
                4,
                12,
                2,
                5,
                10
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Размеры и снимки площади принадлежат каждому прямоугольнику отдельно."
            }
          ],
          "reference": "class Rectangle:\n    def __init__(self,width,height):\n        self.width=width\n        self.height=height\n        self.area=width*height",
          "alternative": "class Rectangle:\n    def __init__(self,width,height):\n        self.width,self.height=width,height\n        self.area=self.width*self.height",
          "wrongSolutions": [
            {
              "code": "class Rectangle:\n    def __init__(self,width,height):\n        self.width=width\n        self.height=height\n        self.area=width+height",
              "why": "Сумма вместо площади."
            },
            {
              "code": "class Rectangle:\n    def __init__(self,width,height):\n        self.width=width\n        self.height=height\n        return width*height",
              "why": "__init__ не должен возвращать число;area не создана."
            },
            {
              "code": "class Rectangle:\n    def __init__(self,width,height):\n        self.width=width\n        self.height=height\n    @property\n    def area(self):\n        return self.width*self.height",
              "why": "Вычисляемое свойство пересчитывает площадь после изменения размеров, хотя контракт обещает снимок при создании."
            },
            {
              "code": "class Rectangle:\n    def __init__(self,width,height):\n        Rectangle.width=width\n        Rectangle.height=height\n        Rectangle.area=width*height",
              "why": "Данные прямоугольников ошибочно общие: второе создание перезаписывает первый объект."
            }
          ],
          "hints": [
            "Площадь — ещё один атрибут, не результат инициализатора.",
            "Умножь текущие параметры.",
            "После width и height сохрани self.area."
          ],
          "solutionExplanation": [
            "Контракт явно называет area снимком, а не авто обновляемым свойством.",
            "Позже метод позволит вычислять площадь по текущим данным."
          ],
          "required": true
        },
        {
          "id": "oop-initialization-task-3",
          "kind": "code",
          "title": "Профиль с очищенным именем",
          "goal": "Профиль с очищенным именем",
          "prerequisites": [
            "oop-initialization"
          ],
          "prompt": "Сохрани name.strip() в атрибут name и параметр active типа bool как передан. active уже bool. По умолчанию True, явный False не заменяй. Пустое имя допустимо.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "[Profile(' Аня ').name,Profile(' Аня ').active]"
              ],
              "output": "['Аня', True]",
              "explanation": "Очистка и настройка по у молчанию."
            },
            {
              "input": [
                "[Profile('',False).name,Profile('',False).active]"
              ],
              "output": "['', False]",
              "explanation": "Явный False сохранён."
            }
          ],
          "initialCode": "class Profile:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "[Profile(' Аня ').name,Profile(' Аня ').active]",
              "expectedValue": [
                "Аня",
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Очистка и настройка по у молчанию."
            },
            {
              "expression": "[Profile('',False).name,Profile('',False).active]",
              "expectedValue": [
                "",
                false
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Явный False сохранён."
            },
            {
              "expression": "Profile('Б',active=False).active",
              "expectedValue": false,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Именованный аргумент."
            },
            {
              "expression": "(lambda first,second:[first.name,first.active,second.name,second.active,first is not second])(Profile(' Аня ',True),Profile(' Борис ',False))",
              "expectedValue": [
                "Аня",
                true,
                "Борис",
                false,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Имена и настройки двух одновременно существующих профилей независимы."
            }
          ],
          "reference": "class Profile:\n    def __init__(self,name,active=True):\n        self.name=name.strip()\n        self.active=active",
          "alternative": "class Profile:\n    def __init__(self,name,active=True):\n        self.name,self.active=name.strip(),active",
          "wrongSolutions": [
            {
              "code": "class Profile:\n    def __init__(self,name,active=True):\n        self.name=name\n        self.active=active",
              "why": "Пробелы имени не очищены."
            },
            {
              "code": "class Profile:\n    def __init__(self,name,active=True):\n        self.name=name.strip()\n        self.active=active or True",
              "why": "Законный False заменён True."
            },
            {
              "code": "class Profile:\n    def __init__(self,name,active=True):\n        Profile.name=name.strip()\n        Profile.active=active",
              "why": "Общие атрибуты класса заменяют имя и настройку первого профиля при создании второго."
            }
          ],
          "hints": [
            "Default используется только при пропуске аргумента.",
            "Не применяй or для переданного бу левого значения.",
            "Сохрани active напрямую,name после strip."
          ],
          "solutionExplanation": [
            "Настройка экземпляра имеет те же правила, что у функции.",
            "Пустая строка имени не объявлена ошибкой."
          ],
          "required": true
        },
        {
          "id": "oop-initialization-task-4",
          "kind": "explain",
          "title": "Что означает self.x=x?",
          "goal": "Что означает self.x=x?",
          "prerequisites": [
            "oop-initialization"
          ],
          "prompt": "Выбери верное объяснение.",
          "inputFormat": "Прочитай условие и выбери ответ.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "class Point:\n    def __init__(self,x,y):\n        self.x=x\n        self.y=y\n\np=Point(2,3)\nprint(p.x,p.y)"
              ],
              "output": "2 3\n",
              "explanation": "self.x получает значение параметра x, оно сохраняется после завершения инициализатора."
            }
          ],
          "hints": [
            "Вспомни правило из урока «__init__, self и обязательные атрибуты» и проверь каждый вариант на конкретном примере.",
            "Сначала исключи варианты, противоречащие наблюдаемому выполнению. Слева указан объект с атрибутом, справа читается аргумент вызова инициализатора.",
            "Проверь основной аргумент: Слева указан объект с атрибутом, справа читается аргумент вызова инициализатора."
          ],
          "solutionExplanation": [
            "Слева указан объект с атрибутом, справа читается аргумент вызова инициализатора."
          ],
          "required": true,
          "answer": [
            "1"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Атрибут x текущего экземпляра получает значение локального параметра x."
            },
            {
              "id": "2",
              "text": "Глобальная переменная x меняется у всех объектов."
            },
            {
              "id": "3",
              "text": "self означает сам класс, а не экземпляр."
            }
          ]
        }
      ]
    },
    {
      "id": "oop-methods",
      "title": "Методы и переходы состояния",
      "goal": "Менять состояние конкретного объекта и возвращать результат действия.",
      "prerequisites": [
        "oop-initialization"
      ],
      "role": "lesson",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "oop-methods-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Метод — функция, определённая в классе и вызванная через объект. В counter.add(2) экземпляр counter автоматически передаётся первым аргументом self, а 2 попадает в параметр delta. Поэтому заголовок def add(self,delta) имеет два параметра, а в вызове нужно указать один явный аргумент. Метод может читать и изменять атрибуты, как обычная функция читает и изменяет полученные данные.",
            "Состояние должно меняться по понятному правилу. Для счётчика это self.value += delta. Если написать value += delta без self, локальное имя не обратится к атрибуту автоматически. Для кошелька недостаточно правильно вычесть сумму: сначала проверь, можно ли выполнить списание. Если действие отклонено, остаток должен сохраниться. Возвращаемый bool сообщает, состоялось ли действие; число остатка хранится отдельно."
          ],
          "examples": [
            {
              "id": "oop-methods-example-1",
              "title": "Результат и состояние",
              "code": "class Counter:\n    def __init__(self):\n        self.value=0\n    def add(self,delta):\n        self.value+=delta\n        return self.value\n\nc=Counter()\nprint(c.add(2))\nprint(c.add(-1))",
              "output": "2\n1\n",
              "explanation": "Каждый вызов использует состояние после предыдущего."
            }
          ],
          "goal": "Менять состояние конкретного объекта и возвращать результат действия. Задача и устройство.",
          "prerequisites": [
            "oop-initialization"
          ]
        },
        {
          "id": "oop-methods-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Согласуй роль результата метода. list.append меняет список и возвращает None, а самостоятельный метод может по контракту возвращать новое состояние или факт успеха. Ни один вариант не\"правильнее всегда\". Важно, чтобы вызывающий код знал договорённость. В наших задачах она явно описана. Не добавляй print в метод ради обратной связи: интерфейс может сам отобразить возвращённый результат.",
            "У автомата состояний иногда несколько допустимых переходов. Таймер в этом уроке не измеряет настоящее время: он хранит только running. start на выключенном даёт True и включает, повторный start даёт False и не меняет состояние. stop работает симметрично. Такой маленький объект учит проверять последовательность, а не один изолированный вызов. Не используй sleep или сетевые часы для этой модели."
          ],
          "examples": [
            {
              "id": "oop-methods-example-2",
              "title": "Отказ не меняет данные",
              "code": "balance=5\nrequested=6\naccepted=requested<=balance\nif accepted:\n    balance-=requested\nprint(accepted,balance)",
              "output": "False 5\n",
              "explanation": "Такая проверка должна стоять внутри метода списания до присваивания остатка."
            }
          ],
          "goal": "Менять состояние конкретного объекта и возвращать результат действия. Порядок выполнения.",
          "prerequisites": [
            "oop-methods-step-1"
          ]
        },
        {
          "id": "oop-methods-step-3",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Проверяй цепочку действий и состояние после каждого. Для кошелька нужны успешное списание вровень, отказ и последующее пополнение. Для счётчика — нулевой, положительный и отрицательный шаг. Создай второй объект, чтобы проверить, что он не получает изменения первого. Понимание переходов состояния понадобится в корзине, списке задач и библиотечном проекте."
          ],
          "examples": [
            {
              "id": "oop-methods-example-3",
              "title": "Последовательность состояний",
              "code": "running=False\nfor action in [\"start\",\"start\",\"stop\"]:\n    changed=(action==\"start\")!=running\n    if changed:\n        running=not running\n    print(changed,running)",
              "output": "True True\nFalse True\nTrue False\n",
              "explanation": "Повторный start не создаёт новый переход."
            }
          ],
          "goal": "Менять состояние конкретного объекта и возвращать результат действия. Применение и ошибки.",
          "prerequisites": [
            "oop-methods-step-2"
          ]
        }
      ],
      "exercises": [
        {
          "id": "oop-methods-task-1",
          "kind": "code",
          "title": "Счётчик с изменением",
          "goal": "Счётчик с изменением",
          "prerequisites": [
            "oop-methods"
          ],
          "prompt": "Атрибут value=start. Метод add(delta=1) прибавляет delta и возвращает новый value. Шаг может быть отрицательным или нулевым.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "list((lambda c:[c.add(),c.add(-2),c.add(0),c.value])(Counter(3)))"
              ],
              "output": "[4, 2, 2, 2]",
              "explanation": "Цепочка изменений."
            },
            {
              "input": [
                "(lambda a,b:(a.add(9),b.value)[1])(Counter(),Counter())"
              ],
              "output": "0",
              "explanation": "Независимые экземпляры."
            }
          ],
          "initialCode": "class Counter:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "list((lambda c:[c.add(),c.add(-2),c.add(0),c.value])(Counter(3)))",
              "expectedValue": [
                4,
                2,
                2,
                2
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Цепочка изменений."
            },
            {
              "expression": "(lambda a,b:(a.add(9),b.value)[1])(Counter(),Counter())",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Независимые экземпляры."
            },
            {
              "expression": "Counter().value",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Начало по умолчанию."
            },
            {
              "expression": "(lambda first,second:[first.value,second.value,first.add(2),second.value,second.add(-1),first.value])(Counter(3),Counter(10))",
              "expectedValue": [
                3,
                10,
                5,
                10,
                9,
                5
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Два счётчика с разными началами сохраняют независимые значения при чередовании изменений."
            }
          ],
          "reference": "class Counter:\n    def __init__(self,start=0):\n        self.value=start\n    def add(self,delta=1):\n        self.value+=delta\n        return self.value",
          "alternative": "class Counter:\n    def __init__(self,start=0):\n        self.value=start\n    def add(self,delta=1):\n        self.value=self.value+delta\n        result=self.value\n        return result",
          "wrongSolutions": [
            {
              "code": "class Counter:\n    def __init__(self,start=0):\n        self.value=start\n    def add(self,delta=1):\n        return self.value+delta",
              "why": "Результат вычислен, состояние не обновлено."
            },
            {
              "code": "class Counter:\n    def __init__(self,start=0):\n        self.value=start\n    def add(self,delta=1):\n        self.value+=1\n        return self.value",
              "why": "Переданный шаг игнорируется."
            },
            {
              "code": "class Counter:\n    def __init__(self,start=0):\n        Counter.value=start\n    def add(self,delta=1):\n        self.value+=delta\n        return self.value",
              "why": "Начало записано в класс: создание второго счётчика перезаписывает исходное значение первого до его собственного изменения."
            }
          ],
          "hints": [
            "value должен сохранить изменение между вызовами.",
            "Сначала мени self.value, затем верни его.",
            "delta по умолчанию 1, явные ноль и минус не заменяй."
          ],
          "solutionExplanation": [
            "Метод связывает новый результат с состоянием экземпляра.",
            "Последовательный тест ловит вычисление без сохранения."
          ],
          "required": true
        },
        {
          "id": "oop-methods-task-2",
          "kind": "code",
          "title": "Кошелёк без отрицательного остатка",
          "goal": "Кошелёк без отрицательного остатка",
          "prerequisites": [
            "oop-methods"
          ],
          "prompt": "balance>=0. Метод withdraw(amount) при amount>=0: если хватает, уменьшает balance и возвращает True, иначе False без изменения. Метод deposit(amount)amount>=0 увеличивает balance и возвращает None.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "list((lambda a:[a.withdraw(5),a.balance,a.withdraw(1),a.balance,a.deposit(2),a.balance])(Account(5)))"
              ],
              "output": "[True, 0, False, 0, None, 2]",
              "explanation": "Успех вровень, отказ, пополнение."
            },
            {
              "input": [
                "(lambda a,b:(a.deposit(4),b.balance)[1])(Account(),Account())"
              ],
              "output": "0",
              "explanation": "Второй счёт не изменился."
            }
          ],
          "initialCode": "class Account:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "list((lambda a:[a.withdraw(5),a.balance,a.withdraw(1),a.balance,a.deposit(2),a.balance])(Account(5)))",
              "expectedValue": [
                true,
                0,
                false,
                0,
                null,
                2
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Успех вровень, отказ, пополнение."
            },
            {
              "expression": "(lambda a,b:(a.deposit(4),b.balance)[1])(Account(),Account())",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Второй счёт не изменился."
            },
            {
              "expression": "list((lambda a:[a.withdraw(0),a.balance])(Account()))",
              "expectedValue": [
                true,
                0
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевая сумма допустима."
            },
            {
              "expression": "(lambda a,b:[a.balance,b.balance,a.withdraw(5),a.balance,b.balance,b.deposit(2),a.balance,b.balance])(Account(5),Account(9))",
              "expectedValue": [
                5,
                9,
                true,
                0,
                9,
                null,
                0,
                11
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Два счёта с разными начальными остатками сохраняют собственное состояние при чередовании действий."
            }
          ],
          "reference": "class Account:\n    def __init__(self,balance=0):\n        self.balance=balance\n    def withdraw(self,amount):\n        if amount>self.balance:\n            return False\n        self.balance-=amount\n        return True\n    def deposit(self,amount):\n        self.balance+=amount",
          "alternative": "class Account:\n    def __init__(self,balance=0):\n        self.balance=balance\n    def withdraw(self,amount):\n        possible=self.balance-amount>=0\n        if possible:\n            self.balance=self.balance-amount\n        return possible\n    def deposit(self,amount):\n        self.balance=self.balance+amount\n        return None",
          "wrongSolutions": [
            {
              "code": "class Account:\n    def __init__(self,balance=0):\n        self.balance=balance\n    def withdraw(self,amount):\n        self.balance-=amount\n        return self.balance>=0\n    def deposit(self,amount):\n        self.balance+=amount",
              "why": "Отказ сообщён после изменения, остаток испорчен."
            },
            {
              "code": "class Account:\n    def __init__(self,balance=0):\n        self.balance=balance\n    def withdraw(self,amount):\n        if amount>=self.balance:\n            return False\n        self.balance-=amount\n        return True\n    def deposit(self,amount):\n        self.balance+=amount",
              "why": "Ровного баланса и нулевого списания должно хватать."
            },
            {
              "code": "class Account:\n    def __init__(self,balance=0):\n        Account.balance=balance\n    def withdraw(self,amount):\n        if amount>self.balance:\n            return False\n        self.balance-=amount\n        return True\n    def deposit(self,amount):\n        self.balance+=amount",
              "why": "Начальный баланс записан в класс, поэтому второй счёт меняет исходный остаток первого."
            }
          ],
          "hints": [
            "Проверяй разрешён ность действия до изменения.",
            "Отказ не должен затрагивать balance.",
            "withdraw использует amount>balance как защиту,deposit ничего явно не возвращает."
          ],
          "solutionExplanation": [
            "Состояние сохраняется при отказе.",
            "Возвращаемый факт успеха отдельный от текущего остатка."
          ],
          "required": true
        },
        {
          "id": "oop-methods-task-3",
          "kind": "code",
          "title": "Переключатель запуска",
          "goal": "Переключатель запуска",
          "prerequisites": [
            "oop-methods"
          ],
          "prompt": "Создай Timer с running=False. start() включает таймер и возвращает True только при переходе; повторный start() возвращает False. stop() выключает аналогично. Флаг моделирует состояние; настоящее время не измеряется.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "list((lambda t:[t.start(),t.start(),t.running,t.stop(),t.stop(),t.running])(Timer()))"
              ],
              "output": "[True, False, True, True, False, False]",
              "explanation": "Повторные операции не дают ложный успех."
            },
            {
              "input": [
                "(lambda a,b:(a.start(),b.running)[1])(Timer(),Timer())"
              ],
              "output": "False",
              "explanation": "Независимый второй таймер."
            }
          ],
          "initialCode": "class Timer:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "list((lambda t:[t.start(),t.start(),t.running,t.stop(),t.stop(),t.running])(Timer()))",
              "expectedValue": [
                true,
                false,
                true,
                true,
                false,
                false
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Повторные операции не дают ложный успех."
            },
            {
              "expression": "(lambda a,b:(a.start(),b.running)[1])(Timer(),Timer())",
              "expectedValue": false,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Независимый второй таймер."
            }
          ],
          "reference": "class Timer:\n    def __init__(self):\n        self.running=False\n    def start(self):\n        if self.running:\n            return False\n        self.running=True\n        return True\n    def stop(self):\n        if not self.running:\n            return False\n        self.running=False\n        return True",
          "alternative": "class Timer:\n    def __init__(self):\n        self.running=False\n    def start(self):\n        changed=not self.running\n        self.running=True\n        return changed\n    def stop(self):\n        changed=self.running\n        self.running=False\n        return changed",
          "wrongSolutions": [
            {
              "code": "class Timer:\n    def __init__(self):\n        self.running=False\n    def start(self):\n        self.running=True\n        return True\n    def stop(self):\n        self.running=False\n        return True",
              "why": "Повторные действия всегда объявлены успешными."
            },
            {
              "code": "class Timer:\n    def __init__(self):\n        self.running=False\n    def start(self):\n        return not self.running\n    def stop(self):\n        return self.running",
              "why": "Состояние нет меняется."
            }
          ],
          "hints": [
            "Нужно отличить команду от реального перехода.",
            "Результат зависит от прежнего running.",
            "Сохрани или проверь прежнее состояние до присваивания."
          ],
          "solutionExplanation": [
            "Модель таймера независима от часов и сети.",
            "Повторный клик не создаёт второй успешный результат."
          ],
          "required": true
        },
        {
          "id": "oop-methods-task-4",
          "kind": "choice",
          "title": "Почему метод получает self?",
          "goal": "Почему метод получает self?",
          "prerequisites": [
            "oop-methods"
          ],
          "prompt": "У counter.add(2) заголовок def add(self,delta). Откуда взялся self?",
          "inputFormat": "Прочитай условие и выбери ответ.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "class Counter:\n    def __init__(self):\n        self.value=0\n    def add(self,delta):\n        self.value+=delta\n        return self.value\n\nc=Counter()\nprint(c.add(2))\nprint(c.add(-1))"
              ],
              "output": "2\n1\n",
              "explanation": "Каждый вызов использует состояние после предыдущего."
            }
          ],
          "hints": [
            "Вспомни правило из урока «Методы и переходы состояния» и проверь каждый вариант на конкретном примере.",
            "Сначала исключи варианты, противоречащие наблюдаемому выполнению. Связанный метод получает экземпляр автоматически, явный аргумент заполняет delta.",
            "Проверь основной аргумент: Связанный метод получает экземпляр автоматически, явный аргумент заполняет delta."
          ],
          "solutionExplanation": [
            "Связанный метод получает экземпляр автоматически, явный аргумент заполняет delta."
          ],
          "required": true,
          "answer": [
            "1"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Python передаёт экземпляр counter при вызове метода через точку."
            },
            {
              "id": "2",
              "text": "Нужно явно передать counter вместо 2."
            },
            {
              "id": "3",
              "text": "self автоматически становится числом 2."
            }
          ]
        }
      ]
    },
    {
      "id": "oop-independence",
      "title": "Независимые списки экземпляров",
      "goal": "Избегать общей изменяемой коллекции и возвращать безопасные снимки.",
      "prerequisites": [
        "oop-methods"
      ],
      "role": "lesson",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "oop-independence-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Список в теле класса принадлежит классу, а не каждому экземпляру. Если написать class Basket:items=[], а в методе self.items.append(...), поиск найдёт общий список. Две корзины начнут смешивать товары. Чтобы создавать независимые коллекции, выполняй self.items=[] внутри __init__: эта строка выполняется для каждого нового экземпляра.",
            "Другая ловушка — список по умолчанию в __init__. Правило def __init__(self, items=[]): не меняется оттого, что функция называется инициализатором:default создаётся один раз. Используй None и новый список в теле. Если переданный список по контракту нужно сохранить от изменений, создай копию. Но если копия поверхностная, вложенные объекты могут по-прежнему быть общими. В задачах этого урока элементы — неизменяемые строки или числа."
          ],
          "examples": [
            {
              "id": "oop-independence-example-1",
              "title": "Общий список класса — ошибка корзины",
              "code": "class BadBasket:\n    items=[]\n    def add(self,item):\n        self.items.append(item)\n\na=BadBasket()\nb=BadBasket()\na.add(\"чай\")\nprint(b.items)",
              "output": "['чай']\n",
              "explanation": "b видит товар a, потомучто self.items нашёл общий атрибут класса."
            }
          ],
          "goal": "Избегать общей изменяемой коллекции и возвращать безопасные снимки. Задача и устройство.",
          "prerequisites": [
            "oop-methods"
          ]
        },
        {
          "id": "oop-independence-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Метод snapshot возвращает снимок состояния. Если вернуть self.items напрямую, вызывающий код сможет изменить корзину через полученный список. Если обещан независимый снимок, верни self.items.copy(). После этого новое append в корзине не изменит старый снимок. Такой контракт проверяют в обоих направлениях: меняют результат и смотрят объект, затем меняют объект и смотрят ранний результат.",
            "Список задач может хранить активные названия и помечать завершение удалением первого совпадения. Но сначала объяви смысл повторов: в нашей малой модели повторные названия разрешены,complete удаляет только одно. Если нужны устойчивые идентификаторы или история изменений, одного названия недостаточно. Пока цель — понять самостоятельное состояние каждого экземпляра, а не строить полную систему управления проектами."
          ],
          "examples": [
            {
              "id": "oop-independence-example-2",
              "title": "Список создаётся на каждый вызов",
              "code": "class Basket:\n    def __init__(self):\n        self.items=[]\n\na=Basket()\nb=Basket()\na.items.append(\"чай\")\nprint(b.items)",
              "output": "[]\n",
              "explanation": "Присваивание в __init__ создало два разных списка."
            }
          ],
          "goal": "Избегать общей изменяемой коллекции и возвращать безопасные снимки. Порядок выполнения.",
          "prerequisites": [
            "oop-independence-step-1"
          ]
        },
        {
          "id": "oop-independence-step-3",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Проверка одного объекта недостаточна. Создай две корзины, добавь разное в первую и вторую, сравни списки. Отдельно сохрани переданный список и возвращённый снимок. Эти наблюдения ловят ошибки, которые невидны по одному методу add. После темы можешь объяснить, где создан каждый список и какие имена имеют к нему доступ."
          ],
          "examples": [
            {
              "id": "oop-independence-example-3",
              "title": "Снимок отделён от источника",
              "code": "items=[\"чай\"]\nsnapshot=items.copy()\nitems.append(\"хлеб\")\nprint(snapshot)\nprint(items)",
              "output": "['чай']\n['чай', 'хлеб']\n",
              "explanation": "Снимок сохраняет прошлое состояние для неизменяемых элементов."
            }
          ],
          "goal": "Избегать общей изменяемой коллекции и возвращать безопасные снимки. Применение и ошибки.",
          "prerequisites": [
            "oop-independence-step-2"
          ]
        }
      ],
      "exercises": [
        {
          "id": "oop-independence-task-1",
          "kind": "code",
          "title": "Корзины не смешивают товары",
          "goal": "Корзины не смешивают товары",
          "prerequisites": [
            "oop-independence"
          ],
          "prompt": "Метод add(item) добавляет строку в собственный список items и возвращает None. snapshot() возвращает новую копию items. Разные Basket независимы.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "list((lambda a,b:(a.add('чай'),a.items,b.items)[1:])(Basket(),Basket()))"
              ],
              "output": "[['чай'], []]",
              "explanation": "Независимые корзины."
            },
            {
              "input": [
                "list((lambda a:(a.add('x'),a.snapshot().append('hack'),a.items)[2])(Basket()))"
              ],
              "output": "['x']",
              "explanation": "Изменение снимка не меняет корзину."
            }
          ],
          "initialCode": "class Basket:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "list((lambda a,b:(a.add('чай'),a.items,b.items)[1:])(Basket(),Basket()))",
              "expectedValue": [
                [
                  "чай"
                ],
                []
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Независимые корзины."
            },
            {
              "expression": "list((lambda a:(a.add('x'),a.snapshot().append('hack'),a.items)[2])(Basket()))",
              "expectedValue": [
                "x"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Изменение снимка не меняет корзину."
            },
            {
              "expression": "list((lambda a:(a.add('x'),a.add('x'),a.snapshot())[2])(Basket()))",
              "expectedValue": [
                "x",
                "x"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Повторные позиции сохраняются."
            },
            {
              "expression": "(lambda b:(b.snapshot().append('outside'),b.items)[1])(Basket())",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой снимок тоже независим от корзины."
            },
            {
              "expression": "(lambda b:(lambda snapshot:(b.add('new'),snapshot)[1])(b.snapshot()))(Basket())",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Старый пустой снимок не меняется после добавления товара."
            },
            {
              "expression": "(lambda obj:[obj.add('x'),obj.items])(Basket())",
              "expectedValue": [
                null,
                [
                  "x"
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "add меняет корзину и возвращает именно None."
            }
          ],
          "reference": "class Basket:\n    def __init__(self):\n        self.items=[]\n    def add(self,item):\n        self.items.append(item)\n    def snapshot(self):\n        return self.items.copy()",
          "alternative": "class Basket:\n    def __init__(self):\n        self.items=list()\n    def add(self,item):\n        self.items.extend([item])\n        return None\n    def snapshot(self):\n        return list(self.items)",
          "wrongSolutions": [
            {
              "code": "class Basket:\n    items=[]\n    def add(self,item):\n        self.items.append(item)\n    def snapshot(self):\n        return self.items.copy()",
              "why": "Общий список класса смешивает корзины."
            },
            {
              "code": "class Basket:\n    def __init__(self):\n        self.items=[]\n    def add(self,item):\n        self.items.append(item)\n    def snapshot(self):\n        return self.items",
              "why": "Снимок возвращает общую ссылку."
            },
            {
              "code": "class Basket:\n    def __init__(self):\n        self.items=[]\n    def add(self,item):\n        self.items.append(item)\n        return True\n    def snapshot(self):\n        return self.items.copy()",
              "why": "Состояние изменено правильно, но метод возвращает True вместо обещанного None."
            }
          ],
          "hints": [
            "Создание списка должно происходить для каждого экземпляра.",
            "Снимок требует ещё одного нового списка.",
            "self.items=[] в __init__,copy в snapshot."
          ],
          "solutionExplanation": [
            "Независимость экземпляра и независимость снимка — две отдельные проверки.",
            "append не должен возвращать список по этому контракту."
          ],
          "required": true
        },
        {
          "id": "oop-independence-task-2",
          "kind": "code",
          "title": "Начальные записи без общей ссылки",
          "goal": "Начальные записи без общей ссылки",
          "prerequisites": [
            "oop-independence"
          ],
          "prompt": "History(values=None) создаёт собственный список чисел: копию переданного или новый пустой при None. Метод append(value) добавляет число и возвращает None. Не изменяй исходный список и не сохраняй его как общий объект.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "list((lambda source:(lambda h:(h.append(3),source,h.values)[1:])(History(source)))([1,2]))"
              ],
              "output": "[[1, 2], [1, 2, 3]]",
              "explanation": "Вход скопирован."
            },
            {
              "input": [
                "list((lambda a,b:(a.append(9),b.values)[1])(History(),History()))"
              ],
              "output": "[]",
              "explanation": "Default независим."
            }
          ],
          "initialCode": "class History:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "list((lambda source:(lambda h:(h.append(3),source,h.values)[1:])(History(source)))([1,2]))",
              "expectedValue": [
                [
                  1,
                  2
                ],
                [
                  1,
                  2,
                  3
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Вход скопирован."
            },
            {
              "expression": "list((lambda a,b:(a.append(9),b.values)[1])(History(),History()))",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Default независим."
            },
            {
              "expression": "History([]).values",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Явный пустой вход."
            },
            {
              "expression": "(lambda source:(lambda h:(h.append(1),source)[1])(History(source)))([])",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Явный пустой исходный список тоже не разделяет изменения."
            },
            {
              "expression": "(lambda obj:[obj.append(2),obj.values])(History([1]))",
              "expectedValue": [
                null,
                [
                  1,
                  2
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "append меняет историю и возвращает именно None."
            }
          ],
          "reference": "class History:\n    def __init__(self,values=None):\n        self.values=[] if values is None else values.copy()\n    def append(self,value):\n        self.values.append(value)",
          "alternative": "class History:\n    def __init__(self,values=None):\n        self.values=list(values) if values is not None else list()\n    def append(self,value):\n        self.values.extend([value])\n        return None",
          "wrongSolutions": [
            {
              "code": "class History:\n    def __init__(self,values=[]):\n        self.values=values\n    def append(self,value):\n        self.values.append(value)",
              "why": "Общий default и переданный список не разделены."
            },
            {
              "code": "class History:\n    def __init__(self,values=None):\n        self.values=[]\n    def append(self,value):\n        self.values.append(value)",
              "why": "Начальные записи игнорируются."
            },
            {
              "code": "class History:\n    def __init__(self,values=None):\n        self.values=[] if values is None else values.copy()\n    def append(self,value):\n        self.values.append(value)\n        return True",
              "why": "Состояние изменено правильно, но метод возвращает True вместо обещанного None."
            }
          ],
          "hints": [
            "Новый список нужен и при None, и пригото вом списке.",
            "Разрешена поверхностная копия числовых значений.",
            "Создай values.copy() только когда аргумент не None."
          ],
          "solutionExplanation": [
            "Копия защищает вызывающий код от изменений объекта.",
            "Два вызова без аргументов не хранят общую историю."
          ],
          "required": true
        },
        {
          "id": "oop-independence-task-3",
          "kind": "code",
          "title": "Завершение одного повторного дела",
          "goal": "Завершение одного повторного дела",
          "prerequisites": [
            "oop-independence"
          ],
          "prompt": "TodoList имеет собственный список строк tasks. add(text) добавляет запись и возвращает None. complete(text) удаляет ровно первое совпадение и возвращает True; если записи нет, возвращает False без изменения.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "list((lambda t:(t.add('a'),t.add('a'),t.complete('a'),t.tasks)[2:])(TodoList()))"
              ],
              "output": "[True, ['a']]",
              "explanation": "Удалено только одно совпадение."
            },
            {
              "input": [
                "list((lambda t:[t.complete('x'),t.tasks])(TodoList()))"
              ],
              "output": "[False, []]",
              "explanation": "Отсутствие не ломает состояние."
            }
          ],
          "initialCode": "class TodoList:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "list((lambda t:(t.add('a'),t.add('a'),t.complete('a'),t.tasks)[2:])(TodoList()))",
              "expectedValue": [
                true,
                [
                  "a"
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Удалено только одно совпадение."
            },
            {
              "expression": "list((lambda t:[t.complete('x'),t.tasks])(TodoList()))",
              "expectedValue": [
                false,
                []
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Отсутствие не ломает состояние."
            },
            {
              "expression": "list((lambda a,b:(a.add('x'),b.tasks)[1])(TodoList(),TodoList()))",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Независимость."
            },
            {
              "expression": "(lambda obj:[obj.add('x'),obj.tasks])(TodoList())",
              "expectedValue": [
                null,
                [
                  "x"
                ]
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "add меняет список дел и возвращает именно None."
            }
          ],
          "reference": "class TodoList:\n    def __init__(self):\n        self.tasks=[]\n    def add(self,text):\n        self.tasks.append(text)\n    def complete(self,text):\n        if text not in self.tasks:\n            return False\n        self.tasks.remove(text)\n        return True",
          "alternative": "class TodoList:\n    def __init__(self):\n        self.tasks=list()\n    def add(self,text):\n        self.tasks+= [text]\n    def complete(self,text):\n        for i,value in enumerate(self.tasks):\n            if value==text:\n                del self.tasks[i]\n                return True\n        return False",
          "wrongSolutions": [
            {
              "code": "class TodoList:\n    tasks=[]\n    def add(self,text):\n        self.tasks.append(text)\n    def complete(self,text):\n        if text not in self.tasks:return False\n        self.tasks.remove(text)\n        return True",
              "why": "Общий список смешивает задачи разных объектов."
            },
            {
              "code": "class TodoList:\n    def __init__(self):self.tasks=[]\n    def add(self,text):self.tasks.append(text)\n    def complete(self,text):\n        found=text in self.tasks\n        self.tasks=[t for t in self.tasks if t!=text]\n        return found",
              "why": "Удалены все повторы вместо одного."
            },
            {
              "code": "class TodoList:\n    def __init__(self):\n        self.tasks=[]\n    def add(self,text):\n        self.tasks.append(text)\n        return True\n    def complete(self,text):\n        if text not in self.tasks:\n            return False\n        self.tasks.remove(text)\n        return True",
              "why": "Состояние изменено правильно, но метод возвращает True вместо обещанного None."
            }
          ],
          "hints": [
            "Повторные названия разрешены.",
            "remove удаляет первое, но требует проверки наличия.",
            "Если нет text, верни False до попытки удаления."
          ],
          "solutionExplanation": [
            "Контракт точно говорит, что означает завершение.",
            "Состояние изменяется только при успешном действии."
          ],
          "required": true
        },
        {
          "id": "oop-independence-task-4",
          "kind": "choice",
          "title": "Где создавать список?",
          "goal": "Где создавать список?",
          "prerequisites": [
            "oop-independence"
          ],
          "prompt": "Чтобы у каждой корзины был собственный список, где выполнять []?",
          "inputFormat": "Прочитай условие и выбери ответ.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "class BadBasket:\n    items=[]\n    def add(self,item):\n        self.items.append(item)\n\na=BadBasket()\nb=BadBasket()\na.add(\"чай\")\nprint(b.items)"
              ],
              "output": "['чай']\n",
              "explanation": "b видит товар a, потомучто self.items нашёл общий атрибут класса."
            }
          ],
          "hints": [
            "Вспомни правило из урока «Независимые списки экземпляров» и проверь каждый вариант на конкретном примере.",
            "Сначала исключи варианты, противоречащие наблюдаемому выполнению. Список класса общий, если его явно не переопределить.",
            "Проверь основной аргумент: Тело инициализатора выполняется для каждого нового экземпляра."
          ],
          "solutionExplanation": [
            "Тело инициализатора выполняется для каждого нового экземпляра.",
            "Список класса общий, если его явно не переопределить."
          ],
          "required": true,
          "answer": [
            "1"
          ],
          "choices": [
            {
              "id": "1",
              "text": "В self.items=[] внутри__init__."
            },
            {
              "id": "2",
              "text": "Один раз items=[] в теле класса."
            },
            {
              "id": "3",
              "text": "Только в print после завершения программы."
            }
          ]
        }
      ]
    },
    {
      "id": "oop-class-attributes",
      "title": "Атрибуты класса и экземпляра",
      "goal": "Осознанно отделять общую настройку от индивидуального состояния.",
      "prerequisites": [
        "oop-independence"
      ],
      "role": "lesson",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "oop-class-attributes-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Ранее общий список класса оказался ошибкой, но общие атрибуты сами по себе полезны. Например, класс товара может иметь стандартный сбор fee=5, а каждый экземпляр — свою цену price. При чтении item.fee Python ищет значение по правилам доступа к атрибутам; в простом случае индивидуальное значение имеет приоритет над обычным атрибутом класса. Если индивидуального значения нет, экземпляр видит общую настройку.",
            "Присваивание item.fee=7 создаёт индивидуальное значение у данного объекту. Другие товары продолжат использовать общую настройку. Присваивание Item.fee=9 изменит значение класса и отразится на экземплярах, у которых нет собственного переопределения. Поэтому копировать fee из класса в self.fee в __init__ не всегда эквивалентно: так экземпляр навсегда регистрирует снимок, вместо живого чтения общей настройки."
          ],
          "examples": [
            {
              "id": "oop-class-attributes-example-1",
              "title": "Индивидуальное перекрывает общее",
              "code": "class Badge:\n    color=\"зелёный\"\n\na=Badge()\nb=Badge()\na.color=\"синий\"\nBadge.color=\"белый\"\nprint(a.color,b.color)",
              "output": "синий белый\n",
              "explanation": "a имеет свой color,b продолжает читать класс."
            }
          ],
          "goal": "Осознанно отделять общую настройку от индивидуального состояния. Задача и устройство.",
          "prerequisites": [
            "oop-independence"
          ]
        },
        {
          "id": "oop-class-attributes-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Для общего числа созданных объектов можно хранить created на классе и прибавлять в __init__. В важной разнице с self.created+=1 сначала читается общее 0, а потом присваивание пишет индивидуальный атрибут. Счётчик класса при этом не увеличится. Если нужен общий счётчик, явно изменяй Tracker.created. Для наследников существуют дополнительные правила выбора класса, но эта короткая задача пока касается одного типа.",
            "Неизменяемое значение класса обычно удобно для default, но изменяемый список остаётся одним объектом. Нельзя объявить items=[] в классе и надеяться, что простое self.items.append создаст индивидуальную копию. Метод не присваивает self.items новую ссылку, а изменяет уже найденный список. Разбор этого отличия поможет объяснить, почему ошибка с общими элементами независима от наличия self в строке."
          ],
          "examples": [
            {
              "id": "oop-class-attributes-example-2",
              "title": "self не делает изменение общим",
              "code": "class Tracker:\n    created=0\n    def __init__(self):\n        Tracker.created+=1\n\nTracker()\nTracker()\nprint(Tracker.created)",
              "output": "2\n",
              "explanation": "Изменение явно принадлежит классу и учитывает оба объекта."
            }
          ],
          "goal": "Осознанно отделять общую настройку от индивидуального состояния. Порядок выполнения.",
          "prerequisites": [
            "oop-class-attributes-step-1"
          ]
        },
        {
          "id": "oop-class-attributes-step-3",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Проверяй сценарии в таком порядке: создай два экземпляра, измени настройку одного, измени настройку класса, прочитай оба. Явно назови, кому принадлежит каждое значение. Если поведение проекта требует постоянный снимок настройки, этот контракт тоже допустим; но его надо писать. Сегодня задачи сознательно проверяют живую общую настройку и индивидуальное переопределение."
          ],
          "examples": [
            {
              "id": "oop-class-attributes-example-3",
              "title": "Неживая копия настройки",
              "code": "class Item:\n    fee=5\n    def __init__(self):\n        self.saved_fee=Item.fee\n\nx=Item()\nItem.fee=9\nprint(x.saved_fee,x.fee)",
              "output": "5 9\n",
              "explanation": "saved_fee хранит снимок 5, а x.fee видит новое 9."
            }
          ],
          "goal": "Осознанно отделять общую настройку от индивидуального состояния. Применение и ошибки.",
          "prerequisites": [
            "oop-class-attributes-step-2"
          ]
        }
      ],
      "exercises": [
        {
          "id": "oop-class-attributes-task-1",
          "kind": "code",
          "title": "Живая общая надбавка",
          "goal": "Живая общая надбавка",
          "prerequisites": [
            "oop-class-attributes"
          ],
          "prompt": "Item.fee=5, каждый экземпляр хранит price. total() возвращает price+self.fee. Общая настройка может изменяться после создания, экземпляр может переопределить fee.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "Item(10).total()"
              ],
              "output": "15",
              "explanation": "Исходная общая надбавка."
            },
            {
              "input": [
                "(lambda item:(setattr(Item,'fee',9),item.total())[1])(Item(10))"
              ],
              "output": "19",
              "explanation": "Общая настройка меняется после создания."
            }
          ],
          "initialCode": "class Item:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "Item(10).total()",
              "expectedValue": 15,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Исходная общая надбавка."
            },
            {
              "expression": "(lambda item:(setattr(Item,'fee',9),item.total())[1])(Item(10))",
              "expectedValue": 19,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Общая настройка меняется после создания."
            },
            {
              "expression": "list((lambda a,b:(setattr(a,'fee',1),[a.total(),b.total()])[1])(Item(10),Item(20)))",
              "expectedValue": [
                11,
                25
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Индивидуальное перекрытие."
            },
            {
              "expression": "(lambda a,b:[a.price,b.price,a.fee,b.fee,a.total(),b.total()])(Item(0),Item(7))",
              "expectedValue": [
                0,
                7,
                5,
                5,
                5,
                12
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Цена — публичное собственное значение; надбавка намеренно общая настройка класса."
            }
          ],
          "reference": "class Item:\n    fee=5\n    def __init__(self,price):\n        self.price=price\n    def total(self):\n        return self.price+self.fee",
          "alternative": "class Item:\n    fee=5\n    def __init__(self,price):\n        self.price=price\n    def total(self):\n        result=self.price\n        result+=getattr(self,\"fee\")\n        return result",
          "wrongSolutions": [
            {
              "code": "class Item:\n    fee=5\n    def __init__(self,price):\n        self.price=price\n        self.fee=Item.fee\n    def total(self):return self.price+self.fee",
              "why": "Снимок потерял живую общую настройку."
            },
            {
              "code": "class Item:\n    fee=5\n    def __init__(self,price):self.price=price\n    def total(self):return self.price+Item.fee",
              "why": "Чтение класса вместо self игнорирует индивидуальную надбавку."
            },
            {
              "code": "class Item:\n    fee=5\n    def __init__(self,price):\n        self._price=price\n    def total(self):\n        return self._price+self.fee",
              "why": "Метод считает верно, но обещанный публичный атрибут price отсутствует."
            }
          ],
          "hints": [
            "Надбавка не должна обязательно копироваться в __init__.",
            "total читает атрибут через экземпляр.",
            "Используй self.fee, оставив fee=5 в классе."
          ],
          "solutionExplanation": [
            "Такое устройство поддерживает оба объявленных уровня настройки.",
            "Тесты различают живую ссылку и снимок."
          ],
          "required": true
        },
        {
          "id": "oop-class-attributes-task-2",
          "kind": "code",
          "title": "Цвет значка с переопределением",
          "goal": "Цвет значка с переопределением",
          "prerequisites": [
            "oop-class-attributes"
          ],
          "prompt": "Badge.color=\"зелёный\". set_color(color) задаёт цвет текущему экземпляру и возвращает None. Не назначай self.color в __init__: не переопределённые экземпляры видят изменения Badge.color.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "list((lambda a,b:(a.set_color('синий'),setattr(Badge,'color','белый'),[a.color,b.color])[2])(Badge(),Badge()))"
              ],
              "output": "['синий', 'белый']",
              "explanation": "Два уровня настройки."
            },
            {
              "input": [
                "Badge.color"
              ],
              "output": "'зелёный'",
              "explanation": "Исходная настройка класса."
            }
          ],
          "initialCode": "class Badge:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "list((lambda a,b:(a.set_color('синий'),setattr(Badge,'color','белый'),[a.color,b.color])[2])(Badge(),Badge()))",
              "expectedValue": [
                "синий",
                "белый"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Два уровня настройки."
            },
            {
              "expression": "Badge.color",
              "expectedValue": "зелёный",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Исходная настройка класса."
            },
            {
              "expression": "(lambda obj:[obj.set_color('синий'),obj.color])(Badge())",
              "expectedValue": [
                null,
                "синий"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "set_color возвращает None отдельно от изменённого цвета."
            }
          ],
          "reference": "class Badge:\n    color=\"зелёный\"\n    def set_color(self,color):\n        self.color=color",
          "alternative": "class Badge:\n    color=\"зелёный\"\n    def set_color(self,color):\n        setattr(self,\"color\",color)\n        return None",
          "wrongSolutions": [
            {
              "code": "class Badge:\n    color=\"зелёный\"\n    def set_color(self,color):\n        Badge.color=color",
              "why": "Изменён цвет всех значков."
            },
            {
              "code": "class Badge:\n    color=\"зелёный\"\n    def __init__(self):self.color=Badge.color\n    def set_color(self,color):self.color=color",
              "why": "Все экземпляры заморозили общую настройку на создании."
            },
            {
              "code": "class Badge:\n    color=\"зелёный\"\n    def set_color(self,color):\n        self.color=color\n        return True",
              "why": "Состояние изменено правильно, но метод возвращает True вместо обещанного None."
            }
          ],
          "hints": [
            "Метод изменяет конкретный экземпляр.",
            "Отсутствие индивидуального цвета оставляет поиск в классе.",
            "Присвой self.color=color только в set_color."
          ],
          "solutionExplanation": [
            "Общая настройка и индивидуальный выбор не перезаписывают другдруга.",
            "Пустой __init__ здесь необязателен."
          ],
          "required": true
        },
        {
          "id": "oop-class-attributes-task-3",
          "kind": "code",
          "title": "Сколько объектов создано",
          "goal": "Сколько объектов создано",
          "prerequisites": [
            "oop-class-attributes"
          ],
          "prompt": "Tracker.created начинается с 0. Каждый новый Tracker увеличивает общий created на 1. У экземпляра нет отдельного счётчика.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "Tracker.created"
              ],
              "output": "0",
              "explanation": "До создания счётчик нулевой."
            },
            {
              "input": [
                "(lambda a,b:Tracker.created)(Tracker(),Tracker())"
              ],
              "output": "2",
              "explanation": "Два создания."
            }
          ],
          "initialCode": "class Tracker:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "Tracker.created",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "До создания счётчик нулевой."
            },
            {
              "expression": "(lambda a,b:Tracker.created)(Tracker(),Tracker())",
              "expectedValue": 2,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Два создания."
            },
            {
              "expression": "list((lambda a,b:(a.created,b.created,Tracker.created))(Tracker(),Tracker()))",
              "expectedValue": [
                2,
                2,
                2
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Экземпляры читают общее актуальное значение."
            }
          ],
          "reference": "class Tracker:\n    created=0\n    def __init__(self):\n        Tracker.created+=1",
          "alternative": "class Tracker:\n    created=0\n    def __init__(self):\n        value=Tracker.created\n        setattr(Tracker,\"created\",value+1)",
          "wrongSolutions": [
            {
              "code": "class Tracker:\n    created=0\n    def __init__(self):\n        self.created+=1",
              "why": "Созданы индивидуальные счётчики, класс остался 0."
            },
            {
              "code": "class Tracker:\n    created=0\n    def __init__(self):\n        Tracker.created=1",
              "why": "Общий счётчик сбрасывается при каждом создании."
            }
          ],
          "hints": [
            "Состояние принадлежит классу, а не отдельному self.",
            "Не перезаписывай накопление единицей.",
            "Прибавляй 1 к Tracker.created."
          ],
          "solutionExplanation": [
            "Общий счётчик намеренный, в отличие от общей корзины.",
            "Несколько созданий в одной проверке отличают сумму от константы."
          ],
          "required": true
        },
        {
          "id": "oop-class-attributes-task-4",
          "kind": "explain",
          "title": "Чем опасно self.count+=1?",
          "goal": "Чем опасно self.count+=1?",
          "prerequisites": [
            "oop-class-attributes"
          ],
          "prompt": "Если count есть только в классе, что делает self.count+=1 в простом случае?",
          "inputFormat": "Прочитай условие и выбери ответ.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "class Badge:\n    color=\"зелёный\"\n\na=Badge()\nb=Badge()\na.color=\"синий\"\nBadge.color=\"белый\"\nprint(a.color,b.color)"
              ],
              "output": "синий белый\n",
              "explanation": "a имеет свой color,b продолжает читать класс."
            }
          ],
          "hints": [
            "Вспомни правило из урока «Атрибуты класса и экземпляра» и проверь каждый вариант на конкретном примере.",
            "Сначала исключи варианты, противоречащие наблюдаемому выполнению. Составное присваивание атрибуту завершается записью в self, а необязательно в класс.",
            "Проверь основной аргумент: Составное присваивание атрибуту завершается записью в self, а необязательно в класс."
          ],
          "solutionExplanation": [
            "Составное присваивание атрибуту завершается записью в self, а необязательно в класс."
          ],
          "required": true,
          "answer": [
            "1"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Читает найденное значение, затем создаёт индивидуальный атрибут с новым числом."
            },
            {
              "id": "2",
              "text": "Всегда изменяет сам класс."
            },
            {
              "id": "3",
              "text": "Автоматически создаёт новый класс."
            }
          ]
        }
      ]
    },
    {
      "id": "oop-composition",
      "title": "Композиция: объект внутри объекта",
      "goal": "Связывать разные роли через явно переданные объекты.",
      "prerequisites": [
        "oop-class-attributes"
      ],
      "role": "lesson",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "oop-composition-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Корзина может содержать товар, а плейлист — треки. Это отношение\"содержит\", а не необходимо наследование\"является\". Композиция означает, что один объект хранит ссылку на другой и использует его публичный интерфейс. В Item(product,quantity) параметр product уже готовый объект Product, а Item сохраняет его, необязательно копируя все его атрибуты. Такая связь позволяет разделить ответственность.",
            "Если цена товара изменилась, строка корзины, хранящая объект, может увидеть новую цену. Если сохранить числовой снимок price в момент создания, получится другой контракт. Оба поведения допустимы в разных продуктах: счёт часто фиксирует цену, а предпросмотр корзины читает актуальную. В наших задачах явно сказано, когда хранится сам объект, а когда нужна копия. Не объявляй композицию автоматической глубокой копией."
          ],
          "examples": [
            {
              "id": "oop-composition-example-1",
              "title": "Строка корзины хранит товар",
              "code": "class Product:\n    def __init__(self,price):self.price=price\nclass Line:\n    def __init__(self,product,quantity):\n        self.product=product\n        self.quantity=quantity\n    def total(self):return self.product.price*self.quantity\n\np=Product(10)\nline=Line(p,2)\np.price=12\nprint(line.total())",
              "output": "24\n",
              "explanation": "line видит текущую цену product, потому что хранит объект."
            }
          ],
          "goal": "Связывать разные роли через явно переданные объекты. Задача и устройство.",
          "prerequisites": [
            "oop-class-attributes"
          ]
        },
        {
          "id": "oop-composition-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Делегирование означает вызов метода вложенного объекта. Dashboard может получить Counter и вызвать counter.add(delta), а не хранить ещё один рассинхронизированный счётчик. Это не экономия двух строк ради абстракции: у каждой роли свой договорённый источник истины. Проверка заменит или изменит вложенный объект и проверит, что обёртка действительно пользуется им.",
            "Контейнер объектов требует отдельного выбора ссылок. Playlist может скопировать список треков, но оставить сами треки общими. Тогда append в исходный список не повлияет на состав плейлиста, а изменение seconds уже включённого трека повлияет на длительность. Это поверхностное копирование, которое мы уже изучили на обычных списках. Здесь нужно проверить обе стороны такого контракта."
          ],
          "examples": [
            {
              "id": "oop-composition-example-2",
              "title": "Список копируется, элементы остаются общими",
              "code": "class Track:\n    def __init__(self,seconds):self.seconds=seconds\n\ntrack=Track(30)\noriginal=[track]\ncopy=original.copy()\noriginal.append(Track(10))\ntrack.seconds=40\nprint(len(copy),copy[0].seconds)",
              "output": "1 40\n",
              "explanation": "Состав copy независим, включённый track остаётся общим объектом."
            }
          ],
          "goal": "Связывать разные роли через явно переданные объекты. Порядок выполнения.",
          "prerequisites": [
            "oop-composition-step-1"
          ]
        },
        {
          "id": "oop-composition-step-3",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Проверяй пустой контейнер, несколько объектов, изменение вложенного состояния и независимость состава контейнера. В разборе объясни, кто хранит данные и кто выполняет вычисление. Следующий урок добавит наследование, но композиция останется простым решением для отношений\"имеет\"и\"содержит\". Не стоит заменять её наследованием только потому, что оба объекта имеют общую тему."
          ],
          "examples": [],
          "goal": "Связывать разные роли через явно переданные объекты. Применение и ошибки.",
          "prerequisites": [
            "oop-composition-step-2"
          ]
        }
      ],
      "exercises": [
        {
          "id": "oop-composition-task-1",
          "kind": "code",
          "title": "Товар и строка корзины",
          "goal": "Товар и строка корзины",
          "prerequisites": [
            "oop-composition"
          ],
          "prompt": "Product(price) хранит атрибут price. CartLine(product, quantity) хранит исходный объект Product и целое quantity>=0. total() каждый раз возвращает текущую product.price*quantity.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "CartLine(Product(7),3).total()"
              ],
              "output": "21",
              "explanation": "Цена умножается на количество."
            },
            {
              "input": [
                "(lambda p:(lambda line:(setattr(p,'price',9),line.total())[1])(CartLine(p,2)))(Product(7))"
              ],
              "output": "18",
              "explanation": "Текущая цена, не снимок."
            }
          ],
          "initialCode": "# Реализуй Product и CartLine",
          "tests": [
            {
              "expression": "CartLine(Product(7),3).total()",
              "expectedValue": 21,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Цена умножается на количество."
            },
            {
              "expression": "(lambda p:(lambda line:(setattr(p,'price',9),line.total())[1])(CartLine(p,2)))(Product(7))",
              "expectedValue": 18,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Текущая цена, не снимок."
            },
            {
              "expression": "CartLine(Product(5),0).total()",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевая позиция."
            },
            {
              "expression": "(lambda first,second:(lambda a,b:[first.price,second.price,a.total(),b.total(),a.product is first,b.product is second])(CartLine(first,2),CartLine(second,3)))(Product(7),Product(11))",
              "expectedValue": [
                7,
                11,
                14,
                33,
                true,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Два товара с разными ценами сохраняются одновременно; строки корзины читают свои исходные объекты."
            },
            {
              "expression": "(lambda a,b:[a.quantity,b.quantity,a.product.price,b.product.price,a.total(),b.total()])(CartLine(Product(2),3),CartLine(Product(7),0))",
              "expectedValue": [
                3,
                0,
                2,
                7,
                6,
                0
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Публичные product и quantity сохраняют разные данные двух строк корзины, включая нулевое количество."
            }
          ],
          "reference": "class Product:\n    def __init__(self,price):self.price=price\nclass CartLine:\n    def __init__(self,product,quantity):\n        self.product=product\n        self.quantity=quantity\n    def total(self):\n        return self.product.price*self.quantity",
          "alternative": "class Product:\n    def __init__(self,price):self.price=price\nclass CartLine:\n    def __init__(self,product,quantity):\n        self.product,self.quantity=product,quantity\n    def total(self):\n        price=self.product.price\n        return sum(price for _ in range(self.quantity))",
          "wrongSolutions": [
            {
              "code": "class Product:\n    def __init__(self,price):self.price=price\nclass CartLine:\n    def __init__(self,product,quantity):self.price=product.price;self.quantity=quantity\n    def total(self):return self.price*self.quantity",
              "why": "Цена заморожена, а связь с Product потеряна."
            },
            {
              "code": "class Product:\n    def __init__(self,price):self.price=price\nclass CartLine:\n    def __init__(self,product,quantity):self.product=product;self.quantity=quantity\n    def total(self):return self.product.price",
              "why": "Количество проигнорировано."
            },
            {
              "code": "class Product:\n    def __init__(self,price):\n        Product.price=price\nclass CartLine:\n    def __init__(self,product,quantity):\n        self.product=product\n        self.quantity=quantity\n    def total(self):\n        return self.product.price*self.quantity",
              "why": "Цена ошибочно принадлежит классу Product, поэтому второй товар меняет цену первого и стоимость его строки корзины."
            },
            {
              "code": "class Product:\n    def __init__(self,price):self.price=price\nclass CartLine:\n    def __init__(self,product,quantity):\n        self.product=product\n        self._quantity=quantity\n    def total(self):\n        return self.product.price*self._quantity",
              "why": "Вычисление корректно, но отсутствует объявленный публичный атрибут quantity."
            }
          ],
          "hints": [
            "В строке хранится сам product, а не его цена.",
            "total читает цену при вызове.",
            "Верни self.product.price*self.quantity."
          ],
          "solutionExplanation": [
            "Проверка изменяет товар после создания строки.",
            "Конкретное отношение объектов объявлено контрактом."
          ],
          "required": true
        },
        {
          "id": "oop-composition-task-2",
          "kind": "code",
          "title": "Обёртка делегирует счётчику",
          "goal": "Обёртка делегирует счётчику",
          "prerequisites": [
            "oop-composition"
          ],
          "prompt": "Counter(start=0) хранит value, а add(delta) меняет и возвращает value. Dashboard(counter) хранит переданный объект. track(delta) вызывает его add и возвращает полученный ответ. current() читает текущее value. Публичный атрибут Dashboard.counter должен ссылаться на исходный счётчик.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "list((lambda c:(lambda d:[d.track(3),c.value,d.current()])(Dashboard(c)))(Counter(2)))"
              ],
              "output": "[5, 5, 5]",
              "explanation": "Один источник состояния."
            },
            {
              "input": [
                "(lambda c:(lambda d:(c.add(7),d.current())[1])(Dashboard(c)))(Counter())"
              ],
              "output": "7",
              "explanation": "Внешнее изменение видно обёртке."
            }
          ],
          "initialCode": "# Реализуй Counter и Dashboard",
          "tests": [
            {
              "expression": "list((lambda c:(lambda d:[d.track(3),c.value,d.current()])(Dashboard(c)))(Counter(2)))",
              "expectedValue": [
                5,
                5,
                5
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Один источник состояния."
            },
            {
              "expression": "(lambda c:(lambda d:(c.add(7),d.current())[1])(Dashboard(c)))(Counter())",
              "expectedValue": 7,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Внешнее изменение видно обёртке."
            },
            {
              "expression": "(lambda c:(lambda d:(setattr(c,'add',lambda delta:900+delta),d.track(3))[1])(Dashboard(c)))(Counter())",
              "expectedValue": 903,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Dashboard.track действительно вызывает предоставленный метод add."
            },
            {
              "expression": "(lambda a,b:(lambda first,second:[first.counter is a,second.counter is b,a.value,b.value,first.track(1),b.value])(Dashboard(a),Dashboard(b)))(Counter(2),Counter(8))",
              "expectedValue": [
                true,
                true,
                2,
                8,
                3,
                8
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Обе обёртки сохраняют собственные ссылки на разные счётчики с разными начальными значениями."
            }
          ],
          "reference": "class Counter:\n    def __init__(self,start=0):self.value=start\n    def add(self,delta):\n        self.value+=delta\n        return self.value\nclass Dashboard:\n    def __init__(self,counter):self.counter=counter\n    def track(self,delta):return self.counter.add(delta)\n    def current(self):return self.counter.value",
          "alternative": "class Counter:\n    def __init__(self,start=0):self.value=start\n    def add(self,delta):\n        self.value=self.value+delta\n        return self.value\nclass Dashboard:\n    def __init__(self,counter):self.counter=counter\n    def track(self,delta):\n        method=self.counter.add\n        return method(delta)\n    def current(self):return getattr(self.counter,\"value\")",
          "wrongSolutions": [
            {
              "code": "class Counter:\n    def __init__(self,start=0):self.value=start\n    def add(self,delta):self.value+=delta;return self.value\nclass Dashboard:\n    def __init__(self,counter):self.counter=Counter(counter.value)\n    def track(self,delta):return self.counter.add(delta)\n    def current(self):return self.counter.value",
              "why": "Сделан второй счётчик, связь с источником потеряна."
            },
            {
              "code": "class Counter:\n    def __init__(self,start=0):self.value=start\n    def add(self,delta):self.value+=delta;return self.value\nclass Dashboard:\n    def __init__(self,counter):self.counter=counter\n    def track(self,delta):return self.counter.value+delta\n    def current(self):return self.counter.value",
              "why": "track не вызывает add и не меняет состояние."
            },
            {
              "code": "class Counter:\n    def __init__(self,start=0):Counter.value=start\n    def add(self,delta):\n        self.value+=delta\n        return self.value\nclass Dashboard:\n    def __init__(self,counter):self.counter=counter\n    def track(self,delta):return self.counter.add(delta)\n    def current(self):return self.counter.value",
              "why": "Счётчик внутри композиции тоже обязан сохранять индивидуальное начальное значение, а не записывать его в класс."
            }
          ],
          "hints": [
            "Нельзя создавать копию Counter в обёртке.",
            "Метод track делегирует действие, а не повторяет формулу.",
            "Сохрани counter и вызови self.counter.add(delta)."
          ],
          "solutionExplanation": [
            "Dashboard не имеет второго значения value.",
            "Делегирование проверяется общим состоянием."
          ],
          "required": true
        },
        {
          "id": "oop-composition-task-3",
          "kind": "code",
          "title": "Плейлист с общими треками",
          "goal": "Плейлист с общими треками",
          "prerequisites": [
            "oop-composition"
          ],
          "prompt": "Track(seconds) хранит целое seconds>=0. Playlist(tracks) копирует список, сохраняя ссылки на сами треки. total_seconds() каждый раз суммирует текущие длительности. Изменение состава входного списка не меняет состав плейлиста. Публичный атрибут tracks хранит именно новый список ссылок на треки.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "Playlist([Track(20),Track(30)]).total_seconds()"
              ],
              "output": "50",
              "explanation": "Длительности складываются."
            },
            {
              "input": [
                "(lambda track:(lambda source:(lambda p:(source.append(Track(99)),setattr(track,'seconds',7),p.total_seconds())[2])(Playlist(source)))([track]))(Track(3))"
              ],
              "output": "7",
              "explanation": "Состав скопирован, трек общий."
            }
          ],
          "initialCode": "# Реализуй Track и Playlist",
          "tests": [
            {
              "expression": "Playlist([Track(20),Track(30)]).total_seconds()",
              "expectedValue": 50,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Длительности складываются."
            },
            {
              "expression": "(lambda track:(lambda source:(lambda p:(source.append(Track(99)),setattr(track,'seconds',7),p.total_seconds())[2])(Playlist(source)))([track]))(Track(3))",
              "expectedValue": 7,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Состав скопирован, трек общий."
            },
            {
              "expression": "Playlist([]).total_seconds()",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой плейлист."
            },
            {
              "expression": "(lambda source:(lambda p:(source.append(Track(9)),p.total_seconds())[1])(Playlist(source)))([])",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Копирование состава нужно и для пустого списка."
            },
            {
              "expression": "(lambda first,second:(lambda a,b:[first.seconds,second.seconds,isinstance(a.tracks,list),isinstance(b.tracks,list),a.tracks[0] is first,b.tracks[0] is second,a.total_seconds(),b.total_seconds()])(Playlist([first]),Playlist([second])))(Track(2),Track(7))",
              "expectedValue": [
                2,
                7,
                true,
                true,
                true,
                true,
                2,
                7
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "seconds доступен у каждого трека; публичные списки tracks двух плейлистов содержат свои исходные объекты."
            }
          ],
          "reference": "class Track:\n    def __init__(self,seconds):self.seconds=seconds\nclass Playlist:\n    def __init__(self,tracks):self.tracks=tracks.copy()\n    def total_seconds(self):return sum(track.seconds for track in self.tracks)",
          "alternative": "class Track:\n    def __init__(self,seconds):self.seconds=seconds\nclass Playlist:\n    def __init__(self,tracks):self.tracks=list(tracks)\n    def total_seconds(self):\n        total=0\n        for track in self.tracks:total+=track.seconds\n        return total",
          "wrongSolutions": [
            {
              "code": "class Track:\n    def __init__(self,seconds):self.seconds=seconds\nclass Playlist:\n    def __init__(self,tracks):self.tracks=tracks\n    def total_seconds(self):return sum(t.seconds for t in self.tracks)",
              "why": "Изменение входного списка меняет состав плейлиста."
            },
            {
              "code": "class Track:\n    def __init__(self,seconds):self.seconds=seconds\nclass Playlist:\n    def __init__(self,tracks):self.seconds=sum(t.seconds for t in tracks)\n    def total_seconds(self):return self.seconds",
              "why": "Длительность заморожена и на в новое треков не смотрит."
            },
            {
              "code": "class Track:\n    def __init__(self,seconds):self.seconds=seconds\nclass Playlist:\n    def __init__(self,tracks):Playlist.tracks=tracks.copy()\n    def total_seconds(self):return sum(track.seconds for track in Playlist.tracks)",
              "why": "Список tracks ошибочно принадлежит классу, и второй плейлист меняет состав первого."
            }
          ],
          "hints": [
            "Два уровня: список ин a ходящие с я в нём объекты.",
            "Список нужно копировать, треки не нужно.",
            "Суммируй track.seconds каждый раз при вызове."
          ],
          "solutionExplanation": [
            "Поверхностная копия тут намеренно соответствует контракту.",
            "Проверка одновременно изменяет входной список и существующий трек."
          ],
          "required": true
        },
        {
          "id": "oop-composition-task-4",
          "kind": "choice",
          "title": "Композиция или наследование?",
          "goal": "Композиция или наследование?",
          "prerequisites": [
            "oop-composition"
          ],
          "prompt": "Корзина хранит объекты Product. Как точнее описать связь?",
          "inputFormat": "Прочитай условие и выбери ответ.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "class Product:\n    def __init__(self,price):self.price=price\nclass Line:\n    def __init__(self,product,quantity):\n        self.product=product\n        self.quantity=quantity\n    def total(self):return self.product.price*self.quantity\n\np=Product(10)\nline=Line(p,2)\np.price=12\nprint(line.total())"
              ],
              "output": "24\n",
              "explanation": "line видит текущую цену product, потому что хранит объект."
            }
          ],
          "hints": [
            "Вспомни правило из урока «Композиция: объект внутри объекта» и проверь каждый вариант на конкретном примере.",
            "Сначала исключи варианты, противоречащие наблюдаемому выполнению. Наследование нужно обосновывать отношением замены типа, а не близкой темой.",
            "Проверь основной аргумент: Отношение\"содержит\"выражается полем или коллекцией объектов."
          ],
          "solutionExplanation": [
            "Отношение\"содержит\"выражается полем или коллекцией объектов.",
            "Наследование нужно обосновывать отношением замены типа, а не близкой темой."
          ],
          "required": true,
          "answer": [
            "1"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Корзина содержит товары; это композиция."
            },
            {
              "id": "2",
              "text": "Корзина обязательно должна быть подклассом Product."
            },
            {
              "id": "3",
              "text": "Product и Basket обязаны делить один класс."
            }
          ]
        }
      ]
    },
    {
      "id": "oop-inheritance",
      "title": "Наследование, переопределение и super",
      "goal": "Расширять понятный базовый тип без потери его состояния.",
      "prerequisites": [
        "oop-composition"
      ],
      "role": "lesson",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "oop-inheritance-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Наследование задаётся в заголовке class Dog(Animal):. Подкласс может использовать методы базового класса, добавлять атрибуты и переопределять действия. Оно обосновано, когда объект подкласса можно использовать в роли базового. Dog является Animal, но Playlist не является Track. Для отношения контейнера в предыдущем уроке композиция была яснее. Этот урок показывает только одно наследование; множественное и порядок разрешения методов — отдельная продвинутая тема.",
            "Если Dog не определил свой __init__, он может использовать унаследованный инициализатор Animal. Если подкласс объявил новый __init__, базовый автоматически как дополнительный метод не вызовется. super().__init__(name) явно выполняет следующий подходящий инициализатор в цепи поиска, в нашей модели — базовый. После этого можно настроить атрибуты расширения. Не забудь сохранить контракт родителя."
          ],
          "examples": [
            {
              "id": "oop-inheritance-example-1",
              "title": "Унаследованный и переопределённый метод",
              "code": "class Animal:\n    def __init__(self,name):self.name=name\n    def speak(self):return \"...\"\nclass Dog(Animal):\n    def speak(self):return f\"Гав, {self.name}\"\n\nprint(Animal(\"кто-то\").speak())\nprint(Dog(\"Шарик\").speak())",
              "output": "...\nГав, Шарик\n",
              "explanation": "Dog использует инициализатор Animal, но переопределяет speak."
            }
          ],
          "goal": "Расширять понятный базовый тип без потери его состояния. Задача и устройство.",
          "prerequisites": [
            "oop-composition"
          ]
        },
        {
          "id": "oop-inheritance-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Переопределённый метод используется при вызове через подкласс. Если Animal.speak возвращает\"...\", а Dog.speak возвращает приветствие, то Dog(\"Шарик\").speak() использует вариант Dog. Внутри другого унаследованного метода вызов self.speak() также обращается к поведению конкретного экземпляра. Это основа динамического выбора действия; нет нужды вручную проверять каждый классовый тип цепочкой if.",
            "Подкласс может переопределить не метод, а обычный атрибут настройки. Если унаследованный pay читает self.rate, то Junior и Senior могут использовать разные rate без копирования самой формулы. Если написать Worker.rate внутри pay, индивидуальная настройка наследника не учтётся. Такое явное обращение к классу иногда намеренно, но здесь контракт требует полиморфной настройки."
          ],
          "examples": [
            {
              "id": "oop-inheritance-example-2",
              "title": "Дополнительная настройка через super",
              "code": "class Counter:\n    def __init__(self,start=0):self.value=start\nclass NamedCounter(Counter):\n    def __init__(self,name,start=0):\n        super().__init__(start)\n        self.name=name\n\nx=NamedCounter(\"шаги\",3)\nprint(x.name,x.value)",
              "output": "шаги 3\n",
              "explanation": "super сохраняет настройку базовой части, затем подкласс добавляет name."
            }
          ],
          "goal": "Расширять понятный базовый тип без потери его состояния. Порядок выполнения.",
          "prerequisites": [
            "oop-inheritance-step-1"
          ]
        },
        {
          "id": "oop-inheritance-step-3",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Не используй наследование как способ избежать трёх строк при похожих именах. Сначала проверь, совместимы ли договорённости: принимаемые аргументы, значения возврата и допустимое состояние. Если подкласс внезапно выбрасывает ошибку на обычном допустимом входе родителя, его нельзя безопасно подставить в прежний код. В учебных задачах поведение полностью объявлено, а ограничения профессионального проектирования мы честно не считаем освоенными одним уроком.",
            "Проверяй сам базовый класс, подкласс, наследуемый метод и новые атрибуты. Используй isinstance и issubclass для наблюдения отношения типов. Не подменяй наследование вторым несвязанным классом с совпадающим названием метода, когда условие явно просит подкласс. После этого сможешь разобраться в небольшой иерархии, а не объявлять любую систему готовой к профессиональному использованию."
          ],
          "examples": [
            {
              "id": "oop-inheritance-example-3",
              "title": "Метод читает настройку конкретного типа",
              "code": "class Worker:\n    rate=10\n    def pay(self,hours):return self.rate*hours\nclass Senior(Worker):\n    rate=20\n\nprint(Worker().pay(3),Senior().pay(3))",
              "output": "30 60\n",
              "explanation": "Одна унаследованная формула использует разные атрибуты rate."
            }
          ],
          "goal": "Расширять понятный базовый тип без потери его состояния. Применение и ошибки.",
          "prerequisites": [
            "oop-inheritance-step-2"
          ]
        }
      ],
      "exercises": [
        {
          "id": "oop-inheritance-task-1",
          "kind": "code",
          "title": "Животное и переопределённое действие",
          "goal": "Животное и переопределённое действие",
          "prerequisites": [
            "oop-inheritance"
          ],
          "prompt": "Animal(name) хранит name; speak() возвращает строку \"...\". Dog — подкласс Animal. Его speak() возвращает \"Гав, NAME\" с сохранённым именем. Инициализация имени должна работать у обоих типов.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "Animal('кто-то').speak()"
              ],
              "output": "'...'",
              "explanation": "Базовый контракт."
            },
            {
              "input": [
                "Dog('Шарик').speak()"
              ],
              "output": "'Гав, Шарик'",
              "explanation": "Переопределённое действие."
            }
          ],
          "initialCode": "# Реализуй Animal и Dog",
          "tests": [
            {
              "expression": "Animal('кто-то').speak()",
              "expectedValue": "...",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Базовый контракт."
            },
            {
              "expression": "Dog('Шарик').speak()",
              "expectedValue": "Гав, Шарик",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Переопределённое действие."
            },
            {
              "expression": "[issubclass(Dog,Animal),isinstance(Dog('Рекс'),Animal)]",
              "expectedValue": [
                true,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Настоящее отношение типов."
            },
            {
              "expression": "Dog('Рекс').name",
              "expectedValue": "Рекс",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Базовая инициализация сохранилась."
            },
            {
              "expression": "(lambda a,b,c,d:[a.name,b.name,c.name,d.name,a.speak(),b.speak(),c.speak(),d.speak()])(Animal('а'),Animal('б'),Dog('в'),Dog('г'))",
              "expectedValue": [
                "а",
                "б",
                "в",
                "г",
                "...",
                "...",
                "Гав, в",
                "Гав, г"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Базовые и унаследованные экземпляры одновременно сохраняют разные имена."
            }
          ],
          "reference": "class Animal:\n    def __init__(self,name):self.name=name\n    def speak(self):return \"...\"\nclass Dog(Animal):\n    def speak(self):return f\"Гав, {self.name}\"",
          "alternative": "class Animal:\n    def __init__(self,name):self.name=name\n    def speak(self):return \"...\"\nclass Dog(Animal):\n    def speak(self):return \"Гав, \"+self.name",
          "wrongSolutions": [
            {
              "code": "class Animal:\n    def __init__(self,name):self.name=name\n    def speak(self):return \"...\"\nclass Dog:\n    def __init__(self,name):self.name=name\n    def speak(self):return \"Гав, \"+self.name",
              "why": "Совпадающие методы не создают объявленное наследование."
            },
            {
              "code": "class Animal:\n    def __init__(self,name):self.name=name\n    def speak(self):return \"...\"\nclass Dog(Animal):\n    pass",
              "why": "Переопределение отсутствует."
            },
            {
              "code": "class Animal:\n    def __init__(self,name):Animal.name=name\n    def speak(self):return \"...\"\nclass Dog(Animal):\n    def speak(self):return f\"Гав, {self.name}\"",
              "why": "Общее имя Animal перезаписывается созданием каждого следующего животного, в том числе подкласса."
            }
          ],
          "hints": [
            "Сначала проверь базовый класс отдельно.",
            "Наследование указывается в скобках заголовка Dog.",
            "В Dog нужен только другой speak;__init__ можно унаследовать."
          ],
          "solutionExplanation": [
            "Тип и поведение проверяются раздельно.",
            "Разные имена не позволяют подставить один готовый ответ."
          ],
          "required": true
        },
        {
          "id": "oop-inheritance-task-2",
          "kind": "code",
          "title": "Общая формула и ставка наследника",
          "goal": "Общая формула и ставка наследника",
          "prerequisites": [
            "oop-inheritance"
          ],
          "prompt": "Worker.rate=10. Метод pay(hours) возвращает self.rate*hours для целого hours>=0. Senior — подкласс Worker со ставкой rate=20, использующий унаследованный pay. Ставка может изменяться после создания.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "[Worker().pay(3),Senior().pay(3)]"
              ],
              "output": "[30, 60]",
              "explanation": "Одна формула, две ставки."
            },
            {
              "input": [
                "issubclass(Senior,Worker)"
              ],
              "output": "True",
              "explanation": "Подкласс требуется контрактом."
            }
          ],
          "initialCode": "# Реализуй Worker и Senior",
          "tests": [
            {
              "expression": "[Worker().pay(3),Senior().pay(3)]",
              "expectedValue": [
                30,
                60
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Одна формула, две ставки."
            },
            {
              "expression": "issubclass(Senior,Worker)",
              "expectedValue": true,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Подкласс требуется контрактом."
            },
            {
              "expression": "(lambda s:(setattr(Senior,'rate',25),s.pay(2))[1])(Senior())",
              "expectedValue": 50,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Настройка наследника не заморожена."
            },
            {
              "expression": "Senior().pay(0)",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевая нагрузка."
            }
          ],
          "reference": "class Worker:\n    rate=10\n    def pay(self,hours):return self.rate*hours\nclass Senior(Worker):\n    rate=20",
          "alternative": "class Worker:\n    rate=10\n    def pay(self,hours):\n        result=0\n        for _ in range(hours):result+=self.rate\n        return result\nclass Senior(Worker):\n    rate=20",
          "wrongSolutions": [
            {
              "code": "class Worker:\n    rate=10\n    def pay(self,hours):return Worker.rate*hours\nclass Senior(Worker):\n    rate=20",
              "why": "Жёсткая ссылка Worker.rate игнорирует настройку подкласса."
            },
            {
              "code": "class Worker:\n    rate=10\n    def pay(self,hours):return self.rate*hours\nclass Senior(Worker):\n    pass",
              "why": "Ставка наследника не переопределена."
            }
          ],
          "hints": [
            "Унаследованный метод должен читать атрибут self.",
            "Сама методика не расчёт дублирования.",
            "Переопредели только ставку rate в Senior."
          ],
          "solutionExplanation": [
            "Динамическое чте не self.rate даёт настройку конкретного типа.",
            "Общее место формулы снижает рассогласование."
          ],
          "required": true
        },
        {
          "id": "oop-inheritance-task-3",
          "kind": "code",
          "title": "Именованный наследник счётчика",
          "goal": "Именованный наследник счётчика",
          "prerequisites": [
            "oop-inheritance"
          ],
          "prompt": "Counter(start=0) хранит value; add(delta=1) меняет и возвращает его. NamedCounter(name, start=0) — подкласс Counter. Он хранит name и имеет label(), возвращающий \"NAME: VALUE\" по текущему состоянию.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "list((lambda c:[c.label(),c.add(2),c.label()])(NamedCounter('шаги',3)))"
              ],
              "output": "['шаги: 3', 5, 'шаги: 5']",
              "explanation": "Базовый метод меняет состояние подкласса."
            },
            {
              "input": [
                "issubclass(NamedCounter,Counter)"
              ],
              "output": "True",
              "explanation": "Настоящее наследование."
            }
          ],
          "initialCode": "# Реализуй Counter и NamedCounter",
          "tests": [
            {
              "expression": "list((lambda c:[c.label(),c.add(2),c.label()])(NamedCounter('шаги',3)))",
              "expectedValue": [
                "шаги: 3",
                5,
                "шаги: 5"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Базовый метод меняет состояние подкласса."
            },
            {
              "expression": "issubclass(NamedCounter,Counter)",
              "expectedValue": true,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Настоящее наследование."
            },
            {
              "expression": "NamedCounter('x').value",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Default базовой части."
            },
            {
              "expression": "(lambda a,b:[a.name,b.name,a.value,b.value,a.label(),b.label(),a.add(1),b.value])(NamedCounter('первый',2),NamedCounter('второй',7))",
              "expectedValue": [
                "первый",
                "второй",
                2,
                7,
                "первый: 2",
                "второй: 7",
                3,
                7
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Имена и базовые значения двух наследников остаются независимыми после второго создания и изменения первого."
            }
          ],
          "reference": "class Counter:\n    def __init__(self,start=0):self.value=start\n    def add(self,delta=1):\n        self.value+=delta\n        return self.value\nclass NamedCounter(Counter):\n    def __init__(self,name,start=0):\n        super().__init__(start)\n        self.name=name\n    def label(self):return f\"{self.name}: {self.value}\"",
          "alternative": "class Counter:\n    def __init__(self,start=0):self.value=start\n    def add(self,delta=1):\n        self.value=self.value+delta\n        return self.value\nclass NamedCounter(Counter):\n    def __init__(self,name,start=0):\n        Counter.__init__(self,start)\n        self.name=name\n    def label(self):return self.name+\": \"+str(self.value)",
          "wrongSolutions": [
            {
              "code": "class Counter:\n    def __init__(self,start=0):self.value=start\n    def add(self,delta=1):self.value+=delta;return self.value\nclass NamedCounter(Counter):\n    def __init__(self,name,start=0):self.name=name\n    def label(self):return f\"{self.name}: {self.value}\"",
              "why": "Базовая настройка value не выполнена."
            },
            {
              "code": "class Counter:\n    def __init__(self,start=0):self.value=start\n    def add(self,delta=1):self.value+=delta;return self.value\nclass NamedCounter(Counter):\n    def __init__(self,name,start=0):super().__init__(start);self.name=name;self.saved=start\n    def label(self):return f\"{self.name}: {self.saved}\"",
              "why": "Подпись использует устаревший снимок value."
            },
            {
              "code": "class Counter:\n    def __init__(self,start=0):self.value=start\n    def add(self,delta=1):\n        self.value+=delta\n        return self.value\nclass NamedCounter(Counter):\n    def __init__(self,name,start=0):\n        super().__init__(start)\n        NamedCounter.name=name\n    def label(self):return f\"{self.name}: {self.value}\"",
              "why": "Имя наследника записано в класс и меняется сразу у всех существующих объектов."
            }
          ],
          "hints": [
            "Новый инициализатор требует настройки базовой части.",
            "В label нужен текущий value, несохранённый start.",
            "Вызови super().__init__(start), затем сохрани name."
          ],
          "solutionExplanation": [
            "Унаследованное изменение и новая подпись смотрят на одно value.",
            "Явный вызов базового __init__ допустим в этой простой иерархии,super масштабируется лучше."
          ],
          "required": true
        },
        {
          "id": "oop-inheritance-task-4",
          "kind": "explain",
          "title": "Что делает новый __init__?",
          "goal": "Что делает новый __init__?",
          "prerequisites": [
            "oop-inheritance"
          ],
          "prompt": "Подкласс объявил свой __init__. Базовый сам выполнится дополнительно?",
          "inputFormat": "Прочитай условие и выбери ответ.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "class Animal:\n    def __init__(self,name):self.name=name\n    def speak(self):return \"...\"\nclass Dog(Animal):\n    def speak(self):return f\"Гав, {self.name}\"\n\nprint(Animal(\"кто-то\").speak())\nprint(Dog(\"Шарик\").speak())"
              ],
              "output": "...\nГав, Шарик\n",
              "explanation": "Dog использует инициализатор Animal, но переопределяет speak."
            }
          ],
          "hints": [
            "Вспомни правило из урока «Наследование, переопределение и super» и проверь каждый вариант на конкретном примере.",
            "Сначала исключи варианты, противоречащие наблюдаемому выполнению. Новое переопределение заменяет наследуемый вызов; порядок настройки выражается явно.",
            "Проверь основной аргумент: Новое переопределение заменяет наследуемый вызов; порядок настройки выражается явно."
          ],
          "solutionExplanation": [
            "Новое переопределение заменяет наследуемый вызов; порядок настройки выражается явно."
          ],
          "required": true,
          "answer": [
            "1"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Нет, нужный базовый инициализатор надо вызвать явно, обычно через super()."
            },
            {
              "id": "2",
              "text": "Да, все __init__ в иерархии всегда выполняются автоматически."
            },
            {
              "id": "3",
              "text": "__init__ подкласса никогда не выполняется."
            }
          ]
        }
      ]
    },
    {
      "id": "oop-special-methods",
      "title": "Специальные методы: len, str и операторы",
      "goal": "Подключать привычные операции к собственному типу по ясному контракту.",
      "prerequisites": [
        "oop-inheritance"
      ],
      "role": "lesson",
      "estimatedMinutes": 35,
      "steps": [
        {
          "id": "oop-special-methods-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Методы с двойными подчёркиваниями по краям связывают тип с операциями языка. __len__ позволяет использовать len(obj),__str__ — str(obj) и print(obj),__add__ — оператор+. Их не придумывают произвольно:Python обращается к заданным именам. Это не магия и скрытая генерация, а договорённый интерфейс типа. На этом уроке изучаем несколько примеров, а не весь протокол объектной модели.",
            "__len__ возвращает неотрицательное целое, обозначающее длину в модели типа. ReadingList может возвращать число книг. __contains__(item) определяет item in obj. Для контейнера полезно объяснить, что именно считается элементом: название книги, объект книги или id. В задаче используются названия строками и обычная проверка равенства. Список входных названий копируется, чтобы состав контейнера был независим."
          ],
          "examples": [
            {
              "id": "oop-special-methods-example-1",
              "title": "Текстовое представление возвращает строку",
              "code": "class Counter:\n    def __init__(self,value):self.value=value\n    def __str__(self):return f\"Счётчик: {self.value}\"\n\nprint(str(Counter(3)))",
              "output": "Счётчик: 3\n",
              "explanation": "__str__ не печатает, а возвращает строку; печатает внешний print."
            }
          ],
          "goal": "Подключать привычные операции к собственному типу по ясному контракту. Задача и устройство.",
          "prerequisites": [
            "oop-inheritance"
          ]
        },
        {
          "id": "oop-special-methods-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "__str__ обязан возвращать строку, а не печатать её. __bool__ возвращает bool и позволяет задать смысл if obj. Для кошелька с неотрицательным balance объект истинен при balance>0. Если __bool__ не определён,Python может опереться на __len__; поэтому не описывай проверку истинности как обязательную проверку атрибута value. Она зависит от протокола типа.",
            "Оператор+может вернуть новый Vector, сложив соответствующие координаты. Он не должен менять операнды, если контракт обещает новый результат. __eq__ сравнивает содержимое по правилу, которое ты объявил. Для неподдерживаемого типа корректно вернуть NotImplemented: это специальный сигнал протоколу сравнения, не исключение. Для Vector равенство означает равные координаты, не один и тот же объект."
          ],
          "examples": [
            {
              "id": "oop-special-methods-example-2",
              "title": "Длина и вхождение",
              "code": "class Names:\n    def __init__(self,values):self.values=list(values)\n    def __len__(self):return len(self.values)\n    def __contains__(self,item):return item in self.values\n\nnames=Names([\"Аня\",\"Борис\"])\nprint(len(names))\nprint(\"Аня\" in names)",
              "output": "2\nTrue\n",
              "explanation": "Python делегирует операции специальным методам."
            }
          ],
          "goal": "Подключать привычные операции к собственному типу по ясному контракту. Порядок выполнения.",
          "prerequisites": [
            "oop-special-methods-step-1"
          ]
        },
        {
          "id": "oop-special-methods-step-3",
          "title": "Применение и ошибки",
          "paragraphs": [
            "Не делай неожиданные операции ради красивого синтаксиса. Если сложение кошельков удаляет деньги из исходников, читатель не ожидает такого поведения от+. Для изменения состояния лучше явный метод. Если объект не имеет естественной длины, не нужно добавлять __len__ лишь для удобной проверки. Интерфейс языка помогает там, где смысл операции остаётся узнаваемым.",
            "Проверяй обычный вызов через len,str,+,in,==, а не только прямой obj.__len__(). Создай два вектора, получи сумму, убедись в неизменности операндов и независимости результата. Для строкового представления сравни точный формат. После этого перейди к малому объектному проекту, где нужно использовать несколько ролей и состояний, а не собирать максимальное число специальных методов."
          ],
          "examples": [
            {
              "id": "oop-special-methods-example-3",
              "title": "Содержимое и отдельный объект",
              "code": "class Point:\n    def __init__(self,x):self.x=x\n    def __eq__(self,other):\n        if not isinstance(other,Point):return NotImplemented\n        return self.x==other.x\n\na=Point(2)\nb=Point(2)\nprint(a==b,a is b)",
              "output": "True False\n",
              "explanation": "Определённое правило равенства сравнивает x, не идентичность."
            }
          ],
          "goal": "Подключать привычные операции к собственному типу по ясному контракту. Применение и ошибки.",
          "prerequisites": [
            "oop-special-methods-step-2"
          ]
        }
      ],
      "exercises": [
        {
          "id": "oop-special-methods-task-1",
          "kind": "code",
          "title": "Вектор с новым результатом суммы",
          "goal": "Вектор с новым результатом суммы",
          "prerequisites": [
            "oop-special-methods"
          ],
          "prompt": "Vector(x, y) хранит целые координаты. Сложение двух Vector возвращает новый Vector с суммой соответствующих координат, не меняя оба операнда. Равенство сравнивает координаты; с другим типом результат False.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "list((lambda v:[v.x,v.y])(Vector(1,2)+Vector(3,-2)))"
              ],
              "output": "[4, 0]",
              "explanation": "По координатная сумма."
            },
            {
              "input": [
                "[Vector(1,2)==Vector(1,2),Vector(1,2)==Vector(2,1),Vector(1,2)==[1,2]]"
              ],
              "output": "[True, False, False]",
              "explanation": "Равенство ти повиданных."
            }
          ],
          "initialCode": "class Vector:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "list((lambda v:[v.x,v.y])(Vector(1,2)+Vector(3,-2)))",
              "expectedValue": [
                4,
                0
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "По координатная сумма."
            },
            {
              "expression": "[Vector(1,2)==Vector(1,2),Vector(1,2)==Vector(2,1),Vector(1,2)==[1,2]]",
              "expectedValue": [
                true,
                false,
                false
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Равенство ти повиданных."
            },
            {
              "expression": "list((lambda a,b:(lambda c:[c is not a,c is not b,a.x,a.y,b.x,b.y])(a+b))(Vector(0,0),Vector(0,0)))",
              "expectedValue": [
                true,
                true,
                0,
                0,
                0,
                0
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Новый результат даже при нулевой сумме."
            },
            {
              "expression": "(lambda a,b:(lambda c:[c.x,c.y,c is not a,c is not b,a.x,a.y,b.x,b.y])(a+b))(Vector(1,2),Vector(3,4))",
              "expectedValue": [
                4,
                6,
                true,
                true,
                1,
                2,
                3,
                4
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Ненулевое сложение не изменяет оба операнда."
            },
            {
              "expression": "(lambda result:[isinstance(result,Vector),result.x,result.y])(Vector(1,2)+Vector(3,4))",
              "expectedValue": [
                true,
                4,
                6
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Оператор создаёт именно экземпляр Vector, а не другой объект с похожими атрибутами."
            }
          ],
          "reference": "class Vector:\n    def __init__(self,x,y):self.x,self.y=x,y\n    def __add__(self,other):\n        if not isinstance(other,Vector):return NotImplemented\n        return Vector(self.x+other.x,self.y+other.y)\n    def __eq__(self,other):\n        if not isinstance(other,Vector):return NotImplemented\n        return self.x==other.x and self.y==other.y",
          "alternative": "class Vector:\n    def __init__(self,x,y):self.x=x;self.y=y\n    def __add__(self,other):\n        if isinstance(other,Vector):\n            result=Vector(0,0)\n            result.x=self.x+other.x\n            result.y=self.y+other.y\n            return result\n        return NotImplemented\n    def __eq__(self,other):\n        return isinstance(other,Vector) and (self.x,self.y)==(other.x,other.y)",
          "wrongSolutions": [
            {
              "code": "class Vector:\n    def __init__(self,x,y):self.x,self.y=x,y\n    def __add__(self,other):\n        self.x+=other.x;self.y+=other.y\n        return self\n    def __eq__(self,other):return isinstance(other,Vector) and self.x==other.x and self.y==other.y",
              "why": "Сложение изменяет операнди возвращает его же самого."
            },
            {
              "code": "class Vector:\n    def __init__(self,x,y):self.x,self.y=x,y\n    def __add__(self,other):return Vector(self.x+other.x,self.y+other.y)\n    def __eq__(self,other):return self is other",
              "why": "Идентичность подменяет объявленное покоординатное равенство."
            },
            {
              "code": "class Vector:\n    def __init__(self,x,y):self.x,self.y=x,y\n    def __add__(self,other):\n        if not isinstance(other,Vector):return NotImplemented\n        return __import__(\"types\").SimpleNamespace(x=self.x+other.x,y=self.y+other.y)\n    def __eq__(self,other):\n        if not isinstance(other,Vector):return NotImplemented\n        return self.x==other.x and self.y==other.y",
              "why": "Координаты верны, но результат не является объявленным типом Vector."
            }
          ],
          "hints": [
            "Оператор+должен создать отдельный экземпляр.",
            "Равенство и идентичность остаются разными свойствами.",
            "В __add__ верни Vector с двумя суммами, в __eq__ проверь тип и координаты."
          ],
          "solutionExplanation": [
            "Нулевые векторы тоже дают новый объект.",
            "NotImplemented позволяет протоколу сравнения обработать другой тип."
          ],
          "required": true
        },
        {
          "id": "oop-special-methods-task-2",
          "kind": "code",
          "title": "Список чтения как контейнер",
          "goal": "Список чтения как контейнер",
          "prerequisites": [
            "oop-special-methods"
          ],
          "prompt": "ReadingList(titles) создаёт копию переданного списка строк. len(obj) возвращает число названий. title in obj ищет точное название с учётом регистра. Изменение входного списка не меняет контейнер, включая пустой случай. Копия хранится в публичном атрибуте titles.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "[len(ReadingList(['a','b'])),'a' in ReadingList(['a','b']),'A' in ReadingList(['a'])]"
              ],
              "output": "[2, True, False]",
              "explanation": "Длина и вхождение с учётом регистра."
            },
            {
              "input": [
                "(lambda source:(lambda r:(source.append('b'),len(r))[1])(ReadingList(source)))(['a'])"
              ],
              "output": "1",
              "explanation": "Состав контейнера сохранён."
            }
          ],
          "initialCode": "class ReadingList:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "[len(ReadingList(['a','b'])),'a' in ReadingList(['a','b']),'A' in ReadingList(['a'])]",
              "expectedValue": [
                2,
                true,
                false
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Длина и вхождение с учётом регистра."
            },
            {
              "expression": "(lambda source:(lambda r:(source.append('b'),len(r))[1])(ReadingList(source)))(['a'])",
              "expectedValue": 1,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Состав контейнера сохранён."
            },
            {
              "expression": "len(ReadingList([]))",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой контейнер."
            },
            {
              "expression": "(lambda source:(lambda obj:(source.append('x'),len(obj))[1])(ReadingList(source)))([])",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой исходный список тоже скопирован."
            },
            {
              "expression": "(lambda a,b:[a.titles,b.titles,a.titles is not b.titles,len(a),len(b)])(ReadingList(['a']),ReadingList(['b','c']))",
              "expectedValue": [
                [
                  "a"
                ],
                [
                  "b",
                  "c"
                ],
                true,
                1,
                2
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Два контейнера имеют публичные самостоятельные списки titles с разными исходными данными."
            }
          ],
          "reference": "class ReadingList:\n    def __init__(self,titles):self.titles=titles.copy()\n    def __len__(self):return len(self.titles)\n    def __contains__(self,title):return title in self.titles",
          "alternative": "class ReadingList:\n    def __init__(self,titles):self.titles=list(titles)\n    def __len__(self):return sum(1 for _ in self.titles)\n    def __contains__(self,title):return any(value==title for value in self.titles)",
          "wrongSolutions": [
            {
              "code": "class ReadingList:\n    def __init__(self,titles):self.titles=titles\n    def __len__(self):return len(self.titles)\n    def __contains__(self,title):return title in self.titles",
              "why": "Входной список оставлен общим."
            },
            {
              "code": "class ReadingList:\n    def __init__(self,titles):self.titles=titles.copy()\n    def __len__(self):return len(self.titles)\n    def __contains__(self,title):return title.lower() in [x.lower() for x in self.titles]",
              "why": "Поиск внезапно игнорирует регистр вопреки контракту."
            },
            {
              "code": "class ReadingList:\n    def __init__(self,titles):ReadingList.titles=titles.copy()\n    def __len__(self):return len(self.titles)\n    def __contains__(self,title):return title in self.titles",
              "why": "Второй контейнер перезаписывает общий атрибут titles класса и меняет данные первого."
            }
          ],
          "hints": [
            "Два оператора делегируют двум специальным методам.",
            "Для состава должен быть новый список.",
            "__contains__ использует обычное точное вхождение переданной строки."
          ],
          "solutionExplanation": [
            "Контейнер имеет понятные элементы — названия.",
            "Список копируется, строки неизменяемы."
          ],
          "required": true
        },
        {
          "id": "oop-special-methods-task-3",
          "kind": "code",
          "title": "Кошелёк в условии и строке",
          "goal": "Кошелёк в условии и строке",
          "prerequisites": [
            "oop-special-methods"
          ],
          "prompt": "Wallet(balance) хранит целое balance>=0. bool(wallet) истинен при balance>0. str(wallet) даёт \"Остаток: N\". Оба результата читают текущий balance после его изменения.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "[bool(Wallet(0)),str(Wallet(0)),bool(Wallet(5)),str(Wallet(5))]"
              ],
              "output": "[False, 'Остаток: 0', True, 'Остаток: 5']",
              "explanation": "Нуль отдельн от положительного."
            },
            {
              "input": [
                "list((lambda w:(setattr(w,'balance',0),bool(w),str(w))[1:])(Wallet(5)))"
              ],
              "output": "[False, 'Остаток: 0']",
              "explanation": "Нет замороженного снимка."
            }
          ],
          "initialCode": "class Wallet:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "[bool(Wallet(0)),str(Wallet(0)),bool(Wallet(5)),str(Wallet(5))]",
              "expectedValue": [
                false,
                "Остаток: 0",
                true,
                "Остаток: 5"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нуль отдельн от положительного."
            },
            {
              "expression": "list((lambda w:(setattr(w,'balance',0),bool(w),str(w))[1:])(Wallet(5)))",
              "expectedValue": [
                false,
                "Остаток: 0"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нет замороженного снимка."
            },
            {
              "expression": "(lambda a,b:[a.balance,b.balance,bool(a),bool(b),str(a),str(b)])(Wallet(0),Wallet(9))",
              "expectedValue": [
                0,
                9,
                false,
                true,
                "Остаток: 0",
                "Остаток: 9"
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Одновременные кошельки с нулевым и положительным балансом не заменяют состояние друг друга."
            }
          ],
          "reference": "class Wallet:\n    def __init__(self,balance):self.balance=balance\n    def __bool__(self):return self.balance>0\n    def __str__(self):return f\"Остаток: {self.balance}\"",
          "alternative": "class Wallet:\n    def __init__(self,balance):self.balance=balance\n    def __bool__(self):return bool(self.balance)\n    def __str__(self):return \"Остаток: \"+str(self.balance)",
          "wrongSolutions": [
            {
              "code": "class Wallet:\n    def __init__(self,balance):self.balance=balance\n    def __str__(self):return f\"Остаток: {self.balance}\"",
              "why": "Без __bool__ объект обычно истинен даже с нулевым balance."
            },
            {
              "code": "class Wallet:\n    def __init__(self,balance):self.balance=balance;self.saved=f\"Остаток: {balance}\"\n    def __bool__(self):return self.balance>0\n    def __str__(self):return self.saved",
              "why": "Строковое представление заморожено приста ромб a лансе."
            },
            {
              "code": "class Wallet:\n    def __init__(self,balance):Wallet.balance=balance\n    def __bool__(self):return self.balance>0\n    def __str__(self):return f\"Остаток: {self.balance}\"",
              "why": "Второе создание перезаписывает баланс класса, поэтому прежний кошелёк меняет истинность и строку."
            }
          ],
          "hints": [
            "Специальные методы вызываются каждый раз заново.",
            "Не храни как готовую строку значение из __init__.",
            "Верни bool из __bool__ и строку из __str__ по текущему self.balance."
          ],
          "solutionExplanation": [
            "Явный протокол истинности не опирается на случайное наличи e атрибутов.",
            "Строка является представлением текущего состояния."
          ],
          "required": true
        },
        {
          "id": "oop-special-methods-task-4",
          "kind": "choice",
          "title": "Что возвращает __str__?",
          "goal": "Что возвращает __str__?",
          "prerequisites": [
            "oop-special-methods"
          ],
          "prompt": "Как правильно реализовать строковое представление?",
          "inputFormat": "Прочитай условие и выбери ответ.",
          "outputFormat": "Ответ в форме задания.",
          "constraints": "Исходные значения даны полностью; внешние данные не нужны.",
          "examples": [
            {
              "input": [
                "class Counter:\n    def __init__(self,value):self.value=value\n    def __str__(self):return f\"Счётчик: {self.value}\"\n\nprint(str(Counter(3)))"
              ],
              "output": "Счётчик: 3\n",
              "explanation": "__str__ не печатает, а возвращает строку; печатает внешний print."
            }
          ],
          "hints": [
            "Вспомни правило из урока «Специальные методы: len, str и операторы» и проверь каждый вариант на конкретном примере.",
            "Сначала исключи варианты, противоречащие наблюдаемому выполнению. Протокол str ожидает возвращаемую строку, печать является другим действием.",
            "Проверь основной аргумент: Протокол str ожидает возвращаемую строку, печать является другим действием."
          ],
          "solutionExplanation": [
            "Протокол str ожидает возвращаемую строку, печать является другим действием."
          ],
          "required": true,
          "answer": [
            "1"
          ],
          "choices": [
            {
              "id": "1",
              "text": "Вернуть строку из __str__, а вывод выполнит внешний print."
            },
            {
              "id": "2",
              "text": "Напечатать строку в __str__ и не возвращать ничего."
            },
            {
              "id": "3",
              "text": "Вернуть список символов."
            }
          ]
        }
      ]
    },
    {
      "id": "oop-library-project",
      "title": "Практика: маленькая библиотека",
      "goal": "Соединить объект книги, участника и каталог с наблюдаемыми переходами.",
      "prerequisites": [
        "oop-special-methods"
      ],
      "role": "project",
      "estimatedMinutes": 55,
      "steps": [
        {
          "id": "oop-library-project-step-1",
          "title": "Задача и устройство",
          "paragraphs": [
            "Проект моделирует маленькую библиотеку в памяти. Это не рабочий сервис выдачи: нет учётных записей, хранения между запусками и конкурирующих запросов. Book хранит название и доступность, Member — имя, лимит и список названий, Library — список объектов Book. Задачи сначала проверяют роли отдельно, затем соединяют каталог с журналом действий. В качестве идентификатора используем уникальное название; в настоящем каталоге лучше устойчивый ID.",
            "Выдача книги разрешена только из доступного состояния; повторная выдача должна вернуть False и не менять данные. Возврат уже доступной книги тоже False. Эта договорённость не позволяет одним кликом создать два успеха. Для участника проверяется дополнительный лимит, но он не является полной системой прав доступа. Имя само по себе не подтверждает личность: это учебная строка."
          ],
          "examples": [
            {
              "id": "oop-library-project-example-1",
              "title": "Повторная операция — другой результат",
              "code": "available=True\nresults=[]\nfor action in [\"borrow\",\"borrow\",\"return\"]:\n    desired=action==\"return\"\n    changed=available!=desired\n    if changed:\n        available=desired\n    results.append(changed)\nprint(results,available)",
              "output": "[True, False, True] True\n",
              "explanation": "Книгу взяли один раз, повтор отклонён, возврат сработал. Это демонстрация правил, а неготовая реализация классов."
            }
          ],
          "goal": "Соединить объект книги, участника и каталог с наблюдаемыми переходами. Задача и устройство.",
          "prerequisites": [
            "oop-special-methods"
          ]
        },
        {
          "id": "oop-library-project-step-2",
          "title": "Порядок выполнения",
          "paragraphs": [
            "Каталог хранит объекты книг и использует их методы. Список при создании копируется, но книги остаются теми же объектами: изменение доступности видно во всех обращениях к одной книге. find возвращает сам объект либо None, а не его словарную копию. Это осмысленный общий объект, в отличие от ошибочно общего списка всех корзин. Проверь тождественность find результата, чтобы понять связь.",
            "Последняя задача принимает последовательность команд и возвращает результат каждой плюс отсортированные доступные названия. Пустой журнал ничего не меняет. Неизвестное название даёт False для конкретной команды, обработка не прерывается. Для завершения практики нужны все четыре задачи. После неё можно объяснить создание объекта, состояние, метод, общую ссылку и композицию; это ещё не доказывает владение всеми архитектурными подходами ООП."
          ],
          "examples": [
            {
              "id": "oop-library-project-example-2",
              "title": "Каталог возвращает общий объект",
              "code": "class Book:\n    def __init__(self,title):self.title=title\n\nbook=Book(\"Python\")\nbooks=[book]\nfound=books[0]\nprint(found is book)",
              "output": "True\n",
              "explanation": "Композиция каталога сохраняет объект книги, а не создаёт его по названию заново."
            }
          ],
          "goal": "Соединить объект книги, участника и каталог с наблюдаемыми переходами. Порядок выполнения.",
          "prerequisites": [
            "oop-library-project-step-1"
          ]
        }
      ],
      "exercises": [
        {
          "id": "oop-library-project-task-1",
          "kind": "code",
          "title": "Состояние книги",
          "goal": "Состояние книги",
          "prerequisites": [
            "oop-library-project"
          ],
          "prompt": "Book(title) сохраняет title и начинает с available=True. borrow() меняет True на False и возвращает True, а при повторе возвращает False без изменения. return_book() меняет False на True аналогично. Разные книги независимы.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "list((lambda b:[b.title,b.borrow(),b.available,b.borrow(),b.return_book(),b.return_book(),b.available])(Book('Python')))"
              ],
              "output": "['Python', True, False, False, True, False, True]",
              "explanation": "Полный путь изменений."
            },
            {
              "input": [
                "(lambda a,b:(a.borrow(),b.available)[1])(Book('a'),Book('b'))"
              ],
              "output": "True",
              "explanation": "Независимые экземпляры."
            }
          ],
          "initialCode": "class Book:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "list((lambda b:[b.title,b.borrow(),b.available,b.borrow(),b.return_book(),b.return_book(),b.available])(Book('Python')))",
              "expectedValue": [
                "Python",
                true,
                false,
                false,
                true,
                false,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Полный путь изменений."
            },
            {
              "expression": "(lambda a,b:(a.borrow(),b.available)[1])(Book('a'),Book('b'))",
              "expectedValue": true,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Независимые экземпляры."
            },
            {
              "expression": "Book('').title",
              "expectedValue": "",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустое название не запрещено этим контрактом."
            },
            {
              "expression": "(lambda first,second:[first.title,second.title,first.available,second.available,first.borrow(),second.available])(Book('первая'),Book('вторая'))",
              "expectedValue": [
                "первая",
                "вторая",
                true,
                true,
                true,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Две одновременно существующие книги сохраняют разные публичные названия и независимую доступность."
            }
          ],
          "reference": "class Book:\n    def __init__(self,title):\n        self.title=title\n        self.available=True\n    def borrow(self):\n        if not self.available:return False\n        self.available=False\n        return True\n    def return_book(self):\n        if self.available:return False\n        self.available=True\n        return True",
          "alternative": "class Book:\n    def __init__(self,title):self.title=title;self.available=True\n    def borrow(self):\n        changed=self.available\n        self.available=False\n        return changed\n    def return_book(self):\n        changed=not self.available\n        self.available=True\n        return changed",
          "wrongSolutions": [
            {
              "code": "class Book:\n    def __init__(self,title):\n        self.title=title\n        self.available=True\n    def borrow(self):\n        if False:return False\n        self.available=False\n        return True\n    def return_book(self):\n        if self.available:return False\n        self.available=True\n        return True",
              "why": "Повторная выдача ошибочно объявлена успешной."
            },
            {
              "code": "class Book:\n    def __init__(self,title):\n        self.title=title\n        self.available=True\n    def borrow(self):\n        if not self.available:return False\n        self.available=True\n        return True\n    def return_book(self):\n        if self.available:return False\n        self.available=True\n        return True",
              "why": "После успеха состояние не меняется."
            },
            {
              "code": "class Book:\n    def __init__(self,title):\n        Book.title=title\n        self.available=True\n    def borrow(self):\n        if not self.available:return False\n        self.available=False\n        return True\n    def return_book(self):\n        if self.available:return False\n        self.available=True\n        return True",
              "why": "Название записано в общий класс: создание второй книги меняет title первой."
            }
          ],
          "hints": [
            "Результат зависит от прежней available.",
            "Сначала проверь, нужен ли реальный переход.",
            "Неуспешный повтор не меняет флаг."
          ],
          "solutionExplanation": [
            "Повторная операция не повторяет успех.",
            "Два экземпляра проверяют независимость данных."
          ],
          "required": true
        },
        {
          "id": "oop-library-project-task-2",
          "kind": "code",
          "title": "Участник с лимитом",
          "goal": "Участник с лимитом",
          "prerequisites": [
            "oop-library-project"
          ],
          "prompt": "Member(name, limit=2) хранит имя, целый limit>=0 и новый список borrowed. borrow(title) добавляет отсутствующее название, только если len(borrowed)<limit, и возвращает True; иначе False. give_back(title) удаляет имеющееся название и возвращает True, иначе False.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "list((lambda m:[m.borrow('a'),m.borrow('a'),m.borrow('b'),m.borrow('c'),m.borrowed.copy(),m.give_back('a'),m.give_back('x')])(Member('Аня')))"
              ],
              "output": "[True, False, True, False, ['a', 'b'], True, False]",
              "explanation": "Снимок списка сделан до возврата книги; итог каждой команды проверяется отдельно."
            },
            {
              "input": [
                "Member('x',0).borrow('a')"
              ],
              "output": "False",
              "explanation": "Нулевой лимит."
            }
          ],
          "initialCode": "class Member:\n    # Реализуй контракт класса\n    pass",
          "tests": [
            {
              "expression": "list((lambda m:[m.borrow('a'),m.borrow('a'),m.borrow('b'),m.borrow('c'),m.borrowed.copy(),m.give_back('a'),m.give_back('x')])(Member('Аня')))",
              "expectedValue": [
                true,
                false,
                true,
                false,
                [
                  "a",
                  "b"
                ],
                true,
                false
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Снимок списка сделан до возврата книги; итог каждой команды проверяется отдельно."
            },
            {
              "expression": "Member('x',0).borrow('a')",
              "expectedValue": false,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Нулевой лимит."
            },
            {
              "expression": "list((lambda a,b:(a.borrow('a'),b.borrowed)[1])(Member('a'),Member('b')))",
              "expectedValue": [],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Независимый список."
            },
            {
              "expression": "(lambda first,second:[first.name,second.name,first.limit,second.limit,first.borrowed,second.borrowed])(Member('Аня',1),Member('Борис',3))",
              "expectedValue": [
                "Аня",
                "Борис",
                1,
                3,
                [],
                []
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Публичные имя, лимит и списки двух участников наблюдаются после создания второго."
            }
          ],
          "reference": "class Member:\n    def __init__(self,name,limit=2):self.name=name;self.limit=limit;self.borrowed=[]\n    def borrow(self,title):\n        if title in self.borrowed or len(self.borrowed)>=self.limit:return False\n        self.borrowed.append(title)\n        return True\n    def give_back(self,title):\n        if title not in self.borrowed:return False\n        self.borrowed.remove(title)\n        return True",
          "alternative": "class Member:\n    def __init__(self,name,limit=2):\n        self.name,self.limit=name,limit\n        self.borrowed=list()\n    def borrow(self,title):\n        allowed=title not in self.borrowed and len(self.borrowed)<self.limit\n        if allowed:self.borrowed+=[title]\n        return allowed\n    def give_back(self,title):\n        for i,value in enumerate(self.borrowed):\n            if value==title:\n                del self.borrowed[i]\n                return True\n        return False",
          "wrongSolutions": [
            {
              "code": "class Member:\n    borrowed=[]\n    def __init__(self,name,limit=2):self.name=name;self.limit=limit\n    def borrow(self,title):\n        if title in self.borrowed or len(self.borrowed)>=self.limit:return False\n        self.borrowed.append(title);return True\n    def give_back(self,title):\n        if title not in self.borrowed:return False\n        self.borrowed.remove(title);return True",
              "why": "Все участники делят один список книг."
            },
            {
              "code": "class Member:\n    def __init__(self,name,limit=2):self.name=name;self.limit=limit;self.borrowed=[]\n    def borrow(self,title):self.borrowed.append(title);return True\n    def give_back(self,title):\n        if title not in self.borrowed:return False\n        self.borrowed.remove(title);return True",
              "why": "Повтори лимит не проверяются."
            },
            {
              "code": "class Member:\n    def __init__(self,name,limit=2):self.limit=limit;self.borrowed=[]\n    def borrow(self,title):\n        if title in self.borrowed or len(self.borrowed)>=self.limit:return False\n        self.borrowed.append(title)\n        return True\n    def give_back(self,title):\n        if title not in self.borrowed:return False\n        self.borrowed.remove(title)\n        return True",
              "why": "Вычисления выдачи работают, но обязательное публичное имя участника не сохранено."
            },
            {
              "code": "class Member:\n    def __init__(self,name,limit=2):Member.name=name;Member.limit=limit;self.borrowed=[]\n    def borrow(self,title):\n        if title in self.borrowed or len(self.borrowed)>=self.limit:return False\n        self.borrowed.append(title)\n        return True\n    def give_back(self,title):\n        if title not in self.borrowed:return False\n        self.borrowed.remove(title)\n        return True",
              "why": "Имена и лимиты ошибочно записаны в класс: второй читатель меняет данные первого."
            }
          ],
          "hints": [
            "Две причины отказа выдаются до append.",
            "borrowed создаётся для каждого участника.",
            "Сравни len с limit и проверь наличие title, затем меняй список."
          ],
          "solutionExplanation": [
            "Ограничения состояния объявлены действиями, а не постфактум обрезанием списка.",
            "Для сохранения прежнего списка при наблюдении использована copy(): последующее изменение объекта не переписывает снимок."
          ],
          "required": true
        },
        {
          "id": "oop-library-project-task-3",
          "kind": "code",
          "title": "Каталог с объектами книг",
          "goal": "Каталог с объектами книг",
          "prerequisites": [
            "oop-library-project"
          ],
          "prompt": "Реализуй Book по предыдущему контракту и Library(books). Каталог создаёт поверхностную копию списка книг. find(title) возвращает первый исходный объект Book или None. loan(title) вызывает borrow() найденной книги и возвращает его ответ; при отсутствии книги — False.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "list((lambda b:(lambda lib:[lib.find('x') is b,lib.loan('x'),b.available,lib.loan('x'),lib.loan('missing')])(Library([b])))(Book('x')))"
              ],
              "output": "[True, True, False, False, False]",
              "explanation": "Найден именно общий объект."
            },
            {
              "input": [
                "Library([]).find('x')"
              ],
              "output": "None",
              "explanation": "Пустой каталог."
            }
          ],
          "initialCode": "# Реализуй Book и Library",
          "tests": [
            {
              "expression": "list((lambda b:(lambda lib:[lib.find('x') is b,lib.loan('x'),b.available,lib.loan('x'),lib.loan('missing')])(Library([b])))(Book('x')))",
              "expectedValue": [
                true,
                true,
                false,
                false,
                false
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Найден именно общий объект."
            },
            {
              "expression": "Library([]).find('x')",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой каталог."
            },
            {
              "expression": "(lambda source:(lambda lib:(source.append(Book('b')),len(lib.books))[1])(Library(source)))([Book('a')])",
              "expectedValue": 1,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Список каталога скопирован."
            },
            {
              "expression": "(lambda source:(lambda lib:(source.append(Book('x')),len(lib.books))[1])(Library(source)))([])",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой список каталога тоже не разделяется с входом."
            },
            {
              "expression": "(lambda b:(lambda lib:(setattr(b,'borrow',lambda:(_calls.append(1),True)[1]),[lib.loan('x'),len(_calls)])[1])(Library([b])))(Book('x'))",
              "expectedValue": [
                true,
                1
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Library.loan делегирует выдачу найденному объекту.",
              "setup": "_calls=[]"
            },
            {
              "expression": "(lambda first,second:(lambda a,b:[[book.title for book in a.books],[book.title for book in b.books],a.find('первая') is first,b.find('вторая') is second,isinstance(a.books,list),isinstance(b.books,list)])(Library([first]),Library([second])))(Book('первая'),Book('вторая'))",
              "expectedValue": [
                [
                  "первая"
                ],
                [
                  "вторая"
                ],
                true,
                true,
                true,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Два каталога сохраняют разные списки книг и возвращают свои исходные объекты."
            },
            {
              "expression": "list((lambda b:[b.title,b.borrow(),b.available,b.borrow(),b.return_book(),b.return_book(),b.available])(Book('Python')))",
              "expectedValue": [
                "Python",
                true,
                false,
                false,
                true,
                false,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Book: Полный путь изменений."
            },
            {
              "expression": "(lambda a,b:(a.borrow(),b.available)[1])(Book('a'),Book('b'))",
              "expectedValue": true,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Book: Независимые экземпляры."
            },
            {
              "expression": "Book('').title",
              "expectedValue": "",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Book: Пустое название не запрещено этим контрактом."
            },
            {
              "expression": "(lambda first,second:[first.title,second.title,first.available,second.available,first.borrow(),second.available])(Book('первая'),Book('вторая'))",
              "expectedValue": [
                "первая",
                "вторая",
                true,
                true,
                true,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Book: Две одновременно существующие книги сохраняют разные публичные названия и независимую доступность."
            }
          ],
          "reference": "class Book:\n    def __init__(self,title):\n        self.title=title\n        self.available=True\n    def borrow(self):\n        if not self.available:return False\n        self.available=False\n        return True\n    def return_book(self):\n        if self.available:return False\n        self.available=True\n        return True\nclass Library:\n    def __init__(self,books):self.books=list(books)\n    def find(self,title):\n        for book in self.books:\n            if book.title==title:return book\n        return None\n    def loan(self,title):\n        book=self.find(title)\n        return book.borrow() if book is not None else False",
          "alternative": "class Book:\n    def __init__(self,title):self.title=title;self.available=True\n    def borrow(self):\n        changed=self.available\n        self.available=False\n        return changed\n    def return_book(self):\n        changed=not self.available\n        self.available=True\n        return changed\nclass Library:\n    def __init__(self,books):self.books=books.copy()\n    def find(self,title):\n        matches=[b for b in self.books if b.title==title]\n        return matches[0] if matches else None\n    def loan(self,title):\n        found=self.find(title)\n        if found is None:return False\n        return found.borrow()",
          "wrongSolutions": [
            {
              "code": "class Book:\n    def __init__(self,title):\n        self.title=title\n        self.available=True\n    def borrow(self):\n        if not self.available:return False\n        self.available=False\n        return True\n    def return_book(self):\n        if self.available:return False\n        self.available=True\n        return True\nclass Library:\n    def __init__(self,books):self.books=books\n    def find(self,title):\n        for book in self.books:\n            if book.title==title:return book\n        return None\n    def loan(self,title):\n        book=self.find(title)\n        return book.borrow() if book is not None else False",
              "why": "Каталог делит изменения входного списка."
            },
            {
              "code": "class Book:\n    def __init__(self,title):\n        self.title=title\n        self.available=True\n    def borrow(self):\n        if not self.available:return False\n        self.available=False\n        return True\n    def return_book(self):\n        if self.available:return False\n        self.available=True\n        return True\nclass Library:\n    def __init__(self,books):self.books=list(books)\n    def find(self,title):\n        for book in self.books:\n            if book.title==title:return book\n        return None\n    def loan(self,title):\n        book=self.find(title)\n        return book is not None",
              "why": "loan не меняет состояние книги."
            },
            {
              "code": "class Book:\n    def __init__(self,title):\n        self.title=title\n        self.available=True\n    def borrow(self):\n        if not self.available:return False\n        self.available=False\n        return True\n    def return_book(self):\n        if self.available:return False\n        self.available=True\n        return True\nclass Library:\n    def __init__(self,books):Library.books=list(books)\n    def find(self,title):\n        for book in self.books:\n            if book.title==title:return book\n        return None\n    def loan(self,title):\n        book=self.find(title)\n        return book.borrow() if book is not None else False",
              "why": "Каталоги делят список класса: создание второго каталога меняет состав первого."
            },
            {
              "code": "class Book:\n    def __init__(self,title):\n        Book.title=title\n        self.available=True\n    def borrow(self):\n        if not self.available:return False\n        self.available=False\n        return True\n    def return_book(self):\n        if self.available:return False\n        self.available=True\n        return True\nclass Library:\n    def __init__(self,books):self.books=list(books)\n    def find(self,title):\n        for book in self.books:\n            if book.title==title:return book\n        return None\n    def loan(self,title):\n        book=self.find(title)\n        return book.borrow() if book is not None else False",
              "why": "Требуемый компонент Book тоже сохраняет индивидуальные названия; нельзя ослабить его контракт в составе проекта."
            }
          ],
          "hints": [
            "Каталог хранит ссылки на книги, но имеет свой список.",
            "find возвращает объект, не просто название.",
            "loan делегирует borrow найденному объекту."
          ],
          "solutionExplanation": [
            "Поверхностная копия списка и намеренно общая книга проверяются раздельно.",
            "Делегирование сохраняет правило повторной выдачи."
          ],
          "required": true
        },
        {
          "id": "oop-library-project-task-4",
          "kind": "code",
          "title": "Журнал библиотеки",
          "goal": "Журнал библиотеки",
          "prerequisites": [
            "oop-library-project"
          ],
          "prompt": "Реализуй Book, Library и run_library(titles, commands). Названия в titles уникальны. Команды — пары (\"borrow\" или \"return\", title). Верни словарь results с фактом успеха каждой команды и available с доступными названиями по алфавиту. Неизвестная книга даёт False для текущей команды. Каждый вызов начинает новое независимое состояние.",
          "inputFormat": "Реализуй объявленные классы, методы и функции. Проверка создаёт экземпляры, передаёт аргументы и читает публичные атрибуты. Ввод с клавиатуры не используется.",
          "outputFormat": "Наблюдаемое состояние объектов и результаты методов по контракту. Консоль должна оставаться пустой.",
          "constraints": "Реализуй объявленный публичный интерфейс. Не используй input() и print(). Создание нескольких экземпляров и граничные случаи проверяются отдельно; объекты не должны делить состояние без явного требования.",
          "examples": [
            {
              "input": [
                "run_library(['b','a'],[('borrow','a'),('borrow','a'),('return','a'),('borrow','missing')])"
              ],
              "output": "{'results': [True, False, True, False], 'available': ['a', 'b']}",
              "explanation": "Повтор, возврати неизвестная книга."
            },
            {
              "input": [
                "run_library([],[])"
              ],
              "output": "{'results': [], 'available': []}",
              "explanation": "Пустой каталог."
            }
          ],
          "initialCode": "# Реализуй Book, Library и run_library(titles, commands)",
          "tests": [
            {
              "expression": "run_library(['b','a'],[('borrow','a'),('borrow','a'),('return','a'),('borrow','missing')])",
              "expectedValue": {
                "results": [
                  true,
                  false,
                  true,
                  false
                ],
                "available": [
                  "a",
                  "b"
                ]
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Повтор, возврати неизвестная книга."
            },
            {
              "expression": "run_library([],[])",
              "expectedValue": {
                "results": [],
                "available": []
              },
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Пустой каталог."
            },
            {
              "expression": "[run_library(['a'],[('borrow','a')]),run_library(['a'],[])]",
              "expectedValue": [
                {
                  "results": [
                    true
                  ],
                  "available": []
                },
                {
                  "results": [],
                  "available": [
                    "a"
                  ]
                }
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Два вызова независимы."
            },
            {
              "expression": "[Book('x').available,Library([Book('x')]).loan('x')]",
              "expectedValue": [
                true,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Классы остаются частью публичного контракта."
            },
            {
              "expression": "list((lambda b:[b.title,b.borrow(),b.available,b.borrow(),b.return_book(),b.return_book(),b.available])(Book('Python')))",
              "expectedValue": [
                "Python",
                true,
                false,
                false,
                true,
                false,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Book: Полный путь изменений."
            },
            {
              "expression": "(lambda a,b:(a.borrow(),b.available)[1])(Book('a'),Book('b'))",
              "expectedValue": true,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Book: Независимые экземпляры."
            },
            {
              "expression": "Book('').title",
              "expectedValue": "",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Book: Пустое название не запрещено этим контрактом."
            },
            {
              "expression": "(lambda first,second:[first.title,second.title,first.available,second.available,first.borrow(),second.available])(Book('первая'),Book('вторая'))",
              "expectedValue": [
                "первая",
                "вторая",
                true,
                true,
                true,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Book: Две одновременно существующие книги сохраняют разные публичные названия и независимую доступность."
            },
            {
              "expression": "list((lambda b:(lambda lib:[lib.find('x') is b,lib.loan('x'),b.available,lib.loan('x'),lib.loan('missing')])(Library([b])))(Book('x')))",
              "expectedValue": [
                true,
                true,
                false,
                false,
                false
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Library: Найден именно общий объект."
            },
            {
              "expression": "Library([]).find('x')",
              "expectedValue": null,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Library: Пустой каталог."
            },
            {
              "expression": "(lambda source:(lambda lib:(source.append(Book('b')),len(lib.books))[1])(Library(source)))([Book('a')])",
              "expectedValue": 1,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Library: Список каталога скопирован."
            },
            {
              "expression": "(lambda source:(lambda lib:(source.append(Book('x')),len(lib.books))[1])(Library(source)))([])",
              "expectedValue": 0,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Library: Пустой список каталога тоже не разделяется с входом."
            },
            {
              "expression": "(lambda b:(lambda lib:(setattr(b,'borrow',lambda:(_calls.append(1),True)[1]),[lib.loan('x'),len(_calls)])[1])(Library([b])))(Book('x'))",
              "expectedValue": [
                true,
                1
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Library: Library.loan делегирует выдачу найденному объекту.",
              "setup": "_calls=[]"
            },
            {
              "expression": "(lambda first,second:(lambda a,b:[[book.title for book in a.books],[book.title for book in b.books],a.find('первая') is first,b.find('вторая') is second,isinstance(a.books,list),isinstance(b.books,list)])(Library([first]),Library([second])))(Book('первая'),Book('вторая'))",
              "expectedValue": [
                [
                  "первая"
                ],
                [
                  "вторая"
                ],
                true,
                true,
                true,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Library: Два каталога сохраняют разные списки книг и возвращают свои исходные объекты."
            },
            {
              "expression": "list((lambda b:[b.title,b.borrow(),b.available,b.borrow(),b.return_book(),b.return_book(),b.available])(Book('Python')))",
              "expectedValue": [
                "Python",
                true,
                false,
                false,
                true,
                false,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Library: Сохраняется полный контракт Book: Полный путь изменений."
            },
            {
              "expression": "(lambda a,b:(a.borrow(),b.available)[1])(Book('a'),Book('b'))",
              "expectedValue": true,
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Library: Сохраняется полный контракт Book: Независимые экземпляры."
            },
            {
              "expression": "Book('').title",
              "expectedValue": "",
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Library: Сохраняется полный контракт Book: Пустое название не запрещено этим контрактом."
            },
            {
              "expression": "(lambda first,second:[first.title,second.title,first.available,second.available,first.borrow(),second.available])(Book('первая'),Book('вторая'))",
              "expectedValue": [
                "первая",
                "вторая",
                true,
                true,
                true,
                true
              ],
              "expectedOutput": "",
              "expectedCallOutput": "",
              "description": "Сохраняется полный контракт Library: Сохраняется полный контракт Book: Две одновременно существующие книги сохраняют разные публичные названия и независимую доступность."
            }
          ],
          "reference": "class Book:\n    def __init__(self,title):\n        self.title=title\n        self.available=True\n    def borrow(self):\n        if not self.available:return False\n        self.available=False\n        return True\n    def return_book(self):\n        if self.available:return False\n        self.available=True\n        return True\nclass Library:\n    def __init__(self,books):self.books=list(books)\n    def find(self,title):\n        for book in self.books:\n            if book.title==title:return book\n        return None\n    def loan(self,title):\n        book=self.find(title)\n        return book.borrow() if book is not None else False\ndef run_library(titles,commands):\n    library=Library([Book(title) for title in titles])\n    results=[]\n    for action,title in commands:\n        book=library.find(title)\n        if book is None:\n            results.append(False)\n        elif action==\"borrow\":\n            results.append(book.borrow())\n        else:\n            results.append(book.return_book())\n    return {\"results\":results,\"available\":sorted(book.title for book in library.books if book.available)}",
          "alternative": "class Book:\n    def __init__(self,title):self.title=title;self.available=True\n    def borrow(self):\n        changed=self.available\n        self.available=False\n        return changed\n    def return_book(self):\n        changed=not self.available\n        self.available=True\n        return changed\nclass Library:\n    def __init__(self,books):self.books=books.copy()\n    def find(self,title):\n        matches=[b for b in self.books if b.title==title]\n        return matches[0] if matches else None\n    def loan(self,title):\n        found=self.find(title)\n        if found is None:return False\n        return found.borrow()\ndef run_library(titles,commands):\n    books=[Book(title) for title in titles]\n    catalog=Library(books)\n    outcomes=[]\n    for command in commands:\n        action,title=command\n        selected=catalog.find(title)\n        if selected is None:\n            outcomes+=[False]\n        else:\n            method=selected.borrow if action==\"borrow\" else selected.return_book\n            outcomes.append(method())\n    names=[b.title for b in books if b.available]\n    return dict(results=outcomes,available=sorted(names))",
          "wrongSolutions": [
            {
              "code": "class Book:\n    def __init__(self,title):\n        self.title=title\n        self.available=True\n    def borrow(self):\n        if not self.available:return False\n        self.available=False\n        return True\n    def return_book(self):\n        if self.available:return False\n        self.available=True\n        return True\nclass Library:\n    def __init__(self,books):self.books=list(books)\n    def find(self,title):\n        for book in self.books:\n            if book.title==title:return book\n        return None\n    def loan(self,title):\n        book=self.find(title)\n        return book.borrow() if book is not None else False\ndef run_library(titles,commands):\n    library=Library([Book(title) for title in titles])\n    results=[]\n    for action,title in commands:\n        book=library.find(title)\n        if book is None:\n            results.append(False)\n        elif action==\"borrow\":\n            results.append(book.borrow())\n        else:\n            results.append(book.borrow())\n    return {\"results\":results,\"available\":sorted(book.title for book in library.books if book.available)}",
              "why": "Возврат перепутан с выдачей."
            },
            {
              "code": "class Book:\n    def __init__(self,title):\n        self.title=title\n        self.available=True\n    def borrow(self):\n        if not self.available:return False\n        self.available=False\n        return True\n    def return_book(self):\n        if self.available:return False\n        self.available=True\n        return True\nclass Library:\n    def __init__(self,books):self.books=list(books)\n    def find(self,title):\n        for book in self.books:\n            if book.title==title:return book\n        return None\n    def loan(self,title):\n        book=self.find(title)\n        return book.borrow() if book is not None else False\ndef run_library(titles,commands):\n    library=Library([Book(title) for title in titles])\n    results=[]\n    for action,title in commands:\n        book=library.find(title)\n        if book is None:\n            results.append(False)\n        elif action==\"borrow\":\n            results.append(book.borrow())\n        else:\n            results.append(book.return_book())\n    return {\"results\":results,\"available\":sorted(book.title for book in library.books)}",
              "why": "Спис o к доступных содержит и выданные книги."
            },
            {
              "code": "class Book:\n    def __init__(self,title):\n        Book.title=title\n        self.available=True\n    def borrow(self):\n        if not self.available:return False\n        self.available=False\n        return True\n    def return_book(self):\n        if self.available:return False\n        self.available=True\n        return True\nclass Library:\n    def __init__(self,books):self.books=list(books)\n    def find(self,title):\n        for book in self.books:\n            if book.title==title:return book\n        return None\n    def loan(self,title):\n        book=self.find(title)\n        return book.borrow() if book is not None else False\ndef run_library(titles,commands):\n    library=Library([Book(title) for title in titles])\n    results=[]\n    for action,title in commands:\n        book=library.find(title)\n        if book is None:\n            results.append(False)\n        elif action==\"borrow\":\n            results.append(book.borrow())\n        else:\n            results.append(book.return_book())\n    return {\"results\":results,\"available\":sorted(book.title for book in library.books if book.available)}",
              "why": "Требуемый компонент Book тоже сохраняет индивидуальные названия; нельзя ослабить его контракт в составе проекта."
            },
            {
              "code": "class Book:\n    def __init__(self,title):\n        self.title=title\n        self.available=True\n    def borrow(self):\n        if not self.available:return False\n        self.available=False\n        return True\n    def return_book(self):\n        if self.available:return False\n        self.available=True\n        return True\nclass Library:\n    def __init__(self,books):Library.books=list(books)\n    def find(self,title):\n        for book in self.books:\n            if book.title==title:return book\n        return None\n    def loan(self,title):\n        book=self.find(title)\n        return book.borrow() if book is not None else False\ndef run_library(titles,commands):\n    library=Library([Book(title) for title in titles])\n    results=[]\n    for action,title in commands:\n        book=library.find(title)\n        if book is None:\n            results.append(False)\n        elif action==\"borrow\":\n            results.append(book.borrow())\n        else:\n            results.append(book.return_book())\n    return {\"results\":results,\"available\":sorted(book.title for book in library.books if book.available)}",
              "why": "Итоговая задача требует независимые каталоги Library, даже если одна последовательность run_library выглядит верной."
            }
          ],
          "hints": [
            "Сначала проверь классы поотдельности.",
            "Каждый вызов создаёт новый каталог; команды исполняются по порядку.",
            "Собери результат каждой действия, затем отбери available и отсортируй названия."
          ],
          "solutionExplanation": [
            "Проект объединил создание, состояние, композицию и детерминированный отчёт.",
            "Никакие данные рабочего сайта классы не изменяют; всё в памяти учебного запуска."
          ],
          "required": true
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.12/tutorial/classes.html",
    "https://docs.python.org/3.12/reference/datamodel.html#special-method-names"
  ]
};

export default module;
