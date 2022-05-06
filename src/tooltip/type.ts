/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { PopupPlacement } from '../popup';
import { PopupProps } from '../popup';

export interface TdTooltipProps extends Omit<PopupProps, 'placement'> {
  /**
   * 【议案讨论中】延迟出现提示，用于异步加载提示信息需要延迟显示的业务场景下
   */
  delay?: number;
  /**
   * 是否在关闭浮层时销毁浮层
   * @default true
   */
  destroyOnClose?: boolean;
  /**
   * 用于设置提示默认显示多长时间之后消失，初始第一次有效，单位：毫秒
   */
  duration?: number;
  /**
   * 浮层出现位置
   * @default top
   */
  placement?: 'mouse' | PopupPlacement;
  /**
   * 是否显示浮层箭头
   * @default true
   */
  showArrow?: boolean;
  /**
   * 文字提示风格
   * @default default
   */
  theme?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'light';
}
