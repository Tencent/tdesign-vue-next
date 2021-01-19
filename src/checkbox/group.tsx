import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import Checkbox from './checkbox';
import checkboxGroupProps from '../../types/checkbox-group/props';
import { CheckboxOption, CheckboxValue, CheckboxOptionObj } from '@TdTypes/checkbox/TdCheckboxProps';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';

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

  render(h): VNode {
    const { $scopedSlots, value } = this;
    let children: VNode[] | VNode | string = $scopedSlots.default && $scopedSlots.default(null);

    if (this.options && this.options.length) {
      children = this.options.map((option: CheckboxOption) => {
        let itemValue: CheckboxValue;
        let label: string | TNode | TNodeReturnValue;
        let disabled: boolean;
        let name: string;

        if (isString(option) || isNumber(option)) {
          itemValue = option as CheckboxValue;
          label = String(option);
          ({ disabled, name } = this);
        } else {
          const checkboxOption = option as CheckboxOptionObj;
          ({ value: itemValue, label } = checkboxOption);
          if (typeof label === 'function') label = label(h);
          disabled = 'disabled' in checkboxOption ? checkboxOption.disabled : this.disabled;
          name = 'name' in checkboxOption ? checkboxOption.name : this.name;
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
        );
      });
    }

    return (
      <div class={name}>
        {children}
      </div>
    );
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
      if (typeof this.onChange === 'function') {
        this.onChange(value);
      }
    },
    addValue(value: any) {
      this.valueList = [...this.valueList, value];
    },
    delValue(value: any) {
      this.valueList = this.valueList.filter((val: any) => val !== value);
    },
  },
});
