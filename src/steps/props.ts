/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-11-24 22:11:55
 * */

import { TdStepsProps } from './type';
import { PropType } from 'vue';

export default {
  /** 当前步骤 */
  current: {
    type: [String, Number] as PropType<TdStepsProps['current']>,
  },
  /** 当前步骤，非受控属性 */
  defaultCurrent: {
    type: [String, Number] as PropType<TdStepsProps['defaultCurrent']>,
  },
  /** 已废弃。步骤条方向，有两种：横向和纵向 */
  direction: {
    type: String as PropType<TdStepsProps['direction']>,
  },
  /** 步骤条方向，有两种：横向和纵向 */
  layout: {
    type: String as PropType<TdStepsProps['layout']>,
    validator(val: TdStepsProps['layout']): boolean {
      return ['horizontal', 'vertical'].includes(val);
    },
    default: 'horizontal' as TdStepsProps['layout'],
  },
  /** 步骤条数据列表（作用和 StepItem 效果一样） */
  options: {
    type: Array as PropType<TdStepsProps['options']>,
  },
  /** 步骤条顺序，纵向步骤有效（direction = horizontal） */
  sequence: {
    type: String as PropType<TdStepsProps['sequence']>,
    default: 'positive' as TdStepsProps['sequence'],
    validator(val: TdStepsProps['sequence']): boolean {
      return ['positive', 'reverse'].includes(val);
    },
  },
  /** 步骤条风格 */
  theme: {
    type: String as PropType<TdStepsProps['theme']>,
    default: 'default' as TdStepsProps['theme'],
    validator(val: TdStepsProps['theme']): boolean {
      return ['default', 'dot'].includes(val);
    },
  },
  /** 当前步骤发生变化时触发 */
  onChange: Function as PropType<TdStepsProps['onChange']>,
};
