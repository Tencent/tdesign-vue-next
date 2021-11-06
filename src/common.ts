/** Vue3 特有全局变量 */
type VNode = import('vue').VNode;
export type ScopedSlot = () => SlotReturnValue;
export type SlotReturnValue = VNode | string | boolean | null | undefined | SlotReturnArray;
export type SlotReturnArray = Array<SlotReturnValue>;
export interface TVNode extends VNode {
  name: string;
}
export type TNodeReturnValue = SlotReturnValue;
export type TNode<T = undefined> = T extends undefined
  ? (h: typeof import('vue').h) => import('vue').VNodeChild
  : (h: typeof import('vue').h, props?: T) => import('vue').VNodeChild;

export type AttachNodeReturnValue = HTMLElement | Element | Document;
export type AttachNode = CSSSelector | (() => AttachNodeReturnValue);

// 与滚动相关的容器类型，因为 document 上没有 scroll 相关属性, 因此排除document
export type ScrollContainerElement = Window | HTMLElement;
export type ScrollContainer = (() => ScrollContainerElement) | CSSSelector;

export type FormResetEvent = Event;
// export type FormSubmitEvent = SubmitEvent; (for higher typescript version)
export type FormSubmitEvent = Event;

export interface Styles {
  [css: string]: string | number;
}
/** 通用全局变量 */

export type OptionData = {
  label?: string;
  value?: string | number;
} & { [key: string]: any };

export type TreeOptionData = {
  children?: Array<TreeOptionData>;
} & OptionData;

export type SizeEnum = 'small' | 'medium' | 'large';

export type HorizontalAlignEnum = 'left' | 'center' | 'right';

export type VerticalAlignEnum = 'top' | 'middle' | 'bottom';

export type ClassName = { [className: string]: any } | ClassName[] | string;

export type CSSSelector = string;
