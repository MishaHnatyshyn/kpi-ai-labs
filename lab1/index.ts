import { BucketsState, TreeNode } from './dfs/tree-node';
import { Bucket } from './dfs/bucket';
import { dfs } from './dfs';
import { FIRST_BUCKET_MAX_VOLUME, MAX_DEPTH, SECOND_BUCKET_MAX_VOLUME } from './constants';
import { printFailureResult, printSuccessResult } from './output';

/*
* Main function
*/
const start = (): void => {
  // Create two empty buckets with proper capacity
  const initialState: BucketsState = {
    firstBucket: new Bucket(FIRST_BUCKET_MAX_VOLUME),
    secondBucket: new Bucket(SECOND_BUCKET_MAX_VOLUME),
  }

  // Create root tree node
  const root = new TreeNode(null, initialState);

  // Perform depth first search with limited depth
  const targetNode = dfs(root, 0, MAX_DEPTH);

  // Print result of search
  if (targetNode) printSuccessResult(targetNode);
  else printFailureResult(MAX_DEPTH)
}

start();