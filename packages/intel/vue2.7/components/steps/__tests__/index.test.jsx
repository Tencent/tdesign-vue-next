import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { AppIcon } from 'tdesign-icons-vue';
import Steps, { StepItem } from '@/src/steps/index.ts';

describe('Steps', () => {
  it('', () => {
    const wrapper = mount({
      render() {
        return (
          <Steps>
            <StepItem title="登录"></StepItem>
            <StepItem title="购物"></StepItem>
            <StepItem title="支付"></StepItem>
            <StepItem title="完成"></StepItem>
          </Steps>
        );
      },
    });
    expect(wrapper.findAll('.t-steps-item').length).toBe(4);
  });

  it(':current', () => {
    const wrapper = mount({
      render() {
        return (
          <Steps current={1}>
            <StepItem title="登录"></StepItem>
            <StepItem title="购物"></StepItem>
            <StepItem title="支付"></StepItem>
            <StepItem title="完成"></StepItem>
          </Steps>
        );
      },
    });
    const items = wrapper.findAll('.t-steps-item');
    expect(items.at(0).classes()).toContain('t-steps-item--finish');
    expect(items.at(1).classes()).toContain('t-steps-item--process');
    expect(items.at(2).classes()).toContain('t-steps-item--default');
    expect(items.at(3).classes()).toContain('t-steps-item--default');
  });

  it(':defaultCurrent', () => {
    const wrapper = mount({
      render() {
        return (
          <Steps defaultCurrent={1}>
            <StepItem title="登录"></StepItem>
            <StepItem title="购物"></StepItem>
            <StepItem title="支付"></StepItem>
            <StepItem title="完成"></StepItem>
          </Steps>
        );
      },
    });
    const items = wrapper.findAll('.t-steps-item');
    expect(items.at(0).classes()).toContain('t-steps-item--finish');
    expect(items.at(1).classes()).toContain('t-steps-item--process');
    expect(items.at(2).classes()).toContain('t-steps-item--default');
    expect(items.at(3).classes()).toContain('t-steps-item--default');
  });

  it(':layout', () => {
    const layoutList = ['horizontal', 'vertical'];
    layoutList.forEach((layout) => {
      const wrapper = mount({
        render() {
          return (
            <Steps layout={layout}>
              <StepItem title="登录"></StepItem>
              <StepItem title="购物"></StepItem>
              <StepItem title="支付"></StepItem>
              <StepItem title="完成"></StepItem>
            </Steps>
          );
        },
      });
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
    const wrapper = mount({
      render() {
        return <Steps options={options}></Steps>;
      },
    });
    expect(wrapper.findAll('.t-steps-item').length).toBe(4);
  });

  it(':readonly', async () => {
    const current = 1;
    const wrapper = mount({
      render() {
        return (
          <Steps defaultCurrent={current}>
            <StepItem title="登录"></StepItem>
            <StepItem title="购物"></StepItem>
            <StepItem title="支付"></StepItem>
            <StepItem title="完成"></StepItem>
          </Steps>
        );
      },
    });
    const items = wrapper.findAll('.t-steps-item');
    await items.at(1).trigger('click');
    expect(current).toBe(1);
    expect(items.at(0).classes()).toContain('t-steps-item--finish');
    expect(items.at(1).classes()).toContain('t-steps-item--process');
  });

  it(':theme', async () => {
    const themeList = ['default', 'dot'];
    themeList.forEach((theme) => {
      const wrapper = mount({
        render() {
          return (
            <Steps theme={theme}>
              <StepItem title="登录"></StepItem>
              <StepItem title="购物"></StepItem>
              <StepItem title="支付"></StepItem>
              <StepItem title="完成"></StepItem>
            </Steps>
          );
        },
      });
      const steps = wrapper.find('.t-steps');
      expect(steps.classes()).toContain(`t-steps--${theme}-anchor`);
    });
  });

  it(':separator', async () => {
    const separatorList = ['line', 'dashed', 'arrow'];
    separatorList.forEach((separator) => {
      const wrapper = mount({
        render() {
          return (
            <Steps separator={separator}>
              <StepItem title="登录"></StepItem>
              <StepItem title="购物"></StepItem>
              <StepItem title="支付"></StepItem>
              <StepItem title="完成"></StepItem>
            </Steps>
          );
        },
      });
      const steps = wrapper.find('.t-steps');
      expect(steps.classes()).toContain(`t-steps--${separator}-separator`);
    });
  });

  it(':sequence', async () => {
    const sequenceList = ['positive', 'reverse'];
    sequenceList.forEach((sequence) => {
      const wrapper = mount({
        render() {
          return (
            <Steps sequence={sequence}>
              <StepItem title="登录"></StepItem>
              <StepItem title="购物"></StepItem>
              <StepItem title="支付"></StepItem>
              <StepItem title="完成"></StepItem>
            </Steps>
          );
        },
      });
      const steps = wrapper.find('.t-steps');
      expect(steps.classes()).toContain(`t-steps--${sequence}`);
    });
  });

  it(':onChange', async () => {
    let current = 0;
    const onChange = (n) => {
      current = n;
    };
    const wrapper = mount({
      render() {
        return (
          <Steps defaultCurrent={current} onChange={onChange}>
            <StepItem title="登录"></StepItem>
            <StepItem title="购物"></StepItem>
            <StepItem title="支付"></StepItem>
            <StepItem title="完成"></StepItem>
          </Steps>
        );
      },
    });
    const inners = wrapper.findAll('.t-steps-item__inner');
    await inners.at(1).trigger('click');
    await nextTick();
    expect(current).toBe(1);
  });

  describe(':StepItem', () => {
    it(':content :title', () => {
      const wrapper = mount({
        render() {
          return (
            <Steps>
              <StepItem title="登录" content="已完成状态"></StepItem>
            </Steps>
          );
        },
      });
      const content = wrapper.find('.t-steps-item .t-steps-item__description');
      expect(content.exists()).toBeTruthy();
      expect(content.text()).toBe('已完成状态');

      const title = wrapper.find('.t-steps-item .t-steps-item__title');
      expect(title.exists()).toBeTruthy();
      expect(title.text()).toBe('登录');
    });

    it(':extra', () => {
      const wrapper = mount({
        render() {
          return (
            <Steps>
              <StepItem title="登录" default="已完成状态" extra={() => <div class="extra">额外操作</div>}></StepItem>
            </Steps>
          );
        },
      });
      const extra = wrapper.find('.t-steps-item .t-steps-item__extra .extra');
      expect(extra.exists()).toBeTruthy();
      expect(extra.text()).toBe('额外操作');
    });

    it(':icon', () => {
      const wrapper = mount({
        render() {
          return (
            <Steps>
              <StepItem title="登录" default="已完成状态" icon={() => <AppIcon />}></StepItem>
            </Steps>
          );
        },
      });
      const icon = wrapper.find('.t-steps-item .t-steps-item__icon');
      expect(icon.exists()).toBeTruthy();
      expect(icon.findComponent(AppIcon)).toBeTruthy();
    });

    it(':status', () => {
      const statusList = ['default', 'process', 'finish', 'error'];
      statusList.forEach((status) => {
        const wrapper = mount({
          render() {
            return (
              <Steps>
                <StepItem title="登录" default="已完成状态" status={status}></StepItem>
              </Steps>
            );
          },
        });
        const item = wrapper.find('.t-steps-item');
        expect(item.classes()).toContain(`t-steps-item--${status}`);
      });
    });
  });
});
