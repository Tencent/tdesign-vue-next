import Vue, { defineComponent, Component, VNode } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import { omit } from '../utils/helper';
import props from '@TdTypes/radio/props';
import { RadioGroupInstance, RadioButtonInstance } from './instance-types';

const name = `${prefix}-radio`;
export const radioBtnName = `${prefix}-radio-button`;

function getValidAttrs(obj: object): object {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

interface RadioInstance extends Component {
  radioGroup: RadioGroupInstance;
  radioButton: RadioButtonInstance;
}

export default defineComponent({
  name,
  inheritAttrs: false,
  props: { ...props },

  inject: {
    radioGroup: { default: undefined },
    radioButton: { default: undefined },
  },

  render(): VNode {
    const { $attrs, $listeners, $scopedSlots, radioGroup, radioButton } = this;
    const children: VNode[] | VNode | string = $scopedSlots.default && $scopedSlots.default(null);

    const inputProps = {
      checked: this.checked,
      disabled: this.disabled,
      value: this.value,
      name: this.name,
    };

    const inputEvents = getValidAttrs({
      focus: $listeners.focus,
      blur: $listeners.blur,
      keydown: $listeners.keydown,
      keyup: $listeners.keyup,
      keypresss: $listeners.keypresss,
    });

    const wrapperEvents = omit($listeners, [...Object.keys(inputEvents), 'input', 'change']);

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

    const wrapperProps = {
      class: inputClass,
      attrs: $attrs,
      on: wrapperEvents,
    };

    return (
      <label { ...wrapperProps }>
        <input
          type="radio"
          class={`${prefixCls}__former`}
          { ...{ domProps: inputProps, on: inputEvents } }
          onChange={this.handleChange}
        />
        <span class={`${prefixCls}__input`}></span>
        <span class={`${prefixCls}__label`}>{children}</span>
      </label>
    );
  },

  methods: {
    handleChange(e: Event) {
      if (this.radioGroup && this.radioGroup.handleRadioChange) {
        this.radioGroup.handleRadioChange(this.value, { e });
      } else {
        const target = e.target as HTMLInputElement;
        this.$emit('change', target.checked, { e });
        typeof this.onChange === 'function' && (this.onChange(target.checked, { e }));
      }
    },
  },
});
