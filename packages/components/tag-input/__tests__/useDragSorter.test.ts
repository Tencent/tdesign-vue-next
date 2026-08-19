import { useDragSorter } from '../hooks/useDragSorter';

const createDragEvent = (target: HTMLElement, clientX = 0) => {
  const event = new Event('dragover', { cancelable: true }) as DragEvent;
  Object.defineProperty(event, 'target', { configurable: true, value: target });
  Object.defineProperty(event, 'clientX', { configurable: true, value: clientX });
  return event;
};

const setRect = (element: HTMLElement, x: number, width: number) => {
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({ x, width } as DOMRect);
};

describe('useDragSorter', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it(':sortOnDraggable[false]', () => {
      expect(useDragSorter({ sortOnDraggable: false })).toEqual({});
    });

    it(':sortOnDraggable[true]', () => {
      const sorter = useDragSorter<string>({ sortOnDraggable: true });
      const dragProps = sorter.getDragProps?.(0, 'Vue');

      expect(sorter.dragging).toBe(false);
      expect(dragProps).toEqual({
        draggable: true,
        onDragstart: expect.any(Function),
        onDragover: expect.any(Function),
        onDrop: expect.any(Function),
        onDragend: expect.any(Function),
      });
    });
  });

  describe('events', () => {
    it(':onDragStart', () => {
      const target = document.createElement('div');
      setRect(target, 10, 40);
      const sorter = useDragSorter<string>({ sortOnDraggable: true, onDragOverCheck: { x: true } });

      sorter.onDragStart?.(createDragEvent(target, 25), 2, 'Vue');

      const next = document.createElement('div');
      setRect(next, 50, 40);
      const onDragSort = vi.fn();
      const activeSorter = useDragSorter<string>({ sortOnDraggable: true, onDragSort });
      activeSorter.onDragStart?.(createDragEvent(target, 25), 2, 'Vue');
      activeSorter.onDragOver?.(createDragEvent(next, 60), 3, 'React');
      expect(onDragSort).toHaveBeenCalledWith({ currentIndex: 2, current: 'Vue', targetIndex: 3, target: 'React' });
    });

    it(':onDragOver[preventDefault]', () => {
      const current = document.createElement('div');
      const target = document.createElement('div');
      const event = createDragEvent(target);
      const preventDefault = vi.spyOn(event, 'preventDefault');
      const sorter = useDragSorter<string>({ sortOnDraggable: true });

      sorter.onDragStart?.(createDragEvent(current), 0, 'Vue');
      sorter.onDragOver?.(event, 1, 'React');

      expect(preventDefault).toHaveBeenCalledTimes(1);
    });

    it(':onDragOver[same index]', () => {
      const target = document.createElement('div');
      const onDragSort = vi.fn();
      const sorter = useDragSorter<string>({ sortOnDraggable: true, onDragSort });

      sorter.onDragStart?.(createDragEvent(target), 0, 'Vue');
      sorter.onDragOver?.(createDragEvent(target), 0, 'Vue');

      expect(onDragSort).not.toHaveBeenCalled();
    });

    it(':onDragOver[before drag start]', () => {
      const onDragSort = vi.fn();
      const sorter = useDragSorter<string>({ sortOnDraggable: true, onDragSort });

      sorter.onDragOver?.(createDragEvent(document.createElement('div')), 1, 'React');

      expect(onDragSort).not.toHaveBeenCalled();
    });

    it(':onDragOver[targetClassNameRegExp]', () => {
      const current = document.createElement('div');
      const target = document.createElement('div');
      target.className = 'not-a-tag';
      const onDragSort = vi.fn();
      const sorter = useDragSorter<string>({
        sortOnDraggable: true,
        onDragSort,
        onDragOverCheck: { targetClassNameRegExp: /^t-tag/ },
      });

      sorter.onDragStart?.(createDragEvent(current), 0, 'Vue');
      sorter.onDragOver?.(createDragEvent(target), 1, 'React');

      expect(onDragSort).not.toHaveBeenCalled();
    });

    it(':onDragOver[x/no start width]', () => {
      const current = document.createElement('div');
      const target = document.createElement('div');
      setRect(current, 0, 0);
      setRect(target, 20, 20);
      const onDragSort = vi.fn();
      const sorter = useDragSorter<string>({ sortOnDraggable: true, onDragSort, onDragOverCheck: { x: true } });

      sorter.onDragStart?.(createDragEvent(current, 10), 0, 'Vue');
      sorter.onDragOver?.(createDragEvent(target, 30), 1, 'React');

      expect(onDragSort).not.toHaveBeenCalled();
    });

    it(':onDragOver[x/left overlap]', () => {
      const current = document.createElement('div');
      const target = document.createElement('div');
      setRect(current, 0, 20);
      setRect(target, 40, 20);
      const onDragSort = vi.fn();
      const sorter = useDragSorter<string>({ sortOnDraggable: true, onDragSort, onDragOverCheck: { x: true } });

      sorter.onDragStart?.(createDragEvent(current, 10), 0, 'Vue');
      sorter.onDragOver?.(createDragEvent(target, 55), 1, 'React');

      expect(onDragSort).toHaveBeenCalledTimes(1);
    });

    it(':onDragOver[x/right overlap]', () => {
      const current = document.createElement('div');
      const target = document.createElement('div');
      setRect(current, 0, 20);
      setRect(target, 40, 20);
      const onDragSort = vi.fn();
      const sorter = useDragSorter<string>({ sortOnDraggable: true, onDragSort, onDragOverCheck: { x: true } });

      sorter.onDragStart?.(createDragEvent(current, 10), 0, 'Vue');
      sorter.onDragOver?.(createDragEvent(target, 50), 1, 'React');

      expect(onDragSort).toHaveBeenCalledTimes(1);
    });

    it(':onDragOver[x/no overlap]', () => {
      const current = document.createElement('div');
      const target = document.createElement('div');
      setRect(current, 0, 20);
      setRect(target, 40, 20);
      const onDragSort = vi.fn();
      const sorter = useDragSorter<string>({ sortOnDraggable: true, onDragSort, onDragOverCheck: { x: true } });

      sorter.onDragStart?.(createDragEvent(current, 10), 0, 'Vue');
      sorter.onDragOver?.(createDragEvent(target, 20), 1, 'React');

      expect(onDragSort).not.toHaveBeenCalled();
    });

    it(':onDrop + :onDragEnd', () => {
      const current = document.createElement('div');
      const target = document.createElement('div');
      const onDragSort = vi.fn();
      const sorter = useDragSorter<string>({ sortOnDraggable: true, onDragSort });

      sorter.onDragStart?.(createDragEvent(current), 0, 'Vue');
      sorter.onDrop?.();
      sorter.onDragEnd?.();
      sorter.onDragOver?.(createDragEvent(target), 1, 'React');

      expect(onDragSort).not.toHaveBeenCalled();
    });

    it(':onDragEnd[cancelled]', () => {
      const current = document.createElement('div');
      const target = document.createElement('div');
      const onDragSort = vi.fn();
      const sorter = useDragSorter<string>({ sortOnDraggable: true, onDragSort });

      sorter.onDragStart?.(createDragEvent(current), 0, 'Vue');
      sorter.onDragEnd?.();
      sorter.onDragOver?.(createDragEvent(target), 1, 'React');

      expect(onDragSort).not.toHaveBeenCalled();
    });

    it(':getDragProps', () => {
      const current = document.createElement('div');
      const target = document.createElement('div');
      const onDragSort = vi.fn();
      const sorter = useDragSorter<string>({ sortOnDraggable: true, onDragSort });
      const currentProps = sorter.getDragProps?.(0, 'Vue');
      const targetProps = sorter.getDragProps?.(1, 'React');
      const currentHandlers = currentProps as typeof currentProps & {
        onDragstart: (e: DragEvent) => void;
      };
      const targetHandlers = targetProps as typeof targetProps & {
        onDragover: (e: DragEvent) => void;
        onDrop: () => void;
        onDragend: () => void;
      };

      currentHandlers?.onDragstart(createDragEvent(current));
      targetHandlers?.onDragover(createDragEvent(target));
      targetHandlers?.onDrop();
      targetHandlers?.onDragend();

      expect(onDragSort).toHaveBeenCalledWith({ currentIndex: 0, current: 'Vue', targetIndex: 1, target: 'React' });
    });
  });
});
