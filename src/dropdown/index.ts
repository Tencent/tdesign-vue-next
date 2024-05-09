import withInstall from '../utils/withInstall';

import _Dropdown from './dropdown';
import _DropdownItem from './dropdown-item';
import _DropdownMenu from './dropdown-menu';
import { TdDropdownProps, TdDropdownItemProps } from './type';

import './style';

export * from './type';
export type DropdownProps = TdDropdownProps;
export type DropdownItemProps = TdDropdownItemProps;
export type DropdownMenuProps = TdDropdownProps;

export const Dropdown = withInstall(_Dropdown);
export const DropdownItem = withInstall(_DropdownItem);
export const DropdownMenu = withInstall(_DropdownMenu);

export default Dropdown;
