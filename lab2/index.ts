import {Field} from './field';
import {getSolutionUsingRbfs} from './rbfs';
import {getFieldsChain, printMatrix} from './utils';

// initial field state
const startField: Field = [
  [2, 8, 3],
  [1, 6, 4],
  [7, null, 5],
]

// target field state
const targetField: Field = [
  [1, 2, 3],
  [8, null, 4],
  [7, 6, 5],
]

const start = () => {
  const result = getSolutionUsingRbfs(startField, targetField);

  getFieldsChain(result).map(printMatrix);
}

start();


