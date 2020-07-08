import Radio from './radio';
import _Group from './group';
import RadioButton from './radio-button';
import mapProps from '../utils/map-props';

const Group = mapProps(['value'])(_Group);

export {
  Group,
  RadioButton,
};

export default mapProps(['checked'], { model: { prop: 'checked', event: 'change' } })(Radio);
