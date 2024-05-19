import type { ComputedRef, InjectionKey }  from '@td/adapter-vue'
import type { TdCheckboxProps } from '@td/intel/components/checkbox/type';

export interface CheckboxGroupInjectData {
  handleCheckboxChange: (data: { checked: boolean; e: Event; option: TdCheckboxProps }) => void;
  onCheckedChange: (p: { checked: boolean; checkAll: boolean; e: Event; option: TdCheckboxProps }) => void;
}

export const CheckboxGroupInjectionKey: InjectionKey<ComputedRef<CheckboxGroupInjectData>> = Symbol('CheckboxGroupProvide');
