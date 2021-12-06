import { defineComponent } from 'vue';
import { prefix } from '../../config';
import TDatePickerCell from './cell';
import { Cell } from '../interface';
import mixins from '../../utils/mixins';
import getConfigReceiverMixins, { DatePickerConfig } from '../../config-provider/config-receiver';

const name = `${prefix}-date-picker-table`;

const DAY_NAMES = ['一', '二', '三', '四', '五', '六', '日'];

export default defineComponent({
  ...mixins(getConfigReceiverMixins<DatePickerConfig>('datePicker')),
  name,
  components: {
    TDatePickerCell,
  },
  props: {
    type: {
      type: String,
      default: 'day',
    },
    data: Array,
    firstDayOfWeek: Number,
    /**
     * 星期的显示名字，规定从星期一开始，实际显示顺序会根据 firstDayOfWeek 进行计算
     */
    dayNames: { type: Array, default: () => DAY_NAMES },
    onCellClick: { type: Function },
    onCellMouseEnter: { type: Function },
  },
  render() {
    const { type, data, onCellClick, onCellMouseEnter, firstDayOfWeek } = this.$props;
    const { weekdays } = this.global;

    const weekArr = [];
    let wi = firstDayOfWeek - 1;
    const len = weekdays.length;
    while (weekArr.length < len) {
      weekArr.push(weekdays[wi]);
      wi = (wi + len + 1) % len;
    }

    const panelClass = `t-date-picker-${type}`;

    return (
      <div class={panelClass}>
        <table>
          {type === 'date' && (
            <thead>
              <tr>
                {weekArr.map((value: string, i: number) => (
                  <th key={i}>{value}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {data.map((row: Cell[], i: number) => (
              <tr key={i}>
                {row.map((col: Cell, j: number) => (
                  <t-date-picker-cell
                    {...col}
                    {...this.$attrs}
                    key={j}
                    onClick={onCellClick}
                    onMouseEnter={onCellMouseEnter}
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
