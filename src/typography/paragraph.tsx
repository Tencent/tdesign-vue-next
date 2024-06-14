import { defineComponent, computed, ref, onMounted, PropType } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './paragraph-props';
import { TypographyEllipsis } from './type';
import TTooltip from '../tooltip/index';

export default defineComponent({
  name: 'TTypographyParagraph',
  components: { TTooltip },
  props: {
    style: {
      type: Object as PropType<Record<string, string | number>>,
      default: () => ({}),
    },
    ...props,
  },
  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('typography');
    const content = computed(() => {
      return props.content || slots?.default();
    });

    const ellipsisState = computed((): TypographyEllipsis => {
      const ellipsis = props.ellipsis;
      return {
        row: 1,
        expandable: false,
        ...(typeof ellipsis === 'object' ? ellipsis : null),
      };
    });

    const EllipsisStyles = computed((): any => {
      const ellipsis = ellipsisState.value;
      const def = {
        overflow: props.ellipsis ? 'hidden' : 'visible',
        textOverflow: props.ellipsis ? 'ellipsis' : 'initial',
        whiteSpace: props.ellipsis ? 'nowrap' : 'normal',
        display: 'block',
        WebkitLineClamp: ellipsis.row,
        WebkitBoxOrient: 'vertical',
      };
      if (ellipsis.row > 1) {
        def.whiteSpace = 'normal';
        def.display = '-webkit-box';
      }
      if (isExpand.value) {
        def.overflow = 'visible';
        def.whiteSpace = 'normal';
        def.display = 'initial';
      }
      return def;
    });
    const isExpand = ref(false);
    const onExpand = () => {
      isExpand.value = true;
      typeof props.ellipsis === 'object' &&
        typeof props.ellipsis?.onExpand === 'function' &&
        props.ellipsis.onExpand(true);
    };
    const onPackUp = () => {
      isExpand.value = false;
    };
    const renderEllipsisExpand = () => {
      const { suffix } = ellipsisState.value;
      let defSuffix: any = '更多';
      if (suffix) {
        defSuffix = suffix;
      }
      const moreNode = (
        <span
          class={COMPONENT_NAME.value + '-ellipsis-symbol'}
          onClick={onExpand}
          style="text-decoration:none;white-space:nowrap;flex: 1;"
        >
          {defSuffix}
        </span>
      );

      const { tooltipProps, expandable, collapsible } = ellipsisState.value;
      if (!isExpand.value && expandable) {
        return tooltipProps && tooltipProps.content ? (
          <TTooltip v-bind={tooltipProps} content={tooltipProps.content}>
            {moreNode}
          </TTooltip>
        ) : (
          moreNode
        );
      }
      if (expandable && isExpand.value && collapsible) {
        return (
          <span
            class={COMPONENT_NAME.value + '-ellipsis-symbol'}
            onClick={onPackUp}
            style="text-decoration:none;white-space:nowrap;flex: 1;"
          >
            收起
          </span>
        );
      }
    };
    const Ele = ref(null);

    onMounted(() => {});
    const boxStyle = computed(() => {
      return {
        display: 'flex',
        alignItems: 'flex-end',
        ...props.style,
      };
    });
    return () => {
      const { tooltipProps } = ellipsisState.value;
      return (
        <>
          <div class={COMPONENT_NAME.value} style={boxStyle.value}>
            {tooltipProps && <TTooltip content={tooltipProps.content} placement="top-right"></TTooltip>}
            <p style={props.ellipsis ? EllipsisStyles.value : {}} ref={Ele}>
              {content.value}
            </p>
            {renderEllipsisExpand()}
          </div>
        </>
      );
    };
  },
});
