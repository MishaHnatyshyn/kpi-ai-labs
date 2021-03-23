import {BucketsState} from '../types';

// class that represents tabu list
export class TabuList {
  public list: BucketsState[] = []
  constructor(private MAX_SIZE: number) {}

  addToList(state: BucketsState): void {
    // adds new state to tabu list
    this.list.push(state);

    // removes the oldest element from tabu list if max list size has been reached
    if (this.list.length >= this.MAX_SIZE) {
      this.list.shift();
    }
  }
}