import { ComputedRef } from 'vue';
import { cloneDeep } from 'lodash-es';
import { TdSelectProps, TdOptionProps, SelectValue, SelectOption } from '../type';

export const getSingleContent = (
  isRemote: boolean,
  value: TdSelectProps['value'],
  keys: ComputedRef<TdSelectProps['keys']>,
  searchDisplayOptions: ComputedRef<TdOptionProps[]>,
  optionsMap: ComputedRef<Map<SelectValue<SelectOption>, TdOptionProps>>,
): string => {
  if (isRemote) {
    return searchDisplayOptions.value.filter((option) => option[keys.value.value as 'value'] === value)[0]?.label || '';
  }

  const option = optionsMap.value.get(value);
  return option?.label || value?.toString();
};

export const getMultipleContent = (
  isRemote: boolean,
  value: SelectValue[],
  keys: ComputedRef<TdSelectProps['keys']>,
  searchDisplayOptions: ComputedRef<TdOptionProps[]>,
  optionsMap: ComputedRef<Map<SelectValue<SelectOption>, TdOptionProps>>,
) => {
  const res = [];
  for (const iterator of value) {
    const resLabel = getSingleContent(isRemote, iterator, keys, searchDisplayOptions, optionsMap);
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
