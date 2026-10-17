import type {ModuleIndex} from './metadata';
// Generated from authored modules. No prose, test inputs or solutions in this index.
export const COURSE_INDEX:ModuleIndex[] = [
  {
    "id": "output",
    "title": "Первая программа и вывод",
    "goal": "Создавать точный текстовый результат, понимать порядок выполнения и исправлять ошибки записи.",
    "track": "base",
    "depth": "Практический модуль",
    "prerequisites": [],
    "lessons": [
      {
        "id": "output-print",
        "title": "Первая команда print",
        "goal": "Напечатать сообщение и отличить программу от её результата.",
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "output-print-step-1",
            "title": "От программы к результату"
          },
          {
            "id": "output-print-step-2",
            "title": "Как читать ошибку"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "output-first-message",
            "title": "Первое сообщение",
            "kind": "code",
            "required": true
          },
          {
            "id": "output-empty-line",
            "title": "Пустая строка",
            "kind": "code",
            "required": true
          },
          {
            "id": "output-visible-value",
            "title": "Что попадёт в вывод?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "output-literals",
        "title": "Текст, числа и кавычки",
        "goal": "Различить текстовый литерал и число; вывести кавычки внутри сообщения.",
        "role": "lesson",
        "prerequisites": [
          "output-print"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "output-literals-step-1",
            "title": "Значение и его запись"
          },
          {
            "id": "output-literals-step-2",
            "title": "Проверь границы строки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "output-quoted-button",
            "title": "Кавычки на экране",
            "kind": "code",
            "required": true
          },
          {
            "id": "output-hash-data",
            "title": "Знак решётки",
            "kind": "code",
            "required": true
          },
          {
            "id": "output-missing-quotes",
            "title": "Почему возникла ошибка?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "output-sequence",
        "title": "Порядок команд и несколько строк",
        "goal": "Получить заданный многострочный вывод и прочитать программу сверху вниз.",
        "role": "lesson",
        "prerequisites": [
          "output-literals"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "output-sequence-step-1",
            "title": "Команды выполняются по порядку"
          },
          {
            "id": "output-sequence-step-2",
            "title": "Отступы и остановка при ошибке"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "output-two-column-lines",
            "title": "Карточка книги",
            "kind": "code",
            "required": true
          },
          {
            "id": "output-paragraph-gap",
            "title": "Абзацы",
            "kind": "code",
            "required": true
          },
          {
            "id": "output-order-lines",
            "title": "Собери инструкции",
            "kind": "order",
            "required": true
          }
        ]
      },
      {
        "id": "output-format",
        "title": "Аргументы, sep и end",
        "goal": "Собрать одну строку из нескольких значений и настроить разделители.",
        "role": "lesson",
        "prerequisites": [
          "output-sequence"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "output-format-step-1",
            "title": "Запятая отделяет значения"
          },
          {
            "id": "output-format-step-2",
            "title": "Окончание вызова"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "output-path-separator",
            "title": "Путь из частей",
            "kind": "code",
            "required": true
          },
          {
            "id": "output-joined-status",
            "title": "Соединить два вызова",
            "kind": "gap",
            "required": true
          },
          {
            "id": "output-sep-end-result",
            "title": "Что разделяет sep?",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "output-escapes",
        "title": "Переносы, обратный слеш и специальные символы",
        "goal": "Читать и записывать строки с управляющими последовательностями.",
        "role": "lesson",
        "prerequisites": [
          "output-format"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "output-escapes-step-1",
            "title": "Один символ записывается двумя знаками"
          },
          {
            "id": "output-escapes-step-2",
            "title": "Несколько строк — один текст"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "output-backslash-guide",
            "title": "Инструкция о переносе",
            "kind": "code",
            "required": true
          },
          {
            "id": "output-triple-lines",
            "title": "Три строки",
            "kind": "code",
            "required": true
          },
          {
            "id": "output-escape-predict",
            "title": "Лишняя пустая строка",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "output-review",
        "title": "Повторение: прочитать и исправить вывод",
        "goal": "Найти причину неправильного результата и отличить код от результата.",
        "role": "review",
        "prerequisites": [
          "output-escapes"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "output-review-step-1",
            "title": "Проверяй не только буквы"
          },
          {
            "id": "output-review-step-2",
            "title": "Перенос навыка"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "output-debug-heading",
            "title": "Исправь заголовок",
            "kind": "debug",
            "required": true
          },
          {
            "id": "output-review-choices",
            "title": "Правила вывода",
            "kind": "choice",
            "required": true
          },
          {
            "id": "output-simple-frame",
            "title": "Рамка из текста",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "output-assessment",
        "title": "Контрольная: точный вывод",
        "goal": "Самостоятельно собрать заданный результат без готового кода.",
        "role": "assessment",
        "prerequisites": [
          "output-review"
        ],
        "estimatedMinutes": 30,
        "steps": [
          {
            "id": "output-assessment-step-1",
            "title": "Правила работы"
          },
          {
            "id": "output-assessment-step-2",
            "title": "Как проверить себя"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "output-assess-instruction",
            "title": "Инструкция из четырёх строк",
            "kind": "code",
            "required": true
          },
          {
            "id": "output-assess-symbols",
            "title": "Обозначения",
            "kind": "code",
            "required": true
          },
          {
            "id": "output-assess-explain",
            "title": "Причина разрыва",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "output-project",
        "title": "Мини-проект: памятка команды",
        "goal": "Спроектировать читаемую текстовую памятку по требованиям.",
        "role": "project",
        "prerequisites": [
          "output-assessment"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "output-project-step-1",
            "title": "Контракт памятки"
          },
          {
            "id": "output-project-step-2",
            "title": "От требований к проверке"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "output-project-card",
            "title": "Памятка запуска",
            "kind": "code",
            "required": true
          },
          {
            "id": "output-project-receipt",
            "title": "Чек без вычислений",
            "kind": "code",
            "required": true
          },
          {
            "id": "output-project-plan",
            "title": "План проверки проекта",
            "kind": "order",
            "required": true
          }
        ]
      }
    ]
  },
  {
    "id": "foundations",
    "title": "Переменные, типы, ввод и преобразования",
    "goal": "Моделировать простые данные, читать ввод и строить последовательные программы без потери значений.",
    "track": "base",
    "depth": "Практический модуль",
    "prerequisites": [
      "output"
    ],
    "lessons": [
      {
        "id": "foundations-names",
        "title": "Переменная: имя для значения",
        "goal": "Сохранить значение под именем и использовать его в выводе.",
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "foundations-names-step-1",
            "title": "Зачем сохранять данные"
          },
          {
            "id": "foundations-names-step-2",
            "title": "Имя и текст имени"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "foundations-name-card",
            "title": "Карточка ученика",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-read-twice",
            "title": "Повторное чтение",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-literal-and-name",
            "title": "Подпись поля",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-name-predict",
            "title": "Порядок чтения",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "foundations-state",
        "title": "Присваивание и изменение состояния",
        "goal": "Проследить значения после последовательных присваиваний.",
        "role": "lesson",
        "prerequisites": [
          "foundations-names"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "foundations-state-step-1",
            "title": "Новое значение не меняет прошлое"
          },
          {
            "id": "foundations-state-step-2",
            "title": "Таблица помогает не гадать"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "foundations-save-old",
            "title": "Сохрани старое значение",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-swap",
            "title": "Обмен местами",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-update-score",
            "title": "Обновление счёта",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-order-snapshot",
            "title": "Снимок до изменения",
            "kind": "order",
            "required": true
          }
        ]
      },
      {
        "id": "foundations-types",
        "title": "Типы int, float, str и bool",
        "goal": "Выбрать вид данных и прочитать результат type.",
        "role": "lesson",
        "prerequisites": [
          "foundations-state"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "foundations-types-step-1",
            "title": "Почему вид данных важен"
          },
          {
            "id": "foundations-types-step-2",
            "title": "Проверка предположений"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "foundations-four-values",
            "title": "Четыре значения",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-report-types",
            "title": "Типы значений",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-dot-number",
            "title": "Десятичная точка",
            "kind": "debug",
            "required": true
          },
          {
            "id": "foundations-type-claims",
            "title": "Что является строкой?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "foundations-input",
        "title": "input: программа получает данные",
        "goal": "Прочитать строки в объявленном порядке и не путать ввод с выводом.",
        "role": "lesson",
        "prerequisites": [
          "foundations-types"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "foundations-input-step-1",
            "title": "Один вызов — одна строка"
          },
          {
            "id": "foundations-input-step-2",
            "title": "Сохрани, затем используй"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "foundations-greeting",
            "title": "Приветствие по вводу",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-address",
            "title": "Адрес из двух строк",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-double-echo",
            "title": "Эхо без повторного ввода",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-input-predict",
            "title": "Пробел внутри строки",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "foundations-integers",
        "title": "Из текста в целое число",
        "goal": "Преобразовать ввод в int и отличить сложение чисел от соединения строк.",
        "role": "lesson",
        "prerequisites": [
          "foundations-input"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "foundations-integers-step-1",
            "title": "Сначала выбери смысл"
          },
          {
            "id": "foundations-integers-step-2",
            "title": "Ввод — граница программы"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "foundations-two-sum",
            "title": "Сложить два количества",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-next-number",
            "title": "Следующее число",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-three-counts",
            "title": "Три коробки",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-int-error",
            "title": "Почему int не сработал?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "foundations-floats",
        "title": "Дробные числа и ограничения float",
        "goal": "Прочитать float и выбрать понятное представление результата.",
        "role": "lesson",
        "prerequisites": [
          "foundations-integers"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "foundations-floats-step-1",
            "title": "Дробный ввод"
          },
          {
            "id": "foundations-floats-step-2",
            "title": "Точность и округление"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "foundations-temperature-change",
            "title": "Изменение температуры",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-round-measure",
            "title": "Округлить измерение",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-mixed-total",
            "title": "Целое и дробное",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-float-output",
            "title": "Что обещает round?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "foundations-text-bool",
        "title": "Текстовое представление и bool",
        "goal": "Явно преобразовать число в текст и понять истинность простых значений.",
        "role": "lesson",
        "prerequisites": [
          "foundations-floats"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "foundations-text-bool-step-1",
            "title": "Строка для сообщения"
          },
          {
            "id": "foundations-text-bool-step-2",
            "title": "Логическое значение не текст"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "foundations-label-number",
            "title": "Метка с числом",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-has-text",
            "title": "Есть ли текст?",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-has-number",
            "title": "Ненулевое число",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-bool-predict",
            "title": "Непустое слово",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "foundations-review",
        "title": "Повторение: данные проходят через программу",
        "goal": "Проследить ввод, преобразование, состояние и вывод в одной задаче.",
        "role": "review",
        "prerequisites": [
          "foundations-text-bool"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "foundations-review-step-1",
            "title": "Четыре этапа"
          },
          {
            "id": "foundations-review-step-2",
            "title": "Отладка без случайных изменений"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "foundations-review-order",
            "title": "Заявка",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-review-debug",
            "title": "Цена не склеивается",
            "kind": "debug",
            "required": true
          },
          {
            "id": "foundations-review-shift",
            "title": "Старое и новое имя",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-review-type-choice",
            "title": "Выбор типа по смыслу",
            "kind": "choice",
            "required": true
          },
          {
            "id": "foundations-review-read-count",
            "title": "Лишний input",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "foundations-assessment",
        "title": "Контрольная: вход, типы и состояние",
        "goal": "Самостоятельно выбрать преобразования и сохранить необходимые данные.",
        "role": "assessment",
        "prerequisites": [
          "foundations-review"
        ],
        "estimatedMinutes": 45,
        "steps": [
          {
            "id": "foundations-assessment-step-1",
            "title": "Самостоятельный выбор"
          },
          {
            "id": "foundations-assessment-step-2",
            "title": "Как понять результат"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "foundations-assess-stock",
            "title": "Остаток на складе",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-assess-code-count",
            "title": "Код и общее количество",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-assess-zero",
            "title": "Числовая истинность",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-assess-average-input",
            "title": "Сумма измерений с округлением",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-assess-reason",
            "title": "Почему исчезли нули?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "foundations-project",
        "title": "Мини-проект: регистрационная карточка",
        "goal": "Собрать отчёт из разнородных входных данных с сохранением исходных значений.",
        "role": "project",
        "prerequisites": [
          "foundations-assessment"
        ],
        "estimatedMinutes": 50,
        "steps": [
          {
            "id": "foundations-project-step-1",
            "title": "Спроектируй поля"
          },
          {
            "id": "foundations-project-step-2",
            "title": "Раздели вычисление и оформление"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "foundations-project-card",
            "title": "Карточка участника",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-project-meter",
            "title": "Журнал показаний",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-project-availability",
            "title": "Отчёт о заполнении",
            "kind": "code",
            "required": true
          },
          {
            "id": "foundations-project-plan",
            "title": "План отчёта",
            "kind": "order",
            "required": true
          }
        ]
      }
    ]
  },
  {
    "id": "arithmetic",
    "title": "Арифметика и числовые задачи",
    "goal": "Выбирать числовую модель, единицы и правила округления, проверять границы и объяснять формулу.",
    "track": "base",
    "depth": "Практический модуль",
    "prerequisites": [
      "foundations"
    ],
    "lessons": [
      {
        "id": "arithmetic-operations",
        "title": "Выражения и единицы измерения",
        "goal": "Перевести словесный расчёт в выражение с +, -, * и **.",
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "arithmetic-operations-step-1",
            "title": "Модель раньше формулы"
          },
          {
            "id": "arithmetic-operations-step-2",
            "title": "Степень и знак"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "arithmetic-rectangle-area",
            "title": "Площадь прямоугольника",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-budget-difference",
            "title": "Остаток бюджета",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-cube-volume",
            "title": "Объём куба",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-unit-choice",
            "title": "Смысл выражения",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "arithmetic-division",
        "title": "Обычное и целочисленное деление",
        "goal": "Выбрать / или // по смыслу результата и объяснить их различие.",
        "role": "lesson",
        "prerequisites": [
          "arithmetic-operations"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "arithmetic-division-step-1",
            "title": "Две разные задачи"
          },
          {
            "id": "arithmetic-division-step-2",
            "title": "Границы и типы"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "arithmetic-full-packs",
            "title": "Полные пачки",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-average-two",
            "title": "Среднее двух измерений",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-distance-speed",
            "title": "Средняя скорость",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-division-predict",
            "title": "Два деления",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "arithmetic-remainder",
        "title": "Остаток и разложение числа",
        "goal": "Использовать % вместе с // для групп, времени и цифр.",
        "role": "lesson",
        "prerequisites": [
          "arithmetic-division"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "arithmetic-remainder-step-1",
            "title": "Сколько осталось вне групп"
          },
          {
            "id": "arithmetic-remainder-step-2",
            "title": "Измерения и цифры"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "arithmetic-leftover",
            "title": "Лишние предметы",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-time-parts",
            "title": "Минуты и секунды",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-tens-digit",
            "title": "Цифра десятков",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-remainder-claims",
            "title": "Граница остатка",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "arithmetic-negative",
        "title": "Отрицательное деление и направление округления",
        "goal": "Объяснить // и % на отрицательных числах и отличить int от floor division.",
        "role": "lesson",
        "prerequisites": [
          "arithmetic-remainder"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "arithmetic-negative-step-1",
            "title": "Вниз — это по числовой прямой"
          },
          {
            "id": "arithmetic-negative-step-2",
            "title": "Остаток согласован с делителем"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "arithmetic-negative-floor",
            "title": "Целое частное вниз",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-negative-remainder",
            "title": "Остаток с положительным основанием",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-day-offset",
            "title": "Сдвиг дня",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-negative-predict",
            "title": "Восстановление делимого",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "arithmetic-precedence",
        "title": "Приоритет и скобки",
        "goal": "Читать выражение по правилам Python и задавать нужную группировку.",
        "role": "lesson",
        "prerequisites": [
          "arithmetic-negative"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "arithmetic-precedence-step-1",
            "title": "Порядок не равен чтению слева направо"
          },
          {
            "id": "arithmetic-precedence-step-2",
            "title": "Степень и минус"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "arithmetic-perimeter",
            "title": "Периметр прямоугольника",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-cart-total",
            "title": "Покупка с доставкой",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-square-difference",
            "title": "Квадрат разности",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-priority-predict",
            "title": "Что изменили скобки?",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "arithmetic-units",
        "title": "Единицы, разряды и округление вверх",
        "goal": "Собрать целочисленный расчёт из нескольких шагов без ветвлений.",
        "role": "lesson",
        "prerequisites": [
          "arithmetic-precedence"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "arithmetic-units-step-1",
            "title": "Приведи единицы к одному масштабу"
          },
          {
            "id": "arithmetic-units-step-2",
            "title": "Сколько ёмкостей потребуется"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "arithmetic-duration-seconds",
            "title": "Общая длительность",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-all-boxes",
            "title": "Коробки для всех предметов",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-clock-parts",
            "title": "Разложить секунды",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-ceil-error",
            "title": "Почему лишняя коробка?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "arithmetic-rounding",
        "title": "Проценты, средние и округление результата",
        "goal": "Объявить правило округления и не смешивать округление с отбрасыванием.",
        "role": "lesson",
        "prerequisites": [
          "arithmetic-units"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "arithmetic-rounding-step-1",
            "title": "Формула процента"
          },
          {
            "id": "arithmetic-rounding-step-2",
            "title": "Что именно округлять"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "arithmetic-discount-integer",
            "title": "Скидка в целых единицах",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-three-average",
            "title": "Средняя температура",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-payment-remainder",
            "title": "Рубли и копейки",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-round-predict",
            "title": "Половина и чётность",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "arithmetic-review",
        "title": "Смешанная практика: выбрать модель расчёта",
        "goal": "Согласовать единицы, формулу, округление и формат результата.",
        "role": "review",
        "prerequisites": [
          "arithmetic-rounding"
        ],
        "estimatedMinutes": 45,
        "steps": [
          {
            "id": "arithmetic-review-step-1",
            "title": "Сначала разберись с вопросом"
          },
          {
            "id": "arithmetic-review-step-2",
            "title": "Проверка без угадывания"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "arithmetic-review-digit-sum",
            "title": "Сумма цифр трёхзначного числа",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-review-film",
            "title": "Конец просмотра",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-review-average-fix",
            "title": "Исправь формулу среднего",
            "kind": "debug",
            "required": true
          },
          {
            "id": "arithmetic-review-operators",
            "title": "Три вопроса о делении",
            "kind": "choice",
            "required": true
          },
          {
            "id": "arithmetic-review-floor-reason",
            "title": "Неверная замена //",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "arithmetic-assessment",
        "title": "Контрольная: числовые модели",
        "goal": "Самостоятельно решить новые задачи на целые единицы, границы и формулы.",
        "role": "assessment",
        "prerequisites": [
          "arithmetic-review"
        ],
        "estimatedMinutes": 50,
        "steps": [
          {
            "id": "arithmetic-assessment-step-1",
            "title": "Новые условия, знакомые инструменты"
          },
          {
            "id": "arithmetic-assessment-step-2",
            "title": "Обоснование и самостоятельность"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "arithmetic-assess-printing",
            "title": "Стоимость печати",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-assess-pages",
            "title": "Число страниц каталога",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-assess-reverse-digits",
            "title": "Обратная запись трёх цифр",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-assess-duration",
            "title": "Полные интервалы и остаток",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-assess-contract",
            "title": "Округление не там",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "arithmetic-project",
        "title": "Мини-проект: планировщик поездки",
        "goal": "Объединить стоимость, вместимость и длительность в один числовой отчёт.",
        "role": "project",
        "prerequisites": [
          "arithmetic-assessment"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "arithmetic-project-step-1",
            "title": "Несколько расчётов — один контракт"
          },
          {
            "id": "arithmetic-project-step-2",
            "title": "Сделай проверяемый отчёт"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "arithmetic-project-transport",
            "title": "Транспорт и аренда",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-project-trip-time",
            "title": "Время с остановками",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-project-spend",
            "title": "Расход на группу",
            "kind": "code",
            "required": true
          },
          {
            "id": "arithmetic-project-plan",
            "title": "Порядок расчёта аренды",
            "kind": "order",
            "required": true
          }
        ]
      }
    ]
  },
  {
    "id": "conditions",
    "title": "Сравнения, логика и условия",
    "goal": "Переводить правила в точные проверки, покрывать границы и безопасно выбирать действия.",
    "track": "base",
    "depth": "Практический модуль",
    "prerequisites": [
      "arithmetic"
    ],
    "lessons": [
      {
        "id": "conditions-comparison",
        "title": "Сравнения и = против ==",
        "goal": "Получить bool из сравнения и отличить проверку от присваивания.",
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "conditions-comparison-step-1",
            "title": "Вопрос к значениям"
          },
          {
            "id": "conditions-comparison-step-2",
            "title": "Равенство зависит от данных"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "conditions-equal-values",
            "title": "Равны ли числа?",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-at-least",
            "title": "Достаточно мест?",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-text-match",
            "title": "Точное кодовое слово",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-equality-claims",
            "title": "Присвоить или спросить?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "conditions-bounds",
        "title": "Границы и цепочки сравнений",
        "goal": "Записать закрытый, открытый и полуоткрытый интервал без ошибки на границе.",
        "role": "lesson",
        "prerequisites": [
          "conditions-comparison"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "conditions-bounds-step-1",
            "title": "Включать ли край"
          },
          {
            "id": "conditions-bounds-step-2",
            "title": "Разные единицы и порядок данных"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "conditions-closed-interval",
            "title": "Попадание в интервал",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-valid-index",
            "title": "Допустимый номер",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-open-interval",
            "title": "Строго внутри",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-boundary-predict",
            "title": "Одна точка, разные интервалы",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "conditions-branches",
        "title": "if и else: выбор действия",
        "goal": "Написать взаимоисключающие ветви с правильными отступами.",
        "role": "lesson",
        "prerequisites": [
          "conditions-bounds"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "conditions-branches-step-1",
            "title": "От вопроса к действию"
          },
          {
            "id": "conditions-branches-step-2",
            "title": "Ошибки записи и смысла"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "conditions-parity",
            "title": "Чётное или нечётное",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-absolute",
            "title": "Модуль числа ветвлением",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-ticket",
            "title": "Билет по возрасту",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-indent-order",
            "title": "Собери ветвление",
            "kind": "order",
            "required": true
          }
        ]
      },
      {
        "id": "conditions-elif",
        "title": "Несколько случаев: elif",
        "goal": "Упорядочить взаимоисключающие проверки и избежать нескольких ответов.",
        "role": "lesson",
        "prerequisites": [
          "conditions-branches"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "conditions-elif-step-1",
            "title": "Проверки сверху вниз"
          },
          {
            "id": "conditions-elif-step-2",
            "title": "Порядок — часть алгоритма"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "conditions-sign",
            "title": "Три знака",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-grade",
            "title": "Категория результата",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-temperature-state",
            "title": "Состояние воды в модели",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-elif-explain",
            "title": "Почему высокий балл получил C?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "conditions-logic",
        "title": "and, or и not",
        "goal": "Собрать несколько требований в одну логическую проверку.",
        "role": "lesson",
        "prerequisites": [
          "conditions-elif"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "conditions-logic-step-1",
            "title": "Все или хотя бы одно"
          },
          {
            "id": "conditions-logic-step-2",
            "title": "Скобки помогают видеть правило"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "conditions-weekend",
            "title": "Выходной день",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-outside",
            "title": "Снаружи диапазона",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-divisible-both",
            "title": "Два делителя",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-logic-table",
            "title": "Логические связи",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "conditions-nested",
        "title": "Вложенные условия и зависимые решения",
        "goal": "Разделить основной выбор и проверку внутри выбранной ситуации.",
        "role": "lesson",
        "prerequisites": [
          "conditions-logic"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "conditions-nested-step-1",
            "title": "Когда одного списка ветвей мало"
          },
          {
            "id": "conditions-nested-step-2",
            "title": "Простота против глубины"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "conditions-two-max",
            "title": "Большее из двух",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-quadrant",
            "title": "Четверть или ось",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-access",
            "title": "Допуск с разрешением",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-nested-else",
            "title": "К какому if относится else?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "conditions-safe-checks",
        "title": "Порядок проверок и короткое замыкание",
        "goal": "Предотвратить недопустимое вычисление и проверить вход до применения формулы.",
        "role": "lesson",
        "prerequisites": [
          "conditions-nested"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "conditions-safe-checks-step-1",
            "title": "Не вычислять опасную часть"
          },
          {
            "id": "conditions-safe-checks-step-2",
            "title": "Сначала контракт, потом формула"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "conditions-safe-ratio",
            "title": "Отношение больше двух",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-safe-average",
            "title": "Среднее при пустой группе",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-valid-triangle",
            "title": "Можно ли построить треугольник?",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-short-circuit",
            "title": "Будет ли деление?",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "conditions-review",
        "title": "Повторение: условия и числовые модели",
        "goal": "Выбрать структуру ветвления и проверить все её пути.",
        "role": "review",
        "prerequisites": [
          "conditions-safe-checks"
        ],
        "estimatedMinutes": 50,
        "steps": [
          {
            "id": "conditions-review-step-1",
            "title": "Проверка должна различать алгоритмы"
          },
          {
            "id": "conditions-review-step-2",
            "title": "Причина ошибки словами"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "conditions-review-max-three",
            "title": "Большее из трёх",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-review-leap",
            "title": "Високосный год",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-review-boundary-fix",
            "title": "Ошибка границы",
            "kind": "debug",
            "required": true
          },
          {
            "id": "conditions-review-forbidden",
            "title": "Как проверить отсутствие допуска?",
            "kind": "choice",
            "required": true
          },
          {
            "id": "conditions-review-independent",
            "title": "Когда два if уместны?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "conditions-assessment",
        "title": "Контрольная: решения по правилам",
        "goal": "Самостоятельно объединить границы, арифметику и несколько условий.",
        "role": "assessment",
        "prerequisites": [
          "conditions-review"
        ],
        "estimatedMinutes": 60,
        "steps": [
          {
            "id": "conditions-assessment-step-1",
            "title": "Как устроена работа"
          },
          {
            "id": "conditions-assessment-step-2",
            "title": "После проверки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "conditions-assess-progressive-price",
            "title": "Ступенчатая оплата",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-assess-between",
            "title": "Среднее по значению",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-assess-date",
            "title": "Дней в месяце",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-assess-safe-division",
            "title": "Частное или сообщение",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-assess-test-set",
            "title": "Какие входы ловят ошибки?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "conditions-project",
        "title": "Мини-проект: расчёт заказа по правилам",
        "goal": "Реализовать тариф, скидку и статус оплаты в согласованном отчёте.",
        "role": "project",
        "prerequisites": [
          "conditions-assessment"
        ],
        "estimatedMinutes": 60,
        "steps": [
          {
            "id": "conditions-project-step-1",
            "title": "Правила бизнеса становятся программой"
          },
          {
            "id": "conditions-project-step-2",
            "title": "Проверь реальные сценарии"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "conditions-project-order",
            "title": "Заказ с доставкой",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-project-discount",
            "title": "Купон и скидка",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-project-payment",
            "title": "Статус оплаты",
            "kind": "code",
            "required": true
          },
          {
            "id": "conditions-project-plan",
            "title": "Проверка заказа",
            "kind": "order",
            "required": true
          }
        ]
      }
    ]
  },
  {
    "id": "loops",
    "title": "Циклы",
    "goal": "Строить повторения, обрабатывать потоки и проверять граничные случаи.",
    "track": "base",
    "depth": "Практический модуль",
    "prerequisites": [
      "conditions"
    ],
    "lessons": [
      {
        "id": "loops-repeat",
        "title": "Повторение и переменная цикла",
        "goal": "Отличать количество повторений от значения переменной.",
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "loops-repeat-idea",
            "title": "Как это работает"
          },
          {
            "id": "loops-repeat-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "loops-repeat-signals",
            "title": "Повторить сообщение",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-repeat-numbered",
            "title": "Пронумеровать попытки",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-repeat-squares",
            "title": "Таблица квадратов",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-repeat-indent",
            "title": "Сколько итогов?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "loops-range",
        "title": "Три формы range",
        "goal": "Выбирать начало, конец и шаг числового перебора.",
        "role": "lesson",
        "prerequisites": [
          "loops-repeat"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "loops-range-idea",
            "title": "Как это работает"
          },
          {
            "id": "loops-range-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "loops-range-inclusive",
            "title": "Закрытый интервал",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-range-multiples",
            "title": "Кратные в пределах",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-range-seats",
            "title": "Свободные места ряда",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-range-step-meaning",
            "title": "Начало и шаг",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "loops-bounds",
        "title": "Граница, обратный шаг и пустой диапазон",
        "goal": "Проверять крайние случаи диапазона без лишней итерации.",
        "role": "lesson",
        "prerequisites": [
          "loops-range"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "loops-bounds-idea",
            "title": "Как это работает"
          },
          {
            "id": "loops-bounds-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "loops-bounds-countdown",
            "title": "Обратный отсчёт до нуля",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-bounds-reverse-even",
            "title": "Чётные в обратном порядке",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-bounds-boundary-fix",
            "title": "Исправить потерянную границу",
            "kind": "debug",
            "required": true
          },
          {
            "id": "loops-bounds-empty-ranges",
            "title": "Какие диапазоны пусты?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "loops-accumulate",
        "title": "Сумма, произведение и счётчик",
        "goal": "Выбирать начальное состояние накопителя и условие обновления.",
        "role": "lesson",
        "prerequisites": [
          "loops-bounds"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "loops-accumulate-idea",
            "title": "Как это работает"
          },
          {
            "id": "loops-accumulate-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "loops-accumulate-sum",
            "title": "Сумма первых чисел",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-accumulate-factorial",
            "title": "Факториал, включая 0!",
            "kind": "debug",
            "required": true
          },
          {
            "id": "loops-accumulate-condition-count",
            "title": "Количество делящихся на три",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-accumulate-reset",
            "title": "Почему сумма теряется?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "loops-characters",
        "title": "Перебор символов строки",
        "goal": "Рассматривать строку как последовательность отдельных символов.",
        "role": "lesson",
        "prerequisites": [
          "loops-accumulate"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "loops-characters-idea",
            "title": "Как это работает"
          },
          {
            "id": "loops-characters-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "loops-characters-letters",
            "title": "Символы по строкам",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-characters-spaces",
            "title": "Сколько обычных пробелов",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-characters-remove-dash",
            "title": "Удалить только дефисы",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-characters-value-not-index",
            "title": "Что хранит letter?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "loops-while",
        "title": "while и изменение состояния",
        "goal": "Обосновывать завершение цикла условием и обновлением состояния.",
        "role": "lesson",
        "prerequisites": [
          "loops-characters"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "loops-while-idea",
            "title": "Как это работает"
          },
          {
            "id": "loops-while-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "loops-while-doubling",
            "title": "Сколько удвоений",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-while-digit-sum",
            "title": "Сумма цифр",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-while-digit-count",
            "title": "Количество цифр, включая ноль",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-while-termination",
            "title": "Почему цикл не закончится?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "loops-sentinel",
        "title": "Ввод до стоп-значения и пустой набор",
        "goal": "Обрабатывать поток неизвестной длины и отсутствие данных.",
        "role": "lesson",
        "prerequisites": [
          "loops-while"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "loops-sentinel-idea",
            "title": "Как это работает"
          },
          {
            "id": "loops-sentinel-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "loops-sentinel-sentinel-sum",
            "title": "Сумма до нуля",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-sentinel-sentinel-max",
            "title": "Максимум и отсутствие данных",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-sentinel-sentinel-count",
            "title": "Количество отрицательных измерений",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-sentinel-sentinel-order",
            "title": "Порядок чтения",
            "kind": "order",
            "required": true
          }
        ]
      },
      {
        "id": "loops-control",
        "title": "break, continue и первый подходящий элемент",
        "goal": "Различать прекращение поиска и пропуск текущего элемента.",
        "role": "lesson",
        "prerequisites": [
          "loops-sentinel"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "loops-control-idea",
            "title": "Как это работает"
          },
          {
            "id": "loops-control-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 4,
        "tasks": [
          {
            "id": "loops-control-first-divisor",
            "title": "Первый собственный делитель",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-control-skip",
            "title": "Сумма без кратных пяти",
            "kind": "modify",
            "required": true
          },
          {
            "id": "loops-control-threshold-first",
            "title": "Первый номер выше порога",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-control-choose-loop",
            "title": "Выбор цикла",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "loops-nested",
        "title": "Вложенные циклы, таблицы и узоры",
        "goal": "Связывать внешний цикл со строкой, внутренний — с элементом строки.",
        "role": "lesson",
        "prerequisites": [
          "loops-control"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "loops-nested-idea",
            "title": "Как это работает"
          },
          {
            "id": "loops-nested-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "loops-nested-table",
            "title": "Таблица умножения",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-nested-triangle",
            "title": "Треугольник звёздочек",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-nested-rectangle-border",
            "title": "Рамка прямоугольника",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-nested-iterations",
            "title": "Сколько пар?",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "loops-review",
        "title": "Повторение: условия внутри циклов",
        "goal": "Совмещать ввод, арифметику и проверку условий.",
        "role": "review",
        "prerequisites": [
          "loops-nested"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "loops-review-idea",
            "title": "Как это работает"
          },
          {
            "id": "loops-review-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "loops-review-positives",
            "title": "Сумма положительных измерений",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-review-increases",
            "title": "Сколько подъёмов",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-review-product-debug",
            "title": "Неверная инициализация",
            "kind": "explain",
            "required": true
          },
          {
            "id": "loops-review-while-order",
            "title": "Собрать обратный отсчёт",
            "kind": "order",
            "required": true
          }
        ]
      },
      {
        "id": "loops-assessment",
        "title": "Контрольная: поток, диапазон и состояние",
        "goal": "Решать новые комбинации циклов без готового образца.",
        "role": "assessment",
        "prerequisites": [
          "loops-review"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "loops-assessment-idea",
            "title": "Как это работает"
          },
          {
            "id": "loops-assessment-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "loops-assessment-divisors",
            "title": "Все делители без потерь",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-assessment-streak",
            "title": "Самая длинная растущая серия",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-assessment-first-debt",
            "title": "Первый отрицательный баланс",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-assessment-proof",
            "title": "Проверить объяснение",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "loops-expenses-project",
        "title": "Мини-проект: анализ расходов",
        "goal": "Собрать отчёт из ввода, условий, цикла и накопителей без списков.",
        "role": "project",
        "prerequisites": [
          "loops-assessment"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "loops-expenses-project-idea",
            "title": "Как это работает"
          },
          {
            "id": "loops-expenses-project-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "loops-expenses-project-report",
            "title": "Журнал расходов: полный отчёт",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-expenses-project-large-costs",
            "title": "Отчёт по крупным расходам",
            "kind": "code",
            "required": true
          },
          {
            "id": "loops-expenses-project-budget",
            "title": "Когда превышен бюджет",
            "kind": "code",
            "required": true
          }
        ]
      }
    ]
  },
  {
    "id": "strings",
    "title": "Строки",
    "goal": "Разбирать, проверять и преобразовывать текст по явному контракту.",
    "track": "base",
    "depth": "Практический модуль",
    "prerequisites": [
      "loops"
    ],
    "lessons": [
      {
        "id": "strings-indices",
        "title": "Длина, индексы и отрицательные индексы",
        "goal": "Безопасно обращаться к конкретной позиции строки.",
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "strings-indices-idea",
            "title": "Как это работает"
          },
          {
            "id": "strings-indices-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "strings-indices-ends",
            "title": "Первый и последний символ",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-indices-position",
            "title": "Человеческий номер позиции",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-indices-middle",
            "title": "Средний символ нечётной строки",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-indices-bad-index",
            "title": "Где граница?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "strings-slices",
        "title": "Срезы: часть строки и направление",
        "goal": "Использовать включённую левую и исключённую правую границы.",
        "role": "lesson",
        "prerequisites": [
          "strings-indices"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "strings-slices-idea",
            "title": "Как это работает"
          },
          {
            "id": "strings-slices-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "strings-slices-preview",
            "title": "Ограниченный просмотр",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-slices-rotate",
            "title": "Перенести начало в конец",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-slices-palindrome",
            "title": "Палиндром с точным сравнением",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-slices-slice-output",
            "title": "Срез с отрицательным шагом",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "strings-build",
        "title": "Неизменяемость и построение нового текста",
        "goal": "Изменять текст созданием новой строки и сохранять порядок обработки.",
        "role": "lesson",
        "prerequisites": [
          "strings-slices"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "strings-build-idea",
            "title": "Как это работает"
          },
          {
            "id": "strings-build-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "strings-build-replace-position",
            "title": "Заменить один символ",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-build-double-zero",
            "title": "Удвоить нули",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-build-collapse",
            "title": "Сжать соседние повторы",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-build-immutable",
            "title": "Что действительно меняется?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "strings-search",
        "title": "Поиск, вхождение и отсутствие результата",
        "goal": "Выбирать in, find и count по вопросу задачи.",
        "role": "lesson",
        "prerequisites": [
          "strings-build"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "strings-search-idea",
            "title": "Как это работает"
          },
          {
            "id": "strings-search-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "strings-search-contains",
            "title": "Проверить вхождение",
            "kind": "debug",
            "required": true
          },
          {
            "id": "strings-search-partition",
            "title": "Разделить по первому двоеточию",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-search-overlap",
            "title": "Посчитать пересекающиеся вхождения",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-search-find-zero",
            "title": "Почему if find опасен?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "strings-methods",
        "title": "Методы очистки и проверки текста",
        "goal": "Применять strip, replace и проверки символов по контракту.",
        "role": "lesson",
        "prerequisites": [
          "strings-search"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "strings-methods-idea",
            "title": "Как это работает"
          },
          {
            "id": "strings-methods-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "strings-methods-normalize",
            "title": "Нормализовать метку",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-methods-ascii-digits",
            "title": "Только ASCII-цифры",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-methods-first-replace",
            "title": "Заменить только первую запятую",
            "kind": "modify",
            "required": true
          },
          {
            "id": "strings-methods-strip-set",
            "title": "Что удаляет strip?",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "strings-split-join",
        "title": "Разделение и соединение текста",
        "goal": "Понимать результат split и выбирать явный разделитель.",
        "role": "lesson",
        "prerequisites": [
          "strings-methods"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "strings-split-join-idea",
            "title": "Как это работает"
          },
          {
            "id": "strings-split-join-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "strings-split-join-normalize-spaces",
            "title": "Один пробел между словами",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-split-join-fields",
            "title": "Количество полей, включая пустые",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-split-join-longest-word",
            "title": "Первое самое длинное слово",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-split-join-join-direction",
            "title": "Как читается join?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "strings-format",
        "title": "Форматирование и различие числа и текста",
        "goal": "Строить сообщения через f-строки без случайной смены типа.",
        "role": "lesson",
        "prerequisites": [
          "strings-split-join"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "strings-format-idea",
            "title": "Как это работает"
          },
          {
            "id": "strings-format-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "strings-format-money",
            "title": "Сумма в целых и сотых",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-format-clock",
            "title": "Продолжительность в минутах и секундах",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-format-sum-label",
            "title": "Сначала сложить, затем оформить",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-format-format-width",
            "title": "Ширина не обрезает",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "strings-parse",
        "title": "Разбор структурированного текста",
        "goal": "Проверять формат до извлечения значения.",
        "role": "lesson",
        "prerequisites": [
          "strings-format"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "strings-parse-idea",
            "title": "Как это работает"
          },
          {
            "id": "strings-parse-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "strings-parse-prefix",
            "title": "Проверить идентификатор",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-parse-domain",
            "title": "Часть после последнего разделителя",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-parse-record",
            "title": "Имя и удвоенное количество",
            "kind": "debug",
            "required": true
          },
          {
            "id": "strings-parse-parse-order",
            "title": "Порядок разбора",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "strings-review",
        "title": "Смешанная практика строк",
        "goal": "Связывать очистку, поиск и построение нового текста.",
        "role": "review",
        "prerequisites": [
          "strings-parse"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "strings-review-idea",
            "title": "Как это работает"
          },
          {
            "id": "strings-review-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "strings-review-word-ends",
            "title": "Последние символы слов",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-review-mask",
            "title": "Скрыть середину кода",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "strings-assessment",
        "title": "Контрольная: точный разбор и преобразование",
        "goal": "Самостоятельно решать комбинированные строковые задачи.",
        "role": "assessment",
        "prerequisites": [
          "strings-review"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "strings-assessment-idea",
            "title": "Как это работает"
          },
          {
            "id": "strings-assessment-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "strings-assessment-brackets",
            "title": "Содержимое первой пары",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-assessment-digit-run",
            "title": "Самая длинная серия цифр",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-assessment-signed",
            "title": "Корректная запись целого",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "strings-text-project",
        "title": "Мини-проект: нормализация текстовых записей",
        "goal": "Собрать текстовый отчёт с проверкой и сохранением значимых данных.",
        "role": "project",
        "prerequisites": [
          "strings-assessment"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "strings-text-project-idea",
            "title": "Как это работает"
          },
          {
            "id": "strings-text-project-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "strings-text-project-slug",
            "title": "Метка из слов",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-text-project-receipt",
            "title": "Строка чека",
            "kind": "code",
            "required": true
          },
          {
            "id": "strings-text-project-line-report",
            "title": "Отчёт о непустых строках",
            "kind": "code",
            "required": true
          }
        ]
      }
    ]
  },
  {
    "id": "sequences",
    "title": "Списки и кортежи",
    "goal": "Хранить и преобразовывать последовательности без ошибок индекса и общих ссылок.",
    "track": "base",
    "depth": "Практический модуль",
    "prerequisites": [
      "strings"
    ],
    "lessons": [
      {
        "id": "sequences-read",
        "title": "Список: индекс и значение",
        "goal": "Хранить несколько значений и различать позицию и содержимое.",
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "sequences-read-idea",
            "title": "Как это работает"
          },
          {
            "id": "sequences-read-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 4,
        "tasks": [
          {
            "id": "sequences-read-at",
            "title": "Элемент по индексу",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-read-reverse",
            "title": "Прочитать и вывести наоборот",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-read-positions",
            "title": "Позиции положительных значений",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-read-index-value",
            "title": "Индекс или значение?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "sequences-update",
        "title": "Изменение, append и pop",
        "goal": "Изменять заданный элемент и учитывать возвращаемые значения методов.",
        "role": "lesson",
        "prerequisites": [
          "sequences-read"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "sequences-update-idea",
            "title": "Как это работает"
          },
          {
            "id": "sequences-update-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 4,
        "tasks": [
          {
            "id": "sequences-update-zero-negatives",
            "title": "Обнулить отрицательные",
            "kind": "debug",
            "required": true
          },
          {
            "id": "sequences-update-append-total",
            "title": "Добавить контрольную сумму",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-update-last-or-empty",
            "title": "Удалить последний и показать остаток",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-update-append-result",
            "title": "Что возвращает append?",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "sequences-copy",
        "title": "Общие ссылки и независимые копии",
        "goal": "Различать присваивание имени и копирование изменяемой коллекции.",
        "role": "lesson",
        "prerequisites": [
          "sequences-update"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "sequences-copy-idea",
            "title": "Как это работает"
          },
          {
            "id": "sequences-copy-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "sequences-copy-independent",
            "title": "Удвоенная копия и оригинал",
            "kind": "debug",
            "required": true
          },
          {
            "id": "sequences-copy-snapshot",
            "title": "Снимок перед добавлением",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-copy-reverse-copy",
            "title": "Исходный и обратный порядок",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-copy-alias",
            "title": "Проследить общую ссылку",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "sequences-search",
        "title": "Поиск, минимум и повторные значения",
        "goal": "Искать позицию и обрабатывать отсутствие ответа.",
        "role": "lesson",
        "prerequisites": [
          "sequences-copy"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "sequences-search-idea",
            "title": "Как это работает"
          },
          {
            "id": "sequences-search-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "sequences-search-first-index",
            "title": "Первый индекс или −1",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-search-minimum-index",
            "title": "Первый минимальный элемент",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-search-second-index",
            "title": "Второе вхождение",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-search-index-absent",
            "title": "index и отсутствие",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "sequences-filter",
        "title": "Фильтрация и преобразование без пропуска элементов",
        "goal": "Создавать новый список по правилу вместо удаления во время обхода.",
        "role": "lesson",
        "prerequisites": [
          "sequences-search"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "sequences-filter-idea",
            "title": "Как это работает"
          },
          {
            "id": "sequences-filter-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "sequences-filter-positive-filter",
            "title": "Оставить положительные",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-filter-clamp",
            "title": "Ограничить показания",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-filter-adjacent-diffs",
            "title": "Разности соседей",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-filter-filter-transform",
            "title": "Что делает включение?",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "sequences-sort",
        "title": "Сортировка и исходный порядок",
        "goal": "Различать sorted, sort и задачи выбора без сортировки.",
        "role": "lesson",
        "prerequisites": [
          "sequences-filter"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "sequences-sort-idea",
            "title": "Как это работает"
          },
          {
            "id": "sequences-sort-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "sequences-sort-sort-two",
            "title": "Возрастание и убывание",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-sort-second-distinct",
            "title": "Второе различное значение",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-sort-length-order",
            "title": "Слова по длине",
            "kind": "gap",
            "required": true
          },
          {
            "id": "sequences-sort-sort-result",
            "title": "Что возвращает sort?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "sequences-tuples",
        "title": "Кортежи и распаковка",
        "goal": "Использовать фиксированную запись и обмен значениями.",
        "role": "lesson",
        "prerequisites": [
          "sequences-sort"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "sequences-tuples-idea",
            "title": "Как это работает"
          },
          {
            "id": "sequences-tuples-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 4,
        "tasks": [
          {
            "id": "sequences-tuples-swap",
            "title": "Обмен первого и последнего",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-tuples-point",
            "title": "Квадрат расстояния точки",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-tuples-pairs",
            "title": "Суммы пар",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-tuples-singleton",
            "title": "Одноэлементный кортеж",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "sequences-nested",
        "title": "Списки списков и независимость строк",
        "goal": "Читать таблицу двумя индексами и избегать общих строк.",
        "role": "lesson",
        "prerequisites": [
          "sequences-tuples"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "sequences-nested-idea",
            "title": "Как это работает"
          },
          {
            "id": "sequences-nested-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "sequences-nested-matrix-change",
            "title": "Изменить ровно одну ячейку",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-nested-row-sums",
            "title": "Суммы строк таблицы",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-nested-transpose",
            "title": "Транспонировать таблицу",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-nested-shallow",
            "title": "Граница поверхностной копии",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "sequences-review",
        "title": "Повторение: текст превращается в список",
        "goal": "Переносить строковые приёмы на обработку последовательностей.",
        "role": "review",
        "prerequisites": [
          "sequences-nested"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "sequences-review-idea",
            "title": "Как это работает"
          },
          {
            "id": "sequences-review-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "sequences-review-unique-order",
            "title": "Уникальные слова в исходном порядке",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-review-numeric-sort",
            "title": "Числа из одной строки",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "sequences-assessment",
        "title": "Контрольная: последовательности без подсказки",
        "goal": "Самостоятельно сочетать поиск, копирование и обработку соседей.",
        "role": "assessment",
        "prerequisites": [
          "sequences-review"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "sequences-assessment-idea",
            "title": "Как это работает"
          },
          {
            "id": "sequences-assessment-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "sequences-assessment-remove-one",
            "title": "Удалить первый минимум",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-assessment-rotate",
            "title": "Циклический сдвиг вправо",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-assessment-peaks",
            "title": "Индексы локальных вершин",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "sequences-measurements-project",
        "title": "Мини-проект: отчёт по измерениям",
        "goal": "Выделять данные, сохранять оригинал и сравнивать исправленную серию.",
        "role": "project",
        "prerequisites": [
          "sequences-assessment"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "sequences-measurements-project-idea",
            "title": "Как это работает"
          },
          {
            "id": "sequences-measurements-project-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "sequences-measurements-project-prefix",
            "title": "Накопленные итоги",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-measurements-project-spread",
            "title": "Размах с пустым случаем",
            "kind": "code",
            "required": true
          },
          {
            "id": "sequences-measurements-project-repair-report",
            "title": "Исправить выбросы и сохранить оригинал",
            "kind": "code",
            "required": true
          }
        ]
      }
    ]
  },
  {
    "id": "mappings",
    "title": "Словари и множества",
    "goal": "Группировать данные по ключам, считать частоты и сравнивать наборы.",
    "track": "base",
    "depth": "Практический модуль",
    "prerequisites": [
      "sequences"
    ],
    "lessons": [
      {
        "id": "mappings-read",
        "title": "Словарь: ключ и значение",
        "goal": "Выбирать словарь для поиска по смысловому ключу.",
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "mappings-read-idea",
            "title": "Как это работает"
          },
          {
            "id": "mappings-read-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "mappings-read-lookup",
            "title": "Цена по известному имени",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-read-distinct-keys",
            "title": "Количество разных ключей",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-read-key-or-value",
            "title": "Ключ или цена",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-read-dict-position",
            "title": "Что означает d[0]?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "mappings-update",
        "title": "Добавление, замена и удаление пар",
        "goal": "Изменять запись по ключу и понимать последствия копирования.",
        "role": "lesson",
        "prerequisites": [
          "mappings-read"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "mappings-update-idea",
            "title": "Как это работает"
          },
          {
            "id": "mappings-update-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "mappings-update-set",
            "title": "Назначить новое значение",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-update-remove",
            "title": "Удалить безопасно",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-update-copy",
            "title": "Снимок словаря",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-update-zero-delete",
            "title": "Удаление и ноль",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "mappings-get",
        "title": "Отсутствие, get и значения по умолчанию",
        "goal": "Не путать отсутствующий ключ с нулевым или пустым значением.",
        "role": "lesson",
        "prerequisites": [
          "mappings-update"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "mappings-get-idea",
            "title": "Как это работает"
          },
          {
            "id": "mappings-get-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "mappings-get-get-default",
            "title": "Значение или умолчание",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-get-optional-report",
            "title": "Наличие и значение отдельно",
            "kind": "debug",
            "required": true
          },
          {
            "id": "mappings-get-increment",
            "title": "Увеличить счётчик известного или нового ключа",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-get-get-mutates",
            "title": "Меняется ли словарь?",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "mappings-frequency",
        "title": "Частотные словари",
        "goal": "Подсчитывать появления и выбирать ответ при равенстве.",
        "role": "lesson",
        "prerequisites": [
          "mappings-get"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "mappings-frequency-idea",
            "title": "Как это работает"
          },
          {
            "id": "mappings-frequency-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "mappings-frequency-word-count",
            "title": "Частоты точных слов",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-frequency-leader",
            "title": "Наиболее частое слово",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-frequency-once",
            "title": "Сколько слов встретились один раз",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-frequency-frequency-total",
            "title": "Что хранит сумма частот?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "mappings-iterate",
        "title": "Перебор пар и отчёты по данным",
        "goal": "Отделять порядок вывода от правил обработки словаря.",
        "role": "lesson",
        "prerequisites": [
          "mappings-frequency"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "mappings-iterate-idea",
            "title": "Как это работает"
          },
          {
            "id": "mappings-iterate-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 4,
        "tasks": [
          {
            "id": "mappings-iterate-threshold-keys",
            "title": "Имена с нужным баллом",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-iterate-max-key",
            "title": "Ключ наибольшего значения",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-iterate-weighted",
            "title": "Сумма значений для заданных ключей",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-iterate-items",
            "title": "Правильная распаковка",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "mappings-sets",
        "title": "Множество: уникальность без индексов",
        "goal": "Использовать set для проверки наличия и числа различных элементов.",
        "role": "lesson",
        "prerequisites": [
          "mappings-iterate"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "mappings-sets-idea",
            "title": "Как это работает"
          },
          {
            "id": "mappings-sets-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "mappings-sets-distinct-numbers",
            "title": "Количество разных чисел",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-sets-membership",
            "title": "Проверка номера в наборе",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-sets-remove-set",
            "title": "Удалить число из набора",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-sets-empty-set",
            "title": "Пустая структура",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "mappings-set-algebra",
        "title": "Пересечение, объединение и разность",
        "goal": "Выражать отношения между двумя наборами.",
        "role": "lesson",
        "prerequisites": [
          "mappings-sets"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "mappings-set-algebra-idea",
            "title": "Как это работает"
          },
          {
            "id": "mappings-set-algebra-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "mappings-set-algebra-common",
            "title": "Общие участники",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-set-algebra-only-first",
            "title": "Только первая встреча",
            "kind": "modify",
            "required": true
          },
          {
            "id": "mappings-set-algebra-subset",
            "title": "Все обязательные темы выполнены?",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-set-algebra-symmetric",
            "title": "Ровно в одном наборе",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "mappings-group",
        "title": "Группировка и комбинированные данные",
        "goal": "Связывать ключ со списком элементов и не создавать общие группы.",
        "role": "lesson",
        "prerequisites": [
          "mappings-set-algebra"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "mappings-group-idea",
            "title": "Как это работает"
          },
          {
            "id": "mappings-group-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "mappings-group-groups",
            "title": "Сгруппировать имена",
            "kind": "debug",
            "required": true
          },
          {
            "id": "mappings-group-group-counts",
            "title": "Число участников по категориям",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-group-aggregate",
            "title": "Сумма по категории",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-group-shared-groups",
            "title": "Почему смешались группы?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "mappings-review",
        "title": "Смешанная практика: выбрать структуру",
        "goal": "Обосновывать выбор списка, множества или словаря.",
        "role": "review",
        "prerequisites": [
          "mappings-group"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "mappings-review-idea",
            "title": "Как это работает"
          },
          {
            "id": "mappings-review-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "mappings-review-char-frequency",
            "title": "Частоты непробельных символов",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-review-missing",
            "title": "Недостающие материалы",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "mappings-assessment",
        "title": "Контрольная: частоты, ключи и наборы",
        "goal": "Решать новые задачи на связанные данные и равенство элементов.",
        "role": "assessment",
        "prerequisites": [
          "mappings-review"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "mappings-assessment-idea",
            "title": "Как это работает"
          },
          {
            "id": "mappings-assessment-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "mappings-assessment-anagram",
            "title": "Анаграмма с учётом повторов",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-assessment-multi-groups",
            "title": "Кто в нескольких группах",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-assessment-merge",
            "title": "Объединить остатки двух складов",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "mappings-inventory-project",
        "title": "Мини-проект: склад и заявки",
        "goal": "Построить отчёт, где данные связаны по ключам, а повторы имеют ясный смысл.",
        "role": "project",
        "prerequisites": [
          "mappings-assessment"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "mappings-inventory-project-idea",
            "title": "Как это работает"
          },
          {
            "id": "mappings-inventory-project-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "mappings-inventory-project-unknown",
            "title": "Неизвестные товары в заявке",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-inventory-project-fulfill",
            "title": "Обработать заявки последовательно",
            "kind": "code",
            "required": true
          },
          {
            "id": "mappings-inventory-project-deficit",
            "title": "Полный отчёт дефицита",
            "kind": "code",
            "required": true
          }
        ]
      }
    ]
  },
  {
    "id": "functions",
    "title": "Функции",
    "goal": "Создавать проверяемые функции с ясными контрактами и независимым состоянием.",
    "track": "base",
    "depth": "Практический модуль",
    "prerequisites": [
      "mappings"
    ],
    "lessons": [
      {
        "id": "functions-definition",
        "title": "Определение и вызов функции",
        "goal": "Создать именованное действие и отличить определение от вызова.",
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "functions-definition-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "functions-definition-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "functions-definition-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "functions-definition-task-1",
            "title": "Возвращаемая единица",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-definition-task-2",
            "title": "Новая пустая корзина",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-definition-task-3",
            "title": "Два независимых вызова",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-definition-task-4",
            "title": "Когда появляется вывод?",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "functions-parameters",
        "title": "Параметры и аргументы",
        "goal": "Передавать данные в функцию и отличать позицию от имени.",
        "role": "lesson",
        "prerequisites": [
          "functions-definition"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "functions-parameters-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "functions-parameters-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "functions-parameters-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "functions-parameters-task-1",
            "title": "Остаток пути",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-parameters-task-2",
            "title": "Стоимость нескольких упаковок",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-parameters-task-3",
            "title": "Подпись координаты",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-parameters-task-4",
            "title": "Параметр или аргумент?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "functions-return",
        "title": "return, None и отличие от print",
        "goal": "Использовать результат функции в выражениях и возвращать ответ на каждой ветке.",
        "role": "lesson",
        "prerequisites": [
          "functions-parameters"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "functions-return-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "functions-return-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "functions-return-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "functions-return-task-1",
            "title": "Вернуть сумму, не напечатать",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-return-task-2",
            "title": "Деление при ненулевом делителе",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-return-task-3",
            "title": "Индекс первого нуля",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-return-task-4",
            "title": "Что получит переменная?",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "functions-early",
        "title": "Ранний возврат и договорённости",
        "goal": "Сначала обрабатывать особые случаи, затем выполнять основной расчёт.",
        "role": "lesson",
        "prerequisites": [
          "functions-return"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "functions-early-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "functions-early-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "functions-early-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "functions-early-task-1",
            "title": "Первое превышение",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-early-task-2",
            "title": "Безопасное среднее",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-early-task-3",
            "title": "Все значения в пределах",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-early-task-4",
            "title": "Где должен стоять return?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "functions-composition",
        "title": "Композиция: результат одного вызова — аргумент другого",
        "goal": "Строить обработку из небольших функций без лишней печати.",
        "role": "lesson",
        "prerequisites": [
          "functions-early"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "functions-composition-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "functions-composition-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "functions-composition-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "functions-composition-task-1",
            "title": "Очистка имени и приветствие",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-composition-task-2",
            "title": "Расчёт и формат счёта",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-composition-task-3",
            "title": "Ограничить и перевести в процент",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-composition-task-4",
            "title": "Порядок композиции",
            "kind": "order",
            "required": true
          }
        ]
      },
      {
        "id": "functions-scope",
        "title": "Локальные имена и изменение объектов",
        "goal": "Различать присваивание имени и изменение переданного списка.",
        "role": "lesson",
        "prerequisites": [
          "functions-composition"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "functions-scope-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "functions-scope-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "functions-scope-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "functions-scope-task-1",
            "title": "Добавить без изменения входа",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-scope-task-2",
            "title": "Сдвинуть числовые значения",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-scope-task-3",
            "title": "Обновить копию словаря",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-scope-task-4",
            "title": "Присваивание или изменение?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "functions-defaults",
        "title": "Аргументы по умолчанию и именованные вызовы",
        "goal": "Использовать разумные настройки и ясные вызовы с именами.",
        "role": "lesson",
        "prerequisites": [
          "functions-scope"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "functions-defaults-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "functions-defaults-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "functions-defaults-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "functions-defaults-task-1",
            "title": "Повтор с настройкой",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-defaults-task-2",
            "title": "Склеить с разделителем",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-defaults-task-3",
            "title": "Тариф с двумя настройками",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-defaults-task-4",
            "title": "Корректные формы вызова",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "functions-mutable-default",
        "title": "Изменяемое значение по умолчанию",
        "goal": "Создавать независимое состояние вызовов и явно выбирать изменение входа.",
        "role": "lesson",
        "prerequisites": [
          "functions-defaults"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "functions-mutable-default-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "functions-mutable-default-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "functions-mutable-default-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "functions-mutable-default-task-1",
            "title": "Независимые журналы",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-mutable-default-task-2",
            "title": "Счётчик тегов",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-mutable-default-task-3",
            "title": "Исправить скрытое накопление",
            "kind": "debug",
            "required": true
          },
          {
            "id": "functions-mutable-default-task-4",
            "title": "Когда создаётся default?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "functions-review",
        "title": "Повторение: результат, границы и состояние",
        "goal": "Соединить контракты функции с коллекциями и логикой.",
        "role": "review",
        "prerequisites": [
          "functions-mutable-default"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "functions-review-step-1",
            "title": "Задача и устройство"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "functions-review-task-1",
            "title": "Среднее только положительных",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-review-task-2",
            "title": "Найти потерянный результат",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "functions-assessment",
        "title": "Контрольная: функции на новых входах",
        "goal": "Самостоятельно выполнить поиск, расчёт и безопасное преобразование.",
        "role": "assessment",
        "prerequisites": [
          "functions-review"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "functions-assessment-step-1",
            "title": "Задача и устройство"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "functions-assessment-task-1",
            "title": "Окно значений",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-assessment-task-2",
            "title": "Первый длинный заголовок",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-assessment-task-3",
            "title": "Сводка измерений",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "functions-order-project",
        "title": "Мини-проект: расчёт заказа",
        "goal": "Собрать расчёт позиций, скидки и итоговой квитанции.",
        "role": "project",
        "prerequisites": [
          "functions-assessment"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "functions-order-project-step-1",
            "title": "Задача и устройство"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "functions-order-project-task-1",
            "title": "Стоимость всех позиций",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-order-project-task-2",
            "title": "Скидка и доставка",
            "kind": "code",
            "required": true
          },
          {
            "id": "functions-order-project-task-3",
            "title": "Квитанция заказа",
            "kind": "code",
            "required": true
          }
        ]
      }
    ]
  },
  {
    "id": "debugging",
    "title": "Ошибки, отладка и проверки",
    "goal": "Локализовать ошибки, проверять границы и обрабатывать ожидаемый неверный формат.",
    "track": "base",
    "depth": "Практический модуль",
    "prerequisites": [
      "functions"
    ],
    "lessons": [
      {
        "id": "debugging-messages",
        "title": "Синтаксис, тип ошибки и строка сбоя",
        "goal": "Читать сообщение Python и исправлять причину, сохраняя контракт.",
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "debugging-messages-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "debugging-messages-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "debugging-messages-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "debugging-messages-task-1",
            "title": "Числа из текстовых полей",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-messages-task-2",
            "title": "Последний элемент или отсутствие",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-messages-task-3",
            "title": "Собрать номер заявки",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-messages-task-4",
            "title": "Какой вид проблемы?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "debugging-trace",
        "title": "Логическая ошибка и трассировка состояния",
        "goal": "Находить неверный переход состояния на коротком контрпримере.",
        "role": "lesson",
        "prerequisites": [
          "debugging-messages"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "debugging-trace-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "debugging-trace-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "debugging-trace-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "debugging-trace-task-1",
            "title": "Включи тельная сумма",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-trace-task-2",
            "title": "Факториал без нулевого накопителя",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-trace-task-3",
            "title": "Количество длинных слов",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-trace-task-4",
            "title": "Почему цикл не завершается?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "debugging-boundaries",
        "title": "Граничные случаи и минимальный контрпример",
        "goal": "Проверять пустоту, равенство, последний элемент и переходы правил.",
        "role": "lesson",
        "prerequisites": [
          "debugging-trace"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "debugging-boundaries-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "debugging-boundaries-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "debugging-boundaries-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "debugging-boundaries-task-1",
            "title": "Страница списка",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-boundaries-task-2",
            "title": "Последнее вхождение",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-boundaries-task-3",
            "title": "Нижний центральный элемент",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-boundaries-task-4",
            "title": "Сильная проверка поиска",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "debugging-assertions",
        "title": "assert и проектирование проверок",
        "goal": "Проверять свойства и выбирать входы, различающие ошибки.",
        "role": "lesson",
        "prerequisites": [
          "debugging-boundaries"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "debugging-assertions-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "debugging-assertions-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "debugging-assertions-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "debugging-assertions-task-1",
            "title": "Проверка неубывания",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-assertions-task-2",
            "title": "Корректный диапазон",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-assertions-task-3",
            "title": "Контрпримеры ошибочной формулы",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-assertions-task-4",
            "title": "Для чего не подходит assert?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "debugging-exceptions",
        "title": "try/except и неверный формат данных",
        "goal": "Обрабатывать ожидаемый ValueError, не скрывая остальные ошибки.",
        "role": "lesson",
        "prerequisites": [
          "debugging-assertions"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "debugging-exceptions-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "debugging-exceptions-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "debugging-exceptions-step-3",
            "title": "Применение и ошибки"
          },
          {
            "id": "debugging-exceptions-finally",
            "title": "finally: завершающее действие"
          }
        ],
        "examples": 4,
        "tasks": [
          {
            "id": "debugging-exceptions-task-1",
            "title": "Разобрать целое",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-exceptions-task-2",
            "title": "Положительное целое из поля",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-exceptions-task-3",
            "title": "Сумма с числом ошибок",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-exceptions-task-4",
            "title": "Что продолжит выполняться?",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "debugging-strategy",
        "title": "Гипотеза, локализация и минимальный пример",
        "goal": "Искать первую точку расхождения вместо случайных правок.",
        "role": "lesson",
        "prerequisites": [
          "debugging-exceptions"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "debugging-strategy-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "debugging-strategy-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "debugging-strategy-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "debugging-strategy-task-1",
            "title": "Первое различие результатов",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-strategy-task-2",
            "title": "Первая запись без имени",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-strategy-task-3",
            "title": "Сколько единиц помещается?",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-strategy-task-4",
            "title": "Что проверить первым?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "debugging-state",
        "title": "Состояние, копии и накопители",
        "goal": "Исправлять потерю истории и нежелательное изменение входа.",
        "role": "lesson",
        "prerequisites": [
          "debugging-strategy"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "debugging-state-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "debugging-state-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "debugging-state-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "debugging-state-task-1",
            "title": "Накопительная сумма",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-state-task-2",
            "title": "Убрать повторы по порядку",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-state-task-3",
            "title": "Без отрицательных счётчиков",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-state-task-4",
            "title": "Почему пропускается сосед?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "debugging-review",
        "title": "Повторение: найти и объяснить причину",
        "goal": "Применить диагностику к новым алгоритмам.",
        "role": "review",
        "prerequisites": [
          "debugging-state"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "debugging-review-step-1",
            "title": "Задача и устройство"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "debugging-review-task-1",
            "title": "Сумма между разделителями",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-review-task-2",
            "title": "Индекс минимального значения",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-review-task-3",
            "title": "Проверить баллы из строк",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-review-task-4",
            "title": "Выбери контрпример",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "debugging-assessment",
        "title": "Контрольная: проверка и исправление данных",
        "goal": "Решить четыре новых контракта и объяснить граничные случаи.",
        "role": "assessment",
        "prerequisites": [
          "debugging-review"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "debugging-assessment-step-1",
            "title": "Задача и устройство"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "debugging-assessment-task-1",
            "title": "Равные соседние пары",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-assessment-task-2",
            "title": "Первая неверная сумма",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-assessment-task-3",
            "title": "Безопасный процент",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-assessment-task-4",
            "title": "Длины непрерывных серий",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "debugging-validator-project",
        "title": "Мини-проект: отчёт о качестве анкет",
        "goal": "Разделить разбор, валидацию и итог без скрытого исправления данных.",
        "role": "project",
        "prerequisites": [
          "debugging-assessment"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "debugging-validator-project-step-1",
            "title": "Задача и устройство"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "debugging-validator-project-task-1",
            "title": "Причины одной анкеты",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-validator-project-task-2",
            "title": "Индексы ошибочных анкет",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-validator-project-task-3",
            "title": "Очищенные допустимые анкеты",
            "kind": "code",
            "required": true
          },
          {
            "id": "debugging-validator-project-task-4",
            "title": "Сводка качества пакета",
            "kind": "code",
            "required": true
          }
        ]
      }
    ]
  },
  {
    "id": "data",
    "title": "Файлы, модули и данные",
    "goal": "Читать и создавать документы в браузерной среде, разбирать JSON и CSV и проверять схему.",
    "track": "base",
    "depth": "Практический модуль",
    "prerequisites": [
      "debugging"
    ],
    "lessons": [
      {
        "id": "data-imports",
        "title": "import и стандартная библиотека",
        "goal": "Подключать модуль, читать его имя и учитывать браузерную среду.",
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "data-imports-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "data-imports-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "data-imports-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "data-imports-task-1",
            "title": "Количество коробок",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-imports-task-2",
            "title": "Сократить дробь",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-imports-task-3",
            "title": "Имя файла из учебного пути",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-imports-task-4",
            "title": "Где появится файл?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "data-streams",
        "title": "Текстовый поток: read, readline и позиция",
        "goal": "Читать последовательность символов и понимать текущее положение.",
        "role": "lesson",
        "prerequisites": [
          "data-imports"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "data-streams-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "data-streams-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "data-streams-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "data-streams-task-1",
            "title": "Первая строка без переноса",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-streams-task-2",
            "title": "Непустые очищенные строки",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-streams-task-3",
            "title": "Сумма целых строк",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-streams-task-4",
            "title": "Повторный read",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "data-read-files",
        "title": "Чтение UTF-8 файла и with",
        "goal": "Открыть входной файл, прочитать данные и закрыть поток.",
        "role": "lesson",
        "prerequisites": [
          "data-streams"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "data-read-files-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "data-read-files-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "data-read-files-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "data-read-files-task-1",
            "title": "Прочитать текст целиком",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-read-files-task-2",
            "title": "Количество строк файла",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-read-files-task-3",
            "title": "Первая полезная строка файла",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-read-files-task-4",
            "title": "Когда файл закрывается?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "data-write-files",
        "title": "Запись, добавление и кодировка",
        "goal": "Выбирать режим файла и проверять реальный записанный результат.",
        "role": "lesson",
        "prerequisites": [
          "data-read-files"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "data-write-files-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "data-write-files-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "data-write-files-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "data-write-files-task-1",
            "title": "Записать точный текст",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-write-files-task-2",
            "title": "Добавить строку журнала",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-write-files-task-3",
            "title": "Копия заглавными буквами",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-write-files-task-4",
            "title": "Режим для журнала",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "data-json",
        "title": "JSON: структура, разбор и сериализация",
        "goal": "Переводить вложенные данные в текст и обратно без выполнения кода.",
        "role": "lesson",
        "prerequisites": [
          "data-write-files"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "data-json-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "data-json-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "data-json-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "data-json-task-1",
            "title": "Сумма JSON-массива",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-json-task-2",
            "title": "Необязательное имя из JSON",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-json-task-3",
            "title": "Сериал из овать сводку",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-json-task-4",
            "title": "loads или dumps?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "data-csv",
        "title": "CSV: строки таблицы и кавычки",
        "goal": "Разбирать таблицы, преобразовывать числа и писать корректный CSV.",
        "role": "lesson",
        "prerequisites": [
          "data-json"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "data-csv-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "data-csv-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "data-csv-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "data-csv-task-1",
            "title": "Имена из таблицы",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-csv-task-2",
            "title": "Сумма количества CSV",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-csv-task-3",
            "title": "Записать одну CSV-запись",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-csv-task-4",
            "title": "Почему не split(\",\")?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "data-pipeline",
        "title": "Разбор, проверка и накопление по этапам",
        "goal": "Не смешивать формат, допустимость и итоговые показатели.",
        "role": "lesson",
        "prerequisites": [
          "data-csv"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "data-pipeline-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "data-pipeline-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "data-pipeline-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "data-pipeline-task-1",
            "title": "Сумма количеств по товару",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-pipeline-task-2",
            "title": "Настройки из текста",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-pipeline-task-3",
            "title": "Допустимые заказы из JSON",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-pipeline-task-4",
            "title": "Что означает допустимый JSON?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "data-reports",
        "title": "Детерминированный отчёт и порядок данных",
        "goal": "Собирать воспроизводимый текст из проверенной структуры.",
        "role": "lesson",
        "prerequisites": [
          "data-pipeline"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "data-reports-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "data-reports-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "data-reports-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "data-reports-task-1",
            "title": "Алфавитный текстовый отчёт",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-reports-task-2",
            "title": "Сводка JSON-списка записей",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-reports-task-3",
            "title": "CSV-отчёт словаря",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-reports-task-4",
            "title": "Что сортировать?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "data-review",
        "title": "Повторение: источник и структура",
        "goal": "Соединить файловое чтение с разбором и проверкой смысла.",
        "role": "review",
        "prerequisites": [
          "data-reports"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "data-review-step-1",
            "title": "Задача и устройство"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "data-review-task-1",
            "title": "Сумма JSON-файла",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-review-task-2",
            "title": "Порядок обработки",
            "kind": "order",
            "required": true
          }
        ]
      },
      {
        "id": "data-assessment",
        "title": "Контрольная: документы и форматы",
        "goal": "Проверить схему, преобразовать CSV и создать настоящий файл результата.",
        "role": "assessment",
        "prerequisites": [
          "data-review"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "data-assessment-step-1",
            "title": "Задача и устройство"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "data-assessment-task-1",
            "title": "Только JSON-массив целых",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-assessment-task-2",
            "title": "Положительные остатки CSV",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-assessment-task-3",
            "title": "Сохранить JSON-данные",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "data-expenses-project",
        "title": "Мини-проект: CSV-журнал расходов",
        "goal": "Прочитать журнал, агрегировать категории и сериал из овать сводку.",
        "role": "project",
        "prerequisites": [
          "data-assessment"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "data-expenses-project-step-1",
            "title": "Задача и устройство"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "data-expenses-project-task-1",
            "title": "Разобрать журнал",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-expenses-project-task-2",
            "title": "Итоги по категориям",
            "kind": "code",
            "required": true
          },
          {
            "id": "data-expenses-project-task-3",
            "title": "JSON-сводка расходов",
            "kind": "code",
            "required": true
          }
        ]
      }
    ]
  },
  {
    "id": "projects",
    "title": "Комплексная практика и проекты",
    "goal": "Самостоятельно соединять формат данных, состояние и ясные критерии результата.",
    "track": "base",
    "depth": "Практический модуль",
    "prerequisites": [
      "data"
    ],
    "lessons": [
      {
        "id": "projects-budget",
        "title": "Проект: движение денег и лимит",
        "goal": "Различать поступления, расходы, остаток и момент превышения.",
        "role": "project",
        "prerequisites": [],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "projects-budget-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "projects-budget-step-2",
            "title": "Порядок выполнения"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "projects-budget-task-1",
            "title": "История баланса",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-budget-task-2",
            "title": "Первое отрицательное состояние",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-budget-task-3",
            "title": "Общий расход по журналу",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-budget-task-4",
            "title": "Сводка бюджета",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-budget-task-5",
            "title": "Чек по каталогу и корзине",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "projects-text-analysis",
        "title": "Проект: анализ небольшого текста",
        "goal": "Нормализовать слова и строить частотный отчёт без потери правил.",
        "role": "project",
        "prerequisites": [
          "projects-budget"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "projects-text-analysis-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "projects-text-analysis-step-2",
            "title": "Порядок выполнения"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "projects-text-analysis-task-1",
            "title": "Нормализовать слова",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-text-analysis-task-2",
            "title": "Частоты нормализованных слов",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-text-analysis-task-3",
            "title": "Лидер с алфавитной ничьей",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-text-analysis-task-4",
            "title": "Сводка текста",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "projects-inventory",
        "title": "Проект: склад и последовательные заявки",
        "goal": "Применять изменения состояния по контракту и показывать отказанные заявки.",
        "role": "project",
        "prerequisites": [
          "projects-text-analysis"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "projects-inventory-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "projects-inventory-step-2",
            "title": "Порядок выполнения"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "projects-inventory-task-1",
            "title": "Можно ли выполнить заявку?",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-inventory-task-2",
            "title": "Применить последовательность",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-inventory-task-3",
            "title": "Индексы отказов",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-inventory-task-4",
            "title": "План пополнения",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "projects-scores",
        "title": "Проект: ведомость и честные показатели",
        "goal": "Учитывать вес, отсутствие данных, улучшение и одинаковые места.",
        "role": "project",
        "prerequisites": [
          "projects-inventory"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "projects-scores-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "projects-scores-step-2",
            "title": "Порядок выполнения"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "projects-scores-task-1",
            "title": "Среднее с весами и пропусками",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-scores-task-2",
            "title": "Сколько работ выполнено?",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-scores-task-3",
            "title": "Изменение общих результатов",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-scores-task-4",
            "title": "Места с общей ничьей",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "projects-identifiers",
        "title": "Проект: проверка и уникальность кодов",
        "goal": "Нормализовать идентификатор и отличать неверную запись от повторной.",
        "role": "project",
        "prerequisites": [
          "projects-scores"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "projects-identifiers-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "projects-identifiers-step-2",
            "title": "Порядок выполнения"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "projects-identifiers-task-1",
            "title": "Нормальная форма кода",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-identifiers-task-2",
            "title": "Допустимый ASCII-код",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-identifiers-task-3",
            "title": "Принятые индексы регистрации",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-identifiers-task-4",
            "title": "Причины отказа регистрации",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "projects-schedule",
        "title": "Проект: интервалы и свободное время",
        "goal": "Объединять занятые интервалы и находить свободный участок.",
        "role": "project",
        "prerequisites": [
          "projects-identifiers"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "projects-schedule-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "projects-schedule-step-2",
            "title": "Порядок выполнения"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "projects-schedule-task-1",
            "title": "Длина пересечения",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-schedule-task-2",
            "title": "Объединить занятые участки",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-schedule-task-3",
            "title": "Свободные минуты дня",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-schedule-task-4",
            "title": "Самое раннее место занятия",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "projects-logs",
        "title": "Проект: журнал сообщений",
        "goal": "Разбирать строки, различать уровни и считать непрерывные серии.",
        "role": "project",
        "prerequisites": [
          "projects-schedule"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "projects-logs-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "projects-logs-step-2",
            "title": "Порядок выполнения"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "projects-logs-task-1",
            "title": "Разобрать журнал сообщений",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-logs-task-2",
            "title": "Номера неверных строк",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-logs-task-3",
            "title": "Самая длинная серия ошибок",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-logs-task-4",
            "title": "Сводка разобранного журнала",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "projects-study-plan",
        "title": "Смешанная практика: план учебной сессии",
        "goal": "Планировать следующий шаг по зависимости и фактическому выполнению.",
        "role": "review",
        "prerequisites": [
          "projects-logs"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "projects-study-plan-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "projects-study-plan-step-2",
            "title": "Порядок выполнения"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "projects-study-plan-task-1",
            "title": "Префикс по времени",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-study-plan-task-2",
            "title": "Готовые к изучению темы",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-study-plan-task-3",
            "title": "Наступившие даты повторения",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-study-plan-task-4",
            "title": "Три независимых события прогресса",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "projects-final-inventory",
        "title": "Итоговая работа 1: атомарный складской пакет",
        "goal": "Самостоятельно соединить CSV, проверку состояния, откат и отчёт.",
        "role": "final",
        "prerequisites": [
          "projects-study-plan"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "projects-final-inventory-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "projects-final-inventory-step-2",
            "title": "Порядок выполнения"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "projects-final-inventory-task-1",
            "title": "Операции из CSV",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-final-inventory-task-2",
            "title": "Применить или откатить весь пакет",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-final-inventory-task-3",
            "title": "Пороговые предупреждения",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-final-inventory-task-4",
            "title": "Полный атомарный отчёт",
            "kind": "code",
            "required": true
          }
        ]
      },
      {
        "id": "projects-final-learning",
        "title": "Итоговая работа 2: учебные попытки и отчёт",
        "goal": "Самостоятельно разделить попытки, помощь, решение и полноту модуля.",
        "role": "final",
        "prerequisites": [
          "projects-final-inventory"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "projects-final-learning-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "projects-final-learning-step-2",
            "title": "Порядок выполнения"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "projects-final-learning-task-1",
            "title": "Самостоятельно решённые задачи",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-final-learning-task-2",
            "title": "Серия дней самостоятельных успехов",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-final-learning-task-3",
            "title": "Недостающие обязательные задачи",
            "kind": "code",
            "required": true
          },
          {
            "id": "projects-final-learning-task-4",
            "title": "Полный отчёт обучения",
            "kind": "code",
            "required": true
          }
        ]
      }
    ]
  },
  {
    "id": "oop",
    "title": "Классы и объекты",
    "goal": "Понимать собственные объекты, методы и независимость состояния; применить их в небольшой модели.",
    "track": "advanced",
    "depth": "Вводная последовательность",
    "prerequisites": [
      "projects"
    ],
    "lessons": [
      {
        "id": "oop-objects",
        "title": "Объект, класс и экземпляр",
        "goal": "Различать описание класса и конкретные объекты с состоянием.",
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "oop-objects-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "oop-objects-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "oop-objects-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "oop-objects-task-1",
            "title": "Тип заметки",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-objects-task-2",
            "title": "Фабрика подписей",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-objects-task-3",
            "title": "Один ли это объект?",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-objects-task-4",
            "title": "Что копирует присваивание?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "oop-initialization",
        "title": "__init__, self и обязательные атрибуты",
        "goal": "Инициализировать каждый экземпляр собственными данными.",
        "role": "lesson",
        "prerequisites": [
          "oop-objects"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "oop-initialization-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "oop-initialization-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "oop-initialization-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "oop-initialization-task-1",
            "title": "Точка с координатами",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-initialization-task-2",
            "title": "Прямоугольник как данные",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-initialization-task-3",
            "title": "Профиль с очищенным именем",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-initialization-task-4",
            "title": "Что означает self.x=x?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "oop-methods",
        "title": "Методы и переходы состояния",
        "goal": "Менять состояние конкретного объекта и возвращать результат действия.",
        "role": "lesson",
        "prerequisites": [
          "oop-initialization"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "oop-methods-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "oop-methods-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "oop-methods-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "oop-methods-task-1",
            "title": "Счётчик с изменением",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-methods-task-2",
            "title": "Кошелёк без отрицательного остатка",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-methods-task-3",
            "title": "Переключатель запуска",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-methods-task-4",
            "title": "Почему метод получает self?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "oop-independence",
        "title": "Независимые списки экземпляров",
        "goal": "Избегать общей изменяемой коллекции и возвращать безопасные снимки.",
        "role": "lesson",
        "prerequisites": [
          "oop-methods"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "oop-independence-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "oop-independence-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "oop-independence-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "oop-independence-task-1",
            "title": "Корзины не смешивают товары",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-independence-task-2",
            "title": "Начальные записи без общей ссылки",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-independence-task-3",
            "title": "Завершение одного повторного дела",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-independence-task-4",
            "title": "Где создавать список?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "oop-class-attributes",
        "title": "Атрибуты класса и экземпляра",
        "goal": "Осознанно отделять общую настройку от индивидуального состояния.",
        "role": "lesson",
        "prerequisites": [
          "oop-independence"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "oop-class-attributes-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "oop-class-attributes-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "oop-class-attributes-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "oop-class-attributes-task-1",
            "title": "Живая общая надбавка",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-class-attributes-task-2",
            "title": "Цвет значка с переопределением",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-class-attributes-task-3",
            "title": "Сколько объектов создано",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-class-attributes-task-4",
            "title": "Чем опасно self.count+=1?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "oop-composition",
        "title": "Композиция: объект внутри объекта",
        "goal": "Связывать разные роли через явно переданные объекты.",
        "role": "lesson",
        "prerequisites": [
          "oop-class-attributes"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "oop-composition-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "oop-composition-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "oop-composition-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "oop-composition-task-1",
            "title": "Товар и строка корзины",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-composition-task-2",
            "title": "Обёртка делегирует счётчику",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-composition-task-3",
            "title": "Плейлист с общими треками",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-composition-task-4",
            "title": "Композиция или наследование?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "oop-inheritance",
        "title": "Наследование, переопределение и super",
        "goal": "Расширять понятный базовый тип без потери его состояния.",
        "role": "lesson",
        "prerequisites": [
          "oop-composition"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "oop-inheritance-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "oop-inheritance-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "oop-inheritance-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "oop-inheritance-task-1",
            "title": "Животное и переопределённое действие",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-inheritance-task-2",
            "title": "Общая формула и ставка наследника",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-inheritance-task-3",
            "title": "Именованный наследник счётчика",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-inheritance-task-4",
            "title": "Что делает новый __init__?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "oop-special-methods",
        "title": "Специальные методы: len, str и операторы",
        "goal": "Подключать привычные операции к собственному типу по ясному контракту.",
        "role": "lesson",
        "prerequisites": [
          "oop-inheritance"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "oop-special-methods-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "oop-special-methods-step-2",
            "title": "Порядок выполнения"
          },
          {
            "id": "oop-special-methods-step-3",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "oop-special-methods-task-1",
            "title": "Вектор с новым результатом суммы",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-special-methods-task-2",
            "title": "Список чтения как контейнер",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-special-methods-task-3",
            "title": "Кошелёк в условии и строке",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-special-methods-task-4",
            "title": "Что возвращает __str__?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "oop-library-project",
        "title": "Практика: маленькая библиотека",
        "goal": "Соединить объект книги, участника и каталог с наблюдаемыми переходами.",
        "role": "project",
        "prerequisites": [
          "oop-special-methods"
        ],
        "estimatedMinutes": 55,
        "steps": [
          {
            "id": "oop-library-project-step-1",
            "title": "Задача и устройство"
          },
          {
            "id": "oop-library-project-step-2",
            "title": "Порядок выполнения"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "oop-library-project-task-1",
            "title": "Состояние книги",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-library-project-task-2",
            "title": "Участник с лимитом",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-library-project-task-3",
            "title": "Каталог с объектами книг",
            "kind": "code",
            "required": true
          },
          {
            "id": "oop-library-project-task-4",
            "title": "Журнал библиотеки",
            "kind": "code",
            "required": true
          }
        ]
      }
    ]
  },
  {
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
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "iterators-iterable-idea",
            "title": "Как это работает"
          },
          {
            "id": "iterators-iterable-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "iterators-iterable-first",
            "title": "Первый элемент и остаток",
            "kind": "code",
            "required": true
          },
          {
            "id": "iterators-iterable-twice",
            "title": "Два прохода одного объекта",
            "kind": "code",
            "required": true
          },
          {
            "id": "iterators-iterable-two-iterators",
            "title": "Два независимых прохода списка",
            "kind": "code",
            "required": true
          },
          {
            "id": "iterators-iterable-same",
            "title": "Повторное iter",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "iterators-next",
        "title": "next, StopIteration и ограниченное потребление",
        "goal": "Читать поток до завершения без потери лишних элементов.",
        "role": "lesson",
        "prerequisites": [
          "iterators-iterable"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "iterators-next-idea",
            "title": "Как это работает"
          },
          {
            "id": "iterators-next-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "iterators-next-take",
            "title": "Взять не больше k элементов",
            "kind": "code",
            "required": true
          },
          {
            "id": "iterators-next-skip",
            "title": "Пропустить и вернуть следующий",
            "kind": "code",
            "required": true
          },
          {
            "id": "iterators-next-rest-sum",
            "title": "Сумма оставшейся части",
            "kind": "code",
            "required": true
          },
          {
            "id": "iterators-next-end",
            "title": "Как обозначается конец?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "iterators-yield",
        "title": "yield и сохранение состояния",
        "goal": "Писать генератор и понимать приостановку между выдачами.",
        "role": "lesson",
        "prerequisites": [
          "iterators-next"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "iterators-yield-idea",
            "title": "Как это работает"
          },
          {
            "id": "iterators-yield-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "iterators-yield-countdown",
            "title": "Генератор обратного отсчёта",
            "kind": "code",
            "required": true
          },
          {
            "id": "iterators-yield-lazy-squares",
            "title": "Ленивые квадраты",
            "kind": "code",
            "required": true
          },
          {
            "id": "iterators-yield-positive",
            "title": "Ленивый фильтр",
            "kind": "code",
            "required": true
          },
          {
            "id": "iterators-yield-yield-return",
            "title": "yield и return",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "iterators-delegate",
        "title": "yield from и составной поток",
        "goal": "Соединять потоки без лишней вложенности результата.",
        "role": "lesson",
        "prerequisites": [
          "iterators-yield"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "iterators-delegate-idea",
            "title": "Как это работает"
          },
          {
            "id": "iterators-delegate-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "iterators-delegate-flatten",
            "title": "Один уровень списков",
            "kind": "code",
            "required": true
          },
          {
            "id": "iterators-delegate-frame",
            "title": "Обрамить поток",
            "kind": "code",
            "required": true
          },
          {
            "id": "iterators-delegate-ranges",
            "title": "Последовательность диапазонов",
            "kind": "code",
            "required": true
          },
          {
            "id": "iterators-delegate-from",
            "title": "Глубина выдачи",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "iterators-stream-project",
        "title": "Практическая работа: ограниченный поток",
        "goal": "Соединять ленивое преобразование и ограничение чтения.",
        "role": "project",
        "prerequisites": [
          "iterators-delegate"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "iterators-stream-project-idea",
            "title": "Как это работает"
          },
          {
            "id": "iterators-stream-project-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "iterators-stream-project-running",
            "title": "Генератор накопленных сумм",
            "kind": "code",
            "required": true
          },
          {
            "id": "iterators-stream-project-limit-positives",
            "title": "Первые k положительных",
            "kind": "code",
            "required": true
          },
          {
            "id": "iterators-stream-project-pipeline",
            "title": "Ограниченный отчёт квадратов",
            "kind": "code",
            "required": true
          },
          {
            "id": "iterators-stream-project-limits",
            "title": "Что проверяет ленивость?",
            "kind": "explain",
            "required": true
          }
        ]
      }
    ]
  },
  {
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
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "decorators-callables-idea",
            "title": "Как это работает"
          },
          {
            "id": "decorators-callables-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "decorators-callables-twice",
            "title": "Два применения переданной функции",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-callables-map",
            "title": "Применить к каждому элементу",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-callables-select",
            "title": "Выбрать по предикату",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-callables-object-call",
            "title": "Имя и вызов",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "decorators-closures",
        "title": "Замыкание и nonlocal",
        "goal": "Сохранять независимое состояние между вызовами возвращённой функции.",
        "role": "lesson",
        "prerequisites": [
          "decorators-callables"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "decorators-closures-idea",
            "title": "Как это работает"
          },
          {
            "id": "decorators-closures-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "decorators-closures-adder",
            "title": "Фабрика прибавления",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-closures-counter",
            "title": "Независимые счётчики",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-closures-total",
            "title": "Накопитель с добавлением",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-closures-nonlocal",
            "title": "Когда нужен nonlocal?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "decorators-wrappers",
        "title": "Обёртка и запись @",
        "goal": "Добавлять поведение вокруг вызова, сохраняя результат.",
        "role": "lesson",
        "prerequisites": [
          "decorators-closures"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "decorators-wrappers-idea",
            "title": "Как это работает"
          },
          {
            "id": "decorators-wrappers-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "decorators-wrappers-double",
            "title": "Удвоить возвращённый результат",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-wrappers-log",
            "title": "Журнал каждого вызова",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-wrappers-guard",
            "title": "Отклонить отрицательный аргумент",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-wrappers-at",
            "title": "Что делает @?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "decorators-arguments",
        "title": "*args, **kwargs и именованные параметры",
        "goal": "Перенаправлять аргументы без потери структуры вызова.",
        "role": "lesson",
        "prerequisites": [
          "decorators-wrappers"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "decorators-arguments-idea",
            "title": "Как это работает"
          },
          {
            "id": "decorators-arguments-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "decorators-arguments-forward",
            "title": "Сохранить позиционные и именованные аргументы",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-arguments-total",
            "title": "Сумма произвольного числа аргументов",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-arguments-keyword-only",
            "title": "Только именованный active",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-arguments-stars",
            "title": "Сбор и распаковка",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "decorators-metadata",
        "title": "Метаданные и порядок декораторов",
        "goal": "Сохранять имя исходной функции и прослеживать вложенные обёртки.",
        "role": "lesson",
        "prerequisites": [
          "decorators-arguments"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "decorators-metadata-idea",
            "title": "Как это работает"
          },
          {
            "id": "decorators-metadata-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "decorators-metadata-wraps",
            "title": "Бонус с сохранённой справкой",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-metadata-order",
            "title": "Сначала удвоить, затем прибавить",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-metadata-finally",
            "title": "Журнал до и после ошибки",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-metadata-stack",
            "title": "Порядок двух декораторов",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "decorators-cache-project",
        "title": "Практическая работа: состояние обёртки",
        "goal": "Собрать проверяемые инструменты с ограничениями и изолированным состоянием.",
        "role": "project",
        "prerequisites": [
          "decorators-metadata"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "decorators-cache-project-idea",
            "title": "Как это работает"
          },
          {
            "id": "decorators-cache-project-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "decorators-cache-project-memo",
            "title": "Кэш одной функции",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-cache-project-limited",
            "title": "Лимит числа попыток",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-cache-project-retry",
            "title": "Одна дополнительная попытка",
            "kind": "code",
            "required": true
          },
          {
            "id": "decorators-cache-project-cache",
            "title": "Что проверяет настоящий кэш?",
            "kind": "explain",
            "required": true
          }
        ]
      }
    ]
  },
  {
    "id": "async-python",
    "title": "Асинхронный Python: первое знакомство",
    "goal": "Понимать coroutine, await, Task, ошибки и кооперативную отмену без обещаний производительности.",
    "track": "advanced",
    "depth": "Вводная последовательность",
    "prerequisites": [
      "functions",
      "debugging"
    ],
    "lessons": [
      {
        "id": "async-python-await",
        "title": "Корутина и await",
        "goal": "Получать результат async-функции и отличать его от объекта корутины.",
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "async-python-await-idea",
            "title": "Как это работает"
          },
          {
            "id": "async-python-await-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "async-python-await-square",
            "title": "Асинхронный квадрат",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-await-greeting",
            "title": "Результат с параметром",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-await-compose",
            "title": "Композиция ожидаемых вызовов",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-await-call",
            "title": "Вызов ещё не выполнение",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "async-python-cooperate",
        "title": "Последовательность и передача управления",
        "goal": "Отличать последовательное ожидание от совместного планирования.",
        "role": "lesson",
        "prerequisites": [
          "async-python-await"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "async-python-cooperate-idea",
            "title": "Как это работает"
          },
          {
            "id": "async-python-cooperate-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "async-python-cooperate-running",
            "title": "Последовательные итоги",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-cooperate-factorial",
            "title": "Ожидаемые шаги произведения",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-cooperate-pipeline",
            "title": "Последовательные преобразования",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-cooperate-sleep",
            "title": "Какая пауза уступает управление?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "async-python-tasks",
        "title": "Task и gather",
        "goal": "Планировать независимые корутины и сохранять порядок результатов.",
        "role": "lesson",
        "prerequisites": [
          "async-python-cooperate"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "async-python-tasks-idea",
            "title": "Как это работает"
          },
          {
            "id": "async-python-tasks-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "async-python-tasks-batch",
            "title": "Пакет квадратов",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-tasks-pair",
            "title": "Две независимые характеристики",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-tasks-meet",
            "title": "Запланировать обе задачи до ожидания",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-tasks-gather-order",
            "title": "Порядок gather",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "async-python-exceptions",
        "title": "Исключения при await и в пакете",
        "goal": "Обрабатывать ожидаемые ошибки, не объявляя их успешным результатом.",
        "role": "lesson",
        "prerequisites": [
          "async-python-tasks"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "async-python-exceptions-idea",
            "title": "Как это работает"
          },
          {
            "id": "async-python-exceptions-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "async-python-exceptions-safe-int",
            "title": "Безопасное преобразование",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-exceptions-parse-batch",
            "title": "Пакет с частичными ошибками",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-exceptions-reciprocal",
            "title": "Ошибка деления — отдельный статус",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-exceptions-gather-errors",
            "title": "Что делает return_exceptions?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "async-python-cancel",
        "title": "Отмена, Event и finally",
        "goal": "Дожидаться отменённой задачи и сохранять очистку состояния.",
        "role": "lesson",
        "prerequisites": [
          "async-python-exceptions"
        ],
        "estimatedMinutes": 22,
        "steps": [
          {
            "id": "async-python-cancel-idea",
            "title": "Как это работает"
          },
          {
            "id": "async-python-cancel-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "async-python-cancel-cleanup",
            "title": "Отмена с журналом очистки",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-cancel-status",
            "title": "Отменить группу начатых задач",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-cancel-finally-result",
            "title": "Очистка при обоих исходах",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-cancel-cancel-base",
            "title": "Почему except Exception не ловит отмену?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "async-python-batch-project",
        "title": "Мини-проект: пакетный разбор записей",
        "goal": "Собрать небольшой асинхронный отчёт с частичными ошибками и порядком.",
        "role": "project",
        "prerequisites": [
          "async-python-cancel"
        ],
        "estimatedMinutes": 35,
        "steps": [
          {
            "id": "async-python-batch-project-idea",
            "title": "Как это работает"
          },
          {
            "id": "async-python-batch-project-apply",
            "title": "Применение и ошибки"
          }
        ],
        "examples": 3,
        "tasks": [
          {
            "id": "async-python-batch-project-record",
            "title": "Разобрать одну запись",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-batch-project-records",
            "title": "Обработать пакет с позициями",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-batch-project-report",
            "title": "Итоговый отчёт пакета",
            "kind": "code",
            "required": true
          },
          {
            "id": "async-python-batch-project-project-review",
            "title": "Чего отчёт не доказывает?",
            "kind": "explain",
            "required": true
          }
        ]
      }
    ]
  },
  {
    "id": "sql-python",
    "title": "SQL и Python: SQLite в памяти",
    "goal": "Создавать учебные таблицы, выполнять параметризованные запросы и строить связанный отчёт без рабочей базы данных.",
    "track": "advanced",
    "depth": "Вводная последовательность",
    "prerequisites": [
      "data",
      "functions"
    ],
    "lessons": [
      {
        "id": "sql-python-connection",
        "title": "SQLite в памяти: соединение, схема и строки",
        "goal": "Открыть учебную базу, создать таблицу и прочитать строки без внешнего сервера.",
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "sql-python-connection-step-1",
            "title": "Что здесь является базой"
          },
          {
            "id": "sql-python-connection-step-2",
            "title": "Курсор и отсутствие строки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "sql-python-create-schema",
            "title": "Создать каталог",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-read-all",
            "title": "Прочитать названия",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-first-title",
            "title": "Первая строка или None",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-memory-isolation",
            "title": "Где живут данные?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "sql-python-insert",
        "title": "INSERT и параметры: данные отдельно от SQL",
        "goal": "Добавлять одиночные и пакетные записи, безопасно передавая текст и None.",
        "role": "lesson",
        "prerequisites": [
          "sql-python-connection"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "sql-python-insert-step-1",
            "title": "Запрос и значения не склеиваются"
          },
          {
            "id": "sql-python-insert-step-2",
            "title": "Много строк и отсутствующее значение"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "sql-python-add-book",
            "title": "Добавить книгу",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-add-many",
            "title": "Добавить пакет",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-null-value",
            "title": "Неизвестная цена",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-param-choice",
            "title": "Граница SQL и данных",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "sql-python-select",
        "title": "SELECT, WHERE, ORDER BY и LIMIT",
        "goal": "Выбрать нужные столбцы и строки со стабильным порядком результата.",
        "role": "lesson",
        "prerequisites": [
          "sql-python-insert"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "sql-python-select-step-1",
            "title": "Какие данные нужны"
          },
          {
            "id": "sql-python-select-step-2",
            "title": "Ограничение и параметры"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "sql-python-affordable",
            "title": "Доступные книги",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-exact-title",
            "title": "Поиск точного названия",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-top",
            "title": "Первые по цене",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-order-reason",
            "title": "Почему нужен ORDER BY?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "sql-python-aggregate",
        "title": "Агрегаты, GROUP BY и NULL",
        "goal": "Посчитать сводные показатели без подмены отсутствия нулём.",
        "role": "lesson",
        "prerequisites": [
          "sql-python-select"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "sql-python-aggregate-step-1",
            "title": "Счёт строк и счёт значений"
          },
          {
            "id": "sql-python-aggregate-step-2",
            "title": "Сводка по группам"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "sql-python-price-summary",
            "title": "Сводка цен",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-mean",
            "title": "Средняя известная цена",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-category-totals",
            "title": "Суммы по категориям",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-null-count",
            "title": "Строка без значения",
            "kind": "predict",
            "required": true
          }
        ]
      },
      {
        "id": "sql-python-transactions",
        "title": "UPDATE, DELETE и транзакция",
        "goal": "Изменить нужные строки и сохранить атомарность связанных действий.",
        "role": "lesson",
        "prerequisites": [
          "sql-python-aggregate"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "sql-python-transactions-step-1",
            "title": "Изменение — это тоже запрос"
          },
          {
            "id": "sql-python-transactions-step-2",
            "title": "Все действия или ни одного"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "sql-python-update-price",
            "title": "Изменить одну цену",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-delete-old",
            "title": "Удалить дешёвые книги",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-transfer",
            "title": "Атомарный перевод",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-rollback-reason",
            "title": "Почему нельзя commit посередине?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "sql-python-project",
        "title": "Практическая работа: связанный отчёт заказов",
        "goal": "Соединить таблицы по ключу и построить сводку, сохраняя отсутствующие данные.",
        "role": "project",
        "prerequisites": [
          "sql-python-transactions"
        ],
        "estimatedMinutes": 75,
        "steps": [
          {
            "id": "sql-python-project-step-1",
            "title": "Связь не зависит от позиции строки"
          },
          {
            "id": "sql-python-project-step-2",
            "title": "Итоговая сводка без потери пустых групп"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "sql-python-project-order-rows",
            "title": "Строки заказов",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-project-customer-summary",
            "title": "Сводка покупателей",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-project-active",
            "title": "Покупатели по сумме",
            "kind": "code",
            "required": true
          },
          {
            "id": "sql-python-project-join-choice",
            "title": "Проверка итогового запроса",
            "kind": "choice",
            "required": true
          }
        ]
      }
    ]
  },
  {
    "id": "tooling",
    "title": "Инструменты разработки: первая последовательность",
    "goal": "Понимать локальный запуск, окружение, читаемость и состояния Git; проверять конфигурацию и код без имитации терминала.",
    "track": "advanced",
    "depth": "Вводная последовательность",
    "prerequisites": [
      "debugging",
      "data"
    ],
    "lessons": [
      {
        "id": "tooling-scripts",
        "title": "Скрипт, интерпретатор и рабочая папка",
        "goal": "Различить редактирование, запуск и выбор интерпретатора; прочитать файловый путь.",
        "role": "lesson",
        "prerequisites": [],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "tooling-scripts-step-1",
            "title": "Редактор не выполняет код сам по себе"
          },
          {
            "id": "tooling-scripts-step-2",
            "title": "Контекст запуска и пути"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "tooling-path-parts",
            "title": "Разобрать путь скрипта",
            "kind": "code",
            "required": true
          },
          {
            "id": "tooling-entrypoint",
            "title": "Точка входа",
            "kind": "code",
            "required": true
          },
          {
            "id": "tooling-interpreter-choice",
            "title": "Что именно запускается?",
            "kind": "choice",
            "required": true
          },
          {
            "id": "tooling-script-order",
            "title": "Диагностика «не запускается»",
            "kind": "order",
            "required": true
          }
        ]
      },
      {
        "id": "tooling-readability",
        "title": "PEP 8, имена и документирование",
        "goal": "Улучшить читаемость без изменения поведения и отличить стиль от проверки результата.",
        "role": "lesson",
        "prerequisites": [
          "tooling-scripts"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "tooling-readability-step-1",
            "title": "Код читают чаще, чем набирают"
          },
          {
            "id": "tooling-readability-step-2",
            "title": "Документация и аннотации"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "tooling-refactor-receipt",
            "title": "Читаемый расчёт",
            "kind": "modify",
            "required": true
          },
          {
            "id": "tooling-docstring",
            "title": "Документированная функция",
            "kind": "code",
            "required": true
          },
          {
            "id": "tooling-style-claims",
            "title": "Что проверяет стиль?",
            "kind": "choice",
            "required": true
          },
          {
            "id": "tooling-doc-reason",
            "title": "Почему комментарий не стал __doc__?",
            "kind": "explain",
            "required": true
          }
        ]
      },
      {
        "id": "tooling-environment",
        "title": "venv, pip и описание проекта",
        "goal": "Понять границы окружения и прочитать конфигурацию без установки пакетов.",
        "role": "lesson",
        "prerequisites": [
          "tooling-readability"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "tooling-environment-step-1",
            "title": "Окружение принадлежит проекту"
          },
          {
            "id": "tooling-environment-step-2",
            "title": "Конфигурация — тоже данные"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "tooling-project-name",
            "title": "Прочитать имя проекта",
            "kind": "code",
            "required": true
          },
          {
            "id": "tooling-requirements-text",
            "title": "Список требований",
            "kind": "code",
            "required": true
          },
          {
            "id": "tooling-pip-choice",
            "title": "Куда попадёт пакет?",
            "kind": "choice",
            "required": true
          },
          {
            "id": "tooling-env-order",
            "title": "План настройки локального проекта",
            "kind": "order",
            "required": true
          }
        ]
      },
      {
        "id": "tooling-git-snapshot",
        "title": "Git: рабочая папка, индекс и коммит",
        "goal": "Различить три состояния файла и осознанно подготовить локальный коммит.",
        "role": "lesson",
        "prerequisites": [
          "tooling-environment"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "tooling-git-snapshot-step-1",
            "title": "Три места, три вопроса"
          },
          {
            "id": "tooling-git-snapshot-step-2",
            "title": "Коммит остаётся локальным"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "tooling-git-three-states",
            "title": "Что попадёт в коммит?",
            "kind": "choice",
            "required": true
          },
          {
            "id": "tooling-git-initial-order",
            "title": "Первый осознанный коммит",
            "kind": "order",
            "required": true
          },
          {
            "id": "tooling-git-ignore-reason",
            "title": "Почему .env всё ещё отслеживается?",
            "kind": "explain",
            "required": true
          },
          {
            "id": "tooling-git-local-remote",
            "title": "Локальная история и GitHub",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "tooling-git-review",
        "title": "Diff, история, ветки и конфликт",
        "goal": "Прочитать изменение, выбрать нужный diff и безопасно работать в отдельной ветке.",
        "role": "lesson",
        "prerequisites": [
          "tooling-git-snapshot"
        ],
        "estimatedMinutes": 25,
        "steps": [
          {
            "id": "tooling-git-review-step-1",
            "title": "Изменение читается строками"
          },
          {
            "id": "tooling-git-review-step-2",
            "title": "Ветка не копия рабочей папки"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "tooling-git-diff-choice",
            "title": "Какой diff посмотреть?",
            "kind": "choice",
            "required": true
          },
          {
            "id": "tooling-git-boundary-review",
            "title": "Что проверить у изменения?",
            "kind": "explain",
            "required": true
          },
          {
            "id": "tooling-git-branch-order",
            "title": "Отдельная работа в ветке",
            "kind": "order",
            "required": true
          },
          {
            "id": "tooling-git-conflict",
            "title": "Как завершить конфликт?",
            "kind": "choice",
            "required": true
          }
        ]
      },
      {
        "id": "tooling-project",
        "title": "Практическая работа: конфигурация и проверки проекта",
        "goal": "Проверить входные настройки и составить тесты, различающие реальные ошибки.",
        "role": "assessment",
        "prerequisites": [
          "tooling-git-review"
        ],
        "estimatedMinutes": 60,
        "steps": [
          {
            "id": "tooling-project-step-1",
            "title": "Из описания проекта в поведение"
          },
          {
            "id": "tooling-project-step-2",
            "title": "Тест должен ловить ошибку"
          }
        ],
        "examples": 2,
        "tasks": [
          {
            "id": "tooling-project-config",
            "title": "Проверить timeout",
            "kind": "code",
            "required": true
          },
          {
            "id": "tooling-project-tests",
            "title": "Тесты, которые отличают ошибку",
            "kind": "code",
            "required": true
          },
          {
            "id": "tooling-project-readme",
            "title": "Минимально полезный README",
            "kind": "choice",
            "required": true
          },
          {
            "id": "tooling-project-ready-order",
            "title": "Перед отправкой изменений",
            "kind": "order",
            "required": true
          }
        ]
      }
    ]
  }
];
