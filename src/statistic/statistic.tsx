import { defineComponent, computed, ref, onMounted, watch, toRefs } from 'vue';
import {
  ArrowTriangleDownFilledIcon as TDArrowTriangleDownFilledIcon,
  ArrowTriangleUpFilledIcon as TDArrowTriangleUpFilledIcon,
} from 'tdesign-icons-vue-next';
import isNumber from 'lodash/isNumber';
import isFunction from 'lodash/isFunction';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { usePrefixClass } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';

import Skeleton from '../skeleton';
import Tween from './tween';

export default defineComponent({
  name: 'TStatistic',

  props,

  setup(props) {
    const classPrefix = usePrefixClass('statistic');

    const numberValue = computed(() => (isNumber(props.value) ? props.value : 0));
    const innerValue = ref(props.animation?.valueFrom ?? props.value);

    const tween = ref(null);
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
            innerValue.value = keys.value;
          },
          onFinish: () => {
            innerValue.value = to;
          },
        });
        (tween.value as any)?.start();
      }
    };

    const formatValue = computed(() => {
      let _value: number | undefined | string = innerValue.value;
      const { decimalPlaces, separator } = props;

      if (isFunction(props.format)) {
        return props.format(_value);
      }
      const options = {
        minimumFractionDigits: decimalPlaces || 0,
        maximumFractionDigits: decimalPlaces || 20,
        useGrouping: !!separator,
      };
      // replace的替换的方案仅能应对大部分地区
      _value = _value.toLocaleString(undefined, options).replace(/,|，/g, separator);

      return _value;
    });

    const COLOR_MAP = {
      blue: 'var(--td-brand-color)',
      red: 'var(--td-error-color)',
      orange: 'var(--td-warning-color)',
      green: 'var(--td-success-color)',
    };

    const valueStyle = computed(() => {
      const { color } = props;
      return {
        color: COLOR_MAP[color] || color,
      };
    });

    onMounted(() => props.animation && props.animationStart && start());

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
    return {
      start,
      classPrefix,
      formatValue,
      valueStyle,
    };
  },
  render() {
    const { classPrefix, formatValue, valueStyle, loading, trendPlacement, trend } = this;
    const { ArrowTriangleUpFilledIcon } = useGlobalIcon({ ArrowTriangleUpFilledIcon: TDArrowTriangleUpFilledIcon });
    const { ArrowTriangleDownFilledIcon } = useGlobalIcon({
      ArrowTriangleDownFilledIcon: TDArrowTriangleDownFilledIcon,
    });

    const trendIcons = {
      increase: <ArrowTriangleUpFilledIcon />,
      decrease: <ArrowTriangleDownFilledIcon />,
    };
    const trendIcon = trend ? trendIcons[trend] : null;

    const prefix = renderTNodeJSX(this, 'prefix') || (trendIcon && trendPlacement !== 'right' ? trendIcon : null);
    const suffix = renderTNodeJSX(this, 'suffix') || (trendIcon && trendPlacement === 'right' ? trendIcon : null);
    const title = renderTNodeJSX(this, 'title');
    const unit = renderTNodeJSX(this, 'unit');
    const extra = renderTNodeJSX(this, 'extra');

    return (
      <div class={classPrefix}>
        {title && <div class={`${classPrefix}-title`}>{title}</div>}
        <Skeleton animation="gradient" theme="text" loading={!!loading}>
          <div class={`${classPrefix}-content`} style={valueStyle}>
            {prefix && <span class={`${classPrefix}-content-prefix`}>{prefix}</span>}
            <span class={`${classPrefix}-content-value`}>{formatValue}</span>
            {unit && <span class={`${classPrefix}-content-unit`}>{unit}</span>}
            {suffix && <span class={`${classPrefix}-content-suffix`}>{suffix}</span>}
          </div>
        </Skeleton>
        {extra && <div class={`${classPrefix}-extra`}>{extra}</div>}
      </div>
    );
  },
});
