import { computed, ref } from 'vue';
import { Styles } from '../../common';
import { getSizeDraggable, calcMoveSize } from '@tdesign/common-js/drawer/utils';
import type { TdDrawerProps } from '../type';

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

    const moveSize = calcMoveSize(props.placement, {
      x,
      y,
      maxWidth,
      maxHeight,
      max: limitMax,
      min: limitMin,
    });

    if (typeof moveSize === 'undefined') return;

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
