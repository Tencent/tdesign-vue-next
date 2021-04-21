import _Checkbox from './checkbox';
import _Group from './group';
import mapProps from '../utils/map-props';
import setInstallFn from '../utils/setInstallFn';
import { TdCheckboxProps } from '@TdTypes/checkbox/TdCheckboxProps';

const Checkbox = mapProps([{
  name: 'checked', event: 'change',
}])(_Checkbox);

const CheckboxGroup = mapProps([{
  name: 'checked', event: 'change',
}])(_Group);

setInstallFn('Checkbox', Checkbox);
setInstallFn('CheckboxGroup', CheckboxGroup);

export type CheckboxProps = TdCheckboxProps;
export { Checkbox, CheckboxGroup };
export default Checkbox;
