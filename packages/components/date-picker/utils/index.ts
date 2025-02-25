// 用于头部日期切换修正
export function dateCorrection(
  partialIndex: number,
  preYear: Array<number>,
  preMonth: Array<number>,
  onlyYearSelect: boolean,
) {
  let nextYear = preYear;
  const nextMonth = preMonth;
  if (partialIndex === 0) {
    if (nextYear[1] <= nextYear[0]) {
      if (onlyYearSelect) nextYear[1] = nextYear[0] + 1;
      else {
        // eslint-disable-next-line prefer-destructuring
        nextYear[1] = nextYear[0];
        if (nextMonth[1] <= nextMonth[0]) {
          nextMonth[1] = nextMonth[0] + 1;
          if (nextMonth[1] === 12) {
            // 处理跨年的边界场景
            nextMonth[1] = 0;
            nextYear = [nextYear[0], nextYear[1] + 1];
          }
        }
      }
    }
  }

  // 保证左侧时间不大于右侧
  if (partialIndex === 1) {
    if (nextYear[0] >= nextYear[1]) {
      // 年/季度/月份场景下，头部只有年选择器，直接 - 1
      if (onlyYearSelect) nextYear[0] = nextYear[1] - 1;
      else {
        // eslint-disable-next-line prefer-destructuring
        nextYear[0] = nextYear[1];
        if (nextMonth[0] >= nextMonth[1]) {
          nextMonth[0] = nextMonth[1] - 1;
          if (nextMonth[0] === -1) {
            // 处理跨年的边界场景
            nextMonth[0] = 11;
            nextYear = [nextYear[0] - 1, nextYear[1]];
          }
        }
      }
    }
  }
  return { nextYear, nextMonth };
}
