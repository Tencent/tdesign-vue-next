/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { TNode, AttachNode } from '../common';

export interface TdLoadingProps {
  /**
   * 挂载元素，默认挂载到组件本身所在的位置。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body
   * @default ''
   */
  attach?: AttachNode;
  /**
   * 子元素
   */
  content?: string | TNode;
  /**
   * 子元素，同 content
   */
  default?: string | TNode;
  /**
   * 延迟显示加载效果的时间，用于防止请求速度过快引起的加载闪烁，单位：毫秒
   * @default 0
   */
  delay?: number;
  /**
   * 是否全屏遮罩，遮罩会挂载到 body
   * @default false
   */
  fullscreen?: boolean;
  /**
   * 加载指示符，值为 true 显示默认指示符，值为 false 则不显示，也可以自定义指示符
   * @default true
   */
  indicator?: boolean | TNode;
  /**
   * 是否处于加载状态
   * @default true
   */
  loading?: boolean;
  /**
   * 防止滚动穿透
   * @default true
   */
  preventScrollThrough?: boolean;
  /**
   * 是否需要遮罩层，遮罩层对包裹元素才有效
   * @default false
   */
  showOverlay?: boolean;
  /**
   * 尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 加载提示文案
   */
  text?: string | TNode;
  /**
   * 消息通知层级，样式默认为 3500
   */
  zIndex?: number;
};

export interface LoadingInstance { hide: () => void };

export type LoadingMethod = (options: boolean | TdLoadingProps) => LoadingInstance;
