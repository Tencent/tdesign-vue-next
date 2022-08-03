import dayjs from 'dayjs';
import type { DateValue } from '../type';
import { extractTimeFormat } from '../../_common/js/date-picker/utils';

export const TIME_FORMAT = 'HH:mm:ss';

// 格式化 range
function formatRange({ newDate, format, targetFormat }: { newDate: any; format: string; targetFormat: string }) {
  if (!newDate || !Array.isArray(newDate)) return [];

  let dayjsDateList = newDate.map((d) => d && parseToDayjs(d, format));

  // 保证后面的时间大于前面的时间
  if (
    dayjsDateList[0] &&
    dayjsDateList[1] &&
    dayjsDateList[0].toDate().getTime() > dayjsDateList[1].toDate().getTime()
  ) {
    // 数据兼容规则
    dayjsDateList = [dayjsDateList[1], dayjsDateList[0]];
  }

  // 格式化失败提示
  if (dayjsDateList.some((r) => !r.isValid())) {
    console.error(
      `请检查 format、valueType、value 格式是否有效.\nformat: '${format}' valueType: '${targetFormat}' value: '${newDate}'`,
    );
    return [];
  }

  // valueType = 'time-stamp' 返回时间戳
  if (targetFormat === 'time-stamp') {
    return dayjsDateList.map((da) => da && da.toDate().getTime());
  }

  return dayjsDateList.map((da) => da && da.format(targetFormat));
}

// 格式化单选
function formatSingle({ newDate, format, targetFormat }: { newDate: any; format: string; targetFormat: string }) {
  if (!newDate) return '';

  const dayJsDate = parseToDayjs(newDate, format);

  // 格式化失败提示
  if (!dayJsDate.isValid()) {
    console.error(
      `请检查 format、valueType、value 格式是否有效.\nformat: '${format}' valueType: '${targetFormat}' value: '${newDate}'`,
    );
    return '';
  }

  // valueType = 'time-stamp' 返回时间戳
  if (targetFormat === 'time-stamp') return dayJsDate.toDate().getTime();

  return dayJsDate.format(targetFormat);
}

// 检测日期是否合法
export function isValidDate(value: DateValue | DateValue[], format: string) {
  if (Array.isArray(value)) {
    if (format === 'time-stamp') return value.every((v) => dayjs(v).isValid());
    return value.every((v) => dayjs(v, format).isValid() || dayjs(v).isValid());
  }

  if (format === 'time-stamp') return dayjs(value).isValid();
  return dayjs(value, format).isValid() || dayjs(value).isValid();
}

// 日期格式化
export function formatDate(
  newDate: DateValue | DateValue[],
  { format, targetFormat }: { format: string; targetFormat: string },
) {
  let result;

  if (Array.isArray(newDate)) {
    result = formatRange({ newDate, format, targetFormat });
  } else {
    result = formatSingle({ newDate, format, targetFormat });
  }

  return result;
}

// 格式化时间
export function formatTime(value: DateValue | DateValue[], timeFormat: string) {
  let result;

  if (Array.isArray(value)) {
    result = value.map((v) => dayjs(v).format(timeFormat));
  } else {
    result = dayjs((value || new Date()) as DateValue).format(timeFormat);
  }

  return result;
}

// 统一解析日期格式字符串成 Dayjs 对象
export function parseToDayjs(value: string | Date | number, format: string, timeOfDay?: string) {
  let dateText = value;
  // format week
  if (/[w|W]/g.test(format)) {
    if (typeof dateText !== 'string') {
      dateText = dayjs(dateText).format(format);
    }

    const yearStr = dateText.split(/[-/.]/)[0];
    const weekStr = dateText.split(/[-/.]/)[1];
    const weekFormatStr = format.split(/[-/.]/)[1];
    const firstWeek = dayjs(yearStr, 'YYYY').startOf('year');
    for (let i = 0; i <= 52; i += 1) {
      let nextWeek = firstWeek.add(i, 'week');
      // 重置为周的第一天
      if (timeOfDay === 'start') nextWeek = nextWeek.subtract(5, 'day');
      if (nextWeek.format(weekFormatStr) === weekStr) {
        return nextWeek;
      }
    }
  }

  // format quarter
  if (/Q/g.test(format)) {
    if (typeof dateText !== 'string') {
      dateText = dayjs(dateText).format(format);
    }

    const yearStr = dateText.split(/[-/.]/)[0];
    const quarterStr = dateText.split(/[-/.]/)[1];
    const quarterFormatStr = format.split(/[-/.]/)[1];
    const firstWeek = dayjs(yearStr, 'YYYY').startOf('year');
    for (let i = 0; i <= 52; i += 1) {
      const nextQuarter = firstWeek.add(i, 'quarter');
      if (nextQuarter.format(quarterFormatStr) === quarterStr) {
        return nextQuarter;
      }
    }
  }

  // 兼容数据格式不标准场景 YYYY-MM-D
  return dayjs(dateText, format).isValid() ? dayjs(dateText, format) : dayjs(dateText);
}

// 根据不同 mode 给出格式化默认值
export function getDefaultFormat({
  mode = 'date',
  format,
  valueType,
  enableTimePicker,
}: {
  mode?: string;
  format?: string;
  valueType?: string;
  enableTimePicker?: boolean;
}) {
  if (mode === 'year') {
    return {
      format: format || 'YYYY',
      valueType: valueType || 'YYYY',
      timeFormat: TIME_FORMAT,
    };
  }
  if (mode === 'month') {
    return {
      format: format || 'YYYY-MM',
      valueType: valueType || 'YYYY-MM',
      timeFormat: TIME_FORMAT,
    };
  }
  if (mode === 'quarter') {
    return {
      format: format || 'YYYY-[Q]Q',
      valueType: valueType || 'YYYY-[Q]Q',
      timeFormat: TIME_FORMAT,
    };
  }
  if (mode === 'week') {
    return {
      format: format || 'YYYY-wo',
      valueType: valueType || 'YYYY-wo',
      timeFormat: TIME_FORMAT,
    };
  }
  if (mode === 'date') {
    return {
      format: format || `YYYY-MM-DD${enableTimePicker ? ' HH:mm:ss' : ''}`,
      valueType: valueType || `YYYY-MM-DD${enableTimePicker ? ' HH:mm:ss' : ''}`,
      timeFormat: extractTimeFormat(format || `YYYY-MM-DD${enableTimePicker ? ' HH:mm:ss' : ''}`) || TIME_FORMAT,
    };
  }
}
