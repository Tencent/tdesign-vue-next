/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdTooltipProps } from './type';

export default {
  /** 【议案讨论中】延迟出现提示，用于异步加载提示信息需要延迟显示的业务场景下 */
  delay: {
    type: Number,
  },
  /** 是否在关闭浮层时销毁浮层 */
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
  /** 用于设置提示默认显示多长时间之后消失，初始第一次有效，单位：毫秒 */
  duration: {
    type: Number,
  },
  /** 浮层出现位置 */
  placement: {
    type: String as PropType<TdTooltipProps['placement']>,
    default: 'top',
  },
  /** 是否显示浮层箭头 */
  showArrow: {
    type: Boolean,
    default: true,
  },
  /** 文字提示风格 */
  theme: {
    type: String as PropType<TdTooltipProps['theme']>,
    default: 'default' as TdTooltipProps['theme'],
    validator(val: TdTooltipProps['theme']): boolean {
      if (!val) {
        return true;
      }
      return ['default', 'primary', 'success', 'danger', 'warning', 'light'].includes(val);
    },
  },
};
