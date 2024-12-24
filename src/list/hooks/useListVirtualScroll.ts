import { Ref, computed } from 'vue';
import get from 'lodash/get';

import log from '../../_common/js/log';
import useVirtualScroll from '../../hooks/useVirtualScrollNew';
import { TdListProps } from '../type';
import { Styles, type ComponentScrollToElementParams } from '../../common';

export const useListVirtualScroll = (
  scroll: TdListProps['scroll'],
  listRef: Ref<HTMLElement>,
  listItems: Ref<any[]>,
) => {
  const virtualScrollParams = computed(() => ({
    data: listItems.value,
    scroll: scroll,
  }));
  const virtualConfig = useVirtualScroll(listRef, virtualScrollParams);
  const isVirtualScroll = computed(() => virtualConfig.isVirtualScroll.value);
  let lastScrollY = -1;

  const onInnerVirtualScroll = (e: WheelEvent) => {
    const target = (e.target || e.srcElement) as HTMLElement;
    const top = target.scrollTop;
    if (lastScrollY !== top) {
      virtualConfig.isVirtualScroll.value && virtualConfig.handleScroll();
    } else {
      lastScrollY = -1;
    }
    lastScrollY = top;
  };

  const cursorStyle = computed(
    () =>
      ({
        position: 'absolute',
        width: '1px',
        height: '1px',
        transition: 'transform 0.2s',
        transform: `translate(0, ${virtualConfig.scrollHeight.value}px)`,
        '-ms-transform': `translate(0, ${virtualConfig.scrollHeight.value}px)`,
        '-moz-transform': `translate(0, ${virtualConfig.scrollHeight.value}px)`,
        '-webkit-transform': `translate(0, ${virtualConfig.scrollHeight.value}px)`,
      } as Styles),
  );

  const listStyle = computed(
    () =>
      ({
        transform: `translate(0, ${virtualConfig.translateY.value}px)`,
        '-ms-transform': `translate(0, ${virtualConfig.translateY.value}px)`,
        '-moz-transform': `translate(0, ${virtualConfig.translateY.value}px)`,
        '-webkit-transform': `translate(0, ${virtualConfig.translateY.value}px)`,
      } as Styles),
  );

  const handleScrollTo = (params: ComponentScrollToElementParams) => {
    let index = params.index;
    if (!index && index !== 0) {
      if (!params.key) {
        log.error('List', 'scrollTo: one of `index` or `key` must exist.');
        return;
      }
      index = listItems.value?.findIndex((item) => [get(item, 'key')].includes(params.key));
      if (index < 0) {
        log.error('List', `${params.key} does not exist in data, check \`key\` or \`data\` please.`);
        return;
      }
    }
    virtualConfig.scrollToElement({ ...params, index: index - 1 });
  };

  return {
    virtualConfig,
    cursorStyle,
    listStyle,
    isVirtualScroll,
    onInnerVirtualScroll,
    scrollToElement: handleScrollTo,
  };
};
