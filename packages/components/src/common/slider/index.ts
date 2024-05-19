import type { TdSliderProps } from '@td/intel/components/slider/type';
import { withInstall } from '@td/adapter-utils';
import _Slider from './slider';
import _SliderButton from './slider-button';

import './style';

export * from '@td/intel/components/slider/type';

export type SliderProps = TdSliderProps;
export const Slider = withInstall(_Slider);
export const SliderButton = withInstall(_SliderButton);
export default Slider;
