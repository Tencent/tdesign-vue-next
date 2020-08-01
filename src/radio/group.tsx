import Vue, { VNode, PropType } from 'vue';
import { prefix } from '../config';
import Radio from './radio';

const name = `${prefix}-radio-group`;

const sizeList: Array<string> = ['large', 'default', 'small'];
const buttonStyleList: Array<string> = ['outline', 'solid'];

interface OptionType {  value: string; label: VNode; disabled?: boolean }

export default Vue.extend({
  name,

  components: {
    Radio,
  },

  provide(): any {
    return {
      radioGroup: this,
    };
  },

  props: {
    value: { default: undefined },
    defaultValue: { default: undefined },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: 'default', validator(v: string) {
      return sizeList.indexOf(v) > -1;
    } },
    buttonStyle: { type: String, default: 'outline', validator(v: string) {
      return buttonStyleList.indexOf(v) > -1;
    } },
    options: { type: Array as PropType<Array<OptionType>>, default: (): Array<OptionType>  => [] },
    name: String,
  },

  render(): VNode {
    const { $scopedSlots } = this;
    let children: VNode[] | VNode | string = $scopedSlots.default && $scopedSlots.default(null);

    if (this.options && this.options.length) {
      children = this.options.map((option: OptionType) => (
        <Radio
          key={`radio-group-options-${option.value}`}
          name={this.name}
          checked={this.value === option.value}
          disabled={'disabled' in option ? option.disabled : this.disabled}
          value={option.value}
        >
          {option.label}
        </Radio>
      ) as VNode);
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
    ) as VNode;
  },

  methods: {
    handleRadioChange(e: Event) {
      const target: HTMLInputElement = e.target as HTMLInputElement;
      this.$emit('input', target.value);
      this.$emit('change', e);
    },
  },
});
