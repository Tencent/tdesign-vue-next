import { InjectionKey, Ref } from 'vue';

export const LayoutInjectionKey: InjectionKey<{
  hasSide: Ref<boolean>;
  setHasSide: (value: boolean) => void;
}> = Symbol('layout');
