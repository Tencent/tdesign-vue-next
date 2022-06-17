/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdButtonProps } from '../button/type';
import { PropType } from 'vue';

export default {
  /**
   * 分页组件尺寸
   * @default medium
   */
  size: {
    type: String as PropType<TdButtonProps['size']>,
    default: 'medium' as TdButtonProps['size'],
    validator(val: TdButtonProps['size']): boolean {
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /**
   * 左侧分页器 title
   */
  prevTitle: String,
  /**
   * 中间分页器 title
   */
  currentTitle: String,
  /**
   * 中间分页器 title
   */
  nextTitle: String,
  /**
   * 分页器触发事件
   */
  onJumperClick: Function,
};
