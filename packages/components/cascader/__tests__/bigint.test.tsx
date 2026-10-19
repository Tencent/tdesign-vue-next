/* eslint-disable vue/one-component-per-file */
import { nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { Cascader, type CascaderProps } from '@tdesign/components/cascader';
import { SelectInput } from '@tdesign/components/select-input';

describe('Cascader', () => {
  const wrappers: VueWrapper[] = [];
  const options = [
    {
      label: 'parent',
      value: 1n,
      children: [
        { label: 'zero', value: 0n },
        { label: 'large', value: 9007199254740993n },
      ],
    },
  ];
  const renderCascader = (props: CascaderProps) => {
    const wrapper = mount(Cascader, { attachTo: document.body, props: { options, ...props } });
    wrappers.push(wrapper);
    return wrapper;
  };
  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    document.querySelectorAll('.t-popup, .t-cascader__panel').forEach((element) => element.remove());
    vi.restoreAllMocks();
  });

  describe('props', () => {
    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it.each(['value', 'modelValue', 'defaultValue'] as const)(
      'displays a zero bigint %s without prop warnings',
      async (prop) => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const wrapper = renderCascader({ [prop]: 0n, popupVisible: true });
        await nextTick();
        expect(wrapper.find('input').attributes('placeholder')).toBe('parent / zero');
        expect(warn.mock.calls.some((args) => String(args[0]).includes('Invalid prop'))).toBe(false);
      },
    );

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it('displays a bigint beyond the safe integer range without losing precision', () => {
      const wrapper = renderCascader({ value: 9007199254740993n, popupVisible: true });
      expect(wrapper.find('input').attributes('placeholder')).toBe('parent / large');
    });
  });

  describe('events', () => {
    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it('emits 0n when the zero node is clicked', async () => {
      const onChange = vi.fn();
      const wrapper = renderCascader({ options: [{ label: 'zero', value: 0n }], popupVisible: true, onChange });
      const panel = wrapper.findComponent(SelectInput).vm.$slots.panel;
      const panelWrapper = mount({ name: 'CascaderBigintPanelHost', render: () => panel?.() });
      wrappers.push(panelWrapper);
      await nextTick();
      await panelWrapper.find('.t-cascader__item').trigger('click');
      expect(onChange).toHaveBeenCalledWith(0n, expect.objectContaining({ source: 'check' }));
    });
  });
});
