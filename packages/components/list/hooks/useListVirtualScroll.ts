import { Ref, computed } from 'vue';

import log from '@tdesign/common-js/log/index';
import { useVirtualScrollNew } from '@tdesign/shared-hooks';
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
  const virtualConfig = useVirtualScrollNew(listRef, virtualScrollParams);
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
    const { index, key } = params;
    const targetIndex = index === 0 ? index : index ?? Number(key);
    if (!targetIndex && targetIndex !== 0) {
      log.error('List', 'scrollTo: `index` or `key` must exist.');
      return;
    }
    if (targetIndex < 0 || targetIndex >= listItems.value.length) {
      log.error('List', `${targetIndex} does not exist in data, check \`index\` or \`key\` please.`);
      return;
    }
    virtualConfig.scrollToElement({ ...params, index: targetIndex - 1 });
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
