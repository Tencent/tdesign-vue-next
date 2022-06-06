import dayjs from 'dayjs';
import type { DateValue, TdDatePickerProps, TdDateRangePickerProps } from '../type';
import { extractTimeFormat } from '../../_common/js/date-picker/utils-new';

export interface formatProps {
  mode: TdDatePickerProps['mode'];
  format: TdDatePickerProps['format'];
  valueType: TdDatePickerProps['valueType'];
  enableTimePicker: TdDatePickerProps['enableTimePicker'];
  value: TdDatePickerProps['value'] | TdDateRangePickerProps['value'];
}

export const TIME_FORMAT = 'HH:mm:ss';

export default function useFormat(props: formatProps) {
  const { format, valueType, timeFormat } = getDefaultFormat({
    mode: props.mode,
    enableTimePicker: props.enableTimePicker,
    format: props.format,
    valueType: props.valueType,
  });

  if (props.enableTimePicker) {
    if (!extractTimeFormat(format)) console.error(`format: ${format} 不规范，包含时间选择必须要有时间格式化 HH:mm:ss`);
    if (!extractTimeFormat(valueType) && valueType !== 'time-stamp')
      console.error(`valueType: ${valueType} 不规范，包含时间选择必须要有时间格式化 HH:mm:ss`);
  }

  // 日期格式化
  const formatDate = (newDate: DateValue | DateValue[], type = 'format') => {
    const formatMap = { format, valueType };
    const targetFormat = formatMap[type];

    let result;

    if (Array.isArray(newDate)) {
      result = formatRange({ newDate, format, targetFormat });
      // 格式化失败提示
      if (result.some((r) => r === 'Invalid Date')) {
        console.error(
          `请检查 format、valueType、value 格式是否有效.\nformat: '${props.format}' valueType: '${props.valueType}' value: '${props.value}'`,
        );
        return [];
      }
    } else {
      result = formatSingle({ newDate, format, targetFormat });
      // 格式化失败提示
      if (result === 'Invalid Date') {
        console.error(
          `请检查 format、valueType、value 格式是否有效.\nformat: '${props.format}' valueType: '${props.valueType}' value: '${props.value}'`,
        );
        return '';
      }
    }

    return result;
  };

  function isValidDate(value: DateValue | DateValue[], type = 'format') {
    const formatMap = { format, valueType };
    const realFormat = formatMap[type];

    if (Array.isArray(value)) {
      if (realFormat === 'time-stamp') return value.every((v) => dayjs(v).isValid());
      return value.every((v) => dayjs(v, realFormat, true).isValid());
    }

    if (realFormat === 'time-stamp') return dayjs(value).isValid();
    return dayjs(value, realFormat, true).isValid();
  }

  function formatTime(value: DateValue | DateValue[]): any {
    let result;

    if (Array.isArray(value)) {
      result = value.map((v) => dayjs(v).format(timeFormat));
    } else {
      result = dayjs(value as DateValue).format(timeFormat);
    }

    return result;
  }

  return {
    format,
    valueType,
    isValidDate,
    timeFormat,
    formatTime,
    formatDate,
    getDefaultFormat,
  };
}

// 格式化 range
function formatRange(options: any): string[] | number[] {
  const { newDate, format, targetFormat } = options;
  if (!newDate || !Array.isArray(newDate)) return [];

  const dayjsDateList = newDate.map((d) => d && (dayjs(d).isValid() ? dayjs(d) : dayjs(d, format)));

  // 保证后面的时间大于前面的时间
  if (
    dayjsDateList[0] &&
    dayjsDateList[1] &&
    dayjsDateList[0].toDate().getTime() > dayjsDateList[1].toDate().getTime()
  ) {
    dayjsDateList.fill(dayjsDateList[1]);
  }

  // valueType = 'time-stamp' 返回时间戳
  if (targetFormat === 'time-stamp') {
    return dayjsDateList.map((da) => da && da.toDate().getTime());
  }

  return dayjsDateList.map((da) => da && da.format(targetFormat));
}

// 格式化单选
function formatSingle(options: any): string | number {
  const { newDate, format, targetFormat } = options;
  if (!newDate) return '';

  const dayJsDate = dayjs(newDate).isValid() ? dayjs(newDate) : dayjs(newDate, format);

  // valueType = 'time-stamp' 返回时间戳
  if (targetFormat === 'time-stamp') return dayJsDate.toDate().getTime();

  return dayJsDate.format(targetFormat);
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
      timeFormat: extractTimeFormat(format || 'YYYY') || TIME_FORMAT,
    };
  }
  if (mode === 'month') {
    return {
      format: format || 'YYYY-MM',
      valueType: valueType || 'YYYY-MM',
      timeFormat: extractTimeFormat(format || 'YYYY-MM') || TIME_FORMAT,
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
