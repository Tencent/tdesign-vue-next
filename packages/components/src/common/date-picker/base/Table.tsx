import type { PropType } from '@td/adapter-vue';
import { computed, defineComponent } from '@td/adapter-vue';
import { isArray } from 'lodash-es';
import type { TdDatePickerProps } from '@td/intel/components/date-picker/type';
import { useConfig, usePrefixClass } from '@td/adapter-hooks';
import { parseToDayjs } from '@td/shared/_common/js/date-picker/format';
import TDatePickerCell from './Cell';

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
    const { dayjsLocale } = globalConfig.value;

    const weekArr = computed(() => {
      const weekArr = [];
      let wi = props.firstDayOfWeek - 1;
      const len = globalConfig.value.weekdays.length;
      while (weekArr.length < len) {
        weekArr.push(globalConfig.value.weekdays[wi]);
        wi = (wi + len + 1) % len;
      }

      if (props.mode === 'week') {
        weekArr.unshift(globalConfig.value.weekAbbreviation);
      }

      return weekArr;
    });

    const showThead = computed(() => props.mode === 'date' || props.mode === 'week');

    // 高亮周区间
    const weekRowClass = (value: any, format: string, targetValue: Date) => {
      if (props.mode !== 'week' || !value) {
        return {};
      }

      if (isArray(value)) {
        if (!value.length) {
          return {};
        }
        const [startObj, endObj] = value.map(v => v && parseToDayjs(v, format));
        const startYear = startObj && startObj.year();
        const startWeek = startObj?.locale?.(dayjsLocale)?.week?.();
        const endYear = endObj && endObj.year();
        const endWeek = endObj?.locale?.(dayjsLocale)?.week?.();

        const targetObj = parseToDayjs(targetValue, format);
        const targetYear = targetObj.year();
        const targetWeek = targetObj.week();
        const isActive
          = (targetYear === startYear && targetWeek === startWeek) || (targetYear === endYear && targetWeek === endWeek);
        const isRange
          = targetYear >= startYear && targetYear <= endYear && targetWeek > startWeek && targetWeek < endWeek;
        return {
          // 同年同周
          [`${COMPONENT_NAME.value}-${props.mode}-row--active`]: isActive,
          [`${COMPONENT_NAME.value}-${props.mode}-row--range`]: isRange,
        };
      }

      return {
        [`${COMPONENT_NAME.value}-${props.mode}-row--active`]:
          parseToDayjs(value, format).locale(dayjsLocale).week()
          === parseToDayjs(targetValue, format).locale(dayjsLocale).week(),
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
