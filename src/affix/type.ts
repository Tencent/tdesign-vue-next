/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { ScrollContainer } from '../common';

export interface TdAffixProps {
  /**
   * 指定滚动的容器。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body
   * @default () => (() => window)
   */
  container?: ScrollContainer;
  /**
   *  距离容器顶部达到指定距离后触发固定
   * @default 0
   */
  offsetBottom?: number;
  /**
   *  距离容器底部达到指定距离后触发固定
   * @default 0
   */
  offsetTop?: number;
  /**
   * 固钉定位层级，样式默认为 500
   */
  zIndex?: number;
  /**
   * 固定状态发生变化时触发
   */
  onFixedChange?: (affixed: boolean, context: { top: number }) => void;
};
