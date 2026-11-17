import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';

import Checkbox from '..';

// issue #6979：customValue 自定义选中时 onChange 的载荷，语义对齐 Switch.customValue
describe('Checkbox customValue', () => {
  it(':customValue[number] onChange 载荷为自定义值', async () => {
    const onChange = vi.fn();
    const wrapper = mount(Checkbox, {
      props: {
        checked: false,
        customValue: [1, 0],
        onChange,
        'onUpdate:checked': (v: any) => wrapper.setProps({ checked: v }),
      },
    });

    // 点击选中 -> onChange 收到 1 而非 true
    await wrapper.get('input').trigger('change');
    await nextTick();
    expect(onChange).toHaveBeenCalledWith(1, { e: expect.any(Event) });
    expect(wrapper.get('label').classes()).toContain('t-is-checked');

    // 受控更新为选中
    await wrapper.setProps({ checked: true });
    await nextTick();

    // 再点击取消 -> onChange 收到 0 而非 false
    await wrapper.get('input').trigger('change');
    await nextTick();
    expect(onChange).toHaveBeenLastCalledWith(0, { e: expect.any(Event) });
  });

  it(':customValue[string] onChange 载荷为自定义字符串', async () => {
    const onChange = vi.fn();
    const wrapper = mount(Checkbox, {
      props: {
        checked: false,
        customValue: ['yes', 'no'],
        onChange,
        'onUpdate:checked': (v: any) => wrapper.setProps({ checked: v }),
      },
    });

    await wrapper.get('input').trigger('change');
    await nextTick();
    expect(onChange).toHaveBeenCalledWith('yes', { e: expect.any(Event) });
  });

  it(':customValue 缺省时保持布尔行为（回归保护）', async () => {
    const onChange = vi.fn();
    const wrapper = mount(Checkbox, { props: { checked: false, onChange } });

    await wrapper.get('input').trigger('change');
    await nextTick();
    expect(onChange).toHaveBeenCalledWith(true, { e: expect.any(Event) });
  });
});
