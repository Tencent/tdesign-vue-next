import { mount } from '@vue/test-utils';
import { HeadMenu } from '@/src/menu/index.ts';

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
      expect(wrapper).toMatchSnapshot();
    });

    it(':active', () => {
      const wrapper = mount({
        render() {
          return <HeadMenu active={'2-1'}></HeadMenu>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':height', () => {
      const wrapper = mount({
        render() {
          return <HeadMenu height={'750px'}></HeadMenu>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('slot', () => {
    it('<logo>', () => {
      const wrapper = mount(HeadMenu, {
        scopedSlots: {
          logo: '<div></div>',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('<default>', () => {
      const wrapper = mount(HeadMenu, {
        scopedSlots: {
          default: '<div></div>',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('<options>', () => {
      const wrapper = mount(HeadMenu, {
        scopedSlots: {
          options: '<div></div>',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
