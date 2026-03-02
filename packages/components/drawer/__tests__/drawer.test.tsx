import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Drawer } from '@tdesign/components';
import drawerProps from '@tdesign/components/drawer/props';
import { CloseIcon } from 'tdesign-icons-vue-next';

class FakeMouseEvent extends MouseEvent {
  constructor(type: string, values: Record<string, unknown> = {}) {
    const { x, y, ...mouseValues } = values;
    super(type, mouseValues as MouseEventInit);
    Object.assign(this, { x: x || 0, y: y || 0 });
  }
}

function moveElement(element: Element, x: number, y: number) {
  element.dispatchEvent(new FakeMouseEvent('mousedown', {}));
  document.dispatchEvent(new FakeMouseEvent('mousemove', { x, y }));
  document.dispatchEvent(new FakeMouseEvent('mouseup', { x, y }));
}

describe('Drawer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  // ==================== Props ====================
  describe('props', () => {
    let wrapper!: VueWrapper<InstanceType<typeof Drawer>>;

    beforeEach(async () => {
      wrapper = mount(Drawer, {
        props: { visible: true, body: '内容' },
      }) as VueWrapper<InstanceType<typeof Drawer>>;
      vi.runAllTimers();
      await nextTick();
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it(':visible[boolean]', async () => {
      expect(wrapper.find('.t-drawer').exists()).toBe(true);
      expect(wrapper.find('.t-drawer').classes()).toContain('t-drawer--open');

      await wrapper.setProps({ visible: false });
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer').classes()).not.toContain('t-drawer--open');
    });

    it(':body[string]', () => {
      expect(wrapper.find('.t-drawer__body').exists()).toBe(true);
      expect(wrapper.find('.t-drawer__body').text()).toBe('内容');
    });

    it(':body[slot/function]', async () => {
      const wrapperFn = mount(Drawer, {
        props: { visible: true, body: () => <div class="fn-body">函数内容</div> },
      });
      vi.runAllTimers();
      await nextTick();
      expect(wrapperFn.find('.fn-body').text()).toBe('函数内容');
      wrapperFn.unmount();

      const wrapperSlot = mount(Drawer, {
        props: { visible: true },
        slots: { body: () => <div class="slot-body">插槽内容</div> },
      });
      vi.runAllTimers();
      await nextTick();
      expect(wrapperSlot.find('.slot-body').text()).toBe('插槽内容');
      wrapperSlot.unmount();
    });

    it(':default[string]', async () => {
      const w = mount(Drawer, {
        props: { visible: true, default: '默认内容' },
      });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.t-drawer__body').text()).toBe('默认内容');
      w.unmount();
    });

    it(':default[slot]', async () => {
      const w = mount(Drawer, {
        props: { visible: true },
        slots: { default: () => <span>默认插槽</span> },
      });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.t-drawer__body').text()).toBe('默认插槽');
      w.unmount();
    });

    it(':header[string]', async () => {
      await wrapper.setProps({ header: '标题文字' });
      await nextTick();
      expect(wrapper.find('.t-drawer__header').exists()).toBe(true);
      expect(wrapper.find('.t-drawer__header').text()).toBe('标题文字');
    });

    it(':header[boolean]', async () => {
      // Default true with no content - header div does NOT render (no renderable content)
      expect(wrapper.find('.t-drawer__header').exists()).toBe(false);

      // Set header string content - header div renders
      await wrapper.setProps({ header: '标题' });
      await nextTick();
      expect(wrapper.find('.t-drawer__header').exists()).toBe(true);

      // Explicitly false - header div hidden
      await wrapper.setProps({ header: false });
      await nextTick();
      expect(wrapper.find('.t-drawer__header').exists()).toBe(false);
    });

    it(':header[slot/function]', async () => {
      const wrapperFn = mount(Drawer, {
        props: { visible: true, body: '内容', header: () => <span class="fn-header">自定义</span> },
      });
      vi.runAllTimers();
      await nextTick();
      expect(wrapperFn.find('.fn-header').text()).toBe('自定义');
      wrapperFn.unmount();

      const wrapperSlot = mount(Drawer, {
        props: { visible: true, body: '内容' },
        slots: { header: () => <span class="slot-header">插槽头部</span> },
      });
      vi.runAllTimers();
      await nextTick();
      expect(wrapperSlot.find('.slot-header').text()).toBe('插槽头部');
      wrapperSlot.unmount();
    });

    it(':footer[boolean]', async () => {
      // Default true
      expect(wrapper.find('.t-drawer__footer').exists()).toBe(true);
      expect(wrapper.find('.t-drawer__footer').findAll('button').length).toBe(2);

      await wrapper.setProps({ footer: false });
      await nextTick();
      expect(wrapper.find('.t-drawer__footer').exists()).toBe(false);
    });

    it(':footer[slot/function]', async () => {
      const wrapperFn = mount(Drawer, {
        props: { visible: true, body: '内容', footer: () => <div class="fn-footer">底部</div> },
      });
      vi.runAllTimers();
      await nextTick();
      expect(wrapperFn.find('.fn-footer').text()).toBe('底部');
      wrapperFn.unmount();

      const wrapperSlot = mount(Drawer, {
        props: { visible: true, body: '内容' },
        slots: { footer: () => <div class="slot-footer">插槽底部</div> },
      });
      vi.runAllTimers();
      await nextTick();
      expect(wrapperSlot.find('.slot-footer').text()).toBe('插槽底部');
      wrapperSlot.unmount();
    });

    it(':cancelBtn[string/object/null]', async () => {
      // Default - '取消'
      expect(wrapper.find('.t-drawer__cancel').exists()).toBe(true);
      expect(wrapper.find('.t-drawer__cancel').text()).toBe('取消');

      // String
      const w1 = mount(Drawer, {
        props: { visible: true, body: '内容', cancelBtn: '自定义取消' },
      });
      vi.runAllTimers();
      await nextTick();
      expect(w1.find('.t-drawer__cancel').text()).toBe('自定义取消');
      w1.unmount();

      // Object
      const w2 = mount(Drawer, {
        props: { visible: true, body: '内容', cancelBtn: { content: '对象取消' } },
      });
      vi.runAllTimers();
      await nextTick();
      expect(w2.find('.t-drawer__cancel').text()).toBe('对象取消');
      w2.unmount();

      // null
      const w3 = mount(Drawer, {
        props: { visible: true, body: '内容', cancelBtn: null },
      });
      vi.runAllTimers();
      await nextTick();
      expect(w3.find('.t-drawer__cancel').exists()).toBe(false);
      w3.unmount();
    });

    it(':cancelBtn[function]', async () => {
      const w = mount(Drawer, {
        props: { visible: true, body: '内容', cancelBtn: () => <span class="fn-cancel">取消</span> },
      });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.fn-cancel').text()).toBe('取消');
      w.unmount();
    });

    it(':confirmBtn[string/object/null]', async () => {
      // Default - '确认'
      expect(wrapper.find('.t-drawer__confirm').exists()).toBe(true);
      expect(wrapper.find('.t-drawer__confirm').text()).toBe('确认');

      // Object
      const w1 = mount(Drawer, {
        props: { visible: true, body: '内容', confirmBtn: { content: '对象确认' } },
      });
      vi.runAllTimers();
      await nextTick();
      expect(w1.find('.t-drawer__confirm').text()).toBe('对象确认');
      w1.unmount();

      // null
      const w2 = mount(Drawer, {
        props: { visible: true, body: '内容', confirmBtn: null },
      });
      vi.runAllTimers();
      await nextTick();
      expect(w2.find('.t-drawer__confirm').exists()).toBe(false);
      w2.unmount();
    });

    it(':confirmBtn[function]', async () => {
      const w = mount(Drawer, {
        props: { visible: true, body: '内容', confirmBtn: () => <span class="fn-confirm">确认</span> },
      });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.fn-confirm').text()).toBe('确认');
      w.unmount();
    });

    it(':closeBtn[boolean]', async () => {
      // Default undefined - no close button
      expect(wrapper.find('.t-drawer__close-btn').exists()).toBe(false);

      await wrapper.setProps({ closeBtn: true });
      await nextTick();
      expect(wrapper.find('.t-drawer__close-btn').exists()).toBe(true);
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(true);

      await wrapper.setProps({ closeBtn: false });
      await nextTick();
      expect(wrapper.find('.t-drawer__close-btn').exists()).toBe(false);
    });

    it(':closeBtn[string]', async () => {
      const w = mount(Drawer, {
        props: { visible: true, body: '内容', closeBtn: '关闭' },
      });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.t-drawer__close-btn').text()).toBe('关闭');
      w.unmount();
    });

    it(':closeBtn[slot/function]', async () => {
      const wrapperFn = mount(Drawer, {
        props: { visible: true, body: '内容', closeBtn: () => <span class="fn-close">X</span> },
      });
      vi.runAllTimers();
      await nextTick();
      expect(wrapperFn.find('.fn-close').text()).toBe('X');
      wrapperFn.unmount();

      const wrapperSlot = mount(Drawer, {
        props: { visible: true, body: '内容', closeBtn: true },
        slots: { closeBtn: () => <span class="slot-close">关</span> },
      });
      vi.runAllTimers();
      await nextTick();
      expect(wrapperSlot.find('.slot-close').text()).toBe('关');
      wrapperSlot.unmount();
    });

    it(':placement[left/right/top/bottom]', async () => {
      // Default right
      expect(wrapper.find('.t-drawer').classes()).toContain('t-drawer--right');
      expect(wrapper.find('.t-drawer__content-wrapper').classes()).toContain('t-drawer__content-wrapper--right');

      for (const p of ['left', 'top', 'bottom'] as const) {
        await wrapper.setProps({ placement: p });
        await nextTick();
        expect(wrapper.find('.t-drawer').classes()).toContain(`t-drawer--${p}`);
        expect(wrapper.find('.t-drawer__content-wrapper').classes()).toContain(`t-drawer__content-wrapper--${p}`);
      }
    });

    it(':placement validator', () => {
      const validator = drawerProps.placement.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('left')).toBe(true);
      expect(validator('right')).toBe(true);
      expect(validator('top')).toBe(true);
      expect(validator('bottom')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':mode[overlay/push]', async () => {
      expect(wrapper.find('.t-drawer').exists()).toBe(true);

      await wrapper.setProps({ mode: 'push' });
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(true);
    });

    it(':mode validator', () => {
      const validator = drawerProps.mode.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('overlay')).toBe(true);
      expect(validator('push')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':showOverlay[boolean]', async () => {
      expect(wrapper.find('.t-drawer__mask').exists()).toBe(true);

      await wrapper.setProps({ showOverlay: false });
      await nextTick();
      expect(wrapper.find('.t-drawer__mask').exists()).toBe(false);
      expect(wrapper.find('.t-drawer').classes()).toContain('t-drawer--without-mask');
    });

    it(':showInAttachedElement[boolean]', async () => {
      expect(wrapper.find('.t-drawer').classes()).not.toContain('t-drawer--attach');

      await wrapper.setProps({ showInAttachedElement: true });
      await nextTick();
      expect(wrapper.find('.t-drawer').classes()).toContain('t-drawer--attach');
    });

    it(':size[string]', async () => {
      await wrapper.setProps({ size: '500px' });
      await nextTick();
      expect((wrapper.find('.t-drawer__content-wrapper').element as HTMLElement).style.width).toBe('500px');

      await wrapper.setProps({ size: 'small' });
      await nextTick();
      expect((wrapper.find('.t-drawer__content-wrapper').element as HTMLElement).style.width).toBe('300px');

      await wrapper.setProps({ size: 'medium' });
      await nextTick();
      expect((wrapper.find('.t-drawer__content-wrapper').element as HTMLElement).style.width).toBe('500px');

      await wrapper.setProps({ size: 'large' });
      await nextTick();
      expect((wrapper.find('.t-drawer__content-wrapper').element as HTMLElement).style.width).toBe('760px');

      // Numeric string
      await wrapper.setProps({ size: '400' });
      await nextTick();
      expect((wrapper.find('.t-drawer__content-wrapper').element as HTMLElement).style.width).toBe('400px');
    });

    it(':size with top/bottom placement sets height', async () => {
      const w = mount(Drawer, {
        props: { visible: true, body: '内容', placement: 'top', size: '200px' },
      });
      vi.runAllTimers();
      await nextTick();
      expect((w.find('.t-drawer__content-wrapper').element as HTMLElement).style.height).toBe('200px');
      w.unmount();
    });

    it(':zIndex[number]', async () => {
      expect((wrapper.find('.t-drawer').element as HTMLElement).style.zIndex).toBe('');

      await wrapper.setProps({ zIndex: 2022 });
      await nextTick();
      expect((wrapper.find('.t-drawer').element as HTMLElement).style.zIndex).toBe('2022');
    });

    it(':drawerClassName[string]', async () => {
      await wrapper.setProps({ drawerClassName: 'my-drawer-class' });
      await nextTick();
      expect(wrapper.find('.t-drawer').classes()).toContain('my-drawer-class');
    });

    it(':closeOnOverlayClick[boolean]', async () => {
      const onClose = vi.fn();

      const w1 = mount(Drawer, {
        props: { visible: true, body: '内容', closeOnOverlayClick: true, onClose },
      });
      vi.runAllTimers();
      await nextTick();
      await w1.find('.t-drawer__mask').trigger('click');
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose.mock.calls[0][0].trigger).toBe('overlay');
      w1.unmount();

      onClose.mockClear();
      const w2 = mount(Drawer, {
        props: { visible: true, body: '内容', closeOnOverlayClick: false, onClose },
      });
      vi.runAllTimers();
      await nextTick();
      await w2.find('.t-drawer__mask').trigger('click');
      expect(onClose).not.toHaveBeenCalled();
      w2.unmount();
    });

    it(':closeOnEscKeydown[boolean]', async () => {
      const onClose = vi.fn();

      const w1 = mount(Drawer, {
        attachTo: document.body,
        props: { visible: true, body: '内容', closeOnEscKeydown: true, onClose },
      });
      vi.runAllTimers();
      await nextTick();
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await nextTick();
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose.mock.calls[0][0].trigger).toBe('esc');
      w1.unmount();

      onClose.mockClear();
      const w2 = mount(Drawer, {
        attachTo: document.body,
        props: { visible: true, body: '内容', closeOnEscKeydown: false, onClose },
      });
      vi.runAllTimers();
      await nextTick();
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await nextTick();
      expect(onClose).not.toHaveBeenCalled();
      w2.unmount();
    });

    it(':destroyOnClose[boolean]', async () => {
      const w = mount(Drawer, {
        props: { visible: true, body: '内容', destroyOnClose: true },
      });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.t-drawer').exists()).toBe(true);

      await w.setProps({ visible: false });
      vi.advanceTimersByTime(350);
      await nextTick();
      expect(w.find('.t-drawer').exists()).toBe(false);

      await w.setProps({ visible: true });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.t-drawer').exists()).toBe(true);
      w.unmount();
    });

    it(':lazy[boolean]', async () => {
      const w = mount(Drawer, {
        props: { visible: false, body: '内容', lazy: true },
      });
      await nextTick();
      expect(w.find('.t-drawer').exists()).toBe(false);

      await w.setProps({ visible: true });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.t-drawer').exists()).toBe(true);
      w.unmount();
    });

    it(':preventScrollThrough[boolean]', async () => {
      const w = mount(Drawer, {
        attachTo: document.body,
        props: { visible: false, body: '内容', preventScrollThrough: true },
      });
      await nextTick();

      await w.setProps({ visible: true });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.t-drawer').exists()).toBe(true);

      await w.setProps({ visible: false });
      vi.advanceTimersByTime(200);
      await nextTick();
      expect(w.find('.t-drawer--open').exists()).toBe(false);
      w.unmount();
    });

    it(':sizeDraggable[boolean/object]', async () => {
      // Default false - no drag handle
      const contentDefault = wrapper.find('.t-drawer__content-wrapper');
      expect((contentDefault.element.lastChild as HTMLElement)?.style?.cursor).not.toBe('col-resize');

      // true - shows drag handle
      const w1 = mount(Drawer, {
        props: { visible: true, body: '内容', sizeDraggable: true },
      });
      vi.runAllTimers();
      await nextTick();
      expect((w1.find('.t-drawer__content-wrapper').element.lastChild as HTMLElement).style.cursor).toBe('col-resize');
      w1.unmount();

      // top placement - row-resize
      const w2 = mount(Drawer, {
        props: { visible: true, body: '内容', sizeDraggable: true, placement: 'top' },
      });
      vi.runAllTimers();
      await nextTick();
      expect((w2.find('.t-drawer__content-wrapper').element.lastChild as HTMLElement).style.cursor).toBe('row-resize');
      w2.unmount();
    });

    it(':attach[string/function]', async () => {
      const w1 = mount(Drawer, {
        props: { visible: true, body: '内容', attach: 'body' },
      });
      vi.runAllTimers();
      await nextTick();
      expect(document.querySelector('body > .t-drawer')).toBeTruthy();
      w1.unmount();

      const w2 = mount(Drawer, {
        props: { visible: true, body: '内容', attach: () => document.body },
      });
      vi.runAllTimers();
      await nextTick();
      expect(document.querySelector('body > .t-drawer')).toBeTruthy();
      w2.unmount();
    });

    it(':footer button order by placement', async () => {
      // Default right placement - confirm first (flex-start)
      const rightFooter = wrapper.find('.t-drawer__footer').element.firstChild as HTMLElement;
      expect(rightFooter.style.justifyContent).toBe('flex-start');

      // Left placement - cancel first (flex-end)
      const wLeft = mount(Drawer, {
        props: { visible: true, body: '内容', placement: 'left' },
      });
      vi.runAllTimers();
      await nextTick();
      const leftFooter = wLeft.find('.t-drawer__footer').element.firstChild as HTMLElement;
      expect(leftFooter.style.justifyContent).toBe('flex-end');
      wLeft.unmount();
    });
  });

  // ==================== Events ====================
  describe('events', () => {
    it('onBeforeOpen', async () => {
      const onBeforeOpen = vi.fn();
      const w = mount(Drawer, {
        props: { visible: false, body: '内容', onBeforeOpen },
      });
      await nextTick();
      expect(onBeforeOpen).not.toHaveBeenCalled();

      await w.setProps({ visible: true });
      await nextTick();
      expect(onBeforeOpen).toHaveBeenCalledTimes(1);
      w.unmount();
    });

    it('onBeforeClose', async () => {
      const onBeforeClose = vi.fn();
      const w = mount(Drawer, {
        props: { visible: true, body: '内容', onBeforeClose },
      });
      vi.runAllTimers();
      await nextTick();
      expect(onBeforeClose).not.toHaveBeenCalled();

      await w.setProps({ visible: false });
      await nextTick();
      expect(onBeforeClose).toHaveBeenCalledTimes(1);
      w.unmount();
    });

    it('onCancel', async () => {
      const onCancel = vi.fn();
      const onClose = vi.fn();
      const w = mount(Drawer, {
        props: { visible: true, body: '内容', onCancel, onClose },
      });
      vi.runAllTimers();
      await nextTick();

      await w.find('.t-drawer__cancel').trigger('click');
      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(onCancel.mock.calls[0][0].e).toBeInstanceOf(MouseEvent);
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose.mock.calls[0][0].trigger).toBe('cancel');
      w.unmount();
    });

    it('onConfirm', async () => {
      const onConfirm = vi.fn();
      const w = mount(Drawer, {
        props: { visible: true, body: '内容', onConfirm },
      });
      vi.runAllTimers();
      await nextTick();

      await w.find('.t-drawer__confirm').trigger('click');
      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(onConfirm.mock.calls[0][0].e).toBeInstanceOf(MouseEvent);
      w.unmount();
    });

    it('onCloseBtnClick', async () => {
      const onCloseBtnClick = vi.fn();
      const onClose = vi.fn();
      const w = mount(Drawer, {
        props: { visible: true, body: '内容', closeBtn: true, onCloseBtnClick, onClose },
      });
      vi.runAllTimers();
      await nextTick();

      await w.find('.t-drawer__close-btn').trigger('click');
      expect(onCloseBtnClick).toHaveBeenCalledTimes(1);
      expect(onCloseBtnClick.mock.calls[0][0].e).toBeInstanceOf(MouseEvent);
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose.mock.calls[0][0].trigger).toBe('close-btn');
      expect(onClose.mock.calls[0][0].e).toBeInstanceOf(MouseEvent);
      w.unmount();
    });

    it('onClose via all triggers', async () => {
      const onClose = vi.fn();

      // Via cancel
      const w1 = mount(Drawer, {
        props: { visible: true, body: '内容', onClose },
      });
      vi.runAllTimers();
      await nextTick();
      await w1.find('.t-drawer__cancel').trigger('click');
      expect(onClose.mock.calls[0][0].trigger).toBe('cancel');
      expect(onClose.mock.calls[0][0].e).toBeInstanceOf(MouseEvent);
      w1.unmount();

      // Via overlay
      onClose.mockClear();
      const w2 = mount(Drawer, {
        props: { visible: true, body: '内容', closeOnOverlayClick: true, onClose },
      });
      vi.runAllTimers();
      await nextTick();
      await w2.find('.t-drawer__mask').trigger('click');
      expect(onClose.mock.calls[0][0].trigger).toBe('overlay');
      w2.unmount();

      // Via ESC
      onClose.mockClear();
      const w3 = mount(Drawer, {
        attachTo: document.body,
        props: { visible: true, body: '内容', closeOnEscKeydown: true, onClose },
      });
      vi.runAllTimers();
      await nextTick();
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await nextTick();
      expect(onClose.mock.calls[0][0].trigger).toBe('esc');
      expect(onClose.mock.calls[0][0].e).toBeInstanceOf(KeyboardEvent);
      w3.unmount();
    });

    it('onOverlayClick', async () => {
      const onOverlayClick = vi.fn();
      const w = mount(Drawer, {
        props: { visible: true, body: '内容', onOverlayClick },
      });
      vi.runAllTimers();
      await nextTick();

      await w.find('.t-drawer__mask').trigger('click');
      expect(onOverlayClick).toHaveBeenCalledTimes(1);
      expect(onOverlayClick.mock.calls[0][0].e).toBeInstanceOf(MouseEvent);
      w.unmount();
    });

    it('onEscKeydown', async () => {
      const onEscKeydown = vi.fn();
      const w = mount(Drawer, {
        attachTo: document.body,
        props: { visible: true, body: '内容', closeOnEscKeydown: true, onEscKeydown },
      });
      vi.runAllTimers();
      await nextTick();

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await nextTick();
      expect(onEscKeydown).toHaveBeenCalledTimes(1);
      expect(onEscKeydown.mock.calls[0][0].e).toBeInstanceOf(KeyboardEvent);
      w.unmount();
    });

    it('onSizeDragEnd', async () => {
      const onSizeDragEnd = vi.fn();
      const w = mount(Drawer, {
        props: { visible: true, body: '内容', sizeDraggable: true, placement: 'left', size: '200', onSizeDragEnd },
      });
      vi.runAllTimers();
      await nextTick();

      const content = w.find('.t-drawer__content-wrapper');
      moveElement(content.element.lastChild as Element, 400, 100);
      await nextTick();
      expect(onSizeDragEnd).toHaveBeenCalled();
      expect(onSizeDragEnd.mock.calls[0][0].e).toBeInstanceOf(MouseEvent);
      expect(typeof onSizeDragEnd.mock.calls[0][0].size).toBe('number');
      w.unmount();
    });

    it('update:visible', async () => {
      const w = mount(Drawer, {
        props: { visible: true, body: '内容', closeBtn: true },
      });
      vi.runAllTimers();
      await nextTick();

      await w.find('.t-drawer__close-btn').trigger('click');
      const emitted = w.emitted('update:visible');
      expect(emitted).toBeTruthy();
      expect(emitted?.[0]).toEqual([false]);
      w.unmount();
    });
  });

  // ==================== Edge Cases ====================
  describe('edge cases', () => {
    it('rapid open/close', async () => {
      const w = mount(Drawer, {
        props: { visible: false, body: '内容' },
      });
      await nextTick();

      await w.setProps({ visible: true });
      await w.setProps({ visible: false });
      await w.setProps({ visible: true });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.t-drawer').exists()).toBe(true);
      w.unmount();
    });

    it('non-escape key does not trigger close', async () => {
      const onClose = vi.fn();
      const w = mount(Drawer, {
        attachTo: document.body,
        props: { visible: true, body: '内容', closeOnEscKeydown: true, onClose },
      });
      vi.runAllTimers();
      await nextTick();

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await nextTick();
      expect(onClose).not.toHaveBeenCalled();
      w.unmount();
    });

    it('push mode with placement changes', async () => {
      const container = document.createElement('div');
      container.style.position = 'relative';
      document.body.appendChild(container);

      const w = mount(Drawer, {
        attachTo: container,
        props: { visible: true, body: '内容', mode: 'push', placement: 'right' },
      });
      vi.runAllTimers();
      await nextTick();

      await w.setProps({ placement: 'left' });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.t-drawer--left').exists()).toBe(true);
      w.unmount();
      container.remove();
    });

    it('push mode visible toggle', async () => {
      const container = document.createElement('div');
      container.style.position = 'relative';
      document.body.appendChild(container);

      const w = mount(Drawer, {
        attachTo: container,
        props: { visible: true, body: '内容', mode: 'push', placement: 'left', size: '300px' },
      });
      vi.runAllTimers();
      await nextTick();

      await w.setProps({ visible: false });
      vi.runAllTimers();
      await nextTick();

      await w.setProps({ visible: true });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.t-drawer').exists()).toBe(true);
      w.unmount();
      container.remove();
    });

    it('push mode with all placements', async () => {
      for (const p of ['left', 'right', 'top', 'bottom'] as const) {
        const container = document.createElement('div');
        container.style.position = 'relative';
        document.body.appendChild(container);

        const w = mount(Drawer, {
          attachTo: container,
          props: { visible: true, body: '内容', mode: 'push', placement: p, size: '200px' },
        });
        vi.runAllTimers();
        await nextTick();
        expect(w.find(`.t-drawer--${p}`).exists()).toBe(true);
        w.unmount();
        container.remove();
      }
    });

    it('destroyOnClose changed to false then reopen', async () => {
      const w = mount(Drawer, {
        props: { visible: true, body: '内容', destroyOnClose: true },
      });
      vi.runAllTimers();
      await nextTick();

      await w.setProps({ visible: false });
      vi.advanceTimersByTime(350);
      await nextTick();
      expect(w.find('.t-drawer').exists()).toBe(false);

      await w.setProps({ destroyOnClose: false });
      await w.setProps({ visible: true });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.t-drawer').exists()).toBe(true);
      w.unmount();
    });

    it('sizeDraggable userSelect:none during drag', async () => {
      const w = mount(Drawer, {
        props: { visible: true, body: '内容', sizeDraggable: true, placement: 'left', size: '200' },
      });
      vi.runAllTimers();
      await nextTick();

      const content = w.find('.t-drawer__content-wrapper');
      const dragHandle = content.element.lastChild as Element;

      dragHandle.dispatchEvent(new FakeMouseEvent('mousedown', {}));
      await nextTick();
      expect((content.element as HTMLElement).style.userSelect).toBe('none');

      document.dispatchEvent(new FakeMouseEvent('mouseup', { x: 300, y: 100 }));
      await nextTick();
      expect((content.element as HTMLElement).style.userSelect).not.toBe('none');
      w.unmount();
    });

    it('sizeDraggable drag with all placements', async () => {
      const placements = [
        { p: 'left' as const, x: 400, y: 100 },
        { p: 'right' as const, x: 200, y: 100 },
        { p: 'top' as const, x: 100, y: 300 },
        { p: 'bottom' as const, x: 100, y: 200 },
      ];

      for (const { p, x, y } of placements) {
        const onSizeDragEnd = vi.fn();
        const w = mount(Drawer, {
          props: { visible: true, body: '内容', sizeDraggable: true, placement: p, size: '200', onSizeDragEnd },
        });
        vi.runAllTimers();
        await nextTick();

        const content = w.find('.t-drawer__content-wrapper');
        moveElement(content.element.lastChild as Element, x, y);
        await nextTick();
        expect(onSizeDragEnd).toHaveBeenCalled();
        expect(onSizeDragEnd.mock.calls[0][0].e).toBeInstanceOf(MouseEvent);
        expect(typeof onSizeDragEnd.mock.calls[0][0].size).toBe('number');
        w.unmount();
      }
    });

    it('sizeDraggable with min/max limits', async () => {
      const w = mount(Drawer, {
        props: { visible: true, body: '内容', sizeDraggable: { min: 100, max: 300 }, placement: 'left', size: '200' },
      });
      vi.runAllTimers();
      await nextTick();

      const content = w.find('.t-drawer__content-wrapper');
      moveElement(content.element.lastChild as Element, 500, 100);
      await nextTick();
      expect((content.element as HTMLElement).style.width).toBe('300px');
      w.unmount();
    });

    it('preventScrollThrough with lazy and visible toggling', async () => {
      const w = mount(Drawer, {
        attachTo: document.body,
        props: { visible: false, body: '内容', preventScrollThrough: true, lazy: true },
      });
      await nextTick();

      await w.setProps({ visible: true });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.t-drawer').exists()).toBe(true);

      await w.setProps({ visible: false });
      vi.advanceTimersByTime(200);
      await nextTick();

      await w.setProps({ visible: true });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.t-drawer').exists()).toBe(true);
      w.unmount();
    });

    it('preventScrollThrough multiple open/close cycles', async () => {
      const w = mount(Drawer, {
        attachTo: document.body,
        props: { visible: true, body: '内容', preventScrollThrough: true },
      });
      vi.runAllTimers();
      await nextTick();

      await w.setProps({ visible: false });
      await nextTick();

      await w.setProps({ visible: true });
      vi.runAllTimers();
      await nextTick();

      await w.setProps({ visible: false });
      vi.advanceTimersByTime(200);
      await nextTick();
      expect(w.find('.t-drawer--open').exists()).toBe(false);
      w.unmount();
    });

    it('showInAttachedElement prevents scroll through style', async () => {
      const w = mount(Drawer, {
        props: { visible: true, body: '内容', showInAttachedElement: true, preventScrollThrough: true },
      });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.t-drawer--attach').exists()).toBe(true);
      w.unmount();
    });

    it('v-model:visible two-way binding', async () => {
      const visible = ref(true);
      const w = mount(Drawer, {
        props: {
          visible: visible.value,
          body: '内容',
          closeBtn: true,
          'onUpdate:visible': (val: boolean) => {
            visible.value = val;
          },
        },
      });
      vi.runAllTimers();
      await nextTick();

      await w.find('.t-drawer__close-btn').trigger('click');
      expect(visible.value).toBe(false);
      w.unmount();
    });

    it('component unmount cleanup', async () => {
      const w = mount(Drawer, {
        attachTo: document.body,
        props: { visible: true, body: '内容' },
      });
      vi.runAllTimers();
      await nextTick();
      expect(w.find('.t-drawer').exists()).toBe(true);
      w.unmount();
    });
  });
});
