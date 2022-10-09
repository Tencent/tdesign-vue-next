import { defineComponent, provide, reactive, ref, toRefs } from 'vue';
import omit from 'lodash/omit';
import Popup, { PopupVisibleChangeContext } from '../popup/index';
import DropdownMenu from './dropdown-menu';
import { DropdownOption, TdDropdownProps } from './type';
import props from './props';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';
import useDropdownOptions from './hooks/useDropdownOptions';

export default defineComponent({
  name: 'TDropdown',
  props,
  setup(props: TdDropdownProps, { attrs, slots }) {
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('dropdown');
    const popupElem = ref(null);
    const isPopupVisible = ref(false);

    const options = useDropdownOptions(props);
    const trigger = renderTNodeJSX('default');
    const handleMenuClick = (data: DropdownOption, context: { e: MouseEvent }) => {
      if (props.hideAfterItemClick) {
        isPopupVisible.value = false;
        props.popupProps?.onVisibleChange?.(false, context);
      }
      props?.onClick?.(data, context);
    };

    const handleVisibleChange = (visible: boolean, context: PopupVisibleChangeContext) => {
      isPopupVisible.value = visible;
      props.popupProps?.onVisibleChange?.(visible, context);
    };

    return () => {
      const popupParams = {
        ...attrs,
        disabled: props.disabled,
        placement: props.placement,
        trigger: props.trigger,
        ...omit(props.popupProps, 'onVisibleChange'),
        overlayInnerClassName: [
          COMPONENT_NAME.value,
          (props.popupProps as TdDropdownProps['popupProps'])?.overlayInnerClassName,
        ],
      };

      return (
        <Popup
          {...popupParams}
          destroyOnClose
          ref={popupElem}
          onVisibleChange={handleVisibleChange}
          expandAnimation
          v-slots={{
            content: () => (
              <DropdownMenu {...omit(props, 'onClick')} options={options.value} onClick={handleMenuClick} />
            ),
          }}
        >
          {trigger}
        </Popup>
      );
    };
  },
});
