import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "ast",
  "title": "Абстрактное синтаксическое дерево",
  "description": "Разбери исходный код и найди узлы вызова функции.",
  "icon": "BookOpen",
  "level": "Professional",
  "color": "emerald",
  "topic": "Дополнительные темы",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Разбери исходный код и найди узлы вызова функции.",
  "sections": [
    {
      "id": "ast-example",
      "title": "Абстрактное синтаксическое дерево",
      "content": [
        "ast.parse() строит дерево синтаксиса без выполнения программы. Узлы описывают конструкции: ast.Call — вызов, ast.Name — имя, ast.Constant — литерал. ast.walk() обходит все узлы дерева."
      ],
      "code": "import ast\ntree = ast.parse(\"print('hi')\")\nprint(sum(isinstance(node, ast.Call) for node in ast.walk(tree)))",
      "expectedOutput": "1"
    },
    {
      "id": "ast-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи count_calls(source), возвращающую число узлов ast.Call в корректном исходном коде. Не выполняй source.",
        "Слово print в комментарии или строке — не узел вызова. Поиск подстрок не заменяет синтаксический разбор. ast.parse() всё равно может вызвать SyntaxError; он не доказывает, что имена доступны при исполнении.",
        "Дальше: отличи AST от байткода CPython."
      ]
    }
  ],
  "challenges": [
    {
      "id": "calls",
      "question": "Подсчёт вызовов",
      "description": "Определи count_calls(source), возвращающую число узлов ast.Call в корректном исходном коде. Не выполняй source.",
      "initialCode": "def count_calls(source):\n    pass\n",
      "code": "import ast\n\ndef count_calls(source):\n    return sum(isinstance(node, ast.Call) for node in ast.walk(ast.parse(source)))",
      "hint": "Нужен обход ast.Call. Текст в ast.Constant и комментарии не являются вызовами.",
      "testCases": [
        {
          "expression": "count_calls(\"print(1)\\nlen([])\")",
          "expectedValue": 2,
          "expectedCallOutput": ""
        },
        {
          "expression": "count_calls(\"# print(1)\\ntext = 'len([])'\")",
          "expectedValue": 0,
          "expectedCallOutput": ""
        },
        {
          "expression": "count_calls(\"print(len([]))\")",
          "expectedValue": 2,
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/library/ast.html"
  ]
};

export default lesson;
