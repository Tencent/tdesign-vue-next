/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { TdIconSVGProps } from '../icon/type';
import { PropType } from 'vue';

export default {
  /** 是否加载组件库内置图标 */
  loadDefaultIcons: {
    type: Boolean,
    default: true,
  },
  /** 图标名称 */
  name: {
    type: String,
    default: '',
    required: true,
  },
  /** 图标尺寸，支持 'small', 'medium', 'large'，'35px', '3em' 等 */
  size: {
    type: String,
    default: undefined,
  },
  /** 图标地址，地址内容参考[组件内部默认加载图标](https://tdesign.gtimg.com/icon/web/index.js) */
  url: {
    type: [String, Array] as PropType<TdIconSVGProps['url']>,
  },
  /** 点击时触发 */
  onClick: Function as PropType<TdIconSVGProps['onClick']>,
};
