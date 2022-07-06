import { defineComponent, watchEffect, computed } from 'vue';
import dayjs from 'dayjs';
import { usePrefixClass } from '../hooks/useConfig';

import { useFormDisabled } from '../form/hooks';
import useSingle from './hooks/useSingle';
import useFormat from './hooks/useFormat';
import { subtractMonth, addMonth, extractTimeObj } from '../_common/js/date-picker/utils';
import type { DateValue } from './type';
import props from './props';

import TSelectInput from '../select-input';
import TSinglePanel from './panel/SinglePanel';

export default defineComponent({
  name: 'TDatePicker',
  props,
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

    const formatRef = computed(() =>
      useFormat({
        mode: props.mode,
        value: value.value,
        format: props.format,
        valueType: props.valueType,
        enableTimePicker: props.enableTimePicker,
      }),
    );

    watchEffect(() => {
      if (!props.enableTimePicker) return;

      // 面板展开重置数据
      if (popupVisible.value) {
        cacheValue.value = formatRef.value.formatDate(value.value || new Date());
        time.value = formatRef.value.formatTime(value.value || new Date());
      }
    });

    // 日期 hover
    function onCellMouseEnter(date: Date) {
      isHoverCell.value = true;
      inputValue.value = formatRef.value.formatDate(date);
    }

    // 日期 leave
    function onCellMouseLeave() {
      isHoverCell.value = false;
      inputValue.value = formatRef.value.formatDate(cacheValue.value);
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
        cacheValue.value = formatRef.value.formatDate(date);
      } else {
        onChange?.(formatRef.value.formatDate(date, { formatType: 'valueType' }) as DateValue, {
          dayjsValue: dayjs(date),
          trigger: 'pick',
        });
        popupVisible.value = false;
      }

      props.onPick?.(date);
    }

    // 头部快速切换
    function onJumperClick({ trigger }: { trigger: string }) {
      const monthCountMap = { date: 1, month: 12, year: 120 };
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
      const nextInputValue = formatRef.value.formatDate(
        dayjs((inputValue.value as string) || new Date())
          .year(nextYear)
          .month(nextMonth)
          .toDate(),
      );

      year.value = nextYear;
      month.value = nextMonth;
      inputValue.value = nextInputValue;
    }

    // timepicker 点击
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
      inputValue.value = formatRef.value.formatDate(nextDate);

      props.onPick?.(nextDate);
    }

    // 确定
    function onConfirmClick() {
      const nextValue = formatRef.value.formatDate(inputValue.value);
      if (nextValue) {
        onChange?.(formatRef.value.formatDate(inputValue.value, { formatType: 'valueType' }) as DateValue, {
          dayjsValue: dayjs(inputValue.value as string),
          trigger: 'confirm',
        });
      } else {
        inputValue.value = formatRef.value.formatDate(value.value);
      }
      popupVisible.value = false;
    }

    // 预设
    function onPresetClick(presetValue: DateValue | (() => DateValue)) {
      const presetVal = typeof presetValue === 'function' ? presetValue() : presetValue;
      onChange?.(formatRef.value.formatDate(presetVal, { formatType: 'valueType' }) as DateValue, {
        dayjsValue: dayjs(presetVal),
        trigger: 'preset',
      });
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
          clearable={props.clearable}
          popupProps={popupProps.value}
          inputProps={inputProps.value}
          popupVisible={popupVisible.value}
          panel={() => <TSinglePanel {...panelProps.value} />}
        />
      </div>
    );
  },
});
