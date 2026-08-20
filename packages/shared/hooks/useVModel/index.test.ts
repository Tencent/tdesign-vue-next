import { mount } from '@vue/test-utils';
import { defineComponent, toRefs } from 'vue';
import type { PropType } from 'vue';

import { useVModel } from './index';

type ChangeHandler = (value: number) => void;

const ValueControlHook = defineComponent({
  props: {
    value: Number,
    modelValue: Number,
    defaultValue: {
      type: Number,
      default: 0,
    },
    onChange: Function as PropType<ChangeHandler>,
  },
  setup(props, { expose }) {
    const { value, modelValue, onChange } = toRefs(props);
    const [innerValue, setValue] = useVModel(value, modelValue, props.defaultValue, onChange);
    expose({ innerValue, setValue });
    return () => null;
  },
});

describe('useVModel', () => {
  it.each([
    ['modelValue controlled', { modelValue: 0 }],
    ['value controlled', { value: 0 }],
    ['uncontrolled', {}],
  ])('uses the latest change listener when %s', async (_, valueProps) => {
    const initialOnChange = vi.fn();
    const latestOnChange = vi.fn();
    const wrapper = mount(ValueControlHook, {
      props: { ...valueProps, onChange: initialOnChange },
    });

    await wrapper.setProps({ onChange: latestOnChange });
    (wrapper.vm as unknown as { setValue: ChangeHandler }).setValue(1);

    expect(initialOnChange).not.toHaveBeenCalled();
    expect(latestOnChange).toHaveBeenCalledWith(1);
  });
});
