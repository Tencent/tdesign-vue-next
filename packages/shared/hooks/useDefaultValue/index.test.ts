import { mount } from '@vue/test-utils';
import { defineComponent, toRefs } from 'vue';
import type { PropType } from 'vue';

import { useDefaultValue } from './index';

type ChangeHandler = (value: number) => void;

const ValueControlHook = defineComponent({
  props: {
    value: Number,
    defaultValue: {
      type: Number,
      default: 0,
    },
    onChange: Function as PropType<ChangeHandler>,
  },
  setup(props, { expose }) {
    const { value, onChange } = toRefs(props);
    const [innerValue, setValue] = useDefaultValue(value, props.defaultValue, onChange, 'value');
    expose({ innerValue, setValue });
    return () => null;
  },
});

describe('useDefaultValue', () => {
  it.each([
    ['controlled', { value: 0 }],
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
