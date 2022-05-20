import { onUnmounted } from 'vue';

const traversalTabNavs = (tabNavs: HTMLCollection, fn: { (itemNode: any): void; (tabNav: HTMLDivElement): void }) => {
  for (const itemNode of tabNavs) {
    if (itemNode.getAttribute('draggable')) {
      fn(itemNode);
    }
  }
};

const handleTarget = (target: EventTarget, tabNavs: HTMLCollection): any => {
  let resultTarget;
  traversalTabNavs(tabNavs, (itemNode) => {
    if (itemNode.contains(target)) {
      resultTarget = itemNode;
    }
  });
  return resultTarget;
};

export default function useDragSort(props: any) {
  let navsWrap: HTMLDivElement = null;

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
  };
  const dragend = (event: DragEvent) => {
    // 重置透明度
    (event.target as HTMLDivElement).style.opacity = '';
  };
  /* 放置目标元素时触发事件 */
  const dragover = (event: DragEvent) => {
    // 阻止默认动作以启用drop
    event.preventDefault();
  };
  // 当可拖动的元素进入可放置的目标时
  const dragenter = (event: DragEvent) => {
    // 高亮目标节点
    const target = handleTarget(event.target, navsWrap.children);
    if (target && target !== dragged) {
      target.firstChild.style.outline = '1px dashed #0052d9';
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
      tabNav.firstChild.style.outline = 'none';
    });
    // 将拖动的元素到所选择的放置目标节点中
    let target = handleTarget(event.target, navsWrap.children);
    if (target && target.parentNode !== dragged) {
      // 获取拖拽元素index
      const dragIndex = [].indexOf.call(navsWrap.children, dragged);
      // 获取放入元素index
      const targetIndex = [].indexOf.call(navsWrap.children, target);
      if (targetIndex > dragIndex) {
        target = navsWrap.children[targetIndex + 1];
      }
      navsWrap.insertBefore(dragged, target);

      // 当props.theme === "normal" 会多出一个指示条为第一个dom节点，所以需要减1
      const currentIndex = props.theme === 'card' ? dragIndex : dragIndex - 1;
      const endIndex = props.theme === 'card' ? dragIndex : targetIndex - 1;
      props.onDragSort({
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
    navsWrap.removeEventListener('dragstart', dragstart);
    navsWrap.removeEventListener('dragend', dragend);
    navsWrap.removeEventListener('dragover', dragover);
    navsWrap.removeEventListener('dragenter', dragenter);
    document.removeEventListener('dragleave', dragleave);
    document.removeEventListener('mousemove', dragleave);
    navsWrap.removeEventListener('drop', drop);
  });
  return { setNavsWrap };
}
