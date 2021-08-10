import _List from './list';
import _ListItem from './list-item';
import _ListItemMeta from './list-item-meta';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdListProps, TdListItemProps, TdListItemMetaProps } from './type';

export * from './type';

export type ListProps = TdListProps;
export type ListItemProps = TdListItemProps;
export type ListItemMetaProps = TdListItemMetaProps;

export const List: WithInstallType<typeof _List> = withInstall(_List);
export const ListItem: WithInstallType<typeof _ListItem> = withInstall(_ListItem);
export const ListItemMeta: WithInstallType<typeof _ListItemMeta> = withInstall(_ListItemMeta);
