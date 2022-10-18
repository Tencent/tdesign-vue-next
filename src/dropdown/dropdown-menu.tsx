import { defineComponent } from 'vue';
import { ChevronRightIcon as TdChevronRightIcon, ChevronLeftIcon as TdChevronLeftIcon } from 'tdesign-icons-vue-next';
import DropdownItem from './dropdown-item';

import { DropdownOption } from './type';
import DropdownProps from './props';
import TDivider from '../divider';
import { usePrefixClass } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';

export default defineComponent({
  name: 'TDropdownMenu',
  props: { ...DropdownProps },
  setup(props) {
    const dropdownClass = usePrefixClass('dropdown');
    const dropdownMenuClass = usePrefixClass('dropdown__menu');

    const { ChevronRightIcon, ChevronLeftIcon } = useGlobalIcon({
      ChevronRightIcon: TdChevronRightIcon,
      ChevronLeftIcon: TdChevronLeftIcon,
    });

    const handleItemClick = (options: { data: DropdownOption; context: { e: MouseEvent } }) => {
      const { data, context } = options;
      data?.onClick?.(data, context);
      props.onClick?.(data, context);
    };

    // 处理options渲染的场景
    const renderOptions = (data: Array<DropdownOption>) => {
      const arr: Array<unknown> = [];
      let renderContent;
      data.forEach?.((menu, idx) => {
        const optionItem = { ...(menu as DropdownOption) };

        if (optionItem.children) {
          optionItem.children = renderOptions(optionItem.children);
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
                  {props.direction === 'right' ? (
                    <>
                      <span class={`${dropdownClass.value}__item-text`}>{optionItem.content}</span>
                      <ChevronRightIcon class={`${dropdownClass.value}__item-direction`} size="16" />
                    </>
                  ) : (
                    <>
                      <ChevronLeftIcon class={`${dropdownClass.value}__item-direction`} size="16" />
                      <span class={`${dropdownClass.value}__item-text`}>{optionItem.content}</span>
                    </>
                  )}
                </div>
                <div
                  class={[
                    `${dropdownClass.value}__submenu`,
                    {
                      [`${dropdownClass.value}__submenu--disabled`]: optionItem.disabled,
                      [`${dropdownClass.value}__submenu--${props.direction}`]: props.direction,
                    },
                  ]}
                  style={{
                    top: `${idx * 30}px`,
                  }}
                >
                  <ul>{optionItem.children}</ul>
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
                <span class={`${dropdownClass.value}__item-text`}>{optionItem.content}</span>
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
      return (
        <div
          class={[dropdownMenuClass.value, `${dropdownMenuClass.value}--${props.direction}`]}
          style={{
            maxHeight: `${props.maxHeight}px`,
          }}
        >
          {renderOptions(props.options)}
        </div>
      );
    };
  },
});
