import Vue from 'vue';
import DropdownItem from './dropdown-item';
import bus from './bus';
import { prefix } from '../config';

const name = `${prefix}-dropdown__menu`;

interface OptionItem {
  disabled: boolean;
  id: string | number; // 不能含有‘/’字符
  text: string;
  iconName: string;
  topSplit: boolean;
  children: OptionItem[];
}

export default Vue.extend({
  name,
  props: {
    busId: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: (): [] => [],
    },
    maxColumnHeight: Number,
    maxItemWidth: Number,
    minItemWidth: Number,
  },
  data() {
    return {
      path: '', // 当前选中路径，形如{/id1/id2/id3}
    };
  },
  methods: {
    isActive(item: OptionItem, pathPrefix: string, excludeSelf = true): boolean {
      const itemPath = `${pathPrefix}/${item.id}`;
      if (excludeSelf && this.path === itemPath) {
        return false;
      }
      return this.path.indexOf(itemPath) === 0;
    },
    renderMenuColumn(children: Array<OptionItem>, showSubmenu: boolean, pathPrefix: string): JsxNode {
      return (
        <div class={`${name}__column ${showSubmenu ? 'submenu__visible' : ''}`} style={{
          maxHeight: `${this.maxColumnHeight}px`,
        }}>
          {
            children.map((item => (
              <DropdownItem
                busId={this.busId}
                disabled={item.disabled}
                active={this.isActive(item, pathPrefix)}
                id={item.id}
                text={item.text}
                iconName={item.iconName}
                topSplit={item.topSplit}
                hasChildren={item.children && item.children.length > 0}
                path={`${pathPrefix}/${item.id}`}
                maxItemWidth={this.maxItemWidth}
                minItemWidth={this.minItemWidth}
              />
            )))
          }
        </div>
      );
    },
  },
  mounted() {
    bus.$on(`${this.busId}submenuShow`, (path: string) => {
      // console.log(path);
      this.path = path;
    });
    bus.$on(`${this.busId}clearPath`, () => {
      this.path = '';
    });
  },
  render() {
    const columns: JsxNode[] = [];
    let menuItems = this.options as OptionItem[];
    let pathPrefix = '';
    // 根据path渲染
    while (menuItems && menuItems.length) {
      // eslint-disable-next-line
      const activeItem = menuItems.find(item => this.isActive(item, pathPrefix, false));

      columns.push(this.renderMenuColumn(menuItems, !!activeItem, pathPrefix));

      if (activeItem) {
        pathPrefix = `${pathPrefix}/${activeItem.id}`;
        menuItems = activeItem.children || [];
      } else {
        menuItems = [];
      }
    }
    // console.log(columns);
    return (
      <div class={name}>
        { columns }
      </div>
    );
  },
});
