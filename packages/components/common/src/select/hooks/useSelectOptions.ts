import { computed, Slots, VNode, Ref, ref } from 'vue';
import { isArray } from 'lodash-es';
import { get } from 'lodash-es';
import { isFunction } from 'lodash-es';

import { useChildComponentSlots } from '../../hooks/slot';
import { TdSelectProps, TdOptionProps, SelectOptionGroup, SelectValue, SelectOption } from '../type';
import { KeysType } from '../../common';

type UniOption = (TdOptionProps | SelectOptionGroup) & {
  index?: number;
  slots?: Slots;
};

export const useSelectOptions = (props: TdSelectProps, keys: Ref<KeysType>, inputValue: Ref<string>) => {
  const getChildComponentSlots = useChildComponentSlots();
  const optionsCache = ref<SelectOption[]>([]);

  const options = computed(() => {
    let dynamicIndex = 0;

    // 统一处理 keys,处理通用数据
    const innerOptions: UniOption[] =
      props.options?.map((option) => {
        const getFormatOption = (option: TdOptionProps) => {
          const { value, label, disabled } = keys.value;
          const res = {
            ...option,
            index: dynamicIndex,
            label: get(option, label),
            value: get(option, value),
            disabled: get(option, disabled),
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
      }) || [];

    // 处理 slots
    const optionsSlots = getChildComponentSlots('Option');
    const groupSlots = getChildComponentSlots('OptionGroup');

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
    // map以最新的为主 避免存在重复value更新的场景 https://github.com/Tencent/tdesign-vue-next/issues/2646
    optionsCache.value.concat(optionsList.value).forEach((option: TdOptionProps) => {
      res.set(option.value, option);
    });
    return res;
  });

  const displayOptions = computed(() => {
    if (props.onSearch && props.filterable) return options.value; // 远程搜索时，不执行内部的过滤，不干预用户的自行处理，如输入首字母搜索中文的场景等

    if (!inputValue.value || !(props.filterable || isFunction(props.filter))) return options.value;

    const filterMethods = (option: SelectOption) => {
      if (isFunction(props.filter)) {
        return props.filter(`${inputValue.value}`, option);
      }

      return option.label?.toLowerCase?.().indexOf(`${inputValue.value}`.toLowerCase()) > -1;
    };

    const res: SelectOption[] = [];

    options.value.forEach((option) => {
      if ((option as SelectOptionGroup).group && (option as SelectOptionGroup).children) {
        res.push({
          ...option,
          children: (option as SelectOptionGroup).children.filter(filterMethods),
        });
      }
      if (filterMethods(option)) {
        res.push(option);
      }
    });

    return res;
  });

  return {
    options,
    optionsMap,
    optionsList,
    optionsCache,
    displayOptions,
  };
};
