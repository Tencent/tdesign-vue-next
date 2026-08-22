import { defineComponent, computed, CSSProperties, Fragment, isVNode } from 'vue';
import props from './props';
import { useTNodeJSX, useChildSlots, usePrefixClass, useFlatChildrenSlots } from '@tdesign/shared-hooks';

import { isArray, isNumber, isString } from 'lodash-es';

import { getFlexGapPolyFill } from '@tdesign/common-js/utils/helper';
import { SizeEnum } from '../common';

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
    const getFlatChildren = useFlatChildrenSlots();

    const needPolyfill = computed(() => props.forceFlexGapPolyfill || defaultNeedPolyfill);

    const renderStyle = computed<CSSProperties>(() => {
      let renderGap = '';
      if (isArray(props.size)) {
        renderGap = props.size
          .map((s) => {
            if (isNumber(s)) return `${s}px`;
            if (isString(s) && ['small', 'medium', 'large'].includes(s)) return sizeMap[s as SizeEnum];
            return s;
          })
          .join(' ');
      } else if (isString(props.size)) {
        renderGap = ['small', 'medium', 'large'].includes(props.size) ? sizeMap[props.size as SizeEnum] : props.size;
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
      const children = getFlatChildren(getChildSlots());
      const separatorContent = renderTNodeJSX('separator');
      return children.map((child, index) => {
        const showSeparator = index + 1 !== children.length && separatorContent;
        // 透传子节点自身的 key，避免包裹层丢失 key 后 Vue 只能按索引对齐，
        // 在子节点使用 v-if（会被过滤成注释节点导致数组长度变化）时出现节点错配。
        const key = isVNode(child) && child.key != null ? child.key : index;
        return (
          <Fragment key={key}>
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
