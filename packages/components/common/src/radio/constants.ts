import type { InjectionKey } from '@td/adapter-vue';
import type { RadioValue } from '@td/components/radio/type';

export const RadioGroupInjectionKey: InjectionKey<{
  name: string;
  disabled: boolean;
  value: RadioValue;
  allowUncheck: boolean;
  setValue: (value: RadioValue, context: { e: Event }) => void;
}> = Symbol('RadioGroupProvide');

export const RadioButtonInjectionKey: InjectionKey<{}> = Symbol('RadioButtonProvide');
