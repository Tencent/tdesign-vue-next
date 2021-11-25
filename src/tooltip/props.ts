/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { TdTooltipProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否在关闭浮层时销毁浮层 */
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
  /** 用于设置显示几秒之后消失，初始第一次有效 */
  duration: {
    type: Number,
    default: 3000,
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
      return ['default', 'primary', 'success', 'danger', 'warning', 'light'].includes(val);
    },
  },
};
