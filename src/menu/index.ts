import Menu from './menu.vue';
import HeadMenu from './head-menu.vue';
import Submenu from './submenu.vue';
import MenuItem from './menu-item.vue';
import setInstallFn from '../utils/setInstallFn';

setInstallFn('Menu', Menu);
setInstallFn('HeadMenu', HeadMenu);
setInstallFn('Submenu', Submenu);
setInstallFn('MenuItem', MenuItem);

export {
  Menu,
  HeadMenu,
  Submenu,
  MenuItem,
};
