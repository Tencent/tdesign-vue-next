import { mount } from '@vue/test-utils';
import { Menu } from '@/src/menu/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Menu', () => {
  // test props api
  describe('props', () => {
    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <Menu></Menu>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <Menu theme={'light'}></Menu>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':active', () => {
      const wrapper = mount({
        render() {
          return <Menu active={'2-1'}></Menu>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':width', () => {
      const wrapper = mount({
        render() {
          return <Menu width={'256px'}></Menu>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':height', () => {
      const wrapper = mount({
        render() {
          return <Menu height={'750px'}></Menu>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':collapsed', () => {
      const wrapper = mount({
        render() {
          return <Menu collapsed={true}></Menu>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':collapsedWidth', () => {
      const wrapper = mount({
        render() {
          return <Menu collapsedWidth={'100px'}></Menu>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('slot', () => {
    it('<logo>', () => {
      const wrapper = mount(Menu, {
        scopedSlots: {
          logo: '<div></div>',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('<default>', () => {
      const wrapper = mount(Menu, {
        scopedSlots: {
          default: '<div></div>',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('<options>', () => {
      const wrapper = mount(Menu, {
        scopedSlots: {
          options: '<div></div>',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
