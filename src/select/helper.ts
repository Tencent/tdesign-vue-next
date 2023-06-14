import { InjectionKey, ComputedRef } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import { TdSelectProps, TdOptionProps, SelectValue, SelectOption } from './type';

export const selectInjectKey: InjectionKey<
  ComputedRef<{
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
    popupContentRef: ComputedRef<HTMLElement>;
    indeterminate: boolean;
    isCheckAll: boolean;
    onCheckAllChange: (checked: boolean) => void;
    getSelectedOptions: (selectValue?: SelectValue[] | SelectValue) => TdOptionProps[];
    displayOptions: TdSelectProps['options'];
  }>
> = Symbol('selectProvide');

export const getSingleContent = (
  value: TdSelectProps['value'],
  optionsMap: ComputedRef<Map<SelectValue<SelectOption>, TdOptionProps>>,
): string => {
  const option = optionsMap.value.get(value);
  return option?.label || value?.toString();
};

export const getMultipleContent = (
  value: SelectValue[],
  optionsMap: ComputedRef<Map<SelectValue<SelectOption>, TdOptionProps>>,
) => {
  const res = [];
  for (const iterator of value) {
    const resLabel = getSingleContent(iterator, optionsMap);
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
