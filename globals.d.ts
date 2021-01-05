declare const __VERSION__: string;

declare type TNodeReturnValue = import('vue/types/vnode').ScopedSlotReturnValue;
declare type TNode<T = any> = (h: Vue.CreateElement, props?: T) => TNodeReturnValue;
declare type JsxNode = TNodeReturnValue;

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

declare interface Styles { [css: string]: string | number }

declare type CSSSelector = string;

declare type AttachNode = CSSSelector | (() => (Window | HTMLDocument | HTMLElement));
