import isString from 'lodash/isString';

/**
 * 计算刻度区间值停止坐标
 */
export function getStopStyle(position: number, isVertical: boolean) {
  return isVertical ? { top: `calc(${100 - position}% - 1px)` } : { left: `${position}%` };
}

/**
 * 格式化返回slider初始值
 */
export const formatSliderValue = (
  val: number | number[],
  type: 'first' | 'second'
) => {
  if (type === 'first') {
    if (val instanceof Array) {
      return val[0];
    }
    return val;
  }
  if (val instanceof Array) {
    return val[1];
  }
  return 0;
};

/**
 * 格式化label参数
 */
export const formatLabel = (label: object | string, val: number) => {
  if (Boolean(label) === false) {
    return String(val);
  }
  if (isString(label)) {
    let text = String(val);
    try {
      const rule = /\${value}%/g;
      const enableToReplace = rule.test(label);
      if (enableToReplace) {
        text = label.replace(/\${value}/g, String(val));
      } else {
        text = label;
        throw new Error();
      }
    } catch (e) {
      // eslint-disable-next-line
      console.warn(`fail to parse label prop, please pass string such as '\${value}%'`);
    }
    return text;
  }
  return label;
};
