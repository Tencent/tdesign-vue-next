import { useConfig } from '../../hooks/useConfig';

import { getWeeks, getYears, getMonths, flagActive } from '../../_common/js/date-picker/utils-new';

export default function useTableData(props: any) {
  // 国际化文本初始化
  const { global } = useConfig('datePicker');

  const options = {
    minDate: props.minDate,
    maxDate: props.maxDate,
    disableDate: props.disableDate,
    firstDayOfWeek: props.firstDayOfWeek ?? global.value.firstDayOfWeek,
    monthLocal: global.value.months,
  };

  let data: Array<any> = [];
  if (props.mode === 'date') {
    data = getWeeks({ year: props.year, month: props.month }, options);
  } else if (props.mode === 'month') {
    data = getMonths(props.year, options);
  } else if (props.mode === 'year') {
    data = getYears(props.year, options);
  }

  return flagActive(data, {
    start: props.start,
    end: props.end,
    hoverStart: props.hoverStart,
    hoverEnd: props.hoverEnd,
    type: props.mode,
    isRange: props.isRange,
  });
}
