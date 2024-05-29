import { withInstall } from '@td/adapter-vue';
import type { TdListItemMetaProps, TdListItemProps, TdListProps } from '@td/intel/list/type';
import _List from './list';
import _ListItem from './list-item';
import _ListItemMeta from './list-item-meta';

import './style';

export * from '@td/intel/list/type';
export type ListProps = TdListProps;
export type ListItemProps = TdListItemProps;
export type ListItemMetaProps = TdListItemMetaProps;

export const List = withInstall(_List);
export const ListItem = withInstall(_ListItem);
export const ListItemMeta = withInstall(_ListItemMeta);
