export type Direction = 'right' | 'down' | 'left' | 'up';
export interface SnakeState {
  body: number[][];
  gems: number[][];
  moves: number;
  failed: boolean;
  message: string;
}
export const newSnake = (): SnakeState => ({ body: [[0, 0]], gems: [[3, 0], [3, 3], [0, 3]], moves: 0, failed: false, message: '' });

/** A command advances only the requested steps. No wall-clock movement. */
export function advanceSnake(state: SnakeState, direction: Direction, count: number): SnakeState {
  if (state.failed || state.gems.length === 0 || !Number.isInteger(count) || count < 1 || count > 5) return state;
  const deltas: Record<Direction, number[]> = { right: [1, 0], down: [0, 1], left: [-1, 0], up: [0, -1] };
  const delta = deltas[direction];
  if (!delta) return state;
  let next = { ...state, body: state.body.map(p => [...p]), gems: state.gems.map(p => [...p]) };
  for (let index = 0; index < count; index++) {
    const point = [next.body[0][0] + delta[0], next.body[0][1] + delta[1]];
    if (point.some(coordinate => coordinate < 0 || coordinate >= 6)) return { ...next, failed: true, message: 'Команда вывела змейку за границу поля.' };
    const eating = next.gems.some(p => p[0] === point[0] && p[1] === point[1]);
    // On a normal move the tail leaves its cell at the same step.
    const occupied = eating ? next.body : next.body.slice(0, -1);
    if (occupied.some(p => p[0] === point[0] && p[1] === point[1])) return { ...next, failed: true, message: 'Голова столкнулась с телом змейки.' };
    next = {
      ...next,
      body: [point, ...(eating ? next.body : next.body.slice(0, -1))],
      gems: next.gems.filter(p => p[0] !== point[0] || p[1] !== point[1]),
      moves: next.moves + 1,
    };
    if (next.gems.length === 0) return next;
  }
  return next;
}
