/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdSubmenuProps } from '../menu/type';
import { PropType } from 'vue';

export default {
  /** 菜单项内容 */
  content: {
    type: [String, Function] as PropType<TdSubmenuProps['content']>,
  },
  /** 菜单项内容，同 content */
  default: {
    type: [String, Function] as PropType<TdSubmenuProps['default']>,
  },
  /** 是否禁用菜单项展开/收起/跳转等功能 */
  disabled: Boolean,
  /** 菜单项图标 */
  icon: {
    type: Function as PropType<TdSubmenuProps['icon']>,
  },
  /** 二级菜单内容 */
  title: {
    type: [String, Function] as PropType<TdSubmenuProps['title']>,
  },
  /** 菜单项唯一标识 */
  value: {
    type: [String, Number] as PropType<TdSubmenuProps['value']>,
  },
};
