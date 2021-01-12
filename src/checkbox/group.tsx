import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import Checkbox from './checkbox';
import checkboxGroupProps from '../../types/checkbox-group/props';
import { CheckboxOption, CheckboxValue } from '@TdTypes/checkbox/TdCheckboxProps';

const name = `${prefix}-checkbox-group`;

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

  props: { ...checkboxGroupProps },

  data() {
    return {
      valueList: [],
    };
  },

  render(): VNode {
    const { $scopedSlots, value } = this;
    let children: VNode[] | VNode | string = $scopedSlots.default && $scopedSlots.default(null);

    const isStringOrNumber = (target: any) => {
      const targetType = Object.prototype.toString.call(target);
      return ['[object String]', '[object Number]'].includes(targetType);
    };

    if (this.options && this.options.length) {
      children = this.options.map((option: CheckboxOption) => {
        let itemValue: CheckboxValue; let label: string | TNode; let disabled: boolean; let name: string;
        if (isStringOrNumber(option)) {
          itemValue = option as CheckboxValue;
          label = String(option);
          ({ disabled, name } = this);
        } else {
          const fixTypeOption = option as { label: string | TNode; value: CheckboxValue; disabled?: boolean; name?: string };
          ({ value: itemValue, label } = fixTypeOption);
          disabled = 'disabled' in fixTypeOption ? fixTypeOption.disabled : this.disabled;
          name = 'name' in fixTypeOption ? fixTypeOption.name : this.name;
        }
        return (
          <Checkbox
            key={`checkbox-group-options-${itemValue}`}
            name={name}
            checked={value && value.indexOf(itemValue) > -1}
            disabled={disabled}
            value={itemValue}
          >
            {label}
          </Checkbox>
        ) as VNode;
      });
    }

    return (
      <div class={name}>
        {children}
      </div>
    ) as VNode;
  },

  methods: {
    handleCheckboxChange(targetValue: string | number) {
      const value = this.value ? [...this.value] : [];
      const valueIndex: number = value.indexOf(targetValue);
      if (valueIndex === -1) {
        value.push(targetValue);
      } else {
        value.splice(valueIndex, 1);
      }
      this.$emit('input', value);
      this.$emit('change', value);
      this.onChange && this.onChange(value);
    },
    addValue(value: any) {
      this.valueList = [...this.valueList, value];
    },
    delValue(value: any) {
      this.valueList = this.valueList.filter((val: any) => val !== value);
    },
  },
});
