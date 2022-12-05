/**
 * 基于原作者（@louiszhai）的思路二次开发
 * 新增支持以下 3 个特性
 * 1. 支持不同表格高度
 * 2. 支持滚动到特定元素，方便 Select 等组件定位到选中元素(TODO)
 * 3. 支持数据变化不重置，方便支持树形结构虚拟滚动(TODO)
 */
import { ref, computed, watch, Ref, onMounted } from 'vue';
import { TScroll } from '../common';
import useResizeObserver from './useResizeObserver';

export type UseVirtualScrollParams = Ref<{
  /** 列数据 */
  data: { [key: string]: any }[];
  scroll: TScroll;
}>;

const useVirtualScroll = (container: Ref<HTMLElement>, params: UseVirtualScrollParams) => {
  /** 注意测试：数据长度为空；数据长度小于表格高度等情况。即期望只有数据量达到一定程度才允许开启虚拟滚动 */
  const visibleData = ref<any[]>([]);
  // 用于显示表格列
  const translateY = ref(0);
  // 滚动高度，用于显示滚动条
  const scrollHeight = ref(0);
  const trScrollTopHeightList = ref<number[]>([]);
  // 已经通过节点渲染计算出来的各自行高
  const trHeightList = ref<number[]>([]);
  const containerHeight = ref(0);
  const startAndEndIndex = ref<[number, number]>([-1, -1]);

  // 设置初始值
  const tScroll = computed(() => {
    const { scroll } = params.value;
    if (!scroll) return {};
    return {
      bufferSize: scroll.bufferSize || 10,
      isFixedRowHeight: scroll.isFixedRowHeight ?? true,
      rowHeight: scroll.rowHeight || 48,
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
    // 大数据场景不建议使用 forEach 一类函数迭代
    // 当前行滚动高度 = 上一行滚动高度 + 当前行高度 + 容器高度
    for (let i = 0, len = data.length; i < len; i++) {
      list[i] = (list[i - 1] || containerHeight.value) + (trHeightList[i] || tScroll.value.rowHeight);
    }
    return list;
  };

  const doubleBufferSize = computed(() => tScroll.value.bufferSize * 2);
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
    // startAndEndIndex.value[0] < currentIndex &&
    // if (currentIndex < startAndEndIndex.value[1] - 10) {
    //   return
    // }
    const { bufferSize } = tScroll.value;
    let startIndex = currentIndex > 0 && currentIndex <= doubleBufferSize.value ? currentIndex : 0;
    startIndex = currentIndex > doubleBufferSize.value ? currentIndex - bufferSize : startIndex;
    let endIndex = startIndex + tripleBufferSize.value;
    if (endIndex > trScrollTopHeightList.length) {
      endIndex = trScrollTopHeightList.length;
      startIndex = endIndex - tripleBufferSize.value;
    }
    if (startAndEndIndex.value[0] !== startIndex) {
      // console.log(startIndex, endIndex)
      startAndEndIndex.value = [startIndex, endIndex];
    }
  };

  // 固定高度场景，不需要通过行渲染获取高度（仅非固定高度场景需要）
  const handleRowMounted = (rowData: any) => {
    if (!isVirtualScroll.value || !rowData || !tScroll.value.isFixedRowHeight) return;
    const trHeight = rowData.ref.value.offsetHeight;
    const rowIndex = rowData.data.__index__;
    const newTrHeightList = trHeightList.value;
    if (newTrHeightList[rowIndex] !== trHeight) {
      newTrHeightList[rowIndex] = trHeight;
      trHeightList.value = newTrHeightList;

      const scrollTopHeightList = getTrScrollTopHeightList(newTrHeightList);
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

  const refreshVirtualScroll = () => {
    containerHeight.value = container.value.getBoundingClientRect().height;
    if (trScrollTopHeightList.value.length) {
      updateVisibleData(trScrollTopHeightList.value, 0);
    }
  };

  const addIndexToData = (data: any[]) => {
    data.forEach((data, index) => {
      // eslint-disable-next-line
      data['__index__'] = index;
    });
  };

  useResizeObserver(isVirtualScroll.value ? container : undefined, refreshVirtualScroll);

  // 固定高度场景，可直接通过数据长度计算出最大滚动高度
  watch(
    () => [[...params.value.data]],
    () => {
      if (!isVirtualScroll.value || !tScroll.value.isFixedRowHeight) return;
      const { data } = params.value;
      scrollHeight.value = data.length * tScroll.value.rowHeight;
      // 给数据添加下标
      addIndexToData(data);
      visibleData.value = data.slice(0, 15);
      // const scrollTopHeightList = getTrScrollTopHeightList(trHeightList);
      // trScrollTopHeightList.value = scrollTopHeightList;
    },
    { immediate: true },
  );

  watch(
    [startAndEndIndex, containerHeight],
    ([startAndEndIndex, containerHeight]) => {
      if (startAndEndIndex[0] < 0) return;
      const { data } = params.value;
      const [startIndex, endIndex] = startAndEndIndex;
      visibleData.value = data.slice(startIndex, endIndex);
      translateY.value =
        trScrollTopHeightList.value[startIndex - 1] > 0
          ? trScrollTopHeightList.value[startIndex - 1] - containerHeight
          : 0;
    },
    { immediate: true },
  );

  // onMounted(() => {
  //   if (!window || !window.IntersectionObserver) return;
  //   const observeDom = container.value.querySelector('tbody');
  //   const ob = new window.IntersectionObserver((entries) => {
  //     const entry = entries[0];
  //     console.log(observeDom, entry.intersectionRatio);
  //     // if (entry.intersectionRatio) {
  //     //   console.log('2341234', entry)
  //     //   updateVisibleData(trScrollTopHeightList.value);
  //     // }
  //   });
  //   ob.observe(observeDom);
  // });

  return {
    visibleData,
    translateY,
    scrollHeight,
    isVirtualScroll,
    handleScroll,
    handleRowMounted,
  };
};

export type VirtualScrollConfig = ReturnType<typeof useVirtualScroll>;

export default useVirtualScroll;
