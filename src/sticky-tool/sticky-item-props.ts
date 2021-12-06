/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdStickyItemProps } from '../sticky-tool/type';
import { PropType } from 'vue';

export default {
  /** 图标 */
  icon: {
    type: [String, Function] as PropType<TdStickyItemProps['icon']>,
  },
  /** 名称 */
  label: {
    type: [String, Function] as PropType<TdStickyItemProps['label']>,
  },
  /** 浮层内容 */
  popup: {
    type: [String, Function] as PropType<TdStickyItemProps['popup']>,
  },
  /** 透传浮层组件全部属性 */
  popupProps: {
    type: Object as PropType<TdStickyItemProps['popupProps']>,
  },
  /** 触发浮层显示的方式 */
  trigger: {
    type: String as PropType<TdStickyItemProps['trigger']>,
    default: 'hover' as TdStickyItemProps['trigger'],
    validator(val: TdStickyItemProps['trigger']): boolean {
      return ['hover', 'click'].includes(val);
    },
  },
};
