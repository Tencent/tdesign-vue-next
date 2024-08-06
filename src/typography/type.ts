/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TooltipProps } from '../tooltip';
import { TNode } from '../common';

export interface TdTextProps {
  /**
   * 是否添加代码样式
   * @default false
   */
  code?: boolean;
  /**
   * 文本内容
   */
  content?: string | TNode;
  /**
   * 是否可复制，可通过配置参数自定义复制操作的具体功能和样式
   * @default false
   */
  copyable?: boolean | TypographyCopyable;
  /**
   * 文本内容
   */
  default?: string | TNode;
  /**
   * 是否添加删除线样式
   * @default false
   */
  delete?: boolean;
  /**
   * 是否添加不可用样式
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否省略展示，可通过配置参数自定义省略操作的具体功能和样式
   * @default false
   */
  ellipsis?: boolean | TypographyEllipsis;
  /**
   * 文本是否为斜体
   * @default false
   */
  italic?: boolean;
  /**
   * 是否添加键盘样式
   * @default false
   */
  keyboard?: boolean;
  /**
   * 是否添加标记样式，默认为黄色，可通过配置颜色修改标记样式，如#0052D9
   * @default false
   */
  mark?: string | boolean;
  /**
   * 文本是否加粗
   * @default false
   */
  strong?: boolean;
  /**
   * 主题
   */
  theme?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /**
   * 是否添加下划线样式
   * @default false
   */
  underline?: boolean;
}

export interface TdTitleProps {
  /**
   * 段落内容
   */
  content?: string | TNode;
  /**
   * 标题内容
   */
  default?: string | TNode;
  /**
   * 是否省略展示，可通过配置参数自定义省略操作的具体功能和样式
   * @default false
   */
  ellipsis?: boolean | TypographyEllipsis;
  /**
   * 标题等级
   * @default h1
   */
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface TdParagraphProps {
  /**
   * 段落内容
   */
  content?: string | TNode;
  /**
   * 段落内容
   */
  default?: string | TNode;
  /**
   * 是否省略展示，可通过配置参数自定义省略操作的具体功能和样式
   * @default false
   */
  ellipsis?: boolean | TypographyEllipsis;
}

export interface TypographyEllipsis {
  /**
   * 展开后是否可以重新收起
   * @default true
   */
  collapsible?: boolean;
  /**
   * 是否可展开
   * @default true
   */
  expandable?: boolean;
  /**
   * 省略配置默认展示行数
   * @default 1
   */
  row?: number;
  /**
   * 自定义省略触发元素，一般用于自定义折叠图标
   */
  suffix?: TNode<{ expanded: boolean }>;
  /**
   * 光标在省略图标上出现的tooltip的配置
   */
  tooltipProps?: TooltipProps;
  /**
   * 点击省略按钮的回调
   */
  onExpand?: (expanded: boolean) => void;
}

export interface TypographyCopyable {
  /**
   * 复制的文本内容，默认为全部文本
   * @default ''
   */
  text?: string;
  /**
   * 自定义复制触发元素，一般用于自定义复制图标
   */
  suffix?: TNode<{ copied: boolean }>;
  /**
   * 光标在复制图标上出现的tooltip的配置
   */
  tooltipProps?: TooltipProps;
  /**
   * 点击复制按钮的回调
   */
  onCopy?: () => void;
}
