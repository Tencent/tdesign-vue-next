import { defineComponent, computed, CSSProperties, Fragment } from 'vue';
import props from './props';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';
import { useChildSlots } from '../hooks/slot';
import { isNumber, isString, isArray } from 'lodash-es';

export default defineComponent({
  name: 'TSpace',

  props: { ...props },

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('space');
    const renderTNodeJSX = useTNodeJSX();
    const getChildSlots = useChildSlots();

    const renderStyle = computed<CSSProperties>(() => {
      const sizeMap = { small: '8px', medium: '16px', large: '24px' };

      let renderGap = '';
      if (isArray(props.size)) {
        renderGap = props.size
          .map((s) => {
            if (isNumber(s)) return `${s}px`;
            if (isString(s)) return sizeMap[s] || s;
            return s;
          })
          .join(' ');
      } else if (isString(props.size)) {
        renderGap = sizeMap[props.size] || props.size;
      } else if (isNumber(props.size)) {
        renderGap = `${props.size}px`;
      }

      return {
        gap: renderGap,
        ...(props.breakLine ? { 'flex-wrap': 'wrap' } : {}),
      };
    });

    function renderChildren() {
      const children = getChildSlots();
      const separatorContent = renderTNodeJSX('separator');
      return children.map((child, index) => {
        // filter last child
        const showSeparator = index + 1 !== children.length && separatorContent;
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
