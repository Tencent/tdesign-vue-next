/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { RadioGroupProps } from '../radio';
import { ButtonProps } from '../button';
import { SelectProps } from '../select';
import { TNode } from '../common';

export interface TdCalendarProps {
  /**
   * 单元格插槽
   */
  cell?: string | TNode<CalendarCell>;
  /**
   * 单元格插槽，在原来的内容之后追加
   */
  cellAppend?: string | TNode<CalendarCell>;
  /**
   * 右上角控制器配置。值为 false 则表示不显示控制器，值为 true 则显示控制器默认配置，值类型为 CalendarController 则显示为自定义控制器配置
   * @default true
   */
  controllerConfig?: boolean | CalendarController;
  /**
   * 用于设置第一列显示周几，仅在日历展示维度为月份时（mode = month）有效
   * @default 1
   */
  firstDayOfWeek?: number;
  /**
   * 用于格式化日期，决定事件参数 formattedFilterDate 的输出值。[详细文档](https://day.js.org/docs/en/display/format)
   * @default 'YYYY-MM-DD'
   */
  format?: string;
  /**
   * 头部插槽（左上角处，默认不显示任何内容）
   */
  head?: string | TNode<ControllerOptions>;
  /**
   * 默认是否显示周末
   * @default true
   */
  isShowWeekendDefault?: boolean;
  /**
   * 日历展示维度
   * @default month
   */
  mode?: 'month' | 'year';
  /**
   * 是否禁用单元格右键默认系统菜单
   * @default false
   */
  preventCellContextmenu?: boolean;
  /**
   * 用于设置日历的年月份显示范围，[范围开始，范围结束]
   */
  range?: Array<CalendarValue>;
  /**
   * 日历风格
   * @default full
   */
  theme?: 'full' | 'card';
  /**
   * 当前高亮的日期
   */
  value?: CalendarValue;
  /**
   * 用于自定义日历星期呈现方式。CalendarWeek.day 表示当前是星期几。示例一：['周一', '周二', '周三', '周四', '周五', '星期六', '星期天']。示例二：({ day }) => '周' + day
   */
  week?: Array<string> | TNode<CalendarWeek>;
  /**
   * 日历单元格点击时触发
   */
  onCellClick?: (options: { cell: CalendarCell; e: MouseEvent }) => void;
  /**
   * 日历单元格双击时触发
   */
  onCellDoubleClick?: (options: { cell: CalendarCell; e: MouseEvent }) => void;
  /**
   * 日历单元格右击时触发
   */
  onCellRightClick?: (options: { cell: CalendarCell; e: MouseEvent }) => void;
  /**
   * 右上角控件组选中值有变化的时候触发
   */
  onControllerChange?: (options: ControllerOptions) => void;
};

export interface CalendarController {
  /**
   * “今天(本月)”按钮控制器
   */
  current?: { visible?: boolean; currentDayButtonProps?: ButtonProps; currentMonthButtonProps?: ButtonProps };
  /**
   * 是否禁用右上角控制器
   * @default false
   */
  disabled?: boolean;
  /**
   * 日历展示维度控制器
   */
  mode?: { visible?: boolean; radioGroupProps?: RadioGroupProps };
  /**
   * 日历月份控制器
   */
  month?: { visible?: boolean; selectProps?: SelectProps };
  /**
   * 隐藏/显示周末控制器
   */
  weekend?: { visible?: boolean; showWeekendButtonProps?: ButtonProps; hideWeekendButtonProps?: ButtonProps };
  /**
   * 日历年份控制器
   */
  year?: { visible?: boolean; selectProps?: SelectProps };
};

export interface CalendarCell extends ControllerOptions {
  /**
   * 用于表示日期单元格属于哪一个月份。值为 0 表示是当前日历显示的月份中的日期，值为 -1 表示是上个月的，值为 1 表示是下个月的（日历展示维度是“月”时有值）
   */
  belongTo?: number;
  /**
   * 日历单元格日期
   */
  date?: Date;
  /**
   * 日期单元格对应的星期，值为 1~7，表示周一到周日。（日历展示维度是“月”时有值）
   */
  day?: number;
  /**
   * 日历单元格日期字符串（输出日期的格式和 format 有关）
   * @default ''
   */
  formattedDate?: string;
  /**
   * 日期单元格是否为当前高亮日期或高亮月份
   */
  isCurrent?: boolean;
  /**
   * 日期在本月的第几周（日历展示维度是“月”时有值）
   */
  weekOrder?: number;
};

export type CalendarValue = string | Date;

export interface CalendarWeek { day: WeekDay };

export type WeekDay = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ControllerOptions { filterDate: Date; formattedFilterDate: string; mode: string; isShowWeekend: boolean };
