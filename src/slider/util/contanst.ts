import { ComputedRef, InjectionKey, Ref } from 'vue';

type SliderPropsInjectKey = InjectionKey<{
  max: number;
  min: number;
  step: number;
  dragging: Ref<boolean>;
  toggleDragging: (val: boolean) => void;
  precision: ComputedRef<number>;
  disabled: Ref<boolean>;
  resetSize: () => void;
  sliderSize: Ref<number>;
}>;
export const sliderPropsInjectKey: SliderPropsInjectKey = Symbol('sliderProps');
