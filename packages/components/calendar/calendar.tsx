import { defineComponent, computed, watch } from 'vue';
// 通用库
import dayjs from 'dayjs';
import { remove } from 'lodash-es';
import { isFunction } from 'lodash-es';
import { isArray } from 'lodash-es';

import props from './props';
import * as utils from './utils';
import { useConfig } from '@tdesign/hooks';
import { useContent } from '@tdesign/hooks';
import { useState, useCalendarClass, userController, useColHeaders } from './hooks';

// 组件的一些常量
import {
  COMPONENT_NAME,
  MIN_YEAR,
  FIRST_MONTH_OF_YEAR,
  LAST_MONTH_OF_YEAR,
  DEFAULT_YEAR_CELL_NUMINROW,
} from './consts';

// 子组件
import { Select as TSelect } from '../select';
import { RadioGroup as TRadioGroup, RadioButton as TRadioButton } from '../radio';
import { Button as TButton } from '../button';
import { CheckTag as TCheckTag } from '../tag';
import CalendarCellItem from './calendar-cell';

// 组件相关类型
import { CalendarCell } from './type';
import { CalendarRange, YearMonthOption, ModeOption, CellEventOption } from './types';

// 组件逻辑
export default defineComponent({
  name: 'TCalendar',
  props,
  setup(props, { slots }) {
    const renderContent = useContent();
    const { t, globalConfig } = useConfig(COMPONENT_NAME);
    // 组件内部状态管理
    const { state, toToday, checkDayVisible } = useState(props);

    // 样式
    const cls = useCalendarClass(props, state);

    // 日历主体头部（日历模式下使用）
    const { cellColHeaders } = useColHeaders(props, state);

    // 日历控件栏（右上角）
    const controller = userController(props, state);

    // 年\月份下拉框
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
    function checkMonthAndYearSelectedDisabled(year: number, month: number): boolean {
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
    }
    // 当存在日期范围限制时，改变年份后应将月份调整为合法月份
    function adjustMonth(): void {
      if (rangeFromTo.value?.from && rangeFromTo.value?.to) {
        const beginYear = dayjs(rangeFromTo.value.from).year();
        const endYear = dayjs(rangeFromTo.value.to).year();
        const beginMon = parseInt(dayjs(rangeFromTo.value.from).format('M'), 10);
        if (checkMonthAndYearSelectedDisabled(state.curSelectedYear, state.curSelectedMonth)) {
          state.curSelectedMonth =
            state.curSelectedYear === beginYear
              ? beginMon
              : state.curSelectedYear === endYear
              ? 1
              : state.curSelectedMonth;
        }
      }
    }
    watch(
      () => {
        return {
          year: `${state.curSelectedYear}`,
          month: `${state.curSelectedMonth}`,
        };
      },
      (v: { month: string; year: string }) => {
        isFunction(props.onMonthChange) && props.onMonthChange({ ...v });
        controller.emitControllerChange();
      },
    );
    const dateSelect = {
      yearSelectOptionList: computed<YearMonthOption[]>(() => {
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
          re.push({
            value: i,
            label: t(globalConfig.value.yearSelection, { year: i }),
            disabled: false,
          });
        }
        return re;
      }),
      isYearSelectVisible: computed<boolean>(() => {
        return controller.checkControllerVisible('year');
      }),
      isYearSelectDisabled: computed<boolean>(() => {
        return controller.checkControllerDisabled('year', 'selectProps');
      }),
      monthSelectOptionList: computed<YearMonthOption[]>(() => {
        adjustMonth();
        const re: YearMonthOption[] = [];
        for (let i = FIRST_MONTH_OF_YEAR; i <= LAST_MONTH_OF_YEAR; i++) {
          const disabled = checkMonthAndYearSelectedDisabled(state.curSelectedYear, i);
          re.push({
            value: i,
            label: t(globalConfig.value.monthSelection, { month: i }),
            disabled,
          });
        }
        return re;
      }),
      isMonthSelectVisible: computed<boolean>(() => {
        return state.curSelectedMode === 'month' && controller.checkControllerVisible('month');
      }),
      isMonthSelectDisabled: computed<boolean>(() => {
        return controller.checkControllerDisabled('month', 'selectProps');
      }),
    };
    // 模式选项
    const modeSelect = {
      optionList: computed<ModeOption[]>(() => {
        return [
          { value: 'month', label: t(globalConfig.value.monthRadio) },
          { value: 'year', label: t(globalConfig.value.yearRadio) },
        ];
      }),
      isVisible: computed<boolean>(() => {
        return controller.checkControllerVisible('mode');
      }),
      isDisabled: computed<boolean>(() => {
        return controller.checkControllerDisabled('mode', 'radioGroupProps');
      }),
    };
    // 显示\隐藏周末按钮
    const weekendBtn = {
      text: computed<string>(() => {
        return state.isShowWeekend ? t(globalConfig.value.hideWeekend) : t(globalConfig.value.showWeekend);
      }),
      vBind: computed<object>(() => {
        const c = controller.configData.value.weekend;
        return state.isShowWeekend ? c.hideWeekendButtonProps : c.showWeekendButtonProps;
      }),
      isVisible: computed<boolean>(() => {
        return (
          props.theme === 'full' &&
          controller.checkControllerVisible('current') &&
          controller.checkControllerVisible('weekend')
        );
      }),
      isDisabled: computed<boolean>(() => {
        const p = state.isShowWeekend ? 'hideWeekendButtonProps' : 'showWeekendButtonProps';
        return controller.checkControllerDisabled('weekend', p);
      }),
    };
    // 今天\本月按钮
    const currentBtn = {
      text: computed<string>(() => {
        return state.curSelectedMode === 'month' ? t(globalConfig.value.today) : t(globalConfig.value.thisMonth);
      }),
      vBind: computed<object>(() => {
        const c = controller.configData.value.current;
        return state.curSelectedMode === 'month' ? c.currentDayButtonProps : c.currentMonthButtonProps;
      }),
      isVisible: computed<boolean>(() => {
        return props.theme === 'full' && controller.checkControllerVisible('current');
      }),
      isDisabled: computed(() => {
        const p = state.curSelectedMode === 'month' ? 'currentDayButtonProps' : 'currentMonthButtonProps';
        return controller.checkControllerDisabled('current', p);
      }),
    };
    const renderControl = () => {
      return (
        <div class={cls.control.value}>
          <div class={cls.title.value}>
            {renderContent('head', undefined, {
              params: { ...controller.options.value },
            })}
          </div>
          <div class={cls.controlSection.value}>
            {dateSelect.isYearSelectVisible.value && (
              <div class={cls.controlSectionCell.value}>
                <TSelect
                  v-model={state.curSelectedYear}
                  size={state.controlSize}
                  autoWidth={true}
                  {...controller.configData.value.year.selectProps}
                  disabled={dateSelect.isYearSelectDisabled.value}
                  options={dateSelect.yearSelectOptionList.value}
                ></TSelect>
              </div>
            )}
            {dateSelect.isMonthSelectVisible.value && (
              <div class={cls.controlSectionCell.value}>
                <TSelect
                  autoWidth={true}
                  v-model={state.curSelectedMonth}
                  size={state.controlSize}
                  {...controller.configData.value.month.selectProps}
                  disabled={dateSelect.isMonthSelectDisabled.value}
                  options={dateSelect.monthSelectOptionList.value}
                ></TSelect>
              </div>
            )}
            {modeSelect.isVisible.value && (
              <div class={cls.controlSectionCell.value} style="height: auto">
                <TRadioGroup
                  v-model={state.curSelectedMode}
                  variant="default-filled"
                  size={state.controlSize}
                  {...controller.configData.value.mode.radioGroupProps}
                  disabled={modeSelect.isDisabled.value}
                  onChange={controller.emitControllerChange}
                >
                  {modeSelect.optionList.value.map((item) => (
                    <TRadioButton key={item.value} value={item.value}>
                      {item.label}
                    </TRadioButton>
                  ))}
                </TRadioGroup>
              </div>
            )}

            {weekendBtn.isVisible.value && (
              <div class={cls.controlSectionCell.value}>
                <TCheckTag
                  class={cls.controlTag.value}
                  theme={state.isShowWeekend ? 'default' : 'primary'}
                  size="large"
                  {...weekendBtn.vBind.value}
                  disabled={weekendBtn.isDisabled.value}
                  onClick={() => {
                    state.isShowWeekend = !state.isShowWeekend;
                    controller.emitControllerChange();
                  }}
                >
                  {weekendBtn.text.value}
                </TCheckTag>
              </div>
            )}
            {currentBtn.isVisible.value && (
              <div class={cls.controlSectionCell.value}>
                <TButton
                  size={state.controlSize}
                  {...currentBtn.vBind.value}
                  disabled={currentBtn.isDisabled.value}
                  onClick={() => {
                    toToday();
                  }}
                >
                  {currentBtn.text.value}
                </TButton>
              </div>
            )}
          </div>
        </div>
      );
    };

    const cellClickEmit = (eventPropsName: keyof typeof props, e: MouseEvent, cellData: CalendarCell): void => {
      if (isFunction(props[eventPropsName])) {
        const options: CellEventOption = {
          cell: {
            ...cellData,
            ...controller.options.value,
          },
          e,
        };
        (props[eventPropsName] as Function)(options);
      }
    };
    const clickCell = (e: MouseEvent, cellData: CalendarCell): void => {
      const d = dayjs(cellData.date);
      if (props.multiple) {
        if (state.curDateList.find((item) => item.isSame(d))) {
          state.curDateList = remove(state.curDateList, (item) => !item.isSame(d));
        } else {
          state.curDateList.push(d);
        }
      } else {
        state.curDate = d;
      }
      cellClickEmit('onCellClick', e, cellData);
    };
    const doubleClickCell = (e: MouseEvent, cellData: CalendarCell): void => {
      cellClickEmit('onCellDoubleClick', e, cellData);
    };
    const rightClickCell = (e: MouseEvent, cellData: CalendarCell): void => {
      if (props.preventCellContextmenu) {
        e.preventDefault();
      }
      cellClickEmit('onCellRightClick', e, cellData);
    };

    const monthCellsData = computed<CalendarCell[][]>(() => {
      const daysArr: CalendarCell[][] = utils.createMonthCellsData(props, state);
      return daysArr;
    });
    const renderMonthBody = () => {
      return (
        <table class={cls.table.value}>
          <thead class={cls.tableHead.value}>
            <tr class={cls.tableHeadRow.value}>
              {cellColHeaders.value.map(
                (item, index) =>
                  checkDayVisible(item.num) && (
                    <th class={cls.tableHeadCell.value}>
                      {isArray(props.week)
                        ? props.week[index]
                        : renderContent('week', undefined, {
                            defaultNode: <span>{item.display}</span>,
                            params: { day: item.num },
                          })}
                    </th>
                  ),
              )}
            </tr>
          </thead>

          <tbody class={cls.tableBody.value}>
            {monthCellsData.value.map((week, weekIndex) => (
              <tr class={cls.tableBodyRow.value}>
                {week.map(
                  (item, itemIndex) =>
                    (state.isShowWeekend || item.day < 6) && (
                      <CalendarCellItem
                        key={`d-${weekIndex}-${itemIndex}`}
                        item={item}
                        theme={props.theme}
                        t={t}
                        global={globalConfig.value}
                        cell={props.cell}
                        cellAppend={props.cellAppend}
                        fillWithZero={props.fillWithZero}
                        onClick={(e: MouseEvent) => clickCell(e, item)}
                        onDblclick={(e: MouseEvent) => doubleClickCell(e, item)}
                        onRightclick={(e: MouseEvent) => rightClickCell(e, item)}
                        v-slots={{ ...slots }}
                      ></CalendarCellItem>
                    ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      );
    };

    const yearCellsData = computed<CalendarCell[][]>(() => {
      const re: CalendarCell[][] = [];
      const monthsArr: CalendarCell[] = utils.createYearCellsData(props, state);
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
    const renderYearBody = () => {
      return (
        <table class={cls.table.value}>
          <tbody class={cls.tableBody.value}>
            {yearCellsData.value.map((cell, cellIndex) => (
              <tr class={cls.tableBodyRow.value}>
                {cell.map((item, itemIndex) => (
                  <CalendarCellItem
                    key={`m-${cellIndex}-${itemIndex}`}
                    item={item}
                    theme={props.theme}
                    t={t}
                    global={globalConfig.value}
                    cell={props.cell}
                    cellAppend={props.cellAppend}
                    fillWithZero={props.fillWithZero}
                    onClick={(e: MouseEvent) => clickCell(e, item)}
                    onDblclick={(e: MouseEvent) => doubleClickCell(e, item)}
                    onRightclick={(e: MouseEvent) => rightClickCell(e, item)}
                    v-slots={{ ...slots }}
                  ></CalendarCellItem>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    };

    return () => {
      return (
        <div class={cls.body.value}>
          {controller.visible.value && renderControl()}
          <div class={cls.panel.value}>{state.curSelectedMode === 'month' ? renderMonthBody() : renderYearBody()}</div>
        </div>
      );
    };
  },
});
