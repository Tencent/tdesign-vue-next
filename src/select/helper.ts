import { InjectionKey, ComputedRef, Slots } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import { TdSelectProps, TdOptionProps, SelectValue, SelectOption, SelectOptionGroup } from './type';

export const selectInjectKey: InjectionKey<
  ComputedRef<{
    slots: Slots;
    hoverIndex: number;
    selectValue: TdSelectProps['value'];
    size: TdSelectProps['size'];
    max: TdSelectProps['max'];
    reserveKeyword: TdSelectProps['reserveKeyword'];
    multiple: TdSelectProps['multiple'];
    handleValueChange: TdSelectProps['onChange'];
    handleCreate: TdSelectProps['onCreate'];
    handlerInputChange: TdSelectProps['onInputChange'];
    handlePopupVisibleChange: TdSelectProps['onPopupVisibleChange'];
  }>
> = Symbol('selectProvide');

export const getSingleContent = (value: TdSelectProps['value'], options: SelectOption[]): string => {
  for (const option of options) {
    if ((option as SelectOptionGroup).children) {
      return getSingleContent(value, (option as SelectOptionGroup).children);
    }
    if ((option as TdOptionProps).value === value) {
      return option?.label;
    }
  }
  return value as string;
};

export const getMultipleContent = (value: SelectValue[], options: SelectOption[]) => {
  const res = [];
  for (const iterator of value) {
    const resLabel = getSingleContent(iterator, options);
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
