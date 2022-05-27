import _Slider from './slider';
import _SliderButton from './slider-button';
import withInstall from '../utils/withInstall';

import './style';

export * from './type';

export const Slider = withInstall(_Slider);
export const SliderButton = withInstall(_SliderButton);
export default Slider;
