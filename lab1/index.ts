import { BucketsState, TreeNode } from './dfs/tree-node';
import { Bucket } from './dfs/bucket';
import { dfs } from './dfs';
import { FIRST_BUCKET_MAX_VOLUME, MAX_DEPTH, SECOND_BUCKET_MAX_VOLUME } from './constants';
import { printFailureResult, printSuccessResult } from './output';

const start = (): void => {
  const initialState: BucketsState = {
    firstBucket: new Bucket(FIRST_BUCKET_MAX_VOLUME),
    secondBucket: new Bucket(SECOND_BUCKET_MAX_VOLUME),
  }

  const root = new TreeNode(null, initialState);

  const targetNode = dfs(root, 0, MAX_DEPTH);

  if (targetNode) printSuccessResult(targetNode);
  else printFailureResult(MAX_DEPTH)
}

start();