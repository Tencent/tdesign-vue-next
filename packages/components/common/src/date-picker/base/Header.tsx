import type { PropType } from '@td/adapter-vue';
import { computed, defineComponent, ref } from '@td/adapter-vue';
import type { TdDatePickerProps } from '@td/components/date-picker/type';
import { useConfig, usePrefixClass } from '@td/adapter-hooks';
import type { JumperTrigger } from '../../pagination';
import { PaginationMini } from '../../pagination';
import TSelect from '../../select';

export default defineComponent({
  name: 'TDatePickerHeader',
  props: {
    mode: {
      type: String as PropType<TdDatePickerProps['mode']>,
      default: 'date',
    },
    year: Number,
    month: Number,
    onMonthChange: Function,
    onYearChange: Function,
    onJumperClick: Function as PropType<(context: { e: MouseEvent; trigger: JumperTrigger }) => {}>,
  },
  setup(props) {
    const { classPrefix } = useConfig('classPrefix');
    const COMPONENT_NAME = usePrefixClass('date-picker__header');
    const { globalConfig } = useConfig('datePicker');

    const yearOptions = ref(initOptions(props.year));
    const showMonthPicker = props.mode === 'date' || props.mode === 'week';

    // 年份选择展示区间
    const nearestYear = computed(
      () =>
        yearOptions.value.find(option => option.value - props.year <= 9 && option.value - props.year >= 0)?.value
        || props.year,
    );

    const monthOptions = computed(() =>
      globalConfig.value.months.map((item: string, index: number) => ({ label: item, value: index })),
    );

    function initOptions(year: number) {
      const options = [];
      if (props.mode === 'year') {
        const extraYear = year % 10;
        const minYear = year - extraYear - 100;
        const maxYear = year - extraYear + 100;

        for (let i = minYear; i <= maxYear; i += 10) {
          options.push({ label: `${i} - ${i + 9}`, value: i + 9 });
        }
      } else {
        options.push({ label: `${year}`, value: year });

        for (let i = 1; i <= 10; i++) {
          options.push({ label: `${year + i}`, value: year + i });
          options.unshift({ label: `${year - i}`, value: year - i });
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
            options.push({ label: `${i} - ${i + 9}`, value: i });
          }
        } else {
          for (let i = year - extraYear - 1; i > year - extraYear - 50; i -= 10) {
            options.unshift({ label: `${i - 9} - ${i}`, value: i });
          }
        }
      } else if (type === 'add') {
        for (let i = year + 1; i <= year + 10; i++) {
          options.push({ label: `${i}`, value: i });
        }
      } else {
        for (let i = year - 1; i > year - 10; i--) {
          options.unshift({ label: `${i}`, value: i });
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
      };
    });

    // 滚动顶部底部自动加载
    function handleScroll({ e }: any) {
      if (e.target.scrollTop === 0) {
        handlePanelTopClick(e);
      } else if (e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight) {
        handlePanelBottomClick(e);
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

    return () => (
      <div class={COMPONENT_NAME.value}>
        <div class={`${COMPONENT_NAME.value}-controller`}>
          {showMonthPicker && (
            <TSelect
              class={`${COMPONENT_NAME.value}-controller-month`}
              value={props.month}
              options={monthOptions.value}
              onChange={(val: number) => props.onMonthChange?.(val)}
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
            onChange={(val: number) => props.onYearChange?.(val)}
            popupProps={{
              onScroll: handleScroll,
              attach: (triggerElement: HTMLElement) => triggerElement.parentNode,
              overlayClassName: `${COMPONENT_NAME.value}-controller-year-popup`,
            }}
            panelTopContent={() => (
              <div class={`${classPrefix.value}-select-option`} onClick={handlePanelTopClick}>
                ...
              </div>
            )}
            panelBottomContent={() => (
              <div class={`${classPrefix.value}-select-option`} onClick={handlePanelBottomClick}>
                ...
              </div>
            )}
          />
        </div>

        <PaginationMini tips={labelMap.value[props.mode]} size="small" onChange={props.onJumperClick} />
      </div>
    );
  },
});
