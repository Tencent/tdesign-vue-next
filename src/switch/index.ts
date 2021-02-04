import _Switch from './switch';
import mapProps from '../utils/map-props';
import setInstallFn from '../utils/setInstallFn';

const Switch = mapProps(['value'], { model: { prop: 'value', event: 'change' } })(_Switch);

setInstallFn('Switch', Switch);

export { Switch };
export default Switch;
