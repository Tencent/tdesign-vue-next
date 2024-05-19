import { onMounted, reactive, TypeCreateElement, usePrefixClass, useLazyLoad, TypeVNode } from '../adapt';
import { TypeTreeItemState } from '@td/intel/components/tree/tree-types';
import useItemEvents from './useItemEvents';
import useRenderIcon from './useRenderIcon';
import useRenderLabel from './useRenderLabel';
import useRenderLine from './useRenderLine';
import useRenderOperations from './useRenderOperations';
import useDraggable from './useDraggable';
import { onUpdated } from '@td/adapter-vue';

export default function useTreeItem(state: TypeTreeItemState) {
  const { treeScope, treeItemRef } = state;
  const { virtualConfig, treeContentRef, scrollProps } = treeScope;
  const classPrefix = usePrefixClass().value;
  const componentName = usePrefixClass('tree').value;

  const { handleClick } = useItemEvents(state);
  const { renderIcon } = useRenderIcon(state);
  const { renderLabel } = useRenderLabel(state);
  const { renderLine } = useRenderLine(state);
  const { renderOperations } = useRenderOperations(state);
  const { dragStates, handleDragStart, handleDragEnd, handleDragOver, handleDragLeave, handleDrop } =
    useDraggable(state);

  const { hasLazyLoadHolder, tRowHeight } = useLazyLoad(
    treeContentRef,
    treeItemRef,
    reactive({ ...scrollProps?.value }),
  );

  function tryNotifyVirtualScrollRowUpdate() {
    const { node } = state;
    const isVirtual = virtualConfig?.isVirtualScroll.value;
    if (isVirtual) {
      // mounted 了，但是有可能样式没有计算完毕，此时获取的 row height 会有坑，延迟一点点再触发虚拟滚动的 mounted 回调，确保获取到正确的渲染高度
      const timer = setTimeout(() => {
        virtualConfig.handleRowMounted({
          ref: treeItemRef,
          data: node,
        });
        clearTimeout(timer);
      }, 100);
    }
  }

  onMounted(() => {
    tryNotifyVirtualScrollRowUpdate();
  });

  // 有可能因为 row-key 带来组件复用，这时候通过 update 进行更新
  onUpdated(() => {
    tryNotifyVirtualScrollRowUpdate();
  });

  // 节点隐藏用 class 切换，不要写在 js 中
  const getItemStyles = (): string => {
    const { node } = state;
    const { level } = node;
    // 原本想在这里计算 --hscale
    // 实际操作中发现 scrollHeight 在动画执行到一半的时候取得了错误的值
    // 导致 hscale 值获取错误
    // 暂无合适的方案，先搁置 hscale 自动计算策略
    const levelStyle = `--level: ${level};`;
    const strStyle = `${levelStyle}`;
    return strStyle;
  };

  const getItemClassList = () => {
    const { node } = state;
    const { isDragOver, isDragging, dropPosition } = dragStates;
    const list = [];
    list.push(`${componentName}__item`);
    list.push({
      [`${componentName}__item--open`]: node.expanded,
      [`${classPrefix}-is-active`]: node.isActivable() ? node.actived : false,
      [`${classPrefix}-is-disabled`]: node.isDisabled(),
    });
    list.push({
      [`${componentName}__item--draggable`]: node.isDraggable(),
    });
    if (node.visible) {
      list.push(`${componentName}__item--visible`);
    } else {
      list.push(`${componentName}__item--hidden`);
    }
    if (node.vmIsLocked) {
      list.push(`${componentName}__item--locked`);
    }
    if (node.vmIsRest) {
      list.push(`${componentName}__item--matched`);
    }
    // 拖拽过程样式相关classList
    list.push({
      [`${componentName}__item--dragging`]: isDragging,
      [`${componentName}__item--tip-top`]: isDragOver && dropPosition < 0,
      [`${componentName}__item--tip-bottom`]: isDragOver && dropPosition > 0,
      [`${componentName}__item--tip-highlight`]: !isDragging && isDragOver && dropPosition === 0,
    });
    return list;
  };

  const renderItem = (h: TypeCreateElement) => {
    const itemNodes: TypeVNode[] = [];
    // 第一步是渲染图标
    const iconNode = renderIcon(h);
    // 渲染连线排在渲染图标之后，是为了确认图标是否存在
    const lineNode = renderLine(h);
    if (lineNode) {
      itemNodes.push(lineNode);
    }
    if (iconNode) {
      itemNodes.push(iconNode);
    }
    const labelNode = renderLabel(h);
    if (labelNode) {
      itemNodes.push(labelNode);
    }
    const opNode = renderOperations(h);
    if (opNode) {
      itemNodes.push(opNode);
    }
    return itemNodes;
  };

  const renderItemNode = (h: TypeCreateElement) => {
    const { node, props } = state;
    if (!node) return null;

    const { level, value } = node;
    const styles = getItemStyles();
    const classList = getItemClassList();

    // 这里的代码用于 vue2 组件触发节点更新
    // 即使是新增的属性，调用 node.setData 也会触发节点更新
    const treeState = state;
    treeState.stateId = props.stateId;

    const itemNode = (
      <div
        ref="treeItemRef"
        class={classList}
        data-value={value}
        data-level={level}
        style={styles}
        onClick={(evt: MouseEvent) => handleClick(evt)}
        draggable={node.isDraggable()}
        onDragstart={(evt: DragEvent) => handleDragStart(evt)}
        onDragend={(evt: DragEvent) => handleDragEnd(evt)}
        onDragover={(evt: DragEvent) => handleDragOver(evt)}
        onDragleave={(evt: DragEvent) => handleDragLeave(evt)}
        onDrop={(evt: DragEvent) => handleDrop(evt)}
      >
        {hasLazyLoadHolder.value ? [<div />] : renderItem(h)}
      </div>
    );
    return itemNode;
  };

  return {
    hasLazyLoadHolder,
    tRowHeight,
    renderItemNode,
  };
}
