import type { ComputedRef, InjectionKey } from '@td/adapter-vue';
import { cloneDeep } from 'lodash-es';
import type { SelectOption, SelectValue, TdOptionProps, TdSelectProps } from '@td/components/select/type';

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

export function getSingleContent(value: TdSelectProps['value'], optionsMap: ComputedRef<Map<SelectValue<SelectOption>, TdOptionProps>>): string {
  const option = optionsMap.value.get(value);
  return option?.label || value?.toString();
}

export function getMultipleContent(value: SelectValue[], optionsMap: ComputedRef<Map<SelectValue<SelectOption>, TdOptionProps>>) {
  const res = [];
  for (const iterator of value) {
    const resLabel = getSingleContent(iterator, optionsMap);
    if (resLabel) {
      res.push(resLabel);
    }
  }
  return res;
}

export function getNewMultipleValue(innerValue: SelectValue[], optionValue: SelectValue) {
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
}
