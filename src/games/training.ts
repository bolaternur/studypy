import type { PythonTest } from '../runtime/python';

interface TrainingTask { id: string; description: string; initialCode: string; testCases: PythonTest[] }
const check = (description: string, assertion: string): PythonTest => ({ description, expression: assertion.replace(/^assert /, ''), expectedValue: true });
export const TASKS_BY_TYPE: Record<'speed' | 'logic' | 'boss', TrainingTask[]> = {
  speed: [
    { id: 'sum', description: 'Напиши sum_numbers(a, b), которая возвращает сумму двух чисел. Результат нужно вернуть: одного print недостаточно.', initialCode: 'def sum_numbers(a, b):\n    pass', testCases: [check('Два положительных числа', 'assert sum_numbers(2, 3) == 5'), check('Отрицательное число', 'assert sum_numbers(-1, 4) == 3'), check('Нули', 'assert sum_numbers(0, 0) == 0'), check('Дробные числа', 'assert sum_numbers(1.5, 2.5) == 4')] },
    { id: 'square', description: 'Напиши square(n), которая возвращает квадрат числа n.', initialCode: 'def square(n):\n    pass', testCases: [check('Положительное число', 'assert square(5) == 25'), check('Отрицательное число', 'assert square(-3) == 9'), check('Ноль', 'assert square(0) == 0')] },
    { id: 'greet', description: "Напиши greet(name), которая возвращает строку 'Hello ' и переданное имя. Для пустого имени верни 'Hello ' с пробелом в конце.", initialCode: 'def greet(name):\n    pass', testCases: [check('Имя Ada', "assert greet('Ada') == 'Hello Ada'"), check('Имя на кириллице', "assert greet('Аня') == 'Hello Аня'"), check('Пустое имя', "assert greet('') == 'Hello '")] },
  ],
  logic: [
    { id: 'even', description: 'Напиши is_even(n), которая возвращает True для чётного целого числа и False для нечётного.', initialCode: 'def is_even(n):\n    pass', testCases: [check('Чётное число', 'assert is_even(8) is True'), check('Нечётное число', 'assert is_even(7) is False'), check('Ноль', 'assert is_even(0) is True'), check('Отрицательное число', 'assert is_even(-3) is False')] },
    { id: 'positive', description: 'Напиши is_positive(n), которая возвращает True только для числа больше нуля.', initialCode: 'def is_positive(n):\n    pass', testCases: [check('Положительное число', 'assert is_positive(1) is True'), check('Ноль', 'assert is_positive(0) is False'), check('Отрицательное число', 'assert is_positive(-1) is False')] },
    { id: 'max', description: 'Напиши max_value(a, b), которая возвращает большее из двух чисел. Если числа равны, верни это число.', initialCode: 'def max_value(a, b):\n    pass', testCases: [check('Первое меньше', 'assert max_value(2, 9) == 9'), check('Первое больше', 'assert max_value(9, 2) == 9'), check('Отрицательные числа', 'assert max_value(-1, -5) == -1'), check('Равные числа', 'assert max_value(4, 4) == 4')] },
  ],
  boss: [
    { id: 'reverse', description: 'Напиши reverse_text(value), которая возвращает строку в обратном порядке.', initialCode: 'def reverse_text(value):\n    pass', testCases: [check('Несколько символов', "assert reverse_text('python') == 'nohtyp'"), check('Один символ', "assert reverse_text('a') == 'a'"), check('Пустая строка', "assert reverse_text('') == ''"), check('Кириллица', "assert reverse_text('кот') == 'ток'")] },
    { id: 'length', description: 'Напиши text_length(value), которая возвращает количество символов в строке, включая пробелы.', initialCode: 'def text_length(value):\n    pass', testCases: [check('Слово', "assert text_length('quest') == 5"), check('Пустая строка', "assert text_length('') == 0"), check('Строка с пробелом', "assert text_length('а б') == 3")] },
    { id: 'upper', description: 'Напиши to_upper(value), которая возвращает строку в верхнем регистре.', initialCode: 'def to_upper(value):\n    pass', testCases: [check('Смешанный регистр', "assert to_upper('StudyPy') == 'STUDYPY'"), check('Кириллица', "assert to_upper('Привет') == 'ПРИВЕТ'"), check('Пустая строка', "assert to_upper('') == ''"), check('Цифры', "assert to_upper('ab12') == 'AB12'")] },
  ],
};
