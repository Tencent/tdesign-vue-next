import _List from './list';
import _ListItem from './list-item';
import _ListItemMeta from './list-item-meta';
import { withInstall } from '@td/adapter-utils';
import type { TdListProps, TdListItemProps, TdListItemMetaProps } from '@td/intel/components/list/type';

import './style';

export * from '@td/intel/components/list/type';
export type ListProps = TdListProps;
export type ListItemProps = TdListItemProps;
export type ListItemMetaProps = TdListItemMetaProps;

export const List = withInstall(_List);
export const ListItem = withInstall(_ListItem);
export const ListItemMeta = withInstall(_ListItemMeta);
