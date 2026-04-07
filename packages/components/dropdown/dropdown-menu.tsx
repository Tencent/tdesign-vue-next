import { defineComponent, ref, onMounted, h, computed } from 'vue';
import { ChevronRightIcon as TdChevronRightIcon } from 'tdesign-icons-vue-next';
import DropdownItem from './dropdown-item';

import { DropdownOption } from './type';
import props from './props';
import TDivider from '../divider';
import { Popup } from '../popup';
import { useGlobalIcon, usePrefixClass, useTNodeJSX } from '@tdesign/shared-hooks';

import { TNode } from '../common';
import { isFunction } from 'lodash-es';

export default defineComponent({
  name: 'TDropdownMenu',
  props,
  setup(props) {
    const dropdownClass = usePrefixClass('dropdown');
    const dropdownMenuClass = usePrefixClass('dropdown__menu');
    const renderTNodeJSX = useTNodeJSX();
    const menuRef = ref<HTMLElement>();
    const isOverMaxHeight = ref(false);
    const { ChevronRightIcon } = useGlobalIcon({
      ChevronRightIcon: TdChevronRightIcon,
    });
    const panelTopContentHeight = ref(0);
    const validPanelTopContent = computed(() => !!renderTNodeJSX('panelTopContent'));

    const handleItemClick = (options: { data: DropdownOption; context: { e: MouseEvent } }) => {
      const { data, context } = options;
      data?.onClick?.(data, context);
      props.onClick?.(data, context);
    };

    onMounted(() => {
      const menuElement = menuRef.value;
      if (menuElement) {
        const menuChildren = menuElement.children;
        requestAnimationFrame(() => {
          if (validPanelTopContent.value) {
            const firstEl = menuChildren[0];
            const panelTopHeight = firstEl ? parseInt(getComputedStyle(firstEl)?.height, 10) : 0;
            panelTopContentHeight.value = panelTopHeight || 0;
          }
        });
        const menuHeight = menuChildren?.length * 30;
        if (menuHeight >= props.maxHeight) isOverMaxHeight.value = true;
      }
    });

    const getContent = (content: string | TNode) => {
      if (isFunction(content)) {
        return content(h);
      }
      return content;
    };

    // 处理options渲染的场景
    const renderOptions = (data: Array<DropdownOption>, deep: number) => {
      const arr: Array<unknown> = [];
      let renderContent;
      data.forEach?.((menu, idx) => {
        const optionItem = { ...(menu as DropdownOption) };

        if (optionItem.children) {
          optionItem.children = renderOptions(optionItem.children, deep + 1);

          // 当菜单溢出滚动时，所有层级的子菜单都用 Popup 定位（脱离 overflow 裁剪）
          if (isOverMaxHeight.value) {
            renderContent = (
              <div key={idx}>
                <Popup
                  trigger="hover"
                  placement={props.direction === 'left' ? 'left-top' : 'right-top'}
                  destroyOnClose={false}
                  overlayInnerClassName={[`${dropdownClass.value}__submenu`]}
                  overlayInnerStyle={{
                    position: 'relative',
                    display: 'flex',
                    maxHeight: `${props.maxHeight}px`,
                  }}
                  v-slots={{
                    content: () => <ul>{optionItem.children}</ul>,
                  }}
                >
                  <DropdownItem
                    style={optionItem.style}
                    class={[`${dropdownClass.value}__item`, `${dropdownClass.value}__item--suffix`, optionItem.class]}
                    value={optionItem.value}
                    theme={optionItem.theme}
                    active={optionItem.active}
                    prefixIcon={optionItem.prefixIcon}
                    disabled={optionItem.disabled}
                    minColumnWidth={props.minColumnWidth}
                    maxColumnWidth={props.maxColumnWidth}
                    isSubmenu={true}
                  >
                    <div class={`${dropdownClass.value}__item-content`}>
                      <span class={`${dropdownClass.value}__item-text`}>{getContent(optionItem.content)}</span>
                      <ChevronRightIcon class={`${dropdownClass.value}__item-direction`} size="16" />
                    </div>
                  </DropdownItem>
                </Popup>
                {optionItem.divider ? <TDivider /> : null}
              </div>
            );
          } else {
            // 非溢出模式：使用原有的 CSS absolute 定位
            renderContent = (
              <div key={idx} style={{ position: 'relative' }}>
                <DropdownItem
                  style={optionItem.style}
                  class={[`${dropdownClass.value}__item`, `${dropdownClass.value}__item--suffix`, optionItem.class]}
                  value={optionItem.value}
                  theme={optionItem.theme}
                  active={optionItem.active}
                  prefixIcon={optionItem.prefixIcon}
                  disabled={optionItem.disabled}
                  minColumnWidth={props.minColumnWidth}
                  maxColumnWidth={props.maxColumnWidth}
                  isSubmenu={true}
                >
                  <div class={`${dropdownClass.value}__item-content`}>
                    <span class={`${dropdownClass.value}__item-text`}>{getContent(optionItem.content)}</span>
                    <ChevronRightIcon class={`${dropdownClass.value}__item-direction`} size="16" />
                  </div>
                  <div
                    class={[
                      `${dropdownClass.value}__submenu-wrapper`,
                      {
                        [`${dropdownClass.value}__submenu-wrapper--${props.direction}`]: props.direction,
                      },
                    ]}
                    style={{
                      position: 'absolute',
                      top: '0px',
                    }}
                  >
                    <div
                      class={[
                        `${dropdownClass.value}__submenu`,
                        {
                          [`${dropdownClass.value}__submenu--disabled`]: optionItem.disabled,
                        },
                      ]}
                      style={{
                        position: 'static',
                        maxHeight: `${props.maxHeight}px`,
                      }}
                    >
                      <ul>{optionItem.children}</ul>
                    </div>
                  </div>
                </DropdownItem>
                {optionItem.divider ? <TDivider /> : null}
              </div>
            );
          }
        } else {
          renderContent = (
            <div key={idx}>
              <DropdownItem
                style={optionItem.style}
                class={[`${dropdownClass.value}__item`, optionItem.class]}
                value={optionItem.value}
                theme={optionItem.theme}
                active={optionItem.active}
                prefixIcon={optionItem.prefixIcon}
                disabled={optionItem.disabled}
                minColumnWidth={props.minColumnWidth}
                maxColumnWidth={props.maxColumnWidth}
                onClick={
                  optionItem.disabled || optionItem.children
                    ? () => null
                    : (_value: string | number | { [key: string]: any }, context: { e: MouseEvent }) =>
                        handleItemClick({ data: optionItem, context })
                }
              >
                <span class={`${dropdownClass.value}__item-text`}>{getContent(optionItem.content)}</span>
              </DropdownItem>
              {optionItem.divider ? <TDivider /> : null}
            </div>
          );
        }
        arr.push(renderContent);
      });
      return arr;
    };

    return () => {
      const panelTopContent = renderTNodeJSX('panelTopContent');
      const panelBottomContent = renderTNodeJSX('panelBottomContent');

      return (
        <div
          class={[
            dropdownMenuClass.value,
            `${dropdownMenuClass.value}--${props.direction}`,
            {
              [`${dropdownMenuClass.value}--overflow`]: isOverMaxHeight.value,
            },
          ]}
          style={{
            maxHeight: `${props.maxHeight}px`,
          }}
          ref={menuRef}
        >
          {panelTopContent ? <div class={`${dropdownClass.value}__top-content`}>{panelTopContent}</div> : null}
          {renderOptions(props.options, 0)}
          {panelBottomContent ? <div class={`${dropdownClass.value}__bottom-content`}>{panelBottomContent}</div> : null}
        </div>
      );
    };
  },
});
