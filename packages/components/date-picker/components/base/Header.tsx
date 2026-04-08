import { defineComponent, PropType, ref, computed, watch, toRefs } from 'vue';
import { PaginationMini, JumperTrigger } from '../../../pagination';
import TSelect from '../../../select';
import { useConfig, usePrefixClass } from '@tdesign/shared-hooks';
import { useSelectRange } from '../../hooks';

import type { TdDatePickerProps } from '../../type';

export default defineComponent({
  name: 'TDatePickerHeader',
  props: {
    mode: {
      type: String as PropType<TdDatePickerProps['mode']>,
      default: 'date',
    },
    range: [Array, Function] as PropType<TdDatePickerProps['range']>,
    year: Number,
    month: Number,
    internalYear: Array as PropType<Array<number>>,
    partial: String,
    onMonthChange: Function,
    onYearChange: Function,
    onJumperClick: Function as PropType<(context: { e: MouseEvent; trigger: JumperTrigger }) => {}>,
  },
  setup(props) {
    const { year, month } = toRefs(props);
    const { classPrefix } = useConfig('classPrefix');
    const COMPONENT_NAME = usePrefixClass('date-picker__header');
    const { globalConfig } = useConfig('datePicker');

    const {
      monthHasAnyAllowed,
      yearHasAnyAllowed,
      decadeHasAnyAllowed,
      paginationDisabled,
      canLoadMoreTop,
      canLoadMoreBottom,
    } = useSelectRange({
      range: props.range,
      mode: props.mode,
      year: year,
      month: month,
    });
    const yearOptions = ref(initOptions(props.year));
    const showMonthPicker = computed(() => props.mode === 'date' || props.mode === 'week');
    // 年份选择展示区间
    const nearestYear = computed(() => {
      // 右侧面板年份选择需要保持大于左侧面板年份选择
      const extraYear =
        props.partial === 'end' &&
        props.mode === 'year' &&
        Number(props.internalYear[1]) - Number(props.internalYear[0]) <= 9
          ? 9
          : 0;

      return (
        yearOptions.value.find(
          (option) => option.value - (props.year + extraYear) <= 9 && option.value - (props.year + extraYear) >= 0,
        )?.value || props.year
      );
    });

    const monthOptions = computed(() => {
      // 仅展示可选月份（不显示越界的，而不是置灰禁用）
      return globalConfig.value.months.map((item: string, index: number) => ({
        label: item,
        value: index,
        disabled: !monthHasAnyAllowed(props.year, index),
      }));
    });

    // 顶部/底部是否展示“加载更多”内容（...）
    const showPanelTop = computed(() => {
      const options = yearOptions.value;
      if (!options.length) return false;
      const first = options[0].value;
      return canLoadMoreTop(first);
    });

    const showPanelBottom = computed(() => {
      const options = yearOptions.value;
      if (!options.length) return false;
      const last = options[options.length - 1].value;
      return canLoadMoreBottom(last);
    });

    // 分页禁用逻辑由 useSelectRange 提供

    function initOptions(year: number) {
      const options = [];
      if (props.mode === 'year') {
        const extraYear = year % 10;
        const minYear = year - extraYear - 100;
        const maxYear = year - extraYear + 100;

        for (let i = minYear; i <= maxYear; i += 10) {
          const end = i + 9;
          // 仅加入可选的年代
          if (decadeHasAnyAllowed(end)) {
            options.push({ label: `${i} - ${end}`, value: end, disabled: false });
          }
        }
      } else {
        // 中心年份（仅在可选范围内时加入）
        if (yearHasAnyAllowed(year)) options.push({ label: `${year}`, value: year, disabled: false });

        for (let i = 1; i <= 10; i++) {
          if (yearHasAnyAllowed(year + i)) options.push({ label: `${year + i}`, value: year + i, disabled: false });
          if (yearHasAnyAllowed(year - i)) options.unshift({ label: `${year - i}`, value: year - i, disabled: false });
        }
      }

      return options;
    }

    function loadMoreYear(year: number, type?: 'add' | 'reduce') {
      const options = [];
      if (props.mode === 'year') {
        const extraYear = year % 10;
        if (type === 'add') {
          for (let i = year - extraYear + 10; i <= year - extraYear + 50; i += 10) {
            const end = i + 9;
            // 仅加入可选的年代
            if (decadeHasAnyAllowed(end)) options.push({ label: `${i} - ${end}`, value: end, disabled: false });
          }
        } else {
          for (let i = year - extraYear - 1; i > year - extraYear - 50; i -= 10) {
            if (decadeHasAnyAllowed(i)) options.unshift({ label: `${i - 9} - ${i}`, value: i, disabled: false });
          }
        }
      } else if (type === 'add') {
        for (let i = year + 1; i <= year + 10; i++) {
          if (yearHasAnyAllowed(i)) options.push({ label: `${i}`, value: i, disabled: false });
        }
      } else {
        for (let i = year - 1; i > year - 10; i--) {
          if (yearHasAnyAllowed(i)) options.unshift({ label: `${i}`, value: i, disabled: false });
        }
      }

      return options;
    }

    // hover title
    const labelMap = computed(() => {
      return {
        year: {
          prev: globalConfig.value.preDecade,
          current: globalConfig.value.now,
          next: globalConfig.value.nextDecade,
        },
        month: {
          prev: globalConfig.value.preYear,
          current: globalConfig.value.now,
          next: globalConfig.value.nextYear,
        },
        date: {
          prev: globalConfig.value.preMonth,
          current: globalConfig.value.now,
          next: globalConfig.value.nextMonth,
        },
        quarter: {
          prev: globalConfig.value.preYear,
          current: globalConfig.value.now,
          next: globalConfig.value.nextYear,
        },
        week: {
          prev: globalConfig.value.preMonth,
          current: globalConfig.value.now,
          next: globalConfig.value.nextMonth,
        },
      };
    });

    // 滚动顶部底部自动加载
    function handleScroll({ e }: any) {
      if (e.target.scrollTop === 0) {
        if (showPanelTop.value) handlePanelTopClick(e);
      } else if (e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight) {
        if (showPanelBottom.value) handlePanelBottomClick(e);
      }
    }

    function handlePanelTopClick(e: MouseEvent) {
      e?.stopPropagation?.();

      const firstYear = yearOptions.value[0].value;
      const options = loadMoreYear(firstYear, 'reduce');
      yearOptions.value = [...options, ...yearOptions.value];
    }

    function handlePanelBottomClick(e: MouseEvent) {
      e?.stopPropagation?.();

      const lastYear = yearOptions.value.slice(-1)[0].value;
      const options = loadMoreYear(lastYear, 'add');
      yearOptions.value = [...yearOptions.value, ...options];
    }

    watch(
      () => props.mode,
      () => {
        yearOptions.value = initOptions(props.year);
      },
    );

    return () => (
      <div class={COMPONENT_NAME.value}>
        <div class={`${COMPONENT_NAME.value}-controller`}>
          {showMonthPicker.value && (
            <TSelect
              class={`${COMPONENT_NAME.value}-controller-month`}
              value={props.month}
              options={monthOptions.value}
              onChange={(val: number) => {
                props.onMonthChange?.(val);
              }}
              popupProps={{
                attach: (triggerElement: HTMLElement) => triggerElement.parentNode,
                overlayClassName: `${COMPONENT_NAME.value}-controller-month-popup`,
              }}
            />
          )}
          <TSelect
            class={`${COMPONENT_NAME.value}-controller-year`}
            value={props.mode === 'year' ? nearestYear.value : props.year}
            options={yearOptions.value}
            onChange={(val: number) => {
              props.onYearChange?.(val);
            }}
            popupProps={{
              onScroll: handleScroll,
              attach: (triggerElement: HTMLElement) => triggerElement.parentNode,
              overlayClassName: `${COMPONENT_NAME.value}-controller-year-popup`,
            }}
            panelTopContent={() =>
              showPanelTop.value && (
                <div class={`${classPrefix.value}-select-option`} onClick={handlePanelTopClick}>
                  ...
                </div>
              )
            }
            panelBottomContent={() =>
              showPanelBottom.value && (
                <div class={`${classPrefix.value}-select-option`} onClick={handlePanelBottomClick}>
                  ...
                </div>
              )
            }
          />
        </div>

        <PaginationMini
          tips={labelMap.value[props.mode]}
          size="small"
          onChange={props.onJumperClick}
          disabled={paginationDisabled.value}
        />
      </div>
    );
  },
});
