
/** Vue2 特有全局变量 */

declare const __VERSION__: string;
type VNode = import('vue').VNode;
declare type ScopedSlot = (props: any) => SlotReturnValue;
declare type SlotReturnValue = VNode | string | boolean | null | undefined | SlotReturnArray;
declare type SlotReturnArray = Array<SlotReturnValue>;

declare interface TVNode extends VNode {
  name: string;
}
declare type TNodeReturnValue = SlotReturnValue;
declare type TNode<T = any> = (h: Function, props?: T) => SlotReturnValue;
declare type JsxNode = SlotReturnValue;

declare type AttachNodeReturnValue = HTMLDocument | HTMLElement | Element | Document;
declare type AttachNode = CSSSelector | (() => AttachNodeReturnValue);
declare type SuperAttachNode = (() => Window) | AttachNode;

declare interface Styles {
  [css: string]: string | number;
}

declare module '@tencent/tdesign-vue' {
  export * from 'src';
}

/** 通用全局变量 */

declare type OptionData = {
  label?: string;
  value?: string | number;
} & { [key: string]: any };

declare type TreeOptionData = {
  children?: Array<TreeOptionData>;
} & OptionData;

declare type SizeEnum = 'small' | 'medium' | 'large';

declare type HorizontalAlignEnum = 'left' | 'center' | 'right';

declare type VerticalAlignEnum = 'top' | 'middle' | 'bottom';

declare type ClassName = { [className: string]: any } | ClassName[] | string;

declare type CSSSelector = string;
