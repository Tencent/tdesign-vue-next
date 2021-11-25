import { defineComponent, VNode } from 'vue';
import DropdownItem from './dropdown-item';
import { prefix } from '../config';
import { DropdownOption } from './type';
import { TNodeReturnValue } from '../common';

const name = `${prefix}-dropdown__menu`;

export default defineComponent({
  name: `${prefix}-dropdown-menu`,
  components: {
    DropdownItem,
  },
  inject: {
    dropdown: {
      default: undefined,
    },
  },
  props: {
    options: {
      type: Array,
      default: (): [] => [],
    },
    maxHeight: {
      type: Number,
      default: 300,
    },
    maxColumnWidth: {
      type: Number,
      default: 100,
    },
    minColumnWidth: {
      type: Number,
      default: 10,
    },
  },
  emits: ['click'],
  data() {
    return {
      path: '', // 当前选中路径，形如{/id1/id2/id3}
    };
  },
  methods: {
    isActive(item: DropdownOption, pathPrefix: string, excludeSelf = true): boolean {
      const itemPath = `${pathPrefix}/${item.value}`;
      if (excludeSelf && this.path === itemPath) {
        return false;
      }
      return this.path.indexOf(itemPath) === 0;
    },
    handleHoverItem(path: string) {
      this.path = path;
    },
    handleItemClick(data: DropdownOption, context: { e: MouseEvent }, idx: number) {
      (this.options as DropdownOption[])[idx].onClick?.(data, context);
      this.$emit('click', data, context);
    },
    renderMenuColumn(children: Array<DropdownOption>, showSubmenu: boolean, pathPrefix: string): VNode {
      const menuClass = [`${name}__column`, 'narrow-scrollbar', { submenu__visible: showSubmenu }];
      return (
        <div
          class={menuClass}
          style={{
            maxHeight: `${this.maxHeight}px`,
            maxWidth: `${this.dropdown.maxColumnWidth}px`,
            minWidth: `${this.dropdown.minColumnWidth}px`,
          }}
        >
          {children.map((item, idx) => (
            <DropdownItem
              key={idx}
              disabled={item.disabled}
              active={this.isActive(item, pathPrefix) || item.active}
              value={item.value}
              content={item.content}
              divider={item.divider}
              hasChildren={item.children && item.children.length > 0}
              path={`${pathPrefix}/${item.value}`}
              maxColumnWidth={this.maxColumnWidth}
              minColumnWidth={this.minColumnWidth}
              onClick={(data: DropdownOption, context: { e: MouseEvent }) => this.handleItemClick(data, context, idx)}
              onHover={this.handleHoverItem}
            />
          ))}
        </div>
      );
    },
  },
  render() {
    const columns: TNodeReturnValue[] = [];
    let menuItems = this.options as DropdownOption[];
    let pathPrefix = '';
    // 根据path渲染
    while (menuItems && menuItems.length) {
      // eslint-disable-next-line no-loop-func
      const activeItem = menuItems.find((item) => this.isActive(item, pathPrefix, false));

      columns.push(this.renderMenuColumn(menuItems, !!activeItem, pathPrefix));

      if (activeItem) {
        pathPrefix = `${pathPrefix}/${activeItem.value}`;
        menuItems = activeItem.children || [];
      } else {
        menuItems = [];
      }
    }
    return <div class={name}>{columns}</div>;
  },
});
