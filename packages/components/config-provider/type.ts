/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { GlobalIconConfig } from 'tdesign-icons-vue-next';
import { CalendarController } from '../calendar';
import { ButtonProps } from '../button';
import { FormErrorMessage } from '../form';
import { ImageProps } from '../image';
import { MessageOptions } from '../message';
import { TNode, SizeEnum } from '../common';

export interface TdConfigProviderProps {
  /**
   * 全局配置
   */
  globalConfig?: GlobalConfigProvider;
}

export interface GlobalConfigProvider {
  /**
   * 警告全局配置
   */
  alert?: AlertConfig;
  /**
   * 锚点全局配置
   */
  anchor?: AnchorConfig;
  /**
   * 动画效果控制，`ripple` 指波纹动画， `expand` 指展开动画，`fade` 指渐变动画。默认为 `{ include: ['ripple','expand','fade'], exclude: [] }`
   */
  animation?: Partial<Record<'include' | 'exclude', Array<AnimationType>>>;
  /**
   * 自动填充组件全局配置
   */
  autoComplete?: AutoCompleteConfig;
  /**
   * 日历组件全局配置
   */
  calendar?: CalendarConfig;
  /**
   * 级联选择器全局配置
   */
  cascader?: CascaderConfig;
  /**
   * 对话组件全局配置
   * @default t
   */
  chat?: ChatConfig;
  /**
   * CSS 类名前缀
   * @default t
   */
  classPrefix?: string;
  /**
   * 颜色选择器全局配置
   */
  colorPicker?: ColorPickerConfig;
  /**
   * 日期选择器全局配置
   */
  datePicker?: DatePickerConfig;
  /**
   * 描述全局配置
   */
  descriptions?: DescriptionsConfig;
  /**
   * 对话框全局配置
   */
  dialog?: DialogConfig;
  /**
   * 抽屉全局配置
   */
  drawer?: DrawerConfig;
  /**
   * 空状态全局配置
   */
  empty?: EmptyConfig;
  /**
   * 表单组件全局配置
   */
  form?: FormConfig;
  /**
   * 引导全局配置
   */
  guide?: GuideConfig;
  /**
   * 图标全局配置
   */
  icon?: IconConfig;
  /**
   * 图片全局配置
   */
  image?: ImageConfig;
  /**
   * 图片预览器全局配置
   */
  imageViewer?: ImageViewerConfig;
  /**
   * 输入框组件全局配置
   */
  input?: InputConfig;
  /**
   * 列表组件全局配置
   */
  list?: ListConfig;
  /**
   * 消息组件全局配置
   */
  message?: MessageConfig;
  /**
   * 分页组件全局配置
   */
  pagination?: PaginationConfig;
  /**
   * 气泡确认框全局配置
   */
  popconfirm?: PopconfirmConfig;
  /**
   * 二维码全局配置
   */
  qrcode?: QRCodeConfig;
  /**
   * 评分全局配置
   */
  rate?: RateConfig;
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
   * 排版组件全局配置
   */
  typography?: TypographyConfig;
  /**
   * 上传组件全局配置
   */
  upload?: UploadConfig;
}

export interface AlertConfig {
  /**
   * 语言配置，“收起”描述文本
   * @default ''
   */
  collapseText?: string;
  /**
   * 语言配置，“展开更多”描述文本
   * @default ''
   */
  expandText?: string;
}

export interface AnchorConfig {
  /**
   * 语言配置，“链接复制成功”描述文本
   * @default ''
   */
  copySuccessText?: string;
  /**
   * 语言配置，“复制链接” 描述文本
   * @default ''
   */
  copyText?: string;
}

export interface AutoCompleteConfig {
  /**
   * 语言配置，“暂无数据”描述文本
   * @default ''
   */
  empty?: string;
}

export interface CalendarConfig {
  /**
   * 语言配置，月份描述文本，示例：'一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月'
   * @default ''
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
   * @default ''
   */
  hideWeekend?: string;
  /**
   * 语言配置，模式切换时的“月”描述文本
   * @default ''
   */
  monthRadio?: string;
  /**
   * 语言配置，“月”选择描述文本。示例：`'{month} 月'`
   * @default ''
   */
  monthSelection?: string;
  /**
   * 语言配置，“显示周末”描述文本
   * @default ''
   */
  showWeekend?: string;
  /**
   * 语言配置，“本月”描述文本
   * @default ''
   */
  thisMonth?: string;
  /**
   * 语言配置，“今天”描述文本
   * @default ''
   */
  today?: string;
  /**
   * 语言配置，星期描述文本，示例：`'周一,周二,周三,周四,周五,周六,周日'`
   * @default ''
   */
  week?: string;
  /**
   * 语言配置，模式切换时的“年”描述文本
   * @default ''
   */
  yearRadio?: string;
  /**
   * 语言配置，“年”选择描述文本，示例：`'{year} 年'`
   * @default ''
   */
  yearSelection?: string;
}

export interface CascaderConfig {
  /**
   * 语言配置，“暂无数据”描述文本
   * @default ''
   */
  empty?: string;
  /**
   * 语言配置，“加载中”描述文本
   * @default ''
   */
  loadingText?: string;
  /**
   * 语言配置，“请选择”占位描述文本
   * @default ''
   */
  placeholder?: string;
}

export interface ChatConfig {
  /**
   * 语言配置，“请输入消息”占位描述文本
   * @default ''
   */
  placeholder?: string;
  /**
   * 语言配置，“中止”占位描述文本
   * @default ''
   */
  stopBtnText?: string;
  /**
   * 语言配置，“重新生成”占位描述文本
   * @default ''
   */
  refreshTipText?: string;
  /**
   * 语言配置，“复制”占位描述文本
   * @default ''
   */
  copyTipText?: string;
  /**
   * 语言配置，“点赞”占位描述文本
   * @default ''
   */
  likeTipText?: string;
  /**
   * 语言配置，“点踩”占位描述文本
   * @default ''
   */
  dislikeTipText?: string;
  /**
   * 语言配置，“复制代码”占位描述文本
   * @default ''
   */
  copyCodeBtnText?: string;
  /**
   * 语言配置，“已复制”占位描述文本
   * @default ''
   */
  copyCodeSuccessText?: string;
  /**
   * 语言配置，“清空历史记录”占位描述文本
   * @default ''
   */
  clearHistoryBtnText?: string;
  /**
   * 语言配置，“已成功复制到剪贴板”占位描述文本
   * @default ''
   */
  copyTextSuccess?: string;
  /**
   * 语言配置，“复制到剪贴板失败”占位描述文本
   * @default ''
   */
  copyTextFail?: string;
  /**
   * 语言配置，“确定要清空消息”占位描述文本
   * @default ''
   */
  confirmClearHistory?: string;
  /**
   * 语言配置，“思考中”占位描述文本
   * @default ''
   */
  loadingText?: string;
  /**
   * 语言配置，“已深度思考”占位描述文本
   * @default ''
   */
  loadingEndText?: string;
  /**
   * 语言配置，“上传图片”占位描述文本
   * @default ''
   */
  uploadImageText?: string;
  /**
   * 语言配置，“上传附件”占位描述文本
   * @default ''
   */
  uploadAttachmentText?: string;
}
export interface ColorPickerConfig {
  /**
   * 语言配置，“确定清空最近使用的颜色吗？”清空颜色确认文案
   * @default ''
   */
  clearConfirmText?: string;
  /**
   * 语言配置，“最近使用颜色” 区域标题文本
   * @default ''
   */
  recentColorTitle?: string;
  /**
   * 语言配置，“系统预设颜色” 区域标题文本
   * @default ''
   */
  swatchColorTitle?: string;
}

export interface DatePickerConfig {
  /**
   * 语言配置，“确定” 描述文本
   * @default ''
   */
  confirm?: string;
  /**
   * 语言配置，“日” 描述文本
   * @default ''
   */
  dayAriaLabel?: string;
  /**
   * dayjs 语言国际化配置
   * @default ''
   */
  dayjsLocale?: string;
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
   * 语言配置，“月” 描述文本
   * @default ''
   */
  monthAriaLabel?: string;
  /**
   * 月文本描述，默认值：['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月']
   */
  months?: string[];
  /**
   * 语言配置，“下个十年” 描述文本
   * @default ''
   */
  nextDecade?: string;
  /**
   * 语言配置，“下个月” 描述文本
   * @default ''
   */
  nextMonth?: string;
  /**
   * 语言配置，“下一年” 描述文本
   * @default ''
   */
  nextYear?: string;
  /**
   * 语言配置，“此刻” 描述文本
   * @default ''
   */
  now?: string;
  /**
   * 占位符文本提示，默认值：`{ date: '请选择日期',  month: '请选择月份',  year: '请选择年份' }`
   */
  placeholder?: { date?: string; month?: string; year?: string };
  /**
   * 语言配置，“上个十年” 描述文本
   * @default ''
   */
  preDecade?: string;
  /**
   * 语言配置，“上个月” 描述文本
   * @default ''
   */
  preMonth?: string;
  /**
   * 语言配置，“上一年” 描述文本
   * @default ''
   */
  preYear?: string;
  /**
   * 【暂不支持，讨论确认中】预设快捷日期选择，示例：`{ '元旦': '2021-01-01', '昨天':  dayjs().subtract(1, 'day').format('YYYY-MM-DD'), '特定日期': () => ['2021-02-01'] }`
   */
  presets?: ConfigPresetDate;
  /**
   * 季度文本描述，默认值：['1 季度', '2 季度', '3 季度', '4 季度']
   */
  quarters?: string[];
  /**
   * 语言配置，“ 至 ” 范围分隔符描述文本，示例：' ~ '
   * @default ''
   */
  rangeSeparator?: string;
  /**
   * 语言配置，“选择日期” 描述文本
   * @default ''
   */
  selectDate?: string;
  /**
   * 语言配置，“选择时间” 描述文本
   * @default ''
   */
  selectTime?: string;
  /**
   * 语言配置，“周” 描述文本
   * @default ''
   */
  weekAbbreviation?: string;
  /**
   * 星期文本描述，默认值：['日', '一', '二', '三', '四', '五', '六']
   */
  weekdays?: string[];
  /**
   * 语言配置，“年” 描述文本
   * @default ''
   */
  yearAriaLabel?: string;
}

export interface DescriptionsConfig {
  /**
   * 字段旁边的冒号，中文为“：”
   * @default ''
   */
  colonText?: string;
}

export interface DialogConfig {
  /**
   * 取消按钮风格
   */
  cancel?: string | ButtonProps;
  /**
   * 按下 ESC 时是否触发对话框关闭事件
   * @default true
   */
  closeOnEscKeydown?: boolean;
  /**
   * 点击蒙层时是否触发关闭事件
   * @default true
   */
  closeOnOverlayClick?: boolean;
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
   * 语言配置，“取消”描述文本
   * @default ''
   */
  cancel?: string | ButtonProps;
  /**
   * 按下 ESC 时是否触发抽屉关闭事件
   * @default true
   */
  closeOnEscKeydown?: boolean;
  /**
   * 点击蒙层时是否触发关闭事件
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * 语言配置，“确认”描述文本
   * @default ''
   */
  confirm?: string | ButtonProps;
  /**
   * 尺寸配置，配置Drawer尺寸
   * @default 'small'
   */
  size?: string;
}

export interface EmptyConfig {
  /**
   * 空状态组件各类型的图片配置
   */
  image?: { maintenance: TNode; success: TNode; fail: TNode; empty: TNode; networkError: TNode };
  /**
   * 空状态组件各类型的标题文本配置
   */
  titleText?: { maintenance: string; success: string; fail: string; empty: string; networkError: string };
}

export interface FormConfig {
  /**
   * 字段旁边的冒号，中文为“：”
   * @default ''
   */
  colonText?: string;
  /**
   * 表单错误信息配置，示例：`{ idcard: '请输入正确的身份证号码', max: '字符长度不能超过 ${max}' }`
   */
  errorMessage?: FormErrorMessage;
  /**
   * 是否显示必填符号（*），默认显示
   * @default true
   */
  requiredMark?: boolean;
  /**
   * 表单必填符号（*）显示位置
   * @default left
   */
  requiredMarkPosition?: 'left' | 'right';
}

export interface GuideConfig {
  /**
   * 最后一步中的完成按钮，示例：`{ content: '完成', theme: 'primary' }`
   */
  finishButtonProps?: ButtonProps;
  /**
   * 下一步按钮，示例：`{ content: '下一步', theme: 'primary' }`
   */
  nextButtonProps?: ButtonProps;
  /**
   * 上一步按钮，示例：`{ content: '上一步', theme: 'default' }`
   */
  prevButtonProps?: ButtonProps;
  /**
   * 跳过按钮，示例：`{ content: '跳过', theme: 'default' }`
   */
  skipButtonProps?: ButtonProps;
}

export interface ImageConfig {
  /**
   * 图片加载失败显示的文本，中文默认为“图片无法显示”
   * @default ''
   */
  errorText?: string;
  /**
   * 图片加载中显示的文本，中文默认为“图片加载中”
   * @default ''
   */
  loadingText?: string;
  /**
   * 统一替换图片 `src` 地址，参数为组件的全部属性，返回值为新的图片地址
   */
  replaceImageSrc?: (params: ImageProps) => string;
}

export interface ImageViewerConfig {
  /**
   * 全局语言配置，默认为 “图片加载失败，可尝试重新加载”
   * @default ''
   */
  errorText?: string;
  /**
   * 全局语言配置，默认为 “镜像”
   * @default ''
   */
  mirrorTipText?: string;
  /**
   * 全局语言配置，默认为 “原始大小”
   * @default ''
   */
  originalSizeTipText?: string;
  /**
   * 全局语言配置，默认为 “旋转”
   * @default ''
   */
  rotateTipText?: string;
}

export interface InputConfig {
  /**
   * 是否开启自动填充功能
   * @default ''
   */
  autocomplete?: string;
  /**
   * 语言配置，“请输入”占位符描述文本
   * @default ''
   */
  placeholder?: string;
}

export interface ListConfig {
  /**
   * 语言配置，'点击加载更多' 描述文本
   * @default ''
   */
  loadingMoreText?: string;
  /**
   * 语言配置，'正在加载中，请稍后' 描述文本
   * @default ''
   */
  loadingText?: string;
}

export interface MessageConfig extends MessageOptions {}

export interface PaginationConfig {
  /**
   * 语言配置，每页条数文本，示例：`'{size} 条/页'`
   * @default ''
   */
  itemsPerPage?: string;
  /**
   * 语言配置，页码跳转文本，示例：'跳至'
   * @default ''
   */
  jumpTo?: string;
  /**
   * 语言配置，“页”描述文本
   * @default ''
   */
  page?: string;
  /**
   * 语言配置，数据总条数文本，示例：`'共 {total} 项数据'`
   * @default ''
   */
  total?: string;
}

export interface PopconfirmConfig {
  /**
   * 语言配置，“取消”描述文本
   */
  cancel?: string | ButtonProps;
  /**
   * 语言配置，“确定”描述文本
   */
  confirm?: string | ButtonProps;
  /**
   * 确认按钮主题色，即 Popconfirm 的 `theme` 和 确认按钮的 `theme` 映射关系。示例：{ danger: 'danger' }
   */
  confirmBtnTheme?: { default: string; warning: string; danger: string };
}

export interface QRCodeConfig {
  /**
   * 语言配置，“二维码过期”描述文本
   * @default ''
   */
  expiredText?: string;
  /**
   * 语言配置，“点击刷新”描述文本
   * @default ''
   */
  refreshText?: string;
  /**
   * 语言配置，“已扫描”描述文本
   * @default ''
   */
  scannedText?: string;
}

export interface RateConfig {
  /**
   * 评分描述，默认值：['极差', '失望', '一般', '满意', '惊喜']
   */
  rateText?: string[];
}

export interface SelectConfig {
  /**
   * 清除图标，【注意】使用渲染函数输出图标组件
   */
  clearIcon?: TNode;
  /**
   * 语言配置，“暂无数据”描述文本
   * @default ''
   */
  empty?: string;
  /**
   * 全局配置是否可筛选
   * @default false
   */
  filterable?: boolean;
  /**
   * 语言配置，“加载中”描述文本
   * @default ''
   */
  loadingText?: string;
  /**
   * 语言配置，“请选择”占位符描述文本
   * @default ''
   */
  placeholder?: string;
}

export interface StepsConfig {
  /**
   * 已完成步骤图标，【注意】使用渲染函数输出图标组件
   */
  checkIcon?: TNode;
  /**
   * 错误步骤图标，【注意】使用渲染函数输出图标组件
   */
  errorIcon?: TNode;
}

export interface TableConfig {
  /**
   * 语言配置，“取消” 描述文本
   * @default ''
   */
  cancelText?: string;
  /**
   * 语言配置，过滤功能中，“清空筛选” 描述文本
   * @default ''
   */
  clearFilterResultButtonText?: string;
  /**
   * 语言配置，列配置功能中，“列配置” 按钮描述文本
   * @default ''
   */
  columnConfigButtonText?: string;
  /**
   * 语言配置，“请选择需要在表格中显示的数据列” 描述文本，列配置功能中弹框顶部描述
   * @default ''
   */
  columnConfigDescriptionText?: string;
  /**
   * 语言配置，“表格列配置” 描述文本，列配置功能中弹框的标题
   * @default ''
   */
  columnConfigTitleText?: string;
  /**
   * 语言配置，“确认” 描述文本
   * @default ''
   */
  confirmText?: string;
  /**
   * 语言配置，“暂无数据” 描述文本
   */
  empty?: string | TNode;
  /**
   * 展开和收起图标（配置传入收起图标即可），如果没有配置，会使用组件内置的默认图标
   */
  expandIcon?: TNode;
  /**
   * 过滤图标，如果没有配置，会使用组件内置的默认图标
   */
  filterIcon?: TNode;
  /**
   * 隐藏排序文本提示
   * @default false
   */
  hideSortTips?: boolean;
  /**
   * 语言配置，“点击加载更多” 描述文本
   * @default ''
   */
  loadingMoreText?: string;
  /**
   * 语言配置，“正在加载中，请稍后” 描述文本
   * @default ''
   */
  loadingText?: string;
  /**
   * 语言配置，“重置” 描述文本
   * @default ''
   */
  resetText?: string;
  /**
   * 语言配置，过滤功能中，过滤条件和结果描述文本，示例：'搜索“{result}”，找到 {count} 条结果'
   * @default ''
   */
  searchResultText?: string;
  /**
   * 语言配置，'全选' 描述文本
   * @default ''
   */
  selectAllText?: string;
  /**
   * 全局表格尺寸配置
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 语言配置，'点击升序' 描述文本
   * @default ''
   */
  sortAscendingOperationText?: string;
  /**
   * 语言配置，'点击取消排序' 描述文本
   * @default ''
   */
  sortCancelOperationText?: string;
  /**
   * 语言配置，'点击降序' 描述文本
   * @default ''
   */
  sortDescendingOperationText?: string;
  /**
   * 排序图标（配置传入降序图标即可），如果没有配置，会使用组件内置的默认图标
   */
  sortIcon?: TNode;
  /**
   * 树形结构，展开和折叠图标。如果没有配置，会使用组件内置的默认图标
   */
  treeExpandAndFoldIcon?: TNode<{ type: 'expand' | 'fold' }>;
}

export interface TagConfig {
  /**
   * 关闭图标，【注意】使用渲染函数输出图标组件
   */
  closeIcon?: TNode;
}

export interface TimePickerConfig {
  /**
   * 语言配置，“上午”描述文本
   * @default ''
   */
  anteMeridiem?: string;
  /**
   * 语言配置，“确定”描述文本
   * @default ''
   */
  confirm?: string;
  /**
   * 语言配置，“此刻”描述文本
   * @default ''
   */
  now?: string;
  /**
   * 语言配置，\"请选择时间\"占位符描述文本
   * @default ''
   */
  placeholder?: string;
  /**
   * 语言配置，“下午”描述文本
   * @default ''
   */
  postMeridiem?: string;
}

export interface TransferConfig {
  /**
   * 语言配置，“暂无数据”空数据描述文本
   * @default ''
   */
  empty?: string;
  /**
   * 语言配置，“请输入关键词搜索”占位符描述文本
   * @default ''
   */
  placeholder?: string;
  /**
   * 语言配置，穿梭框标题描述文本，示例：“{checked} / {total} 项”
   * @default ''
   */
  title?: string;
}

export interface TreeConfig {
  /**
   * 语言配置，“暂无数据”描述文本
   * @default ''
   */
  empty?: string;
  /**
   * 目录层级图标，传入收起状态图标即可。【注意】使用渲染函数输出图标组件
   */
  folderIcon?: TNode;
}

export interface TreeSelectConfig {
  /**
   * 语言配置，“暂无数据”描述文本
   * @default ''
   */
  empty?: string;
  /**
   * 语言配置，“加载中”描述文本
   * @default ''
   */
  loadingText?: string;
  /**
   * 语言配置，“请选择”占位符描述文本
   * @default ''
   */
  placeholder?: string;
}

export interface TypographyConfig {
  /**
   * 语言配置，“收起”描述文本
   * @default ''
   */
  collapseText?: string;
  /**
   * 语言配置，“复制成功”描述文本
   * @default ''
   */
  copiedText?: string;
  /**
   * 语言配置，“展开”描述文本
   * @default ''
   */
  expandText?: string;
}

export interface UploadConfig {
  /**
   * 语言配置，“取消上传” 描述文本
   * @default ''
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
   * 语言配置，文件大小超出限制时提醒文本。示例：`'文件大小不能超过 {sizeLimit}'`
   * @default ''
   */
  sizeLimitMessage?: string;
  /**
   * 语言配置，上传功能触发文案。示例：{ image: '点击上传图片', normal: '点击上传',  fileInput: '选择文件', reupload: '重新上传', delete: '删除', continueUpload?: '继续选择' }
   */
  triggerUploadText?: UploadTriggerUploadText;
}

export interface UploadConfigDragger {
  /**
   * 语言配置，“ 点击上方“选择文件”或将文件拖到此区域 ” 描述文本
   * @default ''
   */
  clickAndDragText?: string;
  /**
   * 语言配置，“释放图标” 描述文本
   * @default ''
   */
  dragDropText?: string;
  /**
   * 语言配置，'拖拽到此区域' 描述文本
   * @default ''
   */
  draggingText?: string;
}

export interface UploadConfigFileList {
  /**
   * 语言配置，“文件名” 描述文本
   * @default ''
   */
  fileNameText?: string;
  /**
   * 语言配置，“上传日期” 描述文本
   * @default ''
   */
  fileOperationDateText?: string;
  /**
   * 语言配置，“操作” 描述文本
   * @default ''
   */
  fileOperationText?: string;
  /**
   * 语言配置，“文件尺寸” 描述文本
   * @default ''
   */
  fileSizeText?: string;
  /**
   * 语言配置，“状态” 描述文本
   * @default ''
   */
  fileStatusText?: string;
}

export interface UploadConfigProgress {
  /**
   * 语言配置，“上传失败”文本描述
   * @default ''
   */
  failText?: string;
  /**
   * 语言配置，“上传成功”文本描述
   * @default ''
   */
  successText?: string;
  /**
   * 语言配置，“上传中”文本描述
   * @default ''
   */
  uploadingText?: string;
  /**
   * 语言配置，“待上传”文本描述
   * @default ''
   */
  waitingText?: string;
}

export type AnimationType = 'ripple' | 'expand' | 'fade';

export type IconConfig = GlobalIconConfig;

export interface ConfigPresetDate {
  [name: string]: DateConfigValue | (() => DateConfigValue);
}

export type DateConfigValue = string | Date | Array<DateConfigValue>;

export interface UploadTriggerUploadText {
  image?: string;
  normal?: string;
  fileInput?: string;
  reupload?: string;
  continueUpload?: string;
  delete?: string;
}
