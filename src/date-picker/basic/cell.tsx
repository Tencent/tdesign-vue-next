import { defineComponent } from 'vue';
import { prefix } from '../../config';

const name = `${prefix}-date-picker-cell`;

export default defineComponent({
  name,
  props: {
    text: [String, Number],
    value: Date,
    active: Boolean,
    highlight: Boolean,
    disabled: Boolean,
    startOfRange: Boolean,
    endOfRange: Boolean,
    additional: Boolean,
    now: Boolean,
    firstDayOfMonth: Boolean,
    lastDayOfMonth: Boolean,
    onClick: Function,
    onMouseEnter: { type: Function },
  },
  render() {
    const {
      text,
      value,
      active,
      highlight,
      disabled,
      startOfRange,
      endOfRange,
      additional,
      now,
      firstDayOfMonth,
      lastDayOfMonth,
      onClick,
      onMouseEnter,
    } = this;
    const cellClass = [
      name,
      {
        [`${prefix}-date-picker__cell--now`]: now,
        [`${prefix}-date-picker__cell--active`]: active,
        [`${prefix}-date-picker__cell--disabled`]: disabled,
        [`${prefix}-date-picker__cell--highlight`]: highlight,
        [`${prefix}-date-picker__cell--active-start`]: startOfRange,
        [`${prefix}-date-picker__cell--active-end`]: endOfRange,
        [`${prefix}-date-picker__cell--additional`]: additional,
        [`${prefix}-date-picker__cell--first-day-of-month`]: firstDayOfMonth,
        [`${prefix}-date-picker__cell--last-day-of-month`]: lastDayOfMonth,
      },
    ];

    return (
      <td class={cellClass}>
        <div
          class={`${prefix}-date-picker__cell-wrapper`}
          onClick={(e: MouseEvent) => {
            if (!disabled) {
              onClick(value, { e });
            }
          }}
          onMouseenter={() => onMouseEnter && onMouseEnter(value)}
        >
          <span class={`${prefix}-date-picker__cell`}>{text}</span>
        </div>
      </td>
    );
  },
});
