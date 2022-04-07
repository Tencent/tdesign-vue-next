import { InjectionKey } from 'vue';
import { RadioValue } from './type';

export const RadioGroupInjectionKey: InjectionKey<{
  name: string;
  disabled: boolean;
  value: RadioValue;
  setValue: (value: RadioValue, context: { prevValue: RadioValue; e: Event }) => void;
}> = Symbol('RadioGroupProvide');

export const RadioButtonInjectionKey: InjectionKey<{}> = Symbol('RadioButtonProvide');
