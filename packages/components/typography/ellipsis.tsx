import { defineComponent, computed, ref } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './paragraph-props';
import TTooltip from '../tooltip/index';
import { useConfig } from '../config-provider/hooks/useConfig';

import type { TypographyEllipsis } from './type';

export default defineComponent({
  name: 'TEllipsis',
  components: { TTooltip },
  props: {
    ...props,
  },
  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('typography');
    const { globalConfig } = useConfig('typography');

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

    const ellipsisStyles = computed((): any => {
      const ellipsis = ellipsisState.value;
      const def = {
        overflow: props.ellipsis ? 'hidden' : 'visible',
        textOverflow: props.ellipsis ? 'ellipsis' : 'initial',
        whiteSpace: props.ellipsis ? 'normal' : 'nowrap',
        display: '-webkit-box',
        WebkitLineClamp: ellipsis.row,
        WebkitBoxOrient: 'vertical',
      };

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
      if (typeof props.ellipsis === 'object') props.ellipsis.onExpand?.(true);
    };

    const onCollapse = () => {
      isExpand.value = false;
      if (typeof props.ellipsis === 'object') props.ellipsis.onExpand?.(false);
    };

    const renderEllipsisExpand = () => {
      const { suffix } = ellipsisState.value;

      const moreNode = (
        <span
          class={`${COMPONENT_NAME.value}-ellipsis-symbol`}
          onClick={onExpand}
          style="text-decoration:none;white-space:nowrap;flex: 1;"
        >
          {suffix || globalConfig.value.expandText}
        </span>
      );

      const { tooltipProps, expandable, collapsible } = ellipsisState.value;
      if (!isExpand.value && expandable) {
        return tooltipProps && tooltipProps.content ? (
          <TTooltip {...tooltipProps} content={tooltipProps.content}>
            {moreNode}
          </TTooltip>
        ) : (
          moreNode
        );
      }
      if (expandable && isExpand.value && collapsible) {
        return (
          <span
            class={`${COMPONENT_NAME.value}-ellipsis-symbol`}
            onClick={onCollapse}
            style="text-decoration:none;white-space:nowrap;flex: 1;"
          >
            {globalConfig.value.collapseText}
          </span>
        );
      }
    };

    return () => {
      const { tooltipProps } = ellipsisState.value;
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          {tooltipProps && <TTooltip content={tooltipProps.content} placement="top-right"></TTooltip>}
          <p style={props.ellipsis ? ellipsisStyles.value : {}}>{content.value}</p>
          {renderEllipsisExpand()}
        </div>
      );
    };
  },
});
