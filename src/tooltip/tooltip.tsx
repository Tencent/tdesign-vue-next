import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import props from './props';
import popupProps from '../popup/props';
import Popup, { PopupVisibleChangeContext } from '../popup';
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

    const innerTooltipVisible = ref(props.visible || props.defaultVisible);
    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();

    onMounted(() => {
      if (props.duration && innerTooltipVisible.value) {
        timer.value = setTimeout(() => {
          innerTooltipVisible.value = false;
          clearTimeout(timer.value);
          timer.value = null;
        }, props.duration);
      }
    });

    const onTipVisibleChange = (val: boolean, ctx?: PopupVisibleChangeContext) => {
      // 因 props={this.getPopupProps()} 已经透传 onVisibleChange props，此处不再需要使用 emitEvent
      if (timer.value && ctx?.trigger !== 'document') return;
      innerTooltipVisible.value = val;
    };

    const tooltipOverlayClassName = computed(() => {
      return [
        `${classPrefix.value}-tooltip`,
        { [`${classPrefix.value}-tooltip--${props.theme}`]: props.theme },
        props.overlayClassName,
      ];
    });

    const popupProps = computed(() => ({
      showArrow: props.showArrow,
      ...props,
      content: () => renderTNodeJSX('content'),
      default: () => renderContent('default', 'triggerElement'),
      overlayClassName: tooltipOverlayClassName.value,
      onVisibleChange: onTipVisibleChange,
    }));

    watch(
      () => innerTooltipVisible.value,
      (next, prev) => {
        if (timer.value && !innerTooltipVisible.value) {
          clearTimeout(timer.value);
          timer.value = null;
        }
      },
    );

    return () => <Popup {...popupProps.value} visible={innerTooltipVisible.value} />;
  },
});
