import { defineComponent, computed, CSSProperties, Fragment } from 'vue';

import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

import { getFlexGapPolyFill } from '../_common/js/utils/helper';
import { useChildSlots } from '../hooks/slot';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';

import props from './props';

const sizeMap = { small: '8px', medium: '16px', large: '24px' };
const defaultNeedPolyfill = getFlexGapPolyFill();

export default defineComponent({
  name: 'TSpace',

  props: {
    ...props,
    /** 强制使用 margin 间距代替 gap 属性间距（某些浏览器不支持 gap 属性） */
    forceFlexGapPolyfill: Boolean,
  },

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('space');
    const renderTNodeJSX = useTNodeJSX();
    const getChildSlots = useChildSlots();

    const needPolyfill = computed(() => props.forceFlexGapPolyfill || defaultNeedPolyfill);

    const renderStyle = computed<CSSProperties>(() => {
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

      const style: { [key: string]: string | number } = {};
      if (needPolyfill.value) {
        const [columnGap, rowGap] = renderGap.split(' ');
        style['--td-space-column-gap'] = columnGap;
        style['--td-space-row-gap'] = rowGap || columnGap;
      } else {
        style.gap = renderGap;
      }
      return style;
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
          [`${COMPONENT_NAME.value}--break-line`]: props.breakLine,
          [`${COMPONENT_NAME.value}--polyfill`]: needPolyfill.value,
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
