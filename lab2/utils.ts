import {TreeNode} from './rbfs/tree-node';
import {Field} from './field';

// returns target states path from beginning to the goal one
export const getFieldsChain = (node: TreeNode): Field[] => {
  let currentNode = node;
  const result = []
  while (currentNode) {
    result.unshift(currentNode?.field);
    currentNode = currentNode?.parent;
  }
  return result;
}

// print field
export const printMatrix = (field: Field): void => {
  field.forEach(row => console.log(row));
  console.log('\n')
}