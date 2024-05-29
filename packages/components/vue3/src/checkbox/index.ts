import { withInstall } from '@td/adapter-vue';
import type { TdCheckboxGroupProps, TdCheckboxProps } from '@td/intel/checkbox/type';
import _Checkbox from './checkbox';
import _Group from './group';

import './style';

export * from '@td/intel/checkbox/type';
export type CheckboxProps = TdCheckboxProps;
export type CheckboxGroupProps = TdCheckboxGroupProps;

export const Checkbox = withInstall(_Checkbox);
export const CheckboxGroup = withInstall(_Group);

export default Checkbox;
