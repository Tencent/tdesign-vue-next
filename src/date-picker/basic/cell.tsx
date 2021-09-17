import { defineComponent } from 'vue';
import { prefix } from '../../config';
import props from './cell-props';

const name = `${prefix}-date-picker-cell`;

export default defineComponent({
  props,
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
    } = this.$props;
    const cellClass = [
      name,
      {
        't-date-cell--now': now,
        't-date-cell--active': active,
        't-date-cell--disabled': disabled,
        't-date-cell--highlight': highlight,
        't-date-cell--active-start': startOfRange,
        't-date-cell--active-end': endOfRange,
        't-date-cell--additional': additional,
        't-date-cell--first-day-of-month': firstDayOfMonth,
        't-date-cell--last-day-of-month': lastDayOfMonth,
      },
    ];

    return (
      <td class={cellClass}>
        <div
          class="t-date-cell__wrapper"
          onClick={() => {
            if (!disabled) {
              onClick(value);
            }
          }}
          onMouseenter={() => onMouseEnter && onMouseEnter(value)}
        >
          <span class="t-date-cell__text">{text}</span>
        </div>
      </td>
    );
  },
});
