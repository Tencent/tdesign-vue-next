import {
  defineComponent,
  computed,
  CSSProperties,
  Fragment,
  isVNode,
  getCurrentInstance,
  Comment,
  Teleport,
  VNodeChild,
} from 'vue';
import props from './props';
import { useTNodeJSX, usePrefixClass } from '@tdesign/shared-hooks';

import { isArray, isNumber, isString } from 'lodash-es';

import { getFlexGapPolyFill } from '@tdesign/common-js/utils/helper';
import { SizeEnum } from '../common';

const sizeMap = { small: '8px', medium: '16px', large: '24px' };
const defaultNeedPolyfill = getFlexGapPolyFill();

interface FlatChild {
  node: VNodeChild;
  // 子节点在「过滤前」的原始 slot 结构中的位置。注释节点（v-if 为假时编译产物）
  // 与 Teleport 也会占用一个位置，因此某个兄弟节点被过滤掉时，其余无 key 子节点的
  // 原始位置保持不变，可作为稳定的回退 key。
  position: number;
}

// 递归展开 Fragment，收集真正会被渲染的子节点，并为每个 slot 节点分配一个稳定的原始位置。
// 注释节点（Comment）、Teleport 以及空的 symbol 节点不会被渲染，但仍会占用一个位置，
// 以保证后续无 key 子节点的原始位置不会因为它们的出现/消失而发生偏移。
function flattenChildrenWithPosition(nodes: VNodeChild[], counter: { value: number }): FlatChild[] {
  const result: FlatChild[] = [];
  nodes.forEach((node) => {
    if (isVNode(node) && node.type === Fragment && isArray(node.children)) {
      result.push(...flattenChildrenWithPosition(node.children as VNodeChild[], counter));
      return;
    }
    const position = counter.value;
    counter.value += 1;
    const isSkipped =
      isVNode(node) &&
      (node.type === Comment || node.type === Teleport || (typeof node.type === 'symbol' && !node.children));
    if (isSkipped) return;
    result.push({ node, position });
  });
  return result;
}

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
    const instance = getCurrentInstance();

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
      const rawContent = (instance.slots.default?.() || []) as VNodeChild[];
      const children = flattenChildrenWithPosition(rawContent, { value: 0 });
      const separatorContent = renderTNodeJSX('separator');
      return children.map(({ node: child, position }, index) => {
        const showSeparator = index + 1 !== children.length && separatorContent;
        // 透传子节点自身的 key；若子节点无 key，则回退到它在「过滤前」原始 slot 结构中的位置，
        // 而不是过滤后的 index。否则当某个兄弟节点使用 v-if（编译为注释节点后被过滤，数组长度变化）时，
        // 无 key 子节点的回退 key 会随之偏移，导致 Vue 按索引对齐时把节点 patch 到错误的 DOM 上。
        // 该问题仅在生产构建下暴露，dev/HMR 因全量 props diff 而被掩盖。
        const key = isVNode(child) && child.key != null ? child.key : position;
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
