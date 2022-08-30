import { mount } from '@vue/test-utils';
import { HeadMenu } from '@/src/menu';

// every component needs four parts: props/events/slots/functions.
describe('HeadMenu', () => {
  // test props api
  describe('props', () => {
    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <HeadMenu theme={'light'}></HeadMenu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':active', () => {
      const wrapper = mount({
        render() {
          return <HeadMenu value={'2-1'}></HeadMenu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':height', () => {
      const wrapper = mount({
        render() {
          return <HeadMenu height={'750px'}></HeadMenu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('slot', () => {
    it('<logo>', () => {
      const wrapper = mount(HeadMenu, {
        slots: {
          logo: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('<default>', () => {
      const wrapper = mount(HeadMenu, {
        slots: {
          default: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('<operations>', () => {
      const wrapper = mount(HeadMenu, {
        slots: {
          operations: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
