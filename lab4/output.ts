const input = '2-5, 3-2, 6-3, 5-6, 4-5, 1-4, 2-1, 5-2, 6-5, 3-6, 2-3, 1-2, 4-1, 5-4, 2-5, 3-2, 6-3, 5-6';
const pairs = input.split(', ').map(row => row.split('-').map(x => Number(x) - 1));
const initialState = [' table ', ' chair ', 'wardrobe', ' chair ', '      ', 'armchair'];


const printState = (state) => {
  console.log('|',state[0],'|', state[1],'|', state[2],'|');
  console.log('---------------------------------')
  console.log('|',state[3], '|',state[4], '|',state[5],'|');
  console.log('\n\n')
}

const getNextState = (state, x, y) => {
  const a = state[x];
  const b = state[y];
  const newState = [...state];
  newState[x] = b;
  newState[y] = a;
  return newState;
}

let currentState = initialState;

pairs.forEach(([x, y]) => {
  printState(currentState);
  currentState = getNextState(currentState, x, y);
})

printState(currentState);