import {Field} from '../field';
import {TreeNode} from './tree-node';
import {getScore} from './helpers';
import {rbfs} from './rbfs';

export const getSolutionUsingRbfs = (startField: Field, targetField: Field): TreeNode => {
  // root tree node with initial state
  let initial: TreeNode = {
    field: startField,
    score: getScore(startField, targetField),
    parent: null,
    children: []
  };

  // create unchecked nodes queue
  let uncheckedNodes: TreeNode[] = [initial];


  return rbfs(uncheckedNodes, targetField);
}