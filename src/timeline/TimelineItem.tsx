import { defineComponent, inject, h } from 'vue';
import TimeLineItemProps from './time-line-item-props';
import { usePrefixClass } from '../hooks/useConfig';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import { TimelineInjectKey } from './hooks';
import Loading from '../loading';

const DefaultTheme = ['default', 'primary', 'success', 'warning', 'error'];

export default defineComponent({
  name: 'TTimelineItem',
  props: {
    ...TimeLineItemProps,
    index: {
      type: Number,
    },
  },

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('timeline-item');
    const TimelineProvider = inject(TimelineInjectKey);
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();

    // 计算节点模式 CSS 类名
    const getPositionClassName = (index: number) => {
      const { layout, renderAlign } = TimelineProvider.value;
      // 横向布局 以及 纵向布局对应为不同的样式名
      const left = layout === 'horizontal' ? 'top' : 'left';
      const right = layout === 'horizontal' ? 'bottom' : 'right';
      // 单独设置则单独生效
      if (renderAlign === 'alternate') {
        return props.labelAlign || index % 2 === 0
          ? `${COMPONENT_NAME.value}-${left}`
          : `${COMPONENT_NAME.value}-${right}`;
      }
      if (renderAlign === 'left' || renderAlign === 'top') {
        return `${COMPONENT_NAME.value}-${left}`;
      }
      if (renderAlign === 'right' || renderAlign === 'bottom') {
        return `${COMPONENT_NAME.value}-${right}`;
      }
      return '';
    };

    return () => {
      const { mode, theme, itemsStatus, reverse } = TimelineProvider.value;
      const { label, loading, dotColor, index } = props;

      let dotElement = renderTNodeJSX('dot');
      if (dotElement) {
        dotElement = h(renderTNodeJSX('dot'), {
          class: `${COMPONENT_NAME.value}__dot-content`,
        });
      }

      return (
        <li class={[`${COMPONENT_NAME.value}`, `${getPositionClassName(props.index)}`]}>
          {mode === 'alternate' && label && (
            <div class={[`${COMPONENT_NAME.value}__label`, `${COMPONENT_NAME.value}__label--${mode}`]}>{label}</div>
          )}
          <div class={`${COMPONENT_NAME.value}__wrapper`}>
            <div
              class={{
                [`${COMPONENT_NAME.value}__dot`]: true,
                [`${COMPONENT_NAME.value}__dot--custom`]: !!dotElement || (!dotElement && loading),
                [`${COMPONENT_NAME.value}__dot--${dotColor}`]: DefaultTheme.includes(dotColor),
              }}
              style={{ borderColor: !DefaultTheme.includes(dotColor) && dotColor }}
            >
              {!dotElement && loading && <Loading size="12px" class={`${COMPONENT_NAME.value}__dot-content`} />}
              {dotElement}
            </div>
            <div
              class={{
                [`${COMPONENT_NAME.value}__tail`]: true,
                [`${COMPONENT_NAME.value}__tail--theme-${theme}`]: true,
                [`${COMPONENT_NAME.value}__tail--status-${itemsStatus[index]}`]: reverse,
              }}
            />
          </div>
          <div class={`${COMPONENT_NAME.value}__content`}>
            {renderContent('default', 'content')}
            {mode === 'same' && label && (
              <div class={[`${COMPONENT_NAME.value}__label`, `${COMPONENT_NAME.value}__label--${mode}`]}>{label}</div>
            )}
          </div>
        </li>
      );
    };
  },
});
