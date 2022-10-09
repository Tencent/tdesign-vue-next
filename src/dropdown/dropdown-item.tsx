import { defineComponent, ref, PropType } from 'vue';
import { TdDropdownProps } from '../dropdown/type';

import dropdownItemProps from './dropdown-item-props';
import useRipple from '../hooks/useRipple';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';
import { pxCompat } from '../utils/helper';

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
  setup(props, { slots }) {
    const renderTNodeJSX = useTNodeJSX();

    const itemRef = ref<HTMLElement>();

    useRipple(props.isSubmenu ? null : itemRef);
    const prefixIcon = renderTNodeJSX('prefixIcon');
    const COMPONENT_NAME = usePrefixClass('dropdown__item');
    const handleItemClick = (e: MouseEvent) => {
      props.onClick?.(props.value, {
        e,
      });
    };

    return () => {
      const classes = [
        COMPONENT_NAME.value,
        `${COMPONENT_NAME.value}--theme-${props.theme}`,
        {
          [`${COMPONENT_NAME.value}--active`]: props.active,
          [`${COMPONENT_NAME.value}--disabled`]: props.disabled,
        },
      ];

      return (
        <li
          className={classes}
          onClick={handleItemClick}
          style={{
            maxWidth: pxCompat(props.maxColumnWidth),
            minWidth: pxCompat(props.minColumnWidth),
          }}
          ref={itemRef}
        >
          {props.prefixIcon ? <div className={`${COMPONENT_NAME.value}-icon`}>{prefixIcon}</div> : null}
          {renderTNodeJSX('default')}
        </li>
      );
    };
  },
});
