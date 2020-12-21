
declare const __VERSION__: string;

declare type TNodeReturnValue = import('vue/types/vnode').ScopedSlotReturnValue;
declare type TNode = (props?: any) => TNodeReturnValue;
declare type JsxNode = TNodeReturnValue;

declare type OptionData = {
  label?: string;
  value?: string | number;
} & { [key: string]: any };

declare type SizeEnum = 'small' | 'medium' | 'large';

declare type HorizontalAlignEnum = 'left' | 'center' | 'right';

declare type VerticalAlignEnum = 'top' | 'middle' | 'bottom';

declare type ClassName = { [className: string]: any } | ClassName[] | string;

declare type CSSSelector = string;

declare type AttachNode = CSSSelector | (() => (Window | HTMLDocument | HTMLElement));
