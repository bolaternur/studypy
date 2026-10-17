import type { Lesson } from '../../constants/lessons';

const lesson: Lesson = {
  "id": "encapsulation",
  "title": "Интерфейс и внутреннее состояние",
  "description": "Сделай изменение состояния проверяемым через методы.",
  "icon": "BookOpen",
  "level": "Advanced",
  "color": "emerald",
  "topic": "Объекты",
  "estimatedMinutes": 8,
  "challengeCount": 1,
  "content": "Сделай изменение состояния проверяемым через методы.",
  "sections": [
    {
      "id": "encapsulation-example",
      "title": "Интерфейс и внутреннее состояние",
      "content": [
        "Имя с одним подчёркиванием, например _balance, обозначает внутреннюю деталь по соглашению. Оно не блокирует доступ. Методы позволяют проверить допустимость операции до изменения состояния."
      ],
      "code": "class Account:\n    def __init__(self):\n        self._balance = 0\n\n    def deposit(self, amount):\n        if amount < 0:\n            raise ValueError('Отрицательная сумма')\n        self._balance += amount\n        return self._balance\n\nprint(Account().deposit(10))",
      "expectedOutput": "10"
    },
    {
      "id": "encapsulation-practice",
      "title": "Попробуй самостоятельно",
      "content": [
        "Определи Account с _balance = 0 и методом deposit(amount). Неотрицательная сумма добавляется; отрицательная вызывает ValueError и не меняет баланс. Метод возвращает текущий баланс.",
        "Два подчёркивания вызывают преобразование имени в классе, а не обеспечивают секретность данных. Не называй приватный атрибут защитой от злонамеренного доступа.",
        "Дальше: добавь управляемое свойство объекта."
      ]
    }
  ],
  "challenges": [
    {
      "id": "account",
      "question": "Пополнение счёта",
      "description": "Определи Account с _balance = 0 и методом deposit(amount). Неотрицательная сумма добавляется; отрицательная вызывает ValueError и не меняет баланс. Метод возвращает текущий баланс.",
      "initialCode": "class Account:\n    pass\n",
      "code": "class Account:\n    def __init__(self):\n        self._balance = 0\n\n    def deposit(self, amount):\n        if amount < 0:\n            raise ValueError(\"Отрицательная сумма\")\n        self._balance += amount\n        return self._balance",
      "hint": "Отрицательную сумму отклони до изменения _balance.",
      "testCases": [
        {
          "expression": "Account().deposit(5)",
          "expectedValue": 5,
          "expectedCallOutput": ""
        },
        {
          "expression": "(lambda account: [account.deposit(0), account.deposit(3), account.deposit(2)])(Account())",
          "expectedValue": [
            0,
            3,
            5
          ],
          "expectedCallOutput": ""
        },
        {
          "setup": "def rejects_negative(account):\n    try:\n        account.deposit(-1)\n    except ValueError:\n        return account._balance == 0\n    return False",
          "expression": "rejects_negative(Account())",
          "expectedValue": true,
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
