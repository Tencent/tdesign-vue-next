import _Checkbox from './checkbox';
import _Group from './group';
import { withInstall } from '@td/adapter-utils';
import { TdCheckboxProps, TdCheckboxGroupProps } from '@td/intel/checkbox/type';

import './style';

export * from '@td/intel/checkbox/type';
export type CheckboxProps = TdCheckboxProps;
export type CheckboxGroupProps = TdCheckboxGroupProps;

export const Checkbox = withInstall(_Checkbox);
export const CheckboxGroup = withInstall(_Group);

export default Checkbox;
