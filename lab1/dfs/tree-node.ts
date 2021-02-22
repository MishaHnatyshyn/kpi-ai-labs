import { Bucket } from './bucket';

/*
* Interface that represents amount of water in our buckets
*/
export interface BucketsState {
  firstBucket: Bucket;
  secondBucket: Bucket;
}

/*
* Class that represents node of tree
*/
export class TreeNode {
  private children: TreeNode[];
  private readonly parent: TreeNode;
  private readonly state: BucketsState;

  constructor(parent: TreeNode, state: BucketsState) {
    this.parent = parent;
    this.children = [];
    this.state = state;
  }

  public addChild(node: TreeNode): void {
    this.children = [...this.children, node];
  }

  public getParent(): TreeNode {
    return this.parent;
  }

  public getState(): BucketsState {
    return this.state;
  }
}