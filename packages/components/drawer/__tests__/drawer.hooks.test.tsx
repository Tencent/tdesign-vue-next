import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { defineComponent, nextTick } from 'vue';
import { useDrag } from '@tdesign/components/drawer/hooks';
import type { TdDrawerProps } from '@tdesign/components/drawer/type';

// 事件兼容问题，使其支持 x, y 值
class FakeMouseEvent extends MouseEvent {
  constructor(type: string, values: Record<string, unknown> = {}) {
    const { x, y, ...mouseValues } = values;
    super(type, mouseValues as MouseEventInit);

    Object.assign(this, {
      x: x || 0,
      y: y || 0,
    });
  }
}

// 通用测试组件
const DragTestComponent = defineComponent({
  props: {
    placement: { type: String, default: 'right' },
    sizeDraggable: { type: [Boolean, Object], default: true },
    onSizeDragEnd: { type: Function, default: undefined },
  },
  setup(props) {
    const result = useDrag(props as unknown as TdDrawerProps);
    return { ...result };
  },
  render() {
    return (
      <div
        class="drag-wrapper"
        style={{ width: '300px', height: '300px', position: 'relative', ...this.draggingStyles }}
      >
        <div class="drag-handle" style={this.draggableLineStyles} onMousedown={this.enableDrag}></div>
        <span class="drag-size">{this.draggedSizeValue}</span>
      </div>
    );
  },
});

// 模拟拖拽操作
async function performDrag(handleEl: Element, x: number, y: number) {
  handleEl.dispatchEvent(new FakeMouseEvent('mousedown', { bubbles: true }));
  await nextTick();
  document.dispatchEvent(new FakeMouseEvent('mousemove', { x, y }));
  await nextTick();
  document.dispatchEvent(new FakeMouseEvent('mouseup', { x, y }));
  await nextTick();
}

describe('Drawer Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  // ==================== useDrag Tests ====================
  describe('useDrag', () => {
    it('draggableLineStyles returns col-resize for left placement', () => {
      const wrapper = mount(DragTestComponent, {
        props: { placement: 'left' },
      });
      const handle = wrapper.find('.drag-handle').element as HTMLElement;
      expect(handle.style.cursor).toBe('col-resize');
      expect(handle.style.width).toBe('16px');
      expect(handle.style.height).toBe('100%');
      expect(handle.style.right).toBe('0px');
    });

    it('draggableLineStyles returns col-resize for right placement', () => {
      const wrapper = mount(DragTestComponent, {
        props: { placement: 'right' },
      });
      const handle = wrapper.find('.drag-handle').element as HTMLElement;
      expect(handle.style.cursor).toBe('col-resize');
      expect(handle.style.left).toBe('0px');
    });

    it('draggableLineStyles returns row-resize for top placement', () => {
      const wrapper = mount(DragTestComponent, {
        props: { placement: 'top' },
      });
      const handle = wrapper.find('.drag-handle').element as HTMLElement;
      expect(handle.style.cursor).toBe('row-resize');
      expect(handle.style.width).toBe('100%');
      expect(handle.style.height).toBe('16px');
      expect(handle.style.bottom).toBe('0px');
    });

    it('draggableLineStyles returns row-resize for bottom placement', () => {
      const wrapper = mount(DragTestComponent, {
        props: { placement: 'bottom' },
      });
      const handle = wrapper.find('.drag-handle').element as HTMLElement;
      expect(handle.style.cursor).toBe('row-resize');
      expect(handle.style.top).toBe('0px');
    });

    it('draggingStyles is empty when not dragging', () => {
      const wrapper = mount(DragTestComponent);
      expect((wrapper.find('.drag-wrapper').element as HTMLElement).style.userSelect).not.toBe('none');
    });

    it('draggingStyles applies userSelect:none during drag', async () => {
      const wrapper = mount(DragTestComponent, {
        attachTo: document.body,
        props: { placement: 'left' },
      });

      wrapper.find('.drag-handle').element.dispatchEvent(new FakeMouseEvent('mousedown', { bubbles: true }));
      await nextTick();

      expect((wrapper.find('.drag-wrapper').element as HTMLElement).style.userSelect).toBe('none');

      document.dispatchEvent(new FakeMouseEvent('mouseup', { x: 300, y: 100 }));
      await nextTick();

      expect((wrapper.find('.drag-wrapper').element as HTMLElement).style.userSelect).not.toBe('none');
      wrapper.unmount();
    });

    it('enableDrag registers and removes event listeners', async () => {
      const addSpy = vi.spyOn(document, 'addEventListener');
      const removeSpy = vi.spyOn(document, 'removeEventListener');

      const wrapper = mount(DragTestComponent, {
        attachTo: document.body,
        props: { placement: 'left' },
      });

      wrapper.find('.drag-handle').element.dispatchEvent(new FakeMouseEvent('mousedown', { bubbles: true }));
      await nextTick();

      expect(addSpy).toHaveBeenCalledWith('mouseup', expect.any(Function), true);
      expect(addSpy).toHaveBeenCalledWith('mousemove', expect.any(Function), true);

      document.dispatchEvent(new FakeMouseEvent('mouseup', { x: 300, y: 100 }));
      await nextTick();

      expect(removeSpy).toHaveBeenCalledWith('mouseup', expect.any(Function), true);
      expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function), true);

      addSpy.mockRestore();
      removeSpy.mockRestore();
      wrapper.unmount();
    });

    it('mousemove updates draggedSizeValue for left placement', async () => {
      const onSizeDragEnd = vi.fn();
      const wrapper = mount(DragTestComponent, {
        attachTo: document.body,
        props: { placement: 'left', onSizeDragEnd },
      });

      await performDrag(wrapper.find('.drag-handle').element, 400, 100);

      expect(onSizeDragEnd).toHaveBeenCalled();
      expect(wrapper.find('.drag-size').text()).toContain('px');
      wrapper.unmount();
    });

    it('mousemove updates draggedSizeValue for right placement', async () => {
      const onSizeDragEnd = vi.fn();
      const wrapper = mount(DragTestComponent, {
        attachTo: document.body,
        props: { placement: 'right', onSizeDragEnd },
      });

      await performDrag(wrapper.find('.drag-handle').element, 200, 100);

      expect(onSizeDragEnd).toHaveBeenCalled();
      wrapper.unmount();
    });

    it('mousemove updates draggedSizeValue for top placement', async () => {
      const onSizeDragEnd = vi.fn();
      const wrapper = mount(DragTestComponent, {
        attachTo: document.body,
        props: { placement: 'top', onSizeDragEnd },
      });

      await performDrag(wrapper.find('.drag-handle').element, 100, 300);

      expect(onSizeDragEnd).toHaveBeenCalled();
      wrapper.unmount();
    });

    it('mousemove updates draggedSizeValue for bottom placement', async () => {
      const onSizeDragEnd = vi.fn();
      const wrapper = mount(DragTestComponent, {
        attachTo: document.body,
        props: { placement: 'bottom', onSizeDragEnd },
      });

      await performDrag(wrapper.find('.drag-handle').element, 100, 200);

      expect(onSizeDragEnd).toHaveBeenCalled();
      wrapper.unmount();
    });

    it('mousemove with sizeDraggable false does not update size', async () => {
      const onSizeDragEnd = vi.fn();
      const wrapper = mount(DragTestComponent, {
        attachTo: document.body,
        props: { placement: 'left', sizeDraggable: false, onSizeDragEnd },
      });

      wrapper.find('.drag-handle').element.dispatchEvent(new FakeMouseEvent('mousedown', { bubbles: true }));
      await nextTick();

      document.dispatchEvent(new FakeMouseEvent('mousemove', { x: 400, y: 100 }));
      await nextTick();

      expect(onSizeDragEnd).not.toHaveBeenCalled();

      document.dispatchEvent(new FakeMouseEvent('mouseup', { x: 400, y: 100 }));
      wrapper.unmount();
    });

    it('sizeDraggable with min/max limits respects boundaries', async () => {
      const onSizeDragEnd = vi.fn();
      const wrapper = mount(DragTestComponent, {
        attachTo: document.body,
        props: {
          placement: 'left',
          sizeDraggable: { min: 100, max: 300 },
          onSizeDragEnd,
        },
      });

      await performDrag(wrapper.find('.drag-handle').element, 500, 100);

      expect(onSizeDragEnd).toHaveBeenCalled();
      expect(wrapper.find('.drag-size').text()).toBe('300px');
      wrapper.unmount();
    });

    it('multiple drag sequences work correctly', async () => {
      const onSizeDragEnd = vi.fn();
      const wrapper = mount(DragTestComponent, {
        attachTo: document.body,
        props: { placement: 'left', onSizeDragEnd },
      });

      await performDrag(wrapper.find('.drag-handle').element, 200, 100);
      expect(onSizeDragEnd).toHaveBeenCalledTimes(1);

      await performDrag(wrapper.find('.drag-handle').element, 300, 100);
      expect(onSizeDragEnd).toHaveBeenCalledTimes(2);

      wrapper.unmount();
    });

    it('getCurrentWrapperSize returns null when wrapper is null', async () => {
      const wrapper = mount(DragTestComponent, {
        props: { placement: 'left' },
      });

      const fakeTarget = document.createElement('div');
      Object.defineProperty(fakeTarget, 'parentElement', { value: null });
      const fakeEvent = new FakeMouseEvent('mousedown', { bubbles: true });
      Object.defineProperty(fakeEvent, 'target', { value: fakeTarget });

      wrapper.find('.drag-handle').element.dispatchEvent(fakeEvent);
      await nextTick();

      document.dispatchEvent(new FakeMouseEvent('mouseup', { x: 0, y: 0 }));
    });
  });
});
