/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { TNode } from '@td/shared/interface';
import type { TdLoadingProps } from '../loading/type';

export interface TdCardProps {
  /**
   * 卡片操作区
   */
  actions?: string | TNode;
  /**
   * 卡片中的用户头像，仅在海报风格的卡片中有效
   */
  avatar?: string | TNode;
  /**
   * 是否有边框
   * @default true
   */
  bordered?: boolean;
  /**
   * 卡片内容
   */
  content?: string | TNode;
  /**
   * 卡片封面图。值类型为字符串，会自动使用 `img` 标签输出封面图；也可以完全最定义封面图
   */
  cover?: string | TNode;
  /**
   * 卡片内容，同 content
   */
  default?: string | TNode;
  /**
   * 卡片描述文案
   */
  description?: string | TNode;
  /**
   * 卡片底部内容，可完全自定义
   */
  footer?: string | TNode;
  /**
   * 卡片顶部内容，优先级高于其他所有元素
   */
  header?: string | TNode;
  /**
   * 头部是否带分割线，仅在有header时有效
   * @default false
   */
  headerBordered?: boolean;
  /**
   * hover时是否有阴影
   * @default false
   */
  hoverShadow?: boolean;
  /**
   * 加载状态，值为 true 会根据不同的布局显示不同的加载状态，值为 false 则表示非加载状态。也可以使用 Skeleton 组件完全自定义加载态呈现内容
   * @default false
   */
  loading?: boolean | TNode;
  /**
   * 透传加载组件(Loading)全部属性
   */
  loadingProps?: TdLoadingProps;
  /**
   * 是否显示卡片阴影，默认不显示
   * @default false
   */
  shadow?: boolean;
  /**
   * 尺寸
   * @default medium
   */
  size?: 'medium' | 'small';
  /**
   * 卡片状态内容，仅在操作区域不在顶部时有效（即 `theme=poster2` ）
   * @default ''
   */
  status?: string;
  /**
   * 卡片副标题
   */
  subtitle?: string | TNode;
  /**
   * 卡片风格：普通风格、海报风格1（操作区域在顶部）、海报风格2（操作区域在底部）
   * @default normal
   */
  theme?: 'normal' | 'poster1' | 'poster2';
  /**
   * 卡片标题
   */
  title?: string | TNode;
}
