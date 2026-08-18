import { defineComponent, PropType, toRefs } from 'vue';
import { mount } from '@vue/test-utils';
import { useDefaultValue, useVModel } from '@tdesign/shared-hooks';

type ChangeHandler = (value: number) => void;

const props = {
  hook: {
    type: String as PropType<'vModel' | 'defaultValue'>,
    default: 'vModel',
  },
  value: Number,
  modelValue: Number,
  defaultValue: {
    type: Number,
    default: 0,
  },
  onChange: Function as PropType<ChangeHandler>,
};

const ValueControlHook = defineComponent({
  props,
  setup(componentProps, { expose }) {
    const { value, modelValue, onChange } = toRefs(componentProps);
    const [innerValue, setValue] =
      componentProps.hook === 'defaultValue'
        ? useDefaultValue(value, componentProps.defaultValue, onChange, 'value')
        : useVModel(value, modelValue, componentProps.defaultValue, onChange);
    expose({ innerValue, setValue });
    return () => null;
  },
});

describe('value control hooks', () => {
  it.each([
    ['modelValue controlled', { modelValue: 0 }],
    ['value controlled', { value: 0 }],
    ['uncontrolled', {}],
  ])('useVModel uses the latest change listener when %s', async (_, valueProps) => {
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

  it.each([
    ['controlled', { value: 0 }],
    ['uncontrolled', {}],
  ])('useDefaultValue uses the latest change listener when %s', async (_, valueProps) => {
    const initialOnChange = vi.fn();
    const latestOnChange = vi.fn();
    const wrapper = mount(ValueControlHook, {
      props: { ...valueProps, hook: 'defaultValue', onChange: initialOnChange },
    });

    await wrapper.setProps({ onChange: latestOnChange });
    (wrapper.vm as unknown as { setValue: ChangeHandler }).setValue(1);

    expect(initialOnChange).not.toHaveBeenCalled();
    expect(latestOnChange).toHaveBeenCalledWith(1);
  });
});
