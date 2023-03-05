import { computed, defineComponent } from 'vue';
import props from './sticky-item-props';
import { usePrefixClass } from '../hooks/useConfig';
import { TdStickyItemProps } from './type';
import { Styles } from '../common';
import Popup from '../popup';
import { useTNodeJSX } from '../hooks';

export default defineComponent({
  name: 'TStickyItem',
  props: {
    ...props,
    type: String,
    shape: String,
    placement: String,
    basePopupProps: Object,
    baseWidth: String,
    onClick: Function,
    onHover: Function,
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
        const size = `calc(${props.baseWidth} - 8px)`;
        styles.width = size;
        styles.height = size;
      }
      return styles;
    });
    const handleClickItem = (e: MouseEvent) => {
      const item: TdStickyItemProps = {};
      Object.keys(props).forEach((i) => (item[i] = props[i]));
      props.onClick(e, item);
    };
    const handleHoverItem = (e: MouseEvent) => {
      const item: TdStickyItemProps = {};
      Object.keys(props).forEach((i) => (item[i] = props[i]));
      props.onHover(e, item);
    };
    const renderTNodeJSX = useTNodeJSX();
    const icon = renderTNodeJSX('icon');
    const label = renderTNodeJSX('label');
    const popup = renderTNodeJSX('popup');
    return () => (
      <Popup
        trigger={props.trigger}
        hideEmptyPopup={true}
        placement={popupPlacement.value}
        content={() => popup}
        props={props.popupProps || props.basePopupProps}
      >
        <div class={baseClass.value} style={styles.value} onClick={handleClickItem} onMouseenter={handleHoverItem}>
          {icon}
          {props.type === 'normal' ? <div class={labelClass.value}>{label}</div> : null}
        </div>
      </Popup>
    );
  },
});
