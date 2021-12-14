/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

export interface TdTimePickerProps {
  /**
   * 是否允许直接输入时间
   * @default false
   */
  allowInput?: boolean;
  /**
   * 是否允许清除选中值
   * @default false
   */
  clearable?: boolean;
  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 禁用时间项
   */
  disableTime?: (h: number, m: number, s: number) => boolean;
  /**
   * 用于格式化时间，[详细文档](https://day.js.org/docs/en/display/format)
   * @default 'HH:mm:ss'
   */
  format?: string;
  /**
   * 是否隐藏禁用状态的时间项
   * @default true
   */
  hideDisabledTime?: boolean;
  /**
   * 占位符
   * @default ''
   */
  placeholder?: string;
  /**
   * 尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ['2', '1', '1']
   * @default () => [1, 1, 1]
   */
  steps?: Array<string | number>;
  /**
   * 选中值
   * @default ''
   */
  value?: TimePickerValue;
  /**
   * 选中值，非受控属性
   * @default ''
   */
  defaultValue?: TimePickerValue;
  /**
   * 当输入框失去焦点时触发，参数 input 表示输入框内容，value 表示组件当前有效值，trigger 表示触发源头
   */
  onBlur?: (context: {
    trigger: 'hour' | 'minute' | 'second';
    input: string;
    value: TimePickerValue;
    e: FocusEvent;
  }) => void;
  /**
   * 选中值发生变化时触发
   */
  onChange?: (value: TimePickerValue) => void;
  /**
   * 面板关闭时触发
   */
  onClose?: (context: { e: MouseEvent }) => void;
  /**
   * 输入框获得焦点时触发，参数 input 表示输入框内容，value 表示组件当前有效值，trigger 表示触发源头
   */
  onFocus?: (context: {
    trigger: 'hour' | 'minute' | 'second';
    input: string;
    value: TimePickerValue;
    e: FocusEvent;
  }) => void;
  /**
   * 当输入框内容发生变化时触发，参数 input 表示输入框内容，value 表示组件当前有效值
   */
  onInput?: (context: { input: string; value: TimePickerValue; e: InputEvent }) => void;
  /**
   * 面板打开时触发
   */
  onOpen?: (context: { e: MouseEvent }) => void;
}

export interface TdTimeRangePickerProps {
  /**
   * 是否允许直接输入时间
   * @default false
   */
  allowInput?: boolean;
  /**
   * 是否允许清除选中值
   * @default false
   */
  clearable?: boolean;
  /**
   * 是否禁用组件，值为数组表示可分别控制开始日期和结束日期是否禁用
   * @default false
   */
  disabled?: boolean | Array<boolean>;
  /**
   * 禁用时间项
   */
  disableTime?: (h: number, m: number, s: number, context: { partial: TimeRangePickerPartial }) => boolean;
  /**
   * 用于格式化时间，[详细文档](https://day.js.org/docs/en/display/format)
   * @default 'HH:mm:ss'
   */
  format?: string;
  /**
   * 是否隐藏禁用状态的时间项
   * @default true
   */
  hideDisabledTime?: boolean;
  /**
   * 占位符，值为数组表示可分别为开始日期和结束日期设置占位符
   */
  placeholder?: string | Array<string>;
  /**
   * 尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ['2', '1', '1']
   * @default () => [1, 1, 1]
   */
  steps?: Array<string | number>;
  /**
   * 选中值
   */
  value?: TimeRangeValue;
  /**
   * 选中值，非受控属性
   */
  defaultValue?: TimeRangeValue;
  /**
   * 当输入框失去焦点时触发
   */
  onBlur?: (context: { value: TimeRangeValue; e: FocusEvent }) => void;
  /**
   * 选中值发生变化时触发
   */
  onChange?: (value: TimeRangeValue) => void;
  /**
   * 输入框获得焦点时触发
   */
  onFocus?: (context: { value: TimeRangeValue; e: FocusEvent }) => void;
  /**
   * 当输入框内容发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值
   */
  onInput?: (context: { input: string; value: TimeRangeValue; e: InputEvent }) => void;
}

export type TimePickerValue = string;

export type TimeRangePickerPartial = 'start' | 'end';

export type TimeRangeValue = Array<string>;
