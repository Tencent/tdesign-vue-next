import Vue, { VueConstructor, VNode } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import { omit } from '../utils/helper';

const name = `${prefix}-checkbox`;

function getValidAttrs(obj: object): object {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

interface CheckboxInstance extends Vue {
  checkboxGroup: any;
}

export default (Vue as VueConstructor<CheckboxInstance>).extend({
  name,
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'change',
  },

  inject: {
    checkboxGroup: { default: undefined },
  },

  // 引入自动生成的 props 文件，示例如下，
  // import props from '../../types/checkbox/props'
  // props: { ...props }
  props: {
    checked: { type: Boolean, default: undefined },
    defaultChecked: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: false },
    indeterminate: { type: Boolean, default: false },
    value: { type: [String, Number], default: undefined },
    name: String,
  },

  watch: {
    value(nVal, oVal) {
      const { checkboxGroup } = this;
      const { addValue, delValue } = checkboxGroup || {};
      if (addValue && delValue) {
        checkboxGroup.delValue(oVal);
        checkboxGroup.addValue(nVal);
      }
    },
  },

  beforeDestroy() {
    const { value, checkboxGroup = {} } = this;
    if (checkboxGroup.delValue) {
      checkboxGroup.delValue(value);
    }
  },

  render(): VNode {
    const { $attrs, $listeners, $scopedSlots, checkboxGroup } = this;
    const children: VNode[] | VNode | string = $scopedSlots.default && $scopedSlots.default(null);

    const inputProps = {
      checked: this.checked,
      disabled: this.disabled,
      indeterminate: this.indeterminate,
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

    if (checkboxGroup) {
      inputProps.checked = checkboxGroup.value && checkboxGroup.value.indexOf(this.value) > -1;
      inputProps.disabled = this.disabled === undefined ? checkboxGroup.disabled : this.disabled;
      inputProps.name = checkboxGroup.name;
    }

    const inputClass = [
      `${name}`,
      {
        [CLASSNAMES.STATUS.checked]: inputProps.checked,
        [CLASSNAMES.STATUS.disabled]: inputProps.disabled,
        [CLASSNAMES.STATUS.indeterminate]: inputProps.indeterminate,
      },
    ];

    const wrapperProps = {
      class: inputClass,
      attrs: $attrs,
      on: wrapperEvents,
    };

    return (
      <label { ...wrapperProps } >
        <input
          type="checkbox"
          class={`${name}__former`}
          { ...{ domProps: inputProps, on: {
            ...inputEvents,
            click: (evt: Event) => evt.stopPropagation(),
          } } }
          onChange={this.handleChange}
        />
        <span class={`${name}__input`}></span><span class={`${name}__label`}>
          {children || null}
        </span>
      </label>
    ) as VNode;
  },

  methods: {
    handleChange(e: Event) {
      const target: HTMLInputElement = e.target as HTMLInputElement;
      if (this.checkboxGroup && this.checkboxGroup.handleCheckboxChange) {
        this.checkboxGroup.handleCheckboxChange(this.value);
      } else {
        this.$emit('change', target.checked);
        this.$emit('input', e);
      }
    },
  },
});
