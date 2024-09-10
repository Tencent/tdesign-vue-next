/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTextProps } from '../typography/type';
import { PropType } from 'vue';

export default {
  /** 是否添加代码样式 */
  code: Boolean,
  /** 文本内容 */
  content: {
    type: [String, Function] as PropType<TdTextProps['content']>,
  },
  /** 是否可复制，可通过配置参数自定义复制操作的具体功能和样式 */
  copyable: {
    type: [Boolean, Object] as PropType<TdTextProps['copyable']>,
    default: false as TdTextProps['copyable'],
  },
  /** 文本内容 */
  default: {
    type: [String, Function] as PropType<TdTextProps['default']>,
  },
  /** 是否添加删除线样式 */
  delete: Boolean,
  /** 是否添加不可用样式 */
  disabled: Boolean,
  /** 是否省略展示，可通过配置参数自定义省略操作的具体功能和样式 */
  ellipsis: {
    type: [Boolean, Object] as PropType<TdTextProps['ellipsis']>,
    default: false as TdTextProps['ellipsis'],
  },
  /** 文本是否为斜体 */
  italic: Boolean,
  /** 是否添加键盘样式 */
  keyboard: Boolean,
  /** 是否添加标记样式，默认为黄色，可通过配置颜色修改标记样式，如#0052D9 */
  mark: {
    type: [String, Boolean] as PropType<TdTextProps['mark']>,
    default: false as TdTextProps['mark'],
  },
  /** 文本是否加粗 */
  strong: Boolean,
  /** 主题 */
  theme: {
    type: String as PropType<TdTextProps['theme']>,
    validator(val: TdTextProps['theme']): boolean {
      if (!val) return true;
      return ['primary', 'secondary', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 是否添加下划线样式 */
  underline: Boolean,
};
