import { defineComponent, computed, provide, VNode, Fragment, h } from 'vue';
import props from './props';
import { usePrefixClass } from '../hooks/useConfig';

function filterEmpty(children: VNode[] = []) {
  const nodes: VNode[] = [];
  children.forEach((child) => {
    if (Array.isArray(child)) {
      nodes.push(...child);
    } else if (child.type === Fragment) {
      nodes.push(...filterEmpty(child.children as VNode[]));
    } else {
      nodes.push(child);
    }
  });
  return nodes.filter(
    (c) =>
      !(
        c &&
        ((typeof Comment !== 'undefined' && c.type === Comment) ||
          (c.type === Fragment && c.children.length === 0) ||
          (c.type === Text && (c.children as string).trim() === ''))
      ),
  );
}

export default defineComponent({
  name: 'TTimeline',
  props: {
    ...props,
  },
  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('timeline');
    provide('timelineDirection', props.direction);
    provide('timelineMode', props.mode);

    const timelineClass = computed(() => [
      `${COMPONENT_NAME.value}`,
      {
        [`${COMPONENT_NAME.value}-horizontal`]: props.direction === 'horizontal',
      },
    ]);

    const children = filterEmpty(slots.default?.());
    const timeLineItems = props.reverse ? children.reverse() : children;

    const childrenSlot = {
      default: () => {
        return props.pending;
      },
      dot: () => {
        return <t-loading size="16px" />;
      },
    };

    return () => (
      <div class={timelineClass.value}>
        {timeLineItems}
        {props.pending ? <t-timeline-item v-slots={childrenSlot}></t-timeline-item> : null}
      </div>
    );
  },
});
