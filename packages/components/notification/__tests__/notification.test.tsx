import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AppIcon, CheckCircleFilledIcon, CloseIcon, InfoCircleFilledIcon } from 'tdesign-icons-vue-next';
import { Notification } from '@tdesign/components/notification';
import notificationProps from '@tdesign/components/notification/props';

const getCloseButton = (wrapper: VueWrapper) => wrapper.find('.t-message__close');

describe('Notification', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe('props', () => {
    it(':base', () => {
      const wrapper = mount(Notification);

      expect(wrapper.find('.t-notification').exists()).toBe(true);
      expect(wrapper.find('.t-notification__main').exists()).toBe(true);
      expect(wrapper.find('.t-notification__content').exists()).toBe(true);
    });

    it(':closeBtn[boolean]', async () => {
      const onCloseBtnClick = vi.fn();
      const wrapper = mount(Notification, {
        props: { closeBtn: false, onCloseBtnClick },
      });

      expect(wrapper.findComponent(CloseIcon).exists()).toBe(false);
      // Current behavior: closeBtn=false hides its content but leaves a clickable wrapper in the DOM.
      expect(getCloseButton(wrapper).exists()).toBe(true);
      await getCloseButton(wrapper).trigger('click');
      expect(onCloseBtnClick).toHaveBeenCalledTimes(1);

      const defaultWrapper = mount(Notification, { props: { closeBtn: true } });
      expect(defaultWrapper.findComponent(CloseIcon).exists()).toBe(true);
    });

    it(':closeBtn[string]', () => {
      const wrapper = mount(Notification, { props: { closeBtn: '关闭通知' } });

      expect(getCloseButton(wrapper).text()).toBe('关闭通知');
    });

    it(':closeBtn[function]', () => {
      const wrapper = mount(Notification, {
        props: { closeBtn: () => <button class="custom-close">自定义关闭</button> },
      });

      expect(wrapper.find('.custom-close').text()).toBe('自定义关闭');
    });

    it(':closeBtn[slot]', () => {
      const wrapper = mount(Notification, {
        slots: { closeBtn: () => <button class="slot-close">插槽关闭</button> },
      });

      expect(wrapper.find('.slot-close').text()).toBe('插槽关闭');
    });

    it(':content[string]', () => {
      const wrapper = mount(Notification, { props: { content: '通知内容' } });

      expect(wrapper.find('.t-notification__content').text()).toBe('通知内容');
    });

    it(':content[function]', () => {
      const wrapper = mount(Notification, {
        props: { content: () => <span class="content-function">函数内容</span> },
      });

      expect(wrapper.find('.content-function').text()).toBe('函数内容');
    });

    it(':content[slot]', () => {
      const wrapper = mount(Notification, {
        slots: { content: () => <span class="content-slot">插槽内容</span> },
      });

      expect(wrapper.find('.content-slot').text()).toBe('插槽内容');
    });

    it(':default[string]', () => {
      const wrapper = mount(Notification, {
        props: { default: '默认内容', content: '备用内容' },
      });

      expect(wrapper.find('.t-notification__content').text()).toBe('默认内容');
    });

    it(':default[function]', () => {
      const wrapper = mount(Notification, {
        props: { default: () => <span class="default-function">函数默认内容</span> },
      });

      expect(wrapper.find('.default-function').text()).toBe('函数默认内容');
    });

    it(':default[slot]', () => {
      const wrapper = mount(Notification, {
        slots: { default: () => <span class="default-slot">默认插槽内容</span> },
      });

      expect(wrapper.find('.default-slot').text()).toBe('默认插槽内容');
    });

    it(':duration[number]', () => {
      vi.useFakeTimers();
      const onDurationEnd = vi.fn();
      mount(Notification, { props: { duration: 100, onDurationEnd } });

      expect(onDurationEnd).not.toHaveBeenCalled();
      vi.advanceTimersByTime(100);
      expect(onDurationEnd).toHaveBeenCalledTimes(1);
    });

    it(':duration[number] does not start a timer when duration is 0', () => {
      vi.useFakeTimers();
      const onDurationEnd = vi.fn();
      mount(Notification, { props: { duration: 0, onDurationEnd } });

      vi.runAllTimers();
      expect(onDurationEnd).not.toHaveBeenCalled();
    });

    it(':duration[number] pauses on mouseenter and restarts on mouseleave', async () => {
      vi.useFakeTimers();
      const onDurationEnd = vi.fn();
      const wrapper = mount(Notification, { props: { duration: 100, onDurationEnd } });

      vi.advanceTimersByTime(50);
      await wrapper.trigger('mouseenter');
      vi.advanceTimersByTime(100);
      expect(onDurationEnd).not.toHaveBeenCalled();

      await wrapper.trigger('mouseleave');
      vi.advanceTimersByTime(100);
      expect(onDurationEnd).toHaveBeenCalledTimes(1);
    });

    it(':footer[string]', () => {
      const wrapper = mount(Notification, { props: { footer: '底部内容' } });

      expect(wrapper.find('.t-notification__main').text()).toContain('底部内容');
    });

    it(':footer[function]', () => {
      const wrapper = mount(Notification, {
        props: { footer: () => <footer class="footer-function">函数底部</footer> },
      });

      expect(wrapper.find('.footer-function').text()).toBe('函数底部');
    });

    it(':footer[slot]', () => {
      const wrapper = mount(Notification, {
        slots: { footer: () => <footer class="footer-slot">插槽底部</footer> },
      });

      expect(wrapper.find('.footer-slot').text()).toBe('插槽底部');
    });

    it(':icon[boolean]', () => {
      const hiddenWrapper = mount(Notification, { props: { icon: false } });
      expect(hiddenWrapper.find('.t-notification__icon').exists()).toBe(false);

      const visibleWrapper = mount(Notification, { props: { icon: true } });
      expect(visibleWrapper.findComponent(InfoCircleFilledIcon).exists()).toBe(true);
    });

    it(':icon[function]', () => {
      const wrapper = mount(Notification, {
        props: { icon: () => <AppIcon class="icon-function" /> },
      });

      expect(wrapper.findComponent(AppIcon).exists()).toBe(true);
      expect(wrapper.find('.icon-function').exists()).toBe(true);
    });

    it(':icon[slot]', () => {
      const wrapper = mount(Notification, {
        slots: { icon: () => <AppIcon class="icon-slot" /> },
      });

      expect(wrapper.findComponent(AppIcon).exists()).toBe(true);
      expect(wrapper.find('.icon-slot').exists()).toBe(true);
    });

    it(':theme[string]', () => {
      const validator = notificationProps.theme.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator('success')).toBe(true);
      // @ts-expect-error validate unsupported values
      expect(validator('primary')).toBe(false);

      const cases = [
        { theme: 'info', icon: InfoCircleFilledIcon },
        { theme: 'success', icon: CheckCircleFilledIcon },
        { theme: 'warning', icon: InfoCircleFilledIcon },
        { theme: 'error', icon: InfoCircleFilledIcon },
      ] as const;

      cases.forEach(({ theme, icon }) => {
        const wrapper = mount(Notification, { props: { theme } });
        expect(wrapper.findComponent(icon).exists()).toBe(true);
        expect(wrapper.find(`.t-is-${theme}`).exists()).toBe(true);
      });
    });

    it(':title[string]', () => {
      const wrapper = mount(Notification, { props: { title: '通知标题' } });

      expect(wrapper.find('.t-notification__title').text()).toBe('通知标题');
    });

    it(':title[function]', () => {
      const wrapper = mount(Notification, {
        props: { title: () => <strong class="title-function">函数标题</strong> },
      });

      expect(wrapper.find('.title-function').text()).toBe('函数标题');
    });

    it(':title[slot]', () => {
      const wrapper = mount(Notification, {
        slots: { title: () => <strong class="title-slot">插槽标题</strong> },
      });

      expect(wrapper.find('.title-slot').text()).toBe('插槽标题');
    });

    it(':className[string]', () => {
      const wrapper = mount(Notification, { props: { className: 'custom-notification' } });

      expect(wrapper.classes()).toContain('custom-notification');
    });

    it(':placement[string]', () => {
      const wrapper = mount(Notification, { props: { placement: 'bottom-left' } });

      expect(wrapper.props('placement')).toBe('bottom-left');
    });
  });

  describe('events', () => {
    it(':onCloseBtnClick[function]', async () => {
      const onCloseBtnClick = vi.fn();
      const wrapper = mount(Notification, { props: { closeBtn: true, onCloseBtnClick } });

      await getCloseButton(wrapper).trigger('click');
      expect(onCloseBtnClick).toHaveBeenCalledTimes(1);
      expect(onCloseBtnClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
    });

    it(':onClose[function]', () => {
      const onClose = vi.fn();
      const wrapper = mount(Notification, { props: { onClose } });

      wrapper.vm.$.exposed.close();
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it(':onDurationEnd[function]', () => {
      vi.useFakeTimers();
      const onDurationEnd = vi.fn();
      mount(Notification, { props: { duration: 50, onDurationEnd } });

      vi.advanceTimersByTime(50);
      expect(onDurationEnd).toHaveBeenCalledTimes(1);
    });
  });

  describe('instanceFunctions', () => {
    it(':close[function]', () => {
      const wrapper = mount(Notification, { props: { placement: 'top-right' } });

      wrapper.vm.$.exposed.close();
      expect((wrapper.element as HTMLElement).style.display).toBe('none');
    });
  });

  describe('lifecycle', () => {
    it('runs the entrance animation after mount', () => {
      const animate = vi.fn(() => ({ onfinish: null }));
      Object.defineProperty(HTMLElement.prototype, 'animate', {
        configurable: true,
        value: animate,
      });
      const wrapper = mount(Notification, { props: { placement: 'top-left' } });

      expect(wrapper.exists()).toBe(true);
      expect(animate).toHaveBeenCalledTimes(1);
      delete HTMLElement.prototype.animate;
    });
  });
});
