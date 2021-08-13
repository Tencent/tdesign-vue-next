import { defineComponent, VNode } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import { omit } from '../utils/helper';
import props from './props';
import { RadioGroupInstance, RadioButtonInstance } from './instance-types';

const name = `${prefix}-radio`;
export const radioBtnName = `${prefix}-radio-button`;

function getValidAttrs(obj: Record<string, any>): Record<string, any> {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    radioGroup: RadioGroupInstance;
    radioButton: RadioButtonInstance;
  }
}

export default defineComponent({
  name,
  inject: {
    radioGroup: { default: undefined },
    radioButton: { default: undefined },
  },
  inheritAttrs: false,
  props: { ...props },
  emits: ['change'],
  methods: {
    handleChange(e: Event) {
      if (this.radioGroup && this.radioGroup.handleRadioChange) {
        this.radioGroup.handleRadioChange(this.value, { e });
      } else {
        const target = e.target as HTMLInputElement;
        this.$emit('change', target.checked, { e });
      }
    },
  },
  render(): VNode {
    const { $attrs, $slots, radioGroup, radioButton } = this;
    const children: VNode[] | VNode | string = $slots.default && $slots.default(null);

    const inputProps = {
      checked: this.checked,
      disabled: this.disabled,
      value: this.value,
      name: this.name,
    };

    const inputEvents = getValidAttrs({
      focus: $attrs.onFocus,
      blur: $attrs.onBlur,
      keydown: $attrs.onKeydown,
      keyup: $attrs.onKeyup,
      keypresss: $attrs.onKeypresss,
    });

    const events = [...Object.keys(inputEvents), 'input', 'change'].map(str => `on${str[0].toUpperCase()}${str.slice(1)}`);
    const wrapperAttrs = omit($attrs, events);

    if (radioGroup) {
      inputProps.checked = this.value === radioGroup.value;
      inputProps.disabled = this.disabled === undefined ? radioGroup.disabled : this.disabled;
      inputProps.name = radioGroup.name;
    }

    const prefixCls = radioButton ? radioBtnName : name;

    const inputClass = [
      `${prefixCls}`,
      {
        [CLASSNAMES.STATUS.checked]: inputProps.checked,
        [CLASSNAMES.STATUS.disabled]: inputProps.disabled,
      },
    ];

    return (
      <label class={inputClass} { ...wrapperAttrs }>
        <input
          type="radio"
          class={`${prefixCls}__former`}
          { ...inputEvents }
          { ...inputProps }
          onChange={this.handleChange}
        />
        <span class={`${prefixCls}__input`}></span>
        <span class={`${prefixCls}__label`}>{children}</span>
      </label>
    );
  },
});
