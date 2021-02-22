import { TreeNode } from '../dfs/tree-node';
import { getTargetStatesChain, printTargetNodesChain, printTitle } from './helpers';

/*
* Print result
*/
export const printSuccessResult = (node: TreeNode): void => {
  const targetStatesChain = getTargetStatesChain(node);

  printTitle(node.getState());

  printTargetNodesChain(targetStatesChain);
}

/*
* Print error message in case solution was not found
*/
export const printFailureResult = (maxDepth: number): void => {
  console.log('Failed to find solution with max depth:', maxDepth)
  console.log('Try to increase max depth value!')
}