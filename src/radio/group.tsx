import { VNode, defineComponent, h } from 'vue';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import props from '../../types/radio-group/props';
import { RadioOptionObj, RadioOption, RadioValue } from '../../types/radio/TdRadioProps';
import { prefix } from '../config';
import Radio, { radioBtnName } from './radio';
import { TNodeReturnValue } from '../common';
import CLASSNAMES from '../utils/classnames';

const name = `${prefix}-radio-group`;

export default defineComponent({
  name,
  components: {
    Radio,
  },

  provide() {
    return {
      radioGroup: this,
    };
  },
  props: { ...props },

  emits: ['change'],

  data() {
    return {
      barStyle: {},
    };
  },

  watch: {
    value() {
      this.$nextTick(() => {
        this.calcBarStyle();
      });
    },
  },

  mounted() {
    this.calcBarStyle();
  },

  methods: {
    handleRadioChange(value: RadioValue, context: { e: Event }) {
      this.$emit('change', value, context);
    },
    calcBarStyle() {
      if (this.buttonStyle !== 'solid') return;

      const checkedRadio: HTMLElement = this.$el.querySelector(`.${radioBtnName}.${CLASSNAMES.STATUS.checked}`);
      if (!checkedRadio) return;
      const { offsetWidth, offsetLeft } = checkedRadio;
      this.barStyle = { width: `${offsetWidth}px`, left: `${offsetLeft}px` };
    },
  },

  render(): VNode {
    const { $slots } = this;
    let children: TNodeReturnValue = $slots.default && $slots.default(null);

    if (this.options && this.options.length) {
      children = (this.options).map((option: RadioOption) => {
        let opt = option as RadioOptionObj;
        if (isNumber(option) || isString(option)) {
          opt = { value: option, label: option.toString() };
        }
        return (
          <Radio
            key={`radio-group-options-${opt.value}-${Math.random()}`}
            name={this.name}
            checked={this.value === opt.value}
            disabled={'disabled' in opt ? opt.disabled : this.disabled}
            value={opt.value}
          >
            {typeof opt.label === 'function' ? opt.label(h) : opt.label}
          </Radio>
        );
      });
    }

    const groupClass = [
      `${name}`,
      `${name}-${this.buttonStyle}`,
      `${name}-${this.size}`,
    ];

    if (this.buttonStyle === 'solid') {
      children.push(<div style={this.barStyle} class={`${name}-${this.buttonStyle}-bg-block`}></div>);
    }

    return (
      <div class={groupClass}>
        {children}
      </div>
    );
  },
});
