/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { TdMenuItemProps } from '../menu/type';
import { PropType } from 'vue';

export default {
  /** 菜单项内容 */
  content: {
    type: [String, Function] as PropType<TdMenuItemProps['content']>,
  },
  /** 菜单项内容，同 content */
  default: {
    type: [String, Function] as PropType<TdMenuItemProps['default']>,
  },
  /** 是否禁用菜单项展开/收起/跳转等功能 */
  disabled: Boolean,
  /** 跳转链接 */
  href: {
    type: String,
    default: '',
  },
  /** 图标 */
  icon: {
    type: Function as PropType<TdMenuItemProps['icon']>,
  },
  /** 路由跳转是否采用覆盖的方式（覆盖后将没有浏览器历史记录） */
  replace: Boolean,
  /** 路由对象。如果项目存在 Router，则默认使用 Router。 */
  router: {
    type: Object as PropType<TdMenuItemProps['router']>,
  },
  /** 链接或路由跳转方式 */
  target: {
    type: String as PropType<TdMenuItemProps['target']>,
    validator(val: TdMenuItemProps['target']): boolean {
      return ['_blank', '_self', '_parent', '_top'].includes(val);
    },
  },
  /** 路由跳转目标，当且仅当 Router 存在时，该 API 有效 */
  to: {
    type: [String, Object] as PropType<TdMenuItemProps['to']>,
  },
  /** 菜单项唯一标识 */
  value: {
    type: [String, Number] as PropType<TdMenuItemProps['value']>,
  },
};
