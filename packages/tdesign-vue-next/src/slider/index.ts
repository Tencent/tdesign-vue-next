import { withInstall } from '@td/adapter-vue';
import type { TdSliderProps } from './type';
import _Slider from '@td/components-common/src/slider/slider';
import _SliderButton from '@td/components-common/src/slider/slider-button';

import '@td/components-common/src/slider/style';

export * from './type';

export type SliderProps = TdSliderProps;
export const Slider = withInstall(_Slider);
export const SliderButton = withInstall(_SliderButton);
export default Slider;
