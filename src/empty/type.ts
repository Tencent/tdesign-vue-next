/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ImageProps } from '../image';
import { TNode, SizeEnum, Styles } from '../common';

export interface TdEmptyProps {
  /**
   * 操作按钮
   */
  action?: TNode;
  /**
   * 描述文字
   */
  description?: string | TNode;
  /**
   * 组件图片，可以完全自定义内容。值类型为字符串时，表示图片地址；值类型为对象时，则表示透传全部属性到图片组件，示例：`<Empty image={{ src: '', shape: 'round' }} />`
   */
  image?: string | ImageProps | TNode;
  /**
   * 透传图片样式表
   */
  imageStyle?: Styles;
  /**
   * 空状态的尺寸，默认为 `medium`
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 错误标题
   */
  title?: string | TNode;
  /**
   * 组件类型，如：空数据/成功/失败/网络错误/建设中
   * @default empty
   */
  type?: 'empty' | 'success' | 'fail' | 'network-error' | 'maintenance';
}
