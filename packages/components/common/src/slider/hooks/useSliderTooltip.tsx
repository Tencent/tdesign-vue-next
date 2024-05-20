import type { TooltipProps } from '@src/tooltip';
import type { ComputedRef, Ref } from '@td/adapter-vue';
import { computed, ref } from '@td/adapter-vue';
import type { TdSliderProps } from '@td/intel/slider/type';
import { useTNodeJSX } from '@td/adapter-hooks';
import { formatLabel } from '../util/common';

const initialProps: TooltipProps & { overlayClassName: string } = {
  visible: false,
  trigger: 'hover',
  showArrow: true,
  overlayInnerStyle: undefined,
  overlayClassName: undefined,
  attach: 'body',
  theme: 'default',
};

export interface TooltipConfig {
  tooltipProps: boolean | TooltipProps;
  vertical: boolean;
  value: number;
  label: TdSliderProps['label'];
  position: string;
  range: boolean;
}

/**
 * 聚合管理滑块tooltip内容hook
 * @param tooltipProps tooltip属性配置
 * @param vertical 是否垂直展示
 * @returns
 */
export function useSliderTooltip(tooltipConfig: Ref<TooltipConfig>) {
  const tooltipRef = ref();
  const showTooltip = computed({
    get() {
      return !tooltipConfig.value.tooltipProps === false;
    },
    set(val) {
      return val;
    },
  });
  const normalizeProps = ref<TooltipProps & { overlayClassName: string }>({ ...initialProps });
  /** 开关显示tooltip */
  const toggleTooltip = (toState: boolean) => {
    if (!showTooltip.value) {
      return;
    }
    normalizeProps.value.visible = toState;
  };

  const renderTNodeJSX = useTNodeJSX();

  /** 合并最终tooltip属性，以外部同名属性覆盖初始化属性 */
  const validProps = computed(() => {
    const { vertical, tooltipProps, label, value, position, range } = tooltipConfig.value;
    const placement = vertical ? 'right' : 'top';

    let content = (() => {
      if (label === true) {
        return String(value);
      }
      if (typeof label === 'string') {
        return formatLabel(label, value);
      }
      return renderTNodeJSX('label', {
        params: range
          ? {
              value,
              position,
            }
          : { value },
      });
    })();

    if (tooltipProps instanceof Object) {
      if (!tooltipProps?.placement) {
        normalizeProps.value.placement = placement;
      }
      if (tooltipProps.content) {
        content = tooltipProps.content;
      }
      // @ts-expect-error
      return { ...normalizeProps.value, ...tooltipProps, content };
    }
    return { ...normalizeProps.value, placement, content };
  });

  return {
    tooltipRef,
    tooltipProps: validProps as ComputedRef<TdSliderProps['tooltipProps']>,
    toggleTooltip,
    showTooltip,
  };
}
