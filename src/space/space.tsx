import { defineComponent, computed, CSSProperties, Fragment } from 'vue';
import props from './props';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';

export default defineComponent({
  name: 'TSpace',

  props: { ...props },

  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('space');
    const renderTNodeJSX = useTNodeJSX();

    const renderStyle = computed<CSSProperties>(() => {
      const sizeMap = { small: '8px', medium: '16px', large: '24px' };

      let renderGap = '';
      if (Array.isArray(props.size)) {
        renderGap = props.size
          .map((s) => {
            if (typeof s === 'number') return `${s}px`;
            if (typeof s === 'string') return sizeMap[s] || s;
            return s;
          })
          .join(' ');
      } else if (typeof props.size === 'string') {
        renderGap = sizeMap[props.size] || props.size;
      } else if (typeof props.size === 'number') {
        renderGap = `${props.size}px`;
      }

      return {
        gap: renderGap,
        ...(props.breakLine ? { 'flex-wrap': 'wrap' } : {}),
      };
    });

    function renderChildren() {
      const children = slots.default();
      const childCount = children.length;
      const separatorContent = renderTNodeJSX('separator');
      return children.map((child, index) => {
        // filter last child
        const showSeparator = index + 1 !== childCount && separatorContent;
        return (
          <Fragment>
            <div class={`${COMPONENT_NAME.value}-item`}>{child}</div>
            {showSeparator && <div class={`${COMPONENT_NAME.value}-item-separator`}>{separatorContent}</div>}
          </Fragment>
        );
      });
    }

    return () => {
      const spaceClassNames = [
        `${COMPONENT_NAME.value}`,
        {
          [`${COMPONENT_NAME.value}-align-${props.align}`]: props.align,
          [`${COMPONENT_NAME.value}-${props.direction}`]: props.direction,
        },
      ];

      return (
        <div class={spaceClassNames} style={renderStyle.value}>
          {renderChildren()}
        </div>
      );
    };
  },
});
