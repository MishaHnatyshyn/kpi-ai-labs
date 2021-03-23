import {TreeNode} from './tree-node';
import {getPossibleStates, getScore, isGoal, sortByScore} from './helpers';
import {Field} from '../field';

export const rbfs = (queue: TreeNode[], targetField: Field): TreeNode => {
  // get best neighbour from neighbours queue
  const nextCurrentNode = queue.shift();

  // if current node has goal state -> stop search and return it
  if (isGoal(nextCurrentNode.field, targetField)) {
    return nextCurrentNode;
  }

  // generate possible next states
  const children = getPossibleStates(nextCurrentNode).map((field) => ({
    field: field,
    score: getScore(field, targetField),
    parent: nextCurrentNode,
    children: []
  }));

  // add possible states to current node children
  nextCurrentNode.children = children;

  // add possible states to queue
  children.forEach((child) => queue.push(child));

  // sort queue based on score
  queue.sort(sortByScore);
  return rbfs(queue, targetField);
}
