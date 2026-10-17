import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "inheritance",
  "title": "Наследование",
  "description": "Расширь класс, сохранив полезное поведение родителя.",
  "icon": "BookOpen",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Объекты",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Расширь класс, сохранив полезное поведение родителя.",
  "sections": [
    {
      "id": "inheritance-example",
      "title": "Наследование",
      "content": [
        "Подкласс наследует атрибуты и методы. Переопределённый метод меняет поведение подкласса. super() позволяет обратиться к следующей реализации в порядке разрешения методов; в простом случае это метод родителя."
      ],
      "code": "class Animal:\n    def speak(self):\n        return 'звук'\n\nclass Cat(Animal):\n    def speak(self):\n        return 'мяу'\n\nprint(Cat().speak())",
      "expectedOutput": "мяу"
    },
    {
      "id": "inheritance-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи Dog как подкласс Animal. Dog().speak() должен возвращать \"woof\"; Animal().speak() остаётся \"sound\".",
        "Наследование ради повторного использования одной строки часто усложняет код. Если объект просто использует другой объект, композиция может быть понятнее. Не забывай инициализацию родителя, когда она нужна.",
        "Дальше: работай с разными объектами через общий метод."
      ]
    }
  ],
  "challenges": [
    {
      "id": "override",
      "question": "Переопределение метода",
      "description": "Определи Dog как подкласс Animal. Dog().speak() должен возвращать \"woof\"; Animal().speak() остаётся \"sound\".",
      "initialCode": "class Animal:\n    def speak(self):\n        return \"sound\"\n\n# Определи Dog\n",
      "code": "class Animal:\n    def speak(self):\n        return \"sound\"\n\nclass Dog(Animal):\n    def speak(self):\n        return \"woof\"",
      "hint": "Укажи родителя в скобках после имени Dog и переопредели только нужный метод.",
      "testCases": [
        {
          "expression": "[issubclass(Dog, Animal), Dog().speak(), Animal().speak()]",
          "expectedValue": [
            true,
            "woof",
            "sound"
          ],
          "expectedCallOutput": ""
        }
      ]
    }
  ],
  "sources": [
    "https://docs.python.org/3.13/tutorial/classes.html"
  ]
};

export default lesson;
