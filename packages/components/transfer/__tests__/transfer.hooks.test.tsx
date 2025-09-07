import { ref, computed } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import useDragSort from '@tdesign/components/transfer/hooks/useDragSort';

describe('useDragSort', () => {
  const mockData = [
    { value: '1', label: '项目1', disabled: false, key: '1', data: { value: '1', label: '项目1' } },
    { value: '2', label: '项目2', disabled: false, key: '2', data: { value: '2', label: '项目2' } },
    { value: '3', label: '项目3', disabled: false, key: '3', data: { value: '3', label: '项目3' } },
  ];

  it('should return correct drag event handlers', () => {
    const currentValue = ref(['1', '2', '3']);
    const curPageData = computed(() => mockData);
    const handleDataChange = vi.fn();

    const { onDragStart, onDragEnd, onDrop, onDragOver, onDragLeave } = useDragSort(
      currentValue,
      curPageData,
      handleDataChange,
    );

    expect(typeof onDragStart).toBe('function');
    expect(typeof onDragEnd).toBe('function');
    expect(typeof onDrop).toBe('function');
    expect(typeof onDragOver).toBe('function');
    expect(typeof onDragLeave).toBe('function');
  });

  it('should handle drag start correctly', () => {
    const currentValue = ref(['1', '2', '3']);
    const curPageData = computed(() => mockData);
    const handleDataChange = vi.fn();

    const { onDragStart } = useDragSort(currentValue, curPageData, handleDataChange);

    const mockEvent = {
      target: {
        dataset: { index: '1' },
      },
    } as any;

    onDragStart(mockEvent);
    expect(mockEvent.target.dataset.index).toBe('1');
  });

  it('should handle drag over correctly', () => {
    const currentValue = ref(['1', '2', '3']);
    const curPageData = computed(() => mockData);
    const handleDataChange = vi.fn();

    const { onDragOver } = useDragSort(currentValue, curPageData, handleDataChange);

    const mockEvent = {
      preventDefault: vi.fn(),
      currentTarget: {
        dataset: { index: '2' },
        offsetHeight: 100,
        getBoundingClientRect: () => ({ top: 0 }),
      },
      clientY: 20,
    } as any;

    onDragOver(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('should handle drag leave correctly', () => {
    const currentValue = ref(['1', '2', '3']);
    const curPageData = computed(() => mockData);
    const handleDataChange = vi.fn();

    const { onDragLeave } = useDragSort(currentValue, curPageData, handleDataChange);

    onDragLeave();
  });

  it('should handle drag end correctly', () => {
    const currentValue = ref(['1', '2', '3']);
    const curPageData = computed(() => mockData);
    const handleDataChange = vi.fn();

    const { onDragEnd } = useDragSort(currentValue, curPageData, handleDataChange);

    onDragEnd();
  });

  it('should handle drop correctly and call handleDataChange', () => {
    const currentValue = ref(['1', '2', '3']);
    const curPageData = computed(() => mockData);
    const handleDataChange = vi.fn();

    const hook = useDragSort(currentValue, curPageData, handleDataChange);

    const dragStartEvent = {
      target: {
        dataset: { index: '0' },
      },
    } as any;
    hook.onDragStart(dragStartEvent);

    const dragOverEvent = {
      preventDefault: vi.fn(),
      currentTarget: {
        dataset: { index: '2' },
        offsetHeight: 100,
        getBoundingClientRect: () => ({ top: 0 }),
      },
      clientY: 80,
    } as any;
    hook.onDragOver(dragOverEvent);

    const dropEvent = {
      preventDefault: vi.fn(),
    } as any;
    hook.onDrop(dropEvent);

    expect(dropEvent.preventDefault).toHaveBeenCalled();
    expect(handleDataChange).toHaveBeenCalled();
  });

  it('should not call handleDataChange when dropping on same position', () => {
    const currentValue = ref(['1', '2', '3']);
    const curPageData = computed(() => mockData);
    const handleDataChange = vi.fn();

    const hook = useDragSort(currentValue, curPageData, handleDataChange);

    const dragStartEvent = {
      target: {
        dataset: { index: '1' },
      },
    } as any;
    hook.onDragStart(dragStartEvent);

    const dragOverEvent = {
      preventDefault: vi.fn(),
      currentTarget: {
        dataset: { index: '1' },
        offsetHeight: 100,
        getBoundingClientRect: () => ({ top: 0 }),
      },
      clientY: 50,
    } as any;
    hook.onDragOver(dragOverEvent);

    const dropEvent = {
      preventDefault: vi.fn(),
    } as any;
    hook.onDrop(dropEvent);

    expect(handleDataChange).not.toHaveBeenCalled();
  });

  it('should handle drop with bottom position correctly', () => {
    const currentValue = ref(['1', '2', '3']);
    const curPageData = computed(() => mockData);
    const handleDataChange = vi.fn();

    const hook = useDragSort(currentValue, curPageData, handleDataChange);

    const dragStartEvent = {
      target: {
        dataset: { index: '0' },
      },
    } as any;
    hook.onDragStart(dragStartEvent);

    const dragOverEvent = {
      preventDefault: vi.fn(),
      currentTarget: {
        dataset: { index: '1' },
        offsetHeight: 100,
        getBoundingClientRect: () => ({ top: 0 }),
      },
      clientY: 90,
    } as any;
    hook.onDragOver(dragOverEvent);

    const dropEvent = {
      preventDefault: vi.fn(),
    } as any;
    hook.onDrop(dropEvent);

    expect(handleDataChange).toHaveBeenCalledWith(['2', '1', '3'], ['1', '2']);
  });

  it('should handle drop with center position correctly', () => {
    const currentValue = ref(['1', '2', '3']);
    const curPageData = computed(() => mockData);
    const handleDataChange = vi.fn();

    const hook = useDragSort(currentValue, curPageData, handleDataChange);

    const dragStartEvent = {
      target: {
        dataset: { index: '0' },
      },
    } as any;
    hook.onDragStart(dragStartEvent);

    const dragOverEvent = {
      preventDefault: vi.fn(),
      currentTarget: {
        dataset: { index: '1' },
        offsetHeight: 100,
        getBoundingClientRect: () => ({ top: 0 }),
      },
      clientY: 50,
    } as any;
    hook.onDragOver(dragOverEvent);

    const dropEvent = {
      preventDefault: vi.fn(),
    } as any;
    hook.onDrop(dropEvent);

    expect(handleDataChange).toHaveBeenCalledWith(
      expect.arrayContaining(['2', '1', '3']),
      expect.arrayContaining(['1', '2']),
    );
  });

  it('should handle targetIndex increment when dragoverPos is bottom', () => {
    const currentValue = ref(['1', '2', '3', '4']);
    const curPageData = computed(() => [
      { value: '1', label: '项目1', disabled: false, key: '1', data: { value: '1', label: '项目1' } },
      { value: '2', label: '项目2', disabled: false, key: '2', data: { value: '2', label: '项目2' } },
      { value: '3', label: '项目3', disabled: false, key: '3', data: { value: '3', label: '项目3' } },
      { value: '4', label: '项目4', disabled: false, key: '4', data: { value: '4', label: '项目4' } },
    ]);
    const handleDataChange = vi.fn();

    const hook = useDragSort(currentValue, curPageData, handleDataChange);

    const dragStartEvent = {
      target: {
        dataset: { index: '3' },
      },
    } as any;
    hook.onDragStart(dragStartEvent);

    const dragOverEvent = {
      preventDefault: vi.fn(),
      currentTarget: {
        dataset: { index: '1' },
        offsetHeight: 100,
        getBoundingClientRect: () => ({ top: 0 }),
      },
      clientY: 85,
    } as any;
    hook.onDragOver(dragOverEvent);

    const dropEvent = {
      preventDefault: vi.fn(),
    } as any;
    hook.onDrop(dropEvent);

    expect(handleDataChange).toHaveBeenCalledWith(['1', '4', '2', '3'], ['4', '2']);
  });

  it('should handle targetIndex without increment when dragoverPos is top', () => {
    const currentValue = ref(['1', '2', '3', '4']);
    const curPageData = computed(() => [
      { value: '1', label: '项目1', disabled: false, key: '1', data: { value: '1', label: '项目1' } },
      { value: '2', label: '项目2', disabled: false, key: '2', data: { value: '2', label: '项目2' } },
      { value: '3', label: '项目3', disabled: false, key: '3', data: { value: '3', label: '项目3' } },
      { value: '4', label: '项目4', disabled: false, key: '4', data: { value: '4', label: '项目4' } },
    ]);
    const handleDataChange = vi.fn();

    const hook = useDragSort(currentValue, curPageData, handleDataChange);

    const dragStartEvent = {
      target: {
        dataset: { index: '3' },
      },
    } as any;
    hook.onDragStart(dragStartEvent);

    const dragOverEvent = {
      preventDefault: vi.fn(),
      currentTarget: {
        dataset: { index: '1' },
        offsetHeight: 100,
        getBoundingClientRect: () => ({ top: 0 }),
      },
      clientY: 20,
    } as any;
    hook.onDragOver(dragOverEvent);

    const dropEvent = {
      preventDefault: vi.fn(),
    } as any;
    hook.onDrop(dropEvent);

    expect(handleDataChange).toHaveBeenCalledWith(['1', '4', '2', '3'], ['4', '2']);
  });
});
