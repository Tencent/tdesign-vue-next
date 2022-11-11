/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdBreadcrumbItemProps } from '../breadcrumb/type';
import { PropType } from 'vue';

export default {
  /** 子元素 */
  content: {
    type: [String, Function] as PropType<TdBreadcrumbItemProps['content']>,
  },
  /** 子元素，同 content */
  default: {
    type: [String, Function] as PropType<TdBreadcrumbItemProps['default']>,
  },
  /** 是否禁用当前项点击 */
  disabled: Boolean,
  /** 跳转链接 */
  href: {
    type: String,
    default: '',
  },
  /** 面板屑项内的前置图标 */
  icon: {
    type: Function as PropType<TdBreadcrumbItemProps['icon']>,
  },
  /** 最大宽度，超出后会以省略号形式呈现。优先级高于 Breadcrumb 中的 maxItemWidth */
  maxWidth: {
    type: String,
    default: undefined,
  },
  /** 路由跳转是否采用覆盖的方式（覆盖后将没有浏览器历史记录） */
  replace: Boolean,
  /** 路由对象。如果项目存在 Router，则默认使用 Router */
  router: {
    type: Object as PropType<TdBreadcrumbItemProps['router']>,
  },
  /** 链接或路由跳转方式 */
  target: {
    type: String as PropType<TdBreadcrumbItemProps['target']>,
    default: '_self' as TdBreadcrumbItemProps['target'],
    validator(val: TdBreadcrumbItemProps['target']): boolean {
      if (!val) return true;
      return ['_blank', '_self', '_parent', '_top'].includes(val);
    },
  },
  /** 路由跳转目标，当且仅当 Router 存在时，该 API 有效 */
  to: {
    type: [String, Object] as PropType<TdBreadcrumbItemProps['to']>,
  },
};
