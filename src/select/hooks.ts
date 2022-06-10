import { computed, Slots, VNode } from 'vue';
import isArray from 'lodash/isArray';
import get from 'lodash/get';
import isObject from 'lodash/isObject';

import { useChildComponentSlots } from '../hooks/slot';
import { TdSelectProps, TdOptionProps } from './type';

export const useSelectOptions = (props: TdSelectProps) => {
  const getChildComponentSlots = useChildComponentSlots();

  const options = computed(() => {
    let { options = [] } = props;

    // 统一处理 keys,处理通用数据
    if (isObject(props.keys)) {
      options = options.map((option) => {
        return {
          label: get(option, props.keys.label || 'label'),
          value: get(option, props.keys.value || 'value'),
        };
      });
    }

    // 处理 slots
    const optionsSlots = getChildComponentSlots('TOption');
    const groupSlots = getChildComponentSlots('TOptionGroup');
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
          } as TdOptionProps);
        }
        options.push(groupOption);
      }
    }
    if (isArray(optionsSlots)) {
      for (const child of optionsSlots as VNode[]) {
        options.push({
          ...child.props,
          slots: child.children,
        } as TdOptionProps);
      }
    }

    return options;
  });

  const optionsMap = computed(() => {
    const res = new Map<TdOptionProps['value'], TdOptionProps['label']>();
    options.value.forEach((option: TdOptionProps) => {
      res.set(option.value, option.label);
    });
    return res;
  });

  return {
    options,
    optionsMap,
  };
};
