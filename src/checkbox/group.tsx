import { defineComponent, provide, VNode, computed, h, reactive, watchEffect, ref, toRefs } from 'vue';
import intersection from 'lodash/intersection';
import Checkbox from './checkbox';
import props from './checkbox-group-props';
import { CheckboxOptionObj, TdCheckboxProps, CheckboxGroupValue } from './type';
import { CheckboxGroupInjectionKey } from './constants';

// hooks
import useVModel from '../hooks/useVModel';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TCheckboxGroup',
  props,

  setup(props, { slots }) {
    /** 样式 */
    const COMPONENT_NAME = usePrefixClass('checkbox-group');

    const { isArray } = Array;
    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const checkedMap = computed(() => {
      const map = {};
      if (isArray(innerValue.value)) {
        innerValue.value.forEach((item: string | number) => {
          map[item] = true;
        });
      }
      return map;
    });
    const optionList = ref<Array<CheckboxOptionObj>>([]);

    const intersectionLen = computed<number>(() => {
      const values = optionList.value.map((item) => item.value);
      if (isArray(innerValue.value)) {
        const n = intersection(innerValue.value, values);
        return n.length;
      }
      return 0;
    });

    const isCheckAll = computed<boolean>(() => {
      if (isArray(innerValue.value) && innerValue.value.length !== optionList.value.length - 1) {
        return false;
      }
      return intersectionLen.value === optionList.value.length - 1;
    });

    const indeterminate = computed<boolean>(
      () => !isCheckAll.value && intersectionLen.value < optionList.value.length && intersectionLen.value !== 0,
    );

    const maxExceeded = computed<boolean>(() => props.max !== undefined && innerValue.value.length === props.max);

    watchEffect(() => {
      if (!props.options) return [];
      optionList.value = props.options.map((item) => {
        let r: CheckboxOptionObj = {};
        if (typeof item !== 'object') {
          r = { label: String(item), value: item };
        } else {
          r = { ...item };
          r.disabled = r.disabled === undefined ? props.disabled : r.disabled;
        }
        return r;
      });
    });

    const getAllCheckboxValue = (): CheckboxGroupValue => {
      const val = new Set<TdCheckboxProps['value']>();
      for (let i = 0, len = optionList.value.length; i < len; i++) {
        const item = optionList.value[i];
        if (item.checkAll) continue;
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
      if (isArray(innerValue.value)) {
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
      } else {
        console.warn(`TDesign CheckboxGroup Warn: \`value\` must be an array, instead of ${typeof innerValue.value}`);
      }
    };

    const onCheckedChange = (p: { checked: boolean; checkAll: boolean; e: Event; option: TdCheckboxProps }) => {
      const { checked, checkAll, e } = p;
      if (checkAll) {
        onCheckAllChange(checked, { e });
      } else {
        handleCheckboxChange(p);
      }
    };

    const getOptionListBySlots = (nodes: VNode[]) => {
      const arr: Array<CheckboxOptionObj> = [];
      nodes?.forEach((node) => {
        const option = node.props as CheckboxOptionObj;
        if (option?.['check-all'] === '' || option?.['check-all'] === true) {
          option.checkAll = true;
        }
        option && arr.push(option);
      });
      return arr;
    };

    const renderLabel = (option: CheckboxOptionObj) => {
      if (typeof option.label === 'function') {
        return option.label(h);
      }
      return option.label;
    };

    // provide
    const { name, disabled } = toRefs(props);
    provide(
      CheckboxGroupInjectionKey,
      reactive({
        name,
        isCheckAll,
        checkedMap,
        maxExceeded,
        disabled,
        indeterminate,
        handleCheckboxChange,
        onCheckedChange,
      }),
    );

    return () => {
      let children = null;
      if (props.options?.length) {
        children = optionList.value?.map((option, index) => (
          <Checkbox key={`${option.value}${index}`} {...option} checked={checkedMap.value[option.value]}>
            {renderLabel(option)}
          </Checkbox>
        ));
      } else {
        const nodes = slots.default && slots.default(null);
        optionList.value = getOptionListBySlots(nodes);
        children = nodes;
      }
      return <div class={COMPONENT_NAME.value}>{children}</div>;
    };
  },
});
