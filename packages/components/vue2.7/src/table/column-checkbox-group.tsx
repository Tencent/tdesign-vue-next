import type { PropType } from '@td/adapter-vue';
import {
  computed,
  defineComponent,
  toRefs,
} from '@td/adapter-vue';
import { intersection } from 'lodash-es';
import { usePrefixClass } from '@td/adapter-hooks';
import type { CheckboxGroupChangeContext, TdCheckboxGroupProps as CheckboxGroupProps, TdCheckboxProps as CheckboxProps } from '@td/intel/checkbox/type';
import { Checkbox, CheckboxGroup } from '@td/component';

export type ColumnCheckboxGroupProps = Pick<CheckboxGroupProps, 'value' | 'onChange' | 'options'> & {
  checkboxProps: CheckboxGroupProps;
  label?: string;
  uniqueKey?: string;
};

export default defineComponent({
  name: 'ColumnCheckboxGroup',

  props: {
    checkboxProps: Object as PropType<ColumnCheckboxGroupProps['checkboxProps']>,
    options: {
      type: Array as PropType<ColumnCheckboxGroupProps['options']>,
      default: () => [] as ColumnCheckboxGroupProps['options'],
    },
    label: String,
    uniqueKey: String,
    value: Array as PropType<ColumnCheckboxGroupProps['value']>,
    onChange: Function as PropType<ColumnCheckboxGroupProps['onChange']>,
  },

  setup(props: ColumnCheckboxGroupProps, context) {
    const { value, options } = toRefs(props);
    const classPrefix = usePrefixClass();

    const allCheckedColumnKeys = computed(() => {
      const allCheckedKeys: CheckboxGroupProps['value'] = [];
      options.value.forEach((option) => {
        if (typeof option === 'object') {
          if (option.disabled) {
            return;
          }
          if (option.value) {
            allCheckedKeys.push(option.value);
          } else if (typeof option.label === 'string') {
            allCheckedKeys.push(option.label);
          }
        } else {
          allCheckedKeys.push(option);
        }
      });
      return allCheckedKeys;
    });

    const intersectionKeys = computed(() => intersection(allCheckedColumnKeys.value, value.value));

    const isCheckedAll = computed(() => {
      const len = intersectionKeys.value.length;
      return Boolean(len && allCheckedColumnKeys.value.length === len);
    });

    const isIndeterminate = computed(() => {
      const len = intersectionKeys.value.length;
      return Boolean(len < allCheckedColumnKeys.value.length && len);
    });

    const onCheckAllColumnsChange: CheckboxProps['onChange'] = (checkAll, ctx) => {
      const changeParams: CheckboxGroupChangeContext = {
        e: ctx.e,
        type: 'check',
        current: undefined,
        option: undefined,
      };
      if (checkAll) {
        const newKeys = [...new Set(value.value.concat(allCheckedColumnKeys.value))];
        props.onChange?.(newKeys, changeParams);
        context.emit('change', newKeys, changeParams);
      } else {
        const newKeys = value.value.filter(val => !allCheckedColumnKeys.value.includes(val));
        props.onChange?.(newKeys, { ...changeParams, type: 'uncheck' });
        context.emit('change', newKeys, { ...changeParams, type: 'uncheck' });
      }
    };

    const handleCheckChange: CheckboxGroupProps['onChange'] = (val, ctx) => {
      props.onChange?.(val, ctx);
      context.emit('change', val, ctx);
    };

    const classes = computed(() => [
      `${classPrefix.value}-table__column-controller-item`,
      {
        [`${classPrefix.value}-table__${props.uniqueKey}`]: props.uniqueKey,
      },
    ]);

    return {
      classes,
      classPrefix,
      isIndeterminate,
      isCheckedAll,
      allCheckedColumnKeys,
      onCheckAllColumnsChange,
      handleCheckChange,
    };
  },

  render() {
    return (
      <div class={this.classes}>
        <div class={`${this.classPrefix}-table__column-controller-block`}>
          <Checkbox
            indeterminate={this.isIndeterminate}
            checked={this.isCheckedAll}
            on={{ change: this.onCheckAllColumnsChange }}
            disabled={!this.allCheckedColumnKeys.length}
          >
            {this.label}
          </Checkbox>
        </div>
        <div class={`${this.classPrefix}-table__column-controller-block`}>
          <CheckboxGroup
            options={this.options}
            {...(this.checkboxProps as object)}
            value={this.value}
            on={{
              change: this.handleCheckChange,
            }}
          />
        </div>
      </div>
    );
  },
});
