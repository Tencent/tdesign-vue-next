/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdGuideStepProps } from '../guide/type';
import { PropType } from 'vue';

export default {
  /** 自定义内容，同 content */
  children: {
    type: [String, Function] as PropType<TdGuideStepProps['children']>,
  },
  /** 用户自定义引导弹框的内容，一旦存在，此时除 `placement`、`offset`和`element` 外，其它属性全部失效） */
  content: {
    type: [String, Function] as PropType<TdGuideStepProps['content']>,
  },
  /** 当前步骤的描述内容 */
  description: {
    type: String,
    default: '',
  },
  /** 高亮的节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'#tdesign' 或 () => document.querySelector('#tdesign') */
  element: {
    type: [String, Function] as PropType<TdGuideStepProps['element']>,
    required: true,
  },
  /**
   * 用户定义高亮框(仅当 mode 为 popup 时生效)
   */
  highlightContent: {
    type: [String, Function] as PropType<TdGuideStepProps['highlightContent']>,
  },
  /** 高亮框的 padding */
  highlightPadding: {
    type: Number,
  },
  /** 当期步骤引导框的类型 */
  mode: {
    type: String as PropType<TdGuideStepProps['mode']>,
    default: 'popup' as TdGuideStepProps['mode'],
    validator(val: TdGuideStepProps['mode']): boolean {
      if (!val) return true;
      return ['popup', 'dialog'].includes(val);
    },
  },
  /** 用于自定义当前引导框的下一步按钮的内容 */
  nextButtonProps: {
    type: Object as PropType<TdGuideStepProps['nextButtonProps']>,
  },
  /** 相对于 placement 的偏移量，示例：[-10, 20] 或 ['10px', '8px'] */
  offset: {
    type: Array as PropType<TdGuideStepProps['offset']>,
  },
  /** 引导框相对于高亮元素出现的位置 */
  placement: {
    type: String,
    default: 'top',
  },
  /** 用于自定义当前引导框的上一步按钮的内容 */
  prevButtonProps: {
    type: Object as PropType<TdGuideStepProps['prevButtonProps']>,
  },
  /** 是否出现遮罩层 */
  showOverlay: {
    type: Boolean,
    default: true,
  },
  /** 用于自定义当前步骤引导框的跳过按钮的内容 */
  skipButtonProps: {
    type: Object as PropType<TdGuideStepProps['skipButtonProps']>,
  },
  /** 覆盖引导框的类名 */
  stepOverlayClass: {
    type: String,
    default: '',
  },
  /** 当前步骤的标题内容 */
  title: {
    type: String,
    default: '',
  },
};
