import _Checkbox from './checkbox';
import _Group from './group';
import mapProps from '../utils/map-props';
import setInstallFn from '../utils/setInstallFn';

const Group = mapProps(['value'])(_Group);
const Checkbox = mapProps(['checked'], { model: { prop: 'checked', event: 'change' } })(_Checkbox);

setInstallFn('Checkbox', Checkbox);
setInstallFn('CheckboxGroup', Group);

export { Group, Checkbox };
export default Checkbox;
