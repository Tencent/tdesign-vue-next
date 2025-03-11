import { defineComponent, computed } from 'vue';
import { usePrefixClass } from '../../../hooks/useConfig';
import { extractTimeObj } from '@tdesign/common-js/date-picker/utils';
import { Dayjs } from 'dayjs';

export default defineComponent({
  name: 'TDatePickerCell',
  props: {
    time: String,
    text: [String, Number],
    value: Date,
    active: Boolean,
    highlight: Boolean,
    disabled: Boolean,
    startOfRange: Boolean,
    endOfRange: Boolean,
    hoverHighlight: Boolean,
    hoverStartOfRange: Boolean,
    hoverEndOfRange: Boolean,
    additional: Boolean,
    now: Boolean,
    firstDayOfMonth: Boolean,
    lastDayOfMonth: Boolean,
    onClick: Function,
    onMouseEnter: Function,
    dayjsObj: Dayjs,
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('date-picker__cell');

    const cellClass = computed(() => [
      COMPONENT_NAME.value,
      {
        [`${COMPONENT_NAME.value}--now`]: props.now,
        [`${COMPONENT_NAME.value}--active`]: props.active,
        [`${COMPONENT_NAME.value}--disabled`]: props.disabled,
        [`${COMPONENT_NAME.value}--highlight`]: props.highlight,
        [`${COMPONENT_NAME.value}--hover-highlight`]: props.hoverHighlight,
        [`${COMPONENT_NAME.value}--active-start`]: props.startOfRange,
        [`${COMPONENT_NAME.value}--active-end`]: props.endOfRange,
        [`${COMPONENT_NAME.value}--hover-start`]: props.hoverStartOfRange,
        [`${COMPONENT_NAME.value}--hover-end`]: props.hoverEndOfRange,
        [`${COMPONENT_NAME.value}--additional`]: props.additional,
        [`${COMPONENT_NAME.value}--first-day-of-month`]: props.firstDayOfMonth,
        [`${COMPONENT_NAME.value}--last-day-of-month`]: props.lastDayOfMonth,
      },
    ]);

    function handleClick(e: MouseEvent) {
      if (props.disabled) return;
      if (props.time) {
        const { hours, minutes, seconds, milliseconds, meridiem } = extractTimeObj(props.time);
        // am pm 12小时制转化 24小时制
        let nextHours = hours;
        if (/am/i.test(meridiem) && nextHours === 12) nextHours -= 12;
        if (/pm/i.test(meridiem) && nextHours < 12) nextHours += 12;
        props.value.setHours(nextHours);
        props.value.setMinutes(minutes);
        props.value.setSeconds(seconds);
        props.value.setMilliseconds(milliseconds);
      }
      props.onClick?.(props.value, { e });
    }

    function handleMouseEnter() {
      if (props.disabled) return;
      if (props.time) {
        const { hours, minutes, seconds, milliseconds, meridiem } = extractTimeObj(props.time);
        // am pm 12小时制转化 24小时制
        let nextHours = hours;
        if (/am/i.test(meridiem) && nextHours === 12) nextHours -= 12;
        if (/pm/i.test(meridiem) && nextHours < 12) nextHours += 12;
        props.value.setHours(nextHours);
        props.value.setMinutes(minutes);
        props.value.setSeconds(seconds);
        props.value.setMilliseconds(milliseconds);
      }
      props.onMouseEnter?.(props.value);
    }

    return () => (
      <td class={cellClass.value} onClick={handleClick} onMouseenter={handleMouseEnter}>
        <div class={`${COMPONENT_NAME.value}-inner`}>{props.text}</div>
      </td>
    );
  },
});
