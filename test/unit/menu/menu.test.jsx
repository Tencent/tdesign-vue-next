import { mount } from '@vue/test-utils';
import { Menu } from '@/src/menu';

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
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <Menu theme={'light'}></Menu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':active', () => {
      const wrapper = mount({
        render() {
          return <Menu value={'2-1'}></Menu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':width', () => {
      const wrapper = mount({
        render() {
          return <Menu width={'256px'}></Menu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':height', () => {
      const wrapper = mount({
        render() {
          return <Menu height={'750px'}></Menu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':collapsed', () => {
      const wrapper = mount({
        render() {
          return <Menu collapsed={true}></Menu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':collapsedWidth', () => {
      const wrapper = mount({
        render() {
          return <Menu collapsedWidth={'100px'}></Menu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('slot', () => {
    it('<logo>', () => {
      const wrapper = mount(Menu, {
        slots: {
          logo: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('<default>', () => {
      const wrapper = mount(Menu, {
        slots: {
          default: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('<operations>', () => {
      const wrapper = mount(Menu, {
        slots: {
          operations: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
