import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import {
  ArrowTriangleDownFilledIcon as TDArrowTriangleDownFilledIcon,
  ArrowTriangleUpFilledIcon as TDArrowTriangleUpFilledIcon,
} from 'tdesign-icons-vue-next';
import { defineComponent, computed, ref, onMounted, watch, toRefs } from 'vue';

import Tween from '../_common/js/statistic/tween';
import { COLOR_MAP } from '../_common/js/statistic/utils';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import Skeleton from '../skeleton';

import props from './props';

export default defineComponent({
  name: 'TStatistic',

  props,

  setup(props, { expose }) {
    const COMPONENT_NAME = usePrefixClass('statistic');
    const renderTNodeJSX = useTNodeJSX();
    const { ArrowTriangleUpFilledIcon, ArrowTriangleDownFilledIcon } = useGlobalIcon({
      ArrowTriangleUpFilledIcon: TDArrowTriangleUpFilledIcon,
      ArrowTriangleDownFilledIcon: TDArrowTriangleDownFilledIcon,
    });
    const trendIcons = {
      increase: <ArrowTriangleUpFilledIcon />,
      decrease: <ArrowTriangleDownFilledIcon />,
    };
    const numberValue = computed(() => (isNumber(props.value) ? props.value : 0));
    const innerValue = ref(props.animation?.valueFrom ?? props.value);
    const innerDecimalPlaces = computed(
      () => props.decimalPlaces ?? numberValue.value.toString().split('.')[1]?.length ?? 0,
    );

    const tween = ref<Tween>();
    const { value } = toRefs(props);

    const start = (from: number = props.animation?.valueFrom ?? 0, to: number = numberValue.value) => {
      if (from !== to) {
        tween.value = new Tween({
          from: {
            value: from,
          },
          to: {
            value: to,
          },
          duration: props.animation.duration,
          onUpdate: (keys) => {
            innerValue.value = Number(keys.value.toFixed(innerDecimalPlaces.value));
          },
          onFinish: () => {
            innerValue.value = to;
          },
        });
        tween.value?.start();
      }
    };

    const formatValue = computed(() => {
      let formatValue: number | undefined | string = innerValue.value;
      const { decimalPlaces, separator } = props;

      if (isFunction(props.format)) {
        return props.format(formatValue);
      }
      const options = {
        minimumFractionDigits: decimalPlaces || 0,
        maximumFractionDigits: decimalPlaces || 20,
        useGrouping: !!separator,
      };
      // replace的替换的方案仅能应对大部分地区
      formatValue = formatValue.toLocaleString(undefined, options).replace(/,|，/g, separator);

      return formatValue;
    });

    const contentStyle = computed(() => {
      const { color } = props;
      return {
        color: COLOR_MAP[color] || color,
      };
    });

    watch(
      () => props.animationStart,
      (value) => {
        if (props.animation && value && !tween.value) {
          start();
        }
      },
    );
    watch(value, (value) => {
      if (tween.value) {
        (tween.value as any)?.stop();
        tween.value = null;
      }
      innerValue.value = value;
      if (props.animationStart && props.animation) {
        start();
      }
    });

    onMounted(() => props.animation && props.animationStart && start());

    expose({ start });

    return () => {
      const trendIcon = props.trend ? trendIcons[props.trend] : null;
      const prefix = renderTNodeJSX('prefix') || (trendIcon && props.trendPlacement !== 'right' ? trendIcon : null);
      const suffix = renderTNodeJSX('suffix') || (trendIcon && props.trendPlacement === 'right' ? trendIcon : null);
      const title = renderTNodeJSX('title');
      const unit = renderTNodeJSX('unit');
      const extra = renderTNodeJSX('extra');

      return (
        <div class={COMPONENT_NAME.value}>
          {title && <div class={`${COMPONENT_NAME.value}-title`}>{title}</div>}
          <Skeleton animation="gradient" theme="text" loading={!!props.loading}>
            <div class={`${COMPONENT_NAME.value}-content`} style={contentStyle.value}>
              {prefix && <span class={`${COMPONENT_NAME.value}-content-prefix`}>{prefix}</span>}
              <span class={`${COMPONENT_NAME.value}-content-value`}>{formatValue.value}</span>
              {unit && <span class={`${COMPONENT_NAME.value}-content-unit`}>{unit}</span>}
              {suffix && <span class={`${COMPONENT_NAME.value}-content-suffix`}>{suffix}</span>}
            </div>
          </Skeleton>
          {extra && <div class={`${COMPONENT_NAME.value}-extra`}>{extra}</div>}
        </div>
      );
    };
  },
});
