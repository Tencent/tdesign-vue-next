import { defineComponent, ref, computed } from 'vue';
import Tooltip from '../tooltip';

export default defineComponent({
  name: 'EllipsisAPI',
  props: {
    rows: {
      type: Number,
      default: 1,
    },
    expandable: {
      type: Boolean,
      default: false,
    },
    tooltipProps: {
      type: Object,
      default: () => ({}),
    },
    onExpand: {
      type: Function,
      default: () => {},
    },
    suffix: {
      type: Function,
      default: (expanded: boolean) => (expanded ? '收起' : '展开'),
    },
    collapsible: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const isExpanded = ref(false);

    const handleExpand = () => {
      isExpanded.value = !isExpanded.value;
      props.onExpand(isExpanded.value);
    };
    const styles = computed((): any => {
      const def = {
        overflow: props.hidden ? 'hidden' : 'visible',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        WebkitLineClamp: props.rows,
        WebkitBoxOrient: 'vertical',
        width: '200px',
      };
      return def;
    });
    return () => (
      <>
        {props.hidden && <div style={styles.value}>{slots.default?.()}</div>}
        {!props.hidden && slots.default?.()}
        {props.expandable && (
          <Tooltip {...props.tooltipProps}>
            <span onClick={handleExpand}>{props.suffix(isExpanded.value)}</span>
          </Tooltip>
        )}
        {isExpanded.value && props.collapsible && <div>{slots.expanded?.()}</div>}
      </>
    );
  },
});
