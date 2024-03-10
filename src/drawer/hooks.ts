import { computed, ref } from 'vue';
import { Styles } from '../common';
import type { TdDrawerProps } from './type';

function getSizeDraggable(sizeDraggable: TdDrawerProps['sizeDraggable'], limit: { max: number; min: number }) {
  if (typeof sizeDraggable === 'boolean') {
    return {
      allowSizeDraggable: sizeDraggable,
      max: limit.max,
      min: limit.min,
    };
  }

  return {
    allowSizeDraggable: true,
    max: sizeDraggable.max,
    min: sizeDraggable.min,
  };
}

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
    // x 轴方向使用最大宽度，y轴方向使用最大高度
    const max = props.placement === 'left' || props.placement === 'right' ? maxWidth : maxHeight;
    // x 轴方向使用默认最小宽度，y轴方向使用默认最小高度
    const min = props.placement === 'left' || props.placement === 'right' ? offsetWidth : offsetHeight;
    const { allowSizeDraggable, max: limitMax, min: limitMin } = getSizeDraggable(props.sizeDraggable, { max, min });

    // 不支持拖拽就直接返回
    if (!allowSizeDraggable || !isSizeDragging.value) return;

    let moveSize: number | undefined;
    switch (props.placement) {
      case 'right':
        moveSize = Math.min(Math.max(maxWidth - x, limitMin), limitMax);
        break;
      case 'left':
        moveSize = Math.min(Math.max(x, limitMin), limitMax);
        break;
      case 'top':
        moveSize = Math.min(Math.max(y, limitMin), limitMax);
        break;
      case 'bottom':
        moveSize = Math.min(Math.max(maxHeight - y, limitMin), limitMax);
        break;
      default:
        // 参数缺失直接返回
        return;
    }

    draggedSizeValue.value = `${moveSize}px`;
    props.onSizeDragEnd?.({
      e,
      size: moveSize,
    });
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
