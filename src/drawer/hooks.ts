import { computed, ref } from 'vue';
import { Styles } from '../common';
import type { TdDrawerProps } from './type';

export const useDrag = (props: TdDrawerProps) => {
  // 以下为拖拽改变抽屉大小相关 可以抽成hooks
  const isSizeDragging = ref(false);
  const draggedSizeValue = ref<string>(null);

  const enableDrag = () => {
    // mousedown绑定mousemove和mouseup事件
    document.addEventListener('mouseup', handleMouseup, true);
    document.addEventListener('mousemove', handleMousemove, true);
    isSizeDragging.value = true;
  };

  const handleMouseup = () => {
    document.removeEventListener('mouseup', handleMouseup, true);
    document.removeEventListener('mousemove', handleMousemove, true);
    isSizeDragging.value = false;
  };

  const handleMousemove = (e: MouseEvent) => {
    // 鼠标移动时计算draggedSizeValue的值
    const { x, y } = e;
    const maxHeight = document.documentElement.clientHeight;
    const maxWidth = document.documentElement.clientWidth;
    const offsetHeight = 8;
    const offsetWidth = 8;

    if (!isSizeDragging.value || !props.sizeDraggable) return;
    let result;
    if (props.placement === 'right') {
      result = Math.min(Math.max(maxWidth - x + offsetWidth, offsetWidth), maxWidth);
    }
    if (props.placement === 'left') {
      result = Math.min(Math.max(x + offsetWidth, offsetWidth), maxWidth);
    }
    if (props.placement === 'top') {
      result = Math.min(Math.max(y + offsetHeight, offsetHeight), maxHeight);
    }
    if (props.placement === 'bottom') {
      result = Math.min(Math.max(maxHeight - y + offsetHeight, offsetHeight), maxHeight);
    }
    if (result) draggedSizeValue.value = `${result}px`;
  };

  const draggableLineStyles = computed(() => {
    // 设置拖拽control的样式
    const isHorizontal = ['right', 'left'].includes(props.placement);
    const oppositeMap = {
      left: 'right',
      right: 'left',
      top: 'bottom',
      bottom: 'top',
    };
    return {
      zIndex: 1,
      position: 'absolute',
      background: 'transparent',
      [oppositeMap[props.placement]]: 0,
      width: isHorizontal ? '16px' : '100%',
      height: isHorizontal ? '100%' : '16px',
      cursor: isHorizontal ? 'col-resize' : 'row-resize',
    } as Styles;
  });

  return { draggedSizeValue, enableDrag, draggableLineStyles };
};
