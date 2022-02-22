import { VNode, defineComponent, h } from 'vue';
import intersection from 'lodash/intersection';
import { prefix } from '../config';
import Checkbox from './checkbox';
import checkboxGroupProps from './checkbox-group-props';
import { emitEvent } from '../utils/event';
import { CheckboxOptionObj, TdCheckboxProps, CheckboxGroupValue, TdCheckboxGroupProps } from './type';

const name = `${prefix}-checkbox-group`;

type CheckedChangeType = Parameters<TdCheckboxGroupProps['onChange']>;

export default defineComponent({
  name: 'TCheckboxGroup',
  components: {
    Checkbox,
  },
  provide(): { checkboxGroup: any } {
    return {
      checkboxGroup: this,
    };
  },
  props: { ...checkboxGroupProps },
  emits: ['change'],
  data() {
    return {
      checkedMap: {},
      optionList: [] as Array<CheckboxOptionObj>,
    };
  },
  computed: {
    values(): string {
      if (this.value instanceof Array) {
        return this.value.join();
      }
      return '';
    },
    intersectionLen(): number {
      const values = this.optionList.map((item) => item.value);
      if (this.value instanceof Array) {
        const n = intersection(this.value, values);
        return n.length;
      }
      return 0;
    },
    isCheckAll(): boolean {
      if (this.value instanceof Array && this.value.length !== this.optionList.length - 1) {
        return false;
      }
      return this.intersectionLen === this.optionList.length - 1;
    },
    indeterminate(): boolean {
      return !this.isCheckAll && this.intersectionLen < this.optionList.length && this.intersectionLen !== 0;
    },
    maxExceeded(): boolean {
      return this.max !== undefined && this.value.length === this.max;
    },
  },

  watch: {
    values: {
      immediate: true,
      handler() {
        if (this.value instanceof Array) {
          const map = {};
          this.value.forEach((item: string | number) => {
            map[item] = true;
          });
          this.checkedMap = map;
        }
      },
    },
    options: {
      immediate: true,
      handler() {
        if (!this.options) return [];
        this.optionList = this.options.map((item) => {
          let r: CheckboxOptionObj = {};
          if (typeof item !== 'object') {
            r = { label: String(item), value: item };
          } else {
            r = { ...item };
            r.disabled = r.disabled === undefined ? this.disabled : r.disabled;
          }
          return r;
        });
      },
    },
  },

  methods: {
    onCheckedChange(p: { checked: boolean; checkAll: boolean; e: Event; option: TdCheckboxProps }) {
      const { checked, checkAll, e } = p;
      if (checkAll) {
        this.onCheckAllChange(checked, { e });
      } else {
        this.handleCheckboxChange(p);
      }
    },
    getOptionListBySlots(nodes: VNode[]) {
      const arr: Array<CheckboxOptionObj> = [];
      nodes?.forEach((node) => {
        const option = node.props as CheckboxOptionObj;
        if (option?.['check-all'] === '' || option?.['check-all'] === true) {
          option.checkAll = true;
        }
        option && arr.push(option);
      });
      return arr;
    },
    renderLabel(option: CheckboxOptionObj) {
      if (typeof option.label === 'function') {
        return option.label(h);
      }
      return option.label;
    },
    emitChange(val: CheckboxGroupValue, context: CheckedChangeType[1]) {
      emitEvent<CheckedChangeType>(this, 'change', val, context);
    },
    handleCheckboxChange(data: { checked: boolean; e: Event; option: TdCheckboxProps }) {
      const currentValue = data.option.value;
      if (this.value instanceof Array) {
        const val = [...this.value];
        if (data.checked) {
          val.push(currentValue);
        } else {
          const i = val.indexOf(currentValue);
          val.splice(i, 1);
        }
        this.emitChange(val, {
          e: data.e,
          current: data.option.value,
          type: data.checked ? 'check' : 'uncheck',
        });
      } else {
        console.warn(`TDesign CheckboxGroup Warn: \`value\` must be an array, instead of ${typeof this.value}`);
      }
    },
    getAllCheckboxValue(): CheckboxGroupValue {
      const val = new Set<TdCheckboxProps['value']>();
      for (let i = 0, len = this.optionList.length; i < len; i++) {
        const item = this.optionList[i];
        if (item.checkAll) continue;
        val.add(item.value);
        if (this.maxExceeded) break;
      }
      return [...val];
    },
    onCheckAllChange(checked: boolean, context: { e: Event; source?: 't-checkbox' }) {
      const value: CheckboxGroupValue = checked ? this.getAllCheckboxValue() : [];
      this.emitChange(value, {
        e: context.e,
        type: checked ? 'check' : 'uncheck',
        current: undefined,
      });
    },
  },

  render(): VNode {
    let children = null;
    if (this.options?.length) {
      children = this.optionList?.map((option) => (
        <Checkbox key={option.value} {...option} checked={this.checkedMap[option.value]}>
          {this.renderLabel(option)}
        </Checkbox>
      ));
    } else {
      const nodes = this.$slots.default && this.$slots.default(null);
      this.optionList = this.getOptionListBySlots(nodes);
      children = nodes;
    }
    return <div class={name}>{children}</div>;
  },
});
