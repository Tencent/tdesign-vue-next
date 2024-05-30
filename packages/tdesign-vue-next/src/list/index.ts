import { withInstall } from '@td/adapter-vue';
import _List from '@td/components-common/src/list/list';
import _ListItem from '@td/components-common/src/list/list-item';
import _ListItemMeta from '@td/components-common/src/list/list-item-meta';
import type { TdListItemMetaProps, TdListItemProps, TdListProps } from './type';

import '@td/components-common/src/list/style';

export * from './type';
export type ListProps = TdListProps;
export type ListItemProps = TdListItemProps;
export type ListItemMetaProps = TdListItemMetaProps;

export const List = withInstall(_List);
export const ListItem = withInstall(_ListItem);
export const ListItemMeta = withInstall(_ListItemMeta);
