import { createPointerLifecycle } from '../utils/pointer-lifecycle';

describe('pointer protection lifecycle', () => {
  it('installs listeners once and cancels listeners and the timer on stop', () => {
    vi.useFakeTimers();
    const onMove = vi.fn();
    const onPointerDown = vi.fn();
    const onReposition = vi.fn();
    const onTimeout = vi.fn();
    const lifecycle = createPointerLifecycle({ onMove, onPointerDown, onReposition });
    lifecycle.start();
    lifecycle.start();
    lifecycle.setTimer(onTimeout, 100);
    document.dispatchEvent(new MouseEvent('mousemove'));
    document.dispatchEvent(new MouseEvent('pointerdown'));
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('resize'));
    expect(onMove).toHaveBeenCalledTimes(1);
    expect(onPointerDown).toHaveBeenCalledTimes(1);
    expect(onReposition).toHaveBeenCalledTimes(2);
    lifecycle.stop();
    lifecycle.stop();
    document.dispatchEvent(new MouseEvent('mousemove'));
    window.dispatchEvent(new Event('resize'));
    vi.advanceTimersByTime(100);
    expect(onMove).toHaveBeenCalledTimes(1);
    expect(onReposition).toHaveBeenCalledTimes(2);
    expect(onTimeout).not.toHaveBeenCalled();
    expect(lifecycle.hasTimer()).toBe(false);
    vi.useRealTimers();
  });
});
