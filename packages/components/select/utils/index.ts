import { ComputedRef } from 'vue';
import { cloneDeep } from 'lodash-es';
import { TdSelectProps, TdOptionProps, SelectValue, SelectOption } from '../type';

export const getSingleContent = (
  value: TdSelectProps['value'],
  isRemote: boolean,
  searchDisplayOptions: ComputedRef<TdOptionProps[]>,
  optionsMap: ComputedRef<Map<SelectValue<SelectOption>, TdOptionProps>>,
): string => {
  if (isRemote) {
    return searchDisplayOptions.value.filter((option) => option.value === value)[0]?.label || value?.toString();
  }

  const option = optionsMap.value.get(value);
  return option?.label || value?.toString();
};

export const getMultipleContent = (
  value: SelectValue[],
  isRemote: boolean,
  searchDisplayOptions: ComputedRef<TdOptionProps[]>,
  optionsMap: ComputedRef<Map<SelectValue<SelectOption>, TdOptionProps>>,
) => {
  const res = [];
  for (const iterator of value) {
    const resLabel = getSingleContent(iterator, isRemote, searchDisplayOptions, optionsMap);
    if (resLabel) {
      res.push(resLabel);
    }
  }
  return res;
};

export const getNewMultipleValue = (innerValue: SelectValue[], optionValue: SelectValue) => {
  const value = cloneDeep(innerValue) as SelectValue[];
  const valueIndex = value.indexOf(optionValue);
  if (valueIndex < 0) {
    value.push(optionValue);
  } else {
    value.splice(valueIndex, 1);
  }
  return {
    value,
    isCheck: valueIndex < 0,
  };
};
