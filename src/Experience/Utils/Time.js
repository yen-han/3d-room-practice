export default class Time {
  constructor() {
    this.start = Date.now();
    this.current = this.start;
    this.delta = 16;
    this.elapsed = 0;
    this.update();
  }
  update() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;
    window.requestAnimationFrame(() => this.update());
  }
}