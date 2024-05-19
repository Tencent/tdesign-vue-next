import { defineComponent, inject } from '@td/adapter-vue';
import { omit } from 'lodash-es';
import props from '@td/intel/timeline/timeline-item-props';
import { usePrefixClass } from '@td/adapter-hooks';
import { useContent, useTNodeJSX } from '@td/adapter-hooks';
import { TimelineInjectKey, DEFAULT_PROVIDER } from './hooks';
import Loading from '../loading';

const DEFAULT_THEME = ['default', 'primary', 'success', 'warning', 'error'];

export default defineComponent({
  name: 'TTimelineItem',
  props: {
    ...props,
    index: {
      type: Number,
    },
  },

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('timeline-item');
    // unit test need default value

    const TimelineProvider = inject(TimelineInjectKey, DEFAULT_PROVIDER);
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();

    // 计算节点模式 CSS 类名
    const getPositionClassName = (index: number) => {
      const { layout, renderAlign } = TimelineProvider.value;
      // TimelineItem.labelAlign > Timeline.labelAlign
      const timelineItemAlign = props.labelAlign ?? renderAlign;
      // 横向布局 以及 纵向布局对应为不同的样式名
      const left = layout === 'horizontal' ? 'top' : 'left';
      const right = layout === 'horizontal' ? 'bottom' : 'right';
      // 单独设置则单独生效
      if (timelineItemAlign === 'alternate') {
        return index % 2 === 0 ? `${COMPONENT_NAME.value}-${left}` : `${COMPONENT_NAME.value}-${right}`;
      }
      if (timelineItemAlign === 'left' || timelineItemAlign === 'top') {
        return `${COMPONENT_NAME.value}-${left}`;
      }
      if (timelineItemAlign === 'right' || timelineItemAlign === 'bottom') {
        return `${COMPONENT_NAME.value}-${right}`;
      }
      return '';
    };
    const handleClick = (e: MouseEvent) => {
      props.onClick?.({ e, item: omit(props, ['index']) });
    };

    return () => {
      const { mode, theme, itemsStatus, reverse } = TimelineProvider.value;
      const { loading, dotColor, index } = props;

      const labelNode = renderTNodeJSX('label');
      const dotElement = renderTNodeJSX('dot');

      const dotContentClass = `${COMPONENT_NAME.value}__dot-content`;
      if (dotElement?.props) {
        const classes = dotElement?.props?.class;
        dotElement.props.class = classes ? [dotContentClass, classes].join(' ') : dotContentClass;
      }

      return (
        <li class={[`${COMPONENT_NAME.value}`, `${getPositionClassName(props.index)}`]} onClick={handleClick}>
          {mode === 'alternate' && labelNode && (
            <div class={[`${COMPONENT_NAME.value}__label`, `${COMPONENT_NAME.value}__label--${mode}`]}>{labelNode}</div>
          )}
          <div class={`${COMPONENT_NAME.value}__wrapper`}>
            <div
              class={{
                [`${COMPONENT_NAME.value}__dot`]: true,
                [`${COMPONENT_NAME.value}__dot--custom`]: !!dotElement || (!dotElement && loading),
                [`${COMPONENT_NAME.value}__dot--${dotColor}`]: DEFAULT_THEME.includes(dotColor),
              }}
              style={{ borderColor: !DEFAULT_THEME.includes(dotColor) && dotColor }}
            >
              {!dotElement && loading && <Loading size="12px" class={dotContentClass} />}
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
            {mode === 'same' && labelNode && (
              <div class={[`${COMPONENT_NAME.value}__label`, `${COMPONENT_NAME.value}__label--${mode}`]}>
                {labelNode}
              </div>
            )}
          </div>
        </li>
      );
    };
  },
});
