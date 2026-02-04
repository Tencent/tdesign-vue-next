import { defineComponent, PropType, computed } from 'vue';
import { useConfig, usePrefixClass } from '@tdesign/shared-hooks';
import TPanelContent from './PanelContent';
import TExtraContent from './ExtraContent';
import { TdDateRangePickerProps, PickerDateRange } from '../../type';
import { getDefaultFormat, parseToDayjs } from '@tdesign/common-js/date-picker/format';
import { useTableData, useDisableDate } from '../../hooks';
import { isArray, isFunction } from 'lodash-es';
import log from '@tdesign/common-js/log/index';

export default defineComponent({
  name: 'TRangePanel',
  props: {
    hoverValue: Array as PropType<Array<string>>,
    range: [Array, Function] as PropType<TdDateRangePickerProps['range']>,
    activeIndex: Number,
    isFirstValueSelected: Boolean,
    disabled: {
      type: [Boolean, Array] as PropType<TdDateRangePickerProps['disabled']>,
    },
    disableDate: [Object, Array, Function] as PropType<TdDateRangePickerProps['disableDate']>,
    disableTime: Function as PropType<TdDateRangePickerProps['disableTime']>,
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
    defaultTime: Array as PropType<TdDateRangePickerProps['defaultTime']>,
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
    needConfirm: Boolean,
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('date-range-picker__panel');
    const { globalConfig } = useConfig('datePicker');

    const format = computed(
      () =>
        getDefaultFormat({
          mode: props.mode,
          format: props.format,
          enableTimePicker: props.enableTimePicker,
        })?.format,
    );

    // 是否隐藏预选状态,只有 value 有值的时候需要隐藏
    const hidePreselection = !props.panelPreselection && props.value.length === 2;

    const disableDateOptions = computed(() => {
      const startDateValue = new Date(parseToDayjs(props.value[0], format.value, 'start').toDate().setHours(0, 0, 0));
      const endDateValue = new Date(parseToDayjs(props.value[1], format.value, 'end').toDate().setHours(23, 59, 59));
      let start = props.isFirstValueSelected && props.activeIndex === 1 ? startDateValue : undefined;
      let end = props.isFirstValueSelected && props.activeIndex === 0 ? endDateValue : undefined;

      if (props.disabled && isArray(props.disabled)) {
        if (props.disabled[0]) start = startDateValue;
        else if (props.disabled[1]) end = endDateValue;
      }

      return useDisableDate({
        format: format.value,
        mode: props.mode,
        disableDate: props.disableDate,
        start,
        end,
      });
    });

    // 处理 range 参数
    // - 如果 range 是数组并且其元素为函数或数组（表示左右面板分别的范围），则拆分为 startRange / endRange；
    // - 否则将整个 range 视为单一范围，左右面板共用。
    const rangeValue = computed(() => {
      let startRange = props.range as PickerDateRange;
      let endRange = props.range as PickerDateRange;

      if (isArray(props.range)) {
        if (props.range.length !== 2) {
          log.warn('DateRangePicker', '`range` length must be 2 when `range` is an array.');
        }
        const first = props.range[0];
        const second = props.range[1];
        if ((isArray(first) || isFunction(first)) && (isArray(second) || isFunction(second))) {
          startRange = first;
          endRange = second;
        }
      }

      return {
        start: startRange,
        end: endRange,
      };
    });

    const startTableData = computed(() => {
      const disableDate = isFunction(props.disableDate)
        ? props.disableDate({ partial: 'start', value: props.value[0] })
        : disableDateOptions.value.disableDate;
      return useTableData({
        isRange: true,
        start: props.value[0] ? parseToDayjs(props.value[0], format.value).toDate() : undefined,
        end: props.value[1] ? parseToDayjs(props.value[1], format.value).toDate() : undefined,
        hoverStart:
          !hidePreselection && props.hoverValue[0]
            ? parseToDayjs(props.hoverValue[0], format.value).toDate()
            : undefined,
        hoverEnd:
          !hidePreselection && props.hoverValue[1]
            ? parseToDayjs(props.hoverValue[1], format.value).toDate()
            : undefined,
        year: props.year[0],
        month: props.month[0],
        mode: props.mode,
        firstDayOfWeek: props.firstDayOfWeek || globalConfig.value.firstDayOfWeek,
        range: rangeValue.value.start,
        ...disableDateOptions.value,
        disableDate,
        cancelRangeSelectLimit: props.cancelRangeSelectLimit,
      });
    });

    const endTableData = computed(() => {
      const disableDate = isFunction(props.disableDate)
        ? props.disableDate({ partial: 'end', value: props.value })
        : disableDateOptions.value.disableDate;

      return useTableData({
        isRange: true,
        start: props.value[0] ? parseToDayjs(props.value[0], format.value).toDate() : undefined,
        end: props.value[1] ? parseToDayjs(props.value[1], format.value).toDate() : undefined,
        hoverStart:
          !hidePreselection && props.hoverValue[0]
            ? parseToDayjs(props.hoverValue[0], format.value).toDate()
            : undefined,
        hoverEnd:
          !hidePreselection && props.hoverValue[1]
            ? parseToDayjs(props.hoverValue[1], format.value).toDate()
            : undefined,
        year: props.mode === 'year' && props.year[1] - props.year[0] <= 9 ? props.year[1] + 9 : props.year[1],
        month: props.month[1],
        mode: props.mode,
        firstDayOfWeek: props.firstDayOfWeek || globalConfig.value.firstDayOfWeek,
        range: rangeValue.value.end,
        ...disableDateOptions.value,
        disableDate,
        cancelRangeSelectLimit: props.cancelRangeSelectLimit,
      });
    });

    const panelContentProps = computed(() => ({
      format: format.value,
      mode: props.mode,
      firstDayOfWeek: props.firstDayOfWeek || globalConfig.value.firstDayOfWeek,
      internalYear: props.year,
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
      disableTime: props.disableTime,
      defaultTime: props.defaultTime,
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
        {['top', 'left'].includes(props.presetsPlacement) ? (
          <TExtraContent
            presets={props.presets}
            selectedValue={props.value[props.activeIndex]}
            enableTimePicker={props.enableTimePicker}
            onPresetClick={props.onPresetClick}
            onConfirmClick={props.onConfirmClick}
            presetsPlacement={props.presetsPlacement}
            needConfirm={props.needConfirm}
          />
        ) : null}
        <div class={`${COMPONENT_NAME.value}-content-wrapper`}>
          {!props.enableTimePicker ? (
            [
              <TPanelContent
                key="startPanel"
                partial="start"
                year={props.year[0]}
                month={props.month[0]}
                time={props.time[props.activeIndex]}
                value={props.value}
                tableData={startTableData.value}
                range={rangeValue.value.start}
                {...panelContentProps.value}
              />,
              <TPanelContent
                key="endPanel"
                partial="end"
                year={props.year[1]}
                month={props.month[1]}
                time={props.time[props.activeIndex]}
                value={props.value}
                tableData={endTableData.value}
                range={rangeValue.value.end}
                {...panelContentProps.value}
              />,
            ]
          ) : (
            <TPanelContent
              key="start"
              partial={props.activeIndex ? 'end' : 'start'}
              year={props.activeIndex ? props.year[1] : props.year[0]}
              month={props.activeIndex ? props.month[1] : props.month[0]}
              time={props.activeIndex ? props.time[1] : props.time[0]}
              value={props.value}
              tableData={props.activeIndex ? endTableData.value : startTableData.value}
              range={props.activeIndex ? rangeValue.value.end : rangeValue.value.start}
              {...panelContentProps.value}
            />
          )}
        </div>
        {['bottom', 'right'].includes(props.presetsPlacement) ? (
          <TExtraContent
            presets={props.presets}
            selectedValue={props.value[props.activeIndex]}
            enableTimePicker={props.enableTimePicker}
            onPresetClick={props.onPresetClick}
            onConfirmClick={props.onConfirmClick}
            presetsPlacement={props.presetsPlacement}
            needConfirm={props.needConfirm}
          />
        ) : null}
      </div>
    );
  },
});
