import { BucketsState, TreeNode } from './tree-node';
import { TARGET_VOLUME } from '../constants';
import { generateChildrenStates } from './states-generator';
import { Bucket } from './bucket';

/*
* Check if current amount of water in one of our bucket
* satisfies our task condition (e.g. equals 3)
*/
export const isTaskComplete = (state: BucketsState): boolean => {
  return Object
    .values(state)
    .some((bucket: Bucket): boolean => bucket.getCurrentVolume() === TARGET_VOLUME)
}

/*
* Check if we have reached max depth while performing depth first search
*/
export const isMaxDepth = (depth: number, maxDepth: number): boolean => {
  return depth === maxDepth;
}

/*
* Check if child node has the same state as parent to avoid useless states
*/
export const isStateSimilar = (firstState: BucketsState, secondState: BucketsState): boolean => {
  const secondStateBuckets = Object.values(secondState);
  return Object
    .values(firstState)
    .every((bucket: Bucket, index: number): boolean => {
      return bucket.getCurrentVolume() === secondStateBuckets[index].getCurrentVolume()
    })
}

/*
* Generate children with proper states for provided node and it's state
*/
export const generateChildren = (node: TreeNode): TreeNode[] => {
  return generateChildrenStates(node.getState())
    .filter((state: BucketsState): boolean => !isStateSimilar(state, node.getState()))
    .map((state: BucketsState): TreeNode => new TreeNode(node, state));
}

