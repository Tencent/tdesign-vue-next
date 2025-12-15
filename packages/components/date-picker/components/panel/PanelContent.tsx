import { defineComponent, PropType } from 'vue';
import { isFunction, isArray } from 'lodash-es';
import { usePrefixClass } from '@tdesign/shared-hooks';
import type { TdDatePickerProps, TdDateRangePickerProps, DateRangePickerPartial } from '../../type';

import TDateHeader from '../base/Header';
import TDateTable from '../base/Table';
import { TimePickerPanel } from '../../../time-picker';
import { getDefaultFormat } from '@tdesign/common-js/date-picker/format';
import type { DateValue } from '@tdesign/common-js/date-picker/utils';
import { parseToDateTime } from '../../utils';

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
    multiple: Boolean,
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
    internalYear: Array as PropType<Array<number>>,
    disableTime: Function as PropType<TdDateRangePickerProps['disableTime']>,
    defaultTime: [String, Array] as PropType<TdDatePickerProps['defaultTime'] | TdDateRangePickerProps['defaultTime']>,
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('date-picker__panel');

    const { timeFormat } = getDefaultFormat({
      mode: props.mode,
      format: props.format,
      enableTimePicker: props.enableTimePicker,
    });

    const disableTimeOptions = () => {
      if (!isFunction(props.disableTime)) {
        return {};
      }

      const startValue = isArray(props.value) ? props.value[0] : props.value;
      const endValue = isArray(props.value) ? props.value[1] : props.value;

      return props.disableTime(
        [parseToDateTime(startValue as DateValue, props.format), parseToDateTime(endValue as DateValue, props.format)],
        {
          partial: props.partial as DateRangePickerPartial,
        },
      );
    };

    const getDefaultTimeValue = () => {
      const dt = props.defaultTime as any;
      if (Array.isArray(dt)) {
        const idx = props.partial === 'end' ? 1 : 0;
        return dt[idx] || '00:00:00';
      }
      if (typeof dt === 'string' && dt) return dt;
      return '00:00:00';
    };

    return () => (
      <div class={`${COMPONENT_NAME.value}-content`}>
        <div class={`${COMPONENT_NAME.value}-${props.mode}`}>
          <TDateHeader
            mode={props.mode}
            year={props.year}
            month={props.month}
            internalYear={props.internalYear}
            partial={props.partial}
            onMonthChange={(val: number) => props.onMonthChange?.(val, { partial: props.partial })}
            onYearChange={(val: number) => props.onYearChange?.(val, { partial: props.partial })}
            onJumperClick={({ trigger }: { trigger: string }) =>
              props.onJumperClick?.({ trigger, partial: props.partial })
            }
          />

          <TDateTable
            mode={props.mode}
            data={props.tableData}
            time={props.time}
            value={props.value}
            format={props.format}
            multiple={props.multiple}
            firstDayOfWeek={props.firstDayOfWeek}
            onCellClick={(date: Date, { e }: { e: MouseEvent }) =>
              props.onCellClick?.(date, { e, partial: props.partial })
            }
            onCellMouseEnter={(date: Date) => props.onCellMouseEnter?.(date, { partial: props.partial })}
            onCellMouseLeave={props.onCellMouseLeave}
          />
        </div>

        {props.enableTimePicker && (
          <div class={`${COMPONENT_NAME.value}-time`}>
            <div class={`${COMPONENT_NAME.value}-time-viewer`}>{props.time || getDefaultTimeValue()}</div>
            <TimePickerPanel
              {...{
                key: props.partial,
                isShowPanel: props.popupVisible,
                format: timeFormat,
                value: props.time || getDefaultTimeValue(),
                onChange: props.onTimePickerChange,
                disableTime: disableTimeOptions,
                ...props.timePickerProps,
              }}
            />
          </div>
        )}
      </div>
    );
  },
});
