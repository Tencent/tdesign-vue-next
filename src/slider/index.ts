import _Slider from './slider';
import _SliderButton from './slider-button';
import withInstall, { WithInstallType } from '../utils/withInstall';

import './style';

export * from './type';

export const Slider: WithInstallType<typeof _Slider> = withInstall(_Slider);
export const SliderButton: WithInstallType<typeof _SliderButton> = withInstall(_SliderButton);
export default Slider;
