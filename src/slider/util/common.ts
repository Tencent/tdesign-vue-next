/**
 * 计算刻度区间值停止坐标
 * @param position 刻度坐标值 ;
 * @param isVertical 是否垂直方向
 * @returns {string} style内联样式值
 */
export const getStopStyle = (position: number, isVertical: boolean) => {
  return isVertical ? { top: `calc(${100 - position}% - 1px)` } : { left: `${position}%` };
};
