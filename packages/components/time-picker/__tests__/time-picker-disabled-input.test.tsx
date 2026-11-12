import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import TimePicker from '../time-picker';

// 与官方 disabled 示例一致：1/2/3 点、30-34 分被禁用
const disableTime = (h: number) => {
  const disableHour = [1, 2, 3];
  if (h > 4) {
    return { hour: disableHour, minute: [30, 31, 32, 33, 34] };
  }
  return { hour: disableHour };
};

describe('TimePicker allowInput respects disableTime', () => {
  const typeAndBlur = async (wrapper: ReturnType<typeof mount>, text: string) => {
    const input = wrapper.find('input');
    await input.setValue(text);
    await input.trigger('blur');
    await wrapper.vm.$nextTick();
  };

  it('rejects a typed hour that disableTime marks as disabled', async () => {
    const value = ref('');
    const onBlur = vi.fn();
    const wrapper = mount(() => (
      <TimePicker v-model={value.value} allowInput disableTime={disableTime} onBlur={onBlur} />
    ));

    await typeAndBlur(wrapper, '01:10:00');

    // 01 点在禁用列表里，不允许通过手动输入写进 v-model
    expect(value.value).not.toBe('01:10:00');
  });

  it('accepts a typed time that disableTime allows', async () => {
    const value = ref('');
    const wrapper = mount(() => <TimePicker v-model={value.value} allowInput disableTime={disableTime} />);

    await typeAndBlur(wrapper, '05:10:00');

    expect(value.value).toBe('05:10:00');
  });

  it('rejects a typed minute that disableTime marks as disabled', async () => {
    const value = ref('05:00:00');
    const wrapper = mount(() => <TimePicker v-model={value.value} allowInput disableTime={disableTime} />);

    await typeAndBlur(wrapper, '05:31:00');

    expect(value.value).not.toBe('05:31:00');
  });
});
