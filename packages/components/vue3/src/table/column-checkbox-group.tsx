import { computed, defineComponent, PropType, toRefs } from '@td/adapter-vue';
import Checkbox, { CheckboxGroup, CheckboxGroupChangeContext, CheckboxGroupProps, CheckboxProps } from '../checkbox';
import { intersection } from 'lodash-es';
import { usePrefixClass } from '../hooks';

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

  setup(props: ColumnCheckboxGroupProps) {
    const { checkboxProps, value, options } = toRefs(props);
    const classPrefix = usePrefixClass();

    const allCheckedColumnKeys = computed(() => {
      const allCheckedKeys: CheckboxGroupProps['value'] = [];
      options.value.forEach((option) => {
        if (typeof option === 'object') {
          if (option.disabled) return;
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
      } else {
        const newKeys = value.value.filter((val) => !allCheckedColumnKeys.value.includes(val));
        props.onChange?.(newKeys, { ...changeParams, type: 'uncheck' });
      }
    };

    const handleCheckChange: CheckboxGroupProps['onChange'] = (val, ctx) => {
      props.onChange?.(val, ctx);
    };

    const classes = computed(() => [
      `${classPrefix.value}-table__column-controller-item`,
      {
        [`${classPrefix.value}-table__${props.uniqueKey}`]: props.uniqueKey,
      },
    ]);

    return () => {
      return (
        <div class={classes.value}>
          <div class={`${classPrefix.value}-table__column-controller-block`}>
            <Checkbox
              indeterminate={isIndeterminate.value}
              checked={isCheckedAll.value}
              onChange={onCheckAllColumnsChange}
              disabled={!allCheckedColumnKeys.value.length}
            >
              {props.label}
            </Checkbox>
          </div>
          <div class={`${classPrefix.value}-table__column-controller-block`}>
            <CheckboxGroup
              options={options.value}
              {...checkboxProps.value}
              modelValue={value.value}
              onChange={handleCheckChange}
            />
          </div>
        </div>
      );
    };
  },
});
