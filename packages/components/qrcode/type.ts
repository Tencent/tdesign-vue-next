/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdQRCodeProps {
  /**
   * 二维码背景颜色
   * @default ''
   */
  bgColor?: string;
  /**
   * 是否有边框
   * @default false
   */
  borderless?: boolean;
  /**
   * 二维码颜色
   * @default ''
   */
  color?: string;
  /**
   * 二维码中图片的地址
   * @default ''
   */
  icon?: string;
  /**
   * 二维码中图片的大小
   * @default 40
   */
  iconSize?: number | { width: number; height: number };
  /**
   * 二维码纠错等级
   * @default M
   */
  level?: 'L' | 'M' | 'Q' | 'H';
  /**
   * 二维码大小
   * @default 160
   */
  size?: number;
  /**
   * 二维码状态
   * @default active
   */
  status?: QRStatus;
  /**
   * 自定义状态渲染器
   */
  statusRender?: TNode<StatusRenderInfo>;
  /**
   * 渲染类型
   * @default canvas
   */
  type?: 'canvas' | 'svg';
  /**
   * 扫描后的文本
   * @default ''
   */
  value?: string;
  /**
   * 点击"点击刷新"的回调
   */
  onRefresh?: () => void;
}

export type QRStatus = 'active' | 'expired' | 'loading' | 'scanned';

export type StatusRenderInfo = { status: QRStatus; onRefresh?: () => void };
