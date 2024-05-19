import dayjs from 'dayjs';

// 判断是否输入的值是合法的timepicker的值
export function validateInputValue(value: string, format: string) {
  return dayjs(value, format).format(format) === value;
}

// 转换输入值为标准格式的timepicker的值
export function formatInputValue(value: string, format: string) {
  return dayjs(value, format).format(format);
}

// 计算最接近的时间点
export function closestLookup(
  availableArr: Array<any>,
  calcVal: number,
  step: number
) {
  if (step <= 1) return calcVal;
  return availableArr.sort(
    (a, b) => Math.abs(calcVal + 1 - a) - Math.abs(calcVal + 1 - b)
  )[0];
}
