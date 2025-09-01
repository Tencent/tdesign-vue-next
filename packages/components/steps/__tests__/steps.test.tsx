// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick, ref } from 'vue';
import { Steps, StepItem } from '@tdesign/components/steps';

describe('Steps', () => {
  describe('props', () => {
    it(':current[string/number]', () => {
      const wrapper = mount(() => (
        <Steps current={1}>
          <StepItem title="登录"></StepItem>
          <StepItem title="购物"></StepItem>
          <StepItem title="支付"></StepItem>
          <StepItem title="完成"></StepItem>
        </Steps>
      ));
      const items = wrapper.findAll('.t-steps-item');
      expect(items[0].classes()).toContain('t-steps-item--finish');
      expect(items[1].classes()).toContain('t-steps-item--process');
      expect(items[2].classes()).toContain('t-steps-item--default');
      expect(items[3].classes()).toContain('t-steps-item--default');
    });

    it(':defaultCurrent[string/number]', () => {
      const wrapper = mount(() => (
        <Steps defaultCurrent={1}>
          <StepItem title="登录"></StepItem>
          <StepItem title="购物"></StepItem>
          <StepItem title="支付"></StepItem>
          <StepItem title="完成"></StepItem>
        </Steps>
      ));
      const items = wrapper.findAll('.t-steps-item');
      expect(items[0].classes()).toContain('t-steps-item--finish');
      expect(items[1].classes()).toContain('t-steps-item--process');
      expect(items[2].classes()).toContain('t-steps-item--default');
      expect(items[3].classes()).toContain('t-steps-item--default');
    });

    it(':layout[horizontal/vertical]', () => {
      const layoutList = ['horizontal', 'vertical'];
      layoutList.forEach((layout) => {
        const wrapper = mount(() => (
          <Steps layout={layout}>
            <StepItem title="登录"></StepItem>
            <StepItem title="购物"></StepItem>
            <StepItem title="支付"></StepItem>
            <StepItem title="完成"></StepItem>
          </Steps>
        ));
        const steps = wrapper.find('.t-steps');
        expect(steps.classes()).toContain(`t-steps--${layout}`);
      });
    });

    it(':options[array]', () => {
      const options = [
        {
          title: '登录',
        },
        {
          title: '购物',
        },
        {
          title: '支付',
        },
        {
          title: '完成',
        },
      ];
      const wrapper = mount(() => <Steps options={options}></Steps>);
      expect(wrapper.findAll('.t-steps-item').length).toBe(4);
    });

    it(':readonly[boolean]', async () => {
      const current = ref(1);
      const wrapper = mount(() => (
        <Steps defaultCurrent={current.value} readonly>
          <StepItem title="登录"></StepItem>
          <StepItem title="购物"></StepItem>
          <StepItem title="支付"></StepItem>
          <StepItem title="完成"></StepItem>
        </Steps>
      ));
      const items = wrapper.findAll('.t-steps-item');
      await items[1].trigger('click');
      expect(current.value).toBe(1);
      expect(items[0].classes()).toContain('t-steps-item--finish');
      expect(items[1].classes()).toContain('t-steps-item--process');
    });

    it(':separator[line/dashed/arrow]', async () => {
      const separatorList = ['line', 'dashed', 'arrow'];
      separatorList.forEach((separator) => {
        const wrapper = mount(() => (
          <Steps separator={separator}>
            <StepItem title="登录"></StepItem>
            <StepItem title="购物"></StepItem>
            <StepItem title="支付"></StepItem>
            <StepItem title="完成"></StepItem>
          </Steps>
        ));
        const steps = wrapper.find('.t-steps');
        expect(steps.classes()).toContain(`t-steps--${separator}-separator`);
      });
    });

    it(':sequence[positive/reverse]', async () => {
      const sequenceList = ['positive', 'reverse'];
      sequenceList.forEach((sequence) => {
        const wrapper = mount(() => (
          <Steps sequence={sequence}>
            <StepItem title="登录"></StepItem>
            <StepItem title="购物"></StepItem>
            <StepItem title="支付"></StepItem>
            <StepItem title="完成"></StepItem>
          </Steps>
        ));
        const steps = wrapper.find('.t-steps');
        expect(steps.classes()).toContain(`t-steps--${sequence}`);
      });
    });

    it(':theme[default/dot]', async () => {
      const themeList = ['default', 'dot'];
      themeList.forEach((theme) => {
        const wrapper = mount(() => (
          <Steps theme={theme}>
            <StepItem title="登录"></StepItem>
            <StepItem title="购物"></StepItem>
            <StepItem title="支付"></StepItem>
            <StepItem title="完成"></StepItem>
          </Steps>
        ));
        const steps = wrapper.find('.t-steps');
        expect(steps.classes()).toContain(`t-steps--${theme}-anchor`);
      });
    });

    it(':onChange[function]', async () => {
      const current = ref(0);
      const onChange = (n) => {
        current.value = n;
      };
      const wrapper = mount(() => (
        <Steps defaultCurrent={current.value} onChange={onChange}>
          <StepItem title="登录"></StepItem>
          <StepItem title="购物"></StepItem>
          <StepItem title="支付"></StepItem>
          <StepItem title="完成"></StepItem>
        </Steps>
      ));
      const items = wrapper.findAll('.t-steps-item');
      const inners = wrapper.findAll('.t-steps-item__inner');
      await inners[1].trigger('click');
      await nextTick();
      expect(current.value).toBe(1);
      expect(items[0].classes()).toContain('t-steps-item--finish');
      expect(items[1].classes()).toContain('t-steps-item--process');
    });

    describe('events', () => {
      it('change', async () => {
        const current = ref(0);
        const onChange = (n) => {
          current.value = n;
        };
        const wrapper = mount(() => (
          <Steps defaultCurrent={current.value} onChange={onChange}>
            <StepItem title="登录"></StepItem>
            <StepItem title="购物"></StepItem>
            <StepItem title="支付"></StepItem>
            <StepItem title="完成"></StepItem>
          </Steps>
        ));
        const items = wrapper.findAll('.t-steps-item');
        const inners = wrapper.findAll('.t-steps-item__inner');
        await inners[1].trigger('click');
        await nextTick();
        expect(current.value).toBe(1);
        expect(items[0].classes()).toContain('t-steps-item--finish');
        expect(items[1].classes()).toContain('t-steps-item--process');
      });
    });
  });
});
