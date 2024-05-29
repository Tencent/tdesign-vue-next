import type { PropType } from '@td/adapter-vue';
import { defineComponent, ref } from '@td/adapter-vue';

import dropdownItemProps from '@td/intel/dropdown/dropdown-item-props';
import { useContent, usePrefixClass, useRipple, useTNodeJSX } from '@td/adapter-hooks';
import { pxCompat } from '@td/utils';
import type { TdDropdownProps } from '@td/intel/dropdown/type';

export default defineComponent({
  name: 'TDropdownItem',
  props: {
    ...dropdownItemProps,
    maxColumnWidth: {
      type: [String, Number] as PropType<TdDropdownProps['maxColumnWidth']>,
      default: 100,
    },
    minColumnWidth: {
      type: [String, Number] as PropType<TdDropdownProps['minColumnWidth']>,
      default: 10,
    },
    isSubmenu: Boolean,
  },
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();

    const itemRef = ref<HTMLElement>();

    useRipple(props.isSubmenu ? null : itemRef);
    const prefixIcon = renderTNodeJSX('prefixIcon');
    const dropdownItemClass = usePrefixClass('dropdown__item');
    const handleItemClick = (e: MouseEvent) => {
      if (props.disabled) {
        return;
      }
      props.onClick?.(props.value, {
        e,
      });
    };

    return () => {
      const content = renderContent('default', 'content');
      const classes = [
        dropdownItemClass.value,
        `${dropdownItemClass.value}--theme-${props.theme}`,
        {
          [`${dropdownItemClass.value}--active`]: props.active,
          [`${dropdownItemClass.value}--disabled`]: props.disabled,
        },
      ];

      return (
        <li
          class={classes}
          onClick={handleItemClick}
          style={{
            maxWidth: pxCompat(props.maxColumnWidth),
            minWidth: pxCompat(props.minColumnWidth),
          }}
          ref={itemRef}
        >
          {props.prefixIcon ? <div class={`${dropdownItemClass.value}-icon`}>{prefixIcon}</div> : null}
          {content}
        </li>
      );
    };
  },
});
