import {TabuList} from './tabuList';
import {BucketsState} from '../types';
import {generateChildrenStates, getStateScore, isGoal, sortByScore} from './helpers';

export const tabuSearch = (initialState: BucketsState, tabuListMaxSize: number): BucketsState => {
  // create tabu list
  const tabuList = new TabuList(tabuListMaxSize)

  // create initial states queue
  let currentStates: BucketsState[] = [initialState];

  let targetState = null

  let i = 0;

  while (true) {
    console.log('-'.repeat(50));
    console.log('Iteration', i)
    // get the best states form possible states list
    const currentState = currentStates.shift();
    console.log(currentState);
    console.log('Score', getStateScore(currentState));
    // if current state is the goal one -> stop search
    if (isGoal(currentState)){
      targetState = currentState;
      break;
    }
    // add visited state to the tabu list
    tabuList.addToList(currentState);

    // get next possible states
    const neighbourNodes = generateChildrenStates(currentState, tabuList.list);

    // sort possible states by heuristic score
    neighbourNodes.sort(sortByScore)

    // assign next possible states to possible states list
    currentStates = neighbourNodes;
    i++;
  }

  return targetState
}

