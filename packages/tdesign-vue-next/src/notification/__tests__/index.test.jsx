import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { InfoCircleFilledIcon } from 'tdesign-icons-vue-next';
import { nextTick } from '@td/adapter-vue';
import { Notification, NotifyPlugin } from 'tdesign-vue-next';

describe('notification', () => {
  describe(':base', () => {
    it('render', () => {
      const wrapper = mount({
        render() {
          return <Notification></Notification>;
        },
      });
      expect(wrapper.find('.t-notification').exists()).toBeTruthy();
    });

    it('render title', () => {
      const wrapper = mount({
        render() {
          return <Notification title="标题"></Notification>;
        },
      });
      expect(wrapper.find('.t-notification__title').text()).toBe('标题');
    });

    it('render content', () => {
      const wrapper = mount({
        render() {
          return <Notification content="文案"></Notification>;
        },
      });
      expect(wrapper.find('.t-notification__content').text()).toBe('文案');
    });

    it('render default', () => {
      const wrapper = mount({
        render() {
          return <Notification default="文案"></Notification>;
        },
      });
      expect(wrapper.find('.t-notification__content').text()).toBe('文案');
    });

    it('render icon', () => {
      const wrapper = mount({
        render() {
          return <Notification icon={() => <InfoCircleFilledIcon />} default="文案"></Notification>;
        },
      });
      expect(wrapper.findComponent(InfoCircleFilledIcon).exists()).toBe(true);
    });

    it('render footer', () => {
      const wrapper = mount({
        render() {
          return <Notification footer={() => <InfoCircleFilledIcon />} default="文案"></Notification>;
        },
      });
      expect(wrapper.findComponent(InfoCircleFilledIcon).exists()).toBe(true);
    });

    it('duration', () => {
      const fn = vi.fn();
      mount({
        render() {
          return <Notification duration={3000} onDurationEnd={fn}></Notification>;
        },
      });
      setTimeout(() => {
        expect(fn).toBeCalled();
      }, 3000);
    });
  });

  describe(':theme', () => {
    ['info', 'success', 'warning', 'error'].map(item =>
      it(item, () => {
        const wrapper = mount({
          render() {
            return <Notification theme={item}></Notification>;
          },
        });
        expect(wrapper.find(`.t-is-${item}`).exists()).toBeTruthy();
      }),
    );
  });

  describe(':event', () => {
    it(':onCloseBtnClick', async () => {
      const fn = vi.fn();
      const wrapper = mount({
        render() {
          return <Notification closeBtn={true} onCloseBtnClick={fn}></Notification>;
        },
      });
      const btn = wrapper.find('.t-message__close');
      await nextTick();
      await btn.trigger('click');
      expect(fn).toBeCalled();
    });
  });

  describe(':plugin', () => {
    it('call', async () => {
      const fn = vi.fn();
      const instance = await NotifyPlugin.info({
        title: '标题',
        content: '用户表示普通操作信息提示',
        offset: [-10, 20],
        closeBtn: true,
        onCloseBtnClick: fn,
      });
      expect(document.querySelector(`.t-notification`)).toBeTruthy();
      const btn = document.querySelector('.t-message__close');
      await nextTick();
      await btn.click();
      instance.close();
      expect(fn).toBeCalled();
    });

    ['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(item =>
      it(item, async () => {
        await NotifyPlugin.info({
          title: '标题',
          place: '用户表示普通操作信息提示',
          offset: [-10, 20],
          placement: item,
          duration: 100,
        });
        setTimeout(() => {
          expect(document.querySelector(`.t-notification`)).toBeFalsy();
        }, 300);
      }),
    );

    ['info', 'success', 'warning', 'error'].map(item =>
      it(item, async () => {
        await NotifyPlugin[item]({
          title: '标题',
          content: '用户表示普通操作信息提示',
          offset: [-10, 20],
          closeBtn: true,
          duration: 0,
        });
      }),
    );

    it('close-all', async () => {
      expect(document.querySelector(`.t-notification`)).toBeTruthy();
      setTimeout(() => {
        NotifyPlugin.closeAll({
          title: '标题',
          content: '用户表示普通操作信息提示',
          offset: [-10, 20],
          closeBtn: true,
          duration: 1000,
        });
        expect(document.querySelector(`.t-notification`)).toBeFalsy();
      }, 1000);
    });
  });
});
