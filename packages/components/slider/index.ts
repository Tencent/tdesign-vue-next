import _Slider from './slider';
import _SliderButton from './slider-button';
import { withInstall } from '@tdesign/shared-utils';
import { TdSliderProps } from './type';

import './style';

export * from './type';

export type SliderProps = TdSliderProps;
export const Slider = withInstall(_Slider);
export const SliderButton = withInstall(_SliderButton);
export default Slider;
