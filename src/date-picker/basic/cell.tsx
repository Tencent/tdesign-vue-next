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
        [`${prefix}-date-cell--now`]: now,
        [`${prefix}-date-cell--active`]: active,
        [`${prefix}-date-cell--disabled`]: disabled,
        [`${prefix}-date-cell--highlight`]: highlight,
        [`${prefix}-date-cell--active-start`]: startOfRange,
        [`${prefix}-date-cell--active-end`]: endOfRange,
        [`${prefix}-date-cell--additional`]: additional,
        [`${prefix}-date-cell--first-day-of-month`]: firstDayOfMonth,
        [`${prefix}-date-cell--last-day-of-month`]: lastDayOfMonth,
      },
    ];

    return (
      <td class={cellClass}>
        <div
          class={`${prefix}-date-cell__wrapper`}
          onClick={(e: MouseEvent) => {
            if (!disabled) {
              onClick(value, { e });
            }
          }}
          onMouseenter={() => onMouseEnter && onMouseEnter(value)}
        >
          <span class={`${prefix}-date-cell__text`}>{text}</span>
        </div>
      </td>
    );
  },
});
