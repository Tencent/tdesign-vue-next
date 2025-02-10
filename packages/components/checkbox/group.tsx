import { defineComponent, provide, computed, watchEffect, ref, toRefs } from 'vue';
import { intersection } from 'lodash-es';
import { isObject } from 'lodash-es';
import { isUndefined } from 'lodash-es';
import Checkbox from './checkbox';
import props from './checkbox-group-props';
import { CheckboxOptionObj, TdCheckboxProps, CheckboxGroupValue } from './type';
import { CheckboxGroupInjectionKey } from './constants';
import useVModel from '../hooks/useVModel';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';
import { useChildComponentSlots } from '../hooks/slot';

export default defineComponent({
  name: 'TCheckboxGroup',
  props,

  setup(props) {
    /** 样式 */
    const COMPONENT_NAME = usePrefixClass('checkbox-group');
    const renderTNodeJSX = useTNodeJSX();

    const { isArray } = Array;
    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const optionList = ref<Array<CheckboxOptionObj>>([]);

    const intersectionLen = computed<number>(() => {
      if (!isArray(innerValue.value)) return 0;
      const values = optionList.value.map((item) => item.value);
      const n = intersection(innerValue.value, values);
      return n.length;
    });

    /**
     * 计算是否所有选项都被选中。
     * 此函数不接受参数，但依赖于外部的 `optionList` 和 `innerValue` 变量。
     *
     * @returns {boolean} 如果所有符合条件的选项都被选中，则返回 `true`；否则返回 `false`。
     */
    const isCheckAll = computed<boolean>(() => {
      // 筛选出非禁用、非只读且不设置为“全选”的选项，并提取其值
      const optionItems = optionList.value
        .filter((item) => !item.disabled && !item.readonly && !item.checkAll)
        .map((t) => t.value);

      // 计算当前选中值与筛选后的选项值的交集
      const intersectionValues = intersection(optionItems, innerValue.value);

      // 判断交集的长度是否等于所有选项值的长度，以确定是否所有选项都被选中
      return intersectionValues.length === optionItems.length;
    });

    const indeterminate = computed<boolean>(
      () => !isCheckAll.value && intersectionLen.value < optionList.value.length && intersectionLen.value !== 0,
    );

    const maxExceeded = computed<boolean>(() => !isUndefined(props.max) && innerValue.value.length === props.max);

    watchEffect(() => {
      if (!props.options) return [];
      optionList.value = props.options.map((item) => {
        return isObject(item) ? item : { label: String(item), value: item };
      });
    });

    /**
     * 获取所有复选框的值。
     * 此函数遍历 `optionList` 中的项，忽略被标记为 `checkAll`、`disabled` 或 `readonly` 的项，
     * 并收集非这些状态的项的值到一个 Set 集合中。如果达到最大限制 `maxExceeded`，则停止遍历。
     *
     * @returns {CheckboxGroupValue} 返回一个数组，包含所有非 `checkAll`、`disabled`、`readonly` 状态复选框的值。
     */
    const getAllCheckboxValue = (): CheckboxGroupValue => {
      const val = new Set<TdCheckboxProps['value']>();

      // 遍历选项列表，忽略特定状态的项，并收集有效值
      for (let i = 0, len = optionList.value.length; i < len; i++) {
        const item = optionList.value[i];

        // 如果项被标记为检查所有、禁用或只读，则跳过当前循环迭代
        if (item.checkAll) continue;
        if (item.disabled) continue;
        if (item.readonly) continue;

        val.add(item.value); // 添加非排除状态项的值到集合中

        // 如果已达到最大限制，则终止循环
        if (maxExceeded.value) break;
      }

      return [...val]; // 从 Set 集合转换为数组并返回
    };

    const onCheckAllChange = (checked: boolean, context: { e: Event; source?: 't-checkbox' }) => {
      const value: CheckboxGroupValue = checked ? getAllCheckboxValue() : [];
      setInnerValue(value, {
        e: context.e,
        type: checked ? 'check' : 'uncheck',
        current: undefined,
        option: undefined,
      });
    };

    const handleCheckboxChange = (data: { checked: boolean; e: Event; option: TdCheckboxProps }) => {
      const currentValue = data.option.value;
      if (!isArray(innerValue.value)) {
        console.warn(`TDesign CheckboxGroup Warn: \`value\` must be an array, instead of ${typeof innerValue.value}`);
        return;
      }
      const val = [...innerValue.value];
      if (data.checked) {
        val.push(currentValue);
      } else {
        const i = val.indexOf(currentValue);
        val.splice(i, 1);
      }
      setInnerValue(val, {
        e: data.e,
        current: data.option.value,
        option: data.option,
        type: data.checked ? 'check' : 'uncheck',
      });
    };

    const onCheckedChange = (p: { checked: boolean; checkAll: boolean; e: Event; option: TdCheckboxProps }) => {
      const { checked, checkAll, e } = p;
      if (checkAll) {
        onCheckAllChange(checked, { e });
      } else {
        handleCheckboxChange(p);
      }
    };

    const getChildComponentSlots = useChildComponentSlots();

    const getOptionListBySlots = () => {
      const nodes = getChildComponentSlots('Checkbox');
      const arr: Array<CheckboxOptionObj> = [];
      nodes?.forEach((node) => {
        const option = node.props as CheckboxOptionObj;
        if (!option) return;
        // @ts-ignore types only declare checkAll not declare check-all
        if (option['check-all'] === '' || option['check-all'] === true) {
          option.checkAll = true;
        }
        arr.push(option);
      });
      return arr;
    };

    provide(
      CheckboxGroupInjectionKey,
      computed(() => ({
        name: props.name,
        isCheckAll: isCheckAll.value,
        checkedValues: innerValue.value || [],
        maxExceeded: maxExceeded.value,
        disabled: props.disabled,
        readonly: props.readonly,
        indeterminate: indeterminate.value,
        handleCheckboxChange,
        onCheckedChange,
      })),
    );

    return () => {
      let children = null;
      if (props.options?.length) {
        children = optionList.value?.map((option, index) => (
          <Checkbox
            key={`${option.value || ''}${index}`}
            lazyLoad={props.lazyLoad}
            {...option}
            index={index}
            checked={innerValue.value?.includes(option.value)}
            data={option}
          ></Checkbox>
        ));
      } else {
        const nodes = renderTNodeJSX('default');
        optionList.value = getOptionListBySlots();
        children = nodes;
      }
      return (
        <div class={COMPONENT_NAME.value} role="group" aria-label="checkbox-group">
          {children}
        </div>
      );
    };
  },
});
