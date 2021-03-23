import {BucketsState} from '../types';
import {TARGET_VOLUME} from '../constants';
import {generatePossibleBucketsStates} from '../bucket/bucket.helpers';

/*
* calculates heuristic for provided state
*
* Heuristic:
* absolute difference between target kwas amount (6) and kwas amount in 7- and 12-liter buckets
* plus kwas amount in the smallest bucket which should be 0 in the target state
*
*/
export const getStateScore = (state: BucketsState): number => {
  return state
    .map((bucket) => bucket.maxVolume >= TARGET_VOLUME ? Math.abs(bucket.currentVolume - 6) : bucket.currentVolume)
    .reduce((sum, curr) => sum + curr, 0)
}

// checks if two states are the same
export const isSameState = (firstState: BucketsState, secondState: BucketsState): boolean => {
  for (let i = 0; i < firstState.length; i++) {
    if (firstState[i].currentVolume !== secondState[i].currentVolume) {
      return false
    }
  }

  return true;
}

// check if tabu list contains provided state
export const isInTabuList = (state: BucketsState, list: BucketsState[]): boolean => {
  for (let i = 0; i < list.length; i++) {
    if (isSameState(state, list[i])) {
      return true
    }
  }

  return false;
}

// generates all the possible next states
export const generateChildrenStates = (currentState: BucketsState, tabuList: BucketsState[]): BucketsState[] => {
  return generatePossibleBucketsStates(currentState)
    .filter(state => !isInTabuList(state, tabuList))
}

// check if provided state equals the goal one
export const isGoal = (state: BucketsState): boolean => {
  return state.filter(bucket => bucket.currentVolume === 6).length === 2
}

// sort states based on heuristic score
export const sortByScore = (stateA, stateB): number => getStateScore(stateA) - getStateScore(stateB)