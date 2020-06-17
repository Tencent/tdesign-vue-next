import Vue, { VueConstructor, VNode } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';

const name = `${prefix}-radio`;

function noop(): void{
  // noop function
}

interface RadioInstance extends Vue {
  radioGroup: any;
}

export default (Vue as VueConstructor<RadioInstance>).extend({
  name,
  model: {
    prop: 'checked',
  },

  inject: {
    radioGroup: { default: undefined },
  },

  props: {
    checked: { type: Boolean, default: undefined },
    defaultChecked: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: false },
    value: { default: undefined },
    name: String,
  },

  data() {
    const getDefaultChecked2 = (checked: boolean, defaultChecked: boolean): boolean => {
      if (checked === undefined) {
        if (defaultChecked === undefined) return false;
        return defaultChecked;
      }
      return checked;
    };
    return {
      checked2: getDefaultChecked2(this.checked, this.defaultChecked),
    };
  },

  watch: {
    checked(nVal) {
      this.checked2 = nVal;
    },
  },

  render(): VNode {
    const { $attrs, $listeners, $slots, radioGroup } = this;
    const children: VNode[] | VNode | string = $slots.default;
    const { mouseenter = noop, mousemove = noop, mouseleave = noop, ...restListeners } = $listeners;

    const inputProps = {
      checked: this.checked2,
      disabled: this.disabled,
      value: this.value as any,
      name: this.name,
    };

    if (radioGroup) {
      inputProps.checked = this.value === radioGroup.value2;
      inputProps.disabled = this.disabled === undefined ? radioGroup.disabled : this.disabled;
      inputProps.name = radioGroup.name;
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
          type="radio"
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
      const target: HTMLInputElement = e.target as HTMLInputElement;
      if (this.radioGroup && this.radioGroup.handleRadioChange) {
        this.radioGroup.handleRadioChange(e);
      } else {
        this.$emit('input', target.checked);
        this.checked2 = target.checked;
      }
    },
  },
});
