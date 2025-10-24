import { onUnmounted } from 'vue';

const traversalTabNavs = (tabNavs: HTMLCollection, fn: (tabNav: HTMLDivElement) => void) => {
  Array.from(tabNavs)
    .filter((node): node is HTMLDivElement => node instanceof HTMLDivElement && !!node.getAttribute('draggable'))
    .forEach(fn);
};

const handleTarget = (target: EventTarget, tabNavs: HTMLCollection): HTMLDivElement | undefined => {
  let resultTarget: HTMLDivElement | undefined;

  traversalTabNavs(tabNavs, (itemNode) => {
    if (target instanceof Node && itemNode.contains(target)) {
      resultTarget = itemNode;
    }
  });

  return resultTarget;
};

export function useDragSort(props: any) {
  let navsWrap: HTMLDivElement | null = null;

  // 获取当前正在拖动的tabNav节点
  let dragged: HTMLDivElement;
  const enterTargets: HTMLDivElement[] = [];

  const dragstart = (event: DragEvent) => {
    const target = event.target as HTMLDivElement;
    // const { target } = event;
    // 保存拖动元素的引用(ref.)
    dragged = target;
    // 使其半透明
    target.style.opacity = '0.5';

    // 指定允许的拖拽操作为 move，且兼容 Firefox（需要 setData）
    const dt = event.dataTransfer;
    if (dt) {
      dt.effectAllowed = 'copy';
      try {
        dt.setData('text/plain', '');
      } catch (e) {
        // 某些环境下可能抛错，忽略
      }
    }
  };

  const dragend = (event: DragEvent) => {
    // 重置透明度
    (event.target as HTMLDivElement).style.opacity = '';
  };
  /* 放置目标元素时触发事件 */
  const dragover = (event: DragEvent) => {
    if (!navsWrap) return;
    const target = handleTarget(event.target, navsWrap.children);
    const dt = event.dataTransfer;
    if (dt) {
      // 不可放置目标显示禁止状态
      dt.dropEffect = target?.draggable ? 'copy' : 'none';
    }
    if (target?.draggable) {
      // 阻止默认动作以启用drop
      event.preventDefault();
    }
  };
  // 当可拖动的元素进入可放置的目标时
  const dragenter = (event: DragEvent) => {
    // 高亮目标节点
    const target = handleTarget(event.target, navsWrap.children);
    if (target && target !== dragged && target.draggable) {
      const { firstChild } = target;
      if (firstChild instanceof HTMLElement) {
        const newStyle = { outline: '1px dashed #0052d9' };
        Object.assign(firstChild.style, newStyle);
      }
      // 进入的节点全部记录下来
      if (!enterTargets.includes(target)) {
        enterTargets.push(target);
      }
    }
  };
  // 当拖动元素离开可放置目标节点
  const dragleave = (event: DragEvent) => {
    const target = event.target as HTMLDivElement;
    // 重置其边框
    // const { target } = event;
    for (const enterTarget of enterTargets) {
      // 目标不在需要放入的节点内，则重置边框
      if (!enterTarget.contains(target)) {
        // 记录过的节点全部重置边框
        (enterTarget.firstChild as HTMLDivElement).style.outline = 'none';
      }
    }
  };
  const drop = (event: DragEvent) => {
    // 阻止默认动作（如打开一些元素的链接）
    event.preventDefault();

    traversalTabNavs(navsWrap.children, (tabNav) => {
      const firstChild = tabNav.firstChild as HTMLElement;
      if (firstChild) {
        firstChild.style.outline = 'none';
      }
    });

    // 将拖动的元素到所选择的放置目标节点中
    let target = handleTarget(event.target, navsWrap.children);
    if (target && target.parentNode !== dragged && target.draggable) {
      // 获取拖拽元素index
      const dragIndex = [].indexOf.call(navsWrap.children, dragged);
      // 获取放入元素index
      const targetIndex = [].indexOf.call(navsWrap.children, target);
      if (targetIndex > dragIndex) {
        target = navsWrap.children[targetIndex + 1] as HTMLDivElement | null;
      }

      // 当props.theme === "normal" 会多出一个指示条为第一个dom节点，所以需要减1
      const currentIndex = props.theme === 'card' ? dragIndex : dragIndex - 1;
      const endIndex = props.theme === 'card' ? targetIndex : targetIndex - 1;
      props.onDragSort?.({
        currentIndex,
        current: props.panels[currentIndex].value,
        targetIndex: endIndex,
        target: props.panels[endIndex].value,
      });
    }
  };
  function setNavsWrap(val: HTMLDivElement) {
    navsWrap = val;
    navsWrap.addEventListener('dragstart', dragstart, false);
    navsWrap.addEventListener('dragend', dragend, false);
    navsWrap.addEventListener('dragover', dragover, false);
    navsWrap.addEventListener('dragenter', dragenter, false);
    document.addEventListener('dragleave', dragleave, false);
    document.addEventListener('mousemove', dragleave, false);
    navsWrap.addEventListener('drop', drop, false);
  }

  onUnmounted(() => {
    if (navsWrap) {
      navsWrap.removeEventListener('dragstart', dragstart);
      navsWrap.removeEventListener('dragend', dragend);
      navsWrap.removeEventListener('dragover', dragover);
      navsWrap.removeEventListener('dragenter', dragenter);
      document.removeEventListener('dragleave', dragleave);
      document.removeEventListener('mousemove', dragleave);
      navsWrap.removeEventListener('drop', drop);
    }
  });
  return { setNavsWrap };
}
