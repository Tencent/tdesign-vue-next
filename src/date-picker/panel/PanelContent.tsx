import { defineComponent, PropType, computed } from 'vue';
import dayjs from 'dayjs';
import { usePrefixClass } from '../../hooks/useConfig';
import type { TdDatePickerProps } from '../type';

import TDateHeader from '../base/Header';
import TDateTable from '../base/Table';
import TTimePickerPanel from '../../time-picker/panel/time-picker-panel';
import { getDefaultFormat } from '../hooks/useFormat';

export default defineComponent({
  name: 'TPanelContent',
  props: {
    mode: String as PropType<TdDatePickerProps['mode']>,
    format: String as PropType<TdDatePickerProps['format']>,
    enableTimePicker: Boolean as PropType<TdDatePickerProps['enableTimePicker']>,
    timePickerProps: Object as PropType<TdDatePickerProps['timePickerProps']>,
    year: Number,
    month: Number,
    tableData: Array,
    timeValue: String,
    firstDayOfWeek: Number,
    partial: String,
    onYearChange: Function,
    onMonthChange: Function,
    onJumperClick: Function,
    onCellMouseEnter: Function,
    onCellClick: Function,
    onCellMouseLeave: Function,
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('date-picker__panel');

    const { timeFormat } = getDefaultFormat({
      mode: props.mode,
      format: props.format,
      enableTimePicker: props.enableTimePicker,
    });

    const defaultTimeValue = computed(() => dayjs().format(timeFormat));

    return () => (
      <div class={`${COMPONENT_NAME.value}--content`}>
        <div class={`${COMPONENT_NAME.value}--${props.mode}`}>
          <TDateHeader
            mode={props.mode}
            year={props.year}
            month={props.month}
            onMonthChange={(val: number) => props.onMonthChange?.(val, { partial: props.partial })}
            onYearChange={(val: number) => props.onYearChange?.(val, { partial: props.partial })}
            onJumperClick={(val: number) => props.onJumperClick?.(val, { partial: props.partial })}
          />

          <TDateTable
            mode={props.mode}
            data={props.tableData}
            timeValue={props.timeValue}
            firstDayOfWeek={props.firstDayOfWeek}
            onCellClick={(date: Date, { e }: { e: MouseEvent }) =>
              props.onCellClick?.(date, { e, partial: props.partial })
            }
            onCellMouseEnter={(date: Date) => props.onCellMouseEnter?.(date, { partial: props.partial })}
            onCellMouseLeave={props.onCellMouseLeave}
          />
        </div>

        {props.enableTimePicker && (
          <div class={`${COMPONENT_NAME.value}--time`}>
            <div class={`${COMPONENT_NAME.value}--time-viewer`}>{props.timeValue || defaultTimeValue.value}</div>
            <TTimePickerPanel
              format={timeFormat}
              value={props.timeValue}
              onChange={props.onTimePickerChange}
              {...props.timePickerProps}
            />
          </div>
        )}
      </div>
    );
  },
});
