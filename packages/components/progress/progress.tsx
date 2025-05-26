import { defineComponent, VNode, computed, CSSProperties, ref, nextTick } from 'vue';
import {
  CloseCircleFilledIcon as TdCloseCircleFilledIcon,
  CheckCircleFilledIcon as TdCheckCircleFilledIcon,
  ErrorCircleFilledIcon as TdErrorCircleFilledIcon,
  CloseIcon as TdCloseIcon,
  CheckIcon as TdCheckIcon,
  ErrorIcon as TdErrorIcon,
} from 'tdesign-icons-vue-next';

import { getBackgroundColor } from '@tdesign/common-js/utils/helper';
import { PRO_THEME, CIRCLE_SIZE, CIRCLE_SIZE_PX, STATUS_ICON, CIRCLE_FONT_SIZE_RATIO } from './consts';
import props from './props';

import { useTNodeJSX, useGlobalIcon, usePrefixClass, useResizeObserver } from '@tdesign/hooks';

import { isObject, isString } from 'lodash-es';

export default defineComponent({
  name: 'TProgress',
  props,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('progress');
    const { CloseCircleFilledIcon, CheckCircleFilledIcon, ErrorCircleFilledIcon, CloseIcon, CheckIcon, ErrorIcon } =
      useGlobalIcon({
        CloseCircleFilledIcon: TdCloseCircleFilledIcon,
        CheckCircleFilledIcon: TdCheckCircleFilledIcon,
        ErrorCircleFilledIcon: TdErrorCircleFilledIcon,
        CloseIcon: TdCloseIcon,
        CheckIcon: TdCheckIcon,
        ErrorIcon: TdErrorIcon,
      });

    const CIRCLE_ICONS_MAP = {
      success: CheckIcon,
      warning: ErrorIcon,
      error: CloseIcon,
    };
    const NORMAL_ICONS_MAP = {
      success: CheckCircleFilledIcon,
      warning: ErrorCircleFilledIcon,
      error: CloseCircleFilledIcon,
    };

    const statusStyle = computed(() => {
      if (!props.status && props.percentage >= 100) {
        return 'success';
      }
      return props.status || 'default';
    });

    const trackBgStyle = computed(() => {
      const style: CSSProperties = {};
      if (props.strokeWidth) {
        const height = isString(props.strokeWidth) ? props.strokeWidth : `${props.strokeWidth}px`;
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
      const strokeColor = isObject(props.color) ? '' : props.color;
      return {
        stroke: strokeColor,
      };
    });

    const circleOuterStyle = computed(() => {
      const strokeColor = isObject(props.trackColor) ? '' : props.trackColor;
      return {
        stroke: strokeColor,
      };
    });

    // theme=circle 获取直径
    const diameter = computed(() => {
      let diameterValue = CIRCLE_SIZE_PX.MEDIUM;
      if (!props.size) {
        return diameterValue;
      }
      const { SMALL, LARGE, MEDIUM } = CIRCLE_SIZE;
      switch (props.size) {
        case SMALL:
          diameterValue = CIRCLE_SIZE_PX.SMALL;
          break;
        case MEDIUM:
          diameterValue = CIRCLE_SIZE_PX.MEDIUM;
          break;
        case LARGE:
          diameterValue = CIRCLE_SIZE_PX.LARGE;
          break;
        default:
          const customSize = Number(props.size);
          diameterValue = !isNaN(customSize) && customSize > 0 ? customSize : CIRCLE_SIZE_PX.MEDIUM;
          break;
      }
      return diameterValue;
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

    const getIconMap = computed(() => {
      return props.theme === PRO_THEME.CIRCLE ? CIRCLE_ICONS_MAP : NORMAL_ICONS_MAP;
    });

    const getLabelContent = () => {
      let labelContentRender: string | VNode = `${props.percentage}%`;
      const status = props.status || '';
      if (STATUS_ICON.includes(status) && props.theme !== PRO_THEME.PLUMP) {
        const component = getIconMap.value[status as keyof typeof CIRCLE_ICONS_MAP];
        if (component) {
          labelContentRender = <component class={[`${COMPONENT_NAME.value}__icon`]}></component>;
        }
      }
      return labelContentRender;
    };

    // 当文字小于进度条宽度时，文字在进度条外部，否则在内部
    const infoIsOut = ref(true);
    const infoRef = ref<HTMLDivElement>(null);

    const separateClasses = computed(() => {
      return infoIsOut.value ? `${COMPONENT_NAME.value}--over-ten` : `${COMPONENT_NAME.value}--under-ten`;
    });

    async function updateInfoIsOut() {
      if (props.theme === PRO_THEME.PLUMP) {
        if (!infoRef.value || props.label === '') return;
        await nextTick();
        const infoEl =
          infoRef.value.querySelector(`.${COMPONENT_NAME.value}__info`) || infoRef.value.nextElementSibling;
        infoIsOut.value = infoRef.value.clientWidth > infoEl?.clientWidth + 10;
      }
    }

    useResizeObserver(infoRef, updateInfoIsOut);

    return () => {
      // 为了兼容 <xx label/> 被解析为空字符串的问题
      const labelRender = props.label === '' ? getLabelContent() : renderTNodeJSX('label', getLabelContent());
      const labelContent = <div class={`${COMPONENT_NAME.value}__info`}>{labelRender}</div>;

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
                `${COMPONENT_NAME.value}__bar ${COMPONENT_NAME.value}--plump ${separateClasses.value}`,
                { [`${COMPONENT_NAME.value}--status--${statusStyle.value}`]: statusStyle.value },
              ]}
              style={trackBgStyle.value}
            >
              <div class={`${COMPONENT_NAME.value}__inner`} ref={infoRef} style={barStyle.value}>
                {infoIsOut.value && labelContent}
              </div>
              {!infoIsOut.value && labelContent}
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
                  fill="none"
                  class={[`${COMPONENT_NAME.value}__circle-outer`]}
                  style={circleOuterStyle.value}
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
