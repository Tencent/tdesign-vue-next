import { nextTick } from 'vue';
import type { ComponentPublicInstance, Ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_Z_INDEX } from '@tdesign/common-js/message/index';
import { MessageList } from '@tdesign/components/message/message-list';
import type { MessageOptions } from '@tdesign/components/message';

interface MessageListItem extends MessageOptions {
  key: number;
}

interface MessageListExposed {
  add: (message: MessageOptions) => number;
  removeAll: () => void;
  list: Ref<MessageListItem[]>;
  messageList: Ref<ComponentPublicInstance[]>;
}

const getExposed = (wrapper: VueWrapper) => wrapper.vm.$.exposed as unknown as MessageListExposed;

const addMessage = async (wrapper: VueWrapper, options: MessageOptions = {}) => {
  const key = getExposed(wrapper).add({ duration: 0, ...options });
  await nextTick();
  return key;
};

describe('MessageList', () => {
  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('props', () => {
    it('does not render an empty list', () => {
      const wrapper = mount(MessageList);

      expect(wrapper.html()).toBe('');
      wrapper.unmount();
    });

    it(':zIndex[number]', async () => {
      const defaultWrapper = mount(MessageList, { props: { placement: 'top' } });
      await addMessage(defaultWrapper);
      expect((defaultWrapper.element as HTMLElement).style.zIndex).toBe('0');
      defaultWrapper.unmount();

      const configuredWrapper = mount(MessageList, {
        props: { placement: 'top', zIndex: DEFAULT_Z_INDEX },
      });
      await addMessage(configuredWrapper);
      expect((configuredWrapper.element as HTMLElement).style.zIndex).toBe(String(DEFAULT_Z_INDEX));
      configuredWrapper.unmount();

      const customWrapper = mount(MessageList, { props: { placement: 'top', zIndex: 7001 } });
      await addMessage(customWrapper);
      expect((customWrapper.element as HTMLElement).style.zIndex).toBe('7001');
      customWrapper.unmount();
    });

    it.each([
      ['center', { left: '50%', top: '50%', transform: 'translateX(-50%) translateY(-50%)' }],
      ['top', { left: '50%', top: '32px', transform: 'translateX(-50%)' }],
      ['left', { left: '32px', top: '50%', transform: 'translateY(-50%)' }],
      ['right', { right: '32px', top: '50%', transform: 'translateY(-50%)' }],
      ['bottom', { bottom: '32px', left: '50%', transform: 'translateX(-50%)' }],
      ['top-left', { left: '32px', top: '32px' }],
      ['top-right', { right: '32px', top: '32px' }],
      ['bottom-left', { bottom: '32px', left: '32px' }],
      ['bottom-right', { bottom: '32px', right: '32px' }],
    ] as const)(':placement[string] applies the %s placement', async (placement, expectedStyles) => {
      const wrapper = mount(MessageList, { props: { placement } });
      await addMessage(wrapper);
      const element = wrapper.element as HTMLElement;

      Object.entries(expectedStyles).forEach(([property, value]) => {
        expect(element.style.getPropertyValue(property)).toBe(value);
      });
      wrapper.unmount();
    });

    it(':offset[array<number>]', async () => {
      const wrapper = mount(MessageList, { props: { placement: 'top' } });
      await addMessage(wrapper, { offset: [12, -4] });
      const message = wrapper.find('.t-message').element as HTMLElement;

      expect(message.style.position).toBe('relative');
      expect(message.style.left).toBe('12px');
      expect(message.style.top).toBe('-4px');
      wrapper.unmount();
    });

    it(':offset[array<string>]', async () => {
      const wrapper = mount(MessageList, { props: { placement: 'top' } });
      await addMessage(wrapper, { offset: ['2em', '3rem'] });
      const message = wrapper.find('.t-message').element as HTMLElement;

      expect(message.style.left).toBe('2em');
      expect(message.style.top).toBe('3rem');
      wrapper.unmount();
    });

    it(':offset[array] treats zero as no inline offset', async () => {
      const wrapper = mount(MessageList, { props: { placement: 'top' } });
      await addMessage(wrapper, { offset: [0, 0] });
      const message = wrapper.find('.t-message').element as HTMLElement;

      expect(message.style.left).toBe('');
      expect(message.style.top).toBe('');
      wrapper.unmount();
    });

    it(':className[string]', async () => {
      const wrapper = mount(MessageList, { props: { placement: 'top' } });
      await addMessage(wrapper, { className: 'custom-message' });

      expect(wrapper.find('.t-message').classes()).toContain('custom-message');
      wrapper.unmount();
    });

    it(':style[object]', async () => {
      const wrapper = mount(MessageList, { props: { placement: 'top' } });
      await addMessage(wrapper, { style: { color: 'rgb(255, 0, 0)' } });

      expect((wrapper.find('.t-message').element as HTMLElement).style.color).toBe('rgb(255, 0, 0)');
      wrapper.unmount();
    });
  });

  describe('events', () => {
    it('close-btn-click removes the selected message and preserves the callback', async () => {
      const onCloseBtnClick = vi.fn();
      const wrapper = mount(MessageList, { props: { placement: 'top' } });
      await addMessage(wrapper, { closeBtn: true, content: 'first', onCloseBtnClick });
      await addMessage(wrapper, { closeBtn: true, content: 'second' });

      await wrapper.findAll('.t-message__close')[0].trigger('click');
      expect(onCloseBtnClick).toHaveBeenCalledOnce();
      expect(onCloseBtnClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
      expect(wrapper.findAll('.t-message')).toHaveLength(1);
      expect(wrapper.find('.t-message').text()).toContain('second');
      wrapper.unmount();
    });

    it('duration-end removes the message and preserves the callback', async () => {
      vi.useFakeTimers();
      const onDurationEnd = vi.fn();
      const wrapper = mount(MessageList, { props: { placement: 'top' } });
      getExposed(wrapper).add({ content: 'timed', duration: 30, onDurationEnd });
      await nextTick();

      vi.advanceTimersByTime(30);
      await nextTick();
      expect(onDurationEnd).toHaveBeenCalledOnce();
      expect(wrapper.find('.t-message').exists()).toBe(false);
      wrapper.unmount();
    });

    it('currently leaves one message when two messages expire in the same timer turn', async () => {
      vi.useFakeTimers();
      const wrapper = mount(MessageList, { props: { placement: 'top' } });
      getExposed(wrapper).add({ content: 'first', duration: 30 });
      getExposed(wrapper).add({ content: 'second', duration: 30 });
      await nextTick();

      vi.advanceTimersByTime(30);
      await nextTick();

      // Both callbacks capture their original array index; the second splice uses a stale index.
      expect(wrapper.findAll('.t-message')).toHaveLength(1);
      expect(wrapper.find('.t-message').text()).toContain('second');
      wrapper.unmount();
    });
  });

  describe('instanceFunctions', () => {
    it('add() appends messages and returns unique keys', async () => {
      const wrapper = mount(MessageList, { props: { placement: 'top' } });
      const firstKey = await addMessage(wrapper, { content: 'first' });
      const secondKey = await addMessage(wrapper, { content: 'second' });
      const exposed = getExposed(wrapper);

      expect(secondKey).toBeGreaterThan(firstKey);
      expect(exposed.list.value.map((item) => item.content)).toEqual(['first', 'second']);
      expect(wrapper.findAll('.t-message')).toHaveLength(2);
      expect(exposed.messageList.value.length).toBeGreaterThanOrEqual(2);
      expect(typeof exposed.messageList.value[0].close).toBe('function');
      wrapper.unmount();
    });

    it('messageList currently accumulates duplicate refs after an append rerender', async () => {
      const wrapper = mount(MessageList, { props: { placement: 'top' } });
      await addMessage(wrapper, { content: 'first' });
      await addMessage(wrapper, { content: 'second' });

      // The ref callback only appends, so the first component is collected again on rerender.
      expect(getExposed(wrapper).messageList.value).toHaveLength(3);
      wrapper.unmount();
    });

    it('removeAll() removes every message', async () => {
      const wrapper = mount(MessageList, { props: { placement: 'top' } });
      await addMessage(wrapper, { content: 'first' });
      await addMessage(wrapper, { content: 'second' });

      getExposed(wrapper).removeAll();
      await nextTick();
      expect(getExposed(wrapper).list.value).toEqual([]);
      expect(wrapper.find('.t-message__list').exists()).toBe(false);
      wrapper.unmount();
    });
  });
});
