import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  CheckCircleFilledIcon,
  CloseIcon,
  ErrorCircleFilledIcon,
  HelpCircleFilledIcon,
  InfoCircleFilledIcon,
} from 'tdesign-icons-vue-next';
import { Loading } from '@tdesign/components/loading';
import { Message } from '@tdesign/components/message';
import messageProps from '@tdesign/components/message/props';

const content = 'This is a message';

describe('Message', () => {
  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('props', () => {
    it('renders the root element', () => {
      const wrapper = mount(Message, { props: { duration: 0 } });

      expect(wrapper.classes()).toContain('t-message');
      expect(wrapper.findComponent(InfoCircleFilledIcon).exists()).toBe(true);
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(false);
      wrapper.unmount();
    });

    it(':closeBtn[boolean]', async () => {
      const wrapper = mount(Message, { props: { closeBtn: false, duration: 0 } });

      expect(wrapper.classes()).not.toContain('t-is-closable');
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(false);

      await wrapper.setProps({ closeBtn: true });
      expect(wrapper.classes()).toContain('t-is-closable');
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(true);
      wrapper.unmount();
    });

    it(':closeBtn[string]', () => {
      const wrapper = mount(Message, { props: { closeBtn: 'Dismiss', duration: 0 } });

      expect(wrapper.classes()).toContain('t-is-closable');
      expect(wrapper.find('.t-message__close').text()).toBe('Dismiss');
      wrapper.unmount();
    });

    it(':closeBtn[function]', () => {
      const wrapper = mount(Message, {
        props: {
          closeBtn: () => <button class="custom-close">Dismiss</button>,
          duration: 0,
        },
      });

      expect(wrapper.find('.custom-close').text()).toBe('Dismiss');
      wrapper.unmount();
    });

    it(':closeBtn[slot]', () => {
      const wrapper = mount(Message, {
        props: { duration: 0 },
        slots: { closeBtn: () => <button class="slot-close">Slot close</button> },
      });

      expect(wrapper.classes()).toContain('t-is-closable');
      expect(wrapper.find('.slot-close').text()).toBe('Slot close');
      wrapper.unmount();
    });

    it(':content[string]', () => {
      const wrapper = mount(Message, { props: { content, duration: 0 } });

      expect(wrapper.text()).toContain(content);
      wrapper.unmount();
    });

    it(':content[function]', () => {
      const wrapper = mount(Message, {
        props: {
          content: () => <strong class="function-content">Function content</strong>,
          duration: 0,
        },
      });

      expect(wrapper.find('.function-content').text()).toBe('Function content');
      wrapper.unmount();
    });

    it(':content[slot]', () => {
      const wrapper = mount(Message, {
        props: { duration: 0 },
        slots: { default: () => <span class="slot-content">Slot content</span> },
      });

      expect(wrapper.find('.slot-content').text()).toBe('Slot content');
      wrapper.unmount();
    });

    it(':duration[number]', async () => {
      vi.useFakeTimers();
      const onClose = vi.fn();
      const onDurationEnd = vi.fn();
      const wrapper = mount(Message, {
        props: { duration: 100, onClose, onDurationEnd, placement: 'top' },
      });

      vi.advanceTimersByTime(99);
      expect(onDurationEnd).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);
      await nextTick();
      expect(onClose).toHaveBeenCalledOnce();
      expect(onClose).toHaveBeenCalledWith({ trigger: 'duration-end' });
      expect(onDurationEnd).toHaveBeenCalledOnce();
      wrapper.unmount();
    });

    it(':duration[zero]', async () => {
      vi.useFakeTimers();
      const onDurationEnd = vi.fn();
      const wrapper = mount(Message, { props: { duration: 0, onDurationEnd } });

      await wrapper.trigger('mouseleave');
      vi.runAllTimers();
      expect(onDurationEnd).not.toHaveBeenCalled();
      wrapper.unmount();
    });

    it(':icon[boolean]', async () => {
      const wrapper = mount(Message, { props: { duration: 0, icon: false } });

      expect(wrapper.findComponent(InfoCircleFilledIcon).exists()).toBe(false);

      await wrapper.setProps({ icon: true });
      expect(wrapper.findComponent(InfoCircleFilledIcon).exists()).toBe(true);
      wrapper.unmount();
    });

    it(':icon[function]', () => {
      const icon = vi.fn(() => h('span', { class: 'function-icon' }, 'icon'));
      const wrapper = mount(Message, { props: { duration: 0, icon } });

      expect(icon).toHaveBeenCalledWith(h);
      expect(wrapper.find('.function-icon').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':icon[slot]', () => {
      const wrapper = mount(Message, {
        props: { duration: 0 },
        slots: { icon: () => <span class="slot-icon">icon</span> },
      });

      expect(wrapper.find('.slot-icon').exists()).toBe(true);
      expect(wrapper.findComponent(InfoCircleFilledIcon).exists()).toBe(false);
      wrapper.unmount();
    });

    it.each([
      ['info', InfoCircleFilledIcon],
      ['success', CheckCircleFilledIcon],
      ['warning', ErrorCircleFilledIcon],
      ['error', ErrorCircleFilledIcon],
      ['question', HelpCircleFilledIcon],
      ['loading', Loading],
    ] as const)(':theme[string] renders the %s theme', (theme, Icon) => {
      const wrapper = mount(Message, { props: { duration: 0, theme } });

      expect(wrapper.classes()).toContain(`t-is-${theme}`);
      expect(wrapper.findComponent(Icon).exists()).toBe(true);
      wrapper.unmount();
    });

    it(':theme[string] validates supported values', () => {
      const validator = messageProps.theme.validator;

      expect(validator(undefined)).toBe(true);
      expect(validator('success')).toBe(true);
      // @ts-expect-error verify runtime validation for an unsupported value
      expect(validator('unsupported')).toBe(false);
    });

    it(':className[string]', () => {
      const wrapper = mount(Message, { props: { className: 'custom-message', duration: 0 } });

      expect(wrapper.classes()).toContain('custom-message');
      wrapper.unmount();
    });

    it(':placement[string]', () => {
      const wrapper = mount(Message, { props: { duration: 0, placement: 'bottom' } });

      expect((wrapper.element as HTMLElement).style.transform).toBe('translate3d(0, 0, 0)');
      wrapper.unmount();
    });
  });

  describe('events', () => {
    it('close', async () => {
      const onClose = vi.fn();
      const wrapper = mount(Message, { props: { closeBtn: true, duration: 0, onClose } });

      await wrapper.find('.t-message__close').trigger('click');
      expect(onClose).toHaveBeenCalledOnce();
      expect(onClose).toHaveBeenCalledWith({
        trigger: 'close-click',
        e: expect.any(MouseEvent),
      });
      wrapper.unmount();
    });

    it('close-btn-click', async () => {
      const onCloseBtnClick = vi.fn();
      const wrapper = mount(Message, { props: { closeBtn: true, duration: 0, onCloseBtnClick } });

      await wrapper.find('.t-message__close').trigger('click');
      expect(onCloseBtnClick).toHaveBeenCalledOnce();
      expect(onCloseBtnClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
      wrapper.unmount();
    });

    it('duration-end', async () => {
      vi.useFakeTimers();
      const onDurationEnd = vi.fn();
      const wrapper = mount(Message, { props: { duration: 20, onDurationEnd } });

      vi.advanceTimersByTime(20);
      await nextTick();
      expect(onDurationEnd).toHaveBeenCalledOnce();
      wrapper.unmount();
    });
  });

  describe('instanceFunctions', () => {
    it('close()', () => {
      const onClose = vi.fn();
      const onCloseBtnClick = vi.fn();
      const wrapper = mount(Message, { props: { duration: 0, onClose, onCloseBtnClick } });
      const event = new MouseEvent('click');

      wrapper.vm.$.exposed?.close(event);
      expect(onClose).toHaveBeenCalledWith({ trigger: 'close-click', e: event });
      expect(onCloseBtnClick).toHaveBeenCalledWith({ e: event });
      wrapper.unmount();
    });
  });

  describe('lifecycle', () => {
    it('pauses the timer on mouseenter and restarts it on mouseleave', async () => {
      vi.useFakeTimers();
      const onDurationEnd = vi.fn();
      const wrapper = mount(Message, { props: { duration: 100, onDurationEnd } });

      vi.advanceTimersByTime(50);
      await wrapper.trigger('mouseenter');
      vi.advanceTimersByTime(100);
      expect(onDurationEnd).not.toHaveBeenCalled();

      await wrapper.trigger('mouseleave');
      vi.advanceTimersByTime(100);
      expect(onDurationEnd).toHaveBeenCalledOnce();
      wrapper.unmount();
    });

    it('currently leaves its duration timer active after unmount', () => {
      vi.useFakeTimers();
      const wrapper = mount(Message, { props: { duration: 100 } });

      expect(vi.getTimerCount()).toBe(1);
      wrapper.unmount();

      // Current source has no unmount cleanup. Keep this characterization until it is fixed.
      expect(vi.getTimerCount()).toBe(1);
    });
  });
});
