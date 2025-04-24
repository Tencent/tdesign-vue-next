import { onUnmounted } from 'vue';

const traversalTabNavs = (tabNavs: HTMLCollection, fn: (itemNode: HTMLDivElement) => void) => {
  for (const itemNode of Array.from(tabNavs)) {
    if (itemNode instanceof HTMLDivElement && itemNode.getAttribute('draggable')) {
      fn(itemNode);
    }
  }
};

const handleTarget = (target: EventTarget | null, tabNavs: HTMLCollection | null): HTMLDivElement | null => {
  if (!tabNavs) return null;
  let resultTarget: HTMLDivElement | null = null;
  traversalTabNavs(tabNavs, (itemNode) => {
    if (target instanceof Node && itemNode.contains(target)) {
      resultTarget = itemNode;
    }
  });
  return resultTarget;
};

export default function useDragSort(props: any) {
  let navsWrap: HTMLDivElement | null = null;
  let dragged: HTMLDivElement | null = null;
  const enterTargets: Set<HTMLDivElement> = new Set();

  const resetOutline = () => {
    if (!navsWrap) return;
    traversalTabNavs(navsWrap.children, (tabNav) => {
      if (tabNav.firstChild instanceof HTMLElement) {
        tabNav.firstChild.style.outline = 'none';
      }
    });
  };

  const dragstart = (event: DragEvent) => {
    const target = event.target as HTMLDivElement;
    dragged = target;
    target.style.opacity = '0.5';
  };

  const dragend = (event: DragEvent) => {
    if (event.target instanceof HTMLElement) {
      event.target.style.opacity = '';
    }
    resetOutline();
  };

  const dragover = (event: DragEvent) => {
    event.preventDefault();
  };

  const dragenter = (event: DragEvent) => {
    if (!navsWrap) return;
    const target = handleTarget(event.target, navsWrap.children);
    if (target && target !== dragged && target.draggable) {
      if (target.firstChild instanceof HTMLElement) {
        target.firstChild.style.outline = '1px dashed #0052d9';
      }
      enterTargets.add(target);
    }
  };

  const dragleave = (event: DragEvent) => {
    const target = event.target as HTMLDivElement;
    for (const enterTarget of enterTargets) {
      if (!enterTarget.contains(target)) {
        if (enterTarget.firstChild instanceof HTMLElement) {
          enterTarget.firstChild.style.outline = 'none';
        }
      }
    }
  };

  const drop = (event: DragEvent) => {
    event.preventDefault();
    resetOutline();

    if (!navsWrap || !dragged) return;

    const target = handleTarget(event.target, navsWrap.children);
    if (target && target.draggable) {
      const dragIndex = Array.from(navsWrap.children).indexOf(dragged);
      const targetIndex = Array.from(navsWrap.children).indexOf(target);

      const adjustedTargetIndex = targetIndex > dragIndex ? targetIndex + 1 : targetIndex;

      const currentIndex = props.theme === 'card' ? dragIndex : dragIndex - 1;
      const endIndex = props.theme === 'card' ? adjustedTargetIndex : adjustedTargetIndex - 1;

      props.onDragSort?.({
        currentIndex,
        current: props.panels[currentIndex]?.value,
        targetIndex: endIndex,
        target: props.panels[endIndex]?.value,
      });
    }
  };

  function setNavsWrap(val: HTMLDivElement) {
    navsWrap = val;
    navsWrap.addEventListener('dragstart', dragstart);
    navsWrap.addEventListener('dragend', dragend);
    navsWrap.addEventListener('dragover', dragover);
    navsWrap.addEventListener('dragenter', dragenter);
    navsWrap.addEventListener('dragleave', dragleave);
    navsWrap.addEventListener('drop', drop);
  }

  onUnmounted(() => {
    if (navsWrap) {
      navsWrap.removeEventListener('dragstart', dragstart);
      navsWrap.removeEventListener('dragend', dragend);
      navsWrap.removeEventListener('dragover', dragover);
      navsWrap.removeEventListener('dragenter', dragenter);
      navsWrap.removeEventListener('dragleave', dragleave);
      navsWrap.removeEventListener('drop', drop);
    }
  });

  return { setNavsWrap };
}
