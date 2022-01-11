/**
 * 当标签数量过多时，输入框显示不下，则需要滚动查看，以下为滚动逻辑
 * 如果标签过多时的处理方式，是标签省略，则不需要此功能
 */

import { onMounted, onUnmounted, ref, Ref } from 'vue';
import { TdTagInputProps } from './type';
import { on, off } from '../utils/dom';

export default function useTagScroll(props: TdTagInputProps, root: Ref<any>) {
  // 允许向右滚动的最大距离
  const scrollDistance = ref(0);
  const scrollElement = ref<HTMLElement>(null);
  const wheelTimer = ref();
  const mouseEnterTimer = ref();

  const setScrollElement = (element: HTMLElement) => {
    scrollElement.value = element;
  };

  const setScrollDistance = () => {
    scrollDistance.value = scrollElement.value.scrollWidth - scrollElement.value.clientWidth;
  };

  const scrollTo = (distance: number) => {
    scrollElement?.value.scroll({ left: distance, behavior: 'smooth' });
  };

  const scrollToRight = () => {
    setScrollDistance();
    scrollTo(scrollDistance.value);
  };

  const scrollToLeft = () => {
    scrollTo(0);
  };

  const clearTimer = (timer: Ref<any>) => {
    clearTimeout(timer.value);
    timer.value = null;
  };

  // TODO：MAC 电脑横向滚动，Windows 纵向滚动。当前只处理了横向滚动
  const onWheel = (e: WheelEvent) => {
    if (!scrollElement.value || wheelTimer.value) return;
    if (e.deltaX > 0) {
      const distance = Math.min(scrollElement.value.scrollLeft + 120, scrollDistance.value);
      scrollTo(distance);
    } else {
      const distance = Math.max(scrollElement.value.scrollLeft - 120, 0);
      scrollTo(distance);
    }
    wheelTimer.value = setTimeout(() => {
      clearTimer(wheelTimer);
    }, 300);
  };

  // 鼠标 hover，自动滑动到最右侧，以便输入新标签
  const scrollToRightOnEnter = () => {
    // 一闪而过的 mousenter 不需要执行
    mouseEnterTimer.value = setTimeout(() => {
      scrollToRight();
      // 动画结束后聚焦
      mouseEnterTimer.value = setTimeout(() => {
        scrollElement.value.querySelector('input').focus();
        clearTimer(mouseEnterTimer);
      }, 300);
    }, 100);
  };

  const scrollToLeftOnLeave = () => {
    scrollTo(0);
    scrollElement.value.querySelector('input').blur();
    clearTimer(mouseEnterTimer);
  };

  const addListeners = (element: HTMLElement) => {
    if (props.readonly || props.disabled) return;
    on(element, 'mousewheel', onWheel);
  };

  const removeListeners = (element: HTMLElement) => {
    if (props.readonly || props.disabled) return;
    off(element, 'mousewheel', onWheel);
  };

  onMounted(() => {
    const element = root.value?.$el;
    setScrollElement(element);
    addListeners(element);
  });

  onUnmounted(() => {
    clearTimer(wheelTimer);
    clearTimer(mouseEnterTimer);
    removeListeners(root.value?.$el);
  });

  return {
    scrollElement,
    scrollDistance,
    scrollTo,
    scrollToRight,
    scrollToLeft,
    setScrollElement,
    setScrollDistance,
    onWheel,
    addListeners,
    removeListeners,
    scrollToRightOnEnter,
    scrollToLeftOnLeave,
  };
}
