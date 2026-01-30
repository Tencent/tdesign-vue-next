import {
  defaultWindow,
  tryOnScopeDispose,
  unrefElement,
  useMutationObserver,
} from '@tdesign/components/watermark/hooks';
import { EffectScope } from 'vue';

describe('Watermark Hooks', () => {
  describe('defaultWindow', () => {
    it('should be defined', () => {
      expect(defaultWindow).toBeDefined();
    });
  });

  describe('unrefElement', () => {
    it('should return undefined when unref undefined or null', () => {
      expect(unrefElement(undefined)).toBeUndefined();
      expect(unrefElement(null)).toBeNull();
    });

    it('should return element when unref HTMLElement or SVGElement', () => {
      const div = document.createElement('div');
      expect(unrefElement(div)).toBe(div);
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      expect(unrefElement(svg)).toBe(svg);
    });

    it('should return element when unref VueInstance', () => {
      const mockVueInstance = {
        $el: document.createElement('div'),
      } as any;
      expect(unrefElement(mockVueInstance)).toBe(mockVueInstance.$el);
    });
  });

  describe('tryOnScopeDispose', () => {
    it('should return false when not having a scope', () => {
      const spy = vi.fn();
      expect(tryOnScopeDispose(spy)).toBe(false);
      expect(spy).not.toBeCalled();
    });

    it('should return true when having a scope', () => {
      const spy = vi.fn();
      const scope = new EffectScope();
      // @ts-expect-error for mocking effect scope
      scope.on();
      expect(tryOnScopeDispose(spy)).toBe(true);
      scope.stop();
      expect(spy).toBeCalled();
    });
  });

  describe('useMutationObserver', () => {
    const observeFn = vi.fn();
    const disconnectFn = vi.fn();

    beforeEach(() => {
      // @ts-expect-error for mocking MutationObserver
      vi.spyOn(window, 'MutationObserver').mockImplementation((_callback) => {
        const instance = {
          observe: observeFn,
          disconnect: disconnectFn,
        };
        return instance;
      });
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('isSupported should be true', () => {
      const { isSupported } = useMutationObserver(null, () => {});
      expect(isSupported).toBe(true);
    });

    it('should not create observer when target is null', () => {
      useMutationObserver(null, () => {});
      expect(MutationObserver).not.toBeCalled();
    });

    it('should create observer when target is element', () => {
      const callback = vi.fn();
      useMutationObserver(document.body, callback, {
        childList: true,
      });
      expect(MutationObserver).toBeCalledWith(callback);
    });

    it('should observe target', () => {
      const callback = vi.fn();
      const options = {
        childList: true,
      };
      useMutationObserver(document.body, callback, options);
      expect(observeFn).toBeCalledWith(document.body, options);
    });

    it('should disconnect observer when stop is called', () => {
      const callback = vi.fn();
      const { stop } = useMutationObserver(document.body, callback);
      stop();
      expect(disconnectFn).toBeCalled();
    });

    it('stop should be called when scope is disposed', () => {
      const callback = vi.fn();
      const scope = new EffectScope();
      // @ts-expect-error for mocking effect scope
      scope.on();
      useMutationObserver(document.body, callback);
      scope.stop();
      expect(disconnectFn).toBeCalled();
    });
  });
});
