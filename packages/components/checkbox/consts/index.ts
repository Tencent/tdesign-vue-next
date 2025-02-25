import { ComputedRef, InjectionKey } from 'vue';
import { TdCheckboxGroupProps, TdCheckboxProps } from '../type';

export interface CheckboxGroupInjectData {
  name?: string;
  isCheckAll: boolean;
  maxExceeded: boolean;
  disabled: boolean;
  readonly: boolean;
  indeterminate: boolean;
  checkedValues: TdCheckboxGroupProps['value'];
  handleCheckboxChange: (data: { checked: boolean; e: Event; option: TdCheckboxProps }) => void;
  onCheckedChange: (p: { checked: boolean; checkAll: boolean; e: Event; option: TdCheckboxProps }) => void;
}

export const CheckboxGroupInjectionKey: InjectionKey<ComputedRef<CheckboxGroupInjectData>> =
  Symbol('CheckboxGroupProvide');
