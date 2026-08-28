import { afterEach, describe, expect, it, vi } from 'vitest';
import { fadeIn, fadeOut } from '@tdesign/components/notification/utils';

const animationOptions = { duration: 200, easing: 'linear' };

const createElement = (animate?: (keyframes: Keyframe[], options: KeyframeAnimationOptions) => Animation) => {
  const element = document.createElement('div');
  Object.defineProperty(element, 'offsetWidth', { configurable: true, value: 120 });
  Object.defineProperty(element, 'offsetHeight', { configurable: true, value: 48 });
  Object.defineProperty(element, 'animate', { configurable: true, value: animate });
  return element;
};

describe('NotificationAnimation', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fadeIn', () => {
    it('does nothing without an element', () => {
      expect(() => fadeIn(undefined as unknown as HTMLElement, 'top-right')).not.toThrow();
    });

    it('does nothing for an unsupported placement', () => {
      const animate = vi.fn();
      const element = createElement(animate);

      fadeIn(element, 'center');
      expect(animate).not.toHaveBeenCalled();
    });

    it.each([
      [
        'top-right',
        [
          { opacity: 0, transform: 'translateX(120px)' },
          { opacity: 1, transform: 'translateX(0px)' },
        ],
      ],
      [
        'bottom-right',
        [
          { opacity: 0, transform: 'translateX(120px)', marginBottom: '-48px' },
          { opacity: 1, transform: 'translateX(0px)' },
        ],
      ],
      [
        'top-left',
        [
          { opacity: 0, transform: 'translateX(-120px)' },
          { opacity: 1, transform: 'translateX(0px)' },
        ],
      ],
      [
        'bottom-left',
        [
          { opacity: 0, transform: 'translateX(-120px)', marginBottom: '-48px' },
          { opacity: 1, transform: 'translateX(0px)' },
        ],
      ],
    ])('animates the %s placement', (placement, keyframes) => {
      const animate = vi.fn();
      const element = createElement(animate);

      fadeIn(element, placement as string);
      expect(animate).toHaveBeenCalledWith(keyframes, animationOptions);
    });

    it('tolerates browsers without Element.animate()', () => {
      const element = createElement();

      expect(() => fadeIn(element, 'top-right')).not.toThrow();
    });
  });

  describe('fadeOut', () => {
    it('does nothing without an element', () => {
      const onFinish = vi.fn();

      fadeOut(undefined as unknown as HTMLElement, 'top-right', onFinish);
      expect(onFinish).not.toHaveBeenCalled();
    });

    it('finishes immediately for an unsupported placement', () => {
      const onFinish = vi.fn();
      const element = createElement();

      fadeOut(element, 'center', onFinish);
      expect(onFinish).toHaveBeenCalledTimes(1);
    });

    it.each([
      [
        'top-right',
        [
          { opacity: 1, transform: 'translateX(0px)' },
          { opacity: 0, transform: 'translateX(120px)', marginBottom: '-48px' },
        ],
      ],
      [
        'bottom-right',
        [
          { opacity: 1, transform: 'translateX(0px)' },
          { opacity: 0, transform: 'translateX(120px)' },
        ],
      ],
      [
        'top-left',
        [
          { opacity: 1, transform: 'translateX(0px)' },
          { opacity: 0, transform: 'translateX(-120px)', marginBottom: '-48px' },
        ],
      ],
      [
        'bottom-left',
        [
          { opacity: 1, transform: 'translateX(0px)' },
          { opacity: 0, transform: 'translateX(-120px)' },
        ],
      ],
    ])('animates the %s placement and finishes after the animation', (placement, keyframes) => {
      const animation = { onfinish: null } as unknown as Animation;
      const animate = vi.fn(() => animation);
      const onFinish = vi.fn();
      const element = createElement(animate);

      fadeOut(element, placement as string, onFinish);
      expect(animate).toHaveBeenCalledWith(keyframes, animationOptions);
      expect(onFinish).not.toHaveBeenCalled();
      animation.onfinish?.(new Event('finish') as AnimationPlaybackEvent);
      expect(onFinish).toHaveBeenCalledTimes(1);
    });

    it('hides the element and finishes when Element.animate() is unavailable', () => {
      const onFinish = vi.fn();
      const element = createElement();

      fadeOut(element, 'top-right', onFinish);
      expect(element.style.display).toBe('none');
      expect(onFinish).toHaveBeenCalledTimes(1);
    });
  });
});
