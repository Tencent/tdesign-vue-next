import Vue, { VueConstructor, VNode } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';

const name = `${prefix}-checkbox`;

function noop(): void {
  // noop function
}

interface CheckboxInstance extends Vue {
  checkboxGroup: any;
}

export default (Vue as VueConstructor<CheckboxInstance>).extend({
  name,
  model: {
    prop: 'checked',
  },

  components: {},

  inject: {
    checkboxGroup: { default: undefined },
  },

  props: {
    checked: { type: Boolean, default: undefined },
    defaultChecked: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: false },
    value: { type: String, default: undefined },
    name: String,
  },

  data() {
    return {
      checked2: this.checked,
    };
  },

  watch: {
    checked(nVal) {
      this.checked2 = nVal;
    },
    value(nVal, oVal) {
      const { addValue, delValue } = this.checkboxGroup || {};
      if (addValue && delValue) {
        delValue(oVal);
        addValue(nVal);
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
    const { $attrs, $listeners, $slots, checkboxGroup } = this;
    const children: VNode[] | VNode | string = $slots.default;
    const { mouseenter = noop, mousemove = noop, mouseleave = noop, ...restListeners } = $listeners;

    if (this.checked === undefined) this.checked2 = this.defaultChecked;

    const inputProps = {
      checked: this.checked2,
      disabled: this.disabled,
      value: this.value as any,
      name: this.name,
    };

    if (checkboxGroup) {
      inputProps.checked = checkboxGroup.value.indexOf(this.value) > -1;
      inputProps.disabled = this.disabled || checkboxGroup.disabled;
      inputProps.name = checkboxGroup.name;
    }

    const inputClass = [
      `${name}`,
      {
        [`${name}-checked`]: inputProps.checked,
        [CLASSNAMES.STATUS.disabled]: inputProps.disabled,
      },
    ];

    const wrapperProps = {
      class: inputClass,
      on: {
        mouseenter,
        mousemove,
        mouseleave,
      },
    };

    return (
      <label { ...wrapperProps } >
        <input
          type="checkbox"
          class={`${name}__former`}
          { ...{ domProps: inputProps, attrs: $attrs, on: restListeners } }
          onInput={this.handleInput}
        />
        <span class={`${name}__input`}></span><span class={`${name}__label`}>
          {children || null}
        </span>
      </label>
    ) as VNode;
  },

  methods: {
    handleInput(e: Event) {
      const { target } = e;
      this.$emit('change', e);
      if (this.checkboxGroup && this.checkboxGroup.handleCheckboxChange) {
        this.checkboxGroup.handleCheckboxChange(e);
      } else {
        this.$emit('input', (target as HTMLInputElement).checked);
      }
    },
  },
});
