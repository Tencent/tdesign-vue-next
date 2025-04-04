import { InjectionKey } from 'vue';
import { RadioValue } from '../type';

export const RadioGroupInjectionKey: InjectionKey<{
  name: string;
  disabled: boolean;
  readonly: boolean;
  value: RadioValue;
  allowUncheck: boolean;
  setValue: (value: RadioValue, context: { e: Event; name?: string }) => void;
}> = Symbol('RadioGroupProvide');

export const RadioButtonInjectionKey: InjectionKey<{}> = Symbol('RadioButtonProvide');
