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
            v-bind="controllerConfig.year.selecteProps"
            @change="onControllerChange"
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
            v-bind="controllerConfig.month.selecteProps"
            @change="onControllerChange"
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
            v-bind="controllerConfig.mode.radioGroupProps"
            @change="onControllerChange"
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
            v-bind="weekendToggleBtnVBind"
            @click="onWeekendToggleClick()"
          >
            {{ weekendToggleBtnText }}</TButton
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
        <slot name="head"></slot>
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
              <CalendarCell
                v-if="isShowWeekend || !item.isWeekend"
                :key="`${item.weekNum}-${item.day}`"
                :item="item"
                :theme="theme"
                @click.native="onCellClick($event, item)"
                @dblclick.native="onCellDbClick($event, item)"
                @contextmenu.native="onCellRightClick($event, item)"
              >
                <slot name="cell" slot="cell" :data="item"></slot>
                <slot name="cellAppend" slot="cellAppend" :data="item"></slot>
              </CalendarCell>
            </template>
          </tr>
        </tbody>
      </table>
      <!-- “年”模式：月历 -->
      <table class="t-calendar__table" v-else-if="curSelectedMode === 'year'">
        <tbody class="t-calendar__table-body">
          <tr v-for="(row, rowIndex) in yearCellsData" :key="rowIndex" class="t-calendar__table-body-row">
            <CalendarCell
              v-for="item in row"
              :key="item.num"
              :item="item"
              :theme="theme"
              @click.native="onCellClick($event, item)"
              @dblclick.native="onCellDbClick($event, item)"
              @contextmenu.native="onCellRightClick($event, item)"
            >
              <slot name="cell" slot="cell" :data="item"></slot>
              <slot name="cellAppend" slot="cellAppend" :data="item"></slot>
            </CalendarCell>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
// 通用库
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

import mixins from '../utils/mixins';
import * as utils from './utils';

// 组件的一些常量
import {
  COMPONENT_NAME,
  MIN_YEAR,
  INVALID_DATE,
  FIRST_MONTH_OF_YEAR,
  LAST_MONTH_OF_YEAR,
  TEXT_MAP,
  MODE_LIST,
  FIRST_DAY_OF_WEEK_LIST,
  THEME_LIST,
  MODE_OPTION_LIST,
} from './const';

// 子组件
import { Select as TSelect, Option as TOption } from '../select';
import { RadioGroup as TRadioGroup, RadioButton as TRadioButton } from '../radio';
import { Button as TButton } from '../button';
import CalendarCell from './calendar-cell.vue';

// 组件相关的自定义类型
import {
  CalendarData,
  CalendarRange,
  YearMonthOption,
  ModeOption,
  CellColHeader,
  MonthCellData,
  YearCellData,
  CellClickEmitData,
  CellData,
  ValueProp,
} from './type';
dayjs.extend(calendar);

const createDefaultCurDate = (): dayjs.Dayjs => dayjs(dayjs().format('YYYY-MM-DD'));

// 组件逻辑
export default mixins().extend({
  name: COMPONENT_NAME,
  components: {
    TSelect,
    TOption,
    TRadioGroup,
    TRadioButton,
    TButton,
    CalendarCell,
  },
  props: {
    /**
     * 当前高亮的日期\月份
     */
    value: {
      type: [String, Date],
      default() {
        return null;
      },
      validator(v: ValueProp): boolean {
        return dayjs(v).toString() !== INVALID_DATE;
      },
    },
    /**
     * 模式（"month" | "year"）
     */
    mode: {
      type: String,
      default: 'month',
      validator(v: string): boolean {
        return MODE_LIST.indexOf(v) >= 0;
      },
    },
    /**
     * 周起始日（可以设置第一列显示周几，其他列就顺延下去）
     */
    firstDayOfWeek: {
      type: Number,
      default: 1,
      validator(v: number): boolean {
        return FIRST_DAY_OF_WEEK_LIST.indexOf(v) >= 0;
      },
    },
    /**
     * 自定义日历的显示范围（{from:Date, to:Date}）
     */
    range: {
      type: Object,
      default: (): CalendarRange => null,
      validator(v: CalendarRange): boolean {
        if (v) {
          const from = v.from as Date;
          const to = v.to as Date;
          return to.getTime() - from.getTime() >= 0;
        }
        return true;
      },
    },
    /**
     * 风格类型（"full" | "card"）
     */
    theme: {
      type: String,
      default: 'full',
      validator(v: string): boolean {
        return THEME_LIST.indexOf(v) >= 0;
      },
    },
    /**
     * 右上角控件组的相关配置
     */
    controllerConfig: {
      type: Object,
      default(): Record<string, any> {
        return {
          visible: true, // 是否显示（全部控件）
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
          weekendToggle: {
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
        };
      },
    },
    /**
     * 是否支持滚动翻阅
     */
    scrollMore: {
      type: Boolean,
    },
    /**
     * 是否禁用单元格右键默认系统菜单
     */
    preventCellContextmenu: {
      type: Boolean,
    },
    /**
     * 默认是否显示周末
     */
    isShowWeekendDefault: {
      type: Boolean,
      default: true,
    },
    // 年历中每一行显示的月数量
    yearCellNumInRow: {
      type: Number,
      default: 4,
      validator(v: number): boolean {
        return v >= FIRST_MONTH_OF_YEAR && v <= LAST_MONTH_OF_YEAR;
      },
    },
  },
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
      if (this.range && this.range.from && this.range.to) {
        begin = dayjs(this.range.from).year();
        end = dayjs(this.range.to).year();
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
    monthCellsData(): MonthCellData[][] {
      const firstDayOfWeek = this.firstDayOfWeek as number;
      const daysArr: MonthCellData[][] = utils.createMonthCellsData(
        this.curSelectedYear,
        this.curSelectedMonth,
        firstDayOfWeek,
        this.curDate,
        this.theme,
      );
      return daysArr;
    },
    // year模式下日历单元格的数据
    yearCellsData(): YearCellData[][] {
      const re: YearCellData[][] = [];
      const monthsArr: YearCellData[] = utils.createYearCellsData(
        this.curSelectedYear,
        this.curDate,
        this.theme
      );
      const rowCount = Math.ceil(monthsArr.length / this.yearCellNumInRow);
      let index = 0;
      for (let i = 1; i <= rowCount; i++) {
        const row: YearCellData[] = [];
        for (let j = 1; j <= this.yearCellNumInRow; j++) {
          row.push(monthsArr[index]);
          index += 1;
        }
        re.push(row);
      }
      return re;
    },

    // 是否显示控件（整个右上角的所有控件）
    isControllerVisible(): boolean {
      return this.controllerConfig && this.controllerConfig.visible;
    },

    weekendToggleBtnText(): string {
      return this.isShowWeekend ? TEXT_MAP.hideWeekend : TEXT_MAP.showWeekend;
    },
    weekendToggleBtnVBind(): object {
      return this.isShowWeekend
        ? this.controllerConfig.weekendToggle.hideWeekendButtonProps
        : this.controllerConfig.weekendToggle.showWeekendButtonProps;
    },

    currentBtnText(): string {
      return this.curSelectedMode === 'month' ? TEXT_MAP.today : TEXT_MAP.thisMonth;
    },
    currentBtnVBind(): object {
      return this.curSelectedMode === 'month'
        ? this.controllerConfig.current.currentDayButtonProps
        : this.controllerConfig.current.currentMonthButtonProps;
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
      return this.checkControllerVisible('weekendToggle');
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
      return this.isShowWeekend
        ? this.checkControllerDisabled('weekendToggle', 'hideWeekendButtonProps')
        : this.checkControllerDisabled('weekendToggle', 'showWeekendButtonProps');
    },
    isCurrentBtnDisabled(): boolean {
      return this.curSelectedMode === 'month'
        ? this.checkControllerDisabled('current', 'currentDayButtonProps')
        : this.checkControllerDisabled('current', 'currentMonthButtonProps');
    },
  },
  watch: {
    value: {
      handler() {
        this.toCurrent();
      },
      immediate: true,
    },
    mode: {
      handler(v: string) {
        this.curSelectedMode = v;
      },
      immediate: true,
    },
    isShowWeekendDefault: {
      handler(v: boolean) {
        this.isShowWeekend = v;
      },
      immediate: true,
    },
  },
  methods: {
    onCellClick(e: Event, cellData: CellData): void {
      const emitData = this.getCellClickEmitData(cellData);
      this.$emit('cellClick', emitData);
    },
    onCellDbClick(e: Event, cellData: CellData): void {
      const emitData = this.getCellClickEmitData(cellData);
      this.$emit('cellDoubleClick', emitData);
    },
    onCellRightClick(e: Event, cellData: CellData): void {
      if (this.preventCellContextmenu) {
        e.preventDefault();
      }
      const emitData = this.getCellClickEmitData(cellData);
      this.$emit('cellRightClick', emitData);
    },
    getCellClickEmitData(cellData: CellData): CellClickEmitData {
      const re = {
        // 当前单元格的时间（年 or 年-月）
        data: cellData.date,
        // 右上角控件选中的日期（包含年、月）
        filterDate: this.getCurFilterDate(),
        // 当前模式
        mode: this.curSelectedMode,
      };
      return re;
    },
    onControllerChange(): void {
      const emitData = {
        isShowWeekend: this.isShowWeekend,
        filterDate: this.getCurFilterDate(),
        mode: this.curSelectedMode,
      };
      this.$emit('controllerChange', emitData);
    },
    getCurFilterDate(): Date {
      return dayjs(`${this.curSelectedYear}-${this.curSelectedMonth}`).toDate();
    },
    onWeekendToggleClick(): void {
      this.isShowWeekend = !this.isShowWeekend;
      this.onControllerChange();
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
      const conf = this.controllerConfig;
      if (conf && (conf.disabled || (conf[name] && conf[name][propsName] && conf[name][propsName].disabled))) {
        re = true;
      }
      return re;
    },
    // 判断某个控件是否禁用
    checkControllerVisible(name: string): boolean {
      let re = true;
      const conf = this.controllerConfig;
      if (!conf || !conf.visible || (conf[name] && !conf[name].visible)) {
        re = false;
      }
      return re;
    },

    // 显示当前月份\年份
    toCurrent(): void {
      this.curDate = this.value ? dayjs(this.value) : createDefaultCurDate();
      this.curSelectedYear = this.curDate.year();
      this.curSelectedMonth = parseInt(this.curDate.format('M'), 10);
    },

    checkMonthAndYearSelecterDisabled(year: number, month: number): boolean {
      let disabled = false;
      if (this.range && this.range.from && this.range.to) {
        const beginYear = dayjs(this.range.from).year();
        const endYear = dayjs(this.range.to).year();
        if (year === beginYear) {
          const beginMon = parseInt(dayjs(this.range.from).format('M'), 10);
          disabled = month < beginMon;
        } else if (year === endYear) {
          const endMon = parseInt(dayjs(this.range.to).format('M'), 10);
          disabled = month > endMon;
        }
      }
      return disabled;
    },
  },
});
</script>
