import { TooltipProps } from '@src/tooltip';
import { ref, computed, ComputedRef } from 'vue';
import { TdSliderProps } from '../type';

const initialProps: TooltipProps & { overlayClassName: string } = {
  visible: false,
  trigger: 'hover',
  showArrow: true,
  overlayStyle: undefined,
  overlayClassName: undefined,
  attach: 'body',
  theme: 'default',
};

/**
 * 聚合管理滑块tooltip内容hook
 * @param tooltipProps tooltip属性配置
 * @param vertical 是否垂直展示
 * @returns
 */
export const useSliderTooltip = (tooltipProps: boolean | TooltipProps, vertical: boolean) => {
  const tooltipRef = ref();
  const showTooltip = ref(!tooltipProps === false);
  const normalizeProps = ref<TooltipProps & { overlayClassName: string }>({ ...initialProps });

  /** 开关显示tooltip */
  const toggleTooltip = (toState: boolean) => {
    normalizeProps.value.visible = toState;
  };

  /** 合并最终tooltip属性，以外部同名属性覆盖初始化属性 */
  const validProps = computed(() => {
    const placement = vertical ? 'right' : 'top';
    if (tooltipProps instanceof Object) {
      if (!tooltipProps?.placement) {
        normalizeProps.value.placement = placement;
      }
      return { ...normalizeProps.value, ...tooltipProps };
    }
    return { ...normalizeProps.value, placement };
  });

  return {
    tooltipRef,
    tooltipProps: validProps as ComputedRef<TdSliderProps['tooltipProps']>,
    toggleTooltip,
    showTooltip,
  };
};
