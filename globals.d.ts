declare const __VERSION__: string;

declare type JsxNode = import('vue').VNode | import('vue').VNode[] | string | undefined | null | JsxNode[];
declare type TNode = () => import('vue').VNode | Element;


declare type TdVueNode = string | number | boolean | undefined | Vue.VNode | Vue.VNode[] | TdVueNode[];

declare type OptionData = {
  label?: string;
  value?: string | number;
} & { [key: string]: any };

declare type SizeEnum = 'small' | 'medium' | 'large';

declare type HorizontalAlignEnum = 'left' | 'center' | 'right';

declare type VerticalAlignEnum = 'top' | 'middle' | 'bottom';

declare type ClassName = { [className: string]: any } | ClassName[] | string;

declare type CSSSelector = string;

declare type AttachNode = CSSSelector | (() => (Window | HTMLDocument | Element));
