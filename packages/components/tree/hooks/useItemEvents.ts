import { TypeCheckboxProps, usePrefixClass } from '../utils/adapt';
import { TypeEventState, TypeTreeItemState } from '../types';
// 这里封装 tree-item 的一般事件
// 拖动事件，虚拟滚动事件不要安排到这里
export default function useItemEvents(state: TypeTreeItemState) {
  const { context } = state;
  const classPrefix = usePrefixClass().value;

  const handleChange: TypeCheckboxProps['onChange'] = (_, ctx) => {
    const { node } = state;
    const event = new Event('change');
    const evtContext: TypeEventState = {
      event,
      node,
    };
    context.emit('change', evtContext, ctx);
  };

  let clicked = false;

  const handleClick = (evt: MouseEvent) => {
    const { node, treeScope } = state;
    const { treeProps = {} } = treeScope;
    const { expandOnClickNode } = treeProps;
    const srcTarget = evt.target as HTMLElement;
    const isBranchTrigger =
      node.children &&
      expandOnClickNode &&
      (srcTarget.className === `${classPrefix}-checkbox__input` || srcTarget.tagName.toLowerCase() === 'input');

    // checkbox 上也有 emit click 事件
    // 用这个逻辑避免重复的 click 事件被触发
    if (clicked || isBranchTrigger) return;
    clicked = true;
    // 为保持事件响应敏捷，立即还原 clicked 状态
    setTimeout(() => {
      clicked = false;
    });

    // 处理expandOnClickNode时与checkbox的选中的逻辑冲突
    if (expandOnClickNode && node.children && srcTarget.className?.indexOf?.(`${classPrefix}-tree__label`) !== -1)
      evt.preventDefault();

    const evtContext: TypeEventState = {
      mouseEvent: evt,
      event: evt,
      node,
      path: node.getPath(),
    };
    context.emit('click', evtContext);
  };

  return {
    handleChange,
    handleClick,
  };
}
