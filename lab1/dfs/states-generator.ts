import { BucketsState } from './tree-node';
import { Bucket } from './bucket';

const getStateWithUpdatedBucketVolume = (state: BucketsState, targetBucket: Bucket, fill: boolean = true): BucketsState => {
  const buckets = Object.values(state);
  const [firstBucket, secondBucket] = buckets.map((bucket: Bucket): Bucket => {
    return bucket === targetBucket
      ? new Bucket(bucket.getMaxVolume(), fill ? bucket.getMaxVolume() : 0)
      : bucket.clone()
  })
  return { firstBucket, secondBucket }
}

export const generateOneBucketWaterChangeStates = (state: BucketsState): BucketsState[] => Object
  .values(state)
  .map((bucket: Bucket): BucketsState[] => {
    return [true, false].map((fill: boolean): BucketsState => getStateWithUpdatedBucketVolume(state, bucket, fill))
  })
  .flat();

const moveWaterFromOneBucketToAnother = (state: BucketsState, targetBucketPrototype: Bucket): BucketsState => {
  const isTargetFirstBucket = state.firstBucket === targetBucketPrototype;

  const sourceBucketPrototype = isTargetFirstBucket ? state.secondBucket : state.firstBucket;

  const sourceBucket = new Bucket(sourceBucketPrototype.getMaxVolume());
  const targetBucket = new Bucket(targetBucketPrototype.getMaxVolume());
  const sumVolume = targetBucketPrototype.getCurrentVolume() + sourceBucketPrototype.getCurrentVolume();

  if (sumVolume > targetBucket.getMaxVolume()) {
    targetBucket.setCurrentVolume(targetBucket.getMaxVolume());
    sourceBucket.setCurrentVolume(sumVolume - targetBucket.getMaxVolume())
  } else {
    targetBucket.setCurrentVolume(sumVolume);
    sourceBucket.setCurrentVolume(0);
  }

  const [firstBucket, secondBucket] = isTargetFirstBucket ? [ targetBucket, sourceBucket ] : [ sourceBucket, targetBucket ]

  return {
    firstBucket,
    secondBucket,
  }
}

export const generateBucketWaterSwapStates = (state: BucketsState): BucketsState[] => Object
  .values(state)
  .map((bucket: Bucket): BucketsState => moveWaterFromOneBucketToAnother(state, bucket))


export const generateChildrenStates = (state: BucketsState): BucketsState[] => {
  return [...generateOneBucketWaterChangeStates(state), ...generateBucketWaterSwapStates(state)]
}
