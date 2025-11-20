// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import Drawer from '@tdesign/components/drawer';

const text = '这是一段内容';

// 事件兼容问题，使其支持 x, y 值
class FakeMouseEvent extends MouseEvent {
  constructor(type, values) {
    const { x, y, ...mouseValues } = values;
    super(type, mouseValues);

    Object.assign(this, {
      x: x || 0,
      y: y || 0,
    });
  }
}

// 模拟拖拽事件
function moveElement(element, x, y) {
  element.dispatchEvent(new FakeMouseEvent('mousedown', {}));
  window.document.dispatchEvent(new FakeMouseEvent('mousemove', { x, y }));
  window.document.dispatchEvent(new FakeMouseEvent('mouseup', { x, y }));
}

describe('Drawer', () => {
  describe(':props', () => {
    it(':attach', async () => {
      const visible = ref(true);
      mount(() => <Drawer visible={visible.value} attach="body" />);
      await nextTick();
      // 组件的attach使用了Teleport，所以wrapper.find等方法拿不到
      expect(document.querySelector('body > .t-drawer') !== null).toEqual(true);
    });

    it(':body', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Drawer visible={visible.value} body={text} />);
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBeTruthy();
      expect(wrapper.find('.t-drawer__body').exists()).toBeTruthy();
      expect(wrapper.find('.t-drawer__body').text()).toBe(text);
    });

    it(':default', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Drawer visible={visible.value} default={text} />);
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBeTruthy();
      expect(wrapper.find('.t-drawer__body').exists()).toBeTruthy();
      expect(wrapper.find('.t-drawer__body').text()).toBe(text);
    });

    it(':cancelBtn', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Drawer visible={visible.value} body={text} />);
      await nextTick();
      const btn = wrapper.find('.t-drawer__cancel');
      expect(btn.exists()).toBeTruthy();
      expect(btn.text()).toBe('取消');
    });

    it(':confirmBtn', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Drawer visible={visible.value} body={text} />);
      await nextTick();
      const btn = wrapper.find('.t-drawer__confirm');
      expect(btn.exists()).toBeTruthy();
      expect(btn.text()).toBe('确认');
    });

    it(':closeBtn', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Drawer visible={visible.value} body={text} closeBtn />);
      await nextTick();
      const btn = wrapper.findComponent(CloseIcon);
      expect(btn.exists()).toBeTruthy();
    });
    it(':footer', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Drawer visible={visible.value} body={text} />);
      await nextTick();
      const footer = wrapper.find('.t-drawer__footer');
      const btns = footer.findAll('button');
      expect(footer.exists()).toBeTruthy();
      expect(btns.length).toBe(2);
    });
    it(':header', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Drawer visible={visible.value} body={text} header="header" />);
      await nextTick();
      const header = wrapper.find('.t-drawer__header');
      expect(header.exists()).toBeTruthy();
      expect(header.text()).toBe('header');
    });

    it(':placement', async () => {
      const visible = ref(true);
      const wrapper1 = mount(() => <Drawer visible={visible.value} body={text} />);
      const wrapper2 = mount(() => <Drawer visible={visible.value} body={text} placement="left" />);
      const wrapper3 = mount(() => <Drawer visible={visible.value} body={text} placement="top" />);
      const wrapper4 = mount(() => <Drawer visible={visible.value} body={text} placement="bottom" />);
      await nextTick();
      const drawer1 = wrapper1.find('.t-drawer');
      const drawer2 = wrapper2.find('.t-drawer');
      const drawer3 = wrapper3.find('.t-drawer');
      const drawer4 = wrapper4.find('.t-drawer');
      expect(drawer1.classes()).toContain(`t-drawer--right`);
      expect(drawer2.classes()).toContain(`t-drawer--left`);
      expect(drawer3.classes()).toContain(`t-drawer--top`);
      expect(drawer4.classes()).toContain(`t-drawer--bottom`);
    });

    it(':showOverlay', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Drawer visible={visible.value} body={text} />);
      await nextTick();
      const mask = wrapper.find('.t-drawer__mask');
      expect(mask.exists()).toBeTruthy();
    });

    it(':size', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Drawer visible={visible.value} body={text} size="500px" />);
      await nextTick();
      const content = wrapper.find('.t-drawer__content-wrapper');
      expect(getComputedStyle(content.element, null).width).toBe('500px');
    });

    it(':sizeDraggable', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Drawer visible={visible.value} body={text} sizeDraggable />);
      await nextTick();
      const content = wrapper.find('.t-drawer__content-wrapper');
      expect(getComputedStyle(content.element.lastChild, null).cursor).toBe('col-resize');
    });

    it(':sizeDraggable value', async () => {
      const visible = ref(true);
      const sizeDraggableValue = {
        min: 100,
        max: 300,
      };
      const placement = ref('left');
      function updatePlacement(placementVal) {
        placement.value = placementVal;
      }

      const wrapper = mount(() => (
        <Drawer
          visible={visible.value}
          placement={placement.value}
          size={`200`}
          body={text}
          sizeDraggable={sizeDraggableValue}
        />
      ));
      const content = wrapper.find('.t-drawer__content-wrapper');
      moveElement(content.element.lastChild, 400, 100);
      await nextTick();
      expect(getComputedStyle(content.element, null).width).toBe('300px');
      updatePlacement('right');
      await nextTick();
      moveElement(content.element.lastChild, -300, 80);
      await nextTick();
      expect(getComputedStyle(content.element, null).width).toBe('300px');

      updatePlacement('top');
      await nextTick();
      moveElement(content.element.lastChild, 80, 300);
      await nextTick();
      expect(getComputedStyle(content.element, null).height).toBe('300px');

      updatePlacement('bottom');
      await nextTick();
      moveElement(content.element.lastChild, 80, -300);
      await nextTick();
      expect(getComputedStyle(content.element, null).height).toBe('300px');
    });

    it(':sizeDragEnd event', async () => {
      const visible = ref(true);
      const sizeDragEnd = vi.fn();
      const wrapper = mount(() => (
        <Drawer
          sizeDraggable
          visible={visible.value}
          placement={`left`}
          size={`200`}
          body={text}
          onSizeDragEnd={sizeDragEnd}
        />
      ));
      const content = wrapper.find('.t-drawer__content-wrapper');
      moveElement(content.element.lastChild, 400, 100);
      await nextTick();
      expect(sizeDragEnd).toBeCalled();
    });

    it(':zIndex', async () => {
      const visible = ref(true);
      const wrapper = mount(() => <Drawer visible={visible.value} body={text} zIndex={2022} />);
      await nextTick();
      const drawer = wrapper.find('.t-drawer');
      expect(getComputedStyle(drawer.element, null).zIndex).toBe('2022');
    });
  });

  describe(':events', () => {
    it(':onCancel', async () => {
      const visible = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => <Drawer visible={visible.value} onCancel={fn} />);
      await nextTick();
      const btn = wrapper.find('.t-drawer__cancel');
      await btn.trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onConfirm', async () => {
      const visible = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => <Drawer visible={visible.value} onConfirm={fn} />);
      await nextTick();
      const btn = wrapper.find('.t-drawer__confirm');
      await btn.trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onCloseBtnClick', async () => {
      const visible = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => <Drawer visible={visible.value} onCloseBtnClick={fn} closeBtn />);
      await nextTick();
      const btn = wrapper.find('.t-drawer__close-btn');
      await btn.trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onClose', async () => {
      const visible = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => <Drawer visible={visible.value} onClose={fn} closeBtn />);
      await nextTick();
      const btn = wrapper.find('.t-drawer__close-btn');
      await btn.trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onOverlayClick', async () => {
      const visible = ref(true);
      const fn = vi.fn();
      const wrapper = mount(() => <Drawer visible={visible.value} onOverlayClick={fn} />);
      await nextTick();
      const mask = wrapper.find('.t-drawer__mask');
      await mask.trigger('click');
      expect(fn).toBeCalled();
    });
  });
});
