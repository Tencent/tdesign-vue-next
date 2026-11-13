import { defineComponent, h, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';

const { observeMock } = vi.hoisted(() => ({ observeMock: vi.fn(() => ({ unobserve: vi.fn() })) }));
vi.mock('@tdesign/common-js/utils/observe', () => ({ default: observeMock }));

import { useElementLazyRender } from '../../../shared/hooks/useElementLazyRender';

describe('useElementLazyRender', () => {
  it('starts observing when lazyLoad turns on after mount', async () => {
    observeMock.mockClear();
    const lazyLoad = ref(false);
    const Wrapper = defineComponent({
      setup() {
        const el = ref<HTMLElement>();
        const { showElement } = useElementLazyRender(el, lazyLoad);
        return () => h('div', { ref: el, class: 'target' }, String(showElement.value));
      },
    });
    const wrapper = mount(Wrapper);
    await nextTick();
    expect(observeMock).not.toHaveBeenCalled();

    lazyLoad.value = true;
    await nextTick();
    await nextTick();

    expect(observeMock).toHaveBeenCalled();
    expect(wrapper.find('.target').text()).toBe('false');
  });

  it('observes right away when lazyLoad is already on at mount', async () => {
    observeMock.mockClear();
    const lazyLoad = ref(true);
    const Wrapper = defineComponent({
      setup() {
        const el = ref<HTMLElement>();
        const { showElement } = useElementLazyRender(el, lazyLoad);
        return () => h('div', { ref: el, class: 'target' }, String(showElement.value));
      },
    });
    const wrapper = mount(Wrapper);
    await nextTick();
    expect(observeMock).toHaveBeenCalled();
    expect(wrapper.find('.target').text()).toBe('false');
  });
});
