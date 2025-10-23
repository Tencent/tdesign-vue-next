import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';
import { Steps, StepItem } from '@tdesign/components/steps';

describe('StepItem', () => {
  describe('props', () => {
    it(':content[string]', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="登录" content="已完成状态"></StepItem>
        </Steps>
      ));
      const content = wrapper.find('.t-steps-item .t-steps-item__description');
      expect(content.exists()).toBeTruthy();
      expect(content.text()).toBe('已完成状态');
    });

    it(':content[slot/function]', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="登录" v-slots={{ content: () => '已完成状态' }}></StepItem>
        </Steps>
      ));
      const content = wrapper.find('.t-steps-item .t-steps-item__description');
      expect(content.exists()).toBeTruthy();
      expect(content.text()).toBe('已完成状态');
    });

    it(':default[string]', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="登录" default="已完成状态"></StepItem>
        </Steps>
      ));
      const content = wrapper.find('.t-steps-item .t-steps-item__description');
      expect(content.exists()).toBeTruthy();
      expect(content.text()).toBe('已完成状态');
    });

    it(':default[slot/function]', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="登录" v-slots={{ default: () => '已完成状态' }}></StepItem>
        </Steps>
      ));
      const content = wrapper.find('.t-steps-item .t-steps-item__description');
      expect(content.exists()).toBeTruthy();
      expect(content.text()).toBe('已完成状态');
    });

    it(':extra[string]', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="登录" default="已完成状态" extra="额外操作"></StepItem>
        </Steps>
      ));
      const extra = wrapper.find('.t-steps-item .t-steps-item__extra');
      expect(extra.exists()).toBeTruthy();
      expect(extra.text()).toBe('额外操作');
    });

    it(':extra[slot/function]', () => {
      const slots = {
        extra: () => <div class="extra">额外操作</div>,
      };
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="登录" default="已完成状态" v-slots={slots}></StepItem>
        </Steps>
      ));
      const extra = wrapper.find('.t-steps-item .t-steps-item__extra .extra');
      expect(extra.exists()).toBeTruthy();
      expect(extra.text()).toBe('额外操作');
    });

    it(':icon[boolean]', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="登录" default="已完成状态" icon={false}></StepItem>
        </Steps>
      ));
      const item = wrapper.find('.t-steps-item .t-steps-item__icon .t-steps-item__icon--number');
      expect(item.exists()).toBeFalsy();
    });

    it(':icon[slot/function]', () => {
      const renderIocn = () => <AppIcon />;
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="登录" default="已完成状态" icon={renderIocn}></StepItem>
        </Steps>
      ));
      const icon = wrapper.find('.t-steps-item .t-steps-item__icon');
      expect(icon.exists()).toBeTruthy();
      expect(icon.findComponent(AppIcon)).toBeTruthy();
    });

    it(':status[default/process/finish/error]', () => {
      const statusList = ['default', 'process', 'finish', 'error'] as const;
      statusList.forEach((status) => {
        const wrapper = mount(() => (
          <Steps>
            <StepItem title="登录" default="已完成状态" status={status}></StepItem>
          </Steps>
        ));
        const item = wrapper.find('.t-steps-item');
        expect(item.classes()).toContain(`t-steps-item--${status}`);
      });
    });

    it(':title[string]', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="登录" default="已完成状态"></StepItem>
        </Steps>
      ));
      const title = wrapper.find('.t-steps-item .t-steps-item__title');
      expect(title.exists()).toBeTruthy();
      expect(title.text()).toBe('登录');
    });

    it(':title[slot/function]', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem v-slots={{ title: () => '登录' }} default="已完成状态"></StepItem>
        </Steps>
      ));
      const title = wrapper.find('.t-steps-item .t-steps-item__title');
      expect(title.exists()).toBeTruthy();
      expect(title.text()).toBe('登录');
    });

    it(':value[string/number]', async () => {
      const current = ref<string | number>('b');
      const onChange = (val: string | number) => {
        current.value = val;
      };
      const wrapper = mount(() => (
        <Steps defaultCurrent={current.value} onChange={onChange}>
          <StepItem title="登录" value="a"></StepItem>
          <StepItem title="支付" value="b"></StepItem>
          <StepItem title="支付" value="c"></StepItem>
          <StepItem title="支付" value="d"></StepItem>
        </Steps>
      ));
      const items = wrapper.findAll('.t-steps-item');
      const inners = wrapper.findAll('.t-steps-item__inner');
      expect(items[0].classes()).toContain('t-steps-item--finish');
      expect(items[1].classes()).toContain('t-steps-item--process');
      expect(items[2].classes()).toContain('t-steps-item--default');
      await inners[2].trigger('click');
      expect(items[0].classes()).toContain('t-steps-item--finish');
      expect(items[1].classes()).toContain('t-steps-item--finish');
      expect(items[2].classes()).toContain('t-steps-item--process');
      expect(current.value).toBe('c');
    });
  });
});
