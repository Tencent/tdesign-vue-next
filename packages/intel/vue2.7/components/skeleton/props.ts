/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-26 15:04:09
 */

import type { PropType } from 'vue';
import type { TdSkeletonProps } from './type';

export default {
  /** 动画效果，有「渐变加载动画」和「闪烁加载动画」两种。值为空则表示没有动画 */
  animation: {
    type: String as PropType<TdSkeletonProps['animation']>,
    validator(val: TdSkeletonProps['animation']): boolean {
      return ['gradient', 'flashed'].includes(val);
    },
  },
  /** 是否为加载状态，如果是则显示骨架图，如果不是则显示加载完成的内容 */
  loading: {
    type: Boolean,
    default: true,
  },
  /** 高级设置，用于自定义行列数量、宽度高度、间距等。【示例一】，`[1, 1, 2]` 表示输出三行骨架图，第一行一列，第二行一列，第三行两列。【示例二】，`[1, 1, { width: '100px' }]` 表示自定义第三行的宽度为 `100px`。【示例三】，`[1, 2, [{ width, height }, { width, height, marginLeft }]]` 表示第三行有两列，且自定义宽度、高度、尺寸（圆形或方形使用）、间距、内容等 */
  rowCol: {
    type: Array as PropType<TdSkeletonProps['rowCol']>,
  },
  /** 快捷定义骨架图风格，有基础、头像组合等，具体参看代码示例 */
  theme: {
    type: String as PropType<TdSkeletonProps['theme']>,
    validator(val: TdSkeletonProps['theme']): boolean {
      return ['text', 'avatar', 'paragraph', 'avatar-text', 'tab', 'article'].includes(val);
    },
  },
  /** 延迟显示加载效果的事件，用于放置请求速度过快引起的家在闪烁，单位：毫秒 */
  delay: {
    type: Number,
    default: 0,
  },
};
