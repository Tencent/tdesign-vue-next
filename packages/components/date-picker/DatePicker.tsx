import { defineComponent, computed, watch } from 'vue';
import dayjs from 'dayjs';
import { isFunction, isDate } from 'lodash-es';
import { CalendarIcon as TdCalendarIcon } from 'tdesign-icons-vue-next';

import {
  useConfig,
  useTNodeJSX,
  useDisabled,
  useReadonly,
  useGlobalIcon,
  usePrefixClass,
  useEventForward,
} from '@tdesign/shared-hooks';

import { useSingle } from './hooks/useSingle';
import { parseToDayjs, getDefaultFormat, formatTime, formatDate } from '@tdesign/common-js/date-picker/format';
import { subtractMonth, addMonth, extractTimeObj, covertToDate, isSame } from '@tdesign/common-js/date-picker/utils';
import props from './props';
import TSelectInput from '../select-input';
import TSinglePanel from './components/panel/SinglePanel';

import type { TdDatePickerProps, DateMultipleValue, DateValue } from './type';
import type { TagInputRemoveContext } from '../tag-input';

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

    const disabled = useDisabled();
    const renderTNodeJSX = useTNodeJSX();
    const { globalConfig } = useConfig('datePicker');
    const isReadOnly = useReadonly();
    const { CalendarIcon } = useGlobalIcon({ CalendarIcon: TdCalendarIcon });

    const formatRef = computed(() =>
      getDefaultFormat({
        mode: props.mode,
        format: props.format,
        valueType: props.valueType,
        enableTimePicker: props.multiple ? false : props.enableTimePicker,
      }),
    );
    const valueDisplayParams = computed(() => {
      return {
        value: value.value,
        displayValue: inputValue.value,
      };
    });

    watch(popupVisible, (visible) => {
      // 多选不考虑输入情况
      if (props.multiple) return;
      // 如果不需要确认，直接保存当前值
      if (!props.needConfirm && props.enableTimePicker && !visible) {
        const nextValue = formatDate(inputValue.value, {
          format: formatRef.value.format,
        });
        if (nextValue) {
          onChange?.(
            formatDate(inputValue.value, {
              format: formatRef.value.format,
              targetFormat: formatRef.value.valueType,
              defaultTime: props.defaultTime,
            }) as DateValue,
            {
              dayjsValue: parseToDayjs(
                inputValue.value as string,
                formatRef.value.format,
                undefined,
                undefined,
                props.defaultTime,
              ),
              trigger: 'confirm',
            },
          );
        } else {
          inputValue.value = formatDate(value.value, {
            format: formatRef.value.format,
          });
        }
      }

      // 格式化 input 值
      const dateValue =
        // Date 属性、季度和周不再 parse，避免 dayjs 处理成 Invalid
        value.value && !isDate(value.value) && !['week', 'quarter'].includes(props.mode)
          ? covertToDate(value.value as string, formatRef.value?.valueType)
          : value.value;

      cacheValue.value = formatDate(dateValue, {
        format: formatRef.value.valueType,
        targetFormat: formatRef.value.format,
      });
      inputValue.value = formatDate(dateValue, {
        format: formatRef.value.valueType,
        targetFormat: formatRef.value.format,
      });

      // 面板展开重置数据
      if (visible) {
        year.value = parseToDayjs(value.value as DateValue, formatRef.value.valueType).year();
        month.value = parseToDayjs(value.value as DateValue, formatRef.value.format).month();
        time.value = formatTime(value.value, formatRef.value.format, formatRef.value.timeFormat, props.defaultTime);
      } else {
        isHoverCell.value = false;
      }
    });

    // 日期 hover
    function onCellMouseEnter(date: Date) {
      if (props.multiple) return;

      isHoverCell.value = true;
      inputValue.value = formatDate(date, {
        format: formatRef.value.format,
      });
    }

    // 日期 leave
    function onCellMouseLeave() {
      if (props.multiple) return;

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
        if (props.multiple) {
          const newDate = processDate(date, props.defaultTime);
          onChange(newDate, {
            dayjsValue: parseToDayjs(date, formatRef.value.format, undefined, undefined, props.defaultTime),
            trigger: 'pick',
          });
          return;
        }

        onChange?.(
          formatDate(date, {
            format: formatRef.value.format,
            targetFormat: formatRef.value.valueType,
            defaultTime: props.defaultTime,
          }) as DateValue,
          {
            dayjsValue: parseToDayjs(date, formatRef.value.format, undefined, undefined, props.defaultTime),
            trigger: 'pick',
          },
        );
        popupVisible.value = false;
      }

      props.onPick?.(date);
    }

    function processDate(date: Date, defaultTime?: string | string[]) {
      let isSameDate: boolean;
      const currentValue = (value.value || []) as DateMultipleValue;
      const { dayjsLocale } = globalConfig.value;

      let currentDate: DateMultipleValue;
      if (props.mode !== 'week')
        isSameDate = currentValue.some((val) =>
          isSame(parseToDayjs(val, formatRef.value.format).toDate(), date, props.mode, dayjsLocale),
        );
      else {
        isSameDate = currentValue.some((val) => val === dayjs(date).locale(dayjsLocale).format(formatRef.value.format));
      }

      if (!isSameDate) {
        currentDate = currentValue.concat(
          formatDate(date, {
            format: formatRef.value.format,
            targetFormat: formatRef.value.valueType,
            defaultTime,
          }),
        );
      } else {
        currentDate = currentValue.filter(
          (val) =>
            formatDate(val, {
              format: formatRef.value.format,
              targetFormat: formatRef.value.valueType,
              defaultTime,
            }) !==
            formatDate(date, {
              format: formatRef.value.format,
              targetFormat: formatRef.value.valueType,
              defaultTime,
            }),
        );
      }
      return currentDate;
    }

    function onTagRemoveClick(ctx: TagInputRemoveContext) {
      if (['week', 'quarter'].includes(props.mode)) {
        onChange?.(ctx.value, { trigger: 'tag-remove' });
        return;
      }

      const removeDate = dayjs(ctx.item).toDate();
      const newDate = processDate(removeDate, props.defaultTime);
      onChange?.(newDate, {
        dayjsValue: parseToDayjs(removeDate, formatRef.value.format, undefined, undefined, props.defaultTime),
        trigger: 'tag-remove',
      });
    }

    function onTagClearClick({ e }: { e: MouseEvent }) {
      e.stopPropagation();
      popupVisible.value = false;
      onChange?.([], { dayjsValue: dayjs(), trigger: 'clear' });
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
            defaultTime: props.defaultTime,
          }) as DateValue,
          {
            dayjsValue: parseToDayjs(
              inputValue.value as string,
              formatRef.value.format,
              undefined,
              undefined,
              props.defaultTime,
            ),
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
          dayjsValue: parseToDayjs(presetVal, formatRef.value.format, undefined, undefined, props.defaultTime),
          trigger: 'preset',
        },
      );
      // 更新到 input，避免 needConfirm 导致值被覆盖
      inputValue.value = formatDate(presetVal, {
        format: formatRef.value.format,
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
      multiple: props.multiple,
      time: props.multiple ? '' : time.value,
      disableDate: props.disableDate,
      firstDayOfWeek: props.firstDayOfWeek,
      timePickerProps: props.timePickerProps,
      enableTimePicker: props.multiple ? false : props.enableTimePicker,
      presetsPlacement: props.presetsPlacement,
      popupVisible: popupVisible.value,
      needConfirm: props.needConfirm,
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

    const selectInputEvents = useEventForward(props.selectInputProps as TdDatePickerProps['selectInputProps'], {
      onClear: onTagClearClick,
    });

    return () => (
      <div class={COMPONENT_NAME.value}>
        <TSelectInput
          borderless={props.borderless}
          disabled={disabled.value}
          value={inputValue.value}
          label={() => renderTNodeJSX('label')}
          status={props.status}
          tips={props.tips}
          clearable={props.clearable}
          readonly={isReadOnly.value}
          multiple={props.multiple}
          popupProps={popupProps.value}
          inputProps={inputProps.value}
          placeholder={
            props.placeholder || (globalConfig.value.placeholder as { [key in typeof props.mode]: string })[props.mode]
          }
          popupVisible={!isReadOnly.value && popupVisible.value}
          valueDisplay={() => renderTNodeJSX('valueDisplay', { params: valueDisplayParams.value })}
          {...(props.selectInputProps as TdDatePickerProps['selectInputProps'])}
          panel={() => <TSinglePanel {...panelProps.value} />}
          tagInputProps={{
            onRemove: onTagRemoveClick,
          }}
          prefixIcon={() => renderTNodeJSX('prefixIcon')}
          suffixIcon={() => renderTNodeJSX('suffixIcon') || <CalendarIcon />}
          {...selectInputEvents.value}
        />
      </div>
    );
  },
});
