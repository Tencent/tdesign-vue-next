/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdLayoutProps } from './type';
import { PropType } from 'vue';

export default {
  /** 【开发中】布局方向 */
  direction: {
    type: String as PropType<TdLayoutProps['direction']>,
    validator(val: TdLayoutProps['direction']): boolean {
      if (!val) return true;
      return ['vertical', 'horizontal'].includes(val);
    },
  },
};
