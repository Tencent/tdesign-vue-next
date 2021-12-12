/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TNode, AttachNode } from '../common';

export interface TdNotificationProps {
  /**
   * 关闭按钮，可以自定义。值为 true 显示默认关闭按钮，值为 false 不显示关闭按钮。值类型为 string 则直接显示值，如：“关闭”。值类型为 TNode，则表示呈现自定义按钮示例
   */
  closeBtn?: string | boolean | TNode;
  /**
   * 自定义内容
   */
  content?: string | TNode;
  /**
   * 自定义内容，同 content
   */
  default?: string | TNode;
  /**
   * 消息显示时长，单位：毫秒。值为 0 表示永久显示
   * @default 3000
   */
  duration?: number;
  /**
   * 用于自定义底部内容
   */
  footer?: string | TNode;
  /**
   * 用于自定义消息通知前面的图标，优先级大于 theme 设定的图标。值为 false 则不显示图标，值为 true 显示 theme 设定图标
   * @default true
   */
  icon?: boolean | TNode;
  /**
   * 消息类型
   * @default info
   */
  theme?: NotificationThemeList;
  /**
   * 标题
   */
  title?: string | TNode;
  /**
   * 点击关闭按钮时触发
   */
  onCloseBtnClick?: (context: { e: MouseEvent }) => void;
  /**
   * 计时结束时触发
   */
  onDurationEnd?: () => void;
};

export interface NotificationOptions extends TdNotificationProps {
  /**
   * 指定消息通知挂载的父节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body
   * @default 'body'
   */
  attach?: AttachNode;
  /**
   * 相对于 placement 的偏移量，示例：[-10, 20] 或 ['10em', '8rem']
   */
  offset?: Array<string | number>;
  /**
   * 消息弹出位置
   * @default top-right
   */
  placement?: NotificationPlacementList;
  /**
   * 消息通知层级
   * @default 6000
   */
  zIndex?: number;
};

export type NotificationThemeList = 'info' | 'success' | 'warning' | 'error';

export type NotificationPlacementList = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface NotificationInstance { close: () => void };

export type NotificationMethod = (theme: NotificationThemeList, options: NotificationOptions) => Promise<NotificationInstance>;

export type NotificationInfoOptions = Omit<NotificationOptions, 'theme'>;

export type NotificationInfoMethod = (options: NotificationInfoOptions) => Promise<NotificationInstance>;

export type NotificationWarningMethod = (options: NotificationInfoOptions) => Promise<NotificationInstance>;

export type NotificationErrorMethod = (options: NotificationInfoOptions) => Promise<NotificationInstance>;

export type NotificationSuccessMethod = (options: NotificationInfoOptions) => Promise<NotificationInstance>;

export type NotificationCloseMethod = (options: Promise<NotificationInstance>) => void;

export type NotificationCloseAllMethod = () => void;
