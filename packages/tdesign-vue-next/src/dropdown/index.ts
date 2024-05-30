import { withInstall } from '@td/adapter-vue';
import type { TdDropdownItemProps, TdDropdownProps } from './type';
import _DropdownItem from '@td/components-common/src/dropdown/dropdown-item';
import _Dropdown from '@td/components-common/src/dropdown/dropdown';
import _DropdownMenu from '@td/components-common/src/dropdown/dropdown-menu';

import '@td/components-common/src/dropdown/style';

export * from './type';
export type DropdownProps = TdDropdownProps;
export type DropdownItemProps = TdDropdownItemProps;
export type DropdownMenuProps = TdDropdownProps;

export const Dropdown = withInstall(_Dropdown);
export const DropdownItem = withInstall(_DropdownItem);
export const DropdownMenu = withInstall(_DropdownMenu);

export default Dropdown;
