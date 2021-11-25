import { defineComponent, VNode } from 'vue';
import IconClearCircleFilled from '../icon/close-circle-filled';
import IconSuccessFill from '../icon/check-circle-filled';
import IconWarningFill from '../icon/error-circle-filled';
import IconsClearLine from '../icon/close';
import IconSuccessLine from '../icon/check';
import IconWarningLine from '../icon/error';
import { prefix } from '../config';
import { getBackgroundColor } from '../utils/helper';
import { PRO_THEME, CIRCLE_SIZE, CIRCLE_SIZE_PX, STATUS_ICON, CIRCLE_FONT_SIZE_RATIO } from './constants';
import props from './props';
// import { RenderTNodeTemplate } from '../utils/render-tnode';
import { renderTNodeJSX } from '../utils/render-tnode';
import { Styles } from '../common';

const name = `${prefix}-progress`;

export default defineComponent({
  name: 'TProgress',

  props: { ...props },

  data() {
    return {
      name,
    };
  },
  computed: {
    statusStyle(): string {
      if (this.percentage >= 100) {
        return 'success';
      }
      return this.status;
    },
    themeClass(): string {
      const Line = PRO_THEME.LINE;
      if (this.theme === Line) {
        return 'thin';
      }
      return this.theme;
    },
    trackBgStyle(): Styles {
      const { strokeWidth } = this;
      const height = typeof strokeWidth === 'string' ? strokeWidth : `${strokeWidth}px`;
      return {
        height,
        backgroundColor: this.trackColor,
        borderRadius: height,
      };
    },
    barStyle(): Styles {
      return {
        width: `${this.percentage}%`,
        background: this.color && getBackgroundColor(this.color),
      };
    },
    circlePathStyle(): Styles {
      const strokeColor = typeof this.color === 'object' ? '' : this.color;
      return {
        stroke: strokeColor,
      };
    },
    isShowIcon(): boolean {
      return STATUS_ICON.includes(this.status) && typeof this.label === 'boolean';
    },
    // theme=circle 获取直径
    diameter(): number {
      let diameter = CIRCLE_SIZE_PX.MEDIUM;
      if (!this.size) {
        return diameter;
      }
      const { SMALL, LARGE, MEDIUM } = CIRCLE_SIZE;
      switch (this.size) {
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
          diameter = Number(this.size);
          break;
      }
      return diameter;
    },
    rPoints(): number {
      return this.diameter / 2;
    },
    radius(): number {
      return this.rPoints - this.circleStrokeWidth / 2;
    },
    circleStyle(): Styles {
      if (this.theme !== PRO_THEME.CIRCLE) {
        return {};
      }

      let fontSize = this.diameter * CIRCLE_FONT_SIZE_RATIO.MEDIUM;
      if (this.diameter <= CIRCLE_SIZE_PX.SMALL) {
        fontSize = this.diameter * CIRCLE_FONT_SIZE_RATIO.SMALL;
      } else if (this.diameter >= CIRCLE_SIZE_PX.LARGE) {
        fontSize = this.diameter * CIRCLE_FONT_SIZE_RATIO.LARGE;
      }

      return {
        width: `${this.diameter}px`,
        height: `${this.diameter}px`,
        fontSize: `${fontSize}px`,
      };
    },
    // theme=circle 环形进度条 环形宽度
    circleStrokeWidth(): number {
      const defaultWidth = this.size === CIRCLE_SIZE.SMALL ? 4 : 6;
      return this.strokeWidth ? Number(this.strokeWidth) : defaultWidth;
    },
    strokeDashArr(): string {
      const radius = this.diameter / 2;
      const perimeter = Math.PI * 2 * (radius - this.circleStrokeWidth);
      const percent = this.percentage / 100;
      return `${perimeter * percent}  ${perimeter * (1 - percent)}`;
    },
    plumpStyles(): Styles {
      return {};
      // return this.percentage > 10 ? { color: '#fff' } : { right: '-2.5rem' };
    },
  },

  methods: {
    getIconMap() {
      const CIRCLE_ICONS = {
        success: IconSuccessLine,
        warning: IconWarningLine,
        error: IconsClearLine,
      };
      const NORMAL_ICONS = {
        success: IconSuccessFill,
        warning: IconWarningFill,
        error: IconClearCircleFilled,
      };
      return this.theme === PRO_THEME.CIRCLE ? CIRCLE_ICONS : NORMAL_ICONS;
    },
    getLabelContent() {
      let labelContent: string | VNode = `${this.percentage}%`;
      const status = this.status || '';
      if (STATUS_ICON.includes(status) && this.theme !== PRO_THEME.PLUMP) {
        const components = this.getIconMap();
        const component = components[status];
        if (component) {
          labelContent = <component class={[`${name}--icon`]}></component>;
        }
      }
      return labelContent;
    },
  },

  render() {
    const labelContent = (
      <div class={`${name}--info`}>{renderTNodeJSX(this, 'label', this.getLabelContent() as any)}</div>
    );
    // 进度大于 10 ，进度百分比显示在内部；进度百分比小于 10 进度显示在外部
    const PLUMP_SEPERATE = 10;
    const seperateClasses = this.percentage > PLUMP_SEPERATE ? `${name}--over-ten` : `${name}--under-ten`;
    return (
      <div class={name}>
        {this.theme === PRO_THEME.LINE && (
          <div class={`${name}--thin ${name}--status--${this.statusStyle}`}>
            <div class={`${name}--bar`} style={this.trackBgStyle}>
              <div class={`${name}--inner`} style={this.barStyle}></div>
            </div>
            {labelContent}
          </div>
        )}

        {this.theme === PRO_THEME.PLUMP && (
          <div
            class={[
              `${name}--bar ${name}--plump ${seperateClasses}`,
              { [`${name}--status--${this.statusStyle}`]: this.statusStyle },
            ]}
            style={this.trackBgStyle}
          >
            <div class={`${name}--inner`} style={this.barStyle}>
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
                class={['t-circle--outer']}
              />
              <circle
                cx={this.rPoints}
                cy={this.rPoints}
                r={this.radius}
                stroke-width={this.circleStrokeWidth}
                fill="none"
                stroke-linecap="round"
                class={['t-circle--inner']}
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
