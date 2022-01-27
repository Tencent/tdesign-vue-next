import _DropdownItem from './dropdown-item';
import _Dropdown from './dropdown';
import _DropdownMenu from './dropdown-menu';
import withInstall from '../utils/withInstall';
import { TdDropdownProps } from './type';

import './style';

export * from './type';
export type DropdownProps = TdDropdownProps;

export const Dropdown = withInstall(_Dropdown);
export const DropdownItem = withInstall(_DropdownItem);
export const DropdownMenu = withInstall(_DropdownMenu);

export default Dropdown;
