import { computed, Slots, VNode, ref } from 'vue';
import isArray from 'lodash/isArray';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

import { useChildComponentSlots } from '../hooks/slot';
import { TdSelectProps, TdOptionProps, SelectOptionGroup } from './type';

export const useSelectOptions = (props: TdSelectProps) => {
  const getChildComponentSlots = useChildComponentSlots();

  const options = computed(() => {
    let options = cloneDeep(props.options) || [];

    // 统一处理 keys,处理通用数据
    options = options.map((option, index) => {
      return {
        ...option,
        index,
        label: get(option, props.keys?.label || 'label'),
        value: get(option, props.keys?.value || 'value'),
      };
    });

    // 处理 slots
    const optionsSlots = getChildComponentSlots('TOption');
    const groupSlots = getChildComponentSlots('TOptionGroup');
    let dynamicIndex = options.length;
    if (isArray(groupSlots)) {
      for (const group of groupSlots as VNode[]) {
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
        options.push(groupOption);
      }
    }
    if (isArray(optionsSlots)) {
      for (const child of optionsSlots as VNode[]) {
        options.push({
          ...child.props,
          slots: child.children,
          index: dynamicIndex,
        } as TdOptionProps);
        dynamicIndex++;
      }
    }

    return options;
  });

  const optionsList = computed(() => {
    const res: TdOptionProps[] = [];
    const getOptionsList = (options: TdOptionProps[]) => {
      for (const option of options) {
        if ((option as SelectOptionGroup).group) {
          getOptionsList((option as SelectOptionGroup).children);
        }
        res.push(option);
      }
    };
    getOptionsList(options.value);
    return res;
  });

  const optionsMap = computed(() => {
    const res = new Map<TdOptionProps['value'], TdOptionProps>();
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
