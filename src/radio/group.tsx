import Vue, { VNode } from 'vue';
import props from '@TdTypes/radio-group/props';
import { RadioOptionObj, RadioOption, RadioValue } from '@TdTypes/radio/TdRadioProps';
import { prefix } from '../config';
import Radio from './radio';

const name = `${prefix}-radio-group`;

export default Vue.extend({
  name,
  props: { ...props },

  components: {
    Radio,
  },

  provide() {
    return {
      radioGroup: this,
    };
  },

  render(): VNode {
    const { $scopedSlots } = this;
    let children: TNodeReturnValue = $scopedSlots.default && $scopedSlots.default(null);

    if (this.options && this.options.length) {
      children = (this.options).map((option: RadioOption) => {
        let opt = option as RadioOptionObj;
        if (typeof option === 'number' || typeof option === 'string') {
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
            {opt.label}
          </Radio>
        );
      });
    }

    const groupClass = [
      `${name}`,
      `${name}-${this.buttonStyle}`,
      `${name}-${this.size}`,
    ];

    return (
      <div class={groupClass}>
        {children}
      </div>
    );
  },

  methods: {
    handleRadioChange(value: RadioValue, context: { e: Event }) {
      this.$emit('change', value, context);
      typeof this.onChange === 'function' && (this.onChange(value, context));
    },
  },
});
