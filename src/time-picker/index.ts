import _TimePicker from './time-picker';
import setInstallFn from '../utils/setInstallFn';
import mapProps from '../utils/map-props';

const TimePicker = mapProps(['value'], { model: { prop: 'value', event: 'change' } })(_TimePicker);


setInstallFn('TimePicker', TimePicker);

export { TimePicker };
export default TimePicker;
