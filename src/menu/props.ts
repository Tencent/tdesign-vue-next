/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TdMenuProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否收起菜单 */
  collapsed: Boolean,
  /** 展开的子菜单集合 */
  expanded: {
    type: Array as PropType<TdMenuProps['expanded']>,
  },
  /** 展开的子菜单集合，非受控属性 */
  defaultExpanded: {
    type: Array as PropType<TdMenuProps['defaultExpanded']>,
  },
  /** 同级别互斥展开 */
  expandMutex: Boolean,
  /** 二级菜单展开方式，平铺展开和浮层展开 */
  expandType: {
    type: String as PropType<TdMenuProps['expandType']>,
    default: 'normal' as TdMenuProps['expandType'],
    validator(val: TdMenuProps['expandType']): boolean {
      return ['normal', 'popup'].includes(val);
    },
  },
  /** 站点 LOGO */
  logo: {
    type: Function as PropType<TdMenuProps['logo']>,
  },
  /** 导航操作区域 */
  operations: {
    type: Function as PropType<TdMenuProps['operations']>,
  },
  /** 菜单风格 */
  theme: {
    type: String as PropType<TdMenuProps['theme']>,
    default: 'light' as TdMenuProps['theme'],
    validator(val: TdMenuProps['theme']): boolean {
      return ['light', 'dark'].includes(val);
    },
  },
  /** 激活菜单项 */
  value: {
    type: [String, Number] as PropType<TdMenuProps['value']>,
  },
  /** 激活菜单项，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdMenuProps['defaultValue']>,
  },
  /** 菜单宽度。值类型为数组时，分别表示菜单展开和折叠的宽度。[ 展开时的宽度, 折叠时的宽度 ]，示例：['200px', '80px'] */
  width: {
    type: [String, Number, Array] as PropType<TdMenuProps['width']>,
    default: '232px',
  },
  /** 激活菜单项发生变化时触发 */
  onChange: Function as PropType<TdMenuProps['onChange']>,
  /** 侧边栏导航展开/收起发生变化时触发 */
  onCollapsed: Function as PropType<TdMenuProps['onCollapsed']>,
  /** 展开的菜单项发生变化时触发 */
  onExpand: Function as PropType<TdMenuProps['onExpand']>,
};
