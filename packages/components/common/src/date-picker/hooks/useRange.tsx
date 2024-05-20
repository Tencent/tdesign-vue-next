import { computed, ref, watch } from '@td/adapter-vue';
import { CalendarIcon as TdCalendarIcon } from 'tdesign-icons-vue-next';
import { omit } from 'lodash-es';

import type { DateValue, TdDateRangePickerProps } from '@td/intel/date-picker/type';
import { formatDate, getDefaultFormat, isValidDate, parseToDayjs } from '@td/shared/_common/js/date-picker/format';
import { useGlobalIcon, useTNodeJSX } from '@td/adapter-hooks';
import { useConfig, usePrefixClass } from '../../hooks/useConfig';

import useRangeValue from './useRangeValue';

export const PARTIAL_MAP = { first: 'start', second: 'end' };

export default function useRange(props: TdDateRangePickerProps) {
  const COMPONENT_NAME = usePrefixClass('date-range-picker');
  const { globalConfig } = useConfig('datePicker');
  const { CalendarIcon } = useGlobalIcon({ CalendarIcon: TdCalendarIcon });
  const renderTNodeJSX = useTNodeJSX();

  const isMountedRef = ref(false);
  const inputRef = ref();

  const { value, onChange, time, month, year, cacheValue, isFirstValueSelected } = useRangeValue(props);

  const formatRef = computed(() =>
    getDefaultFormat({
      mode: props.mode,
      format: props.format,
      valueType: props.valueType,
      enableTimePicker: props.enableTimePicker,
    }),
  );

  const popupVisible = ref(false);
  const isHoverCell = ref(false);
  const activeIndex = ref(0); // 确定当前选中的输入框序号
  const inputValue = ref(formatDate(props.value, { format: formatRef.value.format })); // 未真正选中前可能不断变更输入框的内容

  // input 设置
  const rangeInputProps = computed(() => ({
    ...props.rangeInputProps,
    size: props.size,
    ref: inputRef,
    clearable: props.clearable,
    prefixIcon: () => renderTNodeJSX('prefixIcon'),
    readonly: !props.allowInput,
    separator: props.separator || globalConfig.value.rangeSeparator,
    placeholder: props.placeholder || globalConfig.value.placeholder[props.mode],
    activeIndex: popupVisible.value ? activeIndex.value : undefined,
    suffixIcon: () => {
      return renderTNodeJSX('suffixIcon') || <CalendarIcon />;
    },
    class: {
      [`${COMPONENT_NAME.value}__input--placeholder`]: isHoverCell.value,
    },
    onClick: ({ position }: any) => {
      activeIndex.value = position === 'first' ? 0 : 1;
    },
    onClear: ({ e }: { e: MouseEvent }) => {
      e.stopPropagation();
      popupVisible.value = false;
      onChange?.([], { dayjsValue: [], trigger: 'clear' });
    },
    onBlur: (newVal: string[], { e, position }: any) => {
      props.onBlur?.({ value: newVal, partial: PARTIAL_MAP[position], e });
    },
    onFocus: (newVal: string[], { e, position }: any) => {
      props.onFocus?.({ value: newVal, partial: PARTIAL_MAP[position], e });
      activeIndex.value = position === 'first' ? 0 : 1;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange: (newVal: string[], { e, position }: any) => {
      inputValue.value = newVal;

      // 跳过不符合格式化的输入框内容
      if (!isValidDate(newVal, formatRef.value.format)) {
        return;
      }
      cacheValue.value = newVal;
      const newYear: Array<number> = [];
      const newMonth: Array<number> = [];
      const newTime: Array<string> = [];
      newVal.forEach((v) => {
        newYear.push(parseToDayjs(v, formatRef.value.format).year());
        newMonth.push(parseToDayjs(v, formatRef.value.format).month());
        newTime.push(parseToDayjs(v, formatRef.value.format).format(formatRef.value.timeFormat));
      });
      year.value = newYear;
      month.value = newMonth;
      time.value = newTime;
    },
    onEnter: (newVal: string[]) => {
      if (!isValidDate(newVal, formatRef.value.format) && !isValidDate(value.value, formatRef.value.format)) {
        return;
      }

      popupVisible.value = false;
      if (isValidDate(newVal, formatRef.value.format)) {
        onChange?.(
          formatDate(newVal, {
            format: formatRef.value.format,
            targetFormat: formatRef.value.valueType,
            autoSwap: true,
          }) as DateValue[],
          {
            dayjsValue: newVal.map(v => parseToDayjs(v, formatRef.value.format)),
            trigger: 'enter',
          },
        );
      } else if (isValidDate(value.value, formatRef.value.format)) {
        inputValue.value = formatDate(value.value, {
          format: formatRef.value.format,
        });
      } else {
        inputValue.value = [];
      }
    },
  }));

  // popup 设置
  const popupProps = computed(() => ({
    expandAnimation: true,
    ...omit(props.popupProps, 'on-visible-change'),
    overlayInnerStyle: props.popupProps?.overlayInnerStyle ?? { width: 'auto' },
    overlayClassName: [props.popupProps?.overlayClassName, `${COMPONENT_NAME.value}__panel-container`],
    onVisibleChange: (visible: boolean, context: any) => {
      // 这里劫持了进一步向 popup 传递的 onVisibleChange 事件，为了保证可以在 Datepicker 中使用 popupProps.onVisibleChange，故此处理
      props.popupProps?.onVisibleChange?.(visible, context);
      props.popupProps?.['on-visible-change']?.(visible, context);

      // 输入框点击不关闭面板
      if (context.trigger === 'trigger-element-click') {
        const indexMap = { 0: 'first', 1: 'second' };
        inputRef.value.focus({ position: indexMap[activeIndex.value] });
        popupVisible.value = true;
        return;
      }

      popupVisible.value = visible;
    },
  }));

  // 输入框响应 value 变化
  watch(
    value,
    (value) => {
      if (!value) {
        inputValue.value = [];
        return;
      }
      if (!isValidDate(value, formatRef.value.format)) {
        return;
      }

      inputValue.value = formatDate(value, {
        format: formatRef.value.format,
      });
    },
    {
      immediate: true,
    },
  );

  // activeIndex 变化自动 focus 对应输入框
  watch(
    activeIndex,
    (index) => {
      if (!isMountedRef.value) {
        isMountedRef.value = true;
        return;
      }
      if (!popupVisible.value) {
        return;
      }
      const indexMap = { 0: 'first', 1: 'second' };
      inputRef.value?.focus?.({ position: indexMap[index] });
    },
    {
      immediate: true,
    },
  );

  return {
    year,
    month,
    value,
    time,
    inputValue,
    popupVisible,
    rangeInputProps,
    popupProps,
    isHoverCell,
    activeIndex,
    isFirstValueSelected,
    cacheValue,
    onChange,
  };
}
