import { computed, defineComponent, h, nextTick, PropType, ref, watch } from 'vue';
import { expandClickEffect, valueChangeEffect } from '../utils';
import { CascaderContextType, TreeNode } from '../types';
import { usePrefixClass, useTNodeDefault } from '@tdesign/shared-hooks';
import Item from './Item';
import { getDefaultNode } from '@tdesign/shared-utils';

import CascaderProps from '../props';
import { useListVirtualScroll } from '../../list/hooks';

const props = {
  treeNodes: {
    type: Array as PropType<TreeNode[]>,
    default: [] as PropType<TreeNode[]>,
  },
  isFilter: {
    type: Boolean,
    default: false,
  },
  segment: {
    type: Boolean,
    default: true,
  },
  listKey: {
    type: String,
  },
  level: {
    type: Number,
    default: 0,
  },
  option: CascaderProps.option,
  trigger: CascaderProps.trigger,
  scroll: CascaderProps.scroll,
  cascaderContext: {
    type: Object as PropType<CascaderContextType>,
  },
};

export default defineComponent({
  name: 'TCascaderList',
  props,
  setup(props) {
    const renderTNodeJSXDefault = useTNodeDefault();
    const COMPONENT_NAME = usePrefixClass('cascader');
    const panelWrapperRef = ref<HTMLDivElement>(null);

    const treeNodes = computed(() => props.treeNodes);
    const isVisible = computed(() => props.cascaderContext.visible);

    const { virtualConfig, cursorStyle, listStyle, isVirtualScroll, onInnerVirtualScroll, scrollToElement } =
      useListVirtualScroll(props.scroll, panelWrapperRef, treeNodes as any);

    const handleExpand = (node: TreeNode, trigger: 'hover' | 'click') => {
      const { trigger: propsTrigger, cascaderContext } = props;
      expandClickEffect(propsTrigger, trigger, node, cascaderContext);
    };

    const renderItem = (node: TreeNode, index: number) => {
      const optionChild = node.data.content
        ? getDefaultNode(node.data.content(h))
        : renderTNodeJSXDefault('option', {
            params: {
              item: node.data,
              index,
              onExpand: () => handleExpand(node, 'click'),
              onChange: () => valueChangeEffect(node, props.cascaderContext),
            },
          });
      return (
        <Item
          key={node.value}
          node={node}
          optionChild={optionChild}
          cascaderContext={props.cascaderContext}
          onClick={() => {
            handleExpand(node, 'click');
          }}
          onMouseenter={() => {
            handleExpand(node, 'hover');
          }}
          onChange={() => {
            valueChangeEffect(node, props.cascaderContext);
          }}
        />
      );
    };

    const onScrollIntoView = () => {
      const { level, treeNodes, cascaderContext } = props;
      const checkedNodes = cascaderContext.treeStore.getCheckedNodes();
      let lastCheckedNodes = checkedNodes[checkedNodes.length - 1];
      let index = -1;
      if (lastCheckedNodes?.level === level) {
        index = treeNodes.findLastIndex((item) => item.value === lastCheckedNodes.value);
      } else {
        while (lastCheckedNodes) {
          if (lastCheckedNodes?.level === level) {
            // eslint-disable-next-line no-loop-func
            index = treeNodes.findIndex((item) => item.value === lastCheckedNodes.value);
            break;
          }
          lastCheckedNodes = lastCheckedNodes?.parent;
        }
      }
      if (index !== -1) {
        scrollToElement({
          index,
        });
      }
    };

    const handleScroll = (event: WheelEvent): void => {
      if (isVirtualScroll.value) onInnerVirtualScroll(event as unknown as WheelEvent);
    };

    watch(
      isVisible,
      () => {
        if (props.scroll && props.cascaderContext.visible) {
          setTimeout(() => {
            nextTick(() => {
              onScrollIntoView();
            });
          }, 16);
        }
      },
      {
        immediate: true,
      },
    );

    return () => {
      const { treeNodes, isFilter, segment, listKey: key } = props;

      return (
        <div
          ref={panelWrapperRef}
          onScroll={handleScroll}
          class={[
            `${COMPONENT_NAME.value}__menu`,
            'narrow-scrollbar',
            {
              [`${COMPONENT_NAME.value}__menu--segment`]: segment,
              [`${COMPONENT_NAME.value}__menu--filter`]: isFilter,
            },
          ]}
          style={{
            position: isVirtualScroll ? 'relative' : undefined,
          }}
        >
          {isVirtualScroll ? (
            <>
              <div style={cursorStyle.value}></div>
              <ul key={key} style={listStyle.value}>
                {virtualConfig.visibleData.value.map((node, index) => renderItem(node, index))}
              </ul>
            </>
          ) : (
            <ul key={key}>{treeNodes.map((node: TreeNode, index: number) => renderItem(node, index))}</ul>
          )}
        </div>
      );
    };
  },
});
