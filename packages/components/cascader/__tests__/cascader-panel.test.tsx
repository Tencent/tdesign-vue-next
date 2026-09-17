import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CascaderPanel } from '@tdesign/components/cascader';
import type { CascaderOption } from '@tdesign/components/cascader/types';

const options: CascaderOption[] = [
  {
    label: 'Parent',
    value: 'parent',
    children: [
      { label: 'First child', value: 'first' },
      { label: 'Second child', value: 'second' },
    ],
  },
  { label: 'Leaf', value: 'leaf' },
];

describe('CascaderPanel', () => {
  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('props', () => {
    it(':options[array]', () => {
      const wrapper = mount(CascaderPanel, { props: { options } });

      expect(wrapper.findAll('.t-cascader__menu')).toHaveLength(1);
      expect(wrapper.findAll('.t-cascader__item')).toHaveLength(2);
      wrapper.unmount();
    });

    it(':value[string]', async () => {
      const wrapper = mount(CascaderPanel, { props: { options, value: 'first' } });
      await nextTick();

      expect(wrapper.findAll('.t-cascader__menu')).toHaveLength(2);
      expect(wrapper.text()).toContain('First child');
      wrapper.unmount();
    });

    it(':multiple[boolean]', () => {
      const wrapper = mount(CascaderPanel, { props: { multiple: true, options, value: ['first'] } });

      expect(wrapper.findAll('.t-checkbox').length).toBeGreaterThan(0);
      wrapper.unmount();
    });

    it(':empty[string]', () => {
      const wrapper = mount(CascaderPanel, { props: { empty: 'No data', options: [] } });

      expect(wrapper.text()).toBe('No data');
      wrapper.unmount();
    });

    it(':empty[function]', () => {
      const wrapper = mount(CascaderPanel, {
        props: { empty: () => <span class="function-empty">No data</span>, options: [] },
      });

      expect(wrapper.find('.function-empty').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':empty[slot]', () => {
      const wrapper = mount(CascaderPanel, {
        props: { options: [] },
        slots: { empty: () => <span class="slot-empty">No data</span> },
      });

      expect(wrapper.find('.slot-empty').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':option[slot]', () => {
      const wrapper = mount(CascaderPanel, {
        props: { options },
        slots: { option: ({ item }) => <span class="slot-option">{String(item.label)}</span> },
      });

      expect(wrapper.findAll('.slot-option')).toHaveLength(2);
      wrapper.unmount();
    });

    it('currently does not forward option, loading, loadingText, or panel and column content', () => {
      const wrapper = mount(CascaderPanel, {
        props: {
          columnFooter: () => <span class="column-footer">Footer</span>,
          columnHeader: () => <span class="column-header">Header</span>,
          loading: true,
          loadingText: 'Loading options',
          option: () => <span class="function-option">Option</span>,
          options,
          panelBottomContent: 'Panel bottom',
          panelTopContent: 'Panel top',
        },
        slots: {
          columnFooter: () => <span class="slot-footer">Footer slot</span>,
          columnHeader: () => <span class="slot-header">Header slot</span>,
          loadingText: () => <span class="slot-loading">Loading slot</span>,
          panelBottomContent: () => <span class="slot-panel-bottom">Panel bottom slot</span>,
          panelTopContent: () => <span class="slot-panel-top">Panel top slot</span>,
        },
      });

      // CascaderPanel currently forwards only empty/option/loadingText slots, but loadingText is inert because loading
      // itself is not forwarded.
      expect(wrapper.find('.function-option').exists()).toBe(false);
      expect(wrapper.find('.column-header').exists()).toBe(false);
      expect(wrapper.find('.column-footer').exists()).toBe(false);
      expect(wrapper.find('.slot-header').exists()).toBe(false);
      expect(wrapper.find('.slot-footer').exists()).toBe(false);
      expect(wrapper.find('.slot-loading').exists()).toBe(false);
      expect(wrapper.find('.slot-panel-top').exists()).toBe(false);
      expect(wrapper.find('.slot-panel-bottom').exists()).toBe(false);
      expect(wrapper.text()).not.toContain('Loading options');
      expect(wrapper.text()).not.toContain('Panel top');
      expect(wrapper.text()).not.toContain('Panel bottom');
      expect(wrapper.findAll('.t-cascader__item')).toHaveLength(2);
      wrapper.unmount();
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(CascaderPanel, { props: { onChange, options } });

      await wrapper.findAll('.t-cascader__item')[1].trigger('click');
      expect(onChange).toHaveBeenCalledWith('leaf', expect.objectContaining({ source: 'check' }));
      wrapper.unmount();
    });
  });
});
