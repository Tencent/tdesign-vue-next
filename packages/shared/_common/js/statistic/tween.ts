/**
 * Inspired by https://github.com/PengJiyuan/b-tween
 * requestAnimationFrame https://caniuse.com/requestanimationframe
 * TDesign vue 2 need to ensure compatibility with users who are using IE and Vue2,
 * it is necessary to use setInterval instead of requestAnimationFrame when the browser version is less than 9
 */
import { getIEVersion } from '../utils/helper';

export interface TweenSettings {
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

  private onStart?: (keys: Record<string, number>) => void;

  private onUpdate: (keys: Record<string, number>) => void;

  private onFinish?: (keys: Record<string, number>) => void;

  private startTime: number;

  private started: boolean;

  private finished: boolean;

  private timer: number | NodeJS.Timer | null;

  private keys: Record<string, number>;

  constructor({
    from,
    to,
    duration = 200,
    onStart,
    onUpdate = () => {},
    onFinish,
  }: TweenSettings) {
    this.from = from;
    this.to = to;
    this.duration = duration;
    this.onStart = onStart;
    this.onUpdate = onUpdate;
    this.onFinish = onFinish;
    this.startTime = Date.now();
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

    if (this.elapsed >= this.duration) {
      this.finished = true;
      this.onFinish?.(this.keys);
      return;
    }
    const elapsed = Math.min(this.time - this.startTime, this.duration);
    this.elapsed = elapsed;
    const progress = quartOut(elapsed / this.duration);

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

  private polyfillStart() {
    const elapsed = Date.now() - this.startTime;
    const interval = quartOut(elapsed / this.duration);

    this.timer = setInterval(() => {
      this.update();
      if (this.finished) {
        clearInterval(this.timer as number);
      }
    }, interval);
  }

  private normalStart() {
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

  public start() {
    this.startTime = Date.now();
    // IE < 10
    if (getIEVersion() < 10) this.polyfillStart();
    else this.normalStart();
  }

  public stop() {
    // IE < 10
    if (getIEVersion() < 10) clearInterval(this.timer as number);
    else cancelAnimationFrame(this.timer as number);
    this.timer = null;
  }
}
