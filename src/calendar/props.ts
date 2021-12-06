/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdCalendarProps } from './type';
import { PropType } from 'vue';

export default {
  /** 单元格插槽 */
  cell: {
    type: [String, Function] as PropType<TdCalendarProps['cell']>,
  },
  /** 单元格插槽，在原来的内容之后追加 */
  cellAppend: {
    type: [String, Function] as PropType<TdCalendarProps['cellAppend']>,
  },
  /** 右上角控制器配置。值为 false 则表示不显示控制器，值为 true 则显示控制器默认配置，值类型为 CalendarController 则显示为自定义控制器配置 */
  controllerConfig: {
    type: [Boolean, Object] as PropType<TdCalendarProps['controllerConfig']>,
    default: true,
  },
  /** 小于 10 的日期，是否使用 '0' 填充。默认表现为 `01` `02`，值为 false 表现为 `1` `2` `9` */
  fillWithZero: {
    type: Boolean,
    default: undefined,
  },
  /** 第一天从星期几开始，仅在日历展示维度为月份时（mode = month）有效。默认为 1 */
  firstDayOfWeek: {
    type: Number,
    validator(val: TdCalendarProps['firstDayOfWeek']): boolean {
      return [1, 2, 3, 4, 5, 6, 7].includes(val);
    },
  },
  /** 用于格式化日期，决定事件参数 formattedFilterDate 的输出值。[详细文档](https://day.js.org/docs/en/display/format) */
  format: {
    type: String,
    default: 'YYYY-MM-DD',
  },
  /** 头部插槽（左上角处，默认不显示任何内容） */
  head: {
    type: [String, Function] as PropType<TdCalendarProps['head']>,
  },
  /** 默认是否显示周末 */
  isShowWeekendDefault: {
    type: Boolean,
    default: true,
  },
  /** 日历展示维度 */
  mode: {
    type: String as PropType<TdCalendarProps['mode']>,
    default: 'month' as TdCalendarProps['mode'],
    validator(val: TdCalendarProps['mode']): boolean {
      return ['month', 'year'].includes(val);
    },
  },
  /** 是否禁用单元格右键默认系统菜单 */
  preventCellContextmenu: Boolean,
  /** 用于设置日历的年月份显示范围，[范围开始，范围结束] */
  range: {
    type: Array as PropType<TdCalendarProps['range']>,
  },
  /** 日历风格 */
  theme: {
    type: String as PropType<TdCalendarProps['theme']>,
    default: 'full' as TdCalendarProps['theme'],
    validator(val: TdCalendarProps['theme']): boolean {
      return ['full', 'card'].includes(val);
    },
  },
  /** 当前高亮的日期 */
  value: {
    type: [String, Date] as PropType<TdCalendarProps['value']>,
  },
  /** 用于自定义日历星期呈现方式。CalendarWeek.day 表示当前是星期几。示例一：['周一', '周二', '周三', '周四', '周五', '星期六', '星期天']。示例二：({ day }) => '周' + day */
  week: {
    type: [Array, Function] as PropType<TdCalendarProps['week']>,
  },
  /** 日历单元格点击时触发 */
  onCellClick: Function as PropType<TdCalendarProps['onCellClick']>,
  /** 日历单元格双击时触发 */
  onCellDoubleClick: Function as PropType<TdCalendarProps['onCellDoubleClick']>,
  /** 日历单元格右击时触发 */
  onCellRightClick: Function as PropType<TdCalendarProps['onCellRightClick']>,
  /** 右上角控件组选中值有变化的时候触发 */
  onControllerChange: Function as PropType<TdCalendarProps['onControllerChange']>,
};
