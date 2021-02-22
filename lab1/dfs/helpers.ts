import { BucketsState, TreeNode } from './tree-node';
import { TARGET_VOLUME } from '../constants';
import { generateChildrenStates } from './states-generator';
import { Bucket } from './bucket';

export const isTaskComplete = (state: BucketsState): boolean => {
  return Object
    .values(state)
    .some((bucket: Bucket): boolean => bucket.getCurrentVolume() === TARGET_VOLUME)
}

export const isMaxDepth = (depth: number, maxDepth: number): boolean => {
  return depth === maxDepth;
}

export const isStateSimilar = (firstState: BucketsState, secondState: BucketsState): boolean => {
  const secondStateBuckets = Object.values(secondState);
  return Object
    .values(firstState)
    .every((bucket: Bucket, index: number): boolean => bucket.getCurrentVolume() === secondStateBuckets[index].getCurrentVolume())
}

export const generateChildren = (node: TreeNode): TreeNode[] => {
  return generateChildrenStates(node.getState())
    .filter((state: BucketsState): boolean => !isStateSimilar(state, node.getState()))
    .map((state: BucketsState): TreeNode => new TreeNode(node, state));
}

