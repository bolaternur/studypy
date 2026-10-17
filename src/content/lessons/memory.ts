import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "memory",
  "title": "Ссылки и копирование",
  "description": "Сделай независимую копию вложенной коллекции.",
  "icon": "BookOpen",
  "level": "Professional",
  "color": "emerald",
  "topic": "Дополнительные темы",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Сделай независимую копию вложенной коллекции.",
  "sections": [
    {
      "id": "memory-example",
      "title": "Ссылки и копирование",
      "content": [
        "Присваивание b = a не копирует объект. list.copy() создаёт новый внешний список, но вложенные объекты остаются общими. copy.deepcopy() рекурсивно копирует поддерживаемые структуры, сохраняя связи в пределах копии."
      ],
      "code": "from copy import deepcopy\noriginal = [[1], [2]]\ncopy = deepcopy(original)\ncopy[0].append(9)\nprint(original)\nprint(copy)",
      "expectedOutput": "[[1], [2]]\n[[1, 9], [2]]"
    },
    {
      "id": "memory-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи clone(values), возвращающую глубокую копию вложенного списка. Изменение копии не должно менять исходный список.",
        "id() — идентификатор объекта, а не переносимый способ получить физический адрес памяти. sys.getsizeof() обычно не включает размеры всех вложенных объектов. Выбирай копирование по нужной независимости, а не на всякий случай.",
        "Дальше: разбери назначение сборщика циклов."
      ]
    }
  ],
  "challenges": [
    {
      "id": "copy",
      "question": "Независимая вложенная копия",
      "description": "Определи clone(values), возвращающую глубокую копию вложенного списка. Изменение копии не должно менять исходный список.",
      "initialCode": "def clone(values):\n    pass\n",
      "code": "from copy import deepcopy\n\ndef clone(values):\n    return deepcopy(values)",
      "hint": "Поверхностная копия оставляет общими вложенные списки. Требуется рекурсивное копирование.",
      "testCases": [
        {
          "expression": "clone([[1], [2]])",
          "expectedValue": [
            [
              1
            ],
            [
              2
            ]
          ],
          "setup": "def check_independence(cloner):\n    original = [[1], [2]]\n    result = cloner(original)\n    result[0].append(9)\n    return original == [[1], [2]] and result == [[1, 9], [2]]",
          "expectedCallOutput": ""
        },
        {
          "expression": "check_independence(clone)",
          "expectedValue": true,
          "setup": "def check_independence(cloner):\n    original = [[1], [2]]\n    result = cloner(original)\n    result[0].append(9)\n    return original == [[1], [2]] and result == [[1, 9], [2]]",
          "expectedCallOutput": ""
        },
        {
          "expression": "clone([])",
          "expectedValue": [],
          "setup": "def check_independence(cloner):\n    original = [[1], [2]]\n    result = cloner(original)\n    result[0].append(9)\n    return original == [[1], [2]] and result == [[1, 9], [2]]",
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/copy.html",
    "https://docs.python.org/3.13/reference/datamodel.html"
  ]
};

export default lesson;
