import { ComputedRef, InjectionKey } from 'vue';
import { TdButtonGroupProps } from './button-group-type';

export interface ButtonGroupInjectData {
  theme: TdButtonGroupProps['theme'];
  size: TdButtonGroupProps['size'];
  disabled: boolean;
}

export const ButtonGroupInjectionKey: InjectionKey<ComputedRef<ButtonGroupInjectData>> = Symbol('ButtonGroupProvide');
