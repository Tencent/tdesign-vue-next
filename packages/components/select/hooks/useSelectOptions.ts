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
  innerValue: Ref<SelectValue[]>,
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

  const checkedAllOptionsList = ref<TdOptionProps[]>([]);

  const displayOptions = computed(() => {
    if (props.onSearch && props.filterable) {
      const getSelectedOptions = (selectValue: SelectValue[] | SelectValue = innerValue.value) => {
        return optionsList.value.filter((option) => {
          if (option.checkAll) return;
          if (isArray(selectValue)) return selectValue.includes(option.value);
          return selectValue === option.value;
        });
      };
      const checkedOptionsList = getSelectedOptions(innerValue.value);

      checkedAllOptionsList.value = uniqBy([...checkedAllOptionsList.value, ...checkedOptionsList], keys.value.value);

      // const getSelectedShowOptions = (selectValue: SelectValue[] | SelectValue = innerValue.value) => {
      //   return checkedAllOptionsList.value.filter((option) => {
      //     if (option.checkAll) return;
      //     if (isArray(selectValue)) return selectValue.includes(option.value);
      //     return selectValue === option.value;
      //   });
      // };
      // console.log('getSelectedShowOptions', getSelectedShowOptions(innerValue.value));

      // console.log(
      //   'checkedAllOptionsList',
      //   uniqBy([...checkedAllOptionsList.value, ...optionsList.value], keys.value.value),
      // );
      return uniqBy([...checkedAllOptionsList.value, ...optionsList.value], keys.value.value);
    }

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

  return {
    options,
    optionsMap,
    optionsList,
    optionsCache,
    displayOptions,
    filterMethods,
  };
};
