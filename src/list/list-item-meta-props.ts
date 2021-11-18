/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-07-17 18:09:07
 * */

import { PropType } from 'vue';
import { TdListItemMetaProps } from './type';

export default {
  /** 列表项图片 */
  avatar: {
    type: [String, Function] as PropType<TdListItemMetaProps['avatar']>,
  },
  /** 列表项内容 */
  description: {
    type: [String, Function] as PropType<TdListItemMetaProps['description']>,
  },
  /** 列表项图片 */
  image: {
    type: [String, Function] as PropType<TdListItemMetaProps['image']>,
  },
  /** 列表项标题 */
  title: {
    type: [String, Function] as PropType<TdListItemMetaProps['title']>,
  },
};
