import type { PropType } from '@td/adapter-vue';
import { computed, defineComponent } from '@td/adapter-vue';
import { useConfig, usePrefixClass } from '@td/adapter-hooks';
import type { TdDateRangePickerProps } from '@td/intel/components/date-picker/type';
import { getDefaultFormat, parseToDayjs } from '@td/shared/_common/js/date-picker/format';
import useTableData from '../hooks/useTableData';
import useDisableDate from '../hooks/useDisableDate';
import TExtraContent from './ExtraContent';
import TPanelContent from './PanelContent';

export default defineComponent({
  name: 'TRangePanel',
  props: {
    hoverValue: Array as PropType<Array<string>>,
    activeIndex: Number,
    isFirstValueSelected: Boolean,
    disableDate: [Object, Array, Function] as PropType<TdDateRangePickerProps['disableDate']>,
    mode: {
      type: String as PropType<TdDateRangePickerProps['mode']>,
      default: 'date',
    },
    format: String as PropType<TdDateRangePickerProps['format']>,
    presetsPlacement: {
      type: String as PropType<TdDateRangePickerProps['presetsPlacement']>,
      default: 'bottom',
    },
    value: Array as PropType<Array<string>>,
    timePickerProps: Object as PropType<TdDateRangePickerProps['timePickerProps']>,
    presets: Object as PropType<TdDateRangePickerProps['presets']>,
    popupVisible: Boolean,
    enableTimePicker: Boolean,
    panelPreselection: Boolean,
    firstDayOfWeek: Number,
    year: Array as PropType<Array<number>>,
    month: Array as PropType<Array<number>>,
    time: Array as PropType<Array<string>>,
    cancelRangeSelectLimit: Boolean,
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
    const COMPONENT_NAME = usePrefixClass('date-range-picker__panel');
    const { globalConfig } = useConfig('datePicker');

    const { format } = getDefaultFormat({
      mode: props.mode,
      format: props.format,
      enableTimePicker: props.enableTimePicker,
    });

    // 是否隐藏预选状态,只有 value 有值的时候需要隐藏
    const hidePreselection = !props.panelPreselection && props.value.length === 2;

    const disableDateOptions = computed(() =>
      useDisableDate({
        format,
        mode: props.mode,
        disableDate: props.disableDate,
        start:
          props.isFirstValueSelected && props.activeIndex === 1
            ? new Date(parseToDayjs(props.value[0], format, 'start').toDate().setHours(0, 0, 0))
            : undefined,
        end:
          props.isFirstValueSelected && props.activeIndex === 0
            ? new Date(parseToDayjs(props.value[1], format).toDate().setHours(23, 59, 59))
            : undefined,
      }),
    );

    const startTableData = computed(() =>
      useTableData({
        isRange: true,
        start: props.value[0] ? parseToDayjs(props.value[0] as string, format).toDate() : undefined,
        end: props.value[1] ? parseToDayjs(props.value[1] as string, format).toDate() : undefined,
        hoverStart:
          !hidePreselection && props.hoverValue[0]
            ? parseToDayjs(props.hoverValue[0] as string, format).toDate()
            : undefined,
        hoverEnd:
          !hidePreselection && props.hoverValue[1]
            ? parseToDayjs(props.hoverValue[1] as string, format).toDate()
            : undefined,
        year: props.year[0],
        month: props.month[0],
        mode: props.mode,
        firstDayOfWeek: props.firstDayOfWeek || globalConfig.value.firstDayOfWeek,
        ...disableDateOptions.value,
        cancelRangeSelectLimit: props.cancelRangeSelectLimit,
      }),
    );

    const endTableData = computed(() =>
      useTableData({
        isRange: true,
        start: props.value[0] ? parseToDayjs(props.value[0] as string, format).toDate() : undefined,
        end: props.value[1] ? parseToDayjs(props.value[1] as string, format).toDate() : undefined,
        hoverStart:
          !hidePreselection && props.hoverValue[0]
            ? parseToDayjs(props.hoverValue[0] as string, format).toDate()
            : undefined,
        hoverEnd:
          !hidePreselection && props.hoverValue[1]
            ? parseToDayjs(props.hoverValue[1] as string, format).toDate()
            : undefined,
        year: props.year[1],
        month: props.month[1],
        mode: props.mode,
        firstDayOfWeek: props.firstDayOfWeek || globalConfig.value.firstDayOfWeek,
        ...disableDateOptions.value,
        cancelRangeSelectLimit: props.cancelRangeSelectLimit,
      }),
    );

    const panelContentProps = computed(() => ({
      format,
      mode: props.mode,
      firstDayOfWeek: props.firstDayOfWeek || globalConfig.value.firstDayOfWeek,

      popupVisible: props.popupVisible,
      enableTimePicker: props.enableTimePicker,
      timePickerProps: props.timePickerProps,
      onMonthChange: props.onMonthChange,
      onYearChange: props.onYearChange,
      onJumperClick: props.onJumperClick,
      onCellClick: props.onCellClick,
      onCellMouseEnter: props.onCellMouseEnter,
      onCellMouseLeave: props.onCellMouseLeave,
      onTimePickerChange: props.onTimePickerChange,
    }));

    return () => (
      <div
        class={[
          COMPONENT_NAME.value,
          {
            [`${COMPONENT_NAME.value}--direction-row`]: ['left', 'right'].includes(props.presetsPlacement),
          },
        ]}
        onClick={e => props.onClick?.({ e })}
      >
        {['top', 'left'].includes(props.presetsPlacement)
          ? (
            <TExtraContent
              presets={props.presets}
              selectedValue={props.value[props.activeIndex]}
              enableTimePicker={props.enableTimePicker}
              onPresetClick={props.onPresetClick}
              onConfirmClick={props.onConfirmClick}
              presetsPlacement={props.presetsPlacement}
            />
            )
          : null}
        <div class={`${COMPONENT_NAME.value}-content-wrapper`}>
          {!props.enableTimePicker
            ? (
                [
                  <TPanelContent
                    key="startPanel"
                    partial="start"
                    year={props.year[0]}
                    month={props.month[0]}
                    time={props.time[0]}
                    value={props.value}
                    tableData={startTableData.value}
                    {...panelContentProps.value}
                  />,
                  <TPanelContent
                    key="endPanel"
                    partial="end"
                    year={props.year[1]}
                    month={props.month[1]}
                    time={props.time[1]}
                    value={props.value}
                    tableData={endTableData.value}
                    {...panelContentProps.value}
                  />,
                ]
              )
            : (
              <TPanelContent
                key="start"
                partial={props.activeIndex ? 'end' : 'start'}
                year={props.activeIndex ? props.year[1] : props.year[0]}
                month={props.activeIndex ? props.month[1] : props.month[0]}
                time={props.activeIndex ? props.time[1] : props.time[0]}
                value={props.value}
                tableData={props.activeIndex ? endTableData.value : startTableData.value}
                {...panelContentProps.value}
              />
              )}
        </div>
        {['bottom', 'right'].includes(props.presetsPlacement)
          ? (
            <TExtraContent
              presets={props.presets}
              selectedValue={props.value[props.activeIndex]}
              enableTimePicker={props.enableTimePicker}
              onPresetClick={props.onPresetClick}
              onConfirmClick={props.onConfirmClick}
              presetsPlacement={props.presetsPlacement}
            />
            )
          : null}
      </div>
    );
  },
});
