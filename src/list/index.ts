import List from './list';
import ListItem from './list-item';
import ListItemMeta from './list-item-meta';
import setInstallFn from '../utils/setInstallFn';
import { TdListProps } from '@TdTypes/list/TdListProps';

setInstallFn('List', List);
setInstallFn('ListItem', ListItem);
setInstallFn('ListItemMeta', ListItemMeta);

export type ListProps = TdListProps;
export {
  List,
  ListItem,
  ListItemMeta,
};
