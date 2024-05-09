import { defineComponent, provide, computed, watchEffect, ref, toRefs } from 'vue';

import intersection from 'lodash/intersection';
import isObject from 'lodash/isObject';
import isUndefined from 'lodash/isUndefined';

import { useChildComponentSlots } from '../hooks/slot';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';
import useVModel from '../hooks/useVModel';

import Checkbox from './checkbox';
import props from './checkbox-group-props';
import { CheckboxGroupInjectionKey } from './constants';
import { CheckboxOptionObj, TdCheckboxProps, CheckboxGroupValue } from './type';

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

    const isCheckAll = computed<boolean>(() => {
      const optionItems = optionList.value.filter((item) => !item.disabled && !item.checkAll).map((t) => t.value);
      const intersectionValues = intersection(optionItems, innerValue.value);
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

    const getAllCheckboxValue = (): CheckboxGroupValue => {
      const val = new Set<TdCheckboxProps['value']>();
      for (let i = 0, len = optionList.value.length; i < len; i++) {
        const item = optionList.value[i];
        if (item.checkAll) continue;
        if (item.disabled) continue;
        val.add(item.value);
        if (maxExceeded.value) break;
      }
      return [...val];
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
