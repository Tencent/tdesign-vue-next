import Menu from './menu.vue';
import HeadMenu from './head-menu.vue';
import Submenu from './submenu.vue';
import MenuItem from './menu-item.vue';
import MenuGroup from './menu-group.vue';
import setInstallFn from '../utils/setInstallFn';

setInstallFn('Menu', Menu);
setInstallFn('HeadMenu', HeadMenu);
setInstallFn('Submenu', Submenu);
setInstallFn('MenuItem', MenuItem);
setInstallFn('MenuGroup', MenuGroup);

export {
  Menu,
  HeadMenu,
  Submenu,
  MenuItem,
  MenuGroup,
};
