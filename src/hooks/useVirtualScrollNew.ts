/**
 * 基于原作者（@louiszhai）的思路二次开发，为保证其他组件暂不受影响，单独开一个文件
 * 新增支持以下 3 个特性
 * 1. 支持不同表格高度
 * 2. 支持滚动到特定元素，方便 Select 等组件展开时直接定位到选中元素
 * 3. 支持数据变化不重置，方便支持树形结构虚拟滚动
 */
import { ref, computed, watch, Ref } from 'vue';
import { TScroll } from '../common';
import useResizeObserver from './useResizeObserver';

export type UseVirtualScrollParams = Ref<{
  /** 列数据 */
  data: { [key: string]: any }[];
  scroll: TScroll;
}>;

export interface ScrollToElementParams {
  /** 跳转元素下标 */
  index: number;
  /** 跳转元素距离顶部的距离 */
  top?: number;
  /** 单个元素高度非固定场景下，即 isFixedRowHeight = false。延迟设置元素位置，一般用于依赖不同高度异步渲染等场景，单位：毫秒 */
  time?: number;
  behavior?: 'auto' | 'smooth';
}

const useVirtualScroll = (container: Ref<HTMLElement>, params: UseVirtualScrollParams) => {
  /** 注意测试：数据长度为空；数据长度小于表格高度等情况。即期望只有数据量达到一定程度才允许开启虚拟滚动 */
  const visibleData = ref<any[]>([]);
  // 用于显示表格列
  const translateY = ref((params.value.data?.length || 0) * (params.value.scroll?.rowHeight || 50));
  // 滚动高度，用于显示滚动条
  const scrollHeight = ref(0);
  const trScrollTopHeightList = ref<number[]>([]);
  // 已经通过节点渲染计算出来的各自行高
  const trHeightList = ref<number[]>([]);
  const containerHeight = ref(0);
  const containerWidth = ref(0);
  const startAndEndIndex = ref<[number, number]>([0, 15]);

  // 设置初始值
  const tScroll = computed(() => {
    const { scroll } = params.value;
    if (!scroll) return {};
    return {
      bufferSize: scroll.bufferSize || 10,
      isFixedRowHeight: scroll.isFixedRowHeight ?? false,
      rowHeight: scroll.rowHeight || 47,
      threshold: scroll.threshold || 100,
      type: scroll.type,
    };
  });

  // 当前场景是否满足开启虚拟滚动的条件
  const isVirtualScroll = computed(() => {
    const { data } = params.value;
    return tScroll.value.type === 'virtual' && tScroll.value.threshold < data.length;
  });

  const getTrScrollTopHeightList = (trHeightList: number[], containerHeight: number) => {
    const list: number[] = [];
    const { data } = params.value;
    // 当前行滚动高度 = 上一行滚动高度 + 当前行高度 + 容器高度
    for (let i = 0, len = data.length; i < len; i++) {
      list[i] = (list[i - 1] || containerHeight) + (trHeightList[i] || tScroll.value.rowHeight);
    }
    return list;
  };

  const tripleBufferSize = computed(() => tScroll.value.bufferSize * 3);

  const updateVisibleData = (trScrollTopHeightList: number[], scrollTop: number) => {
    let currentIndex = -1;
    // 获取当前滚动到哪一个元素（大数据场景不建议使用 forEach 一类函数迭代）
    for (let i = 0, len = trScrollTopHeightList.length; i < len; i++) {
      if (trScrollTopHeightList[i] > scrollTop) {
        currentIndex = i;
        break;
      }
    }
    if (currentIndex < 0) return;
    const startIndex = Math.min(currentIndex, trScrollTopHeightList.length - tripleBufferSize.value);
    const endIndex = startIndex + tripleBufferSize.value;
    if (startAndEndIndex.value.join() !== [startIndex, endIndex].join() && startIndex >= 0) {
      visibleData.value = params.value.data.slice(startIndex, endIndex);
      const lastScrollTop = trScrollTopHeightList[startIndex - 1];
      const top = lastScrollTop > 0 ? lastScrollTop - containerHeight.value : 0;
      translateY.value = top;
      startAndEndIndex.value = [startIndex, endIndex];
    }
  };

  // 固定高度场景，不需要通过行渲染获取高度（仅非固定高度场景需要）
  const handleRowMounted = (rowData: any) => {
    if (!isVirtualScroll.value || !rowData || tScroll.value.isFixedRowHeight || !container.value) return;
    const trHeight = rowData.ref.value?.getBoundingClientRect().height;
    const rowIndex = rowData.data.__VIRTUAL_SCROLL_INDEX;
    const newTrHeightList = trHeightList.value;
    if (newTrHeightList[rowIndex] !== trHeight) {
      newTrHeightList[rowIndex] = trHeight;
      const scrollTopHeightList = getTrScrollTopHeightList(newTrHeightList, containerHeight.value);
      trScrollTopHeightList.value = scrollTopHeightList;

      const lastIndex = scrollTopHeightList.length - 1;
      scrollHeight.value = scrollTopHeightList[lastIndex] - containerHeight.value;
      updateVisibleData(scrollTopHeightList, container.value.scrollTop);
    }
  };

  const handleScroll = () => {
    if (!isVirtualScroll.value) return;
    updateVisibleData(trScrollTopHeightList.value, container.value.scrollTop);
  };

  const refreshVirtualScroll = ([{ contentRect }]: [ResizeObserverEntry]) => {
    // 如果宽度发生变化，重置滚动位置（高度发生变化时，会触发 container 变化，下方的 watch 会计算）
    const maxScrollbarWidth = 16;
    if (Math.abs(contentRect.width - containerWidth.value) > maxScrollbarWidth) {
      container.value.scrollTop = 0;
      translateY.value = 0;
    }
    containerWidth.value = contentRect.width;
    containerHeight.value = contentRect.height;
  };

  const addIndexToData = (data: any[]) => {
    data.forEach((item, index) => {
      // eslint-disable-next-line
      item['__VIRTUAL_SCROLL_INDEX'] = index;
    });
  };

  const updateScrollTop = ({ index, top = 0, behavior }: ScrollToElementParams) => {
    const scrollTop = trScrollTopHeightList.value[index] - containerHeight.value - top;
    container.value.scrollTo({
      top: scrollTop,
      behavior: behavior || 'auto',
    });
  };

  /**
   * 滚动到指定元素（对外暴露的方法，谨慎修改）
   */
  const scrollToElement = (p: ScrollToElementParams) => {
    updateScrollTop(p);
    // 不同行高的表格需要异步计算
    if (!tScroll.value.isFixedRowHeight) {
      const duration = p.time ?? 60;
      const timer = setTimeout(() => {
        updateScrollTop(p);
        clearTimeout(timer);
      }, duration);
    }
  };

  useResizeObserver(isVirtualScroll.value ? container : undefined, refreshVirtualScroll);

  // 固定高度场景，可直接通过数据长度计算出最大滚动高度
  watch(
    () => [[...params.value.data, tScroll, isVirtualScroll, container]],
    () => {
      if (!isVirtualScroll.value) return;
      const { data } = params.value;
      addIndexToData(data);
      const startIndex = startAndEndIndex.value[0];
      visibleData.value = data.slice(startIndex, startIndex + tripleBufferSize.value);

      // get container dom after one tick
      const timer = setTimeout(() => {
        if (container.value) {
          containerHeight.value = container.value.getBoundingClientRect().height;
          const scrollTopHeightList = getTrScrollTopHeightList(trHeightList.value || [], containerHeight.value);
          trScrollTopHeightList.value = scrollTopHeightList;
        }
        clearTimeout(timer);
      }, 0);
    },
    { immediate: true },
  );

  return {
    visibleData,
    translateY,
    scrollHeight,
    isVirtualScroll,
    handleScroll,
    handleRowMounted,
    scrollToElement,
  };
};

export type VirtualScrollConfig = ReturnType<typeof useVirtualScroll>;

export default useVirtualScroll;
