import { BucketsState, TreeNode } from '../dfs/tree-node';

/*
* Return states from all the nodes from root one to target one
*/
export const getTargetStatesChain = (node: TreeNode): BucketsState[] => {
  const winningStatesPath = [];
  let currentNode = node;
  while (currentNode.getParent()) {
    winningStatesPath.unshift(currentNode.getState());
    currentNode = currentNode.getParent();
  }

  return winningStatesPath;
}

/*
* Print bucket names an their capacity as title
*/
export const printTitle = ({ firstBucket, secondBucket }: BucketsState): void => {
  console.log(`FirstBucket(${firstBucket.getMaxVolume()})\tSecondBucket(${secondBucket.getMaxVolume()})`)
}

/*
* Print buckets water amount for each node state from root one to target one
*/
export const printTargetNodesChain = (states: BucketsState[]): void => {
  states.forEach((state) => {
    console.log(`\t${state.firstBucket.getCurrentVolume()}\t\t${state.secondBucket.getCurrentVolume()}`);
  })
}