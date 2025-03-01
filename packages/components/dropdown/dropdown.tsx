import { defineComponent, ref, computed } from 'vue';
import { omit, isArray, isNumber } from 'lodash-es';
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
  setup(props: TdDropdownProps, { attrs }) {
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('dropdown');
    const popupElem = ref(null);
    const isPopupVisible = ref(false);

    const manualCloseTimeout = computed(() => {
      const delay = props.popupProps?.delay;
      if (isNumber(delay)) return delay + 10;
      if (isArray(delay)) return (delay[1] ?? delay[0]) + 10;
      return 160;
    });

    const handleMenuClick = (data: DropdownOption, context: { e: MouseEvent }) => {
      if (props.hideAfterItemClick) {
        setTimeout(() => (isPopupVisible.value = false), manualCloseTimeout.value);

        props.popupProps?.onVisibleChange?.(false, context);
        // TODO
        // @ts-ignore types only declare onVisibleChange，but not declare on-visible-change
        props.popupProps?.['on-visible-change']?.(false, context);
      }

      props?.onClick?.(data, context);
    };

    const handleVisibleChange = (visible: boolean, context: PopupVisibleChangeContext) => {
      isPopupVisible.value = visible;

      props.popupProps?.onVisibleChange?.(visible, context);
      // TODO
      // @ts-ignore types only declare onVisibleChange，but not declare on-visible-change
      props.popupProps?.['on-visible-change']?.(visible, context);
    };

    return () => {
      const trigger = renderTNodeJSX('default')?.[0];
      const options = useDropdownOptions(props);

      const popupParams = {
        ...attrs,
        disabled: props.disabled,
        placement: props.placement,
        trigger: props.trigger,
        ...omit(props.popupProps, ['onVisibleChange', 'on-visible-change']),
        overlayInnerClassName: [
          COMPONENT_NAME.value,
          (props.popupProps as TdDropdownProps['popupProps'])?.overlayInnerClassName,
        ],
      };

      return (
        <Popup
          destroyOnClose={true}
          ref={popupElem}
          visible={isPopupVisible.value}
          onVisibleChange={handleVisibleChange}
          expandAnimation
          {...popupParams}
          v-slots={{
            content: () => (
              <>
                {renderTNodeJSX('panelTopContent')}
                {options.value?.length ? (
                  <DropdownMenu {...omit(props, 'onClick')} options={options.value} onClick={handleMenuClick} />
                ) : null}
                {renderTNodeJSX('panelBottomContent')}
              </>
            ),
          }}
        >
          {trigger}
        </Popup>
      );
    };
  },
});
