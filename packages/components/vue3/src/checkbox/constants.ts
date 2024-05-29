import type { ComputedRef, InjectionKey } from '@td/adapter-vue';
import type { TdCheckboxGroupProps, TdCheckboxProps } from '@td/components/checkbox/type';

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

export const CheckboxGroupInjectionKey: InjectionKey<ComputedRef<CheckboxGroupInjectData>>
  = Symbol('CheckboxGroupProvide');
