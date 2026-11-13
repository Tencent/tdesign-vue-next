import { defineComponent, h, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';

const { observeSpy, disconnectSpy } = vi.hoisted(() => ({
  observeSpy: vi.fn(),
  disconnectSpy: vi.fn(),
}));

class FakeResizeObserver {
  observe = observeSpy;
  disconnect = disconnectSpy;
  unobserve = vi.fn();
}

import { useResize } from '../../../shared/hooks/useListener';

describe('useResize', () => {
  it('observes the real element, not the ref wrapper', async () => {
    observeSpy.mockClear();
    (window as any).ResizeObserver = FakeResizeObserver;

    const Wrapper = defineComponent({
      setup() {
        const el = ref<HTMLElement>();
        useResize(() => {}, el);
        return () => h('div', { ref: el, class: 'target' });
      },
    });
    const wrapper = mount(Wrapper);
    await nextTick();
    await nextTick();

    expect(observeSpy).toHaveBeenCalledTimes(1);
    const arg = observeSpy.mock.calls[0][0];
    expect(arg).toBeInstanceOf(HTMLElement);
    expect(arg).toBe(wrapper.find('.target').element);
  });

  it('still accepts a plain element', async () => {
    observeSpy.mockClear();
    (window as any).ResizeObserver = FakeResizeObserver;

    const Wrapper = defineComponent({
      setup() {
        const el = ref<HTMLElement>();
        useResize(() => {}, el.value);
        return () => h('div', { ref: el, class: 'target' });
      },
    });
    mount(Wrapper);
    await nextTick();
    await nextTick();
    // 传值时元素尚未挂载，hook 不应崩溃
    expect(observeSpy).not.toHaveBeenCalled();
  });
});
