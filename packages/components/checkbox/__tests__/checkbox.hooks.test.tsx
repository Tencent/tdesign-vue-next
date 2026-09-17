import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Checkbox from '..';
import useKeyboardEvent from '../hooks/useKeyboardEvent';

type RegisteredKeyboardListener = (event: KeyboardEvent) => void;

const createKeyboardEvent = (key: string, code = key) =>
  ({
    key,
    code,
    currentTarget: document.createElement('label'),
    preventDefault: vi.fn(),
  } as unknown as KeyboardEvent);

const createKeyboardHarness = (inputDisabled = false, withInput = true) => {
  const root = document.createElement('label');
  if (withInput) {
    const input = document.createElement('input');
    input.disabled = inputDisabled;
    root.appendChild(input);
  }

  const handleChange = vi.fn();
  const addEventListener = vi.spyOn(root, 'addEventListener');
  const removeEventListener = vi.spyOn(root, 'removeEventListener');
  const { onCheckboxFocus, onCheckboxBlur } = useKeyboardEvent(handleChange);

  onCheckboxFocus({ currentTarget: root } as unknown as FocusEvent);
  const listener = addEventListener.mock.calls.find(([name]) => name === 'keydown')?.[1] as RegisteredKeyboardListener;

  return { root, handleChange, listener, onCheckboxBlur, removeEventListener };
};

class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root: Element | Document | null;

  readonly rootMargin: string;

  readonly thresholds: readonly number[];

  readonly observe = vi.fn();

  readonly unobserve = vi.fn();

  readonly disconnect = vi.fn();

  readonly takeRecords = vi.fn(() => [] as IntersectionObserverEntry[]);

  constructor(private readonly callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
    this.root = options.root ?? null;
    this.rootMargin = options.rootMargin ?? '0px';
    this.thresholds = Array.isArray(options.threshold) ? options.threshold : [options.threshold ?? 0];
    MockIntersectionObserver.instances.push(this);
  }

  trigger(isIntersecting: boolean) {
    this.callback([{ isIntersecting } as IntersectionObserverEntry], this);
  }
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('Checkbox hooks', () => {
  describe('useKeyboardEvent', () => {
    it('registers on focus and unregisters on blur', () => {
      const { root, listener, onCheckboxBlur, removeEventListener } = createKeyboardHarness();

      onCheckboxBlur({ currentTarget: root } as unknown as FocusEvent);

      expect(removeEventListener).toHaveBeenCalledWith('keydown', listener);
    });

    it.each([
      ['Enter', 'Enter'],
      ['Space', 'Space'],
      ['', 'Enter'],
    ])('handles checked key=%j and code=%j', (key, code) => {
      const { root, handleChange, listener } = createKeyboardHarness();
      const event = createKeyboardEvent(key, code);
      Object.defineProperty(event, 'currentTarget', { value: root });

      listener(event);

      expect(event.preventDefault).toHaveBeenCalledOnce();
      expect(handleChange).toHaveBeenCalledWith(event);
    });

    it('matches checked keys case-insensitively', () => {
      const { root, handleChange, listener } = createKeyboardHarness();
      const event = createKeyboardEvent('enter', 'enter');
      Object.defineProperty(event, 'currentTarget', { value: root });

      listener(event);

      expect(handleChange).toHaveBeenCalledWith(event);
    });

    it('ignores unrelated keys', () => {
      const { root, handleChange, listener } = createKeyboardHarness();
      const event = createKeyboardEvent('Escape', 'Escape');
      Object.defineProperty(event, 'currentTarget', { value: root });

      listener(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not change a disabled input', () => {
      const { root, handleChange, listener } = createKeyboardHarness(true);
      const event = createKeyboardEvent('Enter');
      Object.defineProperty(event, 'currentTarget', { value: root });

      listener(event);

      expect(event.preventDefault).toHaveBeenCalledOnce();
      expect(handleChange).not.toHaveBeenCalled();
    });

    // Current behavior tracked by #6854: lazy content can leave the focusable label without an input.
    it('currently throws for a checked key when no input is rendered', () => {
      const { root, listener } = createKeyboardHarness(false, false);
      const event = createKeyboardEvent('Enter');
      Object.defineProperty(event, 'currentTarget', { value: root });

      expect(() => listener(event)).toThrow(TypeError);
      expect(event.preventDefault).toHaveBeenCalledOnce();
    });

    it('integrates with Checkbox focus and blur', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Checkbox, { props: { onChange } });
      const root = wrapper.get('label');

      await root.trigger('focus');
      await root.trigger('keydown', { key: 'Enter' });

      expect(wrapper.get('label').classes()).toContain('t-is-checked');
      expect(onChange).toHaveBeenCalledWith(true, { e: expect.any(KeyboardEvent) });

      onChange.mockClear();
      await root.trigger('blur');
      await root.trigger('keydown', { key: 'Enter' });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('useCheckboxLazyLoad', () => {
    beforeEach(() => {
      MockIntersectionObserver.instances = [];
      vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    });

    it('renders immediately without an observer when disabled', () => {
      const wrapper = mount(Checkbox);

      expect(wrapper.find('input').exists()).toBe(true);
      expect(MockIntersectionObserver.instances).toHaveLength(0);

      wrapper.unmount();
    });

    it('hides content until the label intersects', async () => {
      const wrapper = mount(Checkbox, { props: { lazyLoad: true, label: 'Lazy checkbox' } });
      await nextTick();
      const observer = MockIntersectionObserver.instances.at(-1);

      expect(observer).toBeDefined();
      expect(wrapper.find('input').exists()).toBe(false);
      expect(wrapper.get('label').text()).toBe('');
      expect(observer.observe).toHaveBeenCalledWith(wrapper.get('label').element);
      expect(observer.root).toBeNull();
      expect(observer.rootMargin).toBe('0px 0px 0px 0px');

      observer.trigger(false);
      await nextTick();

      expect(wrapper.find('input').exists()).toBe(false);
      expect(observer.unobserve).not.toHaveBeenCalled();

      observer.trigger(true);
      await nextTick();

      expect(wrapper.find('input').exists()).toBe(true);
      expect(wrapper.get('.t-checkbox__label').text()).toBe('Lazy checkbox');
      expect(observer.unobserve).toHaveBeenCalledWith(wrapper.get('label').element);

      wrapper.unmount();
    });

    it('starts observing when lazyLoad becomes enabled', async () => {
      const wrapper = mount(Checkbox, { props: { lazyLoad: false } });

      await wrapper.setProps({ lazyLoad: true });

      const observer = MockIntersectionObserver.instances.at(-1);
      expect(observer).toBeDefined();
      expect(wrapper.find('input').exists()).toBe(false);

      observer.trigger(true);
      await nextTick();

      expect(wrapper.find('input').exists()).toBe(true);
      wrapper.unmount();
    });

    it('unobserves the active label on unmount', () => {
      const wrapper = mount(Checkbox, { props: { lazyLoad: true } });
      const label = wrapper.get('label').element;
      const observer = MockIntersectionObserver.instances.at(-1);

      wrapper.unmount();

      expect(observer.unobserve).toHaveBeenCalledWith(label);
    });

    // Current behavior tracked by #6853: disabling lazyLoad neither reveals content nor cleans up the observer.
    it('currently keeps hidden content and its observer after lazyLoad is disabled', async () => {
      const wrapper = mount(Checkbox, { props: { lazyLoad: true } });
      const observer = MockIntersectionObserver.instances.at(-1);

      await wrapper.setProps({ lazyLoad: false });

      expect(wrapper.find('input').exists()).toBe(false);

      wrapper.unmount();

      expect(observer.unobserve).not.toHaveBeenCalled();
    });

    // Current behavior tracked by #6853: observe() returns null without IntersectionObserver, then cleanup dereferences it.
    it('currently reports a lifecycle error when IntersectionObserver is unavailable', () => {
      vi.stubGlobal('IntersectionObserver', undefined);
      const errorHandler = vi.fn();
      const wrapper = mount(Checkbox, {
        props: { lazyLoad: true },
        global: { config: { errorHandler } },
      });

      expect(wrapper.find('input').exists()).toBe(true);

      wrapper.unmount();

      expect(errorHandler).toHaveBeenCalledWith(expect.any(TypeError), expect.any(Object), expect.any(String));
    });
  });
});
