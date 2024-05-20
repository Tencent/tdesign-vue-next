/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdStepsProps } from './type';

export default {
  /** 当前步骤，即整个步骤条进度。默认根据步骤下标判断步骤的完成状态，当前步骤为进行中，当前步骤之前的步骤为已完成，当前步骤之后的步骤为未开始。如果每个步骤没有设置 value，current 值为步骤长度则表示所有步骤已完成。如果每个步骤设置了自定义 value，则 current = 'FINISH' 表示所有状态完成 */
  current: {
    type: [String, Number] as PropType<TdStepsProps['current']>,
  },
  /** 当前步骤，即整个步骤条进度。默认根据步骤下标判断步骤的完成状态，当前步骤为进行中，当前步骤之前的步骤为已完成，当前步骤之后的步骤为未开始。如果每个步骤没有设置 value，current 值为步骤长度则表示所有步骤已完成。如果每个步骤设置了自定义 value，则 current = 'FINISH' 表示所有状态完成，非受控属性 */
  defaultCurrent: {
    type: [String, Number] as PropType<TdStepsProps['defaultCurrent']>,
  },
  /** 步骤条方向，有两种：横向和纵向 */
  layout: {
    type: String as PropType<TdStepsProps['layout']>,
    default: 'horizontal' as TdStepsProps['layout'],
    validator(val: TdStepsProps['layout']): boolean {
      if (!val) {
        return true;
      }
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 步骤条数据列表（作用和 StepItem 效果一样） */
  options: {
    type: Array as PropType<TdStepsProps['options']>,
  },
  /** 只读状态 */
  readonly: Boolean,
  /** 步骤条分割符 */
  separator: {
    type: String as PropType<TdStepsProps['separator']>,
    default: 'line' as TdStepsProps['separator'],
    validator(val: TdStepsProps['separator']): boolean {
      if (!val) {
        return true;
      }
      return ['line', 'dashed', 'arrow'].includes(val);
    },
  },
  /** 步骤条顺序 */
  sequence: {
    type: String as PropType<TdStepsProps['sequence']>,
    default: 'positive' as TdStepsProps['sequence'],
    validator(val: TdStepsProps['sequence']): boolean {
      if (!val) {
        return true;
      }
      return ['positive', 'reverse'].includes(val);
    },
  },
  /** 步骤条风格 */
  theme: {
    type: String as PropType<TdStepsProps['theme']>,
    default: 'default' as TdStepsProps['theme'],
    validator(val: TdStepsProps['theme']): boolean {
      if (!val) {
        return true;
      }
      return ['default', 'dot'].includes(val);
    },
  },
  /** 当前步骤发生变化时触发 */
  onChange: Function as PropType<TdStepsProps['onChange']>,
};
