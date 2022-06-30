/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { SizeEnum } from '../common';

export interface TdJumperProps {
  /**
   * 按钮禁用配置
   */
  disabled?: boolean | JumperDisabledConfig;
  /**
   * 按钮方向
   * @default horizontal
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * 是否展示当前按钮
   * @default true
   */
  showCurrent?: boolean;
  /**
   * 按钮尺寸
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 提示文案配置，值为 `true` 显示默认文案；值为 `false` 不显示提示文案；值类型为对象则单独配置文案内容
   */
  tips?: boolean | JumperTipsConfig;
  /**
   * 按钮形式
   * @default text
   */
  variant?: 'text' | 'outline';
  /**
   * 按钮点击事件回调
   */
  onChange?: (context: { e: MouseEvent; trigger: JumperTrigger }) => void;
}

export type JumperDisabledConfig = { prev?: boolean; current?: boolean; next?: boolean };

export type JumperTipsConfig = { prev?: string; current?: string; next?: string };

export type JumperTrigger = 'prev' | 'current' | 'next';
