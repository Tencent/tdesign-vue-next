import mapProps from '../utils/map-props';
import _Slider from './slider';
import _SliderButton from './slider-button';
import withInstall, { WithInstallType } from '../utils/withInstall';

import './style';

export * from './type';
const LocalSlider = mapProps([
  {
    name: 'value',
    event: 'change',
    alias: ['modelValue'],
  },
])(_Slider);

export const Slider: WithInstallType<typeof LocalSlider> = withInstall(LocalSlider);
export const SliderButton: WithInstallType<typeof _SliderButton> = withInstall(_SliderButton);
export default Slider;
