import { computed, Slots, VNode, Ref } from 'vue';
import isArray from 'lodash/isArray';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

import { useChildComponentSlots } from '../hooks/slot';
import { TdSelectProps, TdOptionProps, SelectOptionGroup, SelectKeysType, SelectValue } from './type';

export const useSelectOptions = (props: TdSelectProps, keys: Ref<SelectKeysType>) => {
  const getChildComponentSlots = useChildComponentSlots();

  const options = computed(() => {
    let innerOptions = cloneDeep(props.options);
    let dynamicIndex = 0;

    // 统一处理 keys,处理通用数据
    innerOptions = innerOptions.map((option) => {
      const getFormatOption = (option: TdOptionProps) => {
        const { value, label } = keys.value;
        const res = {
          index: dynamicIndex,
          label: get(option, label),
          value: get(option, value),
        };
        dynamicIndex++;
        return res;
      };
      if ((option as SelectOptionGroup).group && (option as SelectOptionGroup).children) {
        return {
          ...option,
          children: (option as SelectOptionGroup).children.map((child) => getFormatOption(child)),
        };
      }
      return getFormatOption(option);
    });

    // 处理 slots
    const optionsSlots = getChildComponentSlots('TOption');
    const groupSlots = getChildComponentSlots('TOptionGroup');

    if (isArray(groupSlots)) {
      for (const group of groupSlots) {
        const groupOption = {
          group: group.props?.label,
          ...group.props,
          children: [] as TdOptionProps[],
        };
        const res = (group.children as Slots).default();
        if (!(isArray(res) && !!res[0]?.children)) continue;
        for (const child of res?.[0]?.children as VNode[]) {
          groupOption.children.push({
            ...child.props,
            slots: child.children,
            index: dynamicIndex,
          } as TdOptionProps);
          dynamicIndex++;
        }

        innerOptions.push(groupOption);
      }
    }
    if (isArray(optionsSlots)) {
      for (const child of optionsSlots) {
        innerOptions.push({
          ...child.props,
          slots: child.children,
          index: dynamicIndex,
        } as TdOptionProps);
        dynamicIndex++;
      }
    }

    return innerOptions;
  });

  const optionsList = computed(() => {
    const res: TdOptionProps[] = [];
    const getOptionsList = (options: TdOptionProps[]) => {
      for (const option of options) {
        if ((option as SelectOptionGroup).group) {
          getOptionsList((option as SelectOptionGroup).children);
        } else {
          res.push(option);
        }
      }
    };
    getOptionsList(options.value);
    return res;
  });

  const optionsMap = computed(() => {
    const res = new Map<SelectValue, TdOptionProps>();
    optionsList.value.forEach((option: TdOptionProps) => {
      res.set(option.value, option);
    });
    return res;
  });

  return {
    options,
    optionsMap,
    optionsList,
  };
};
