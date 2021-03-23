import {BucketsState} from './types';
import {Bucket} from './bucket/bucket';

// initial problem state
export const INITIAL_STATE: BucketsState = [
  new Bucket(5, 0),
  new Bucket(7, 0),
  new Bucket(12, 12),
];

export const TARGET_VOLUME = 6;
export const TABU_LIST_SIZE = 10;