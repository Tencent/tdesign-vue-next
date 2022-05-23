import { defineComponent, VNode, computed, CSSProperties } from 'vue';
import {
  CloseCircleFilledIcon,
  CheckCircleFilledIcon,
  ErrorCircleFilledIcon,
  CloseIcon,
  CheckIcon,
  ErrorIcon,
} from 'tdesign-icons-vue-next';
import { getBackgroundColor } from '../utils/helper';
import { PRO_THEME, CIRCLE_SIZE, CIRCLE_SIZE_PX, STATUS_ICON, CIRCLE_FONT_SIZE_RATIO } from './constants';
import props from './props';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';

export default defineComponent({
  name: 'TProgress',
  props,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('progress');
    const statusStyle = computed(() => {
      if (props.percentage >= 100) {
        return 'success';
      }
      return props.status || 'default';
    });

    const trackBgStyle = computed(() => {
      const style: CSSProperties = {};
      if (props.strokeWidth) {
        const height = typeof props.strokeWidth === 'string' ? props.strokeWidth : `${props.strokeWidth}px`;
        style.height = height;
        style.borderRadius = height;
      }
      if (props.trackColor) {
        style.backgroundColor = props.trackColor;
      }
      return style;
    });

    const barStyle = computed(() => {
      return {
        width: `${props.percentage}%`,
        background: props.color && getBackgroundColor(props.color),
      };
    });

    const circlePathStyle = computed(() => {
      const strokeColor = typeof props.color === 'object' ? '' : props.color;
      return {
        stroke: strokeColor,
      };
    });

    // theme=circle 获取直径
    const diameter = computed(() => {
      let diameter = CIRCLE_SIZE_PX.MEDIUM;
      if (!props.size) {
        return diameter;
      }
      const { SMALL, LARGE, MEDIUM } = CIRCLE_SIZE;
      switch (props.size) {
        case SMALL:
          diameter = CIRCLE_SIZE_PX.SMALL;
          break;
        case MEDIUM:
          diameter = CIRCLE_SIZE_PX.MEDIUM;
          break;
        case LARGE:
          diameter = CIRCLE_SIZE_PX.LARGE;
          break;
        default:
          diameter = Number(props.size);
          break;
      }
      return diameter;
    });

    const rPoints = computed(() => {
      return diameter.value / 2;
    });

    const radius = computed(() => {
      return rPoints.value - circleStrokeWidth.value / 2;
    });

    const circleStyle = computed(() => {
      if (props.theme !== PRO_THEME.CIRCLE) {
        return {};
      }

      let fontSize = diameter.value * CIRCLE_FONT_SIZE_RATIO.MEDIUM;
      if (diameter.value <= CIRCLE_SIZE_PX.SMALL) {
        fontSize = diameter.value * CIRCLE_FONT_SIZE_RATIO.SMALL;
      } else if (diameter.value >= CIRCLE_SIZE_PX.LARGE) {
        fontSize = diameter.value * CIRCLE_FONT_SIZE_RATIO.LARGE;
      }

      return {
        width: `${diameter.value}px`,
        height: `${diameter.value}px`,
        fontSize: `${fontSize}px`,
      };
    });

    const circleStrokeWidth = computed(() => {
      const defaultWidth = props.size === CIRCLE_SIZE.SMALL ? 4 : 6;
      return props.strokeWidth ? Number(props.strokeWidth) : defaultWidth;
    });

    const strokeDashArr = computed(() => {
      const radius = (diameter.value - circleStrokeWidth.value) / 2;
      const perimeter = Math.PI * 2 * radius;
      const percent = props.percentage / 100;
      return `${perimeter * percent}  ${perimeter * (1 - percent)}`;
    });

    const getIconMap = () => {
      const CIRCLE_ICONS = {
        success: CheckIcon,
        warning: ErrorIcon,
        error: CloseIcon,
      };
      const NORMAL_ICONS = {
        success: CheckCircleFilledIcon,
        warning: ErrorCircleFilledIcon,
        error: CloseCircleFilledIcon,
      };
      return props.theme === PRO_THEME.CIRCLE ? CIRCLE_ICONS : NORMAL_ICONS;
    };
    const getLabelContent = () => {
      let labelContent: string | VNode = `${props.percentage}%`;
      const status = props.status || '';
      if (STATUS_ICON.includes(status) && props.theme !== PRO_THEME.PLUMP) {
        const components = getIconMap();
        const component = components[status];
        if (component) {
          labelContent = <component class={[`${COMPONENT_NAME.value}__icon`]}></component>;
        }
      }
      return labelContent;
    };

    return () => {
      const labelContent = (
        <div class={`${COMPONENT_NAME.value}__info`}>{renderTNodeJSX('label', getLabelContent())}</div>
      );
      // 进度大于 10 ，进度百分比显示在内部；进度百分比小于 10 进度显示在外部
      const PLUMP_SEPARATE = 10;
      const separateClasses =
        props.percentage > PLUMP_SEPARATE ? `${COMPONENT_NAME.value}--over-ten` : `${COMPONENT_NAME.value}--under-ten`;
      return (
        <div class={COMPONENT_NAME.value}>
          {props.theme === PRO_THEME.LINE && (
            <div class={`${COMPONENT_NAME.value}--thin ${COMPONENT_NAME.value}--status--${statusStyle.value}`}>
              <div class={`${COMPONENT_NAME.value}__bar`} style={trackBgStyle.value}>
                <div class={`${COMPONENT_NAME.value}__inner`} style={barStyle.value}></div>
              </div>
              {labelContent}
            </div>
          )}

          {props.theme === PRO_THEME.PLUMP && (
            <div
              class={[
                `${COMPONENT_NAME.value}__bar ${COMPONENT_NAME.value}--plump ${separateClasses}`,
                { [`${COMPONENT_NAME.value}--status--${statusStyle.value}`]: statusStyle.value },
              ]}
              style={trackBgStyle.value}
            >
              <div class={`${COMPONENT_NAME.value}__inner`} style={barStyle.value}>
                {props.percentage > PLUMP_SEPARATE && labelContent}
              </div>
              {props.percentage <= PLUMP_SEPARATE && labelContent}
            </div>
          )}

          {props.theme === PRO_THEME.CIRCLE && (
            <div
              class={`${COMPONENT_NAME.value}--circle ${COMPONENT_NAME.value}--status--${statusStyle.value}`}
              style={circleStyle.value}
            >
              {labelContent}
              <svg width={diameter.value} height={diameter.value} viewBox={`0 0 ${diameter.value} ${diameter.value}`}>
                <circle
                  cx={rPoints.value}
                  cy={rPoints.value}
                  r={radius.value}
                  stroke-width={circleStrokeWidth.value}
                  stroke={props.trackColor}
                  fill="none"
                  class={[`${COMPONENT_NAME.value}__circle-outer`]}
                />
                {props.percentage > 0 && (
                  <circle
                    cx={rPoints.value}
                    cy={rPoints.value}
                    r={radius.value}
                    stroke-width={circleStrokeWidth.value}
                    fill="none"
                    stroke-linecap="round"
                    class={[`${COMPONENT_NAME.value}__circle-inner`]}
                    transform={`matrix(0,-1,1,0,0,${diameter.value})`}
                    stroke-dasharray={strokeDashArr.value}
                    style={circlePathStyle.value}
                  />
                )}
              </svg>
            </div>
          )}
        </div>
      );
    };
  },
});
