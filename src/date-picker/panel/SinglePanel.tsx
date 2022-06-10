import { defineComponent, PropType, computed } from 'vue';
import dayjs from 'dayjs';
import { useConfig, usePrefixClass } from '../../hooks/useConfig';
import TPanelContent from './PanelContent';
import TExtraContent from './ExtraContent';
import { TdDatePickerProps, DateValue } from '../type';
import type { TdTimePickerProps } from '../../time-picker';
import useTableData from '../hooks/useTableData';
import useDisableDate from '../hooks/useDisableDate';

export interface DatePickerPanelProps extends TdDatePickerProps {
  year?: number;
  month?: number;
  time?: string;
  onClick?: (context: { e: MouseEvent }) => void;
  onCellClick?: (date: Date, context: { e: MouseEvent }) => void;
  onCellMouseEnter?: (date: Date) => void;
  onCellMouseLeave?: (context: { e: MouseEvent }) => void;
  onJumperClick?: (flag: number) => void;
  onConfirmClick?: (context: { e: MouseEvent }) => void;
  onPresetClick?: (preset: DateValue | (() => DateValue), context: { e: MouseEvent }) => void;
  onYearChange?: (year: number) => void;
  onMonthChange?: (month: number) => void;
  onTimePickerChange?: TdTimePickerProps['onChange'];
}

export default defineComponent({
  name: 'TSinglePanel',
  props: {
    disableDate: [Object, Array, Function] as PropType<TdDatePickerProps['disableDate']>,
    mode: {
      type: String as PropType<TdDatePickerProps['mode']>,
      default: 'date',
    },
    format: String as PropType<TdDatePickerProps['format']>,
    presetsPlacement: {
      type: String as PropType<TdDatePickerProps['presetsPlacement']>,
      default: 'bottom',
    },
    value: [String, Number, Array, Date] as PropType<TdDatePickerProps['value']>,
    timePickerProps: Object as PropType<TdDatePickerProps['timePickerProps']>,
    presets: Object as PropType<TdDatePickerProps['presets']>,
    enableTimePicker: Boolean,
    firstDayOfWeek: Number,
    year: Number,
    month: Number,
    time: String,
    onClick: Function,
    onCellClick: Function,
    onCellMouseEnter: Function,
    onCellMouseLeave: Function,
    onJumperClick: Function,
    onConfirmClick: Function,
    onPresetClick: Function,
    onYearChange: Function,
    onMonthChange: Function,
    onTimePickerChange: Function,
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('date-picker__panel');
    const { global } = useConfig('datePicker');

    const disableDateOptions = computed(() =>
      useDisableDate({
        mode: props.mode,
        format: props.format,
        disableDate: props.disableDate,
      }),
    );

    const tableData = computed(() =>
      useTableData({
        year: props.year,
        month: props.month,
        mode: props.mode,
        start: props.value ? dayjs(props.value, props.format).toDate() : undefined,
        firstDayOfWeek: props.firstDayOfWeek || global.value.firstDayOfWeek,
        ...disableDateOptions.value,
      }),
    );

    const panelContentProps = computed(() => ({
      mode: props.mode,
      year: props.year,
      month: props.month,
      format: props.format,
      firstDayOfWeek: props.firstDayOfWeek || global.value.firstDayOfWeek,
      tableData: tableData.value,

      enableTimePicker: props.enableTimePicker,
      timePickerProps: props.timePickerProps,
      time: props.time,
      onMonthChange: props.onMonthChange,
      onYearChange: props.onYearChange,
      onJumperClick: props.onJumperClick,
      onCellClick: props.onCellClick,
      onCellMouseEnter: props.onCellMouseEnter,
      onCellMouseLeave: props.onCellMouseLeave,
      onTimePickerChange: props.onTimePickerChange,
    }));

    const extraProps = computed(() => ({
      presets: props.presets,
      enableTimePicker: props.enableTimePicker,
      presetsPlacement: props.presetsPlacement,
      onPresetClick: props.onPresetClick,
      onConfirmClick: props.onConfirmClick,
      selectedValue: props.value,
    }));

    return () => (
      <div
        class={[
          COMPONENT_NAME.value,
          {
            [`${COMPONENT_NAME.value}--direction-row`]: ['left', 'right'].includes(props.presetsPlacement),
          },
        ]}
        onClick={(e) => props.onClick?.({ e })}
      >
        {['top', 'left'].includes(props.presetsPlacement) ? <TExtraContent {...extraProps.value} /> : null}
        <TPanelContent {...panelContentProps.value} />
        {['bottom', 'right'].includes(props.presetsPlacement) ? <TExtraContent {...extraProps.value} /> : null}
      </div>
    );
  },
});
