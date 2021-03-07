<template>
  <!-- full模式：t-calendar--full 、 card模式：t-calendar--card -->
  <div class="t-calendar" :class="calendarCls">
    <!-- 控件部分 -->
    <div class="t-calendar__control" v-if="isControllerVisible">
      <div class="t-calendar__control-section">
        <!-- 年份选择 -->
        <div class="t-calendar__control-section-cell" v-if="isYearVisible">
          <TSelect
            v-model="curSelectedYear"
            :size="controlSize"
            :disabled="isYearDisabled"
            v-bind="controllerConfigData.year.selecteProps"
            @change="controllerChange"
          >
            <TOption
              v-for="item in yearSelectOptionList"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :disabled="item.disabled"
            >
              {{ item.label }}
            </TOption>
          </TSelect>
        </div>
        <!-- 月份选择 -->
        <div class="t-calendar__control-section-cell" v-if="curSelectedMode === 'month' && isMonthVisible">
          <TSelect
            v-model="curSelectedMonth"
            :size="controlSize"
            :disabled="isMonthDisabled"
            v-bind="controllerConfigData.month.selecteProps"
            @change="controllerChange"
          >
            <TOption
              v-for="item in monthSelectOptionList"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :disabled="item.disabled"
            >
              {{ item.label }}
            </TOption>
          </TSelect>
        </div>
      </div>
      <div class="t-calendar__control-section">
        <!-- 模式选择 -->
        <div v-if="isModeVisible" class="t-calendar__control-section-cell" style="height: auto">
          <TRadioGroup
            v-model="curSelectedMode"
            :size="controlSize"
            :disabled="isModeDisabled"
            v-bind="controllerConfigData.mode.radioGroupProps"
            @change="controllerChange"
          >
            <TRadioButton v-for="item in modeSelectOptionList" :value="item.value" :key="item.value">{{
              item.label
            }}</TRadioButton>
          </TRadioGroup>
        </div>
        <!-- 显示\隐藏周末 -->
        <div v-if="theme === 'full' && isWeekendToggleVisible" class="t-calendar__control-section-cell">
          <TButton
            v-if="curSelectedMode === 'month'"
            :size="controlSize"
            :disabled="isWeekendToggleDisabled"
            v-bind="weekendBtnVBind"
            @click="onWeekendToggleClick()"
          >
            {{ weekendBtnText }}</TButton
          >
        </div>
        <!-- 今天\本月 -->
        <div v-if="theme === 'full' && isCurrentBtnVisible" class="t-calendar__control-section-cell">
          <TButton :size="controlSize" :disabled="isCurrentBtnDisabled" v-bind="currentBtnVBind" @click="toCurrent()">
            {{ currentBtnText }}
          </TButton>
        </div>
      </div>
    </div>
    <!-- 主体部分 -->
    <div class="t-calendar__panel">
      <div class="t-calendar__panel-title">
        <RenderTNodeTemplate v-if="head" :render="head" :params="controllerOptions"></RenderTNodeTemplate>
        <slot v-else name="head" :data="controllerOptions"></slot>
      </div>
      <!-- “月”模式：日历 -->
      <table class="t-calendar__table" v-if="curSelectedMode === 'month'">
        <thead class="t-calendar__table-head">
          <tr class="t-calendar__table-head-row">
            <template v-for="item in cellColHeaders">
              <th v-if="checkMonthCellColHeaderVisibled(item)" :key="item.num" class="t-calendar__table-head-cell">
                {{ item.display }}
              </th>
            </template>
          </tr>
        </thead>
        <tbody class="t-calendar__table-body">
          <tr v-for="week in monthCellsData" :key="week.num" class="t-calendar__table-body-row">
            <template v-for="item in week">
              <CalendarCellItem
                v-if="checkMonthCellItemShowed(item)"
                :key="`${item.weekNum}-${item.day}`"
                :item="item"
                :theme="theme"
                @click.native="clickCell($event, item)"
                @dblclick.native="doubleClickCell($event, item)"
                @contextmenu.native="rightClickCell($event, item)"
              >
                <!-- cell slot for month mode -->
                <RenderTNodeTemplate v-if="cell" slot="cell" :render="cell" :params="createCalendarCell(item)"></RenderTNodeTemplate>
                <slot v-else name="cell" slot="cell" :data="createCalendarCell(item)"></slot>
                <!-- cellAppend slot for month mode -->
                <RenderTNodeTemplate v-if="cellAppend" slot="cellAppend" :render="cellAppend" :params="createCalendarCell(item)"></RenderTNodeTemplate>
                <slot v-else name="cellAppend" slot="cellAppend" :data="createCalendarCell(item)"></slot>
              </CalendarCellItem>
            </template>
          </tr>
        </tbody>
      </table>
      <!-- “年”模式：月历 -->
      <table class="t-calendar__table" v-else-if="curSelectedMode === 'year'">
        <tbody class="t-calendar__table-body">
          <tr v-for="(row, rowIndex) in yearCellsData" :key="rowIndex" class="t-calendar__table-body-row">
            <CalendarCellItem
              v-for="item in row"
              :key="item.num"
              :item="item"
              :theme="theme"
              @click.native="clickCell($event, item)"
              @dblclick.native="doubleClickCell($event, item)"
              @contextmenu.native="rightClickCell($event, item)"
            >
              <!-- cell slot for year mode -->
              <RenderTNodeTemplate v-if="cell" slot="cell" :render="cell" :params="createCalendarCell(item)"></RenderTNodeTemplate>
              <slot v-else name="cell" slot="cell" :params="createCalendarCell(item)"></slot>
              <!-- cellAppend slot for year mode -->
              <RenderTNodeTemplate v-if="cellAppend" slot="cellAppend" :render="cellAppend" :params="createCalendarCell(item)"></RenderTNodeTemplate>
              <slot v-else name="cellAppend" slot="cellAppend" :data="createCalendarCell(item)"></slot>
            </CalendarCellItem>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {
  CalendarCell,
  ControllerOptions,
  TdCalendarProps,
} from '@TdTypes/calendar/TdCalendarProps';
import props from '@TdTypes/calendar/props';

// 通用库
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

import mixins from '../utils/mixins';
import * as utils from './utils';
import { getPropsApiByEvent } from '../utils/helper';

// 组件的一些常量
import {
  COMPONENT_NAME,
  MIN_YEAR,
  FIRST_MONTH_OF_YEAR,
  LAST_MONTH_OF_YEAR,
  TEXT_MAP,
  MODE_OPTION_LIST,
  DEFAULT_YEAR_CELL_NUMINROW,
} from './const';

// 子组件
import { Select as TSelect, Option as TOption } from '../select';
import { RadioGroup as TRadioGroup, RadioButton as TRadioButton } from '../radio';
import { Button as TButton } from '../button';
import CalendarCellItem from './calendar-cell.vue';
import RenderComponent from '../utils/render-component';
import { RenderTNodeTemplate } from '../utils/render-tnode';

// 组件相关的自定义类型
import {
  CalendarData,
  CalendarRange,
  YearMonthOption,
  ModeOption,
  CellColHeader,
  CellEventOption,
} from './type';

dayjs.extend(calendar);

const createDefaultCurDate = (): dayjs.Dayjs => dayjs(dayjs().format('YYYY-MM-DD'));

const getDefaultControllerConfigData = (visible = true): Record<string, any> => ({
  visible,         // 是否显示（全部控件）
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

// 组件逻辑
export default mixins().extend({
  name: COMPONENT_NAME,
  components: {
    TSelect,
    TOption,
    TRadioGroup,
    TRadioButton,
    TButton,
    CalendarCellItem,
    RenderComponent,
    RenderTNodeTemplate,
  },
  props: { ...props },
  data(): CalendarData {
    return {
      curDate: null,
      curSelectedYear: null,
      curSelectedMonth: null,
      curSelectedMode: null,
      isShowWeekend: true,
      controlSize: 'small',
    };
  },
  computed: {
    // 组件最外层的class名（除去前缀，class名和theme参数一致）
    calendarCls(): Record<string, any> {
      return [`${COMPONENT_NAME}--${this.theme}`];
    },

    rangeFromTo(): CalendarRange {
      if (!this.range || this.range.length < 2) {
        return null;
      }
      const [v1, v2] = this.range;
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
    },

    controllerOptions(): ControllerOptions {
      const dayJsFilterDate: dayjs.Dayjs = dayjs(`${this.curSelectedYear}-${this.curSelectedMonth}`);
      const re = {
        isShowWeekend: this.isShowWeekend,
        filterDate: dayJsFilterDate.toDate(),
        formattedFilterDate: dayJsFilterDate.format(this.format),
        mode: this.curSelectedMode,
      };
      return re;
    },

    // 日历主体头部（日历模式下使用）
    cellColHeaders(): CellColHeader[] {
      const re: CellColHeader[] = [];
      const min = 1;
      const max = 7;

      for (let i = this.firstDayOfWeek; i <= max; i++) {
        re.push({
          num: i,
          display: utils.getDayCn(i),
        });
      }
      if (this.firstDayOfWeek > min) {
        for (let i = min; i < this.firstDayOfWeek; i++) {
          re.push({
            num: i,
            display: utils.getDayCn(i),
          });
        }
      }
      return re;
    },
    // 年份下拉框数据源
    yearSelectOptionList(): YearMonthOption[] {
      const re: YearMonthOption[] = [];
      let begin: number = this.curSelectedYear - 10;
      let end: number = this.curSelectedYear + 10;
      if (this.rangeFromTo && this.rangeFromTo.from && this.rangeFromTo.to) {
        begin = dayjs(this.rangeFromTo.from).year();
        end = dayjs(this.rangeFromTo.to).year();
      }

      if (begin < MIN_YEAR) {
        begin = MIN_YEAR;
      }
      if (end < MIN_YEAR) {
        end = MIN_YEAR;
      }

      for (let i = begin; i <= end; i++) {
        const disabled = this.checkMonthAndYearSelecterDisabled(i, this.curSelectedMonth);
        re.push({
          value: i,
          label: `${i}年`,
          disabled,
        });
      }
      return re;
    },
    // 月份下拉框数据源
    monthSelectOptionList(): YearMonthOption[] {
      const re: YearMonthOption[] = [];
      for (let i = FIRST_MONTH_OF_YEAR; i <= LAST_MONTH_OF_YEAR; i++) {
        const disabled = this.checkMonthAndYearSelecterDisabled(this.curSelectedYear, i);
        re.push({
          value: i,
          label: `${i}月`,
          disabled,
        });
      }
      return re;
    },

    // 模式选项数据源
    modeSelectOptionList(): ModeOption[] {
      return MODE_OPTION_LIST;
    },
    // month模式下日历单元格的数据
    monthCellsData(): CalendarCell[][] {
      const { firstDayOfWeek } = this;
      const daysArr: CalendarCell[][] = utils.createMonthCellsData(
        this.curSelectedYear,
        this.curSelectedMonth,
        firstDayOfWeek,
        this.curDate,
        this.format,
      );
      return daysArr;
    },
    // year模式下日历单元格的数据
    yearCellsData(): CalendarCell[][] {
      const re: CalendarCell[][] = [];
      const monthsArr: CalendarCell[] = utils.createYearCellsData(
        this.curSelectedYear,
        this.curDate,
        this.format,
      );
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
    },

    controllerConfigData(): Record<string, any> {
      if (typeof this.controllerConfig === 'boolean') {
        return getDefaultControllerConfigData(this.controllerConfig);
      }
      return {
        ...getDefaultControllerConfigData(),
        ...this.controllerConfig,
      };
    },

    // 是否显示控件（整个右上角的所有控件）
    isControllerVisible(): boolean {
      return this.controllerConfigData && this.controllerConfigData.visible;
    },

    weekendBtnText(): string {
      return this.isShowWeekend ? TEXT_MAP.hideWeekend : TEXT_MAP.showWeekend;
    },
    weekendBtnVBind(): object {
      const c = this.controllerConfigData.weekend;
      return this.isShowWeekend ? c.hideWeekendButtonProps : c.showWeekendButtonProps;
    },

    currentBtnText(): string {
      return this.curSelectedMode === 'month' ? TEXT_MAP.today : TEXT_MAP.thisMonth;
    },
    currentBtnVBind(): object {
      const c = this.controllerConfigData.current;
      return this.curSelectedMode === 'month' ? c.currentDayButtonProps : c.currentMonthButtonProps;
    },

    isModeVisible(): boolean {
      return this.checkControllerVisible('mode');
    },
    isYearVisible(): boolean {
      return this.checkControllerVisible('year');
    },
    isMonthVisible(): boolean {
      return this.checkControllerVisible('month');
    },
    isWeekendToggleVisible(): boolean {
      return this.checkControllerVisible('weekend');
    },
    isCurrentBtnVisible(): boolean {
      return this.checkControllerVisible('current');
    },

    isModeDisabled(): boolean {
      return this.checkControllerDisabled('mode', 'radioGroupProps');
    },
    isYearDisabled(): boolean {
      return this.checkControllerDisabled('year', 'selecteProps');
    },
    isMonthDisabled(): boolean {
      return this.checkControllerDisabled('month', 'selecteProps');
    },
    isWeekendToggleDisabled(): boolean {
      const p = this.isShowWeekend ? 'hideWeekendButtonProps' : 'showWeekendButtonProps';
      return this.checkControllerDisabled('weekend', p);
    },
    isCurrentBtnDisabled(): boolean {
      const p = this.curSelectedMode === 'month' ? 'currentDayButtonProps' : 'currentMonthButtonProps';
      return this.checkControllerDisabled('current', p);
    },
  },
  watch: {
    value: {
      handler(v: TdCalendarProps['value']) {
        this.toCurrent(v);
      },
      immediate: true,
    },
    mode: {
      handler(v: TdCalendarProps['mode']) {
        this.curSelectedMode = v;
      },
      immediate: true,
    },
    isShowWeekendDefault: {
      handler(v: TdCalendarProps['isShowWeekendDefault']) {
        this.isShowWeekend = v;
      },
      immediate: true,
    },
  },
  methods: {
    checkMonthCellItemShowed(cellData: CalendarCell): boolean {
      return this.isShowWeekend || cellData.day < 6;
    },
    createCalendarCell(cellData: CalendarCell): CalendarCell {
      return {
        ...cellData,
        ...this.controllerOptions,
      };
    },
    clickCell(e: MouseEvent, cellData: CalendarCell) {
      this.execCellEvent(e, cellData, 'click-cell');
    },
    doubleClickCell(e: MouseEvent, cellData: CalendarCell) {
      this.execCellEvent(e, cellData, 'double-click-cell');
    },
    rightClickCell(e: MouseEvent, cellData: CalendarCell) {
      if (this.preventCellContextmenu) {
        e.preventDefault();
      }
      this.execCellEvent(e, cellData, 'right-click-cell');
    },
    execCellEvent(e: MouseEvent, cellData: CalendarCell, emitName: string) {
      const options: CellEventOption = {
        cell: this.createCalendarCell(cellData),
        e,
      };
      const cellEvent = this[getPropsApiByEvent(emitName)];
      if (typeof cellEvent === 'function') {
        cellEvent(options);
      }
      this.$emit(emitName, options);
    },
    controllerChange(): void {
      const options = this.controllerOptions;
      if (typeof this.onControllerChange === 'function') {
        this.onControllerChange(options);
      }
      this.$emit('controller-change', options);
    },
    onWeekendToggleClick(): void {
      this.isShowWeekend = !this.isShowWeekend;
      this.controllerChange();
    },
    // 判断月历单元格头是否显示
    checkMonthCellColHeaderVisibled(item: CellColHeader): boolean {
      let re = true;
      if (!this.isShowWeekend) {
        re = item.num !== 6 && item.num !== 7;
      }
      return re;
    },
    // 判断某个控件是否禁用
    checkControllerDisabled(name: string, propsName: string): boolean {
      let re = false;
      const conf = this.controllerConfigData;
      if (conf && (conf.disabled || (conf[name] && conf[name][propsName] && conf[name][propsName].disabled))) {
        re = true;
      }
      return re;
    },
    // 判断某个控件是否显示
    checkControllerVisible(name: string): boolean {
      let re = true;
      const conf = this.controllerConfigData;
      if (!conf || !conf.visible || conf[name] === false || (conf[name] && !conf[name].visible)) {
        re = false;
      }
      return re;
    },
    // 显示当前月份\年份
    toCurrent(value: TdCalendarProps['value']): void {
      this.curDate = value ? dayjs(value) : createDefaultCurDate();
      this.curSelectedYear = this.curDate.year();
      this.curSelectedMonth = parseInt(this.curDate.format('M'), 10);
    },
    checkMonthAndYearSelecterDisabled(year: number, month: number): boolean {
      let disabled = false;
      if (this.rangeFromTo && this.rangeFromTo.from && this.rangeFromTo.to) {
        const beginYear = dayjs(this.rangeFromTo.from).year();
        const endYear = dayjs(this.rangeFromTo.to).year();
        if (year === beginYear) {
          const beginMon = parseInt(dayjs(this.rangeFromTo.from).format('M'), 10);
          disabled = month < beginMon;
        } else if (year === endYear) {
          const endMon = parseInt(dayjs(this.rangeFromTo.to).format('M'), 10);
          disabled = month > endMon;
        }
      }
      return disabled;
    },
  },
});
</script>
