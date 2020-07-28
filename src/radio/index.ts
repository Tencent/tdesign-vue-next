import _Radio from './radio';
import _Group from './group';
import RadioButton from './radio-button';
import mapProps from '../utils/map-props';
import setInstallFn from '../utils/setInstallFn';

const Group = mapProps(['value'])(_Group);
const Radio = mapProps(['checked'], { model: { prop: 'checked', event: 'change' } })(_Radio);

setInstallFn('Radio', Radio);
setInstallFn('RadioGroup', Group);
setInstallFn('RadioButton', RadioButton);

export {
  Radio,
  Group,
  RadioButton,
};

export default Radio;
