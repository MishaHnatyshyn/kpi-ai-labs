import { BucketsState } from './tree-node';
import { Bucket } from './bucket';

/*
* Return two buckets after filling or emptying one depends on {fill} argument value
*/
const getStateWithUpdatedBucketVolume = (
  state: BucketsState,
  targetBucket: Bucket,
  fill: boolean = true
): BucketsState => {
  const buckets = Object.values(state);
  const [firstBucket, secondBucket] = buckets.map((bucket: Bucket): Bucket => {
    return bucket === targetBucket
      ? new Bucket(bucket.getMaxVolume(), fill ? bucket.getMaxVolume() : 0)
      : bucket.clone()
  })
  return { firstBucket, secondBucket }
}

/*
* Generate states where we fill one bucket from the river or empty it
*/
export const generateOneBucketWaterChangeStates = (state: BucketsState): BucketsState[] => Object
  .values(state)
  .map((bucket: Bucket): BucketsState[] => {
    return [true, false].map((fill: boolean): BucketsState => {
      return getStateWithUpdatedBucketVolume(state, bucket, fill)
    })
  })
  .flat();

/*
* Return two buckets after moving water from one to another
*/
const moveWaterFromOneBucketToAnother = (
  state: BucketsState,
  targetBucketPrototype: Bucket
): BucketsState => {
  const isTargetFirstBucket = state.firstBucket === targetBucketPrototype;

  const sourceBucketPrototype = isTargetFirstBucket ? state.secondBucket : state.firstBucket;

  const sourceBucket = new Bucket(sourceBucketPrototype.getMaxVolume());
  const targetBucket = new Bucket(targetBucketPrototype.getMaxVolume());
  const sumVolume = targetBucketPrototype.getCurrentVolume() + sourceBucketPrototype.getCurrentVolume();

  // Check if we can move all the water from source bucket to another one
  if (sumVolume > targetBucket.getMaxVolume()) {
    // If we can't - move to target bucket all the possible water
    targetBucket.setCurrentVolume(targetBucket.getMaxVolume());
    // Leave in the source bucket the rest of water
    sourceBucket.setCurrentVolume(sumVolume - targetBucket.getMaxVolume())
  } else {
    // If we can - move all the water from source bucket to target one
    targetBucket.setCurrentVolume(sumVolume);
    // Empty source bucket
    sourceBucket.setCurrentVolume(0);
  }

  const [firstBucket, secondBucket] = isTargetFirstBucket
    ? [targetBucket, sourceBucket]
    : [sourceBucket, targetBucket]

  return {
    firstBucket,
    secondBucket,
  }
}

/*
* Generate states where we move water from one first bucket to the second one
* and vice versa
*/
export const generateBucketWaterSwapStates = (state: BucketsState): BucketsState[] => Object
  .values(state)
  .map((bucket: Bucket): BucketsState => moveWaterFromOneBucketToAnother(state, bucket))


export const generateChildrenStates = (state: BucketsState): BucketsState[] => {
  return [...generateOneBucketWaterChangeStates(state), ...generateBucketWaterSwapStates(state)]
}
