import _Menu from './menu.vue';
import _Submenu from './submenu.vue';
import _HeadMenu from './head-menu.vue';
import _MenuItem from './menu-item.vue';
import _MenuGroup from './menu-group.vue';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Menu: WithInstallType<typeof _Menu> = withInstall(_Menu);
const Submenu: WithInstallType<typeof _Submenu> = withInstall(_Submenu);
const HeadMenu: WithInstallType<typeof _HeadMenu> = withInstall(_HeadMenu);
const MenuItem: WithInstallType<typeof _MenuItem> = withInstall(_MenuItem);
const MenuGroup: WithInstallType<typeof _MenuGroup> = withInstall(_MenuGroup);

export {
  Menu,
  Submenu,
  HeadMenu,
  MenuItem,
  MenuGroup,
};
