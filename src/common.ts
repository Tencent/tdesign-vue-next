type VNode = import('vue').VNode;
export type ScopedSlot = (props: any) => SlotReturnValue;
export type SlotReturnValue = VNode | string | boolean | null | undefined | SlotReturnArray;
export type SlotReturnArray = Array<SlotReturnValue>;
export interface TVNode extends VNode {
  name: string;
}
export type TNodeReturnValue = SlotReturnValue;
export type TNode<T=any> = (h: typeof import('vue').h, props?: T) => import('vue').VNodeChild;
export type JsxNode = SlotReturnValue;

export type ScrollContainerElement = Window | HTMLElement;
export type ScrollContainer = (() => ScrollContainerElement) | CSSSelector;

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

export type AttachNodeReturnValue = HTMLDocument | HTMLElement | Element | Document;
export type AttachNode = CSSSelector | (() => AttachNodeReturnValue);
export type SuperAttachNode = (() => Window) | AttachNode;

export interface Styles {
  [css: string]: string | number;
}
