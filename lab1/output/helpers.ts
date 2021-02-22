import { BucketsState, TreeNode } from '../dfs/tree-node';

export const getTargetStatesChain = (node: TreeNode): BucketsState[] => {
  const winningStatesPath = [];
  let currentNode = node;
  while (currentNode.getParent()) {
    winningStatesPath.unshift(currentNode.getState());
    currentNode = currentNode.getParent();
  }

  return winningStatesPath;
}

export const printTitle = ({ firstBucket, secondBucket }: BucketsState): void => {
  console.log(`FirstBucket(${firstBucket.getMaxVolume()})\tSecondBucket(${secondBucket.getMaxVolume()})`)
}

export const printTargetNodesChain = (states: BucketsState[]): void => {
  states.forEach((state) => {
    console.log(`\t${state.firstBucket.getCurrentVolume()}\t\t${state.secondBucket.getCurrentVolume()}`);
  })
}