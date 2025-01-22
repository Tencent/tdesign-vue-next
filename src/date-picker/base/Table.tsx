import { defineComponent, PropType, computed } from 'vue';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import TDatePickerCell from './Cell';
import { useConfig, usePrefixClass } from '../../hooks/useConfig';
import { parseToDayjs } from '../../_common/js/date-picker/format';
import isArray from 'lodash/isArray';

import type { TdDatePickerProps, DateMultipleValue } from '../type';

dayjs.extend(isoWeek);

export default defineComponent({
  name: 'TDatePickerTable',
  props: {
    mode: {
      type: String as PropType<TdDatePickerProps['mode']>,
      default: 'date',
    },
    value: [String, Number, Array, Date],
    format: String,
    firstDayOfWeek: Number,
    multiple: Boolean,
    data: Array,
    time: String,
    onCellClick: Function,
    onCellMouseEnter: Function,
    onCellMouseLeave: Function,
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('date-picker__table');
    const { globalConfig } = useConfig('datePicker');
    const { dayjsLocale } = globalConfig.value;

    const weekArr = computed(() => {
      const weekArr = [];
      let wi = props.firstDayOfWeek - 1;
      const len = globalConfig.value.weekdays.length;
      while (weekArr.length < len) {
        weekArr.push(globalConfig.value.weekdays[wi]);
        wi = (wi + len + 1) % len;
      }

      if (props.mode === 'week') weekArr.unshift(globalConfig.value.weekAbbreviation);

      return weekArr;
    });

    const showThead = computed(() => props.mode === 'date' || props.mode === 'week');

    // 高亮周区间
    const weekRowClass = (value: any, targetValue: Date) => {
      if (props.mode !== 'week' || !value) return {};

      if (isArray(value)) {
        if (!value.length) return {};
        const [startObj, endObj] = value.map((v) => v && parseToDayjs(v, props.format));
        const startYear = startObj && startObj.year();
        const startWeek = startObj?.locale?.(dayjsLocale)?.week?.();
        const endYear = endObj && endObj.year();
        const endWeek = endObj?.locale?.(dayjsLocale)?.week?.();

        const targetObj = parseToDayjs(targetValue, props.format);
        const targetYear = targetObj.year();
        const targetWeek = targetObj.week();
        const isActive =
          (targetYear === startYear && targetWeek === startWeek) || (targetYear === endYear && targetWeek === endWeek);
        const isRange =
          targetYear >= startYear && targetYear <= endYear && targetWeek > startWeek && targetWeek < endWeek;
        return {
          // 同年同周
          [`${COMPONENT_NAME.value}-${props.mode}-row--active`]: isActive,
          [`${COMPONENT_NAME.value}-${props.mode}-row--range`]: isRange,
        };
      }

      return {
        [`${COMPONENT_NAME.value}-${props.mode}-row--active`]:
          parseToDayjs(value, props.format).locale(dayjsLocale).week() ===
          parseToDayjs(targetValue, props.format).locale(dayjsLocale).week(),
      };
    };

    const multipleWeekRowClass = (value: DateMultipleValue, targetValue: Date) => {
      const targetDayjs = parseToDayjs(targetValue, props.format);
      if (props.mode !== 'week' || (Array.isArray(value) && !value.length)) return {};
      const isSomeYearWeek = value
        .map?.((v) => parseToDayjs(v, props.format))
        .some((item) => item.week() === targetDayjs.week() && item.year() === targetDayjs.year());
      return {
        [`${COMPONENT_NAME.value}-${props.mode}-row--active`]: isSomeYearWeek,
      };
    };
    const activeRowCss = props.multiple ? multipleWeekRowClass : weekRowClass;

    return () => (
      <div class={COMPONENT_NAME.value} onMouseleave={(e: MouseEvent) => props.onCellMouseLeave?.({ e })}>
        <table>
          {showThead.value && (
            <thead>
              <tr class={`${COMPONENT_NAME.value}-header-row`}>
                {weekArr.value.map((value: string, i: number) => (
                  <th class={`${COMPONENT_NAME.value}-header-cell`} key={i}>
                    {value}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {props.data.map((row: Array<any>, i: number) => (
              <tr
                key={i}
                class={{
                  [`${COMPONENT_NAME.value}-${props.mode}-row`]: true,
                  ...activeRowCss(props.value, row[0].value),
                }}
              >
                {row.map((col: any, j: number) => (
                  <TDatePickerCell
                    {...col}
                    key={j}
                    time={props.time}
                    onClick={props.onCellClick}
                    onMouseEnter={props.onCellMouseEnter}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
});
