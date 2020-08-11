import List from './list.vue';
import ListItem from './list-item.vue';
import ListItemMeta from './list-item-meta.vue';
import setInstallFn from '../utils/setInstallFn';

setInstallFn('List', List);
setInstallFn('ListItem', ListItem);
setInstallFn('ListItemMeta', ListItemMeta);

export {
  List,
  ListItem,
  ListItemMeta,
};
