import { InjectionKey } from 'vue';
import { TdCheckboxProps } from '@src/checkbox/type';

export const CheckboxGroupInjectionKey: InjectionKey<{
  name: string;
  isCheckAll: boolean;
  checkedMap: { [key: string | number]: boolean };
  maxExceeded: boolean;
  disabled: boolean;
  indeterminate: boolean;
  handleCheckboxChange: (data: { checked: boolean; e: Event; option: TdCheckboxProps }) => void;
  onCheckedChange: (p: { checked: boolean; checkAll: boolean; e: Event; option: TdCheckboxProps }) => void;
}> = Symbol('CheckboxGroupProvide');
