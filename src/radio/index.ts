import Radio from './radio';
import _Group from './group';
import mapProps from '../utils/map-props';

export const Group = mapProps(['value'])(_Group);
export default mapProps(['checked'], { model: { prop: 'checked', event: 'change' } })(Radio);
