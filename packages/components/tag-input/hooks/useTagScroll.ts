/**
 * 当标签数量过多时，输入框显示不下，则需要滚动查看，以下为滚动逻辑
 * 如果标签过多时的处理方式，是标签省略，则不需要此功能
 */

import { isFunction } from 'lodash-es';
import { onMounted, onUnmounted, ref, toRefs } from 'vue';
import { TdTagInputProps } from '../type';

export function useTagScroll(props: TdTagInputProps) {
  const tagInputRef = ref();
  const { excessTagsDisplayType, readonly, disabled } = toRefs(props);
  // 允许向右滚动的最大距离
  const scrollDistance = ref(0);
  const scrollElement = ref<HTMLElement>();
  const mouseEnterTimer = ref();
  const isScrollable = ref(false); // 设置可滚动

  const updateScrollElement = (element: HTMLElement) => {
    const inputElement = element.children[0] as HTMLElement;
    scrollElement.value = inputElement;
  };

  const updateScrollDistance = () => {
    scrollDistance.value = scrollElement.value.scrollWidth - scrollElement.value.clientWidth;
  };

  const scrollTo = (distance: number) => {
    if (!isFunction(scrollElement.value?.scroll)) return;
    scrollElement.value.scroll({ left: distance, behavior: 'smooth' });
  };

  const scrollToRight = () => {
    // 使用 requestAnimationFrame 确保在 DOM 布局更新后再计算滚动距离
    requestAnimationFrame(() => {
      updateScrollDistance();
      scrollTo(scrollDistance.value);
      setTimeout(() => {
        isScrollable.value = true;
      }, 200);
    });
  };

  const scrollToLeft = () => {
    scrollTo(0);
  };

  // MAC 电脑横向滚动使用 deltaX，Windows 纵向滚动使用 deltaY
  const onWheel = ({ e }: { e: WheelEvent }) => {
    if (readonly.value || disabled.value) return;
    if (!scrollElement.value) return;
    // 使用 deltaX 或 deltaY 来判断滚动方向，优先使用绝对值更大的
    const delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta > 0) {
      updateScrollDistance();
      const distance = Math.min(scrollElement.value.scrollLeft + 120, scrollDistance.value);
      scrollTo(distance);
    } else if (delta < 0) {
      const distance = Math.max(scrollElement.value.scrollLeft - 120, 0);
      scrollTo(distance);
    }
  };

  // 鼠标 hover，自动滑动到最右侧，以便输入新标签
  const scrollToRightOnEnter = () => {
    if (excessTagsDisplayType.value !== 'scroll') return;
    // 一闪而过的 mousenter 不需要执行
    mouseEnterTimer.value = setTimeout(() => {
      scrollToRight();
      clearTimeout(mouseEnterTimer.value);
    }, 100);
  };

  const scrollToLeftOnLeave = () => {
    if (excessTagsDisplayType.value !== 'scroll') return;
    isScrollable.value = false; // 离开焦点不可滚动
    scrollTo(0);
    clearTimeout(mouseEnterTimer.value);
  };

  const init = () => {
    const element = tagInputRef.value?.$el;
    if (!element) return;
    updateScrollElement(element);
  };

  const clear = () => {
    clearTimeout(mouseEnterTimer.value);
  };

  onMounted(init);

  onUnmounted(clear);

  return {
    tagInputRef,
    scrollElement,
    scrollDistance,
    scrollTo,
    scrollToRight,
    scrollToLeft,
    updateScrollElement,
    updateScrollDistance,
    onWheel,
    scrollToRightOnEnter,
    scrollToLeftOnLeave,
    isScrollable,
  };
}
