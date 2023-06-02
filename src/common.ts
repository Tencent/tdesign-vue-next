/** Vue3 特有全局类型 */
type VNode = import('vue').VNode;
export type ScopedSlot = () => SlotReturnValue;
export type SlotReturnValue = VNode | string | boolean | null | undefined | SlotReturnArray;
export type SlotReturnArray = Array<SlotReturnValue>;
export interface TVNode extends VNode {
  name: string;
}
export type TNodeReturnValue = SlotReturnValue;

// 严格执行是否有参数，不允许出现 props?:T
export type TNode<T = undefined> = T extends undefined
  ? (h: typeof import('vue').h) => TNodeReturnValue
  : (h: typeof import('vue').h, props: T) => TNodeReturnValue;

export type AttachNodeReturnValue = HTMLElement | Element | Document;
export type AttachNode = CSSSelector | ((triggerNode?: HTMLElement) => AttachNodeReturnValue);

// 与滚动相关的容器类型，因为 document 上没有 scroll 相关属性, 因此排除 document
export type ScrollContainerElement = Window | HTMLElement;
export type ScrollContainer = (() => ScrollContainerElement) | CSSSelector;

// 组件 TS 类型，暂定 any
export type ComponentType = any;

export type FormResetEvent = Event;
// export type FormSubmitEvent = SubmitEvent; (for higher typescript version)
export type FormSubmitEvent = Event;

export interface Styles {
  [css: string]: string | number;
}

export interface UploadDisplayDragEvents {
  onDrop?: (event: DragEvent) => void;
  onDragenter?: (event: DragEvent) => void;
  onDragover?: (event: DragEvent) => void;
  onDragleave?: (event: DragEvent) => void;
}

export type ImageEvent = Event;

/**
 * 通用全局类型
 * */
export type PlainObject = { [key: string]: any };

export type OptionData = {
  label?: string;
  value?: string | number;
} & PlainObject;

export type TreeOptionData<T = string | number> = {
  children?: Array<TreeOptionData<T>>;
  /** option label content */
  label?: string | TNode;
  /** option search text */
  text?: string;
  /** option value */
  value?: T;
} & PlainObject;

export type SizeEnum = 'small' | 'medium' | 'large';

export type HorizontalAlignEnum = 'left' | 'center' | 'right';

export type VerticalAlignEnum = 'top' | 'middle' | 'bottom';

export type ClassName = { [className: string]: any } | ClassName[] | string;

export type CSSSelector = string;

export interface KeysType {
  value?: string;
  label?: string;
}

export interface HTMLElementAttributes {
  [css: string]: string;
}

export interface TScroll {
  /**
   * 表示除可视区域外，额外渲染的行数，避免快速滚动过程中，新出现的内容来不及渲染从而出现空白
   * @default 20
   */
  bufferSize?: number;
  /**
   * 表示每行内容是否同一个固定高度，仅在 `scroll.type` 为 `virtual` 时有效，该属性设置为 `true` 时，可用于简化虚拟滚动内部计算逻辑，提升性能，此时则需要明确指定 `scroll.rowHeight` 属性的值
   * @default false
   */
  isFixedRowHeight?: boolean;
  /**
   * 行高，不会给元素添加样式高度，仅作为滚动时的行高参考。一般情况不需要设置该属性。如果设置，可尽量将该属性设置为每行平均高度，从而使得滚动过程更加平滑
   */
  rowHeight?: number;
  /**
   * 启动虚拟滚动的阈值。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动
   * @default 100
   */
  threshold?: number;
  /**
   * 滚动加载类型，有两种：懒加载和虚拟滚动。<br />值为 `lazy` ，表示滚动时会进行懒加载，非可视区域内的内容将不会默认渲染，直到该内容可见时，才会进行渲染，并且已渲染的内容滚动到不可见时，不会被销毁；<br />值为`virtual`时，表示会进行虚拟滚动，无论滚动条滚动到哪个位置，同一时刻，仅渲染该可视区域内的内容，当需要展示的数据量较大时，建议开启该特性
   */
  type: 'lazy' | 'virtual';
}

/**
 * @deprecated use TScroll instead
 */
export type InfinityScroll = TScroll;

export interface ScrollToElementParams {
  /** 跳转元素下标 */
  index: number;
  /** 跳转元素距离顶部的距离 */
  top?: number;
  /** 单个元素高度非固定场景下，即 isFixedRowHeight = false。延迟设置元素位置，一般用于依赖不同高度异步渲染等场景，单位：毫秒 */
  time?: number;
  behavior?: 'auto' | 'smooth';
}
