import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import {
  AppIcon,
  CheckCircleFilledIcon,
  CloseIcon,
  ErrorCircleFilledIcon,
  InfoCircleFilledIcon,
} from 'tdesign-icons-vue-next';
import { nextTick } from '@td/adapter-vue';
import { Alert } from 'tdesign-vue-next';

describe('alert', () => {
  describe(':props', () => {
    it(':default', () => {
      const wrapper = mount(() => <Alert>text</Alert>);
      expect(wrapper.find('.t-alert__description').text()).toBe('text');
    });

    it(':close', () => {
      const wrapper = mount(() => <Alert close>text</Alert>);
      const close = wrapper.find('.t-alert__close');
      expect(close.exists()).toBeTruthy();
      expect(wrapper.findComponent(CloseIcon).exists()).toBeTruthy();
    });

    it(':icon', () => {
      const slots = {
        icon: () => <AppIcon />,
      };
      const wrapper = mount(() => <Alert v-slots={slots}>text</Alert>);
      const icon = wrapper.find('.t-alert__icon');
      expect(icon.exists()).toBeTruthy();
      expect(wrapper.findComponent(AppIcon).exists()).toBeTruthy();
    });

    it(':message', () => {
      const wrapper = mount(() => <Alert message="this is message"></Alert>);
      const description = wrapper.find('.t-alert__message .t-alert__description');
      expect(description.exists()).toBeTruthy();
      expect(description.text()).toBe('this is message');
    });

    it(':title', () => {
      const wrapper = mount(() => <Alert title="this is title">text</Alert>);
      const title = wrapper.find('.t-alert__title');
      expect(title.exists()).toBeTruthy();
      expect(title.text()).toBe('this is title');
    });

    it(':operation', () => {
      const slots = {
        operation: () => <>this is operation</>,
      };
      const wrapper = mount(() => <Alert v-slots={slots}>text</Alert>);
      const operation = wrapper.find('.t-alert__operation');
      expect(operation.exists()).toBeTruthy();
      expect(operation.text()).toBe('this is operation');
    });

    it(':theme:info', () => {
      const wrapper = mount(() => <Alert theme="info" message="text" />);
      const alert = wrapper.find('.t-alert');
      const icon = wrapper.find('.t-alert__icon');
      expect(icon.findComponent(InfoCircleFilledIcon).exists()).toBeTruthy();
      expect(alert.classes()).toContain('t-alert--info');
    });

    it(':theme:success', () => {
      const wrapper = mount(() => <Alert theme="success" message="text" />);
      const alert = wrapper.find('.t-alert');
      const icon = wrapper.find('.t-alert__icon');
      expect(icon.findComponent(CheckCircleFilledIcon).exists()).toBeTruthy();
      expect(alert.classes()).toContain('t-alert--success');
    });

    it(':theme:warning', () => {
      const wrapper = mount(() => <Alert theme="warning" message="text" />);
      const alert = wrapper.find('.t-alert');
      const icon = wrapper.find('.t-alert__icon');
      expect(icon.findComponent(ErrorCircleFilledIcon).exists()).toBeTruthy();
      expect(alert.classes()).toContain('t-alert--warning');
    });

    it(':theme:error', () => {
      const wrapper = mount(() => <Alert theme="error" message="text" />);
      const alert = wrapper.find('.t-alert');
      const icon = wrapper.find('.t-alert__icon');
      expect(icon.findComponent(ErrorCircleFilledIcon).exists()).toBeTruthy();
      expect(alert.classes()).toContain('t-alert--error');
    });

    it(':maxLine', async () => {
      const wrapper = mount(() => (
        <Alert title="this is title" maxLine={2}>
          <span>这是折叠的第一条消息</span>
          <span>这是折叠的第二条消息</span>
          <span>这是折叠的第三条消息</span>
          <span>这是折叠的第四条消息</span>
          <span>这是折叠的第五条消息</span>
          <span>这是折叠的第六条消息</span>
        </Alert>
      ));
      const description = wrapper.find('.t-alert__description');
      const collapse = description.find('.t-alert__collapse');
      expect(description.element.children.length).toBe(3);
      expect(collapse.exists()).toBeTruthy();
      expect(collapse.text()).toBe('展开更多');
      await collapse.trigger('click');
      expect(description.element.children.length).toBe(7);
      expect(collapse.text()).toBe('收起');
    });
  });

  describe(':event', () => {
    it(':onClose', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Alert close onClose={fn}>
          text
        </Alert>
      ));
      const alert = wrapper.find('.t-alert');
      const close = wrapper.find('.t-alert__close');
      await close.trigger('click');
      await nextTick();
      expect(fn).toBeCalled();
      expect(alert.classes()).toContain('t-alert--closing');
    });
  });
});
