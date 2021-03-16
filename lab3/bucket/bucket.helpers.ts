import {Bucket} from './bucket';

// returns buckets that didn't took part in kwas transfering
export const getBucketsRest = (bucketList: Bucket[], usedBuckets: Bucket[]): Bucket[] => {
  return bucketList.filter((bucket: Bucket) => !usedBuckets.includes(bucket));
}

// calculates how much kwas will be transfered from one bucket to another one
export const getTransferredKwas = (firstBucket: Bucket, secondBucket: Bucket): number => {
  const firstBucketVolume = firstBucket.currentVolume;
  const secondBucketVolume = secondBucket.currentVolume;
  const secondBucketMaxVolume = secondBucket.maxVolume;

  return firstBucketVolume + secondBucketVolume > secondBucketMaxVolume
    ? secondBucketMaxVolume - secondBucketVolume
    : firstBucketVolume;
}

// returns possible pairs between kwas buckets
export const getCombinations = (bucketList: Bucket[]): Bucket[][] => {
  const pairedBucketsList = [];

  bucketList.forEach((bucket: Bucket) => {
    bucketList.forEach((tempBucket: Bucket) => {
      if (bucket !== tempBucket) {
        pairedBucketsList.push([bucket, tempBucket])
      }
    })
  });

  return pairedBucketsList;
}

// returns all the possible bucket states based on the current on
export const generatePossibleBucketsStates = (bucketList: Bucket[]): Bucket[][] => {
  const combinations = getCombinations(bucketList);
  return combinations.map((liquidTransferringCombination: Bucket[]) => {
    const transferredKwas = getTransferredKwas(liquidTransferringCombination[0], liquidTransferringCombination[1]);

    const firstBucket = liquidTransferringCombination[0].clone();
    firstBucket.currentVolume = firstBucket.currentVolume - transferredKwas;

    const secondBucket = liquidTransferringCombination[1].clone();
    secondBucket.currentVolume = secondBucket.currentVolume + transferredKwas;

    const notUsedBuckets = getBucketsRest(bucketList, liquidTransferringCombination).map((bucket: Bucket) => bucket.clone());
    return [firstBucket, secondBucket, ...notUsedBuckets]
      .sort((a, b) => a.maxVolume - b.maxVolume);
  })
}
