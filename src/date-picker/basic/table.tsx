import { defineComponent } from 'vue';
import { prefix } from '../../config';
import TDatePickerCell from './cell';
import { Cell, DatePickerLocale } from '../interface';
import mixins from '../../utils/mixins';
import getLocalReceiverMixins from '../../locale/local-receiver';
import props from './table-props';

const name = `${prefix}-date-picker-table`;

export default defineComponent({
  ...mixins(getLocalReceiverMixins('datePicker')),
  name,
  components: {
    TDatePickerCell,
  },
  props,
  render() {
    const {
      type,
      data,
      onCellClick,
      onCellMouseEnter,
      firstDayOfWeek,
    } = this.$props;
    const {
      weekdays: {
        shorthand,
      },
    } = this.locale as unknown as DatePickerLocale;

    const weekArr = [];
    let wi = firstDayOfWeek;
    const len = shorthand.length;
    while (weekArr.length < len) {
      weekArr.push(shorthand[wi]);
      wi = (wi + len + 1) % len;
    }

    const panelClass = `t-date-picker-${type}`;

    return (
      <div class={panelClass}>
        <table>
          {
            type === 'date' && (
              <thead>
                <tr>
                  {
                    weekArr.map((value: string, i: number) => (
                      <th key={i}>{value}</th>
                    ))
                  }
                </tr>
              </thead>
            )
          }
          <tbody>
            {
              data.map((row: Cell[], i: number) => (
                <tr key={i}>
                  {
                    row.map((col: Cell, j: number) => (
                      <t-date-picker-cell
                        active={col.active}
                        additional={col.additional}
                        disabled={col.disabled}
                        highlight={col.highlight}
                        now={col.now}
                        text={col.text}
                        value={col.value}
                        onClick={onCellClick}
                        onMouseEnter={onCellMouseEnter}
                        {...this.$attrs}
                        key={j}
                      />
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  },
});
