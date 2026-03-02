import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { defineComponent, nextTick } from 'vue';
import { useDrag } from '@tdesign/components/drawer/hooks';
import type { TdDrawerProps } from '@tdesign/components/drawer/type';

// jsdom MouseEvent does not support x/y properties
class FakeMouseEvent extends MouseEvent {
  constructor(type: string, values: Record<string, unknown> = {}) {
    const { x, y, ...mouseValues } = values;
    super(type, mouseValues as MouseEventInit);
    Object.assign(this, { x: x || 0, y: y || 0 });
  }
}

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

  describe('useDrag', () => {
    describe('draggableLineStyles', () => {
      let wrapper: VueWrapper | null = null;

      afterEach(() => {
        wrapper?.unmount();
        wrapper = null;
      });

      it(':placement[left] styles', () => {
        wrapper = mount(DragTestComponent, { props: { placement: 'left' } });
        const handle = wrapper.find('.drag-handle').element as HTMLElement;
        expect(handle.style.cursor).toBe('col-resize');
        expect(handle.style.width).toBe('16px');
        expect(handle.style.height).toBe('100%');
        expect(handle.style.right).toBe('0px');
      });

      it(':placement[right] styles', () => {
        wrapper = mount(DragTestComponent, { props: { placement: 'right' } });
        const handle = wrapper.find('.drag-handle').element as HTMLElement;
        expect(handle.style.cursor).toBe('col-resize');
        expect(handle.style.width).toBe('16px');
        expect(handle.style.height).toBe('100%');
        expect(handle.style.left).toBe('0px');
      });

      it(':placement[top] styles', () => {
        wrapper = mount(DragTestComponent, { props: { placement: 'top' } });
        const handle = wrapper.find('.drag-handle').element as HTMLElement;
        expect(handle.style.cursor).toBe('row-resize');
        expect(handle.style.width).toBe('100%');
        expect(handle.style.height).toBe('16px');
        expect(handle.style.bottom).toBe('0px');
      });

      it(':placement[bottom] styles', () => {
        wrapper = mount(DragTestComponent, { props: { placement: 'bottom' } });
        const handle = wrapper.find('.drag-handle').element as HTMLElement;
        expect(handle.style.cursor).toBe('row-resize');
        expect(handle.style.width).toBe('100%');
        expect(handle.style.height).toBe('16px');
        expect(handle.style.top).toBe('0px');
      });
    });

    describe('draggingStyles', () => {
      let wrapper: VueWrapper | null = null;

      afterEach(() => {
        wrapper?.unmount();
        wrapper = null;
      });

      it('no userSelect when not dragging', () => {
        wrapper = mount(DragTestComponent);
        const el = wrapper.find('.drag-wrapper').element as HTMLElement;
        expect(el.style.userSelect).not.toBe('none');
      });

      it('userSelect:none during drag', async () => {
        wrapper = mount(DragTestComponent, {
          attachTo: document.body,
          props: { placement: 'left' },
        });

        wrapper.find('.drag-handle').element.dispatchEvent(new FakeMouseEvent('mousedown', { bubbles: true }));
        await nextTick();
        expect((wrapper.find('.drag-wrapper').element as HTMLElement).style.userSelect).toBe('none');

        document.dispatchEvent(new FakeMouseEvent('mouseup', { x: 300, y: 100 }));
        await nextTick();
        expect((wrapper.find('.drag-wrapper').element as HTMLElement).style.userSelect).not.toBe('none');
      });
    });

    describe('enableDrag', () => {
      let wrapper: VueWrapper | null = null;

      afterEach(() => {
        wrapper?.unmount();
        wrapper = null;
      });

      it('registers mousemove and mouseup on mousedown', async () => {
        const addSpy = vi.spyOn(document, 'addEventListener');

        wrapper = mount(DragTestComponent, {
          attachTo: document.body,
          props: { placement: 'left' },
        });

        wrapper.find('.drag-handle').element.dispatchEvent(new FakeMouseEvent('mousedown', { bubbles: true }));
        await nextTick();

        expect(addSpy).toHaveBeenCalledWith('mouseup', expect.any(Function), true);
        expect(addSpy).toHaveBeenCalledWith('mousemove', expect.any(Function), true);

        document.dispatchEvent(new FakeMouseEvent('mouseup', { x: 0, y: 0 }));
        addSpy.mockRestore();
      });

      it('removes listeners on mouseup', async () => {
        const removeSpy = vi.spyOn(document, 'removeEventListener');

        wrapper = mount(DragTestComponent, {
          attachTo: document.body,
          props: { placement: 'right' },
        });

        wrapper.find('.drag-handle').element.dispatchEvent(new FakeMouseEvent('mousedown', { bubbles: true }));
        await nextTick();

        document.dispatchEvent(new FakeMouseEvent('mouseup', { x: 300, y: 100 }));
        await nextTick();

        expect(removeSpy).toHaveBeenCalledWith('mouseup', expect.any(Function), true);
        expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function), true);

        removeSpy.mockRestore();
      });
    });

    describe('drag behavior', () => {
      let wrapper: VueWrapper | null = null;

      afterEach(() => {
        wrapper?.unmount();
        wrapper = null;
      });

      it('updates size for left placement', async () => {
        const onSizeDragEnd = vi.fn();
        wrapper = mount(DragTestComponent, {
          attachTo: document.body,
          props: { placement: 'left', onSizeDragEnd },
        });

        await performDrag(wrapper.find('.drag-handle').element, 400, 100);

        expect(onSizeDragEnd).toHaveBeenCalledTimes(1);
        expect(onSizeDragEnd.mock.calls[0][0].e).toBeInstanceOf(MouseEvent);
        expect(typeof onSizeDragEnd.mock.calls[0][0].size).toBe('number');
        expect(wrapper.find('.drag-size').text()).toContain('px');
      });

      it('updates size for right placement', async () => {
        const onSizeDragEnd = vi.fn();
        wrapper = mount(DragTestComponent, {
          attachTo: document.body,
          props: { placement: 'right', onSizeDragEnd },
        });

        await performDrag(wrapper.find('.drag-handle').element, 200, 100);

        expect(onSizeDragEnd).toHaveBeenCalledTimes(1);
        expect(onSizeDragEnd.mock.calls[0][0].e).toBeInstanceOf(MouseEvent);
        expect(typeof onSizeDragEnd.mock.calls[0][0].size).toBe('number');
      });

      it('updates size for top placement', async () => {
        const onSizeDragEnd = vi.fn();
        wrapper = mount(DragTestComponent, {
          attachTo: document.body,
          props: { placement: 'top', onSizeDragEnd },
        });

        await performDrag(wrapper.find('.drag-handle').element, 100, 300);

        expect(onSizeDragEnd).toHaveBeenCalledTimes(1);
        expect(onSizeDragEnd.mock.calls[0][0].e).toBeInstanceOf(MouseEvent);
        expect(typeof onSizeDragEnd.mock.calls[0][0].size).toBe('number');
      });

      it('updates size for bottom placement', async () => {
        const onSizeDragEnd = vi.fn();
        wrapper = mount(DragTestComponent, {
          attachTo: document.body,
          props: { placement: 'bottom', onSizeDragEnd },
        });

        await performDrag(wrapper.find('.drag-handle').element, 100, 200);

        expect(onSizeDragEnd).toHaveBeenCalledTimes(1);
        expect(onSizeDragEnd.mock.calls[0][0].e).toBeInstanceOf(MouseEvent);
        expect(typeof onSizeDragEnd.mock.calls[0][0].size).toBe('number');
      });

      it(':sizeDraggable[false] prevents drag', async () => {
        const onSizeDragEnd = vi.fn();
        wrapper = mount(DragTestComponent, {
          attachTo: document.body,
          props: { placement: 'left', sizeDraggable: false, onSizeDragEnd },
        });

        wrapper.find('.drag-handle').element.dispatchEvent(new FakeMouseEvent('mousedown', { bubbles: true }));
        await nextTick();

        document.dispatchEvent(new FakeMouseEvent('mousemove', { x: 400, y: 100 }));
        await nextTick();

        expect(onSizeDragEnd).not.toHaveBeenCalled();

        document.dispatchEvent(new FakeMouseEvent('mouseup', { x: 400, y: 100 }));
      });
    });

    describe('edge cases', () => {
      let wrapper: VueWrapper | null = null;

      afterEach(() => {
        wrapper?.unmount();
        wrapper = null;
      });

      it(':sizeDraggable[object] respects min/max limits', async () => {
        const onSizeDragEnd = vi.fn();
        wrapper = mount(DragTestComponent, {
          attachTo: document.body,
          props: {
            placement: 'left',
            sizeDraggable: { min: 100, max: 300 },
            onSizeDragEnd,
          },
        });

        await performDrag(wrapper.find('.drag-handle').element, 500, 100);

        expect(onSizeDragEnd).toHaveBeenCalledTimes(1);
        expect(wrapper.find('.drag-size').text()).toBe('300px');
      });

      it('multiple drag sequences', async () => {
        const onSizeDragEnd = vi.fn();
        wrapper = mount(DragTestComponent, {
          attachTo: document.body,
          props: { placement: 'left', onSizeDragEnd },
        });

        await performDrag(wrapper.find('.drag-handle').element, 200, 100);
        expect(onSizeDragEnd).toHaveBeenCalledTimes(1);

        await performDrag(wrapper.find('.drag-handle').element, 300, 100);
        expect(onSizeDragEnd).toHaveBeenCalledTimes(2);
      });

      it('null parentElement does not crash', async () => {
        wrapper = mount(DragTestComponent, { props: { placement: 'left' } });

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
});
