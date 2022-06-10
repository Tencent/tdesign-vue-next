import { defineComponent, PropType, computed } from 'vue';
import TDatePickerCell from './Cell';
import { useConfig, usePrefixClass } from '../../hooks/useConfig';
import type { TdDatePickerProps } from '../type';

export default defineComponent({
  name: 'TDatePickerTable',
  props: {
    mode: {
      type: String as PropType<TdDatePickerProps['mode']>,
      default: 'date',
    },
    firstDayOfWeek: Number,
    data: Array,
    time: String,
    onCellClick: Function,
    onCellMouseEnter: Function,
    onCellMouseLeave: Function,
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('date-picker__table');
    const { global } = useConfig('datePicker');
    const { weekdays } = global.value;

    const weekArr = computed(() => {
      const _weekArr = [];
      let wi = props.firstDayOfWeek - 1;
      const len = weekdays.length;
      while (_weekArr.length < len) {
        _weekArr.push(weekdays[wi]);
        wi = (wi + len + 1) % len;
      }

      return _weekArr;
    });

    return () => (
      <div class={COMPONENT_NAME.value} onMouseleave={(e: MouseEvent) => props.onCellMouseLeave?.({ e })}>
        <table>
          {props.mode === 'date' && (
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
              <tr key={i}>
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
