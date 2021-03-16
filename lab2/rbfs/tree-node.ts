import {Field} from '../field';

// interface that represents tree node object
export interface TreeNode {
  field: Field,
  score: number,
  parent: TreeNode,
  children: TreeNode[]
}
