/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdCardProps } from './type';
import { PropType } from 'vue';

export default {
  /** 卡片操作区 */
  actions: {
    type: [String, Function] as PropType<TdCardProps['actions']>,
  },
  /** 卡片中的用户头像，仅在海报风格的卡片中有效 */
  avatar: {
    type: [String, Function] as PropType<TdCardProps['avatar']>,
  },
  /** 是否有边框 */
  bordered: {
    type: Boolean,
    default: true,
  },
  /** 卡片内容 */
  content: {
    type: [String, Function] as PropType<TdCardProps['content']>,
  },
  /** 卡片封面图。值类型为字符串，会自动使用 `img` 标签输出封面图；也可以完全最定义封面图 */
  cover: {
    type: [String, Function] as PropType<TdCardProps['cover']>,
  },
  /** 卡片内容，同 content */
  default: {
    type: [String, Function] as PropType<TdCardProps['default']>,
  },
  /** 卡片描述文案 */
  description: {
    type: [String, Function] as PropType<TdCardProps['description']>,
  },
  /** 卡片底部内容，可完全自定义 */
  footer: {
    type: [String, Function] as PropType<TdCardProps['footer']>,
  },
  /** 卡片顶部内容，优先级高于其他所有元素 */
  header: {
    type: [String, Function] as PropType<TdCardProps['header']>,
  },
  /** 头部是否带分割线，仅在有header时有效 */
  headerBordered: Boolean,
  /** hover时是否有阴影 */
  hoverShadow: Boolean,
  /** 加载状态，值为 true 会根据不同的布局显示不同的加载状态，值为 false 则表示非加载状态。也可以使用 Sketon 组件完全自定义加载态呈现内容 */
  loading: {
    type: [Boolean, Function] as PropType<TdCardProps['loading']>,
    default: false,
  },
  /** 是否显示卡片阴影，默认不显示 */
  shadow: Boolean,
  /** 尺寸 */
  size: {
    type: String as PropType<TdCardProps['size']>,
    default: 'medium' as TdCardProps['size'],
    validator(val: TdCardProps['size']): boolean {
      if (!val) return true;
      return ['medium', 'small'].includes(val);
    },
  },
  /** 卡片状态内容，仅在操作区域不在顶部时有效（即 `theme=poster2` ） */
  status: {
    type: String,
    default: '',
  },
  /** 卡片副标题 */
  subtitle: {
    type: [String, Function] as PropType<TdCardProps['subtitle']>,
  },
  /** 卡片风格：普通风格、海报风格1（操作区域在顶部）、海报风格2（操作区域在底部） */
  theme: {
    type: String as PropType<TdCardProps['theme']>,
    default: 'normal' as TdCardProps['theme'],
    validator(val: TdCardProps['theme']): boolean {
      if (!val) return true;
      return ['normal', 'poster1', 'poster2'].includes(val);
    },
  },
  /** 卡片标题 */
  title: {
    type: [String, Function] as PropType<TdCardProps['title']>,
  },
};
