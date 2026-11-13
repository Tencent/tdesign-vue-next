import { defineComponent, h, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { usePanelVirtualScroll } from '../../../components/select/hooks/usePanelVirtualScroll';

describe('usePanelVirtualScroll', () => {
  it('does not throw when scroll is not configured', async () => {
    const Wrapper = defineComponent({
      setup() {
        const popupContentRef = ref<HTMLElement>();
        const options = ref([{ label: 'a', value: 1 }]);
        const { cursorStyle, panelStyle } = usePanelVirtualScroll({
          scroll: undefined,
          popupContentRef,
          options,
        });
        return () =>
          h('div', { class: 'out' }, [
            h('span', { class: 'cursor' }, JSON.stringify(cursorStyle.value)),
            h('span', { class: 'panel' }, JSON.stringify(panelStyle.value)),
          ]);
      },
    });
    const wrapper = mount(Wrapper);
    await nextTick();
    expect(wrapper.find('.out').exists()).toBe(true);
    expect(wrapper.find('.cursor').text()).toContain('translate(0, 0px)');
    expect(wrapper.find('.panel').text()).toContain('translate(0, 0px)');
  });

  it('still uses the virtual scroll offsets when scroll is virtual', async () => {
    const Wrapper = defineComponent({
      setup() {
        const popupContentRef = ref<HTMLElement>();
        const options = ref(Array.from({ length: 200 }, (_, i) => ({ label: String(i), value: i })));
        const { cursorStyle, panelStyle } = usePanelVirtualScroll({
          scroll: { type: 'virtual', threshold: 100, rowHeight: 30 },
          popupContentRef,
          options,
        });
        return () =>
          h('div', { class: 'out' }, [
            h('span', { class: 'cursor' }, JSON.stringify(cursorStyle.value)),
            h('span', { class: 'panel' }, JSON.stringify(panelStyle.value)),
          ]);
      },
    });
    const wrapper = mount(Wrapper);
    await nextTick();
    expect(wrapper.find('.cursor').text()).toContain('translate(0,');
    expect(wrapper.find('.panel').text()).toContain('translate(0,');
  });
});
