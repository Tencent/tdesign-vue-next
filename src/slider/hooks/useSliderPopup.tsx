import { reactive, ref, onMounted, computed } from 'vue';
import { PopupProps } from '../../popup/index';

/**
 * 判断目标值是否存在内容
 * @param val 目标值
 * @returns {boolean}
 */
function isEmptyValue(val: unknown | null | undefined): boolean {
  return val === undefined || val === null;
}

/**
 * 聚合管理滑块popup内容hook
 * @param tooltipProps popup属性配置
 * @param vertical 是否垂直展示
 * @returns
 */
export const useSliderPopup = (tooltipProps: boolean | PopupProps, vertical: boolean) => {
  const popupRef = ref();
  const showTooltip = ref(true);
  const popupProps = reactive<PopupProps & { overlayClassName: string }>({
    visible: false,
    trigger: 'hover',
    showArrow: true,
    overlayStyle: undefined,
    overlayClassName: undefined,
    attach: 'body',
  });

  /** 开关显示popup */
  const togglePopup = (toState: boolean) => {
    popupProps.visible = toState;
  };

  /** 展示位置计算 */
  const placement = computed(() => {
    if (tooltipProps instanceof Object) {
      const { placement } = tooltipProps;
      if (placement) return placement;
    }

    return vertical ? 'right' : 'top';
  });

  /**
   * 初始化popup属性
   */
  const setTooltipProps = () => {
    if (tooltipProps instanceof Object) {
      const { trigger, showArrow, overlayStyle, overlayClassName, attach } = tooltipProps;
      if (!isEmptyValue(trigger)) {
        popupProps.trigger = trigger;
      }
      if (!isEmptyValue(showArrow)) {
        popupProps.showArrow = showArrow;
      }

      popupProps.overlayStyle = overlayStyle;
      popupProps.overlayClassName = overlayClassName as string;
      if (!isEmptyValue(attach)) {
        popupProps.attach = attach;
      }
    }
  };

  onMounted(() => {
    showTooltip.value = !tooltipProps === false;
    setTooltipProps();
  });
  return {
    popupRef,
    popupProps,
    togglePopup,
    showTooltip,
    placement,
  };
};
