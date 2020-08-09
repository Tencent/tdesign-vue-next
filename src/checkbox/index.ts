import _Checkbox from './checkbox';
import _Group from './group';
import mapProps from '../utils/map-props';
import setInstallFn from '../utils/setInstallFn';

const Checkbox = mapProps(['checked'], { model: { prop: 'checked', event: 'change' } })(_Checkbox);
const CheckboxGroup = mapProps(['value'])(_Group);

setInstallFn('Checkbox', Checkbox);
setInstallFn('CheckboxGroup', CheckboxGroup);

export { Checkbox, CheckboxGroup };
export default Checkbox;
