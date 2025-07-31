import { computed, Slots, Ref, ref } from 'vue';
import { get, omit, isArray, isFunction, uniqBy } from 'lodash-es';

import { useChildComponentSlots } from '@tdesign/shared-hooks';
import { TdSelectProps, TdOptionProps, SelectOptionGroup, SelectValue, SelectOption } from '../type';
import { KeysType } from '../../common';

type UniOption = (TdOptionProps | SelectOptionGroup) & {
  index?: number;
  slots?: Slots;
};

export const useSelectOptions = (
  props: TdSelectProps,
  keys: Ref<KeysType>,
  inputValue: Ref<string>,
  innerValue: Ref<SelectValue<SelectOption>>,
) => {
  const getChildComponentSlots = useChildComponentSlots();
  const optionsCache = ref<SelectOption[]>([]);

  const options = computed(() => {
    let dynamicIndex = 0;
    // 统一处理 keys,处理通用数据
    const innerOptions: UniOption[] =
      props.options?.map((option) => {
        const getFormatOption = (option: TdOptionProps) => {
          const { value, label, disabled } = keys.value;
          const restOption = omit(option, [value, label, disabled]) as Partial<TdOptionProps>;
          const res = {
            ...restOption,
            index: dynamicIndex,
            label: get(option, label),
            value: get(option, value),
            disabled: get(option, disabled) || false,
          };
          dynamicIndex++;
          return res;
        };
        if ((option as SelectOptionGroup).children) {
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
        const res = getChildComponentSlots('Option', group.children as Slots);
        if (!isArray(res)) continue;
        for (const child of res) {
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
        if ((option as SelectOptionGroup).children) {
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

  const filterMethods = (option: SelectOption) => {
    if (isFunction(props.filter)) {
      return props.filter(`${inputValue.value}`, option);
    }
    return option.label?.toLowerCase?.().indexOf(`${inputValue.value}`.toLowerCase()) > -1;
  };

  const searchOptions = ref<SelectOption[]>([]);

  const getSelectedOptions = (options: TdOptionProps[], selectValue: SelectValue[] | SelectValue) => {
    return options.filter((option) => {
      if (option.checkAll) return;
      if (isArray(selectValue)) return selectValue.includes(option.value);
      return selectValue === option.value;
    });
  };

  /**
   * @description 获取搜索结果选项
   * 这里通过记录所有时间选中的 options 来保证搜索结果中选中的选项不会被过滤掉
   */
  const searchDisplayOptions = computed(() => {
    const currentSelectedOptions = getSelectedOptions(optionsList.value, innerValue.value);
    searchOptions.value = uniqBy([...searchOptions.value, ...currentSelectedOptions], 'value');
    const searchSelectedOptions = getSelectedOptions(searchOptions.value, innerValue.value);

    return uniqBy([...searchSelectedOptions, ...optionsList.value], 'value');
  });

  const displayOptions = computed(() => {
    if (props.onSearch && props.filterable) return options.value; // 远程搜索时，不执行内部的过滤，不干预用户的自行处理，如输入首字母搜索中文的场景等

    if (!inputValue.value || !(props.filterable || isFunction(props.filter))) return options.value;

    let checkAllOption: SelectOption;

    let res: SelectOption[] = [];

    options.value.forEach((option) => {
      if ((option as SelectOptionGroup).children) {
        res.push({
          ...option,
          children: (option as SelectOptionGroup).children.filter(filterMethods),
        });
      }

      if ((option as TdOptionProps)?.checkAll === true) checkAllOption = option;

      if (filterMethods(option)) {
        res.push(option);
      }
    });

    if (!isFunction(props.filter)) {
      // 使用默认 filter，增加表现，调整全等项到首尾，避免全等项位于最后
      // inputValue: ab
      // options abcde, abcd, abc,  ab
      const exactMatch = res.filter((item) => item.label === inputValue.value);
      const fuzzyMatch = res.filter((item) => item.label !== inputValue.value);
      res = exactMatch.concat(fuzzyMatch);
    }

    return res.length && checkAllOption ? [checkAllOption, ...res] : res;
  });

  // 获取总计的option数量，包括children项
  const optionsListLength = computed(() => {
    let total = 0;
    options.value.forEach((option: SelectOptionGroup) => {
      if (option?.children) {
        total += option.children.length;
      } else {
        total++;
      }
    });
    return total;
  });

  return {
    options,
    optionsMap,
    optionsList,
    optionsCache,
    displayOptions,
    filterMethods,
    searchDisplayOptions,
    optionsListLength,
  };
};
