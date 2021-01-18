import { mount } from '@vue/test-utils';
import Button from '@/src/button/index.ts';

describe('Button', () => {
  describe(':props', () => {
    it(':variant', () => {
      const wrapper = mount({
        render() {
          return <Button variant={'base'}>text</Button>;
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
    it(':shape', () => {
      const wrapper = mount({
        render() {
          return <Button shape="round">text</Button>;
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
      wrapper.trigger('click');
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
});
