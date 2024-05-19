import { isString } from 'lodash-es';
import type { TNode } from '@td/shared/interface';
/**
 * 计算刻度区间值停止坐标
 * @param position 刻度坐标值 ;
 * @param isVertical 是否垂直方向
 * @returns {string} style内联样式值
 */
export function getStopStyle(position: number, isVertical: boolean) {
  return isVertical ? { top: `calc(${100 - position}% - 1px)` } : { left: `${position}%` };
}

/**
 * 格式化返回slider初始值
 * @param val slider传入的value
 * @param type 第一个滑块or第二个滑块值
 * @returns {number}
 */
export function formatSliderValue(val: number | number[], type: 'first' | 'second') {
  if (type === 'first') {
    if (Array.isArray(val)) {
      return val[0];
    }
    return val;
  }
  if (Array.isArray(val)) {
    return val[1];
  }
  return 0;
}

/**
 * 格式化label参数
 * @param label slider传入的label属性
 * @param val slider传入的value
 */
export function formatLabel(label: TNode | string, val: number) {
  if (Boolean(label) === false) {
    return String(val);
  }
  if (isString(label)) {
    let text = String(val);
    try {
      const rule = /\${value}%/g;
      const enableToReplace = rule.test(label);
      if (enableToReplace) {
        text = label.replace(rule, String(val));
      } else {
        text = label;
        throw new Error();
      }
    } catch (e) {
      console.warn(`fail to parse label prop, please pass string such as '\${value}%'`);
    }
    return text;
  }
  return label;
}
