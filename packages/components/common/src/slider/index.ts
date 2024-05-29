import { withInstall } from '@td/adapter-vue';
import type { TdSliderProps } from '@td/intel/slider/type';
import _Slider from './slider';
import _SliderButton from './slider-button';

import './style';

export * from '@td/intel/slider/type';

export type SliderProps = TdSliderProps;
export const Slider = withInstall(_Slider);
export const SliderButton = withInstall(_SliderButton);
export default Slider;
