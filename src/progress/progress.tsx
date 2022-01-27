import { defineComponent, VNode, ref, computed } from 'vue';
import {
  CloseCircleFilledIcon,
  CheckCircleFilledIcon,
  ErrorCircleFilledIcon,
  CloseIcon,
  CheckIcon,
  ErrorIcon,
} from 'tdesign-icons-vue-next';
import { prefix } from '../config';
import { getBackgroundColor } from '../utils/helper';
import { PRO_THEME, CIRCLE_SIZE, CIRCLE_SIZE_PX, STATUS_ICON, CIRCLE_FONT_SIZE_RATIO } from './constants';
import props from './props';
// import { RenderTNodeTemplate } from '../utils/render-tnode';
import { renderTNodeJSX } from '../utils/render-tnode';

const name = `${prefix}-progress`;

export default defineComponent({
  name: 'TProgress',
  props,
  emits: [],
  setup(props) {
    const statusStyle = computed(() => {
      if (props.percentage >= 100) {
        return 'success';
      }
      return props.status;
    });

    const themeClass = computed(() => {
      const Line = PRO_THEME.LINE;
      if (props.theme === Line) {
        return 'thin';
      }
      return props.theme;
    });

    const trackBgStyle = computed(() => {
      const height = typeof props.strokeWidth === 'string' ? props.strokeWidth : `${props.strokeWidth}px`;
      return {
        height,
        backgroundColor: props.trackColor,
        borderRadius: height,
      };
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

    const isShowIcon = computed(() => STATUS_ICON.includes(props.status) && typeof props.label === 'boolean');

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
      const radius = diameter.value / 2;
      const perimeter = Math.PI * 2 * (radius - circleStrokeWidth.value);
      const percent = props.percentage / 100;
      return `${perimeter * percent}  ${perimeter * (1 - percent)}`;
    });

    const plumpStyles = computed(
      () => ({}),
      // return props.percentage > 10 ? { color: '#fff' } : { right: '-2.5rem' };
    );
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
          labelContent = <component class={[`${name}__icon`]}></component>;
        }
      }
      return labelContent;
    };

    return {
      props,
      statusStyle,
      themeClass,
      trackBgStyle,
      barStyle,
      circlePathStyle,
      isShowIcon,
      diameter,
      rPoints,
      radius,
      circleStyle,
      circleStrokeWidth,
      strokeDashArr,
      plumpStyles,
      getIconMap,
      getLabelContent,
    };
  },

  render() {
    const labelContent = (
      <div class={`${name}__info`}>{renderTNodeJSX(this, 'label', this.getLabelContent() as any)}</div>
    );
    // 进度大于 10 ，进度百分比显示在内部；进度百分比小于 10 进度显示在外部
    const PLUMP_SEPERATE = 10;
    const seperateClasses = this.percentage > PLUMP_SEPERATE ? `${name}--over-ten` : `${name}--under-ten`;
    return (
      <div class={name}>
        {this.theme === PRO_THEME.LINE && (
          <div class={`${name}--thin ${name}--status--${this.statusStyle}`}>
            <div class={`${name}__bar`} style={this.trackBgStyle}>
              <div class={`${name}__inner`} style={this.barStyle}></div>
            </div>
            {labelContent}
          </div>
        )}

        {this.theme === PRO_THEME.PLUMP && (
          <div
            class={[
              `${name}__bar ${name}--plump ${seperateClasses}`,
              { [`${name}--status--${this.statusStyle}`]: this.statusStyle },
            ]}
            style={this.trackBgStyle}
          >
            <div class={`${name}__inner`} style={this.barStyle}>
              {this.percentage > PLUMP_SEPERATE && labelContent}
            </div>
            {this.percentage < PLUMP_SEPERATE && labelContent}
          </div>
        )}

        {this.theme === PRO_THEME.CIRCLE && (
          <div class={`${name}--circle ${name}--status--${this.statusStyle}`} style={this.circleStyle}>
            {labelContent}
            <svg width={this.diameter} height={this.diameter} viewBox={`0 0 ${this.diameter} ${this.diameter}`}>
              <circle
                cx={this.rPoints}
                cy={this.rPoints}
                r={this.radius}
                stroke-width={this.circleStrokeWidth}
                stroke={this.trackColor}
                fill="none"
                class={[`${name}__circle-outer`]}
              />
              <circle
                cx={this.rPoints}
                cy={this.rPoints}
                r={this.radius}
                stroke-width={this.circleStrokeWidth}
                fill="none"
                stroke-linecap="round"
                class={[`${name}__circle-inner`]}
                transform={`matrix(0,-1,1,0,0,${this.diameter})`}
                stroke-dasharray={this.strokeDashArr}
                style={this.circlePathStyle}
              />
            </svg>
          </div>
        )}
      </div>
    );
  },
});
