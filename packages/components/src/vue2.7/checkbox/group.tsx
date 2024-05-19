import {
  defineComponent, provide, computed, watchEffect, ref, toRefs, watch, nextTick, onMounted, getCurrentInstance,
}  from '@td/adapter-vue'
import type { VNode } from "@td/adapter-vue";
import { intersection, isObject, isUndefined, isArray }  from 'lodash-es';
import Checkbox from './checkbox';
import props from '@td/intel/components/checkbox/checkbox-group-props';
import type { CheckboxOptionObj, TdCheckboxProps, CheckboxGroupValue } from '@td/intel/components/checkbox/type';
import { CheckboxGroupInjectionKey } from './constants';
import { usePrefixClass, useVModel, useChildComponentSlots } from '@td/adapter-hooks';
import { createCheckboxStore } from './store';

export default defineComponent({
  name: 'TCheckboxGroup',
  props,
  setup(props, { slots }) {
    /** 样式 */
    const COMPONENT_NAME = usePrefixClass('checkbox-group');

    const { checkboxStore, storeKey } = createCheckboxStore();
    checkboxStore.init();

    const { value, disabled, name, options } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, value, props.defaultValue, props.onChange);

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

    watch([disabled, maxExceeded, name], ([disabled, maxExceeded, checkboxName]) => {
      checkboxStore.updateCheckbox({ disabled, maxExceeded, checkboxName });
    });

    watch([options], () => {
      nextTick(() => {
        checkboxStore.updateCheckbox({
          disabled: disabled.value,
          maxExceeded: maxExceeded.value,
          checkboxName: name.value,
        });
      });
    });

    onMounted(() => {
      checkboxStore.updateCheckbox({
        disabled: disabled.value,
        maxExceeded: maxExceeded.value,
        checkboxName: name.value,
      });
    });

    watchEffect(() => {
      if (!props.options) return [];
      optionList.value = props.options.map((item) => (isObject(item) ? item : { label: String(item), value: item }));
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
        const option = node.componentOptions.propsData as CheckboxOptionObj;
        if (!option) return;
        if (option['check-all'] === '' || option['check-all'] === true) {
          option.checkAll = true;
        }
        arr.push(option);
      });
      return arr;
    };

    /**
     * do not use provide/inject variables. it will cause performance problems.
     * using store.ts for variables instead.
     * 请勿使用 provide/inject 提供变量数据传递，如：name/isCheckAll/checkedValues/disabled/maxExceeded/indeterminate，这位造成组件性能问题。
     */
    provide(
      CheckboxGroupInjectionKey,
      computed(() => ({
        handleCheckboxChange,
        onCheckedChange,
      })),
    );

    watch(
      () => [...innerValue.value],
      (val, oldValue) => {
        nextTick(() => {
          checkboxStore.updateChecked({
            checked: val,
            oldChecked: oldValue,
            isCheckAll: isCheckAll.value,
            indeterminate: indeterminate.value,
          });
        });
      },
      { immediate: true },
    );

    watch([isCheckAll, indeterminate, options], ([isCheckAll, indeterminate]) => {
      nextTick(() => {
        checkboxStore.updateChecked({
          checked: innerValue.value,
          isCheckAll,
          indeterminate,
        });
      });
    });

    const addStoreKeyToCheckbox = (nodes: VNode[]) => {
      if (!nodes) return;
      for (let i = 0, len = nodes.length; i < len; i++) {
        const vNode = nodes[i];
        if (vNode.componentOptions && /TCheckbox/.test(vNode.tag)) {
          (vNode.componentOptions.propsData as any).storeKey = storeKey;
        }
        if (vNode.children?.length) {
          addStoreKeyToCheckbox(vNode.children);
        }
      }
    };

    return () => {
      let children = null;

      if (options?.value?.length) {
        children = optionList.value?.map((option, index) => (
          <Checkbox
            // @ts-ignore
            key={option.value ?? index}
            lazyLoad={props.lazyLoad}
            {...option}
            index={index}
            data={option}
            checked={innerValue.value?.includes(option.value) || false}
            storeKey={storeKey}
            scopedSlots={slots}
          ></Checkbox>
        ));
      } else {
        const nodes = slots.default?.(null);
        optionList.value = getOptionListBySlots();
        addStoreKeyToCheckbox(nodes);
        children = nodes;
      }
      
      return (
        <div class={COMPONENT_NAME.value} role="group" aria-label="checkbox-group">
          {children}
        </div>
      );
    }
  }
});
