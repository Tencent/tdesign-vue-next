import _List from './list';
import _ListItem from './list-item';
import _ListItemMeta from './list-item-meta';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdListProps } from '../../types/list/TdListProps';

const List: WithInstallType<typeof _List> = withInstall(_List);
const ListItem: WithInstallType<typeof _ListItem> = withInstall(_ListItem);
const ListItemMeta: WithInstallType<typeof _ListItemMeta> = withInstall(_ListItemMeta);

export type ListProps = TdListProps;
export {
  List,
  ListItem,
  ListItemMeta,
};
