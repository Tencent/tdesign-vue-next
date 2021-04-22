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
