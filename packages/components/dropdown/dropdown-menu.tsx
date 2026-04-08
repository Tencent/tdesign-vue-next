import { defineComponent, h } from 'vue';
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
    const { ChevronRightIcon } = useGlobalIcon({
      ChevronRightIcon: TdChevronRightIcon,
    });

    // 提升为常量，避免每次 render 重新创建对象，防止 Popup 内部 watch 触发不必要的 destroyPopper+updatePopper
    const submenuPopperOptionsLeft = { modifiers: [{ name: 'flip', enabled: false }] };

    const handleItemClick = (options: { data: DropdownOption; context: { e: MouseEvent } }) => {
      const { data, context } = options;
      data?.onClick?.(data, context);
      props.onClick?.(data, context);
    };

    const getContent = (content: string | TNode) => {
      if (isFunction(content)) {
        return content(h);
      }
      return content;
    };

    // 处理options渲染的场景
    const renderOptions = (data: Array<DropdownOption>): Array<unknown> => {
      return (
        data?.map((menu, idx) => {
          const optionItem = { ...(menu as DropdownOption) };

          if (optionItem.children) {
            optionItem.children = renderOptions(optionItem.children);

            // 统一使用 Popup 定位子菜单，避免被父容器 overflow 裁剪
            // direction="left" 时禁用 flip modifier，确保子菜单始终向左展开，不被 popperjs 自动翻转到右侧
            return (
              <div key={idx}>
                <Popup
                  trigger="hover"
                  placement={props.direction === 'left' ? 'left-top' : 'right-top'}
                  destroyOnClose={false}
                  popperOptions={props.direction === 'left' ? submenuPopperOptionsLeft : undefined}
                  overlayInnerClassName={[
                    `${dropdownClass.value}__submenu`,
                    { [`${dropdownClass.value}__submenu--disabled`]: optionItem.disabled },
                  ]}
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
          }

          return (
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
                  optionItem.disabled
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
        }) ?? []
      );
    };

    return () => {
      const panelTopContent = renderTNodeJSX('panelTopContent');
      const panelBottomContent = renderTNodeJSX('panelBottomContent');

      return (
        <div
          class={[dropdownMenuClass.value, `${dropdownMenuClass.value}--${props.direction}`]}
          style={{
            maxHeight: `${props.maxHeight}px`,
          }}
        >
          {panelTopContent ? <div class={`${dropdownClass.value}__top-content`}>{panelTopContent}</div> : null}
          {renderOptions(props.options)}
          {panelBottomContent ? <div class={`${dropdownClass.value}__bottom-content`}>{panelBottomContent}</div> : null}
        </div>
      );
    };
  },
});
