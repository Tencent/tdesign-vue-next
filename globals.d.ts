declare const __VERSION__: string;

declare type ClassName = { [className: string]: any } | ClassName[] | string;
declare type JsxNode = import('vue').VNode | import('vue').VNode[] | string | undefined | null | JsxNode[];
