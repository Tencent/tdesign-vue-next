import { mount } from '@vue/test-utils';
import Tabs from '@/src/tabs/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Tabs', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Tabs />;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <Tabs theme={'card'} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':value', () => {
      const wrapper = mount({
        render() {
          return <Tabs value={1} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Tabs size={'large'} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':placement', () => {
      const wrapper = mount({
        render() {
          return <Tabs placement={'left'} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':addable', () => {
      const wrapper = mount({
        render() {
          return <Tabs addable={true} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <Tabs disabled={true} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':defaultValue', () => {
      const wrapper = mount({
        render() {
          return <Tabs defaultValue={1} />;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
