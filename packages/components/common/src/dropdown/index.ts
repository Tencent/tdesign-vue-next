import _DropdownItem from './dropdown-item';
import _Dropdown from './dropdown';
import _DropdownMenu from './dropdown-menu';
import { withInstall } from '@td/adapter-utils';
import { TdDropdownProps, TdDropdownItemProps } from '@td/intel/dropdown/type';

import './style';

export * from '@td/intel/dropdown/type';
export type DropdownProps = TdDropdownProps;
export type DropdownItemProps = TdDropdownItemProps;
export type DropdownMenuProps = TdDropdownProps;

export const Dropdown = withInstall(_Dropdown);
export const DropdownItem = withInstall(_DropdownItem);
export const DropdownMenu = withInstall(_DropdownMenu);

export default Dropdown;
