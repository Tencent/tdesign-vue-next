import { defineComponent, VNode } from 'vue';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { omit } from '../utils/helper';
import props from './props';
import { emitEvent } from '../utils/event';
import { TdRadioProps } from './type';

// hooks
import { useFormDisabled } from '../form/hooks';

function getValidAttrs(obj: Record<string, any>): Record<string, any> {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

export default defineComponent({
  name: 'TRadio',
  inject: {
    radioGroup: { default: undefined },
    radioButton: { default: undefined },
  },
  inheritAttrs: false,
  props: { ...props },
  emits: ['change', 'click'],
  setup() {
    const disabled = useFormDisabled();
    const COMPONENT_NAME = usePrefixClass('radio');
    const radioBtnName = usePrefixClass('radio-button');
    const { STATUS } = useCommonClassName();
    return {
      STATUS,
      COMPONENT_NAME,
      radioBtnName,
      disabled,
    };
  },
  methods: {
    handleChange(e: Event) {
      if (this.radioGroup && this.radioGroup.handleRadioChange) {
        this.radioGroup.handleRadioChange(this.value, { e });
      } else {
        const target = e.target as HTMLInputElement;
        emitEvent(this, 'change', target.checked, { e });
      }
    },
    handleClick(e: Event) {
      this.$emit('click');
      if (!this.checked || !this.allowUncheck) return;
      if (this.radioGroup) {
        this.radioGroup.$emit('checked-change', undefined, { e });
      } else {
        emitEvent<Parameters<TdRadioProps['onChange']>>(this, 'change', false, { e });
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

    const events = [...Object.keys(inputEvents), 'input', 'change'].map(
      (str) => `on${str[0].toUpperCase()}${str.slice(1)}`,
    );
    const wrapperAttrs = omit($attrs, events);

    if (radioGroup) {
      inputProps.checked = this.value === radioGroup.value;
      inputProps.disabled = this.disabled === undefined ? radioGroup.disabled : this.disabled;
      inputProps.name = radioGroup.name;
    }

    const prefixCls = radioButton ? this.radioBtnName : this.COMPONENT_NAME;

    const inputClass = [
      `${prefixCls}`,
      {
        [this.STATUS.checked]: inputProps.checked,
        [this.STATUS.disabled]: inputProps.disabled,
      },
    ];

    return (
      <label class={inputClass} {...wrapperAttrs}>
        <input
          type="radio"
          class={`${prefixCls}__former`}
          {...inputEvents}
          {...inputProps}
          onChange={this.handleChange}
          onClick={this.handleClick}
        />
        <span class={`${prefixCls}__input`}></span>
        <span class={`${prefixCls}__label`}>{children}</span>
      </label>
    );
  },
});
