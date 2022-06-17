import { defineComponent } from 'vue';
import { vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '@/src/button/index';

describe('Button', () => {
  describe(':props', () => {
    it(':variant', () => {
      const wrapper = mount(<Button variant={'base'}>text</Button>);
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':size', () => {
      const wrapper = mount(<Button size={'large'}>text</Button>);
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':icon function', () => {
      const wrapper = mount(Button, {
        propsData: {
          icon() {
            return <i>custom icon</i>;
          },
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':shape', () => {
      const wrapper = mount(<Button shape="round">text</Button>);
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':loading', () => {
      const wrapper = mount(<Button loading={true}>text</Button>);
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':block', () => {
      const wrapper = mount(<Button block={true}>text</Button>);
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':disabled', () => {
      const fn = vi.fn();
      const wrapper = mount(
        <Button disabled={true} onClick={fn}>
          text
        </Button>,
      );
      wrapper.trigger('click');
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':content', () => {
      const wrapper = mount(
        defineComponent({
          setup() {
            const renderContent = () => {
              return 'foo';
            };
            return () => (
              <div>
                <Button content="foo">bar</Button>
                <Button content={renderContent}>bar</Button>
                <Button default="foo">bar</Button>
                <Button default={renderContent}>bar</Button>
                <Button content={'0'}>bar</Button>
              </div>
            );
          },
        }),
      );
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@event', () => {
    it('Event passthrough ', () => {
      const fn = vi.fn();
      const wrapper = mount(<Button onClick={fn}>text</Button>);
      wrapper.findComponent(Button).trigger('click');
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('<slot>', () => {
    it('<icon>', () => {
      const wrapper = mount(Button, {
        slots: {
          icon: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
