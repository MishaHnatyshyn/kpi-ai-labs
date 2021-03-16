import {INITIAL_STATE, TABU_LIST_SIZE} from './constants';
import {tabuSearch} from './tabuSearch/tabuSearch';


const start = () => {
  const targetState = tabuSearch(INITIAL_STATE, TABU_LIST_SIZE);

  console.log('\n\n', '*'.repeat(50))
  console.log('Result state:')
  console.log(targetState);
}

start();





