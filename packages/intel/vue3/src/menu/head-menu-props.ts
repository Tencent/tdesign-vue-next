/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdHeadMenuProps } from '../menu/type';

export default {
  /** 展开的子菜单集合 */
  expanded: {
    type: Array as PropType<TdHeadMenuProps['expanded']>,
    default: undefined,
  },
  /** 展开的子菜单集合，非受控属性 */
  defaultExpanded: {
    type: Array as PropType<TdHeadMenuProps['defaultExpanded']>,
    default: [],
  },
  /** 二级菜单展开方式，平铺展开和浮层展开 */
  expandType: {
    type: String as PropType<TdHeadMenuProps['expandType']>,
    default: 'normal' as TdHeadMenuProps['expandType'],
    validator(val: TdHeadMenuProps['expandType']): boolean {
      if (!val) {
        return true;
      }
      return ['normal', 'popup'].includes(val);
    },
  },
  /** 站点 LOGO */
  logo: {
    type: Function as PropType<TdHeadMenuProps['logo']>,
  },
  /** 导航操作区域 */
  operations: {
    type: Function as PropType<TdHeadMenuProps['operations']>,
  },
  /** null */
  theme: {
    type: String as PropType<TdHeadMenuProps['theme']>,
    default: 'light' as TdHeadMenuProps['theme'],
    validator(val: TdHeadMenuProps['theme']): boolean {
      if (!val) {
        return true;
      }
      return ['light', 'dark'].includes(val);
    },
  },
  /** 激活菜单项 */
  value: {
    type: [String, Number] as PropType<TdHeadMenuProps['value']>,
    default: undefined as TdHeadMenuProps['value'],
  },
  modelValue: {
    type: [String, Number] as PropType<TdHeadMenuProps['value']>,
    default: undefined as TdHeadMenuProps['value'],
  },
  /** 激活菜单项，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdHeadMenuProps['defaultValue']>,
  },
  /** 激活菜单项发生变化时触发 */
  onChange: Function as PropType<TdHeadMenuProps['onChange']>,
  /** 展开的菜单项发生变化时触发 */
  onExpand: Function as PropType<TdHeadMenuProps['onExpand']>,
};
