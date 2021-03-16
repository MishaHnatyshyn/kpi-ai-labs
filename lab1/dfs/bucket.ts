/*
* Class that represents bucket for water
*/
export class Bucket {
  private readonly maxVolume: number;
  private currentVolume: number;

  constructor(maxVolume: number, startVolume: number = 0) {
    this.currentVolume = startVolume;
    this.maxVolume = maxVolume;
  }

  public getCurrentVolume(): number {
    return this.currentVolume;
  }

  public setCurrentVolume(volume: number): void {
    this.currentVolume = volume;
  }

  public clone(): Bucket {
    return new Bucket(this.maxVolume, this.currentVolume);
  }

  public getMaxVolume(): number {
    return this.maxVolume;
  }
}
