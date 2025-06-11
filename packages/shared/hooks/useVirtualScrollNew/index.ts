/**
 * 基于原作者（@louiszhai）的思路二次开发，为保证其他组件暂不受影响，单独开一个文件
 * 新增支持以下 3 个特性
 * 1. 支持不同表格高度
 * 2. 支持滚动到特定元素，方便 Select 等组件展开时直接定位到选中元素
 * 3. 支持数据变化不重置，方便支持树形结构虚拟滚动
 */
import { ref, computed, watch, Ref } from 'vue';
// TODO need refactor
import { TScroll } from '../../components/common';
import { useResizeObserver } from '../useResizeObserver';
import { max, min, sum, throttle } from 'lodash-es';

export type UseVirtualScrollParams = Ref<{
  /** 列数据 */
  data: { [key: string]: any }[];
  scroll: TScroll & {
    /** 固定行（冻结行），示例：[M, N]，表示冻结头 M 行和尾 N 行。M 和 N 值为 0 时，表示不冻结行 */
    fixedRows?: Array<number>;
  };
  preventResizeRefresh?: boolean;
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

export function useVirtualScrollNew(container: Ref<HTMLElement | null>, params: UseVirtualScrollParams) {
  /** 注意测试：数据长度为空；数据长度小于表格高度等情况。即期望只有数据量达到一定程度才允许开启虚拟滚动 */
  const visibleData = ref<any[]>([]);
  // 用于显示表格列
  const translateY = ref((params.value.data?.length || 0) * (params.value.scroll?.rowHeight || 50));
  // 滚动高度，用于显示滚动条
  const scrollHeight = ref(0);
  // 已经通过节点渲染计算出来的各自行高
  // 不要使用响应式，数据量大时会产生卡顿
  let trHeightList: number[] = [];
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
      fixedRows: scroll.fixedRows ?? [0, 0],
    };
  });

  // 当前场景是否满足开启虚拟滚动的条件
  const isVirtualScroll = computed(() => {
    const { data } = params.value;
    return tScroll.value.type === 'virtual' && tScroll.value.threshold < data.length;
  });

  // 一次循环遍历中计算可视范围的相关信息，减少大数据量时的遍历开销
  function getVisibleRangeConfig() {
    const scrollTop = container.value?.scrollTop ?? 0;
    const fixedStart = tScroll.value.fixedRows[0];

    // 记录前置 buffer 的高度
    const prevBufferHeightList: number[] = [];
    // 没有被渲染的行的高度，用于设定容器的 translateY
    let hiddenHeight = 0;

    let visibleStart = -1;
    let visibleEnd = -1;

    let totalHeight = 0;

    for (let i = 0, len = params.value.data.length; i < len; i++) {
      const rowHeight = trHeightList[i] ?? tScroll.value.rowHeight;
      totalHeight = totalHeight + rowHeight;
      // 获取第一个可视范围内的元素
      if (totalHeight > scrollTop && visibleStart === -1) {
        visibleStart = i;
        if (visibleStart - tScroll.value.bufferSize > 0) {
          hiddenHeight = totalHeight - rowHeight - sum(prevBufferHeightList);
        }
      }
      if (visibleStart === -1) {
        prevBufferHeightList.push(rowHeight);
        if (prevBufferHeightList.length > tScroll.value.bufferSize) {
          prevBufferHeightList.shift();
        }
      }
      // 获取最后一个可视范围内的元素
      if (
        visibleEnd === -1 &&
        (totalHeight > containerHeight.value + scrollTop || i === params.value.data.length - 1)
      ) {
        visibleEnd = i;
      }

      if (visibleStart !== -1 && visibleEnd !== -1) {
        // 不再统计高度
        break;
      }
    }

    // 前后偏移 buffer
    const startIndex = max([visibleStart - tScroll.value.bufferSize, 0]);
    const endIndex = min([visibleEnd + tScroll.value.bufferSize, params.value.data.length]);

    // 以 sticky 定位渲染的固定行，会占据高度，影响整体高度
    const stickyHeight = sum(trHeightList.slice(0, Math.min(startIndex, fixedStart)));

    return {
      startIndex,
      endIndex,
      translateY: hiddenHeight - stickyHeight,
    };
  }

  const updateVisibleData = throttle(() => {
    // 计算前后的buffer偏移后的渲染数据
    const { startIndex, endIndex, translateY: translateYValue } = getVisibleRangeConfig();

    // 需要考虑固定行的情况
    const fixedRows = tScroll.value.fixedRows;
    const [fixedStart, fixedEnd] = fixedRows;
    let fixedStartData = fixedStart ? params.value.data.slice(0, fixedStart) : [];
    if (fixedStart && startIndex < fixedStart) {
      fixedStartData = fixedStartData.slice(0, startIndex);
    }
    let fixedEndData = fixedEnd ? params.value.data.slice(params.value.data.length - fixedEnd) : [];
    const bottomStartIndex = endIndex - params.value.data.length + 1 + (fixedEnd ?? 0);
    if (fixedEnd && bottomStartIndex > 0) {
      fixedEndData = fixedEndData.slice(bottomStartIndex);
    }

    if (startAndEndIndex.value.join() !== [startIndex, endIndex].join() && startIndex >= 0) {
      translateY.value = translateYValue;
      visibleData.value = fixedStartData.concat(params.value.data.slice(startIndex, endIndex), fixedEndData);
      startAndEndIndex.value = [startIndex, endIndex];
    }
  }, 100);

  // 固定高度场景，不需要通过行渲染获取高度（仅非固定高度场景需要）
  const handleRowMounted = (rowData: any) => {
    if (!isVirtualScroll.value || !rowData || tScroll.value.isFixedRowHeight || !container.value) return;
    const trHeight = rowData.ref.value?.getBoundingClientRect().height || tScroll.value.rowHeight;
    const rowIndex = rowData.data.VIRTUAL_SCROLL_INDEX;

    if (trHeightList[rowIndex] !== trHeight) {
      const diff = trHeight - trHeightList[rowIndex];
      trHeightList[rowIndex] = trHeight;
      // 采用 diff 的方式更新，不再遍历数组
      scrollHeight.value = scrollHeight.value + diff;
    }
  };

  const handleScroll = () => {
    if (!isVirtualScroll.value) return;
    updateVisibleData();
  };

  const refreshVirtualScroll = ([{ contentRect }]: [ResizeObserverEntry]) => {
    // 如果宽度发生变化，重置滚动位置
    if (params.value.preventResizeRefresh) return;
    const maxScrollbarWidth = 16;
    if (Math.abs(contentRect.width - containerWidth.value) > maxScrollbarWidth && !!container.value) {
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
    const scrollTop = sum(trHeightList.slice(0, index + 1)) - top;

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

  // 如果初始化时 isVirtualScroll 为 false，undefined 的 ref 会导致无法监听元素高度变化
  useResizeObserver(
    computed(() => (isVirtualScroll.value ? container.value : undefined)),
    refreshVirtualScroll,
  );

  // 固定高度场景，可直接通过数据长度计算出最大滚动高度
  watch(
    () => [[...params.value.data], tScroll.value, isVirtualScroll.value, container.value],
    () => {
      if (!isVirtualScroll.value || !container.value) return;
      const { data } = params.value;
      addIndexToData(data);

      // 有可能初始化时，resize 监听没触发，尝试设置初始化容器高度
      containerHeight.value = container.value.getBoundingClientRect().height;

      if (trHeightList.length !== params.value.data.length) {
        // 暂时对于 table 和 tree 场景，信任之前缓存的行高
        // 后续优化可能提供一个参数，进行监听从而清除记录的行高会更好
        const initHeightList: number[] = Array.from(trHeightList);
        // 数据长度如果发生变化，裁剪高度记录的数组，避免算出异常的总高度
        initHeightList.length = params.value.data.length;
        initHeightList.fill(tScroll.value.rowHeight || 47);
        trHeightList = initHeightList;
      }

      scrollHeight.value = sum(trHeightList);

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
}

export type VirtualScrollConfig = ReturnType<typeof useVirtualScrollNew>;
