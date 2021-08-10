import _Checkbox from './checkbox';
import _Group from './group';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdCheckboxProps } from './type';

const LocalCheckbox = mapProps([{
  name: 'checked', event: 'change', alias: ['modelValue'],
}])(_Checkbox);

const LocalCheckboxGroup = mapProps([{
  name: 'value', event: 'change', alias: ['modelValue'],
}])(_Group);

export const Checkbox : WithInstallType<typeof LocalCheckbox> = withInstall(LocalCheckbox);
export const CheckboxGroup : WithInstallType<typeof LocalCheckboxGroup> = withInstall(LocalCheckboxGroup);

export type CheckboxProps = TdCheckboxProps;
export default Checkbox;
