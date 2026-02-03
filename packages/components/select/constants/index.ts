import { InjectionKey, ComputedRef } from 'vue';
import { TdSelectProps, TdOptionProps, SelectValue } from '../type';

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
    emitBlur: (e: MouseEvent | KeyboardEvent) => void;
  }>
> = Symbol('selectProvide');
