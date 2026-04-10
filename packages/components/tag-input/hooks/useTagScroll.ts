/**
 * TagInput scroll 模式下的滚动逻辑 Hook
 * 如果标签过多时的处理方式是标签省略，则不需要此功能
 */

import { onUnmounted, ref, toRefs } from 'vue';
import { usePrefixClass } from '@tdesign/shared-hooks';
import {
  getScrollContainer,
  handleWheelScroll,
  scrollToRight as scrollToRightBase,
  scrollToLeft as scrollToLeftBase,
} from '@tdesign/common-js/utils/tagInputScroll';
import { TdTagInputProps } from '../type';

export function useTagScroll(props: TdTagInputProps) {
  const tagInputRef = ref();
  const classPrefix = usePrefixClass();
  const { excessTagsDisplayType, readonly, disabled } = toRefs(props);

  /** 滚动容器元素缓存（.input__prefix） */
  const scrollElementRef = ref<HTMLElement>();
  /** 进入防抖定时器 */
  const mouseEnterTimerRef = ref<ReturnType<typeof setTimeout> | null>(null);

  /** 是否为可交互的 scroll 模式 */
  const isScrollMode = (type: string | undefined) => type === 'scroll' && !readonly.value && !disabled.value;

  /** 获取滚动容器（带缓存） */
  const getScrollElement = () => {
    const root = tagInputRef.value?.$el;
    if (!root) return scrollElementRef.value;
    if (scrollElementRef.value?.parentElement !== root) {
      const found = getScrollContainer(root, classPrefix.value);
      if (found) scrollElementRef.value = found;
    }
    return scrollElementRef.value;
  };

  /** 滚动到最右侧并开启 scrollable，用于：悬浮进入、tag 变化后定位末尾 */
  const scrollToRight = () => {
    const el = getScrollElement();
    if (el) scrollToRightBase(el, classPrefix.value);
  };

  /** 处理滚轮事件，绑定到 TInput 的 onWheel */
  const onWheel = ({ e }: { e: WheelEvent }) => {
    if (!isScrollMode(excessTagsDisplayType.value)) return;
    const el = getScrollElement();
    if (el) handleWheelScroll(el, e);
  };

  /** 清除防抖定时器 */
  const clearEnterTimer = () => {
    if (mouseEnterTimerRef.value) {
      clearTimeout(mouseEnterTimerRef.value);
      mouseEnterTimerRef.value = null;
    }
  };

  /** 鼠标悬浮进入：延迟 100ms 后滚动到最右侧 */
  const scrollToRightOnEnter = () => {
    if (!isScrollMode(excessTagsDisplayType.value)) return;
    clearEnterTimer();
    mouseEnterTimerRef.value = setTimeout(() => {
      scrollToRight();
      mouseEnterTimerRef.value = null;
    }, 100);
  };

  /** 鼠标离开：滚回最左并关闭 scrollable */
  const scrollToLeftOnLeave = () => {
    if (!isScrollMode(excessTagsDisplayType.value)) return;
    clearEnterTimer();
    const el = getScrollElement();
    if (el) scrollToLeftBase(el, classPrefix.value);
  };

  onUnmounted(clearEnterTimer);

  return {
    tagInputRef,
    isScrollable: ref(false), // 向后兼容
    scrollToRight,
    onWheel,
    scrollToRightOnEnter,
    scrollToLeftOnLeave,
  };
}
