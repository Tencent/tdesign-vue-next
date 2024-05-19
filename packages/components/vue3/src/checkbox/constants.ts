import { ComputedRef, InjectionKey } from 'vue';
import { TdCheckboxGroupProps, TdCheckboxProps } from '@td/intel/../../vue3/src/checkbox/type';

export interface CheckboxGroupInjectData {
  name?: string;
  isCheckAll: boolean;
  maxExceeded: boolean;
  disabled: boolean;
  indeterminate: boolean;
  checkedValues: TdCheckboxGroupProps['value'];
  handleCheckboxChange: (data: { checked: boolean; e: Event; option: TdCheckboxProps }) => void;
  onCheckedChange: (p: { checked: boolean; checkAll: boolean; e: Event; option: TdCheckboxProps }) => void;
}

export const CheckboxGroupInjectionKey: InjectionKey<ComputedRef<CheckboxGroupInjectData>> =
  Symbol('CheckboxGroupProvide');
