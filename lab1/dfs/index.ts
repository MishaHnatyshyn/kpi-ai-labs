import { TreeNode } from './tree-node';
import { generateChildren, isMaxDepth, isTaskComplete } from './helpers';

export const dfs = (node: TreeNode, currentDepth: number, maxDepth: number): TreeNode | null => {
  if (isTaskComplete(node.getState())) {
    return node;
  }

  if (isMaxDepth(currentDepth, maxDepth)) {
    return null;
  }

  const children = generateChildren(node);
  children.forEach((child: TreeNode): void => node.addChild(child))

  for (const child of children) {
    const targetNode = dfs(child, currentDepth + 1, maxDepth);
    if (targetNode) return targetNode;
  }

  return null;
}