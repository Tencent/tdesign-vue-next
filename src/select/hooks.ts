import { computed, VNode } from 'vue';
import isArray from 'lodash/isArray';

import { useChildComponentSlots } from '../hooks/slot';
import { TdSelectProps, TdOptionProps } from './type';

export const useSelectOptions = (props: TdSelectProps) => {
  const getChildComponentSlots = useChildComponentSlots();

  const options = computed(() => {
    const { options = [] } = props;
    const childSlots = getChildComponentSlots('TOption');
    if (isArray(childSlots)) {
      for (const child of childSlots as VNode[]) {
        options.push({
          ...child.props,
          slots: child.children,
        } as TdOptionProps);
      }
    }
    return options as TdOptionProps[];
  });

  const optionsMap = computed(() => {
    const res: Record<string, string> = {};
    for (const option of options.value) {
      res[option.value] = option.label;
    }
    return res;
  });

  return {
    options,
    optionsMap,
  };
};
