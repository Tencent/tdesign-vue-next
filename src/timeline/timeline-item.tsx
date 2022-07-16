import { defineComponent, computed, inject } from 'vue';
import props from './timeline-item.props';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TTimelineItem',
  props: {
    ...props,
    timelineItemIndex: {
      type: Number,
    },
  },
  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('timeline-item');
    const timelineDirection = inject('timelineDirection');
    const timelineMode = inject('timelineMode');

    const renderTimestamp = () => {
      if (props.hideTimestamp) {
        return null;
      }
      return slots.timestamp ? (
        <div class={`${COMPONENT_NAME.value}-timestamp`}>{slots.timestamp()}</div>
      ) : (
        <div class={`${COMPONENT_NAME.value}-timestamp`}>{props.timestamp}</div>
      );
    };

    const renderDesc = () => {
      return slots.description ? (
        <div class={`${COMPONENT_NAME.value}-description`}>{slots.description()}</div>
      ) : (
        <div class={`${COMPONENT_NAME.value}-description`}>{props.description}</div>
      );
    };

    return () => (
      <div
        class={[
          COMPONENT_NAME.value,
          `${COMPONENT_NAME.value}-${timelineMode}`,
          {
            [`${COMPONENT_NAME.value}-horizontal`]: timelineDirection === 'horizontal',
            [`${COMPONENT_NAME.value}-disabled`]: props.disabled,
          },
        ]}
      >
        <div
          class={[
            `${COMPONENT_NAME.value}-tail`,
            `${COMPONENT_NAME.value}-tail-${timelineDirection}`,
            { [`${COMPONENT_NAME.value}-tail-${timelineDirection}-dashed`]: props.dashed },
          ]}
        ></div>
        {slots.dot ? (
          <div style={{ background: props.hollow ? '#fff' : props.color }} class={`${COMPONENT_NAME.value}-dot-custom`}>
            {slots.dot()}
          </div>
        ) : (
          <div
            class={`${COMPONENT_NAME.value}-dot`}
            style={{ color: props.color, borderColor: props.color, background: props.hollow ? '#fff' : props.color }}
          ></div>
        )}
        <div
          class={[
            `${COMPONENT_NAME.value}-wrapper`,
            `${COMPONENT_NAME.value}-wrapper-${timelineDirection}
           
          `,
          ]}
        >
          <div class={`${COMPONENT_NAME.value}-content`}>{slots.default?.()}</div>
          {renderTimestamp()}
          {renderDesc()}
        </div>
      </div>
    );
  },
});
