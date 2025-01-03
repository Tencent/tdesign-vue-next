/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { AttachNode, TNode } from '../common';

export interface TdImageViewerProps {
  /**
   * 制定挂载节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body
   * @default 'body'
   */
  attach?: AttachNode;
  /**
   * 是否展示关闭按钮，值为 `true` 显示默认关闭按钮；值为 `false` 则不显示关闭按钮；也可以完全自定义关闭按钮
   * @default true
   */
  closeBtn?: boolean | TNode;
  /**
   * 按下 ESC 时是否触发图片预览器关闭事件
   * @default true
   */
  closeOnEscKeydown?: boolean;
  /**
   * 是否在点击遮罩层时，触发预览关闭
   */
  closeOnOverlay?: boolean;
  /**
   * 是否允许拖拽调整位置。`mode=modal` 时，默认不允许拖拽；`mode=modeless` 时，默认允许拖拽
   */
  draggable?: boolean;
  /**
   *  图片缩放相关配置。`imageScale.max` 缩放的最大比例；`imageScale.min` 缩放的最小比例；`imageScale.step` 缩放的步长速度; `imageScale.defaultScale` 默认的缩放比例
   */
  imageScale?: ImageScale;
  /**
   * 图片数组。`mainImage` 表示主图，必传；`thumbnail` 表示缩略图，如果不存在，则使用主图显示；`download` 是否允许下载图片，默认允许下载。示例: `['img_url_1', 'img_url_2']`，`[{ thumbnail: 'small_image_url', mainImage: 'big_image_url', download: false }]`
   * @default []
   */
  images?: Array<string | File | ImageInfo>;
  /**
   * 当前预览图片所在的下标
   * @default 0
   */
  index?: number;
  /**
   * 当前预览图片所在的下标，非受控属性
   * @default 0
   */
  defaultIndex?: number;
  /**
   * 模态预览（modal）和非模态预览（modeless)
   * @default modal
   */
  mode?: 'modal' | 'modeless';
  /**
   * 切换预览图片的左图标，可自定义
   * @default true
   */
  navigationArrow?: boolean | TNode;
  /**
   * 是否显示遮罩层。`mode=modal` 时，默认显示；`mode=modeless` 时，默认不显示
   */
  showOverlay?: boolean;
  /**
   * 预览标题
   */
  title?: string | TNode;
  /**
   * 触发图片预览的元素，可能是一个预览按钮，可能是一张缩略图，完全自定义
   */
  trigger?: TNode | TNode<{ open: () => void }>;
  /**
   * 限制预览器缩放的最小宽度和最小高度，仅 `mode=modeless` 时有效
   */
  viewerScale?: ImageViewerScale;
  /**
   * 隐藏/显示预览
   * @default false
   */
  visible?: boolean;
  /**
   * 隐藏/显示预览，非受控属性
   * @default false
   */
  defaultVisible?: boolean;
  /**
   * 隐藏/显示预览
   * @default false
   */
  modelValue?: boolean;
  /**
   * 层级，默认为 2000
   */
  zIndex?: number;
  /**
   * 关闭时触发，事件参数包含触发关闭的来源：关闭按钮、遮罩层、ESC 键
   */
  onClose?: (context: { trigger: 'close-btn' | 'overlay' | 'esc'; e: MouseEvent | KeyboardEvent }) => void;
  /**
   * 预览图片切换时触发，`context.prev` 切换到上一张图片，`context.next` 切换到下一张图片
   */
  onIndexChange?: (index: number, context: { trigger: 'prev' | 'next' | 'current' }) => void;
}

export interface ImageScale {
  max: number;
  min: number;
  step: number;
  defaultScale?: number;
}

export interface ImageInfo {
  mainImage: string | File;
  thumbnail?: string | File;
  download?: boolean;
  isSvg?: boolean;
  /**
   * 预览下载时的文件名
   * @default 从URL中获取文件名
   */
  name?: string;
}

export interface ImageViewerScale {
  minWidth: number;
  minHeight: number;
}
