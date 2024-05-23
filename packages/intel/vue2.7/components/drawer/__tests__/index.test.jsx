import { mount } from '@vue/test-utils';
import { nextTick } from '@td/adapter-vue';
import { CloseIcon } from 'tdesign-icons-vue';
import Drawer from '@/src/drawer/index.ts';

// every component needs four parts: props/events/slots/functions.

const text = '这是一段内容';

describe('Drawer', () => {
  describe(':props', () => {
    it(':attach', async () => {
      const wrapper = mount({
        render() {
          return <Drawer visible attach="body" />;
        },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBeTruthy();
      expect(wrapper.find('.t-drawer').element.parentNode).toBe(document.body);
    });

    it(':body', async () => {
      const wrapper = mount({
        render() {
          return <Drawer visible body={text} />;
        },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBeTruthy();
      expect(wrapper.find('.t-drawer__body').exists()).toBeTruthy();
      expect(wrapper.find('.t-drawer__body').text()).toBe(text);
    });

    it(':default', async () => {
      const wrapper = mount({
        render() {
          return <Drawer visible default={text} />;
        },
      });
      await nextTick();
      expect(wrapper.find('.t-drawer').exists()).toBeTruthy();
      expect(wrapper.find('.t-drawer__body').exists()).toBeTruthy();
      expect(wrapper.find('.t-drawer__body').text()).toBe(text);
    });

    it(':cancelBtn', async () => {
      const wrapper = mount({
        render() {
          return <Drawer visible body={text} />;
        },
      });
      await nextTick();
      const btn = wrapper.find('.t-drawer__cancel');
      expect(btn.exists()).toBeTruthy();
      expect(btn.text()).toBe('取消');
    });

    it(':confirmBtn', async () => {
      const wrapper = mount({
        render() {
          return <Drawer visible body={text} />;
        },
      });
      await nextTick();
      const btn = wrapper.find('.t-drawer__confirm');
      expect(btn.exists()).toBeTruthy();
      expect(btn.text()).toBe('确认');
    });

    it(':closeBtn', async () => {
      const wrapper = mount({
        render() {
          return <Drawer visible body={text} closeBtn />;
        },
      });
      await nextTick();
      const btn = wrapper.findComponent(CloseIcon);
      expect(btn.exists()).toBeTruthy();
    });
    it(':footer', async () => {
      const wrapper = mount({
        render() {
          return <Drawer visible body={text} />;
        },
      });
      await nextTick();
      const footer = wrapper.find('.t-drawer__footer');
      const btns = footer.findAll('button');
      expect(footer.exists()).toBeTruthy();
      expect(btns.length).toBe(2);
    });
    it(':header', async () => {
      const wrapper = mount({
        render() {
          return <Drawer visible body={text} header="header" />;
        },
      });
      await nextTick();
      const header = wrapper.find('.t-drawer__header');
      expect(header.exists()).toBeTruthy();
      expect(header.text()).toBe('header');
    });

    it(':placement', async () => {
      const wrapper1 = mount({
        render() {
          return <Drawer visible body={text} />;
        },
      });
      const wrapper2 = mount({
        render() {
          return <Drawer visible body={text} placement="left" />;
        },
      });
      const wrapper3 = mount({
        render() {
          return <Drawer visible body={text} placement="top" />;
        },
      });
      const wrapper4 = mount({
        render() {
          return <Drawer visible body={text} placement="bottom" />;
        },
      });
      await nextTick();
      const drawer1 = wrapper1.find('.t-drawer');
      const drawer2 = wrapper2.find('.t-drawer');
      const drawer3 = wrapper3.find('.t-drawer');
      const drawer4 = wrapper4.find('.t-drawer');
      expect(drawer1.classes()).toContain('t-drawer--right');
      expect(drawer2.classes()).toContain('t-drawer--left');
      expect(drawer3.classes()).toContain('t-drawer--top');
      expect(drawer4.classes()).toContain('t-drawer--bottom');
    });

    it(':showOverlay', async () => {
      const wrapper = mount({
        render() {
          return <Drawer visible body={text} />;
        },
      });
      await nextTick();
      const mask = wrapper.find('.t-drawer__mask');
      expect(mask.exists()).toBeTruthy();
    });

    it(':size', async () => {
      const wrapper = mount({
        render() {
          return <Drawer visible body={text} size="500px" />;
        },
      });
      await nextTick();
      const content = wrapper.find('.t-drawer__content-wrapper');
      expect(getComputedStyle(content.element, null).width).toBe('500px');
    });

    it(':sizeDraggable', async () => {
      const wrapper = mount({
        render() {
          return <Drawer visible body={text} sizeDraggable />;
        },
      });
      await nextTick();
      const content = wrapper.find('.t-drawer__content-wrapper');
      expect(getComputedStyle(content.element.lastChild, null).cursor).toBe('col-resize');
    });

    it(':zIndex', async () => {
      const wrapper = mount({
        render() {
          return <Drawer visible body={text} zIndex={2022} />;
        },
      });
      await nextTick();
      const drawer = wrapper.find('.t-drawer');
      expect(getComputedStyle(drawer.element, null).zIndex).toBe('2022');
    });
  });

  describe(':events', () => {
    it(':onCancel', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Drawer visible onCancel={fn} />;
        },
      });
      await nextTick();
      const btn = wrapper.find('.t-drawer__cancel');
      await btn.trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onConfirm', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Drawer visible onConfirm={fn} />;
        },
      });
      await nextTick();
      const btn = wrapper.find('.t-drawer__confirm');
      await btn.trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onCloseBtnClick', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Drawer visible on-close-btn-click={fn} closeBtn={true} />;
        },
      });
      await nextTick();
      const btn = wrapper.find('.t-drawer__close-btn');
      await btn.trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onClose', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Drawer visible onClose={fn} closeBtn />;
        },
      });
      await nextTick();
      const btn = wrapper.find('.t-drawer__close-btn');
      await btn.trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onOverlayClick', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Drawer visible on-overlay-click={fn} />;
        },
      });
      await nextTick();
      const mask = wrapper.find('.t-drawer__mask');
      await mask.trigger('click');
      expect(fn).toBeCalled();
    });
  });
});
