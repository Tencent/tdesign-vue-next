import { defineComponent, VNode, inject, ref } from 'vue';
import DropdownItem from './dropdown-item';
import { DropdownOption, TdDropdownItemProps } from './type';
import { TNodeReturnValue } from '../common';
import { pxCompat } from '../utils/helper';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';
import { injectKey } from './const';

export default defineComponent({
  name: 'TDropdownMenu',
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
      type: Number || String,
      default: 100,
    },
    minColumnWidth: {
      type: Number || String,
      default: 10,
    },
    onClick: Function,
  },
  setup(props, { slots }) {
    const path = ref('');
    const renderTNode = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('dropdown__menu');

    const dropdownProvider = inject(injectKey);
    const { maxHeight, maxColumnWidth, minColumnWidth } = dropdownProvider;

    const handleHoverItem = (p: string) => {
      path.value = p;
    };

    const handleItemClick = (
      data: DropdownOption,
      context: { e: MouseEvent },
      onClick: TdDropdownItemProps['onClick'],
    ) => {
      onClick?.(data, context);
      props.onClick?.(data, context);
    };

    const isActive = (item: DropdownOption, pathPrefix: string, excludeSelf = true): boolean => {
      const itemPath = `${pathPrefix}/${item.value}`;

      if (excludeSelf && path.value === itemPath) {
        return false;
      }
      return path.value.indexOf(itemPath) === 0;
    };

    const renderMenuColumn = (children: Array<DropdownOption>, showSubmenu: boolean, pathPrefix: string): VNode => {
      const menuClass = [`${COMPONENT_NAME.value}-column`, 'narrow-scrollbar', { submenu__visible: showSubmenu }];
      return (
        <div
          class={menuClass}
          style={{
            maxHeight: `${maxHeight}px`,
            maxWidth: pxCompat(maxColumnWidth),
            minWidth: pxCompat(minColumnWidth),
          }}
        >
          {children.map((item, idx) => {
            return (
              <DropdownItem
                key={idx}
                disabled={item.disabled}
                active={isActive(item, pathPrefix) || item.active}
                value={item.value}
                content={item.content}
                divider={item.divider}
                hasChildren={item.children && item.children.length > 0}
                path={`${pathPrefix}/${item.value}`}
                maxColumnWidth={maxColumnWidth}
                minColumnWidth={minColumnWidth}
                onHover={handleHoverItem}
                onClick={(data: DropdownOption, context: { e: MouseEvent }) =>
                  handleItemClick(data, context, item.onClick)
                }
              />
            );
          })}
        </div>
      );
    };

    return () => {
      const columns: TNodeReturnValue[] = [];
      let menuItems = props.options as DropdownOption[];
      let pathPrefix = '';

      if (slots.default) {
        return (
          <div class={COMPONENT_NAME.value}>
            <div
              class={[`${COMPONENT_NAME.value}-column`, 'narrow-scrollbar']}
              style={{
                maxHeight: `${maxHeight}px`,
                maxWidth: `${maxColumnWidth}px`,
                minWidth: `${minColumnWidth}px`,
              }}
            >
              {renderTNode('default')}
            </div>
          </div>
        );
      }

      while (menuItems && menuItems.length) {
        // eslint-disable-next-line no-loop-func
        const activeItem = menuItems.find((item) => isActive(item, pathPrefix, false));

        columns.push(renderMenuColumn(menuItems, !!activeItem, pathPrefix));

        if (activeItem) {
          pathPrefix = `${pathPrefix}/${activeItem.value}`;
          menuItems = activeItem.children || [];
        } else {
          menuItems = [];
        }
      }

      return <div class={COMPONENT_NAME.value}>{columns}</div>;
    };
  },
});
