import _List from './list';
import _ListItem from './list-item';
import _ListItemMeta from './list-item-meta';
import withInstall from '../utils/withInstall';
import { TdListProps, TdListItemProps, TdListItemMetaProps } from './type';

import './style';

export * from './type';
export type ListProps = TdListProps;
export type ListItemProps = TdListItemProps;
export type ListItemMetaProps = TdListItemMetaProps;

export const List = withInstall(_List);
export const ListItem = withInstall(_ListItem);
export const ListItemMeta = withInstall(_ListItemMeta);
