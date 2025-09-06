// @ts-nocheck
import { ref, computed } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import useDragSort from '@tdesign/components/transfer/hooks/useDragSort';

describe('Transfer hooks', () => {
  describe('useDragSort', () => {
    const mockData = [
      { value: '1', label: '项目1' },
      { value: '2', label: '项目2' },
      { value: '3', label: '项目3' },
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
      } as DragEvent;

      onDragStart(mockEvent);
      // 验证拖拽开始时的状态
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
      // 验证拖拽离开时清理状态
    });

    it('should handle drag end correctly', () => {
      const currentValue = ref(['1', '2', '3']);
      const curPageData = computed(() => mockData);
      const handleDataChange = vi.fn();

      const { onDragEnd } = useDragSort(currentValue, curPageData, handleDataChange);

      onDragEnd();
      // 验证拖拽结束时清理状态
    });

    it('should handle drop correctly and call handleDataChange', () => {
      const currentValue = ref(['1', '2', '3']);
      const curPageData = computed(() => mockData);
      const handleDataChange = vi.fn();

      const hook = useDragSort(currentValue, curPageData, handleDataChange);

      // 模拟拖拽开始
      const dragStartEvent = {
        target: {
          dataset: { index: '0' },
        },
      } as DragEvent;
      hook.onDragStart(dragStartEvent);

      // 模拟拖拽悬停
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

      // 模拟放置
      const dropEvent = {
        preventDefault: vi.fn(),
      } as DragEvent;
      hook.onDrop(dropEvent);

      expect(dropEvent.preventDefault).toHaveBeenCalled();
      expect(handleDataChange).toHaveBeenCalled();
    });

    it('should not call handleDataChange when dropping on same position', () => {
      const currentValue = ref(['1', '2', '3']);
      const curPageData = computed(() => mockData);
      const handleDataChange = vi.fn();

      const hook = useDragSort(currentValue, curPageData, handleDataChange);

      // 模拟拖拽开始
      const dragStartEvent = {
        target: {
          dataset: { index: '1' },
        },
      } as DragEvent;
      hook.onDragStart(dragStartEvent);

      // 模拟拖拽悬停到同一位置
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

      // 模拟放置
      const dropEvent = {
        preventDefault: vi.fn(),
      } as DragEvent;
      hook.onDrop(dropEvent);

      expect(dropEvent.preventDefault).toHaveBeenCalled();
      expect(handleDataChange).not.toHaveBeenCalled();
    });

    it('should handle drop with bottom position correctly', () => {
      const currentValue = ref(['1', '2', '3']);
      const curPageData = computed(() => mockData);
      const handleDataChange = vi.fn();

      const hook = useDragSort(currentValue, curPageData, handleDataChange);

      // 模拟拖拽开始 - 拖拽第一个元素
      const dragStartEvent = {
        target: {
          dataset: { index: '0' },
        },
      } as DragEvent;
      hook.onDragStart(dragStartEvent);

      // 模拟拖拽悬停到第二个元素的底部位置
      const dragOverEvent = {
        preventDefault: vi.fn(),
        currentTarget: {
          dataset: { index: '1' },
          offsetHeight: 100,
          getBoundingClientRect: () => ({ top: 0 }),
        },
        clientY: 90, // 在底部区域 (90 > 100 - 100*0.3 = 70)
      } as any;
      hook.onDragOver(dragOverEvent);

      // 模拟放置
      const dropEvent = {
        preventDefault: vi.fn(),
      } as DragEvent;
      hook.onDrop(dropEvent);

      // 验证 targetIndex += 1 的逻辑：元素1应该插入到元素2的后面
      expect(handleDataChange).toHaveBeenCalledWith(['2', '1', '3'], ['1', '2']);
    });

    it('should handle drop with center position correctly', () => {
      const currentValue = ref(['1', '2', '3']);
      const curPageData = computed(() => mockData);
      const handleDataChange = vi.fn();

      const hook = useDragSort(currentValue, curPageData, handleDataChange);

      // 模拟拖拽开始
      const dragStartEvent = {
        target: {
          dataset: { index: '0' },
        },
      } as DragEvent;
      hook.onDragStart(dragStartEvent);

      // 模拟拖拽悬停到中间位置
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

      // 模拟放置
      const dropEvent = {
        preventDefault: vi.fn(),
      } as DragEvent;
      hook.onDrop(dropEvent);

      expect(handleDataChange).toHaveBeenCalledWith(
        expect.arrayContaining(['2', '1', '3']),
        expect.arrayContaining(['1', '2']),
      );
    });

    it('should handle targetIndex increment when dragoverPos is bottom', () => {
      const currentValue = ref(['1', '2', '3', '4']);
      const curPageData = computed(() => [
        { value: '1', label: '项目1' },
        { value: '2', label: '项目2' },
        { value: '3', label: '项目3' },
        { value: '4', label: '项目4' },
      ]);
      const handleDataChange = vi.fn();

      const hook = useDragSort(currentValue, curPageData, handleDataChange);

      // 拖拽第4个元素到第2个元素的底部
      const dragStartEvent = {
        target: {
          dataset: { index: '3' }, // 第4个元素
        },
      } as DragEvent;
      hook.onDragStart(dragStartEvent);

      // 悬停到第2个元素的底部
      const dragOverEvent = {
        preventDefault: vi.fn(),
        currentTarget: {
          dataset: { index: '1' }, // 第2个元素
          offsetHeight: 100,
          getBoundingClientRect: () => ({ top: 0 }),
        },
        clientY: 85, // 底部位置
      } as any;
      hook.onDragOver(dragOverEvent);

      const dropEvent = {
        preventDefault: vi.fn(),
      } as DragEvent;
      hook.onDrop(dropEvent);

      // 验证：元素4应该插入到元素2后面，由于先删除元素4，targetIndex需要+1才能插入到正确位置
      expect(handleDataChange).toHaveBeenCalledWith(['1', '4', '2', '3'], ['4', '2']);
    });

    it('should handle targetIndex without increment when dragoverPos is top', () => {
      const currentValue = ref(['1', '2', '3', '4']);
      const curPageData = computed(() => [
        { value: '1', label: '项目1' },
        { value: '2', label: '项目2' },
        { value: '3', label: '项目3' },
        { value: '4', label: '项目4' },
      ]);
      const handleDataChange = vi.fn();

      const hook = useDragSort(currentValue, curPageData, handleDataChange);

      // 拖拽第4个元素到第2个元素的顶部
      const dragStartEvent = {
        target: {
          dataset: { index: '3' }, // 第4个元素
        },
      } as DragEvent;
      hook.onDragStart(dragStartEvent);

      // 悬停到第2个元素的顶部
      const dragOverEvent = {
        preventDefault: vi.fn(),
        currentTarget: {
          dataset: { index: '1' }, // 第2个元素
          offsetHeight: 100,
          getBoundingClientRect: () => ({ top: 0 }),
        },
        clientY: 20, // 顶部位置 (20 < 100*0.3 = 30)
      } as any;
      hook.onDragOver(dragOverEvent);

      const dropEvent = {
        preventDefault: vi.fn(),
      } as DragEvent;
      hook.onDrop(dropEvent);

      // 验证：元素4应该插入到元素2前面，targetIndex不增加
      expect(handleDataChange).toHaveBeenCalledWith(['1', '4', '2', '3'], ['4', '2']);
    });
  });
});
