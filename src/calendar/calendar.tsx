import { defineComponent, computed, reactive, watch, nextTick } from 'vue';
// 通用库
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import props from './props';
import getConfigReceiverMixins, { CalendarConfig } from '../config-provider/config-receiver';
import mixins from '../utils/mixins';
import * as utils from './utils';
import { emitEvent } from '../utils/event';

// 组件的一些常量
import { MIN_YEAR, FIRST_MONTH_OF_YEAR, LAST_MONTH_OF_YEAR, DEFAULT_YEAR_CELL_NUMINROW } from './const';

// 子组件
import { Select as TSelect, Option as TOption } from '../select';
import { RadioGroup as TRadioGroup, RadioButton as TRadioButton } from '../radio';
import { Button as TButton } from '../button';
import { CheckTag as TCheckTag } from '../tag';
import CalendarCellItem from './calendar-cell';

import { renderContent, renderTNodeJSX } from '../utils/render-tnode';

// new-begin
import { usePrefixClass, useConfig } from '../config-provider';
// new-end

// 组件相关的自定义类型
import {
  CalendarRange,
  YearMonthOption,
  ModeOption,
  CellColHeader,
  CellEventOption,
  TextConfigType,
  CalendarWeek,
  WeekDay,
  TdCalendarProps,
  ControllerOptions,
  CalendarCell,
} from './interface';

dayjs.extend(calendar);

const createDefaultCurDate = (): dayjs.Dayjs => dayjs(dayjs().format('YYYY-MM-DD'));

const getDefaultControllerConfigData = (visible = true): Record<string, any> => ({
  visible, // 是否显示（全部控件）
  disabled: false, // 是否禁用（全部控件）
  // 模式切换单选组件设置
  mode: {
    visible: true, // 是否显示
    radioGroupProps: {}, // 用于透传props给该radioGroup组件
  },
  // 年份选择框组件相关设置
  year: {
    visible: true, // 是否显示
    selecteProps: {}, // 用于透传props给该select组件
  },
  // 年份选择框组件相关设置
  month: {
    visible: true, // 是否显示（“year”模式下本身是不显示该组件的）
    selecteProps: {}, // 用于透传props给该select组件
  },
  // 隐藏\显示周末按钮组件相关设置
  weekend: {
    visible: true, // 是否显示
    showWeekendButtonProps: {}, // 用于透传props给显示周末按钮组件
    hideWeekendButtonProps: {}, // 用于透传props给隐藏周末按钮组件
  },
  // “今天\本月”按钮组件相关设置
  current: {
    visible: true, // 是否显示
    currentDayButtonProps: {}, // 用于透传props给“今天”钮组件（“month”模式下有效）
    currentMonthButtonProps: {}, // 用于透传props给“本月”按钮组件（“year”模式下有效）
  },
});

const CONFIG_NAME = 'calendar';

interface CalendarState {
  curDate: dayjs.Dayjs | null;
  curSelectedYear: number | null;
  curSelectedMonth: number | null;
  curSelectedMode: string | null;
  isShowWeekend: boolean;
  controlSize: string;
}

// 组件逻辑
export default defineComponent({
  name: 'TCalendar',
  props: { ...props },
  setup(props) {
    const { t, global } = useConfig(CONFIG_NAME);

    // data
    // TODO: 这里很多属性都是直接监听props，然后透传，迟点功能调通后考虑优化掉watch，甚至整个state可以优化掉。
    const state = reactive<CalendarState>({
      curDate: null,
      curSelectedYear: null,
      curSelectedMonth: null,
      curSelectedMode: null,
      isShowWeekend: true,
      controlSize: 'medium',
    });

    // 组件名
    const prefixClass = usePrefixClass(CONFIG_NAME);

    // 一些UI文案
    const TEXT_MAP = computed(() => {
      const r: TextConfigType = {
        // showWeekend: '显示周末',
        showWeekend: t(global.value.showWeekend),
        // hideWeekend: '隐藏周末',
        hideWeekend: t(global.value.hideWeekend),
        // today: '今天',
        today: t(global.value.today),
        // thisMonth: '本月',
        thisMonth: t(global.value.thisMonth),
      };
      return r;
    });

    // 日历第一列显示周几
    const realFirstDayOfWeek = computed(() => {
      return props.firstDayOfWeek ?? global.value.firstDayOfWeek ?? 1;
    });
    watch(
      () => props.isShowWeekendDefault,
      (v: TdCalendarProps['isShowWeekendDefault']) => {
        state.isShowWeekend = v;
      },
      { immediate: true },
    );
    const checkMonthCellColHeaderVisibled = (item: CellColHeader): boolean => {
      let re = true;
      if (!state.isShowWeekend) {
        re = item.num !== 6 && item.num !== 7;
      }
      return re;
    };

    // 样式class
    const calendarCls = computed<string[]>(() => {
      return [`${prefixClass.value}`, `${prefixClass.value}--${props.theme}`];
    });
    const calendarPanelCls = computed<string[]>(() => {
      return [`${prefixClass.value}__panel`, `${prefixClass.value}__panel--${state.curSelectedMode}`];
    });

    // 日历控件栏（右上角的控件们）
    const controllerOptions = computed<ControllerOptions>(() => {
      const dayJsFilterDate = dayjs(`${state.curSelectedYear}-${state.curSelectedMonth}`);
      const re = {
        isShowWeekend: state.isShowWeekend,
        filterDate: dayJsFilterDate.toDate(),
        formattedFilterDate: dayJsFilterDate.format(props.format),
        mode: state.curSelectedMode,
      };
      return re;
    });
    const controllerConfigData = computed<Record<string, any>>(() => {
      const controllerConfig = props.controllerConfig ?? global.value.controllerConfig ?? true;
      if (typeof controllerConfig === 'boolean') {
        return getDefaultControllerConfigData(controllerConfig);
      }
      return {
        ...getDefaultControllerConfigData(),
        ...controllerConfig,
      };
    });
    const isControllerVisible = computed<boolean>(() => {
      const configData = controllerConfigData.value;
      return !!configData && configData.visible;
    });
    /**
     * 判断某个控件是否显示
     * @param name 控件对应的配置节点名（对应controllerConfigData）
     * @returns true表示显示
     */
    const checkControllerVisible = (name: string): boolean => {
      let re = true;
      const conf = controllerConfigData.value;
      if (!conf || !conf.visible || conf[name] === false || (conf[name] && !conf[name].visible)) {
        re = false;
      }
      return re;
    };
    /**
     * 判断某个控件是否禁用
     * @param name 控件对应的配置节点名（对应controllerConfigData）
     * @param propsName 表示禁用的控件属性（对应controllerConfigData）
     * @returns true表示禁用
     */
    const checkControllerDisabled = (name: string, propsName: string): boolean => {
      let re = false;
      const conf = controllerConfigData.value;
      if (conf && (conf.disabled || (conf[name] && conf[name][propsName] && conf[name][propsName].disabled))) {
        re = true;
      }
      return re;
    };
    const controllerChange = () => {
      nextTick(() => {
        props.onControllerChange && props.onControllerChange({ ...controllerOptions.value });
      });
    };

    // 日历主体头部（日历模式下使用）
    const weekDipalyText = computed<TdCalendarProps['week']>(() => {
      return props.week || t(global.value.week).split(',');
    });
    const getWeekDisplay = (weekNum: number): string => {
      const weekText = weekDipalyText.value;
      return typeof weekText === 'object' && weekText[weekNum - 1] ? weekText[weekNum - 1] : utils.getDayCn(weekNum);
    };
    const cellColHeaders = computed<CellColHeader[]>(() => {
      const re: CellColHeader[] = [];
      const min: WeekDay = 1;
      const max: WeekDay = 7;

      for (let i = realFirstDayOfWeek.value; i <= max; i++) {
        re.push({
          num: i as WeekDay,
          display: getWeekDisplay(i),
        });
      }
      if (realFirstDayOfWeek.value > min) {
        for (let i = min; i < realFirstDayOfWeek.value; i++) {
          re.push({
            num: i as WeekDay,
            display: getWeekDisplay(i),
          });
        }
      }
      return re;
    });

    // 年\月份下拉框数据源
    const rangeFromTo = computed<CalendarRange>(() => {
      if (!props.range || props.range.length < 2) {
        return null;
      }
      const [v1, v2] = props.range;
      if (dayjs(v1).isBefore(dayjs(v2))) {
        return {
          from: v1,
          to: v2,
        };
      }
      return {
        from: v2,
        to: v1,
      };
    });
    const checkMonthAndYearSelecterDisabled = (year: number, month: number): boolean => {
      let disabled = false;
      if (rangeFromTo.value && rangeFromTo.value.from && rangeFromTo.value.to) {
        const beginYear = dayjs(rangeFromTo.value.from).year();
        const endYear = dayjs(rangeFromTo.value.to).year();
        if (year === beginYear) {
          const beginMon = parseInt(dayjs(rangeFromTo.value.from).format('M'), 10);
          disabled = month < beginMon;
        } else if (year === endYear) {
          const endMon = parseInt(dayjs(rangeFromTo.value.to).format('M'), 10);
          disabled = month > endMon;
        }
      }
      return disabled;
    };
    const toCurrent = (value?: TdCalendarProps['value']): void => {
      state.curDate = value ? dayjs(value) : createDefaultCurDate();
      state.curSelectedYear = state.curDate.year();
      state.curSelectedMonth = parseInt(state.curDate.format('M'), 10);
    };
    const yearSelectOptionList = computed<YearMonthOption[]>(() => {
      const re: YearMonthOption[] = [];
      let begin: number = state.curSelectedYear - 10;
      let end: number = state.curSelectedYear + 10;
      if (rangeFromTo.value && rangeFromTo.value.from && rangeFromTo.value.to) {
        begin = dayjs(rangeFromTo.value.from).year();
        end = dayjs(rangeFromTo.value.to).year();
      }

      if (begin < MIN_YEAR) {
        begin = MIN_YEAR;
      }
      if (end < MIN_YEAR) {
        end = MIN_YEAR;
      }

      for (let i = begin; i <= end; i++) {
        const disabled = checkMonthAndYearSelecterDisabled(i, state.curSelectedMonth);
        re.push({
          value: i,
          label: t(global.value.yearSelection, { year: i }),
          disabled,
        });
      }
      return re;
    });
    const monthSelectOptionList = computed<YearMonthOption[]>(() => {
      const re: YearMonthOption[] = [];
      for (let i = FIRST_MONTH_OF_YEAR; i <= LAST_MONTH_OF_YEAR; i++) {
        const disabled = checkMonthAndYearSelecterDisabled(state.curSelectedYear, i);
        re.push({
          value: i,
          label: t(global.value.monthSelection, { month: i }),
          disabled,
        });
      }
      return re;
    });
    watch(
      () => props.value,
      (v: TdCalendarProps['value']) => {
        toCurrent(v);
      },
      { immediate: true },
    );
    watch(
      () => {
        return {
          year: `${controllerOptions.value.filterDate.getFullYear()}`,
          month: `${controllerOptions.value.filterDate.getMonth() + 1}`,
        };
      },
      (v: { month: string; year: string }) => {
        if (props.onMonthChange) {
          props.onMonthChange({ ...v });
        }
        controllerChange();
      },
    );

    // 模式选项数据源
    const modeSelectOptionList = computed<ModeOption[]>(() => {
      return [
        { value: 'month', label: t(global.value.monthRadio) },
        { value: 'year', label: t(global.value.yearRadio) },
      ];
    });
    watch(
      () => props.mode,
      (v: TdCalendarProps['mode']) => {
        state.curSelectedMode = v;
      },
      { immediate: true },
    );

    // 显示\隐藏周末按钮
    const weekendBtnText = computed<string>(() => {
      return state.isShowWeekend ? TEXT_MAP.value.hideWeekend : TEXT_MAP.value.showWeekend;
    });
    const weekendBtnVBind = computed<object>(() => {
      const c = controllerConfigData.value.weekend;
      return state.isShowWeekend ? c.hideWeekendButtonProps : c.showWeekendButtonProps;
    });
    const isWeekendToggleDisabled = computed(() => {
      const p = state.isShowWeekend ? 'hideWeekendButtonProps' : 'showWeekendButtonProps';
      return checkControllerDisabled('weekend', p);
    });
    const onWeekendToggleClick = (): void => {
      state.isShowWeekend = !state.isShowWeekend;
      controllerChange();
    };

    // 今天\本月按钮
    const currentBtnText = computed<string>(() => {
      return state.curSelectedMode === 'month' ? TEXT_MAP.value.today : TEXT_MAP.value.thisMonth;
    });
    const currentBtnVBind = computed<object>(() => {
      const c = controllerConfigData.value.current;
      return state.curSelectedMode === 'month' ? c.currentDayButtonProps : c.currentMonthButtonProps;
    });
    const isCurrentBtnDisabled = computed(() => {
      const p = state.curSelectedMode === 'month' ? 'currentDayButtonProps' : 'currentMonthButtonProps';
      return checkControllerDisabled('current', p);
    });

    // 单元格数据
    const monthCellsData = computed<CalendarCell[][]>(() => {
      const daysArr: CalendarCell[][] = utils.createMonthCellsData(
        state.curSelectedYear,
        state.curSelectedMonth,
        realFirstDayOfWeek.value,
        state.curDate,
        props.format,
      );
      return daysArr;
    });
    const yearCellsData = computed<CalendarCell[][]>(() => {
      const re: CalendarCell[][] = [];
      const monthsArr: CalendarCell[] = utils.createYearCellsData(state.curSelectedYear, state.curDate, props.format);
      const rowCount = Math.ceil(monthsArr.length / DEFAULT_YEAR_CELL_NUMINROW);
      let index = 0;
      for (let i = 1; i <= rowCount; i++) {
        const row: CalendarCell[] = [];
        for (let j = 1; j <= DEFAULT_YEAR_CELL_NUMINROW; j++) {
          row.push(monthsArr[index]);
          index += 1;
        }
        re.push(row);
      }
      return re;
    });
    const getCellClickEventOptions = (e: MouseEvent, cellData: CalendarCell): CellEventOption => {
      return {
        cell: {
          ...cellData,
          ...controllerOptions.value,
        },
        e,
      };
    };

    return {
      global,
      state,
      prefixClass,

      realFirstDayOfWeek,

      TEXT_MAP,

      weekDipalyText,

      calendarCls,
      calendarPanelCls,

      controllerOptions,
      controllerConfigData,
      isControllerVisible,

      cellColHeaders,

      yearSelectOptionList,
      monthSelectOptionList,
      modeSelectOptionList,

      weekendBtnText,
      weekendBtnVBind,
      isWeekendToggleDisabled,

      currentBtnText,
      currentBtnVBind,
      isCurrentBtnDisabled,

      monthCellsData,
      yearCellsData,
      getCellClickEventOptions,

      t,
      toCurrent,
      checkMonthCellColHeaderVisibled,
      checkControllerVisible,
      checkControllerDisabled,
      controllerChange,
      onWeekendToggleClick,
    };
  },
  render() {
    const { prefixClass: COMPONENT_NAME } = this;

    const clickCell = (e: MouseEvent, cellData: CalendarCell): void => {
      this.curDate = dayjs(cellData.date);
      const options = this.getCellClickEventOptions(e, cellData);
      console.info(options);
      emitEvent<Parameters<TdCalendarProps['onCellClick']>>(this, 'cell-click', options);
    };
    const doubleClickCell = (e: MouseEvent, cellData: CalendarCell): void => {
      const options = this.getCellClickEventOptions(e, cellData);
      emitEvent<Parameters<TdCalendarProps['onCellDoubleClick']>>(this, 'cell-double-click', options);
    };
    const rightClickCell = (e: MouseEvent, cellData: CalendarCell): void => {
      if (this.preventCellContextmenu) {
        e.preventDefault();
      }
      const options = this.getCellClickEventOptions(e, cellData);
      emitEvent<Parameters<TdCalendarProps['onCellRightClick']>>(this, 'cell-right-click', options);
    };

    const renderControl = () => {
      return (
        <div class={`${COMPONENT_NAME}__control`}>
          <div class={`${COMPONENT_NAME}__title`}>
            {renderTNodeJSX(this, 'head', {
              params: this.controllerOptions,
            })}
          </div>
          <div class={`${COMPONENT_NAME}__control-section`}>
            {this.checkControllerVisible('year') && (
              <div class={`${COMPONENT_NAME}__control-section-cell`}>
                <t-select
                  v-model={this.state.curSelectedYear}
                  size={this.state.controlSize}
                  disabled={this.checkControllerDisabled('year', 'selecteProps')}
                  {...this.controllerConfigData.year.selecteProps}
                >
                  {this.yearSelectOptionList.map((item) => (
                    <t-option key={item.value} value={item.value} label={item.label} disabled={item.disabled}>
                      {item.label}
                    </t-option>
                  ))}
                </t-select>
              </div>
            )}
            {this.state.curSelectedMode === 'month' && this.checkControllerVisible('month') && (
              <div class={`${COMPONENT_NAME}__control-section-cell`}>
                <t-select
                  v-model={this.state.curSelectedMonth}
                  size={this.state.controlSize}
                  disabled={this.checkControllerDisabled('month', 'selecteProps')}
                  {...this.controllerConfigData.month.selecteProps}
                >
                  {this.monthSelectOptionList.map((item) => (
                    <t-option key={item.value} value={item.value} label={item.label} disabled={item.disabled}>
                      {item.label}
                    </t-option>
                  ))}
                </t-select>
              </div>
            )}
            {this.checkControllerVisible('mode') && (
              <div class={`${COMPONENT_NAME}__control-section-cell`} style="height: auto">
                <t-radio-group
                  v-model={this.state.curSelectedMode}
                  variant="default-filled"
                  size={this.state.controlSize}
                  disabled={this.checkControllerDisabled('mode', 'radioGroupProps')}
                  {...this.controllerConfigData.mode.radioGroupProps}
                  onChange={this.controllerChange}
                >
                  {this.modeSelectOptionList.map((item) => (
                    <t-radio-button key={item.value} value={item.value}>
                      {item.label}
                    </t-radio-button>
                  ))}
                </t-radio-group>
              </div>
            )}
            {this.theme === 'full' && this.checkControllerVisible('current') && this.checkControllerVisible('weekend') && (
              <div class={`${COMPONENT_NAME}__control-section-cell`}>
                <t-check-tag
                  class={`${COMPONENT_NAME}__control-tag`}
                  theme={this.state.isShowWeekend ? 'default' : 'primary'}
                  size={this.state.controlSize}
                  disabled={this.isWeekendToggleDisabled}
                  {...this.weekendBtnVBind}
                  onClick={this.onWeekendToggleClick}
                >
                  {this.weekendBtnText}
                </t-check-tag>
              </div>
            )}
            {this.theme === 'full' && this.checkControllerVisible('current') && (
              <div class={`${COMPONENT_NAME}__control-section-cell`}>
                <t-button
                  size={this.state.controlSize}
                  disabled={this.isCurrentBtnDisabled}
                  onClick={() => {
                    this.toCurrent();
                  }}
                  {...this.currentBtnVBind}
                >
                  {this.currentBtnText}
                </t-button>
              </div>
            )}
          </div>
        </div>
      );
    };
    const renderMonthBody = () => {
      return (
        <table class={`${COMPONENT_NAME}__table`}>
          <thead class={`${COMPONENT_NAME}__table-head`}>
            <tr class={`${COMPONENT_NAME}__table-head-row`}>
              {this.cellColHeaders.map(
                (item, index) =>
                  this.checkMonthCellColHeaderVisibled(item) && (
                    <th class={`${COMPONENT_NAME}__table-head-cell`}>
                      {Array.isArray(this.week)
                        ? this.week[index]
                        : renderContent(this, 'default', 'week', {
                            defaultNode: <span>{item.display}</span>,
                            params: { day: item.num },
                          })}
                    </th>
                  ),
              )}
            </tr>
          </thead>

          <tbody class={`${COMPONENT_NAME}__table-body`}>
            {this.monthCellsData.map((week, weekIndex) => (
              <tr class={`${COMPONENT_NAME}__table-body-row`}>
                {week.map(
                  (item, itemIndex) =>
                    (this.state.isShowWeekend || item.day < 6) && (
                      <CalendarCellItem
                        key={`${weekIndex}-${itemIndex}`}
                        item={item}
                        theme={this.theme}
                        t={this.t}
                        global={this.global}
                        cell={this.cell}
                        fillWithZero={this.fillWithZero}
                        onClick={(e: MouseEvent) => clickCell(e, item)}
                        onDblclick={(e: MouseEvent) => doubleClickCell(e, item)}
                        onRightclick={(e: MouseEvent) => rightClickCell(e, item)}
                      >
                        {{ ...this.$slots }}
                      </CalendarCellItem>
                    ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      );
    };
    const renderYearBody = () => {
      return (
        <table class={`${COMPONENT_NAME}__table`}>
          <tbody class={`${COMPONENT_NAME}__table-body`}>
            {this.yearCellsData.map((cell, cellIndex) => (
              <tr class={`${COMPONENT_NAME}__table-body-row`}>
                {cell.map((item, itemIndex) => (
                  <CalendarCellItem
                    key={`${cellIndex}-${itemIndex}`}
                    item={item}
                    theme={this.theme}
                    t={this.t}
                    global={this.global}
                    cell={this.cell}
                    fillWithZero={this.fillWithZero}
                    onClick={(e: MouseEvent) => clickCell(e, item)}
                    onDblclick={(e: MouseEvent) => doubleClickCell(e, item)}
                    onRightclick={(e: MouseEvent) => rightClickCell(e, item)}
                  >
                    {{ ...this.$slots }}
                  </CalendarCellItem>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    };

    return (
      <div class={this.calendarCls}>
        {this.isControllerVisible && renderControl()}
        <div class={this.calendarPanelCls}>
          {this.state.curSelectedMode === 'month' ? renderMonthBody() : renderYearBody()}
        </div>
      </div>
    );
  },
});
