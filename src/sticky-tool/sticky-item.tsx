import { computed, defineComponent } from 'vue';
import baseProps from './sticky-item-props';
import TdStickyToolProps from './props';
import { usePrefixClass } from '../hooks/useConfig';
import type { TdStickyItemProps } from './type';
import type { Styles } from '../common';
import Popup from '../popup';
import PopupProps from '../popup/props';
import { useTNodeJSX } from '../hooks';

export default defineComponent({
  name: 'TStickyItem',
  props: {
    ...baseProps,
    type: TdStickyToolProps.type,
    shape: TdStickyToolProps.shape,
    placement: TdStickyToolProps.placement,
    basePopupProps: PopupProps,
    baseWidth: TdStickyToolProps.width,
    onClick: TdStickyToolProps.onClick,
    onHover: TdStickyToolProps.onHover,
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('sticky-item');
    const baseClass = computed(() => {
      return [
        `${COMPONENT_NAME.value}`,
        `${COMPONENT_NAME.value}--${props.type}`,
        `${COMPONENT_NAME.value}--${props.shape}`,
      ];
    });
    const labelClass = computed(() => {
      return [`${COMPONENT_NAME.value}__label`];
    });
    const popupPlacement = computed(() => {
      return props.placement.indexOf('right') !== -1 ? 'left' : 'right';
    });
    const styles = computed(() => {
      const styles: Styles = {};
      if (props.baseWidth) {
        const selfWidth = props.type === 'normal' ? '56px' : '40px';
        styles.margin = `calc((${props.baseWidth} - ${selfWidth})/2)`;
      }
      return styles;
    });
    const handleClickItem = (e: MouseEvent) => {
      const item: TdStickyItemProps = {};
      Object.keys(baseProps).forEach((i) => (item[i] = props[i]));
      props.onClick({ e, item });
    };
    const handleHoverItem = (e: MouseEvent) => {
      const item: TdStickyItemProps = {};
      Object.keys(baseProps).forEach((i) => (item[i] = props[i]));
      props.onHover({ e, item });
    };
    const renderTNodeJSX = useTNodeJSX();
    const icon = renderTNodeJSX('icon');
    const label = renderTNodeJSX('label');
    const popup = renderTNodeJSX('popup');
    const popupProps = Object.assign({ hideEmptyPopup: true }, props.basePopupProps, props.popupProps);
    return () => (
      <Popup
        overlayInnerClassName={`${usePrefixClass('sticky-tool').value}-popup-content`}
        trigger={props.trigger}
        placement={popupPlacement.value}
        content={() => popup}
        {...popupProps}
      >
        <div class={baseClass.value} style={styles.value} onClick={handleClickItem} onMouseenter={handleHoverItem}>
          {icon}
          {props.type === 'normal' ? <div class={labelClass.value}>{label}</div> : null}
        </div>
      </Popup>
    );
  },
});
