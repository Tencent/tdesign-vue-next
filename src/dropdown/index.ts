import _DropdownItem from './dropdown-item';
import _Dropdown from './dropdown';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdDropdownProps } from './type';

export * from './type';
export type DropdownProps = TdDropdownProps;

export const Dropdown: WithInstallType<typeof _Dropdown> = withInstall(_Dropdown);
export const DropdownItem: WithInstallType<typeof _DropdownItem> = withInstall(_DropdownItem);

export default Dropdown;