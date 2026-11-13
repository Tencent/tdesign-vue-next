import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import InputNumber from '../input-number';

describe('InputNumber step buttons keep the input focused', () => {
  const pressStep = async (wrapper: ReturnType<typeof mount>, selector: string) => {
    const button = wrapper.find(selector);
    expect(button.exists()).toBe(true);
    const mousedown = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
    button.element.dispatchEvent(mousedown);
    await button.trigger('click');
    return mousedown;
  };

  it('prevents the default mousedown on the increase button', async () => {
    const value = ref<number>(1);
    const onBlur = vi.fn();
    const wrapper = mount(() => <InputNumber v-model={value.value} theme="column" onBlur={onBlur} />);

    const mousedown = await pressStep(wrapper, '.t-input-number__increase');

    expect(mousedown.defaultPrevented).toBe(true);
    expect(onBlur).not.toHaveBeenCalled();
    expect(value.value).toBe(2);
  });

  it('prevents the default mousedown on the decrease button', async () => {
    const value = ref<number>(5);
    const onBlur = vi.fn();
    const wrapper = mount(() => <InputNumber v-model={value.value} theme="column" onBlur={onBlur} />);

    const mousedown = await pressStep(wrapper, '.t-input-number__decrease');

    expect(mousedown.defaultPrevented).toBe(true);
    expect(onBlur).not.toHaveBeenCalled();
    expect(value.value).toBe(4);
  });

  it('keeps a genuine blur working when focus really leaves the component', async () => {
    const value = ref<number>(1);
    const onBlur = vi.fn();
    const wrapper = mount(() => <InputNumber v-model={value.value} theme="column" onBlur={onBlur} />);

    await wrapper.find('.t-input__inner').trigger('blur');

    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
