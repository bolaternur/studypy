import type { PythonTest } from '../runtime/python';

export interface BossTask { id: string; title: string; level: string; description: string; initialCode: string; tests: PythonTest[]; hint: string; nextStep: string }
const decoratorCheck = (args: string) => `import contextlib as _contextlib
import io as _io
def _check_log(decorator):
    calls = []
    def original(a, b=0):
        calls.append([a, b])
        print("Inside")
        return a + b
    decorated = decorator(original)
    captured = _io.StringIO()
    with _contextlib.redirect_stdout(captured):
        result = decorated(${args})
        second_result = decorated(${args})
    return [result, second_result, captured.getvalue(), calls]
`;
export const BOSS_TASKS: BossTask[] = [
  { id: 'b1', title: 'Факториал', level: 'Средний', description: 'Напиши factorial(n), которая возвращает произведение целых чисел от 1 до n. На входе целое n ≥ 0. Для n = 0 верни 1. Можно использовать цикл или рекурсию.', initialCode: 'def factorial(n):\n    pass', tests: [0, 1, 5, 6].map(n => ({ description: `factorial(${n})`, expression: `factorial(${n})`, expectedValue: ({0: 1, 1: 1, 5: 120, 6: 720} as Record<number, number>)[n] })), hint: 'Начни с результата 1. При цикле умножай его на числа от 1 до n включительно. При рекурсии заранее определи случай, в котором вызовы прекращаются.', nextStep: 'Проверь factorial(3) вручную. Если использовал рекурсию, найди вызов, на котором она останавливается.' },
  { id: 'b2', title: 'Декоратор вызова', level: 'Продвинутый', description: 'Напиши log_call(func). Он должен вернуть обёртку, которая перед каждым вызовом func печатает одну строку Calling function, передаёт позиционные и именованные аргументы и возвращает результат func. Исходная функция должна вызываться ровно один раз.', initialCode: 'def log_call(func):\n    pass', tests: [
    { description: 'Позиционные аргументы, порядок вывода и повторный вызов', setup: decoratorCheck('2, 3'), expression: '_check_log(log_call)', expectedValue: [5, 5, 'Calling function\nInside\nCalling function\nInside\n', [[2, 3], [2, 3]]] },
    { description: 'Именованный аргумент и отрицательное значение', setup: decoratorCheck('-3, b=1'), expression: '_check_log(log_call)', expectedValue: [-2, -2, 'Calling function\nInside\nCalling function\nInside\n', [[-3, 1], [-3, 1]]] },
    { description: 'Аргумент по умолчанию', setup: decoratorCheck('0'), expression: '_check_log(log_call)', expectedValue: [0, 0, 'Calling function\nInside\nCalling function\nInside\n', [[0, 0], [0, 0]]] },
  ], hint: 'Внутри log_call определи другую функцию с *args и **kwargs. Эта функция печатает сообщение, затем вызывает func с полученными аргументами. Сам log_call возвращает обёртку, а не результат вызова.', nextStep: 'Примени @log_call к своей функции и вызови её два раза. Убедись, что перед каждым вызовом появляется ровно одно сообщение.' },
];
