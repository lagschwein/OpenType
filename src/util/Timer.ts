export default class StopWatch {
  private startTime: number = 0;
  private stopTime: number = 0;
  private running: boolean = false;

  public start(): void {
    this.startTime = Date.now();
    this.running = true;
  }

  public stop(): void {
    this.stopTime = Date.now();
    this.running = false;
  }

  public getElapsedTime(): number {
    if (this.running) {
      return Date.now() - this.startTime;
    } else {
      return this.stopTime - this.startTime;
    }
  }
}