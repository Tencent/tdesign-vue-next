import { TreeProps, TypeTreeState, TypeEventState } from '@td/intel/components/tree/tree-types';
import { getMark, emitEvent } from '../util';
import useTreeAction from './useTreeAction';

// tree 组件一般事件处理
export default function useTreeEvents(state: TypeTreeState) {
  const treeState = state;
  const { props, context } = treeState;
  const { toggleExpanded, toggleActived, toggleChecked } = useTreeAction(state);

  const handleClick = (evtState: TypeEventState) => {
    const { mouseEvent, event, node } = evtState;
    if (!node || !mouseEvent) return;

    // 用于向内部方法传递事件对象
    treeState.mouseEvent = mouseEvent;

    let shouldExpand = props.expandOnClickNode;
    let shouldActive = !props.disabled && !node.disabled && node.isActivable();

    // 给节点添加属性 trigger="expand,active", ignore="expand,active"
    // 来确认或者屏蔽动作
    ['trigger', 'ignore'].forEach((markName) => {
      const mark = getMark(markName, event.target as HTMLElement, event.currentTarget as HTMLElement);
      const markValue = mark?.value || '';
      if (markValue.indexOf('expand') >= 0) {
        // 路径节点包含了 trigger="expand" ignore="expand"
        if (markName === 'trigger') {
          shouldExpand = true;
        } else if (markName === 'ignore') {
          shouldExpand = false;
        }
      }
      if (markValue.indexOf('active') >= 0) {
        // 路径节点包含了 trigger="active" ignore="active"
        if (markName === 'ignore') {
          shouldActive = false;
        }
      }
    });

    if (shouldExpand) {
      toggleExpanded(node);
    }

    if (shouldActive) {
      toggleActived(node);
    }

    const evtCtx = {
      node: node.getModel(),
      e: mouseEvent,
    };
    emitEvent<Parameters<TreeProps['onClick']>>(props, context, 'click', evtCtx);

    treeState.mouseEvent = null;
  };

  const handleChange = (evtState: TypeEventState, ctx: { e: Event }) => {
    const { disabled } = props;
    const { node } = evtState;
    if (!node || disabled || node.disabled || !node.isCheckable()) {
      return;
    }
    toggleChecked(node, ctx);
  };

  return {
    handleChange,
    handleClick,
  };
}
