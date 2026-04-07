import { defineComponent, ref, onMounted, h, reactive, computed } from 'vue';
import { ChevronRightIcon as TdChevronRightIcon } from 'tdesign-icons-vue-next';
import DropdownItem from './dropdown-item';

import { DropdownOption } from './type';
import props from './props';
import TDivider from '../divider';
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
    const scrollTopMap = reactive<Record<string, number>>({});
    const itemHeight = ref(null);
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

    const handleScroll = (e: MouseEvent, deep: number) => {
      const { scrollTop } = e.target as HTMLElement;
      scrollTopMap[deep] = scrollTop;
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
      const dropdownItem = document.querySelector(`.${dropdownClass.value}__item`);
      if (dropdownItem) {
        itemHeight.value = dropdownItem.scrollHeight + 2;
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
        const onViewIdx = idx - Math.ceil(scrollTopMap[deep] / itemHeight.value);
        const renderIdx = onViewIdx >= 0 ? onViewIdx : idx;
        // 只有第一层子节点需要加上 panelTopContent 的高度
        const shouldCalcPanelTopContent = validPanelTopContent.value && deep > 0;

        if (optionItem.children) {
          optionItem.children = renderOptions(optionItem.children, deep + 1);
          renderContent = (
            <div key={idx}>
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
                    top: `${renderIdx * 30 + (shouldCalcPanelTopContent ? 0 : panelTopContentHeight.value)}px`,
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
                    onScroll={(e: MouseEvent) => handleScroll(e, deep + 1)}
                  >
                    <ul>{optionItem.children}</ul>
                  </div>
                </div>
              </DropdownItem>
              {optionItem.divider ? <TDivider /> : null}
            </div>
          );
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
                    : (value: string | number | { [key: string]: any }, context: { e: MouseEvent }) =>
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
          onScroll={(e: MouseEvent) => handleScroll(e, 0)}
        >
          {panelTopContent ? <div class={`${dropdownClass.value}__top-content`}>{panelTopContent}</div> : null}
          {renderOptions(props.options, 0)}
          {panelBottomContent ? <div class={`${dropdownClass.value}__bottom-content`}>{panelBottomContent}</div> : null}
        </div>
      );
    };
  },
});
