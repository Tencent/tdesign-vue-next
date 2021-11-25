import { defineComponent, h } from 'vue';
import { Checkbox, CheckboxProps } from '../../checkbox';
import { Radio, RadioProps } from '../../radio';
import { prefix } from '../../config';

const inputType = {
  multiple: Checkbox,
  single: Radio,
};
type SelectionProps = RadioProps | CheckboxProps;

export default defineComponent({
  name: `${prefix}-select-box`,
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      validator: (value: string): boolean => ['multiple', 'single'].includes(value),
      default: 'multiple',
    },
    checkProps: {
      type: Object,
      default(): SelectionProps {
        return {};
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {};
  },
  render() {
    const { checked, indeterminate, type, checkProps, disabled, $attrs } = this;
    const props = {
      checked,
      indeterminate,
      disabled,
      ...checkProps,
      ...$attrs,
      ...{
        style: 'display: inline-block',
      },
    };
    return h(inputType[type], props);
  },
});
