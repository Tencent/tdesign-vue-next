import { mount } from '@vue/test-utils';
import Button from '@/src/button/index.ts';

describe('Button', () => {
  describe(':props', () => {
    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <Button theme={'primary'}>text</Button>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Button size={'large'}>text</Button>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':icon string', () => {
      const wrapper = mount({
        render() {
          return <Button icon={'delete'}>text</Button>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':icon function', () => {
      const wrapper = mount(Button, {
        propsData: {
          icon() {
            return <i>custom icon</i>;
          },
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <Button round={true}>text</Button>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':loading', () => {
      const wrapper = mount({
        render() {
          return <Button loading={true}>text</Button>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':block', () => {
      const wrapper = mount({
        render() {
          return <Button block={true}>text</Button>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it(':disabled', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Button disabled={true} onClick={fn}>text</Button>;
        },
      });
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('@event', () => {
    it('Event passthrough ', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Button onClick={fn}>text</Button>;
        },
      });
      wrapper.find(Button).trigger('click');
      expect(fn).toHaveBeenCalled();;
    });
  });

  describe('<slot>', () => {
    it('<icon>', () => {
      const wrapper = mount(Button, {
        scopedSlots: {
          icon: '<div></div>',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  // describe('methods', () => {
  //   it('somePublicMethod', () => {
  //     // method work fine
  //   });
  // });
});
