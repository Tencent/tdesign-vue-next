<template>
  <t-space direction="vertical">
    <!-- 示例1: 显示农历日期 -->
    <t-date-picker v-model="date1" placeholder="显示农历日期">
      <template #cell="{ value }">
        <div class="lunar-cell">
          <span class="solar-day">{{ value.getDate() }}</span>
          <span class="lunar-day">{{ getLunarDay(value) }}</span>
        </div>
      </template>
    </t-date-picker>

    <!-- 示例2: 范围选择器中标记特殊日期 -->
    <t-date-range-picker v-model="date2">
      <template #cell="{ value }">
        <div v-if="isSpecialDay(value)" class="custom-range-cell">
          <t-badge count="New" dot style="width: 100%">
            {{ value.getDate() }}
          </t-badge>
        </div>
        <span v-else>
          {{ value.getDate() }}
        </span>
      </template>
    </t-date-range-picker>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { DateRangeValue } from 'tdesign-vue-next';

const date1 = ref<string>('');
const date2 = ref<DateRangeValue>(['', '']);

function isSpecialDay(date: Date): boolean {
  return date.getDate() === 1 || date.getDate() === 15;
}

/** 农历年份信息类型 */
interface LunarYearInfo {
  monthDays: number[];
  leapMonth: number;
  leapDays: number;
}

/** 农历日期信息类型 */
interface LunarDateInfo {
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
  monthName: string;
  dayName: string;
}

/**
 * 农历年份信息（1900-2099年）
 * 数据来源：天文历法计算
 * 格式说明：
 * - months: 12个月的天数，30或29
 * - leapMonth: 闰月月份，0表示无闰月
 * - leapDays: 闰月天数，30或29
 */
function getLunarYearInfo(year: number): LunarYearInfo {
  /**
   * 农历数据表，每个数字编码了一年的信息：
   * - 低4位(0-3): 闰月月份(0-12，0表示无闰月)
   * - 中间12位(4-15): 1-12月每月天数(1=30天, 0=29天)
   * - 第17位(16): 闰月天数(1=30天, 0=29天)
   */
  // prettier-ignore
  const DATA = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929
    0x06566, 0x0d4a0, 0x0ea50, 0x16a95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
    0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099
  ];

  const yearData = DATA[year - 1900];

  // 解析闰月月份（低4位）
  const leapMonth = yearData & 0xf;

  // 解析闰月天数（第17位，1=30天，0=29天）
  const leapDays = leapMonth ? (yearData & 0x10000 ? 30 : 29) : 0;

  // 解析每月天数（5-16位）
  const monthDays = [];
  for (let month = 1; month <= 12; month++) {
    // 从高位到低位依次判断每月天数
    const bit = 0x8000 >> (month - 1);
    monthDays.push(yearData & bit ? 30 : 29);
  }

  return { monthDays, leapMonth, leapDays };
}

/** 农历月份名称 */
const LUNAR_MONTH_NAMES = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];

/** 农历日期名称 */
// prettier-ignore
const LUNAR_DAY_NAMES = [
  '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十',
];

/**
 * 计算农历年的总天数
 */
function getLunarYearTotalDays(year: number): number {
  const { monthDays, leapDays } = getLunarYearInfo(year);
  // 12个月的天数之和 + 闰月天数
  return monthDays.reduce((sum, days) => sum + days, 0) + leapDays;
}

/**
 * 公历日期转农历日期
 * @param solarDate - 公历日期
 * @returns 农历日期信息
 */
function solarToLunar(solarDate: Date): LunarDateInfo {
  // 农历1900年正月初一对应的公历日期
  const BASE_DATE = new Date(1900, 0, 31);
  const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

  // 计算与基准日期相差的天数
  let remainingDays = Math.floor((solarDate.getTime() - BASE_DATE.getTime()) / MILLISECONDS_PER_DAY);

  // 计算农历年份
  let lunarYear = 1900;
  let yearDays = 0;
  while (lunarYear < 2100 && remainingDays > 0) {
    yearDays = getLunarYearTotalDays(lunarYear);
    remainingDays -= yearDays;
    lunarYear++;
  }
  // 如果超减了，回退一年
  if (remainingDays < 0) {
    remainingDays += yearDays;
    lunarYear--;
  }

  // 获取该年的农历信息
  const { monthDays, leapMonth, leapDays } = getLunarYearInfo(lunarYear);

  // 计算农历月份和日期
  let lunarMonth = 1;
  let isLeapMonth = false;
  let monthDay = 0;

  for (let month = 1; month <= 12; month++) {
    // 当前月的天数
    monthDay = monthDays[month - 1];

    if (remainingDays < monthDay) {
      lunarMonth = month;
      break;
    }
    remainingDays -= monthDay;

    // 处理闰月
    if (leapMonth === month) {
      if (remainingDays < leapDays) {
        lunarMonth = month;
        isLeapMonth = true;
        break;
      }
      remainingDays -= leapDays;
    }

    if (month === 12) {
      lunarMonth = 12;
    }
  }

  const lunarDay = remainingDays + 1;

  return {
    year: lunarYear,
    month: lunarMonth,
    day: lunarDay,
    isLeapMonth,
    // 格式化月份名称
    monthName: (isLeapMonth ? '闰' : '') + LUNAR_MONTH_NAMES[lunarMonth - 1] + '月',
    // 格式化日期名称
    dayName: LUNAR_DAY_NAMES[lunarDay - 1],
  };
}

/**
 * 获取农历日期的显示文本
 * 规则：每月初一显示月份名，其他日期显示日期名
 */
function getLunarDay(date: Date): string {
  const lunar = solarToLunar(date);
  return lunar.day === 1 ? lunar.monthName : lunar.dayName;
}
</script>

<style>
.lunar-cell {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.2;
}

.solar-day {
  font-size: 14px;
}

.lunar-day {
  font-size: 10px;
  color: var(--td-text-color-placeholder);
  transform: scale(0.9);
}

.t-date-picker__cell--active .lunar-day {
  color: var(--td-text-color-anti);
}

.t-date-picker__cell-inner:has(.lunar-cell) {
  height: 40px;
}

.custom-range-cell {
  width: 100%;
}

.t-date-picker__cell--active .t-date-picker__cell-inner .t-badge {
  color: var(--td-text-color-anti);
}
</style>
