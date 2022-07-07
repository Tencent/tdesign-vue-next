import { computed, ref } from 'vue';
import { Styles } from '../common';
import { TdDrawerProps } from './type';

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
    if (isSizeDragging.value && props.sizeDraggable) {
      if (props.placement === 'right') {
        draggedSizeValue.value = `${document.documentElement.clientWidth - x + 8}px`;
      }
      if (props.placement === 'left') {
        draggedSizeValue.value = `${x + 8}px`;
      }
      if (props.placement === 'top') {
        draggedSizeValue.value = `${y + 8}px`;
      }
      if (props.placement === 'bottom') {
        draggedSizeValue.value = `${document.documentElement.clientHeight - y + 8}px`;
      }
    }
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
