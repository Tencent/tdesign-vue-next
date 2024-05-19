import type { InjectionKey } from '@td/adapter-vue';

type SliderPropsInjectKey = InjectionKey<{
  max: number;
  min: number;
  step: number;
  dragging: boolean;
  toggleDragging: (val: boolean) => void;
  precision: number;
  disabled: boolean;
  resetSize: () => void;
  sliderSize: number;
}>;
export const sliderPropsInjectKey: SliderPropsInjectKey = Symbol('sliderProps');
