<template>
  <div :class="outerCls">
    <!-- 头部 -->
    <div :class="headerCls">
      <!-- 头部左上区域 -->
      <div :class="titleCls">
        <slot name="head">
          <div>
            <span style="font-weight:700">{{ curDate }}</span>
          </div>
          <div>
            <span>{{ curSelectedMode }} . {{ theme }}</span>
            <span style="margin-left:20px">{{ curSelectedYear }} - {{ curSelectedMonth }}</span>
          </div>
        </slot>
      </div>
      <!-- 头部右上：各种功能控件 -->
      <div :class="controllerCls">
        <!-- 年份选择 -->
        <TSelect v-model="curSelectedYear"
                 @change="onControllerChange">
          <TOption v-for="item in yearSelectOptionList"
                   :key="item.value"
                   :value="item.value"
                   :label="item.label"
                   :disabled="item.disabled"
          >
            {{ item.label }}
          </TOption>
        </TSelect>
        <!-- 月份选择 -->
        <TSelect v-if="curSelectedMode === 'month'"
                 v-model="curSelectedMonth"
                 @change="onControllerChange">
          <TOption v-for="item in monthSelectOptionList"
                   :key="item.value"
                   :value="item.value"
                   :label="item.label"
                   :disabled="item.disabled"
          >
            {{ item.label }}
          </TOption>
        </TSelect>
        <!-- 模式选择 -->
        <TRadioGroup v-model="curSelectedMode"
                     @change="onControllerChange">
          <TRadioButton v-for="item in modeSelectOptionList"
                        :value="item.value"
                        :key="item.value">{{ item.label }}</TRadioButton>
        </TRadioGroup>
        <!-- 今天\本月 -->
        <t-button @click="toCurrent()">
          {{ curSelectedMode === 'month' ? '今天' : '本月' }}
        </t-button>
        <!-- 显示\隐藏周末 -->
        <t-button v-if="curSelectedMode === 'month'"
                  :theme="weekendToggleTheme"
                  @click="onWeekendToggleClick()">隐藏周末</t-button>
      </div>
    </div>
    <!-- 主体 -->
    <div :class="bodyCls">
      <!-- “月”模式 -->
      <template v-if="curSelectedMode === 'month'">
        <div>firstDayOfWeek : {{ firstDayOfWeek }}</div>
        <div v-for="week in monthCellsData" :key="week.num"
             style="display: flex;
              padding: 18px 0;
              border-bottom: solid 1px #ccc;
              justify-content: space-between;">
          <template v-for="item in week">
            <div :key="`${item.weekNum}-${item.day}`" v-if="checkCellVisibled(item)"
                 @click="onCellClick($event, item)"
                 @dblclick="onCellDbClick($event, item)"
                 @contextmenu="onCellRightClick($event, item)"
                 :style="{
                   'font-size': '12px',
                   'color': (item.isCurMon ? (item.isCurDay ? '#0041be' : '#333') : '#888'),
                 }">
              <slot name="cell" :data="item">
                <!-- 没有slot时默认的内容 -->
                <pre>{{item}}</pre>
              </slot>
              <slot name="cellAppend" :data="item">
                <!-- 追加内容 -->
              </slot>
            </div>
          </template>
        </div>
      </template>
      <!-- “年”模式 -->
      <template v-else-if="curSelectedMode === 'year'">
        <div style="display: flex;
              flex-wrap: wrap;
              justify-content: space-between;">
          <div v-for="item in yearCellsData" :key="item.num"
               @click="onCellClick($event, item)"
               @dblclick="onCellDbClick($event, item)"
               @contextmenu="onCellRightClick($event, item)"
               style="padding: 18px;
              font-size: 12px;
              width: 25%;"
               :style="{
                 'color': (item.isCurMon ? '#0041be' : '#333'),
               }">

            <slot name="cell" :data="item">
              <!-- 没有slot时默认的内容 -->
              <pre>{{item}}</pre>
            </slot>
            <slot name="cellAppend" :data="item">
              <!-- 追加内容 -->
            </slot>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import mixins from '../utils/mixins';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';

import {
  MODE_LIST,
  FIRST_DAY_OF_WEEK_LIST,
  THEME_LIST,
  MODE_OPTION_LIST,
} from './const';
import {
  Select as TSelect,
  Option as TOption,
} from '../select';
import {
  RadioGroup as TRadioGroup,
  RadioButton as TRadioButton,
} from '../radio';
import * as utils from './utils';

const name = `${prefix}-calendar`;


export default mixins().extend({
  name,
  components: {
    RenderComponent,
    TSelect,
    TOption,
    TRadioGroup,
    TRadioButton,
  },
  props: {
    /**
       * 传入想让组件显示的年月份（value\v-model）
       */
    value: {
      type: Date,
      default() {
        return null;
      },
    },
    /**
       * 默认选中的年月份（和value的区别在于只有组件create的时候有效，优先级低于value）
       */
    defaultValue: {
      type: Date,
      default(): Date {
        return new Date();
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
      default() {
        return null;
      },
      validator(v: any): boolean {
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
      default() {
        return {
          visible: true,	// 是否显示（全部控件）
          disabled: false,	// 是否禁用（全部控件）
          // 模式切换单选组件设置
          mode: {
            visible: true,	// 是否显示
            radioGroupProps: {},	// 用于透传props给该radioGroup组件
          },
          // 年份选择框组件相关设置
          year: {
            visible: true,	// 是否显示
            selecteProps: {},	// 用于透传props给该select组件
          },
          // 年份选择框组件相关设置
          month: {
            visible: true,	// 是否显示（“year”模式下本身是不显示该组件的）
            selecteProps: {},	// 用于透传props给该select组件
          },
          // 隐藏\显示周末按钮组件相关设置
          weekendToggle: {
            visible: true,	// 是否显示
            showWeekendButtonProps: {},	// 用于透传props给显示周末按钮组件
            hideWeekendButtonProps: {},	// 用于透传props给隐藏周末按钮组件
          },
          // “今天\本月”按钮组件相关设置
          current: {
            visible: true,	// 是否显示
            currentDaybuttonProps: {},	// 用于透传props给“今天”钮组件（“month”模式下有效）
            currentMonthProps: {},	// 用于透传props给“本月”按钮组件（“year”模式下有效）
          },
        };
      },
      validator(v: object): boolean {
        if (v) {
          // TODO
          return true;
        }
        return true;
      },
    },
    /**
       * 是否支持滚动翻阅
       */
    scrollMore: {
      type: Boolean,
      default: false,
    },
    /**
       * 是否禁用单元格右键默认系统菜单
       */
    preventCellContextmenu: {
      type: Boolean,
      default: false,
    },
    /**
       * 默认是否显示周末
       */
    isShowWeekendDefault: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // 当前高亮的日期\月份（目前写死为“今天”）
      curDate: null,
      // 当前选中的年份
      curSelectedYear: null,
      // 当前选中的月份
      curSelectedMonth: null,
      // 当前选中的模式（年 or 月）
      curSelectedMode: null,
      // 是否显示周末
      isShowWeekend: true,
    };
  },
  computed: {
    // 组件dom样式定义 begin
    outerCls(): string[] {
      const tis = this as any;
      return [
        `${name}`,
        `${name}--mode_${tis.curSelectedMode}`,
        `${name}--theme_${tis.theme}`,
      ];
    },
    headerCls(): string[] {
      return [
        `${name}__header`,
      ];
    },
    titleCls(): string[] {
      return [
        `${name}__title`,
      ];
    },
    controllerCls(): string[] {
      return [
        `${name}__controller`,
      ];
    },
    bodyCls(): string[] {
      return [
        `${name}__body`,
      ];
    },
    // 组件dom样式定义 end

    /**
       * 年份下拉框数据源
       */
    yearSelectOptionList(): any[] {
      const re = [];
      for (let i = 2015; i <= 2025; i++) {
        re.push({
          value: i,
          label: (`${i}年`),
          disabled: false,
        });
      }
      return re;
    },
    /**
       * 月份下拉框数据源
       */
    monthSelectOptionList(): any[] {
      const re = [];
      for (let i = 1; i <= 12; i++) {
        re.push({
          value: i,
          label: (`${i}月`),
          disabled: false,
        });
      }
      return re;
    },
    /**
       * 模式选项数据源
       */
    modeSelectOptionList(): any[] {
      return MODE_OPTION_LIST;
    },
    /**
     * month模式下日历单元格的数据
     */
    monthCellsData(): any[] {
      const tis = this as any;
      const firstDayOfWeek = tis.firstDayOfWeek as number;
      const daysArr: any[] = utils.createMonthCellsData(
        tis.curSelectedYear,
        tis.curSelectedMonth,
        firstDayOfWeek,
        tis.curDate
      );
      return daysArr;
    },
    /**
     * year模式下日历单元格的数据
     */
    yearCellsData(): any[] {
      const tis = this as any;
      const monthsArr: any[] = utils.createYearCellsData(tis.curSelectedYear, tis.curDate);
      return monthsArr;
    },

    weekendToggleTheme(): string {
      const tis = this as any;
      const re = (tis.isShowWeekend ? 'line' : 'ghost');
      return re;
    },
  },
  watch: {
    mode: {
      handler(v) {
        const tis = this as any;
        tis.curSelectedMode = v;
      },
      immediate: true,
    },
  },
  created() {
    const tis = this as any;
    tis.init();
  },
  methods: {
    init() {
      const tis = this as any;
      tis.toCurrent();
      tis.isShowWeekend = tis.isShowWeekendDefault;
    },
    onCellClick(e: any, cellData: any): void {
      const tis = this as any;
      const emitData = tis.getCeelClickEmitData(cellData);
      tis.$emit('cellClick', emitData);
    },
    onCellDbClick(e: any, cellData: any): void {
      const tis = this as any;
      const emitData = tis.getCeelClickEmitData(cellData);
      tis.$emit('cellDoubleClick', emitData);
    },
    onCellRightClick(e: any, cellData: any): void {
      const tis = this as any;
      if (tis.preventCellContextmenu) {
        e.preventDefault();
      }
      const emitData = tis.getCeelClickEmitData(cellData);
      tis.$emit('cellRightClick', emitData);
    },
    getCeelClickEmitData(cellData: any): any {
      const tis = this as any;
      const re = {
        // 当前单元格的时间（年 or 年-月）
        data: cellData.date,
        // 右上角控件选中的日期（包含年、月）
        filterDate: new Date(tis.curSelectedYear, tis.curSelectedMonth - 1),
        // 当前模式
        mode: tis.curSelectedMode,
      };
      return re;
    },
    onControllerChange(): void {
      const tis = this as any;
      const emitData = {
        isShowWeekend: tis.isShowWeekend,
        filterDate: new Date(tis.curSelectedYear, tis.curSelectedMonth - 1),
        mode: tis.curSelectedMode,
      };
      tis.$emit('controllerChange', emitData);
    },
    onWeekendToggleClick(): void {
      const tis = this as any;
      tis.isShowWeekend = !tis.isShowWeekend;
      tis.onControllerChange();
    },
    // 判断单元格是否显示
    checkCellVisibled(cellData: any): boolean {
      let re = true;
      const tis = this as any;
      if (!tis.isShowWeekend) {
        re = !cellData.isWeekend;
      }
      return re;
    },

    /**
     * 显示当前月份\年份
     */
    toCurrent(): void {
      const tis = this as any;
      if (tis.defaultValue) {
        tis.curDate = tis.defaultValue;
        tis.curSelectedYear = utils.getYear(tis.defaultValue);
        tis.curSelectedMonth = utils.getMonth(tis.defaultValue);
      } else {
        tis.curDate = utils.getCurDate();
        tis.curSelectedYear = utils.getCurYear();
        tis.curSelectedMonth = utils.getCurMonth();
      }
    },
  },
});
</script>
