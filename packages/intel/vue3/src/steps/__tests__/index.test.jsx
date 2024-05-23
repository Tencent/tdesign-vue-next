import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from '@td/adapter-vue';
import { AppIcon } from 'tdesign-icons-vue-next';
import { StepItem, Steps } from 'tdesign-vue-next';

describe('steps', () => {
  it('', () => {
    const wrapper = mount(() => (
      <Steps>
        <StepItem title="登录"></StepItem>
        <StepItem title="购物"></StepItem>
        <StepItem title="支付"></StepItem>
        <StepItem title="完成"></StepItem>
      </Steps>
    ));
    expect(wrapper.findAll('.t-steps-item').length).toBe(4);
  });

  it(':current', () => {
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

  it(':defaultCurrent', () => {
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

  it(':layout', () => {
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

  it(':options', () => {
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

  it(':readonly', async () => {
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

  it(':theme', async () => {
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

  it(':separator', async () => {
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

  it(':sequence', async () => {
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

  it(':onChange', async () => {
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

  describe(':StepItem', () => {
    it(':content', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="登录" content="已完成状态"></StepItem>
        </Steps>
      ));
      const content = wrapper.find('.t-steps-item .t-steps-item__description');
      expect(content.exists()).toBeTruthy();
      expect(content.text()).toBe('已完成状态');
    });

    it(':default', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="登录" default="已完成状态"></StepItem>
        </Steps>
      ));
      const content = wrapper.find('.t-steps-item .t-steps-item__description');
      expect(content.exists()).toBeTruthy();
      expect(content.text()).toBe('已完成状态');
    });

    it(':title', () => {
      const wrapper = mount(() => (
        <Steps>
          <StepItem title="登录" default="已完成状态"></StepItem>
        </Steps>
      ));
      const title = wrapper.find('.t-steps-item .t-steps-item__title');
      expect(title.exists()).toBeTruthy();
      expect(title.text()).toBe('登录');
    });

    it(':extra', () => {
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

    it(':icon', () => {
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

    it(':icon', () => {
      const statusList = ['default', 'process', 'finish', 'error'];
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

    it(':value', async () => {
      const current = ref('b');
      const onChange = (val) => {
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
