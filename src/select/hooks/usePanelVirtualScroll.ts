import { Ref, computed, onMounted, onBeforeUnmount } from 'vue';

import { Styles } from '../../common';
import useVirtualScroll from '../../hooks/useVirtualScroll';
import { TdSelectProps } from '../type';

export const usePanelVirtualScroll = (props: {
  scroll: TdSelectProps['scroll'];
  popupContentRef: Ref<HTMLElement>;
  options: Ref<TdSelectProps['options']>;
}) => {
  const isVirtual = computed(
    () => props.scroll?.type === 'virtual' && props.options.value?.length > (props.scroll?.threshold || 100),
  );

  const {
    trs = null,
    visibleData = null,
    handleScroll: handleVirtualScroll = null,
    scrollHeight = null,
    translateY = null,
    handleRowMounted = null,
  } = props.scroll?.type === 'virtual'
    ? useVirtualScroll({
        container: props.popupContentRef,
        data: props.options,
        fixedHeight: props.scroll?.isFixedRowHeight || false,
        lineHeight: props.scroll?.rowHeight || 28, // 默认每行高度28
        bufferSize: props.scroll?.bufferSize || 20,
        threshold: props.scroll?.threshold || 100,
      })
    : {};
  let lastScrollY = -1;

  const onInnerVirtualScroll = (e: WheelEvent) => {
    if (!isVirtual.value) {
      return;
    }
    const target = e.target as HTMLElement;
    const top = target.scrollTop;
    // 排除横向滚动出发的纵向虚拟滚动计算
    if (Math.abs(lastScrollY - top) > 5) {
      handleVirtualScroll();
      lastScrollY = top;
    } else {
      lastScrollY = -1;
    }
  };

  // 监听popup滚动 处理虚拟滚动时的virtualData变化
  onMounted(() => {
    props.popupContentRef.value?.addEventListener('scroll', onInnerVirtualScroll);
  });

  // 卸载时取消监听
  onBeforeUnmount(() => {
    props.popupContentRef.value?.removeEventListener('scroll', onInnerVirtualScroll);
  });

  const cursorStyle = computed(
    () =>
      ({
        position: 'absolute',
        width: '1px',
        height: '1px',
        transition: 'transform 0.2s',
        transform: `translate(0, ${scrollHeight.value}px)`,
        '-ms-transform': `translate(0, ${scrollHeight.value}px)`,
        '-moz-transform': `translate(0, ${scrollHeight.value}px)`,
        '-webkit-transform': `translate(0, ${scrollHeight.value}px)`,
      } as Styles),
  );

  const panelStyle = computed(
    () =>
      ({
        transform: `translate(0, ${translateY.value}px)`,
        '-ms-transform': `translate(0, ${translateY.value}px)`,
        '-moz-transform': `translate(0, ${translateY.value}px)`,
        '-webkit-transform': `translate(0, ${translateY.value}px)`,
      } as Styles),
  );

  return {
    trs,
    scrollHeight,
    translateY,
    visibleData,
    handleRowMounted,
    isVirtual,
    cursorStyle,
    panelStyle,
  };
};
