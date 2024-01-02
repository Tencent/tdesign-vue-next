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
import { max, min } from 'lodash';

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

const useVirtualScroll = (container: Ref<HTMLElement | null>, params: UseVirtualScrollParams) => {
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

  const getTrScrollTopHeightList = (trHeightList: number[]) => {
    const list: number[] = [];
    const { data } = params.value;
    // 当前行滚动高度 = 上一行滚动高度 + 当前行高度 + 容器高度
    for (let i = 0, len = data.length; i < len; i++) {
      list[i] = (list[i - 1] ?? 0) + (trHeightList[i] ?? tScroll.value.rowHeight);
    }
    return list;
  };

  function getVisibleStartRowIndex() {
    const scrollTop = container.value?.scrollTop ?? 0;
    let currentIndex = -1;
    // 获取当前可视区域第一个元素
    for (let i = 0, len = trScrollTopHeightList.value.length; i < len; i++) {
      if (trScrollTopHeightList.value[i] > scrollTop) {
        currentIndex = i;
        break;
      }
    }
    return currentIndex;
  }

  function getVisibleEndRowIndex() {
    const scrollTop = container.value?.scrollTop ?? 0;
    let currentIndex = -1;
    // 获取当前可视区域最后一个元素
    for (let i = 0, len = trScrollTopHeightList.value.length; i < len; i++) {
      if (trScrollTopHeightList.value[i] > containerHeight.value + scrollTop || i === params.value.data.length - 1) {
        currentIndex = i;
        break;
      }
    }
    return currentIndex;
  }

  function getVisibleRowRange() {
    // 前后偏移 buffer
    const startIndex = Math.max(getVisibleStartRowIndex() - tScroll.value.bufferSize, 0);
    const endIndex = getVisibleEndRowIndex() + tScroll.value.bufferSize;
    return {
      startIndex: max([0, startIndex]),
      endIndex: min([params.value.data.length, endIndex]),
    };
  }

  const updateVisibleData = () => {
    // 计算前后的buffer偏移后的渲染数据
    const { startIndex, endIndex } = getVisibleRowRange();
    if (startAndEndIndex.value.join() !== [startIndex, endIndex].join() && startIndex >= 0) {
      const lastScrollTop = trScrollTopHeightList.value[startIndex - 1];
      const top = lastScrollTop > 0 ? lastScrollTop : 0;
      translateY.value = top;
      visibleData.value = params.value.data.slice(startIndex, endIndex);
      startAndEndIndex.value = [startIndex, endIndex];
    }
  };

  // 固定高度场景，不需要通过行渲染获取高度（仅非固定高度场景需要）
  const handleRowMounted = (rowData: any) => {
    if (!isVirtualScroll.value || !rowData || tScroll.value.isFixedRowHeight || !container.value) return;
    const trHeight = rowData.ref.value?.getBoundingClientRect().height;
    const rowIndex = rowData.data.VIRTUAL_SCROLL_INDEX;
    if (trHeightList.value[rowIndex] !== trHeight) {
      // 直接修改 trHeightList 即可，原逻辑将引用拷贝，实际上还是修改了，但代码语义不对，容易忽略
      trHeightList.value.splice(rowIndex, 1, trHeight);
      const scrollTopHeightList = getTrScrollTopHeightList(trHeightList.value);
      trScrollTopHeightList.value = scrollTopHeightList;

      const lastIndex = scrollTopHeightList.length - 1;
      scrollHeight.value = scrollTopHeightList[lastIndex] - containerHeight.value;
    }
  };

  const handleScroll = () => {
    if (!isVirtualScroll.value) return;
    updateVisibleData();
  };

  const refreshVirtualScroll = ([{ contentRect }]: [ResizeObserverEntry]) => {
    // 如果宽度发生变化，重置滚动位置
    const maxScrollbarWidth = 16;
    if (Math.abs(contentRect.width - containerWidth.value) > maxScrollbarWidth) {
      container.value.scrollTop = 0;
      translateY.value = 0;
    }
    containerWidth.value = contentRect.width;
    // 高度更新后，由 height 独立的 watch 触发可视区域的更新
    containerHeight.value = contentRect.height;
  };

  const addIndexToData = (data: any[]) => {
    data.forEach((item, index) => {
      // eslint-disable-next-line
      item['VIRTUAL_SCROLL_INDEX'] = index;
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
    () => [[...params.value.data, tScroll.value, isVirtualScroll.value, container.value]],
    () => {
      if (!isVirtualScroll.value || !container.value) return;
      const { data } = params.value;
      addIndexToData(data);

      // 有可能初始化时，resize 监听没触发，尝试设置初始化容器高度
      containerHeight.value = container.value.getBoundingClientRect().height;

      // data 或者 rowHeight 发生了变化，清空之前记录的高度
      trHeightList.value = [];
      const scrollTopHeightList = getTrScrollTopHeightList([]);
      trScrollTopHeightList.value = scrollTopHeightList;

      // 清除记录的滚动顺序
      startAndEndIndex.value = [0, 0];
      updateVisibleData();
    },
    { immediate: true },
  );

  // 当容器高度变化后，重新计算可视区域数据
  watch(
    () => containerHeight.value,
    () => {
      updateVisibleData();
    },
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
