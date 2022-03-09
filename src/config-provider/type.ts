/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { CalendarController } from '../calendar';
import { ButtonProps } from '../button';
import { FormErrorMessage } from '../form';
import { TNode } from '../common';

export interface GlobalConfigProvider {
  /**
   * 锚点全局配置
   */
  anchor?: AnchorConfig;
  /**
   * 警告全局配置
   */
  alert?: AlertConfig;
  /**
   * 动画效果控制，`ripple`指波纹动画， `expand` 指展开动画，`fade` 指渐变动画
   * @default `{ include: ['ripple','expand','fade'], exclude: [] }`
   */
  animation?: Record<'include' | 'exclude', Array<AnimationType>>;
  /**
   * 日历组件全局配置
   */
  calendar?: CalendarConfig;
  /**
   * 级联选择器全局配置
   */
  cascader?: CascaderConfig;
  /**
   * CSS 类名前缀
   * @default t
   */
  classPrefix?: string;
  /**
   * 日期选择器全局配置
   */
  datePicker?: DatePickerConfig;
  /**
   * 对话框全局配置
   */
  dialog?: DialogConfig;
  /**
   * 抽屉全局配置
   */
  drawer?: DrawerConfig;
  /**
   * 表单组件全局配置
   */
  form?: FormConfig;
  /**
   * 输入框组件全局配置
   */
  input?: InputConfig;
  /**
   * 列表组件全局配置
   */
  list?: ListConfig;
  /**
   * 分页组件全局配置
   */
  pagination?: PaginationConfig;
  /**
   * 气泡确认框全局配置
   */
  popconfirm?: PopconfirmConfig;
  /**
   * 选择器组件全局配置
   */
  select?: SelectConfig;
  /**
   * 步骤条组件全局配置
   */
  steps?: StepsConfig;
  /**
   * 表格组件全局配置
   */
  table?: TableConfig;
  /**
   * 标签全局配置
   */
  tag?: TagConfig;
  /**
   * 时间选择器全局配置
   */
  timePicker?: TimePickerConfig;
  /**
   * 穿梭框全局配置
   */
  transfer?: TransferConfig;
  /**
   * 树组件全局配置
   */
  tree?: TreeConfig;
  /**
   * 树选择器组件全局配置
   */
  treeSelect?: TreeSelectConfig;
  /**
   * 上传组件全局配置
   */
  upload?: UploadConfig;
}

export interface AnchorConfig {
  /**
   * 展开提示文本
   * @default 请输入
   */
  anchorCopySuccessText?: string;
  /**
   * 收起提示文本
   * @default 请输入
   */
  anchorCopyText?: string;
}

export interface AlertConfig {
  /**
   * 展开提示文本
   * @default 请输入
   */
  expandText?: string;
  /**
   * 收起提示文本
   * @default 请输入
   */
  collapseText?: string;
}

export interface InputConfig {
  /**
   * 占位符文本
   * @default 请输入
   */
  placeholder?: string;
}

export interface PaginationConfig {
  /**
   * 每页条数文本，示例：`'{ total } / page'`
   * @default '{size} 条/页'
   */
  itemsPerPage?: string;
  /**
   * 页码跳转文本，示例：'jump to'
   * @default '跳至'
   */
  jumpTo?: string;
  /**
   * “页”文本，示例：'page'
   * @default '页'
   */
  page?: string;
  /**
   * 数据总条数文本，示例：`'total { total }'`
   * @default '共 {total} 项数据'
   */
  total?: string;
}

export interface CalendarConfig {
  /**
   * 语言配置，月份描述文本
   * @default '一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月'
   */
  cellMonth?: string;
  /**
   * 日历右上角控制器按钮配置
   */
  controllerConfig?: CalendarController;
  /**
   * 当日期数字小于 10 时，是否使用 '0' 填充
   * @default true
   */
  fillWithZero?: boolean;
  /**
   * 第一天从星期几开始
   * @default 1
   */
  firstDayOfWeek?: number;
  /**
   * 语言配置，“隐藏周末”描述文本
   * @default '隐藏周末'
   */
  hideWeekend?: string;
  /**
   * 语言配置，模式切换时的“月”描述文本
   * @default '月'
   */
  monthRadio?: string;
  /**
   * 语言配置，"月"选择描述文本
   * @default '{month} 月'
   */
  monthSelection?: string;
  /**
   * 语言配置，“显示周末”描述文本
   * @default '显示周末末'
   */
  showWeekend?: string;
  /**
   * 语言配置，“本月”描述文本
   * @default '本月'
   */
  thisMonth?: string;
  /**
   * 语言配置，“今天”描述文本
   * @default '今天'
   */
  today?: string;
  /**
   * 语言配置，星期描述文本，示例：'周一,周二,周三,周四,周五,周六,周日'
   * @default 一,二,三,四,五,六,日
   */
  week?: string;
  /**
   * 语言配置，模式切换时的“年”描述文本
   * @default '年'
   */
  yearRadio?: string;
  /**
   * 语言配置，“年”选择描述文本
   * @default '{year} 年'
   */
  yearSelection?: string;
}

export interface CascaderConfig {
  /**
   * 空数据文本，示例：'empty data'
   * @default '暂无数据'
   */
  empty?: string;
  /**
   * “加载中”描述文本
   * @default '加载中'
   */
  loadingText?: string;
  /**
   * 选择器占位文本，示例：'select time'
   * @default '请选择'
   */
  placeholder?: string;
}

export interface TransferConfig {
  /**
   * 空数据描述文本
   * @default '暂无数据'
   */
  empty?: string;
  /**
   * 占位符描述文本
   * @default '请输入关键词搜索'
   */
  placeholder?: string;
  /**
   * 穿梭框标题描述文本
   * @default '{checked} / {total} 项'
   */
  title?: string;
}

export interface TimePickerConfig {
  /**
   * 语言配置，“上午”描述文本
   * @default '上午'
   */
  anteMeridiem?: string;
  /**
   * 语言配置，“确定”描述文本
   * @default '确定'
   */
  confirm?: string;
  /**
   * 语言配置，“此刻”描述文本
   * @default '此刻'
   */
  now?: string;
  /**
   * 语言配置，占位符描述文本
   * @default '请选择时间'
   */
  placeholder?: string;
  /**
   * 语言配置，“下午”描述文本
   * @default '下午'
   */
  postMeridiem?: string;
}

export interface DatePickerConfig {
  /**
   * “确定” 描述文本
   * @default '确定'
   */
  confirm?: string;
  /**
   * “日” 描述文本
   * @default '日'
   */
  dayAriaLabel?: string;
  /**
   * 日期方向，'ltr' 表示从左往右
   * @default 'ltr'
   */
  direction?: string;
  /**
   * 第一天从星期几开始
   * @default 7
   */
  firstDayOfWeek?: number;
  /**
   * 日期格式化规则
   * @default 'YYYY-MM-DD'
   */
  format?: string;
  /**
   * “月” 描述文本
   * @default '月'
   */
  monthAriaLabel?: string;
  /**
   * 星期文本描述，默认值：['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
   */
  months?: string[];
  /**
   * “下个十年” 描述文本
   * @default '下个十年'
   */
  nextDecade?: string;
  /**
   * “下个月” 描述文本
   * @default '下个月'
   */
  nextMonth?: string;
  /**
   * “下一年” 描述文本
   * @default '下一年'
   */
  nextYear?: string;
  /**
   * “now” 描述文本
   * @default '此刻'
   */
  now?: string;
  /**
   * 占位符文本提示，默认值：`{ date: '请选择日期',  month: '请选择月份',  year: '请选择年份' }`
   */
  placeholder?: { date?: string; month?: string; year?: string };
  /**
   * “上个十年” 描述文本
   * @default '上个十年'
   */
  preDecade?: string;
  /**
   * “上个月” 描述文本
   * @default '上个月'
   */
  preMonth?: string;
  /**
   * 【暂不支持，讨论确认中】预设快捷日期选择，示例：`{ '元旦': '2021-01-01', '昨天':  dayjs().subtract(1, 'day').format('YYYY-MM-DD'), '特定日期': () => ['2021-02-01'] }`
   */
  presets?: ConfigPresetDate;
  /**
   * “上一年” 描述文本
   * @default '上一年'
   */
  preYear?: string;
  /**
   * 范围分隔符描述文本，示例：' ~ '
   * @default ' 至 '
   */
  rangeSeparator?: string;
  /**
   * “选择日期” 描述文本
   * @default '选择日期'
   */
  selectDate?: string;
  /**
   * “选择时间” 描述文本
   * @default '选择时间'
   */
  selectTime?: string;
  /**
   * “周” 描述文本
   * @default '周'
   */
  weekAbbreviation?: string;
  /**
   * 星期文本描述，默认值：['日', '一', '二', '三', '四', '五', '六']
   */
  weekdays?: string[];
  /**
   * “年” 描述文本
   * @default '年'
   */
  yearAriaLabel?: string;
}

export interface DialogConfig {
  /**
   * 取消按钮风格
   */
  cancel?: string | ButtonProps;
  /**
   * 确认按钮风格
   */
  confirm?: string | ButtonProps;
  /**
   * 确认按钮主题色，即 Dialog 的 `theme` 和 确认按钮的 `theme` 映射关系。示例：{ danger: 'danger' }
   */
  confirmBtnTheme?: { default: string; info: string; warning: string; danger: string; success: string };
}

export interface DrawerConfig {
  /**
   * “取消”描述文本
   * @default '取消'
   */
  cancel?: string | ButtonProps;
  /**
   * “确认”描述文本
   * @default '确认'
   */
  confirm?: string | ButtonProps;
}

export interface PopconfirmConfig {
  /**
   * “取消”描述文本
   * @default '取消'
   */
  cancel?: string | ButtonProps;
  /**
   * “确定”描述文本
   * @default '确定'
   */
  confirm?: string | ButtonProps;
  /**
   * 确认按钮主题色，即 Popconfirm 的 `theme` 和 确认按钮的 `theme` 映射关系。示例：{ danger: 'danger' }
   */
  confirmBtnTheme?: { default: string; warning: string; danger: string };
}

export interface TableConfig {
  /**
   * 语言配置，'暂无数据' 描述文本
   * @default '暂无数据'
   */
  empty?: string | TNode;
  /**
   * 展开和收起图标（配置传入收起图标即可），如果没有配置，组件会内置默认图标
   */
  expandIcon?: TNode;
  /**
   * 过滤图标，如果没有配置，组件会内置默认图标
   */
  filterIcon?: TNode;
  /**
   * 语言配置，'点击加载更多' 描述文本
   * @default '点击加载更多'
   */
  loadingMoreText?: string;
  /**
   * 语言配置，'正在加载中，请稍后' 描述文本
   * @default '正在加载中，请稍后'
   */
  loadingText?: string;
  /**
   * 语言配置，'点击升序' 描述文本
   * @default '点击升序'
   */
  sortAscendingOperationText?: string;
  /**
   * 语言配置，'点击取消排序' 描述文本
   * @default '点击取消排序'
   */
  sortCancelOperationText?: string;
  /**
   * 语言配置，'点击降序' 描述文本
   * @default '点击降序'
   */
  sortDescendingOperationText?: string;
  /**
   * 排序图标（配置传入降序图标即可），如果没有配置，组件会内置默认图标
   */
  sortIcon?: TNode;
}

export interface SelectConfig {
  /**
   * 清除图标，【注意】使用渲染函数输出图标组件
   */
  clearIcon?: TNode;
  /**
   * “暂无数据”描述文本
   * @default '暂无数据'
   */
  empty?: string;
  /**
   * “加载中”描述文本
   * @default '加载中'
   */
  loadingText?: string;
  /**
   * 占位符描述文本
   * @default '请选择'
   */
  placeholder?: string;
}

export interface TreeConfig {
  /**
   * “暂无数据”描述文本
   * @default '暂无数据'
   */
  empty?: string;
  /**
   * 目录层级图标，传入收起状态图标即可。【注意】使用渲染函数输出图标组件
   */
  folderIcon?: TNode;
}

export interface TreeSelectConfig {
  /**
   * “暂无数据”描述文本
   * @default '暂无数据'
   */
  empty?: string;
  /**
   * “加载中”描述文本
   * @default '加载中'
   */
  loadingText?: string;
  /**
   * 占位符描述文本
   * @default '请选择'
   */
  placeholder?: string;
}

export interface ListConfig {
  /**
   * 语言配置，'点击加载更多' 描述文本
   * @default '点击加载更多'
   */
  loadingMoreText?: string;
  /**
   * 语言配置，'正在加载中，请稍后' 描述文本
   * @default '正在加载中，请稍后'
   */
  loadingText?: string;
}

export interface UploadConfig {
  /**
   * 语言配置，“取消上传” 描述文本
   * @default '取消上传'
   */
  cancelUploadText?: string;
  /**
   * 语言配置，拖拽相关。示例：{ dragDropText: '释放图标', draggingText: '拖拽到此区域', clickAndDragText: '点击上方“选择文件”或将文件拖到此区域' }
   */
  dragger?: UploadConfigDragger;
  /**
   * 语言配置，文件信息相关。示例：{  fileNameText: '文件名', fileSizeText: '文件尺寸', fileStatusText: '状态', fileOperationText: '操作', fileOperationDateText: '上传日期' }
   */
  file?: UploadConfigFileList;
  /**
   * 语言配置，上传进度相关。示例：{ uploadText: '上传中', waitingText: '待上传', 'failText': '上传失败', successText: '上传成功' }
   */
  progress?: UploadConfigProgress;
  /**
   * 语言配置，文件大小超出限制时提醒文本
   * @default '文件大小不能超过 {sizeLimit}'
   */
  sizeLimitMessage?: string;
  /**
   * 语言配置，上传功能触发文案。示例：{ image: '点击上传图片', normal: '点击上传',  fileInput: '选择文件',reupload: '重新上传',fileInput: '删除' }
   */
  triggerUploadText?: UploadTriggerUploadText;
}

export interface UploadConfigProgress {
  /**
   * 语言配置，“上传失败”文本描述
   * @default '上传失败'
   */
  failText?: string;
  /**
   * 语言配置，“上传成功”文本描述
   * @default '上传成功'
   */
  successText?: string;
  /**
   * 语言配置，“上传中”文本描述
   * @default '上传中'
   */
  uploadingText?: string;
  /**
   * 语言配置，“待上传”文本描述
   * @default '待上传'
   */
  waitingText?: string;
}

export interface UploadConfigDragger {
  /**
   * 语言配置，'点击上方“选择文件”或将文件拖到此区域' 描述文本
   * @default '点击上方“选择文件”或将文件拖到此区域'
   */
  clickAndDragText?: string;
  /**
   * 语言配置，'释放图标' 描述文本
   * @default '释放图标'
   */
  dragDropText?: string;
  /**
   * 语言配置，'拖拽到此区域' 描述文本
   * @default '拖拽到此区域'
   */
  draggingText?: string;
}

export interface UploadConfigFileList {
  /**
   * 语言配置，'文件名' 描述文本
   * @default '文件名'
   */
  fileNameText?: string;
  /**
   * 语言配置，'上传日期' 描述文本
   * @default '上传日期'
   */
  fileOperationDateText?: string;
  /**
   * 语言配置，'操作' 描述文本
   * @default '操作'
   */
  fileOperationText?: string;
  /**
   * 语言配置，'文件尺寸' 描述文本
   * @default '文件尺寸'
   */
  fileSizeText?: string;
  /**
   * 语言配置，'状态' 描述文本
   * @default '状态'
   */
  fileStatusText?: string;
}

export interface FormConfig {
  /**
   * 表单错误信息配置，示例：`{ idcard: '请输入正确的身份证号码', max: '字符长度不能超过 ${max}' }`
   */
  errorMessage?: FormErrorMessage;
  /**
   * 是否显示必填符号（*），默认显示
   * @default true
   */
  requiredMark?: boolean;
}

export interface TagConfig {
  /**
   * 关闭图标，【注意】使用渲染函数输出图标组件
   */
  closeIcon?: TNode;
}

export interface StepsConfig {
  /**
   * 错误步骤图标，【注意】使用渲染函数输出图标组件
   */
  errorIcon?: TNode;
}

export type AnimationType = 'ripple' | 'expand' | 'fade';

export interface ConfigPresetDate {
  [name: string]: DateConfigValue | (() => DateConfigValue);
}

export type DateConfigValue = string | Date | Array<DateConfigValue>;

export interface UploadTriggerUploadText {
  image?: string;
  normal?: string;
  fileInput?: string;
  reupload?: string;
  delete?: string;
}
