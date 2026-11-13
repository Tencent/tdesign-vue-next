import { defineComponent, h, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';

const { observeMock, disconnectSpy } = vi.hoisted(() => ({
  observeMock: vi.fn(() => ({ unobserve: vi.fn(), disconnect: disconnectSpy })),
  disconnectSpy: vi.fn(),
}));
vi.mock('@tdesign/common-js/utils/observe', () => ({ default: observeMock }));

import useLazyLoad from '../../../components/table/hooks/useLazyLoad';
import { useLazyLoad as useSharedLazyLoad } from '../../../shared/hooks/useLazyLoad';

describe('useLazyLoad', () => {
  it('disconnects the observer when the table unmounts before scrolling', async () => {
    observeMock.mockClear();
    disconnectSpy.mockClear();
    const Wrapper = defineComponent({
      setup() {
        const container = ref<HTMLElement>();
        const child = ref<HTMLTableRowElement>();
        useLazyLoad(container, child, { type: 'lazy', rowHeight: 48, bufferSize: 10 });
        return () => h('div', { ref: container, class: 'container' }, [h('tr', { ref: child, class: 'child' })]);
      },
    });
    const wrapper = mount(Wrapper);
    await nextTick();
    await nextTick();
    expect(observeMock).toHaveBeenCalled();

    wrapper.unmount();
    await nextTick();
    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('does not create an observer when the table is not lazy', async () => {
    observeMock.mockClear();
    const Wrapper = defineComponent({
      setup() {
        const container = ref<HTMLElement>();
        const child = ref<HTMLTableRowElement>();
        useLazyLoad(container, child, { type: 'virtual', rowHeight: 48, bufferSize: 10 });
        return () => h('div', { ref: container, class: 'container' }, [h('tr', { ref: child, class: 'child' })]);
      },
    });
    mount(Wrapper);
    await nextTick();
    await nextTick();
    expect(observeMock).not.toHaveBeenCalled();
  });
});

describe('useLazyLoad (shared)', () => {
  it('disconnects the observer when the component unmounts before scrolling', async () => {
    observeMock.mockClear();
    disconnectSpy.mockClear();
    const Wrapper = defineComponent({
      setup() {
        const container = ref<HTMLElement>();
        const child = ref<HTMLElement>();
        useSharedLazyLoad(container, child, { type: 'lazy', rowHeight: 48, bufferSize: 10 });
        return () => h('div', { ref: container, class: 'container' }, [h('div', { ref: child, class: 'child' })]);
      },
    });
    const wrapper = mount(Wrapper);
    await nextTick();
    await nextTick();
    expect(observeMock).toHaveBeenCalled();

    wrapper.unmount();
    await nextTick();
    // 卸载时 observer 仍持有 DOM 引用，必须主动断开
    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('skips observe when the refs are not resolved yet', async () => {
    observeMock.mockClear();
    const Wrapper = defineComponent({
      setup() {
        const container = ref<HTMLElement>();
        const child = ref<HTMLElement>();
        useSharedLazyLoad(container, child, { type: 'lazy' });
        return () => h('div', { class: 'empty' });
      },
    });
    mount(Wrapper);
    await nextTick();
    await nextTick();
    // 没有元素可观察时不应该把 undefined 传给 observe
    expect(observeMock).not.toHaveBeenCalled();
  });
});
