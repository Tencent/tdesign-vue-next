import { defineComponent, computed, watch } from 'vue';
// 通用库
import dayjs from 'dayjs';
import props from './props';
import * as utils from './utils';
import { renderContent } from '../utils/render-tnode';
import { useConfig } from '../config-provider';
import { useState, useCalendarClass, userController, useColHeaders } from './hook';

// 组件的一些常量
import { COMPONENT_NAME, MIN_YEAR, FIRST_MONTH_OF_YEAR, LAST_MONTH_OF_YEAR, DEFAULT_YEAR_CELL_NUMINROW } from './const';

// 子组件
import { Select as TSelect, Option as TOption } from '../select';
import { RadioGroup as TRadioGroup, RadioButton as TRadioButton } from '../radio';
import { Button as TButton } from '../button';
import { CheckTag as TCheckTag } from '../tag';
import CalendarCellItem from './calendar-cell';

// 组件相关类型
import { CalendarCell } from './type';
import { CalendarRange, YearMonthOption, ModeOption, CellEventOption } from './interface';

// 组件逻辑
export default defineComponent({
  name: 'TCalendar',
  props: { ...props },
  setup(props) {
    const { t, global } = useConfig(COMPONENT_NAME);
    // 组件内部状态管理
    const { state, toCurrent, checkDayVisibled } = useState(props);

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
    function checkMonthAndYearSelecterDisabled(year: number, month: number): boolean {
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
    watch(
      () => {
        return {
          year: `${state.curSelectedYear}`,
          month: `${state.curSelectedMonth}`,
        };
      },
      (v: { month: string; year: string }) => {
        typeof props.onMonthChange === 'function' && props.onMonthChange({ ...v });
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
          const disabled = checkMonthAndYearSelecterDisabled(i, state.curSelectedMonth);
          re.push({
            value: i,
            label: t(global.value.yearSelection, { year: i }),
            disabled,
          });
        }
        return re;
      }),
      isYearSelectVisible: computed<boolean>(() => {
        return controller.checkControllerVisible('year');
      }),
      isYearSelectDisabled: computed<boolean>(() => {
        return controller.checkControllerDisabled('year', 'selecteProps');
      }),
      monthSelectOptionList: computed<YearMonthOption[]>(() => {
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
      }),
      isMonthSelectVisible: computed<boolean>(() => {
        return state.curSelectedMode === 'month' && controller.checkControllerVisible('month');
      }),
      isMonthSelectDisabled: computed<boolean>(() => {
        return controller.checkControllerDisabled('month', 'selecteProps');
      }),
    };
    // 模式选项
    const modeSelect = {
      optionList: computed<ModeOption[]>(() => {
        return [
          { value: 'month', label: t(global.value.monthRadio) },
          { value: 'year', label: t(global.value.yearRadio) },
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
        return state.isShowWeekend ? t(global.value.hideWeekend) : t(global.value.showWeekend);
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
        return state.curSelectedMode === 'month' ? t(global.value.today) : t(global.value.thisMonth);
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

    // 单元格数据
    const cellsData = {
      monthCellsData: computed<CalendarCell[][]>(() => {
        const daysArr: CalendarCell[][] = utils.createMonthCellsData(
          state.curSelectedYear,
          state.curSelectedMonth,
          state.realFirstDayOfWeek,
          state.curDate,
          props.format,
        );
        return daysArr;
      }),
      yearCellsData: computed<CalendarCell[][]>(() => {
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
      }),
    };

    return {
      global,
      state,
      cls,
      controller,
      cellColHeaders,
      dateSelect,
      modeSelect,
      weekendBtn,
      currentBtn,
      cellsData,
      t,
      toCurrent,
      checkDayVisibled,
    };
  },
  render() {
    const onWeekendToggleClick = (): void => {
      this.state.isShowWeekend = !this.state.isShowWeekend;
      this.controller.emitControllerChange();
    };
    const cellClickEmit = (eventPropsName: string, e: MouseEvent, cellData: CalendarCell): void => {
      if (typeof this[eventPropsName] === 'function') {
        const options: CellEventOption = {
          cell: {
            ...cellData,
            ...this.controller.options,
          },
          e,
        };
        this[eventPropsName](options);
      }
    };
    const clickCell = (e: MouseEvent, cellData: CalendarCell): void => {
      this.state.curDate = dayjs(cellData.date);
      cellClickEmit('onCellClick', e, cellData);
    };
    const doubleClickCell = (e: MouseEvent, cellData: CalendarCell): void => {
      cellClickEmit('onCellDoubleClick', e, cellData);
    };
    const rightClickCell = (e: MouseEvent, cellData: CalendarCell): void => {
      if (this.preventCellContextmenu) {
        e.preventDefault();
      }
      cellClickEmit('onCellRightClick', e, cellData);
    };

    const renderControl = () => {
      return (
        <div class={this.cls.control.value}>
          <div class={this.cls.title.value}>
            {renderContent(this, 'head', undefined, {
              params: { ...this.controller.options.value },
            })}
          </div>
          <div class={this.cls.controlSection.value}>
            {this.dateSelect.isYearSelectVisible.value && (
              <div class={this.cls.controlSectionCell.value}>
                <TSelect
                  v-model={this.state.curSelectedYear}
                  size={this.state.controlSize}
                  {...this.controller.configData.value.year.selecteProps}
                  disabled={this.dateSelect.isYearSelectDisabled.value}
                >
                  {this.dateSelect.yearSelectOptionList.value.map((item) => (
                    <TOption key={item.value} value={item.value} label={item.label} disabled={item.disabled}>
                      {item.label}
                    </TOption>
                  ))}
                </TSelect>
              </div>
            )}
            {this.dateSelect.isMonthSelectVisible.value && (
              <div class={this.cls.controlSectionCell.value}>
                <TSelect
                  v-model={this.state.curSelectedMonth}
                  size={this.state.controlSize}
                  {...this.controller.configData.value.month.selecteProps}
                  disabled={this.dateSelect.isMonthSelectDisabled.value}
                >
                  {this.dateSelect.monthSelectOptionList.value.map((item) => (
                    <TOption key={item.value} value={item.value} label={item.label} disabled={item.disabled}>
                      {item.label}
                    </TOption>
                  ))}
                </TSelect>
              </div>
            )}
            {this.modeSelect.isVisible.value && (
              <div class={this.cls.controlSectionCell.value} style="height: auto">
                <TRadioGroup
                  v-model={this.state.curSelectedMode}
                  variant="default-filled"
                  size={this.state.controlSize}
                  {...this.controller.configData.value.mode.radioGroupProps}
                  disabled={this.modeSelect.isDisabled.value}
                  onChange={this.controller.emitControllerChange}
                >
                  {this.modeSelect.optionList.value.map((item) => (
                    <TRadioButton key={item.value} value={item.value}>
                      {item.label}
                    </TRadioButton>
                  ))}
                </TRadioGroup>
              </div>
            )}
            {this.weekendBtn.isVisible.value && (
              <div class={this.cls.controlSectionCell.value}>
                <TCheckTag
                  class={this.cls.controlTag.value}
                  theme={this.state.isShowWeekend ? 'default' : 'primary'}
                  size={this.state.controlSize}
                  {...this.weekendBtn.vBind.value}
                  disabled={this.weekendBtn.isDisabled.value}
                  onClick={onWeekendToggleClick}
                >
                  {this.weekendBtn.text.value}
                </TCheckTag>
              </div>
            )}
            {this.currentBtn.isVisible.value && (
              <div class={this.cls.controlSectionCell.value}>
                <TButton
                  size={this.state.controlSize}
                  {...this.currentBtn.vBind.value}
                  disabled={this.currentBtn.isDisabled.value}
                  onClick={() => {
                    this.toCurrent();
                  }}
                >
                  {this.currentBtn.text.value}
                </TButton>
              </div>
            )}
          </div>
        </div>
      );
    };
    const renderMonthBody = () => {
      return (
        <table class={this.cls.table.value}>
          <thead class={this.cls.tableHead.value}>
            <tr class={this.cls.tableHeadRow.value}>
              {this.cellColHeaders.map(
                (item, index) =>
                  this.checkDayVisibled(item.num) && (
                    <th class={this.cls.tableHeadCell.value}>
                      {Array.isArray(this.week)
                        ? this.week[index]
                        : renderContent(this, 'week', undefined, {
                            defaultNode: <span>{item.display}</span>,
                            params: { day: item.num },
                          })}
                    </th>
                  ),
              )}
            </tr>
          </thead>

          <tbody class={this.cls.tableBody.value}>
            {this.cellsData.monthCellsData.value.map((week, weekIndex) => (
              <tr class={this.cls.tableBodyRow.value}>
                {week.map(
                  (item, itemIndex) =>
                    (this.state.isShowWeekend || item.day < 6) && (
                      <CalendarCellItem
                        key={`d-${weekIndex}-${itemIndex}`}
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
        <table class={this.cls.table.value}>
          <tbody class={this.cls.tableBody.value}>
            {this.cellsData.yearCellsData.value.map((cell, cellIndex) => (
              <tr class={this.cls.tableBodyRow.value}>
                {cell.map((item, itemIndex) => (
                  <CalendarCellItem
                    key={`m-${cellIndex}-${itemIndex}`}
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
      <div class={this.cls.body.value}>
        {this.controller.visible.value && renderControl()}
        <div class={this.cls.panel.value}>
          {this.state.curSelectedMode === 'month' ? renderMonthBody() : renderYearBody()}
        </div>
      </div>
    );
  },
});
