/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdImageProps {
  /**
   * 图片描述
   * @default ''
   */
  alt?: string;
  /**
   * 禁用状态，图片不响应鼠标事件
   * @default false
   */
  disabled?: boolean;
  /**
   * 自定义图片加载失败状态下的显示内容
   */
  error?: string | TNode;
  /**
   * 图片填充模式
   * @default fill
   */
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /**
   * 是否展示为图集样式
   * @default false
   */
  gallery?: boolean;
  /**
   * 是否开启图片懒加载
   * @default false
   */
  lazy?: boolean;
  /**
   * 自定义加载中状态的图片内容，如：“加载中”
   */
  loading?: string | TNode;
  /**
   * 图片上方的浮层内容
   */
  overlayContent?: TNode;
  /**
   * 浮层 `overlayContent` 出现的时机
   * @default always
   */
  overlayTrigger?: 'always' | 'hover';
  /**
   * 占位元素，展示层级低于 `loading` `error` 和图片本身，值类型为字符串时表示占位图片地址
   */
  placeholder?: string | TNode;
  /**
   * 等同于原生的 object-position 属性，可选值为 top right bottom left 或 string，可以自定义任何单位，px 或者 百分比
   * @default center
   */
  position?: string;
  /**
   * 图片圆角类型
   * @default square
   */
  shape?: 'circle' | 'round' | 'square';
  /**
   * 图片链接
   * @default ''
   */
  src?: string;
  /**
   * 图片加载失败时触发
   */
  onError?: () => void;
  /**
   * 图片加载完成时触发
   */
  onLoad?: () => void;
}
