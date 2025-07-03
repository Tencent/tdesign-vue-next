export function useSameTarget(handleClick?: (e: MouseEvent) => void) {
  // 判断 click 事件的起点和落点所在元素是否一致
  let MOUSEDOWN_TARGET = false;
  let MOUSEUP_TARGET = false;

  const onClick = (e: MouseEvent) => {
    if (MOUSEDOWN_TARGET && MOUSEUP_TARGET) {
      handleClick?.(e);
    }
    MOUSEDOWN_TARGET = false;
    MOUSEUP_TARGET = false;
  };

  const onMousedown = (e: MouseEvent) => {
    MOUSEDOWN_TARGET = e.target === e.currentTarget;
  };
  const onMouseup = (e: MouseEvent) => {
    MOUSEUP_TARGET = e.target === e.currentTarget;
  };

  return { onClick, onMousedown, onMouseup };
}
