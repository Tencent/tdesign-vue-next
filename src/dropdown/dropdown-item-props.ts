/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TdDropdownItemProps } from '../dropdown/type';
import { PropType } from 'vue';

export default {
  /** 是否高亮当前操作项 */
  active: Boolean,
  /** 下拉操作项内容 */
  content: {
    type: [String, Function] as PropType<TdDropdownItemProps['content']>,
    default: '',
  },
  /** 是否禁用操作项 */
  disabled: Boolean,
  /** 是否显示操作项之间的分隔线（分隔线默认在下方） */
  divider: Boolean,
  /** 下拉操作项唯一标识 */
  value: {
    type: [String, Number, Object] as PropType<TdDropdownItemProps['value']>,
  },
  /** 点击时触发 */
  onClick: Function as PropType<TdDropdownItemProps['onClick']>,
};
