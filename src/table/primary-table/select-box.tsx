import { defineComponent } from 'vue';
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
    const {
      checked, indeterminate, type, checkProps, disabled,
    } = this;
    const props = {
      checked,
      ...checkProps,
      style: 'display: inline-block',
      indeterminate,
      type: inputType[type],
      disabled,
    };
    if (type === 'multiple') {
      return <Checkbox {...props} />;
    }
    return <Radio {...props} />;
  },
});
