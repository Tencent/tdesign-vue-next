interface TweenSettings {
  from: Record<string, number>;
  to: Record<string, number>;
  duration?: number;
  delay?: number;
  onStart?: (keys: Record<string, number>) => void;
  onUpdate?: (keys: Record<string, number>) => void;
  onFinish?: (keys: Record<string, number>) => void;
}
const quartOut = (t: number) => 1 - Math.abs((t - 1) ** 4);

export default class Tween {
  private from: Record<string, number>;

  private to: Record<string, number>;

  private duration: number;

  private delay: number;

  private onStart?: (keys: Record<string, number>) => void;

  private onUpdate: (keys: Record<string, number>) => void;

  private onFinish?: (keys: Record<string, number>) => void;

  private startTime: number;

  private started: boolean;

  private finished: boolean;

  private timer: number | null;

  private keys: Record<string, number>;

  constructor({ from, to, duration = 500, delay = 0, onStart, onUpdate = () => {}, onFinish }: TweenSettings) {
    this.from = from;
    this.to = to;
    this.duration = duration;
    this.delay = delay;
    this.onStart = onStart;
    this.onUpdate = onUpdate;
    this.onFinish = onFinish;
    this.startTime = Date.now() + delay;
    this.started = false;
    this.finished = false;
    this.timer = null;
    this.keys = {};
    Object.entries(from).forEach(([key, value]) => {
      if (this.to[key] === undefined) {
        this.to[key] = value;
      }
    });

    Object.entries(to).forEach(([key, value]) => {
      if (this.from[key] === undefined) {
        this.from[key] = value;
      }
    });
  }

  private time = 0;

  private elapsed = 0;

  private update() {
    this.time = Date.now();
    if (this.time < this.startTime || this.finished) return;

    if (this.elapsed === this.duration) {
      this.finished = true;
      this.onFinish?.(this.keys);
      return;
    }
    this.elapsed = Math.min(this.time - this.startTime, this.duration);
    const progress = quartOut(this.elapsed / this.duration);

    Object.keys(this.to).forEach((key) => {
      const delta = this.to[key] - this.from[key];
      this.keys[key] = this.from[key] + delta * progress;
    });

    if (!this.started) {
      this.onStart?.(this.keys);
      this.started = true;
    }

    this.onUpdate(this.keys);
  }

  public start() {
    this.startTime = Date.now() + this.delay;
    const tick = () => {
      this.update();
      this.timer = requestAnimationFrame(tick);
      if (this.finished) {
        cancelAnimationFrame(this.timer);
        this.timer = null;
      }
    };
    tick();
  }

  public stop() {
    cancelAnimationFrame(this.timer);
    this.timer = null;
  }
}
