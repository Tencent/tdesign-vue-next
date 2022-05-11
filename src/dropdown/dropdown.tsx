import { defineComponent, VNode, provide, ref } from 'vue';
import Popup from '../popup/index';
import DropdownMenu from './dropdown-menu';
import { DropdownOption, TdDropdownProps } from './type';
import props from './props';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';

export default defineComponent({
  name: 'TDropdown',
  components: {
    DropdownMenu,
  },
  props,
  setup(props, { attrs, slots }) {
    const renderTNode = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('dropdown');
    const popupElem = ref(null);

    const handleMenuClick = (data: DropdownOption, context: { e: MouseEvent }) => {
      if (props.hideAfterItemClick) {
        popupElem.value.handleClose();
      }
      props.onClick?.(data, context);
    };

    const trigger: VNode[] | VNode | string = slots.default ? slots.default(null) : '';

    const contentSlot: VNode[] | VNode | string = renderTNode('dropdown');

    const popupProps = {
      ...attrs,
      disabled: props.disabled,
      placement: props.placement,
      trigger: props.trigger,
      overlayClassName: [COMPONENT_NAME.value, (props.popupProps as TdDropdownProps['popupProps'])?.overlayClassName],
    };

    provide('handleMenuClick', handleMenuClick);
    provide('maxHeight', props.maxHeight);
    provide('maxColumnWidth', props.maxColumnWidth);
    provide('minColumnWidth', props.minColumnWidth);

    return () => (
      <Popup
        {...props.popupProps}
        {...popupProps}
        destroyOnClose
        ref={popupElem}
        expandAnimation
        v-slots={{
          content: () =>
            contentSlot || (
              <dropdownMenu
                options={props.options}
                maxHeight={props.maxHeight}
                maxColumnWidth={props.maxColumnWidth}
                minColumnWidth={props.minColumnWidth}
              />
            ),
        }}
      >
        {trigger}
      </Popup>
    );
  },
});
