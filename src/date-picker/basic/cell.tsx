import { defineComponent } from 'vue';
import { usePrefixClass } from '../../hooks/useConfig';

export default defineComponent({
  name: 'TDatePickerCell',
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
  setup() {
    const COMPONENT_NAME = usePrefixClass('date-picker__cell');
    const name = usePrefixClass('date-picker-cell');
    return {
      name,
      COMPONENT_NAME,
    };
  },
  render() {
    const {
      name,
      COMPONENT_NAME,
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
        [`${COMPONENT_NAME}--now`]: now,
        [`${COMPONENT_NAME}--active`]: active,
        [`${COMPONENT_NAME}--disabled`]: disabled,
        [`${COMPONENT_NAME}--highlight`]: highlight,
        [`${COMPONENT_NAME}--active-start`]: startOfRange,
        [`${COMPONENT_NAME}--active-end`]: endOfRange,
        [`${COMPONENT_NAME}--additional`]: additional,
        [`${COMPONENT_NAME}--first-day-of-month`]: firstDayOfMonth,
        [`${COMPONENT_NAME}--last-day-of-month`]: lastDayOfMonth,
      },
    ];

    return (
      <td class={cellClass}>
        <div
          class={`${COMPONENT_NAME}-wrapper`}
          onClick={(e: MouseEvent) => {
            if (!disabled) {
              onClick(value, { e });
            }
          }}
          onMouseenter={() => onMouseEnter && onMouseEnter(value)}
        >
          <span class={`${COMPONENT_NAME}-text`}>{text}</span>
        </div>
      </td>
    );
  },
});
