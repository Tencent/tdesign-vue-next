import _DropdownItem from './dropdown-item';
import _Dropdown from './dropdown';
import _DropdownMenu from './dropdown-menu';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdDropdownProps } from './type';

import './style';

export * from './type';
export type DropdownProps = TdDropdownProps;

export const Dropdown: WithInstallType<typeof _Dropdown> = withInstall(_Dropdown);
export const DropdownItem: WithInstallType<typeof _DropdownItem> = withInstall(_DropdownItem);
export const DropdownMenu: WithInstallType<typeof _DropdownMenu> = withInstall(_DropdownMenu);

export default Dropdown;