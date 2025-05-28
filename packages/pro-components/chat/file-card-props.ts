/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { PropType } from 'vue';
import { Styles } from '../common';

export default {
  /** 类名 */
  class: {
    type: String,
    default: '',
  },
  item: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  removable: {
    type: Boolean,
    default: false,
  },
  cardType: {
    type: String,
    default: 'file',
  },
  imageViewer: {
    type: Boolean,
    default: false,
  },
  style: {
    type: Object as PropType<Styles>,
    default: () => ({}),
  },
};
