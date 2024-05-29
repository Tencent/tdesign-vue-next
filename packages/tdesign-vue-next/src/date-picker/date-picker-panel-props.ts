/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdDatePickerPanelProps } from '../date-picker/type';

export default {
  /** 时间选择器默认值，当 value/defaultValue 未设置值时有效 */
  defaultTime: {
    type: String,
    default: '00:00:00',
  },
  /** 点击日期单元格时触发 */
  onCellClick: Function as PropType<TdDatePickerPanelProps['onCellClick']>,
  /** 选中值发生变化时触发。参数 `context.trigger` 表示触发当前事件的来源，不同的模式触发来源也会不同 */
  onChange: Function as PropType<TdDatePickerPanelProps['onChange']>,
  /** 如果存在“确定”按钮，则点击“确定”按钮时触发 */
  onConfirm: Function as PropType<TdDatePickerPanelProps['onConfirm']>,
  /** 月份切换发生变化时触发 */
  onMonthChange: Function as PropType<TdDatePickerPanelProps['onMonthChange']>,
  /** 点击面板时触发 */
  onPanelClick: Function as PropType<TdDatePickerPanelProps['onPanelClick']>,
  /** 点击预设按钮后触发 */
  onPresetClick: Function as PropType<TdDatePickerPanelProps['onPresetClick']>,
  /** 时间切换发生变化时触发 */
  onTimeChange: Function as PropType<TdDatePickerPanelProps['onTimeChange']>,
  /** 年份切换发生变化时触发 */
  onYearChange: Function as PropType<TdDatePickerPanelProps['onYearChange']>,
};
