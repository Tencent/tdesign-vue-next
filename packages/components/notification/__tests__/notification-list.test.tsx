import { nextTick } from 'vue';
import type { Ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Notification from '@tdesign/components/notification/notification';
import NotificationList from '@tdesign/components/notification/notification-list';
import type { NotificationOptions } from '@tdesign/components/notification/type';

const animationMocks = vi.hoisted(() => ({
  fadeIn: vi.fn(),
  fadeOut: vi.fn((_dom: HTMLElement, _placement: string, onFinish: () => void) => onFinish()),
}));

vi.mock('@tdesign/components/notification/utils', () => animationMocks);

interface NotificationListExposed {
  add: (options: NotificationOptions) => number;
  remove: (index: number) => void;
  removeAll: () => void;
  list: Ref<NotificationOptions[]>;
  notificationList: Ref<Array<{ close: () => void }>>;
}

const getExposed = (wrapper: VueWrapper) => wrapper.vm.$.exposed as unknown as NotificationListExposed;

const addNotification = async (wrapper: VueWrapper, options: NotificationOptions = {}) => {
  const index = getExposed(wrapper).add({ duration: 0, content: '通知内容', ...options });
  await nextTick();
  return index;
};

describe('NotificationList', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  describe('props', () => {
    it(':placement[string]', async () => {
      const cases = {
        'top-left': { left: '16px', top: '16px' },
        'top-right': { right: '16px', top: '16px' },
        'bottom-left': { left: '16px', bottom: '16px' },
        'bottom-right': { right: '16px', bottom: '16px' },
      } as const;

      for (const [placement, expectedStyle] of Object.entries(cases)) {
        const wrapper = mount(NotificationList, { props: { placement } });
        await addNotification(wrapper);
        const element = wrapper.find('.t-notification-list__show').element as HTMLElement;

        Object.entries(expectedStyle).forEach(([property, value]) => {
          expect(element.style[property as 'left']).toBe(value);
        });
        expect(element.style.zIndex).toBe('6000');
        wrapper.unmount();
      }

      const validator = NotificationList.props.placement.validator;
      expect(validator('top-right')).toBe(true);
      expect(validator('center')).toBe(false);
    });

    it(':offset[array<number>]', async () => {
      const wrapper = mount(NotificationList, {
        props: { placement: 'top-left', offset: [-10, 20] },
      });
      await addNotification(wrapper);
      const element = wrapper.find('.t-notification-list__show').element as HTMLElement;

      expect(element.style.left).toBe('-10px');
      expect(element.style.top).toBe('20px');
    });

    it(':offset[array<string>]', async () => {
      const wrapper = mount(NotificationList, {
        props: { placement: 'bottom-right', offset: ['2rem', '3em'] },
      });
      await addNotification(wrapper);
      const element = wrapper.find('.t-notification-list__show').element as HTMLElement;

      expect(element.style.right).toBe('2rem');
      expect(element.style.bottom).toBe('3em');
    });

    it(':offset[array] keeps defaults for invalid length', async () => {
      const wrapper = mount(NotificationList, {
        props: { placement: 'top-right', offset: [10] },
      });
      await addNotification(wrapper);
      const element = wrapper.find('.t-notification-list__show').element as HTMLElement;

      expect(element.style.right).toBe('16px');
      expect(element.style.top).toBe('16px');
    });

    it(':offset[array<number>] currently treats zero as an absent offset', async () => {
      const wrapper = mount(NotificationList, {
        props: { placement: 'top-left', offset: [0, 0] },
      });
      await addNotification(wrapper);
      const element = wrapper.find('.t-notification-list__show').element as HTMLElement;

      // Current behavior: getOffset(0) returns undefined, so both values fall back to 16px.
      expect(element.style.left).toBe('16px');
      expect(element.style.top).toBe('16px');
    });
  });

  describe('instanceFunctions', () => {
    it(':add[function]', async () => {
      const wrapper = mount(NotificationList);

      expect(await addNotification(wrapper, { title: '第一条' })).toBe(0);
      expect(await addNotification(wrapper, { title: '第二条' })).toBe(1);
      expect(wrapper.findAllComponents(Notification)).toHaveLength(2);
      expect(getExposed(wrapper).list.value).toHaveLength(2);
    });

    it(':remove[function]', async () => {
      const wrapper = mount(NotificationList);
      await addNotification(wrapper, { title: '第一条' });
      await addNotification(wrapper, { title: '第二条' });

      getExposed(wrapper).remove(0);
      await nextTick();
      expect(wrapper.findAllComponents(Notification)).toHaveLength(1);
      expect(wrapper.text()).toContain('第二条');
    });

    it(':removeAll[function]', async () => {
      const wrapper = mount(NotificationList);
      await addNotification(wrapper);
      await addNotification(wrapper);

      getExposed(wrapper).removeAll();
      await nextTick();
      expect(wrapper.find('.t-notification-list__show').exists()).toBe(false);
      expect(getExposed(wrapper).list.value).toHaveLength(0);
    });

    it(':notificationList[ref]', async () => {
      const wrapper = mount(NotificationList);
      await addNotification(wrapper);

      expect(getExposed(wrapper).notificationList.value).toHaveLength(1);
      expect(getExposed(wrapper).notificationList.value[0].close).toEqual(expect.any(Function));
    });
  });

  describe('events', () => {
    it(':onCloseBtnClick[function]', async () => {
      const onCloseBtnClick = vi.fn();
      const wrapper = mount(NotificationList);
      await addNotification(wrapper, { closeBtn: true, onCloseBtnClick });

      await wrapper.find('.t-message__close').trigger('click');
      expect(onCloseBtnClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
      expect(getExposed(wrapper).list.value).toHaveLength(0);
    });

    it(':onDurationEnd[function]', async () => {
      vi.useFakeTimers();
      const onDurationEnd = vi.fn();
      const wrapper = mount(NotificationList);
      await addNotification(wrapper, { duration: 100, onDurationEnd });

      vi.advanceTimersByTime(100);
      await nextTick();
      expect(onDurationEnd).toHaveBeenCalledTimes(1);
      expect(getExposed(wrapper).list.value).toHaveLength(0);
    });

    it(':onClose[function]', async () => {
      const onClose = vi.fn();
      const wrapper = mount(NotificationList);
      await addNotification(wrapper, { onClose });

      getExposed(wrapper).notificationList.value[0].close();
      await nextTick();
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(getExposed(wrapper).list.value).toHaveLength(0);
    });
  });

  describe('styles', () => {
    it(':zIndex[number]', async () => {
      const wrapper = mount(NotificationList);
      await addNotification(wrapper, { zIndex: 7001 });

      const notification = wrapper.find('.t-notification').element as HTMLElement;
      expect(notification.style.marginBottom).toBe('16px');
      expect(notification.style.zIndex).toBe('7001');
    });

    it(':zIndex[number] omits the item z-index when it is zero', async () => {
      const wrapper = mount(NotificationList);
      await addNotification(wrapper, { zIndex: 0 });

      const notification = wrapper.find('.t-notification').element as HTMLElement;
      expect(notification.style.marginBottom).toBe('16px');
      expect(notification.style.zIndex).toBe('');
    });
  });
});
