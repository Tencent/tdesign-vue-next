import { computed, defineComponent, onMounted, ref, toRefs, watch, getCurrentInstance } from 'vue';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import props from './props';
import popupProps from '../popup/props';
import Popup, { PopupVisibleChangeContext } from '../popup';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import { useMouse } from './util';
import useVModel from '../hooks/useVModel';

export default defineComponent({
  name: 'TTooltip',
  props: {
    ...popupProps,
    ...props,
  },
  setup(props, ctx) {
    const timer = ref(null);
    const popupRef = ref(null);

    const { visible, modelValue } = toRefs(props);
    const [innerVisible, setInnerVisible] = useVModel(
      visible,
      modelValue,
      props.defaultVisible,
      props.onVisibleChange,
      'visible',
    );
    const vm = getCurrentInstance();
    const innerTooltipVisible = ref(props.visible || props.defaultVisible);
    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const { x } = useMouse();
    const offsetX = ref(x.value);

    onMounted(() => {
      if (props.duration && innerTooltipVisible.value) {
        timer.value = setTimeout(() => {
          setInnerVisible(false, {});
          clearTimeout(timer.value);
          timer.value = null;
        }, props.duration);
      }
    });

    const onTipVisibleChange = (val: boolean, ctx?: PopupVisibleChangeContext) => {
      // 因 props={this.getPopupProps()} 已经透传 onVisibleChange props，此处不再需要使用 emitEvent
      if (timer.value && ctx?.trigger !== 'document') return;
      if (val) {
        offsetX.value = x.value;
      }
      setInnerVisible(val, ctx);
    };

    const tooltipOverlayClassName = computed(() => {
      return [
        `${classPrefix.value}-tooltip`,
        { [`${classPrefix.value}-tooltip--${props.theme}`]: props.theme },
        props.overlayClassName,
      ];
    });

    const popupProps = computed(() => ({
      ...(vm?.vnode.props || {}),
      placement: props.placement === 'mouse' ? 'bottom-left' : props.placement,
      showArrow: props.placement === 'mouse' ? false : props.showArrow,
      overlayClassName: tooltipOverlayClassName.value,
      onVisibleChange: onTipVisibleChange,
      disabled: props.disabled,
    }));

    const overlayInnerStyle = computed(() => {
      if (props.placement !== 'mouse' || offsetX.value === 0) {
        return props.overlayInnerStyle;
      }
      const offsetStyle = (triggerEl: HTMLElement) => ({
        transform: `translateX(${offsetX.value - triggerEl.getBoundingClientRect().left}px)`,
      });
      if (props.overlayInnerStyle) {
        return (triggerEl: HTMLElement, popupEl: HTMLElement) => ({
          ...offsetStyle(triggerEl),
          ...(isFunction(props.overlayInnerStyle)
            ? props.overlayInnerStyle(triggerEl, popupEl)
            : props.overlayInnerStyle),
        });
      }
      return offsetStyle;
    });

    watch(
      () => innerTooltipVisible.value,
      () => {
        if (timer.value && !innerTooltipVisible.value) {
          clearTimeout(timer.value);
          timer.value = null;
        }
      },
    );

    const onPopupUpdate = () => {
      popupRef.value?.update?.();
    };

    /**
     * 透传更新popup实例方法，供外部调用
     */
    ctx.expose({
      updatePopper: onPopupUpdate,
    });
    return () => {
      const content = renderTNodeJSX('content');
      if (!content && !props.content) {
        return renderContent('default', 'triggerElement');
      }
      return (
        <Popup
          {...omit(popupProps.value, ['content', 'default'])}
          ref={popupRef}
          overlayInnerStyle={overlayInnerStyle.value}
          visible={innerVisible.value}
          v-slots={{
            content: () => content,
          }}
        >
          {renderContent('default', 'triggerElement')}
        </Popup>
      );
    };
  },
});
