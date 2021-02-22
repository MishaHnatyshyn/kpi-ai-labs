import { TreeNode } from './tree-node';
import { generateChildren, isMaxDepth, isTaskComplete } from './helpers';

/*
* Depth first search with depth limitation implementation
*/
export const dfs = (node: TreeNode, currentDepth: number, maxDepth: number): TreeNode | null => {
  // return current node if it satisfies our search condition
  if (isTaskComplete(node.getState())) {
    return node;
  }

  // stop moving deeper if we have reached max depth
  if (isMaxDepth(currentDepth, maxDepth)) {
    return null;
  }

  // generate children for current node
  const children = generateChildren(node);
  children.forEach((child: TreeNode): void => node.addChild(child))

  // recursively run dfs for each children
  for (const child of children) {
    // recursively run dfs for each children
    const targetNode = dfs(child, currentDepth + 1, maxDepth);

    // stop search and return target node if one was found
    if (targetNode) return targetNode;
  }

  return null;
}