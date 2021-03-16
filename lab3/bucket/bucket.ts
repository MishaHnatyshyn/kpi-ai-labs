/*
* Class that represents bucket for kwas
*/
export class Bucket {
  public readonly maxVolume: number;
  public currentVolume: number;

  constructor(maxVolume: number, startVolume: number = 0) {
    this.currentVolume = startVolume;
    this.maxVolume = maxVolume;
  }

  public clone(): Bucket {
    return new Bucket(this.maxVolume, this.currentVolume);
  }
}
