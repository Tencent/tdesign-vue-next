import { defineComponent, PropType, computed } from 'vue';
import TDatePickerCell from './Cell';
import { useConfig, usePrefixClass } from '../../hooks/useConfig';
import type { TdDatePickerProps } from '../type';
import { parseToDayjs } from '../../_common/js/date-picker/format';

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
    data: Array,
    time: String,
    onCellClick: Function,
    onCellMouseEnter: Function,
    onCellMouseLeave: Function,
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('date-picker__table');
    const { globalConfig } = useConfig('datePicker');
    const { weekdays, weekAbbreviation } = globalConfig.value;

    const weekArr = computed(() => {
      const _weekArr = [];
      let wi = props.firstDayOfWeek - 1;
      const len = weekdays.length;
      while (_weekArr.length < len) {
        _weekArr.push(weekdays[wi]);
        wi = (wi + len + 1) % len;
      }

      if (props.mode === 'week') _weekArr.unshift(weekAbbreviation);

      return _weekArr;
    });

    const showThead = computed(() => props.mode === 'date' || props.mode === 'week');

    // 高亮周区间
    const weekRowClass = (value: any, format: string, targetValue: Date) => {
      if (props.mode !== 'week') return {};

      if (Array.isArray(value)) {
        if (!value.length) return {};
        const [startObj, endObj] = value.map((v) => v && parseToDayjs(v, format));
        const startYear = startObj && startObj.year();
        const startWeek = startObj && startObj.week();
        const endYear = endObj && endObj.year();
        const endWeek = endObj && endObj.week();

        const targetObj = parseToDayjs(targetValue, format);
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
          parseToDayjs(value, format).week() === parseToDayjs(targetValue, format).week(),
      };
    };

    return () => (
      <div class={COMPONENT_NAME.value} onMouseleave={(e: MouseEvent) => props.onCellMouseLeave?.({ e })}>
        <table>
          {showThead.value && (
            <thead>
              <tr>
                {weekArr.value.map((value: string, i: number) => (
                  <th key={i}>{value}</th>
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
                  ...weekRowClass(props.value, props.format, row[0].value),
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
