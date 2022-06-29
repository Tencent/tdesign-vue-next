/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdJumperProps } from './type';
import { PropType } from 'vue';

export default {
  /** 按钮禁用配置 */
  disabled: {
    type: [Boolean, Object] as PropType<TdJumperProps['disabled']>,
  },
  /** 按钮方向 */
  layout: {
    type: String as PropType<TdJumperProps['layout']>,
    default: 'horizontal' as TdJumperProps['layout'],
    validator(val: TdJumperProps['layout']): boolean {
      if (!val) return true;
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 是否展示当前按钮 */
  showCurrent: {
    type: Boolean,
    default: true,
  },
  /** 按钮尺寸 */
  size: {
    type: String as PropType<TdJumperProps['size']>,
    default: 'medium' as TdJumperProps['size'],
    validator(val: TdJumperProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 提示文案配置，值为 `true` 显示默认文案；值为 `false` 不显示提示文案；值类型为对象则单独配置文案内容 */
  tips: {
    type: Object as PropType<TdJumperProps['tips']>,
  },
  /** 按钮形式 */
  variant: {
    type: String as PropType<TdJumperProps['variant']>,
    default: 'text' as TdJumperProps['variant'],
    validator(val: TdJumperProps['variant']): boolean {
      if (!val) return true;
      return ['text', 'outline'].includes(val);
    },
  },
  /** 按钮点击事件回调 */
  onChange: Function as PropType<TdJumperProps['onChange']>,
};
