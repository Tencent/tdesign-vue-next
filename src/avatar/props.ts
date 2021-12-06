/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdAvatarProps } from './type';
import { PropType } from 'vue';

export default {
  /** 头像替换文本 */
  alt: {
    type: String,
    default: '',
  },
  /** 加载失败时隐藏图片 */
  hideOnLoadFailed: Boolean,
  /** 图标 */
  icon: {
    type: Function as PropType<TdAvatarProps['icon']>,
  },
  /** 图片地址 */
  image: {
    type: String,
    default: '',
  },
  /** 形状 */
  shape: {
    type: String as PropType<TdAvatarProps['shape']>,
    default: 'circle' as TdAvatarProps['shape'],
    validator(val: TdAvatarProps['shape']): boolean {
      return ['circle', 'round'].includes(val);
    },
  },
  /** 尺寸，示例值：small/medium/large/24px/38px 等，默认为 large */
  size: {
    type: String,
    default: '',
  },
  /** 图片加载失败时触发 */
  onError: Function as PropType<TdAvatarProps['onError']>,
};
