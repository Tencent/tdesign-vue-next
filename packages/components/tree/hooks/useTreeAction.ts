import { usePrefixClass } from '../utils/adapt';
import {
  TreeNodeValue,
  TypeTreeState,
  TypeTargetNode,
  TypeExpandEventContext,
  TypeActiveEventContext,
  TypeChangeEventContext,
} from '../types';
import { getNode, pathMatchClass } from '../utils';

// tree 组件节点状态设置
export default function useTreeAction(state: TypeTreeState) {
  const treeState = state;
  const { store } = treeState;
  const componentName = usePrefixClass('tree').value;

  const [tValue, setTValue] = state.vmValue;
  const [tActived, setTActived] = state.vmActived;
  const [tExpanded, setTExpanded] = state.vmExpanded;

  const setExpanded = (item: TypeTargetNode, isExpanded: boolean): TreeNodeValue[] => {
    const node = getNode(store, item);
    const mouseEvent = treeState.mouseEvent as MouseEvent;
    const evtCtx: TypeExpandEventContext = {
      node: node.getModel(),
      e: mouseEvent,
      trigger: 'setItem',
    };
    if (mouseEvent) {
      evtCtx.trigger = 'node-click';
      const target = mouseEvent.target as HTMLElement;
      const currentTarget = mouseEvent.currentTarget as HTMLElement;
      if (pathMatchClass(`${componentName}__icon`, target, currentTarget)) {
        evtCtx.trigger = 'icon-click';
      }
    }
    const expanded = node.setExpanded(isExpanded, {
      directly: true,
    });
    setTExpanded(expanded, evtCtx);
    if (evtCtx.trigger !== 'setItem') {
      store.replaceExpanded((tExpanded.value || []) as TreeNodeValue[]);
    }
    return expanded;
  };

  const toggleExpanded = (item: TypeTargetNode): TreeNodeValue[] => {
    const node = getNode(store, item);

    if (!node.children) return;

    return setExpanded(node, !node.isExpanded());
  };

  const setActived = (item: TypeTargetNode, isActived: boolean) => {
    const node = getNode(store, item);
    const mouseEvent = treeState.mouseEvent as MouseEvent;
    const evtCtx: TypeActiveEventContext = {
      node: node.getModel(),
      e: mouseEvent,
      trigger: 'setItem',
    };
    if (mouseEvent) {
      evtCtx.trigger = 'node-click';
    }
    const actived = node.setActived(isActived, {
      isAction: evtCtx.trigger === 'node-click',
      directly: true,
    });
    setTActived(actived, evtCtx);
    if (evtCtx.trigger !== 'setItem') {
      store.replaceActived((tActived.value || []) as TreeNodeValue[]);
    }
    return actived;
  };

  const toggleActived = (item: TypeTargetNode): TreeNodeValue[] => {
    const node = getNode(store, item);
    return setActived(node, !node.isActived());
  };

  const setChecked = (item: TypeTargetNode, isChecked: boolean, ctx: { e: Event }): TreeNodeValue[] => {
    const node = getNode(store, item);
    const mouseEvent = ctx?.e as MouseEvent;
    const evtCtx: TypeChangeEventContext = {
      node: node.getModel(),
      e: mouseEvent,
      trigger: 'setItem',
    };
    if (mouseEvent) {
      evtCtx.trigger = 'node-click';
    }
    const checked = node.setChecked(isChecked, {
      isAction: evtCtx.trigger === 'node-click',
      directly: true,
    });
    setTValue(checked, evtCtx);
    // 这是针对受控执行的操作，如果 props.value 未变更，则执行还原操作
    if (evtCtx.trigger !== 'setItem') {
      store.replaceChecked((tValue.value || []) as TreeNodeValue[]);
    }
    return checked;
  };

  const toggleChecked = (item: TypeTargetNode, ctx: { e: Event }): TreeNodeValue[] => {
    const node = getNode(store, item);
    if (node.isIndeterminate()) {
      const expectState = node.hasEnableUnCheckedChild();
      return setChecked(node, expectState, ctx);
    }
    return setChecked(node, !node.isChecked(), ctx);
  };

  return {
    setExpanded,
    toggleExpanded,
    setActived,
    toggleActived,
    setChecked,
    toggleChecked,
  };
}
