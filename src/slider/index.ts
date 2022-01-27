import mapProps from '../utils/map-props';
import _Slider from './slider';
import _SliderButton from './slider-button';
import withInstall from '../utils/withInstall';

import './style';

export const Slider = withInstall(
  mapProps([
    {
      name: 'value',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(_Slider),
);

export const SliderButton = withInstall(_SliderButton);
export default Slider;
