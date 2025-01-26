/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdEmptyProps } from './type';
import { PropType } from 'vue';

export default {
  /** 操作按钮 */
  action: {
    type: Function as PropType<TdEmptyProps['action']>,
  },
  /** 描述文字 */
  description: {
    type: [String, Function] as PropType<TdEmptyProps['description']>,
  },
  /** 组件图片，可以完全自定义内容。值类型为字符串时，表示图片地址；值类型为对象时，则表示透传全部属性到图片组件，示例：`<Empty image={{ src: '', shape: 'round' }} />` */
  image: {
    type: [String, Function] as PropType<TdEmptyProps['image']>,
  },
  /** 透传图片样式表 */
  imageStyle: {
    type: Object as PropType<TdEmptyProps['imageStyle']>,
  },
  /** 空状态的尺寸，默认为 `medium` */
  size: {
    type: String as PropType<TdEmptyProps['size']>,
    default: 'medium' as TdEmptyProps['size'],
    validator(val: TdEmptyProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 错误标题 */
  title: {
    type: [String, Function] as PropType<TdEmptyProps['title']>,
  },
  /** 组件类型，如：空数据/成功/失败/网络错误/建设中 */
  type: {
    type: String as PropType<TdEmptyProps['type']>,
    default: 'empty' as TdEmptyProps['type'],
    validator(val: TdEmptyProps['type']): boolean {
      if (!val) return true;
      return ['empty', 'success', 'fail', 'network-error', 'maintenance'].includes(val);
    },
  },
};
