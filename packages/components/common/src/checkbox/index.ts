import _Checkbox from './checkbox';
import _Group from './group';
import withInstall from '../utils/withInstall';
import { TdCheckboxProps, TdCheckboxGroupProps } from './type';

import './style';

export * from './type';
export type CheckboxProps = TdCheckboxProps;
export type CheckboxGroupProps = TdCheckboxGroupProps;

export const Checkbox = withInstall(_Checkbox);
export const CheckboxGroup = withInstall(_Group);

export default Checkbox;
