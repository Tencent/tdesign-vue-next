/* eslint-disable */
/**
 * 当前虚拟滚动存在的问题
 * 1. 反复拖动滚动条，底部会出现奇怪的高度
 * 2. 表格高度发生变化时，底部也会出现奇怪的高度
 * 3. 无法直接定位滚动到某个元素，进而无法实现 Select 组件直接滚动到选中项
 */
import { ref, toRefs, reactive, onMounted, computed, watch, nextTick } from 'vue';

// 虚拟滚动Hooks的完整实现，只所以封装成hooks，主要是为了方便跟其他组件搭配使用，比如说表格或者下拉框
const useVirtualScroll = ({
  data,
  container,
  fixedHeight = false,
  lineHeight = 30,
  bufferSize = 20,
  threshold = 100,
}: {
  data: any;
  container: any;
  fixedHeight: boolean;
  lineHeight: number;
  bufferSize: number;
  threshold: number;
}) => {
  const state = reactive({
    visibleData: [],
    cachedHeight: [],
    cachedScrollY: [],
  });
  const isVirtual = computed(() => data.value.length > threshold);
  const updateId = ref(0);
  const trs = new Map(); // 当前展示的行元素和数据

  let visibleCount = 0; // 可见的节点数量
  let beforeScrollTop = 0; // 上一次的滚动条位置
  let index = 0; // 偏移行数
  let offset = 0; // 少于一行行高的偏移量
  let start = 0; // 第一条显示的行
  let last = 0; // 最后一条显示的行
  // let revising = false; // 是否正在修正滚动条

  const reset = () => {
    data.value.forEach((item: any, i: number) => {
      item.$index = i;
      if (fixedHeight) {
        state.cachedScrollY[i] = i * lineHeight;
      }
    });
    if (!fixedHeight) {
      state.cachedScrollY[data.value.length - 1] = undefined; // 初始化cachedScrollY数组的长度
    }
  };
  reset();

  // 计算虚拟滚动列表总高度，需要动态修正
  const scrollHeight = computed(() => {
    const { cachedHeight } = state;
    const { length } = cachedHeight;
    if (length) {
      const maxScrollY = cachedHeight.reduce((sum, v) => sum + v || lineHeight, 0); // 当前总高度
      if (cachedHeight.length === data.value.length) {
        return maxScrollY;
      }
      const average = maxScrollY / cachedHeight.length; // 平均高度
      return maxScrollY + (data.value.length - cachedHeight.length) * average; // 预估总高度
    }
    return isVirtual.value ? data.value.length * lineHeight : 0;
  });
  const translateY = computed(() => {
    const { visibleData } = state;
    const firstRow = visibleData[0];
    if (firstRow) {
      // 修复只有一个元素时存在偏移的问题
      return visibleData.length === 1 ? 0 : state.cachedScrollY[firstRow.$index];
    }
    return 0;
  });

  // 更新可视区域的节点数据
  const updateVisibleData = () => {
    last = Math.min(start + visibleCount + bufferSize * 2, data.value.length);
    state.visibleData = data.value.slice(start, last);
  };
  // 计算每行对应的scrollTop值
  const calculateScrollY = () => {
    const anchorDom = trs.get(index); // 获取锚点元素
    if (!anchorDom) {
      return; // 快速调整高度时，新的元素可能来不及加载，暂时跳过更新
    }
    const anchorDomHeight = anchorDom?.getBoundingClientRect()?.height; // 获取锚点元素的高
    state.cachedScrollY[index] = container.value.scrollTop - offset; // 锚点元素scrollY= 容器滚动高度 - 锚点元素的offset
    state.cachedHeight[index] = anchorDomHeight;

    for (let i = index + 1; i <= state.visibleData[state.visibleData.length - 1]?.$index; i++) {
      // 计算锚点后面的元素scrollY
      const tr = trs.get(i);
      const { height } = tr?.getBoundingClientRect() || {};
      state.cachedHeight[i] = height;
      const scrollY = state.cachedScrollY[i - 1] + state.cachedHeight[i - 1]; // 当前元素的y 是前一个元素的y+前一个元素高度
      // state.cachedScrollY[i] = scrollY;
      state.cachedScrollY.splice(i, 1, scrollY); // 兼容vue2的composition api
    }

    for (let i = index - 1; i >= state.visibleData[0]?.$index; i--) {
      const tr = trs.get(i);
      const { height } = tr?.getBoundingClientRect() || {};
      state.cachedHeight[i] = height;
      const scrollY = state.cachedScrollY[i + 1] - state.cachedHeight[i]; // 当前元素的y是下一个元素y - 当前元素高度
      // state.cachedScrollY[i] = scrollY;
      state.cachedScrollY.splice(i, 1, scrollY);
    }
    if (state.cachedScrollY[0] > 0) {
      // 修正滚动过快时，滚动到顶部时，滚动条多余的问题
      // revising = true;
      const distance = state.cachedScrollY[0]; // 第一个元素scrollY即为多出的量
      const length = Math.min(last, data.value.length);
      for (let i = 0; i < length; i++) {
        // state.cachedScrollY[i] -= distance;
        state.cachedScrollY.splice(i, 1, state.cachedScrollY[i] - distance);
      }

      const scrollTop = state.cachedScrollY[index - 1] ? state.cachedScrollY[index - 1] + offset : offset;
      container.value.scrollTop = scrollTop;
      beforeScrollTop = scrollTop;
      // revising = false;
    }
    // 修正拖动过快时，滚动到顶端时，滚动条不足的偏差
    if (state.cachedScrollY[start] < 0) {
      // revising = true;
      const s = state.cachedHeight.slice(0, Math.max(0, index)).reduce((sum, v) => sum + v, 0) + offset;
      container.value.scrollTop = s;
      beforeScrollTop = s;
      if (s === 0) {
        index = 0;
        offset = 0;
      }
      // revising = false;
    }
    nextTick(() => {
      // setTimeout是为了保证快速拖动到底部时，以下逻辑能够正常执行
      const { scrollTop, scrollHeight, clientHeight } = container.value;
      if (scrollTop + clientHeight === scrollHeight) {
        // 滚动到底部时，修正底部有空余的问题
        // revising = true;
        for (let i = last - 1; i >= start; i--) {
          if (i === last - 1) {
            // state.cachedScrollY[i] = scrollHeight.value - state.cachedHeight[i];
            state.cachedScrollY.splice(i, 1, scrollHeight.value - state.cachedHeight[i]);
          } else {
            // state.cachedScrollY[i] = state.cachedScrollY[i + 1] - state.cachedHeight[i];
            state.cachedScrollY.splice(i, 1, state.cachedScrollY[i + 1] - state.cachedHeight[i]);
          }
        }
        // revising = false;
      }
    });
  };

  // 滚动时动态计算和渲染
  const handleScroll = () => {
    if (!isVirtual.value) return;
    // if (revising) {
    //   return false; // 修正滚动条时，暂停滚动逻辑
    // }
    const { scrollTop } = container.value;
    let distance = scrollTop - beforeScrollTop; // 滚动差值
    beforeScrollTop = scrollTop;
    distance += offset;
    let lastIndex = index;
    // !disatance 可能为横向滚动，不做任何计算
    if (!distance) return;
    if (distance >= 0) {
      // 向下滚动
      while (lastIndex < data.value.length && distance > (state.cachedHeight[lastIndex] || lineHeight)) {
        if (!state.cachedHeight[lastIndex]) {
          state.cachedHeight[lastIndex] = lineHeight;
        }
        distance -= state.cachedHeight[lastIndex];
        lastIndex++;
      }
      if (lastIndex >= data.value.length) {
        index = data.value.length - 1;
        offset = 0;
      } else {
        index = lastIndex;
        offset = distance;
      }
      const { clientHeight, scrollHeight } = container.value;
      if (scrollTop + clientHeight === scrollHeight) {
        // 滚动条到底了
        index = data.value.length - visibleCount + 1;
        // calculateScrollY();
      }
      if (start <= index - bufferSize) {
        // 计算第一个挂载元素
        start = Math.min(data.value.length - visibleCount, index - bufferSize);
        if (start < 0) {
          start = 0;
        }
      }
    } else {
      // 向上滚动
      while (distance < 0) {
        lastIndex--;
        if (!state.cachedHeight[lastIndex]) {
          state.cachedHeight[lastIndex] = lineHeight;
        }
        distance += state.cachedHeight[lastIndex];
      }
      if (lastIndex < 0) {
        index = 0;
        offset = 0;
      } else {
        index = lastIndex;
        offset = distance;
      }
      calculateScrollY();
      if (start > index - bufferSize) {
        // 计算第一个挂载元素
        start = Math.max(0, index - bufferSize);
      }
    }
    updateVisibleData();
  };

  !fixedHeight && watch(updateId, calculateScrollY, { flush: 'post' });
  const handleRowMounted = () => {
    if (!isVirtual.value) return;
    updateId.value++;
  };
  watch(data, () => {
    reset();
    state.visibleData = [];
    state.cachedScrollY = [];
    state.cachedHeight = [];
    beforeScrollTop = 0;
    index = 0;
    offset = 0;
    start = 0;
    // revising = false;
    trs.clear();
    if (data.value.length <= threshold) {
      state.visibleData = data.value;
    } else {
      updateVisibleData();
    }

    container.value && (container.value.scrollTop = 0);
  });
  let mounted = false;
  const refreshContainer = () => {
    if (mounted) {
      visibleCount = Math.ceil(container.value.offsetHeight / lineHeight);
      updateVisibleData();
    }
  };
  onMounted(() => {
    if (!window || !window.IntersectionObserver) {
      return;
    }
    const ob = new window.IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting || entry.intersectionRatio) {
        mounted = true;
        isVirtual.value && refreshContainer();
        ob.unobserve(container.value);
      }
    });
    container.value && ob.observe(container.value);
  });
  return {
    trs,
    scrollHeight,
    ...toRefs(state),
    translateY,
    handleScroll,
    handleRowMounted,
    refreshContainer,
    fixedHeight,
    calculateScrollY,
  };
};
export default useVirtualScroll;
