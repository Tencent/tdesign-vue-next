import Vue, { VNode, PropType } from 'vue';
import { prefix } from '../config';
import Checkbox from './checkbox';

const name = `${prefix}-checkbox-group`;

interface OptionType {  value: string; label: VNode; disabled?: boolean }

export default Vue.extend({
  name,

  components: {
    Checkbox,
  },

  provide(): any {
    return {
      checkboxGroup: this,
    };
  },

  props: {
    value: { type: Array as PropType<Array<string>> },
    defaultValue: { type: Array },
    disabled: { type: Boolean, default: false },
    options: { type: Array as PropType<Array<OptionType>>, default: (): Array<OptionType>  => [] },
    name: String,
  },

  data() {
    const { value, defaultValue } = this;
    return {
      value2: value || defaultValue || [],
      valueList: [],
    };
  },

  watch: {
    value(nVal) {
      this.value2 = nVal;
    },
  },

  render(): VNode {
    const { $slots, value2 } = this;
    let children: VNode[] | VNode | string = $slots.default;

    if (this.options && this.options.length) {
      children = this.options.map((option: OptionType) => (
        <Checkbox
          key={`checkbox-group-options-${option.value}`}
          name={this.name}
          checked={value2.indexOf(option.value) > -1}
          disabled={'disabled' in option ? option.disabled : this.disabled}
          value={option.value}
        >
          {option.label}
        </Checkbox>
      ) as VNode);
    }

    return (
      <div class={name}>
        {children}
      </div>
    ) as VNode;
  },

  methods: {
    handleCheckboxChange(e: Event) {
      const value = [...this.value2];
      const target: HTMLInputElement = e.target as HTMLInputElement;
      const targetValue: string = target.value;
      const valueIndex: number = this.value2.indexOf(targetValue);
      if (valueIndex === -1) {
        value.push(targetValue);
      } else {
        value.splice(valueIndex, 1);
      }
      this.$emit('input', value);
      this.$emit('change', value);
      this.value2 = value;
    },
    addValue(value: any) {
      this.valueList = [...this.valueList, value];
    },
    delValue(value: any) {
      this.valueList = this.valueList.filter((val: any) => val !== value);
    },
  },
});
