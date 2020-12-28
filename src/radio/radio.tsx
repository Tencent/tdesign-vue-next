import Vue, { VueConstructor, VNode } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import { omit } from '../utils/helper';

const name = `${prefix}-radio`;

function getValidAttrs(obj: object): object {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

interface RadioInstance extends Vue {
  radioGroup: any;
}

export default (Vue as VueConstructor<RadioInstance>).extend({
  name,
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'change',
  },

  inject: {
    radioGroup: { default: undefined },
  },

  // 使用自动生成的 props 文件，代码示例如下：
  // import props from '../../types/radio/props'
  // props: { ...props }
  props: {
    className: { type: String },
    checked: { type: Boolean, default: undefined },
    defaultChecked: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: undefined },
    value: { default: undefined },
    name: String,
  },

  render(): VNode {
    const { $attrs, $listeners, $scopedSlots, radioGroup } = this;
    const children: VNode[] | VNode | string = $scopedSlots.default && $scopedSlots.default(null);

    const inputProps = {
      checked: this.checked,
      disabled: this.disabled,
      value: this.value as any,
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

    const prefixCls = this.className || `${name}`;

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
        <span class={`${prefixCls}__input`}></span><span class={`${prefixCls}__label`}>
          {children || null}
        </span>
      </label>
    ) as VNode;
  },

  methods: {
    handleChange(e: Event) {
      const target: HTMLInputElement = e.target as HTMLInputElement;
      if (this.radioGroup && this.radioGroup.handleRadioChange) {
        this.radioGroup.handleRadioChange(e);
      } else {
        this.$emit('change', target.checked);
        this.$emit('input', e);
      }
    },
  },
});
