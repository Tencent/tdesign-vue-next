/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDateRangePickerPanelProps } from '../date-picker/type';
import { PropType } from 'vue';

export default {
  /** 时间选择器默认值，当 value/defaultValue 未设置值时有效 */
  defaultTime: {
    type: Array as PropType<TdDateRangePickerPanelProps['defaultTime']>,
    default: (): TdDateRangePickerPanelProps['defaultTime'] => ['00:00:00', '23:59:59'],
  },
  /** 点击日期单元格时触发 */
  onCellClick: Function as PropType<TdDateRangePickerPanelProps['onCellClick']>,
  /** 选中值发生变化时触发。参数 `context.trigger` 表示触发当前事件的来源，不同的模式触发来源也会不同 */
  onChange: Function as PropType<TdDateRangePickerPanelProps['onChange']>,
  /** 如果存在“确定”按钮，则点击“确定”按钮时触发 */
  onConfirm: Function as PropType<TdDateRangePickerPanelProps['onConfirm']>,
  /** 月份切换发生变化时触发 */
  onMonthChange: Function as PropType<TdDateRangePickerPanelProps['onMonthChange']>,
  /** 点击面板时触发 */
  onPanelClick: Function as PropType<TdDateRangePickerPanelProps['onPanelClick']>,
  /** 点击预设按钮后触发 */
  onPresetClick: Function as PropType<TdDateRangePickerPanelProps['onPresetClick']>,
  /** 时间切换发生变化时触发 */
  onTimeChange: Function as PropType<TdDateRangePickerPanelProps['onTimeChange']>,
  /** 年份切换发生变化时触发 */
  onYearChange: Function as PropType<TdDateRangePickerPanelProps['onYearChange']>,
};
