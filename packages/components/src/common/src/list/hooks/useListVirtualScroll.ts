import { Ref, computed } from 'vue';
import useVirtualScroll from '../../hooks/useVirtualScrollNew';
import { TdListProps } from '../type';
import { Styles } from '../../common';

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

  return {
    virtualConfig,
    cursorStyle,
    listStyle,
    isVirtualScroll,
    onInnerVirtualScroll,
  };
};
