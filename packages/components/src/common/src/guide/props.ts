/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdGuideProps } from './type';
import { PropType } from 'vue';

export default {
  /** 用于自定义渲染计数部分 */
  counter: {
    type: Function as PropType<TdGuideProps['counter']>,
  },
  /** 当前步骤，即整个引导的进度。-1 则不展示，用于需要中断展示的场景 */
  current: {
    type: Number,
    default: undefined,
  },
  modelValue: {
    type: Number,
    default: undefined,
  },
  /** 当前步骤，即整个引导的进度。-1 则不展示，用于需要中断展示的场景，非受控属性 */
  defaultCurrent: {
    type: Number,
  },
  /** 透传 完成 的全部属性，示例：`{ content: '完成', theme: 'primary' }` */
  finishButtonProps: {
    type: Object as PropType<TdGuideProps['finishButtonProps']>,
  },
  /** 是否隐藏计数 */
  hideCounter: Boolean,
  /** 是否隐藏上一步按钮 */
  hidePrev: Boolean,
  /** 是否隐藏跳过按钮 */
  hideSkip: Boolean,
  /** 高亮框的内边距 */
  highlightPadding: {
    type: Number,
    default: 8,
  },
  /** 引导框的类型 */
  mode: {
    type: String as PropType<TdGuideProps['mode']>,
    default: 'popup' as TdGuideProps['mode'],
    validator(val: TdGuideProps['mode']): boolean {
      if (!val) return true;
      return ['popup', 'dialog'].includes(val);
    },
  },
  /** 透传 下一步按钮 的全部属性，示例：{ content: '下一步', theme: 'primary' } */
  nextButtonProps: {
    type: Object as PropType<TdGuideProps['nextButtonProps']>,
  },
  /** 透传 上一步按钮 的全部属性，示例：{ content: '上一步', theme: 'default' } */
  prevButtonProps: {
    type: Object as PropType<TdGuideProps['prevButtonProps']>,
  },
  /** 是否出现遮罩层 */
  showOverlay: {
    type: Boolean,
    default: true,
  },
  /** 透传 跳过按钮 的全部属性，{ content: '跳过', theme: 'default' } */
  skipButtonProps: {
    type: Object as PropType<TdGuideProps['skipButtonProps']>,
  },
  /** 用于定义每个步骤的内容，包括高亮的节点、相对位置和具体的文案内容等。 */
  steps: {
    type: Array as PropType<TdGuideProps['steps']>,
  },
  /** 提示框的层级 */
  zIndex: {
    type: Number,
    default: 999999,
  },
  /** 当前步骤发生变化时触发 */
  onChange: Function as PropType<TdGuideProps['onChange']>,
  /** 点击完成按钮时触发 */
  onFinish: Function as PropType<TdGuideProps['onFinish']>,
  /** 点击下一步时触发 */
  onNextStepClick: Function as PropType<TdGuideProps['onNextStepClick']>,
  /** 点击上一步时触发 */
  onPrevStepClick: Function as PropType<TdGuideProps['onPrevStepClick']>,
  /** 点击跳过按钮时触发 */
  onSkip: Function as PropType<TdGuideProps['onSkip']>,
};
