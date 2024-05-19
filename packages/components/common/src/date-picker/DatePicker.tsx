import { defineComponent, computed, watch } from 'vue';
import dayjs from 'dayjs';
import isFunction from 'lodash/isFunction';

import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass, useConfig } from '../hooks/useConfig';
import { useFormDisabled } from '../form/hooks';
import useSingle from './hooks/useSingle';
import { parseToDayjs, getDefaultFormat, formatTime, formatDate } from '../_common/js/date-picker/format';
import { subtractMonth, addMonth, extractTimeObj, covertToDate } from '../_common/js/date-picker/utils';
import props from '@td/intel/date-picker/props';
import TSelectInput from '../select-input';
import TSinglePanel from './panel/SinglePanel';

import type { TdDatePickerProps } from '@td/intel/date-picker/type';
import type { DateValue } from '@td/intel/date-picker/type';
import isDate from 'lodash/isDate';

export default defineComponent({
  name: 'TDatePicker',

  props: {
    ...props,
  },

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('date-picker');

    const {
      inputValue,
      popupVisible,
      inputProps,
      popupProps,
      isHoverCell,
      cacheValue,
      value,
      year,
      month,
      time,
      inputRef,
      onChange,
    } = useSingle(props);

    const disabled = useFormDisabled();
    const renderTNodeJSX = useTNodeJSX();
    const { globalConfig } = useConfig('datePicker');

    const formatRef = computed(() =>
      getDefaultFormat({
        mode: props.mode,
        format: props.format,
        valueType: props.valueType,
        enableTimePicker: props.enableTimePicker,
      }),
    );
    const valueDisplayParams = computed(() => {
      return {
        value: value.value,
        displayValue: inputValue.value,
      };
    });

    watch(popupVisible, (visible) => {
      const dateValue =
        // Date 属性不再 parse，避免 dayjs 处理成 Invalid
        value.value && !isDate(value.value)
          ? covertToDate(value.value as string, formatRef.value?.valueType)
          : value.value;

      cacheValue.value = formatDate(dateValue, {
        format: formatRef.value.format,
      });
      inputValue.value = formatDate(dateValue, {
        format: formatRef.value.format,
      });

      // 面板展开重置数据
      if (visible) {
        year.value = parseToDayjs(value.value, formatRef.value.format).year();
        month.value = parseToDayjs(value.value, formatRef.value.format).month();
        time.value = formatTime(value.value, formatRef.value.format, formatRef.value.timeFormat, props.defaultTime);
      } else {
        isHoverCell.value = false;
      }
    });

    // 日期 hover
    function onCellMouseEnter(date: Date) {
      isHoverCell.value = true;
      inputValue.value = formatDate(date, {
        format: formatRef.value.format,
      });
    }

    // 日期 leave
    function onCellMouseLeave() {
      isHoverCell.value = false;
      inputValue.value = formatDate(cacheValue.value, {
        format: formatRef.value.format,
      });
    }

    // 日期点击
    function onCellClick(date: Date) {
      isHoverCell.value = false;
      // date 模式自动切换年月
      if (props.mode === 'date') {
        year.value = date.getFullYear();
        month.value = date.getMonth();
      }
      if (props.enableTimePicker) {
        cacheValue.value = formatDate(date, {
          format: formatRef.value.format,
        });
      } else {
        onChange?.(
          formatDate(date, {
            format: formatRef.value.format,
            targetFormat: formatRef.value.valueType,
          }) as DateValue,
          {
            dayjsValue: parseToDayjs(date, formatRef.value.format),
            trigger: 'pick',
          },
        );
        popupVisible.value = false;
      }

      props.onPick?.(date);
    }

    // 头部快速切换
    function onJumperClick({ trigger }: { trigger: string }) {
      const monthCountMap = { date: 1, week: 1, month: 12, quarter: 12, year: 120 };
      const monthCount = monthCountMap[props.mode] || 0;

      const current = new Date(year.value, month.value);

      let next = null;
      if (trigger === 'prev') {
        next = subtractMonth(current, monthCount);
      } else if (trigger === 'current') {
        next = new Date();
      } else if (trigger === 'next') {
        next = addMonth(current, monthCount);
      }

      const nextYear = next.getFullYear();
      const nextMonth = next.getMonth();

      year.value = nextYear;
      month.value = nextMonth;
    }

    // timePicker 点击
    function onTimePickerChange(val: string) {
      time.value = val;

      const { hours, minutes, seconds, milliseconds, meridiem } = extractTimeObj(val);

      // am pm 12小时制转化 24小时制
      let nextHours = hours;
      if (/am/i.test(meridiem) && nextHours === 12) nextHours -= 12;
      if (/pm/i.test(meridiem) && nextHours < 12) nextHours += 12;
      const currentDate = !dayjs(inputValue.value as string, formatRef.value.format).isValid()
        ? dayjs()
        : dayjs(inputValue.value as string, formatRef.value.format);
      const nextDate = currentDate.hour(nextHours).minute(minutes).second(seconds).millisecond(milliseconds).toDate();
      inputValue.value = formatDate(nextDate, {
        format: formatRef.value.format,
      });
      cacheValue.value = formatDate(nextDate, {
        format: formatRef.value.format,
      });

      props.onPick?.(nextDate);
    }

    // 确定
    function onConfirmClick({ e }: { e: MouseEvent }) {
      const nextValue = formatDate(inputValue.value, {
        format: formatRef.value.format,
      });
      if (nextValue) {
        props?.onConfirm?.({ date: dayjs(nextValue as string).toDate(), e });
        onChange?.(
          formatDate(inputValue.value, {
            format: formatRef.value.format,
            targetFormat: formatRef.value.valueType,
          }) as DateValue,
          {
            dayjsValue: parseToDayjs(inputValue.value as string, formatRef.value.format),
            trigger: 'confirm',
          },
        );
      } else {
        inputValue.value = formatDate(value.value, {
          format: formatRef.value.format,
        });
      }
      popupVisible.value = false;
    }

    // 预设
    function onPresetClick(presetValue: DateValue | (() => DateValue)) {
      const presetVal = isFunction(presetValue) ? presetValue() : presetValue;
      onChange?.(
        formatDate(presetVal, {
          format: formatRef.value.format,
          targetFormat: formatRef.value.valueType,
        }) as DateValue,
        {
          dayjsValue: parseToDayjs(presetVal, formatRef.value.format),
          trigger: 'preset',
        },
      );

      popupVisible.value = false;
    }

    function onYearChange(nextYear: number) {
      year.value = nextYear;
    }

    function onMonthChange(nextMonth: number) {
      month.value = nextMonth;
    }

    const panelProps = computed(() => ({
      value: cacheValue.value as string,
      year: year.value,
      month: month.value,
      format: formatRef.value.format,
      mode: props.mode,
      presets: props.presets,
      time: time.value as string,
      disableDate: props.disableDate,
      firstDayOfWeek: props.firstDayOfWeek,
      timePickerProps: props.timePickerProps,
      enableTimePicker: props.enableTimePicker,
      presetsPlacement: props.presetsPlacement,
      popupVisible: popupVisible.value,
      onCellClick,
      onCellMouseEnter,
      onCellMouseLeave,
      onJumperClick,
      onConfirmClick,
      onPresetClick,
      onYearChange,
      onMonthChange,
      onTimePickerChange,
      onPanelClick: () => inputRef.value?.focus?.(),
    }));

    return () => (
      <div class={COMPONENT_NAME.value}>
        <TSelectInput
          disabled={disabled.value}
          value={inputValue.value}
          status={props.status}
          tips={props.tips}
          clearable={props.clearable}
          popupProps={popupProps.value}
          inputProps={inputProps.value}
          placeholder={props.placeholder || globalConfig.value.placeholder[props.mode]}
          popupVisible={popupVisible.value}
          valueDisplay={() => renderTNodeJSX('valueDisplay', { params: valueDisplayParams.value })}
          {...(props.selectInputProps as TdDatePickerProps['selectInputProps'])}
          panel={() => <TSinglePanel {...panelProps.value} />}
        />
      </div>
    );
  },
});
