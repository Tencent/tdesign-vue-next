import { SizeEnum } from '../common';

export interface TdButtonGroupProps {
  /**
   * 组件尺寸
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 组件风格，依次为默认色、品牌色、危险色、警告色、成功色
   */
  theme?: 'default' | 'primary' | 'danger' | 'warning' | 'success';
  /**
   * 禁用状态
   */
  disabled?: boolean;
}
