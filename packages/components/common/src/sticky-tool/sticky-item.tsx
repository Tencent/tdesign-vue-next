import { computed, defineComponent, PropType } from 'vue';
import baseProps from '@td/intel/sticky-tool/sticky-item-props';
import TdStickyToolProps from '@td/intel/sticky-tool/props';
import { usePrefixClass } from '@td/adapter-hooks';
import type { Styles } from '../common';
import Popup from '../popup';
import { useTNodeJSX } from '../hooks';

import type { TdStickyItemProps } from '@td/intel/sticky-tool/type';
import type { TdPopupProps } from '../popup/type';

export default defineComponent({
  name: 'TStickyItem',
  props: {
    ...baseProps,
    type: TdStickyToolProps.type,
    shape: TdStickyToolProps.shape,
    placement: TdStickyToolProps.placement,
    basePopupProps: Object as PropType<TdPopupProps>,
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
    const popupProps = Object.assign({ hideEmptyPopup: true }, props.basePopupProps, props.popupProps);
    return () => (
      <Popup
        overlayInnerClassName={`${usePrefixClass('sticky-tool').value}-popup-content`}
        trigger={props.trigger}
        placement={popupPlacement.value}
        content={() => renderTNodeJSX('popup')}
        {...popupProps}
      >
        <div class={baseClass.value} style={styles.value} onClick={handleClickItem} onMouseenter={handleHoverItem}>
          {renderTNodeJSX('icon')}
          {props.type === 'normal' ? <div class={labelClass.value}>{renderTNodeJSX('label')}</div> : null}
        </div>
      </Popup>
    );
  },
});
