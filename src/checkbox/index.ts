import _Checkbox from './checkbox';
import _Group from './group';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdCheckboxProps } from './type';

import './style';

export * from './type';
export type CheckboxProps = TdCheckboxProps;

export const Checkbox: WithInstallType<typeof _Checkbox> = withInstall(_Checkbox);
export const CheckboxGroup: WithInstallType<typeof _Group> = withInstall(_Group);

export default Checkbox;
