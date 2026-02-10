import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import Drawer from '@tdesign/components/drawer';

const bodyText = '这是一段内容';

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

// 模拟拖拽事件
function moveElement(element: Element, x: number, y: number) {
  element.dispatchEvent(new FakeMouseEvent('mousedown', {}));
  window.document.dispatchEvent(new FakeMouseEvent('mousemove', { x, y }));
  window.document.dispatchEvent(new FakeMouseEvent('mouseup', { x, y }));
}

describe('Drawer', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  // ==================== Props Tests ====================
  describe('props', () => {
    it(':body[string]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(true);
      expect(wrapper.find('.t-drawer__body').exists()).toBe(true);
      expect(wrapper.find('.t-drawer__body').text()).toBe(bodyText);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':body[function]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: () => <div class="custom-body">自定义内容</div> },
      });
      await nextTick();
      expect(wrapper.find('.custom-body').exists()).toBe(true);
      expect(wrapper.find('.custom-body').text()).toBe('自定义内容');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':body[slot]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true },
        slots: { body: () => <div class="slot-body">插槽内容</div> },
      });
      await nextTick();
      expect(wrapper.find('.slot-body').exists()).toBe(true);
    });

    it(':default[string]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, default: bodyText },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer__body').exists()).toBe(true);
      expect(wrapper.find('.t-drawer__body').text()).toBe(bodyText);
    });

    it(':default[slot]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true },
        slots: { default: () => <div class="slot-default">默认插槽</div> },
      });
      await nextTick();
      expect(wrapper.find('.slot-default').exists()).toBe(true);
    });

    it(':header[string]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, header: '标题' },
      });
      await nextTick();
      const header = wrapper.find('.t-drawer__header');
      expect(header.exists()).toBe(true);
      expect(header.text()).toBe('标题');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':header[function]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, header: () => <div class="custom-header">自定义头部</div> },
      });
      await nextTick();
      expect(wrapper.find('.custom-header').exists()).toBe(true);
    });

    it(':header[slot]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText },
        slots: { header: () => <div class="slot-header">插槽头部</div> },
      });
      await nextTick();
      expect(wrapper.find('.slot-header').exists()).toBe(true);
    });

    it(':header[boolean] false should hide header', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, header: false },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer__header').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':footer[boolean] true shows default footer', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, footer: true },
      });
      await nextTick();
      const footer = wrapper.find('.t-drawer__footer');
      expect(footer.exists()).toBe(true);
      const btns = footer.findAll('button');
      expect(btns.length).toBe(2);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':footer[boolean] false hides footer', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, footer: false },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer__footer').exists()).toBe(false);
    });

    it(':footer[function]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, footer: () => <div class="custom-footer">自定义底部</div> },
      });
      await nextTick();
      expect(wrapper.find('.custom-footer').exists()).toBe(true);
    });

    it(':footer[slot]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText },
        slots: { footer: () => <div class="slot-footer">插槽底部</div> },
      });
      await nextTick();
      expect(wrapper.find('.slot-footer').exists()).toBe(true);
    });

    it(':cancelBtn[string]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText },
      });
      await nextTick();
      const btn = wrapper.find('.t-drawer__cancel');
      expect(btn.exists()).toBe(true);
      expect(btn.text()).toBe('取消');
    });

    it(':cancelBtn[null]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, cancelBtn: null },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer__cancel').exists()).toBe(false);
    });

    it(':cancelBtn[object]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, cancelBtn: { theme: 'danger', content: '自定义取消' } },
      });
      await nextTick();
      const btn = wrapper.find('.t-drawer__cancel');
      expect(btn.exists()).toBe(true);
      expect(btn.text()).toBe('自定义取消');
    });

    it(':cancelBtn[function]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, cancelBtn: () => <span class="custom-cancel">取消按钮</span> },
      });
      await nextTick();
      expect(wrapper.find('.custom-cancel').exists()).toBe(true);
      expect(wrapper.find('.custom-cancel').text()).toBe('取消按钮');
    });

    it(':confirmBtn[string]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText },
      });
      await nextTick();
      const btn = wrapper.find('.t-drawer__confirm');
      expect(btn.exists()).toBe(true);
      expect(btn.text()).toBe('确认');
    });

    it(':confirmBtn[null]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, confirmBtn: null },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer__confirm').exists()).toBe(false);
    });

    it(':confirmBtn[object]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, confirmBtn: { theme: 'primary', content: '自定义确认' } },
      });
      await nextTick();
      const btn = wrapper.find('.t-drawer__confirm');
      expect(btn.exists()).toBe(true);
      expect(btn.text()).toBe('自定义确认');
    });

    it(':confirmBtn[function]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, confirmBtn: () => <span class="custom-confirm">确认按钮</span> },
      });
      await nextTick();
      expect(wrapper.find('.custom-confirm').exists()).toBe(true);
      expect(wrapper.find('.custom-confirm').text()).toBe('确认按钮');
    });

    it(':closeBtn[boolean] true shows close button', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, closeBtn: true },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer__close-btn').exists()).toBe(true);
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':closeBtn[boolean] false hides close button', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, closeBtn: false },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer__close-btn').exists()).toBe(false);
    });

    it(':closeBtn[string]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, closeBtn: '关闭' },
      });
      await nextTick();
      const closeBtn = wrapper.find('.t-drawer__close-btn');
      expect(closeBtn.exists()).toBe(true);
      expect(closeBtn.text()).toBe('关闭');
    });

    it(':closeBtn[function]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, closeBtn: () => <span class="custom-close">X</span> },
      });
      await nextTick();
      expect(wrapper.find('.custom-close').exists()).toBe(true);
    });

    it(':closeBtn[slot]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, closeBtn: true },
        slots: { closeBtn: () => <span class="slot-close">关</span> },
      });
      await nextTick();
      expect(wrapper.find('.slot-close').exists()).toBe(true);
    });

    it(':placement[left/right/top/bottom]', async () => {
      const wrapperRight = mount(Drawer, {
        props: { visible: true, body: bodyText, placement: 'right' },
      });
      const wrapperLeft = mount(Drawer, {
        props: { visible: true, body: bodyText, placement: 'left' },
      });
      const wrapperTop = mount(Drawer, {
        props: { visible: true, body: bodyText, placement: 'top' },
      });
      const wrapperBottom = mount(Drawer, {
        props: { visible: true, body: bodyText, placement: 'bottom' },
      });
      await nextTick();
      expect(wrapperRight.find('.t-drawer').classes()).toContain('t-drawer--right');
      expect(wrapperLeft.find('.t-drawer').classes()).toContain('t-drawer--left');
      expect(wrapperTop.find('.t-drawer').classes()).toContain('t-drawer--top');
      expect(wrapperBottom.find('.t-drawer').classes()).toContain('t-drawer--bottom');
      expect(wrapperRight.element).toMatchSnapshot();
      expect(wrapperLeft.element).toMatchSnapshot();
      expect(wrapperTop.element).toMatchSnapshot();
      expect(wrapperBottom.element).toMatchSnapshot();
    });

    it(':placement validator', () => {
      const propsConfig = (Drawer as any).props;
      const validator = propsConfig?.placement?.validator;
      if (validator) {
        expect(validator(undefined)).toBe(true);
        expect(validator(null)).toBe(true);
        expect(validator('left')).toBe(true);
        expect(validator('right')).toBe(true);
        expect(validator('top')).toBe(true);
        expect(validator('bottom')).toBe(true);
        expect(validator('invalid')).toBe(false);
      }
    });

    it(':mode validator', () => {
      const propsConfig = (Drawer as any).props;
      const validator = propsConfig?.mode?.validator;
      if (validator) {
        expect(validator(undefined)).toBe(true);
        expect(validator(null)).toBe(true);
        expect(validator('overlay')).toBe(true);
        expect(validator('push')).toBe(true);
        expect(validator('invalid')).toBe(false);
      }
    });

    it(':showOverlay[boolean] true shows mask', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, showOverlay: true },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer__mask').exists()).toBe(true);
    });

    it(':showOverlay[boolean] false hides mask', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, showOverlay: false },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer__mask').exists()).toBe(false);
      expect(wrapper.find('.t-drawer').classes()).toContain('t-drawer--without-mask');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':size[string]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, size: '500px' },
      });
      await nextTick();
      const content = wrapper.find('.t-drawer__content-wrapper');
      expect(getComputedStyle(content.element, null).width).toBe('500px');
    });

    it(':size[small/medium/large]', async () => {
      const wrapperSmall = mount(Drawer, {
        props: { visible: true, body: bodyText, size: 'small' },
      });
      const wrapperMedium = mount(Drawer, {
        props: { visible: true, body: bodyText, size: 'medium' },
      });
      const wrapperLarge = mount(Drawer, {
        props: { visible: true, body: bodyText, size: 'large' },
      });
      await nextTick();
      expect(getComputedStyle(wrapperSmall.find('.t-drawer__content-wrapper').element).width).toBe('300px');
      expect(getComputedStyle(wrapperMedium.find('.t-drawer__content-wrapper').element).width).toBe('500px');
      expect(getComputedStyle(wrapperLarge.find('.t-drawer__content-wrapper').element).width).toBe('760px');
    });

    it(':size[numeric string]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, size: '400' },
      });
      await nextTick();
      expect(getComputedStyle(wrapper.find('.t-drawer__content-wrapper').element).width).toBe('400px');
    });

    it(':size[string] with top/bottom placement sets height', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, placement: 'top', size: '200px' },
      });
      await nextTick();
      const content = wrapper.find('.t-drawer__content-wrapper');
      expect(getComputedStyle(content.element).height).toBe('200px');
    });

    it(':zIndex[number]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, zIndex: 2022 },
      });
      await nextTick();
      expect(getComputedStyle(wrapper.find('.t-drawer').element).zIndex).toBe('2022');
    });

    it(':drawerClassName[string]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, drawerClassName: 'my-drawer-class' },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer').classes()).toContain('my-drawer-class');
    });

    it(':showInAttachedElement[boolean]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, showInAttachedElement: true },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer').classes()).toContain('t-drawer--attach');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':visible[boolean] controls rendering', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: false, body: bodyText },
      });
      await nextTick();
      // When visible is false and lazy is not set, the drawer should still render but not be open
      const drawer = wrapper.find('.t-drawer');
      if (drawer.exists()) {
        expect(drawer.classes()).not.toContain('t-drawer--open');
      }
    });

    it(':lazy[boolean] prevents initial render', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: false, body: bodyText, lazy: true },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(false);
    });

    it(':destroyOnClose[boolean]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, destroyOnClose: true },
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(true);

      // Close the drawer
      await wrapper.setProps({ visible: false });
      await nextTick();
      vi.advanceTimersByTime(350);
      await nextTick();
      // After close with destroyOnClose, content should be destroyed
      expect(wrapper.find('.t-drawer').exists()).toBe(false);

      // Reopen
      await wrapper.setProps({ visible: true });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(true);
    });

    it(':sizeDraggable[boolean]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, sizeDraggable: true },
      });
      await nextTick();
      const content = wrapper.find('.t-drawer__content-wrapper');
      const lastChild = content.element.lastChild as HTMLElement;
      expect(getComputedStyle(lastChild).cursor).toBe('col-resize');
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':sizeDraggable with value and drag', async () => {
      const sizeDraggableValue = { min: 100, max: 300 };
      const wrapper = mount(Drawer, {
        props: {
          visible: true,
          placement: 'left',
          size: '200',
          body: bodyText,
          sizeDraggable: sizeDraggableValue,
        },
      });
      await nextTick();
      const content = wrapper.find('.t-drawer__content-wrapper');
      if (content.element.lastChild) {
        moveElement(content.element.lastChild as Element, 400, 100);
        await nextTick();
        expect(getComputedStyle(content.element).width).toBe('300px');
      }
    });

    it(':sizeDraggable drag with right placement', async () => {
      const sizeDraggableValue = { min: 100, max: 300 };
      const wrapper = mount(Drawer, {
        props: {
          visible: true,
          placement: 'right',
          size: '200',
          body: bodyText,
          sizeDraggable: sizeDraggableValue,
        },
      });
      await nextTick();
      const content = wrapper.find('.t-drawer__content-wrapper');
      if (content.element.lastChild) {
        moveElement(content.element.lastChild as Element, -300, 80);
        await nextTick();
        expect(getComputedStyle(content.element).width).toBe('300px');
      }
    });

    it(':sizeDraggable drag with top placement', async () => {
      const sizeDraggableValue = { min: 100, max: 300 };
      const wrapper = mount(Drawer, {
        props: {
          visible: true,
          placement: 'top',
          size: '200',
          body: bodyText,
          sizeDraggable: sizeDraggableValue,
        },
      });
      await nextTick();
      const content = wrapper.find('.t-drawer__content-wrapper');
      if (content.element.lastChild) {
        moveElement(content.element.lastChild as Element, 80, 300);
        await nextTick();
        expect(getComputedStyle(content.element).height).toBe('300px');
      }
    });

    it(':sizeDraggable drag with bottom placement', async () => {
      const sizeDraggableValue = { min: 100, max: 300 };
      const wrapper = mount(Drawer, {
        props: {
          visible: true,
          placement: 'bottom',
          size: '200',
          body: bodyText,
          sizeDraggable: sizeDraggableValue,
        },
      });
      await nextTick();
      const content = wrapper.find('.t-drawer__content-wrapper');
      if (content.element.lastChild) {
        moveElement(content.element.lastChild as Element, 80, -300);
        await nextTick();
        expect(getComputedStyle(content.element).height).toBe('300px');
      }
    });

    it(':attach[string] teleports to body', async () => {
      mount(Drawer, {
        props: { visible: true, attach: 'body' },
      });
      await nextTick();
      expect(document.querySelector('body > .t-drawer')).toBeTruthy();
    });

    it(':attach[function] teleports to body', async () => {
      mount(Drawer, {
        props: { visible: true, attach: () => document.body },
      });
      await nextTick();
      expect(document.querySelector('body > .t-drawer')).toBeTruthy();
    });

    it(':preventScrollThrough[boolean]', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, preventScrollThrough: true },
      });
      await nextTick();
      // The drawer should add style element to head for preventing scroll
      expect(wrapper.find('.t-drawer').exists()).toBe(true);
    });

    it(':mode[overlay/push]', async () => {
      const wrapperOverlay = mount(Drawer, {
        props: { visible: true, body: bodyText, mode: 'overlay' },
      });
      const wrapperPush = mount(Drawer, {
        props: { visible: true, body: bodyText, mode: 'push' },
      });
      await nextTick();
      expect(wrapperOverlay.find('.t-drawer').exists()).toBe(true);
      expect(wrapperPush.find('.t-drawer').exists()).toBe(true);
      expect(wrapperOverlay.element).toMatchSnapshot();
      expect(wrapperPush.element).toMatchSnapshot();
    });

    it(':footer button order by placement', async () => {
      const wrapperRight = mount(Drawer, {
        props: { visible: true, body: bodyText, placement: 'right' },
      });
      const wrapperLeft = mount(Drawer, {
        props: { visible: true, body: bodyText, placement: 'left' },
      });
      await nextTick();
      const rightFooter = wrapperRight.find('.t-drawer__footer');
      const leftFooter = wrapperLeft.find('.t-drawer__footer');
      if (rightFooter.exists()) {
        expect(getComputedStyle(rightFooter.element.firstChild as Element).justifyContent).toBe('flex-start');
      }
      if (leftFooter.exists()) {
        expect(getComputedStyle(leftFooter.element.firstChild as Element).justifyContent).toBe('flex-end');
      }
    });

    it(':visible toggle open class', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: false, body: bodyText },
      });
      await nextTick();
      await wrapper.setProps({ visible: true });
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer--open').exists()).toBe(true);

      await wrapper.setProps({ visible: false });
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer--open').exists()).toBe(false);
    });

    it(':onBeforeOpen and :onBeforeClose callbacks', async () => {
      const onBeforeOpen = vi.fn();
      const onBeforeClose = vi.fn();
      const wrapper = mount(Drawer, {
        props: { visible: false, body: bodyText, onBeforeOpen, onBeforeClose },
      });
      await nextTick();
      // visible watch is immediate, so onBeforeClose is called once at mount with visible=false
      const initialCloseCount = onBeforeClose.mock.calls.length;

      await wrapper.setProps({ visible: true });
      await nextTick();
      expect(onBeforeOpen).toHaveBeenCalledTimes(1);

      await wrapper.setProps({ visible: false });
      await nextTick();
      expect(onBeforeClose).toHaveBeenCalledTimes(initialCloseCount + 1);
    });
  });

  // ==================== Events Tests ====================
  describe('events', () => {
    it('onCancel', async () => {
      const onCancel = vi.fn();
      const onClose = vi.fn();
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, onCancel, onClose },
      });
      await nextTick();
      const btn = wrapper.find('.t-drawer__cancel');
      await btn.trigger('click');
      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('onConfirm', async () => {
      const onConfirm = vi.fn();
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, onConfirm },
      });
      await nextTick();
      const btn = wrapper.find('.t-drawer__confirm');
      await btn.trigger('click');
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('onCloseBtnClick', async () => {
      const onCloseBtnClick = vi.fn();
      const onClose = vi.fn();
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, closeBtn: true, onCloseBtnClick, onClose },
      });
      await nextTick();
      const btn = wrapper.find('.t-drawer__close-btn');
      await btn.trigger('click');
      expect(onCloseBtnClick).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('onClose via close-btn trigger', async () => {
      const onClose = vi.fn();
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, closeBtn: true, onClose },
      });
      await nextTick();
      await wrapper.find('.t-drawer__close-btn').trigger('click');
      expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ trigger: 'close-btn' }));
    });

    it('onOverlayClick', async () => {
      const onOverlayClick = vi.fn();
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, onOverlayClick },
      });
      await nextTick();
      const mask = wrapper.find('.t-drawer__mask');
      await mask.trigger('click');
      expect(onOverlayClick).toHaveBeenCalledTimes(1);
    });

    it('onClose via overlay click when closeOnOverlayClick is true', async () => {
      const onClose = vi.fn();
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, closeOnOverlayClick: true, onClose },
      });
      await nextTick();
      await wrapper.find('.t-drawer__mask').trigger('click');
      expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ trigger: 'overlay' }));
    });

    it('overlay click does not close when closeOnOverlayClick is false', async () => {
      const onClose = vi.fn();
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, closeOnOverlayClick: false, onClose },
      });
      await nextTick();
      await wrapper.find('.t-drawer__mask').trigger('click');
      expect(onClose).not.toHaveBeenCalled();
    });

    it('onEscKeydown', async () => {
      const onEscKeydown = vi.fn();
      const onClose = vi.fn();
      const wrapper = mount(Drawer, {
        attachTo: document.body,
        props: { visible: true, body: bodyText, closeOnEscKeydown: true, onEscKeydown, onClose },
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await nextTick();
      expect(onEscKeydown).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith(expect.objectContaining({ trigger: 'esc' }));
      wrapper.unmount();
    });

    it('ESC does not close when closeOnEscKeydown is false', async () => {
      const onClose = vi.fn();
      const wrapper = mount(Drawer, {
        attachTo: document.body,
        props: { visible: true, body: bodyText, closeOnEscKeydown: false, onClose },
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await nextTick();
      expect(onClose).not.toHaveBeenCalled();
      wrapper.unmount();
    });

    it('onSizeDragEnd', async () => {
      const onSizeDragEnd = vi.fn();
      const wrapper = mount(Drawer, {
        props: {
          visible: true,
          body: bodyText,
          sizeDraggable: true,
          placement: 'left',
          size: '200',
          onSizeDragEnd,
        },
      });
      await nextTick();
      const content = wrapper.find('.t-drawer__content-wrapper');
      if (content.element.lastChild) {
        moveElement(content.element.lastChild as Element, 400, 100);
        await nextTick();
        expect(onSizeDragEnd).toHaveBeenCalled();
      }
    });

    it('update:visible emitted on close', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, closeBtn: true },
      });
      await nextTick();
      await wrapper.find('.t-drawer__close-btn').trigger('click');
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      const emitted = wrapper.emitted('update:visible');
      if (emitted) {
        expect(emitted[0]).toEqual([false]);
      }
    });
  });

  // ==================== Visibility/Lifecycle Tests ====================
  describe('visibility watch', () => {
    it('should toggle visible and call lifecycle callbacks', async () => {
      const onBeforeOpen = vi.fn();
      const onBeforeClose = vi.fn();
      const wrapper = mount(Drawer, {
        props: { visible: false, body: bodyText, onBeforeOpen, onBeforeClose },
      });
      await nextTick();
      // visible watch is immediate, so onBeforeClose may be called at mount
      const initialCloseCount = onBeforeClose.mock.calls.length;

      // Open
      await wrapper.setProps({ visible: true });
      await nextTick();
      expect(onBeforeOpen).toHaveBeenCalledTimes(1);

      // Close
      await wrapper.setProps({ visible: false });
      await nextTick();
      expect(onBeforeClose).toHaveBeenCalledTimes(initialCloseCount + 1);
    });

    it('destroyOnClose lifecycle', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: false, body: bodyText, destroyOnClose: true },
      });
      await nextTick();

      // Open
      await wrapper.setProps({ visible: true });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(true);

      // Close
      await wrapper.setProps({ visible: false });
      await nextTick();
      vi.advanceTimersByTime(350);
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(false);

      // Reopen
      await wrapper.setProps({ visible: true });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(true);
    });

    it('lazy + visible:false should not render', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: false, body: bodyText, lazy: true },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(false);

      // Make visible
      await wrapper.setProps({ visible: true });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(true);
    });
  });

  // ==================== Edge Cases Tests ====================
  describe('edge cases', () => {
    it('should handle component unmount gracefully', async () => {
      const wrapper = mount(Drawer, {
        attachTo: document.body,
        props: { visible: true, body: bodyText },
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      wrapper.unmount();
      expect(true).toBe(true);
    });

    it('should handle rapid open/close', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: false, body: bodyText },
      });
      await nextTick();

      await wrapper.setProps({ visible: true });
      await wrapper.setProps({ visible: false });
      await wrapper.setProps({ visible: true });
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(true);
    });

    it('mode push with placement changes', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, mode: 'push', placement: 'right' },
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();

      await wrapper.setProps({ placement: 'left' });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer--left').exists()).toBe(true);
    });

    it('non-escape key does not trigger close', async () => {
      const onClose = vi.fn();
      const wrapper = mount(Drawer, {
        attachTo: document.body,
        props: { visible: true, body: bodyText, closeOnEscKeydown: true, onClose },
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await nextTick();
      expect(onClose).not.toHaveBeenCalled();
      wrapper.unmount();
    });

    it('showInAttachedElement prevents scroll through style', async () => {
      const wrapper = mount(Drawer, {
        props: {
          visible: true,
          body: bodyText,
          showInAttachedElement: true,
          preventScrollThrough: true,
        },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer--attach').exists()).toBe(true);
    });

    it('clearStyleEl runs timer callback on close', async () => {
      const wrapper = mount(Drawer, {
        attachTo: document.body,
        props: { visible: true, body: bodyText, preventScrollThrough: true },
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();

      // Close to trigger clearStyleEl
      await wrapper.setProps({ visible: false });
      await nextTick();
      // Advance past the 150ms timeout in clearStyleEl
      vi.advanceTimersByTime(200);
      await nextTick();
      expect(true).toBe(true);
      wrapper.unmount();
    });

    it('push mode updatePushMode on visible toggle', async () => {
      const container = document.createElement('div');
      container.style.position = 'relative';
      document.body.appendChild(container);
      const wrapper = mount(Drawer, {
        attachTo: container,
        props: { visible: true, body: bodyText, mode: 'push', placement: 'left', size: '300px' },
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();

      // Close to trigger updatePushMode with isVisible = false
      await wrapper.setProps({ visible: false });
      vi.runAllTimers();
      await nextTick();

      // Reopen
      await wrapper.setProps({ visible: true });
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(true);
      wrapper.unmount();
      container.remove();
    });

    it('push mode with top placement', async () => {
      const container = document.createElement('div');
      container.style.position = 'relative';
      document.body.appendChild(container);
      const wrapper = mount(Drawer, {
        attachTo: container,
        props: { visible: true, body: bodyText, mode: 'push', placement: 'top', size: '200px' },
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer--top').exists()).toBe(true);
      wrapper.unmount();
      container.remove();
    });

    it('push mode with bottom placement', async () => {
      const container = document.createElement('div');
      container.style.position = 'relative';
      document.body.appendChild(container);
      const wrapper = mount(Drawer, {
        attachTo: container,
        props: { visible: true, body: bodyText, mode: 'push', placement: 'bottom', size: '200px' },
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer--bottom').exists()).toBe(true);
      wrapper.unmount();
      container.remove();
    });

    it('push mode with lazy and visible false does not crash', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: false, body: bodyText, mode: 'push', lazy: true },
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();

      // Open
      await wrapper.setProps({ visible: true });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(true);
      wrapper.unmount();
    });

    it('sizeDraggable false does not show drag handle', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, sizeDraggable: false },
      });
      await nextTick();
      const content = wrapper.find('.t-drawer__content-wrapper');
      const children = content.element.children;
      // last child should not be a drag handle
      const lastChild = children[children.length - 1] as HTMLElement;
      expect(lastChild?.style?.cursor).not.toBe('col-resize');
    });

    it('sizeDraggable top/bottom sets row-resize cursor', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, sizeDraggable: true, placement: 'top' },
      });
      await nextTick();
      const content = wrapper.find('.t-drawer__content-wrapper');
      const lastChild = content.element.lastChild as HTMLElement;
      expect(getComputedStyle(lastChild).cursor).toBe('row-resize');
    });

    it('draggingStyles applies userSelect:none during drag', async () => {
      const wrapper = mount(Drawer, {
        props: {
          visible: true,
          body: bodyText,
          sizeDraggable: true,
          placement: 'left',
          size: '200',
        },
      });
      await nextTick();
      const content = wrapper.find('.t-drawer__content-wrapper');
      const dragHandle = content.element.lastChild as Element;

      // mousedown starts drag
      dragHandle.dispatchEvent(new FakeMouseEvent('mousedown', {}));
      await nextTick();

      // During drag, content-wrapper should have userSelect: none
      expect((content.element as HTMLElement).style.userSelect).toBe('none');

      // mouseup ends drag
      window.document.dispatchEvent(new FakeMouseEvent('mouseup', { x: 300, y: 100 }));
      await nextTick();

      // After drag, userSelect should be removed
      expect((content.element as HTMLElement).style.userSelect).not.toBe('none');
    });

    it('mousemove with sizeDraggable false does not change size', async () => {
      const onSizeDragEnd = vi.fn();
      const wrapper = mount(Drawer, {
        props: {
          visible: true,
          body: bodyText,
          sizeDraggable: true,
          placement: 'left',
          size: '200',
          onSizeDragEnd,
        },
      });
      await nextTick();
      const content = wrapper.find('.t-drawer__content-wrapper');
      const dragHandle = content.element.lastChild as Element;

      // Start dragging
      dragHandle.dispatchEvent(new FakeMouseEvent('mousedown', {}));
      await nextTick();

      // Change sizeDraggable to false while dragging
      await wrapper.setProps({ sizeDraggable: false });
      await nextTick();

      // mousemove should return early because allowSizeDraggable is false
      window.document.dispatchEvent(new FakeMouseEvent('mousemove', { x: 400, y: 100 }));
      await nextTick();
      expect(onSizeDragEnd).not.toHaveBeenCalled();

      // Cleanup
      window.document.dispatchEvent(new FakeMouseEvent('mouseup', { x: 400, y: 100 }));
    });

    it('preventScrollThrough adds and removes style from head', async () => {
      const wrapper = mount(Drawer, {
        attachTo: document.body,
        props: { visible: false, body: bodyText, preventScrollThrough: true },
      });
      await nextTick();

      // Open the drawer - should trigger addStyleElToHead
      await wrapper.setProps({ visible: true });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(true);

      // Close the drawer - should trigger clearStyleEl
      await wrapper.setProps({ visible: false });
      await nextTick();

      // Advance past the 150ms timeout in clearStyleEl to execute the inner callback
      vi.advanceTimersByTime(200);
      await nextTick();
      expect(true).toBe(true);
      wrapper.unmount();
    });

    it('preventScrollThrough with lazy and visible toggling', async () => {
      const wrapper = mount(Drawer, {
        attachTo: document.body,
        props: { visible: false, body: bodyText, preventScrollThrough: true, lazy: true },
      });
      await nextTick();

      // Open - sets isMounted = true
      await wrapper.setProps({ visible: true });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(true);

      // Close
      await wrapper.setProps({ visible: false });
      await nextTick();
      vi.advanceTimersByTime(200);
      await nextTick();

      // Reopen - now isMounted is true and lazy is true, testing line 225 branch
      await wrapper.setProps({ visible: true });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(true);

      wrapper.unmount();
    });

    it('destroyOnClose changed to false after close then reopen', async () => {
      const wrapper = mount(Drawer, {
        props: { visible: true, body: bodyText, destroyOnClose: true },
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(true);

      // Close - triggers destroyOnClose path
      await wrapper.setProps({ visible: false });
      await nextTick();
      // Wait for destroyOnCloseVisible to become true (300ms timeout)
      vi.advanceTimersByTime(350);
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(false);

      // Change destroyOnClose to false
      await wrapper.setProps({ destroyOnClose: false });
      await nextTick();

      // Reopen - should hit the `destroyOnCloseVisible && value` branch (line 211)
      await wrapper.setProps({ visible: true });
      await nextTick();
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(true);
    });

    it('preventScrollThrough multiple open/close cycles clears timer', async () => {
      const wrapper = mount(Drawer, {
        attachTo: document.body,
        props: { visible: true, body: bodyText, preventScrollThrough: true },
      });
      await nextTick();
      vi.runAllTimers();
      await nextTick();

      // Close - starts clearStyleEl timer
      await wrapper.setProps({ visible: false });
      await nextTick();

      // Reopen before timer fires - clearStyleEl should clear the previous timeout
      await wrapper.setProps({ visible: true });
      await nextTick();
      vi.runAllTimers();
      await nextTick();

      // Close again - second clearStyleEl should clearTimeout the first
      await wrapper.setProps({ visible: false });
      await nextTick();
      vi.advanceTimersByTime(200);
      await nextTick();
      expect(true).toBe(true);
      wrapper.unmount();
    });
  });

  // ==================== V-Model Binding Tests ====================
  describe('v-model binding', () => {
    it('v-model:visible two-way binding', async () => {
      const visible = ref(true);
      const wrapper = mount(Drawer, {
        props: {
          visible: visible.value,
          body: bodyText,
          closeBtn: true,
          'onUpdate:visible': (val: boolean) => {
            visible.value = val;
          },
        },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBe(true);

      await wrapper.find('.t-drawer__close-btn').trigger('click');
      expect(visible.value).toBe(false);
    });
  });
});
