import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TabPanel, Tabs } from '@tdesign/components/tabs';
import TTabNav from '../tab-nav';
import tabProps from '../props';

const createPanels = () => [
  h(TabPanel, { value: 'first', label: 'First', destroyOnHide: false }, { default: () => 'First content' }),
  h(TabPanel, { value: 'second', label: 'Second', destroyOnHide: false }, { default: () => 'Second content' }),
];

describe('Tabs', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it(':default[slot]', () => {
      const wrapper = mount(Tabs, {
        props: { defaultValue: 'first' },
        slots: { default: createPanels },
      });

      expect(wrapper.classes()).toEqual(['t-tabs']);
      expect(wrapper.find('.t-tabs__header').classes()).toContain('t-is-top');
      expect(wrapper.findAll('.t-tabs__nav-item')).toHaveLength(2);
      expect(wrapper.find('.t-tabs__nav-item.t-is-active').text()).toBe('First');
      expect(wrapper.find('.t-tabs__content').text()).toContain('First content');
      expect(wrapper.findAll('.t-tab-panel')[0].classes()).not.toContain('t-is-hidden');
      expect(wrapper.findAll('.t-tab-panel')[1].classes()).toContain('t-is-hidden');
    });

    it(':default[undefined]', () => {
      const wrapper = mount(Tabs);

      expect(wrapper.find('.t-tabs__header').exists()).toBe(true);
      expect(wrapper.find('.t-tabs__content').exists()).toBe(false);
      expect(wrapper.findAll('.t-tabs__nav-item')).toHaveLength(0);
    });

    it(':default[slot] (nested panels)', () => {
      const wrapper = mount(Tabs, {
        props: { defaultValue: 'nested' },
        slots: {
          default: () => [
            h('section', [
              h(TabPanel, { value: 'nested', label: 'Nested' }, { default: () => h('strong', 'Nested content') }),
            ]),
            h('span', 'Ignored content'),
          ],
        },
      });

      expect(wrapper.findAll('.t-tabs__nav-item')).toHaveLength(1);
      expect(wrapper.find('.t-tabs__nav-item').text()).toBe('Nested');
      expect(wrapper.find('.t-tabs__content strong').text()).toBe('Nested content');
      expect(wrapper.text()).not.toContain('Ignored content');
    });

    it(':list[array]', () => {
      const wrapper = mount(Tabs, {
        props: {
          defaultValue: 'list',
          list: [{ value: 'list', label: 'List label', panel: 'List content' }],
        },
        slots: {
          default: () => h(TabPanel, { value: 'slot', label: 'Slot label' }, { default: () => 'Slot content' }),
        },
      });

      expect(wrapper.findAll('.t-tabs__nav-item')).toHaveLength(1);
      expect(wrapper.find('.t-tabs__nav-item').text()).toBe('List label');
      expect(wrapper.find('.t-tab-panel').text()).toBe('List content');
      expect(wrapper.text()).not.toContain('Slot content');
    });

    it(':list[empty array]', () => {
      const wrapper = mount(Tabs, {
        props: { defaultValue: 'first', list: [] },
        slots: { default: createPanels },
      });

      expect(wrapper.findAll('.t-tabs__nav-item')).toHaveLength(2);
      expect(wrapper.find('.t-tabs__nav-item.t-is-active').text()).toBe('First');
    });

    it(':action[string/TNode/boolean/slot]', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const stringWrapper = mount(Tabs, { props: { action: 'More actions' } });
      const functionWrapper = mount(Tabs, {
        props: { action: () => h('button', { class: 'custom-action' }, 'Create') },
      });
      const booleanWrapper = mount(Tabs, { props: { action: () => false } });
      const slotWrapper = mount(Tabs, {
        slots: { action: () => h('button', { class: 'action-slot' }, 'Slot action') },
      });

      expect(stringWrapper.find('.t-tabs__operations--right').text()).toContain('More actions');
      expect(functionWrapper.find('.custom-action').text()).toBe('Create');
      expect(booleanWrapper.find('.t-tabs__operations--right').text()).toBe('');
      expect(slotWrapper.find('.action-slot').text()).toBe('Slot action');

      const hasActionPropWarning = warn.mock.calls
        .flat()
        .some(
          (message) =>
            typeof message === 'string' && message.includes('Invalid prop: type check failed for prop "action"'),
        );
      expect(hasActionPropWarning).toBe(false);
    });

    it(':action[string] + :placement[vertical]', () => {
      const wrapper = mount(Tabs, {
        props: { action: 'Hidden action', placement: 'left' },
      });

      expect(wrapper.find('.t-tabs__operations--right').text()).not.toContain('Hidden action');
      expect(wrapper.find('.t-tabs__nav-wrap').classes()).toContain('t-is-vertical');
    });

    it(':placement[bottom]', () => {
      const wrapper = mount(Tabs, {
        props: { defaultValue: 'first', placement: 'bottom' },
        slots: { default: createPanels },
      });
      const children = Array.from((wrapper.element as HTMLElement).children);

      expect(children[0].classList.contains('t-tabs__content')).toBe(true);
      expect(children[1].classList.contains('t-tabs__header')).toBe(true);
      expect(wrapper.find('.t-tabs__header').classes()).toContain('t-is-bottom');
    });

    it(':addable[boolean] + :disabled[boolean] + :dragSort[boolean] + visual props', () => {
      const wrapper = mount(Tabs, {
        props: {
          addable: true,
          disabled: true,
          dragSort: true,
          defaultValue: 'first',
          placement: 'right',
          scrollPosition: 'end',
          size: 'large',
          theme: 'card',
        },
        slots: { default: createPanels },
      });
      const nav = wrapper.findComponent(TTabNav);

      expect(nav.props()).toMatchObject({
        addable: true,
        disabled: true,
        dragSort: true,
        placement: 'right',
        scrollPosition: 'end',
        size: 'large',
        theme: 'card',
        value: 'first',
      });
      expect(nav.props('panels')).toHaveLength(2);
    });

    it(':label[slot]', () => {
      const wrapper = mount(Tabs, {
        props: { defaultValue: 'slot-label' },
        slots: {
          default: () =>
            h(
              TabPanel,
              { value: 'slot-label' },
              {
                label: () => h('b', { class: 'slot-label' }, 'Rich label'),
                default: () => 'Panel',
              },
            ),
        },
      });

      expect(wrapper.find('.slot-label').text()).toBe('Rich label');
    });
    it(':defaultValue[number]', () => {
      const wrapper = mount({
        render() {
          return (
            <Tabs defaultValue={0}>
              <TabPanel value={0} label="Zero">
                Zero panel
              </TabPanel>
              <TabPanel value={1} label="One">
                One panel
              </TabPanel>
            </Tabs>
          );
        },
      });

      expect(wrapper.find('.t-tabs__nav-item.t-is-active').text()).toBe('Zero');
      expect(wrapper.findAll('.t-tab-panel')[0].classes()).not.toContain('t-is-hidden');
    });

    it.each([
      ['placement', tabProps.placement.validator, 'left'],
      ['scrollPosition', tabProps.scrollPosition.validator, 'center'],
      ['size', tabProps.size.validator, 'large'],
      ['theme', tabProps.theme.validator, 'card'],
    ])(':%s[string]', (_name, validator, validValue) => {
      const validate = validator as (value?: string) => boolean;

      expect(validate()).toBe(true);
      expect(validate(validValue)).toBe(true);
      expect(validate('invalid')).toBe(false);
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Tabs, {
        props: { defaultValue: 'first', onChange },
        slots: { default: createPanels },
      });

      await wrapper.findAll('.t-tabs__nav-item')[1].trigger('click');

      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledWith('second');
      expect(wrapper.find('.t-tabs__nav-item.t-is-active').text()).toBe('Second');
      expect(wrapper.findAll('.t-tab-panel')[0].classes()).toContain('t-is-hidden');
      expect(wrapper.findAll('.t-tab-panel')[1].classes()).not.toContain('t-is-hidden');
    });

    it('update:value', async () => {
      const onChange = vi.fn();
      const onUpdate = vi.fn();
      const wrapper = mount(Tabs, {
        props: { value: 'first', onChange, 'onUpdate:value': onUpdate },
        slots: { default: createPanels },
      });

      await wrapper.findAll('.t-tabs__nav-item')[1].trigger('click');

      expect(onUpdate).toHaveBeenCalledWith('second');
      expect(onChange).toHaveBeenCalledWith('second');
      expect(wrapper.find('.t-tabs__nav-item.t-is-active').text()).toBe('First');

      await wrapper.setProps({ value: 'second' });
      expect(wrapper.find('.t-tabs__nav-item.t-is-active').text()).toBe('Second');
    });

    it('update:value[number]', async () => {
      const onChange = vi.fn();
      const onUpdate = vi.fn();
      const wrapper = mount(Tabs, {
        props: { value: 0, onChange, 'onUpdate:value': onUpdate },
        slots: {
          default: () => [h(TabPanel, { value: 0, label: 'Zero' }), h(TabPanel, { value: 1, label: 'One' })],
        },
      });

      await wrapper.findAll('.t-tabs__nav-item')[1].trigger('click');

      expect(onUpdate).toHaveBeenCalledWith(1);
      expect(onChange).toHaveBeenCalledWith(1);
      expect(wrapper.find('.t-tabs__nav-item.t-is-active').text()).toBe('Zero');

      await wrapper.setProps({ value: 1 });
      expect(wrapper.find('.t-tabs__nav-item.t-is-active').text()).toBe('One');
    });

    it('update:modelValue', async () => {
      const onUpdate = vi.fn();
      const wrapper = mount(Tabs, {
        props: { modelValue: 'first', 'onUpdate:modelValue': onUpdate },
        slots: { default: createPanels },
      });

      await wrapper.findAll('.t-tabs__nav-item')[1].trigger('click');

      expect(onUpdate).toHaveBeenCalledWith('second');
      expect(wrapper.find('.t-tabs__nav-item.t-is-active').text()).toBe('First');
      await wrapper.setProps({ modelValue: 'second' });
      expect(wrapper.find('.t-tabs__nav-item.t-is-active').text()).toBe('Second');
    });

    it('update:modelValue[number]', async () => {
      const onUpdate = vi.fn();
      const wrapper = mount(Tabs, {
        props: { modelValue: 0, 'onUpdate:modelValue': onUpdate },
        slots: {
          default: () => [h(TabPanel, { value: 0, label: 'Zero' }), h(TabPanel, { value: 1, label: 'One' })],
        },
      });

      await wrapper.findAll('.t-tabs__nav-item')[1].trigger('click');

      expect(onUpdate).toHaveBeenCalledWith(1);
      expect(wrapper.find('.t-tabs__nav-item.t-is-active').text()).toBe('Zero');

      await wrapper.setProps({ modelValue: 1 });
      expect(wrapper.find('.t-tabs__nav-item.t-is-active').text()).toBe('One');
    });

    it('change (disabled)', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Tabs, {
        props: { defaultValue: 'first', disabled: true, onChange },
        slots: { default: createPanels },
      });

      await wrapper.findAll('.t-tabs__nav-item')[1].trigger('click');

      expect(onChange).not.toHaveBeenCalled();
      expect(wrapper.find('.t-tabs__nav-item.t-is-active').text()).toBe('First');
      expect(wrapper.findAll('.t-tabs__nav-item').every((item) => item.classes().includes('t-is-disabled'))).toBe(true);
    });

    it('add', async () => {
      const onAdd = vi.fn();
      const wrapper = mount(Tabs, { props: { addable: true, onAdd } });

      await wrapper.find('.t-tabs__add-btn').trigger('click');

      expect(onAdd).toHaveBeenCalledOnce();
      expect(onAdd).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
    });

    it('remove', async () => {
      const onChange = vi.fn();
      const onRemove = vi.fn();
      const onPanelRemove = vi.fn();
      const wrapper = mount(Tabs, {
        props: { defaultValue: 'second', onChange, onRemove, theme: 'card' },
        slots: {
          default: () => [
            h(
              TabPanel,
              { value: 'first', label: 'First', removable: true, onRemove: onPanelRemove },
              { default: () => 'First content' },
            ),
            h(TabPanel, { value: 'second', label: 'Second' }, { default: () => 'Second content' }),
          ],
        },
      });

      await wrapper.find('.remove-btn').trigger('click');

      expect(onRemove).toHaveBeenCalledWith({ value: 'first', index: 0, e: expect.any(MouseEvent) });
      expect(onPanelRemove).toHaveBeenCalledWith({ value: 'first', e: expect.any(MouseEvent) });
      expect(onChange).not.toHaveBeenCalled();
      expect(wrapper.find('.t-tabs__nav-item.t-is-active').text()).toBe('Second');
    });

    it('dragSort', async () => {
      const onDragSort = vi.fn();
      const wrapper = mount(Tabs, {
        props: { dragSort: true, onDragSort },
        slots: { default: createPanels },
      });
      const context = { currentIndex: 0, current: 'first', targetIndex: 1, target: 'second' };

      wrapper.findComponent(TTabNav).vm.$emit('drag-sort', context);
      await nextTick();

      expect(onDragSort).toHaveBeenCalledWith(context);
    });
  });
});
