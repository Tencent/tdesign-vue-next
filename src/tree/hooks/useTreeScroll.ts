import { computed, onMounted, TypeRef, useVirtualScroll, TypeScroll, TreeNode } from '../adapt';
import get from 'lodash/get';
import { TypeTreeState, TypeTimer } from '../tree-types';
import log from '../../_common/js/log';

import type { ComponentScrollToElementParams } from '../../common';

// tree 虚拟滚动整合
export default function useTreeScroll(state: TypeTreeState) {
  const treeState = state;
  const { props, context, allNodes, nodes, scope, treeContentRef, isScrolling } = treeState;

  const scrollProps: TypeRef<TypeScroll> = computed(() => ({
    // 默认一行高度为 34px
    rowHeight: 34,
    ...props.scroll,
  }));
  scope.scrollProps = scrollProps;

  // 虚拟滚动
  const virtualScrollParams = computed(() => {
    const list = allNodes.value.filter((node: TreeNode) => node.visible);
    return {
      data: list,
      scroll: scrollProps.value,
      preventResizeRefresh: true,
    };
  });

  const virtualConfig = useVirtualScroll(treeContentRef, virtualScrollParams);
  scope.virtualConfig = virtualConfig;
  treeState.virtualConfig = virtualConfig;

  onMounted(() => {
    const isVirtual = virtualConfig?.isVirtualScroll.value;
    if (isVirtual) {
      virtualConfig.handleScroll();
    }
  });

  const emitScrollEvent = (e: WheelEvent) => {
    props.onScroll?.({ e });
    // Vue3 ignore next line
    context.emit('scroll', { e });
  };

  // 设置滚动结束状态
  let scrollStopTimer: TypeTimer = null;
  const setScrolling = () => {
    isScrolling.value = true;
    if (scrollStopTimer) {
      clearTimeout(scrollStopTimer);
      scrollStopTimer = null;
    }
    scrollStopTimer = setTimeout(() => {
      scrollStopTimer = null;
      isScrolling.value = false;
    }, 100);
  };

  let lastScrollY = 0;
  const onInnerVirtualScroll = (e: WheelEvent) => {
    setScrolling();
    const isVirtual = virtualConfig?.isVirtualScroll.value;
    const target = (e.target || e.srcElement) as HTMLElement;
    const top = target.scrollTop;

    // 排除横向滚动触发的纵向虚拟滚动计算
    if (lastScrollY !== top) {
      if (isVirtual) {
        virtualConfig.handleScroll();
        nodes.value = virtualConfig.visibleData.value;
      }
    } else {
      lastScrollY = 0;
    }
    lastScrollY = top;
    emitScrollEvent(e);
  };

  const handleScrollTo = (params: ComponentScrollToElementParams) => {
    let index = params.index;
    if (!index && index !== 0) {
      if (!params.key) {
        log.error('Tree', 'scrollToElement: one of `index` or `key` must exist.');
        return;
      }
      index = allNodes.value?.findIndex((item) =>
        [get(item.data, 'key'), get(item.data, props.keys?.['value'] || 'value')].includes(params.key),
      );
      if (index < 0) {
        log.error('Tree', `${params.key} does not exist in data, check \`key\` or \`data\` please.`);
        return;
      }
    }
    virtualConfig.scrollToElement({ ...params, index: index - 1 });
  };
  return {
    // 虚拟滚动相关
    treeContentRef,
    onInnerVirtualScroll,
    virtualConfig,
    scrollToElement: handleScrollTo,
  };
}
