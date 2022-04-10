import { computed, defineComponent, reactive, ref, unref, watch, toRefs } from 'vue';
import props from './props';
import popupProps from '../popup/props';
import Popup, { PopupProps, PopupVisibleChangeContext } from '../popup';
import { ClassName } from '../common';
// import { useEmitEvent } from '../hooks/event';
import useVModel from '../hooks/useVModel';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX, useContent } from '../hooks/tnode';

export default defineComponent({
  name: 'TTooltip',
  components: { Popup },
  props: {
    ...popupProps,
    ...props,
  },
  emits: ['visible-change'],
  setup(props, ctx) {
    const timer = ref(null);
    const tooltipVisible = ref(false);
    // const emitEvent = useEmitEvent();
    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const { duration, visible, modelValue, theme, overlayClassName } = toRefs(props);
    const [visibleValue, setVisibleValue] = useVModel(visible, modelValue, props.defaultVisible, props.onVisibleChange);
    if (duration && visible) {
      timer.value = setTimeout(() => {
        // emitEvent('visible-change', false);
        setVisibleValue(false, {});
        clearTimeout(timer.value);
        timer.value = null;
      }, unref(duration));
    }
    const onTipVisibleChange = (val: boolean, ctx?: PopupVisibleChangeContext) => {
      // 因 props={this.getPopupProps()} 已经透传 onVisibleChange props，此处不再需要使用 emitEvent
      if (timer.value && ctx?.trigger !== 'document') return;
      setVisibleValue(val, ctx);
      // emitEvent('visible-change', val);
    };
    const tooltipOverlayClassName: ClassName = computed(() => {
      return [
        `${classPrefix.value}-tooltip`,
        { [`${classPrefix.value}-tooltip--${theme.value}`]: theme.value },
        overlayClassName.value,
      ];
    });

    const getPopupProps = (): PopupProps => {
      const r: PopupProps = {
        showArrow: true,
        ...props,
        content: () => renderTNodeJSX('content'),
        default: () => renderContent('default', 'triggerElement'),
        overlayClassName: tooltipOverlayClassName.value,
        onVisibleChange: onTipVisibleChange,
      };
      return r;
    };

    watch(
      () => visible,
      (next, prev) => {
        if (timer.value && !visible) {
          clearTimeout(timer.value);
          timer.value = null;
        }
      },
    );

    return {
      visibleValue,
      tooltipOverlayClassName,
      getPopupProps,
    };
  },

  render() {
    // console.log(this.visibleValue, this.getPopupProps());
    return <Popup visible={this.visibleValue} showArrow={this.showArrow} {...this.getPopupProps()} />;
    // return <Popup visible={true} {...this.getPopupProps()} />;
  },
});
