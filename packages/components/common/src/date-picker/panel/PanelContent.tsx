import type { PropType } from '@td/adapter-vue';
import { defineComponent } from '@td/adapter-vue';
import type { TdDatePickerProps } from '@td/intel/date-picker/type';
import { getDefaultFormat } from '@td/common/js/date-picker/format';
import { usePrefixClass } from '@td/adapter-hooks';

import TDateHeader from '../base/Header';
import TDateTable from '../base/Table';
import TTimePickerPanel from '../../time-picker/panel/time-picker-panel';

export default defineComponent({
  name: 'TPanelContent',
  props: {
    mode: String as PropType<TdDatePickerProps['mode']>,
    format: String as PropType<TdDatePickerProps['format']>,
    enableTimePicker: Boolean as PropType<TdDatePickerProps['enableTimePicker']>,
    timePickerProps: {
      type: Object as PropType<TdDatePickerProps['timePickerProps']>,
      default: () => ({}),
    },
    year: Number,
    month: Number,
    tableData: Array,
    time: String,
    firstDayOfWeek: Number,
    partial: String,
    popupVisible: Boolean,
    onYearChange: Function,
    onMonthChange: Function,
    onJumperClick: Function,
    onCellMouseEnter: Function,
    onCellClick: Function,
    onCellMouseLeave: Function,
    onTimePickerChange: Function,
    value: [String, Number, Array, Date],
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('date-picker__panel');

    const { timeFormat } = getDefaultFormat({
      mode: props.mode,
      format: props.format,
      enableTimePicker: props.enableTimePicker,
    });

    const defaultTimeValue = '00:00:00';

    return () => (
      <div class={`${COMPONENT_NAME.value}-content`}>
        <div class={`${COMPONENT_NAME.value}-${props.mode}`}>
          <TDateHeader
            mode={props.mode}
            year={props.year}
            month={props.month}
            onMonthChange={(val: number) => props.onMonthChange?.(val, { partial: props.partial })}
            onYearChange={(val: number) => props.onYearChange?.(val, { partial: props.partial })}
            onJumperClick={({ trigger }: { trigger: string }) =>
              props.onJumperClick?.({ trigger, partial: props.partial })}
          />

          <TDateTable
            mode={props.mode}
            data={props.tableData}
            time={props.time}
            value={props.value}
            format={props.format}
            firstDayOfWeek={props.firstDayOfWeek}
            onCellClick={(date: Date, { e }: { e: MouseEvent }) =>
              props.onCellClick?.(date, { e, partial: props.partial })}
            onCellMouseEnter={(date: Date) => props.onCellMouseEnter?.(date, { partial: props.partial })}
            onCellMouseLeave={props.onCellMouseLeave}
          />
        </div>

        {props.enableTimePicker && (
          <div class={`${COMPONENT_NAME.value}-time`}>
            <div class={`${COMPONENT_NAME.value}-time-viewer`}>{props.time || defaultTimeValue}</div>
            <TTimePickerPanel
              {...{
                key: props.partial,
                isShowPanel: props.popupVisible,
                format: timeFormat,
                value: props.time || defaultTimeValue,
                onChange: props.onTimePickerChange,
                ...props.timePickerProps,
              }}
            />
          </div>
        )}
      </div>
    );
  },
});
