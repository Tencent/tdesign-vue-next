import { mount } from '@vue/test-utils';
import { h, nextTick, ref, type Ref } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import type { TabValue, TdTabPanelProps } from '../type';
import TTabPanel from '../tab-panel';
import TTabs from '../tabs';

const mountPanel = (activeValue: Ref<TabValue>, props: TdTabPanelProps = {}) =>
  mount(TTabPanel, {
    props,
    global: {
      provide: { tabs: { value: activeValue } },
    },
  });

describe('TabPanel', () => {
  describe('props', () => {
    it(':value[string] + :default[slot]', () => {
      const activeValue = ref<TabValue>('panel');
      const wrapper = mount(TTabPanel, {
        props: { value: 'panel' },
        slots: { default: () => h('strong', 'Slot content') },
        global: { provide: { tabs: { value: activeValue } } },
      });

      expect(wrapper.classes()).toEqual(['t-tab-panel']);
      expect(wrapper.find('strong').text()).toBe('Slot content');
    });

    it(':destroyOnHide[true]', () => {
      const wrapper = mountPanel(ref<TabValue>('other'), {
        value: 'panel',
        panel: 'Hidden content',
      });

      expect(wrapper.find('.t-tab-panel').exists()).toBe(false);
      expect(wrapper.text()).toBe('');
    });

    it(':lazy[boolean] + :destroyOnHide[true]', async () => {
      const activeValue = ref<TabValue>('other');
      const wrapper = mountPanel(activeValue, {
        value: 'panel',
        lazy: true,
        panel: 'Lazy content',
      });

      expect(wrapper.find('.t-tab-panel').exists()).toBe(false);

      activeValue.value = 'panel';
      await nextTick();
      expect(wrapper.find('.t-tab-panel').text()).toBe('Lazy content');

      activeValue.value = 'other';
      await nextTick();
      expect(wrapper.find('.t-tab-panel').exists()).toBe(false);
    });

    it(':destroyOnHide[false]', async () => {
      const activeValue = ref<TabValue>('other');
      const wrapper = mountPanel(activeValue, {
        value: 'panel',
        destroyOnHide: false,
        panel: 'Persistent content',
      });

      expect(wrapper.find('.t-tab-panel').classes()).toContain('t-is-hidden');

      activeValue.value = 'panel';
      await nextTick();
      expect(wrapper.find('.t-tab-panel').classes()).not.toContain('t-is-hidden');

      activeValue.value = 'other';
      await nextTick();
      expect(wrapper.find('.t-tab-panel').classes()).toContain('t-is-hidden');
      expect(wrapper.text()).toBe('Persistent content');
    });

    it(':panel[string/function]', () => {
      const stringWrapper = mountPanel(ref<TabValue>(1), { value: 1, panel: 'String panel' });
      const functionWrapper = mountPanel(ref<TabValue>(2), {
        value: 2,
        panel: () => h('em', 'Function panel'),
      });

      expect(stringWrapper.text()).toBe('String panel');
      expect(functionWrapper.find('em').text()).toBe('Function panel');
    });

    it(':default[slot]', () => {
      const activeValue = ref<TabValue>('panel');
      const wrapper = mount(TTabPanel, {
        props: { value: 'panel', panel: 'Panel prop' },
        slots: { default: () => 'Default slot' },
        global: { provide: { tabs: { value: activeValue } } },
      });

      expect(wrapper.text()).toBe('Default slot');
    });

    it(':default[function]', () => {
      const wrapper = mountPanel(ref<TabValue>('panel'), {
        value: 'panel',
        default: () => h('span', 'Default prop'),
        panel: 'Panel prop',
      });

      expect(wrapper.find('span').text()).toBe('Default prop');
      expect(wrapper.text()).not.toContain('Panel prop');
    });

    it(':label[string/function/slot]', () => {
      const wrapper = mount(TTabs, {
        props: { defaultValue: 'string' },
        slots: {
          default: () => [
            h(TTabPanel, { label: 'String label', value: 'string' }),
            h(TTabPanel, { label: () => h('em', { class: 'label-function' }, 'Function label'), value: 'function' }),
            h(TTabPanel, { value: 'slot' }, { label: () => h('strong', { class: 'label-slot' }, 'Slot label') }),
          ],
        },
      });

      expect(wrapper.findAll('.t-tabs__nav-item').map((item) => item.text())).toEqual([
        'String label',
        'Function label',
        'Slot label',
      ]);
      expect(wrapper.find('.label-function').exists()).toBe(true);
      expect(wrapper.find('.label-slot').exists()).toBe(true);
    });

    it(':disabled[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(TTabs, {
        props: { defaultValue: 'enabled', onChange },
        slots: {
          default: () => [
            h(TTabPanel, { label: 'Enabled', value: 'enabled' }),
            h(TTabPanel, { disabled: true, label: 'Disabled', value: 'disabled' }),
          ],
        },
      });

      await wrapper.findAll('.t-tabs__nav-item')[1].trigger('click');

      expect(wrapper.findAll('.t-tabs__nav-item')[1].classes()).toContain('t-is-disabled');
      expect(wrapper.find('.t-tabs__nav-item.t-is-active').text()).toBe('Enabled');
      expect(onChange).not.toHaveBeenCalled();
    });

    it(':draggable[boolean]', () => {
      const wrapper = mount(TTabs, {
        props: { dragSort: true },
        slots: {
          default: () => [
            h(TTabPanel, { label: 'Draggable', value: 'enabled' }),
            h(TTabPanel, { draggable: false, label: 'Fixed', value: 'disabled' }),
          ],
        },
      });

      expect(wrapper.findAll('.t-tabs__nav-item').map((item) => item.attributes('draggable'))).toEqual([
        'true',
        'false',
      ]);
    });

    it(':removable[boolean] + remove', async () => {
      const onRemove = vi.fn();
      const wrapper = mount(TTabs, {
        props: { theme: 'card' },
        slots: {
          default: () => h(TTabPanel, { label: 'Removable', onRemove, removable: true, value: 'removable' }),
        },
      });

      await wrapper.get('.remove-btn').trigger('click');

      expect(onRemove).toHaveBeenCalledWith({ e: expect.any(MouseEvent), value: 'removable' });
    });
  });
});
