/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

 import { TdBackTopProps } from './type';
 import { PropType } from 'vue';
 
 export default {
  /** 回到顶部按钮距离底部位置 */
  bottom: {
    type: [String, Number] as PropType<string | number>,
    default: 50
  },
  /** 回到顶部按钮距离右边位置 */
  right: {
    type: [String, Number] as PropType<string | number>,
    default: 30
  },
  /** 触发滚动的对象 */
  target: {
    type: String as PropType<string>,
    default: 'window'
  },
  /** 滚动高度达到此参数值才出现 */
  visibleHeight: {
    type: [String, Number] as PropType<string | number>,
    default: 200
  },
 }